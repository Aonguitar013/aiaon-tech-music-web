import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { buildSignedDeliveryUrl } from "@/utils/delivery-links";
import { consultAiSalesBrain } from "@/services/ai-sales-brain";
import { getLead, recordLeadInteraction } from "@/services/lead-tracker";
import { harvestChatMessage } from "@/services/chat-harvester";
import {
  executeSlipVerification,
  pendingOrders,
  PendingOrder,
  PROMPTPAY_ID,
  PROMPTPAY_NAME,
} from "@/services/slip-verification";

const DEFAULT_LINE_TOKEN =
  "h4PDZZ6QCgNd4NhxB7YT8K6Hd2P8MHk3y3Fy7EMTcTbZy8/7xgxmxaF1YbSH9Bl3QMDvaiL9jDfqr21ZSpjYoIk2Czl5sqvSfH0zKztjev3ZQBWpP4QtVgjmxNgA/9Ka/B2+9X/G6ra/70ywdw/o8wdB04t89/1O/w1cDnyilFU=";

// Telegram Copilot Notification Bridge (@AiAonhub_bot -> Kru Aon)
const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || "8529471786:AAHI33E48vL4ic1J8tyszNAp7SwzkADaYKE";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "7731447826";

interface LineMessage {
  type: "text" | "image";
  text?: string;
  originalContentUrl?: string;
  previewImageUrl?: string;
}

// Persistent in-memory stores on globalThis
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any;
if (!g.__lineWebhookLogs) g.__lineWebhookLogs = [];

function addWebhookLog(entry: Record<string, unknown>) {
  g.__lineWebhookLogs.unshift({
    time: new Date().toISOString(),
    ...entry,
  });
  if (g.__lineWebhookLogs.length > 20) {
    g.__lineWebhookLogs.length = 20;
  }
}

/**
 * Pure TypeScript CRC16-CCITT (0xFFFF, polynomial 0x1021) for Thai PromptPay EMVCo QR
 */
function crc16(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

/**
 * Pure TypeScript PromptPay EMVCo Payload Generator for 0835399340
 */
function generatePromptPayPayload(phone: string, amount?: number): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const formattedPhone = "0066" + cleanPhone.substring(1); // 0066835399340
  const tag29Value = `0016A0000006770101110113${formattedPhone}`;
  const tag29 = `29${String(tag29Value.length).padStart(2, "0")}${tag29Value}`;

  const hasAmount = typeof amount === "number" && amount > 0;
  const poiMethod = hasAmount ? "010212" : "010211";
  let amountField = "";
  if (hasAmount) {
    const amtStr = amount.toFixed(2);
    amountField = `54${String(amtStr.length).padStart(2, "0")}${amtStr}`;
  }

  const raw = `000201${poiMethod}${tag29}5802TH5303764${amountField}6304`;
  return raw + crc16(raw);
}

/**
 * Generate a scannable PromptPay QR Code HTTPS image URL for a specific amount in THB.
 */
function getPromptPayQrImageUrl(amount: number): string {
  const payload = generatePromptPayPayload(PROMPTPAY_ID, amount);
  return `https://api.qrserver.com/v1/create-qr-code/?size=600x600&margin=20&format=png&data=${encodeURIComponent(payload)}`;
}

/**
 * Fetch LINE user profile display name so Kru Aon knows who is messaging
 */
async function getLineUserDisplayName(userId: string | undefined, lineAccessToken: string): Promise<string> {
  if (!userId || !lineAccessToken) return "ลูกค้า LINE OA";
  try {
    const res = await fetch(`https://api.line.me/v2/bot/profile/${userId}`, {
      headers: { Authorization: `Bearer ${lineAccessToken}` },
    });
    if (!res.ok) return `ลูกค้า (${userId.slice(0, 8)})`;
    const data = await res.json();
    return data?.displayName || `ลูกค้า (${userId.slice(0, 8)})`;
  } catch {
    return `ลูกค้า (${userId.slice(0, 8)})`;
  }
}

/**
 * Send instant text notification to Kru Aon's Telegram (@AiAonhub_bot)
 */
async function notifyKruAonTelegram(text: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }),
    });
  } catch (err) {
    console.error("[Telegram Notify Error]:", err);
  }
}

/**
 * Helper to extract quoted title from preset message
 */
function extractQuotedTitle(text: string): string | null {
  const match =
    text.match(/"([^"]+)"/) ||
    text.match(/“([^”]+)”/) ||
    text.match(/'([^']+)'/);
  return match ? match[1].trim() : null;
}

/**
 * Parse numbers like "1,290" or "690" from a price segment
 */
function parseBahtNumbers(text: string): number[] {
  const matches = text.match(/(\d{1,3}(?:,\d{3})+|\d+)\s*(?:฿|บาท)/g);
  if (!matches) return [];
  return matches
    .map((m) => parseInt(m.replace(/[^0-9]/g, ""), 10))
    .filter((n) => !isNaN(n) && n > 0);
}

/**
 * Build smart LINE reply messages for website preset texts, order memory & email capture.
 */
async function buildSmartAutoReply(
  rawText: string,
  userId: string | undefined,
  lineAccessToken: string
): Promise<LineMessage[] | null> {
  const text = rawText.trim();
  const lower = text.toLowerCase();

  // ── 0. EMAIL CAPTURE AFTER ORDER / SLIP SUBMISSION ──
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch && text.length < 180 && !text.includes("สวัสดีครับครูอ้น")) {
    const email = emailMatch[0].toLowerCase();
    const existingOrder = userId ? pendingOrders.get(userId) : undefined;
    const customerName = await getLineUserDisplayName(userId, lineAccessToken);

    if (existingOrder) {
      existingOrder.customerEmail = email;
      pendingOrders.set(userId!, existingOrder);
    }

    const isPaid = existingOrder?.status === "verified_paid";
    const deliveryInfo =
      isPaid && existingOrder
        ? buildSignedDeliveryUrl(existingOrder.itemTitle, existingOrder.verifiedRef || "VERIFIED")
        : null;

    await notifyKruAonTelegram(
      `📧 [ลูกค้าแจ้งอีเมลรับระบบใน LINE OA]\n` +
        `👤 ลูกค้า: ${customerName}\n` +
        `✉️ อีเมล: ${email}\n` +
        `📦 รายการ: ${existingOrder?.itemTitle || "รอดูจากแชตล่าสุด"}\n` +
        `💳 สถานะสลิป: ${isPaid ? `✅ ตรวจสลิปผ่านแล้ว (Ref: ${existingOrder?.verifiedRef?.slice(0, 16)})` : "⏳ ยังไม่ได้ส่งสลิป / รอตรวจสลิป"}\n` +
        `📌 ข้อความเต็ม: ${text}`
    );

    return [
      {
        type: "text",
        text:
          `✅ ระบบบันทึกอีเมล "${email}" ของท่านเรียบร้อยแล้วครับ!\n` +
          (existingOrder ? `📦 รายการ: ${existingOrder.itemTitle}\n` : "") +
          (deliveryInfo
            ? `\n📥 ลิงก์ดาวน์โหลดชุดติดตั้งระบบของคุณ (คลิกโหลดไฟล์ .ZIP ได้ทันที):\n${deliveryInfo.url}\n`
            : `\n📲 หากท่านโอนชำระเงินแล้ว รบกวนส่ง "รูปสลิปโอนเงิน" เข้ามาในแชตนี้ได้เลยครับ ระบบ AI จะตรวจสอบสลิปและส่งลิงก์ดาวน์โหลดให้ทันทีครับ!\n`) +
          `\n🔔 ระบบได้ส่งแจ้งเตือนอีเมลของท่านไปยังครูอ้นเรียบร้อยแล้ว ขอบคุณมากครับ 🙏`,
      },
    ];
  }

  // ── 1. FREEBIES: User already unlocked with FREE69 and clicked a specific LINE download item ──
  if (text.includes("ปลดล็อกรหัสสำเร็จแล้ว") || text.includes("ขอรับลิงก์ดาวน์โหลดไฟล์ฟรี")) {
    const itemTitle = extractQuotedTitle(text) || "ทรัพยากรแจกฟรีจากคลัง AiAon Tech";
    return [
      {
        type: "text",
        text:
          `🎁 ยินดีด้วยครับ! ระบบรับคำขอไฟล์แจกฟรีของท่านแล้ว:\n` +
          `📌 รายการ: "${itemTitle}"\n\n` +
          `📥 ลิงก์ดาวน์โหลดระบบแจกฟรียอดฮิตที่พร้อมใช้งานทันที:\n` +
          `1️⃣ [AONA07] ระบบประเมินตนเอง SAR & ว.PA 15 ตัวชี้วัด:\nhttps://1drv.ms/f/c/ce3ad5ba004eb0c7/IgDJlCMMPrrsT41Ts0p0_mG3ARQDzg2jFhgxYKp8p5n6gNA?e=X8Nj74\n\n` +
          `2️⃣ [AONE12] ระบบเช็กชื่อเผชิญเหตุฉุกเฉิน & Active Shooter:\nhttps://1drv.ms/f/c/ce3ad5ba004eb0c7/IgD_Jr6rfSsxSpAKzMlvYwa0AUZTGXnV_mi0Q5WW4ra9jKI?e=6afyzo\n\n` +
          `💬 สำหรับไฟล์รายการที่ท่านกดขอมา ครูอ้นกำลังจัดส่งลิงก์ Google Drive / ไฟล์ฉบับเต็มให้ในแชตนี้ครับ (หรือแจ้งอีเมล Gmail ทิ้งไว้ได้เลยครับ) 🙏`,
      },
    ];
  }

  // ── 2. FREEBIES: Requesting Unlock Passcode (FREE69) ──
  if (
    text.includes("ขอรับรหัสปลดล็อก") ||
    text.includes("ขอรับระบบและโค้ดแจกฟรี") ||
    text.includes("ขอสมัครรับอัปเดตโค้ดฟรี") ||
    lower.includes("freebies") ||
    text.includes("รหัสปลดล็อก") ||
    text === "ขอรหัส" ||
    lower === "free69"
  ) {
    const itemTitle = extractQuotedTitle(text);
    return [
      {
        type: "text",
        text:
          `🎉 ยินดีต้อนรับสู่คลังของแจกฟรี AiAon Tech ครับ!\n` +
          (itemTitle ? `📦 รายการที่ท่านเลือก: "${itemTitle}"\n\n` : "\n") +
          `🔑 รหัสผ่านสำหรับปลดล็อกดาวน์โหลดไฟล์บนหน้าเว็บคือ:\n` +
          `👉 FREE69\n` +
          `(พิมพ์ตัวอักษรภาษาอังกฤษพิมพ์ใหญ่ติดกันได้เลยครับ)\n\n` +
          `📌 นำรหัส FREE69 ไปกรอกในหน้าเว็บ:\n` +
          `https://www.aiaon.tech/freebies\n\n` +
          `📥 หรือดาวน์โหลด 2 ระบบแจกฟรียอดนิยมได้โดยตรงที่นี่ครับ:\n` +
          `• [AONA07] ระบบ SAR & ว.PA อัตโนมัติ:\nhttps://1drv.ms/f/c/ce3ad5ba004eb0c7/IgDJlCMMPrrsT41Ts0p0_mG3ARQDzg2jFhgxYKp8p5n6gNA?e=X8Nj74\n` +
          `• [AONE12] ระบบเช็กชื่อแผนเผชิญเหตุ:\nhttps://1drv.ms/f/c/ce3ad5ba004eb0c7/IgD_Jr6rfSsxSpAKzMlvYwa0AUZTGXnV_mi0Q5WW4ra9jKI?e=6afyzo`,
      },
    ];
  }

  // ── 3. VIP SETUP PRODUCT ORDER (User clicked the Gold VIP Setup badge on ProductCard) ──
  if (text.includes("VIP Setup") && text.includes("บริการติดตั้งพร้อมใช้")) {
    const itemTitle = extractQuotedTitle(text) || "ระบบอัตโนมัติพร้อมบริการติดตั้ง VIP Setup";
    const amounts = parseBahtNumbers(text);
    const basePrice = amounts[0] || 690;
    const vipPrice = amounts[1] || 350;
    const totalAmount = basePrice + vipPrice;
    const qrUrl = getPromptPayQrImageUrl(totalAmount);

    if (userId) {
      pendingOrders.set(userId, {
        userId,
        itemTitle: `${itemTitle} (รวม VIP Setup)`,
        baseAmount: totalAmount,
        vipAmount: 0,
        isVipSelected: true,
        orderedAt: new Date().toISOString(),
        status: "pending_slip",
      });
    }

    const customerName = await getLineUserDisplayName(userId, lineAccessToken);
    if (userId) {
      recordLeadInteraction({
        userId,
        displayName: customerName,
        userText: text,
        assistantReply: `สั่งซื้อ ${itemTitle} (รวม VIP Setup) ยอด ${totalAmount} บาท`,
        status: "quoted",
        item: `${itemTitle} (รวม VIP Setup)`,
        amount: totalAmount,
      });
    }

    notifyKruAonTelegram(
      `🔔 [มีลูกค้ากดสั่งซื้อ + VIP Setup ใน LINE OA]\n` +
        `👤 ลูกค้า: ${customerName}\n` +
        `🛠️ รายการ: ${itemTitle}\n` +
        `💵 ยอดรวมติดตั้ง: ${totalAmount.toLocaleString()} บาท (ส่ง QR พร้อมเพย์ให้แล้ว รอรับสลิป)`
    );

    return [
      {
        type: "text",
        text:
          `🛠️ ระบบรับรายการสั่งซื้อ + บริการติดตั้งพร้อมใช้ (VIP Setup) เรียบร้อยครับ!\n\n` +
          `📦 ระบบ: ${itemTitle}\n` +
          `💰 ราคาตัวระบบ: ${basePrice.toLocaleString()} บาท\n` +
          `✨ บริการครูอ้นติดตั้งให้พร้อมใช้: +${vipPrice.toLocaleString()} บาท\n` +
          `━━━━━━━━━━━━━━━\n` +
          `💵 ยอดชำระสุทธิ: ${totalAmount.toLocaleString()} บาท\n` +
          `━━━━━━━━━━━━━━━\n` +
          `🏦 พร้อมเพย์: 083-539-9340\n` +
          `👤 ชื่อบัญชี: ${PROMPTPAY_NAME}\n\n` +
          `📲 สแกน QR Code ด้านล่างนี้ (ระบุยอด ${totalAmount.toLocaleString()} บาทไว้ให้แล้ว) แล้วส่ง "รูปสลิปโอนเงิน" เข้ามาในแชตนี้ได้เลยครับ ระบบ AI จะตรวจสลิปและส่งมอบระบบให้ทันทีครับ! ⚡`,
      },
      {
        type: "image",
        originalContentUrl: qrUrl,
        previewImageUrl: qrUrl,
      },
    ];
  }

  // ── 4. STANDARD SYSTEM ORDER (20 GAS Systems from ProductCard or Detail Page) ──
  if (text.includes("สนใจสั่งซื้อระบบอัตโนมัติ") || text.includes("สนใจสั่งซื้อระบบ:")) {
    const itemTitle = extractQuotedTitle(text) || "ระบบอัตโนมัติ Google Apps Script";
    const amounts = parseBahtNumbers(text);
    const basePrice = amounts[0] || 590;
    const vipAddon = amounts[1] || 350;
    const totalWithVip = basePrice + vipAddon;
    const qrUrl = getPromptPayQrImageUrl(basePrice);

    if (userId) {
      pendingOrders.set(userId, {
        userId,
        itemTitle,
        baseAmount: basePrice,
        vipAmount: vipAddon,
        isVipSelected: false,
        orderedAt: new Date().toISOString(),
        status: "pending_slip",
      });
    }

    const customerName = await getLineUserDisplayName(userId, lineAccessToken);
    if (userId) {
      recordLeadInteraction({
        userId,
        displayName: customerName,
        userText: text,
        assistantReply: `สั่งซื้อ ${itemTitle} (${basePrice} บาท)`,
        status: "quoted",
        item: itemTitle,
        amount: basePrice,
      });
    }

    notifyKruAonTelegram(
      `🔔 [มีลูกค้ากดสั่งซื้อระบบใน LINE OA]\n` +
        `👤 ลูกค้า: ${customerName}\n` +
        `📦 รายการ: ${itemTitle}\n` +
        `💵 ราคา: ${basePrice.toLocaleString()} บาท (ส่ง QR พร้อมเพย์ให้แล้ว รอรับสลิป)`
    );

    return [
      {
        type: "text",
        text:
          `🙏 ขอบคุณที่สั่งซื้อนวัตกรรมจาก AiAon Tech ครับ!\n\n` +
          `📦 รายการ: ${itemTitle}\n` +
          `━━━━━━━━━━━━━━━\n` +
          `✅ ทางเลือกที่ 1 (รับไฟล์ไปติดตั้งเองตามคู่มือ 2 นาที):\n` +
          `💵 ยอดโอน: ${basePrice.toLocaleString()} บาท\n\n` +
          `🛠️ ทางเลือกที่ 2 (ให้ครูอ้นติดตั้งให้พร้อมใช้ 100% VIP Setup):\n` +
          `💵 ยอดโอนรวม: ${totalWithVip.toLocaleString()} บาท (ค่าตัวระบบ ${basePrice.toLocaleString()} + ค่าติดตั้ง ${vipAddon.toLocaleString()} ฿)\n` +
          `━━━━━━━━━━━━━━━\n` +
          `🏦 พร้อมเพย์: 083-539-9340\n` +
          `👤 ชื่อบัญชี: ${PROMPTPAY_NAME}\n\n` +
          `📲 สแกน QR Code ด้านล่างเพื่อชำระยอด ${basePrice.toLocaleString()} บาท แล้วส่ง "รูปสลิปโอนเงิน" เข้ามาในแชตนี้ได้เลยครับ ระบบ AI จะตรวจสลิปและส่งลิงก์ไฟล์ให้ทันทีครับ! ⚡`,
      },
      {
        type: "image",
        originalContentUrl: qrUrl,
        previewImageUrl: qrUrl,
      },
    ];
  }

  // ── 5. UNIVERSAL CATCH-ALL FOR ANY ORDER / PACKAGE WITH A BAHT AMOUNT ──
  const detectedAmounts = parseBahtNumbers(text);
  if (
    detectedAmounts.length > 0 &&
    (text.includes("สนใจ") ||
      text.includes("สั่งซื้อ") ||
      text.includes("สมัคร") ||
      text.includes("แพ็กเกจ") ||
      text.includes("ราคา") ||
      text.includes("ชำระเงิน"))
  ) {
    const amount = detectedAmounts[0];
    const itemTitle =
      extractQuotedTitle(text) ||
      text
        .split("\n")[0]
        .replace(/^สวัสดีครับครูอ้น\s*/, "")
        .trim();
    const qrUrl = getPromptPayQrImageUrl(amount);

    if (userId) {
      pendingOrders.set(userId, {
        userId,
        itemTitle,
        baseAmount: amount,
        vipAmount: 0,
        isVipSelected: false,
        orderedAt: new Date().toISOString(),
        status: "pending_slip",
      });
    }

    const customerName = await getLineUserDisplayName(userId, lineAccessToken);
    if (userId) {
      recordLeadInteraction({
        userId,
        displayName: customerName,
        userText: text,
        assistantReply: `สั่งซื้อ ${itemTitle} (${amount} บาท)`,
        status: "quoted",
        item: itemTitle,
        amount,
      });
    }

    notifyKruAonTelegram(
      `🔔 [มีลูกค้ากดสั่งซื้อแพ็กเกจใน LINE OA]\n` +
        `👤 ลูกค้า: ${customerName}\n` +
        `📦 รายการ: ${itemTitle}\n` +
        `💵 ยอดชำระ: ${amount.toLocaleString()} บาท (ส่ง QR พร้อมเพย์ให้แล้ว รอรับสลิป)`
    );

    return [
      {
        type: "text",
        text:
          `👑 ระบบรับรายการสั่งซื้อของท่านเรียบร้อยครับ!\n\n` +
          `📦 รายการ: ${itemTitle}\n` +
          `💵 ยอดชำระ: ${amount.toLocaleString()} บาท\n` +
          `━━━━━━━━━━━━━━━\n` +
          `🏦 พร้อมเพย์: 083-539-9340\n` +
          `👤 ชื่อบัญชี: ${PROMPTPAY_NAME}\n\n` +
          `📲 สแกน QR Code พร้อมเพย์ด้านล่าง (ระบุยอด ${amount.toLocaleString()} บาทไว้ให้แล้ว) แล้วส่ง "รูปสลิปโอนเงิน" เข้ามาในแชตนี้ได้เลยครับ ระบบ AI จะตรวจสลิปและส่งมอบสิทธิ์ให้ทันทีครับ! ⚡`,
      },
      {
        type: "image",
        originalContentUrl: qrUrl,
        previewImageUrl: qrUrl,
      },
    ];
  }

  // ── 6. AI SALES & CONSULTATION BRAIN (Gemini 3.5 Flash-Lite + Master Knowledge Vault) ──
  const customerName = await getLineUserDisplayName(userId, lineAccessToken);
  const existingLead = userId ? getLead(userId) : null;
  const recentHistory = existingLead?.conversationHistory || [];

  const aiResult = await consultAiSalesBrain({
    userText: text,
    userId: userId || "guest",
    displayName: customerName,
    recentHistory,
  });

  // Record interaction to persist conversation history across turns in LINE OA!
  if (userId) {
    recordLeadInteraction({
      userId,
      displayName: customerName,
      userText: text,
      assistantReply: aiResult.replyText,
      status: aiResult.shouldAttachPromptPayQr ? "quoted" : "inquiry",
      item: aiResult.suggestedItem,
      amount: aiResult.suggestedAmount,
      isEscalated: aiResult.shouldEscalateTelegram,
    });
  }

  const replyMessages: LineMessage[] = [
    {
      type: "text",
      text: aiResult.replyText,
    },
  ];

  // If customer intended to buy / asked for payment, dynamic QR is attached & pending order is set!
  if (
    aiResult.shouldAttachPromptPayQr &&
    aiResult.suggestedAmount &&
    aiResult.suggestedAmount > 0
  ) {
    const amount = aiResult.suggestedAmount;
    const itemTitle = aiResult.suggestedItem || "ระบบนวัตกรรมจาก AiAon Tech";
    const qrUrl = getPromptPayQrImageUrl(amount);

    if (userId) {
      pendingOrders.set(userId, {
        userId,
        itemTitle,
        baseAmount: amount,
        vipAmount: 0,
        isVipSelected: false,
        orderedAt: new Date().toISOString(),
        status: "pending_slip",
      });
    }

    replyMessages.push({
      type: "image",
      originalContentUrl: qrUrl,
      previewImageUrl: qrUrl,
    });

    await notifyKruAonTelegram(
      `🔔 [AI Brain ปิดการขาย & ส่ง QR พร้อมเพย์ใน LINE OA]\n` +
        `👤 ลูกค้า: ${customerName}\n` +
        `📦 สินค้า: ${itemTitle}\n` +
        `💵 ยอดชำระ: ${amount.toLocaleString()} บาท\n` +
        `💬 ข้อความลูกค้า: ${text}`
    );
  }

  // If AI flagged for human escalation
  if (aiResult.shouldEscalateTelegram) {
    await notifyKruAonTelegram(
      `🚨 [AI Brain แจ้งเตือน: ลูกค้าต้องการติดต่อครูอ้นโดยตรง]\n` +
        `👤 ลูกค้า: ${customerName}\n` +
        `📌 เหตุผล: ${aiResult.escalateReason || "ลูกค้ามีคำถามเฉพาะทางหรือขอเอกสารพิเศษ"}\n` +
        `💬 ข้อความลูกค้า: ${text}`
    );
  }

  // Harvest customer message to Google Sheets
  harvestChatMessage({
    userId: userId || "guest",
    displayName: customerName,
    sender: "customer",
    message: text,
    status: aiResult.shouldAttachPromptPayQr ? "quoted" : "inquiry",
    intent: aiResult.detectedIntent,
    product: aiResult.suggestedItem,
  });

  // Harvest AI reply to Google Sheets
  harvestChatMessage({
    userId: userId || "guest",
    displayName: customerName,
    sender: "ai_brain",
    message: aiResult.replyText,
    status: aiResult.shouldAttachPromptPayQr ? "quoted" : "inquiry",
    intent: aiResult.detectedIntent,
    product: aiResult.suggestedItem,
    amount: aiResult.suggestedAmount,
  });

  return replyMessages;
}

/**
 * Strict Fail-Closed 5-Layer Bank Slip Verification Pipeline when user sends an image in LINE OA!
 */
async function verifyLineSlipImage(
  messageId: string,
  userId: string | undefined,
  lineAccessToken: string
): Promise<LineMessage[] | null> {
  if (!lineAccessToken) return null;

  try {
    // 1. Download image binary from LINE Messaging API
    const imgRes = await fetch(
      `https://api-data.line.me/v2/bot/message/${messageId}/content`,
      {
        headers: {
          Authorization: `Bearer ${lineAccessToken}`,
        },
      }
    );
    if (!imgRes.ok) return null;

    const contentType = imgRes.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await imgRes.arrayBuffer();
    const customerName = await getLineUserDisplayName(userId, lineAccessToken);

    // Auto-reconstitute pending order from lead history if missing
    if (userId && !pendingOrders.has(userId)) {
      const existingLead = getLead(userId);
      if (existingLead?.conversationHistory?.length) {
        for (let i = existingLead.conversationHistory.length - 1; i >= 0; i--) {
          const msg = existingLead.conversationHistory[i];
          if (msg.role === "assistant") {
            const priceMatch = msg.text.match(
              /(?:ราคา|ยอด|เป็น|อยู่ที่|โอน)\s*(?:อยู่ที่)?\s*([0-9,]+)\s*(?:บาท|฿)/
            );
            if (priceMatch) {
              const parsedAmount = parseInt(priceMatch[1].replace(/,/g, ""), 10);
              if (parsedAmount > 0 && parsedAmount < 10000) {
                const codeMatch = msg.text.match(/\(([A-Z0-9]+)\)/);
                const itemTitle = codeMatch
                  ? `ระบบ ${codeMatch[1]}`
                  : "ระบบ/แพ็กเกจที่เลือกไว้ในแชต";
                pendingOrders.set(userId, {
                  userId,
                  itemTitle,
                  baseAmount: parsedAmount,
                  vipAmount: 0,
                  isVipSelected: false,
                  orderedAt: new Date().toISOString(),
                  status: "pending_slip",
                });
                console.log(
                  `[LineWebhook] Reconstituted pending order from lead history: ${itemTitle} (${parsedAmount} ฿)`
                );
                break;
              }
            }
          }
        }
      }
    }

    const verification = await executeSlipVerification({
      imageBuffer: arrayBuffer,
      contentType,
      userId: userId || "line_guest",
      customerName,
      channel: "LINE OA",
    });

    if (verification.status !== "not_a_slip" && verification.replyText) {
      return [
        {
          type: "text",
          text: verification.replyText,
        },
      ];
    }
  } catch (err) {
    console.error("[LINE Webhook Slip Check Error]:", err);
  }
  return null;
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "AiAon Tech Smart LINE OA Webhook",
  });
}

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const rawQueryToken = url.searchParams.get("token");
    const lineAccessToken = (
      (rawQueryToken ? rawQueryToken.trim().replace(/ /g, "+") : "") ||
      process.env.LINE_CHANNEL_ACCESS_TOKEN ||
      DEFAULT_LINE_TOKEN
    ).trim();

    const rawBody = await req.text();

    // Verify x-line-signature if LINE_CHANNEL_SECRET is configured in environment
    const channelSecret = (process.env.LINE_CHANNEL_SECRET || "").trim();
    if (channelSecret) {
      const signature = req.headers.get("x-line-signature") || "";
      const expectedSig = crypto
        .createHmac("sha256", channelSecret)
        .update(rawBody)
        .digest("base64");
      if (!signature || signature !== expectedSig) {
        console.warn("[LineWebhook] Invalid x-line-signature rejected.");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    const body = rawBody ? JSON.parse(rawBody) : {};
    const events = body?.events || [];

    if (!Array.isArray(events) || events.length === 0) {
      addWebhookLog({ type: "verify_ping" });
      return NextResponse.json({ success: true, verified: true }, { status: 200 });
    }

    const debugResults = [];

    for (const event of events) {
      if (event.type !== "message" || !event.replyToken) {
        addWebhookLog({ type: event.type, skipped: true });
        continue;
      }

      const userId: string | undefined = event.source?.userId;
      let replyMessages: LineMessage[] | null = null;

      if (event.message?.type === "text" && event.message?.text) {
        replyMessages = await buildSmartAutoReply(
          event.message.text,
          userId,
          lineAccessToken
        );
      } else if (event.message?.type === "image" && event.message?.id && lineAccessToken) {
        replyMessages = await verifyLineSlipImage(
          event.message.id,
          userId,
          lineAccessToken
        );
      }

      if (replyMessages && replyMessages.length > 0 && lineAccessToken) {
        const lineRes = await fetch("https://api.line.me/v2/bot/message/reply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lineAccessToken}`,
          },
          body: JSON.stringify({
            replyToken: event.replyToken,
            messages: replyMessages.slice(0, 5),
          }),
        });

        const lineResText = await lineRes.text().catch(() => "");

        // Fallback: if image URL caused an error on LINE, send text-only reply
        if (!lineRes.ok && replyMessages.length > 1) {
          await fetch("https://api.line.me/v2/bot/message/reply", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${lineAccessToken}`,
            },
            body: JSON.stringify({
              replyToken: event.replyToken,
              messages: [replyMessages[0]],
            }),
          });
        }

        const logEntry = {
          msgType: event.message?.type,
          textPreview: event.message?.text?.slice(0, 60),
          userId,
          matched: true,
          lineStatus: lineRes.status,
          lineResText,
        };
        addWebhookLog(logEntry);
        debugResults.push(logEntry);
      } else {
        const logEntry = {
          msgType: event.message?.type,
          textPreview: event.message?.text?.slice(0, 60),
          userId,
          matched: false,
        };
        addWebhookLog(logEntry);
        debugResults.push(logEntry);
      }
    }

    return NextResponse.json({ success: true, debug: debugResults });
  } catch (error) {
    addWebhookLog({ error: String(error) });
    return NextResponse.json({ success: true, error: String(error) });
  }
}

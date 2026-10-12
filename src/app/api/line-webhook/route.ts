import { NextRequest, NextResponse } from "next/server";

const PROMPTPAY_ID = "0835399340";
const PROMPTPAY_NAME = "นายจิรวัฒน์ เดชเส้ง (ครูอ้น AiAon Tech)";

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

interface PendingOrder {
  userId: string;
  itemTitle: string;
  baseAmount: number;
  vipAmount: number;
  isVipSelected: boolean;
  orderedAt: string;
  status: "pending_slip" | "verified_paid";
  verifiedRef?: string;
  verifiedBank?: string;
  customerEmail?: string;
}

// Persistent in-memory stores on globalThis
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any;
if (!g.__lineWebhookLogs) g.__lineWebhookLogs = [];
if (!g.__pendingOrders) g.__pendingOrders = new Map<string, PendingOrder>();
if (!g.__usedSlipRefs) g.__usedSlipRefs = new Set<string>();

const pendingOrders: Map<string, PendingOrder> = g.__pendingOrders;
const usedSlipRefs: Set<string> = g.__usedSlipRefs;

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
 * Direct OneDrive / Cloud Download Links for instant delivery upon slip verification
 */
const INSTANT_DELIVERY_LINKS: Record<string, string> = {
  AONE02:
    "https://1drv.ms/f/c/ce3ad5ba004eb0c7/IgATR6et6O-BS61MuoKMqj_GAYU-TtWQfIJanJqGekSkGbk?e=AaoHOh",
  AONA07:
    "https://1drv.ms/f/c/ce3ad5ba004eb0c7/IgDJlCMMPrrsT41Ts0p0_mG3ARQDzg2jFhgxYKp8p5n6gNA?e=X8Nj74",
  AONE12:
    "https://1drv.ms/f/c/ce3ad5ba004eb0c7/IgD_Jr6rfSsxSpAKzMlvYwa0AUZTGXnV_mi0Q5WW4ra9jKI?e=6afyzo",
};

function findInstantDownloadLink(title: string): string | null {
  const upper = (title || "").toUpperCase();
  for (const [code, link] of Object.entries(INSTANT_DELIVERY_LINKS)) {
    if (upper.includes(code)) return link;
  }
  return null;
}

/**
 * Thai Bank Codes from Bank of Thailand Mini-QR Standard
 */
const THAI_BANK_NAMES: Record<string, string> = {
  "002": "ธนาคารกรุงเทพ (BBL)",
  "004": "ธนาคารกสิกรไทย (KBank)",
  "006": "ธนาคารกรุงไทย (Krungthai)",
  "011": "ธนาคารทหารไทยธนชาต (ttb)",
  "014": "ธนาคารไทยพาณิชย์ (SCB)",
  "022": "ธนาคารซีไอเอ็มบี ไทย (CIMB)",
  "024": "ธนาคารยูโอบี (UOB)",
  "025": "ธนาคารกรุงศรีอยุธยา (BAY)",
  "030": "ธนาคารออมสิน (GSB)",
  "033": "ธนาคารอาคารสงเคราะห์ (GHB)",
  "034": "ธ.ก.ส. (BAAC)",
  "067": "ธนาคารทิสโก้ (TISCO)",
  "069": "ธนาคารเกียรตินาคินภัทร (KKP)",
  "073": "ธนาคารแลนด์ แอนด์ เฮ้าส์ (LH Bank)",
};

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
 * Send actual slip photo + caption to Kru Aon's Telegram (@AiAonhub_bot)
 */
async function sendSlipPhotoToTelegram(imageBuffer: ArrayBuffer, contentType: string, caption: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  try {
    const formData = new FormData();
    formData.append("chat_id", String(TELEGRAM_CHAT_ID));
    formData.append("caption", caption);
    const ext = contentType.includes("png") ? "png" : "jpg";
    formData.append("photo", new Blob([imageBuffer], { type: contentType }), `slip.${ext}`);

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
      method: "POST",
      body: formData,
    });
  } catch (err) {
    console.error("[Telegram Photo Notify Error]:", err);
    await notifyKruAonTelegram(caption);
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

    await notifyKruAonTelegram(
      `📧 [ลูกค้าแจ้งอีเมลรับระบบใน LINE OA]\n` +
        `👤 ลูกค้า: ${customerName}\n` +
        `✉️ อีเมล: ${email}\n` +
        `📦 รายการ: ${existingOrder?.itemTitle || "รอดูจากแชตล่าสุด"}\n` +
        `📌 ข้อความเต็ม: ${text}`
    );

    const directLink = existingOrder ? findInstantDownloadLink(existingOrder.itemTitle) : null;

    return [
      {
        type: "text",
        text:
          `✅ ระบบบันทึกอีเมล "${email}" ของท่านเรียบร้อยแล้วครับ!\n` +
          (existingOrder ? `📦 รายการ: ${existingOrder.itemTitle}\n` : "") +
          (directLink ? `\n📥 ดาวน์โหลดไฟล์ระบบได้ทันทีที่นี่:\n${directLink}\n` : "") +
          `\n🔔 ระบบได้ส่งแจ้งเตือนอีเมลและรายการสั่งซื้อของท่านไปยังครูอ้นเรียบร้อยแล้ว เดี๋ยวครูอ้นจัดส่งสิทธิ์เข้าถึงไฟล์ / ดูแลการติดตั้งให้ทันทีครับ ขอบคุณมากครับ 🙏`,
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

  // ── 6. GENERAL INQUIRIES FROM WEBSITE PRESETS ──
  if (text.includes("สวัสดีครับครูอ้น")) {
    return [
      {
        type: "text",
        text:
          `สวัสดีครับ! 🙏 ระบบอัตโนมัติของครูอ้น (AiAon Tech) ได้รับข้อความของท่านเรียบร้อยแล้วครับ\n\n` +
          `📌 ระหว่างรอครูอ้นเข้ามาตอบกลับโดยตรง ท่านสามารถแจ้งรายละเอียดเพิ่มเติมทิ้งไว้ได้เลยครับ เช่น:\n` +
          `• ชื่อระบบ / แพ็กเกจที่สนใจ\n` +
          `• ชื่อโรงเรียน หรือหน่วยงาน (กรณีขอใบเสนอราคา / เชิญวิทยากร)\n\n` +
          `🌐 ดูคลัง 20 ระบบทั้งหมด: https://www.aiaon.tech/digital-vault\n` +
          `🎁 คลังของแจกฟรี (รหัส FREE69): https://www.aiaon.tech/freebies\n` +
          `เดี๋ยวครูอ้นรีบเข้ามาดูแลให้เร็วที่สุดครับ! ⚡`,
      },
    ];
  }

  return null;
}

/**
 * Decode QR code from image buffer using goqr/qrserver API (detects Bank of Thailand Slip Mini-QR!)
 */
async function decodeSlipQrFromImage(
  imageBuffer: ArrayBuffer,
  contentType: string
): Promise<string | null> {
  try {
    const formData = new FormData();
    const ext = contentType.includes("png") ? "png" : "jpg";
    formData.append("file", new Blob([imageBuffer], { type: contentType }), `slip.${ext}`);

    const res = await fetch("https://api.qrserver.com/v1/read-qr-code/", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) return null;
    const json = await res.json();
    const qrData = json?.[0]?.symbol?.[0]?.data;
    return typeof qrData === "string" && qrData.length > 0 ? qrData : null;
  } catch (err) {
    console.error("[QR Decode Error]:", err);
    return null;
  }
}

/**
 * Parse Bank of Thailand Slip Mini-QR (contains "00060000010103" + 3-digit bank code + "02" + len + transRef)
 */
function parseBotSlipMiniQr(qrData: string): {
  isPaymentQr: boolean;
  isBankSlipQr: boolean;
  bankCode?: string;
  bankName?: string;
  transRef?: string;
} {
  // Check if user accidentally sent back our own PromptPay payment QR code
  if (qrData.startsWith("000201") && qrData.includes("A000000677010111")) {
    return { isPaymentQr: true, isBankSlipQr: false };
  }

  // Official Bank of Thailand Slip Mini-QR signature: "00060000010103"
  const marker = "00060000010103";
  const idx = qrData.indexOf(marker);
  if (idx !== -1) {
    const afterMarker = qrData.substring(idx + marker.length);
    const bankCode = afterMarker.substring(0, 3);
    const bankName = THAI_BANK_NAMES[bankCode] || `ธนาคารรหัส ${bankCode}`;

    let transRef = afterMarker.substring(3);
    if (transRef.startsWith("02")) {
      const refLen = parseInt(transRef.substring(2, 4), 10);
      if (!isNaN(refLen) && refLen > 0) {
        transRef = transRef.substring(4, 4 + refLen);
      }
    }

    return {
      isPaymentQr: false,
      isBankSlipQr: true,
      bankCode,
      bankName,
      transRef,
    };
  }

  return { isPaymentQr: false, isBankSlipQr: false };
}

/**
 * 5-Layer Bank Slip Verification Pipeline when user sends an image in LINE OA!
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

    // 2. Scan image for Bank of Thailand Slip Mini-QR
    const qrData = await decodeSlipQrFromImage(arrayBuffer, contentType);
    const qrInfo = qrData ? parseBotSlipMiniQr(qrData) : null;

    // Layer 1A: User accidentally sent back the payment QR code instead of a transfer slip
    if (qrInfo?.isPaymentQr) {
      return [
        {
          type: "text",
          text:
            `⚠️ ภาพที่ส่งมาเป็น "QR Code สำหรับสแกนจ่ายเงิน" ครับ\n\n` +
            `📲 รบกวนนำภาพ QR Code นี้ไปสแกนจ่ายในแอปธนาคาร แล้วส่งรูป "สลิปโอนเงินสำเร็จ" กลับมาในแชตนี้แทนนะครับ 🙏`,
        },
      ];
    }

    // 3. Also run Gemini 2.5 Flash Vision if GEMINI_API_KEY is available and valid
    let geminiResult: {
      isBankSlip?: boolean;
      receiverMatches?: boolean;
      receiverName?: string;
      transferredAmount?: number;
      bankName?: string;
    } | null = null;

    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey && geminiKey.startsWith("AIza")) {
      try {
        const imageBase64 = Buffer.from(arrayBuffer).toString("base64");
        const prompt = `ตรวจสอบว่ารูปภาพนี้คือ "สลิปโอนเงินธนาคารไทย" ที่โอนเข้าบัญชี "นายจิรวัฒน์ เดชเส้ง" หรือ "จิรวัฒน์ เดชเส้ง" หรือ "JIRAWAT DECHSENG" หรือพร้อมเพย์ "083-539-9340" / "0835399340" หรือไม่
- ถ้ารูปนี้ไม่ใช่สลิปโอนเงินธนาคาร ให้ตอบ isBankSlip = false
- ถ้าเป็นสลิปโอนเงินจริง ให้ดึงชื่อผู้รับ ยอดเงินโอน และตรวจสอบว่าชื่อผู้รับตรงกับ จิรวัฒน์ เดชเส้ง หรือไม่`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: prompt },
                    { inlineData: { mimeType: contentType, data: imageBase64 } },
                  ],
                },
              ],
              generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                  type: "OBJECT",
                  properties: {
                    isBankSlip: { type: "BOOLEAN" },
                    receiverName: { type: "STRING" },
                    receiverMatches: { type: "BOOLEAN" },
                    transferredAmount: { type: "NUMBER" },
                    bankName: { type: "STRING" },
                  },
                  required: ["isBankSlip", "receiverMatches", "transferredAmount"],
                },
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawJson = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawJson) {
            geminiResult = JSON.parse(rawJson);
          }
        }
      } catch (gErr) {
        console.error("[Gemini Slip Check Warning]:", gErr);
      }
    }

    const isVerifiedSlip = Boolean(qrInfo?.isBankSlipQr || geminiResult?.isBankSlip);

    // Layer 1B: Not a bank slip (e.g. normal photo or screenshot) -> stay silent
    if (!isVerifiedSlip) {
      return null;
    }

    // Layer 2: If Gemini read receiver name and it clearly doesn't match Kru Aon
    if (geminiResult && geminiResult.isBankSlip && geminiResult.receiverMatches === false) {
      return [
        {
          type: "text",
          text:
            `⚠️ ระบบตรวจพบว่าชื่อบัญชีผู้รับในสลิป (${geminiResult.receiverName || "ไม่ตรงกับระบบ"}) อาจไม่ตรงกับบัญชี "นายจิรวัฒน์ เดชเส้ง (083-539-9340)" ครับ\n\n` +
            `รบกวนตรวจสอบรูปสลิปอีกครั้ง หรือรอครูอ้นตรวจสอบด้วยตนเองสักครู่นะครับ 🙏`,
        },
      ];
    }

    // Layer 3: Anti-Duplicate Slip Check using Bank of Thailand Transaction Reference
    const transRef = qrInfo?.transRef || "";
    if (transRef && usedSlipRefs.has(transRef)) {
      return [
        {
          type: "text",
          text:
            `⚠️ สลิปหมายเลขรายการอ้างอิง (${transRef}) นี้เคยถูกใช้ยืนยันในระบบไปแล้วครับ\n` +
            `หากท่านสั่งซื้อรายการใหม่ รบกวนส่งรูปสลิปของการโอนเงินครั้งล่าสุดนะครับ 🙏`,
        },
      ];
    }
    if (transRef) {
      usedSlipRefs.add(transRef);
    }

    // Layer 4: Match with Customer's Pending Order Memory
    const pendingOrder = userId ? pendingOrders.get(userId) : undefined;
    const customerName = await getLineUserDisplayName(userId, lineAccessToken);
    const bankName = qrInfo?.bankName || geminiResult?.bankName || "ธนาคารไทย (PromptPay)";
    const detectedAmount = geminiResult?.transferredAmount || pendingOrder?.baseAmount || 0;

    // Check if amount is short (when both Gemini amount and pendingOrder exist)
    if (
      geminiResult?.transferredAmount &&
      pendingOrder?.baseAmount &&
      geminiResult.transferredAmount < pendingOrder.baseAmount
    ) {
      const diff = pendingOrder.baseAmount - geminiResult.transferredAmount;
      await sendSlipPhotoToTelegram(
        arrayBuffer,
        contentType,
        `⚠️ [สลิปยอดเงินไม่ครบใน LINE OA]\n` +
          `👤 ลูกค้า: ${customerName}\n` +
          `📦 รายการ: ${pendingOrder.itemTitle}\n` +
          `💵 ยอดในสลิป: ${geminiResult.transferredAmount.toLocaleString()} ฿ (ขาดอีก ${diff.toLocaleString()} ฿)`
      );
      return [
        {
          type: "text",
          text:
            `⚠️ ระบบตรวจพบยอดโอนในสลิป ${geminiResult.transferredAmount.toLocaleString()} บาท ซึ่งยังไม่ครบตามราคา "${pendingOrder.itemTitle}" (${pendingOrder.baseAmount.toLocaleString()} บาท — ขาดอีก ${diff.toLocaleString()} บาท) ครับ\n\n` +
            `ท่านสามารถโอนส่วนต่างเพิ่มเติมและส่งสลิปเข้ามา หรือรอครูอ้นตรวจสอบได้เลยครับ 🙏`,
        },
      ];
    }

    // Check if customer transferred base + VIP Setup amount
    let paidForVipSetup = pendingOrder?.isVipSelected || false;
    if (
      geminiResult?.transferredAmount &&
      pendingOrder &&
      pendingOrder.vipAmount > 0 &&
      geminiResult.transferredAmount >= pendingOrder.baseAmount + pendingOrder.vipAmount
    ) {
      paidForVipSetup = true;
    }

    const orderTitle = pendingOrder?.itemTitle || "รายการสั่งซื้อระบบ/แพ็กเกจ AiAon Tech";
    if (pendingOrder && userId) {
      pendingOrder.status = "verified_paid";
      pendingOrder.verifiedRef = transRef;
      pendingOrder.verifiedBank = bankName;
      pendingOrders.set(userId, pendingOrder);
    }

    // Layer 5: Instant Delivery Link Lookup + Telegram Slip Photo Alert to Kru Aon
    const directDownloadLink = findInstantDownloadLink(orderTitle);

    await sendSlipPhotoToTelegram(
      arrayBuffer,
      contentType,
      `💰 [ตรวจสลิปแท้ผ่านแล้ว! เงินเข้า LINE OA]\n` +
        `👤 ลูกค้า: ${customerName}\n` +
        `📦 สินค้า: ${orderTitle}${paidForVipSetup ? " (+ บริการติดตั้ง VIP Setup)" : ""}\n` +
        (detectedAmount > 0 ? `💵 ยอดเงิน: ${detectedAmount.toLocaleString()} บาท\n` : "") +
        `🏦 ธนาคารต้นทาง: ${bankName}\n` +
        (transRef ? `🔖 เลขอ้างอิงสลิป (Ref): ${transRef}\n` : "") +
        `📥 สถานะ: บอทส่งใบรับรอง${directDownloadLink ? " + ลิงก์ดาวน์โหลด OneDrive" : ""} และขอ Gmail ลูกค้าไว้ให้แล้วครับ!`
    );

    return [
      {
        type: "text",
        text:
          `✅ ตรวจสอบสลิปโอนเงินสำเร็จ! (Verified Bank Slip)\n` +
          `━━━━━━━━━━━━━━━\n` +
          `📦 รายการ: ${orderTitle}${paidForVipSetup ? " (รวมบริการติดตั้ง VIP Setup 🛠️)" : ""}\n` +
          (detectedAmount > 0 ? `💵 ยอดชำระ: ${detectedAmount.toLocaleString()} บาท\n` : "") +
          `🏦 ข้อมูลสลิป: ${bankName}\n` +
          (transRef ? `🔖 เลขที่อ้างอิง: ${transRef.slice(0, 18)}\n` : "") +
          `━━━━━━━━━━━━━━━\n` +
          (directDownloadLink
            ? `📥 ลิงก์ดาวน์โหลดโฟลเดอร์ระบบของคุณ (คลิกโหลดได้ทันที):\n${directDownloadLink}\n\n`
            : "") +
          `📩 ขั้นตอนสุดท้าย: รบกวนพิมพ์แจ้ง "อีเมล (Gmail)" ของท่าน${
            paidForVipSetup ? " และชื่อโรงเรียน" : ""
          } ส่งมาในแชตนี้ได้เลยครับ เพื่อรับลิงก์ไฟล์ระบบเข้าอีเมลและสิทธิ์อัปเดตตลอดชีพ (ระบบได้แจ้งเตือนครูอ้นให้ทราบเรียบร้อยแล้วครับ) 🙏⚡`,
      },
    ];
  } catch (err) {
    console.error("[LINE Webhook Slip Check Error]:", err);
  }
  return null;
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "AiAon Tech Smart LINE OA Webhook (@deu6776s)",
    features: [
      "1. Smart Order Memory per Customer",
      "2. 5-Layer Bank Slip Verification (Bank of Thailand Mini-QR + Gemini Vision + Anti-Duplicate Ref)",
      "3. Instant Product Download Link Delivery in LINE OA",
      "4. Real-Time Slip Photo & Order Alert to Kru Aon's Telegram (@AiAonhub_bot)",
    ],
    activePendingOrders: Array.from(pendingOrders.values()).slice(0, 10),
    recentLogs: g.__lineWebhookLogs || [],
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

    const body = await req.json().catch(() => ({}));
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

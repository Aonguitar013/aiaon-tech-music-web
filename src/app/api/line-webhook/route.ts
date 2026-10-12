import { NextRequest, NextResponse } from "next/server";

const PROMPTPAY_ID = "0835399340";
const PROMPTPAY_NAME = "นายจิรวัฒน์ เดชเส้ง (ครูอ้น AiAon Tech)";

const DEFAULT_LINE_TOKEN =
  "h4PDZZ6QCgNd4NhxB7YT8K6Hd2P8MHk3y3Fy7EMTcTbZy8/7xgxmxaF1YbSH9Bl3QMDvaiL9jDfqr21ZSpjYoIk2Czl5sqvSfH0zKztjev3ZQBWpP4QtVgjmxNgA/9Ka/B2+9X/G6ra/70ywdw/o8wdB04t89/1O/w1cDnyilFU=";

interface LineMessage {
  type: "text" | "image";
  text?: string;
  originalContentUrl?: string;
  previewImageUrl?: string;
}

// Keep recent webhook logs in memory for instant diagnostics via GET /api/line-webhook
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any;
if (!g.__lineWebhookLogs) {
  g.__lineWebhookLogs = [];
}

function addWebhookLog(entry: Record<string, unknown>) {
  g.__lineWebhookLogs.unshift({
    time: new Date().toISOString(),
    ...entry,
  });
  if (g.__lineWebhookLogs.length > 15) {
    g.__lineWebhookLogs.length = 15;
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
 * Build smart LINE reply messages for website preset texts & common keywords.
 */
function buildSmartAutoReply(rawText: string): LineMessage[] | null {
  const text = rawText.trim();
  const lower = text.toLowerCase();

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
          `📲 สแกน QR Code ด้านล่างนี้ (ระบุยอด ${totalAmount.toLocaleString()} บาทไว้ให้แล้ว) แล้วส่ง "รูปสลิป" พร้อมแจ้ง "อีเมล Gmail และชื่อโรงเรียน" ในแชตนี้ได้เลยครับ!`,
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
          `📲 สแกน QR Code ด้านล่างเพื่อชำระยอด ${basePrice.toLocaleString()} บาท (หรือโอนยอด ${totalWithVip.toLocaleString()} บาทหากรับบริการติดตั้ง) แล้วส่ง "สลิปโอนเงิน + อีเมล Gmail" ในแชตนี้ได้เลยครับ!`,
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
    const itemTitle = extractQuotedTitle(text) || text.split("\n")[0].replace(/^สวัสดีครับครูอ้น\s*/, "");
    const qrUrl = getPromptPayQrImageUrl(amount);

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
          `📲 สแกน QR Code พร้อมเพย์ด้านล่าง (ระบุยอด ${amount.toLocaleString()} บาทไว้ให้แล้ว) แล้วส่ง "รูปสลิปโอนเงิน" พร้อมแจ้ง "อีเมล Gmail" ในแชตนี้ได้เลยครับ! ⚡`,
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
 * Optional AI Bank Slip Verification directly inside LINE OA chat when user sends an image!
 */
async function verifyLineSlipImage(
  messageId: string,
  lineAccessToken: string
): Promise<LineMessage[] | null> {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey || !lineAccessToken) return null;

  try {
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
    const imageBase64 = Buffer.from(arrayBuffer).toString("base64");

    const prompt = `ตรวจสอบว่ารูปภาพนี้คือ "สลิปโอนเงินธนาคารไทย" ที่โอนเข้าบัญชี "นายจิรวัฒน์ เดชเส้ง" หรือ "จิรวัฒน์ เดชเส้ง" หรือ "JIRAWAT DECHSENG" หรือพร้อมเพย์ "083-539-9340" / "0835399340" หรือไม่
- ถ้ารูปนี้ไม่ใช่สลิปโอนเงินธนาคาร (เช่น เป็นรูปถ่ายทั่วไป หรือภาพหน้าจออื่น) ให้ตอบ isBankSlip = false
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

    if (!geminiRes.ok) return null;
    const geminiData = await geminiRes.json();
    const rawJson = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJson) return null;

    const result = JSON.parse(rawJson);
    if (!result.isBankSlip) {
      return null;
    }

    if (result.receiverMatches) {
      return [
        {
          type: "text",
          text:
            `✅ ระบบ AI (Gemini Vision) ตรวจสอบสลิปโอนเงินเรียบร้อยแล้วครับ!\n` +
            `• ผู้รับเงิน: นายจิรวัฒน์ เดชเส้ง (ถูกต้อง)\n` +
            `• ยอดโอน: ${Number(result.transferredAmount || 0).toLocaleString()} บาท\n\n` +
            `🙏 ขอบคุณมากครับ! รบกวนพิมพ์แจ้ง "อีเมล (Gmail)" ของท่านทิ้งไว้ในแชตนี้ได้เลยครับ เดี๋ยวครูอ้นส่งลิงก์ดาวน์โหลดโฟลเดอร์ระบบ / ดึงเข้ากลุ่ม VIP ให้ทันทีครับ ⚡`,
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
    service: "AiAon Tech Smart LINE OA Webhook (@deu6776s)",
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

      let replyMessages: LineMessage[] | null = null;

      if (event.message?.type === "text" && event.message?.text) {
        replyMessages = buildSmartAutoReply(event.message.text);
      } else if (event.message?.type === "image" && event.message?.id && lineAccessToken) {
        replyMessages = await verifyLineSlipImage(event.message.id, lineAccessToken);
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
          userId: event.source?.userId,
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

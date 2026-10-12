import { NextRequest, NextResponse } from "next/server";
import generatePayload from "promptpay-qr";

const PROMPTPAY_ID = "0835399340";
const PROMPTPAY_NAME = "นายจิรวัฒน์ เดชเส้ง (ครูอ้น AiAon Tech)";

interface LineMessage {
  type: "text" | "image";
  text?: string;
  originalContentUrl?: string;
  previewImageUrl?: string;
}

/**
 * Generate a scannable PromptPay QR Code HTTPS image URL for a specific amount in THB.
 */
function getPromptPayQrImageUrl(amount: number): string {
  let payload = "";
  try {
    payload = generatePayload(PROMPTPAY_ID, { amount: amount > 0 ? amount : undefined });
  } catch {
    payload = `00020101021129370016A00000067701011101130066${PROMPTPAY_ID.substring(1)}5802TH5303764540${amount}5802TH6304`;
  }
  return `https://api.qrserver.com/v1/create-qr-code/?size=600x600&margin=20&data=${encodeURIComponent(payload)}`;
}

/**
 * Helper to extract quoted title from preset message, e.g. "📦 \"[AONE01] ...\""
 */
function extractQuotedTitle(text: string): string | null {
  const match = text.match(/"([^"]+)"/) || text.match(/'([^']+)'/);
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
 * Returns null if the message is regular human conversation so Kru Aon can chat normally without bot interruption.
 */
function buildSmartAutoReply(rawText: string): LineMessage[] | null {
  const text = rawText.trim();
  const lower = text.toLowerCase();

  // ── 1. FREEBIES: User already unlocked with FREE69 and clicked a specific LINE download item ──
  if (text.includes("ปลดล็อกรหัสสำเร็จแล้ว") && text.includes("ขอรับลิงก์ดาวน์โหลดไฟล์ฟรี")) {
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
    text === "รหัสปลดล็อก" ||
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
  if (text.includes("สนใจสั่งซื้อระบบพร้อมบริการให้ครูอ้นติดตั้งให้ (VIP Setup)")) {
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

  // ── 5. TEACHER PREP (Telegram Exam Bot & SobKru Audio Pass) ──
  if (
    text.includes("Exam Bot Pass") ||
    text.includes("Song & Audio Pass") ||
    text.includes("All-in-One SobKru Pass") ||
    text.includes("AiAon Prep") ||
    text.includes("ติวสอบครูผู้ช่วย")
  ) {
    const itemTitle = extractQuotedTitle(text) || "แพ็กเกจติวสอบครูผู้ช่วย AiAon Prep (Telegram VIP)";
    const amounts = parseBahtNumbers(text);
    const amount = amounts[0] || 390;
    const qrUrl = getPromptPayQrImageUrl(amount);

    return [
      {
        type: "text",
        text:
          `🎯 ยินดีต้อนรับว่าที่ข้าราชการครูสู่ "AiAon Prep" ครับ!\n\n` +
          `📌 แพ็กเกจที่เลือก: ${itemTitle}\n` +
          `💵 ยอดชำระ: ${amount.toLocaleString()} บาท (สิทธิ์ตลอดชีพ ไม่มีรายเดือน)\n` +
          `━━━━━━━━━━━━━━━\n` +
          `🏦 พร้อมเพย์: 083-539-9340\n` +
          `👤 ชื่อบัญชี: ${PROMPTPAY_NAME}\n\n` +
          `📲 สแกน QR Code ด้านล่าง (ยอด ${amount.toLocaleString()} บาท) แล้วส่งสลิปพร้อมแจ้ง "วิชาเอกที่สอบ และอีเมล Gmail" ทิ้งไว้ได้เลยครับ ทันทีที่ตรวจสลิปเสร็จ ครูอ้นจะส่งลิงก์เข้ากลุ่มลับ Telegram VIP และคลังเพลงช่วยจำให้ทันทีครับ! 🔥`,
      },
      {
        type: "image",
        originalContentUrl: qrUrl,
        previewImageUrl: qrUrl,
      },
    ];
  }

  // ── 6. COMMERCIAL MUSIC STORE (Songs, Backing Tracks, All-Access Audio Pass, Custom Song) ──
  if (
    text.includes("สนใจสั่งซื้อเพลงลิขสิทธิ์") ||
    text.includes("All-Access School Audio Pass") ||
    text.includes("สนใจสั่งทำเพลงใหม่") ||
    text.includes("เพลงประจำโรงเรียน")
  ) {
    const itemTitle = extractQuotedTitle(text) || "ผลงานเพลงและเสียงลิขสิทธิ์ AiAon Music Studio";
    const amounts = parseBahtNumbers(text);
    const amount = amounts[0] || (text.includes("สั่งทำเพลงใหม่") ? 1990 : 990);
    const qrUrl = getPromptPayQrImageUrl(amount);

    return [
      {
        type: "text",
        text:
          `🎵 ขอบคุณที่สนใจผลงานเพลงลิขสิทธิ์จาก AiAon Music Studio ครับ!\n\n` +
          `💿 รายการ: ${itemTitle}\n` +
          `💵 ยอดชำระ: ${amount.toLocaleString()} บาท\n` +
          `━━━━━━━━━━━━━━━\n` +
          `🏦 พร้อมเพย์: 083-539-9340\n` +
          `👤 ชื่อบัญชี: ${PROMPTPAY_NAME}\n\n` +
          (text.includes("สั่งทำเพลงใหม่")
            ? `🎸 สำหรับการสั่งแต่งเพลงใหม่ (Custom Song): ท่านสามารถแจ้ง "ชื่อโรงเรียน/องค์กร, คำขวัญ, แนวเพลง และอารมณ์เพลงที่ต้องการ" ทิ้งไว้ในแชตได้เลยครับ!\n`
            : `📲 สแกน QR Code ด้านล่างเพื่อชำระเงิน (${amount.toLocaleString()} บาท) แล้วส่งสลิปพร้อมแจ้ง "ชื่อโรงเรียน/ช่อง และอีเมล Gmail" เพื่อรับไฟล์ Master WAV + MP3 และใบอนุญาต Commercial License ได้เลยครับ!`),
      },
      {
        type: "image",
        originalContentUrl: qrUrl,
        previewImageUrl: qrUrl,
      },
    ];
  }

  // ── 7. VIP BUNDLES, STUDENT HUB & AI CARETAKER PACKAGES WITH PRICE ──
  if (
    text.includes("สนใจสั่งซื้อแพ็กเกจ") ||
    text.includes("สนใจสั่งซื้อ:") ||
    text.includes("สนใจแพ็กเกจ:") ||
    text.includes("Student All-in-One")
  ) {
    const itemTitle = extractQuotedTitle(text) || text.split("\n")[0];
    const amounts = parseBahtNumbers(text);
    const amount = amounts[0] || 0;

    if (amount > 0) {
      const qrUrl = getPromptPayQrImageUrl(amount);
      return [
        {
          type: "text",
          text:
            `👑 ระบบรับรายการสั่งซื้อแพ็กเกจสุดคุ้มเรียบร้อยครับ!\n\n` +
            `📦 รายการ: ${itemTitle}\n` +
            `💵 ยอดชำระ: ${amount.toLocaleString()} บาท\n` +
            `━━━━━━━━━━━━━━━\n` +
            `🏦 พร้อมเพย์: 083-539-9340\n` +
            `👤 ชื่อบัญชี: ${PROMPTPAY_NAME}\n\n` +
            `📲 สแกน QR Code พร้อมเพย์ด้านล่าง (ระบุยอด ${amount.toLocaleString()} บาทอัตโนมัติ) แล้วส่ง "รูปสลิปโอนเงิน" พร้อมแจ้ง "อีเมล Gmail" ในแชตนี้ได้เลยครับ! ⚡`,
        },
        {
          type: "image",
          originalContentUrl: qrUrl,
          previewImageUrl: qrUrl,
        },
      ];
    }
  }

  // ── 8. GENERAL INQUIRIES FROM FLOATING BUTTON / SPEAKER / CUSTOM QUOTE ──
  if (
    text.includes("สวัสดีครับครูอ้น") &&
    (text.includes("สนใจบริการติดตั้งระบบ AI ผู้ช่วยส่วนตัว") ||
      text.includes("สนใจขอเชิญเป็นวิทยากร") ||
      text.includes("สนใจจ้างพัฒนาระบบ") ||
      text.includes("สนใจโปรโมชันมัดรวมระบบ") ||
      text.includes("กำลังดูคลังระบบอัตโนมัติ") ||
      text.includes("สนใจระบบในคลังนักเรียน") ||
      text.includes("เข้ามาชมเว็บไซต์ www.aiaon.tech"))
  ) {
    return [
      {
        type: "text",
        text:
          `สวัสดีครับ! 🙏 ระบบอัตโนมัติของครูอ้น (AiAon Tech) ได้รับข้อความของท่านเรียบร้อยแล้วครับ\n\n` +
          `📌 ระหว่างรอครูอ้นเข้ามาตอบกลับโดยตรง ท่านสามารถแจ้งรายละเอียดเพิ่มเติมทิ้งไว้ได้เลยครับ เช่น:\n` +
          `• ชื่อระบบ / แพ็กเกจที่สนใจ\n` +
          `• ชื่อโรงเรียน หรือหน่วยงาน (กรณีขอใบเสนอราคา / เชิญวิทยากร)\n` +
          `• รุ่นคอมพิวเตอร์ Windows/Mac (กรณีติดตั้ง AI เลขาส่วนตัว)\n\n` +
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
      // Not a bank slip -> stay silent so normal image sharing in chat isn't interrupted
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
    features: [
      "Pre-filled Order Auto-Reply with Dynamic PromptPay QR Code Image",
      "Freebie Passcode (FREE69) Instant Delivery",
      "Gemini 2.5 Flash Automatic Bank Slip Verification in LINE Chat",
    ],
  });
}

const DEFAULT_LINE_TOKEN =
  "h4PDZZ6QCgNd4NhxB7YT8K6Hd2P8MHk3y3Fy7EMTcTbZy8/7xgxmxaF1YbSH9Bl3QMDvaiL9jDfqr21ZSpjYoIk2Czl5sqvSfH0zKztjev3ZQBWpP4QtVgjmxNgA/9Ka/B2+9X/G6ra/70ywdw/o8wdB04t89/1O/w1cDnyilFU=";

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

    // Fast 200 OK for LINE Webhook "Verify" ping (which sends events: [])
    if (!Array.isArray(events) || events.length === 0) {
      return NextResponse.json({ success: true, verified: true }, { status: 200 });
    }

    for (const event of events) {
      if (event.type !== "message" || !event.replyToken) continue;

      let replyMessages: LineMessage[] | null = null;

      if (event.message?.type === "text" && event.message?.text) {
        replyMessages = buildSmartAutoReply(event.message.text);
      } else if (event.message?.type === "image" && event.message?.id && lineAccessToken) {
        replyMessages = await verifyLineSlipImage(event.message.id, lineAccessToken);
      }

      if (replyMessages && replyMessages.length > 0 && lineAccessToken) {
        await fetch("https://api.line.me/v2/bot/message/reply", {
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
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[LINE Webhook Error]:", error);
    // Always return 200 OK to LINE platform so webhook verification succeeds
    return NextResponse.json({ success: true });
  }
}

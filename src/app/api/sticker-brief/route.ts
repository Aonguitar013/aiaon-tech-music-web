import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || "8529471786:AAHI33E48vL4ic1J8tyszNAp7SwzkADaYKE";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "7731447826";

const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyPRw7GjvTv24XFfCsX73QMvPh4e9AFxxc6bfZZubdck7d1MIILECDHMudDAkhE7bj4TQ/exec";

const GOOGLE_SHEET_WEBHOOK_URL =
  process.env.GOOGLE_SHEET_CHAT_WEBHOOK_URL ||
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_CHAT_WEBHOOK_URL ||
  DEFAULT_GOOGLE_SHEET_WEBHOOK_URL;

export interface StickerBriefPayload {
  orderId: string;
  submittedAt: string;
  teacherName: string;
  contactInfo: string;
  packageCode: string;
  packageName: string;
  packagePrice: string;
  stickerCount: number;
  outfitStyle: string;
  publishMode: string;
  propsAndTrait: string;
  stickerTitleTh: string;
  stickerTitleEn: string;
  captions: string[];
  photoBase64?: string;
}

// Persistent in-memory cache on globalThis
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any;
if (!g.__stickerBriefOrders) g.__stickerBriefOrders = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const teacherName = String(body.teacherName || "").trim();
    const contactInfo = String(body.contactInfo || "").trim();
    const packageCode = String(body.packageCode || "STK-16").trim();
    const packageName = String(body.packageName || "Signature Teacher 16 Pack").trim();
    const packagePrice = String(body.packagePrice || "1,490 ฿").trim();
    const stickerCount = Number(body.stickerCount || 16);
    const outfitStyle = String(body.outfitStyle || "").trim();
    const publishMode = String(body.publishMode || "").trim();
    const propsAndTrait = String(body.propsAndTrait || "-").trim();
    const stickerTitleTh = String(body.stickerTitleTh || `ครู${teacherName}`).trim();
    const stickerTitleEn = String(body.stickerTitleEn || `Kru ${teacherName}`).trim();
    const captions: string[] = Array.isArray(body.captions)
      ? body.captions.map((c: unknown) => String(c || "").trim()).filter(Boolean)
      : [];
    const photoBase64: string | undefined =
      typeof body.photoBase64 === "string" && body.photoBase64.startsWith("data:image/")
        ? body.photoBase64
        : undefined;

    if (!teacherName) {
      return NextResponse.json(
        { error: "กรุณาระบุชื่อคุณครูผู้สั่งทำสติกเกอร์" },
        { status: 400 }
      );
    }

    const now = new Date();
    const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
    const randPart = Math.floor(1000 + Math.random() * 9000);
    const orderId = `STK-${datePart}-${randPart}`;

    const orderPayload: StickerBriefPayload = {
      orderId,
      submittedAt: now.toISOString(),
      teacherName,
      contactInfo,
      packageCode,
      packageName,
      packagePrice,
      stickerCount,
      outfitStyle,
      publishMode,
      propsAndTrait,
      stickerTitleTh,
      stickerTitleEn,
      captions,
      photoBase64,
    };

    // 1. Store in global memory (keep last 20 orders)
    g.__stickerBriefOrders.unshift(orderPayload);
    if (g.__stickerBriefOrders.length > 20) {
      g.__stickerBriefOrders.length = 20;
    }

    // 2. Upload photo to Telegram first (if photoBase64 is provided) to get Telegram file_id & visual alert
    let telegramPhotoFileId = "";
    if (photoBase64 && TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        const base64Data = photoBase64.replace(/^data:image\/\w+;base64,/, "");
        const imgBuffer = Buffer.from(base64Data, "base64");
        const mimeMatch = photoBase64.match(/^data:(image\/\w+);base64,/);
        const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";

        const formData = new FormData();
        formData.append("chat_id", TELEGRAM_CHAT_ID);
        formData.append(
          "caption",
          `📸 [รูปต้นแบบสติกเกอร์ LINE]\n🆔 รหัสงาน: ${orderId}\n👤 คุณครู: ${teacherName}\n📦 แพ็กเกจ: [${packageCode}] ${packageName} (${packagePrice})`
        );
        const blob = new Blob([imgBuffer], { type: mimeType });
        formData.append("photo", blob, `${orderId}_photo.jpg`);

        const tgPhotoRes = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (tgPhotoRes.ok) {
          const tgJson = await tgPhotoRes.json();
          const photos = tgJson?.result?.photo;
          if (Array.isArray(photos) && photos.length > 0) {
            telegramPhotoFileId = photos[photos.length - 1].file_id || "";
          }
        }
      } catch (err) {
        console.error("[StickerBriefAPI] Telegram photo upload failed:", err);
      }
    }

    // 3. Send full structured brief message to Kru Aon's Telegram (@AiAonhub_bot)
    const captionsFormatted = captions
      .map((c, idx) => `${String(idx + 1).padStart(2, "0")}. ${c}`)
      .join("\n");

    const telegramText =
      `🎨✨ [มีคุณครูส่งบรีฟสั่งทำสติกเกอร์ LINE ครบแล้ว!]\n` +
      `━━━━━━━━━━━━━━━\n` +
      `🆔 รหัสออเดอร์: ${orderId}\n` +
      `👤 ชื่อคุณครู: ${teacherName}\n` +
      `📱 ช่องทางติดต่อ: ${contactInfo || "-"}\n` +
      `📦 แพ็กเกจ: [${packageCode}] ${packageName} (${stickerCount} รูป • ${packagePrice})\n` +
      `👔 ชุดที่เลือก: ${outfitStyle}\n` +
      `🎸 พร็อพ/จุดเด่นใบหน้า: ${propsAndTrait}\n` +
      `🏷️ ชื่อชุด (TH/EN): ${stickerTitleTh} / ${stickerTitleEn}\n` +
      `🏪 การวางขาย: ${publishMode}\n` +
      `━━━━━━━━━━━━━━━\n` +
      `💬 คำพูดทั้ง ${captions.length} แอ็กชัน:\n${captionsFormatted}\n` +
      `━━━━━━━━━━━━━━━\n` +
      `🤖 สั่ง AI ใน Antigravity ได้ทันที เพียงพิมพ์ว่า:\n` +
      `"ดึงบรีฟสติกเกอร์ล่าสุดมาออกแบบให้ดูก่อน"`;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramText,
          }),
        });
      } catch (err) {
        console.error("[StickerBriefAPI] Telegram text send failed:", err);
      }
    }

    // 4. Persist brief JSON + telegramPhotoFileId to Google Sheets Cloud Vault (via upsert_lead)
    // So local PC script can pull the order 24/7 even across Vercel cold starts!
    if (GOOGLE_SHEET_WEBHOOK_URL) {
      try {
        const cloudRecord = {
          userId: `STICKER_ORDER_${orderId}`,
          displayName: `🎨 [สติกเกอร์] ${teacherName}`,
          status: "quoted",
          lastSeenAt: now.toISOString(),
          followUpCount: 0,
          lastItem: `[${packageCode}] ${packageName}`,
          lastAmount: parseInt(packagePrice.replace(/[^0-9]/g, ""), 10) || 1490,
          stickerBrief: {
            ...orderPayload,
            photoBase64: undefined, // keep Google Sheet cell under 50k chars; use telegramPhotoFileId or compact thumbnail
            telegramPhotoFileId,
            photoThumbnailBase64:
              photoBase64 && photoBase64.length < 38000 ? photoBase64 : undefined,
          },
        };

        await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "upsert_lead",
            lead: cloudRecord,
          }),
        });
      } catch (err) {
        console.error("[StickerBriefAPI] Cloud sheet persist error:", err);
      }
    }

    return NextResponse.json({
      status: "success",
      orderId,
      telegramPhotoFileId,
      message: "บันทึกบรีฟและส่งแจ้งเตือนถึงครูอ้นเรียบร้อยแล้วครับ!",
    });
  } catch (err) {
    console.error("[StickerBriefAPI] Error:", err);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการส่งข้อมูลบรีฟ กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "success",
    count: g.__stickerBriefOrders.length,
    orders: g.__stickerBriefOrders,
  });
}

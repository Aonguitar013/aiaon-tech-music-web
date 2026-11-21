import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || "8529471786:AAHI33E48vL4ic1J8tyszNAp7SwzkADaYKE";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "7731447826";

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
  telegramPhotoFileId?: string;
  telegramJsonFileId?: string;
}

// Persistent in-memory cache on globalThis
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any;
if (!g.__stickerBriefOrders) g.__stickerBriefOrders = [];

/**
 * Reads the currently pinned message in Telegram to extract existing Rolling Queue orders
 * so concurrent/multiple customer submissions (up to 15-20 orders) are accumulated without loss!
 */
async function fetchExistingPinnedQueue(): Promise<StickerBriefPayload[]> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return [];
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChat?chat_id=${TELEGRAM_CHAT_ID}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const pinned = data?.result?.pinned_message;
    const pinnedText: string = pinned?.text || pinned?.caption || "";

    // Check for multi-order queue format [[STICKER_QUEUE_JSON:[...]]]
    const queueMatch = pinnedText.match(/\[\[STICKER_QUEUE_JSON:(\[[\s\S]*\])\]\]/);
    if (queueMatch) {
      const parsed = JSON.parse(queueMatch[1]);
      if (Array.isArray(parsed)) return parsed;
    }

    // Backward compatibility: single-order format [[STICKER_ORDER_JSON:{...}]]
    const singleMatch = pinnedText.match(/\[\[STICKER_ORDER_JSON:(\{[\s\S]*\})\]\]/);
    if (singleMatch) {
      const parsed = JSON.parse(singleMatch[1]);
      if (parsed && parsed.orderId) return [parsed];
    }
  } catch (err) {
    console.error("[StickerBriefAPI] Error reading existing pinned queue:", err);
  }
  return [];
}

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

    // 1. Upload photo to Telegram first (if photoBase64 is provided) to get permanent Telegram file_id
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
      telegramPhotoFileId,
    };

    // 2. Upload full order.json as a Telegram Document to get permanent telegramJsonFileId
    let telegramJsonFileId = "";
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        const jsonBytes = Buffer.from(JSON.stringify(orderPayload, null, 2), "utf-8");
        const docForm = new FormData();
        docForm.append("chat_id", TELEGRAM_CHAT_ID);
        docForm.append(
          "caption",
          `📋 ไฟล์ข้อมูลบรีฟอัตโนมัติ (${orderId} - ${teacherName})`
        );
        docForm.append(
          "document",
          new Blob([jsonBytes], { type: "application/json" }),
          `${orderId}_brief.json`
        );

        const docRes = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`,
          {
            method: "POST",
            body: docForm,
          }
        );
        if (docRes.ok) {
          const docJson = await docRes.json();
          telegramJsonFileId = docJson?.result?.document?.file_id || "";
          orderPayload.telegramJsonFileId = telegramJsonFileId;
        }
      } catch (err) {
        console.error("[StickerBriefAPI] Telegram document upload failed:", err);
      }
    }

    // 3. Read existing pinned queue and prepend this new order (Rolling Queue of up to 15 orders)
    //    Each item in the pinned queue stores compact metadata + telegramJsonFileId + telegramPhotoFileId
    //    so even 15-20 concurrent orders easily fit inside Telegram's 4096-char message limit!
    const existingQueue = await fetchExistingPinnedQueue();
    const compactEntry: StickerBriefPayload = {
      orderId,
      submittedAt: orderPayload.submittedAt,
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
      telegramPhotoFileId,
      telegramJsonFileId,
    };

    const mergedQueue: StickerBriefPayload[] = [
      compactEntry,
      ...existingQueue.filter((item) => item.orderId !== orderId),
    ].slice(0, 15);

    // Ensure the serialized queue fits comfortably within 3000 chars; if very large, keep full captions on top 5 and rely on telegramJsonFileId for older ones
    let queueJsonStr = JSON.stringify(mergedQueue);
    if (queueJsonStr.length > 2800) {
      const slimQueue = mergedQueue.map((item, idx) =>
        idx < 4 ? item : { ...item, captions: [] }
      );
      queueJsonStr = JSON.stringify(slimQueue);
    }

    const captionsFormatted = captions
      .map((c, idx) => `${String(idx + 1).padStart(2, "0")}. ${c}`)
      .join("\n");

    const telegramText =
      `🎨✨ [มีคุณครูส่งบรีฟสั่งทำสติกเกอร์ LINE ครบแล้ว!] (คิวสะสม ${mergedQueue.length} รายการ)\n` +
      `━━━━━━━━━━━━━━━\n` +
      `🆔 รหัสออเดอร์ล่าสุด: ${orderId}\n` +
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
      `"/sticker"\n\n` +
      `[[STICKER_QUEUE_JSON:${queueJsonStr}]]`;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        const msgRes = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: TELEGRAM_CHAT_ID,
              text: telegramText,
            }),
          }
        );

        if (msgRes.ok) {
          const msgJson = await msgRes.json();
          const messageId = msgJson?.result?.message_id;
          if (messageId) {
            await fetch(
              `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/pinChatMessage`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: TELEGRAM_CHAT_ID,
                  message_id: messageId,
                  disable_notification: true,
                }),
              }
            );
          }
        }
      } catch (err) {
        console.error("[StickerBriefAPI] Telegram text/pin send failed:", err);
      }
    }

    // Store in memory cache as well
    g.__stickerBriefOrders = mergedQueue;

    return NextResponse.json({
      status: "success",
      orderId,
      queueSize: mergedQueue.length,
      telegramPhotoFileId,
      telegramJsonFileId,
      message: "บันทึกบรีฟเข้าคิวและส่งแจ้งเตือนถึงครูอ้นเรียบร้อยแล้วครับ!",
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

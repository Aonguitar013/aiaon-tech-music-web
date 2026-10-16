import { NextRequest, NextResponse } from "next/server";
import { consultAiSalesBrain } from "@/services/ai-sales-brain";
import { harvestChatMessage } from "@/services/chat-harvester";
import {
  replyToYouTubeComment,
  isChannelOwnerComment,
} from "@/services/youtube-service";

const DEFAULT_TELEGRAM_BOT_TOKEN = "8529471786:AAHI33E48vL4ic1J8tyszNAp7SwzkADaYKE";
const DEFAULT_TELEGRAM_CHAT_ID = "7731447826";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || DEFAULT_TELEGRAM_CHAT_ID;

async function notifyTelegram(message: string): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });
  } catch (err) {
    console.error("[YouTubeWebhook] Telegram alert error:", err);
  }
}

/**
 * GET: Healthcheck for YouTube webhook
 */
export async function GET() {
  return NextResponse.json({
    status: "active",
    service: "AiAon Tech — YouTube Comment AI Sales Brain Webhook",
    channel: "@aiaontech",
    time: new Date().toISOString(),
  });
}

/**
 * POST: Receive YouTube comment payload and process with AI Sales Brain
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      commentId,
      threadId,
      videoId,
      authorDisplayName,
      authorChannelId,
      text,
    } = body;

    if (!commentId || !text) {
      return NextResponse.json(
        { error: "Missing commentId or text" },
        { status: 400 }
      );
    }

    // 1. Skip if posted by channel owner to prevent answering ourselves
    if (isChannelOwnerComment(authorChannelId, authorDisplayName)) {
      return NextResponse.json({
        status: "skipped_owner",
        message: "Comment authored by channel owner",
      });
    }

    console.log(
      `\n🔴 [YouTubeWebhook] ได้รับคอมเมนต์ใหม่จาก: ${authorDisplayName} (${authorChannelId || "unknown"})`
    );
    console.log(`💬 เนื้อหาคอมเมนต์: "${text}"`);

    // 2. Consult AI Sales Brain tailored for YouTube
    const brainResponse = await consultAiSalesBrain({
      userText: text,
      userId: authorChannelId || authorDisplayName,
      displayName: authorDisplayName || "ผู้ชม YouTube",
      channel: "youtube",
    });

    const replyText = brainResponse.replyText.trim();
    console.log(`🤖 [YouTubeWebhook] AI Sales Brain คำนวณคำตอบ:\n${replyText}\n`);

    // 3. Post reply via YouTube Data API v3
    const replyResult = await replyToYouTubeComment(commentId, replyText);

    if (replyResult.success) {
      console.log(`✅ [YouTubeWebhook] ส่งคอมเมนต์ตอบกลับบน YouTube สำเร็จ! (ID: ${replyResult.commentId})`);
    } else {
      console.warn(`⚠️ [YouTubeWebhook] ส่งคอมเมนต์ตอบกลับไม่ได้: ${replyResult.error}`);
    }

    // 4. Harvest into Google Sheets Vault for Golden Dataset
    harvestChatMessage({
      userId: authorChannelId || authorDisplayName,
      displayName: authorDisplayName || "ผู้ชม YouTube",
      sender: "customer",
      message: text,
      status: "inquiry",
      intent: brainResponse.detectedIntent,
      product: brainResponse.suggestedItem,
    });

    harvestChatMessage({
      userId: authorChannelId || authorDisplayName,
      displayName: "ครูอ้น (YouTube AI Brain)",
      sender: "ai_brain",
      message: replyText,
      status: "inquiry",
      intent: brainResponse.detectedIntent,
      product: brainResponse.suggestedItem,
    });

    // 5. Notify Kru Aon via Telegram
    const videoUrl = videoId ? `https://youtu.be/${videoId}` : "https://www.youtube.com/@aiaontech";
    const statusIcon = replyResult.success ? "✅ โพสต์ตอบกลับแล้ว" : "⚠️ รอต่อกุญแจ OAuth";
    const telegramMsg = `🔴 <b>YouTube Comment AI Brain</b>\n\n` +
      `👤 <b>ผู้ชม:</b> ${authorDisplayName}\n` +
      `📹 <b>วิดีโอ:</b> ${videoUrl}\n` +
      `💬 <b>คอมเมนต์:</b> "${text}"\n\n` +
      `🤖 <b>ครูอ้น AI ตอบกลับ (${statusIcon}):</b>\n` +
      `<i>${replyText}</i>`;

    notifyTelegram(telegramMsg).catch(() => {});

    return NextResponse.json({
      success: true,
      commentId,
      replyText,
      replyResult,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[YouTubeWebhook] Handler Exception:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

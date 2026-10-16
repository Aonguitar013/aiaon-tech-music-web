import { NextRequest, NextResponse } from "next/server";
import { consultAiSalesBrain } from "@/services/ai-sales-brain";
import { getLead, recordLeadInteraction } from "@/services/lead-tracker";
import { harvestChatMessage } from "@/services/chat-harvester";
import {
  sendTikTokMessage,
  replyToTikTokComment,
} from "@/services/tiktok-service";
import {
  executeSlipVerification,
  pendingOrders,
  getPromptPayQrImageUrl,
} from "@/services/slip-verification";

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
    console.error("[TikTokWebhook] Telegram alert error:", err);
  }
}

/**
 * GET: Webhook Challenge verification (TikTok Developers & Bridge Webhooks)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const challenge = searchParams.get("challenge") || searchParams.get("hub.challenge");

  if (challenge) {
    return new Response(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return NextResponse.json({
    status: "active",
    service: "AiAon Tech — TikTok 24/7 AI Sales Brain Webhook",
    channel: "@iaontech",
    time: new Date().toISOString(),
  });
}

/**
 * POST: Ingest TikTok Direct Messages, Slip Images & Video Comments
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Support TikTok Challenge in POST body
    if (body.challenge) {
      return NextResponse.json({ challenge: body.challenge });
    }

    // Extract fields (supports both Native TikTok webhook structure and Universal / ManyChat bridge payload)
    let eventType: "message" | "comment" = "message";
    let userId = "";
    let displayName = "ลูกค้า TikTok";
    let text = "";
    let imageUrl = "";
    let videoId = "";
    let commentId = "";

    // A. Native TikTok Webhook format
    if (body.event) {
      if (body.event === "video.comment.receive" || body.type === "comment") {
        eventType = "comment";
      }
      userId = body.user?.open_id || body.open_id || body.from_user_id || body.userId || "";
      displayName = body.user?.display_name || body.displayName || "ลูกค้า TikTok";
      text = body.content?.text || body.text || body.message || "";
      imageUrl = body.content?.image_url || body.imageUrl || "";
      videoId = body.content?.video_id || body.videoId || "";
      commentId = body.content?.comment_id || body.commentId || "";
    }
    // B. Direct JSON / ManyChat / Custom Bridge format
    else {
      userId = body.userId || body.openId || body.senderId || "tiktok_anon";
      displayName = body.displayName || body.username || "ลูกค้า TikTok";
      text = body.text || body.message || "";
      imageUrl = body.imageUrl || body.slipUrl || "";
      videoId = body.videoId || "";
      commentId = body.commentId || "";
      if (body.type === "comment" || body.commentId) {
        eventType = "comment";
      }
    }

    if (!userId && !text && !imageUrl) {
      return NextResponse.json({ status: "ignored_empty_payload" }, { status: 200 });
    }

    console.log(`\n🎵 [TikTokWebhook] ตรวจพบ Event (${eventType}) จาก: ${displayName} (${userId})`);

    // ── 1. HANDLE SLIP IMAGE VERIFICATION (5-LAYER ZERO-TRUST) ──
    if (imageUrl) {
      console.log(`🧾 [TikTokWebhook] ได้รับรูปภาพสลิปจาก TikTok: ${imageUrl}`);
      try {
        const imageRes = await fetch(imageUrl);
        if (imageRes.ok) {
          const arrayBuffer = await imageRes.arrayBuffer();
          const contentType = imageRes.headers.get("content-type") || "image/jpeg";

          // If pending order doesn't exist, check history to recover order
          if (!pendingOrders.has(userId)) {
            const currentLead = getLead(userId);
            if (currentLead && currentLead.conversationHistory.length > 0) {
              for (let i = currentLead.conversationHistory.length - 1; i >= 0; i--) {
                const msg = currentLead.conversationHistory[i];
                if (msg.role === "assistant" && msg.text.includes("฿")) {
                  const match = msg.text.match(/(\d{3,5})\s*฿/);
                  if (match) {
                    const parsedAmount = parseInt(match[1], 10);
                    pendingOrders.set(userId, {
                      userId,
                      itemTitle: "ระบบ/แพ็กเกจที่เลือกไว้ในแชต TikTok",
                      baseAmount: parsedAmount,
                      vipAmount: 0,
                      isVipSelected: false,
                      orderedAt: new Date().toISOString(),
                      status: "pending_slip",
                    });
                    break;
                  }
                }
              }
            }
          }

          const verification = await executeSlipVerification({
            imageBuffer: arrayBuffer,
            contentType,
            userId,
            customerName: displayName,
            channel: "TikTok Direct",
          });

          if (verification.status !== "not_a_slip" && verification.replyText) {
            await sendTikTokMessage(userId, { text: verification.replyText });
            return NextResponse.json({
              success: true,
              slipStatus: verification.status,
              replyText: verification.replyText,
            });
          }
        }
      } catch (err) {
        console.error("[TikTokWebhook] Slip processing error:", err);
      }
    }

    // ── 2. HANDLE VIDEO COMMENTS ──
    if (eventType === "comment") {
      console.log(`💬 คอมเมนต์ TikTok: "${text}"`);

      // Consult AI Brain tailored for TikTok comments
      const brainResult = await consultAiSalesBrain({
        userText: text,
        userId,
        displayName,
        channel: "tiktok",
      });

      const replyText = brainResult.replyText.trim();

      if (commentId && videoId) {
        await replyToTikTokComment(commentId, videoId, replyText);
      }

      // Harvest to Google Sheets
      harvestChatMessage({
        userId,
        displayName: `[TikTok Comment] ${displayName}`,
        sender: "customer",
        message: text,
        status: "inquiry",
        intent: brainResult.detectedIntent,
        product: brainResult.suggestedItem,
      });

      harvestChatMessage({
        userId,
        displayName: "ครูอ้น (TikTok AI Brain)",
        sender: "ai_brain",
        message: replyText,
        status: "inquiry",
        intent: brainResult.detectedIntent,
        product: brainResult.suggestedItem,
      });

      // Telegram notification
      notifyTelegram(
        `🎵 <b>[TikTok Comment AI Brain]</b>\n` +
          `👤 <b>ผู้ใช้:</b> ${displayName}\n` +
          `💬 <b>คอมเมนต์:</b> "${text}"\n\n` +
          `🤖 <b>ครูอ้น AI ตอบกลับ:</b>\n<i>${replyText}</i>`
      ).catch(() => {});

      return NextResponse.json({
        success: true,
        type: "comment",
        replyText,
      });
    }

    // ── 3. HANDLE DIRECT MESSAGES (DM) ──
    const userText = text.trim();
    if (!userText) {
      return NextResponse.json({ status: "no_text" });
    }

    // Check if user is sending email after slip approval
    const emailMatch = userText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch && userText.length < 180) {
      const existingOrder = pendingOrders.get(userId);
      if (existingOrder && existingOrder.status === "verified_paid") {
        existingOrder.customerEmail = emailMatch[0].toLowerCase();
        pendingOrders.set(userId, existingOrder);

        await notifyTelegram(
          `📧 <b>[บันทึกอีเมลลูกค้า TikTok สำเร็จ]</b>\n` +
            `👤 ลูกค้า: <b>${displayName}</b>\n` +
            `📦 สินค้า: ${existingOrder.itemTitle}\n` +
            `📬 อีเมล: <code>${existingOrder.customerEmail}</code>`
        );

        const emailAck = `ได้รับข้อมูลอีเมล (${existingOrder.customerEmail}) บันทึกเข้าระบบสิทธิ์อัปเดตตลอดชีพเรียบร้อยครับ! หากต้องการสอบถามหรือติดปัญหาตรงไหน ทักมาหาครูอ้นใน TikTok ได้ตลอดเลยนะครับผม ขอบคุณมากครับ 🙏✨`;
        await sendTikTokMessage(userId, { text: emailAck });
        return NextResponse.json({ success: true, replyText: emailAck });
      }
    }

    // Harvest to Google Sheets
    harvestChatMessage({
      userId,
      displayName: `[TikTok DM] ${displayName}`,
      sender: "customer",
      message: userText,
      status: "inquiry",
    });

    const currentLead = getLead(userId);
    const recentHistory = currentLead?.conversationHistory || [];

    // Consult AI Sales Brain
    const brainResult = await consultAiSalesBrain({
      userText,
      userId,
      displayName,
      recentHistory,
      channel: "tiktok",
    });

    let replyPayloadText = brainResult.replyText;
    let qrUrl = "";

    // If PromptPay QR suggested, create pending order and attach QR
    if (brainResult.shouldAttachPromptPayQr && brainResult.suggestedAmount) {
      const amount = brainResult.suggestedAmount;
      const itemTitle = brainResult.suggestedItem || "ระบบนวัตกรรมจาก AiAon Tech";
      qrUrl = getPromptPayQrImageUrl(amount);

      pendingOrders.set(userId, {
        userId,
        itemTitle,
        baseAmount: amount,
        vipAmount: 0,
        isVipSelected: false,
        orderedAt: new Date().toISOString(),
        status: "pending_slip",
      });

      console.log(`[TikTokWebhook] Opened pending order for ${userId}: ${itemTitle} (${amount} ฿)`);
    }

    await sendTikTokMessage(userId, {
      text: replyPayloadText,
      imageUrl: qrUrl || undefined,
    });

    // Record interaction in lead tracker
    recordLeadInteraction({
      userId,
      displayName: `[TikTok] ${displayName}`,
      userText,
      assistantReply: replyPayloadText,
      status: "inquiry",
      item: brainResult.suggestedItem,
      amount: brainResult.suggestedAmount,
    });

    // Notify Telegram
    const qrAlert = qrUrl ? `\n💰 <b>ยอดเงิน:</b> ${brainResult.suggestedAmount} ฿` : "";
    notifyTelegram(
      `🎵 <b>[TikTok DM ได้รับข้อความใหม่]</b>\n` +
        `👤 <b>ลูกค้า:</b> ${displayName}\n` +
        `💬 <b>ข้อความ:</b> "${userText}"\n\n` +
        `🤖 <b>AI ตอบกลับ:</b>\n<i>${replyPayloadText}</i>${qrAlert}`
    ).catch(() => {});

    return NextResponse.json({
      success: true,
      type: "message",
      replyText: replyPayloadText,
      promptPayQrUrl: qrUrl || undefined,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[TikTokWebhook] Handler Exception:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

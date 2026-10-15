import { NextRequest, NextResponse } from "next/server";
import { consultAiSalesBrain } from "@/services/ai-sales-brain";
import { getLead, recordLeadInteraction } from "@/services/lead-tracker";
import { harvestChatMessage } from "@/services/chat-harvester";
import {
  sendInstagramMessage,
  sendInstagramCommentReply,
  sendInstagramPrivateReply,
  getInstagramUserProfile,
} from "@/services/instagram-messenger";
import {
  executeSlipVerification,
  pendingOrders,
  getPromptPayQrImageUrl,
} from "@/services/slip-verification";

// Webhook Verification Token (Configure in Meta for Developers)
const IG_VERIFY_TOKEN =
  process.env.IG_VERIFY_TOKEN ||
  process.env.INSTAGRAM_VERIFY_TOKEN ||
  process.env.FB_VERIFY_TOKEN ||
  "aiaon_fb_secret_2026";

// Telegram Bot Alert
const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || "8529471786:AAHI33E48vL4ic1J8tyszNAp7SwzkADaYKE";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "7731447826";

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
    console.error("[InstagramWebhook] Telegram alert error:", err);
  }
}

/**
 * 1. GET: Verification Challenge from Meta for Developers (Instagram Webhook)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === IG_VERIFY_TOKEN) {
    console.log("[InstagramWebhook] Meta Instagram Webhook verified successfully! 🚀");
    return new Response(challenge || "", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  console.warn("[InstagramWebhook] Meta Webhook verification failed. Token mismatch.");
  return new Response("Forbidden", { status: 403 });
}

/**
 * 2. POST: Ingest Instagram Direct Messages & Post/Reel Comments
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Verify object type is "instagram" or "page"
    if (body.object !== "instagram" && body.object !== "page") {
      return NextResponse.json({ status: "not_an_instagram_event" }, { status: 404 });
    }

    if (Array.isArray(body.entry)) {
      for (const entry of body.entry) {
        const pageOrIgId = entry.id;

        // A. Handle Direct Messaging Events (entry.messaging)
        if (Array.isArray(entry.messaging)) {
          for (const event of entry.messaging) {
            await handleInstagramMessageEvent(event, pageOrIgId);
          }
        }

        // B. Handle Instagram Comments / Changes (entry.changes) -> Comment-to-DM!
        if (Array.isArray(entry.changes)) {
          for (const change of entry.changes) {
            if (change.field === "comments") {
              await handleInstagramCommentEvent(change.value, pageOrIgId);
            }
          }
        }
      }
    }

    return NextResponse.json({ status: "EVENT_RECEIVED" });
  } catch (err) {
    console.error("[InstagramWebhook] Error handling event:", err);
    return NextResponse.json({ status: "error", message: String(err) }, { status: 200 });
  }
}

/**
 * Process Instagram Direct Messages (Text & Slip Images)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleInstagramMessageEvent(event: any, pageOrIgId: string) {
  const senderId = event.sender?.id;
  if (!senderId || senderId === pageOrIgId) return;

  // Skip echo messages (sent by page admin or bot itself)
  if (event.message?.is_echo) return;

  const userProfile = await getInstagramUserProfile(senderId);
  const displayName = userProfile.name || userProfile.username || "ลูกค้า Instagram";
  const userId = `ig_${senderId}`;

  // ── A. HANDLE INCOMING IMAGE ATTACHMENTS (5-LAYER BANK SLIP VERIFICATION) ──
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageAttachment = event.message?.attachments?.find((att: any) => att.type === "image");
  if (imageAttachment?.payload?.url) {
    try {
      const imgRes = await fetch(imageAttachment.payload.url);
      if (imgRes.ok) {
        const contentType = imgRes.headers.get("content-type") || "image/jpeg";
        const arrayBuffer = await imgRes.arrayBuffer();

        // If in-memory pending order was lost due to Vercel cold start,
        // reconstitute the order from recent Lead Tracker conversation history!
        if (!pendingOrders.has(userId)) {
          const currentLead = getLead(userId);
          const history = currentLead?.conversationHistory || [];
          for (let i = history.length - 1; i >= 0; i--) {
            const msg = history[i];
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
                    `[InstagramWebhook] Reconstituted pending order from lead history: ${itemTitle} (${parsedAmount} ฿)`
                  );
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
          channel: "Instagram Direct",
        });

        if (verification.status !== "not_a_slip" && verification.replyText) {
          await sendInstagramMessage(senderId, { text: verification.replyText });
          return;
        }
      }
    } catch (err) {
      console.error("[InstagramWebhook] Slip image processing error:", err);
    }
  }

  // ── B. HANDLE INCOMING TEXT MESSAGE ──
  const userText = event.message?.text?.trim();
  if (!userText) return;

  // Check if user is sending their email after slip approval
  const emailMatch = userText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch && userText.length < 180) {
    const existingOrder = pendingOrders.get(userId);
    if (existingOrder && existingOrder.status === "verified_paid") {
      existingOrder.customerEmail = emailMatch[0].toLowerCase();
      pendingOrders.set(userId, existingOrder);

      await notifyTelegram(
        `📧 <b>[บันทึกอีเมลลูกค้า Instagram สำเร็จ]</b>\n` +
          `👤 ลูกค้า: <b>${displayName}</b> (@${userProfile.username || "ig_user"})\n` +
          `📦 สินค้า: ${existingOrder.itemTitle}\n` +
          `📬 อีเมล: <code>${existingOrder.customerEmail}</code>`
      );

      await sendInstagramMessage(senderId, {
        text: `ได้รับข้อมูลอีเมล (${existingOrder.customerEmail}) บันทึกเข้าระบบสิทธิ์อัปเดตตลอดชีพเรียบร้อยครับ! หากต้องการสอบถามหรือติดปัญหาตรงไหน ทักมาหาครูอ้นใน IG ได้ตลอดเวลานะครับผม ขอบคุณมากครับ 🙏✨`,
      });
      return;
    }
  }

  // 1. Harvest customer chat to Google Sheets
  harvestChatMessage({
    userId,
    displayName: `[IG] ${displayName}`,
    sender: "customer",
    message: userText,
    status: "inquiry",
  });

  // 2. Fetch conversation history from Lead Tracker
  const currentLead = getLead(userId);
  const recentHistory = currentLead?.conversationHistory || [];

  // 3. Consult AI Sales Brain (Gemini 3.5 Flash-Lite + Master Knowledge)
  const brainResult = await consultAiSalesBrain({
    userText,
    userId,
    displayName,
    recentHistory,
  });

  // 4. Send AI reply back to Instagram Direct
  await sendInstagramMessage(senderId, { text: brainResult.replyText });

  // If PromptPay QR is suggested, record pending order & send QR image
  if (brainResult.shouldAttachPromptPayQr && brainResult.suggestedAmount) {
    const amount = brainResult.suggestedAmount;
    const itemTitle = brainResult.suggestedItem || "ระบบนวัตกรรมจาก AiAon Tech";
    const qrUrl = getPromptPayQrImageUrl(amount);

    pendingOrders.set(userId, {
      userId,
      itemTitle,
      baseAmount: amount,
      vipAmount: 0,
      isVipSelected: false,
      orderedAt: new Date().toISOString(),
      status: "pending_slip",
    });

    await sendInstagramMessage(senderId, {
      attachment: {
        type: "image",
        payload: {
          url: qrUrl,
          is_reusable: true,
        },
      },
    });

    await notifyTelegram(
      `🔔 <b>[AI Sales Brain ปิดการขายใน Instagram Direct]</b>\n` +
        `👤 ลูกค้า: <b>${displayName}</b> (@${userProfile.username || "ig_user"})\n` +
        `📦 สินค้า: <b>${itemTitle}</b>\n` +
        `💵 ยอดชำระ: <b>${amount.toLocaleString()} บาท</b>\n` +
        `💬 ข้อความลูกค้า: "${userText}"\n` +
        `📲 ส่งรูป QR พร้อมเพย์ให้ลูกค้าในแชต IG เรียบร้อยแล้ว (รอตรวจสลิป)`
    );
  }

  // 5. Record lead interaction
  recordLeadInteraction({
    userId,
    displayName,
    userText,
    assistantReply: brainResult.replyText,
    status: currentLead?.status || "inquiry",
    item: brainResult.suggestedItem,
    amount: brainResult.suggestedAmount,
    isEscalated: brainResult.shouldEscalateTelegram,
  });

  // 6. Telegram Copilot Alert if human escalation is needed
  if (brainResult.shouldEscalateTelegram) {
    await notifyTelegram(
      `🚨 <b>[AiAon Instagram Copilot Alert]</b>\n` +
        `👤 ลูกค้า: <b>${displayName}</b> (ID: <code>${senderId}</code>)\n` +
        `💬 ข้อความ: "${userText}"\n` +
        `🤖 AI ประเมิน: ต้องการให้ครูอ้นช่วยตอบโดยตรงใน IG\n` +
        `🔗 <a href="https://business.facebook.com/latest/inbox">เปิดกล่องข้อความ Instagram Direct</a>`
    );
  }
}

/**
 * Process Instagram Post / Reel Comment & Auto Comment-to-DM Private Reply
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleInstagramCommentEvent(value: any, pageOrIgId: string) {
  const commentId = value.id;
  const commenterId = value.from?.id;
  const commenterUsername = value.from?.username || "คุณลูกค้า";
  const commentText = value.text?.trim();

  // Don't reply to our own comments
  if (!commentId || !commentText || commenterId === pageOrIgId) return;

  console.log(
    `[InstagramWebhook] Received comment from @${commenterUsername}: "${commentText}"`
  );

  // 1. Reply to comment publicly on post / Reel
  const publicReply = `สวัสดีครับคุณ @${commenterUsername} 😊 ครูอ้นส่งรายละเอียดและตัวอย่างระบบให้ในกล่องข้อความ Direct เรียบร้อยแล้วนะครับ แวะเช็คดูได้เลยครับ ✨`;
  await sendInstagramCommentReply(commentId, publicReply);

  // 2. Consult AI Sales Brain for private DM reply
  const brainResult = await consultAiSalesBrain({
    userText: commentText,
    userId: `ig_${commenterId}`,
    displayName: commenterUsername,
  });

  // 3. Send Private Reply directly into their Instagram Direct!
  const privateGreeting =
    `สวัสดีครับคุณ @${commenterUsername} (จากที่คอมเมนต์ใต้โพสต์/Reel ใน Instagram ครับ) 🙏\n\n` +
    brainResult.replyText;

  await sendInstagramPrivateReply(commentId, privateGreeting);

  // 4. Harvest to Google Sheet
  harvestChatMessage({
    userId: `ig_${commenterId}`,
    displayName: `[IG Comment] @${commenterUsername}`,
    sender: "customer",
    message: `[Comment ใต้โพสต์/Reel] ${commentText}`,
    intent: "IG_COMMENT_TO_DM",
    status: "inquiry",
    product: brainResult.suggestedItem,
  });

  // 5. Notify Telegram
  await notifyTelegram(
    `📸 <b>[AiAon Instagram Comment-to-DM]</b>\n` +
      `👤 <b>@${commenterUsername}</b> คอมเมนต์ใต้โพสต์/Reel:\n` +
      `💬 "${commentText}"\n` +
      `⚡ บอท AI เม้นต์ตอบกลับ + ทัก DM ส่งรายละเอียดเข้าข้อความส่วนตัวเรียบร้อยแล้ว!`
  );
}

import { NextRequest, NextResponse } from "next/server";
import { consultAiSalesBrain } from "@/services/ai-sales-brain";
import { getLead, recordLeadInteraction } from "@/services/lead-tracker";
import { harvestChatMessage } from "@/services/chat-harvester";
import {
  sendFacebookMessage,
  sendFacebookCommentReply,
  sendFacebookPrivateReply,
  getFacebookUserProfile,
  getFacebookConversationHistory,
} from "@/services/facebook-messenger";
import {
  executeSlipVerification,
  pendingOrders,
  getPromptPayQrImageUrl,
} from "@/services/slip-verification";

// Webhook Verification Token (Configure in Meta for Developers)
const FB_VERIFY_TOKEN =
  process.env.FB_VERIFY_TOKEN ||
  process.env.FACEBOOK_VERIFY_TOKEN ||
  "";

// Telegram Bot Alert
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

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
    console.error("[FacebookWebhook] Telegram alert error:", err);
  }
}

/**
 * 1. GET: Verification Challenge from Meta for Developers
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === FB_VERIFY_TOKEN) {
    console.log("[FacebookWebhook] Meta Webhook verified successfully! 🚀");
    return new Response(challenge || "", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  console.warn("[FacebookWebhook] Meta Webhook verification failed. Token mismatch.");
  return new Response("Forbidden", { status: 403 });
}

/**
 * 2. POST: Ingest Messenger & Feed/Comment Events from Facebook Page
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Verify object type is "page"
    if (body.object !== "page") {
      return NextResponse.json({ status: "not_a_page_event" }, { status: 404 });
    }

    // Process entries asynchronously to guarantee immediate 200 OK to Meta
    if (Array.isArray(body.entry)) {
      for (const entry of body.entry) {
        const pageId = entry.id;

        // A. Handle Direct Messenger Events (entry.messaging)
        if (Array.isArray(entry.messaging)) {
          for (const event of entry.messaging) {
            await handleMessengerEvent(event, pageId);
          }
        }

        // B. Handle Post Comment / Feed Events (entry.changes) -> Comment-to-Inbox!
        if (Array.isArray(entry.changes)) {
          for (const change of entry.changes) {
            if (change.field === "feed") {
              await handleFeedCommentEvent(change.value, pageId);
            }
          }
        }
      }
    }

    return NextResponse.json({ status: "EVENT_RECEIVED" });
  } catch (err) {
    console.error("[FacebookWebhook] Error handling event:", err);
    return NextResponse.json({ status: "error", message: String(err) }, { status: 200 });
  }
}

/**
 * Process Facebook Messenger Message (Text & Slip Images)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleMessengerEvent(event: any, pageId: string) {
  const senderId = event.sender?.id;
  if (!senderId || senderId === pageId) return;

  // Skip echo messages (messages sent by page admin or bot itself)
  if (event.message?.is_echo) return;

  const userProfile = await getFacebookUserProfile(senderId);
  const displayName = userProfile.name || "ลูกค้า Facebook";
  const userId = `fb_${senderId}`;

  // ── A. HANDLE INCOMING IMAGE ATTACHMENTS (5-LAYER BANK SLIP VERIFICATION) ──
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageAttachment = event.message?.attachments?.find((att: any) => att.type === "image");
  if (imageAttachment?.payload?.url) {
    try {
      const imgRes = await fetch(imageAttachment.payload.url);
      if (imgRes.ok) {
        const contentType = imgRes.headers.get("content-type") || "image/jpeg";
        const arrayBuffer = await imgRes.arrayBuffer();

        // If in-memory pending order was lost due to Vercel serverless cold start / redeploy,
        // reconstitute the order from recent Facebook conversation history!
        if (!pendingOrders.has(userId)) {
          const fbHistory = await getFacebookConversationHistory(senderId, 25);
          for (let i = fbHistory.length - 1; i >= 0; i--) {
            const msg = fbHistory[i];
            if (msg.role === "assistant") {
              const priceMatch = msg.text.match(/(?:ราคา|ยอด|เป็น|อยู่ที่|โอน)\s*(?:อยู่ที่)?\s*([0-9,]+)\s*(?:บาท|฿)/);
              if (priceMatch) {
                const parsedAmount = parseInt(priceMatch[1].replace(/,/g, ""), 10);
                if (parsedAmount > 0 && parsedAmount < 10000) {
                  const codeMatch = msg.text.match(/\(([A-Z0-9]+)\)/);
                  const itemTitle = codeMatch ? `ระบบ ${codeMatch[1]}` : "ระบบ/แพ็กเกจที่เลือกไว้ในแชต";
                  pendingOrders.set(userId, {
                    userId,
                    itemTitle,
                    baseAmount: parsedAmount,
                    vipAmount: 0,
                    isVipSelected: false,
                    orderedAt: new Date().toISOString(),
                    status: "pending_slip",
                  });
                  console.log(`[FacebookWebhook] Reconstituted pending order from Meta history: ${itemTitle} (${parsedAmount} ฿)`);
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
          channel: "Facebook Messenger",
        });

        // If it's a bank slip (approved or rejected or payment qr), reply directly
        if (verification.status !== "not_a_slip" && verification.replyText) {
          await sendFacebookMessage(senderId, { text: verification.replyText });
          return;
        }
      }
    } catch (err) {
      console.error("[FacebookWebhook] Slip image processing error:", err);
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
        `📧 <b>[บันทึกอีเมลลูกค้า Facebook สำเร็จ]</b>\n` +
        `👤 ลูกค้า: <b>${displayName}</b>\n` +
        `📦 สินค้า: ${existingOrder.itemTitle}\n` +
        `📬 อีเมล: <code>${existingOrder.customerEmail}</code>`
      );

      await sendFacebookMessage(senderId, {
        text: `ได้รับข้อมูลอีเมล (${existingOrder.customerEmail}) บันทึกเข้าระบบสิทธิ์อัปเดตตลอดชีพเรียบร้อยครับ! หากต้องการสอบถามหรือติดปัญหาตรงไหน ทักมาหาครูอ้นได้ตลอดเวลานะครับผม ขอบคุณมากครับ 🙏✨`,
      });
      return;
    }
  }

  // 1. Harvest customer chat to Google Sheets
  harvestChatMessage({
    userId,
    displayName: `[FB] ${displayName}`,
    sender: "customer",
    message: userText,
    status: "inquiry",
  });

  // 2. Fetch persistent conversation history directly from Meta Graph API
  const fbHistory = await getFacebookConversationHistory(senderId, 25);
  const currentLead = getLead(userId);
  const recentHistory = fbHistory.length > 0 ? fbHistory : currentLead?.conversationHistory;

  // 3. Consult AI Sales Brain (Gemini 2.5 Flash + Master Knowledge)
  const brainResult = await consultAiSalesBrain({
    userText,
    userId,
    displayName,
    recentHistory,
  });

  // 4. Send AI reply back to Facebook Messenger
  await sendFacebookMessage(senderId, { text: brainResult.replyText });

  // If promptpay QR is suggested, record pending order & send QR image
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

    await sendFacebookMessage(senderId, {
      attachment: {
        type: "image",
        payload: { url: qrUrl, is_reusable: true },
      },
    });

    await notifyTelegram(
      `🔔 <b>[AI Brain ปิดการขาย & ส่ง QR พร้อมเพย์ใน Facebook Messenger]</b>\n` +
      `👤 ลูกค้า: <b>${displayName}</b>\n` +
      `📦 สินค้า: ${itemTitle}\n` +
      `💵 ยอดชำระ: ${amount.toLocaleString()} บาท (รอรับสลิป)`
    );
  }

  // 4. Harvest AI response to Google Sheets
  harvestChatMessage({
    userId,
    displayName: `[FB] ${displayName}`,
    sender: "ai_brain",
    message: brainResult.replyText,
    intent: brainResult.detectedIntent,
    status: currentLead?.status || "inquiry",
    product: brainResult.suggestedItem,
    amount: brainResult.suggestedAmount,
  });

  // 5. Record both user turn and AI reply in lead tracker
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
      `🚨 <b>[AiAon Facebook Copilot Alert]</b>\n` +
      `👤 ลูกค้า: <b>${displayName}</b> (ID: <code>${senderId}</code>)\n` +
      `💬 ข้อความ: "${userText}"\n` +
      `🤖 AI ประเมิน: ต้องการให้ครูอ้นช่วยตอบโดยตรง\n` +
      `🔗 <a href="https://business.facebook.com/latest/inbox">เปิดกล่องข้อความเพจ Facebook</a>`
    );
  }
}

/**
 * Process Post Comment & Auto Comment-to-Inbox Private Reply
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleFeedCommentEvent(value: any, pageId: string) {
  if (value.item !== "comment" || value.verb !== "add") return;

  const commentId = value.comment_id;
  const commenterId = value.from?.id;
  const commenterName = value.from?.name || "คุณลูกค้า";
  const commentText = value.message?.trim();

  // Don't reply to our own page comments
  if (!commentId || !commentText || commenterId === pageId) return;

  console.log(`[FacebookWebhook] Received new post comment from ${commenterName}: "${commentText}"`);

  // 1. Reply to comment publicly on page post
  const publicReply = `สวัสดีครับคุณ ${commenterName} 😊 ครูอ้นส่งรายละเอียดสินค้า/โปรโมชั่นและตัวอย่างระบบให้ในกล่องข้อความ Inbox เรียบร้อยแล้วนะครับผม แวะเช็คดูได้เลยครับ ✨`;
  await sendFacebookCommentReply(commentId, publicReply);

  // 2. Consult AI Sales Brain for private inbox reply
  const brainResult = await consultAiSalesBrain({
    userText: commentText,
    userId: `fb_${commenterId}`,
    displayName: commenterName,
  });

  // 3. Send Private Reply directly into their Messenger Inbox!
  const privateGreeting =
    `สวัสดีครับคุณ ${commenterName} (จากที่คอมเมนต์ใต้โพสต์เพจ AiAon Tech ครับ) 🙏\n\n` +
    brainResult.replyText;

  await sendFacebookPrivateReply(commentId, privateGreeting);

  // 4. Harvest to Google Sheet
  harvestChatMessage({
    userId: `fb_${commenterId}`,
    displayName: `[FB Comment] ${commenterName}`,
    sender: "customer",
    message: `[Comment ใต้โพสต์] ${commentText}`,
    intent: "FB_COMMENT_TO_INBOX",
    status: "inquiry",
    product: brainResult.suggestedItem,
  });

  // 5. Notify Telegram
  await notifyTelegram(
    `📢 <b>[AiAon Facebook Post Comment-to-Inbox]</b>\n` +
    `👤 <b>${commenterName}</b> คอมเมนต์ใต้โพสต์:\n` +
    `💬 "${commentText}"\n` +
    `⚡ บอท AI เม้นต์ตอบหน้าโพสต์ + ทัก Inbox ส่งรายละเอียดให้เรียบร้อยแล้ว!`
  );
}

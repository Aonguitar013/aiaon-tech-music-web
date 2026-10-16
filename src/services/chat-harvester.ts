export interface ChatLogEntry {
  timestamp: string;
  userId: string;
  displayName: string;
  sender: "customer" | "ai_brain" | "kru_aon_manual";
  message: string;
  intent?: string;
  status: "inquiry" | "quoted" | "paid" | "escalated";
  product?: string;
  amount?: number;
  isGoldenCase?: boolean;
  transRef?: string;
}

const GOOGLE_SHEET_WEBHOOK_URL =
  process.env.GOOGLE_SHEET_CHAT_WEBHOOK_URL ||
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_CHAT_WEBHOOK_URL ||
  "";


/**
 * Send log entry to Google Sheets via Google Apps Script Web App
 */
async function postToGoogleSheets(entry: ChatLogEntry): Promise<void> {
  if (!GOOGLE_SHEET_WEBHOOK_URL) {
    // If webhook URL is not yet configured, skip silently
    return;
  }

  try {
    // 2-second timeout to avoid holding up the LINE webhook response
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);

    await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
      signal: controller.signal,
    }).finally(() => clearTimeout(timer));
  } catch (err) {
    console.error("[ChatHarvester] Failed to post to Google Sheets:", err);
  }
}

/**
 * Harvest a conversation message (from customer or AI reply)
 */
export async function harvestChatMessage(entry: Omit<ChatLogEntry, "timestamp">): Promise<void> {
  const fullEntry: ChatLogEntry = {
    ...entry,
    timestamp: new Date().toISOString(),
  };

  // Fire-and-forget push to Google Sheets
  postToGoogleSheets(fullEntry).catch(() => {});
}

/**
 * Flag an entire customer session as a "🏆 Golden Standard Chat"
 * when bank slip verification passes!
 */
export async function flagConversationAsGolden(params: {
  userId: string;
  displayName: string;
  product: string;
  amount: number;
  transRef: string;
}): Promise<void> {
  const { userId, displayName, product, amount, transRef } = params;

  const goldenEntry: ChatLogEntry = {
    timestamp: new Date().toISOString(),
    userId,
    displayName,
    sender: "ai_brain",
    message: `🏆 ปิดการขายสำเร็จ! ตรวจสลิปโอนเงินผ่านเรียบร้อย (Ref: ${transRef})`,
    intent: "CLOSED_DEAL",
    status: "paid",
    product,
    amount,
    isGoldenCase: true,
    transRef,
  };

  postToGoogleSheets(goldenEntry).catch(() => {});
}

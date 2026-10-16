import { NextRequest, NextResponse } from "next/server";
import {
  getFollowUpCandidates,
  recordFollowUpSent,
  getAllLeads,
  hydrateCloudStateFromSheets,
} from "@/services/lead-tracker";

const DEFAULT_LINE_TOKEN =
  "h4PDZZ6QCgNd4NhxB7YT8K6Hd2P8MHk3y3Fy7EMTcTbZy8/7xgxmxaF1YbSH9Bl3QMDvaiL9jDfqr21ZSpjYoIk2Czl5sqvSfH0zKztjev3ZQBWpP4QtVgjmxNgA/9Ka/B2+9X/G6ra/70ywdw/o8wdB04t89/1O/w1cDnyilFU=";

const LINE_ACCESS_TOKEN =
  process.env.LINE_CHANNEL_ACCESS_TOKEN || DEFAULT_LINE_TOKEN;
const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || "8529471786:AAHI33E48vL4ic1J8tyszNAp7SwzkADaYKE";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "7731447826";

async function notifyKruAonTelegram(text: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
    });
  } catch (err) {
    console.error("[FollowUp Telegram Alert Error]:", err);
  }
}

async function sendLinePushMessage(userId: string, text: string): Promise<boolean> {
  if (!LINE_ACCESS_TOKEN) return false;
  try {
    const res = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        to: userId,
        messages: [{ type: "text", text }],
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[FollowUp LINE Push Error]:", err);
    return false;
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const isVercelCron =
    req.headers.get("x-vercel-cron") === "1" ||
    req.headers.get("user-agent")?.includes("vercel-cron") ||
    false;

  const isExecute = url.searchParams.get("run") === "true" || isVercelCron;

  // Enforce CRON_SECRET verification whenever execution is triggered (via cron or ?run=true or POST)
  const cronSecret = process.env.CRON_SECRET;
  if (isExecute && cronSecret) {
    const authHeader = req.headers.get("authorization");
    const secretParam = url.searchParams.get("secret");
    if (authHeader !== `Bearer ${cronSecret}` && secretParam !== cronSecret) {
      return NextResponse.json({ error: "Unauthorized cron trigger" }, { status: 401 });
    }
  }

  // Hydrate latest Leads_State & Used_Slips from Google Sheets (3s timeout, safe fallback)
  await hydrateCloudStateFromSheets({ force: true, timeoutMs: 3000 });

  const candidates = getFollowUpCandidates();
  const allLeads = getAllLeads();

  if (!isExecute) {
    return NextResponse.json({
      status: "ready",
      message: "Automated Follow-up Engine is active.",
      totalTrackedLeads: allLeads.length,
      pendingCandidatesCount: candidates.length,
    });
  }

  // Execute follow-ups
  const executionResults = [];

  for (const candidate of candidates) {
    const success = await sendLinePushMessage(
      candidate.lead.userId,
      candidate.suggestedMessage
    );

    if (success) {
      recordFollowUpSent(candidate.lead.userId, candidate.suggestedMessage);
      executionResults.push({
        userId: candidate.lead.userId,
        displayName: candidate.lead.displayName,
        dripType: candidate.dripType,
        sent: true,
      });

      await notifyKruAonTelegram(
        `🤖 [AI ตามดูแลลูกค้าอัตโนมัติใน LINE OA]\n` +
          `👤 ลูกค้า: ${candidate.lead.displayName}\n` +
          `🏷️ ประเภท: ${candidate.dripType}\n` +
          `📦 รายการ: ${candidate.lead.lastItem || "สอบถามทั่วไป"}\n` +
          `💬 ข้อความที่ส่ง:\n${candidate.suggestedMessage.slice(0, 140)}...`
      );
    } else {
      executionResults.push({
        userId: candidate.lead.userId,
        displayName: candidate.lead.displayName,
        sent: false,
      });
    }
  }

  return NextResponse.json({
    status: "completed",
    executedCount: executionResults.length,
    results: executionResults,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  // Same execution logic for cron webhook triggers, preserving auth headers
  const targetUrl = req.url.includes("?") ? `${req.url}&run=true` : `${req.url}?run=true`;
  return GET(new NextRequest(targetUrl, { headers: req.headers }));
}

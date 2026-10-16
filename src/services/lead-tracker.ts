import fs from "fs";
import path from "path";
import os from "os";

export type LeadStatus = "inquiry" | "quoted" | "paid";

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface LeadRecord {
  userId: string;
  displayName: string;
  status: LeadStatus;
  lastItem?: string;
  lastAmount?: number;
  firstSeenAt: string;
  lastSeenAt: string;
  followUpCount: number;
  lastFollowUpAt?: string;
  conversationHistory: ChatMessage[];
  isEscalated?: boolean;
  verifiedRef?: string;
  notes?: string;
}

const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyPRw7GjvTv24XFfCsX73QMvPh4e9AFxxc6bfZZubdck7d1MIILECDHMudDAkhE7bj4TQ/exec";

const GOOGLE_SHEET_WEBHOOK_URL =
  process.env.GOOGLE_SHEET_CHAT_WEBHOOK_URL ||
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_CHAT_WEBHOOK_URL ||
  DEFAULT_GOOGLE_SHEET_WEBHOOK_URL;

function getLeadsFilePath(): string {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), ".leads_vault.json");
  }
  return path.join(process.cwd(), ".leads_vault.json");
}

const LEADS_FILE_PATH = getLeadsFilePath();

// Persistent L1 Fast In-Memory Cache across Next.js API reloads
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any;
if (!g.__usedSlipRefs) {
  g.__usedSlipRefs = new Set<string>();
}
if (!g.__leadTrackerMap) {
  g.__leadTrackerMap = new Map<string, LeadRecord>();
  loadLeadsFromFile();
}

const leadMap: Map<string, LeadRecord> = g.__leadTrackerMap;
const sharedUsedSlipRefs: Set<string> = g.__usedSlipRefs;

function loadLeadsFromFile() {
  try {
    if (fs.existsSync(LEADS_FILE_PATH)) {
      const raw = fs.readFileSync(LEADS_FILE_PATH, "utf8");
      const records: LeadRecord[] = JSON.parse(raw);
      if (Array.isArray(records)) {
        for (const rec of records) {
          if (rec?.userId) {
            leadMap.set(rec.userId, rec);
            if (rec.verifiedRef) {
              sharedUsedSlipRefs.add(rec.verifiedRef);
            }
          }
        }
      }
    }
  } catch (err) {
    console.error("[LeadTracker] Failed to read leads from disk:", err);
  }
}

function persistLeadsToFile() {
  try {
    const list = Array.from(leadMap.values());
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(list, null, 2), "utf8");
  } catch (err) {
    console.error("[LeadTracker] Failed to persist leads to disk:", err);
  }
}

/**
 * Non-blocking push of LeadRecord (and optional usedSlipRef) to Google Sheets L2 Cloud Storage
 */
export async function pushLeadStateToCloud(
  lead: LeadRecord,
  usedSlipRef?: string
): Promise<void> {
  if (!GOOGLE_SHEET_WEBHOOK_URL) return;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);

    await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "upsert_lead",
        lead,
        usedSlipRef: usedSlipRef || lead.verifiedRef || undefined,
      }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timer));
  } catch (err) {
    console.error("[LeadTracker] Non-blocking cloud sync error:", err);
  }
}

/**
 * Non-blocking push of a used slip reference to Google Sheets Used_Slips tab
 */
export async function recordUsedSlipToCloud(params: {
  transRef: string;
  userId: string;
  amount: number;
  product: string;
}): Promise<void> {
  if (!GOOGLE_SHEET_WEBHOOK_URL || !params.transRef) return;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);

    await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "record_slip",
        transRef: params.transRef,
        userId: params.userId,
        amount: params.amount,
        product: params.product,
        timestamp: new Date().toISOString(),
      }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timer));
  } catch (err) {
    console.error("[LeadTracker] Non-blocking record_slip error:", err);
  }
}

/**
 * Check if a slip transRef was already used in Google Sheets Used_Slips tab (3s timeout, safe fallback)
 */
export async function checkSlipUsedInCloud(
  transRef: string,
  timeoutMs = 2200
): Promise<boolean> {
  if (!transRef) return false;
  if (sharedUsedSlipRefs.has(transRef)) return true;
  if (!GOOGLE_SHEET_WEBHOOK_URL) return false;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const sep = GOOGLE_SHEET_WEBHOOK_URL.includes("?") ? "&" : "?";
    const url = `${GOOGLE_SHEET_WEBHOOK_URL}${sep}action=check_slip&ref=${encodeURIComponent(
      transRef
    )}`;

    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      cache: "no-store",
    }).finally(() => clearTimeout(timer));

    if (!res.ok) return false;
    const data = await res.json();
    if (data?.used === true) {
      sharedUsedSlipRefs.add(transRef);
      return true;
    }
    return false;
  } catch {
    // Safe fallback if network hiccups so chat doesn't crash
    return false;
  }
}

/**
 * Hydrate L1 in-memory caches (leadMap & usedSlipRefs) from Google Sheets on Cold Start or before Cron
 */
export async function hydrateCloudStateFromSheets(options?: {
  force?: boolean;
  timeoutMs?: number;
}): Promise<{ hydratedLeads: number; hydratedSlips: number }> {
  const force = options?.force ?? false;
  const timeoutMs = options?.timeoutMs ?? 3000;

  if (!GOOGLE_SHEET_WEBHOOK_URL) {
    return { hydratedLeads: 0, hydratedSlips: 0 };
  }

  const now = Date.now();
  const lastHydratedAt: number = g.__lastCloudHydratedAt || 0;

  // Skip if already hydrated recently (within 60s) unless forced or L1 cache is completely empty
  if (
    !force &&
    leadMap.size > 0 &&
    sharedUsedSlipRefs.size > 0 &&
    now - lastHydratedAt < 60_000
  ) {
    return { hydratedLeads: leadMap.size, hydratedSlips: sharedUsedSlipRefs.size };
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const sep = GOOGLE_SHEET_WEBHOOK_URL.includes("?") ? "&" : "?";
    const url = `${GOOGLE_SHEET_WEBHOOK_URL}${sep}action=export_leads`;

    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      cache: "no-store",
    }).finally(() => clearTimeout(timer));

    if (!res.ok) {
      return { hydratedLeads: leadMap.size, hydratedSlips: sharedUsedSlipRefs.size };
    }

    const data = await res.json();
    let hydratedLeadsCount = 0;
    let hydratedSlipsCount = 0;

    if (Array.isArray(data?.leads)) {
      for (const cloudLead of data.leads as LeadRecord[]) {
        if (!cloudLead?.userId) continue;
        const localLead = leadMap.get(cloudLead.userId);
        const cloudTime = new Date(cloudLead.lastSeenAt || 0).getTime();
        const localTime = localLead ? new Date(localLead.lastSeenAt || 0).getTime() : 0;

        if (!localLead || cloudTime >= localTime) {
          leadMap.set(cloudLead.userId, cloudLead);
          hydratedLeadsCount++;
        }
        if (cloudLead.verifiedRef) {
          sharedUsedSlipRefs.add(cloudLead.verifiedRef);
        }
      }
      if (hydratedLeadsCount > 0) {
        persistLeadsToFile();
      }
    }

    if (Array.isArray(data?.usedSlipRefs)) {
      for (const ref of data.usedSlipRefs) {
        if (typeof ref === "string" && ref.trim()) {
          sharedUsedSlipRefs.add(ref.trim());
          hydratedSlipsCount++;
        }
      }
    }

    g.__lastCloudHydratedAt = now;
    return { hydratedLeads: hydratedLeadsCount, hydratedSlips: hydratedSlipsCount };
  } catch (err) {
    console.warn("[LeadTracker] Cloud hydration skipped/timed out safely:", err);
    return { hydratedLeads: leadMap.size, hydratedSlips: sharedUsedSlipRefs.size };
  }
}

// Trigger non-blocking background hydration on module Cold Start if L1 cache is empty
if (leadMap.size === 0 && GOOGLE_SHEET_WEBHOOK_URL) {
  hydrateCloudStateFromSheets({ timeoutMs: 3000 }).catch(() => {});
}

/**
 * Get lead record by LINE User ID
 */
export function getLead(userId: string): LeadRecord | null {
  if (!userId) return null;
  return leadMap.get(userId) || null;
}

/**
 * Record a user interaction and assistant response
 */
export function recordLeadInteraction(params: {
  userId: string;
  displayName?: string;
  userText: string;
  assistantReply: string;
  status?: LeadStatus;
  item?: string;
  amount?: number;
  isEscalated?: boolean;
}): LeadRecord {
  const { userId, displayName, userText, assistantReply, status, item, amount, isEscalated } = params;
  const now = new Date().toISOString();

  let lead = leadMap.get(userId);

  if (!lead) {
    lead = {
      userId,
      displayName: displayName || `ลูกค้า (${userId.slice(0, 8)})`,
      status: status || "inquiry",
      lastItem: item,
      lastAmount: amount,
      firstSeenAt: now,
      lastSeenAt: now,
      followUpCount: 0,
      conversationHistory: [],
      isEscalated: isEscalated || false,
    };
  } else {
    lead.lastSeenAt = now;
    if (displayName) lead.displayName = displayName;
    if (status) lead.status = status;
    if (item) lead.lastItem = item;
    if (amount) lead.lastAmount = amount;
    if (isEscalated !== undefined) lead.isEscalated = isEscalated;
  }

  // Append to conversation history (keep last 8 turns)
  lead.conversationHistory.push(
    { role: "user", text: userText, timestamp: now },
    { role: "assistant", text: assistantReply, timestamp: now }
  );

  if (lead.conversationHistory.length > 8) {
    lead.conversationHistory = lead.conversationHistory.slice(-8);
  }

  leadMap.set(userId, lead);
  persistLeadsToFile();

  // Non-blocking sync to Google Sheets Leads_State
  pushLeadStateToCloud(lead).catch(() => {});

  return lead;
}

/**
 * Mark a lead as paid after 5-layer slip verification
 */
export function markLeadAsPaid(userId: string, ref: string, amount: number, itemTitle: string) {
  const now = new Date().toISOString();
  if (ref) {
    sharedUsedSlipRefs.add(ref);
  }

  let lead = leadMap.get(userId);
  if (!lead) {
    lead = {
      userId,
      displayName: `ลูกค้า (${userId.slice(0, 8)})`,
      status: "paid",
      lastItem: itemTitle,
      lastAmount: amount,
      firstSeenAt: now,
      lastSeenAt: now,
      followUpCount: 0,
      conversationHistory: [],
      verifiedRef: ref,
    };
  } else {
    lead.status = "paid";
    lead.verifiedRef = ref;
    lead.lastAmount = amount;
    lead.lastItem = itemTitle;
    lead.lastSeenAt = now;
    // Reset follow-up counter so after-sale drip (Drip 3) can trigger later
    lead.followUpCount = 0;
  }

  leadMap.set(userId, lead);
  persistLeadsToFile();

  // Non-blocking sync to Google Sheets Leads_State & Used_Slips
  pushLeadStateToCloud(lead, ref).catch(() => {});
  if (ref) {
    recordUsedSlipToCloud({
      transRef: ref,
      userId,
      amount,
      product: itemTitle,
    }).catch(() => {});
  }
}

export interface FollowUpCandidate {
  lead: LeadRecord;
  dripType: "drip1_inquiry" | "drip2_quote" | "drip3_customer_success";
  suggestedMessage: string;
}

/**
 * Scan for candidates eligible for respectful follow-up
 *
 * Rules:
 * - Never follow up if followUpCount >= 2 (Safety cap)
 * - Drip 1: 'inquiry' after 24h idle -> value add & check in
 * - Drip 2: 'quoted' after 6-12h idle -> payment assistance / VIP setup option
 * - Drip 3: 'paid' after 5-7 days -> customer success check
 */
export function getFollowUpCandidates(): FollowUpCandidate[] {
  const candidates: FollowUpCandidate[] = [];
  const now = Date.now();

  for (const lead of leadMap.values()) {
    // Safety: ignore escalated leads, or leads that reached 2 follow-ups
    if (lead.isEscalated || lead.followUpCount >= 2) {
      continue;
    }

    const lastSeenMs = new Date(lead.lastSeenAt).getTime();
    const hoursSinceLastSeen = (now - lastSeenMs) / (1000 * 60 * 60);

    // ── DRIP 1: INQUIRY (24 - 48 Hours) ──
    if (lead.status === "inquiry" && lead.followUpCount === 0 && hoursSinceLastSeen >= 24) {
      const itemName = lead.lastItem ? `เรื่อง "${lead.lastItem}"` : "ที่ได้สอบถามไว้";
      candidates.push({
        lead,
        dripType: "drip1_inquiry",
        suggestedMessage:
          `สวัสดีครับคุณ${lead.displayName} ครูอ้นเองนะครับ 🙏\n\n` +
          `พอดีเห็น${itemName}เมื่อวาน เลยแวะมาสอบถามดูว่าติดขัดตรงไหน หรือมีข้อสงสัยเพิ่มเติมไหมครับ\n\n` +
          `🎁 หากคุณครูยังไม่แน่ใจ สามารถนำรหัส FREE69 ไปปลดล็อกระบบ SAR (AONA07) หรือระบบเช็กชื่อเผชิญเหตุ (AONE12) ไปทดลองใช้บน Google Sheets ได้ฟรีเลยนะครับ:\n` +
          `👉 https://www.aiaon.tech/freebies\n\n` +
          `หากมีคำถามพิมพ์คุยกับผมในนี้ได้ตลอดเลยนะครับ ยินดีให้คำแนะนำครับ 😊`,
      });
      continue;
    }

    // ── DRIP 2: QUOTED (6 - 24 Hours) ──
    if (lead.status === "quoted" && lead.followUpCount === 0 && hoursSinceLastSeen >= 6) {
      const itemTitle = lead.lastItem || "ระบบนวัตกรรมที่คุณครูสนใจ";
      const amount = lead.lastAmount ? `${lead.lastAmount.toLocaleString()} บาท` : "ยอดชำระตามที่แจ้งไว้";
      candidates.push({
        lead,
        dripType: "drip2_quote",
        suggestedMessage:
          `สวัสดีครับคุณ${lead.displayName} ครูอ้นแวะมาดูแลครับ 🙏\n\n` +
          `สำหรับรายการ "${itemTitle}" (${amount}) ไม่แน่ใจว่าติดปัญหาขั้นตอนการโอนเงิน หรืออยากให้ครูอ้นช่วยติดตั้งให้ไหมครับ?\n\n` +
          `🛠️ หากคุณครูไม่สะดวกติดตั้งเอง สามารถแจ้งรับบริการ "VIP Setup (+350 ฿)" ได้เลยนะครับ ครูอ้นช่วยนำโค้ดขึ้นระบบให้พร้อมใช้งาน 100% เลยครับ\n\n` +
          `ทันทีที่โอนแล้วส่งรูปสลิปเข้ามาในนี้ ระบบ AI จะตรวจสลิปและส่งมอบไฟล์ให้ดาวน์โหลดทันทีครับ ⚡`,
      });
      continue;
    }

    // ── DRIP 3: CUSTOMER SUCCESS (5 - 7 Days after Payment) ──
    if (lead.status === "paid" && lead.followUpCount === 0 && hoursSinceLastSeen >= 120) {
      const itemTitle = lead.lastItem || "ระบบที่สั่งซื้อไป";
      candidates.push({
        lead,
        dripType: "drip3_customer_success",
        suggestedMessage:
          `สวัสดีครับคุณ${lead.displayName} ครูอ้นแวะมาสอบถามความเรียบร้อยครับ 🙏\n\n` +
          `สำหรับ "${itemTitle}" ที่คุณครูรับไปใช้งานเมื่อสัปดาห์ก่อน การติดตั้งและใช้งานที่โรงเรียนราบรื่นดีไหมครับ? มีจุดไหนติดขัดหรือต้องการคำแนะนำเพิ่มเติมบอกผมได้เลยนะครับ\n\n` +
          `💡 และถ้าคุณครูสนใจต่อยอดงานวิทยฐานะ ว.PA หรือระบบเอกสารอื่นๆ สามารถดูคลังนวัตกรรมใหม่ๆ ได้ที่:\n` +
          `👉 https://www.aiaon.tech/digital-vault\n\n` +
          `ขอให้การสอนมีความสุขและลดภาระงานเอกสารได้ตามที่ตั้งใจนะครับ ขอบคุณที่ไว้วางใจ AiAon Tech ครับ ❤️`,
      });
      continue;
    }
  }

  return candidates;
}

/**
 * Mark follow-up as sent
 */
export function recordFollowUpSent(userId: string, sentMessage: string) {
  const lead = leadMap.get(userId);
  const now = new Date().toISOString();

  if (lead) {
    lead.followUpCount = (lead.followUpCount || 0) + 1;
    lead.lastFollowUpAt = now;
    lead.conversationHistory.push({
      role: "assistant",
      text: `[Automated Follow-up]: ${sentMessage}`,
      timestamp: now,
    });
    leadMap.set(userId, lead);
    persistLeadsToFile();

    // Non-blocking sync to Google Sheets Leads_State
    pushLeadStateToCloud(lead).catch(() => {});
  }
}

/**
 * Get all tracked leads for admin monitoring
 */
export function getAllLeads(): LeadRecord[] {
  return Array.from(leadMap.values());
}

import fs from "fs";
import path from "path";
import { ChatMessage, LeadStatus, recordLeadInteraction } from "./lead-tracker";

export interface AiSalesResponse {
  replyText: string;
  detectedIntent:
    | "CONSULTATION"
    | "REQUEST_ORDER"
    | "FREEBIES"
    | "OBJECTION"
    | "ESCALATION"
    | "GENERAL_CHAT";
  suggestedItem?: string;
  suggestedAmount?: number;
  shouldAttachPromptPayQr: boolean;
  shouldEscalateTelegram: boolean;
  escalateReason?: string;
}

// Cached Master Knowledge Vault
let cachedBrainData: unknown = null;

function getMasterBrainJson(): string {
  if (cachedBrainData) {
    return JSON.stringify(cachedBrainData);
  }
  try {
    const brainPath = path.join(process.cwd(), "src", "data", "master-knowledge-brain.json");
    if (fs.existsSync(brainPath)) {
      const content = fs.readFileSync(brainPath, "utf8");
      cachedBrainData = JSON.parse(content);
      return content;
    }
  } catch (err) {
    console.error("[AiSalesBrain] Failed to load master-knowledge-brain.json:", err);
  }
  return "{}";
}

let cachedGoldenCasesText = "";
let lastGoldenFetchTime = 0;

const DEFAULT_SHEET_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyPRw7GjvTv24XFfCsX73QMvPh4e9AFxxc6bfZZubdck7d1MIILECDHMudDAkhE7bj4TQ/exec";

async function getDynamicGoldenCases(): Promise<string> {
  const url = process.env.GOOGLE_SHEET_CHAT_WEBHOOK_URL || DEFAULT_SHEET_WEBHOOK_URL;
  if (!url) return "";


  const now = Date.now();
  if (cachedGoldenCasesText && now - lastGoldenFetchTime < 5 * 60 * 1000) {
    return cachedGoldenCasesText;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${url}?action=export_golden`, {
      signal: controller.signal,
    }).finally(() => clearTimeout(timer));

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json?.goldenCases) && json.goldenCases.length > 0) {
        cachedGoldenCasesText = json.goldenCases
          .slice(-8)
          .map(
            (c: { customerQuestion: string; successfulAnswer: string; product: string }) =>
              `• ตัวอย่างลูกค้าถาม: "${c.customerQuestion}" ➡️ ครูอ้นตอบปิดการขาย (${c.product}): "${c.successfulAnswer}"`
          )
          .join("\n");
        lastGoldenFetchTime = now;
      }
    }
  } catch {
    // Silent fallback
  }

  return cachedGoldenCasesText;
}

/**
 * Ask the AI Sales Brain using Gemini 2.5 Flash
 */
export async function consultAiSalesBrain(params: {
  userText: string;
  userId: string;
  displayName: string;
  recentHistory?: ChatMessage[];
}): Promise<AiSalesResponse> {
  const { userText, userId, displayName, recentHistory = [] } = params;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("[AiSalesBrain] GEMINI_API_KEY not found in environment, falling back to rule engine.");
    return fallbackRuleEngine(userText, displayName);
  }

  const [masterBrainContext, dynamicGoldenCases] = await Promise.all([
    Promise.resolve(getMasterBrainJson()),
    getDynamicGoldenCases(),
  ]);

  const systemInstruction = `คุณคือ "ครูอ้น" (นายจิรวัฒน์ เดชเส้ง) ครูดนตรีสากล ค.ศ.2 (ชำนาญการ) โรงเรียนหาดใหญ่วิทยาลัย (ญ.ว.) ผู้ก่อตั้ง AiAon Tech เจ้าของสโลแกน "ไอทีง่ายๆ สไตล์ iAon" 
คุณกำลังสนทนากับลูกค้า/คุณครูใน LINE Official Account (@deu6776s) 
บุคลิกภาพ:
- อบอุ่น สุภาพ เป็นกันเอง จริงใจ ไม่ฮาร์ดเซลล์ ไม่ตื๊อจนน่ารำคาญ
- ใช้สรรพนามแทนตัวเองว่า "ผม" หรือ "ครูอ้น"
- มีความเชี่ยวชาญสูงเรื่องระบบ Google Apps Script เพื่อการศึกษาและธุรกิจ, คลัง 30 E-Book ครูไทย, บอทติวสอบ AiAon Prep, และ AI Caretaker
- พร้อมแนะนำทางเลือกที่คุ้มค่าและแก้ปัญหาให้ลูกค้าได้ตรงจุดที่สุด

ข้อมูลคลังสมองหลัก (Master Knowledge Vault):
${masterBrainContext}
${
  dynamicGoldenCases
    ? `\n🏆 ตัวอย่างบทสนทนาทองคำจริงที่ปิดการขายสำเร็จ (Golden Dataset จาก Google Sheets):\n${dynamicGoldenCases}\n`
    : ""
}

แนวทางการตอบ:
1. ให้คำปรึกษาและตอบคำถามเกี่ยวกับระบบ, อีบุ๊ค หรือปัญหาที่ลูกค้าถามอย่างชัดเจน เข้าใจง่าย
2. ถ้าลูกค้าถามเรื่องแจกฟรี หรืออยากทดลองใช้ ให้แนะนำรหัส "FREE69" ไปปลดล็อกที่ https://www.aiaon.tech/freebies (แจกฟรี AONA07 SAR&ว.PA และ AONE12 เช็กชื่อเผชิญเหตุฉุกเฉิน)
3. ถ้าลูกค้าพร้อมสั่งซื้อ, ถามว่าต้องโอนกี่บาท, หรือขอเลขบัญชี/พร้อมเพย์/วิธีชำระเงิน:
   - ตรวจสอบประวัติการสนทนาล่าสุด (historyContext) ว่าคุยเรื่องระบบหรือสินค้าตัวไหนไว้ ให้ดึงชื่อสินค้านั้นและยอดชำระมาตอบทันที ห้ามถามซ้ำว่าสนใจตัวไหนถ้าในประวัติมีการคุยสินค้าหรือบริการเจาะจงไว้แล้ว
   - ระบุชื่อระบบและยอดชำระที่ถูกต้อง (ระบบเดี่ยว 390-690฿, เหมาคลัง 2,990฿, Prep 399฿, E-Book เล่มละ 290-390฿)
   - แนะนำออปชันเสริม: หากไม่สะดวกติดตั้งเอง มีบริการ "VIP Setup (+350 ฿)" ครูอ้นช่วยติดตั้งให้พร้อมใช้
   - ตั้งค่า shouldAttachPromptPayQr = true, suggestedAmount = <ยอดเงินตัวเลข เช่น 590 หรือ 690>, suggestedItem = "<ชื่อสินค้าที่ลูกค้าเลือก>"
4. ถ้าลูกค้ากังวลเรื่องติดตั้งไม่เป็น: ให้ความมั่นใจว่ามีคลิปสอน 2 นาที หรือเลือก VIP Setup ได้
5. ถ้าลูกค้าขอใบเสนอราคาทางการที่มีตราประทับ, ขอหักภาษี ณ ที่จ่าย WHT 3%, หรืองานสั่งทำระบบเฉพาะ: ให้ตอบสุภาพว่าจะประสานครูอ้นให้โดยตรง และตั้ง shouldEscalateTelegram = true, escalateReason = "<ระบุเหตุผล>"
6. ส่งผลลัพธ์กลับมาเป็น JSON ตามรูปแบบที่กำหนดเท่านั้น ห้ามมี markdown ครอบ JSON (output pure JSON object)`;

  const historyContext = recentHistory
    .map((h) => `${h.role === "user" ? "ลูกค้า" : "ครูอ้น"}: ${h.text}`)
    .join("\n");

  const prompt = `ประวัติการสนทนาล่าสุด:
${historyContext ? historyContext + "\n" : "(เริ่มการสนทนาใหม่)"}
ชื่อลูกค้า: ${displayName}
ข้อความล่าสุดจากลูกค้า: "${userText}"

จงตอบกลับในฐานะครูอ้น และวิเคราะห์ Intent ออกมาเป็น JSON:
{
  "replyText": "ข้อความตอบกลับภาษาไทยในสไตล์ครูอ้น (สุภาพ อบอุ่น ตรงประเด็น สั้นกระชับสำหรับ LINE)",
  "detectedIntent": "CONSULTATION | REQUEST_ORDER | FREEBIES | OBJECTION | ESCALATION | GENERAL_CHAT",
  "suggestedItem": "ชื่อสินค้าหรือรหัสระบบ (ถ้ามี)",
  "suggestedAmount": 590, // หรือ null ถ้ายังไม่เสนอราคา
  "shouldAttachPromptPayQr": true/false, // เป็น true เมื่อลูกค้าต้องการสั่งซื้อ ขอเลขบัญชี หรือขอชำระเงิน
  "shouldEscalateTelegram": true/false,
  "escalateReason": "เหตุผล (ถ้ามี)"
}`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemInstruction}\n\n${prompt}` }],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.3,
            maxOutputTokens: 1000,
          },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("[AiSalesBrain] Gemini API call failed:", res.status, errText);
      return fallbackRuleEngine(userText, displayName);
    }

    const json = await res.json();
    const candidateText = json?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      return fallbackRuleEngine(userText, displayName);
    }

    const parsed: AiSalesResponse = JSON.parse(candidateText);

    // Save interaction in LeadTracker
    const leadStatus: LeadStatus = parsed.shouldAttachPromptPayQr
      ? "quoted"
      : parsed.detectedIntent === "REQUEST_ORDER"
      ? "quoted"
      : "inquiry";

    recordLeadInteraction({
      userId,
      displayName,
      userText,
      assistantReply: parsed.replyText,
      status: leadStatus,
      item: parsed.suggestedItem,
      amount: parsed.suggestedAmount || undefined,
      isEscalated: parsed.shouldEscalateTelegram,
    });

    return parsed;
  } catch (error) {
    console.error("[AiSalesBrain] Exception during consultation:", error);
    return fallbackRuleEngine(userText, displayName);
  }
}

/**
 * High-quality fallback rule engine in case Gemini API is temporarily offline
 */
function fallbackRuleEngine(text: string, displayName: string): AiSalesResponse {
  const lower = text.toLowerCase();

  // Freebies / Passcode
  if (
    lower.includes("free69") ||
    lower.includes("แจกฟรี") ||
    lower.includes("ฟรี") ||
    lower.includes("รหัส")
  ) {
    return {
      replyText:
        `สวัสดีครับคุณ${displayName} ครูอ้นยินดีต้อนรับครับ! 🎉\n\n` +
        `สำหรับคลังของแจกฟรี ท่านสามารถใช้รหัส "FREE69" เพื่อปลดล็อกดาวน์โหลดบนหน้าเว็บได้เลยครับ:\n` +
        `👉 https://www.aiaon.tech/freebies\n\n` +
        `📥 2 ระบบเด่นที่โหลดใช้งานได้ทันที:\n` +
        `1. AONA07 ระบบ SAR & ว.PA 15 ตัวชี้วัด\n` +
        `2. AONE12 ระบบเช็กชื่อแผนเผชิญเหตุฉุกเฉิน\n\n` +
        `หากต้องการให้ครูอ้นแนะนำระบบอื่นเพิ่มเติม สอบถามได้ตลอดเลยนะครับ 🙏`,
      detectedIntent: "FREEBIES",
      shouldAttachPromptPayQr: false,
      shouldEscalateTelegram: false,
    };
  }

  // Ready to Buy / Price inquiry
  if (
    lower.includes("สั่งซื้อ") ||
    lower.includes("ขอเลขบัญชี") ||
    lower.includes("พร้อมเพย์") ||
    lower.includes("โอนเงิน") ||
    lower.includes("ซื้อ")
  ) {
    return {
      replyText:
        `ขอบคุณมากครับคุณ${displayName} ที่ไว้วางใจนวัตกรรมจาก AiAon Tech ครับ 🙏\n\n` +
        `🏦 บัญชีพร้อมเพย์สำหรับชำระเงิน:\n` +
        `• หมายเลข: 083-539-9340\n` +
        `• ชื่อบัญชี: นายจิรวัฒน์ เดชเส้ง (ครูอ้น AiAon Tech)\n\n` +
        `📲 สแกน QR Code พร้อมเพย์ที่แนบมาด้านล่างได้เลยครับ เมื่อโอนเรียบร้อยแล้ว ส่ง "รูปสลิปโอนเงิน" เข้ามาในแชตนี้ได้เลยครับ ระบบ AI จะตรวจสอบสลิปและส่งมอบลิงก์ไฟล์ให้ดาวน์โหลดทันทีครับ! ⚡`,
      detectedIntent: "REQUEST_ORDER",
      suggestedAmount: 590,
      shouldAttachPromptPayQr: true,
      shouldEscalateTelegram: false,
    };
  }

  // General Consultation
  return {
    replyText:
      `สวัสดีครับคุณ${displayName} ครูอ้นเองนะครับ 🙏\n\n` +
      `ผมได้รับข้อความของคุณครูเรียบร้อยแล้วครับ หากมีเรื่องระบบงานโรงเรียน Google Apps Script, ว.PA, อีบุ๊ก หรือเรื่องที่ต้องการคำแนะนำ สามารถพิมพ์สอบถามรายละเอียดไว้ได้เลยนะครับ\n\n` +
      `🌐 ดูคลัง 20 ระบบยอดนิยม: https://www.aiaon.tech/digital-vault\n` +
      `📚 ดูคลัง 30 E-Book นวัตกรรมครู: https://www.aiaon.tech/ebooks\n\n` +
      `ยินดีดูแลและตอบทุกคำถามครับ! 😊`,
    detectedIntent: "CONSULTATION",
    shouldAttachPromptPayQr: false,
    shouldEscalateTelegram: false,
  };
}

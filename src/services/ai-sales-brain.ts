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

const DEFAULT_KEY_B64 =
  "QVEuQWI4Uk42STV3YTM2Z0p0X29Vb3B1WUxWRWhwcldsZG01a29jQlF2NTJMeW1xcERFdlE=";

function getGeminiApiKey(): string {
  return (
    process.env.GEMINI_API_KEY ||
    Buffer.from(DEFAULT_KEY_B64, "base64").toString("utf-8")
  );
}

/**
 * Ask the AI Sales Brain using Gemini 3.5 Flash-Lite (with multi-model fallback)
 */
export async function consultAiSalesBrain(params: {
  userText: string;
  userId: string;
  displayName: string;
  recentHistory?: ChatMessage[];
}): Promise<AiSalesResponse> {
  const { userText, userId, displayName, recentHistory = [] } = params;
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    console.warn("[AiSalesBrain] GEMINI_API_KEY not found in environment, falling back to rule engine.");
    return fallbackRuleEngine(userText, displayName, recentHistory);
  }

  const [masterBrainContext, dynamicGoldenCases] = await Promise.all([
    Promise.resolve(getMasterBrainJson()),
    getDynamicGoldenCases(),
  ]);

  const systemInstruction = `คุณคือ "ครูอ้น" (นายจิรวัฒน์ เดชเส้ง) ครูดนตรีสากล ค.ศ.2 (ชำนาญการ) โรงเรียนหาดใหญ่วิทยาลัย (ญ.ว.) ผู้ก่อตั้ง AiAon Tech เจ้าของสโลแกน "ไอทีง่ายๆ สไตล์ iAon" 
คุณกำลังสนทนากับลูกค้า/คุณครูใน Facebook Messenger / LINE Official Account
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
6. กฎเหล็กเรื่องการจัดฟอร์แมตข้อความ (Visual Layout & Formatting สไตล์ LINE/แชตสวยงาม):
   - ห้ามพิมพ์ข้อความยาวติดต่อกันเป็นพรืดเด็ดขาด!
   - เว้นวรรคตอนและขึ้นบรรทัดใหม่ (\\n\\n) ระหว่างย่อหน้าเสมอ เพื่อให้อ่านสบายตาบนมือถือ
   - ประดับด้วยอิโมจิที่เหมาะสมอย่างสวยงาม (เช่น 📱, 🎓, ✨, 💡, 💰, 🏦, 🚀, 😊, 🙏)
   - ใช้ Bullet point (• หรือ 1️⃣ 2️⃣) ในการแจกแจงฟีเจอร์หรือตัวเลือก
   - เมื่อแจ้งราคาหรือยอดโอน ให้ขึ้นบรรทัดใหม่และจัดรูปแบบแบบนี้เสมอ:
     📦 ระบบ: <ชื่อระบบ>
     💰 ราคา: <ราคา> บาท (ซื้อขาดตลอดชีพ อัปเดตฟรี ไร้รายเดือน)
     ━━━━━━━━━━━━━━━
     🏦 บัญชีพร้อมเพย์: 083-539-9340
     👤 ชื่อบัญชี: นายจิรวัฒน์ เดชเส้ง (ครูอ้น AiAon Tech)
7. ส่งผลลัพธ์กลับมาเป็น JSON ตามรูปแบบที่กำหนดเท่านั้น ห้ามมี markdown ครอบ JSON (output pure JSON object)`;

  const historyContext = recentHistory
    .map((h) => `${h.role === "user" ? "ลูกค้า" : "ครูอ้น"}: ${h.text}`)
    .join("\n");

  const prompt = `ประวัติการสนทนาล่าสุด:
${historyContext ? historyContext + "\n" : "(เริ่มการสนทนาใหม่)"}
ชื่อลูกค้า: ${displayName}
ข้อความล่าสุดจากลูกค้า: "${userText}"

จงตอบกลับในฐานะครูอ้น และวิเคราะห์ Intent ออกมาเป็น JSON:
{
  "replyText": "ข้อความตอบกลับภาษาไทยในสไตล์ครูอ้น มีการขึ้นบรรทัดใหม่ (\\n\\n) เว้นวรรคสวยงาม ประดับอิโมจิครบถ้วน จัดรูปแบบให้อ่านง่ายสบายตาแบบ LINE OA ห้ามพิมพ์ติดกันเป็นพรืดเด็ดขาด",
  "detectedIntent": "CONSULTATION | REQUEST_ORDER | FREEBIES | OBJECTION | ESCALATION | GENERAL_CHAT",
  "suggestedItem": "ชื่อสินค้าหรือรหัสระบบ (ถ้ามี)",
  "suggestedAmount": 590, // หรือ null ถ้ายังไม่เสนอราคา
  "shouldAttachPromptPayQr": true/false, // เป็น true เมื่อลูกค้าต้องการสั่งซื้อ ขอเลขบัญชี หรือขอชำระเงิน
  "shouldEscalateTelegram": true/false,
  "escalateReason": "เหตุผล (ถ้ามี)"
}`;

  // Models to try in order of preference
  const candidateModels = [
    "gemini-3.5-flash-lite",
    "gemini-3.1-flash-lite",
    "gemini-flash-lite-latest",
  ];

  for (const model of candidateModels) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
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
        console.warn(`[AiSalesBrain] Model ${model} returned ${res.status}, trying next fallback model...`);
        continue;
      }

      const json = await res.json();
      const candidateText = json?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!candidateText) continue;

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
    } catch (err) {
      console.warn(`[AiSalesBrain] Exception on model ${model}:`, err);
    }
  }

  // If all models failed or rate limited, invoke upgraded rule engine
  return fallbackRuleEngine(userText, displayName, recentHistory);
}

/**
 * High-quality fallback rule engine in case Gemini API is temporarily offline
 */
function fallbackRuleEngine(
  text: string,
  displayName: string,
  recentHistory: ChatMessage[] = []
): AiSalesResponse {
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

  // Attendance Check System
  if (lower.includes("เช็คชื่อ") || lower.includes("เชคชื่อ") || lower.includes("attendance")) {
    return {
      replyText:
        `สวัสดีครับคุณ${displayName}! มีระบบเช็คชื่อนักเรียนครับ เป็นระบบยอดนิยมของครูไทยเลย คือ "ระบบเช็คชื่อนักเรียน Smart Attendance & LINE แจ้งเตือน V2" (รหัส AONE01) ครับ 📱✨\n\n` +
        `จุดเด่นคือเช็คชื่อผ่านมือถือได้ใน 2 วินาที แจ้งเตือนเข้า LINE ผู้ปกครองอัตโนมัติ และสรุปสถิติลง Google Sheets ให้ครบถ้วนครับ\n\n` +
        `ราคาเพียง 590 บาท (ซื้อขาดตลอดชีพ อัปเดตฟรี ไร้รายเดือน) หากต้องการให้ครูอ้นช่วยติดตั้งให้พร้อมใช้ มีบริการ VIP Setup (+350 บาท) ให้ด้วยครับผม 😊`,
      detectedIntent: "CONSULTATION",
      suggestedItem: "ระบบเช็คชื่อนักเรียน Smart Attendance & LINE แจ้งเตือน V2 (AONE01)",
      suggestedAmount: 590,
      shouldAttachPromptPayQr: false,
      shouldEscalateTelegram: false,
    };
  }

  // Certificate Verification System
  if (lower.includes("เกียรติบัตร") || lower.includes("certificate")) {
    return {
      replyText:
        `สวัสดีครับคุณ${displayName}! มีระบบเกียรติบัตรครับ เป็น "ระบบเกียรติบัตร QR Code Verify" (รหัส AONA03) ครับ 🎓✨\n\n` +
        `ระบบนี้ช่วยสร้างเกียรติบัตร PDF จาก Google Slides ได้อัตโนมัติ มี QR Code สแกนตรวจสอบความถูกต้องได้จริง และส่งเข้าอีเมลผู้รับได้ทันทีครับ\n\n` +
        `ราคา 690 บาท (ซื้อขาดตลอดชีพ อัปเดตฟรี) หรือหากต้องการบริการติดตั้งพร้อมใช้ VIP Setup ก็มีดูแลให้ครับ (+350 บาท) 😊`,
      detectedIntent: "CONSULTATION",
      suggestedItem: "ระบบเกียรติบัตร QR Code Verify (AONA03)",
      suggestedAmount: 690,
      shouldAttachPromptPayQr: false,
      shouldEscalateTelegram: false,
    };
  }

  // Transfer Amount / Ready to Buy / Price inquiry
  if (
    lower.includes("โอนกี่บาท") ||
    lower.includes("ต้องโอน") ||
    lower.includes("จ่ายกี่บาท") ||
    lower.includes("กี่บาท") ||
    lower.includes("เท่าไหร่") ||
    lower.includes("ขอเลขบัญชี") ||
    lower.includes("พร้อมเพย์") ||
    lower.includes("สั่งซื้อ") ||
    lower.includes("โอนเงิน") ||
    lower.includes("สนใจ")
  ) {
    let matchedItem = "ระบบนวัตกรรมจาก AiAon Tech";
    let matchedAmount = 590;

    // Scan recent history to detect which system was discussed
    for (let i = recentHistory.length - 1; i >= 0; i--) {
      const h = recentHistory[i];
      if (h.text.includes("AONA03") || h.text.includes("เกียรติบัตร")) {
        matchedItem = "ระบบเกียรติบัตร QR Code Verify (AONA03)";
        matchedAmount = 690;
        break;
      }
      if (h.text.includes("AONE01") || h.text.includes("เช็คชื่อ") || h.text.includes("เชคชื่อ")) {
        matchedItem = "ระบบเช็คชื่อนักเรียน Smart Attendance & LINE แจ้งเตือน V2 (AONE01)";
        matchedAmount = 590;
        break;
      }
      if (h.text.includes("2,990") || h.text.includes("เหมา")) {
        matchedItem = "แพ็กเกจเหมาคลัง 20 ระบบ Google Apps Script";
        matchedAmount = 2990;
        break;
      }
    }

    return {
      replyText:
        `ยินดีเลยครับคุณ${displayName}! สำหรับ ${matchedItem} ยอดชำระคือ ${matchedAmount.toLocaleString()} บาทครับผม (หรือหากต้องการบริการติดตั้งพร้อมใช้ VIP Setup ด้วย จะเป็น ${(matchedAmount + 350).toLocaleString()} บาทครับ) 🙏\n\n` +
        `🏦 บัญชีพร้อมเพย์สำหรับชำระเงิน:\n` +
        `• หมายเลข: 083-539-9340\n` +
        `• ชื่อบัญชี: นายจิรวัฒน์ เดชเส้ง (ครูอ้น AiAon Tech)\n\n` +
        `คุณครูสามารถสแกน QR Code พร้อมเพย์ที่แนบมาด้านล่างได้เลยครับ เมื่อโอนเรียบร้อยแล้ว ส่ง "รูปสลิปโอนเงิน" เข้ามาในแชตนี้ได้เลยครับ ระบบจะตรวจสอบและส่งมอบลิงก์ไฟล์ให้ดาวน์โหลดทันทีครับ! ⚡`,
      detectedIntent: "REQUEST_ORDER",
      suggestedItem: matchedItem,
      suggestedAmount: matchedAmount,
      shouldAttachPromptPayQr: true,
      shouldEscalateTelegram: false,
    };
  }

  // General Consultation
  return {
    replyText:
      `สวัสดีครับคุณ${displayName} ครูอ้นยินดีต้อนรับครับ! 🙏\n\n` +
      `ไม่ทราบว่าสนใจระบบ Google Apps Script ตัวไหนเป็นพิเศษ หรือต้องการปรึกษาเรื่องระบบงานโรงเรียน, ว.PA, หรืออีบุ๊ก เล่มไหนอยู่ครับ? แจ้งครูอ้นได้เลยนะครับ\n\n` +
      `🌐 ดูคลัง 20 ระบบยอดนิยม: https://www.aiaon.tech/digital-vault\n` +
      `📚 ดูคลัง 30 E-Book นวัตกรรมครู: https://www.aiaon.tech/ebooks\n\n` +
      `หรือพิมพ์ชื่อระบบที่สนใจสอบถามได้ตลอดเวลาเลยครับ 😊`,
    detectedIntent: "CONSULTATION",
    shouldAttachPromptPayQr: false,
    shouldEscalateTelegram: false,
  };
}

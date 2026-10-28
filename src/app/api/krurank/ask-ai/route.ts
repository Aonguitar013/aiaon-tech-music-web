import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface QuestionContext {
  question?: string;
  options?: string[];
  answerIndex?: number;
  legalRef?: string;
  trapCaught?: string;
  tutorTrick?: string;
  keyConcept?: string;
  subtopic?: string;
}

interface RequestBody {
  prompt?: string;
  questionContext?: QuestionContext;
  history?: Array<{ role: "user" | "model"; text: string }>;
}

const SYSTEM_INSTRUCTION = `คุณคือ "ครูอ้น AI ติวเตอร์" (พี่ติวเตอร์เตรียมสอบครูผู้ช่วยตัวจริง ประจำทีม AiAon Tech - aiaon.tech)
บุคลิกและแนวทางการสอน:
1. เป็นกันเอง สนุกสนาน คอยให้กำลังใจ เรียกผู้ถามว่า "ว่าที่ครู", "คุณครู", หรือ "น้องว่าที่ครูผู้ช่วย"
2. มีจุดเด่นคือ "ชี้จุดดักหลอก" ของข้อสอบครูผู้ช่วย (สพฐ. / อปท. / กทม.) ทั้ง ภาค ก (กฎหมายการศึกษา พ.ร.บ. วินัย จรรยาบรรณวิชาชีพ) และ ภาค ข วิชาเอก
3. ฟันธงเนื้อหาให้ชัดเจน ตรงประเด็น ไม่ตอบแบบกำกวม ช่วยให้จำง่ายไม่น่าเบื่อ
4. ในกรณีที่มีบริบทข้อสอบ ให้วิเคราะห์ว่าตัวเลือกไหนเป็นตัวลวง ทำไมคนส่วนใหญ่ถึงกาผิด พร้อมอธิบายตัวเลือกที่ถูกต้องอย่างแจ่มแจ้ง
5. สรุป "สูตรจำด่วนฟันธง 1 ประโยค" หรือ "จุดระวังข้อสอบหลอก" ไว้ให้ท้ายคำตอบเสมอ
6. ให้กำลังใจผู้สอบว่า "สอบติดแน่นอน บรรจุรอบนี้ไปด้วยกันครับ!"
7. ตอบเป็นภาษาไทยเท่านั้น และตอบกระชับ ตรงประเด็น อ่านง่ายบนหน้าจอมือถือ`;

const CANDIDATE_MODELS = [
  "gemini-2.5-flash",
  "gemini-1.5-flash",
  "gemini-2.0-flash",
];

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const userPrompt = (body.prompt || "").trim();

    if (!userPrompt) {
      return NextResponse.json(
        { error: "กรุณาระบุคำถามที่ต้องการถามครูอ้น AI" },
        { status: 400 }
      );
    }

    // Safety limit input length
    const cleanPrompt = userPrompt.slice(0, 1000);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("[KruRank AI] GEMINI_API_KEY not found in environment.");
      return NextResponse.json(
        {
          error: "ยังไม่ได้ตั้งค่า GEMINI_API_KEY ในระบบ",
          reply: generateRuleFallback(cleanPrompt, body.questionContext),
        },
        { status: 200 }
      );
    }

    // Construct prompt with question context if provided
    let fullUserContent = "";
    if (body.questionContext && body.questionContext.question) {
      const qc = body.questionContext;
      const optionsText = qc.options ? qc.options.map((opt, i) => `  ${i + 1}. ${opt}`).join("\n") : "";
      const correctOpt = (qc.options && qc.answerIndex !== undefined && qc.options[qc.answerIndex])
        ? qc.options[qc.answerIndex]
        : "";

      fullUserContent += `[บริบทข้อสอบที่ผู้สอบกำลังทำอยู่]:\n`;
      fullUserContent += `โจทย์: ${qc.question}\n`;
      if (optionsText) fullUserContent += `ตัวเลือก:\n${optionsText}\n`;
      if (correctOpt) fullUserContent += `เฉลยข้อที่ถูก: ${correctOpt}\n`;
      if (qc.legalRef) fullUserContent += `อ้างอิงกฎหมาย/ทฤษฎี: ${qc.legalRef}\n`;
      if (qc.trapCaught) fullUserContent += `จุดดักหลอกของข้อนี้: ${qc.trapCaught}\n`;
      if (qc.tutorTrick) fullUserContent += `สูตรจำ: ${qc.tutorTrick}\n`;
      fullUserContent += `\n[คำถามเพิ่มเติมจากผู้สอบ]:\n${cleanPrompt}`;
    } else {
      fullUserContent = cleanPrompt;
    }

    // Call Gemini API with model fallback
    let replyText = "";
    let usedModel = "";

    for (const model of CANDIDATE_MODELS) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: SYSTEM_INSTRUCTION }],
            },
            contents: [
              {
                role: "user",
                parts: [{ text: fullUserContent }],
              },
            ],
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 800,
            },
          }),
        });

        if (!res.ok) {
          console.warn(`[KruRank AI] Model ${model} returned status ${res.status}`);
          continue;
        }

        const data = await res.json();
        const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          replyText = candidate.trim();
          usedModel = model;
          break;
        }
      } catch (err) {
        console.warn(`[KruRank AI] Error calling model ${model}:`, err);
      }
    }

    if (!replyText) {
      // Fallback if all Gemini models failed/timed out
      replyText = generateRuleFallback(cleanPrompt, body.questionContext);
      usedModel = "fallback-rule-engine";
    }

    return NextResponse.json({
      reply: replyText,
      modelUsed: usedModel,
      success: true,
    });
  } catch (error) {
    console.error("[KruRank AI] API Error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการประมวลผล AI ติวเตอร์" },
      { status: 500 }
    );
  }
}

function generateRuleFallback(query: string, qc?: QuestionContext): string {
  if (qc && qc.question) {
    const trick = qc.tutorTrick || "จำตัวคีย์เวิร์ดหลักของกฎหมายให้แม่นยำ";
    const trap = qc.trapCaught || "ข้อสอบชอบสลับคำหรือเล่นคำที่มีความหมายคล้ายกัน";
    return `ครูอ้น AI ฟันธงให้ครับสำหรับข้อนี้! 🎯\n\n📌 สิ่งที่ต้องระวัง: ${trap}\n\n💡 สูตรจำด่วนครูอ้น: "${trick}"\n\n${qc.legalRef ? `อ้างอิง: ${qc.legalRef}\n` : ""}มั่นใจได้เลยว่าถ้าเจอจุดดักหลอกแบบนี้ในห้องสอบจริง กาถูกแน่นอนครับ! ✌️`;
  }
  return `สวัสดีครับว่าที่ครูผู้ช่วย! สำหรับคำถามนี้: "${query}" ครูอ้นขอแนะนำให้เน้นจำจุดตัดคะแนนของ ภาค ก และหลักการสำคัญของวิชาเอกให้แม่นยำ ข้อสอบมักจะหลอกด้วยคำใกล้เคียง มีสมาธิแล้วฟันธงได้เลยครับ! ✌️`;
}

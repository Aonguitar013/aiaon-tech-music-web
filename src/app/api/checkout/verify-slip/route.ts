import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { orderId, slipUrl, expectedAmount } = await req.json();

    if (!slipUrl) {
      return NextResponse.json({ success: false, error: "Missing slip URL" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("[AI Verification] No GEMINI_API_KEY found, fallback to pending status");
      return NextResponse.json({
        success: true,
        verified: false,
        message: "สลิปถูกบันทึกเรียบร้อย (รอแอดมินตรวจสอบ)"
      });
    }

    // 1. Fetch image data from slipUrl
    let imageBase64 = "";
    let mimeType = "image/jpeg";

    try {
      const imgRes = await fetch(slipUrl);
      if (!imgRes.ok) throw new Error("Cannot fetch slip image");
      
      const contentType = imgRes.headers.get("content-type");
      if (contentType) mimeType = contentType;

      const arrayBuffer = await imgRes.arrayBuffer();
      imageBase64 = Buffer.from(arrayBuffer).toString("base64");
    } catch (fetchErr) {
      console.error("[AI Verification] Error fetching slip image:", fetchErr);
      return NextResponse.json({
        success: true,
        verified: false,
        message: "บันทึกสลิปสำเร็จ รอแอดมินตรวจสอบ"
      });
    }

    // 2. Prepare Prompt & Schema for Gemini 2.5 Flash
    const prompt = `คุณคือผู้เชี่ยวชาญการตรวจสอบสลิปโอนเงินธนาคารไทย (Thai Bank Transfer Slip Auditor)
หน้าที่ของคุณคือตรวจสอบรูปสลิปนี้อย่างละเอียด โดยมีข้อมูลอ้างอิงของร้านค้าดังนี้:
- ชื่อบัญชีผู้รับที่ถูกต้อง: "นายจิรวัฒน์ เดชเส้ง" หรือ "จิรวัฒน์ เดชเส้ง" หรือ "JIRAWAT DECHSENG" หรือ "จิรวัฒน์ ด." หรือ พร้อมเพย์ 083-539-9340 / 0835399340
- ยอดเงินที่คาดหวัง: ${expectedAmount || "ตามยอดในสลิป"} บาท

เกณฑ์การตัดสิน (Decision Criteria):
1. ตรวจสอบว่าภาพนี้คือสลิปโอนเงินของธนาคารไทยจริง (KBank, SCB, Krungthai, Bangkok Bank, GSB, TTB, PromptPay ฯลฯ)
2. ตรวจสอบว่าชื่อผู้รับตรงกับ จิรวัฒน์ เดชเส้ง หรือเบอร์ 083-539-9340
3. ตรวจสอบยอดเงินโอน
4. ถ้าชื่อผู้รับถูกต้อง และยอดเงินโอนสอดคล้อง ให้ตัดสิน 'APPROVED'
5. ถ้าภาพไม่ชัด, ชื่อไม่ตรง, ยอดไม่ตรง หรือไม่ใช่สลิป ให้ตัดสิน 'MANUAL_REVIEW'`;

    const payload = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: mimeType,
                data: imageBase64
              }
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            isBankSlip: { type: "BOOLEAN" },
            receiverName: { type: "STRING" },
            receiverMatches: { type: "BOOLEAN" },
            transferredAmount: { type: "NUMBER" },
            bankName: { type: "STRING" },
            transactionDate: { type: "STRING" },
            decision: { type: "STRING", enum: ["APPROVED", "MANUAL_REVIEW"] },
            reason: { type: "STRING" }
          },
          required: ["isBankSlip", "receiverName", "receiverMatches", "transferredAmount", "decision", "reason"]
        }
      }
    };

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const aiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!aiResponse.ok) {
      console.error("[AI Verification] Gemini API error:", await aiResponse.text());
      return NextResponse.json({
        success: true,
        verified: false,
        message: "บันทึกสลิปสำเร็จ รอแอดมินตรวจสอบ"
      });
    }

    const aiData = await aiResponse.json();
    const resultText = aiData?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!resultText) {
      return NextResponse.json({ success: true, verified: false, message: "บันทึกสลิปสำเร็จ รอแอดมินตรวจสอบ" });
    }

    const verificationResult = JSON.parse(resultText);
    console.log("[AI Verification Result]:", verificationResult);

    const isApproved = verificationResult.decision === "APPROVED" && verificationResult.receiverMatches;

    // 3. Update Supabase Order if approved
    const supabase = await createClient();
    
    if (orderId && isApproved) {
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          status: "completed"
        })
        .eq("id", orderId);

      if (updateError) {
        console.error("[AI Verification] Supabase update error:", updateError);
      }
    }

    return NextResponse.json({
      success: true,
      verified: isApproved,
      data: verificationResult,
      message: isApproved 
        ? "✅ AI ตรวจสอบยอดเงินและบัญชีถูกต้อง อนุมัติคำสั่งซื้อเรียบร้อยทันที!"
        : "สลิปถูกบันทึกเรียบร้อย กำลังส่งให้ผู้ดูแลระบบตรวจสอบ"
    });

  } catch (err) {
    console.error("[AI Verification Route Error]:", err);
    return NextResponse.json({
      success: true,
      verified: false,
      message: "บันทึกสลิปสำเร็จ รอแอดมินตรวจสอบ"
    });
  }
}

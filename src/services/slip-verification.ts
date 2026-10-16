/**
 * =========================================================================
 * 🛡️ 5-Layer Bulletproof Bank Slip Verification Engine
 * รองรับทั้ง LINE OA (@deu6776s) และ Facebook Messenger เพจ AiAon Tech
 * โดย ครูจิรวัฒน์ เดชเส้ง (ครูอ้น) — AiAon Tech
 * =========================================================================
 * 
 * มาตรการความปลอดภัยสูงสุด (Fail-Closed Zero-Trust Security):
 * 1. ตรวจสอบ Pending Order (ต้องมีออเดอร์ที่ลูกค้าสั่งซื้อจริงเท่านั้น ห้ามรับสลิปลอยเด็ดขาด)
 * 2. ตรวจสอบยอดเงินตรงเป๊ะ 100% (ห้ามรับยอดขาด หรือยอดเกินผิดปกติ)
 * 3. ตรวจสอบวันที่ทำรายการ (ต้องเป็นสลิปของ "วันนี้" เท่านั้น ป้องกันสลิปเก่าวนซ้ำ)
 * 4. สแกน Mini-QR ธปท. (BOT Standard Slip QR) + ป้องกัน Ref ซ้ำข้ามแพลตฟอร์ม
 * 5. Gemini 2.5 Flash Vision Multimodal Audit (สแกนจับสลิปปลอม / สลิปตัดต่อ / สลิป AI)
 * 6. Safety Lock: หากยอดเงินเกินเกณฑ์ หรือภาพน่าสงสัย ให้เปลี่ยนเป็น MANUAL_REVIEW ทันที
 */

import { buildSignedDeliveryUrl } from "@/utils/delivery-links";
import {
  markLeadAsPaid,
  getLead,
  hydrateCloudStateFromSheets,
  checkSlipUsedInCloud,
} from "@/services/lead-tracker";
import { flagConversationAsGolden } from "@/services/chat-harvester";

export const PROMPTPAY_ID = "0835399340";
export const PROMPTPAY_NAME = "นายจิรวัฒน์ เดชเส้ง (ครูอ้น AiAon Tech)";

// Telegram Copilot Notification Bridge (@AiAonhub_bot -> Kru Aon)
const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || "8529471786:AAHI33E48vL4ic1J8tyszNAp7SwzkADaYKE";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "7731447826";

export interface PendingOrder {
  userId: string;
  itemTitle: string;
  baseAmount: number;
  vipAmount: number;
  isVipSelected: boolean;
  orderedAt: string;
  status: "pending_slip" | "verified_paid";
  verifiedRef?: string;
  verifiedBank?: string;
  customerEmail?: string;
}

// Persistent in-memory stores across Next.js API route reloads
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any;
if (!g.__pendingOrders) g.__pendingOrders = new Map<string, PendingOrder>();
if (!g.__usedSlipRefs) g.__usedSlipRefs = new Set<string>();

export const pendingOrders: Map<string, PendingOrder> = g.__pendingOrders;
export const usedSlipRefs: Set<string> = g.__usedSlipRefs;

export const INSTANT_DELIVERY_LINKS: Record<string, string> = {
  AONE02:
    "https://1drv.ms/f/c/ce3ad5ba004eb0c7/IgATR6et6O-BS61MuoKMqj_GAYU-TtWQfIJanJqGekSkGbk?e=AaoHOh",
  AONA07:
    "https://1drv.ms/f/c/ce3ad5ba004eb0c7/IgDJlCMMPrrsT41Ts0p0_mG3ARQDzg2jFhgxYKp8p5n6gNA?e=X8Nj74",
  AONE12:
    "https://1drv.ms/f/c/ce3ad5ba004eb0c7/IgD_Jr6rfSsxSpAKzMlvYwa0AUZTGXnV_mi0Q5WW4ra9jKI?e=6afyzo",
};

export function findInstantDownloadLink(title: string): string | null {
  const upper = (title || "").toUpperCase();
  for (const [code, link] of Object.entries(INSTANT_DELIVERY_LINKS)) {
    if (upper.includes(code)) return link;
  }
  return null;
}

export const THAI_BANK_NAMES: Record<string, string> = {
  "002": "ธนาคารกรุงเทพ (BBL)",
  "004": "ธนาคารกสิกรไทย (KBank)",
  "006": "ธนาคารกรุงไทย (Krungthai)",
  "011": "ธนาคารทหารไทยธนชาต (ttb)",
  "014": "ธนาคารไทยพาณิชย์ (SCB)",
  "022": "ธนาคารซีไอเอ็มบี ไทย (CIMB)",
  "024": "ธนาคารยูโอบี (UOB)",
  "025": "ธนาคารกรุงศรีอยุธยา (BAY)",
  "030": "ธนาคารออมสิน (GSB)",
  "033": "ธนาคารอาคารสงเคราะห์ (GHB)",
  "034": "ธ.ก.ส. (BAAC)",
  "067": "ธนาคารทิสโก้ (TISCO)",
  "069": "ธนาคารเกียรตินาคินภัทร (KKP)",
  "073": "ธนาคารแลนด์ แอนด์ เฮ้าส์ (LH Bank)",
};

/**
 * Pure TypeScript CRC16-CCITT for Thai PromptPay EMVCo QR
 */
export function crc16(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function generatePromptPayPayload(phone: string, amount?: number): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const formattedPhone = "0066" + cleanPhone.substring(1);
  const tag29Value = `0016A0000006770101110113${formattedPhone}`;
  const tag29 = `29${String(tag29Value.length).padStart(2, "0")}${tag29Value}`;

  const hasAmount = typeof amount === "number" && amount > 0;
  const poiMethod = hasAmount ? "010212" : "010211";
  let amountField = "";
  if (hasAmount) {
    const amtStr = amount.toFixed(2);
    amountField = `54${String(amtStr.length).padStart(2, "0")}${amtStr}`;
  }

  const raw = `000201${poiMethod}${tag29}5802TH5303764${amountField}6304`;
  return raw + crc16(raw);
}

export function getPromptPayQrImageUrl(amount: number): string {
  const payload = generatePromptPayPayload(PROMPTPAY_ID, amount);
  return `https://api.qrserver.com/v1/create-qr-code/?size=600x600&margin=20&format=png&data=${encodeURIComponent(payload)}`;
}

export async function sendSlipPhotoToTelegram(
  imageBuffer: ArrayBuffer,
  contentType: string,
  caption: string
) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  try {
    const formData = new FormData();
    formData.append("chat_id", String(TELEGRAM_CHAT_ID));
    formData.append("caption", caption);
    const ext = contentType.includes("png") ? "png" : "jpg";
    formData.append("photo", new Blob([imageBuffer], { type: contentType }), `slip.${ext}`);

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
      method: "POST",
      body: formData,
    });
  } catch (err) {
    console.error("[Telegram SendPhoto Error]:", err);
  }
}

export async function decodeSlipQrFromImage(
  imageBuffer: ArrayBuffer,
  contentType: string
): Promise<string | null> {
  try {
    const formData = new FormData();
    const ext = contentType.includes("png") ? "png" : "jpg";
    formData.append("file", new Blob([imageBuffer], { type: contentType }), `slip.${ext}`);

    const res = await fetch("https://api.qrserver.com/v1/read-qr-code/", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) return null;
    const json = await res.json();
    const qrData = json?.[0]?.symbol?.[0]?.data;
    return typeof qrData === "string" && qrData.length > 0 ? qrData : null;
  } catch (err) {
    console.error("[QR Decode Error]:", err);
    return null;
  }
}

export function parseBotSlipMiniQr(qrData: string): {
  isPaymentQr: boolean;
  isBankSlipQr: boolean;
  bankCode?: string;
  bankName?: string;
  transRef?: string;
} {
  if (qrData.startsWith("000201") && qrData.includes("A000000677010111")) {
    return { isPaymentQr: true, isBankSlipQr: false };
  }

  const marker = "00060000010103";
  const idx = qrData.indexOf(marker);
  if (idx !== -1) {
    const afterMarker = qrData.substring(idx + marker.length);
    const bankCode = afterMarker.substring(0, 3);
    const bankName = THAI_BANK_NAMES[bankCode] || `ธนาคารรหัส ${bankCode}`;

    let transRef = afterMarker.substring(3);
    if (transRef.startsWith("02")) {
      const refLen = parseInt(transRef.substring(2, 4), 10);
      if (!isNaN(refLen) && refLen > 0) {
        transRef = transRef.substring(4, 4 + refLen);
      }
    }

    return {
      isPaymentQr: false,
      isBankSlipQr: true,
      bankCode,
      bankName,
      transRef,
    };
  }

  return { isPaymentQr: false, isBankSlipQr: false };
}

/**
 * Multimodal AI Slip Auditor powered by Gemini 2.5 Flash
 * ตรวจจับสลิปปลอม, สลิปตัดต่อ, วันที่ทำรายการ, ชื่อผู้รับ, และยอดเงิน
 */
interface GeminiSlipAudit {
  isAuthenticSlip: boolean;
  isFakeOrEdited: boolean;
  receiverMatchesKruAon: boolean;
  detectedReceiverName: string;
  transferredAmount: number | null;
  transactionDateText: string;
  isToday: boolean;
  decision: "APPROVED" | "REJECTED" | "MANUAL_REVIEW";
  reason: string;
}

async function auditSlipWithGeminiVision(
  imageBuffer: ArrayBuffer,
  contentType: string,
  expectedAmount: number
): Promise<GeminiSlipAudit | null> {
  const apiKey = process.env.GEMINI_API_KEY || "";
  if (!apiKey) return null;

  try {
    const base64Data = Buffer.from(imageBuffer).toString("base64");
    const todayBangkok = new Date().toLocaleDateString("th-TH", {
      timeZone: "Asia/Bangkok",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const prompt = `คุณคือผู้เชี่ยวชาญการตรวจสอบสลิปโอนเงินธนาคารไทย (Bank Slip Fraud Auditor)
หน้าที่ของคุณคือตรวจสอบรูปสลิปนี้อย่างเข้มงวดที่สุด เพื่อป้องกันการโกงและสลิปปลอม:
- บัญชีผู้รับที่ถูกต้อง: "นายจิรวัฒน์ เดชเส้ง" หรือ "จิรวัฒน์ เดชเส้ง" หรือ "JIRAWAT DECHSENG" หรือ พร้อมเพย์ "083-539-9340"
- ยอดเงินที่คาดหวัง: ${expectedAmount} บาท (หรือยอดรวมค่าบริการติดตั้ง VIP Setup: ${expectedAmount + 190}, ${expectedAmount + 350}, หรือ ${expectedAmount + 690} บาท)
- วันที่ปัจจุบัน: ${todayBangkok}

กฎการตัดสิน (Strict Rules):
1. ตรวจสอบว่าภาพนี้เป็นสลิปจริง หรือสลิปที่สร้างจากเว็บปลอม/แอปตัดต่อตัวเลข/Photoshop
2. ตรวจสอบ "วันที่ทำรายการ" (Transaction Date): ต้องเป็นรายการของ "วันนี้" เท่านั้น หากเป็นสลิปเก่าข้ามวัน/ย้อนหลัง ให้ตัดสิน REJECTED
3. ตรวจสอบ "ชื่อผู้รับเงิน" (Receiver): ต้องเป็น นายจิรวัฒน์ เดชเส้ง เท่านั้น หากเป็นชื่อคนอื่น หรือเป็นรายการจ่ายบิลร้านค้า ให้ตัดสิน REJECTED
4. ตรวจสอบ "ยอดเงินโอน" (Amount): ต้องตรงกับยอดสินค้า ${expectedAmount} บาท หรือยอดรวมค่าบริการติดตั้ง VIP Setup ได้แก่ ${expectedAmount + 190}, ${expectedAmount + 350}, หรือ ${expectedAmount + 690} บาท หากยอดเงินไม่ตรง เช่น 23,000 หรือยอดอื่น ให้ตัดสิน REJECTED
5. ถ้าสลิปแท้ 100% ชื่อผู้รับตรง ยอดตรง วันที่คือวันนี้ ให้ตัดสิน APPROVED
6. ถ้าภาพตัดทอน ไม่ชัด มีพิรุธ หรือน่าสงสัย ให้ตัดสิน MANUAL_REVIEW หรือ REJECTED`;

    const payload = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: contentType || "image/jpeg",
                data: base64Data,
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            isAuthenticSlip: { type: "BOOLEAN" },
            isFakeOrEdited: { type: "BOOLEAN" },
            receiverMatchesKruAon: { type: "BOOLEAN" },
            detectedReceiverName: { type: "STRING" },
            transferredAmount: { type: "NUMBER" },
            transactionDateText: { type: "STRING" },
            isToday: { type: "BOOLEAN" },
            decision: { type: "STRING", enum: ["APPROVED", "REJECTED", "MANUAL_REVIEW"] },
            reason: { type: "STRING" },
          },
          required: [
            "isAuthenticSlip",
            "isFakeOrEdited",
            "receiverMatchesKruAon",
            "detectedReceiverName",
            "transferredAmount",
            "transactionDateText",
            "isToday",
            "decision",
            "reason",
          ],
        },
        temperature: 0.1,
      },
    };

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      console.error("[Gemini Slip Audit] API error:", await res.text());
      return null;
    }

    const json = await res.json();
    const textResult = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResult) return null;

    return JSON.parse(textResult) as GeminiSlipAudit;
  } catch (err) {
    console.error("[Gemini Slip Audit] Exception:", err);
    return null;
  }
}

export interface VerificationResult {
  status: "approved" | "rejected" | "payment_qr" | "not_a_slip" | "manual_review";
  replyText: string;
  orderTitle?: string;
  actualSlipAmount?: number;
  transRef?: string;
  bankName?: string;
  deliveryUrl?: string;
  extraOneDriveLink?: string | null;
  unlockedCodes?: string[];
}

/**
 * Universal Omnichannel 5-Layer Slip Verification Runner
 */
export async function executeSlipVerification(params: {
  imageBuffer: ArrayBuffer;
  contentType: string;
  userId: string;
  customerName: string;
  channel: "LINE OA" | "Facebook Messenger" | "Instagram Direct" | "TikTok Direct" | "Website Checkout";
}): Promise<VerificationResult> {
  const { imageBuffer, contentType, userId, customerName, channel } = params;

  // ── COLD START HYDRATION (L1 Fast Cache + L2 Google Sheets Sync) ──
  if (!pendingOrders.has(userId) || usedSlipRefs.size === 0) {
    await hydrateCloudStateFromSheets({ timeoutMs: 2200 });

    if (!pendingOrders.has(userId)) {
      const cloudLead = getLead(userId);
      if (cloudLead && cloudLead.lastAmount && cloudLead.lastAmount > 0) {
        pendingOrders.set(userId, {
          userId,
          itemTitle: cloudLead.lastItem || "ระบบ/แพ็กเกจที่เลือกไว้ในแชต",
          baseAmount: cloudLead.lastAmount,
          vipAmount: 0,
          isVipSelected: false,
          orderedAt: cloudLead.lastSeenAt || new Date().toISOString(),
          status: "pending_slip",
        });
      }
    }
  }

  // ── LAYER 1: STRICT PENDING ORDER CHECK (ห้ามรับสลิปลอยเด็ดขาด!) ──
  const pendingOrder = pendingOrders.get(userId);
  if (!pendingOrder || pendingOrder.status !== "pending_slip") {
    console.warn(`[SlipSecurity] REJECTED: User ${userId} sent a slip without an active order.`);
    await sendSlipPhotoToTelegram(
      imageBuffer,
      contentType,
      `🚨 [ตรวจพบการส่งสลิปโดยไม่มีรายการสั่งซื้อใน ${channel}]\n` +
        `👤 ลูกค้า: ${customerName} (ID: ${userId})\n` +
        `⚠️ ผลลัพธ์: ระบบปฏิเสธการส่งมอบไฟล์อัตโนมัติ (ไม่มีออเดอร์ค้างในระบบ)`
    );

    return {
      status: "rejected",
      replyText:
        `⚠️ ขออภัยครับ ระบบไม่พบรายการสั่งซื้อที่รอชำระเงินของท่านในขณะนี้\n\n` +
        `📦 หากท่านต้องการสั่งซื้อระบบหรือแพ็กเกจใด รบกวนพิมพ์แจ้งชื่อสินค้าหรือเลือกรายการในแชตก่อน เพื่อให้ระบบเปิดใบสั่งซื้อและออกยอดชำระที่ถูกต้องให้นะครับ 🙏\n\n` +
        `หากท่านโอนเงินแล้วแต่ไม่มีออเดอร์ โปรดรอสักครู่ ครูอ้นจะเข้ามาตรวจสอบให้โดยตรงครับ ✨`,
    };
  }

  // ── LAYER 2: DECODE BOT SLIP MINI-QR ──
  const qrData = await decodeSlipQrFromImage(imageBuffer, contentType);
  const qrInfo = qrData ? parseBotSlipMiniQr(qrData) : null;

  // Layer 2A: Payment QR Code sent back by accident
  if (qrInfo?.isPaymentQr) {
    return {
      status: "payment_qr",
      replyText:
        `⚠️ ภาพที่ส่งมาเป็น "QR Code สำหรับสแกนจ่ายเงิน" ครับ\n\n` +
        `📲 รบกวนนำภาพ QR Code นี้ไปสแกนจ่ายในแอปธนาคาร แล้วส่งรูป "สลิปโอนเงินสำเร็จ" กลับมาในแชตนี้แทนนะครับ 🙏`,
    };
  }

  // Layer 2B: Missing or unreadable Mini-QR
  if (!qrInfo?.isBankSlipQr) {
    await sendSlipPhotoToTelegram(
      imageBuffer,
      contentType,
      `⚠️ [สลิปไม่มี Mini-QR หรืออ่าน QR ไม่ได้ใน ${channel}]\n` +
        `👤 ลูกค้า: ${customerName}\n` +
        `📦 รายการที่สั่ง: ${pendingOrder.itemTitle} (ยอด ${pendingOrder.baseAmount} บาท)\n` +
        `🛑 ปฏิเสธอัตโนมัติ: สลิปขาด Mini-QR มาตรฐาน ธปท.`
    );
    return {
      status: "rejected",
      replyText:
        `❌ ไม่สามารถยืนยันสลิปได้ครับ เนื่องจากระบบตรวจไม่พบ QR Code มาตรฐานธนาคารแห่งประเทศไทยบนภาพสลิป (หรือภาพถูกตัดทอน/ไม่ชัดเจน)\n\n` +
        `📲 รบกวนส่งไฟล์ภาพสลิปฉบับเต็มที่บันทึกจากแอปธนาคารโดยตรงอีกครั้งนะครับ 🙏`,
    };
  }

  const bankName = qrInfo.bankName || "ธนาคารไทย";
  const transRef = qrInfo.transRef || "";

  // ── LAYER 3: ANTI-DUPLICATE REF (กันสลิปซ้ำข้ามแพลตฟอร์ม & ข้าม Cold Start) ──
  const isDuplicateSlip =
    Boolean(transRef) &&
    (usedSlipRefs.has(transRef) || (await checkSlipUsedInCloud(transRef, 2000)));

  if (isDuplicateSlip) {
    await sendSlipPhotoToTelegram(
      imageBuffer,
      contentType,
      `🚨 [ตรวจพบการใช้สลิปซ้ำ (Duplicate Ref) ใน ${channel}]\n` +
        `👤 ลูกค้า: ${customerName}\n` +
        `🔖 Ref ที่ซ้ำ: ${transRef}\n` +
        `🛑 ปฏิเสธอัตโนมัติ: สลิปนี้เคยถูกใช้เคลมไฟล์ไปแล้ว!`
    );
    return {
      status: "rejected",
      replyText:
        `⚠️ สลิปหมายเลขรายการอ้างอิง (${transRef.slice(0, 18)}) นี้เคยถูกใช้ยืนยันในระบบไปแล้วครับ\n` +
        `หากท่านสั่งซื้อรายการใหม่ รบกวนส่งรูปสลิปของการโอนเงินครั้งล่าสุดนะครับ 🙏`,
    };
  }

  // ── LAYER 4: GEMINI 2.5 FLASH MULTIMODAL AUDIT (ตรวจสลิปปลอม + วันที่ + ชื่อ + ยอดเงิน) ──
  const expectedAmount = pendingOrder.baseAmount;
  const geminiAudit = await auditSlipWithGeminiVision(
    imageBuffer,
    contentType,
    expectedAmount
  );

  if (geminiAudit) {
    console.log(`[Gemini Slip Audit]:`, geminiAudit);

    // 4A. ตรวจจับสลิปปลอม / ตัดต่อ
    if (geminiAudit.isFakeOrEdited || !geminiAudit.isAuthenticSlip) {
      await sendSlipPhotoToTelegram(
        imageBuffer,
        contentType,
        `🚨🚨 [AI ตรวจพบสลิปปลอม/ตัดต่อ/น่าสงสัย ใน ${channel}!]\n` +
          `👤 ลูกค้า: ${customerName}\n` +
          `📦 รายการที่สั่ง: ${pendingOrder.itemTitle}\n` +
          `📌 เหตุผล: ${geminiAudit.reason}\n` +
          `🛑 ระบบปฏิเสธและล็อคดาวน์โหลดทันที!`
      );
      return {
        status: "rejected",
        replyText:
          `❌ ระบบไม่สามารถยืนยันสลิปนี้ได้ เนื่องจากตรวจพบความไม่ถูกต้องของข้อมูลสลิป\n\n` +
          `หากท่านโอนเงินจริง รบกวนติดต่อครูอ้นโดยตรงเพื่อตรวจสอบรายการเดินบัญชีนะครับ 🙏`,
      };
    }

    // 4B. ตรวจสอบวันที่ทำรายการ (ต้องเป็นวันนี้เท่านั้น!)
    if (!geminiAudit.isToday) {
      await sendSlipPhotoToTelegram(
        imageBuffer,
        contentType,
        `⚠️ [สลิปเก่าข้ามวัน / สลิปย้อนหลัง ใน ${channel}]\n` +
          `👤 ลูกค้า: ${customerName}\n` +
          `📅 วันที่ในสลิป: ${geminiAudit.transactionDateText}\n` +
          `🛑 ปฏิเสธอัตโนมัติ: วันที่ไม่ใช่วันที่ปัจจุบัน`
      );
      return {
        status: "rejected",
        replyText:
          `❌ วันที่ทำรายการในสลิป (${geminiAudit.transactionDateText}) ไม่ใช่วันที่ทำรายการปัจจุบันของวันนี้ครับ\n\n` +
          `📲 รบกวนส่งรูปสลิปการโอนเงินที่ทำรายการล่าสุดของวันนี้นะครับ 🙏`,
      };
    }

    // 4C. ตรวจสอบชื่อบัญชีผู้รับเงิน
    if (!geminiAudit.receiverMatchesKruAon) {
      await sendSlipPhotoToTelegram(
        imageBuffer,
        contentType,
        `⚠️ [ชื่อผู้รับในสลิปไม่ตรงกับครูอ้น ใน ${channel}]\n` +
          `👤 ลูกค้า: ${customerName}\n` +
          `🎯 ผู้รับในสลิป: ${geminiAudit.detectedReceiverName}\n` +
          `🛑 ปฏิเสธอัตโนมัติ: ผู้รับไม่ใช่ นายจิรวัฒน์ เดชเส้ง`
      );
      return {
        status: "rejected",
        replyText:
          `❌ ชื่อบัญชีผู้รับเงินในสลิปไม่ตรงกับบัญชีของครูอ้นครับ\n` +
          `• ในสลิปโอนไปยัง: "${geminiAudit.detectedReceiverName}"\n` +
          `• บัญชีที่ถูกต้อง: "${PROMPTPAY_NAME}" (พร้อมเพย์ 083-539-9340)\n\n` +
          `กรุณาตรวจสอบบัญชีปลายทางและทำรายการโอนใหม่อีกครั้งนะครับ 🙏`,
      };
    }

    // 4D. ตรวจสอบยอดเงิน (ต้องตรงกับราคาออเดอร์ หรือยอดบวกค่าบริการติดตั้ง VIP Setup Tier 1: +190, Tier 2: +350, Tier 3: +690)
    const actualSlipAmount = geminiAudit.transferredAmount || 0;
    const vipTiers = [190, 350, 690];
    if (pendingOrder.vipAmount && !vipTiers.includes(pendingOrder.vipAmount)) {
      vipTiers.push(pendingOrder.vipAmount);
    }
    const validExpectedAmounts = [
      expectedAmount,
      ...vipTiers.map((tier) => expectedAmount + tier),
    ];
    const amountMatches = validExpectedAmounts.some(
      (validAmt) => Math.abs(actualSlipAmount - validAmt) < 0.01
    );

    if (!amountMatches) {
      await sendSlipPhotoToTelegram(
        imageBuffer,
        contentType,
        `🚨 [ยอดเงินในสลิปไม่ตรงกับยอดที่สั่งซื้อ ใน ${channel}]\n` +
          `👤 ลูกค้า: ${customerName}\n` +
          `📦 รายการที่สั่ง: ${pendingOrder.itemTitle}\n` +
          `💵 ยอดที่ต้องจ่าย: ${expectedAmount.toLocaleString()} บาท\n` +
          `💵 ยอดจริงในสลิป: ${actualSlipAmount.toLocaleString()} บาท\n` +
          `🛑 ปฏิเสธอัตโนมัติ: ยอดเงินไม่ตรงกับสินค้า!`
      );
      return {
        status: "rejected",
        replyText:
          `❌ ยอดเงินโอนในสลิป (${actualSlipAmount.toLocaleString("th-TH", { minimumFractionDigits: 2 })} บาท) ไม่ตรงกับยอดที่ต้องชำระของรายการสั่งซื้อ (${expectedAmount.toLocaleString("th-TH", { minimumFractionDigits: 2 })} บาท) ครับ\n\n` +
          `📦 รายการที่สั่ง: ${pendingOrder.itemTitle}\n` +
          `📲 กรุณาตรวจสอบยอดเงิน หรือหากประสงค์จะสั่งซื้อแพ็กเกจอื่น รบกวนแจ้งครูอ้นในแชตได้เลยนะครับ 🙏`,
      };
    }

    // 4E. หาก AI ตัดสินใจเป็น MANUAL_REVIEW หรือยอดเงินสูงผิดปกติ (> 3,000 ฿) ให้รอครูอ้นตรวจ
    if (geminiAudit.decision === "MANUAL_REVIEW" || actualSlipAmount > 3000) {
      await sendSlipPhotoToTelegram(
        imageBuffer,
        contentType,
        `⏳ [สลิปยอดสูง/ต้องรอครูอ้นอนุมัติ ใน ${channel}]\n` +
          `👤 ลูกค้า: ${customerName}\n` +
          `📦 สินค้า: ${pendingOrder.itemTitle}\n` +
          `💵 ยอดเงิน: ${actualSlipAmount.toLocaleString()} บาท\n` +
          `📌 เหตุผล: ${geminiAudit.reason}\n` +
          `⚠️ ระบบยังไม่ส่งลิงก์ดาวน์โหลด เพื่อรอครูอ้นเช็กเงินเข้าบัญชีจริงก่อน!`
      );

      return {
        status: "manual_review",
        replyText:
          `⏳ ระบบได้รับสลิปโอนเงินเรียบร้อยแล้วครับ!\n\n` +
          `📦 รายการ: ${pendingOrder.itemTitle}\n` +
          `💵 ยอดเงิน: ${actualSlipAmount.toLocaleString("th-TH", { minimumFractionDigits: 2 })} บาท\n` +
          `━━━━━━━━━━━━━━━\n` +
          `เนื่องจากเป็นรายการที่มีมูลค่าสูง ระบบได้ส่งภาพสลิปให้ครูอ้นตรวจสอบยอดเงินในบัญชีธนาคารโดยตรงแล้วครับ โดยครูอ้นจะตรวจสอบและตอบกลับโดยตรงในรอบเวลาพักเที่ยง (12:00–13:00 น.) หรือหลังเลิกเรียน (16:30–22:00 น.) ครับ เมื่อยืนยันยอดเงินเรียบร้อย จะส่งมอบลิงก์ดาวน์โหลดให้ทันทีในแชตนี้ครับผม ขอบคุณมากครับ 🙏✨`,
      };
    }
  } else {
    // If Gemini Vision was unavailable, fail-closed for safety!
    console.warn(`[SlipSecurity] Gemini Vision unavailable, falling back to manual review.`);
    await sendSlipPhotoToTelegram(
      imageBuffer,
      contentType,
      `⚠️ [ไม่สามารถรัน Gemini AI Vision ได้ ส่งให้ครูอ้นตรวจด้วยตัวเอง ใน ${channel}]\n` +
        `👤 ลูกค้า: ${customerName}\n` +
        `📦 สินค้า: ${pendingOrder.itemTitle}`
    );
    return {
      status: "manual_review",
      replyText:
        `⏳ ระบบได้รับสลิปเรียบร้อยแล้วครับ ขณะนี้ระบบได้ส่งภาพสลิปให้ครูอ้นตรวจสอบยอดเงินในบัญชีโดยตรง โดยครูอ้นจะตรวจสอบและตอบกลับโดยตรงในรอบเวลาพักเที่ยง (12:00–13:00 น.) หรือหลังเลิกเรียน (16:30–22:00 น.) ครับ เมื่อยืนยันเรียบร้อยแล้วจะส่งลิงก์ดาวน์โหลดให้ทันทีครับผม ขอบคุณมากครับ 🙏✨`,
    };
  }

  // ── LAYER 5: APPROVE & INSTANT ENCRYPTED DELIVERY ──
  const actualAmount = geminiAudit.transferredAmount || expectedAmount;
  const minVipTier = pendingOrder.vipAmount ? Math.min(190, pendingOrder.vipAmount) : 190;
  const paidForVipSetup = actualAmount >= expectedAmount + minVipTier - 0.01;
  const orderTitle = pendingOrder.itemTitle;

  // Mark slip ref as used to prevent replay
  if (transRef) {
    usedSlipRefs.add(transRef);
  }

  pendingOrder.status = "verified_paid";
  pendingOrder.verifiedRef = transRef;
  pendingOrder.verifiedBank = bankName;
  pendingOrders.set(userId, pendingOrder);

  markLeadAsPaid(userId, transRef, actualAmount, orderTitle);
  flagConversationAsGolden({
    userId,
    displayName: customerName,
    product: orderTitle,
    amount: actualAmount,
    transRef,
  });

  const { url: baseSignedDeliveryUrl, codes: unlockedCodes } = buildSignedDeliveryUrl(
    orderTitle,
    transRef
  );
  const signedDeliveryUrl = paidForVipSetup
    ? `${baseSignedDeliveryUrl}&vip=1`
    : baseSignedDeliveryUrl;
  const extraOneDriveLink = findInstantDownloadLink(orderTitle);

  const hasPrep = unlockedCodes.includes("PREP01");
  const hasAiCaretaker = unlockedCodes.includes("AIC01") || unlockedCodes.includes("AIC02");
  const isEbookOrder = unlockedCodes.some((c) => /^EB\d{2}$/.test(c));
  const isMusicOrder = unlockedCodes.some((c) => /^(?:MUS|BGM|CUS)-/.test(c) || /^STU-0[12]$/.test(c));

  const deliveryLabel = isEbookOrder
    ? "📚 ลิงก์เปิดอ่าน E-Book ออนไลน์ (พิมพ์ PDF A4) & ดาวน์โหลดชุดไฟล์"
    : isMusicOrder
    ? "🎵 ลิงก์ดาวน์โหลดแพ็กเกจเพลง & ใบรับรองลิขสิทธิ์ (Commercial License)"
    : "📥 ลิงก์ดาวน์โหลดชุดไฟล์ติดตั้งของคุณ";

  const prepSection = hasPrep
    ? `\n👑 สิทธิ์เข้ากลุ่มติวสอบครูผู้ช่วย VIP & บอทข้อสอบ Telegram:\n` +
      `• กดปุ่มสีทองในลิงก์พอร์ทัลด้านบน หรือแจ้งรหัสอ้างอิงสลิป (${transRef.slice(0, 12)}) ในแชตนี้เพื่อรับลิงก์เข้ากลุ่มลับ Telegram VIP ทันทีครับ!\n`
    : "";

  const onboardingSection =
    hasAiCaretaker || paidForVipSetup
      ? `\n🛠️ แบบฟอร์มส่งข้อมูลบรีฟติดตั้งระบบ (VIP Setup / AI Caretaker):\n` +
        `• กรุณาแจ้งข้อมูลในแชตนี้ หรือกดปุ่มส่งบรีฟในลิงก์ด้านบน:\n` +
        `  1) ชื่อโรงเรียน / ชื่อร้านค้า หรือหน่วยงาน + โลโก้\n` +
        `  2) อีเมล (Gmail) สำหรับรับสิทธิ์เจ้าของระบบ\n` +
        `  3) ชื่อเพจ Facebook / LINE OA (กรณีติดตั้ง AI Caretaker)\n`
      : `\n📩 ขั้นตอนเสริม: รบกวนพิมพ์แจ้ง "อีเมล (Gmail)" ของท่านทิ้งไว้ในแชตนี้ได้เลยครับ เพื่อรับสิทธิ์อัปเดตเวอร์ชันใหม่ฟรีตลอดชีพ! 🙏⚡`;

  await sendSlipPhotoToTelegram(
    imageBuffer,
    contentType,
    `💰 [ตรวจสลิปแท้ครบ 5 ชั้นผ่านฉลุยใน ${channel}! ส่งลิงก์โหลดอัตโนมัติเรียบร้อย]\n` +
      `👤 ลูกค้า: ${customerName}\n` +
      `📦 สินค้า: ${orderTitle}${paidForVipSetup ? " (+ บริการติดตั้ง VIP Setup)" : ""}\n` +
      `🗂️ รหัสไฟล์ที่ปลดล็อก: ${unlockedCodes.join(", ")}\n` +
      `💵 ยอดเงินในสลิปจริง: ${actualAmount.toLocaleString("th-TH", { minimumFractionDigits: 2 })} บาท\n` +
      `🎯 ผู้รับเงินในสลิป: ${geminiAudit.detectedReceiverName}\n` +
      `🏦 ธนาคารต้นทาง: ${bankName}\n` +
      (transRef ? `🔖 เลขอ้างอิงสลิป (Ref): ${transRef.slice(0, 18)}\n` : "") +
      `📥 ลิงก์ที่ส่งให้ลูกค้า: ${signedDeliveryUrl}`
  );

  const replyText =
    `✅ ตรวจสอบสลิปโอนเงินสำเร็จ! (Verified Bank Slip)\n` +
    `━━━━━━━━━━━━━━━\n` +
    `📦 รายการ: ${orderTitle}${paidForVipSetup ? " (รวมบริการติดตั้ง VIP Setup 🛠️)" : ""}\n` +
    `💵 ยอดโอนจริงในสลิป: ${actualAmount.toLocaleString("th-TH", { minimumFractionDigits: 2 })} บาท\n` +
    `👤 ผู้รับเงิน: ${PROMPTPAY_NAME}\n` +
    `🏦 ข้อมูลสลิป: ${bankName}\n` +
    (transRef ? `🔖 เลขที่อ้างอิง: ${transRef.slice(0, 18)}\n` : "") +
    `━━━━━━━━━━━━━━━\n` +
    `${deliveryLabel} (${unlockedCodes.join(", ")} — คลิกเปิดได้ทันที):\n` +
    `${signedDeliveryUrl}\n` +
    (extraOneDriveLink ? `\n☁️ ลิงก์สำรอง OneDrive:\n${extraOneDriveLink}\n` : "") +
    prepSection +
    onboardingSection;

  return {
    status: "approved",
    replyText,
    orderTitle,
    actualSlipAmount: actualAmount,
    transRef,
    bankName,
    deliveryUrl: signedDeliveryUrl,
    extraOneDriveLink,
    unlockedCodes,
  };
}

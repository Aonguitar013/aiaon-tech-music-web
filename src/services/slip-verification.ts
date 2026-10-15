/**
 * =========================================================================
 * 🛡️ 5-Layer Bank Slip Verification Engine (Omnichannel Shared Core)
 * รองรับทั้ง LINE OA (@deu6776s) และ Facebook Messenger เพจ AiAon Tech
 * โดย ครูจิรวัฒน์ เดชเส้ง (ครูอ้น) — AiAon Tech
 * =========================================================================
 */

import { buildSignedDeliveryUrl } from "@/utils/delivery-links";
import { markLeadAsPaid } from "@/services/lead-tracker";
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

export interface SlipOcrAnalysis {
  ocrSucceeded: boolean;
  looksLikeSlipText: boolean;
  isBillPayment: boolean;
  receiverMatchesKruAon: boolean;
  detectedReceiverName: string;
  slipAmount: number | null;
  rawText: string;
}

export async function extractSlipOcrText(
  imageBuffer: ArrayBuffer,
  contentType: string
): Promise<string | null> {
  try {
    const formData = new FormData();
    const ext = contentType.includes("png") ? "png" : "jpg";
    formData.append("file", new Blob([imageBuffer], { type: contentType }), `slip.${ext}`);
    formData.append("language", "tha");
    formData.append("isOverlayRequired", "false");

    const res = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      headers: {
        apikey: process.env.OCR_SPACE_API_KEY || "helloworld",
      },
      body: formData,
    });
    if (!res.ok) return null;
    const data = await res.json();
    const parsedText = data?.ParsedResults?.[0]?.ParsedText;
    return typeof parsedText === "string" && parsedText.trim().length > 0
      ? parsedText
      : null;
  } catch (err) {
    console.error("[Slip OCR Error]:", err);
    return null;
  }
}

export function analyzeSlipOcrText(ocrText: string | null): SlipOcrAnalysis {
  if (!ocrText) {
    return {
      ocrSucceeded: false,
      looksLikeSlipText: false,
      isBillPayment: false,
      receiverMatchesKruAon: false,
      detectedReceiverName: "ไม่สามารถอ่านชื่อผู้รับได้",
      slipAmount: null,
      rawText: "",
    };
  }

  const cleanText = ocrText.split(/ตรวจสอบสลิปโอนเงินสำเร็จ|Verified Bank Slip/i)[0] || ocrText;
  const lines = cleanText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const looksLikeSlipText =
    /โอนเงิน|จ่ายบิล|ทำรายการ|รหัสอ้างอิง|เลขที่รายการ|จำนวนเงิน|ค่าธรรมเนียม|ไปยัง|พร้อมเพย์/i.test(
      cleanText
    );

  const isBillPayment = /จ่ายบิลสำเร็จ|รหัสร้านค้า|biller\s*id/i.test(cleanText);

  let receiverSection = "";
  let detectedReceiverName = "ไม่ระบุชื่อผู้รับ";

  const toMarkerIdx = lines.findIndex((line) =>
    /^(ไปยัง|ไปที่|เข้าบัญชี|ผู้รับเงิน|ผู้รับโอน|ถึง|to\b)/i.test(line)
  );

  if (toMarkerIdx !== -1) {
    const afterMarkerSameLine = lines[toMarkerIdx]
      .replace(/^(ไปยัง|ไปที่|เข้าบัญชี|ผู้รับเงิน|ผู้รับโอน|ถึง|to)\s*:?\s*/i, "")
      .trim();

    const receiverLines = afterMarkerSameLine
      ? [afterMarkerSameLine, ...lines.slice(toMarkerIdx + 1, toMarkerIdx + 6)]
      : lines.slice(toMarkerIdx + 1, toMarkerIdx + 6);

    receiverSection = receiverLines.join("\n");

    const firstNameLine = receiverLines.find(
      (l) =>
        l.length >= 2 &&
        !/^(รหัสร้านค้า|รหัสธุรกรรม|จำนวนเงิน|ค่าธรรมเนียม|วันที่ทำรายการ|เลขที่รายการ)$/i.test(l)
    );
    if (firstNameLine) {
      detectedReceiverName = firstNameLine;
    }
  } else {
    const fromIdx = lines.findIndex((line) => /^(จาก|ผู้โอน|from\b)/i.test(line));
    if (fromIdx !== -1) {
      receiverSection = lines.slice(fromIdx + 4).join("\n");
    } else {
      receiverSection = lines.slice(Math.min(4, Math.floor(lines.length / 3))).join("\n");
    }

    const candidateLine = receiverSection
      .split("\n")
      .find((l) => /จิรวัฒน์|เดชเส้ง|jirawat|dechseng|นาย|นาง|น\.ส\.|บจก\.|amz|ร้าน/i.test(l));
    if (candidateLine) {
      detectedReceiverName = candidateLine;
    }
  }

  const receiverNamePattern =
    /จิรวัฒน์|เดชเส้ง|jirawat|dechseng|083[-\s]*539[-\s]*9340|0835399340|xx9340|-9340/i;

  const receiverMatchesKruAon =
    !isBillPayment && receiverNamePattern.test(receiverSection);

  let slipAmount: number | null = null;
  const decimalMatches = Array.from(
    cleanText.matchAll(/(\d{1,3}(?:,\d{3})*\.\d{2}|\d+\.\d{2})/g)
  );

  for (const match of decimalMatches) {
    const val = parseFloat(match[1].replace(/,/g, ""));
    if (!isNaN(val) && val > 0) {
      slipAmount = val;
      break;
    }
  }

  return {
    ocrSucceeded: true,
    looksLikeSlipText,
    isBillPayment,
    receiverMatchesKruAon,
    detectedReceiverName,
    slipAmount,
    rawText: cleanText,
  };
}

export interface VerificationResult {
  status: "approved" | "rejected" | "payment_qr" | "not_a_slip";
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
  channel: "LINE OA" | "Facebook Messenger";
}): Promise<VerificationResult> {
  const { imageBuffer, contentType, userId, customerName, channel } = params;

  // 1. Run QR Code Decoder AND Thai OCR in parallel
  const [qrData, ocrText] = await Promise.all([
    decodeSlipQrFromImage(imageBuffer, contentType),
    extractSlipOcrText(imageBuffer, contentType),
  ]);

  const qrInfo = qrData ? parseBotSlipMiniQr(qrData) : null;
  const ocrAnalysis = analyzeSlipOcrText(ocrText);

  // Layer 1A: Payment QR Code sent back by accident
  if (qrInfo?.isPaymentQr) {
    return {
      status: "payment_qr",
      replyText:
        `⚠️ ภาพที่ส่งมาเป็น "QR Code สำหรับสแกนจ่ายเงิน" ครับ\n\n` +
        `📲 รบกวนนำภาพ QR Code นี้ไปสแกนจ่ายในแอปธนาคาร แล้วส่งรูป "สลิปโอนเงินสำเร็จ" กลับมาในแชตนี้แทนนะครับ 🙏`,
    };
  }

  // Layer 1B: Not a bank slip
  if (!qrInfo?.isBankSlipQr && !ocrAnalysis.looksLikeSlipText) {
    return {
      status: "not_a_slip",
      replyText: "",
    };
  }

  const pendingOrder = pendingOrders.get(userId);
  const bankName = qrInfo?.bankName || "ธนาคารไทย";
  const transRef = qrInfo?.transRef || "";

  // Layer 1C: Missing or unreadable Mini-QR
  if (!qrInfo?.isBankSlipQr) {
    await sendSlipPhotoToTelegram(
      imageBuffer,
      contentType,
      `⚠️ [สลิปไม่มี Mini-QR หรืออ่าน QR ไม่ได้ใน ${channel}]\n` +
        `👤 ลูกค้า: ${customerName}\n` +
        `📦 รายการ: ${pendingOrder?.itemTitle || "ไม่ระบุ"}`
    );
    return {
      status: "rejected",
      replyText:
        `❌ ไม่สามารถยืนยันสลิปได้ครับ เนื่องจากระบบตรวจไม่พบ QR Code มาตรฐานธนาคารแห่งประเทศไทยบนภาพสลิป (หรือภาพถูกตัดทอน/ไม่ชัดเจน)\n\n` +
        `📲 รบกวนส่งไฟล์ภาพสลิปฉบับเต็มที่บันทึกจากแอปธนาคารโดยตรงอีกครั้งนะครับ 🙏`,
    };
  }

  // Layer 1D: OCR failed
  if (!ocrAnalysis.ocrSucceeded || ocrAnalysis.slipAmount === null) {
    await sendSlipPhotoToTelegram(
      imageBuffer,
      contentType,
      `⚠️ [สลิปอ่านตัวเลขยอดเงินไม่ชัดเจน รอครูอ้นตรวจใน ${channel}]\n` +
        `👤 ลูกค้า: ${customerName}\n` +
        `📦 รายการ: ${pendingOrder?.itemTitle || "ไม่ระบุ"}\n` +
        `🏦 ธนาคาร: ${bankName} (Ref: ${transRef.slice(0, 18)})`
    );
    return {
      status: "rejected",
      replyText:
        `⚠️ ภาพสลิปตัวหนังสือหรือยอดเงินไม่ชัดเจนครับ ระบบขออนุญาตส่งให้ครูอ้นตรวจสอบยอดเงินโดยตรง หรือรบกวนส่งไฟล์สลิปใหม่อีกครั้งนะครับ 🙏`,
    };
  }

  const failureReasons: string[] = [];

  // Layer 2: Receiver Check
  if (ocrAnalysis.isBillPayment || !ocrAnalysis.receiverMatchesKruAon) {
    failureReasons.push(
      `❌ ชื่อบัญชีผู้รับเงินไม่ตรง:\n` +
        `   • ในสลิปโอนไปยัง: "${ocrAnalysis.detectedReceiverName}"${ocrAnalysis.isBillPayment ? " (รายการจ่ายบิลร้านค้า)" : ""}\n` +
        `   • บัญชีที่ถูกต้องต้องเป็น: "${PROMPTPAY_NAME}" (พร้อมเพย์ 083-539-9340)`
    );
  }

  // Layer 3: Amount Check
  const expectedAmount = pendingOrder?.baseAmount || 0;
  const actualSlipAmount = ocrAnalysis.slipAmount;

  if (expectedAmount > 0 && actualSlipAmount < expectedAmount) {
    const diff = expectedAmount - actualSlipAmount;
    failureReasons.push(
      `❌ ยอดเงินโอนในสลิปไม่ตรงกับราคาสินค้า:\n` +
        `   • ยอดเงินในสลิป: ${actualSlipAmount.toLocaleString("th-TH", { minimumFractionDigits: 2 })} บาท\n` +
        `   • ยอดที่ต้องชำระ: ${expectedAmount.toLocaleString("th-TH", { minimumFractionDigits: 2 })} บาท (ขาดอีก ${diff.toLocaleString()} บาท)\n` +
        `   • รายการที่สั่ง: ${pendingOrder?.itemTitle}`
    );
  }

  if (failureReasons.length > 0) {
    await sendSlipPhotoToTelegram(
      imageBuffer,
      contentType,
      `🚨 [ตรวจพบสลิปไม่ถูกต้องใน ${channel} — ระบบปฏิเสธอัตโนมัติ!]\n` +
        `👤 ลูกค้า: ${customerName}\n` +
        `📦 รายการที่สั่ง: ${pendingOrder?.itemTitle || "ไม่ได้เลือกไว้"}\n` +
        `🏦 ธนาคารในสลิป: ${bankName} (Ref: ${transRef.slice(0, 18)})\n` +
        `💵 ยอดในสลิปจริง: ${actualSlipAmount.toLocaleString()} บาท (ต้องจ่าย ${expectedAmount.toLocaleString()} บาท)\n` +
        `🎯 ผู้รับในสลิป: ${ocrAnalysis.detectedReceiverName}\n` +
        `📌 สาเหตุที่ปฏิเสธ:\n${failureReasons.join("\n")}`
    );

    return {
      status: "rejected",
      replyText:
        `⚠️ ตรวจสอบสลิปไม่ผ่านครับ ระบบพบข้อมูลไม่ตรงกับรายการสั่งซื้อดังนี้:\n` +
        `━━━━━━━━━━━━━━━\n` +
        `${failureReasons.join("\n\n")}\n` +
        `━━━━━━━━━━━━━━━\n` +
        `📲 กรุณาตรวจสอบและส่งรูปสลิปที่โอนเข้าบัญชี "${PROMPTPAY_NAME} (083-539-9340)" ตามยอดชำระที่ถูกต้องอีกครั้งนะครับ 🙏`,
    };
  }

  // Layer 4: Anti-Duplicate Ref
  if (transRef && usedSlipRefs.has(transRef)) {
    return {
      status: "rejected",
      replyText:
        `⚠️ สลิปหมายเลขรายการอ้างอิง (${transRef.slice(0, 18)}) นี้เคยถูกใช้ยืนยันในระบบไปแล้วครับ\n` +
        `หากท่านสั่งซื้อรายการใหม่ รบกวนส่งรูปสลิปของการโอนเงินครั้งล่าสุดนะครับ 🙏`,
    };
  }
  if (transRef) {
    usedSlipRefs.add(transRef);
  }

  let paidForVipSetup = pendingOrder?.isVipSelected || false;
  if (
    pendingOrder &&
    pendingOrder.vipAmount > 0 &&
    actualSlipAmount >= pendingOrder.baseAmount + pendingOrder.vipAmount
  ) {
    paidForVipSetup = true;
  }

  const orderTitle = pendingOrder?.itemTitle || "รายการสั่งซื้อระบบ/แพ็กเกจ AiAon Tech";
  if (pendingOrder) {
    pendingOrder.status = "verified_paid";
    pendingOrder.verifiedRef = transRef;
    pendingOrder.verifiedBank = bankName;
    pendingOrders.set(userId, pendingOrder);
  }

  markLeadAsPaid(userId, transRef, actualSlipAmount, orderTitle);
  flagConversationAsGolden({
    userId,
    displayName: customerName,
    product: orderTitle,
    amount: actualSlipAmount,
    transRef,
  });

  // Layer 5: Delivery URL + Telegram Alert
  const { url: signedDeliveryUrl, codes: unlockedCodes } = buildSignedDeliveryUrl(
    orderTitle,
    transRef
  );
  const extraOneDriveLink = findInstantDownloadLink(orderTitle);

  await sendSlipPhotoToTelegram(
    imageBuffer,
    contentType,
    `💰 [ตรวจสลิปแท้ครบ 5 ชั้นผ่านแล้วใน ${channel}! ส่งลิงก์โหลดอัตโนมัติเรียบร้อย]\n` +
      `👤 ลูกค้า: ${customerName}\n` +
      `📦 สินค้า: ${orderTitle}${paidForVipSetup ? " (+ บริการติดตั้ง VIP Setup)" : ""}\n` +
      `🗂️ รหัสไฟล์ที่ปลดล็อก: ${unlockedCodes.join(", ")}\n` +
      `💵 ยอดเงินในสลิปจริง: ${actualSlipAmount.toLocaleString("th-TH", { minimumFractionDigits: 2 })} บาท\n` +
      `🎯 ผู้รับเงินในสลิป: ${ocrAnalysis.detectedReceiverName}\n` +
      `🏦 ธนาคารต้นทาง: ${bankName}\n` +
      (transRef ? `🔖 เลขอ้างอิงสลิป (Ref): ${transRef.slice(0, 18)}\n` : "") +
      `📥 ลิงก์ที่ส่งให้ลูกค้า: ${signedDeliveryUrl}`
  );

  const replyText =
    `✅ ตรวจสอบสลิปโอนเงินสำเร็จ! (Verified Bank Slip)\n` +
    `━━━━━━━━━━━━━━━\n` +
    `📦 รายการ: ${orderTitle}${paidForVipSetup ? " (รวมบริการติดตั้ง VIP Setup 🛠️)" : ""}\n` +
    `💵 ยอดโอนจริงในสลิป: ${actualSlipAmount.toLocaleString("th-TH", { minimumFractionDigits: 2 })} บาท\n` +
    `👤 ผู้รับเงิน: ${PROMPTPAY_NAME}\n` +
    `🏦 ข้อมูลสลิป: ${bankName}\n` +
    (transRef ? `🔖 เลขที่อ้างอิง: ${transRef.slice(0, 18)}\n` : "") +
    `━━━━━━━━━━━━━━━\n` +
    `📥 ลิงก์ดาวน์โหลดชุดไฟล์ติดตั้งของคุณ (${unlockedCodes.join(", ")}.ZIP — คลิกโหลดได้ทันที):\n` +
    `${signedDeliveryUrl}\n` +
    (extraOneDriveLink ? `\n☁️ ลิงก์สำรอง OneDrive:\n${extraOneDriveLink}\n` : "") +
    `\n📩 ขั้นตอนเสริม: รบกวนพิมพ์แจ้ง "อีเมล (Gmail)" ของท่าน${
      paidForVipSetup ? " และชื่อโรงเรียน" : ""
    } ทิ้งไว้ในแชตนี้ได้เลยครับ เพื่อรับสิทธิ์อัปเดตเวอร์ชันใหม่ฟรีตลอดชีพ! 🙏⚡`;

  return {
    status: "approved",
    replyText,
    orderTitle,
    actualSlipAmount,
    transRef,
    bankName,
    deliveryUrl: signedDeliveryUrl,
    extraOneDriveLink,
    unlockedCodes,
  };
}

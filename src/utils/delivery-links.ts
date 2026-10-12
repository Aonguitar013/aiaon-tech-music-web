import crypto from "crypto";

const DELIVERY_SECRET =
  process.env.DELIVERY_SIGNING_SECRET || "AiAonTech_2026_Master_Vault_Secret_Key_0835399340";

/**
 * Resolve one or more system package codes (e.g. ["AONE01"], ["PREP01"], or bundle codes)
 * from any product/package title sent via LINE OA.
 */
export function resolveProductCodesFromTitle(title: string): string[] {
  const upper = title.toUpperCase();

  // 1. Check for explicit code in title (e.g. AONA01..08, AONE01..12, AONM01..03, STU01..03, SYS01..30, PREP01, AIC01)
  const explicitMatches = Array.from(
    upper.matchAll(/\b(AONA0[1-8]|AONE(?:0[1-9]|1[0-2])|AONM0[1-3]|STU0[1-3]|SYS(?:0[1-9]|[12]\d|30)|PREP01|AIC0[12])\b/g)
  ).map((m) => m[1]);

  if (explicitMatches.length > 0) {
    return Array.from(new Set(explicitMatches));
  }

  // 2. Check for Bundles & Flagship Packages
  if (
    upper.includes("PREP") ||
    title.includes("ครูผู้ช่วย") ||
    upper.includes("EXAM PASS") ||
    title.includes("ติวสอบ")
  ) {
    return ["PREP01"];
  }

  if (
    upper.includes("CARETAKER") ||
    title.includes("เฝ้าดูแล") ||
    upper.includes("SMART SHOP") ||
    upper.includes("SMART BOOKING")
  ) {
    return ["AIC01", "AIC02"];
  }

  if (
    title.includes("เหมาคลัง") ||
    upper.includes("ALL-IN-ONE") ||
    title.includes("20 ระบบ") ||
    title.includes("ทุกหมวด")
  ) {
    return [
      "AONA01", "AONA02", "AONA03", "AONA04", "AONA05", "AONA06", "AONA07", "AONA08",
      "AONE01", "AONE02", "AONE03", "AONE04", "AONE05", "AONE06", "AONE07", "AONE08", "AONE09", "AONE10", "AONE11", "AONE12",
      "AONM01", "AONM02", "AONM03",
      "STU01", "STU02", "STU03",
    ];
  }

  if (title.includes("ครูประจำชั้น") || upper.includes("HOMEROOM")) {
    return ["AONE01", "AONE02", "AONE03", "AONE08", "AONE10"];
  }

  if (title.includes("ชุดวิชาการ") || (title.includes("แพ็กเกจ") && title.includes("วิทยฐานะ"))) {
    return ["AONA07", "AONA08", "AONE04", "AONE06", "AONE09"];
  }

  if (title.includes("ผู้บริหาร") || title.includes("ธุรการโรงเรียน")) {
    return ["AONA01", "AONA02", "AONA03", "AONA04", "AONA05", "AONA06"];
  }

  if (title.includes("เซ็ตนักเรียน") || (title.includes("แพ็กเกจ") && title.includes("TCAS"))) {
    return ["STU01", "STU02", "STU03"];
  }

  // 3. Individual System Keyword Matching
  if (title.includes("สารบรรณ") || title.includes("รับ-ส่ง")) return ["AONA01"];
  if (title.includes("ยานพาหนะ") || title.includes("รถโรงเรียน")) return ["AONA02"];
  if (title.includes("เกียรติบัตร") || upper.includes("CERTIFICATE")) return ["AONA03"];
  if (title.includes("ครุภัณฑ์") || title.includes("พัสดุ") || title.includes("ทรัพย์สิน")) return ["AONA04"];
  if (title.includes("ยืม-คืน") || title.includes("ห้องปฏิบัติการ")) return ["AONA05"];
  if (title.includes("บันทึกข้อความ")) return ["AONA06"];
  if (upper.includes("SAR") || title.includes("ประเมินตนเอง")) return ["AONA07"];
  if (upper.includes("E-PORTFOLIO") || title.includes("รวมผลงานครู")) return ["AONA08"];

  if (title.includes("เช็คชื่อ") || title.includes("เช็กชื่อ")) {
    if (title.includes("เผชิญเหตุ") || upper.includes("SHOOTER")) return ["AONE12"];
    return ["AONE01"];
  }
  if (title.includes("ส่งงาน") || title.includes("รายงานการสอน")) return ["AONE02"];
  if (title.includes("วินัย") || title.includes("เครื่องแบบ")) return ["AONE03"];
  if (title.includes("สถิติมาเรียน") || title.includes("ว.PA")) return ["AONE04"];
  if (title.includes("พฤติกรรม") || title.includes("วิชาเลือก") || title.includes("ชุมนุม")) return ["AONE05"];
  if (title.includes("ตัดเกรด ม.3")) return ["AONE07"];
  if (title.includes("ข้อสอบ") || title.includes("ตัดเกรด")) return ["AONE06"];
  if (title.includes("ขออนุญาต") || title.includes("ออกนอก")) return ["AONE08"];
  if (title.includes("สีเขียว") || title.includes("คะแนนเก็บ")) return ["AONE09"];
  if (title.includes("จำหน้า") || upper.includes("FLASHCARD")) return ["AONE10"];
  if (title.includes("สอบปฏิบัติ") || title.includes("บันทึกเสียง")) return ["AONE11"];
  if (title.includes("เผชิญเหตุ") || upper.includes("SHOOTER")) return ["AONE12"];

  if (title.includes("ระเบียบแถว")) return ["AONM02"];
  if (title.includes("ลูกเสือ")) return ["AONM01"];
  if (title.includes("ห้องซ้อม") || title.includes("ดนตรี")) return ["AONM03"];

  if (upper.includes("PORTFOLIO") || upper.includes("TCAS")) return ["STU01"];
  if (title.includes("การบ้าน")) return ["STU02"];
  if (upper.includes("PROMPT")) return ["STU03"];

  // 4. Default Flagship Starter Pack so every verified buyer gets an instant download link
  return ["AONE01", "AONA07", "PREP01"];
}

/**
 * Create HMAC-SHA256 signature for secure download verification
 */
export function signDeliveryParams(codesCsv: string, ref: string): string {
  return crypto
    .createHmac("sha256", DELIVERY_SECRET)
    .update(`${codesCsv}|${ref}`)
    .digest("hex")
    .slice(0, 24);
}

/**
 * Verify HMAC-SHA256 signature
 */
export function verifyDeliverySignature(
  codesCsv: string,
  ref: string,
  sig: string
): boolean {
  if (!codesCsv || !ref || !sig) return false;
  const expected = signDeliveryParams(codesCsv, ref);
  return sig === expected;
}

/**
 * Generate the full signed instant delivery URL for LINE OA messages
 */
export function buildSignedDeliveryUrl(
  itemTitle: string,
  transRef: string
): { url: string; codes: string[] } {
  const codes = resolveProductCodesFromTitle(itemTitle);
  const codesCsv = codes.join(",");
  const safeRef = (transRef || "VERIFIED").slice(0, 24);
  const sig = signDeliveryParams(codesCsv, safeRef);
  const url = `https://www.aiaon.tech/api/download?codes=${encodeURIComponent(
    codesCsv
  )}&ref=${encodeURIComponent(safeRef)}&sig=${sig}`;
  return { url, codes };
}

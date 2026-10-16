import crypto from "crypto";

const DELIVERY_SECRET =
  process.env.DELIVERY_SIGNING_SECRET || "AiAonTech_2026_Master_Vault_Secret_Key_0835399340";

const ALL_EBOOK_CODES = Array.from({ length: 30 }, (_, i) =>
  `EB${String(i + 1).padStart(2, "0")}`
);

const AUDIO_BUNDLE_CODES = [
  "MUS-01",
  "MUS-02",
  "BGM-01",
  "BGM-02",
  "STU-01",
  "STU-02",
];

/**
 * Resolve one or more system/ebook/music package codes (e.g. ["AONE01"], ["EB01"], ["MUS-01"], ["PREP01"])
 * from any product/package title sent via LINE OA, Facebook, Instagram, or Web Checkout.
 */
export function resolveProductCodesFromTitle(title: string): string[] {
  const upper = title.toUpperCase();

  // 0. Check for Full E-Book 30 Bundle & Super Audio Bundle first
  if (
    upper.includes("EBOOK-ALL-30") ||
    title.includes("30 เล่ม") ||
    upper.includes("เหมา E-BOOK") ||
    upper.includes("เหมา EBOOK") ||
    title.includes("เหมาอีบุ๊ค") ||
    title.includes("เหมาอีบุ๊ก") ||
    upper.includes("THAI TEACHER VAULT")
  ) {
    return ALL_EBOOK_CODES;
  }

  if (
    upper.includes("AUDIO-BUNDLE") ||
    upper.includes("SUPER AUDIO BUNDLE") ||
    title.includes("เหมาคลังเพลง") ||
    title.includes("เหมารวมเพลงช่วยจำ")
  ) {
    return AUDIO_BUNDLE_CODES;
  }

  // 1. Check for explicit codes in title:
  //    - Long E-Book codes like EB-PA-01..EB-NEWBIE-30 -> normalized to EB01..EB30
  //    - Short E-Book codes EB01..EB30
  //    - Music codes MUS-01, MUS-02, BGM-01, BGM-02, STU-01, STU-02, CUS-01
  //    - System codes AONA01..08, AONE01..12, AONM01..03, STU01..03, SYS01..30, PREP01, AIC01..02
  const matchedCodes: string[] = [];

  for (const m of upper.matchAll(/\bEB-[A-Z0-9]+-(0[1-9]|[12]\d|30)\b/g)) {
    matchedCodes.push(`EB${m[1]}`);
  }

  for (const m of upper.matchAll(
    /\b(EB(?:0[1-9]|[12]\d|30)|MUS-0[12]|BGM-0[12]|STU-0[12]|CUS-01|AONA0[1-8]|AONE(?:0[1-9]|1[0-2])|AONM0[1-3]|STU0[1-3]|SYS(?:0[1-9]|[12]\d|30)|PREP01|AIC0[12])\b/g
  )) {
    matchedCodes.push(m[1]);
  }

  if (matchedCodes.length > 0) {
    return Array.from(new Set(matchedCodes));
  }

  // 2. Student AI Prompt Kit check before generic "คัมภีร์" E-Book check
  if (
    (title.includes("สำหรับนักเรียน") || upper.includes("STUDENT AI SECRET KIT")) &&
    !upper.includes("E-BOOK") &&
    !upper.includes("EBOOK") &&
    !title.includes("อีบุ๊ค") &&
    !title.includes("อีบุ๊ก")
  ) {
    return ["STU03"];
  }

  // 3. E-Book Context Guard: If title mentions E-Book / อีบุ๊ค / คัมภีร์ / EB,
  //    strictly resolve to EB01..EB30 and NEVER fall through to AONE04 or AONA07!
  const isEbookContext =
    upper.includes("E-BOOK") ||
    upper.includes("EBOOK") ||
    title.includes("อีบุ๊ค") ||
    title.includes("อีบุ๊ก") ||
    title.includes("คัมภีร์") ||
    /\bEB\b/.test(upper);

  if (isEbookContext) {
    const ebMatches: string[] = [];
    if (title.includes("ผ่านฉลุย") || title.includes("ชำนาญการพิเศษ") || (title.includes("ว.PA") && !title.includes("คลิป") && !title.includes("ผู้บริหาร"))) ebMatches.push("EB01");
    if (title.includes("100 คำสั่ง") || title.includes("5 นาที") || title.includes("AI ลับ")) ebMatches.push("EB02");
    if (title.includes("วิจัยในชั้นเรียน") || upper.includes("CAR") || title.includes("5 บท")) ebMatches.push("EB03");
    if (upper.includes("GOOGLE SHEETS") || upper.includes("NO-CODE")) ebMatches.push("EB04");
    if (upper.includes("ACTIVE LEARNING") || title.includes("แผนการสอน")) ebMatches.push("EB05");
    if (title.includes("คลิปการสอน") || title.includes("60 นาที") || title.includes("คลิปสภาพปัญหา")) ebMatches.push("EB06");
    if (upper.includes("TEST BLUEPRINT") || title.includes("คลังข้อสอบ")) ebMatches.push("EB07");
    if (title.includes("จัดการชั้นเรียนเชิงบวก") || title.includes("รับมือเด็ก")) ebMatches.push("EB08");
    if (upper.includes("CANVA")) ebMatches.push("EB09");
    if (title.includes("แนะแนว") || title.includes("ดูแลช่วยเหลือนักเรียน")) ebMatches.push("EB10");
    if (title.includes("สายงานบริหาร") || title.includes("ผู้บริหารสถานศึกษา") || title.includes("ครูพี่เลี้ยง")) ebMatches.push("EB11");
    if (upper.includes("PLC")) ebMatches.push("EB12");
    if (title.includes("ปพ.1") || title.includes("ปพ.9") || title.includes("หลักฐานทางการศึกษา")) ebMatches.push("EB13");
    if (title.includes("บอร์ดเกม") || upper.includes("GAME-BASED")) ebMatches.push("EB14");
    if (title.includes("คลินิกภาษาไทย") || title.includes("อ่านไม่ออก")) ebMatches.push("EB15");
    if (title.includes("เงินเดือน") || title.includes("กบข") || title.includes("เกษียณ")) ebMatches.push("EB16");
    if (title.includes("สารบรรณ") || title.includes("หนังสือราชการ")) ebMatches.push("EB17");
    if (upper.includes("PDCA") || title.includes("แผนปฏิบัติการ")) ebMatches.push("EB18");
    if (upper.includes("GOOGLE CLASSROOM")) ebMatches.push("EB19");
    if (upper.includes("SAR") || title.includes("ประเมินตนเองสถานศึกษา")) ebMatches.push("EB20");
    if (upper.includes("AR") || upper.includes("VR") || upper.includes("METAVERSE")) ebMatches.push("EB21");
    if (upper.includes("STEM") || upper.includes("CODING")) ebMatches.push("EB22");
    if (title.includes("สภานักเรียน") || title.includes("ประชาธิปไตย")) ebMatches.push("EB23");
    if (title.includes("ชุมนุม") || title.includes("กิจกรรมพัฒนาผู้เรียน")) ebMatches.push("EB24");
    if (title.includes("โภชนาการ") || title.includes("อาหารกลางวัน")) ebMatches.push("EB25");
    if (title.includes("ห้องพยาบาล") || title.includes("ปฐมพยาบาล") || upper.includes("CPR")) ebMatches.push("EB26");
    if (title.includes("ห้องสมุดมีชีวิต") || title.includes("รักการอ่าน")) ebMatches.push("EB27");
    if (title.includes("สร้างคอนเทนต์") || upper.includes("TEACHER CREATOR")) ebMatches.push("EB28");
    if (title.includes("จัดซื้อจัดจ้าง") || title.includes("พัสดุและจัดซื้อ")) ebMatches.push("EB29");
    if (title.includes("ครูบรรจุใหม่")) ebMatches.push("EB30");

    return ebMatches.length > 0 ? Array.from(new Set(ebMatches)) : ["EB01"];
  }

  // 4. Music & Studio Audio Keyword Matching
  if (
    title.includes("อัลบั้มเต็ม") ||
    title.includes("เพลงช่วยจำกฎหมายครู") ||
    (title.includes("เพลงช่วยจำ") && title.includes("Vol.1"))
  ) {
    return ["MUS-01"];
  }
  if (title.includes("โทษวินัยครู 5 สถาน") || title.includes("ทางสายกลาง")) {
    return ["MUS-02"];
  }
  if (
    upper.includes("ACOUSTIC WARMTH") ||
    upper.includes("BGM PACK") ||
    (title.includes("เพลงบรรเลง") && title.includes("ว.PA"))
  ) {
    return ["BGM-01"];
  }
  if (upper.includes("LO-FI PACK") || upper.includes("INSPIRING CLASSROOM")) {
    return ["BGM-02"];
  }
  if (
    upper.includes("BACKING TRACK") ||
    upper.includes("CLICK TRACK") ||
    title.includes("ซ้อมวงดนตรี")
  ) {
    return ["STU-01"];
  }
  if (
    upper.includes("CUBASE 12") ||
    upper.includes("TRACK PRESETS") ||
    title.includes("พรีเซ็ตกีตาร์")
  ) {
    return ["STU-02"];
  }
  if (title.includes("รับแต่งและผลิตเพลง") || title.includes("จิงเกิล")) {
    return ["CUS-01"];
  }

  // 5. Check for Bundles & Flagship Packages
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

  if (title.includes("ครูประจำชั้น") || upper.includes("HOMEROOM") || upper.includes("CLASSROOM MASTER")) {
    return ["AONE01", "AONE03", "AONE09", "AONE10"];
  }

  if (title.includes("ชุดวิชาการ") || (title.includes("แพ็กเกจ") && title.includes("วิทยฐานะ"))) {
    return ["AONA07", "AONA08", "AONE04", "AONE06", "AONE09"];
  }

  if (title.includes("ผู้บริหาร") || title.includes("ธุรการโรงเรียน") || upper.includes("SCHOOL ADMIN")) {
    return ["AONA01", "AONA02", "AONA03", "AONA04", "AONA05", "AONA06"];
  }

  if (title.includes("เซ็ตนักเรียน") || (title.includes("แพ็กเกจ") && title.includes("TCAS"))) {
    return ["STU01", "STU02", "STU03"];
  }

  // 6. Individual System Keyword Matching
  if (title.includes("ทำเนียบ") && title.includes("ครู")) return ["AONA01"];
  if (title.includes("สารบรรณ") || title.includes("รับ-ส่ง")) return ["AONA01"];
  if (title.includes("ยานพาหนะ") || title.includes("รถโรงเรียน") || upper.includes("SMART VEHICLE")) return ["AONA02"];
  if (title.includes("เกียรติบัตร") || upper.includes("CERTIFICATE")) return ["AONA03"];
  if (title.includes("สมุดติดต่อ") || title.includes("เบอร์โทร") || title.includes("ครุภัณฑ์") || title.includes("ทรัพย์สิน")) return ["AONA04"];
  if (title.includes("ยืม-คืน") || title.includes("ห้องปฏิบัติการ") || title.includes("พัสดุและเครื่องดนตรี")) return ["AONA05"];
  if (title.includes("การลาครู") || title.includes("ฝากสอน") || title.includes("บันทึกข้อความ")) return ["AONA06"];
  if (upper.includes("SAR") || title.includes("ประเมินตนเอง")) return ["AONA07"];
  if (upper.includes("E-PORTFOLIO") || title.includes("รวมผลงานครู")) return ["AONA08"];

  if (title.includes("เช็คชื่อ") || title.includes("เช็กชื่อ")) {
    if (title.includes("เผชิญเหตุ") || upper.includes("SHOOTER")) return ["AONE12"];
    if (upper.includes("V1") || title.includes("แจ้งลา")) return ["AONE04"];
    return ["AONE01"];
  }
  if (title.includes("คอนเสิร์ต") || title.includes("ส่งงาน") || title.includes("รายงานการสอน")) return ["AONE02"];
  if (title.includes("เครื่องแต่งกาย") || title.includes("วินัย") || title.includes("เครื่องแบบ")) return ["AONE03"];
  if (title.includes("สถิติมาเรียน") || title.includes("ว.PA")) return ["AONE04"];
  if (title.includes("พฤติกรรม") || title.includes("แต้มความประพฤติ") || title.includes("วิชาเลือก") || title.includes("ชุมนุม")) return ["AONE05"];
  if (title.includes("คะแนนสอบ") && title.includes("ม.3")) return ["AONE07"];
  if (title.includes("ตัดเกรด ม.3")) return ["AONE07"];
  if (title.includes("คะแนนสอบ") || title.includes("ข้อสอบ") || title.includes("ตัดเกรด")) return ["AONE06"];
  if (title.includes("ขออนุญาต") || title.includes("ออกนอก")) return ["AONE08"];
  if (title.includes("ห้องเรียนสีขาว") || title.includes("สีเขียว") || title.includes("คะแนนเก็บ")) return ["AONE09"];
  if (title.includes("จำหน้า") || upper.includes("FLASHCARD")) return ["AONE10"];
  if (title.includes("สอบปฏิบัติ") || title.includes("บันทึกเสียง")) return ["AONE11"];
  if (title.includes("เผชิญเหตุ") || upper.includes("SHOOTER")) return ["AONE12"];

  if (title.includes("ระเบียบแถว") || (title.includes("เครื่องแบบลูกเสือ"))) return ["AONM02"];
  if (title.includes("ลูกเสือ")) return ["AONM01"];
  if (title.includes("ซ้อมดนตรี") || title.includes("ห้องซ้อม") || title.includes("ดนตรี")) return ["AONM03"];

  if (upper.includes("PORTFOLIO") || upper.includes("TCAS")) return ["STU01"];
  if (title.includes("การบ้าน")) return ["STU02"];
  if (upper.includes("PROMPT")) return ["STU03"];

  // 7. Default Flagship Starter Pack so every verified buyer gets an instant download link
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
  if (!DELIVERY_SECRET || !codesCsv || !ref || !sig) return false;
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

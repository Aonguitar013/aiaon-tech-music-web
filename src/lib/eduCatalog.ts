import { getLineOrderUrl } from "@/lib/line";

export type EduLang = "th" | "en";

export interface EduSkuItem {
  sku: string;
  slug: string;
  status: "live" | "coming_soon";
  characterNameTh: string;
  characterNameEn: string;
  titleTh: string;
  titleEn: string;
  subtitleTh: string;
  subtitleEn: string;
  ageRangeTh: string;
  ageRangeEn: string;
  pages: number;
  heroImage: string;
  coverImage: string;
  priceHomeThb: number;
  priceHomeUsd: string;
  priceClassThb: number;
  priceClassUsd: string;
  badgeTh: string;
  badgeEn: string;
}

export const EDU_CATALOG: EduSkuItem[] = [
  {
    sku: "EDU-EF01",
    slug: "ef01",
    status: "live",
    characterNameTh: "น้องแซลมอน",
    characterNameEn: "Detective Salmon",
    titleTh: "นักสืบสมองไวกับน้องแซลมอน — เล่ม 1",
    titleEn: "Detective Salmon's Brain & EF Booster — Level 1",
    subtitleTh: "ฝึกเชาวน์ปัญญาและ EF 5 ด้าน + โค้ดดิ้งไร้จอ + ซูโดกุภาพ 4×4 (32 หน้าเต็ม + เฉลยอัตโนมัติ)",
    subtitleEn: "5 Core EF Skills + Unplugged Coding + 4×4 Picture Sudoku (32 Print-Ready Pages + Answer Key)",
    ageRangeTh: "อายุ 4–6 ปี (อ.2 – เตรียม ป.1)",
    ageRangeEn: "Ages 4–6 (Pre-K to Grade 1)",
    pages: 32,
    heroImage: "/edu/salmon-3d.webp",
    coverImage: "/edu/ef01/mockup-01-cover.webp",
    priceHomeThb: 99,
    priceHomeUsd: "$4.99",
    priceClassThb: 199,
    priceClassUsd: "$9.99",
    badgeTh: "พร้อมใช้งาน • Hybrid QR Timer",
    badgeEn: "Live Now • Hybrid QR Timer",
  },
  {
    sku: "EDU-MU01",
    slug: "mu01",
    status: "coming_soon",
    characterNameTh: "น้องข้าวต้ม",
    characterNameEn: "Khao Tom",
    titleTh: "สนุกกับจังหวะและโน้ตดนตรีกับน้องข้าวต้ม — เล่ม 1",
    titleEn: "Khao Tom's Music & Rhythm Adventure — Level 1",
    subtitleTh: "สื่อดนตรีเด็กเล็ก Hybrid QR + 6 แทร็กเสียงจริง (70/95 BPM, เกมทายเสียงเครื่องดนตรี 8 ชนิด)",
    subtitleEn: "Hybrid Music & Rhythm Workbook + 6 Real Audio Tracks (70/95 BPM, 8-Instrument Sound Quiz)",
    ageRangeTh: "อายุ 4–6 ปี (พื้นฐาน 0 เล่นได้ทันที)",
    ageRangeEn: "Ages 4–6 (Beginner Friendly)",
    pages: 32,
    heroImage: "/edu/khaotom-3d.webp",
    coverImage: "/edu/khaotom-3d.webp",
    priceHomeThb: 129,
    priceHomeUsd: "$5.99",
    priceClassThb: 249,
    priceClassUsd: "$12.99",
    badgeTh: "เร็วๆ นี้ • 6 แทร็กเสียงจริง",
    badgeEn: "Coming Soon • 6 Real Audio Tracks",
  },
];

export function getEduOrderLineUrl(params: {
  sku: string;
  edition: "HOME" | "CLASS" | "BUNDLE";
  lang: EduLang;
}): string {
  const { sku, edition, lang } = params;

  if (edition === "BUNDLE") {
    const msg =
      lang === "th"
        ? `สวัสดีครับครูอ้น สนใจจองโปรแพ็กคู่ iAon Edu-Verse:\n🎁 "EDU-EF01 (น้องแซลมอน EF 32 หน้า) + EDU-MU01 (น้องข้าวต้มดนตรี + 6 เพลงจริง)"\n💰 ราคาโปรแพ็กคู่: 199 ฿ (Home Edition)\nรบกวนขอรายละเอียดการจองและเลขพร้อมเพย์ครับ 🙏`
        : `Hi Teacher Aon! I'd like to pre-order the iAon Edu-Verse Launch Bundle:\n🎁 "EDU-EF01 (Detective Salmon EF) + EDU-MU01 (Khao Tom Music + 6 Audio Tracks)"\n💰 Bundle Price: 199 THB ($8.99)\nPlease share payment & download instructions!`;
    return getLineOrderUrl(msg);
  }

  if (edition === "CLASS") {
    const msg =
      lang === "th"
        ? `สวัสดีครับครูอ้น สนใจสั่งซื้อสื่อการสอน iAon Edu-Verse:\n🏫 "[${sku}] นักสืบสมองไวกับน้องแซลมอน — CLASS EDITION (สิทธิ์ห้องเรียน 32 หน้า ครบ 4 ไฟล์ TH/EN สี+ขาวดำ)"\n💰 ราคา: 199 ฿\nรบกวนขอเลขบัญชี / PromptPay QR เพื่อรับไฟล์ PDF ทันทีครับ 🙏`
        : `Hi Teacher Aon! I'd like to order:\n🏫 "[${sku}] Detective Salmon's Brain & EF Booster — CLASS EDITION (Classroom License, 32 Pages, 4 PDFs TH/EN Color+BW)"\n💰 Price: 199 THB / $9.99\nPlease send payment instructions!`;
    return getLineOrderUrl(msg);
  }

  const msg =
    lang === "th"
      ? `สวัสดีครับครูอ้น สนใจสั่งซื้อสื่อการสอน iAon Edu-Verse:\n🏠 "[${sku}] นักสืบสมองไวกับน้องแซลมอน — HOME EDITION (32 หน้าเต็ม + เฉลย 3 หน้า ครบ 4 ไฟล์ TH/EN สี+ขาวดำ)"\n💰 ราคา: 99 ฿\nรบกวนขอเลขบัญชี / PromptPay QR เพื่อรับไฟล์ PDF ทันทีครับ 🙏`
      : `Hi Teacher Aon! I'd like to order:\n🏠 "[${sku}] Detective Salmon's Brain & EF Booster — HOME EDITION (32 Pages + 3-Page Answer Key, 4 PDFs TH/EN Color+BW)"\n💰 Price: 99 THB / $4.99\nPlease send payment instructions!`;
  return getLineOrderUrl(msg);
}

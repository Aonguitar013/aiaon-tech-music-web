import { getLineOrderUrl } from "@/lib/line";

export type EduLang = "th" | "en";

export interface EduSkuItem {
  sku: string;
  slug: string;
  status: "live" | "coming_soon";
  accent: "amber" | "rose" | "pink" | "fuchsia";
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
  freebieThUrl?: string;
  freebieEnUrl?: string;
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
    accent: "amber",
    characterNameTh: "น้องแซลมอน",
    characterNameEn: "Detective Salmon",
    titleTh: "นักสืบสมองไวกับน้องแซลมอน — เล่ม 1",
    titleEn: "Detective Salmon's Brain & EF Booster — Level 1",
    subtitleTh:
      "ฝึกเชาวน์ปัญญาและ EF 5 ด้าน + โค้ดดิ้งไร้จอ + ซูโดกุภาพ 4×4 (32 หน้าเต็ม + เฉลยอัตโนมัติ)",
    subtitleEn:
      "5 Core EF Skills + Unplugged Coding + 4×4 Picture Sudoku (32 Print-Ready Pages + Answer Key)",
    ageRangeTh: "อายุ 4–6 ปี (อ.2 – เตรียม ป.1)",
    ageRangeEn: "Ages 4–6 (Pre-K to Grade 1)",
    pages: 32,
    heroImage: "/edu/salmon-3d.webp",
    coverImage: "/edu/ef01/mockup-01-cover.webp",
    freebieThUrl: "/edu/ef01/EDU-EF01_Freebie_5Pages_TH.pdf",
    freebieEnUrl: "/edu/ef01/EDU-EF01_Freebie_5Pages_EN.pdf",
    priceHomeThb: 99,
    priceHomeUsd: "$4.99",
    priceClassThb: 199,
    priceClassUsd: "$9.99",
    badgeTh: "พร้อมใช้งาน • Focus Timer",
    badgeEn: "Live Now • Focus Timer",
  },
  {
    sku: "EDU-RT01",
    slug: "rt01",
    status: "live",
    accent: "rose",
    characterNameTh: "แม่ใหญ่ (มามี้)",
    characterNameEn: "Mama Mami",
    titleTh: "ชุดสร้างวินัย & กิจวัตร 30 วันกับแม่ใหญ่ — เล่ม 1",
    titleEn: "Mama Mami's 30-Day Routine & Star Reward Kit — Level 1",
    subtitleTh:
      "ครบ 5-in-1: บอร์ดเช้า-เย็น-ก่อนนอน + ตีนตุ๊กแก 24 การ์ด + ขวดโหล 20 ดาว + คูปอง 8 ใบ + มุมสงบใจ SEL (ขอบ 20mm)",
    subtitleEn:
      "Complete 5-in-1 Kit: Daily Boards + 24 Velcro Cards + 20-Star Jar + 8 Coupons + SEL Calm Corner (20mm Margin)",
    ageRangeTh: "อายุ 3–6 ปี (เตรียมอนุบาล – ป.1)",
    ageRangeEn: "Ages 3–6 (Toddler to Grade 1)",
    pages: 32,
    heroImage: "/edu/mami-3d.webp",
    coverImage: "/edu/rt01/mockup-01-cover.webp",
    freebieThUrl: "/edu/rt01/EDU-RT01_Freebie_5Pages_TH.pdf",
    freebieEnUrl: "/edu/rt01/EDU-RT01_Freebie_5Pages_EN.pdf",
    priceHomeThb: 99,
    priceHomeUsd: "$4.99",
    priceClassThb: 199,
    priceClassUsd: "$9.99",
    badgeTh: "พร้อมใช้งาน • Routine Timer",
    badgeEn: "Live Now • Routine Timer",
  },
  {
    sku: "EDU-BB01",
    slug: "bb01",
    status: "live",
    accent: "pink",
    characterNameTh: "น้องชาบู",
    characterNameEn: "Shabu",
    titleTh: "สมุด Busy Book ลีลามือ & สุขอนามัยกับน้องชาบู — เล่ม 1",
    titleEn: "Shabu's Busy Book: Fine Motor, Matching & Hygiene — Level 1",
    subtitleTh:
      "ลีลามือเตรียมเขียน 6 หน้า + บอร์ดตีนตุ๊กแก 45 การ์ดติดป้ายหน้า + บอร์ดแปรงฟันไวท์บอร์ด P15 + ล้างมือ 6 ขั้น WHO (ขอบ 20mm)",
    subtitleEn:
      "6 Tracing Pages + 45 Page-Tagged Velcro Cards + Wipe-Clean Teeth Board + 6-Step WHO Handwashing (20mm Margin)",
    ageRangeTh: "อายุ 3–5 ปี (เตรียมอนุบาล – อ.2)",
    ageRangeEn: "Ages 3–5 (Toddler to Pre-K)",
    pages: 32,
    heroImage: "/edu/shabu-3d.webp",
    coverImage: "/edu/bb01/mockup-01-cover.webp",
    freebieThUrl: "/edu/bb01/EDU-BB01_Freebie_5Pages_TH.pdf",
    freebieEnUrl: "/edu/bb01/EDU-BB01_Freebie_5Pages_EN.pdf",
    priceHomeThb: 99,
    priceHomeUsd: "$4.99",
    priceClassThb: 199,
    priceClassUsd: "$9.99",
    badgeTh: "พร้อมใช้งาน • 2-Min Brush Timer",
    badgeEn: "Live Now • 2-Min Brush Timer",
  },
  {
    sku: "EDU-MU01",
    slug: "mu01",
    status: "live",
    accent: "fuchsia",
    characterNameTh: "น้องข้าวต้ม",
    characterNameEn: "Khao Tom",
    titleTh: "สนุกกับจังหวะและโน้ตดนตรีกับน้องข้าวต้ม — เล่ม 1",
    titleEn: "Khao Tom's Music & Rhythm Adventure — Level 1",
    subtitleTh:
      "สื่อดนตรีเด็กเล็ก Hybrid QR 32 หน้าเต็ม + 6 แทร็กเสียงจริง (70/95 BPM, เกมทายเสียงเครื่องดนตรี 8 ชนิด)",
    subtitleEn:
      "Hybrid Music & Rhythm Workbook (32 Pages) + 6 Real Audio Tracks (70/95 BPM, 8-Instrument Sound Quiz)",
    ageRangeTh: "อายุ 4–6 ปี (พื้นฐาน 0 เล่นได้ทันที)",
    ageRangeEn: "Ages 4–6 (Beginner Friendly)",
    pages: 32,
    heroImage: "/edu/khaotom-3d.webp",
    coverImage: "/edu/mu01/mockup-01-cover.webp",
    freebieThUrl: "/edu/mu01/EDU-MU01_Freebie_5Pages_TH.pdf",
    freebieEnUrl: "/edu/mu01/EDU-MU01_Freebie_5Pages_EN.pdf",
    priceHomeThb: 129,
    priceHomeUsd: "$5.99",
    priceClassThb: 249,
    priceClassUsd: "$12.99",
    badgeTh: "พร้อมใช้งาน • 6 แทร็กเสียง & จังหวะ",
    badgeEn: "Live Now • 6 Audio Tracks & Beat",
  },
];

export type EduOrderEdition =
  | "HOME"
  | "CLASS"
  | "DUO_LIVE"
  | "TRIO_LIVE"
  | "ALL4_BUNDLE"
  | "MEGA_BUNDLE"
  | "BUNDLE";

export function getEduOrderLineUrl(params: {
  sku: string;
  edition: EduOrderEdition;
  lang: EduLang;
}): string {
  const { sku, edition, lang } = params;
  const item =
    EDU_CATALOG.find((entry) => entry.sku === sku) ?? EDU_CATALOG[0];

  if (edition === "ALL4_BUNDLE") {
    const msg =
      lang === "th"
        ? `สวัสดีครับครูอ้น สนใจสั่งซื้อโปรเหมาครบจักรวาล 4 เล่ม iAon Edu-Verse (Home Edition):\n🎁 1) EDU-EF01 น้องแซลมอน EF (32 หน้า + Focus Timer)\n🎁 2) EDU-RT01 แม่ใหญ่สร้างวินัย 30 วัน (32 หน้า + Routine Timer)\n🎁 3) EDU-BB01 น้องชาบู Busy Book 45 การ์ด (32 หน้า + Brush Timer)\n🎁 4) EDU-MU01 น้องข้าวต้มดนตรี (รับไฟล์ PDF 32 หน้าทันที + ปลดล็อก 6 แทร็กเสียงฟรีบนเว็บเมื่อเปิดระบบ)\n💰 ราคาโปรเหมา 4 เล่ม: 319 ฿ (จากปกติ 426 ฿ • ครบ 128 หน้า 16 ไฟล์ TH/EN สี+ขาวดำ)\nรบกวนขอเลขพร้อมเพย์เพื่อรับไฟล์ PDF ทันทีครับ 🙏`
        : `Hi Teacher Aon! I'd like to order the All-4 Universe Bundle (Home Edition — 128 Pages / 16 PDFs):\n🎁 EF01 (Brain EF) + RT01 (30-Day Routine) + BB01 (Busy Book) + MU01 (Music PDF now + 6 QR Audio Tracks unlocked on launch)\n💰 Bundle Price: 319 THB ($14.99)\nPlease share payment & download instructions!`;
    return getLineOrderUrl(msg);
  }

  if (edition === "TRIO_LIVE") {
    const msg =
      lang === "th"
        ? `สวัสดีครับครูอ้น สนใจสั่งซื้อโปร 3 เล่มพร้อมใช้งานเว็บ QR 100% วันนี้ (Home Edition):\n⚡ 1) EDU-EF01 น้องแซลมอน EF (32 หน้า + Focus Timer)\n⚡ 2) EDU-RT01 แม่ใหญ่สร้างวินัย 30 วัน (32 หน้า + Routine Timer)\n⚡ 3) EDU-BB01 น้องชาบู Busy Book 45 การ์ด (32 หน้า + Brush Timer)\n💰 ราคาโปร 3 เล่มพร้อมใช้: 249 ฿ (จากปกติ 297 ฿ • ครบ 96 หน้า 12 ไฟล์ TH/EN สี+ขาวดำ)\nรบกวนขอเลขพร้อมเพย์เพื่อรับไฟล์ PDF ทันทีครับ 🙏`
        : `Hi Teacher Aon! I'd like to order the 3-Book Live Trio Pack (Home Edition — 96 Pages / 12 PDFs):\n⚡ EF01 (Brain EF) + RT01 (30-Day Routine) + BB01 (Busy Book & Hygiene)\n💰 Trio Price: 249 THB ($11.99)\nPlease share payment & download instructions!`;
    return getLineOrderUrl(msg);
  }

  if (edition === "MEGA_BUNDLE" || edition === "BUNDLE") {
    const msg =
      lang === "th"
        ? `สวัสดีครับครูอ้น สนใจสั่งซื้อโปร Mega Bundle 3 เล่ม iAon Edu-Verse (Home Edition):\n🎁 เลือก 3 เล่มในจักรวาล (เช่น EF01 + RT01 + BB01 หรือ MU01)\n💰 ราคาโปรเหมา 3 เล่ม: 249 ฿ (ครบ 96 หน้า 12 ไฟล์ TH/EN สี+ขาวดำ)\nรบกวนขอเลขพร้อมเพย์เพื่อรับไฟล์ PDF ทันทีครับ 🙏`
        : `Hi Teacher Aon! I'd like to order the iAon Edu-Verse 3-Book Mega Bundle (Home Edition — 96 Pages / 12 PDFs):\n💰 Mega Bundle Price: 249 THB ($11.99)\nPlease share payment & download instructions!`;
    return getLineOrderUrl(msg);
  }

  if (edition === "DUO_LIVE") {
    const msg =
      lang === "th"
        ? `สวัสดีครับครูอ้น สนใจสั่งซื้อแพ็กคู่พร้อมใช้งานทันที iAon Edu-Verse (Home Edition):\n⚡ EDU-EF01 (น้องแซลมอน EF 32 หน้า) + EDU-RT01 (แม่ใหญ่สร้างวินัย 30 วัน 32 หน้า)\n💰 ราคาโปรแพ็กคู่: 179 ฿ (จากปกติ 198 ฿ • ครบ 64 หน้า 8 ไฟล์ TH/EN สี+ขาวดำ)\nรบกวนขอเลขพร้อมเพย์เพื่อรับไฟล์ PDF ทันทีครับ 🙏`
        : `Hi Teacher Aon! I'd like to order the Live Duo Pack (Home Edition — 64 Pages / 8 PDFs):\n⚡ EDU-EF01 (Detective Salmon EF) + EDU-RT01 (Mama Mami 30-Day Routine)\n💰 Duo Pack Price: 179 THB ($8.99)\nPlease share payment & download instructions!`;
    return getLineOrderUrl(msg);
  }

  if (edition === "CLASS") {
    const msg =
      lang === "th"
        ? `สวัสดีครับครูอ้น สนใจสั่งซื้อสื่อการสอน iAon Edu-Verse:\n🏫 "[${item.sku}] ${item.titleTh} — CLASS EDITION (สิทธิ์ห้องเรียน 32 หน้า ครบ 4 ไฟล์ TH/EN สี+ขาวดำ)"\n💰 ราคา: ${item.priceClassThb} ฿\nรบกวนขอเลขบัญชี / PromptPay QR เพื่อรับไฟล์ PDF ทันทีครับ 🙏`
        : `Hi Teacher Aon! I'd like to order:\n🏫 "[${item.sku}] ${item.titleEn} — CLASS EDITION (Classroom License, 32 Pages, 4 PDFs TH/EN Color+BW)"\n💰 Price: ${item.priceClassThb} THB / ${item.priceClassUsd}\nPlease send payment instructions!`;
    return getLineOrderUrl(msg);
  }

  const msg =
    lang === "th"
      ? `สวัสดีครับครูอ้น สนใจสั่งซื้อสื่อการสอน iAon Edu-Verse:\n🏠 "[${item.sku}] ${item.titleTh} — HOME EDITION (32 หน้าเต็ม ครบ 4 ไฟล์ TH/EN สี+ขาวดำ)"\n💰 ราคา: ${item.priceHomeThb} ฿\nรบกวนขอเลขบัญชี / PromptPay QR เพื่อรับไฟล์ PDF ทันทีครับ 🙏`
      : `Hi Teacher Aon! I'd like to order:\n🏠 "[${item.sku}] ${item.titleEn} — HOME EDITION (32 Full Pages, 4 PDFs TH/EN Color+BW)"\n💰 Price: ${item.priceHomeThb} THB / ${item.priceHomeUsd}\nPlease send payment instructions!`;
  return getLineOrderUrl(msg);
}

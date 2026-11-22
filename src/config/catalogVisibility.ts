/**
 * 🎛️ Master Catalog Visibility & Universalization Control Panel (www.aiaon.tech)
 *
 * 100% Non-Destructive Soft-Hide Architecture:
 * - ไม่ลบไฟล์ ไม่ลบโค้ด ไม่ลบข้อมูลใน Supabase แม้แต่แถวเดียว
 * - หากอนาคตต้องการเปิดขายระบบใดกลับคืน แค่ลบรหัสนั้นออกจากลิสต์ HIDDEN_* ด้านล่าง
 */

export interface ProductLike {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  icon_name?: string;
  color_classes?: string;
  button_classes?: string;
  image_url?: string;
  setupTier?: "zero-tech" | "easy-setup" | "vip-enterprise";
}

/**
 * 1. สวิตช์เปิด-ปิดเมนูใน Navbar (หน้าเว็บยังอยู่ครบ 100% เข้าผ่าน URL ตรงได้ปกติ)
 */
export const NAVBAR_FLAGS = {
  showAcademy: false, // ซ่อนชั่วคราวจนกว่าจะคัดคอร์ส Seed ภาษาอังกฤษออกและอัปคลิปสอนจริงครบ
  showSaasDemo: false, // ซ่อนชั่วคราวเพื่อลดเมนูซ้ำซ้อนบน Navbar
};

/**
 * 2. สวิตช์ซ่อนของแจกฟรีเก่าภาษาอังกฤษในตาราง Supabase `freebies` (ข้อมูลใน DB ยังอยู่ครบ)
 */
export const SHOW_DB_FREEBIES = false;

/**
 * 3. รหัสระบบที่ "ซ่อนชั่วคราว" จากหน้าร้านขายเดี่ยว /digital-vault
 * - AONE04: เวอร์ชันเก่า V1 (ซ้ำกับ AONE01)
 * - AONE02 / AONM03: เฉพาะทางวิชาดนตรีมากเกินไป (เก็บไว้รีแบรนด์รอบหน้า)
 * - AONE07: ซ้ำกับ AONE06 (ยุบรวมเป็นตัวสากลตัวเดียวคือ AONE06)
 * - AONE10: ของฟรี (ให้แสดงที่ /freebies ที่เดียวไม่ปนหน้าขาย)
 * - AONE03, AONE05, AONA01, AONA04, AONM01, AONM02: ยุบรวมไว้ในแพ็กเกจเหมา /bundles เพื่อลดความลายตา
 */
export const HIDDEN_DIGITAL_VAULT_CODES: string[] = [
  "AONE02",
  "AONE03",
  "AONE04",
  "AONE05",
  "AONE07",
  "AONE10",
  "AONA01",
  "AONA04",
  "AONM01",
  "AONM02",
  "AONM03",
];

/**
 * 4. ปรับชื่อและคำอธิบายระบบใน /digital-vault ให้เป็นสากล (ตัดคำว่า ม.3 / ม.4 / ม.1 / วิชาดนตรี)
 * ข้อมูลต้นฉบับใน Supabase ยังคงเดิม 100%
 */
export const UNIVERSAL_PRODUCT_OVERRIDES: Record<
  string,
  { title: string; description?: string; price?: string }
> = {
  AONE01: {
    title: "AONE01: ระบบเช็คชื่อเข้าแถว & บันทึกพฤติกรรมนักเรียน (แจ้งเตือน LINE/Telegram)",
    description:
      "รวมระบบเช็คชื่อเข้าแถว ตรวจเครื่องแต่งกาย ประเมินพฤติกรรม และแจ้งเตือนผู้ปกครองอัตโนมัติ ใช้ได้ทุกระดับชั้น ป.1–ม.6",
  },
  AONE06: {
    title: "AONE06: ระบบประกาศคะแนนสอบรายบุคคลออนไลน์ (ใช้ได้ทุกวิชา ทุกระดับชั้น)",
    description:
      "ระบบตรวจสอบคะแนนสอบรายบุคคลด้วยรหัสนักเรียน ป้องกันเดารหัส แสดงกราฟวิเคราะห์ผลและซิงค์ข้อมูลจาก Google Sheets อัตโนมัติ",
  },
  AONE08: {
    title: "AONE08: ระบบรับ-ส่งใบขออนุญาตผู้ปกครองดิจิทัล (แนบรูป/PDF เก็บเข้า Drive)",
    description:
      "ระบบรับ-ส่งใบขออนุญาตเข้าร่วมกิจกรรม/ทัศนศึกษา อัปโหลดรูปถ่ายหรือไฟล์ PDF แนบเก็บเข้า Google Drive แยกห้องอัตโนมัติ",
  },
  AONE09: {
    title: "AONE09: ระบบห้องเรียนสีขาว 4 ฝ่าย + เสกเล่มรายงาน 37 หน้า PDF อัตโนมัติ",
    description:
      "ระบบบริหารแกนนำห้องเรียนสีขาว 4 ฝ่าย 25 ตำแหน่ง ผัง Tree Chart พร้อมกดปุ่มเดียวสร้างเล่มรายงาน PDF 37 หน้าตามเกณฑ์ สพฐ.",
  },
  AONE11: {
    title: "AONE11: ระบบจองคิวสอบปฏิบัติ & บัตรคิวดิจิทัล (ใช้ได้ทุกวิชาที่มีสอบปฏิบัติ/ปากเปล่า)",
    description:
      "ระบบจองคิวสอบปฏิบัติ ออกบัตรนัดสอบดิจิทัล (Digital Exam Pass) พร้อมกระดานคิว Real-time ลดความวุ่นวายหน้าห้องสอบ",
  },
  AONA02: {
    title: "AONA02: ระบบบริหารยานพาหนะโรงเรียน (ขอใช้รถ + ค่าน้ำมัน + ซ่อมบำรุง + PDF)",
    description:
      "ระบบคุมรถโรงเรียนครบวงจร: ขออนุมัติใช้รถ บันทึกเติมน้ำมันแนบรูปบิล สรุปประวัติซ่อมบำรุง และออกรายงาน PDF เสนอผู้บริหาร",
  },
  AONA03: {
    title: "AONA03: ระบบออกเกียรติบัตรอัตโนมัติ + QR Code ตรวจสอบของแท้ (กันปลอม 100%)",
    description:
      "สร้างเกียรติบัตรอัตโนมัติจาก Google Slides ส่งอีเมลผู้รับทันที พร้อมหน้าเว็บสแกน QR Code ตรวจสอบความถูกต้องป้องกันการปลอมแปลง",
  },
  AONA05: {
    title: "AONA05: ระบบยืม-คืนพัสดุและอุปกรณ์ส่วนกลาง + ป้าย QR Code (แจ้งเตือนค้างส่ง)",
    description:
      "ระบบจัดการคลังพัสดุและอุปกรณ์โรงเรียน (ห้องวิทย์/คอมฯ/โสตฯ/กีฬา/ดนตรี) ออกป้าย QR Tag สแกนยืม-คืน และแจ้งเตือนของเกินกำหนด",
  },
  AONA06: {
    title: "AONA06: ระบบบันทึกการลาครู & จัดตารางสอนแทนอัตโนมัติ (คาบ 1–8)",
    description:
      "ระบบบันทึกการลาครู พรีโหลดรายชื่อบุคลากร จัดสรรชั่วโมงฝากสอนแทนรายคาบ 1–8 และสรุปสถิติการลาอัตโนมัติทุกฝ่าย",
  },
};

/**
 * 5. สินค้าเรือธงตัวใหม่ล่าสุดจากคลัง 02_SYSTEMS_MASTER_VAULT ที่เพิ่มขึ้นหน้า /digital-vault
 * (ไม่กระทบตาราง Supabase เดิม และสามารถย้ายเข้า DB ในภายหลังได้ทันที)
 */
export const EXTRA_FLAGSHIP_VAULT_PRODUCTS: ProductLike[] = [
  {
    id: "aona09-smart-repair-facility",
    title: "AONA09: ระบบแจ้งซ่อม & อาคารสถานที่อัจฉริยะ (เชื่อม Telegram 2 ทาง + QR ประจำห้อง)",
    description:
      "ระบบแจ้งซ่อมบำรุงและงานอาคารสถานที่ครบวงจร สแกน QR หน้าห้องแจ้งซ่อมพร้อมรูปถ่าย แจ้งเตือนช่าง/แม่บ้านกดรับ-ปิดงานผ่าน Telegram 2 ทาง + แดชบอร์ดสถิติผู้บริหารและคลังวัสดุ (ปรับสีธีมโรงเรียนได้เอง)",
    price: "690 THB",
    category: "GoogleScript",
    setupTier: "easy-setup",
  },
  {
    id: "aona10-school-hygiene-matrix",
    title: "AONA10: ระบบตรวจสุขาภิบาล & รายงานงานแม่บ้าน 3 เวลา (QR Matrix + แจ้งเตือน Telegram)",
    description:
      "ระบบตรวจความสะอาดห้องน้ำและอาคารเรียน เช้า/เที่ยง/เย็น แม่บ้านสแกน QR ถ่ายรูป Before-After ขึ้น Live Matrix Heatmap อัตโนมัติ พร้อมแจ้งเตือนจุดค้างตรวจเข้า Telegram และพิมพ์รายงาน PDF 1 คลิก",
    price: "590 THB",
    category: "GoogleScript",
    setupTier: "easy-setup",
  },
];

/**
 * 6. รหัสแพ็กเกจเหมาที่ซ่อนจากหน้า /bundles (เก็บเฉพาะ 3 แพ็กเกจสากลหลัก)
 */
export const HIDDEN_BUNDLE_IDS: string[] = ["scout-activity"];

/**
 * 7. รหัสสินค้าที่ซ่อนจากหน้าขาย /student-vault (STU03 ย้ายไปแจกฟรี 0฿ ที่ /freebies)
 */
export const HIDDEN_STUDENT_PRODUCT_CODES: string[] = ["STU03"];

/**
 * 8. รหัสสินค้าที่ซ่อนจากหน้าหลัก /music-store (ซ่อนซิงเกิล 49฿ และสินค้าเฉพาะสายห้องอัด)
 */
export const HIDDEN_MUSIC_STORE_CODES: string[] = ["MUS-02", "STU-01", "STU-02"];

/**
 * 9. รหัส 10 E-Book ขายดีเรือธงสำหรับแสดงเป็น Tab แรกบนหน้า /ebooks (อีก 20 เล่มกดดูผ่าน Tab "ทั้งหมด 30 เล่ม" หรือหมวดหมู่ได้ครบ)
 */
export const TOP_10_EBOOK_CODES: string[] = [
  "EB-PA-01",
  "EB-AI-02",
  "EB-CAR-03",
  "EB-SHEET-04",
  "EB-ACTIVE-05",
  "EB-VIDEO-06",
  "EB-CANVA-09",
  "EB-REG-13",
  "EB-DOC-17",
  "EB-NEWBIE-30",
];

/**
 * 10. ชุดเซต E-Book สุดคุ้ม (3 แพ็กเกจแนะนำ) สำหรับแสดงบนหน้า /ebooks
 */
export interface EbookBundleSet {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  bookCount: number;
  codes: string[];
  originalPrice: number;
  bundlePrice: number;
  accent: "amber" | "cyan" | "purple";
  lineOrderMsg: string;
}

export const EBOOK_BUNDLE_SETS: EbookBundleSet[] = [
  {
    id: "ebook-set-pa",
    badge: "🏆 ขายดีช่วงประเมิน",
    title: "เซตพิชิต ว.PA & วิจัย 5 บท",
    subtitle: "ครบทั้ง ว.PA, วิจัย CAR 5 บท, แผน Active Learning, คลิปสอน 60 นาที, PLC และ PA บริหาร",
    bookCount: 6,
    codes: ["EB-PA-01", "EB-CAR-03", "EB-ACTIVE-05", "EB-VIDEO-06", "EB-PLC-12", "EB-ADMIN-11"],
    originalPrice: 2030,
    bundlePrice: 1290,
    accent: "amber",
    lineOrderMsg:
      "สวัสดีครับครูอ้น สนใจสั่งซื้อ '🏆 เซต E-Book พิชิต ว.PA & วิจัย 5 บท (6 เล่ม ราคาพิเศษ 1,290 บาท)' ครับ รบกวนขอข้อมูลชำระเงินด้วยครับ 🙏",
  },
  {
    id: "ebook-set-ai",
    badge: "🤖 ยอดนิยมครูยุคใหม่",
    title: "เซตครูยุคใหม่ AI & สื่อดิจิทัล",
    subtitle: "ครบทั้ง 100 AI Prompts, Google Sheets อัตโนมัติ, Canva, Classroom, บอร์ดเกม และ STEM",
    bookCount: 6,
    codes: ["EB-AI-02", "EB-SHEET-04", "EB-CANVA-09", "EB-CLASSROOM-19", "EB-GAME-14", "EB-STEM-22"],
    originalPrice: 1820,
    bundlePrice: 1190,
    accent: "cyan",
    lineOrderMsg:
      "สวัสดีครับครูอ้น สนใจสั่งซื้อ '🤖 เซต E-Book ครูยุคใหม่ AI & สื่อดิจิทัล (6 เล่ม ราคาพิเศษ 1,190 บาท)' ครับ รบกวนขอข้อมูลชำระเงินด้วยครับ 🙏",
  },
  {
    id: "ebook-set-all30",
    badge: "👑 คุ้มที่สุดสำหรับโรงเรียน",
    title: "เหมาคลังครบ 30 เล่ม (ห้องสมุดดิจิทัล)",
    subtitle: "ปลดล็อกครบทุกเล่ม 30 คู่มือครูไทย ใช้ได้ทั้งโรงเรียน คุ้มกว่าซื้อแยกเกิน 60%",
    bookCount: 30,
    codes: [],
    originalPrice: 9150,
    bundlePrice: 3490,
    accent: "purple",
    lineOrderMsg:
      "สวัสดีครับครูอ้น สนใจสั่งซื้อ '👑 เหมาคลัง E-Book ครบ 30 เล่ม ห้องสมุดดิจิทัล (ราคาพิเศษ 3,490 บาท)' ครับ รบกวนขอข้อมูลชำระเงินด้วยครับ 🙏",
  },
];

/**
 * ฟังก์ชันช่วยดึงรหัสระบบ (เช่น AONA02, AONE01) จากชื่อสินค้า
 */
export function extractSystemCode(title: string): string | null {
  const match = (title || "").toUpperCase().match(/\b(AON[EAM]\d{2}|SYS\d{2}|STU\d{2})\b/);
  return match ? match[1] : null;
}

/**
 * แปลงรายการสินค้าจาก Supabase ให้เป็นแคตตาล็อกสากล + ซ่อนตัวเฉพาะทาง + เติมสินค้าเรือธงใหม่ (AONA09, AONA10)
 */
export function transformDigitalVaultProducts<T extends ProductLike>(rawProducts: T[]): ProductLike[] {
  const hiddenSet = new Set(HIDDEN_DIGITAL_VAULT_CODES.map((c) => c.toUpperCase()));

  const filteredAndUniversalized: ProductLike[] = rawProducts
    .filter((product) => {
      const code = extractSystemCode(product.title);
      if (code && hiddenSet.has(code)) return false;
      return true;
    })
    .map((product) => {
      const code = extractSystemCode(product.title);
      if (code && UNIVERSAL_PRODUCT_OVERRIDES[code]) {
        const override = UNIVERSAL_PRODUCT_OVERRIDES[code];
        return {
          ...product,
          title: override.title,
          description: override.description ?? product.description,
          price: override.price ?? product.price,
        };
      }
      return product;
    });

  // ตรวจสอบไม่ให้เพิ่ม AONA09 / AONA10 ซ้ำหากอนาคตเพิ่มลง Supabase แล้ว
  const existingCodes = new Set(
    filteredAndUniversalized
      .map((p) => extractSystemCode(p.title))
      .filter((c): c is string => Boolean(c))
  );

  const extrasToInject = EXTRA_FLAGSHIP_VAULT_PRODUCTS.filter((extra) => {
    const code = extractSystemCode(extra.title);
    return !code || !existingCodes.has(code);
  });

  // นำ AONA09 และ AONA10 ขึ้นมาโชว์ด้านบนสุดเป็นสินค้าเรือธงใหม่ล่าสุด
  return [...extrasToInject, ...filteredAndUniversalized];
}

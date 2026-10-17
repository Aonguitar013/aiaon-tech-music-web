import rawEbooks from "@/data/ebooks-catalog.json";

export interface EbookMetadata {
  rank: number;
  code: string;
  shortCode: string;
  title: string;
  category: string;
  earlyBirdPrice: number;
  regularPrice: number;
  schoolPrice: number;
  dirName: string;
  description: string;
  highlights: string[];
  synopsis: string;
  themeColor: string;
  iconName: string;
  shortCategory: string;
  discountPct: number;
  coverImage?: string | null;
  // 7 Conversion Elements Data
  headline: string;
  subheadline: string;
  beforePain: string;
  afterBenefit: string;
  timeSaved: string;
  deliverables: { title: string; desc: string; icon?: string }[];
  faqs: { q: string; a: string }[];
}

export interface EbookDetailPillars {
  code: string;
  headline: string;
  subheadline: string;
  beforePain: string;
  afterBenefit: string;
  timeSaved: string;
  deliverables: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

// 7-Pillar Specific Data presets for all 30 E-Books
export const EBOOK_PILLARS_DATA: Record<string, EbookDetailPillars> = {
  EB01: {
    code: "EB-PA-01",
    headline: "คัมภีร์ ว.PA ผ่านฉลุย 100%: พิมพ์เขียวเจาะลึก 3 ด้าน 15 ตัวชี้วัด สู่ชำนาญการพิเศษ & เชี่ยวชาญ",
    subheadline: "เขียนประเด็นท้าทายให้ตรงเป๊ะ จัดทำคลิปสภาพปัญหา และตรวจเช็คก่อนอัปโหลด DPA ผ่านในรอบเดียว",
    beforePain: "นั่งงมคู่มือกองโตหลายร้อยหน้า เขียนประเด็นท้าทายไม่ตรง 5 องค์ประกอบ เสี่ยงตกประเมิน หรือต้องแก้งานซ้ำซากหลายรอบ",
    afterBenefit: "มีพิมพ์เขียวตรงตาม 8 ตัวชี้วัด ก.ค.ศ. ล่าสุด ก๊อปปี้โครงสร้างและแนวทางเขียนไปปรับใช้ได้ทันที กรรมการตรวจง่าย ให้ผ่านฉลุย",
    timeSaved: "ประหยัดเวลาเตรียมเอกสาร ว.PA กว่า 40+ ชั่วโมง",
    deliverables: [
      { title: "พิมพ์เขียวการเขียนประเด็นท้าทาย (5 องค์ประกอบ)", desc: "สูตรสำเร็จที่กรรมการสายตรวจประเมินต้องการเห็น ชัดเจน ไม่คลุมเครือ" },
      { title: "ตัวอย่างบทพูดคลิปสภาพปัญหา (Context Video 60 นาที)", desc: "สคริปต์เปิดหัว-ดำเนินเรื่อง-สรุปผล ที่ได้คะแนนเต็มในระบบ DPA" },
      { title: "เช็คลิสต์ตรวจความพร้อม 15 ตัวชี้วัด", desc: "ตรวจทานเอกสารก่อนกด Submit เข้าระบบ ลดความเสี่ยงตกเกณฑ์ 100%" },
    ],
    faqs: [
      { q: "เล่มนี้ใช้ได้กับครูทุกกลุ่มสาระการเรียนรู้หรือไม่?", a: "ใช้ได้กับทุกกลุ่มสาระครับ เพราะยึดโยงตาม 3 ด้าน 15 ตัวชี้วัด และ 8 ตัวชี้วัดการจัดการเรียนรู้ที่เป็นมาตรฐานกลางของ ก.ค.ศ. ครับ" },
      { q: "ถ้าเพิ่งบรรจุ หรือเตรียมทำ ค.ศ.2 (ชำนาญการ) อ่านได้ไหม?", a: "อ่านได้ดีมากครับ เพราะช่วยให้วางแผนสะสมผลงานและบันทึกข้อตกลง PA ได้อย่างถูกต้องตั้งแต่ปีแรก ไม่ต้องเสียเวลาย้อนหลังครับ" },
    ]
  },
  EB02: {
    code: "EB-AI-02",
    headline: "100 คำสั่ง AI ลับ เสกงานครูเสร็จใน 5 นาที: แผนการสอน ข้อสอบ วิจัย สื่อ สารบรรณ คัดลอกแล้วสั่งได้ทันที",
    subheadline: "เทคนิค CRTF Framework คุยกับ ChatGPT, Gemini, Claude ให้ตอบเป๊ะตรงหลักสูตรการศึกษาไทย ไม่เพ้อเจ้อ",
    beforePain: "พิมพ์สั่ง AI แล้วได้คำตอบกว้างๆ ภาษาวิชาการแปลกๆ ใช้ส่งผู้บริหารไม่ได้ ต้องมานั่งแก้ใหม่ตั้งแต่ต้นจนดึกดื่น",
    afterBenefit: "หยิบคำสั่งลับ 100 คำสั่งไปวาง เติมเฉพาะชื่อวิชาและเนื้อหาในวงเล็บ ได้แผนการสอน ข้อสอบพร้อมเฉลย และตารางประเมินใน 5 นาที",
    timeSaved: "คืนเวลาชีวิตให้คุณครูมากกว่า 10 ชั่วโมง/สัปดาห์",
    deliverables: [
      { title: "100 Prompt Templates คลุม 6 หมวดงานครู", desc: "เขียนแผน Active Learning, ออกข้อสอบ 4 ระดับ, สรุปวิจัย, สื่อนำเสนอ, หนังสือราชการ, สุนทรพจน์" },
      { title: "สูตรลับ CRTF Framework (Context-Role-Task-Format)", desc: "วิธีป้อนบทบาทและบริบทให้ AI ฉลาดขึ้น 10 เท่า ตอบภาษาทางการระดับกระทรวง" },
      { title: "ตาราง Prompt เสก Test Blueprint & Rubrics", desc: "สร้างตารางวิเคราะห์ข้อสอบและเกณฑ์การให้คะแนนรูบริกส์ 4 ระดับโดยอัตโนมัติ" },
    ],
    faqs: [
      { q: "คำสั่งเหล่านี้ใช้กับ AI ฟรีอย่าง Google Gemini หรือ ChatGPT ฟรีได้ไหม?", a: "ใช้ได้ 100% ครับ ออกแบบมาให้ทำงานได้เต็มประสิทธิภาพทั้งบน ChatGPT ฟรี, Gemini, Claude และ Copilot ครับ" },
      { q: "ไม่มีพื้นฐานการใช้งาน AI มาก่อนเลย จะใช้เป็นไหม?", a: "เป็นแน่นอนครับ มีคำอธิบายทีละขั้นตอน แค่ Copy แล้ว Paste แทนที่คำในวงเล็บเหลี่ยม [ ] เท่านั้นครับ" },
    ]
  },
  EB03: {
    code: "EB-CAR-03",
    headline: "สูตรลับวิจัยในชั้นเรียน (CAR) 5 บท ฉบับจับมือทำ 3 วันเสร็จ: มีนวัตกรรม สถิติ และเล่มสมบูรณ์พร้อมส่ง",
    subheadline: "แก้ปัญหาการเรียนรู้ตรงจุด พร้อมสูตรคำนวณสถิติสำเร็จรูป และแนวทางการเขียนอภิปรายผลบทที่ 5 เชิงทฤษฎี",
    beforePain: "คิดหัวข้อวิจัยไม่ออก ไม่ถนัดสูตรสถิติ คำนวณ t-test ไม่เป็น ติดค้างเล่มวิจัยข้ามปีจนส่งผลต่อการประเมินวิทยฐานะ",
    afterBenefit: "เลือกจาก 10 ไอเดียนวัตกรรมสุดฮิต ใส่คะแนนลงตารางสูตรสำเร็จคำนวณ Mean, SD, t-test ออโต้ พร้อมเขียน 5 บทจบใน 3 วัน",
    timeSaved: "ลดเวลาทำเล่มวิจัยจาก 3 เดือน เหลือเพียง 3 วัน",
    deliverables: [
      { title: "โครงร่างวิจัย CAR 5 บทฉบับมาตรฐาน", desc: "บทที่ 1 ถึง บทที่ 5 มีแนวทางการเขียนและตัวอย่างประโยควิชาการพร้อมใช้" },
      { title: "10 นวัตกรรมแก้ปัญหาห้องเรียนยอดนิยม", desc: "ชุดกิจกรรม, บอร์ดเกม, แบบฝึกทักษะ, สื่อมัลติมีเดีย ที่เห็นผลสัมฤทธิ์เด่นชัด" },
      { title: "ตารางสูตร Excel วิเคราะห์ผลสัมฤทธิ์ก่อน-หลังเรียน", desc: "คำนวณค่าเฉลี่ย ส่วนเบี่ยงเบนมาตรฐาน และ t-test Dependent แบบใส่ตัวเลขปุ๊บได้กราฟปั๊บ" },
    ],
    faqs: [
      { q: "นำเล่มวิจัยนี้ไปใช้ประกอบ ว.PA ด้านที่ 1 และ 2 ได้ไหม?", a: "ได้สมบูรณ์แบบครับ เพราะ ว.PA เน้นการแก้ไขปัญหาและพัฒนาผู้เรียน ซึ่งวิจัย CAR คือหลักฐานเชิงประจักษ์ที่ดีที่สุดครับ" },
    ]
  },
  EB04: {
    code: "EB-SHEET-04",
    headline: "เปลี่ยน Google Sheets ให้เป็นระบบจัดการห้องเรียนอัตโนมัติ: No-Code Smart School คืนเวลาชีวิตให้ครู",
    subheadline: "สร้างระบบเช็คชื่อ บันทึกคะแนน แจ้งเตือน LINE และออกเกียรติบัตรอัตโนมัติ โดยไม่ต้องเขียนโปรแกรมเป็น",
    beforePain: "กรอกคะแนนแล้วต้องมานั่งคำนวณเกรด ทำรายงานด้วยมือ ตกเย็นผู้ปกครองทักถามการบ้านและผลเรียนทีละคน",
    afterBenefit: "เชื่อมโยงข้อมูลใน Google Sheets กดยืนยันครั้งเดียว ระบบคำนวณเกรด แจ้งเตือนผู้ปกครอง และออกรายงานสรุปทันที",
    timeSaved: "ประหยัดเวลางานธุรการชั้นเรียน 20+ ชั่วโมง/เดือน",
    deliverables: [
      { title: "เทมเพลต Google Sheets สำเร็จรูป", desc: "ตั้งสูตร ArrayFormula, VLOOKUP, QUERY, IMPORTRANGE พร้อมทำงานเชื่อมโยงกัน" },
      { title: "สคริปต์ Clean Code ส่ง LINE Notify", desc: "ก๊อปปี้ไปวางใน Apps Script แล้วกด Deploy เชื่อมต่อโทเค็น LINE ได้ทันที" },
      { title: "คู่มือสร้างแบบฟอร์มบันทึกบนมือถือ", desc: "เปลี่ยนหน้าชีตให้กลายเป็น Web App กดง่ายจากหน้าจอมือถือของคุณครู" },
    ],
    faqs: [
      { q: "ถ้าไม่มีความรู้เรื่องการเขียนโค้ดเลย จะทำได้จริงไหม?", a: "ทำได้จริง 100% ครับ เล่มนี้เป็นแนว No-Code อธิบายแบบจับมือทำ มีไฟล์ตัวอย่างให้กด 'ทำสำเนา (Make a copy)' ไปใช้ได้เลยครับ" },
    ]
  },
  EB05: {
    code: "EB-ACTIVE-05",
    headline: "คู่มือสร้างแผนการสอน Active Learning ให้ผ่านเกณฑ์ประเมิน: 8 ตัวชี้วัด ก.ค.ศ. ฉบับห้องเรียนจริง",
    subheadline: "เปลี่ยนการสอนแบบบรรยาย มาเป็นกระบวนการเรียนรู้เชิงรุกที่นักเรียนมีส่วนร่วม และสอดรับกับคลิปการสอน ว.PA",
    beforePain: "เขียนแผน Active Learning แต่กรรมการท้วงว่าเด็กไม่ได้ลงมือปฏิบัติจริง กิจกรรมไม่เชื่อมโยงกับจุดประสงค์การเรียนรู้",
    afterBenefit: "เขียนแผนเป็นระบบด้วย 5 ขั้นตอน Active Process นักเรียนตื่นตัว มีชิ้นงานประจักษ์ และสอดรับกับคลิปสอน 60 นาที 100%",
    timeSaved: "ประหยัดเวลาเขียนและปรับแก้แผนการสอน 30+ ชั่วโมง",
    deliverables: [
      { title: "โครงสร้างแผน Active Learning 8 ตัวชี้วัด", desc: "ระบุพฤติกรรม KPA และสมรรถนะสำคัญของผู้เรียนอย่างถูกต้องชัดเจน" },
      { title: "คลังกิจกรรม Ice Breaking & Reflection", desc: "กิจกรรมเปิดบทเรียนกระตุ้นสมอง และกิจกรรมสรุปบทเรียนแบบสะท้อนคิด" },
      { title: "แบบประเมินสมรรถนะ & ใบงานรูบริกส์", desc: "เครื่องมือวัดและประเมินผลตามสภาพจริง (Authentic Assessment)" },
    ],
    faqs: [
      { q: "แผนการสอนในเล่มนี้เน้นระดับชั้นไหน?", a: "ครอบคลุมทั้งประถมศึกษาและมัธยมศึกษา โดยสามารถปรับระดับความยากง่ายตามตัวชี้วัดของแต่ละชั้นปีได้ทันทีครับ" },
    ]
  },
};

// Generic generator for EB06 to EB30
export function getEbookPillars(code: string, catalogItem: (typeof rawEbooks)[0]): EbookDetailPillars {
  const shortCode = code.replace(/[^A-Z0-9]/gi, "").toUpperCase();
  const normalizedKey = shortCode.startsWith("EB") && shortCode.length >= 4 
    ? shortCode.slice(0, 4) 
    : shortCode.padStart(4, "0");

  if (EBOOK_PILLARS_DATA[normalizedKey]) {
    return EBOOK_PILLARS_DATA[normalizedKey];
  }

  // Fallback enriched generator based on catalog data
  return {
    code: catalogItem.code,
    headline: `${catalogItem.title}: คู่มือฉบับจับมือทำสู่ความเป็นเลิศในวิชาชีพครู 2026`,
    subheadline: `${catalogItem.synopsis || "ยกระดับการจัดการเรียนการสอนและพัฒนางานในวิชาชีพอย่างมีมาตรฐาน พร้อมไฟล์แม่แบบนำไปปรับใช้ได้ทันที"}`,
    beforePain: `ต้องลองผิดลองถูกด้วยตนเอง เสียเวลาค้นหาข้อมูลที่ไม่ครบถ้วน เอกสารไม่ตรงตามมาตรฐานหน่วยงานต้นสังกัด`,
    afterBenefit: `มีแนวทางปฏิบัติระดับ Gold Standard ก๊อปปี้เทมเพลตไปปรับใช้ได้ทันที ผลงานถูกต้อง สวยงาม ผ่านการประเมินอย่างมั่นใจ`,
    timeSaved: `ประหยัดเวลาทำงานวิชาการและธุรการกว่า 15-25 ชั่วโมง`,
    deliverables: [
      {
        title: catalogItem.highlights[0] || "พิมพ์เขียวและแนวทางปฏิบัติ Step-by-Step",
        desc: "อธิบายโครงสร้างและขั้นตอนการทำงานอย่างเป็นระบบ ชัดเจน เข้าใจง่าย"
      },
      {
        title: catalogItem.highlights[1] || "ไฟล์แม่แบบและตัวอย่างผลงานพร้อมใช้",
        desc: "นำไปปรับแก้ข้อมูลของตนเองแล้วพิมพ์หรือนำส่งตรวจประเมินได้ทันที"
      },
      {
        title: catalogItem.highlights[2] || "เช็คลิสต์ตรวจสอบความถูกต้องตามเกณฑ์",
        desc: "ตรวจทานทุกมิติตามข้อกำหนดของกระทรวงศึกษาธิการและ ก.ค.ศ."
      }
    ],
    faqs: [
      {
        q: "เมื่อสั่งซื้อแล้วสามารถเข้าอ่านได้อย่างไร?",
        a: "คุณครูจะได้รับลิงก์ส่วนตัวสำหรับเปิดอ่านผ่านเว็บเบราว์เซอร์ได้ทันทีบนมือถือ แท็บเล็ต หรือคอมพิวเตอร์ และทุกเล่มมีปุ่ม 'พิมพ์เป็นเอกสาร A4 (PDF)' ให้บันทึกเป็นไฟล์คุณภาพสูงได้ทันทีครับ"
      },
      {
        q: "หากต้องการสอบถามเพิ่มเติมหรือติดปัญหา สามารถปรึกษาได้ที่ไหน?",
        a: "สามารถติดต่อสอบถามครูอ้นโดยตรงผ่าน LINE Official Account (@deu6776s) ได้ตลอดเวลาครับ"
      }
    ]
  };
}

// Helper to normalize any incoming ID (e.g. "EB01", "EB-PA-01", "1", "eb-01")
export function normalizeEbookCode(id: string): string {
  if (!id) return "EB01";
  const clean = id.trim().toUpperCase();

  // Match EB-XX-01..30
  const matchLong = clean.match(/EB-[A-Z0-9]+-(0[1-9]|[12]\d|30)/);
  if (matchLong) return `EB${matchLong[1]}`;

  // Match EB01..EB30
  const matchShort = clean.match(/EB(0[1-9]|[12]\d|30)/);
  if (matchShort) return `EB${matchShort[1]}`;

  // Match pure numbers 1..30
  const matchNum = clean.match(/^([1-9]|[12]\d|30)$/);
  if (matchNum) return `EB${matchNum[1].padStart(2, "0")}`;

  return "EB01";
}

// Find ebook in catalog by code or rank
export function findEbookByCode(id: string): EbookMetadata | null {
  const norm = normalizeEbookCode(id);
  const rankNum = parseInt(norm.replace("EB", ""), 10);

  const found = rawEbooks.find((item) => {
    return (
      item.code.toUpperCase() === norm ||
      item.code.toUpperCase().includes(norm) ||
      item.rank === rankNum ||
      normalizeEbookCode(item.code) === norm
    );
  });

  if (!found) return null;

  const pillars = getEbookPillars(norm, found);

  return {
    ...found,
    shortCode: norm,
    headline: pillars.headline,
    subheadline: pillars.subheadline,
    beforePain: pillars.beforePain,
    afterBenefit: pillars.afterBenefit,
    timeSaved: pillars.timeSaved,
    deliverables: pillars.deliverables,
    faqs: pillars.faqs,
  };
}

export function getAllEbooks(): EbookMetadata[] {
  return rawEbooks.map((item) => {
    const norm = normalizeEbookCode(item.code);
    const pillars = getEbookPillars(norm, item);
    return {
      ...item,
      shortCode: norm,
      headline: pillars.headline,
      subheadline: pillars.subheadline,
      beforePain: pillars.beforePain,
      afterBenefit: pillars.afterBenefit,
      timeSaved: pillars.timeSaved,
      deliverables: pillars.deliverables,
      faqs: pillars.faqs,
    };
  });
}

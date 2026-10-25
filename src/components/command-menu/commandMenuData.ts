// --- COMMAND MENU MASTER SEARCH INDEX ---
// Comprehensive search index for AiAon Tech Platform (Ctrl+K)

export interface CommandMenuItem {
  id: string;
  title: string;
  description: string;
  category: "systems" | "ebooks" | "freebies" | "bundles" | "pages";
  categoryLabel: string;
  url: string;
  code?: string;
  price?: string;
  badge?: string;
  keywords?: string[];
}

export const COMMAND_MENU_ITEMS: CommandMenuItem[] = [
  {
    "id": "page-home",
    "title": "หน้าแรก (Home Dashboard)",
    "description": "ศูนย์รวม 8 มหาคลังนวัตกรรม AiAon Tech x Music",
    "category": "pages",
    "categoryLabel": "เมนูหลัก",
    "url": "/",
    "badge": "หน้าหลัก",
    "keywords": [
      "หน้าแรก",
      "home",
      "main",
      "start"
    ]
  },
  {
    "id": "page-freebies",
    "title": "คลังของแจกฟรี (Freebies Hub)",
    "description": "ดาวน์โหลดระบบ Google Apps Script, โค้ดฟรี, สื่อการสอน AI ไม่มีค่าใช้จ่าย",
    "category": "freebies",
    "categoryLabel": "ของแจกฟรี",
    "url": "/freebies",
    "badge": "FREE 🎁",
    "keywords": [
      "ฟรี",
      "แจกฟรี",
      "free",
      "freebie",
      "download",
      "โค้ดฟรี"
    ]
  },
  {
    "id": "page-digital-vault",
    "title": "Digital Vault — คลังระบบอัตโนมัติ 20 ระบบ",
    "description": "ระบบบริหารงานโรงเรียนและห้องเรียน Google Apps Script สำหรับครูไทย",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/digital-vault",
    "badge": "20 ระบบ",
    "keywords": [
      "คลังระบบ",
      "digital vault",
      "gas",
      "google apps script",
      "ระบบครู"
    ]
  },
  {
    "id": "page-bundles",
    "title": "รวมแพ็กเกจสุดคุ้ม (VIP Bundles)",
    "description": "4 แพ็กเกจเหมาสุดคุ้ม ลดภาระงานครูและโรงเรียน ประหยัดสูงสุด 60%",
    "category": "bundles",
    "categoryLabel": "บันเดิล",
    "url": "/bundles",
    "badge": "ประหยัด 60%",
    "keywords": [
      "แพ็กเกจ",
      "bundle",
      "เหมา",
      "ประหยัด",
      "โปรโมชั่น"
    ]
  },
  {
    "id": "page-ebooks",
    "title": "คลัง 30 E-Book ครูไทย 2026",
    "description": "หนังสือคู่มือ AI ช่วยสอน ว.PA 15 ตัวชี้วัด และสุดยอด Prompt งานครู",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks",
    "badge": "30 เล่ม",
    "keywords": [
      "ebook",
      "อีบุ๊ก",
      "หนังสือ",
      "ว.pa",
      "ai ช่วยสอน"
    ]
  },
  {
    "id": "page-music-store",
    "title": "คลังเพลงลิขสิทธิ์ & เพลงจำสอบ (Music Store)",
    "description": "เพลงช่วยจำสอบครูผู้ช่วย Suno AI และเพลง BGM เสียงตามสายโรงเรียน",
    "category": "pages",
    "categoryLabel": "ดนตรี",
    "url": "/music-store",
    "badge": "Music x AI",
    "keywords": [
      "เพลง",
      "music",
      "เพลงจำ",
      "ครูผู้ช่วย",
      "suno",
      "bgm"
    ]
  },
  {
    "id": "page-teacher-prep",
    "title": "ติวสอบครูผู้ช่วย AiAon Prep",
    "description": "กลุ่ม Telegram VIP ติวสอบครูผู้ช่วย คลังข้อสอบ On-Demand 24 ชม.",
    "category": "pages",
    "categoryLabel": "ติวสอบ",
    "url": "/teacher-prep",
    "badge": "VIP Prep",
    "keywords": [
      "ติวสอบ",
      "ครูผู้ช่วย",
      "prep",
      "ข้อสอบ",
      "telegram"
    ]
  },
  {
    "id": "page-ai-caretaker",
    "title": "บริการ AI Caretaker 24/7",
    "description": "บริการติดตั้งและดูแลระบบ AI เลขาส่วนตัวเฝ้าระวังเครื่องคอมพิวเตอร์",
    "category": "pages",
    "categoryLabel": "บริการ",
    "url": "/services/ai-caretaker",
    "badge": "24/7 VIP",
    "keywords": [
      "caretaker",
      "ผู้ช่วย",
      "ai",
      "บริการ",
      "ติดตั้ง"
    ]
  },
  {
    "id": "page-student-vault",
    "title": "คลังผลงานนักเรียน TCAS & Student Hub",
    "description": "เว็บพอร์ตฟอลิโอ 3D TCAS, ระบบเช็คการบ้าน และคัมภีร์ AI สำหรับนักเรียน",
    "category": "pages",
    "categoryLabel": "นักเรียน",
    "url": "/student-vault",
    "badge": "TCAS 3D",
    "keywords": [
      "พอร์ต",
      "tcas",
      "portfolio",
      "นักเรียน",
      "student"
    ]
  },
  {
    "id": "page-vehicle-log",
    "title": "ระบบบริหารยานพาหนะและจองรถ (Vehicle Log)",
    "description": "ระบบขออนุมัติใช้รถโรงเรียนหาดใหญ่วิทยาลัย MyOffice",
    "category": "pages",
    "categoryLabel": "ระบบโรงเรียน",
    "url": "/vehicle-log",
    "badge": "MyOffice",
    "keywords": [
      "รถ",
      "ยานพาหนะ",
      "จองรถ",
      "หาดใหญ่วิทยาลัย",
      "ญ.ว."
    ]
  },
  {
    "id": "page-about",
    "title": "เกี่ยวกับครูอ้น (About Kru Aon)",
    "description": "ประวัติและผลงาน ครูจิรวัฒน์ เดชเส้ง ผู้ก่อตั้ง AiAon Tech x Music",
    "category": "pages",
    "categoryLabel": "ผู้พัฒนา",
    "url": "/about",
    "badge": "ครูอ้น ญ.ว.",
    "keywords": [
      "เกี่ยวกับ",
      "about",
      "ครูอ้น",
      "จิรวัฒน์ เดชเส้ง",
      "ประวัติ"
    ]
  },
  {
    "id": "sys-aona01",
    "title": "[AONA01] ระบบทำเนียบและเลือกตำแหน่งงานครู ม.3",
    "description": "บริหาร & สำนักงาน • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONA01",
    "price": "390 ฿",
    "badge": "บริหาร & สำนักงาน",
    "keywords": [
      "AONA01",
      "aona01",
      "ระบบทำเนียบและเลือกตำแหน่งงานครู ม.3",
      "บริหาร & สำนักงาน",
      "gas",
      "ระบบ",
      "ผังองค์กร Interactive Tree Chart สวยงาม",
      "อัปโหลดรูปภาพประจำตัวครู พร้อมระบบ PIN",
      "ซิงค์ข้อมูลลง Google Sheets ปลอดภัย 100%"
    ]
  },
  {
    "id": "sys-aona02",
    "title": "[AONA02] ระบบสารสนเทศยานพาหนะ Smart Vehicle (🌟 Hero)",
    "description": "บริหาร & ยานพาหนะ • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONA02",
    "price": "990 ฿",
    "badge": "บริหาร & ยานพาหนะ",
    "keywords": [
      "AONA02",
      "aona02",
      "ระบบสารสนเทศยานพาหนะ Smart Vehicle (🌟 Hero)",
      "บริหาร & ยานพาหนะ",
      "gas",
      "ระบบ",
      "ขออนุมัติใช้รถโรงเรียนออนไลน์ & บันทึกเลขไมล์",
      "บันทึกเติมน้ำมันแนบรูปบิล และสรุปประวัติซ่อมบำรุง",
      "ออกรายงานสรุปรายเดือน PDF ในคลิกเดียว"
    ]
  },
  {
    "id": "sys-aona03",
    "title": "[AONA03] ระบบออกเกียรติบัตรอัตโนมัติ + QR Verify (🌟 Best Seller)",
    "description": "ระบบประเมินผล & กิจกรรม • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONA03",
    "price": "690 ฿",
    "badge": "ระบบประเมินผล & กิจกรรม",
    "keywords": [
      "AONA03",
      "aona03",
      "ระบบออกเกียรติบัตรอัตโนมัติ + QR Verify (🌟 Best Seller)",
      "ระบบประเมินผล & กิจกรรม",
      "gas",
      "ระบบ",
      "สร้างเกียรติบัตร PDF จาก Google Slides อัตโนมัติ",
      "สแกน QR Code ตรวจสอบความถูกต้องได้จริง ป้องกันปลอม",
      "ส่งเข้าอีเมลผู้รับทันที"
    ]
  },
  {
    "id": "sys-aona04",
    "title": "[AONA04] ระบบสมุดติดต่อและเบอร์โทรศัพท์ครู ม.3",
    "description": "บริหาร & สำนักงาน • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONA04",
    "price": "390 ฿",
    "badge": "บริหาร & สำนักงาน",
    "keywords": [
      "AONA04",
      "aona04",
      "ระบบสมุดติดต่อและเบอร์โทรศัพท์ครู ม.3",
      "บริหาร & สำนักงาน",
      "gas",
      "ระบบ",
      "Quick Picker รายชื่อและค้นหาด่วน",
      "สร้าง QR Code ประจำตัว กดโทรออกได้ทันทีจากมือถือ",
      "ส่งออกข้อมูลติดต่อเป็นไฟล์ CSV"
    ]
  },
  {
    "id": "sys-aona05",
    "title": "[AONA05] ระบบยืม-คืนพัสดุและเครื่องดนตรีส่วนกลาง",
    "description": "บริหาร & พัสดุ • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONA05",
    "price": "590 ฿",
    "badge": "บริหาร & พัสดุ",
    "keywords": [
      "AONA05",
      "aona05",
      "ระบบยืม-คืนพัสดุและเครื่องดนตรีส่วนกลาง",
      "บริหาร & พัสดุ",
      "gas",
      "ระบบ",
      "ออกป้าย QR Tag ติดอุปกรณ์และเครื่องดนตรี",
      "บันทึกยืม-คืนผ่านสมาร์ทโฟน สะดวกรวดเร็ว",
      "คำนวณวันเตือน Overdue ล่าช้าอัตโนมัติ"
    ]
  },
  {
    "id": "sys-aona06",
    "title": "[AONA06] ระบบบันทึกและติดตามการลาครู ม.3",
    "description": "บริหาร & สำนักงาน • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONA06",
    "price": "590 ฿",
    "badge": "บริหาร & สำนักงาน",
    "keywords": [
      "AONA06",
      "aona06",
      "ระบบบันทึกและติดตามการลาครู ม.3",
      "บริหาร & สำนักงาน",
      "gas",
      "ระบบ",
      "พรีโหลดรายชื่อครูและบันทึกการลาออนไลน์",
      "จัดสรรชั่วโมงฝากสอนแทนรายคาบ 1-8",
      "หัวหน้าระดับเซ็นอนุมัติรับทราบด้วย PIN"
    ]
  },
  {
    "id": "sys-aona07",
    "title": "[AONA07] ระบบประเมินตนเอง SAR & ว.PA 15 ตัวชี้วัด",
    "description": "วิทยฐานะ & ว.PA • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONA07",
    "price": "ฟรี",
    "badge": "วิทยฐานะ & ว.PA",
    "keywords": [
      "AONA07",
      "aona07",
      "ระบบประเมินตนเอง SAR & ว.PA 15 ตัวชี้วัด",
      "วิทยฐานะ & ว.PA",
      "gas",
      "ระบบ",
      "ประเมินตนเองครบ 3 ด้าน 15 ตัวชี้วัด",
      "สรุปรายงานส่งกรรมการ DPA อัตโนมัติ",
      "แจกฟรีด้วยรหัส FREE69"
    ]
  },
  {
    "id": "sys-aona08",
    "title": "[AONA08] ระบบรวมผลงานครู E-Portfolio & เว็บไซต์ครู",
    "description": "วิทยฐานะ & ผลงาน • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONA08",
    "price": "690 ฿",
    "badge": "วิทยฐานะ & ผลงาน",
    "keywords": [
      "AONA08",
      "aona08",
      "ระบบรวมผลงานครู E-Portfolio & เว็บไซต์ครู",
      "วิทยฐานะ & ผลงาน",
      "gas",
      "ระบบ",
      "เว็บรวมผลงานครูสวยงาม Responsive",
      "ลิงก์ตรงเอกสารหลักฐานบน Drive",
      "พร้อมยื่นประเมินวิทยฐานะ"
    ]
  },
  {
    "id": "sys-aone01",
    "title": "[AONE01] ระบบเช็คชื่อและพฤติกรรมนักเรียน ม.3 V2",
    "description": "กิจการนักเรียน & ชั้นเรียน • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONE01",
    "price": "490 ฿",
    "badge": "กิจการนักเรียน & ชั้นเรียน",
    "keywords": [
      "AONE01",
      "aone01",
      "ระบบเช็คชื่อและพฤติกรรมนักเรียน ม.3 V2",
      "กิจการนักเรียน & ชั้นเรียน",
      "gas",
      "ระบบ",
      "เช็คชื่อเข้าแถว ตรวจเครื่องแต่งกาย บันทึกพฤติกรรม",
      "ส่งแจ้งเตือนเข้า LINE Notify ผู้ปกครองอัตโนมัติ",
      "สรุปสถิติมาเรียน ขาด ลา มาสาย ลง Google Sheets"
    ]
  },
  {
    "id": "sys-aone02",
    "title": "[AONE02] ระบบแบ่งฝ่ายงานคอนเสิร์ต & ส่งงานการสอน",
    "description": "วิชาการ & กิจกรรม • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONE02",
    "price": "390 ฿",
    "badge": "วิชาการ & กิจกรรม",
    "keywords": [
      "AONE02",
      "aone02",
      "ระบบแบ่งฝ่ายงานคอนเสิร์ต & ส่งงานการสอน",
      "วิชาการ & กิจกรรม",
      "gas",
      "ระบบ",
      "เลือกรหัสนักเรียนและเลือกฝ่ายงานกิจกรรม",
      "อัปโหลดรูปภาพประจำตัว พร้อมระบบยืนยันด้วย PIN",
      "ตรวจเช็คการส่งงานและการบ้านนักเรียน"
    ]
  },
  {
    "id": "sys-aone03",
    "title": "[AONE03] ระบบตรวจติดตามเครื่องแต่งกาย ม.3",
    "description": "วินัย & พฤติกรรม • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONE03",
    "price": "390 ฿",
    "badge": "วินัย & พฤติกรรม",
    "keywords": [
      "AONE03",
      "aone03",
      "ระบบตรวจติดตามเครื่องแต่งกาย ม.3",
      "วินัย & พฤติกรรม",
      "gas",
      "ระบบ",
      "บันทึกตรวจระเบียบวินัยและเครื่องแต่งกายนักเรียน",
      "ออกรายงานสรุปสถิติความประพฤติ",
      "ระบบปลดสถานะแก้ตัวอัตโนมัติ"
    ]
  },
  {
    "id": "sys-aone04",
    "title": "[AONE04] ระบบเช็คชื่อและตรวจเครื่องแบบ ม.3 V1",
    "description": "กิจการนักเรียน & ชั้นเรียน • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONE04",
    "price": "490 ฿",
    "badge": "กิจการนักเรียน & ชั้นเรียน",
    "keywords": [
      "AONE04",
      "aone04",
      "ระบบเช็คชื่อและตรวจเครื่องแบบ ม.3 V1",
      "กิจการนักเรียน & ชั้นเรียน",
      "gas",
      "ระบบ",
      "ระบบเช็คชื่อรายบุคคลพร้อม Digital Slip",
      "แบบฟอร์มแจ้งลาล่วงหน้า (LeaveForm)",
      "รายงานตัวมาสาย (LateEntry) แบบ Real-time"
    ]
  },
  {
    "id": "sys-aone05",
    "title": "[AONE05] ระบบบันทึกพฤติกรรม & แต้มความประพฤติ",
    "description": "วินัย & ฝ่ายปกครอง • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONE05",
    "price": "490 ฿",
    "badge": "วินัย & ฝ่ายปกครอง",
    "keywords": [
      "AONE05",
      "aone05",
      "ระบบบันทึกพฤติกรรม & แต้มความประพฤติ",
      "วินัย & ฝ่ายปกครอง",
      "gas",
      "ระบบ",
      "บีบอัดรูปภาพหลักฐาน Canvas ส่งขึ้น Google Drive อัตโนมัติ",
      "แจ้งเตือนเข้า LINE ฝ่ายปกครองทันที",
      "ระบบตัดแต้มและคืนแต้มความประพฤติตามเกณฑ์"
    ]
  },
  {
    "id": "sys-aone06",
    "title": "[AONE06] ระบบตรวจสอบคะแนนสอบวิชาดนตรี ม.4",
    "description": "วัด & ประเมินผล • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONE06",
    "price": "390 ฿",
    "badge": "วัด & ประเมินผล",
    "keywords": [
      "AONE06",
      "aone06",
      "ระบบตรวจสอบคะแนนสอบวิชาดนตรี ม.4",
      "วัด & ประเมินผล",
      "gas",
      "ระบบ",
      "Rate Limiting ป้องกันการสุ่มเดารหัสผ่าน",
      "วงแหวน Animated Ring แสดงผลเกรดและคะแนน",
      "เอฟเฟกต์ Confetti สวยงามฉลองนักเรียนสอบผ่าน"
    ]
  },
  {
    "id": "sys-aone07",
    "title": "[AONE07] ระบบตรวจสอบคะแนนสอบวิชาดนตรี ม.3",
    "description": "วัด & ประเมินผล • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONE07",
    "price": "390 ฿",
    "badge": "วัด & ประเมินผล",
    "keywords": [
      "AONE07",
      "aone07",
      "ระบบตรวจสอบคะแนนสอบวิชาดนตรี ม.3",
      "วัด & ประเมินผล",
      "gas",
      "ระบบ",
      "ซิงค์รูปถ่ายนักเรียนจาก Google Drive อัตโนมัติ",
      "Anonymous Percentile Rank Badge สวยงาม",
      "ระบบแสดงสิทธิ์สอบแก้ตัวตามเกณฑ์ 80%"
    ]
  },
  {
    "id": "sys-aone08",
    "title": "[AONE08] ระบบรับส่งใบขออนุญาตผู้ปกครอง ม.3",
    "description": "กิจการนักเรียน & วิชาการ • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONE08",
    "price": "390 ฿",
    "badge": "กิจการนักเรียน & วิชาการ",
    "keywords": [
      "AONE08",
      "aone08",
      "ระบบรับส่งใบขออนุญาตผู้ปกครอง ม.3",
      "กิจการนักเรียน & วิชาการ",
      "gas",
      "ระบบ",
      "รับส่งใบขออนุญาตเข้าร่วมกิจกรรม/ไปนอกสถานศึกษา",
      "อัปโหลดรูปถ่ายหรือไฟล์ PDF แนบเข้า Google Drive ทันที",
      "บันทึกสถานะการยินยอมของผู้ปกครองลง Google Sheets"
    ]
  },
  {
    "id": "sys-aone09",
    "title": "[AONE09] ระบบแกนนำห้องเรียนสีขาว & Auto-Report (🌟 Hero)",
    "description": "กิจการนักเรียน & รางวัล • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONE09",
    "price": "990 ฿",
    "badge": "กิจการนักเรียน & รางวัล",
    "keywords": [
      "AONE09",
      "aone09",
      "ระบบแกนนำห้องเรียนสีขาว & Auto-Report (🌟 Hero)",
      "กิจการนักเรียน & รางวัล",
      "gas",
      "ระบบ",
      "บริหารแกนนำ 4 ฝ่าย 25 ตำแหน่ง ผัง Tree Chart",
      "ระบบสร้างเล่มรายงาน 37 หน้า Google Docs & PDF อัตโนมัติในคลิกเดียว",
      "ประหยัดเวลาครูที่ปรึกษามากกว่า 20 ชั่วโมง"
    ]
  },
  {
    "id": "sys-aone10",
    "title": "[AONE10] ระบบฝึกจำหน้านักเรียน 3D Flashcard (🌟 Lead Magnet)",
    "description": "นวัตกรรม AI & สื่อการสอน • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONE10",
    "price": "ฟรี",
    "badge": "นวัตกรรม AI & สื่อการสอน",
    "keywords": [
      "AONE10",
      "aone10",
      "ระบบฝึกจำหน้านักเรียน 3D Flashcard (🌟 Lead Magnet)",
      "นวัตกรรม AI & สื่อการสอน",
      "gas",
      "ระบบ",
      "3D Flashcard หมุน 360 องศาเพื่อจำชื่อและใบหน้า",
      "Quiz ทายชื่อ/ภาพ และ Speed Challenge 60 วินาที",
      "แจกฟรีเพื่อช่วยคุณครูจำนักเรียนได้ตั้งแต่วันแรก"
    ]
  },
  {
    "id": "sys-aone11",
    "title": "[AONE11] ระบบจองคิวสอบปฏิบัติ & Digital Pass",
    "description": "วัด & ประเมินผล • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONE11",
    "price": "390 ฿",
    "badge": "วัด & ประเมินผล",
    "keywords": [
      "AONE11",
      "aone11",
      "ระบบจองคิวสอบปฏิบัติ & Digital Pass",
      "วัด & ประเมินผล",
      "gas",
      "ระบบ",
      "ระบบจองคิวสอบปฏิบัติรายบุคคล/กลุ่ม",
      "ออกบัตรนัดสอบดิจิทัล (Digital Exam Pass)",
      "กระดานคิวสอบรวม Real-time และบันทึกคะแนนรูบริกส์"
    ]
  },
  {
    "id": "sys-aone12",
    "title": "[AONE12] ระบบเช็กชื่อแผนเผชิญเหตุฉุกเฉิน & Active Shooter",
    "description": "ความปลอดภัยในสถานศึกษา • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONE12",
    "price": "ฟรี",
    "badge": "ความปลอดภัยในสถานศึกษา",
    "keywords": [
      "AONE12",
      "aone12",
      "ระบบเช็กชื่อแผนเผชิญเหตุฉุกเฉิน & Active Shooter",
      "ความปลอดภัยในสถานศึกษา",
      "gas",
      "ระบบ",
      "นับจำนวนนักเรียนปลอดภัยแบบ Real-time แผนเผชิญเหตุ",
      "คัดกรองกลุ่มเปราะบางเข้า Safe Zone อัตโนมัติ",
      "แจกฟรีด้วยรหัส FREE69 เพื่อความปลอดภัยของเด็กไทย"
    ]
  },
  {
    "id": "sys-aonm01",
    "title": "[AONM01] ระบบทำเนียบและเลือกตำแหน่งลูกเสือ ม.1",
    "description": "กิจกรรมพัฒนาผู้เรียน & ลูกเสือ • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONM01",
    "price": "390 ฿",
    "badge": "กิจกรรมพัฒนาผู้เรียน & ลูกเสือ",
    "keywords": [
      "AONM01",
      "aonm01",
      "ระบบทำเนียบและเลือกตำแหน่งลูกเสือ ม.1",
      "กิจกรรมพัฒนาผู้เรียน & ลูกเสือ",
      "gas",
      "ระบบ",
      "ผัง Tree Chart เลือกตำแหน่งนายหมู่/รองนายหมู่",
      "อัปโหลดรูปชุดลูกเสือ และยืนยันความปลอดภัยด้วย PIN",
      "สรุปโครงสร้างกองลูกเสือ ม.1 อัตโนมัติ"
    ]
  },
  {
    "id": "sys-aonm02",
    "title": "[AONM02] ระบบตรวจเช็คเครื่องแบบลูกเสือ ม.1",
    "description": "กิจกรรมพัฒนาผู้เรียน & ลูกเสือ • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONM02",
    "price": "390 ฿",
    "badge": "กิจกรรมพัฒนาผู้เรียน & ลูกเสือ",
    "keywords": [
      "AONM02",
      "aonm02",
      "ระบบตรวจเช็คเครื่องแบบลูกเสือ ม.1",
      "กิจกรรมพัฒนาผู้เรียน & ลูกเสือ",
      "gas",
      "ระบบ",
      "เช็คชื่อประจำฐานลูกเสือและตรวจระเบียบเครื่องแบบ",
      "ติดตามตรวจซ่อมเครื่องแบบรายสัปดาห์",
      "ประมวลผลสถิติสรุปภาพรวมกองลูกเสือ"
    ]
  },
  {
    "id": "sys-aonm03",
    "title": "[AONM03] ระบบลงเวลาซ้อมดนตรี ส่วนกลาง",
    "description": "ดนตรี & กิจกรรม • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "AONM03",
    "price": "490 ฿",
    "badge": "ดนตรี & กิจกรรม",
    "keywords": [
      "AONM03",
      "aonm03",
      "ระบบลงเวลาซ้อมดนตรี ส่วนกลาง",
      "ดนตรี & กิจกรรม",
      "gas",
      "ระบบ",
      "ระบบลงเวลาเข้า-ออกซ้อมดนตรีด้วย PIN",
      "คำนวณชั่วโมงสะสม Real-time โครงสร้าง High-Speed I/O",
      "ออกรายงานสถิติชั่วโมงการฝึกซ้อม"
    ]
  },
  {
    "id": "sys-stu01",
    "title": "[STU01] เว็บ Portfolio ดิจิทัล TCAS 3D",
    "description": "สำหรับนักเรียน Gen Z • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "STU01",
    "price": "129 ฿",
    "badge": "สำหรับนักเรียน Gen Z",
    "keywords": [
      "STU01",
      "stu01",
      "เว็บ Portfolio ดิจิทัล TCAS 3D",
      "สำหรับนักเรียน Gen Z",
      "gas",
      "ระบบ",
      "สร้างเว็บพอร์ต 3D สวยงาม โดดเด่นสำหรับ TCAS รอบ 1",
      "มี QR Code แปะหน้าปกเล่มพอร์ตส่งกรรมการ",
      "รองรับมือถือ 100% แก้ข้อมูลผ่าน Google Sheets ใน 1 นาที"
    ]
  },
  {
    "id": "sys-stu02",
    "title": "[STU02] ระบบเช็คการบ้าน & งานค้างประจำห้อง (Homework Hub)",
    "description": "สำหรับนักเรียน Gen Z • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "STU02",
    "price": "290 ฿",
    "badge": "สำหรับนักเรียน Gen Z",
    "keywords": [
      "STU02",
      "stu02",
      "ระบบเช็คการบ้าน & งานค้างประจำห้อง (Homework Hub)",
      "สำหรับนักเรียน Gen Z",
      "gas",
      "ระบบ",
      "รวมการบ้านทุกวิชาไว้ในที่เดียวบนมือถือ",
      "นับเวลาถอยหลัง Countdown ก่อนถึงกำหนดส่ง",
      "ซื้อครั้งเดียวใช้ได้ทั้งห้อง หารกันตกคนละไม่กี่บาท"
    ]
  },
  {
    "id": "sys-stu03",
    "title": "[STU03] คัมภีร์ AI Prompts ลับสำหรับนักเรียน (Student AI Secret Kit)",
    "description": "สำหรับนักเรียน Gen Z • ส่งมอบอัตโนมัติใน 10 วินาทีพร้อมคู่มือติดตั้ง 3 สเต็ป",
    "category": "systems",
    "categoryLabel": "ระบบ GAS",
    "url": "/saas",
    "code": "STU03",
    "price": "69 ฿",
    "badge": "สำหรับนักเรียน Gen Z",
    "keywords": [
      "STU03",
      "stu03",
      "คัมภีร์ AI Prompts ลับสำหรับนักเรียน (Student AI Secret Kit)",
      "สำหรับนักเรียน Gen Z",
      "gas",
      "ระบบ",
      "รวมชุดคำสั่ง AI ภาษาไทย เสกรายงาน 5 บทใน 3 นาที",
      "Prompt สรุปบทเรียนเตรียมสอบ และเจนเนื้อหาสไลด์ Canva",
      "คัดลอกไปวางใน ChatGPT/Gemini ใช้งานได้ทันที 100%"
    ]
  },
  {
    "id": "eb-eb-pa-01",
    "title": "[EB-PA-01] คัมภีร์ ว.PA ผ่านฉลุย 100% ฉบับครูชำนาญการพิเศษ & เชี่ยวชาญ",
    "description": "หมวด: ความก้าวหน้าทางวิชาชีพ & ว.PA • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-PA-01",
    "code": "EB-PA-01",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-PA-01",
      "eb-pa-01",
      "คัมภีร์ ว.PA ผ่านฉลุย 100% ฉบับครูชำนาญการพิเศษ & เชี่ยวชาญ",
      "ความก้าวหน้าทางวิชาชีพ & ว.PA",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-ai-02",
    "title": "[EB-AI-02] 100 คำสั่ง AI ลับ เสกงานครูเสร็จใน 5 นาที",
    "description": "หมวด: นวัตกรรม AI & การศึกษาดิจิทัล • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-AI-02",
    "code": "EB-AI-02",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-AI-02",
      "eb-ai-02",
      "100 คำสั่ง AI ลับ เสกงานครูเสร็จใน 5 นาที",
      "นวัตกรรม AI & การศึกษาดิจิทัล",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-car-03",
    "title": "[EB-CAR-03] สูตรลับวิจัยในชั้นเรียน (CAR) 5 บท ฉบับจับมือทำ 3 วันเสร็จ",
    "description": "หมวด: งานวิจัยในชั้นเรียน & ว.PA • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-CAR-03",
    "code": "EB-CAR-03",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-CAR-03",
      "eb-car-03",
      "สูตรลับวิจัยในชั้นเรียน (CAR) 5 บท ฉบับจับมือทำ 3 วันเสร็จ",
      "งานวิจัยในชั้นเรียน & ว.PA",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-sheet-04",
    "title": "[EB-SHEET-04] เปลี่ยน Google Sheets ให้เป็นระบบจัดการห้องเรียนอัตโนมัติ",
    "description": "หมวด: เทคโนโลยีการศึกษา & นวัตกรรมระบบงาน • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-SHEET-04",
    "code": "EB-SHEET-04",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-SHEET-04",
      "eb-sheet-04",
      "เปลี่ยน Google Sheets ให้เป็นระบบจัดการห้องเรียนอัตโนมัติ",
      "เทคโนโลยีการศึกษา & นวัตกรรมระบบงาน",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-active-05",
    "title": "[EB-ACTIVE-05] คู่มือสร้างแผนการสอน Active Learning ให้ผ่านเกณฑ์ประเมิน",
    "description": "หมวด: การจัดการเรียนรู้ & ว.PA • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-ACTIVE-05",
    "code": "EB-ACTIVE-05",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-ACTIVE-05",
      "eb-active-05",
      "คู่มือสร้างแผนการสอน Active Learning ให้ผ่านเกณฑ์ประเมิน",
      "การจัดการเรียนรู้ & ว.PA",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-video-06",
    "title": "[EB-VIDEO-06] เทคนิคจัดทำคลิปวิดีโอบันทึกการสอน 60 นาที และคลิปสภาพปัญหา ว.PA ให้ได้คะแนนเต็ม",
    "description": "หมวด: สื่อมัลติมีเดีย & ว.PA • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-VIDEO-06",
    "code": "EB-VIDEO-06",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-VIDEO-06",
      "eb-video-06",
      "เทคนิคจัดทำคลิปวิดีโอบันทึกการสอน 60 นาที และคลิปสภาพปัญหา ว.PA ให้ได้คะแนนเต็ม",
      "สื่อมัลติมีเดีย & ว.PA",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-test-07",
    "title": "[EB-TEST-07] คลังข้อสอบ & การสร้าง Test Blueprint ฉบับวัดผลตรงตัวชี้วัด สพฐ.",
    "description": "หมวด: การวัดและประเมินผลการเรียนรู้ • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-TEST-07",
    "code": "EB-TEST-07",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-TEST-07",
      "eb-test-07",
      "คลังข้อสอบ & การสร้าง Test Blueprint ฉบับวัดผลตรงตัวชี้วัด สพฐ.",
      "การวัดและประเมินผลการเรียนรู้",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-class-08",
    "title": "[EB-CLASS-08] ศิลปะการจัดการชั้นเรียนเชิงบวก & รับมือเด็กพิเศษ/สมาธิสั้น/พฤติกรรมท้าทาย",
    "description": "หมวด: จิตวิทยาการศึกษา & การจัดการชั้นเรียน • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-CLASS-08",
    "code": "EB-CLASS-08",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-CLASS-08",
      "eb-class-08",
      "ศิลปะการจัดการชั้นเรียนเชิงบวก & รับมือเด็กพิเศษ/สมาธิสั้น/พฤติกรรมท้าทาย",
      "จิตวิทยาการศึกษา & การจัดการชั้นเรียน",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-canva-09",
    "title": "[EB-CANVA-09] คัมภีร์ Canva For Education: เสกใบงาน สื่อ สไลด์ Infographic ระดับมืออาชีพ",
    "description": "หมวด: การออกแบบสื่อการสอน & ดิจิทัลครีเอทีฟ • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-CANVA-09",
    "code": "EB-CANVA-09",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-CANVA-09",
      "eb-canva-09",
      "คัมภีร์ Canva For Education: เสกใบงาน สื่อ สไลด์ Infographic ระดับมืออาชีพ",
      "การออกแบบสื่อการสอน & ดิจิทัลครีเอทีฟ",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-care-10",
    "title": "[EB-CARE-10] คู่มือครูแนะแนว & ระบบดูแลช่วยเหลือนักเรียน 5 ขั้นตอน (SDQ & เยี่ยมบ้าน)",
    "description": "หมวด: งานแนะแนว & กิจการนักเรียน • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-CARE-10",
    "code": "EB-CARE-10",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-CARE-10",
      "eb-care-10",
      "คู่มือครูแนะแนว & ระบบดูแลช่วยเหลือนักเรียน 5 ขั้นตอน (SDQ & เยี่ยมบ้าน)",
      "งานแนะแนว & กิจการนักเรียน",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-admin-11",
    "title": "[EB-ADMIN-11] การเขียนข้อตกลงในการพัฒนางาน (PA) สายงานบริหารสถานศึกษา & ครูพี่เลี้ยง",
    "description": "หมวด: ภาวะผู้นำทางวิชาการ & ว.PA • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-ADMIN-11",
    "code": "EB-ADMIN-11",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-ADMIN-11",
      "eb-admin-11",
      "การเขียนข้อตกลงในการพัฒนางาน (PA) สายงานบริหารสถานศึกษา & ครูพี่เลี้ยง",
      "ภาวะผู้นำทางวิชาการ & ว.PA",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-plc-12",
    "title": "[EB-PLC-12] ศาสตร์และศิลป์แห่ง PLC: รวมพลังสร้างนวัตกรรมการสอนแบบไม่เสียเวลาทำเอกสาร",
    "description": "หมวด: การพัฒนาวิชาชีพ & PLC • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-PLC-12",
    "code": "EB-PLC-12",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-PLC-12",
      "eb-plc-12",
      "ศาสตร์และศิลป์แห่ง PLC: รวมพลังสร้างนวัตกรรมการสอนแบบไม่เสียเวลาทำเอกสาร",
      "การพัฒนาวิชาชีพ & PLC",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-reg-13",
    "title": "[EB-REG-13] คู่มือการจัดทำเอกสารหลักฐานทางการศึกษา ปพ.1 ถึง ปพ.9 ฉบับถูกต้องตามระเบียบ สพฐ.",
    "description": "หมวด: งานทะเบียนวัดผล & กฎหมายการศึกษา • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-REG-13",
    "code": "EB-REG-13",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-REG-13",
      "eb-reg-13",
      "คู่มือการจัดทำเอกสารหลักฐานทางการศึกษา ปพ.1 ถึง ปพ.9 ฉบับถูกต้องตามระเบียบ สพฐ.",
      "งานทะเบียนวัดผล & กฎหมายการศึกษา",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-game-14",
    "title": "[EB-GAME-14] บอร์ดเกมเพื่อการศึกษา (Game-Based Learning): ออกแบบเกมการสอนให้เด็กแย่งกันเรียน",
    "description": "หมวด: นวัตกรรมการสอน & Gamification • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-GAME-14",
    "code": "EB-GAME-14",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-GAME-14",
      "eb-game-14",
      "บอร์ดเกมเพื่อการศึกษา (Game-Based Learning): ออกแบบเกมการสอนให้เด็กแย่งกันเรียน",
      "นวัตกรรมการสอน & Gamification",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-thai-15",
    "title": "[EB-THAI-15] คลินิกภาษาไทย: นวัตกรรมแก้ปัญหาเด็กอ่านไม่ออกเขียนไม่ได้ 100%",
    "description": "หมวด: การจัดการเรียนรู้วิชาภาษาไทย & ซ่อมเสริมนักเรียน • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-THAI-15",
    "code": "EB-THAI-15",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-THAI-15",
      "eb-thai-15",
      "คลินิกภาษาไทย: นวัตกรรมแก้ปัญหาเด็กอ่านไม่ออกเขียนไม่ได้ 100%",
      "การจัดการเรียนรู้วิชาภาษาไทย & ซ่อมเสริมนักเรียน",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-fin-16",
    "title": "[EB-FIN-16] คัมภีร์เงินเดือน สิทธิประโยชน์ และการวางแผนภาษี-เกษียณอายุสำหรับครูไทย",
    "description": "หมวด: การเงินครู & สิทธิประโยชน์ข้าราชการ • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-FIN-16",
    "code": "EB-FIN-16",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-FIN-16",
      "eb-fin-16",
      "คัมภีร์เงินเดือน สิทธิประโยชน์ และการวางแผนภาษี-เกษียณอายุสำหรับครูไทย",
      "การเงินครู & สิทธิประโยชน์ข้าราชการ",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-doc-17",
    "title": "[EB-DOC-17] สารบรรณและหนังสือราชการครูมือโปร: เขียนบันทึกข้อความ โครงการ และรายงานให้ผ่านในรอบเดียว",
    "description": "หมวด: งานสารบรรณ & ธุรการโรงเรียน • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-DOC-17",
    "code": "EB-DOC-17",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-DOC-17",
      "eb-doc-17",
      "สารบรรณและหนังสือราชการครูมือโปร: เขียนบันทึกข้อความ โครงการ และรายงานให้ผ่านในรอบเดียว",
      "งานสารบรรณ & ธุรการโรงเรียน",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-pdca-18",
    "title": "[EB-PDCA-18] คู่มือบริหารโครงการตามแผนปฏิบัติการโรงเรียน & วงจรคุณภาพ PDCA",
    "description": "หมวด: การวางแผนกลยุทธ์ & การบริหารโครงการ • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-PDCA-18",
    "code": "EB-PDCA-18",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-PDCA-18",
      "eb-pdca-18",
      "คู่มือบริหารโครงการตามแผนปฏิบัติการโรงเรียน & วงจรคุณภาพ PDCA",
      "การวางแผนกลยุทธ์ & การบริหารโครงการ",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-classroom-19",
    "title": "[EB-CLASSROOM-19] สร้างห้องเรียนดิจิทัลด้วย Google Classroom & Workspace for Education",
    "description": "หมวด: เทคโนโลยีการศึกษาดิจิทัล • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-CLASSROOM-19",
    "code": "EB-CLASSROOM-19",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-CLASSROOM-19",
      "eb-classroom-19",
      "สร้างห้องเรียนดิจิทัลด้วย Google Classroom & Workspace for Education",
      "เทคโนโลยีการศึกษาดิจิทัล",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-sar-20",
    "title": "[EB-SAR-20] คู่มือการประเมินตนเองของสถานศึกษา (SAR) 3 มาตรฐาน สพฐ. ฉบับกระชับได้คะแนนดีเลิศ",
    "description": "หมวด: การประกันคุณภาพการศึกษา & การประเมินสถานศึกษา • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-SAR-20",
    "code": "EB-SAR-20",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-SAR-20",
      "eb-sar-20",
      "คู่มือการประเมินตนเองของสถานศึกษา (SAR) 3 มาตรฐาน สพฐ. ฉบับกระชับได้คะแนนดีเลิศ",
      "การประกันคุณภาพการศึกษา & การประเมินสถานศึกษา",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-arvr-21",
    "title": "[EB-ARVR-21] การสร้างสื่อนวัตกรรมเสมือนจริง (AR & VR) และ Metaverse ในห้องเรียนยุคใหม่",
    "description": "หมวด: นวัตกรรมสื่อเทคโนโลยี 3D & Metaverse • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-ARVR-21",
    "code": "EB-ARVR-21",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-ARVR-21",
      "eb-arvr-21",
      "การสร้างสื่อนวัตกรรมเสมือนจริง (AR & VR) และ Metaverse ในห้องเรียนยุคใหม่",
      "นวัตกรรมสื่อเทคโนโลยี 3D & Metaverse",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-stem-22",
    "title": "[EB-STEM-22] การจัดการเรียนรู้แบบ STEM และ Coding สำหรับครูทุกกลุ่มสาระการเรียนรู้",
    "description": "หมวด: STEM Education & วิทยาการคำนวณ • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-STEM-22",
    "code": "EB-STEM-22",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-STEM-22",
      "eb-stem-22",
      "การจัดการเรียนรู้แบบ STEM และ Coding สำหรับครูทุกกลุ่มสาระการเรียนรู้",
      "STEM Education & วิทยาการคำนวณ",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-council-23",
    "title": "[EB-COUNCIL-23] สภานักเรียนและประชาธิปไตยในโรงเรียน: การสร้างผู้นำเยาวชนแห่งศตวรรษที่ 21",
    "description": "หมวด: กิจการนักเรียน & สภานักเรียน • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-COUNCIL-23",
    "code": "EB-COUNCIL-23",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-COUNCIL-23",
      "eb-council-23",
      "สภานักเรียนและประชาธิปไตยในโรงเรียน: การสร้างผู้นำเยาวชนแห่งศตวรรษที่ 21",
      "กิจการนักเรียน & สภานักเรียน",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-club-24",
    "title": "[EB-CLUB-24] ชุมนุมและกิจกรรมพัฒนาผู้เรียน: ออกแบบหลักสูตรให้ตอบโจทย์ Soft Skills และ Portfolio เด็ก",
    "description": "หมวด: กิจกรรมพัฒนาผู้เรียน & กิจกรรมชุมนุม • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-CLUB-24",
    "code": "EB-CLUB-24",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-CLUB-24",
      "eb-club-24",
      "ชุมนุมและกิจกรรมพัฒนาผู้เรียน: ออกแบบหลักสูตรให้ตอบโจทย์ Soft Skills และ Portfolio เด็ก",
      "กิจกรรมพัฒนาผู้เรียน & กิจกรรมชุมนุม",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-lunch-25",
    "title": "[EB-LUNCH-25] โภชนาการและอาหารกลางวันโรงเรียน: จัดการงบรายหัว เมนูสุขภาพ และ Thai School Lunch",
    "description": "หมวด: งานโภชนาการ & บริหารงบประมาณสถานศึกษา • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-LUNCH-25",
    "code": "EB-LUNCH-25",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-LUNCH-25",
      "eb-lunch-25",
      "โภชนาการและอาหารกลางวันโรงเรียน: จัดการงบรายหัว เมนูสุขภาพ และ Thai School Lunch",
      "งานโภชนาการ & บริหารงบประมาณสถานศึกษา",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-nurse-26",
    "title": "[EB-NURSE-26] คู่มือครูห้องพยาบาล & การปฐมพยาบาลเบื้องต้น (First Aid & CPR ในโรงเรียน)",
    "description": "หมวด: งานอนามัยโรงเรียน & ความปลอดภัยสถานศึกษา • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-NURSE-26",
    "code": "EB-NURSE-26",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-NURSE-26",
      "eb-nurse-26",
      "คู่มือครูห้องพยาบาล & การปฐมพยาบาลเบื้องต้น (First Aid & CPR ในโรงเรียน)",
      "งานอนามัยโรงเรียน & ความปลอดภัยสถานศึกษา",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-lib-27",
    "title": "[EB-LIB-27] การสร้างห้องสมุดมีชีวิต & บันทึกรักการอ่านสู่ทักษะการเรียนรู้ตลอดชีวิต",
    "description": "หมวด: งานห้องสมุด & ส่งเสริมนิสัยรักการอ่าน • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-LIB-27",
    "code": "EB-LIB-27",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-LIB-27",
      "eb-lib-27",
      "การสร้างห้องสมุดมีชีวิต & บันทึกรักการอ่านสู่ทักษะการเรียนรู้ตลอดชีวิต",
      "งานห้องสมุด & ส่งเสริมนิสัยรักการอ่าน",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-creator-28",
    "title": "[EB-CREATOR-28] ครูนักสร้างคอนเทนต์ (Teacher Creator): สร้างตัวตน แบ่งปันความรู้ และสร้างรายได้เสริมถูกระเบียบ",
    "description": "หมวด: การสร้างตัวตน & ดิจิทัลมาร์เก็ตติ้งสำหรับครู • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-CREATOR-28",
    "code": "EB-CREATOR-28",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-CREATOR-28",
      "eb-creator-28",
      "ครูนักสร้างคอนเทนต์ (Teacher Creator): สร้างตัวตน แบ่งปันความรู้ และสร้างรายได้เสริมถูกระเบียบ",
      "การสร้างตัวตน & ดิจิทัลมาร์เก็ตติ้งสำหรับครู",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-procure-29",
    "title": "[EB-PROCURE-29] พัสดุและจัดซื้อจัดจ้างสำหรับครู: คู่มือเอาตัวรอดตาม พ.ร.บ. จัดซื้อจัดจ้างฯ พ.ศ. 2560",
    "description": "หมวด: งานพัสดุ & กฎหมายการเงินการคลัง • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-PROCURE-29",
    "code": "EB-PROCURE-29",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-PROCURE-29",
      "eb-procure-29",
      "พัสดุและจัดซื้อจัดจ้างสำหรับครู: คู่มือเอาตัวรอดตาม พ.ร.บ. จัดซื้อจัดจ้างฯ พ.ศ. 2560",
      "งานพัสดุ & กฎหมายการเงินการคลัง",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "eb-eb-newbie-30",
    "title": "[EB-NEWBIE-30] คู่มือครูบรรจุใหม่ & ครูผู้ช่วย: คัมภีร์ก้าวแรกสู่เส้นทางวิชาชีพครูอย่างมั่นคงและมีความสุข",
    "description": "หมวด: คู่มือครูบรรจุใหม่ & การพัฒนาวิชาชีพ • ไฟล์ PDF สื่อการสอนและ Prompt สำเร็จรูป",
    "category": "ebooks",
    "categoryLabel": "E-Books",
    "url": "/ebooks/EB-NEWBIE-30",
    "code": "EB-NEWBIE-30",
    "price": "0 ฿",
    "badge": "E-Book 3D",
    "keywords": [
      "EB-NEWBIE-30",
      "eb-newbie-30",
      "คู่มือครูบรรจุใหม่ & ครูผู้ช่วย: คัมภีร์ก้าวแรกสู่เส้นทางวิชาชีพครูอย่างมั่นคงและมีความสุข",
      "คู่มือครูบรรจุใหม่ & การพัฒนาวิชาชีพ",
      "ebook",
      "อีบุ๊ก",
      "pdf"
    ]
  },
  {
    "id": "fb-freebie-gas-sar-aona07",
    "title": "🎁 [AONA07] ระบบจัดการเอกสารประเมินตนเอง SAR & ว.PA 15 ตัวชี้วัด อัตโนมัติ (AONA07)",
    "description": "รหัสปลดล็อกฟรี: FREE69 • ดาวน์โหลดโค้ดและไฟล์ทาง LINE OA @deu6776s",
    "category": "freebies",
    "categoryLabel": "ของแจกฟรี",
    "url": "/freebies",
    "code": "AONA07",
    "badge": "FREE 🎁",
    "keywords": [
      "AONA07",
      "ระบบจัดการเอกสารประเมินตนเอง SAR & ว.PA 15 ตัวชี้วัด อัตโนมัติ (AONA07)",
      "ฟรี",
      "แจกฟรี",
      "free",
      "template",
      "freebie"
    ]
  },
  {
    "id": "fb-freebie-gas-active-shooter",
    "title": "🎁 [AONE12] ระบบเช็กชื่อเผชิญเหตุฉุกเฉิน & Active Shooter (Auto Safe Zone)",
    "description": "รหัสปลดล็อกฟรี: FREE69 • ดาวน์โหลดโค้ดและไฟล์ทาง LINE OA @deu6776s",
    "category": "freebies",
    "categoryLabel": "ของแจกฟรี",
    "url": "/freebies",
    "code": "AONE12",
    "badge": "FREE 🎁",
    "keywords": [
      "AONE12",
      "ระบบเช็กชื่อเผชิญเหตุฉุกเฉิน & Active Shooter (Auto Safe Zone)",
      "ฟรี",
      "แจกฟรี",
      "free",
      "template",
      "freebie"
    ]
  },
  {
    "id": "fb-freebie-gas-3d-flashcard",
    "title": "🎁 [AONE10] ระบบฝึกจำหน้านักเรียน & คำศัพท์ 3D Flashcard",
    "description": "รหัสปลดล็อกฟรี: FREE69 • ดาวน์โหลดโค้ดและไฟล์ทาง LINE OA @deu6776s",
    "category": "freebies",
    "categoryLabel": "ของแจกฟรี",
    "url": "/freebies",
    "code": "AONE10",
    "badge": "FREE 🎁",
    "keywords": [
      "AONE10",
      "ระบบฝึกจำหน้านักเรียน & คำศัพท์ 3D Flashcard",
      "ฟรี",
      "แจกฟรี",
      "free",
      "template",
      "freebie"
    ]
  },
  {
    "id": "fb-freebie-gas-asset-qr",
    "title": "🎁 [AONA04] ระบบบัตรติดทรัพย์สิน & สร้าง QR Code ครุภัณฑ์",
    "description": "รหัสปลดล็อกฟรี: FREE69 • ดาวน์โหลดโค้ดและไฟล์ทาง LINE OA @deu6776s",
    "category": "freebies",
    "categoryLabel": "ของแจกฟรี",
    "url": "/freebies",
    "code": "AONA04",
    "badge": "FREE 🎁",
    "keywords": [
      "AONA04",
      "ระบบบัตรติดทรัพย์สิน & สร้าง QR Code ครุภัณฑ์",
      "ฟรี",
      "แจกฟรี",
      "free",
      "template",
      "freebie"
    ]
  },
  {
    "id": "fb-freebie-smart-grade-tracker",
    "title": "🎁 [AONE13] เทมเพลต Google Sheets คำนวณคะแนน & ตัดเกรดอัตโนมัติ",
    "description": "รหัสปลดล็อกฟรี: FREE69 • ดาวน์โหลดโค้ดและไฟล์ทาง LINE OA @deu6776s",
    "category": "freebies",
    "categoryLabel": "ของแจกฟรี",
    "url": "/freebies",
    "code": "AONE13",
    "badge": "FREE 🎁",
    "keywords": [
      "AONE13",
      "เทมเพลต Google Sheets คำนวณคะแนน & ตัดเกรดอัตโนมัติ",
      "ฟรี",
      "แจกฟรี",
      "free",
      "template",
      "freebie"
    ]
  },
  {
    "id": "fb-freebie-teacher-ai-prompts",
    "title": "🎁 [EB-AI] คัมภีร์ 20 AI Prompts สำหรับครูไทย ยุคใหม่",
    "description": "รหัสปลดล็อกฟรี: FREE69 • ดาวน์โหลดโค้ดและไฟล์ทาง LINE OA @deu6776s",
    "category": "freebies",
    "categoryLabel": "ของแจกฟรี",
    "url": "/freebies",
    "code": "EB-AI",
    "badge": "FREE 🎁",
    "keywords": [
      "EB-AI",
      "คัมภีร์ 20 AI Prompts สำหรับครูไทย ยุคใหม่",
      "ฟรี",
      "แจกฟรี",
      "free",
      "template",
      "freebie"
    ]
  },
  {
    "id": "fb-freebie-student-ai-starter",
    "title": "🎁 [STU03] Student AI Prompts Starter Pack (สำหรับนักเรียน)",
    "description": "รหัสปลดล็อกฟรี: FREE69 • ดาวน์โหลดโค้ดและไฟล์ทาง LINE OA @deu6776s",
    "category": "freebies",
    "categoryLabel": "ของแจกฟรี",
    "url": "/freebies",
    "code": "STU03",
    "badge": "FREE 🎁",
    "keywords": [
      "STU03",
      "Student AI Prompts Starter Pack (สำหรับนักเรียน)",
      "ฟรี",
      "แจกฟรี",
      "free",
      "template",
      "freebie"
    ]
  },
  {
    "id": "fb-freebie-guitar-backing-pack",
    "title": "🎁 [FREE-MUS] Lo-Fi & Acoustic Guitar Backing Track Pack (10 แทร็ค)",
    "description": "รหัสปลดล็อกฟรี: FREE69 • ดาวน์โหลดโค้ดและไฟล์ทาง LINE OA @deu6776s",
    "category": "freebies",
    "categoryLabel": "ของแจกฟรี",
    "url": "/freebies",
    "code": "FREE-MUS",
    "badge": "FREE 🎁",
    "keywords": [
      "FREE-MUS",
      "Lo-Fi & Acoustic Guitar Backing Track Pack (10 แทร็ค)",
      "ฟรี",
      "แจกฟรี",
      "free",
      "template",
      "freebie"
    ]
  }
];

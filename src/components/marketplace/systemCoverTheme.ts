import {
  FileText, Truck, Award, QrCode, Layers, CheckSquare, Smartphone,
  BookOpen, ShieldCheck, Star, Users, Activity, Clock, Cpu, Music,
  Compass, GraduationCap, Bot, Zap, LucideIcon
} from "lucide-react";

export interface SystemCoverTheme {
  code: string;
  categoryName: string;
  tagline: string;
  icon: LucideIcon;
  gradient: string;
  borderAccent: string;
  glowColor: string;
  badgeBg: string;
  pills: string[];
  iconColor: string;
}

/** Helper to detect system code and metadata for bespoke cover art */
export function getSystemCoverTheme(title: string, category: string): SystemCoverTheme {
  const upper = (title || "").toUpperCase();

  // 1. AONA Series (Administration & School Ops)
  if (upper.includes("AONA01") || upper.includes("ทะเบียน") || upper.includes("รับ-ส่ง")) {
    return {
      code: "AONA01",
      categoryName: "บริหาร & ธุรการ",
      tagline: "SMART DOCUMENT ROUTING",
      icon: FileText,
      gradient: "from-blue-950 via-slate-900 to-indigo-950",
      borderAccent: "border-blue-500/40",
      glowColor: "rgba(59,130,246,0.3)",
      badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      pills: ["สารบรรณ", "Google Sheets", "ออกเลขทันที"],
      iconColor: "text-blue-400"
    };
  }
  if (upper.includes("AONA02") || upper.includes("ยานพาหนะ") || upper.includes("รถ")) {
    return {
      code: "AONA02",
      categoryName: "บริหารยานพาหนะ",
      tagline: "SMART VEHICLE LOG",
      icon: Truck,
      gradient: "from-sky-950 via-slate-900 to-blue-950",
      borderAccent: "border-sky-500/40",
      glowColor: "rgba(14,165,233,0.3)",
      badgeBg: "bg-sky-500/20 text-sky-300 border-sky-500/40",
      pills: ["บันทึกไมล์", "คำนวณน้ำมัน", "คิวรถโรงเรียน"],
      iconColor: "text-sky-400"
    };
  }
  if (upper.includes("AONA03") || upper.includes("เกียรติบัตร") || upper.includes("CERTIFICATE")) {
    return {
      code: "AONA03",
      categoryName: "ระบบประเมินผล",
      tagline: "AUTO-CERTIFICATE QR VERIFY",
      icon: Award,
      gradient: "from-amber-950 via-slate-900 to-yellow-950",
      borderAccent: "border-amber-500/50",
      glowColor: "rgba(245,158,11,0.35)",
      badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      pills: ["สร้าง QR ตรวจสอบ", "ส่งอีเมลออโต้", "Google Slides"],
      iconColor: "text-amber-400"
    };
  }
  if (upper.includes("AONA04") || upper.includes("ทรัพย์สิน") || upper.includes("ครุภัณฑ์")) {
    return {
      code: "AONA04",
      categoryName: "บริหารพัสดุ",
      tagline: "ASSET TAG QR GENERATOR",
      icon: QrCode,
      gradient: "from-indigo-950 via-slate-900 to-purple-950",
      borderAccent: "border-indigo-500/40",
      glowColor: "rgba(99,102,241,0.3)",
      badgeBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
      pills: ["QR ครุภัณฑ์", "พิมพ์สติกเกอร์", "ตรวจนับพัสดุ"],
      iconColor: "text-indigo-400"
    };
  }
  if (upper.includes("AONA05") || upper.includes("ยืม-คืน") || upper.includes("อุปกรณ์")) {
    return {
      code: "AONA05",
      categoryName: "บริหารห้องปฏิบัติการ",
      tagline: "LAB LOAN & RETURN HUB",
      icon: Layers,
      gradient: "from-teal-950 via-slate-900 to-cyan-950",
      borderAccent: "border-teal-500/40",
      glowColor: "rgba(20,184,166,0.3)",
      badgeBg: "bg-teal-500/20 text-teal-300 border-teal-500/40",
      pills: ["ยืมคืนอุปกรณ์", "แจ้งเตือนคืน", "เช็คของคงคลัง"],
      iconColor: "text-teal-400"
    };
  }
  if (upper.includes("AONA06") || upper.includes("บันทึกข้อความ") || upper.includes("ติดตาม")) {
    return {
      code: "AONA06",
      categoryName: "งานสารบรรณ",
      tagline: "MEMO ROUTING & TIMELINE",
      icon: CheckSquare,
      gradient: "from-blue-950 via-slate-900 to-cyan-950",
      borderAccent: "border-blue-500/40",
      glowColor: "rgba(59,130,246,0.3)",
      badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      pills: ["เซ็นอนุมัติ", "ไทม์ไลน์สถานะ", "แจ้งเตือน LINE"],
      iconColor: "text-blue-400"
    };
  }

  // 2. AONE Series (Academic & Classroom Education)
  if (upper.includes("AONE01") || upper.includes("เช็คชื่อ") || upper.includes("ATTENDANCE")) {
    return {
      code: "AONE01",
      categoryName: "กิจการนักเรียน",
      tagline: "SMART ATTENDANCE & LINE",
      icon: Smartphone,
      gradient: "from-cyan-950 via-slate-900 to-blue-950",
      borderAccent: "border-cyan-500/40",
      glowColor: "rgba(6,182,212,0.35)",
      badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
      pills: ["LINE แจ้งผู้ปกครอง", "เช็คชื่อ 2 วิ", "Google Sheets"],
      iconColor: "text-cyan-400"
    };
  }
  if (upper.includes("AONE02") || upper.includes("ส่งงาน") || upper.includes("การสอน")) {
    return {
      code: "AONE02",
      categoryName: "วิชาการ & ส่งงาน",
      tagline: "HOMEWORK SUBMISSION HUB",
      icon: BookOpen,
      gradient: "from-emerald-950 via-slate-900 to-teal-950",
      borderAccent: "border-emerald-500/40",
      glowColor: "rgba(16,185,129,0.3)",
      badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      pills: ["ส่งไฟล์การบ้าน", "เช็คส่งงานตรงเวลา", "บันทึกคะแนน"],
      iconColor: "text-emerald-400"
    };
  }
  if (upper.includes("AONE03") || upper.includes("วินัย") || upper.includes("เครื่องแบบ")) {
    return {
      code: "AONE03",
      categoryName: "วินัย & พฤติกรรม",
      tagline: "UNIFORM & DISCIPLINE CHECK",
      icon: ShieldCheck,
      gradient: "from-violet-950 via-slate-900 to-purple-950",
      borderAccent: "border-violet-500/40",
      glowColor: "rgba(139,92,246,0.3)",
      badgeBg: "bg-violet-500/20 text-violet-300 border-violet-500/40",
      pills: ["ตัดคะแนนพฤติกรรม", "ตรวจชุดนักเรียน", "รายงานระดับชั้น"],
      iconColor: "text-violet-400"
    };
  }
  if (upper.includes("AONE04") || upper.includes("ว.PA") || upper.includes("PA")) {
    return {
      code: "AONE04",
      categoryName: "วิทยฐานะครู",
      tagline: "TEACHER PA PORTFOLIO HUB",
      icon: Star,
      gradient: "from-amber-950 via-slate-900 to-orange-950",
      borderAccent: "border-amber-500/40",
      glowColor: "rgba(245,158,11,0.3)",
      badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      pills: ["ประเมิน ว.PA", "สรุปผลลัพธ์การเรียน", "ครู ค.ศ.2"],
      iconColor: "text-amber-400"
    };
  }
  if (upper.includes("AONE05") || upper.includes("วิชาเลือก") || upper.includes("ชุมนุม")) {
    return {
      code: "AONE05",
      categoryName: "กิจกรรมพัฒนาผู้เรียน",
      tagline: "ELECTIVE & CLUB SELECTION",
      icon: Users,
      gradient: "from-cyan-950 via-slate-900 to-emerald-950",
      borderAccent: "border-cyan-500/40",
      glowColor: "rgba(6,182,212,0.3)",
      badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
      pills: ["จองชุมนุมออนไลน์", "นับโควตาอัตโนมัติ", "ไม่ชนคาบ"],
      iconColor: "text-cyan-400"
    };
  }
  if (upper.includes("AONE06") || upper.includes("AONE07") || upper.includes("ข้อสอบ") || upper.includes("ตัดเกรด")) {
    return {
      code: upper.includes("AONE06") ? "AONE06" : "AONE07",
      categoryName: "วัด & ประเมินผล",
      tagline: "EXAM ANALYTICS & GRADING",
      icon: Activity,
      gradient: "from-rose-950 via-slate-900 to-purple-950",
      borderAccent: "border-rose-500/40",
      glowColor: "rgba(244,63,94,0.3)",
      badgeBg: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      pills: ["วิเคราะห์ความยากง่าย", "ตัดเกรด A-F", "กราฟสถิติ"],
      iconColor: "text-rose-400"
    };
  }
  if (upper.includes("AONE08") || upper.includes("ขออนุญาต") || upper.includes("ออกห้อง")) {
    return {
      code: "AONE08",
      categoryName: "กิจการนักเรียน",
      tagline: "DIGITAL E-PASS & TIMER",
      icon: Clock,
      gradient: "from-blue-950 via-slate-900 to-indigo-950",
      borderAccent: "border-blue-500/40",
      glowColor: "rgba(59,130,246,0.3)",
      badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      pills: ["บัตร E-Pass", "จับเวลานับถอยหลัง", "สแกน QR อนุมัติ"],
      iconColor: "text-blue-400"
    };
  }
  if (upper.includes("AONE09") || upper.includes("ห้องเรียนสีขาว") || upper.includes("WHITE CLASSROOM")) {
    return {
      code: "AONE09",
      categoryName: "ห้องเรียนสีขาว & Hero",
      tagline: "WHITE CLASSROOM 37-PAGE AUTO REPORT",
      icon: BookOpen,
      gradient: "from-cyan-950 via-slate-900 to-indigo-950",
      borderAccent: "border-cyan-500/50",
      glowColor: "rgba(6,182,212,0.4)",
      badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
      pills: ["ผังองค์กร 4 ฝ่าย", "สร้างเล่มรายงาน 37 หน้า", "Google Docs/PDF 1 คลิก"],
      iconColor: "text-cyan-400"
    };
  }
  if (upper.includes("AONE10") || upper.includes("จำหน้า") || upper.includes("3D FLASHCARD")) {
    return {
      code: "AONE10",
      categoryName: "นวัตกรรม AI & สื่อการสอน",
      tagline: "3D FLASHCARD RECOGNITION",
      icon: Cpu,
      gradient: "from-pink-950 via-slate-900 to-purple-950",
      borderAccent: "border-pink-500/50",
      glowColor: "rgba(236,72,153,0.35)",
      badgeBg: "bg-pink-500/20 text-pink-300 border-pink-500/40",
      pills: ["การ์ด 3D หมุน 360°", "จำหน้านักเรียน", "ซิงค์ Drive อัตโนมัติ"],
      iconColor: "text-pink-400"
    };
  }
  if (upper.includes("AONE11") || upper.includes("สอบปฏิบัติ") || upper.includes("ดนตรี")) {
    return {
      code: "AONE11",
      categoryName: "ดนตรี & ปฏิบัติ",
      tagline: "PRACTICE EXAM & AUDIO LOG",
      icon: Music,
      gradient: "from-purple-950 via-slate-900 to-pink-950",
      borderAccent: "border-purple-500/40",
      glowColor: "rgba(168,85,247,0.3)",
      badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      pills: ["อัดเสียงสอบปฏิบัติ", "เกณฑ์รูบริกส์", "ดนตรีสากล"],
      iconColor: "text-purple-400"
    };
  }

  // 3. AONM Series (Scouts, Activities & Music)
  if (upper.includes("AONM01") || upper.includes("AONM02") || upper.includes("ลูกเสือ")) {
    return {
      code: upper.includes("AONM01") ? "AONM01" : "AONM02",
      categoryName: "กิจกรรมพัฒนาผู้เรียน",
      tagline: "SCOUT ACTIVITY & EXPEDITION",
      icon: Compass,
      gradient: "from-amber-950 via-slate-900 to-emerald-950",
      borderAccent: "border-amber-500/40",
      glowColor: "rgba(245,158,11,0.3)",
      badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      pills: ["เช็คฐานลูกเสือ", "วิชาพิเศษ", "ตรวจระเบียบแถว"],
      iconColor: "text-amber-400"
    };
  }
  if (upper.includes("AONM03") || upper.includes("ห้องซ้อม") || upper.includes("BAND")) {
    return {
      code: "AONM03",
      categoryName: "ดนตรี & สตูดิโอ",
      tagline: "BAND REHEARSAL & STUDIO BOOKING",
      icon: Music,
      gradient: "from-pink-950 via-slate-900 to-purple-950",
      borderAccent: "border-pink-500/40",
      glowColor: "rgba(236,72,153,0.3)",
      badgeBg: "bg-pink-500/20 text-pink-300 border-pink-500/40",
      pills: ["จองห้องซ้อมดนตรี", "ปฏิทินสด Realtime", "ยืมเครื่องดนตรี"],
      iconColor: "text-pink-400"
    };
  }

  // 4. Student Series (STU01, STU02, STU03)
  if (upper.includes("STU01") || upper.includes("PORTFOLIO") || upper.includes("TCAS")) {
    return {
      code: "STU01",
      categoryName: "สำหรับนักเรียน Gen Z",
      tagline: "WEB PORTFOLIO TCAS 3D",
      icon: GraduationCap,
      gradient: "from-pink-950 via-slate-900 to-purple-950",
      borderAccent: "border-pink-500/50",
      glowColor: "rgba(236,72,153,0.4)",
      badgeBg: "bg-pink-500/20 text-pink-300 border-pink-500/40",
      pills: ["QR แปะหน้าปกพอร์ต", "เว็บ 3D ส่วนตัว", "ยื่น TCAS รอบ 1"],
      iconColor: "text-pink-300"
    };
  }
  if (upper.includes("STU02") || upper.includes("การบ้าน") || upper.includes("HOMEWORK")) {
    return {
      code: "STU02",
      categoryName: "สำหรับนักเรียน Gen Z",
      tagline: "CLASSROOM HOMEWORK HUB",
      icon: Clock,
      gradient: "from-cyan-950 via-slate-900 to-blue-950",
      borderAccent: "border-cyan-500/40",
      glowColor: "rgba(6,182,212,0.35)",
      badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
      pills: ["นับถอยหลังวันส่ง", "ดูการบ้านทุกวิชา", "หารคนละ 7 ฿"],
      iconColor: "text-cyan-300"
    };
  }
  if (upper.includes("STU03") || upper.includes("PROMPT") || upper.includes("AI SECRET")) {
    return {
      code: "STU03",
      categoryName: "สำหรับนักเรียน Gen Z",
      tagline: "STUDENT AI SECRET KIT",
      icon: Bot,
      gradient: "from-amber-950 via-slate-900 to-orange-950",
      borderAccent: "border-amber-500/40",
      glowColor: "rgba(245,158,11,0.3)",
      badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      pills: ["เสกรายงาน 5 บท", "สไลด์ Canva 3 นาที", "ราคา 69 ฿"],
      iconColor: "text-amber-300"
    };
  }

  // Default Generic EduTech Fallback
  return {
    code: "AIAON",
    categoryName: category || "Google Apps Script",
    tagline: "AUTOMATION ENGINE",
    icon: Zap,
    gradient: "from-slate-950 via-slate-900 to-indigo-950",
    borderAccent: "border-cyan-500/30",
    glowColor: "rgba(6,182,212,0.25)",
    badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    pills: ["Google Apps Script", "รันบนชีตตัวเอง", "ไร้ค่ารายเดือน"],
    iconColor: "text-cyan-400"
  };
}

"use client";

import React from "react";
import {
  Tag, Gift, ShieldCheck, Zap, ArrowRight, 
  QrCode, Award, Truck, FileText, CheckSquare, Users, BookOpen, Clock,
  Music, Compass, Smartphone, Cpu, GraduationCap, Bot, 
  Activity, Star, Layers, ShoppingCart
} from "lucide-react";
import { useBrandTheme } from "@/components/providers/BrandThemeProvider";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { cn } from "@/lib/utils";
import { DvdCaseMockup } from "@/components/marketplace/DvdCaseMockup";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  icon_name?: string;
  color_classes?: string;
  button_classes?: string;
  image_url?: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

/** Helper to detect system code and metadata for bespoke cover art */
function getSystemCoverTheme(title: string, category: string) {
  const upper = title.toUpperCase();

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

export function ProductCard({ product }: ProductCardProps) {
  const { brandTheme } = useBrandTheme();
  const { openLineModal } = useLineModal();

  let rawDesc = product.description;
  let parsedType = "";
  const matchFormat = rawDesc.match(/\(Format:\s*(.+?)\)/i);
  const matchType = rawDesc.match(/\(Type:\s*(.+?)\)/i);
  if (matchFormat) {
    parsedType = matchFormat[1];
    rawDesc = rawDesc.replace(matchFormat[0], "").trim();
  } else if (matchType) {
    parsedType = matchType[1];
    rawDesc = rawDesc.replace(matchType[0], "").trim();
  }

  const isMusicBrand = brandTheme === "music";
  const hoverBorder = isMusicBrand 
    ? "hover:border-amber-400 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]" 
    : "hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]";
  const hoverText = isMusicBrand ? "group-hover:text-amber-300" : "group-hover:text-cyan-300";

  const priceStr = (product.price || "").trim().toLowerCase();
  const isFree =
    priceStr === "0" ||
    priceStr === "0 thb" ||
    priceStr === "ฟรี" ||
    priceStr === "0 บาท" ||
    priceStr === "free" ||
    priceStr === "";

  const numericPrice = parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;
  const originalAnchorPrice = numericPrice > 0 ? Math.round(numericPrice * 1.6 + 100) : 590;

  // Generate dynamic bespoke theme
  const coverTheme = getSystemCoverTheme(product.title, product.category);
  const CoverIcon = coverTheme.icon;

  const cleanPrice = isFree ? "ฟรี 0 ฿" : product.price.replace(/\s*THB/i, " ฿");
  const upperTitle = product.title.toUpperCase();
  let vipPrice = "+190 ฿";
  if (
    upperTitle.includes("AONE09") ||
    upperTitle.includes("ห้องเรียนสีขาว") ||
    upperTitle.includes("AONA02") ||
    upperTitle.includes("ยานพาหนะ")
  ) {
    vipPrice = "+690 ฿";
  } else if (
    upperTitle.includes("AONA01") ||
    upperTitle.includes("AONA03") ||
    upperTitle.includes("เกียรติบัตร") ||
    upperTitle.includes("AONE01") ||
    upperTitle.includes("AONE02") ||
    upperTitle.includes("AONE05") ||
    upperTitle.includes("AONE08") ||
    upperTitle.includes("AONE10") ||
    upperTitle.includes("3D") ||
    upperTitle.includes("AONM01") ||
    upperTitle.includes("AONA06")
  ) {
    vipPrice = "+350 ฿";
  }

  const displayTitle = product.title.includes(coverTheme.code)
    ? product.title
    : `[${coverTheme.code}] ${product.title}`;

  const lineOrderMessage = isFree
    ? `สวัสดีครับครูอ้น ขอรับระบบและโค้ดแจกฟรี:\n🎁 "${displayTitle}"\nรบกวนขอรหัสปลดล็อกและลิงก์ดาวน์โหลดด้วยครับ 🙏`
    : `สวัสดีครับครูอ้น สนใจสั่งซื้อระบบอัตโนมัติ:\n📦 "${displayTitle}"\n💰 ราคา: ${cleanPrice} (มีออปชันครูอ้นติดตั้งให้พร้อมใช้ ${vipPrice})\nรบกวนขอเลขบัญชี / PromptPay QR Code เพื่อชำระเงินและรับไฟล์ระบบด้วยครับ 🙏`;

  const vipLineOrderMessage = `สวัสดีครับครูอ้น สนใจสั่งซื้อระบบพร้อมบริการให้ครูอ้นติดตั้งให้ (VIP Setup):\n🛠️ "${displayTitle}"\n💰 ราคาตัวระบบ ${cleanPrice} + บริการติดตั้งพร้อมใช้ (${vipPrice})\nรบกวนขอเลขบัญชี / PromptPay QR Code ด้วยครับ 🙏`;

  const lineOrderUrl = `https://line.me/R/oaMessage/@deu6776s/?${encodeURIComponent(lineOrderMessage)}`;
  const vipLineOrderUrl = `https://line.me/R/oaMessage/@deu6776s/?${encodeURIComponent(vipLineOrderMessage)}`;

  const CardInner = (
    <div className={cn(
      "glass-card flex flex-col h-full rounded-3xl border border-white/10 transition-all duration-300 relative overflow-hidden bg-slate-950/70 shadow-xl hover:bg-slate-900/90",
      hoverBorder
    )}>
      
      {/* ── BESPOKE 3D HOLOGRAPHIC COVER ART / 3D DVD MOCKUP ── */}
      {coverTheme.code === "AONE09" ? (
        <div className="relative w-full border-b border-white/10 overflow-hidden bg-gradient-to-br from-cyan-950/50 via-slate-950 to-indigo-950/50 flex flex-col justify-center">
          <DvdCaseMockup
            code="AONE09"
            title={product.title}
            categoryName={coverTheme.categoryName}
            tagline={coverTheme.tagline}
            glowColor={coverTheme.glowColor}
            heroBadge="⭐ HERO SYSTEM"
          />
        </div>
      ) : (
        <div className={cn(
          "relative w-full aspect-[16/10] shrink-0 border-b border-white/10 overflow-hidden flex flex-col justify-between p-4 sm:p-5 bg-linear-to-br",
          coverTheme.gradient
        )}>
          {/* Background Grid Accent */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(to right,#ffffff15 1px,transparent 1px), linear-gradient(to bottom,#ffffff15 1px,transparent 1px)",
              backgroundSize: "20px 20px"
            }}
          />

          {/* Ambient Neon Orb */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 blur-[50px] rounded-full pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity"
            style={{ backgroundColor: coverTheme.glowColor }}
          />

          {/* Top Bar: System Code & Category Badge */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/20 text-white font-mono font-black text-xs tracking-wider shadow-md">
                {coverTheme.code}
              </span>
              {isFree && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-zinc-950 text-[11px] font-prompt font-black animate-pulse shadow-md">
                  FREE 🎁
                </span>
              )}
            </div>

            <span className={cn(
              "px-2.5 py-1 rounded-full text-[11px] font-prompt font-bold border backdrop-blur-md shadow-md",
              coverTheme.badgeBg
            )}>
              {coverTheme.categoryName}
            </span>
          </div>

          {/* Center: Hologram 3D Icon & Tagline */}
          <div className="my-auto flex flex-col items-center justify-center text-center relative z-10 py-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-black/40 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 mb-2">
              <CoverIcon className={cn("w-8 h-8 sm:w-9 sm:h-9", coverTheme.iconColor)} />
            </div>
            <span className="text-[11px] sm:text-[11px] font-mono uppercase font-black tracking-widest text-white/50 group-hover:text-white/80 transition-colors">
              {coverTheme.tagline}
            </span>
          </div>

          {/* Bottom Bar: Mini Tech Feature Pills (Single line, no clipping) */}
          <div className="flex items-center justify-center gap-1.5 relative z-10 overflow-hidden">
            {coverTheme.pills.slice(0, 2).map((pill, pIdx) => (
              <span key={pIdx} className="px-2.5 py-0.5 rounded-full bg-black/45 border border-white/15 text-[11px] font-prompt text-white/75 whitespace-nowrap backdrop-blur-sm">
                {pill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── CARD BODY ─────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 z-10">
        <h3 className={cn(
          "text-base sm:text-lg font-bold font-prompt text-white mb-2 line-clamp-2 leading-snug transition-colors",
          hoverText
        )}>
          {product.title}
        </h3>

        {parsedType && (
          <div className="flex items-center gap-1.5 mb-2.5 text-xs font-prompt text-cyan-400">
            <Tag className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{parsedType}</span>
          </div>
        )}

        <p className="text-xs font-prompt text-white/60 mb-5 flex-1 line-clamp-3 leading-relaxed">
          {rawDesc}
        </p>

        {/* --- CLEAN SINGLE-LINE PRICE & CTA FOOTER --- */}
        <div className="mt-auto pt-4 border-t border-white/10 space-y-3">
          
          {/* Price Row — Never wraps */}
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="text-[11px] font-prompt text-white/50 font-medium whitespace-nowrap mb-0.5">
                {isFree ? "🎁 ของขวัญพิเศษ" : "⚡ จ่ายครั้งเดียวตลอดชีพ"}
              </div>
              <div className="flex items-baseline gap-2 whitespace-nowrap">
                <span className={cn(
                  "font-prompt text-2xl font-black tracking-tight whitespace-nowrap",
                  isFree 
                    ? "text-emerald-400" 
                    : "text-white"
                )}>
                  {cleanPrice}
                </span>

                {!isFree && numericPrice > 0 && (
                  <span className="font-prompt text-xs text-white/35 line-through whitespace-nowrap">
                    {originalAnchorPrice} ฿
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-prompt text-emerald-300 flex items-center gap-1 font-semibold whitespace-nowrap">
                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>ไม่มีรายเดือน</span>
              </span>
            </div>
          </div>

          {/* VIP Setup Micro-badge (Clickable for direct VIP Setup preset message) */}
          {!isFree && (
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isMobileDevice()) {
                  window.open(vipLineOrderUrl, "_blank", "noopener,noreferrer");
                } else {
                  openLineModal({
                    title: `ระบบ ${displayTitle} (VIP Setup)`,
                    price: `${cleanPrice} + ${vipPrice}`,
                    itemCode: coverTheme.code,
                    message: vipLineOrderMessage,
                  });
                }
              }}
              title="คลิกเพื่อสั่งซื้อพร้อมบริการให้ครูอ้นติดตั้งให้พร้อมใช้ (VIP Setup)"
              className="text-[11px] font-prompt text-amber-300/90 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 hover:border-amber-400/50 rounded-lg py-1 px-2.5 text-center whitespace-nowrap truncate transition-all cursor-pointer"
            >
              🛠️ ออปชันครูอ้นติดตั้งให้พร้อมใช้ ({vipPrice})
            </div>
          )}

          {/* ── ✨ SLEEK SINGLE-LINE LUXURY CTA BUTTON ── */}
          <div className={cn(
            "w-full h-11 px-4 rounded-xl font-prompt text-sm font-extrabold flex items-center justify-between whitespace-nowrap transition-all duration-300 group-hover:scale-[1.01] active:scale-[0.98] cursor-pointer relative overflow-hidden",
            isFree 
              ? "bg-linear-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.25)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.45)]" 
              : "bg-linear-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:via-teal-200 hover:to-cyan-300 text-zinc-950 shadow-[0_0_20px_rgba(6,182,212,0.25)] group-hover:shadow-[0_0_32px_rgba(6,182,212,0.5)]"
          )}>
            {/* Subtle Light Sweep */}
            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/45 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

            <div className="flex items-center gap-2 relative z-10 whitespace-nowrap">
              {isFree ? (
                <Gift className="w-4 h-4 text-zinc-950 shrink-0" />
              ) : (
                <ShoppingCart className="w-4 h-4 text-zinc-950 shrink-0" />
              )}
              <span className="tracking-tight">
                {isFree ? "รับระบบและโค้ดฟรี (LINE)" : "สั่งซื้อรับระบบทันที (LINE)"}
              </span>
            </div>

            <div className="w-6 h-6 rounded-lg bg-zinc-950/12 group-hover:bg-zinc-950/20 flex items-center justify-center relative z-10 shrink-0 transition-all">
              <ArrowRight className="w-3.5 h-3.5 text-zinc-950 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <a
      href={lineOrderUrl}
      data-line-title={displayTitle}
      data-line-price={cleanPrice}
      data-line-code={coverTheme.code}
      target="_blank"
      rel="noopener noreferrer"
      className="block group cursor-pointer h-full"
    >
      {CardInner}
    </a>
  );
}


"use client";

import React from "react";
import {
  Tag, Gift, Download, Sparkles, ShieldCheck, Zap, ArrowRight, Check,
  QrCode, Award, Truck, FileText, CheckSquare, Users, BookOpen, Clock,
  Music, Compass, Smartphone, Cpu, GraduationCap, Flame, Bot, Calendar,
  Activity, Star, Layers, CheckCircle2, ShoppingCart
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useBrandTheme } from "@/components/providers/BrandThemeProvider";
import { cn } from "@/lib/utils";

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
      pills: ["ประเมิน ว.PA", "สรุปผลลัพธ์การเรียน", "ครู คศ.3"],
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
  if (upper.includes("AONE09") || upper.includes("คะแนนเก็บ") || upper.includes("GRADEBOOK")) {
    return {
      code: "AONE09",
      categoryName: "วิชาการ & ตัดเกรด",
      tagline: "REALTIME GRADEBOOK ENGINE",
      icon: Award,
      gradient: "from-emerald-950 via-slate-900 to-cyan-950",
      borderAccent: "border-emerald-500/40",
      glowColor: "rgba(16,185,129,0.3)",
      badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      pills: ["สมุดพกออนไลน์", "ซิงค์คะแนนเก็บ", "ดูผลสอบสด"],
      iconColor: "text-emerald-400"
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

export function ProductCard({ product, index }: ProductCardProps) {
  const { brandTheme } = useBrandTheme();

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

  const isValidId =
    product.id && typeof product.id === "string" && product.id.length > 8;

  // Generate dynamic bespoke theme
  const coverTheme = getSystemCoverTheme(product.title, product.category);
  const CoverIcon = coverTheme.icon;

  const CardInner = (
    <div className={cn(
      "glass-card flex flex-col h-full rounded-3xl border border-white/10 transition-all duration-300 relative overflow-hidden bg-slate-950/70 shadow-xl hover:bg-slate-900/90",
      hoverBorder
    )}>
      
      {/* ── BESPOKE 3D HOLOGRAPHIC COVER ART ─────────────────── */}
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
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-zinc-950 text-[10px] font-prompt font-black animate-pulse shadow-md">
                FREE 🎁
              </span>
            )}
          </div>

          <span className={cn(
            "px-2.5 py-1 rounded-full text-[10px] font-prompt font-bold border backdrop-blur-md shadow-md",
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
          <span className="text-[9px] sm:text-[10px] font-mono uppercase font-black tracking-widest text-white/50 group-hover:text-white/80 transition-colors">
            {coverTheme.tagline}
          </span>
        </div>

        {/* Bottom Bar: Mini Tech Feature Pills */}
        <div className="flex items-center justify-center gap-1.5 relative z-10 flex-wrap">
          {coverTheme.pills.map((pill, pIdx) => (
            <span key={pIdx} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-prompt text-white/60">
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* ── CARD BODY ─────────────────────────────────────────── */}
      <div className="p-6 flex flex-col flex-1 z-10">
        <h3 className={cn(
          "text-lg font-bold font-prompt text-white mb-2 line-clamp-2 leading-snug transition-colors",
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

        {/* --- FUTURISTIC & FRIENDLY CYBERPUNK NEON PRICE CAPSULE --- */}
        <div className="mt-auto space-y-3">
          
          <div className="p-3.5 rounded-2xl bg-linear-to-r from-slate-900 via-black to-slate-900 border border-cyan-500/30 shadow-[inset_0_1px_15px_rgba(6,182,212,0.12)] relative overflow-hidden">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-prompt text-cyan-300 font-semibold flex items-center gap-1">
                <Zap className="w-3 h-3 text-cyan-400" />
                {isFree ? "ของขวัญฟรีสำหรับคุณ" : "ดีลพิเศษสำหรับครู & นักเรียน"}
              </span>
              <span className="text-[9px] font-prompt text-white/50 bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
                {isFree ? "แจกฟรี 100%" : "จ่ายครั้งเดียวตลอดชีพ"}
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-0.5">
              <div className="flex items-baseline gap-2">
                <span className={cn(
                  "font-prompt text-2xl font-black tracking-tight",
                  isFree 
                    ? "text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]" 
                    : "text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-white to-amber-200 drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                )}>
                  {isFree ? "0 ฿" : product.price}
                </span>

                {!isFree && numericPrice > 0 && (
                  <span className="font-prompt text-xs text-white/35 line-through">
                    {originalAnchorPrice} ฿
                  </span>
                )}
              </div>

              <span className="text-[10px] font-prompt text-emerald-400 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3 h-3" />
                <span>ไม่มีรายเดือน</span>
              </span>
            </div>
          </div>

          {/* VIP Setup Micro-badge */}
          {!isFree && (() => {
            const upper = product.title.toUpperCase();
            let vipPrice = "+190 ฿";
            if (upper.includes("AONE09") || upper.includes("ห้องเรียนสีขาว") || upper.includes("AONA02") || upper.includes("ยานพาหนะ")) {
              vipPrice = "+690 ฿";
            } else if (
              upper.includes("AONA01") || upper.includes("AONA03") || upper.includes("เกียรติบัตร") ||
              upper.includes("AONE01") || upper.includes("AONE02") || upper.includes("AONE05") ||
              upper.includes("AONE08") || upper.includes("AONE10") || upper.includes("3D") ||
              upper.includes("AONM01") || upper.includes("AONA06")
            ) {
              vipPrice = "+350 ฿";
            }

            return (
              <div className="text-[10px] font-prompt text-amber-300/80 text-center flex items-center justify-center gap-1.5 py-0.5">
                <span>🛠️ ออปชันเสริม: ครูอ้นติดตั้งให้พร้อมใช้ ({vipPrice})</span>
              </div>
            );
          })()}

          {/* Glowing Ultra-Magnetic CTA Button */}
          <div className={cn(
            "w-full py-3.5 px-5 rounded-2xl font-prompt text-sm font-extrabold flex items-center justify-center gap-2 transition-all duration-300 group-hover:scale-[1.03] active:scale-[0.98] shadow-xl cursor-pointer relative overflow-hidden",
            isValidId 
              ? (isFree 
                  ? "bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 shadow-[0_0_25px_rgba(16,185,129,0.4)]" 
                  : "bg-linear-to-r from-amber-400 via-orange-500 to-rose-500 hover:from-amber-300 hover:via-orange-400 hover:to-rose-400 text-zinc-950 shadow-[0_0_30px_rgba(249,115,22,0.5)] group-hover:shadow-[0_0_45px_rgba(249,115,22,0.8)]") 
              : "bg-white/10 text-white/40 cursor-not-allowed"
          )}>
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

            {isFree ? (
              <>
                <Gift className="w-4 h-4 shrink-0 text-zinc-950 relative z-10" />
                <span className="relative z-10">🎁 รับระบบและโค้ดฟรี →</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 shrink-0 fill-zinc-950/20 text-zinc-950 relative z-10" />
                <span className="relative z-10">⚡ สั่งซื้อรับระบบทันที</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-zinc-950 relative z-10" />
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );

  return isValidId ? (
    <Link
      href={`/dashboard/marketplace/${product.id}`}
      className="block group cursor-pointer h-full"
    >
      {CardInner}
    </Link>
  ) : (
    <div className="opacity-40 cursor-not-allowed h-full">
      {CardInner}
    </div>
  );
}

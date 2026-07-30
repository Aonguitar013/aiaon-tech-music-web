"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  User,
  BookOpen,
  Target,
  BarChart3,
  ImageIcon,
  FileText,
  ChevronLeft,
  ChevronRight,
  Clock,
  Layers,
  Music2,
  Laptop,
  Trophy,
  Zap,
  CheckCircle2,
  TrendingUp,
  Brain,
  Heart,
  Lightbulb,
  GraduationCap,
  Car,
  Users,
  ArrowRight,
} from "lucide-react";

/* ============================================================
   ANIMATION VARIANTS
============================================================ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ============================================================
   TAB DEFINITIONS
============================================================ */
const TABS = [
  { id: "overview",   label: "ข้อมูลครู",       icon: User,         color: "blue"   },
  { id: "teaching",   label: "การจัดการเรียนรู้", icon: BookOpen,     color: "cyan"   },
  { id: "challenge",  label: "ประเด็นท้าทาย",    icon: Target,       color: "purple" },
  { id: "results",    label: "ผลลัพธ์",          icon: BarChart3,    color: "amber"  },
  { id: "summary",    label: "บทสรุป",           icon: FileText,     color: "cyan"   },
] as const;

type TabId = (typeof TABS)[number]["id"];

const TAB_COLOR_MAP: Record<string, string> = {
  blue:   "text-blue-400 border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/15 hover:border-blue-400/60",
  cyan:   "text-cyan-400  border-cyan-500/40  bg-cyan-500/10  hover:bg-cyan-500/15  hover:border-cyan-400/60",
  purple: "text-purple-400 border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/15 hover:border-purple-400/60",
  amber:  "text-amber-400 border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/15 hover:border-amber-400/60",
};
const TAB_GLOW_MAP: Record<string, string> = {
  blue:   "shadow-[0_0_20px_rgba(59,130,246,0.25)]",
  cyan:   "shadow-[0_0_20px_rgba(34,211,238,0.25)]",
  purple: "shadow-[0_0_20px_rgba(168,85,247,0.25)]",
  amber:  "shadow-[0_0_20px_rgba(245,158,11,0.25)]",
};
const INDICATOR_MAP: Record<string, string> = {
  blue:   "bg-blue-400",
  cyan:   "bg-cyan-400",
  purple: "bg-purple-400",
  amber:  "bg-amber-400",
};

/* ============================================================
   SUB-COMPONENTS
============================================================ */

/** Section badge — mimics the site's pill badges */
function SectionBadge({ icon: Icon, label, color = "blue" }: { icon: React.ElementType; label: string; color?: string }) {
  const colorClass: Record<string, string> = {
    blue:   "border-blue-500/20 bg-blue-500/5 text-blue-400",
    cyan:   "border-cyan-500/20 bg-cyan-500/5 text-cyan-400",
    purple: "border-purple-500/20 bg-purple-500/5 text-purple-400",
    amber:  "border-amber-500/20 bg-amber-500/5 text-amber-400",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-sm font-prompt font-medium ${colorClass[color]}`}>
      <Icon className="w-4 h-4" />
      {label}
    </span>
  );
}

/** Stat number card */
function StatCard({ value, label, icon: Icon, color = "blue" }: { value: string; label: string; icon: React.ElementType; color?: string }) {
  const colorMap: Record<string, string> = {
    blue:   "from-blue-500/20 to-blue-600/5 border-blue-500/20 text-blue-400",
    cyan:   "from-cyan-500/20  to-cyan-600/5  border-cyan-500/20  text-cyan-400",
    purple: "from-purple-500/20 to-purple-600/5 border-purple-500/20 text-purple-400",
    amber:  "from-amber-500/20 to-amber-600/5 border-amber-500/20 text-amber-400",
  };
  return (
    <motion.div
      variants={cardIn}
      className={`glass-card bg-linear-to-br ${colorMap[color]} p-5 flex flex-col items-center text-center gap-2`}
    >
      <Icon className={`w-7 h-7 ${colorMap[color].split(" ").at(-1)}`} />
      <div className="font-prompt text-3xl font-bold text-white">{value}</div>
      <div className="font-prompt text-xs text-white/50 uppercase tracking-widest leading-snug">{label}</div>
    </motion.div>
  );
}

/** Info list item */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-3 border-b border-white/6 last:border-0">
      <span className="font-prompt text-sm text-white/40 sm:w-52 shrink-0">{label}</span>
      <span className="font-prompt text-sm text-white/85 font-medium">{value}</span>
    </div>
  );
}

/** Process step card */
function StepCard({ num, title, desc, color = "blue" }: { num: string; title: string; desc: string; color?: string }) {
  const accent: Record<string, string> = {
    blue:   "from-blue-500/30 to-blue-600/0 border-t-blue-500/50 text-blue-400",
    amber:  "from-amber-500/20 to-amber-600/0 border-t-amber-500/50 text-amber-400",
    purple: "from-purple-500/20 to-purple-600/0 border-t-purple-500/50 text-purple-400",
    cyan:   "from-cyan-500/20 to-cyan-600/0 border-t-cyan-500/50 text-cyan-400",
  };
  const parts = accent[color].split(" ");
  return (
    <motion.div
      variants={cardIn}
      className={`glass-card bg-linear-to-b ${parts[0]} ${parts[1]} border-t-2 ${parts[2]} p-5 flex flex-col gap-3`}
    >
      <div className={`font-prompt text-5xl font-black leading-none ${parts[3]}`}>{num}</div>
      <div className="font-prompt text-base font-bold text-white">{title}</div>
      <div className="font-prompt text-sm text-white/60 leading-relaxed">{desc}</div>
    </motion.div>
  );
}

/** Outcome block — large stat + text */
function OutcomeBlock({ stat, title, items, color = "blue" }: { stat: string; title: string; items: string[]; color?: string }) {
  const statColor: Record<string, string> = {
    blue:   "text-blue-400",
    cyan:   "text-cyan-400",
    amber:  "text-amber-400",
    purple: "text-purple-400",
  };
  return (
    <motion.div
      variants={cardIn}
      className="glass-card p-6 flex flex-col sm:flex-row gap-6 items-start"
    >
      <div className={`font-prompt text-6xl md:text-7xl font-black shrink-0 leading-none ${statColor[color]}`}>
        {stat}
      </div>
      <div className="flex-1">
        <div className="font-prompt text-lg font-bold text-white mb-3">{title}</div>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 font-prompt text-sm text-white/65 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/** Quality card — knowledge / skill / attitude */
function QualityCard({ icon: Icon, title, items, color = "blue" }: { icon: React.ElementType; title: string; items: string[]; color?: string }) {
  const colorMap: Record<string, { border: string; badge: string; icon: string }> = {
    blue:   { border: "border-t-blue-500/50",   badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",   icon: "text-blue-400"   },
    cyan:   { border: "border-t-cyan-500/50",    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",    icon: "text-cyan-400"   },
    purple: { border: "border-t-purple-500/50",  badge: "bg-purple-500/10 text-purple-400 border-purple-500/20", icon: "text-purple-400" },
    amber:  { border: "border-t-amber-500/50",   badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",   icon: "text-amber-400"  },
  };
  const c = colorMap[color];
  return (
    <motion.div
      variants={cardIn}
      className={`glass-card border-t-2 ${c.border} p-5 flex flex-col gap-4`}
    >
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-prompt font-semibold w-fit ${c.badge}`}>
        <Icon className="w-4 h-4" />
        {title}
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 font-prompt text-sm text-white/65 leading-relaxed">
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${c.icon.replace("text-", "bg-")}`} />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/** Responsibility card */
function RespCard({ icon: Icon, title, items, color = "blue" }: { icon: React.ElementType; title: string; items: string[]; color?: string }) {
  const border: Record<string, string> = {
    blue: "border-blue-500/20", cyan: "border-cyan-500/20", purple: "border-purple-500/20", amber: "border-amber-500/20"
  };
  const iconColor: Record<string, string> = {
    blue: "text-blue-400 bg-blue-500/10", cyan: "text-cyan-400 bg-cyan-500/10", purple: "text-purple-400 bg-purple-500/10", amber: "text-amber-400 bg-amber-500/10"
  };
  const dot: Record<string, string> = {
    blue: "bg-blue-400", cyan: "bg-cyan-400", purple: "bg-purple-400", amber: "bg-amber-400"
  };
  return (
    <motion.div variants={cardIn} className={`glass-card border ${border[color]} p-6 flex flex-col gap-4`}>
      <div className={`p-3 rounded-xl w-fit ${iconColor[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="font-prompt text-lg font-bold text-white">{title}</div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 font-prompt text-sm text-white/60 leading-relaxed">
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${dot[color]}`} />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ============================================================
   CONTENT PANELS
============================================================ */

function OverviewPanel() {
  const workItems = [
    { label: "รายวิชา ดนตรี ม.3 (ค23102)", value: "5.83 ชม./สัปดาห์", icon: Music2 },
    { label: "รายวิชา ดนตรี ม.4", value: "4.16 ชม./สัปดาห์", icon: Music2 },
    { label: "ส่งเสริมความสามารถด้านดนตรี", value: "1.67 ชม./สัปดาห์", icon: TrendingUp },
    { label: "IS สืบค้นอิสระ / สร้างองค์ความรู้", value: "1.67 ชม./สัปดาห์", icon: Lightbulb },
    { label: "กิจกรรมชุมนุมดนตรีสากล", value: "1.67 ชม./สัปดาห์", icon: Users },
    { label: "กิจกรรมลูกเสือ-เนตรนารี ม.1", value: "0.83 ชม./สัปดาห์", icon: GraduationCap },
  ];

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">
      {/* Profile hero */}
      <motion.div variants={fadeUp} className="glass-card p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
        {/* Avatar placeholder */}
        <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-linear-to-br from-blue-500/30 to-purple-600/20 border border-white/10 flex items-center justify-center">
          <User className="w-10 h-10 text-white/40" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="font-prompt text-2xl md:text-3xl font-bold text-white tracking-tight">
            นายจิรวัฒน์ เดชเส้ง
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/8 text-blue-400 text-xs font-prompt font-medium">
              <GraduationCap className="w-3.5 h-3.5" /> ครู วิทยฐานะครูชำนาญการ
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/8 text-purple-400 text-xs font-prompt font-medium">
              <Music2 className="w-3.5 h-3.5" /> กลุ่มสาระศิลปะ (ดนตรี)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/8 text-cyan-400 text-xs font-prompt font-medium">
              คศ.2 · 34,210 บาท/เดือน
            </span>
          </div>
          <div className="font-prompt text-sm text-white/50 leading-relaxed">
            โรงเรียนหาดใหญ่วิทยาลัย · สพม. สงขลา สตูล
          </div>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard value="16.66" label="ชั่วโมงสอน/สัปดาห์" icon={Clock} color="blue" />
        <StatCard value="6" label="รายวิชาที่รับผิดชอบ" icon={BookOpen} color="purple" />
        <StatCard value="ม.3-4" label="ระดับชั้นที่สอน" icon={Layers} color="cyan" />
        <StatCard value="วPA 2569" label="รอบการประเมิน" icon={Trophy} color="amber" />
      </motion.div>

      {/* Workload detail */}
      <motion.div variants={fadeUp} className="glass-card p-6">
        <div className="font-prompt text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-400" /> ภาระงานสอนตามตารางสอน
        </div>
        <div className="space-y-0">
          {workItems.map(w => (
            <div key={w.label} className="flex items-center gap-3 py-3 border-b border-white/6 last:border-0">
              <w.icon className="w-4 h-4 text-white/30 shrink-0" />
              <span className="font-prompt text-sm text-white/65 flex-1">{w.label}</span>
              <span className="font-prompt text-sm font-semibold text-blue-400">{w.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Responsibilities */}
      <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <RespCard
          icon={GraduationCap}
          title="บทบาทหัวหน้าระดับชั้น ม.3"
          color="blue"
          items={[
            "บริหารงานวิชาการและวางแผนระดับชั้น",
            "จัดทำเอกสารหลักสูตรการศึกษาและประเมินผล",
            "ดำเนินการนิเทศภายใน ติดตามผลการจัดการเรียนรู้",
            "สนับสนุนครูในกลุ่มระดับชั้น ม.3 พัฒนาแผนงานเชิงวิชาการ",
            "นำ PLC กลุ่ม ART Music Design (1 ชม./สัปดาห์)",
          ]}
        />
        <RespCard
          icon={Car}
          title="หน้าที่ฝ่ายยานพาหนะ"
          color="amber"
          items={[
            "จัดระบบของคิวรถ โรงเรียน รถส่วนตัว นักรถ/นักเรียน",
            "ตรวจเช็คสภาพยานพาหนะ ส่ง พ.ร.บ. และประกันรถยนต์",
            "ซ่อมบำรุงและงานทะเบียนครุฯ พ.ศ. 2560",
            "อำนวยความสะดวกในด้านต่างๆ ที่เกี่ยวข้องกับยานพาหนะ",
          ]}
        />
      </motion.div>
    </motion.div>
  );
}

function TeachingPanel() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">
      {/* Active Learning — 3 pillars */}
      <motion.div variants={fadeUp}>
        <SectionBadge icon={BookOpen} label="ตอนที่ 1: การจัดการเรียนรู้เชิงรุก" color="cyan" />
        <h2 className="font-prompt text-2xl md:text-3xl font-bold text-white mt-4 mb-6 tracking-tight">
          Active Learning &{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400">
            การออกแบบหน่วยการเรียนรู้
          </span>
        </h2>
      </motion.div>

      <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <RespCard
          icon={Lightbulb}
          title="หลักสูตรและการออกแบบ"
          color="blue"
          items={[
            "วิเคราะห์หลักสูตรแกนกลาง วิทยาศาสตร์ (ค23102) ม.3",
            "ออกแบบ 3 หน่วยการเรียนรู้ รวม 20 แผนการจัดการเรียนรู้",
            "เน้น Active Learning และ Constructivism",
            "ให้ผู้เรียนคิดลงมือทำจากประสบการณ์จริง (Learning by Doing)",
          ]}
        />
        <RespCard
          icon={Laptop}
          title="สื่อและเทคโนโลยี"
          color="cyan"
          items={[
            "บันทึกรหัสเรียนออนไลน์ (LMS) เว็บไซต์ aiaon.tech",
            "พัฒนาสื่อบนคอมพิวเตอร์ E-Book และสื่อดิจิทัลอื่นๆ",
            "ประยุกต์ใช้แอปพลิเคชัน GarageBand สร้างงานดนตรี",
            "จัดรูปแบบการสอนและกระบวนการแบบผสมผสาน",
          ]}
        />
        <RespCard
          icon={BarChart3}
          title="การวัดและประเมินผล"
          color="purple"
          items={[
            "การวัดผลตามสภาพจริง (Authentic Assessment)",
            "ประเมินระหว่างทาง ทั้งการปฏิบัติและกระบวนการ",
            "บันทึกผลผ่านระบบ Yawor Platform และ Bookmark",
            "ให้ข้อมูลสะท้อนกลับ (Feedback) เพื่อพัฒนาผู้เรียนรายบุคคล",
          ]}
        />
      </motion.div>

      {/* Student Care + PD */}
      <motion.div variants={fadeUp}>
        <div className="font-prompt text-xl font-bold text-white mb-5">ระบบดูแลช่วยเหลือนักเรียนและการพัฒนาวิชาชีพ</div>
      </motion.div>

      <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <RespCard
          icon={Heart}
          title="ระบบดูแลช่วยเหลือนักเรียน"
          color="amber"
          items={[
            "จัดทำสารสนเทศออนไลน์ (Google Forms/Sheets)",
            "ประเมินคัดกรอง SDQ เป็นกราฟ",
            "สื่อสารกับผู้ปกครอง / เยี่ยมบ้าน",
            "จัดประชุมผู้ปกครอง (Classroom)",
            "สอดแทรกคุณธรรม",
          ]}
        />
        <RespCard
          icon={TrendingUp}
          title="การพัฒนาตนเองและวิชาชีพ"
          color="blue"
          items={[
            "เข้าร่วมประชุม/อบรม ต่อเนื่อง",
            "ศึกษาแนวทางสมรรถนะดิจิทัล",
            "อบรมบริหารงานปลอดภัยและยานพาหนะ",
            "เป็นแกนนำขับเคลื่อน PLC (ART)",
            "เผยแพร่ผลงานเป็นแบบอย่างที่ดี",
          ]}
        />
      </motion.div>
    </motion.div>
  );
}

function ChallengePanel() {
  const steps = [
    { n: "01", t: "วิเคราะห์ปัญหา (PLC)", d: "ศึกษาหลักสูตรและสะท้อนปัญหาจากมุมมองในกระบวนการ PLC ร่วมกับ Buddy Teacher", color: "blue" as const },
    { n: "02", t: "ออกแบบการเรียนรู้", d: "สร้างแผนการจัดการเรียนรู้ฐานสมรรถนะ (Competency-based) วิชา ค23102", color: "cyan" as const },
    { n: "03", t: "พัฒนาสื่อนวัตกรรม", d: "สร้างวิดีโอสาธิต คู่มือ GarageBand และแบบฝึกหัดแบบ E-Book", color: "purple" as const },
    { n: "04", t: "จัดกิจกรรม Active Learning", d: "ผู้เรียนลงมือปฏิบัติจริง ประพันธ์เพลงความยาวไม่น้อยกว่า 30 วินาที และ Mixdown", color: "amber" as const },
    { n: "05", t: "วัดและสะท้อนผล", d: "เปิดชั้นเรียน (Open Classroom) ถ่ายคลิปวิธีสะท้อนย้อน (Reflection) เพื่อพัฒนาต่อไป", color: "blue" as const },
  ];

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">
      {/* Hero challenge card */}
      <motion.div variants={fadeUp}>
        <SectionBadge icon={Target} label="ตอนที่ 2: ประเด็นท้าทาย" color="purple" />
      </motion.div>
      <motion.div variants={fadeUp} className="glass-card border border-purple-500/20 bg-linear-to-br from-purple-500/10 to-transparent p-6 md:p-8">
        <div className="font-prompt text-xs uppercase tracking-widest text-purple-400/70 mb-3">ประเด็นท้าทายหลัก</div>
        <h2 className="font-prompt text-xl md:text-2xl font-bold text-white leading-relaxed mb-4">
          การพัฒนาทักษะการประพันธ์เพลงด้วยแอป GarageBand<br className="hidden md:block"/>
          สำหรับนักเรียน ม.3
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: "สภาพปัญหา", desc: "ผู้เรียนขาดแรงบันดาลใจและโอกาสในการสร้างสรรค์ผลงาน" },
            { label: "การเปลี่ยนแปลง", desc: "จากผู้บริโภคสื่อ → ผู้สร้างสรรค์ดิจิทัล" },
            { label: "หน่วยการเรียนรู้", desc: "แผนการจัดการเรียนรู้ 4: TikTok Music Producer" },
            { label: "รูปแบบการสอน", desc: "Project-Based Learning + Active Learning" },
          ].map(item => (
            <div key={item.label} className="p-3 rounded-xl bg-white/3 border border-white/8">
              <div className="font-prompt text-xs text-purple-400 font-semibold mb-1">{item.label}</div>
              <div className="font-prompt text-xs text-white/60 leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Steps stepper */}
      <motion.div variants={fadeUp}>
        <div className="font-prompt text-xl font-bold text-white mb-5">
          กระบวนการดำเนินงาน{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400">5 ขั้นตอน</span>
        </div>
      </motion.div>

      {/* Stepper — vertical on mobile, horizontal on desktop */}
      <div className="hidden md:grid grid-cols-5 gap-3 relative">
        {/* connector line */}
        <div className="absolute top-12 left-[10%] right-[10%] h-px bg-linear-to-r from-blue-500/30 via-purple-500/30 to-amber-500/30" />
        {steps.map((s) => (
          <motion.div
            key={s.n}
            variants={cardIn}
            className="flex flex-col items-center text-center gap-3"
          >
            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-prompt text-sm font-black z-10
              ${s.color === "blue"   ? "border-blue-500   bg-blue-500/15   text-blue-400"   : ""}
              ${s.color === "cyan"   ? "border-cyan-500   bg-cyan-500/15   text-cyan-400"   : ""}
              ${s.color === "purple" ? "border-purple-500 bg-purple-500/15 text-purple-400" : ""}
              ${s.color === "amber"  ? "border-amber-500  bg-amber-500/15  text-amber-400"  : ""}
            `}>{s.n}</div>
            <div className="glass-card p-3 w-full">
              <div className="font-prompt text-sm font-bold text-white mb-1.5">{s.t}</div>
              <div className="font-prompt text-xs text-white/50 leading-relaxed">{s.d}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile step cards */}
      <motion.div variants={stagger} className="grid grid-cols-1 gap-4 md:hidden">
        {steps.map(s => (
          <StepCard key={s.n} num={s.n} title={s.t} desc={s.d} color={s.color} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function ResultsPanel() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={fadeUp}>
        <SectionBadge icon={BarChart3} label="ตอนที่ 2: ผลลัพธ์การเรียนรู้" color="amber" />
        <h2 className="font-prompt text-2xl md:text-3xl font-bold text-white mt-4 mb-2 tracking-tight">
          ผลลัพธ์การเรียนรู้ของผู้เรียน
        </h2>
      </motion.div>

      {/* Quantitative */}
      <motion.div variants={fadeUp}>
        <div className="font-prompt text-base font-semibold text-white/50 uppercase tracking-widest mb-4">เชิงปริมาณ</div>
      </motion.div>

      <motion.div variants={stagger} className="space-y-4">
        <OutcomeBlock
          stat="≥86%"
          title="ผลลัพธ์พื้นฐานการเรียน"
          color="blue"
          items={[
            "นักเรียนชั้น ม.3 วิชาดนตรี (ค23102) ไม่มีผู้เรียนต่ำกว่า 86 มีผลงานคุณภาพตามเกณฑ์ที่กำหนด",
            "สามารถปฏิสัมพันธ์ต่อการประพันธ์เพลงด้วย GarageBand ได้ตามเป้าหมายประเด็นท้าทาย",
          ]}
        />
        <OutcomeBlock
          stat="100%"
          title="การสร้างสรรค์ผลงานจริง"
          color="amber"
          items={[
            "ผู้เรียนสามารถผลิตเพลง/ผลงานความยาวไม่น้อยกว่า 30 วินาที พร้อม Mixdown ได้ครบสมบูรณ์",
            "นำผลงานเองไปใช้ประกอบสื่อสังคมออนไลน์ (TikTok) ได้อย่างมีประสิทธิผล",
            "ระดับความพึงพอใจต่อการเรียนรู้อยู่ในระดับ \"มาก\" ถึง \"มากที่สุด\"",
          ]}
        />
      </motion.div>

      {/* Qualitative */}
      <motion.div variants={fadeUp}>
        <div className="font-prompt text-base font-semibold text-white/50 uppercase tracking-widest mb-4">เชิงคุณภาพ</div>
      </motion.div>

      <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <QualityCard
          icon={Brain}
          title="ด้านความรู้ (Knowledge)"
          color="blue"
          items={[
            "ผู้เรียนมีความเข้าใจหลักการและโครงสร้างบทเพลงถูกต้อง",
            "เข้าใจขั้นตอนการสร้างเพลงดิจิทัลในแอปพลิเคชัน GarageBand",
            "อธิบายการเลือกเครื่องมือองค์ประกอบดนตรีได้",
          ]}
        />
        <QualityCard
          icon={Zap}
          title="ด้านทักษะ (Skill & Digital)"
          color="purple"
          items={[
            "มีสมรรถนะความฉลาดทางดิจิทัล (Digital Literacy)",
            "ประพันธ์เพลง บันทึกเสียง และผสมเสียง (Mixdown) ได้สำเร็จ",
            "ทำงานเป็นทีมเพื่อแก้ปัญหาเชิงสร้างสรรค์",
          ]}
        />
        <QualityCard
          icon={Heart}
          title="ด้านทัศนคติ (Attitude)"
          color="amber"
          items={[
            "ผู้เรียนเกิดความสุขภูมิใจและมีความมั่นใจในการแสดงออก",
            "เห็นคุณค่าของการสร้างสรรค์ผลงานดนตรีอย่างมีจริยธรรม",
            "นำสื่อเทคโนโลยีทางดนตรีไปประยุกต์ใช้ในชีวิตประจำวัน",
          ]}
        />
      </motion.div>
    </motion.div>
  );
}

function SummaryPanel() {
  const achieved = [
    "พัฒนาทักษะการประพันธ์เพลงด้วย GarageBand",
    "ผลงานเพลงสื่อสังคม (TikTok) ≥30 วินาที ครบ 100%",
    "เกิด PLC ที่เข้มแข็งภายในโรงเรียน",
    "ยกระดับสมรรถนะครูและการบูรณาการเทคโนโลยี",
  ];
  const future = [
    "เรียนรู้แบบบูรณาการข้ามศาสตร์ (STEAM) เชื่อมดนตรีกับเทคโนโลยี",
    "ประยุกต์ใช้ AI (AI Mastering, AI Composition) ในการสอน",
    "ขยายผลสู่ศิลปะแขนงอื่นและชั้นเรียนอื่นๆ",
    "ส่งเสริมการเผยแพร่ผลงานในเวทีระดับสากล",
  ];

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={fadeUp}>
        <SectionBadge icon={FileText} label="บทสรุปการดำเนินงาน วPA" color="cyan" />
        <h2 className="font-prompt text-2xl md:text-3xl font-bold text-white mt-4 tracking-tight">
          บทสรุปการดำเนินงานและ{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400">วิสัยทัศน์</span>
        </h2>
      </motion.div>

      {/* Key success highlight */}
      <motion.div variants={fadeUp} className="glass-card border border-blue-500/20 bg-linear-to-br from-blue-500/10 via-transparent to-purple-500/5 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-blue-500/15 shrink-0">
            <Trophy className="w-7 h-7 text-blue-400" />
          </div>
          <div>
            <div className="font-prompt text-xs uppercase tracking-widest text-blue-400/70 mb-2">Key Success</div>
            <p className="font-prompt text-lg md:text-xl font-semibold text-white leading-relaxed">
              ผู้เรียนเปลี่ยนจาก<span className="text-white/50">ผู้บริโภคสื่อ</span>{" "}
              เป็น{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">ผู้สร้างผลงานดิจิทัล</span>
              ที่มีคุณภาพและภาคภูมิใจ
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Achieved */}
        <motion.div variants={cardIn} className="glass-card border border-cyan-500/20 p-6">
          <div className="font-prompt text-base font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            สรุปผลการดำเนินงาน
          </div>
          <ul className="space-y-3">
            {achieved.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                <span className="font-prompt text-sm text-white/65 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Future */}
        <motion.div variants={cardIn} className="glass-card border border-purple-500/20 p-6">
          <div className="font-prompt text-base font-bold text-white mb-4 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-purple-400" />
            แนวทางพัฒนาในอนาคต
          </div>
          <ul className="space-y-3">
            {future.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                <span className="font-prompt text-sm text-white/65 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Vision quote */}
      <motion.div variants={fadeUp} className="glass-card border border-amber-500/20 bg-linear-to-br from-amber-500/8 to-transparent p-6 md:p-8 text-center">
        <div className="font-prompt text-xs uppercase tracking-widest text-amber-400/70 mb-3">วิสัยทัศน์ (Vision)</div>
        <blockquote className="font-prompt text-xl md:text-2xl font-semibold text-white leading-relaxed">
          &ldquo;มุ่งสร้างผู้เรียนเป็นนักสร้างสรรค์ดนตรีและสื่อดิจิทัล&rdquo;
        </blockquote>
        <div className="mt-4 font-prompt text-sm text-white/40">— นายจิรวัฒน์ เดชเส้ง · วPA 2569</div>
      </motion.div>

      {/* Thank you card */}
      <motion.div
        variants={fadeUp}
        className="glass-card bg-linear-to-br from-blue-600/20 via-purple-600/10 to-transparent border border-white/10 p-8 md:p-12 text-center rounded-2xl"
      >
        <div className="font-prompt text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
          ขอขอบพระคุณ
        </div>
        <div className="font-prompt text-lg text-white/60 mb-6">
          คณะกรรมการประเมินทุกท่าน
        </div>
        <div className="h-px w-24 mx-auto bg-linear-to-r from-transparent via-blue-400 to-transparent mb-6" />
        <div className="font-prompt text-base text-white/50">
          พร้อมน้อมรับคำแนะนำ เพื่อการพัฒนาต่อไป
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */
export default function VpaPresentationPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const tabBarRef = useRef<HTMLDivElement>(null);

  // Scroll active tab into view on mobile
  useEffect(() => {
    if (!tabBarRef.current) return;
    const active = tabBarRef.current.querySelector("[data-active='true']") as HTMLElement | null;
    active?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeTab]);

  const currentTab = TABS.find(t => t.id === activeTab)!;

  const panelMap: Record<TabId, React.ReactNode> = {
    overview:  <OverviewPanel />,
    teaching:  <TeachingPanel />,
    challenge: <ChallengePanel />,
    results:   <ResultsPanel />,
    summary:   <SummaryPanel />,
  };

  const prevTab = () => {
    const i = TABS.findIndex(t => t.id === activeTab);
    if (i > 0) setActiveTab(TABS[i - 1].id);
  };
  const nextTab = () => {
    const i = TABS.findIndex(t => t.id === activeTab);
    if (i < TABS.length - 1) setActiveTab(TABS[i + 1].id);
  };

  const currentIdx = TABS.findIndex(t => t.id === activeTab);

  return (
    <div className="min-h-screen relative z-10">
      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-200px] left-[-150px] w-[600px] h-[600px] rounded-full blur-[140px] bg-blue-500/10 animate-[ambient-float_8s_ease-in-out_infinite_alternate]" />
        <div className="absolute top-[30%] right-[-120px] w-[500px] h-[500px] rounded-full blur-[140px] bg-purple-500/10 animate-[ambient-float_10s_ease-in-out_infinite_alternate-reverse]" />
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full blur-[120px] bg-cyan-600/8" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">

        {/* ── Page header ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="mb-10"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 text-blue-400 text-sm font-prompt font-medium mb-5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
              </span>
              วPA 2569 · ปีการศึกษา 2569
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-prompt text-3xl md:text-5xl font-bold tracking-tight text-white mb-3 leading-tight"
          >
            การพัฒนาทักษะการประพันธ์เพลง{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-300 to-cyan-400">
              ด้วย GarageBand
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="font-prompt text-base text-white/50 max-w-2xl">
            TikTok Music Producer · ม.3 · โรงเรียนหาดใหญ่วิทยาลัย · สพม. สงขลา สตูล
          </motion.p>
        </motion.div>

        {/* ── Tab navigation ── */}
        <div
          ref={tabBarRef}
          className="flex gap-2 overflow-x-auto pb-1 mb-8 scrollbar-hide no-scrollbar"
          style={{ scrollbarWidth: "none" }}
          role="tablist"
          aria-label="หมวดหมู่เนื้อหา"
        >
          {TABS.map(tab => {
            const isActive = tab.id === activeTab;
            const color = tab.color;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                data-active={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex items-center gap-2 px-4 py-2.5 rounded-xl border font-prompt text-sm font-medium whitespace-nowrap
                  transition-all duration-300 shrink-0 cursor-pointer
                  ${isActive
                    ? `${TAB_COLOR_MAP[color]} ${TAB_GLOW_MAP[color]}`
                    : "text-white/40 border-white/8 bg-white/3 hover:bg-white/6 hover:text-white/70 hover:border-white/15"
                  }
                `}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId="tab-indicator"
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-6 h-0.5 rounded-full ${INDICATOR_MAP[color]}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Tab content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {panelMap[activeTab]}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom prev / next ── */}
        <div className="mt-12 flex items-center justify-between border-t border-white/8 pt-6">
          <button
            onClick={prevTab}
            disabled={currentIdx === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/3 text-white/50 font-prompt text-sm font-medium
              hover:bg-white/8 hover:text-white/80 hover:border-white/20 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            {currentIdx > 0 ? TABS[currentIdx - 1].label : "—"}
          </button>

          {/* Progress dots */}
          <div className="flex gap-1.5 items-center">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`rounded-full transition-all duration-300 cursor-pointer
                  ${i === currentIdx
                    ? `w-6 h-2 ${INDICATOR_MAP[currentTab.color]}`
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }
                `}
                aria-label={t.label}
              />
            ))}
          </div>

          <button
            onClick={nextTab}
            disabled={currentIdx === TABS.length - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/3 text-white/50 font-prompt text-sm font-medium
              hover:bg-white/8 hover:text-white/80 hover:border-white/20 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            {currentIdx < TABS.length - 1 ? TABS[currentIdx + 1].label : "—"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

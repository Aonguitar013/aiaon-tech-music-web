"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, Code2, Music, CheckCircle2, ArrowRight,
  MessageCircle, Cpu, Workflow, Bot, Mic2, Headphones,
  Music2, Star, Clock, Sparkles, Filter, Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────────────────────── */

type Category = "all" | "tech" | "music";

interface ServicePackage {
  id: string;
  category: "tech" | "music";
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  price: string;
  priceNote: string;
  badge?: string;
  colorFrom: string;
  colorTo: string;
  glowColor: string;
  borderColor: string;
  textColor: string;
  bgColor: string;
  btnClass: string;
  deliveryDays: string;
}

const SERVICES: ServicePackage[] = [
  {
    id: "line-attendance",
    category: "tech",
    icon: Bot,
    title: "ระบบเช็คชื่อ + LINE แจ้งเตือนผู้ปกครอง",
    subtitle: "Automated Attendance & LINE Notification",
    description:
      "พัฒนาระบบเช็คชื่อนักเรียนอัตโนมัติพร้อมแจ้งเตือนผ่าน LINE ผู้ปกครองแบบ Real-time เหมาะสำหรับห้องเรียนถึงระดับโรงเรียนทั้งหมด",
    features: [
      "เช็คชื่อและบันทึกผลอัตโนมัติลง Google Sheets",
      "ส่งข้อความแจ้งเตือน LINE ผู้ปกครองทันที",
      "Dashboard สรุปผลรายเดือนแบบ Real-time",
      "รองรับนักเรียนได้ตั้งแต่ 30 ถึง 1,000+ คน",
      "ฝึกอบรมการใช้งานให้ครูทีม 1 วัน",
    ],
    price: "เริ่มต้น ฿4,500",
    priceNote: "ต่อห้องเรียน / ต่อปีการศึกษา",
    badge: "ขายดีสุด",
    colorFrom: "from-cyan-500",
    colorTo: "to-blue-600",
    glowColor: "rgba(34,211,238,0.22)",
    borderColor: "border-cyan-500/25",
    textColor: "text-cyan-400",
    bgColor: "bg-cyan-500/5",
    btnClass: "from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-[0_0_24px_rgba(34,211,238,0.3)]",
    deliveryDays: "7–14 วัน",
  },
  {
    id: "n8n-automation",
    category: "tech",
    icon: Workflow,
    title: "ระบบ Automation ครบวงจร (n8n)",
    subtitle: "Custom Workflow Automation",
    description:
      "ออกแบบและสร้าง Workflow อัตโนมัติแบบ Custom สำหรับธุรกิจหรือโรงเรียน เชื่อมต่อ Google Workspace, LINE, Notion, Supabase และอื่นๆ",
    features: [
      "วิเคราะห์ขั้นตอนงานที่ซ้ำซ้อนและออกแบบ Workflow",
      "เชื่อมต่อ API และระบบต่างๆ ได้ไม่จำกัด",
      "ทดสอบและปรับแต่งจนทำงานเสถียร 100%",
      "เอกสาร How-to และวิดีโออธิบาย Workflow",
      "รับประกันซัพพอร์ต 30 วันหลังส่งมอบ",
    ],
    price: "เริ่มต้น ฿3,500",
    priceNote: "ต่อ 1 Workflow Project",
    colorFrom: "from-violet-500",
    colorTo: "to-purple-600",
    glowColor: "rgba(139,92,246,0.22)",
    borderColor: "border-violet-500/25",
    textColor: "text-violet-400",
    bgColor: "bg-violet-500/5",
    btnClass: "from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-[0_0_24px_rgba(139,92,246,0.3)]",
    deliveryDays: "5–10 วัน",
  },
  {
    id: "apps-script",
    category: "tech",
    icon: Cpu,
    title: "Google Apps Script สั่งทำพิเศษ",
    subtitle: "Custom Apps Script Development",
    description:
      "เขียนสคริปต์ Google Workspace แบบ Custom ตามโจทย์ของคุณ ไม่ว่าจะเป็น Auto-fill, สร้าง PDF, ส่งอีเมลอัตโนมัติ หรือ Sync ข้อมูลระหว่าง Sheets",
    features: [
      "รับโจทย์และออกแบบ Logic ร่วมกับลูกค้า",
      "เขียนโค้ดสะอาด พร้อม Comment อธิบาย",
      "ทดสอบบน Spreadsheet จริงของลูกค้า",
      "สอนวิธีใช้และปรับแต่งเองได้",
      "แก้ Bug ฟรี 2 รอบหลังส่งมอบ",
    ],
    price: "เริ่มต้น ฿1,500",
    priceNote: "ต่อ Script (ขึ้นอยู่กับความซับซ้อน)",
    colorFrom: "from-emerald-500",
    colorTo: "to-teal-500",
    glowColor: "rgba(16,185,129,0.22)",
    borderColor: "border-emerald-500/25",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-500/5",
    btnClass: "from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-[0_0_24px_rgba(16,185,129,0.3)]",
    deliveryDays: "3–7 วัน",
  },
  {
    id: "custom-music",
    category: "music",
    icon: Music2,
    title: "แต่งเพลงประกอบ / Jingle โฆษณา",
    subtitle: "Custom Music & Jingle Composition",
    description:
      "รับแต่งเพลงประกอบโฆษณา, Intro/Outro YouTube, BGM สำหรับ Podcast หรือ Event ด้วยสไตล์ที่คุณต้องการ ส่งไฟล์ WAV/MP3 คุณภาพสูง",
    features: [
      "ปรึกษา Mood & Style ก่อนเริ่มทำ",
      "Demo แรก 30 วินาทีภายใน 3 วัน",
      "ปรับแก้ได้ 3 รอบตามความต้องการ",
      "ส่งไฟล์ Master WAV 24-bit + MP3 320kbps",
      "สิทธิ์การใช้งานเชิงพาณิชย์ (Commercial License)",
    ],
    price: "เริ่มต้น ฿2,500",
    priceNote: "ต่อ 1 เพลง (ความยาว ≤ 60 วินาที)",
    badge: "ฮิตมาก",
    colorFrom: "from-amber-500",
    colorTo: "to-orange-500",
    glowColor: "rgba(245,158,11,0.22)",
    borderColor: "border-amber-500/25",
    textColor: "text-amber-400",
    bgColor: "bg-amber-500/5",
    btnClass: "from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-[0_0_24px_rgba(245,158,11,0.3)]",
    deliveryDays: "7–14 วัน",
  },
  {
    id: "mix-master",
    category: "music",
    icon: Headphones,
    title: "Mix & Master บทเพลงของคุณ",
    subtitle: "Professional Mixing & Mastering",
    description:
      "รับ Mix & Master เพลงของคุณให้ได้มาตรฐานสตูดิโอ ปรับ EQ, Dynamic, Stereo Width และ Loudness ให้เหมาะกับทุก Platform เช่น Spotify, YouTube",
    features: [
      "Mixing ทุก Track (Drums, Bass, Synth, Vocal, Guitar)",
      "Mastering สำหรับ Streaming และ CD/Vinyl",
      "ส่ง Reference Track ได้ 1 เพลง",
      "ปรับแก้ได้ 2 รอบ (Revision)",
      "ส่งไฟล์ Master WAV + DDP Image",
    ],
    price: "เริ่มต้น ฿1,800",
    priceNote: "ต่อ 1 เพลง (ไม่เกิน 5 นาที)",
    colorFrom: "from-rose-500",
    colorTo: "to-pink-600",
    glowColor: "rgba(244,63,94,0.22)",
    borderColor: "border-rose-500/25",
    textColor: "text-rose-400",
    bgColor: "bg-rose-500/5",
    btnClass: "from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 shadow-[0_0_24px_rgba(244,63,94,0.3)]",
    deliveryDays: "5–10 วัน",
  },
  {
    id: "vst-template",
    category: "music",
    icon: Mic2,
    title: "DAW Template สั่งทำพิเศษ",
    subtitle: "Custom DAW Project Template",
    description:
      "สร้างเทมเพลต DAW แบบ Custom ตาม DAW ที่คุณใช้ (Logic Pro / Ableton / FL Studio) พร้อม Routing, FX Chain, Bus/Group ที่จัดระเบียบสมบูรณ์",
    features: [
      "ออกแบบโครงสร้าง Template ตาม Genre ของคุณ",
      "จัดวาง Instrument, Bus, Routing ครบถ้วน",
      "กำหนด FX Chain มาตรฐานสตูดิโอ",
      "มีเอกสาร PDF อธิบายแต่ละ Track",
      "สอนวิธีใช้ผ่าน Video Call 1 ชั่วโมง",
    ],
    price: "เริ่มต้น ฿3,200",
    priceNote: "ต่อ 1 Template Project",
    colorFrom: "from-indigo-500",
    colorTo: "to-blue-600",
    glowColor: "rgba(99,102,241,0.22)",
    borderColor: "border-indigo-500/25",
    textColor: "text-indigo-400",
    bgColor: "bg-indigo-500/5",
    btnClass: "from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-[0_0_24px_rgba(99,102,241,0.3)]",
    deliveryDays: "7–10 วัน",
  },
];

const TABS: { label: string; value: Category; icon: React.ElementType }[] = [
  { label: "ทั้งหมด",   value: "all",   icon: Sparkles },
  { label: "เทคโนโลยี", value: "tech",  icon: Code2 },
  { label: "ดนตรี",     value: "music", icon: Music },
];

/* ─────────────────────────────────────────────────────────────
   SERVICE CARD
───────────────────────────────────────────────────────────── */

function ServiceCard({ service, index }: { service: ServicePackage; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow halo */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl blur-md pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: `radial-gradient(ellipse at center, ${service.glowColor}, transparent 70%)` }}
      />

      <div className={cn(
        "relative glass-card flex flex-col h-full p-6 md:p-7 transition-all duration-300",
        service.borderColor,
        "group-hover:border-white/20"
      )}>

        {/* Badge */}
        {service.badge && (
          <div className="absolute -top-3 left-6">
            <span className={cn(
              "inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-prompt font-bold tracking-wide text-white bg-gradient-to-r",
              service.colorFrom, service.colorTo
            )}>
              <Star className="w-2.5 h-2.5 fill-white" />
              {service.badge}
            </span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br shrink-0 transition-transform duration-300 group-hover:scale-110",
            service.colorFrom, service.colorTo,
            "shadow-lg"
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className={cn("text-[11px] font-prompt font-semibold uppercase tracking-widest mb-1", service.textColor)}>
              {service.subtitle}
            </p>
            <h3 className={cn(
              "font-prompt text-lg font-bold text-white leading-snug transition-colors duration-300",
              `group-hover:${service.textColor}`
            )}>
              {service.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="font-prompt text-sm text-white/55 leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2.5 mb-6 flex-1">
          {service.features.map((feat) => (
            <li key={feat} className="flex items-start gap-2.5 text-white/70 text-sm font-prompt">
              <CheckCircle2 className={cn("w-4 h-4 shrink-0 mt-0.5", service.textColor)} />
              {feat}
            </li>
          ))}
        </ul>

        {/* Delivery time */}
        <div className={cn(
          "flex items-center gap-1.5 text-xs font-prompt mb-5 px-3 py-1.5 rounded-lg w-fit",
          service.bgColor, service.borderColor, "border"
        )}>
          <Clock className={cn("w-3.5 h-3.5", service.textColor)} />
          <span className={service.textColor}>ระยะเวลา: {service.deliveryDays}</span>
        </div>

        {/* Pricing + CTA */}
        <div className="mt-auto pt-5 border-t border-white/8">
          <div className="flex items-end justify-between gap-3 flex-wrap">
            <div>
              <p className="text-white font-prompt font-bold text-2xl leading-tight">{service.price}</p>
              <p className="text-white/35 font-prompt text-xs mt-0.5">{service.priceNote}</p>
            </div>
            <a
              href="#contact-form"
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r text-white font-prompt font-bold text-sm transition-all duration-300 hover:scale-[1.04] active:scale-95",
                service.btnClass
              )}
            >
              สอบถาม
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────────────────────── */

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", contact: "", service: "", detail: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate API call
    setTimeout(() => setStatus("sent"), 1500);
  };

  const inputClass =
    "w-full bg-white/4 border border-white/10 hover:border-white/20 focus:border-teal-500/40 focus:outline-none rounded-xl px-4 py-3 text-white font-prompt text-sm placeholder:text-white/25 transition-all duration-200 focus:shadow-[0_0_15px_rgba(20,184,166,0.1)]";

  return (
    <motion.div
      id="contact-form"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-24 glass-card border-teal-500/20 p-8 md:p-12 relative overflow-hidden"
    >
      {/* BG glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/8 border border-teal-500/20 text-teal-400 text-sm font-prompt font-medium">
            <MessageCircle className="w-4 h-4" />
            สอบถาม / จ้างงาน
          </div>
          <h2 className="font-prompt text-3xl md:text-4xl font-bold text-white">
            มีโปรเจกต์ในใจแล้วใช่ไหม?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
              คุยกันได้เลย
            </span>
          </h2>
          <p className="text-white/45 font-prompt text-sm leading-relaxed">
            ส่งรายละเอียดมา ผมจะตอบกลับภายใน 24 ชั่วโมง พร้อมเสนอแผนและราคาที่เหมาะสม
          </p>
        </div>

        {status === "sent" ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-4 py-12"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(20,184,166,0.4)]">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-prompt text-2xl font-bold text-white">ส่งข้อความเรียบร้อยแล้ว!</h3>
            <p className="font-prompt text-white/50 text-sm">
              ขอบคุณที่สนใจ ผมจะติดต่อกลับภายใน 24 ชั่วโมงครับ 🙏
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-prompt text-white/40 mb-1.5 uppercase tracking-wider">ชื่อ / นามสกุล</label>
                <input
                  required
                  className={inputClass}
                  placeholder="คุณ / ท่าน..."
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-prompt text-white/40 mb-1.5 uppercase tracking-wider">LINE / อีเมล / เบอร์โทร</label>
                <input
                  required
                  className={inputClass}
                  placeholder="ช่องทางติดต่อที่สะดวก..."
                  value={form.contact}
                  onChange={e => setForm(p => ({ ...p, contact: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-prompt text-white/40 mb-1.5 uppercase tracking-wider">บริการที่สนใจ</label>
              <select
                required
                className={cn(inputClass, "cursor-pointer")}
                value={form.service}
                onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
              >
                <option value="" disabled>เลือกบริการ...</option>
                {SERVICES.map(s => (
                  <option key={s.id} value={s.id} className="bg-zinc-900">{s.title}</option>
                ))}
                <option value="other" className="bg-zinc-900">บริการอื่นๆ / ปรึกษาก่อน</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-prompt text-white/40 mb-1.5 uppercase tracking-wider">รายละเอียดโปรเจกต์</label>
              <textarea
                required
                rows={4}
                className={cn(inputClass, "resize-none")}
                placeholder="อธิบายสิ่งที่ต้องการ เช่น ขนาดโรงเรียน, DAW ที่ใช้, Budget คร่าวๆ..."
                value={form.detail}
                onChange={e => setForm(p => ({ ...p, detail: e.target.value }))}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className={cn(
                "w-full py-4 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 text-white font-prompt font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_24px_rgba(20,184,166,0.3)] hover:shadow-[0_0_36px_rgba(20,184,166,0.45)]",
                status === "sending" && "opacity-70 cursor-not-allowed"
              )}
            >
              {status === "sending" ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  กำลังส่ง...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  ส่งข้อความสอบถาม
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN VIEW
───────────────────────────────────────────────────────────── */

export function ServicesView() {
  const [activeTab, setActiveTab] = useState<Category>("all");

  const filtered = SERVICES.filter(
    (s) => activeTab === "all" || s.category === activeTab
  );

  return (
    <div className="w-full relative overflow-hidden min-h-screen pb-24">

      {/* Background glows */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[500px] bg-teal-500/6 blur-[140px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/3" />
      <div className="absolute top-[50%] right-[-100px] w-[450px] h-[450px] bg-emerald-500/6 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 md:pt-16">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-teal-500/30 bg-teal-500/5 text-teal-400 text-sm font-medium"
          >
            <Briefcase className="w-4 h-4" />
            Custom Services — ออกแบบมาเพื่อคุณโดยเฉพาะ
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-prompt text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight"
          >
            บริการ
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(20,184,166,0.35)]">
              {" "}ออกแบบระบบ
            </span>
            <br />& ทำ
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.35)]">
              {" "}เพลง
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-white/55 font-prompt leading-relaxed max-w-xl mx-auto"
          >
            บริการแบบ Custom ที่ออกแบบมาเพื่อตอบโจทย์เฉพาะของคุณ
            ทั้งระบบ Automation สำหรับโรงเรียน และงานดนตรีระดับมืออาชีพ
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-8 pt-2"
          >
            {[
              { value: "50+", label: "โปรเจกต์สำเร็จ" },
              { value: "100%", label: "ลูกค้าพึงพอใจ" },
              { value: "24h", label: "ตอบกลับภายใน" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-0.5">
                <span className="font-prompt text-xl font-bold text-white">{s.value}</span>
                <span className="font-prompt text-xs text-white/35 uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Filter Tabs ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          <Filter className="w-4 h-4 text-white/30 mr-1" />
          {TABS.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-prompt font-medium transition-all duration-250",
                  isActive
                    ? "bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.35)]"
                    : "glass-card border-white/8 text-white/50 hover:text-white hover:border-white/15"
                )}
              >
                <TabIcon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* ── Cards Grid ──────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Contact Form ─────────────────────────────────────────── */}
        <ContactForm />

      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, Code2, Music, CheckCircle2, ArrowRight,
  MessageCircle, Cpu, Workflow, Bot, Mic2, Headphones,
  Music2, Star, Clock, Sparkles, Filter, Send,
  Presentation, GraduationCap, Building2, Calendar, Users,
  X, School, Phone, MapPin, Award
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
    id: "ai-speaker",
    category: "tech",
    icon: Presentation,
    title: "วิทยากรบรรยาย & Workshop อบรม AI",
    subtitle: "AI Keynote Speaker & Training Workshop",
    description:
      "บริการบรรยายและจัดอบรมเชิงปฏิบัติการ (Workshop) เรื่อง Generative AI, AI เพื่อการศึกษาลดภาระครู และ Automation สำหรับองค์กรและโรงเรียน",
    features: [
      "หลักสูตรประยุกต์เฉพาะตามความต้องการของสถาบัน/หน่วยงาน",
      "เน้นลงมือทำจริง (Hands-on) พร้อม Prompt Templates แจกฟรี",
      "รองรับทั้งรูปแบบ On-site (ณ สถานที่) และ Online (Zoom / Meet)",
      "มีหนังสือขอเชิญวิทยากร + เอกสารเสนอราคาถูกต้องตามระบบราชการ",
      "มีเกียรติบัตรอิเล็กทรอนิกส์และวิดีโอทบทวนหลังจบการอบรม",
    ],
    price: "ขอใบเสนอราคา / คิวบรรยาย",
    priceNote: "ปรับตามรูปแบบ ระยะเวลา และจำนวนผู้เข้าร่วม",
    badge: "บริการยอดนิยมสำหรับโรงเรียน & สถาบัน",
    colorFrom: "from-amber-400",
    colorTo: "to-orange-500",
    glowColor: "rgba(245,158,11,0.3)",
    borderColor: "border-amber-500/35",
    textColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
    btnClass: "from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-[0_0_24px_rgba(245,158,11,0.4)]",
    deliveryDays: "จองคิวิทยากรล่วงหน้า 7–14 วัน",
  },
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

function ServiceCard({
  service,
  index,
  onSelectService,
}: {
  service: ServicePackage;
  index: number;
  onSelectService: (id: string) => void;
}) {
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
              "inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-prompt font-bold tracking-wide text-white bg-linear-to-r",
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
            "w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br shrink-0 transition-transform duration-300 group-hover:scale-110",
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
        <p className="font-prompt text-base text-white/70 leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2.5 mb-6 flex-1">
          {service.features.map((feat) => (
            <li key={feat} className="flex items-start gap-2.5 text-white/80 text-base font-prompt leading-relaxed">
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
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white font-prompt font-bold text-2xl leading-tight">{service.price}</p>
                <p className="text-white/35 font-prompt text-xs mt-0.5">{service.priceNote}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={service.id === "ai-speaker" ? "#" : "#contact-form"}
                onClick={(e) => {
                  if (service.id === "ai-speaker") {
                    e.preventDefault();
                  }
                  onSelectService(service.id);
                }}
                className="w-full text-center py-2.5 px-3 rounded-xl border border-white/10 hover:border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 text-xs font-prompt flex items-center justify-center gap-1 cursor-pointer"
              >
                {service.id === "ai-speaker" ? "จองคิวิทยากร" : "กรอกรายละเอียด"}
              </a>
              <a
                href="https://lin.ee/XXLvrKW"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 px-3 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-prompt font-bold text-xs flex items-center justify-center gap-1 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_12px_rgba(6,199,85,0.2)]"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white text-[#06C755] shrink-0" />
                ทัก LINE ปรึกษาฟรี
              </a>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SPEAKER BOOKING MODAL
───────────────────────────────────────────────────────────── */

function SpeakerBookingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({
    orgName: "",
    contactName: "",
    phoneLine: "",
    eventDate: "",
    format: "onsite",
    topic: "ai-education",
    participants: "30-50",
    note: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 hover:border-amber-500/40 focus:border-amber-400 focus:outline-none rounded-xl px-4 py-3 text-white font-prompt text-sm placeholder:text-white/30 transition-all duration-200 focus:shadow-[0_0_15px_rgba(245,158,11,0.2)]";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl glass-card border-amber-500/30 bg-zinc-950/95 rounded-3xl p-6 md:p-8 z-10 my-auto shadow-[0_0_60px_rgba(245,158,11,0.25)] overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-orange-500/10 blur-[90px] rounded-full pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 z-20 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)] shrink-0">
              <Presentation className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-prompt font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                จองคิวิทยากร / Workshop AI
              </span>
              <h3 className="font-prompt text-2xl font-bold text-white mt-1">
                แบบฟอร์มขอเชิญวิทยากรบรรยาย
              </h3>
            </div>
          </div>

          {status === "sent" ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-4 py-8"
            >
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-prompt text-2xl font-bold text-white">ส่งข้อมูลการจองคิวเรียบร้อยแล้ว!</h4>
              <p className="font-prompt text-white/70 text-sm max-w-md mx-auto leading-relaxed">
                ขอบคุณที่สนใจเชิญครูอ้นเป็นวิทยากรครับ ทีมงานจะติดต่อกลับเพื่อยืนยันวันเวลาและจัดทำหนังสือขอเชิญ/เสนอราคาภายใน 24 ชั่วโมง
              </p>
              <button
                onClick={() => { setStatus("idle"); onClose(); }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-prompt font-bold text-sm hover:bg-amber-400 transition-all duration-200 cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-prompt text-amber-400/90 mb-1.5 font-medium">
                    ชื่อหน่วยงาน / โรงเรียน / บริษัท *
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      required
                      className={cn(inputClass, "pl-10")}
                      placeholder="เช่น โรงเรียนสาธิต... / บริษัท..."
                      value={form.orgName}
                      onChange={(e) => setForm((p) => ({ ...p, orgName: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-prompt text-amber-400/90 mb-1.5 font-medium">
                    วันที่ต้องการจัดอบรม (โดยประมาณ) *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      required
                      type="date"
                      className={cn(inputClass, "pl-10 text-white")}
                      value={form.eventDate}
                      onChange={(e) => setForm((p) => ({ ...p, eventDate: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-prompt text-amber-400/90 mb-1.5 font-medium">
                    ชื่อผู้ติดต่อ *
                  </label>
                  <input
                    required
                    className={inputClass}
                    placeholder="คุณ / อ. / ผอ...."
                    value={form.contactName}
                    onChange={(e) => setForm((p) => ({ ...p, contactName: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-xs font-prompt text-amber-400/90 mb-1.5 font-medium">
                    เบอร์โทรศัพท์ / LINE ID *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      required
                      className={cn(inputClass, "pl-10")}
                      placeholder="08X-XXX-XXXX หรือ LINE ID"
                      value={form.phoneLine}
                      onChange={(e) => setForm((p) => ({ ...p, phoneLine: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-prompt text-amber-400/90 mb-1.5 font-medium">
                    หัวข้อการอบรมที่สนใจ *
                  </label>
                  <select
                    className={cn(inputClass, "cursor-pointer")}
                    value={form.topic}
                    onChange={(e) => setForm((p) => ({ ...p, topic: e.target.value }))}
                  >
                    <option value="ai-education" className="bg-zinc-900">AI เพื่อการศึกษา & ลดภาระครู</option>
                    <option value="ai-automation" className="bg-zinc-900">AI & Automation Workflow (n8n)</option>
                    <option value="generative-ai" className="bg-zinc-900">Generative AI & Prompt Engineering</option>
                    <option value="custom" className="bg-zinc-900">หลักสูตร Custom เฉพาะองค์กร</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-prompt text-amber-400/90 mb-1.5 font-medium">
                    รูปแบบการบรรยาย / อบรม
                  </label>
                  <select
                    className={cn(inputClass, "cursor-pointer")}
                    value={form.format}
                    onChange={(e) => setForm((p) => ({ ...p, format: e.target.value }))}
                  >
                    <option value="onsite" className="bg-zinc-900">On-site (ออนไซต์ ณ สถานที่)</option>
                    <option value="online" className="bg-zinc-900">Online (ผ่าน Zoom / MS Teams)</option>
                    <option value="hybrid" className="bg-zinc-900">Hybrid (ผสมผสาน)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-prompt text-amber-400/90 mb-1.5 font-medium">
                  รายละเอียดเพิ่มเติม (สถานที่จัด / เป้าหมาย / งบประมาณ)
                </label>
                <textarea
                  rows={3}
                  className={cn(inputClass, "resize-none")}
                  placeholder="ระบุสถานที่จัดอบรม, จำนวนครู/ผู้เข้าร่วมโดยประมาณ หรือความต้องการพิเศษ..."
                  value={form.note}
                  onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={cn(
                  "w-full py-4 rounded-xl bg-linear-to-r from-amber-500 via-orange-500 to-amber-400 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-prompt font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_30px_rgba(245,158,11,0.4)] cursor-pointer",
                  status === "sending" && "opacity-70 cursor-not-allowed"
                )}
              >
                {status === "sending" ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full"
                    />
                    กำลังส่งข้อมูล...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    ยืนยันจองคิวิทยากร / ขอใบเสนอราคา
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   SPEAKER HIGHLIGHT BANNER
───────────────────────────────────────────────────────────── */

function SpeakerHighlightBanner({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-16 relative glass-card border-amber-500/30 p-8 md:p-10 rounded-3xl overflow-hidden bg-linear-to-br from-amber-500/10 via-zinc-900/80 to-purple-950/40 shadow-[0_0_50px_rgba(245,158,11,0.18)]"
    >
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-600/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Text Content */}
        <div className="space-y-4 text-center lg:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs md:text-sm font-prompt font-semibold tracking-wide">
            <Presentation className="w-4 h-4 text-amber-400" />
            บริการวิทยากรบรรยาย &amp; จัด WORKSHOP อบรม AI
          </div>

          <h3 className="font-prompt text-2xl md:text-4xl font-extrabold text-white leading-tight">
            ยกระดับองค์กรและครูผู้สอนด้วย{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-orange-400 to-yellow-300 drop-shadow-[0_0_25px_rgba(245,158,11,0.5)]">
              AI &amp; Automation เทคโนโลยีล่าสุด
            </span>
          </h3>

          <p className="font-prompt text-white/70 text-sm md:text-base leading-relaxed">
            ถ่ายทอดจากประสบการณ์จริงโดย <span className="text-amber-300 font-semibold">ครูอ้น iAon Tech</span> เน้นการใช้งานได้จริง (Hands-on 100%) อบรมเข้าใจง่าย นำไปประยุกต์ใช้ลดภาระงานและเพิ่มประสิทธิภาพการสอนได้ทันที
          </p>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
            {[
              { icon: GraduationCap, title: "AI เพื่อการศึกษา & สื่อการสอน" },
              { icon: Workflow, title: "Automation & n8n Workflow" },
              { icon: Award, title: "มีหนังสือเชิญ + เอกสารราชการครบ" },
              { icon: Users, title: "รองรับทั้ง On-site และ Online" },
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="font-prompt text-xs md:text-sm text-white/80 font-medium">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Button Block */}
        <div className="flex flex-col items-center shrink-0 w-full lg:w-auto space-y-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenModal}
            className="w-full lg:w-auto px-8 py-5 rounded-2xl bg-linear-to-r from-amber-500 via-orange-500 to-amber-400 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-prompt font-extrabold text-base md:text-lg flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(245,158,11,0.45)] hover:shadow-[0_0_60px_rgba(245,158,11,0.6)] transition-all duration-300 border border-amber-300/50 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-zinc-950 fill-zinc-950 shrink-0" />
            <span>ขอเชิญครูอ้นเป็นวิทยากรบรรยาย / จัด Workshop AI</span>
            <ArrowRight className="w-5 h-5 text-zinc-950 shrink-0" />
          </motion.button>

          <span className="font-prompt text-xs text-white/40 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            ตอบกลับและออกหนังสือเสนอราคาภายใน 24 ชั่วโมง
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────────────────────── */

function ContactForm({ selectedService }: { selectedService: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", contact: "", service: "", budget: "", detail: "" });

  useEffect(() => {
    if (selectedService) {
      setForm(prev => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

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
            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-400">
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
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-teal-500 to-emerald-500 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(20,184,166,0.4)]">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <label className="block text-xs font-prompt text-white/40 mb-1.5 uppercase tracking-wider">งบประมาณที่คาดหวัง</label>
                <select
                  required
                  className={cn(inputClass, "cursor-pointer")}
                  value={form.budget}
                  onChange={e => setForm(p => ({ ...p, budget: e.target.value }))}
                >
                  <option value="" disabled>เลือกช่วงงบประมาณ...</option>
                  <option value="less-than-3000" className="bg-zinc-900">น้อยกว่า 3,000 บาท</option>
                  <option value="3000-5000" className="bg-zinc-900">3,000 - 5,000 บาท</option>
                  <option value="5000-10000" className="bg-zinc-900">5,000 - 10,000 บาท</option>
                  <option value="more-than-10000" className="bg-zinc-900">10,000 บาทขึ้นไป</option>
                  <option value="undecided" className="bg-zinc-900">ยังไม่แน่ใจ / ต้องการปรึกษาขอบข่ายงานก่อน</option>
                </select>
              </div>
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
                "w-full py-4 rounded-xl bg-linear-to-r from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 text-white font-prompt font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_24px_rgba(20,184,166,0.3)] hover:shadow-[0_0_36px_rgba(20,184,166,0.45)] cursor-pointer",
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

export function OtherServicesSection() {
  const [activeTab, setActiveTab] = useState<Category>("all");
  const [selectedService, setSelectedService] = useState<string>("");
  const [isSpeakerModalOpen, setIsSpeakerModalOpen] = useState<boolean>(false);

  const filtered = SERVICES.filter(
    (s) => activeTab === "all" || s.category === activeTab
  );

  const handleSelectService = (id: string) => {
    if (id === "ai-speaker") {
      setIsSpeakerModalOpen(true);
    } else {
      setSelectedService(id);
    }
  };

  return (
    <section id="other-services" className="w-full relative overflow-hidden py-24 border-t border-white/5 bg-zinc-950/10 scroll-mt-20">

      {/* Speaker Booking Modal */}
      <SpeakerBookingModal
        isOpen={isSpeakerModalOpen}
        onClose={() => setIsSpeakerModalOpen(false)}
      />

      {/* Background glows */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/3" />
      <div className="absolute bottom-1/4 right-[-100px] w-[400px] h-[400px] bg-emerald-500/4 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Speaker Showcase Banner ─────────────────────────────── */}
        <SpeakerHighlightBanner onOpenModal={() => setIsSpeakerModalOpen(true)} />

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-teal-500/30 bg-teal-500/5 text-teal-400 text-sm font-medium"
          >
            <Briefcase className="w-4 h-4" />
            Custom Services — ออกแบบมาเพื่อคุณโดยเฉพาะ
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-prompt text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight"
          >
            บริการพัฒนาเทคโนโลยี
            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 via-emerald-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(20,184,166,0.35)]">
              {" "}และสตูดิโอดนตรีอื่นๆ
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-white/55 font-prompt leading-relaxed max-w-xl mx-auto"
          >
            บริการแบบ Custom ที่ออกแบบมาเพื่อตอบโจทย์เฉพาะของคุณ
            ทั้งการจัดบรรยาย/อบรม AI, ระบบ Automation และงานดนตรีระดับมืออาชีพ
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                  "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-prompt font-medium transition-all duration-250 cursor-pointer",
                  isActive
                    ? "bg-linear-to-r from-teal-600 to-emerald-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.35)]"
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
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={i} 
                onSelectService={handleSelectService}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Contact Form ─────────────────────────────────────────── */}
        <ContactForm selectedService={selectedService} />

      </div>
    </section>
  );
}

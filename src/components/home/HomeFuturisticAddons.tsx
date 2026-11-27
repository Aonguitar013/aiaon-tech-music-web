"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  MoveHorizontal,
  Headphones,
  Play,
  Square,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Database,
  BookOpen,
  Music,
  Gift,
  Palette,
  Volume2,
  Cat,
  Bot,
  Briefcase,
} from "lucide-react";
import { useSiteLang } from "@/components/providers/LanguageProvider";

// =========================================================================
// 1. GUIDED CONCIERGE BAR ("คุณคือใคร?" — Apple Store Guided Style + Editorial Color)
// =========================================================================
type PersonaId = "teacher" | "parent" | "business";

interface ConciergeCard {
  badge: string;
  titleTh: string;
  titleEn: string;
  descTh: string;
  descEn: string;
  priceTh: string;
  priceEn: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  topBar: string;
  cardBg: string;
  iconBox: string;
  badgeStyle: string;
  priceStyle: string;
  ctaStyle: string;
}

const PERSONAS: {
  id: PersonaId;
  emoji: string;
  labelTh: string;
  labelEn: string;
  taglineTh: string;
  taglineEn: string;
  pillActiveBg: string;
  accent: string;
  cards: ConciergeCard[];
}[] = [
  {
    id: "teacher",
    emoji: "👩‍🏫",
    labelTh: "ครูโรงเรียน & บุคลากร",
    labelEn: "Teachers & Schools",
    taglineTh: "ลดงานเอกสารซ้ำซ้อน มีเวลาสอนเด็กและทำผลงาน ว.PA มากขึ้น",
    taglineEn: "Automate school paperwork and reclaim hours for teaching & life",
    pillActiveBg: "bg-linear-to-r from-[#1D4ED8] to-[#0EA5E9]",
    accent: "text-[#1D4ED8] bg-blue-50 border-blue-200",
    cards: [
      {
        badge: "AiAon Tech",
        titleTh: "Digital Vault 20+ ระบบ GAS",
        titleEn: "Digital Vault (20+ GAS Apps)",
        descTh: "แจ้งซ่อม QR Telegram, สุขาภิบาล, เช็กชื่อ, ห้องเรียนสีขาว — จ่ายครั้งเดียวใช้ได้ตลอดชีพ",
        descEn: "QR maintenance, hygiene tracking, attendance & school dashboards — one-time fee.",
        priceTh: "เริ่ม 390 ฿",
        priceEn: "From $12",
        href: "/digital-vault",
        icon: Database,
        topBar: "from-[#2563EB] to-[#38BDF8]",
        cardBg: "from-[#EFF6FF]/85 via-white to-white border-blue-200 hover:border-blue-400",
        iconBox: "bg-blue-100 text-blue-700 border-blue-200",
        badgeStyle: "bg-blue-100 text-blue-800 border-blue-200",
        priceStyle: "text-blue-700",
        ctaStyle: "bg-blue-50 text-blue-800 group-hover:bg-blue-600 group-hover:text-white",
      },
      {
        badge: "Teacher Growth",
        titleTh: "คลัง 30 E-Book นวัตกรรมครูไทย",
        titleEn: "30 Teacher Innovation E-Books",
        descTh: "คู่มือ AI & นวัตกรรมการสอนพร้อมตัวอย่างจริง ครบทุกกลุ่มสาระ",
        descEn: "Practical AI guides, 100 prompts & classroom research templates.",
        priceTh: "ดูทั้งหมด",
        priceEn: "Explore",
        href: "/ebooks",
        icon: BookOpen,
        topBar: "from-[#6366F1] to-[#A78BFA]",
        cardBg: "from-[#EEF2FF]/85 via-white to-white border-indigo-200 hover:border-indigo-400",
        iconBox: "bg-indigo-100 text-indigo-700 border-indigo-200",
        badgeStyle: "bg-indigo-100 text-indigo-800 border-indigo-200",
        priceStyle: "text-indigo-700",
        ctaStyle: "bg-indigo-50 text-indigo-800 group-hover:bg-indigo-600 group-hover:text-white",
      },
      {
        badge: "AiAon Audio",
        titleTh: "BGM คลิป ว.PA ปลอดลิขสิทธิ์ 100%",
        titleEn: "Royalty-Free Classroom BGM",
        descTh: "ดนตรีประกอบคลิปการสอนและเพลงช่วยจำสอบครูผู้ช่วย ใช้ได้ปลอดภัยไม่ติดลิขสิทธิ์",
        descEn: "Copyright-safe background tracks for educational videos & study sessions.",
        priceTh: "เปิดร้านเพลง",
        priceEn: "Music Store",
        href: "/music-store",
        icon: Music,
        topBar: "from-[#0D9488] to-[#2DD4BF]",
        cardBg: "from-[#F0FDFA]/90 via-white to-white border-teal-200 hover:border-teal-400",
        iconBox: "bg-teal-100 text-teal-700 border-teal-200",
        badgeStyle: "bg-teal-100 text-teal-800 border-teal-200",
        priceStyle: "text-teal-700",
        ctaStyle: "bg-teal-50 text-teal-800 group-hover:bg-teal-600 group-hover:text-white",
      },
    ],
  },
  {
    id: "parent",
    emoji: "👨‍👩‍👧",
    labelTh: "คุณพ่อคุณแม่ (ลูก 3–7 ปี)",
    labelEn: "Parents (Ages 3–7)",
    taglineTh: "เปลี่ยนเวลาหน้าจอเป็นกิจกรรมไร้จอ + นิทาน & QR จับเวลาที่ลูกหยิบเล่นเอง",
    taglineEn: "Screen-free printables, watercolor storybooks & ad-free QR apps kids love",
    pillActiveBg: "bg-linear-to-r from-[#E11D48] to-[#F59E0B]",
    accent: "text-[#92400E] bg-amber-50 border-amber-300",
    cards: [
      {
        badge: "FREE 0 ฿",
        titleTh: "ชุดทดลองฟรี 75 หน้า (ครบ 15 เล่ม)",
        titleEn: "75 Free Sample Pages (All 15 Kits)",
        descTh: "ลองปริ้นท์ใบงาน นิทาน ระบายสี และแฟลชการ์ดให้ลูกเล่นก่อนตัดสินใจ ฟรีไม่ต้องสมัคร",
        descEn: "Download 75 printable pages across all 15 kits instantly — $0, no signup.",
        priceTh: "โหลดฟรี 0 ฿",
        priceEn: "Free $0",
        href: "/edu",
        icon: Gift,
        topBar: "from-[#10B981] to-[#34D399]",
        cardBg: "from-[#ECFDF5]/90 via-white to-white border-emerald-200 hover:border-emerald-400",
        iconBox: "bg-emerald-100 text-emerald-700 border-emerald-200",
        badgeStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
        priceStyle: "text-emerald-700",
        ctaStyle: "bg-emerald-50 text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white",
      },
      {
        badge: "NEW • 40 หน้า",
        titleTh: "สมุดระบายสีแก๊ง 6 แมว + เว็บระบายสี",
        titleEn: "6 Cats Coloring Book (40 Bold Pages)",
        descTh: "36 ภาพเส้นหนาขอบชัดสำหรับวัย 3–6 ปี + คำศัพท์ 2 ภาษา + ประโยคพลังใจ SEL",
        descEn: "36 bold & easy pages + bilingual vocabulary + free online coloring studio!",
        priceTh: "49 ฿",
        priceEn: "$2.99",
        href: "/edu/cb01",
        icon: Palette,
        topBar: "from-[#F59E0B] to-[#FB7185]",
        cardBg: "from-[#FEF9EF] via-white to-white border-amber-200 hover:border-amber-400",
        iconBox: "bg-amber-100 text-amber-700 border-amber-200",
        badgeStyle: "bg-amber-100 text-amber-900 border-amber-300",
        priceStyle: "text-amber-700",
        ctaStyle: "bg-amber-100 text-amber-950 group-hover:bg-amber-500 group-hover:text-white",
      },
      {
        badge: "NEW • 48 การ์ด",
        titleTh: "แฟลชการ์ดคำศัพท์ 2 ภาษา + กดฟังเสียง",
        titleEn: "48 Bilingual Audio Flashcards",
        descTh: "48 การ์ดจัมโบ้ตัดเล่น + เว็บการ์ดพลิกฟังเสียง TH/EN และเกมควิซฟรีตลอดชีพ",
        descEn: "48 jumbo cut-out cards + interactive TH/EN audio flip deck & sound quiz!",
        priceTh: "59 ฿",
        priceEn: "$3.49",
        href: "/edu/fc01",
        icon: Volume2,
        topBar: "from-[#0D9488] to-[#38BDF8]",
        cardBg: "from-[#F0FDFA]/90 via-white to-white border-teal-200 hover:border-teal-400",
        iconBox: "bg-teal-100 text-teal-700 border-teal-200",
        badgeStyle: "bg-teal-100 text-teal-900 border-teal-200",
        priceStyle: "text-teal-700",
        ctaStyle: "bg-teal-50 text-teal-900 group-hover:bg-teal-600 group-hover:text-white",
      },
    ],
  },
  {
    id: "business",
    emoji: "🛍️",
    labelTh: "เจ้าของร้าน / แบรนด์ / นักเรียน",
    labelEn: "Brands & Creators",
    taglineTh: "สร้างอัตลักษณ์แบรนด์ให้โดดเด่น และให้ AI ช่วยดูแลลูกค้าแทนคุณ 24 ชม.",
    taglineEn: "Stand out with custom 3D mascots & 24/7 AI chat automation",
    pillActiveBg: "bg-linear-to-r from-[#7C3AED] to-[#EC4899]",
    accent: "text-[#6D28D9] bg-purple-50 border-purple-200",
    cards: [
      {
        badge: "AiAon Studio",
        titleTh: "รับทำสติกเกอร์ LINE 3D จากรูปจริง",
        titleEn: "Custom 3D LINE Stickers",
        descTh: "ส่งรูปเดียวจบ เลือกโพยคำฮิตบนเว็บ ดูแลครบวงจรจนอนุมัติขายบน LINE STORE",
        descEn: "Turn your real photo into a 3D Pixar-style LINE sticker set ready for store.",
        priceTh: "เริ่ม 990 ฿",
        priceEn: "From $29",
        href: "/line-stickers",
        icon: Cat,
        topBar: "from-[#7C3AED] to-[#EC4899]",
        cardBg: "from-[#FAF5FF]/90 via-white to-white border-purple-200 hover:border-purple-400",
        iconBox: "bg-purple-100 text-purple-700 border-purple-200",
        badgeStyle: "bg-purple-100 text-purple-900 border-purple-200",
        priceStyle: "text-purple-700",
        ctaStyle: "bg-purple-50 text-purple-900 group-hover:bg-purple-600 group-hover:text-white",
      },
      {
        badge: "AI Automation",
        titleTh: "AI Caretaker ดูแลร้านค้า 24 ชม.",
        titleEn: "AI Caretaker 24/7 Shop Bot",
        descTh: "บอทตอบแชตอัจฉริยะ ตรวจสลิปอัตโนมัติ และปิดการขายแทนเจ้าของร้านตลอด 24 ชม.",
        descEn: "24/7 smart chat assistant, slip verification & automated order closing.",
        priceTh: "ดูรายละเอียด",
        priceEn: "Learn More",
        href: "/ai-caretaker",
        icon: Bot,
        topBar: "from-[#0284C7] to-[#14B8A6]",
        cardBg: "from-[#F0F9FF]/90 via-white to-white border-sky-200 hover:border-sky-400",
        iconBox: "bg-sky-100 text-sky-700 border-sky-200",
        badgeStyle: "bg-sky-100 text-sky-900 border-sky-200",
        priceStyle: "text-sky-700",
        ctaStyle: "bg-sky-50 text-sky-900 group-hover:bg-sky-600 group-hover:text-white",
      },
      {
        badge: "Custom Build",
        titleTh: "รับทำเว็บ & ระบบเฉพาะทางองค์กร",
        titleEn: "Custom Web & Enterprise Apps",
        descTh: "ออกแบบระบบเว็บแอป แดชบอร์ด หรือพอร์ต TCAS ระดับโปรดักชันโดยครูอ้น",
        descEn: "Bespoke Next.js web apps, dashboards & automation tailored to your workflow.",
        priceTh: "ประเมินราคา",
        priceEn: "Get Quote",
        href: "/services",
        icon: Briefcase,
        topBar: "from-[#F97316] to-[#F59E0B]",
        cardBg: "from-[#FFF7ED]/90 via-white to-white border-orange-200 hover:border-orange-400",
        iconBox: "bg-orange-100 text-orange-700 border-orange-200",
        badgeStyle: "bg-orange-100 text-orange-900 border-orange-200",
        priceStyle: "text-orange-700",
        ctaStyle: "bg-orange-50 text-orange-900 group-hover:bg-orange-600 group-hover:text-white",
      },
    ],
  },
];

export function GuidedConciergeBar() {
  const { lang, t } = useSiteLang();
  const [persona, setPersona] = useState<PersonaId>("parent");
  const active = PERSONAS.find((p) => p.id === persona) ?? PERSONAS[0];

  return (
    <section className="py-14 sm:py-18 bg-linear-to-b from-white via-[#FFFDF9] to-white border-b border-[#E2E8F0]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-7">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#2563EB]">
              <Compass className="w-3.5 h-3.5" />
              <span>{t("SMART CONCIERGE • เลือกตัวตนใน 1 คลิก", "SMART CONCIERGE • GUIDED DISCOVERY")}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {t("วันนี้คุณกำลังมองหาอะไร?", "What brings you to AiAon today?")}
            </h2>
          </div>

          {/* 3 Persona Pills with Colorful Active Gradient */}
          <div className="inline-flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xs">
            {PERSONAS.map((p) => {
              const isSelected = p.id === persona;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPersona(p.id)}
                  className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                    isSelected ? "text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="concierge-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className={`absolute inset-0 rounded-xl shadow-sm ${p.pillActiveBg}`}
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center gap-1.5">
                    <span>{p.emoji}</span>
                    <span>{lang === "en" ? p.labelEn : p.labelTh}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24 }}
            className="space-y-5"
          >
            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold shadow-2xs ${active.accent}`}>
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{lang === "en" ? active.taglineEn : active.taglineTh}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {active.cards.map((c) => {
                const Icon = c.icon;
                return (
                  <Link
                    key={c.titleTh}
                    href={c.href}
                    className={`group relative rounded-3xl border-2 bg-linear-to-br overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${c.cardBg}`}
                  >
                    {/* Vibrant Top Accent Ribbon */}
                    <div className={`h-1.5 w-full bg-linear-to-r ${c.topBar}`} />

                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-5">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 shadow-2xs ${c.iconBox}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-extrabold ${c.badgeStyle}`}>
                              {c.badge}
                            </span>
                            <span className={`text-sm font-black ${c.priceStyle}`}>
                              {lang === "en" ? c.priceEn : c.priceTh}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] leading-snug">
                          {lang === "en" ? c.titleEn : c.titleTh}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                          {lang === "en" ? c.descEn : c.descTh}
                        </p>
                      </div>

                      <div className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-colors ${c.ctaStyle}`}>
                        <span>{t("เข้าไปดูเลย", "Explore Now")}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// =========================================================================
// 2. BEFORE / AFTER INTERACTIVE COMPARISON SLIDER (Bilingual TH/EN)
// =========================================================================
const SCENARIOS = [
  {
    id: "school",
    tabTh: "🏫 งานครู & โรงเรียน",
    tabEn: "🏫 Schools & Teachers",
    activeBg: "bg-linear-to-r from-[#1D4ED8] to-[#0EA5E9] text-white",
    beforeTitleTh: "ก่อนใช้ระบบ AiAon Tech",
    beforeTitleEn: "Before AiAon Automation",
    beforePointsTh: [
      "จดแจ้งซ่อมในแชตไลน์ หล่นหาย ตามงานไม่เจอ",
      "นั่งรวมคะแนน/เช็กชื่อทีละชีต เสียเวลา 6–10 ชม./สัปดาห์",
      "ทำรายงานสรุปผู้บริหารด้วยมือทุกสิ้นเดือน",
    ],
    beforePointsEn: [
      "Maintenance requests buried in endless group chats",
      "Manual spreadsheets eating 6–10 hours every single week",
      "Formatting monthly executive reports by hand",
    ],
    afterTitleTh: "หลังใช้ระบบอัตโนมัติ AiAon",
    afterTitleEn: "After AiAon Automation",
    afterPointsTh: [
      "สแกน QR แจ้งซ่อม เด้งเข้า Telegram พร้อมปุ่มกดปิดงานทันที",
      "แดชบอร์ดสรุปสถานะเรียลไทม์ + คลัง 20+ ระบบพร้อมใช้",
      "กดปุ่มเดียวออกรายงาน PDF ระดับผู้บริหาร คืนเวลา +180 ชม./ปี",
    ],
    afterPointsEn: [
      "QR ticket scan alerts Telegram with 1-tap completion",
      "Real-time visual dashboard + 20+ ready-to-deploy school apps",
      "1-Click executive PDF reports reclaiming +180 hours/year",
    ],
  },
  {
    id: "family",
    tabTh: "🐾 พ่อแม่ & ลูกวัย 3–6 ปี",
    tabEn: "🐾 Parents & Kids (Ages 3–6)",
    activeBg: "bg-linear-to-r from-[#E11D48] to-[#F59E0B] text-white",
    beforeTitleTh: "ก่อนใช้สื่อ AiAon Edu-Verse",
    beforeTitleEn: "Before AiAon Edu-Verse",
    beforePointsTh: [
      "ต้องบ่นซ้ำทุกเช้าเรื่องแปรงฟัน เก็บของเล่น และกิจวัตร",
      "ลูกติดหน้าจอมือถือ/แท็บเล็ต หยุดดูแล้วงอแง",
      "หาซื้อใบงานทั่วไป เจอภาพ AI เพี้ยน โจทย์มั่ว ไม่มีเฉลย",
    ],
    beforePointsEn: [
      "Daily morning battles over brushing teeth & tidying toys",
      "Screen-time meltdowns whenever the tablet turns off",
      "Generic AI-slop printables with broken puzzles & zero guidance",
    ],
    afterTitleTh: "หลังใช้สื่อ Hybrid QR แก๊ง 6 แมว",
    afterTitleEn: "After AiAon Hybrid QR Kits",
    afterPointsTh: [
      "ลูกหยิบตารางดาว & นาฬิกา QR จับเวลาแปรงฟันเล่นเองอย่างสนุก",
      "15 เล่มมาตรฐานครูตัวจริง (ใบงาน + นิทาน 6 เล่ม + ระบายสี + การ์ดเสียง)",
      "มีเว็บแอปไร้โฆษณาคู่กระดาษ + แจกฟรี 75 หน้าให้ลองก่อนซื้อ!",
    ],
    afterPointsEn: [
      "Kids love checking off star jars & racing the 2-min QR brush timer",
      "15 teacher-crafted kits (Workbooks, 6 Storybooks, Coloring & Flashcards)",
      "Ad-free companion web apps + 75 free sample pages to try first!",
    ],
  },
];

export function BeforeAfterComparisonSlider() {
  const { lang, t } = useSiteLang();
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(52);
  const active = SCENARIOS[scenarioIdx];
  const beforePoints = lang === "en" ? active.beforePointsEn : active.beforePointsTh;
  const afterPoints = lang === "en" ? active.afterPointsEn : active.afterPointsTh;

  return (
    <section className="py-14 sm:py-18 bg-[#FAF8F5] border-b border-[#E2E8F0]">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#92400E]">
              <MoveHorizontal className="w-3.5 h-3.5" />
              <span>{t("BEFORE & AFTER • ลองรูดเส้นเปรียบเทียบ", "BEFORE & AFTER • DRAG TO COMPARE")}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              {t("เห็นความต่างของ “Creative Laziness” ใน 2 วินาที", "See the “Creative Laziness” Difference in 2 Seconds")}
            </h2>
          </div>

          <div className="inline-flex rounded-xl bg-white border border-[#E2E8F0] p-1 text-xs font-bold shrink-0 shadow-2xs">
            {SCENARIOS.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setScenarioIdx(idx)}
                className={`px-3.5 py-2 rounded-lg cursor-pointer transition-all ${
                  idx === scenarioIdx
                    ? s.activeBg
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {lang === "en" ? s.tabEn : s.tabTh}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Split Comparison Box */}
        <div className="relative rounded-3xl border-2 border-amber-200/80 bg-white shadow-md overflow-hidden select-none min-h-[290px] sm:min-h-[260px]">
          {/* AFTER LAYER (Full Background — Crisp Modern Emerald/Sky) */}
          <div className="p-6 sm:p-9 bg-linear-to-br from-[#ECFDF5] via-white to-[#EFF6FF] min-h-[290px] sm:min-h-[260px] flex flex-col justify-center">
            <div className="max-w-xl ml-auto space-y-3 text-right">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-300 px-3 py-1 text-xs font-extrabold text-emerald-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>AFTER • {lang === "en" ? active.afterTitleEn : active.afterTitleTh}</span>
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                {afterPoints.map((pt) => (
                  <li key={pt} className="flex items-start justify-end gap-2">
                    <span>{pt}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* BEFORE LAYER (Clipped by Slider Position — Soft Rose/Slate) */}
          <div
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            className="absolute inset-0 p-6 sm:p-9 bg-linear-to-br from-rose-50 via-[#FFF5F5] to-slate-100 flex flex-col justify-center pointer-events-none"
          >
            <div className="max-w-xl space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 border border-rose-300 px-3 py-1 text-xs font-extrabold text-rose-900">
                <AlertCircle className="w-3.5 h-3.5 text-rose-700" />
                <span>BEFORE • {lang === "en" ? active.beforeTitleEn : active.beforeTitleTh}</span>
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                {beforePoints.map((pt) => (
                  <li key={pt} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Vertical Divider Line + Handle */}
          <div
            style={{ left: `${sliderPos}%` }}
            className="pointer-events-none absolute inset-y-0 w-0.5 bg-slate-900 z-20"
          >
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0F172A] text-white border-2 border-white shadow-lg flex items-center justify-center">
              <MoveHorizontal className="w-4 h-4" />
            </div>
          </div>

          {/* Invisible Full-Area Range Input */}
          <input
            type="range"
            min={8}
            max={92}
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            aria-label={t("รูดเทียบก่อนและหลังใช้ AiAon", "Compare before and after AiAon")}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />
        </div>

        <p className="text-center text-xs text-slate-500 font-medium">
          {t("👆 ลากปุ่มตรงกลางไปทางซ้ายหรือขวาเพื่อเปรียบเทียบความต่างได้ทันที", "👆 Drag the center handle left or right to compare instantly")}
        </p>
      </div>
    </section>
  );
}

// =========================================================================
// 3. FLOATING GLASSMORPHISM AMBIENT FOCUS PLAYER (OFF BY DEFAULT)
// =========================================================================
export function FloatingAmbientPlayer() {
  const { t } = useSiteLang();
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAmbient = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setPlaying(false);
  };

  const toggleAmbient = () => {
    if (playing) {
      stopAmbient();
      return;
    }
    try {
      const AudioCtor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!ctxRef.current) ctxRef.current = new AudioCtor();
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      // Warm Lo-Fi Jazz Progression: Cmaj9 -> Am9 -> Fmaj9 -> G13
      const chords = [
        [261.63, 329.63, 392.0, 493.88],
        [220.0, 261.63, 329.63, 392.0],
        [174.61, 220.0, 261.63, 329.63],
        [196.0, 246.94, 293.66, 349.23],
      ];
      let idx = 0;

      const playChord = () => {
        const now = ctx.currentTime;
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(950, now);
        filter.connect(ctx.destination);

        chords[idx % chords.length].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + i * 0.04);
          g.gain.setValueAtTime(0.001, now + i * 0.04);
          g.gain.linearRampToValueAtTime(0.032, now + i * 0.04 + 0.35);
          g.gain.exponentialRampToValueAtTime(0.0008, now + 2.5);
          osc.connect(g);
          g.connect(filter);
          osc.start(now + i * 0.04);
          osc.stop(now + 2.6);
        });
        idx += 1;
      };

      setPlaying(true);
      playChord();
      intervalRef.current = setInterval(playChord, 2650);
    } catch {
      setPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="fixed bottom-20 md:bottom-5 right-4 sm:right-5 z-40">
      <button
        type="button"
        onClick={toggleAmbient}
        className={`group inline-flex items-center gap-2.5 rounded-full px-3.5 py-2 backdrop-blur-md border shadow-lg transition-all cursor-pointer ${
          playing
            ? "bg-[#0F172A]/95 border-teal-400/60 text-white"
            : "bg-white/90 hover:bg-white border-slate-200 text-slate-800"
        }`}
        aria-label="Toggle AiAon Focus Lo-Fi ambient music"
      >
        <span
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
            playing ? "bg-teal-500 text-slate-950" : "bg-slate-100 text-slate-700"
          }`}
        >
          {playing ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
        </span>

        <div className="text-left leading-tight pr-1">
          <div className="text-[11px] font-extrabold flex items-center gap-1.5">
            <Headphones className="w-3 h-3 text-teal-500" />
            <span>AiAon Focus Lo-Fi</span>
          </div>
          <div className={`text-[10px] font-medium ${playing ? "text-teal-300" : "text-slate-500"}`}>
            {playing ? t("กำลังเล่นเสียงชิลล์...", "Playing Focus Beat...") : t("กดฟังเพลงขณะชมเว็บ", "Play Focus Lo-Fi")}
          </div>
        </div>

        {playing && (
          <span className="flex items-end gap-0.5 h-3.5 pr-1">
            <span className="w-0.5 h-2 bg-teal-400 rounded-full animate-pulse" />
            <span className="w-0.5 h-3.5 bg-cyan-300 rounded-full animate-bounce" />
            <span className="w-0.5 h-2.5 bg-teal-400 rounded-full animate-pulse" />
          </span>
        )}
      </button>
    </div>
  );
}

// =========================================================================
// 4. MAGNETIC SHIMMER CTA BUTTON (Flagship Micro-Interaction)
// =========================================================================
export function MagneticShimmerButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.14;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.18;
    setOffset({
      x: Math.max(-7, Math.min(7, dx)),
      y: Math.max(-5, Math.min(5, dy)),
    });
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className={`group relative overflow-hidden ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg]" />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </a>
  );
}

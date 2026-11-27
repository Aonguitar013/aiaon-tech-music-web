"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  ShieldCheck,
  Zap,
  Sparkles,
  Home,
  School,
  Download,
  Gift,
  Play,
  Sliders,
  Headphones,
  ExternalLink,
} from "lucide-react";
import { useSiteLang } from "@/components/providers/LanguageProvider";
import { CountUpMetric } from "@/components/home/HomeInteractiveWidgets";

interface BrandSlideMeta {
  id: "tech" | "edu" | "audio" | "studio";
  logo: string;
  logoAlt: string;
  shortName: string;
  bgGradient: string;
  borderTint: string;
  progressBar: string;
  tabRing: string;
}

const SLIDES: BrandSlideMeta[] = [
  {
    id: "tech",
    logo: "/brand/svg/aiaon-tech_lockup_horizontal_fullcolor-on-light.svg",
    logoAlt: "AiAon Tech",
    shortName: "AiAon Tech",
    bgGradient: "from-[#F8FAFF] via-white to-[#EFF6FF]/90",
    borderTint: "border-blue-200/80",
    progressBar: "bg-linear-to-r from-[#2563EB] to-[#0EA5E9]",
    tabRing: "border-blue-400 bg-blue-50/80 shadow-blue-500/10",
  },
  {
    id: "edu",
    logo: "/brand/svg/aiaon-edu_lockup_horizontal_fullcolor-on-light.svg",
    logoAlt: "AiAon Edu-Verse by AiAon Tech",
    shortName: "Edu-Verse",
    bgGradient: "from-[#FEF9EF] via-white to-[#FFF1F2]/90",
    borderTint: "border-amber-200/90",
    progressBar: "bg-linear-to-r from-[#E11D48] to-[#F59E0B]",
    tabRing: "border-amber-400 bg-amber-50/80 shadow-amber-500/10",
  },
  {
    id: "audio",
    logo: "/brand/svg/aiaon-audio_lockup_horizontal_fullcolor-on-light.svg",
    logoAlt: "AiAon Audio by AiAon Tech",
    shortName: "AiAon Audio",
    bgGradient: "from-[#FFF7ED] via-white to-[#FEF3C7]/70",
    borderTint: "border-orange-200/90",
    progressBar: "bg-linear-to-r from-[#EA580C] to-[#F59E0B]",
    tabRing: "border-orange-400 bg-orange-50/80 shadow-orange-500/10",
  },
  {
    id: "studio",
    logo: "/brand/svg/aiaon-studio_lockup_horizontal_fullcolor-on-light.svg",
    logoAlt: "AiAon Studio by AiAon Tech",
    shortName: "AiAon Studio",
    bgGradient: "from-[#FAF5FF] via-white to-[#FDF2F8]/90",
    borderTint: "border-purple-200/90",
    progressBar: "bg-linear-to-r from-[#7C3AED] to-[#EC4899]",
    tabRing: "border-purple-400 bg-purple-50/80 shadow-purple-500/10",
  },
];

const SLIDE_DURATION_MS = 6500;

export function HomeBrandHeroSlider() {
  const { t } = useSiteLang();
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveIdx((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [paused, activeIdx]);

  const current = SLIDES[activeIdx];

  const goPrev = () => setActiveIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const goNext = () => setActiveIdx((i) => (i + 1) % SLIDES.length);

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`relative pt-6 pb-10 sm:pt-8 sm:pb-14 border-b border-[#E2E8F0] bg-linear-to-br ${current.bgGradient} transition-colors duration-700`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6">
        {/* ============================================================
            TOP INTERACTIVE SUB-BRAND LOGO DOCK (4 REAL BRAND LOGOS!)
        ============================================================ */}
        <div className="flex items-center justify-between gap-3">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 flex-1">
            {SLIDES.map((s, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`relative overflow-hidden rounded-2xl border-2 px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-center transition-all cursor-pointer ${
                    isActive
                      ? `${s.tabRing} shadow-md scale-[1.01]`
                      : "border-[#E2E8F0] bg-white/85 hover:bg-white hover:border-slate-300 opacity-75 hover:opacity-100"
                  }`}
                >
                  <img
                    src={s.logo}
                    alt={s.logoAlt}
                    className="h-6 sm:h-7 w-auto object-contain"
                  />
                  {/* Auto-Play Progress Line at Bottom of Active Tab */}
                  {isActive && (
                    <motion.div
                      key={`bar-${s.id}-${paused ? "p" : "r"}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: paused ? 1 : 1 }}
                      transition={{
                        duration: paused ? 0.2 : SLIDE_DURATION_MS / 1000,
                        ease: "linear",
                      }}
                      className={`absolute bottom-0 left-0 right-0 h-1 origin-left ${s.progressBar}`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Prev / Next Controls (Desktop) */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous brand slide"
              className="w-10 h-10 rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-2xs cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next brand slide"
              className="w-10 h-10 rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-2xs cursor-pointer transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ============================================================
            MAIN CINEMA SLIDE STAGE (MATCHING ALL 4 BRAND HERO DESIGNS)
        ============================================================ */}
        <div
          className={`relative rounded-3xl border-2 ${current.borderTint} bg-white/75 backdrop-blur-sm shadow-lg shadow-slate-900/5 overflow-hidden`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="p-6 sm:p-9 lg:p-11"
            >
              {/* ------------------------------------------------------
                  SLIDE 1: AIAON TECH (Cobalt Blue + Dashboard Card)
              ------------------------------------------------------ */}
              {current.id === "tech" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <img
                        src="/brand/svg/aiaon-tech_lockup_horizontal_fullcolor-on-light.svg"
                        alt="AiAon Tech"
                        className="h-9 sm:h-11 w-auto"
                      />
                      <span className="rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-mono font-bold text-blue-700">
                        DIGITAL VAULT • 20+ SYSTEMS
                      </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-[#0F172A] leading-[1.16] tracking-tight">
                      {t("คลังระบบโรงเรียนอัตโนมัติ", "Automated School Systems")}{" "}
                      <span className="text-[#2563EB]">
                        {t("พร้อมติดตั้งใน 3 นาที", "Ready in 3 Minutes")}
                      </span>
                    </h1>

                    <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl">
                      {t(
                        "รวบรวมซอร์สโค้ด Google Apps Script ที่ผ่านสนามจริงกับนักเรียนกว่า 4,000 คน รันบน Google Workspace ของโรงเรียนเอง 100% ปลอดภัยตาม PDPA และไม่มีค่ารายเดือนตลอดชีพ",
                        "Field-tested Google Apps Script systems used by 4,000+ students. Runs 100% on your own Google Workspace — PDPA-safe with zero monthly fees."
                      )}
                    </p>

                    <div className="flex flex-wrap gap-2.5">
                      {[
                        { icon: Clock, text: t("ลดภาระงาน 20+ ชม./เดือน", "Save 20+ hrs/mo"), color: "text-blue-600" },
                        { icon: ShieldCheck, text: t("ข้อมูลอยู่บน Drive ตัวเอง", "100% On Your Drive"), color: "text-emerald-600" },
                        { icon: Zap, text: t("จ่ายครั้งเดียว ใช้ตลอดชีพ", "One-Time Lifetime Fee"), color: "text-amber-600" },
                      ].map((pill) => {
                        const Icon = pill.icon;
                        return (
                          <span
                            key={pill.text}
                            className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-2xs"
                          >
                            <Icon className={`w-3.5 h-3.5 ${pill.color}`} />
                            <span>{pill.text}</span>
                          </span>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap gap-3 pt-1">
                      <Link
                        href="/digital-vault"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01]"
                      >
                        <span>{t("เลือกดูระบบทั้งหมด (20+)", "Explore All 20+ Systems")}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href="/bundles"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-amber-50 border-2 border-amber-200 px-6 py-3.5 text-sm sm:text-base font-bold text-[#0F172A] transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>{t("เหมา 20 ระบบตลอดชีพ (4,990 ฿)", "All-20 Lifetime Bundle")}</span>
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <Link
                      href="/digital-vault"
                      className="block rounded-3xl border border-slate-200 bg-white p-3.5 shadow-lg hover:shadow-xl transition-all group"
                    >
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
                        <Image
                          src="/brand/visuals/hero_aiaon_tech.webp"
                          alt="AiAon Tech School Automation Dashboard"
                          fill
                          priority
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          sizes="(max-width: 1024px) 100vw, 500px"
                        />
                      </div>
                      <div className="mt-3.5 px-1.5 flex items-center justify-between gap-2">
                        <div>
                          <div className="text-[10px] font-mono font-extrabold text-blue-600 uppercase tracking-wider">
                            FIELD-TESTED ARCHITECTURE
                          </div>
                          <div className="text-sm font-extrabold text-[#0F172A]">
                            Web App + Google Sheets + Telegram 2 ทาง
                          </div>
                        </div>
                        <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-extrabold text-emerald-700 shrink-0">
                          {t("0 ฿/เดือน", "$0/mo")}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------
                  SLIDE 2: AIAON EDU-VERSE (Warm Cream + 6 Cats Squad)
              ------------------------------------------------------ */}
              {current.id === "edu" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <img
                        src="/brand/svg/aiaon-edu_lockup_horizontal_fullcolor-on-light.svg"
                        alt="AiAon Edu-Verse"
                        className="h-9 sm:h-11 w-auto"
                      />
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-900">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>{t("สื่อเด็กเล็ก 3–7 ปี (LV1 & LV2) มาตรฐานครูตัวจริง", "Teacher-Crafted Preschool Kits (Ages 3–7)")}</span>
                      </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-[#0F172A] leading-[1.16] tracking-tight">
                      {t("เลิกบ่นซ้ำทุกเช้า!", "Stop Nagging Every Morning!")}{" "}
                      <span className="text-rose-600">
                        {t("สื่อกิจกรรมไร้จอ + QR จับเวลา", "Screen-Free Kits + Hybrid QR")}
                      </span>{" "}
                      {t("ที่ลูกหยิบเล่นเองได้ทุกวัน", "Kids Love Daily")}
                    </h1>

                    <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl">
                      {t(
                        "เปลี่ยนเวลาหน้าจอมือถือให้เป็นการเรียนรู้บนกระดาษที่ลูกสนุกจริง — ครบทั้ง ฝึกสมอง EF, ตารางวินัย 30 วัน, Busy Book, นิทานภาพ 6 เล่ม, สมุดระบายสี 40 หน้า & แฟลชการ์ด 48 ใบ โดยแก๊ง 6 แมว ได้ครบ TH/EN + สีและขาวดำทุกชุด",
                        "15 joyful printable kits starring The 6 Cats Squad: Workbooks, 6 Watercolor Storybooks, 40-Page Coloring Book & 48 Audio Flashcards — all bilingual TH/EN with ad-free companion web apps!"
                      )}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-1">
                      <Link
                        href="/edu"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-600 hover:bg-rose-700 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-md shadow-rose-500/20 transition-all hover:scale-[1.01]"
                      >
                        <Home className="w-4 h-4" />
                        <span>{t("สำหรับคุณพ่อคุณแม่ (Home • เริ่ม 49฿)", "For Parents (Home • From $2.99)")}</span>
                      </Link>
                      <Link
                        href="/edu#catalog"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-sky-50 border-2 border-sky-300 px-6 py-3.5 text-sm sm:text-base font-bold text-[#0F172A] transition-colors"
                      >
                        <School className="w-4 h-4 text-sky-700" />
                        <span>{t("สำหรับคุณครูอนุบาล (Class • ปริ้นท์ไม่อั้น)", "For Teachers (Unlimited Class Prints)")}</span>
                      </Link>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-bold">
                      <Link
                        href="/edu"
                        className="inline-flex items-center gap-1.5 text-amber-800 hover:text-amber-950 underline underline-offset-4"
                      >
                        <Download className="w-4 h-4 text-amber-600" />
                        <span>{t("ทดลองโหลดฟรีครบ 15 เล่ม รวม 75 หน้า (0 ฿ ไม่ต้องสมัคร)", "Download 75 Free Sample Pages (All 15 Kits • $0)")}</span>
                      </Link>
                      <Link
                        href="/edu#mega-bundle"
                        className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-900 underline underline-offset-4"
                      >
                        <Gift className="w-4 h-4 text-emerald-600" />
                        <span>{t("โปรเหมาสุดคุ้ม 249฿ / Boxset นิทาน 349฿ / 449฿", "Save Up to 35% With Mega Bundles")}</span>
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <Link
                      href="/edu"
                      className="block rounded-3xl border-2 border-amber-200 bg-white p-3 shadow-lg hover:shadow-xl transition-all group"
                    >
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FEF9EF]">
                        <Image
                          src="/edu/hero-banner-6cats.webp"
                          alt="AiAon Edu-Verse 6 Cats Squad"
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          sizes="(max-width: 1024px) 100vw, 500px"
                        />
                      </div>
                      <div className="mt-3 px-2 flex items-center justify-between gap-2 text-xs">
                        <span className="font-extrabold text-slate-800">
                          👑 {t("15 เล่ม Live (ใบงาน 7 + นิทาน 6 + ระบายสี + การ์ด!)", "15 Live Kits (Workbooks + Storybooks + Coloring!)")}
                        </span>
                        <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 font-extrabold text-emerald-800 shrink-0">
                          {t("ฟรี 75 หน้า!", "75 Free Pgs!")}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------
                  SLIDE 3: AIAON AUDIO (Warm Orange Studio + Turntable Deck)
              ------------------------------------------------------ */}
              {current.id === "audio" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <img
                        src="/brand/svg/aiaon-audio_lockup_horizontal_fullcolor-on-light.svg"
                        alt="AiAon Audio"
                        className="h-9 sm:h-11 w-auto"
                      />
                      <span className="rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-mono font-bold text-orange-800">
                        CUBASE 12 STUDIO • 100% ROYALTY-FREE
                      </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-[#0F172A] leading-[1.16] tracking-tight">
                      {t("เพลงช่วยจำติดหู &", "Catchy Study Songs &")}{" "}
                      <span className="text-[#EA580C]">
                        {t("BGM คลิป ว.PA ปลอดลิขสิทธิ์", "Royalty-Free BGM")}
                      </span>
                    </h1>

                    <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl">
                      {t(
                        "บันทึกเสียงและมิกซ์มาสเตอร์จริงบน Steinberg Cubase 12 โดยครูอ้น (ครูดนตรีสากล ค.ศ.2 รร.หาดใหญ่วิทยาลัย) ออกแบบย่านความถี่หลบเสียงพูดครูโดยเฉพาะ ใส่คลิปส่ง ว.PA ลง YouTube / TikTok ได้สบายใจไม่โดนเคลมเสียง",
                        "Recorded and mastered in Steinberg Cubase 12 by a real music educator. Frequency-carved specifically for clear voiceovers — safe for YouTube, TikTok & classrooms."
                      )}
                    </p>

                    <div className="flex flex-wrap gap-2.5">
                      {[
                        { icon: ShieldCheck, text: t("มีใบรับรองลิขสิทธิ์ 100%", "100% Royalty-Free License"), color: "text-emerald-600" },
                        { icon: Sliders, text: t("มิกซ์หลบเสียงพูดครู", "Voiceover-Safe Mix"), color: "text-blue-600" },
                        { icon: Headphones, text: t("กดฟังตัวอย่างสดได้ทุกชุด", "Instant Web Previews"), color: "text-orange-600" },
                      ].map((pill) => {
                        const Icon = pill.icon;
                        return (
                          <span
                            key={pill.text}
                            className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-2xs"
                          >
                            <Icon className={`w-3.5 h-3.5 ${pill.color}`} />
                            <span>{pill.text}</span>
                          </span>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap gap-3 pt-1">
                      <Link
                        href="/music-store"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#EA580C] hover:bg-[#C2410C] px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:scale-[1.01]"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>{t("ทดลองฟังแทร็กทั้งหมด", "Preview All Audio Tracks")}</span>
                      </Link>
                      <Link
                        href="/music-store"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-orange-50 border-2 border-orange-200 px-6 py-3.5 text-sm sm:text-base font-bold text-[#0F172A] transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-orange-500" />
                        <span>{t("เหมาคลังเพลงทั้งหมด 590 ฿", "Complete Audio Pack ($19)")}</span>
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <Link
                      href="/music-store"
                      className="block rounded-3xl border border-orange-200/80 bg-white p-4 shadow-lg hover:shadow-xl transition-all group"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-500 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-slate-800">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          STUDIO TURNTABLE DECK
                        </span>
                        <span>MUS-01 • 105–120 BPM</span>
                      </div>
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#FEF9EF]">
                        <Image
                          src="/brand/visuals/hero_aiaon_audio.webp"
                          alt="AiAon Audio Studio Turntable"
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          sizes="(max-width: 1024px) 100vw, 500px"
                        />
                      </div>
                      <div className="mt-3.5 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm font-extrabold text-[#0F172A] truncate">
                            {t("อัลบั้มเต็ม Vol.1: เพลงช่วยจำกฎหมายครู & BGM", "Vol.1 Study Songs & Classroom BGM")}
                          </div>
                          <div className="text-xs text-slate-500">
                            10 Tracks • MP3 320kbps / WAV 24-bit
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0F172A] px-4 py-2 text-xs font-bold text-white shrink-0">
                          <Play className="w-3 h-3 fill-white" />
                          <span>{t("กดฟังสด", "Listen")}</span>
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------
                  SLIDE 4: AIAON STUDIO (Violet-Pink + 4 3D Cat Cards Grid!)
              ------------------------------------------------------ */}
              {current.id === "studio" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <img
                        src="/brand/svg/aiaon-studio_lockup_horizontal_fullcolor-on-light.svg"
                        alt="AiAon Studio"
                        className="h-9 sm:h-11 w-auto"
                      />
                      <span className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1 text-xs font-mono font-bold text-purple-800">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        <span>30+ LINE STORE ON SALE</span>
                      </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-[#0F172A] leading-[1.16] tracking-tight">
                      {t("เปลี่ยนรูปถ่ายของคุณ เป็น", "Turn Your Photo Into")}{" "}
                      <span className="text-transparent bg-clip-text bg-linear-to-r from-[#7C3AED] to-[#EC4899]">
                        {t("สติกเกอร์ LINE 3D สุดน่ารัก", "Custom 3D LINE Stickers")}
                      </span>
                    </h1>

                    <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl">
                      {t(
                        "ปั้นคาแรกเตอร์ 3D จากรูปถ่ายจริง รองรับทุกสายอาชีพ ทั้ง คุณครู • ออฟฟิศ • ร้านค้า • คู่รัก • ลูกน้อย • สัตว์เลี้ยง ดูแลครบจนอนุมัติขึ้น LINE STORE พร้อมแถมไฟล์ PNG พื้นใสแต่งปกร้านฟรี!",
                        "Pixar-style 3D character sets crafted from your real photo for teachers, brands, couples, kids & pets — handled end-to-end until approved on LINE STORE + transparent PNGs!"
                      )}
                    </p>

                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { step: "STEP 01", title: t("ส่งรูปถ่าย 1 ใบ", "Send 1 Photo"), bg: "bg-purple-50 border-purple-200 text-purple-900" },
                        { step: "STEP 02", title: t("จิ้มโพยคำพูดฮิต", "Pick Phrases"), bg: "bg-pink-50 border-pink-200 text-pink-900" },
                        { step: "STEP 03", title: t("รอรับ Gift ใน LINE", "Get LINE Gift"), bg: "bg-emerald-50 border-emerald-200 text-emerald-900" },
                      ].map((st) => (
                        <div key={st.step} className={`rounded-2xl border p-3 text-center ${st.bg}`}>
                          <div className="text-[10px] font-mono font-bold opacity-70">{st.step}</div>
                          <div className="text-xs sm:text-sm font-extrabold mt-0.5">{st.title}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 pt-1">
                      <Link
                        href="/line-stickers"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#06C755] hover:bg-[#05b34c] px-7 py-3.5 text-sm sm:text-base font-extrabold text-[#052E16] shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.01]"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>{t("กรอกบรีฟสั่งทำทันที (เริ่ม 990 ฿)", "Order Custom 3D Set ($29+)")}</span>
                      </Link>
                      <Link
                        href="/line-stickers"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-purple-50 border-2 border-purple-200 px-6 py-3.5 text-sm sm:text-base font-bold text-[#0F172A] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-purple-600" />
                        <span>{t("ดูของจริงบน LINE STORE", "View 30+ Live Sets")}</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right: 2x2 3D Mascot Cards Grid (Matching Screenshot #4!) */}
                  <div className="lg:col-span-5">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { img: "/edu/shabu-3d.webp", name: t("น้องชาบู 3D", "Shabu 3D"), sub: "Sticker • Emoji • Theme", border: "border-purple-200 bg-purple-50/40" },
                        { img: "/edu/salmon-3d.webp", name: t("น้องแซลมอน 3D", "Salmon 3D"), sub: "3D Plush Vinyl", border: "border-amber-200 bg-amber-50/40" },
                        { img: "/edu/khaotom-3d.webp", name: t("น้องข้าวต้ม 3D", "Khao Tom 3D"), sub: "On Sale • LINE Store", border: "border-pink-200 bg-pink-50/40" },
                        { img: "/edu/bob-3d.webp", name: t("น้องบ๊อบ 3D", "Explorer Bob 3D"), sub: "Custom Character", border: "border-teal-200 bg-teal-50/40" },
                      ].map((m) => (
                        <Link
                          key={m.name}
                          href="/line-stickers"
                          className={`group rounded-2xl border-2 ${m.border} p-3 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all`}
                        >
                          <div className="relative aspect-square rounded-xl bg-white overflow-hidden">
                            <Image
                              src={m.img}
                              alt={m.name}
                              fill
                              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                              sizes="200px"
                            />
                          </div>
                          <div className="mt-2 text-xs sm:text-sm font-extrabold text-[#0F172A]">{m.name}</div>
                          <div className="text-[10px] font-semibold text-slate-500">{m.sub}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ============================================================
            BOTTOM VERIFIED METRICS STRIP (COUNT-UP)
        ============================================================ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl bg-white/85 backdrop-blur-xs border border-[#E2E8F0] px-5 py-4 shadow-2xs">
          <CountUpMetric target={20} suffix="+" label={t("ระบบโรงเรียน GAS", "School GAS Systems")} />
          <CountUpMetric target={15} suffix={t(" เล่ม", " Kits")} label={t("Edu-Verse (ฟรี 75 หน้า)", "Edu-Verse (75 Free Pgs)")} />
          <CountUpMetric target={30} suffix="+" label={t("LINE Store On Sale", "LINE Store Releases")} />
          <CountUpMetric target={4000} suffix="+" label={t("นร.ใช้งานจริง", "Active Students")} />
        </div>
      </div>
    </section>
  );
}

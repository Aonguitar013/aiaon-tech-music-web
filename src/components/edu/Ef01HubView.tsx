"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Download,
  CheckCircle2,
  Star,
  Home,
  School,
  Music,
  ChevronLeft,
  ChevronRight,
  X,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Printer,
  ArrowRight,
  Clock,
  Award,
} from "lucide-react";
import { FaLine } from "react-icons/fa6";
import {
  playApplauseAndFanfare,
  playSoftTick,
  playStarPop,
  playStartChime,
} from "@/lib/eduAudio";
import { type EduLang, getEduOrderLineUrl } from "@/lib/eduCatalog";

interface MissionItem {
  id: number;
  icon: string;
  titleTh: string;
  titleEn: string;
  descTh: string;
  descEn: string;
}

const EF_MISSIONS: MissionItem[] = [
  {
    id: 1,
    icon: "🔍",
    titleTh: "ด่าน 1: ดวงตานักสืบ",
    titleEn: "Mission 1: Detective Eyes",
    descTh: "จับคู่เงาแก๊งแมว หาจุดต่าง และภาพเหมือน",
    descEn: "Shadow matching, spot-the-difference & visual focus",
  },
  {
    id: 2,
    icon: "🧠",
    titleTh: "ด่าน 2: จำแม่น & ยับยั้งใจ",
    titleEn: "Mission 2: Memory & Inhibition",
    descTh: "เกมกติกากลับด้าน Go/No-Go และลอกพิกัดกริด",
    descEn: "Go/No-Go traffic rules, I Spy bar chart & grid copy",
  },
  {
    id: 3,
    icon: "🧩",
    titleTh: "ด่าน 3: ถอดรหัสแบบรูป",
    titleEn: "Mission 3: Pattern Decoder",
    descTh: "อนุกรม ABAB / ABC และเรียงลำดับเหตุการณ์",
    descEn: "ABAB/AABB/ABC patterns, size & story sequencing",
  },
  {
    id: 4,
    icon: "🗺️",
    titleTh: "ด่าน 4: นักวางแผน & โค้ดดิ้ง",
    titleEn: "Mission 4: Unplugged Coding",
    descTh: "เขาวงกต 3 ระดับ และเดินตามลูกศรพิกัดไร้จอ",
    descEn: "3-level mazes & screen-free arrow coding paths",
  },
  {
    id: 5,
    icon: "🏆",
    titleTh: "ด่าน 5: ยอดนักคิด ซูโดกุ",
    titleEn: "Mission 5: Logic & Sudoku",
    descTh: "ซูโดกุภาพ 4×4 และตารางเมทริกซ์เตรียม ป.1",
    descEn: "4×4 picture Sudoku & 2-rule matrix reasoning",
  },
];

const GALLERY_IMAGES = [
  {
    src: "/edu/ef01/mockup-01-cover.webp",
    labelTh: "ปกหน้า & จุดเด่น 32 หน้า",
    labelEn: "Front Cover & 32-Page Highlights",
  },
  {
    src: "/edu/ef01/mockup-02-missions.webp",
    labelTh: "ตัวอย่างครบ 5 ด่านฝึก EF",
    labelEn: "Inside All 5 EF Missions",
  },
  {
    src: "/edu/ef01/mockup-03-color-bw.webp",
    labelTh: "ได้ทั้งเวอร์ชันสี + ขาวดำประหยัดหมึก",
    labelEn: "Full Color + Ink-Friendly B&W Included",
  },
  {
    src: "/edu/ef01/mockup-04-editions.webp",
    labelTh: "เทียบสิทธิ์ Home vs Class Edition",
    labelEn: "Home vs Class Edition Comparison",
  },
  {
    src: "/edu/ef01/mockup-05-flatlay.webp",
    labelTh: "ภาพปริ้นท์จริงบนโต๊ะเรียน",
    labelEn: "Real Printed Desk Flatlay",
  },
  {
    src: "/edu/ef01/mockup-06-ipad.webp",
    labelTh: "เล่นบนกระดาษคู่ iPad/มือถือ",
    labelEn: "Hybrid Paper + Focus Timer Companion",
  },
];

const PRESETS = [
  { seconds: 180, labelTh: "3 นาที", labelEn: "3 min", tagTh: "วอร์มอัป", tagEn: "Warm-up" },
  { seconds: 300, labelTh: "5 นาที", labelEn: "5 min", tagTh: "มาตรฐาน EF", tagEn: "EF Standard" },
  { seconds: 600, labelTh: "10 นาที", labelEn: "10 min", tagTh: "ภารกิจยาว", tagEn: "Deep Focus" },
];

const CONFETTI_PIECES = [
  { left: "10%", delay: "0s", color: "bg-amber-400" },
  { left: "22%", delay: "0.08s", color: "bg-cyan-400" },
  { left: "34%", delay: "0.14s", color: "bg-pink-400" },
  { left: "48%", delay: "0.04s", color: "bg-emerald-400" },
  { left: "60%", delay: "0.18s", color: "bg-yellow-300" },
  { left: "73%", delay: "0.1s", color: "bg-sky-400" },
  { left: "86%", delay: "0.16s", color: "bg-orange-400" },
];

const STORAGE_KEY = "iaon_edu_ef01_stars_v1";

export function Ef01HubView() {
  const [lang, setLang] = useState<EduLang>("th");
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Focus timer state
  const [durationSec, setDurationSec] = useState(300);
  const [remainingSec, setRemainingSec] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);

  // Mission star tracker (persisted in localStorage)
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);

  // UI feedback states
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const celebrateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMsg(null), 3600);
  };

  // Detect explicit ?lang=en query param (default TH so Thai users on English OS see Thai first)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const qLang = params.get("lang")?.toLowerCase();
      if (qLang === "en" || qLang === "th") {
        setLang(qLang);
      }

      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setCompletedMissions(parsed.filter((n) => typeof n === "number"));
        }
      }
    } catch {
      // Ignore storage errors in private browsing mode
    }
  }, []);

  // Keyboard support for Lightbox modal
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % GALLERY_IMAGES.length
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  const triggerCelebration = (customToast?: string) => {
    setIsCelebrating(true);
    if (soundEnabled) {
      playApplauseAndFanfare();
    }
    if (customToast) {
      showToast(customToast);
    }
    if (celebrateTimerRef.current) clearTimeout(celebrateTimerRef.current);
    celebrateTimerRef.current = setTimeout(() => setIsCelebrating(false), 3200);
  };

  // Countdown interval
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setRemainingSec((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          triggerCelebration(
            lang === "th"
              ? "🎉 ครบเวลาแล้ว! เก่งมากเลยนักสืบตัวน้อย น้องแซลมอนปรบมือให้!"
              : "🎉 Time's up! Amazing focus, little detective! Salmon is cheering for you!"
          );
          return 0;
        }
        if (prev <= 6 && soundEnabled) {
          playSoftTick();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, soundEnabled, lang]);

  const handleSelectPreset = (sec: number) => {
    setIsRunning(false);
    setIsCelebrating(false);
    setDurationSec(sec);
    setRemainingSec(sec);
  };

  const handleStartPause = () => {
    if (remainingSec === 0) {
      setRemainingSec(durationSec);
      setIsRunning(true);
      if (soundEnabled) playStartChime();
      return;
    }
    if (!isRunning) {
      setIsRunning(true);
      if (soundEnabled) playStartChime();
    } else {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsCelebrating(false);
    setRemainingSec(durationSec);
  };

  const toggleMissionStar = (missionId: number) => {
    setCompletedMissions((prev) => {
      const exists = prev.includes(missionId);
      const next = exists
        ? prev.filter((id) => id !== missionId)
        : [...prev, missionId].sort((a, b) => a - b);

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage quota errors
      }

      if (!exists) {
        if (next.length === EF_MISSIONS.length) {
          triggerCelebration(
            lang === "th"
              ? "🏆 ปลดล็อกครบ 5/5 ด่านแล้ว! ยอดนักสืบสมองไวตัวจริง!"
              : "🏆 All 5/5 Missions Complete! True Detective Salmon Champion!"
          );
        } else if (soundEnabled) {
          playStarPop();
        }
      }
      return next;
    });
  };

  const minutes = Math.floor(remainingSec / 60);
  const seconds = remainingSec % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progress = durationSec > 0 ? (durationSec - remainingSec) / durationSec : 0;

  // SVG Ring dimensions
  const ringRadius = 96;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset = ringCircumference * (1 - progress);

  const statusText = (() => {
    if (isCelebrating || remainingSec === 0) {
      return lang === "th"
        ? "🎉 ปิดคดีสำเร็จ! เก่งมากเลยนักสืบตัวน้อย!"
        : "🎉 Case Solved! Fantastic focus, Detective!";
    }
    if (!isRunning && remainingSec === durationSec) {
      return lang === "th"
        ? "วางมือถือไว้ข้างโต๊ะ แล้วเริ่มทำใบงานบนกระดาษกันเลย!"
        : "Set the phone aside and enjoy screen-free worksheet fun!";
    }
    if (!isRunning) {
      return lang === "th"
        ? "พักเบรกชั่วคราว กดปุ่มเริ่มเพื่อลุยต่อได้ทุกเมื่อ"
        : "Paused — tap Resume whenever your child is ready";
    }
    if (remainingSec <= 30) {
      return lang === "th"
        ? "🔥 โค้งสุดท้ายแล้ว! น้องแซลมอนเอาใจช่วยสุดตัว!"
        : "🔥 Final stretch! Detective Salmon is cheering you on!";
    }
    return lang === "th"
      ? "🔎 กำลังใช้พลังสมอง EF... โฟกัสกับกระดาษตรงหน้าเลย!"
      : "🔎 Super EF Focus mode active — keep going on paper!";
  })();

  const faqs =
    lang === "th"
      ? [
          {
            q: "วิธีเล่นแบบไร้หน้าจอ (Screen-Free) ให้ได้ผลดีที่สุด?",
            a: "ให้คุณพ่อคุณแม่ปริ้นท์ใบงานวันละ 2–3 หน้า จากนั้นกดเริ่มจับเวลา 5 นาทีแล้ววางมือถือไว้ขอบโต๊ะ (ไม่ให้เด็กจ้องจอ) พอครบเวลาจะมีเสียงปรบมือและเสียงดนตรีรางวัล เด็กจะภูมิใจและอยากทำต่อทุกวันครับ",
          },
          {
            q: "ซื้อเล่มเต็ม 32 หน้าแล้วได้ไฟล์อะไรบ้าง? ปริ้นท์กระดาษขนาดไหน?",
            a: "ได้ครบ 4 ไฟล์ PDF ความละเอียดสูง (ภาษาไทย สี + ขาวดำประหยัดหมึก และ ภาษาอังกฤษ สี + ขาวดำ) พร้อมหน้าเฉลยครบทุกข้อ 3 หน้า และใบประกาศนียบัตร ออกแบบ Universal Safe Box ปริ้นท์ได้ทั้ง A4 และ US Letter ไม่ตกขอบ 100%",
          },
          {
            q: "Home Edition (99 ฿) กับ Class Edition (199 ฿) ต่างกันอย่างไร?",
            a: "เนื้อหา 32 หน้าและไฟล์ทั้ง 4 แบบเหมือนกันทุกประการ ต่างกันที่สิทธิ์การใช้งาน: Home Edition ใช้ปริ้นท์สอนลูกในครอบครัว ส่วน Class Edition สำหรับคุณครูนำไปปริ้นท์แจกนักเรียนในห้องเรียนได้ไม่จำกัดจำนวนครับ",
          },
        ]
      : [
          {
            q: "How do we use this Focus Timer for screen-free learning?",
            a: "Print 2–3 pages per day, tap Start on the 5-minute timer, and place your phone to the side of the desk. Kids stay 100% focused on paper and get rewarded with Detective Salmon's applause fanfare when time is up!",
          },
          {
            q: "What is included in the Full 32-Page Pack?",
            a: "You receive 4 print-ready PDFs (Thai Color/B&W + English Color/B&W), all 5 EF missions, 3 auto-verified Answer Key pages, and a printable Certificate. Engineered with a Universal Safe Box for both A4 and US Letter printers.",
          },
          {
            q: "What is the difference between Home and Class Edition?",
            a: "Both include the exact same 32-page workbook and 4 PDFs. Home Edition ($4.99 / 99 THB) covers personal family printing, while Class Edition ($9.99 / 199 THB) grants a single-teacher classroom license for unlimited student copies.",
          },
        ];

  return (
    <div className="w-full overflow-x-hidden bg-[#FFFDF7] text-[#1E293B] -mt-4 md:-mt-8 pt-6 md:pt-10 pb-16 border-b border-amber-200/80">
      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="rounded-2xl border-2 border-amber-400 bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white shadow-2xl">
            {toastMsg}
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Top Utility Bar: Breadcrumb + Bilingual Toggle + Audio Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/edu"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-amber-800 hover:border-amber-300 shadow-xs transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>iAon Edu-Verse</span>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-amber-800">EDU-EF01</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundEnabled((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors cursor-pointer"
              aria-label="Toggle Sound"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === "th" ? "เปิดเสียง" : "Sound On"}</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                  <span>{lang === "th" ? "ปิดเสียง" : "Muted"}</span>
                </>
              )}
            </button>

            <div className="inline-flex rounded-full border border-slate-200 bg-white p-0.5 text-xs font-bold shadow-xs">
              <button
                type="button"
                onClick={() => setLang("th")}
                className={`rounded-full px-3 py-1 transition-all cursor-pointer ${
                  lang === "th"
                    ? "bg-amber-400 text-slate-950 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🇹🇭 ไทย
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-full px-3 py-1 transition-all cursor-pointer ${
                  lang === "en"
                    ? "bg-amber-400 text-slate-950 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🇬🇧 EN
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================
            SECTION 1: HERO + HYBRID QR FOCUS TIMER (ABOVE THE FOLD)
        ============================================================ */}
        <section className="relative rounded-3xl border-2 border-amber-200 bg-white p-5 sm:p-8 shadow-lg shadow-amber-900/5 overflow-hidden">
          {/* Confetti overlay during celebration */}
          {isCelebrating && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
              {CONFETTI_PIECES.map((c, idx) => (
                <span
                  key={idx}
                  style={{ left: c.left, animationDelay: c.delay }}
                  className={`absolute top-2 h-3 w-3 rounded-sm ${c.color} animate-bounce opacity-90`}
                />
              ))}
            </div>
          )}

          {/* Subtle warm editorial wash */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-100/70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-sky-100/60 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center min-w-0">
            {/* Left: Timer Ring + Controls */}
            <div className="lg:col-span-7 min-w-0 w-full flex flex-col items-center text-center space-y-5">
              <div className="inline-flex items-center justify-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[11px] sm:text-xs font-bold text-amber-900 max-w-full flex-wrap">
                <Clock className="w-3.5 h-3.5 shrink-0 text-amber-700" />
                <span>
                  {lang === "th"
                    ? "HYBRID QR • นาฬิกาจับเวลาสมาธิไร้หน้าจอ"
                    : "HYBRID QR • SCREEN-FREE FOCUS TIMER"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] leading-tight break-words w-full">
                {lang === "th"
                  ? "นักสืบสมองไวกับน้องแซลมอน"
                  : "Detective Salmon's Focus Timer"}
              </h1>

              {/* Preset Duration Pills */}
              <div className="flex flex-wrap justify-center gap-2 w-full">
                {PRESETS.map((p) => {
                  const active = durationSec === p.seconds;
                  return (
                    <button
                      key={p.seconds}
                      type="button"
                      onClick={() => handleSelectPreset(p.seconds)}
                      className={`rounded-2xl border-2 px-3 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        active
                          ? "border-amber-500 bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25"
                          : "border-slate-200 bg-[#FEF9EF] text-slate-800 hover:border-amber-400 hover:bg-amber-50"
                      }`}
                    >
                      <span>{lang === "th" ? p.labelTh : p.labelEn}</span>
                      <span
                        className={`ml-1 text-[11px] ${
                          active ? "text-slate-900 font-bold" : "text-slate-500"
                        }`}
                      >
                        ({lang === "th" ? p.tagTh : p.tagEn})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Circular Progress Ring + Nong Salmon Avatar */}
              <div className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64 shrink-0">
                <svg
                  className="w-full h-full -rotate-90"
                  viewBox="0 0 220 220"
                  aria-hidden="true"
                >
                  <circle
                    cx="110"
                    cy="110"
                    r={ringRadius}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="12"
                  />
                  <circle
                    cx="110"
                    cy="110"
                    r={ringRadius}
                    fill="none"
                    stroke={isCelebrating ? "#10B981" : "#F59E0B"}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFFDF7] p-1.5 ring-2 ring-amber-400 shadow-md overflow-hidden flex items-center justify-center transition-transform duration-300 ${
                      isCelebrating
                        ? "scale-110 animate-bounce"
                        : isRunning
                          ? "scale-105"
                          : ""
                    }`}
                  >
                    <img
                      src="/edu/salmon-3d.webp"
                      alt="Detective Salmon 3D"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="mt-2 font-mono text-3xl sm:text-4xl font-extrabold tracking-wider text-slate-900 tabular-nums">
                    {formattedTime}
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base font-medium text-slate-700 max-w-md min-h-[1.75rem] px-1 break-words">
                {statusText}
              </p>

              {/* Primary Timer Controls */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 w-full pt-1">
                <button
                  type="button"
                  onClick={handleStartPause}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 hover:bg-amber-500 px-5 py-3 text-sm sm:text-base font-extrabold text-slate-950 shadow-md shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer min-w-[148px]"
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-5 h-5" />
                      <span>{lang === "th" ? "พักชั่วคราว" : "Pause"}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      <span>
                        {remainingSec === 0
                          ? lang === "th"
                            ? "เริ่มรอบใหม่"
                            : "Start Again"
                          : remainingSec < durationSec
                            ? lang === "th"
                              ? "จับเวลาต่อ"
                              : "Resume"
                            : lang === "th"
                              ? "เริ่มจับเวลา"
                              : "Start Focus"}
                      </span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-slate-300 bg-slate-100 hover:bg-slate-200 px-4 py-3 text-sm font-bold text-slate-800 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{lang === "th" ? "รีเซ็ต" : "Reset"}</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    triggerCelebration(
                      lang === "th"
                        ? "👏 เก่งมากเลย! น้องแซลมอนปรบมือให้รางวัล!"
                        : "👏 Bravo! Detective Salmon applauds your awesome work!"
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-emerald-300 bg-emerald-50 hover:bg-emerald-100 px-4 py-3 text-sm sm:text-base font-bold text-emerald-900 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>
                    {lang === "th" ? "👏 กดปรบมือให้รางวัล!" : "👏 Applause Reward!"}
                  </span>
                </button>
              </div>
            </div>

            {/* Right: 5-Mission Interactive Star Tracker */}
            <div className="lg:col-span-5 min-w-0 w-full rounded-2xl border border-amber-200 bg-[#FEF9EF] p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-[#1E293B] flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    <span>
                      {lang === "th" ? "สะสมดาว 5 ด่านนักสืบ" : "5-Mission Star Tracker"}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {lang === "th"
                      ? "ทำใบงานจบแต่ละด่าน แตะรับดาวได้เลย (บันทึกในเครื่องอัตโนมัติ)"
                      : "Tap each mission as your child completes it (saved on this device)"}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-extrabold text-amber-900">
                  {completedMissions.length}/5 ⭐
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${(completedMissions.length / 5) * 100}%` }}
                />
              </div>

              <div className="space-y-2">
                {EF_MISSIONS.map((m) => {
                  const done = completedMissions.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => toggleMissionStar(m.id)}
                      className={`w-full text-left flex items-center gap-3 rounded-xl border p-3 transition-all cursor-pointer ${
                        done
                          ? "border-amber-400 bg-amber-50 shadow-xs"
                          : "border-slate-200 bg-white hover:border-amber-300"
                      }`}
                    >
                      <span className="text-xl shrink-0">{m.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-[#1E293B] truncate">
                          {lang === "th" ? m.titleTh : m.titleEn}
                        </div>
                        <div className="text-xs text-slate-600 truncate">
                          {lang === "th" ? m.descTh : m.descEn}
                        </div>
                      </div>
                      <Star
                        className={`w-5 h-5 shrink-0 transition-transform ${
                          done
                            ? "text-amber-500 fill-amber-400 scale-110"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 2: FREEBIE 5-PAGE LEAD MAGNET (DIRECT 1-CLICK PDF)
        ============================================================ */}
        <section
          id="freebie"
          className="rounded-3xl border-2 border-sky-200 bg-sky-50/75 p-5 sm:p-8 shadow-md shadow-sky-900/5"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 flex justify-center">
              <button
                type="button"
                onClick={() => setLightboxIndex(0)}
                className="group relative rounded-2xl overflow-hidden border-2 border-white shadow-md max-w-[240px] cursor-pointer bg-white"
              >
                <img
                  src="/edu/ef01/mockup-01-cover.webp"
                  alt="EDU-EF01 Freebie Cover Preview"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-2.5 left-2.5 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[11px] font-bold text-white shadow">
                  {lang === "th" ? "แจกฟรี 5 หน้า!" : "FREE 5-PAGE SAMPLE"}
                </span>
              </button>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-sky-300 px-3 py-1 text-xs font-bold text-sky-900">
                <Download className="w-3.5 h-3.5 text-sky-700" />
                <span>
                  {lang === "th"
                    ? "ทดลองปริ้นท์ให้ลูกเล่นฟรีก่อนตัดสินใจ (0 ฿)"
                    : "TRY BEFORE YOU BUY • INSTANT FREE PDF ($0)"}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">
                {lang === "th"
                  ? "ดาวน์โหลดชุดทดลองฟรี 5 หน้า (จับคู่เงาแก๊งแมว + อนุกรม + โค้ดดิ้งไร้จอ)"
                  : "Download the 5-Page Free Sample (Cat Shadows + Patterns + Unplugged Coding)"}
              </h2>

              <p className="text-sm text-slate-700 leading-relaxed">
                {lang === "th"
                  ? "คลิกโหลดไฟล์ PDF ความละเอียดสูงไปปริ้นท์กระดาษ A4 ได้เลยทันที ไม่ต้องสมัครสมาชิก คัด 3 ด่านเด็ดที่เด็ก 4–6 ปีชอบมากที่สุดมาให้ลองเทสความชัดและความสนุกก่อนซื้อเล่มเต็ม 32 หน้าครับ"
                  : "Direct 1-click download — no login required. Print on A4 or US Letter and test our Zero AI-Slop vector quality with your child right away."}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href="/edu/ef01/EDU-EF01_Freebie_5Pages_TH.pdf"
                  download="EDU-EF01_Freebie_5Pages_TH.pdf"
                  onClick={() =>
                    showToast(
                      "📥 กำลังดาวน์โหลดชุดทดลองภาษาไทย (5 หน้า) — ปริ้นท์ A4 แล้วมาจับเวลากันเลย!"
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-700 hover:bg-sky-800 px-5 py-3 text-sm sm:text-base font-bold text-white shadow-md shadow-sky-600/20 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>โหลดฟรี 5 หน้า (ภาษาไทย • PDF)</span>
                </a>

                <a
                  href="/edu/ef01/EDU-EF01_Freebie_5Pages_EN.pdf"
                  download="EDU-EF01_Freebie_5Pages_EN.pdf"
                  onClick={() =>
                    showToast(
                      "📥 Downloading English 5-Page Freebie PDF — ready for A4 & US Letter!"
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-sky-300 bg-white hover:bg-sky-50 px-5 py-3 text-sm sm:text-base font-bold text-sky-900 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Free 5-Page Sample (English • PDF)</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 3: FULL 32-PAGE PREVIEW GALLERY + DUAL-EDITION ORDER
        ============================================================ */}
        <section id="full-pack" className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>
                {lang === "th"
                  ? "ZERO AI-SLOP • ตรวจคำตอบทางคณิตศาสตร์ครบทุกหน้า"
                  : "ZERO AI-SLOP • 100% MATH-VERIFIED PUZZLES"}
              </span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
              {lang === "th"
                ? "ปลดล็อกเล่มเต็ม 32 หน้า (ครบ 4 ไฟล์ TH/EN × สี/ขาวดำ)"
                : "Unlock the Complete 32-Page Pack (4 PDFs: TH/EN × Color/B&W)"}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === "th"
                ? "ซื้อครั้งเดียวปริ้นท์ซ้ำกี่รอบก็ได้ พร้อมเฉลยอัตโนมัติ 3 หน้า (เส้นทางเขาวงกต & ซูโดกุ) และใบประกาศนียบัตรนักสืบ"
                : "One-time purchase, print forever. Includes all 5 EF missions, 3 complete Answer Key pages, and a printable Award Certificate."}
            </p>
          </div>

          {/* 6-Image Interactive Gallery */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {GALLERY_IMAGES.map((img, idx) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden text-left hover:border-amber-400 shadow-xs transition-all cursor-pointer"
              >
                <div className="aspect-square overflow-hidden bg-[#FEF9EF]">
                  <img
                    src={img.src}
                    alt={lang === "th" ? img.labelTh : img.labelEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-2 text-[11px] font-semibold text-slate-700 line-clamp-2">
                  {lang === "th" ? img.labelTh : img.labelEn}
                </div>
              </button>
            ))}
          </div>

          {/* Dual-Edition Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* HOME EDITION */}
            <div className="rounded-3xl border-2 border-amber-300 bg-white p-6 flex flex-col justify-between space-y-6 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-extrabold text-amber-900">
                    <Home className="w-3.5 h-3.5" />
                    <span>HOME EDITION</span>
                  </span>
                  <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-xs font-bold text-emerald-900">
                    {lang === "th" ? "ยอดนิยมสำหรับพ่อแม่" : "Best for Families"}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#1E293B]">
                    {lang === "th"
                      ? "สิทธิ์ใช้ในครอบครัว (Personal Use)"
                      : "Family & Personal License"}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2.5 flex-wrap">
                    <span className="text-4xl font-extrabold text-amber-700">
                      {lang === "th" ? "99 ฿" : "$4.99"}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      {lang === "th" ? "149 ฿" : "$6.99"}
                    </span>
                    <span className="text-xs font-medium text-slate-600">
                      {lang === "th" ? "(จ่ายครั้งเดียว)" : "(99 THB • One-time)"}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm text-slate-700">
                  {(lang === "th"
                    ? [
                        "ใบงาน 32 หน้าเต็ม ครบ 5 ด่าน EF + โค้ดดิ้งไร้จอ + ซูโดกุ 4×4",
                        "ได้ครบทั้ง 4 ไฟล์ PDF: ภาษาไทย (สี/ขาวดำ) + อังกฤษ (สี/ขาวดำ)",
                        "คู่มือพ่อแม่แผนฝึก 10 วัน + เฉลยละเอียด 3 หน้า + ใบประกาศ",
                        "Universal Safe Box ปริ้นท์ได้ทั้ง A4 & US Letter ไม่ตกขอบ",
                      ]
                    : [
                        "Full 32-page workbook across 5 structured EF & logic missions",
                        "All 4 PDFs included: English (Color/B&W) + Thai (Color/B&W)",
                        "10-day parent guide + 3-page Answer Key + Certificate",
                        "Universal Safe Box: prints cleanly on A4 & US Letter",
                      ]
                  ).map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={getEduOrderLineUrl({
                  sku: "EDU-EF01",
                  edition: "HOME",
                  lang,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] px-5 py-3.5 text-base font-bold text-white shadow-md shadow-emerald-500/20 transition-colors"
              >
                <FaLine className="w-5 h-5" />
                <span>
                  {lang === "th"
                    ? "สั่งซื้อ Home Edition (99 ฿) ทาง LINE"
                    : "Order Home Edition ($4.99 / 99 THB) via LINE"}
                </span>
              </a>
            </div>

            {/* CLASS EDITION */}
            <div className="rounded-3xl border-2 border-sky-300 bg-white p-6 flex flex-col justify-between space-y-6 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 border border-sky-300 px-3 py-1 text-xs font-extrabold text-sky-900">
                    <School className="w-3.5 h-3.5" />
                    <span>CLASS EDITION</span>
                  </span>
                  <span className="rounded-full bg-sky-50 border border-sky-200 px-2.5 py-0.5 text-xs font-bold text-sky-800">
                    {lang === "th" ? "สำหรับคุณครู / ศูนย์เด็กเล็ก" : "Teachers & Classrooms"}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#1E293B]">
                    {lang === "th"
                      ? "สิทธิ์คุณครู / ห้องเรียน (Classroom License)"
                      : "Single-Teacher Classroom License"}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2.5 flex-wrap">
                    <span className="text-4xl font-extrabold text-sky-700">
                      {lang === "th" ? "199 ฿" : "$9.99"}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      {lang === "th" ? "299 ฿" : "$14.99"}
                    </span>
                    <span className="text-xs font-medium text-slate-600">
                      {lang === "th" ? "(ปริ้นท์แจกเด็กไม่จำกัด)" : "(199 THB • Unlimited copies)"}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm text-slate-700">
                  {(lang === "th"
                    ? [
                        "สิทธิ์ถูกกฎหมายสำหรับคุณครู 1 ท่าน ปริ้นท์แจกนักเรียนได้ไม่จำกัด",
                        "ได้ครบทั้ง 4 ไฟล์ PDF (TH/EN × สี/ขาวดำ) + เวอร์ชันขาวดำประหยัดหมึกถ่ายเอกสาร",
                        "มีหน้าใบอนุญาตสิทธิ์ห้องเรียน (Classroom License) ชัดเจนทุกหน้า",
                        "เปิดหน้าจอ Focus Timer นี้ขึ้นโปรเจกเตอร์จับเวลาพร้อมกันทั้งห้องได้ทันที",
                      ]
                    : [
                        "Legal Classroom License for 1 teacher — unlimited student prints",
                        "All 4 PDFs (EN/TH × Color/B&W) with ink-saving photocopier mode",
                        "Official Classroom License page & footer attribution included",
                        "Project this Focus Timer on the classroom screen for group rounds",
                      ]
                  ).map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={getEduOrderLineUrl({
                  sku: "EDU-EF01",
                  edition: "CLASS",
                  lang,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-700 hover:bg-sky-800 px-5 py-3.5 text-base font-bold text-white shadow-md shadow-sky-600/20 transition-colors"
              >
                <FaLine className="w-5 h-5 text-white" />
                <span>
                  {lang === "th"
                    ? "สั่งซื้อ Class Edition (199 ฿) ทาง LINE"
                    : "Order Class Edition ($9.99 / 199 THB) via LINE"}
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 4: BUILT-IN CROSS-SELL (RT01 LIVE + MEGA BUNDLE 3 BOOKS)
        ============================================================ */}
        <section className="rounded-3xl border-2 border-rose-200 bg-gradient-to-br from-[#FFF5F5] via-white to-[#FEF9EF] p-5 sm:p-8 shadow-md space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="relative flex items-center justify-center">
                <div className="rounded-full border-2 border-rose-300 bg-[#FFFDF7] p-3 w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center shadow-md overflow-hidden">
                  <img
                    src="/edu/mami-3d.webp"
                    alt="Mama Mami 3D Routine Kit"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="absolute -bottom-3 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-md whitespace-nowrap">
                  EDU-RT01 • {lang === "th" ? "พร้อมใช้งานแล้ว!" : "LIVE NOW!"}
                </span>
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-bold text-rose-900">
                <Music className="w-3.5 h-3.5 text-rose-600" />
                <span>
                  {lang === "th"
                    ? "PAIR & SAVE • ชุดสร้างวินัย 30 วัน + ดนตรีน้องข้าวต้ม"
                    : "PAIR & SAVE • 30-DAY ROUTINE KIT + MUSIC ADVENTURE"}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">
                {lang === "th"
                  ? "ชุดสร้างวินัย & กิจวัตร 30 วันกับแม่ใหญ่ (EDU-RT01) เปิดให้ลองฟรี 5 หน้าแล้ว!"
                  : "Mama Mami's 30-Day Routine Kit (EDU-RT01) — 5-Page Freebie Now Live!"}
              </h2>

              <p className="text-sm text-slate-700 leading-relaxed">
                {lang === "th"
                  ? "ฝึกสมอง EF คู่กับการสร้างวินัยกิจวัตรประจำวัน! ครบ 5-in-1 ทั้งบอร์ดเช้า-เย็น-ก่อนนอน, การ์ดตีนตุ๊กแก 24 ใบ, ขวดโหล 20 ดาว, คูปองรางวัล 8 ใบ และมุมสงบใจ SEL พร้อมจับคู่เหมาครบ 3 เล่มกับน้องข้าวต้มดนตรี (EDU-MU01)"
                  : "Pair Brain EF with calm daily habits! Complete 5-in-1 Routine Boards, 24 Velcro Cards, 20-Star Jar, 8 Reward Coupons & SEL Calm-Down Corner — or grab all 3 books in our Launch Mega Bundle."}
              </p>

              <div className="flex flex-wrap gap-2.5">
                <Link
                  href="/edu/rt01"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors"
                >
                  <span>
                    {lang === "th"
                      ? "ไปลองเล่น EDU-RT01 (แจกฟรี 5 หน้า)"
                      : "Explore EDU-RT01 (Free 5-Page Sample)"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="rounded-2xl border border-amber-300 bg-amber-50 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-extrabold text-amber-900 uppercase tracking-wide">
                    {lang === "th"
                      ? "🔥 Mega Bundle ครบ 3 เล่ม (EF01 + RT01 + MU01)"
                      : "🔥 3-Book Launch Mega Bundle (EF01 + RT01 + MU01)"}
                  </div>
                  <div className="text-sm text-slate-800 font-medium">
                    {lang === "th"
                      ? "รับไฟล์ PDF ครบ 3 เล่ม (96 หน้า) ทันที + ปลดล็อก 6 แทร็กเสียง MU01 ฟรีบนเว็บ เพียง 249 ฿ (จาก 327 ฿)"
                      : "Get all 3 PDFs (96 pages) today + automatic unlock for MU01's 6 audio tracks for only 249 THB ($11.99)"}
                  </div>
                </div>
                <a
                  href={getEduOrderLineUrl({
                    sku: "EDU-EF01",
                    edition: "MEGA_BUNDLE",
                    lang,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-500 px-4 py-2.5 text-sm font-extrabold text-slate-950 shadow-xs transition-colors"
                >
                  <span>
                    {lang === "th" ? "สั่งเหมา 3 เล่ม (249 ฿)" : "Order 3-Pack"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 5: PARENT 30-SECOND GUIDE & FAQ ACCORDION
        ============================================================ */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#1E293B]">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg sm:text-xl font-extrabold">
              {lang === "th"
                ? "คำถามที่พบบ่อย & วิธีใช้งานสำหรับผู้ปกครอง/คุณครู"
                : "Parent & Teacher Quick Guide (FAQ)"}
            </h2>
          </div>

          <div className="divide-y divide-slate-200">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} className="py-3">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-3 text-left text-sm sm:text-base font-bold text-[#1E293B] hover:text-amber-800 transition-colors cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180 text-amber-600" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed pr-6">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 border-t border-slate-200">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Printer className="w-3.5 h-3.5 text-sky-600" />
              <span>
                {lang === "th"
                  ? "รองรับกระดาษ A4 & US Letter • ปลอดภัยไร้โฆษณา 100%"
                  : "A4 & US Letter Ready • 100% Ad-Free Kid Safe"}
              </span>
            </span>
            <Link
              href="/edu"
              className="text-amber-800 hover:underline font-bold"
            >
              {lang === "th" ? "ดูสื่อทั้งหมดใน iAon Edu-Verse →" : "Explore all iAon Edu-Verse →"}
            </Link>
          </div>
        </section>
      </div>

      {/* ============================================================
          LIGHTBOX MODAL FOR 6-IMAGE GALLERY
      ============================================================ */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-3xl w-full rounded-3xl border border-slate-200 bg-white p-3 sm:p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-3 right-3 z-10 rounded-full bg-slate-900/85 border border-white/20 p-2 text-white hover:bg-slate-800 cursor-pointer"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative flex items-center justify-center bg-[#FEF9EF] rounded-2xl p-2">
              <img
                src={GALLERY_IMAGES[lightboxIndex].src}
                alt={
                  lang === "th"
                    ? GALLERY_IMAGES[lightboxIndex].labelTh
                    : GALLERY_IMAGES[lightboxIndex].labelEn
                }
                className="max-h-[75vh] w-auto rounded-xl object-contain"
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-2 px-1">
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + GALLERY_IMAGES.length) %
                      GALLERY_IMAGES.length
                  )
                }
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 px-3 py-2 text-xs sm:text-sm font-bold text-slate-800 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === "th" ? "ก่อนหน้า" : "Prev"}</span>
              </button>

              <div className="text-center text-xs sm:text-sm font-bold text-slate-800">
                {lang === "th"
                  ? GALLERY_IMAGES[lightboxIndex].labelTh
                  : GALLERY_IMAGES[lightboxIndex].labelEn}{" "}
                <span className="text-slate-500">
                  ({lightboxIndex + 1}/{GALLERY_IMAGES.length})
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length)
                }
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 px-3 py-2 text-xs sm:text-sm font-bold text-slate-800 cursor-pointer"
              >
                <span>{lang === "th" ? "ถัดไป" : "Next"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

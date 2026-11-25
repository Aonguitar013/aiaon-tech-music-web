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
  ChevronLeft,
  ChevronRight,
  X,
  HelpCircle,
  ChevronDown,
  Printer,
  ArrowRight,
  Clock,
  Sun,
  Sunset,
  Moon,
  Heart,
  Layers,
  Gift,
} from "lucide-react";
import { FaLine } from "react-icons/fa6";
import {
  playApplauseAndFanfare,
  playSoftTick,
  playStarPop,
  playStartChime,
} from "@/lib/eduAudio";
import { type EduLang, getEduOrderLineUrl } from "@/lib/eduCatalog";

type RoutinePeriod = "morning" | "afternoon" | "bedtime";

interface RoutineTask {
  id: string;
  period: RoutinePeriod;
  icon: string;
  titleTh: string;
  titleEn: string;
  tipTh: string;
  tipEn: string;
}

const ROUTINE_TASKS: RoutineTask[] = [
  // Morning (5 tasks)
  {
    id: "m1",
    period: "morning",
    icon: "🛏️",
    titleTh: "เก็บที่นอน & พับผ้าห่ม",
    titleEn: "Make the Bed",
    tipTh: "เริ่มวันด้วยชัยชนะเล็กๆ แรกของเช้า",
    tipEn: "First small win of the morning",
  },
  {
    id: "m2",
    period: "morning",
    icon: "🪥",
    titleTh: "แปรงฟัน & ล้างหน้า (2 นาที)",
    titleEn: "Brush Teeth & Wash Face (2 min)",
    tipTh: "กดจับเวลา 2 นาทีด้านซ้ายได้เลย!",
    tipEn: "Tap the 2-min preset on the timer!",
  },
  {
    id: "m3",
    period: "morning",
    icon: "👕",
    titleTh: "แต่งตัวเองให้เรียบร้อย",
    titleEn: "Get Dressed by Myself",
    tipTh: "ฝึกช่วยเหลือตัวเองและภูมิใจในตัวเอง",
    tipEn: "Build independence step by step",
  },
  {
    id: "m4",
    period: "morning",
    icon: "🍳",
    titleTh: "กินข้าวเช้า & ดื่มน้ำ",
    titleEn: "Eat Breakfast & Drink Water",
    tipTh: "เติมพลังสมองพร้อมลุยทั้งวัน",
    tipEn: "Fuel the brain for a great day",
  },
  {
    id: "m5",
    period: "morning",
    icon: "🎒",
    titleTh: "เช็กกระเป๋า & สวมรองเท้า",
    titleEn: "Check Bag & Put on Shoes",
    tipTh: "เช็กขวดน้ำและของใช้ก่อนออกจากบ้าน",
    tipEn: "Ready to go without rushing",
  },
  // After School (5 tasks)
  {
    id: "a1",
    period: "afternoon",
    icon: "👟",
    titleTh: "เก็บรองเท้าเข้าชั้นให้ตรงคู่",
    titleEn: "Put Shoes on the Rack",
    tipTh: "กลับถึงบ้านปุ๊บ เก็บเข้าที่ปั๊บ",
    tipEn: "Tidy entryway habit every day",
  },
  {
    id: "a2",
    period: "afternoon",
    icon: "🧼",
    titleTh: "ล้างมือฟอกสบู่ & เปลี่ยนชุด",
    titleEn: "Wash Hands & Change Clothes",
    tipTh: "ล้างเชื้อโรคและใส่เสื้อผ้าสบายตัว",
    tipEn: "Fresh and clean after school",
  },
  {
    id: "a3",
    period: "afternoon",
    icon: "🍱",
    titleTh: "เอาขวดน้ำ & กล่องข้าวไปวางอ่าง",
    titleEn: "Unpack Lunchbox & Bottle",
    tipTh: "ช่วยคุณพ่อคุณแม่ดูแลของใช้ส่วนตัว",
    tipEn: "Take responsibility for personal gear",
  },
  {
    id: "a4",
    period: "afternoon",
    icon: "📚",
    titleTh: "ทำการบ้าน / เล่นใบงาน 5 นาที",
    titleEn: "Homework or 5-Min Worksheet",
    tipTh: "ทำตอนสมองสดชื่นก่อนเล่นอิสระ",
    tipEn: "Finish small focus tasks before play",
  },
  {
    id: "a5",
    period: "afternoon",
    icon: "🧸",
    titleTh: "เก็บของเล่นเข้ากล่อง (5 นาที)",
    titleEn: "Tidy Up Toys (5 min)",
    tipTh: "แข่งเก็บของเล่นให้ทันเวลานาฬิกา!",
    tipEn: "Beat the 5-minute tidy-up timer!",
  },
  // Bedtime (5 tasks)
  {
    id: "b1",
    period: "bedtime",
    icon: "📵",
    titleTh: "ปิดหน้าจอก่อนนอน 30 นาที",
    titleEn: "Screens Off Before Bed",
    tipTh: "บอกลาจอให้สมองได้พักผ่อน",
    tipEn: "Give growing brains calm rest",
  },
  {
    id: "b2",
    period: "bedtime",
    icon: "🛁",
    titleTh: "อาบน้ำ & ใส่ชุดนอน",
    titleEn: "Bath Time & Pajamas",
    tipTh: "ตัวหอมสดชื่นพร้อมเข้านอน",
    tipEn: "Cozy and ready for sweet dreams",
  },
  {
    id: "b3",
    period: "bedtime",
    icon: "🪥",
    titleTh: "แปรงฟันก่อนนอน (2 นาที)",
    titleEn: "Bedtime Toothbrushing (2 min)",
    tipTh: "ฟันสะอาดไม่มีแมงกินฟัน",
    tipEn: "Sparkling clean teeth overnight",
  },
  {
    id: "b4",
    period: "bedtime",
    icon: "📖",
    titleTh: "อ่านนิทาน & คุย 3 สิ่งดีๆ วันนี้",
    titleEn: "Storytime & 3 Good Things",
    tipTh: "เติมพลังใจเชิงบวกกับพ่อแม่ (SEL)",
    tipEn: "Positive bonding & gratitude moment",
  },
  {
    id: "b5",
    period: "bedtime",
    icon: "😴",
    titleTh: "กอดบอกฝันดี & เข้านอนตรงเวลา",
    titleEn: "Goodnight Hug & Lights Out",
    tipTh: "หลับเต็มอิ่ม โตไว อารมณ์ดีพรุ่งนี้",
    tipEn: "Deep sleep for happy mornings",
  },
];

const ROUTINE_PRESETS = [
  {
    seconds: 120,
    icon: "🪥",
    labelTh: "2 นาที",
    labelEn: "2 min",
    tagTh: "แปรงฟัน",
    tagEn: "Brush Teeth",
  },
  {
    seconds: 300,
    icon: "🧸",
    labelTh: "5 นาที",
    labelEn: "5 min",
    tagTh: "เก็บของเล่น",
    tagEn: "Tidy Up",
  },
  {
    seconds: 600,
    icon: "🎒",
    labelTh: "10 นาที",
    labelEn: "10 min",
    tagTh: "แต่งตัว/จัดเป๋า",
    tagEn: "Get Ready",
  },
  {
    seconds: 900,
    icon: "🌙",
    labelTh: "15 นาที",
    labelEn: "15 min",
    tagTh: "ก่อนนอน",
    tagEn: "Bedtime",
  },
];

const GALLERY_IMAGES = [
  {
    src: "/edu/rt01/mockup-01-cover.webp",
    labelTh: "ปกหน้า & จุดเด่นชุดสร้างวินัย 32 หน้า",
    labelEn: "Front Cover & 32-Page Highlights",
  },
  {
    src: "/edu/rt01/mockup-02-kit.webp",
    labelTh: "ครบ 5-in-1: บอร์ด + การ์ดตีนตุ๊กแก + คูปอง + SEL",
    labelEn: "Complete 5-in-1 Boards, Velcro Cards & SEL",
  },
  {
    src: "/edu/rt01/mockup-03-color-bw.webp",
    labelTh: "ได้ทั้งสีสดใส + ขาวดำประหยัดหมึก (ขอบเจาะรู 20mm)",
    labelEn: "Full Color + Ink-Friendly B&W (20mm Margin)",
  },
  {
    src: "/edu/rt01/mockup-04-editions.webp",
    labelTh: "เทียบสิทธิ์ Home vs Class Edition",
    labelEn: "Home vs Class Edition Comparison",
  },
];

const CONFETTI_PIECES = [
  { left: "10%", delay: "0s", color: "bg-rose-400" },
  { left: "22%", delay: "0.08s", color: "bg-amber-300" },
  { left: "34%", delay: "0.14s", color: "bg-pink-400" },
  { left: "48%", delay: "0.04s", color: "bg-emerald-400" },
  { left: "60%", delay: "0.18s", color: "bg-yellow-300" },
  { left: "73%", delay: "0.1s", color: "bg-cyan-400" },
  { left: "86%", delay: "0.16s", color: "bg-orange-400" },
];

const STORAGE_KEY = "iaon_edu_rt01_routine_v1";

export function Rt01HubView() {
  const [lang, setLang] = useState<EduLang>("th");
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Routine Visual Timer state (default 5 min tidy-up / routine standard)
  const [durationSec, setDurationSec] = useState(300);
  const [remainingSec, setRemainingSec] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);

  // Period checklist & Star Jar state
  const [activePeriod, setActivePeriod] = useState<RoutinePeriod>("morning");
  const [completedIds, setCompletedIds] = useState<string[]>([]);

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

  // Load saved routine stars & explicit ?lang=en override
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
          setCompletedIds(parsed.filter((id) => typeof id === "string"));
        }
      }
    } catch {
      // Ignore storage errors in private browsing mode
    }
  }, []);

  // Keyboard navigation for Lightbox
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

  // Countdown tick
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setRemainingSec((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          triggerCelebration(
            lang === "th"
              ? "🎉 หมดเวลาแล้ว! ทำภารกิจทันเวลา เก่งมากเลย แม่ใหญ่ปรบมือให้ดาว 1 ดวง!"
              : "🎉 Time's up! Amazing job finishing on time! Mama Mami gives you a gold star!"
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

  const handleResetTimer = () => {
    setIsRunning(false);
    setIsCelebrating(false);
    setRemainingSec(durationSec);
  };

  const toggleRoutineTask = (taskId: string, period: RoutinePeriod) => {
    setCompletedIds((prev) => {
      const exists = prev.includes(taskId);
      const next = exists
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId];

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore quota errors
      }

      if (!exists) {
        const periodTasks = ROUTINE_TASKS.filter((t) => t.period === period);
        const periodCompletedNow = periodTasks.every((t) =>
          next.includes(t.id)
        );
        if (periodCompletedNow) {
          const periodLabel =
            period === "morning"
              ? lang === "th"
                ? "กิจวัตรตอนเช้า"
                : "Morning Routine"
              : period === "afternoon"
                ? lang === "th"
                  ? "กิจวัตรหลังกลับบ้าน"
                  : "After-School Routine"
                : lang === "th"
                  ? "กิจวัตรก่อนนอน"
                  : "Bedtime Routine";
          triggerCelebration(
            lang === "th"
              ? `🌟 พิชิต${periodLabel}ครบ 5/5 ข้อแล้ว! เยี่ยมมากเลยลูก แม่ใหญ่ภูมิใจสุดๆ!`
              : `🌟 Completed all 5/5 ${periodLabel} tasks! Mama Mami is so proud!`
          );
        } else if (soundEnabled) {
          playStarPop();
        }
      }

      return next;
    });
  };

  const handleResetDailyStars = () => {
    setCompletedIds([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    showToast(
      lang === "th"
        ? "✨ รีเซ็ตดาวประจำวันเรียบร้อย พร้อมเริ่มวันใหม่กันเลย!"
        : "✨ Daily stars cleared — ready for a fresh new day!"
    );
  };

  const periodTasks = ROUTINE_TASKS.filter((t) => t.period === activePeriod);
  const periodDoneCount = periodTasks.filter((t) =>
    completedIds.includes(t.id)
  ).length;
  const totalStars = completedIds.length;
  const maxStars = ROUTINE_TASKS.length;

  const minutes = Math.floor(remainingSec / 60);
  const seconds = remainingSec % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progress =
    durationSec > 0 ? (durationSec - remainingSec) / durationSec : 0;

  const ringRadius = 96;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset = ringCircumference * (1 - progress);

  const statusText = (() => {
    if (isCelebrating || remainingSec === 0) {
      return lang === "th"
        ? "🎉 ครบเวลาแล้ว! เก่งมากเลย แม่ใหญ่ขอปรบมือให้ดังๆ!"
        : "🎉 Time's up! You did it on time — Mama Mami is cheering!";
    }
    if (!isRunning && remainingSec === durationSec) {
      return lang === "th"
        ? "เลือกภารกิจแล้วกดเริ่ม — ไม่ต้องบ่นซ้ำ ให้เสียงนาฬิกาแม่ใหญ่ช่วยชวนทำ!"
        : "Pick a routine preset and tap Start — gentle screen-free timing with zero nagging!";
    }
    if (!isRunning) {
      return lang === "th"
        ? "พักเวลาชั่วคราว กดปุ่มเริ่มเพื่อทำภารกิจต่อได้เลย"
        : "Paused — tap Resume whenever your little one is ready";
    }
    if (remainingSec <= 30) {
      return lang === "th"
        ? "🔥 เหลือ 30 วินาทีสุดท้ายแล้ว! มาแข่งกับนาฬิกากันเถอะ!"
        : "🔥 Final 30 seconds! Let's beat the clock together!";
    }
    return lang === "th"
      ? "💖 กำลังทำกิจวัตรอย่างมีวินัย... แม่ใหญ่เอาใจช่วยอยู่นะ!"
      : "💖 Great routine focus! Mama Mami is cheering you on!";
  })();

  const faqs =
    lang === "th"
      ? [
          {
            q: "ทำไมชุด EDU-RT01 ถึงเหมาะสำหรับนำไปเคลือบแข็งติดตีนตุ๊กแก (Velcro)?",
            a: "ทุกหน้าในเล่มออกแบบด้วยโหมด Busy Book เผื่อขอบเจาะรู/เข้าสันห่วงด้านซ้ายอย่างน้อย 20 mm และมีเส้นประตัด (Cut Line) สำหรับการ์ดกิจวัตรทั้ง 24 ใบ + แผ่นดาว 20 ดวง + คูปอง 8 ใบ เคลือบครั้งเดียวแปะเล่นซ้ำได้ตลอดทั้งปีครับ",
          },
          {
            q: "ซื้อเล่มเต็ม 32 หน้าแล้วได้ไฟล์อะไรบ้าง? ต้องใช้หมึกสีเยอะไหม?",
            a: "ได้ครบทั้ง 4 ไฟล์ PDF ความละเอียดสูง (ภาษาไทย สี/ขาวดำ + อังกฤษ สี/ขาวดำ) เวอร์ชันสีใช้โทนพาสเทลประหยัดหมึกไม่เทพื้นเข้ม และเวอร์ชันขาว-ดำเส้นคมชัดให้เด็กช่วยระบายสีบอร์ดของตัวเองได้ด้วยครับ ปริ้นท์ได้ทั้ง A4 และ US Letter ไม่ตกขอบ",
          },
          {
            q: "ชุดสร้างวินัยนี้ต่างจากตารางกิจวัตรทั่วไปอย่างไร?",
            a: "เป็นชุด 5-in-1 ครบจบในเล่มเดียว ไม่ได้มีแค่ตารางแผ่นเดียว แต่มีทั้งบอร์ดเช้า-หลังกลับบ้าน-ก่อนนอน + บอร์ดตีนตุ๊กแก To-Do/Done + ขวดโหล 20 ดาว + แผนที่ 30 วัน + คูปองรางวัลที่ไม่ต้องซื้อของเล่น + มุมสงบใจ SEL (6 ท่าหายใจ & มาตรวัดอารมณ์) และเกมฝึกวินัยอีก 7 หน้าครับ",
          },
        ]
      : [
          {
            q: "Is EDU-RT01 ready for laminating, ring-binding, and Velcro dots?",
            a: "Yes! Every page is engineered with a dedicated 20mm left binding margin and clean dashed cut-lines for all 24 routine cards, 20 star tokens, and 8 reward coupons — laminate once and reuse all year.",
          },
          {
            q: "What files are included in the 32-page kit?",
            a: "You receive all 4 print-ready PDFs (English Color/B&W + Thai Color/B&W), engineered with our Universal Safe Box for both A4 and US Letter printers. B&W pages double as color-your-own routine boards!",
          },
          {
            q: "How is this different from a simple 1-page chore chart?",
            a: "It's a complete 5-in-1 Positive Parenting Kit: Morning/After-School/Bedtime boards, a Velcro To-Do -> Done board, a 20-Star Jar, 30-Day Habit Tracker, 8 non-toy reward coupons, an SEL Calm-Down Corner, and 7 habit games.",
          },
        ];

  return (
    <div className="w-full overflow-x-hidden bg-[#FFFDF7] text-[#1E293B] -mt-4 md:-mt-8 pt-6 md:pt-10 pb-16 border-b border-rose-200/80">
      {/* Floating Toast */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="rounded-2xl border-2 border-rose-400 bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white shadow-2xl">
            {toastMsg}
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Top Utility Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/edu"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-rose-700 hover:border-rose-300 shadow-xs transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>iAon Edu-Verse</span>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-rose-700">EDU-RT01</span>
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
                    ? "bg-rose-600 text-white shadow-xs"
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
                    ? "bg-rose-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🇬🇧 EN
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================
            SECTION 1: HERO + ROUTINE VISUAL TIMER + DAILY STAR CHECKLIST
        ============================================================ */}
        <section className="relative rounded-3xl border-2 border-rose-200 bg-white p-5 sm:p-8 shadow-lg shadow-rose-900/5 overflow-hidden">
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

          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-rose-100/70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-100/60 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center min-w-0">
            {/* Left: Visual Routine Timer */}
            <div className="lg:col-span-6 min-w-0 w-full flex flex-col items-center text-center space-y-5">
              <div className="inline-flex items-center justify-center gap-1.5 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-[11px] sm:text-xs font-bold text-rose-900 max-w-full flex-wrap">
                <Clock className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                <span>
                  {lang === "th"
                    ? "HYBRID QR • นาฬิกาจับเวลากิจวัตรแม่ใหญ่ (เลิกบ่นซ้ำ)"
                    : "HYBRID QR • MAMA MAMI'S ROUTINE VISUAL TIMER"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] leading-tight break-words w-full">
                {lang === "th"
                  ? "ชุดสร้างวินัย 30 วันกับแม่ใหญ่"
                  : "Mama Mami's Routine Timer"}
              </h1>

              {/* 4 Practical Routine Presets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
                {ROUTINE_PRESETS.map((p) => {
                  const active = durationSec === p.seconds;
                  return (
                    <button
                      key={p.seconds}
                      type="button"
                      onClick={() => handleSelectPreset(p.seconds)}
                      className={`rounded-2xl border-2 px-2.5 py-2 text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                        active
                          ? "border-rose-600 bg-rose-600 text-white shadow-md shadow-rose-500/20"
                          : "border-slate-200 bg-[#FFF5F5] text-slate-800 hover:border-rose-400 hover:bg-rose-50"
                      }`}
                    >
                      <span className="text-sm leading-none">
                        {p.icon} {lang === "th" ? p.labelTh : p.labelEn}
                      </span>
                      <span
                        className={`text-[11px] ${
                          active ? "text-rose-100 font-bold" : "text-slate-600"
                        }`}
                      >
                        {lang === "th" ? p.tagTh : p.tagEn}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Circular Ring + Mama Mami 3D Avatar */}
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
                    stroke={isCelebrating ? "#10B981" : "#E11D48"}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFFDF7] p-1.5 ring-2 ring-rose-400 shadow-md overflow-hidden flex items-center justify-center transition-transform duration-300 ${
                      isCelebrating
                        ? "scale-110 animate-bounce"
                        : isRunning
                          ? "scale-105"
                          : ""
                    }`}
                  >
                    <img
                      src="/edu/mami-3d.webp"
                      alt="Mama Mami 3D"
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

              {/* Timer Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 w-full pt-1">
                <button
                  type="button"
                  onClick={handleStartPause}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-600 hover:bg-rose-700 px-5 py-3 text-sm sm:text-base font-extrabold text-white shadow-md shadow-rose-500/20 active:scale-[0.98] transition-all cursor-pointer min-w-[148px]"
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
                              : "Start Timer"}
                      </span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleResetTimer}
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
                        ? "👏 เก่งมากเลยลูก! แม่ใหญ่ปรบมือให้ดาวทอง 1 ดวง!"
                        : "👏 Awesome habit! Mama Mami gives you a gold star!"
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-emerald-300 bg-emerald-50 hover:bg-emerald-100 px-4 py-3 text-sm sm:text-base font-bold text-emerald-900 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>
                    {lang === "th" ? "👏 ปรบมือให้ดาว!" : "👏 Cheer & Star!"}
                  </span>
                </button>
              </div>
            </div>

            {/* Right: Interactive 3-Period Routine Board + Star Jar */}
            <div className="lg:col-span-6 min-w-0 w-full rounded-2xl border border-rose-200 bg-[#FFF5F5] p-4 sm:p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-[#1E293B] flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-600 fill-rose-200" />
                    <span>
                      {lang === "th"
                        ? "บอร์ดสะสมดาวประจำวัน"
                        : "Daily Routine Star Jar"}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {lang === "th"
                      ? "ทำเสร็จแต่ละข้อ แตะเก็บดาวใส่ขวดโหลได้เลย (จำอัตโนมัติในเครื่อง)"
                      : "Tap completed habits to fill the Star Jar (auto-saved on device)"}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-extrabold text-amber-900">
                  {totalStars}/{maxStars} ⭐
                </span>
              </div>

              {/* Overall Star Jar Progress */}
              <div className="space-y-1.5">
                <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 transition-all duration-500"
                    style={{ width: `${(totalStars / maxStars) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-600">
                  <span>
                    {lang === "th"
                      ? `ช่วงนี้ทำไปแล้ว ${periodDoneCount}/5 ข้อ`
                      : `This period: ${periodDoneCount}/5 done`}
                  </span>
                  {totalStars > 0 && (
                    <button
                      type="button"
                      onClick={handleResetDailyStars}
                      className="text-rose-700 hover:text-rose-900 font-bold underline cursor-pointer"
                    >
                      {lang === "th" ? "รีเซ็ตเริ่มวันใหม่" : "Reset Day"}
                    </button>
                  )}
                </div>
              </div>

              {/* 3 Period Tabs */}
              <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-white p-1 border border-rose-200 shadow-xs">
                {(
                  [
                    {
                      id: "morning" as const,
                      icon: Sun,
                      th: "ตอนเช้า",
                      en: "Morning",
                    },
                    {
                      id: "afternoon" as const,
                      icon: Sunset,
                      th: "กลับบ้าน",
                      en: "After School",
                    },
                    {
                      id: "bedtime" as const,
                      icon: Moon,
                      th: "ก่อนนอน",
                      en: "Bedtime",
                    },
                  ] as const
                ).map((tab) => {
                  const Icon = tab.icon;
                  const active = activePeriod === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActivePeriod(tab.id)}
                      className={`flex items-center justify-center gap-1.5 rounded-lg py-2 px-2 text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? "bg-rose-600 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-rose-50"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">
                        {lang === "th" ? tab.th : tab.en}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 5 Tasks for Selected Period */}
              <div className="space-y-2">
                {periodTasks.map((task) => {
                  const done = completedIds.includes(task.id);
                  return (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => toggleRoutineTask(task.id, task.period)}
                      className={`w-full text-left flex items-center gap-3 rounded-xl border p-3 transition-all cursor-pointer ${
                        done
                          ? "border-rose-400 bg-rose-50 shadow-xs"
                          : "border-slate-200 bg-white hover:border-rose-300"
                      }`}
                    >
                      <span className="text-xl shrink-0">{task.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-[#1E293B] truncate">
                          {lang === "th" ? task.titleTh : task.titleEn}
                        </div>
                        <div className="text-xs text-slate-600 truncate">
                          {lang === "th" ? task.tipTh : task.tipEn}
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
                  src="/edu/rt01/mockup-01-cover.webp"
                  alt="EDU-RT01 Freebie Cover Preview"
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
                    ? "ทดลองปริ้นท์ติดตู้เย็น/โต๊ะลูกฟรีก่อนซื้อ (0 ฿)"
                    : "TRY BEFORE YOU BUY • INSTANT FREE PDF ($0)"}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">
                {lang === "th"
                  ? "ดาวน์โหลดชุดทดลองฟรี 5 หน้า (บอร์ดตอนเช้า + ตารางดาว 7 วัน + การ์ดตีนตุ๊กแก 8 ใบ)"
                  : "Download the 5-Page Free Kit (Morning Board + 7-Day Star Chart + 8 Velcro Cards)"}
              </h2>

              <p className="text-sm text-slate-700 leading-relaxed">
                {lang === "th"
                  ? "คลิกโหลดไฟล์ PDF ความละเอียดสูงไปปริ้นท์ A4 ได้เลยทันทีไม่ต้องลงทะเบียน เผื่อขอบซ้าย 20mm พร้อมเส้นประตัดให้คุณพ่อคุณแม่ลองทำบอร์ดตอนเช้าคู่กับนาฬิกาจับเวลาด้านบนวันนี้เลยครับ"
                  : "Instant 1-click download — no login required. Engineered with a 20mm binding margin and dashed cut lines so you can test the Morning Board with your child today."}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href="/edu/rt01/EDU-RT01_Freebie_5Pages_TH.pdf"
                  download="EDU-RT01_Freebie_5Pages_TH.pdf"
                  onClick={() =>
                    showToast(
                      "📥 กำลังดาวน์โหลดชุดสร้างวินัยฟรีภาษาไทย (5 หน้า) — ปริ้นท์ติดบ้านได้เลย!"
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-700 hover:bg-sky-800 px-5 py-3 text-sm sm:text-base font-bold text-white shadow-md shadow-sky-600/20 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>โหลดฟรี 5 หน้า (ภาษาไทย • PDF)</span>
                </a>

                <a
                  href="/edu/rt01/EDU-RT01_Freebie_5Pages_EN.pdf"
                  download="EDU-RT01_Freebie_5Pages_EN.pdf"
                  onClick={() =>
                    showToast(
                      "📥 Downloading English 5-Page Routine Freebie PDF — ready to print!"
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
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-bold text-rose-900">
              <Layers className="w-3.5 h-3.5 text-rose-600" />
              <span>
                {lang === "th"
                  ? "5-IN-1 POSITIVE PARENTING KIT • เผื่อขอบเจาะรู 20mm ทุกหน้า"
                  : "5-IN-1 POSITIVE PARENTING KIT • 20MM LAMINATE & VELCRO READY"}
              </span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
              {lang === "th"
                ? "ปลดล็อกเล่มเต็ม 32 หน้า (ครบ 4 ไฟล์ TH/EN × สี/ขาวดำ)"
                : "Unlock the Complete 32-Page Kit (4 PDFs: TH/EN × Color/B&W)"}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === "th"
                ? "ครบทั้งบอร์ดเช้า-เย็น-ก่อนนอน, บอร์ดตีนตุ๊กแก To-Do/Done, ขวดโหล 20 ดาว, คูปอง 8 ใบ, การ์ด 24 ใบ, มุมสงบใจ SEL และเกมฝึกวินัย 7 หน้า"
                : "Includes Morning/Afternoon/Bedtime boards, Velcro To-Do/Done board, 20-Star Jar, 8 coupons, 24 cutout cards, SEL Calm-Down Corner & 7 habit games."}
            </p>
          </div>

          {/* 4-Image Interactive Gallery */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {GALLERY_IMAGES.map((img, idx) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden text-left hover:border-rose-400 shadow-xs transition-all cursor-pointer"
              >
                <div className="aspect-square overflow-hidden bg-[#FFF5F5]">
                  <img
                    src={img.src}
                    alt={lang === "th" ? img.labelTh : img.labelEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-2.5 text-xs font-semibold text-slate-700 line-clamp-2">
                  {lang === "th" ? img.labelTh : img.labelEn}
                </div>
              </button>
            ))}
          </div>

          {/* Dual-Edition Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* HOME EDITION */}
            <div className="rounded-3xl border-2 border-rose-300 bg-white p-6 flex flex-col justify-between space-y-6 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 border border-rose-300 px-3 py-1 text-xs font-extrabold text-rose-900">
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
                    <span className="text-4xl font-extrabold text-rose-700">
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
                        "ครบ 32 หน้าเต็ม: บอร์ดเช้า-เย็น-ก่อนนอน + ตีนตุ๊กแก + ขวดโหล 20 ดาว + คูปอง 8 ใบ",
                        "การ์ดกิจวัตรตัดแปะ 24 ใบ + มุมสงบใจ SEL 6 ท่าหายใจ + เกมฝึกวินัย 7 หน้า",
                        "ได้ครบ 4 ไฟล์ PDF: ภาษาไทย (สี/ขาวดำ) + อังกฤษ (สี/ขาวดำ)",
                        "เผื่อขอบซ้าย 20mm ทุกหน้า เคลือบแข็งเข้าสันห่วงได้ทั้ง A4 & US Letter",
                      ]
                    : [
                        "Full 32-page 5-in-1 Routine, Reward Jar, Coupons & SEL Kit",
                        "24 Velcro cutout cards + Calm-Down Corner + 7 habit games",
                        "All 4 PDFs included: English (Color/B&W) + Thai (Color/B&W)",
                        "20mm left binding margin ready for laminating on A4 & US Letter",
                      ]
                  ).map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={getEduOrderLineUrl({
                  sku: "EDU-RT01",
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
                    {lang === "th"
                      ? "สำหรับคุณครูอนุบาล / ศูนย์เด็กเล็ก"
                      : "Teachers & Classrooms"}
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
                      {lang === "th"
                        ? "(ปริ้นท์แจกเด็กไม่จำกัด)"
                        : "(199 THB • Unlimited copies)"}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm text-slate-700">
                  {(lang === "th"
                    ? [
                        "สิทธิ์ถูกกฎหมายสำหรับคุณครู 1 ท่าน ปริ้นท์แจกนักเรียน/ทำมุมห้องเรียนได้ไม่จำกัด",
                        "ได้ครบทั้ง 4 ไฟล์ PDF (TH/EN × สี/ขาวดำ) + เวอร์ชันขาวดำถ่ายเอกสารคมชัด",
                        "เหมาะมากสำหรับจัดมุม Calm-Down Corner & ตารางเวรประจำวันในห้องอนุบาล",
                        "เปิดหน้าจอ Routine Timer นี้ขึ้นจอทีวี/โปรเจกเตอร์ชวนเด็กเก็บของพร้อมกันทั้งห้อง",
                      ]
                    : [
                        "Legal Classroom License for 1 teacher — unlimited student copies",
                        "All 4 PDFs (EN/TH × Color/B&W) with ink-saving photocopier mode",
                        "Ideal for classroom Calm-Down Corners & visual daily schedules",
                        "Project this Routine Timer on screen for whole-class tidy-up rounds",
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
                  sku: "EDU-RT01",
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
            SECTION 4: BUILT-IN CROSS-SELL (MEGA BUNDLE 3 BOOKS + EF01)
        ============================================================ */}
        <section className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-[#FEF9EF] via-white to-[#FFF5F5] p-5 sm:p-8 shadow-md space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-950">
                <Gift className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  {lang === "th"
                    ? "🔥 MEGA BUNDLE ครบ 3 เล่ม (96 หน้า • 12 ไฟล์ PDF)"
                    : "🔥 3-BOOK MEGA BUNDLE (96 PAGES • 12 PDFs)"}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">
                {lang === "th"
                  ? "เหมาครบแก๊ง 3 เล่ม: EF น้องแซลมอน + วินัยแม่ใหญ่ + ดนตรีน้องข้าวต้ม"
                  : "Get All 3 Level-1 Kits: Brain EF + 30-Day Routine + Music Adventure"}
              </h2>

              <p className="text-sm text-slate-700 leading-relaxed">
                {lang === "th"
                  ? "ได้ไฟล์ PDF ครบทั้ง 3 เล่มทันที (96 หน้า • TH/EN สี+ขาวดำ) พร้อมเว็บจับเวลา EF01 & RT01 ใช้ได้ทันที และปลดล็อก 6 แทร็กเสียงจริงของ MU01 ฟรีอัตโนมัติบนเว็บเมื่อเปิดระบบ"
                  : "Instant access to all 3 complete 32-page PDFs (96 pages total, TH/EN Color+B&W) + live EF01 & RT01 timers today + automatic unlock for MU01's 6 real audio tracks on launch."}
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border-2 border-amber-300 bg-white p-4 text-center space-y-3 min-w-[240px] shadow-sm">
              <div>
                <div className="text-xs text-slate-400 line-through">
                  {lang === "th" ? "ปกติ 327 ฿" : "Regular $15.97"}
                </div>
                <div className="text-3xl font-extrabold text-amber-700">
                  {lang === "th" ? "249 ฿" : "$11.99"}
                </div>
                <div className="text-[11px] font-bold text-emerald-700">
                  {lang === "th" ? "ประหยัดทันที 78 ฿!" : "Save 24% today!"}
                </div>
              </div>

              <a
                href={getEduOrderLineUrl({
                  sku: "EDU-RT01",
                  edition: "MEGA_BUNDLE",
                  lang,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-500 px-4 py-2.5 text-sm font-extrabold text-slate-950 transition-colors"
              >
                <FaLine className="w-4 h-4 text-[#047857]" />
                <span>
                  {lang === "th"
                    ? "สั่ง Mega Bundle 249 ฿"
                    : "Order Mega Bundle"}
                </span>
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <span className="text-slate-700 font-medium">
              {lang === "th"
                ? "อยากฝึกเชาวน์ปัญญา EF & โค้ดดิ้งไร้จอคู่กันด้วยไหม?"
                : "Want to pair this with Brain & EF Unplugged Coding?"}
            </span>
            <Link
              href="/edu/ef01"
              className="inline-flex items-center gap-1.5 font-extrabold text-amber-800 hover:text-amber-950"
            >
              <span>
                {lang === "th"
                  ? "ไปลองเล่น EDU-EF01 (น้องแซลมอน แจกฟรี 5 หน้า)"
                  : "Try EDU-EF01 (Detective Salmon 5-Page Freebie)"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ============================================================
            SECTION 5: FAQ ACCORDION
        ============================================================ */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#1E293B]">
            <HelpCircle className="w-5 h-5 text-rose-600" />
            <h2 className="text-lg sm:text-xl font-extrabold">
              {lang === "th"
                ? "คำถามที่พบบ่อย & เคล็ดลับเคลือบตีนตุ๊กแก"
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
                    className="w-full flex items-center justify-between gap-3 text-left text-sm sm:text-base font-bold text-[#1E293B] hover:text-rose-700 transition-colors cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180 text-rose-600" : ""
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
                  ? "รองรับ A4 & US Letter • ขอบเจาะรู 20mm • ปลอดภัยไร้โฆษณา 100%"
                  : "A4 & US Letter • 20mm Binding Margin • 100% Ad-Free Kid Safe"}
              </span>
            </span>
            <Link
              href="/edu"
              className="text-rose-700 hover:underline font-bold"
            >
              {lang === "th"
                ? "ดูสื่อทั้งหมด 4 เล่มใน iAon Edu-Verse →"
                : "Explore all 4 kits in iAon Edu-Verse →"}
            </Link>
          </div>
        </section>
      </div>

      {/* ============================================================
          LIGHTBOX MODAL FOR 4-IMAGE GALLERY
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

            <div className="relative flex items-center justify-center bg-[#FFF5F5] rounded-2xl p-2">
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

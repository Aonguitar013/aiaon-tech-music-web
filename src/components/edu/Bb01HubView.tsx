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
  Droplets,
  Layers,
  Gift,
  Scissors,
} from "lucide-react";
import { FaLine } from "react-icons/fa6";
import {
  playApplauseAndFanfare,
  playSoftTick,
  playStarPop,
  playStartChime,
} from "@/lib/eduAudio";
import { type EduLang, getEduOrderLineUrl } from "@/lib/eduCatalog";

type ChecklistTab = "handwash" | "busybook";

interface CheckItem {
  id: string;
  tab: ChecklistTab;
  icon: string;
  titleTh: string;
  titleEn: string;
  tipTh: string;
  tipEn: string;
}

const CHECK_ITEMS: CheckItem[] = [
  // WHO 6-Step Handwashing (6 items)
  {
    id: "hw1",
    tab: "handwash",
    icon: "🫧",
    titleTh: "1. ถูฝ่ามือประกบกัน",
    titleEn: "1. Rub Palms Together",
    tipTh: "ฟอกสบู่ให้เกิดฟองนุ่มๆ ถูไปมา",
    tipEn: "Lather with soap and rub briskly",
  },
  {
    id: "hw2",
    tab: "handwash",
    icon: "🖐️",
    titleTh: "2. ถูหลังมือ & ซอกนิ้ว",
    titleEn: "2. Scrub Backs & Fingers",
    tipTh: "ใช้ฝ่ามือถูหลังมือทั้งซ้ายและขวา",
    tipEn: "Wash backs of both hands thoroughly",
  },
  {
    id: "hw3",
    tab: "handwash",
    icon: "🤝",
    titleTh: "3. ฝ่ามือประสานซอกนิ้ว",
    titleEn: "3. Interlace Fingers",
    tipTh: "ประกบฝ่ามือถูซอกนิ้วไล่เชื้อโรค",
    tipEn: "Interlace fingers and rub front sides",
  },
  {
    id: "hw4",
    tab: "handwash",
    icon: "✊",
    titleTh: "4. กำมือถูหลังนิ้วมือ",
    titleEn: "4. Scrub Finger Backs",
    tipTh: "งอนิ้วเกี่ยวกันถูข้อนิ้วให้สะอาด",
    tipEn: "Hook fingers to clean knuckles",
  },
  {
    id: "hw5",
    tab: "handwash",
    icon: "👍",
    titleTh: "5. ถูนิ้วหัวแม่มือวนรอบ",
    titleEn: "5. Twist Both Thumbs",
    tipTh: "กำรอบนิ้วโป้งหมุนวนทีละข้าง",
    tipEn: "Hold and twist each thumb gently",
  },
  {
    id: "hw6",
    tab: "handwash",
    icon: "✨",
    titleTh: "6. ถูปลายนิ้ว & ข้อมือ",
    titleEn: "6. Fingertips & Wrists",
    tipTh: "ถูปลายเล็บกลางฝ่ามือ ล้างน้ำเช็ดแห้ง!",
    tipEn: "Swirl fingertips on palms, rinse & dry!",
  },
  // 6 Busy Book Boards Tracker (6 items)
  {
    id: "bb1",
    tab: "busybook",
    icon: "✏️",
    titleTh: "ด่าน 1: ลีลามือ & ตัวเลข 1–10",
    titleEn: "Part 1: Pre-Writing & 1–10",
    tipTh: "ลากเส้นตรง-หยัก-วน-รูปทรง (P03–P08)",
    tipEn: "Lines, waves, shapes & bubbles (P03–P08)",
  },
  {
    id: "bb2",
    tab: "busybook",
    icon: "🎨",
    titleTh: "ด่าน 2: บอร์ดตีนตุ๊กแกสี & รูปทรง",
    titleEn: "Part 2: Colors & Shapes Mats",
    tipTh: "จับคู่ 6 สีสดใส & 6 รูปทรงรอบตัว (P09–P10)",
    tipEn: "6 bright colors & real shapes (P09–P10)",
  },
  {
    id: "bb3",
    tab: "busybook",
    icon: "📏",
    titleTh: "ด่าน 3: นับเลข 1–6 & เรียงขนาด",
    titleEn: "Part 3: Counting & Size Sort",
    tipTh: "นับฟองสบู่ + เล็ก-กลาง-ใหญ่ (P11–P12)",
    tipEn: "Count 1–6 & Small-Med-Large (P11–P12)",
  },
  {
    id: "bb4",
    tab: "busybook",
    icon: "🪥",
    titleTh: "ด่าน 4: บอร์ดแปรงฟันไวท์บอร์ด!",
    titleEn: "Part 4: Wipe-Clean Teeth Board",
    tipTh: "เช็ดคราบแมงกินฟันจนขาววิ้ง! (P15)",
    tipEn: "Brush away pretend sugar bugs! (P15)",
  },
  {
    id: "bb5",
    tab: "busybook",
    icon: "✂️",
    titleTh: "ด่าน 5: ฝึกกรรไกร & อาหารฟันดี",
    titleEn: "Part 5: Scissors & Tooth Foods",
    tipTh: "ตัดเส้นปลอดภัย + แยกอาหาร (P18–P19)",
    tipEn: "Safe snipping & healthy snacks (P18–P19)",
  },
  {
    id: "bb6",
    tab: "busybook",
    icon: "🧩",
    titleTh: "ด่าน 6: เงา ครึ่งภาพ & เขาวงกต",
    titleEn: "Part 6: Shadows, Symmetry & Maze",
    tipTh: "เกมสมองจิ๋ว 3–5 ปีครบ 4 ด่าน (P20–P24)",
    tipEn: "Toddler mini-logic & easy maze (P20–P24)",
  },
];

const HYGIENE_PRESETS = [
  {
    seconds: 20,
    icon: "🧼",
    labelTh: "20 วินาที",
    labelEn: "20 sec",
    tagTh: "ล้างมือ WHO",
    tagEn: "Handwash",
  },
  {
    seconds: 120,
    icon: "🪥",
    labelTh: "2 นาที",
    labelEn: "2 min",
    tagTh: "แปรงฟัน!",
    tagEn: "Brush Teeth",
  },
  {
    seconds: 300,
    icon: "✏️",
    labelTh: "5 นาที",
    labelEn: "5 min",
    tagTh: "ลีลามือ",
    tagEn: "Busy Book",
  },
  {
    seconds: 600,
    icon: "🎀",
    labelTh: "10 นาที",
    labelEn: "10 min",
    tagTh: "เล่นไร้จอ",
    tagEn: "Quiet Play",
  },
];

const GALLERY_IMAGES = [
  {
    src: "/edu/bb01/mockup-01-cover.webp",
    labelTh: "ปกหน้า & จุดเด่น Busy Book 32 หน้า",
    labelEn: "Front Cover & 32-Page Highlights",
  },
  {
    src: "/edu/bb01/mockup-02-kit.webp",
    labelTh: "ครบ 3-in-1: ลีลามือ + ตีนตุ๊กแก 45 ชิ้น + บอร์ดแปรงฟัน",
    labelEn: "3-in-1 Tracing + 45 Velcro Pieces + Teeth Board",
  },
  {
    src: "/edu/bb01/mockup-03-color-bw.webp",
    labelTh: "ได้ทั้งสีสดใส + ขาวดำประหยัดหมึก (ขอบเจาะรู 20mm)",
    labelEn: "Full Color + Ink-Friendly B&W (20mm Margin)",
  },
  {
    src: "/edu/bb01/mockup-04-editions.webp",
    labelTh: "เทียบสิทธิ์ Home vs Class Edition",
    labelEn: "Home vs Class Edition Comparison",
  },
];

const CONFETTI_PIECES = [
  { left: "10%", delay: "0s", color: "bg-pink-400" },
  { left: "22%", delay: "0.08s", color: "bg-amber-300" },
  { left: "34%", delay: "0.14s", color: "bg-cyan-400" },
  { left: "48%", delay: "0.04s", color: "bg-emerald-400" },
  { left: "60%", delay: "0.18s", color: "bg-yellow-300" },
  { left: "73%", delay: "0.1s", color: "bg-rose-400" },
  { left: "86%", delay: "0.16s", color: "bg-fuchsia-400" },
];

const STORAGE_KEY = "iaon_edu_bb01_hygiene_v1";

export function Bb01HubView() {
  const [lang, setLang] = useState<EduLang>("th");
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Default 2-Minute Toothbrushing Timer!
  const [durationSec, setDurationSec] = useState(120);
  const [remainingSec, setRemainingSec] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);

  const [activeTab, setActiveTab] = useState<ChecklistTab>("handwash");
  const [completedIds, setCompletedIds] = useState<string[]>([]);

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

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const qLang = params.get("lang")?.toLowerCase();
      if (qLang === "en" || qLang === "th") setLang(qLang);

      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setCompletedIds(parsed.filter((id) => typeof id === "string"));
        }
      }
    } catch {
      // ignore private browsing errors
    }
  }, []);

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
    if (soundEnabled) playApplauseAndFanfare();
    if (customToast) showToast(customToast);
    if (celebrateTimerRef.current) clearTimeout(celebrateTimerRef.current);
    celebrateTimerRef.current = setTimeout(() => setIsCelebrating(false), 3200);
  };

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setRemainingSec((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          triggerCelebration(
            lang === "th"
              ? "🎉 เย้! ครบเวลาแล้ว ฟันขาวจั๊วะ & มือสะอาดหอมฟุ้ง น้องชาบูปรบมือให้!"
              : "🎉 Yay! Time's up! Sparkling clean smile & hands — Shabu is cheering!"
          );
          return 0;
        }
        if (prev <= 6 && soundEnabled) playSoftTick();
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

  const toggleItem = (itemId: string, tab: ChecklistTab) => {
    setCompletedIds((prev) => {
      const exists = prev.includes(itemId);
      const next = exists
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId];

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }

      if (!exists) {
        const tabItems = CHECK_ITEMS.filter((i) => i.tab === tab);
        if (tabItems.every((i) => next.includes(i.id))) {
          triggerCelebration(
            tab === "handwash"
              ? lang === "th"
                ? "🧼 ล้างมือครบ 6 ขั้นตอน WHO แล้ว! มือหอมสะอาดสุดยอดเลย!"
                : "🧼 All 6 WHO handwashing steps complete! Super clean hands!"
              : lang === "th"
                ? "🎀 พิชิต Busy Book ครบ 6 ด่านแล้ว! ยอดหนูน้อยมือไวตัวจริง!"
                : "🎀 All 6 Busy Book challenges complete! Fine Motor Hero!"
          );
        } else if (soundEnabled) {
          playStarPop();
        }
      }
      return next;
    });
  };

  const handleResetChecklist = () => {
    setCompletedIds([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    showToast(
      lang === "th"
        ? "✨ รีเซ็ตดาวแล้ว พร้อมลุยรอบใหม่กับน้องชาบู!"
        : "✨ Stars cleared — ready for a fresh round with Shabu!"
    );
  };

  const visibleItems = CHECK_ITEMS.filter((i) => i.tab === activeTab);
  const tabDone = visibleItems.filter((i) => completedIds.includes(i.id)).length;
  const totalStars = completedIds.length;
  const maxStars = CHECK_ITEMS.length;

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
        ? "🎉 สะอาดวิ้ง! น้องชาบูโบว์ชมพูขอปรบมือให้คนเก่ง!"
        : "🎉 Sparkling clean! Shabu is applauding your awesome work!";
    }
    if (!isRunning && remainingSec === durationSec) {
      return lang === "th"
        ? "เลือก 20 วิ (ล้างมือ) หรือ 2 นาที (แปรงฟัน) แล้วกดเริ่มแข่งกับน้องชาบูเลย!"
        : "Pick 20s Handwash or 2-Min Brush Teeth and race Shabu’s friendly timer!";
    }
    if (!isRunning) {
      return lang === "th"
        ? "พักเบรกชั่วคราว กดเริ่มเพื่อจับเวลาต่อได้เลย"
        : "Paused — tap Resume whenever ready";
    }
    if (remainingSec <= 10) {
      return lang === "th"
        ? "🔥 โค้งสุดท้ายแล้ว! แปรงฟันด้านใน / ถูปลายนิ้วให้สะอาด!"
        : "🔥 Final seconds! Brush the back teeth & rinse sparkling clean!";
    }
    return lang === "th"
      ? "🪥 กำลังลุยภารกิจความสะอาด & ลีลามือ... สู้ๆ นะคนเก่ง!"
      : "🪥 Keep going! Shabu is cheering you on!";
  })();

  const faqs =
    lang === "th"
      ? [
          {
            q: "หน้าไฮไลต์ P15 (บอร์ดแปรงฟันไวท์บอร์ด) เล่นยังไงให้ลูกยอมแปรงฟัน?",
            a: "ปริ้นท์หน้า 15 (อยู่ในชุดแจกฟรี 5 หน้าด้วย!) แล้วเคลือบพลาสติกใสหรือใส่ซองใส จากนั้นให้คุณพ่อคุณแม่ใช้ปากกาไวท์บอร์ดวาดจุดคราบแมงกินฟันบนฟันทั้ง 10 ซี่ แล้วให้ลูกใช้แปรงสีฟันเก่าหรือทิชชูเช็ดวนกลมๆ จนฟันขาวสะอาด เล่นก่อนเข้าห้องน้ำช่วยลดอาการงอแงตอนแปรงฟันจริงได้ผลดีมากครับ",
          },
          {
            q: "การ์ดตีนตุ๊กแก 45 ชิ้น (หน้า 25–28) จะไม่สับสนหลงบอร์ดเหรอ?",
            a: "ไม่มีทางสับสนครับ! เราออกแบบให้การ์ดทุกใบมีป้ายเลขหน้ากำกับที่มุมขวาบนชัดเจน (เช่น [P09], [P10], [P11], [P12], [P13], [P14], [P18]) และทุกหน้าเผื่อขอบเจาะรูซ้าย 20mm เคลือบร้อนแล้วเข้าห่วงเหล็กพกไปร้านอาหารได้เลยครับ",
          },
          {
            q: "ซื้อเล่มเต็ม 32 หน้า (99 ฿) ได้กี่ไฟล์? ปริ้นท์กระดาษอะไรได้บ้าง?",
            a: "ได้ครบ 4 ไฟล์ PDF ความละเอียดสูง (ภาษาไทย สี/ขาวดำ + อังกฤษ สี/ขาวดำ) ปริ้นท์ได้ทั้ง A4 และ US Letter ไม่ตกขอบ เวอร์ชันขาว-ดำเส้นคมชัดให้ลูกระบายสีเองได้ด้วยครับ",
          },
        ]
      : [
          {
            q: "How does the viral P15 Wipe-Clean Teeth Brushing Board work?",
            a: "Print Page 15 (included in our 5-page freebie!), laminate or slip into a clear sheet protector, draw pretend sugar bugs with a dry-erase marker, and let your toddler brush them sparkling white before real bedtime brushing!",
          },
          {
            q: "Won’t 45 Velcro cutout pieces get mixed up across the boards?",
            a: "Never! Every single cutout piece on Pages 25–28 has a clear top-right page tag ([P09] through [P18]) so parents and teachers always know exactly which board it belongs to.",
          },
          {
            q: "What is included in the 32-page Busy Book pack?",
            a: "All 4 print-ready PDFs (English Color/B&W + Thai Color/B&W) with a 20mm left binder margin, compatible with both A4 and US Letter printers, plus Answer Key, Fine Motor Milestone Checklist & Certificate.",
          },
        ];

  return (
    <div className="w-full overflow-x-hidden bg-[#FFFDF7] text-[#1E293B] -mt-4 md:-mt-8 pt-6 md:pt-10 pb-16 border-b border-pink-200/80">
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="rounded-2xl border-2 border-pink-400 bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white shadow-2xl">
            {toastMsg}
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Top Utility Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/edu"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-pink-700 hover:border-pink-300 shadow-xs transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>iAon Edu-Verse</span>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-pink-700">EDU-BB01</span>
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
                    ? "bg-pink-600 text-white shadow-xs"
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
                    ? "bg-pink-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🇬🇧 EN
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================
            SECTION 1: HERO + 2-MIN BRUSH / 20-SEC HANDWASH TIMER + CHECKLIST
        ============================================================ */}
        <section className="relative rounded-3xl border-2 border-pink-200 bg-white p-5 sm:p-8 shadow-lg shadow-pink-900/5 overflow-hidden">
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

          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-pink-100/70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-sky-100/60 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center min-w-0">
            {/* Left: Hygiene & Busy Book Timer */}
            <div className="lg:col-span-6 min-w-0 w-full flex flex-col items-center text-center space-y-5">
              <div className="inline-flex items-center justify-center gap-1.5 rounded-full border border-pink-300 bg-pink-50 px-3 py-1 text-[11px] sm:text-xs font-bold text-pink-900 max-w-full flex-wrap">
                <Clock className="w-3.5 h-3.5 shrink-0 text-pink-600" />
                <span>
                  {lang === "th"
                    ? "HYBRID QR • นาฬิกาแปรงฟัน 2 นาที & ล้างมือ 20 วิ"
                    : "HYBRID QR • 2-MIN BRUSH & 20-SEC HANDWASH TIMER"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] leading-tight break-words w-full">
                {lang === "th"
                  ? "Busy Book ลีลามือ & สุขอนามัยกับน้องชาบู"
                  : "Shabu's Hygiene & Busy Book Timer"}
              </h1>

              {/* 4 Practical Presets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
                {HYGIENE_PRESETS.map((p) => {
                  const active = durationSec === p.seconds;
                  return (
                    <button
                      key={p.seconds}
                      type="button"
                      onClick={() => handleSelectPreset(p.seconds)}
                      className={`rounded-2xl border-2 px-2.5 py-2 text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                        active
                          ? "border-pink-600 bg-pink-600 text-white shadow-md shadow-pink-500/20"
                          : "border-slate-200 bg-[#FDF2F8] text-slate-800 hover:border-pink-400 hover:bg-pink-50"
                      }`}
                    >
                      <span className="text-sm leading-none">
                        {p.icon} {lang === "th" ? p.labelTh : p.labelEn}
                      </span>
                      <span
                        className={`text-[11px] ${
                          active ? "text-pink-100 font-bold" : "text-slate-600"
                        }`}
                      >
                        {lang === "th" ? p.tagTh : p.tagEn}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Circular Progress Ring + Shabu 3D Avatar */}
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
                    stroke={isCelebrating ? "#10B981" : "#DB2777"}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFFDF7] p-1.5 ring-2 ring-pink-400 shadow-md overflow-hidden flex items-center justify-center transition-transform duration-300 ${
                      isCelebrating
                        ? "scale-110 animate-bounce"
                        : isRunning
                          ? "scale-105"
                          : ""
                    }`}
                  >
                    <img
                      src="/edu/shabu-3d.webp"
                      alt="Shabu 3D"
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

              {/* Controls */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 w-full pt-1">
                <button
                  type="button"
                  onClick={handleStartPause}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-pink-600 hover:bg-pink-700 px-5 py-3 text-sm sm:text-base font-extrabold text-white shadow-md shadow-pink-500/20 active:scale-[0.98] transition-all cursor-pointer min-w-[148px]"
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
                        ? "👏 เย้! ฟันขาวสะอาด & มือหอม น้องชาบูปรบมือให้รางวัล!"
                        : "👏 Bravo! Sparkling clean — Shabu applauds your awesome habit!"
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

            {/* Right: Interactive 6-Step WHO Handwash + 6 Busy Book Boards */}
            <div className="lg:col-span-6 min-w-0 w-full rounded-2xl border border-pink-200 bg-[#FDF2F8] p-4 sm:p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-[#1E293B] flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-sky-600" />
                    <span>
                      {lang === "th"
                        ? "เช็กลิสต์ล้างมือ WHO & Busy Book"
                        : "WHO Handwash & Busy Book Tracker"}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {lang === "th"
                      ? "แตะทีละข้อเพื่อเก็บดาวกับน้องชาบู (บันทึกในเครื่องอัตโนมัติ)"
                      : "Tap each step with your toddler to earn stars (saved on device)"}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-extrabold text-amber-900">
                  {totalStars}/{maxStars} ⭐
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-pink-500 via-sky-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${(totalStars / maxStars) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-600">
                  <span>
                    {lang === "th"
                      ? `แท็บนี้ทำครบ ${tabDone}/6 ข้อ`
                      : `This tab: ${tabDone}/6 done`}
                  </span>
                  {totalStars > 0 && (
                    <button
                      type="button"
                      onClick={handleResetChecklist}
                      className="text-pink-700 hover:text-pink-900 font-bold underline cursor-pointer"
                    >
                      {lang === "th" ? "รีเซ็ตเริ่มใหม่" : "Reset All"}
                    </button>
                  )}
                </div>
              </div>

              {/* 2 Tabs */}
              <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-white p-1 border border-pink-200 shadow-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab("handwash")}
                  className={`flex items-center justify-center gap-1.5 rounded-lg py-2 px-2 text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "handwash"
                      ? "bg-pink-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-pink-50"
                  }`}
                >
                  <Droplets className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === "th" ? "ล้างมือ 6 ขั้น WHO" : "6-Step Handwash"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("busybook")}
                  className={`flex items-center justify-center gap-1.5 rounded-lg py-2 px-2 text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "busybook"
                      ? "bg-pink-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-pink-50"
                  }`}
                >
                  <Scissors className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === "th" ? "ด่าน Busy Book 6 หมวด" : "6 Busy Book Parts"}</span>
                </button>
              </div>

              {/* 6 Interactive Items */}
              <div className="space-y-1.5">
                {visibleItems.map((it) => {
                  const done = completedIds.includes(it.id);
                  return (
                    <button
                      key={it.id}
                      type="button"
                      onClick={() => toggleItem(it.id, it.tab)}
                      className={`w-full text-left flex items-center gap-3 rounded-xl border p-2.5 transition-all cursor-pointer ${
                        done
                          ? "border-pink-400 bg-pink-50 shadow-xs"
                          : "border-slate-200 bg-white hover:border-pink-300"
                      }`}
                    >
                      <span className="text-lg shrink-0">{it.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-[#1E293B] truncate">
                          {lang === "th" ? it.titleTh : it.titleEn}
                        </div>
                        <div className="text-xs text-slate-600 truncate">
                          {lang === "th" ? it.tipTh : it.tipEn}
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
            SECTION 2: FREEBIE 5-PAGE LEAD MAGNET (INCLUDES VIRAL P15!)
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
                  src="/edu/bb01/mockup-01-cover.webp"
                  alt="EDU-BB01 Freebie Cover Preview"
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
                    ? "ทดลองปริ้นท์ให้ลูกเล่นฟรีก่อนซื้อ (0 ฿) • แถมหน้าไวรัล P15!"
                    : "TRY BEFORE YOU BUY • FREE 5-PAGE PDF WITH P15 TEETH BOARD!"}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">
                {lang === "th"
                  ? "ดาวน์โหลดชุดทดลองฟรี 5 หน้า (ลีลามือ + บอร์ด 6 สี + บอร์ดแปรงฟันไวท์บอร์ด P15!)"
                  : "Download the 5-Page Free Sample (Tracing + 6 Colors Mat + Wipe-Clean Teeth Board!)"}
              </h2>

              <p className="text-sm text-slate-700 leading-relaxed">
                {lang === "th"
                  ? "คลิกโหลดไฟล์ PDF ไปปริ้นท์ A4 ได้เลยทันทีไม่ต้องลงทะเบียน ใส่ซองใสหรือเคลือบให้ลูกเล่นเกมเช็ดคราบแมงกินฟันคู่กับนาฬิกาแปรงฟัน 2 นาทีด้านบนได้เลยวันนี้!"
                  : "Direct 1-click download — no login needed. Slip Page 15 into a sheet protector and let your toddler brush away dry-erase spots alongside our 2-minute timer!"}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href="/edu/bb01/EDU-BB01_Freebie_5Pages_TH.pdf"
                  download="EDU-BB01_Freebie_5Pages_TH.pdf"
                  onClick={() =>
                    showToast(
                      "📥 กำลังดาวน์โหลด Busy Book น้องชาบูฟรี (5 หน้า) — ปริ้นท์ลองเล่นบอร์ดแปรงฟันได้เลย!"
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-700 hover:bg-sky-800 px-5 py-3 text-sm sm:text-base font-bold text-white shadow-md shadow-sky-600/20 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>โหลดฟรี 5 หน้า (ภาษาไทย • PDF)</span>
                </a>

                <a
                  href="/edu/bb01/EDU-BB01_Freebie_5Pages_EN.pdf"
                  download="EDU-BB01_Freebie_5Pages_EN.pdf"
                  onClick={() =>
                    showToast(
                      "📥 Downloading Shabu’s English 5-Page Freebie PDF — ready to print!"
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
            <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-300 bg-pink-50 px-3 py-1 text-xs font-bold text-pink-900">
              <Layers className="w-3.5 h-3.5 text-pink-600" />
              <span>
                {lang === "th"
                  ? "3-IN-1 BUSY BOOK • ขอบเจาะรู 20mm + การ์ดตีนตุ๊กแก 45 ชิ้นติดป้ายหน้า"
                  : "3-IN-1 BUSY BOOK • 20MM BINDER MARGIN + 45 PAGE-TAGGED VELCRO PIECES"}
              </span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
              {lang === "th"
                ? "ปลดล็อกเล่มเต็ม 32 หน้า (ครบ 4 ไฟล์ TH/EN × สี/ขาวดำ)"
                : "Unlock the Complete 32-Page Busy Book (4 PDFs: TH/EN × Color/B&W)"}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === "th"
                ? "ครบทั้งลีลามือ 6 หน้า, บอร์ดตีนตุ๊กแก 6 หมวด, บอร์ดแปรงฟันลบได้, ล้างมือ 6 ขั้น WHO, ฝึกกรรไกร, เขาวงกต และการ์ดตัดแปะ 45 ชิ้น!"
                : "Includes 6 tracing pages, 6 Velcro boards, wipe-clean teeth board, 6-step handwashing, safe scissor practice, easy maze & 45 cutout pieces!"}
            </p>
          </div>

          {/* 4-Image Interactive Gallery */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {GALLERY_IMAGES.map((img, idx) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden text-left hover:border-pink-400 shadow-xs transition-all cursor-pointer"
              >
                <div className="aspect-square overflow-hidden bg-[#FDF2F8]">
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
            <div className="rounded-3xl border-2 border-pink-300 bg-white p-6 flex flex-col justify-between space-y-6 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-100 border border-pink-300 px-3 py-1 text-xs font-extrabold text-pink-900">
                    <Home className="w-3.5 h-3.5" />
                    <span>HOME EDITION</span>
                  </span>
                  <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-xs font-bold text-emerald-900">
                    {lang === "th" ? "ยอดนิยมสำหรับพ่อแม่ 3–5 ปี" : "Best for Toddlers 3–5"}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#1E293B]">
                    {lang === "th"
                      ? "สิทธิ์ใช้ในครอบครัว (Personal Use)"
                      : "Family & Personal License"}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2.5 flex-wrap">
                    <span className="text-4xl font-extrabold text-pink-700">
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
                        "ครบ 32 หน้าเต็ม: ลีลามือ 6 หน้า + บอร์ดตีนตุ๊กแก 6 หมวด + การ์ด 45 ชิ้นติดป้ายหน้า",
                        "ไฮไลต์บอร์ดแปรงฟันไวท์บอร์ด P15 + ล้างมือ 6 ขั้น WHO + ฝึกกรรไกร + เขาวงกต",
                        "ได้ครบ 4 ไฟล์ PDF: ภาษาไทย (สี/ขาวดำ) + อังกฤษ (สี/ขาวดำ)",
                        "เผื่อขอบซ้าย 20mm ทุกหน้า เข้าห่วงพกไปร้านอาหารได้ทั้ง A4 & US Letter",
                      ]
                    : [
                        "Full 32 pages: 6 tracing pages + 6 Velcro mats + 45 page-tagged cutout cards",
                        "Includes viral Wipe-Clean Teeth Board + 6-Step Handwashing + Scissor Skills",
                        "All 4 PDFs included: English (Color/B&W) + Thai (Color/B&W)",
                        "20mm left binder margin ready for laminating on A4 & US Letter",
                      ]
                  ).map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={getEduOrderLineUrl({
                  sku: "EDU-BB01",
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
                      ? "สำหรับครูอนุบาล / เนอสเซอรี"
                      : "Preschool & Nursery Teachers"}
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
                        "สิทธิ์ถูกกฎหมายสำหรับคุณครู 1 ท่าน ทำมุมประสบการณ์ & ปริ้นท์แจกเด็กไม่จำกัด",
                        "ได้ครบทั้ง 4 ไฟล์ PDF (TH/EN × สี/ขาวดำ) + เวอร์ชันขาวดำถ่ายเอกสารคมชัด",
                        "มีเช็กลิสต์ประเมินพัฒนาการกล้ามเนื้อมัดเล็ก 3–5 ปี (หน้า 30) ใช้อ้างอิงได้ทันที",
                        "เปิดนาฬิกาจับเวลาล้างมือ 20 วิ / แปรงฟัน 2 นาทีขึ้นจอหน้าห้องได้เลย",
                      ]
                    : [
                        "Legal Classroom License for 1 teacher — unlimited student prints",
                        "All 4 PDFs (EN/TH × Color/B&W) with ink-saving photocopier mode",
                        "Includes Ages 3–5 Fine Motor Developmental Checklist (Page 30)",
                        "Project this 20-sec handwash / 2-min brushing timer for your whole class",
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
                  sku: "EDU-BB01",
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
            SECTION 4: BUILT-IN CROSS-SELL (3-LIVE TRIO & ALL-4 BUNDLE)
        ============================================================ */}
        <section className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-[#FEF9EF] via-white to-[#FDF2F8] p-5 sm:p-8 shadow-md space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-950">
                <Gift className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  {lang === "th"
                    ? "⚡ โปร 3 เล่มพร้อมใช้ทันที (EF01 + RT01 + BB01 = 249 ฿)"
                    : "⚡ 3-BOOK LIVE TRIO PACK (EF01 + RT01 + BB01)"}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">
                {lang === "th"
                  ? "เหมาครบ 3 เล่มที่เว็บ QR ใช้งานได้เต็มระบบ 100% วันนี้!"
                  : "Bundle All 3 Live Hybrid QR Kits (96 Pages • 12 PDFs)!"}
              </h2>

              <p className="text-sm text-slate-700 leading-relaxed">
                {lang === "th"
                  ? "ได้ครบทั้ง Busy Book น้องชาบู (BB01) + ชุดสร้างวินัย 30 วันแม่ใหญ่ (RT01) + นักสืบสมองไว EF น้องแซลมอน (EF01) รวม 96 หน้า 12 ไฟล์ PDF พร้อมเว็บจับเวลาใช้งานได้ทันทีทั้ง 3 เล่ม!"
                  : "Get Shabu’s Busy Book (BB01) + Mama Mami’s 30-Day Routine (RT01) + Detective Salmon’s Brain EF (EF01) — 96 pages / 12 PDFs with all 3 companion timers live today!"}
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border-2 border-amber-300 bg-white p-4 text-center space-y-3 min-w-[240px] shadow-sm">
              <div>
                <div className="text-xs text-slate-400 line-through">
                  {lang === "th" ? "ปกติ 297 ฿" : "Regular $14.97"}
                </div>
                <div className="text-3xl font-extrabold text-amber-700">
                  {lang === "th" ? "249 ฿" : "$11.99"}
                </div>
                <div className="text-[11px] font-bold text-emerald-700">
                  {lang === "th"
                    ? "ประหยัดทันที 48 ฿ • พร้อมใช้ 100%!"
                    : "Save 20% • All 3 Live Today!"}
                </div>
              </div>

              <a
                href={getEduOrderLineUrl({
                  sku: "EDU-BB01",
                  edition: "TRIO_LIVE",
                  lang,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-500 px-4 py-2.5 text-sm font-extrabold text-slate-950 transition-colors"
              >
                <FaLine className="w-4 h-4 text-[#047857]" />
                <span>
                  {lang === "th"
                    ? "สั่งแพ็ก 3 เล่ม (249 ฿)"
                    : "Order Live Trio Pack"}
                </span>
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <Link
              href="/edu/rt01"
              className="inline-flex items-center gap-1.5 font-extrabold text-rose-700 hover:text-rose-900"
            >
              <span>
                {lang === "th"
                  ? "ลองเล่น EDU-RT01 แม่ใหญ่วินัย 30 วัน (ฟรี 5 หน้า)"
                  : "Try EDU-RT01 Mama Mami Routine (Free 5 Pages)"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/edu/ef01"
              className="inline-flex items-center gap-1.5 font-extrabold text-amber-800 hover:text-amber-950"
            >
              <span>
                {lang === "th"
                  ? "ลองเล่น EDU-EF01 น้องแซลมอน EF (ฟรี 5 หน้า)"
                  : "Try EDU-EF01 Detective Salmon EF (Free 5 Pages)"}
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
            <HelpCircle className="w-5 h-5 text-pink-600" />
            <h2 className="text-lg sm:text-xl font-extrabold">
              {lang === "th"
                ? "คำถามที่พบบ่อย & วิธีประกอบ Busy Book น้องชาบู"
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
                    className="w-full flex items-center justify-between gap-3 text-left text-sm sm:text-base font-bold text-[#1E293B] hover:text-pink-700 transition-colors cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180 text-pink-600" : ""
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
                  ? "รองรับ A4 & US Letter • ขอบเจาะรู 20mm • การ์ดติดป้ายหน้าทุกชิ้น"
                  : "A4 & US Letter • 20mm Binder Margin • Page-Tagged Velcro Cards"}
              </span>
            </span>
            <Link
              href="/edu"
              className="text-pink-700 hover:underline font-bold"
            >
              {lang === "th"
                ? "ดูสื่อทั้งหมด 4 เล่มใน iAon Edu-Verse →"
                : "Explore all 4 kits in iAon Edu-Verse →"}
            </Link>
          </div>
        </section>
      </div>

      {/* LIGHTBOX MODAL */}
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

            <div className="relative flex items-center justify-center bg-[#FDF2F8] rounded-2xl p-2">
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

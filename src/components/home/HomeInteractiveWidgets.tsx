"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import {
  Play,
  Square,
  Volume2,
  Sparkles,
  ArrowRight,
  Clock,
  Sliders,
  Music,
  Palette,
} from "lucide-react";
import { EDU_CATALOG } from "@/lib/eduCatalog";
import { useSiteLang } from "@/components/providers/LanguageProvider";

// =========================================================================
// 1. TOP SCROLL PROGRESS BAR
// =========================================================================
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-50 bg-linear-to-r from-[#2563EB] via-[#F59E0B] to-[#7C3AED] pointer-events-none"
    />
  );
}

// =========================================================================
// 2. ANIMATED COUNT-UP METRIC
// =========================================================================
export function CountUpMetric({
  target,
  suffix = "",
  label,
}: {
  target: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const duration = 1100;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <div ref={ref} className="min-w-0">
      <div className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight tabular-nums">
        {val.toLocaleString()}
        {suffix}
      </div>
      <div className="text-xs text-[#475569] mt-0.5">{label}</div>
    </div>
  );
}

// =========================================================================
// 3. 3D TILT + CURSOR SPOTLIGHT GLOW CARD (Stripe / Linear Style)
// =========================================================================
export function SpotlightTiltCard({
  children,
  glowColor = "rgba(37, 99, 235, 0.14)",
  className = "",
}: {
  children: React.ReactNode;
  glowColor?: string;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50, active: false });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setSpot({ x: px * 100, y: py * 100, active: true });
    setTilt({
      rx: (0.5 - py) * 4.5,
      ry: (px - 0.5) * 4.5,
    });
  };

  const handleLeave = () => {
    setSpot((s) => ({ ...s, active: false }));
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: spot.active
          ? "transform 120ms ease-out"
          : "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className={`relative will-change-transform ${className}`}
    >
      {/* Subtle Cursor Spotlight Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl z-10 transition-opacity duration-300"
        style={{
          opacity: spot.active ? 1 : 0,
          background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, ${glowColor}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

// =========================================================================
// 4. INFINITE SMOOTH SHOWCASE MARQUEE (ALL 4 PILLARS FLAGSHIP PRODUCTS)
// =========================================================================
interface FlagshipMarqueeItem {
  id: string;
  code: string;
  pillarTh: string;
  pillarEn: string;
  pillarClass: string;
  titleTh: string;
  titleEn: string;
  priceThb: string;
  priceUsd: string;
  href: string;
  image: string;
  imageBg?: string;
}

export function LiveShowcaseMarquee() {
  const { lang, t } = useSiteLang();

  const eduBySlug = (slug: string) =>
    EDU_CATALOG.find((item) => item.slug === slug);

  const FLAGSHIP_ITEMS: FlagshipMarqueeItem[] = [
    {
      id: "aona09",
      code: "AONA09",
      pillarTh: "AiAon Tech",
      pillarEn: "AiAon Tech",
      pillarClass: "bg-blue-600 text-white",
      titleTh: "ระบบแจ้งซ่อม & Telegram 2 ทาง",
      titleEn: "Smart Repair & 2-Way Telegram",
      priceThb: "490฿",
      priceUsd: "$14.99",
      href: "/digital-vault",
      image: "/images/mockups/aona09_repair_telegram_mockup.jpg",
    },
    {
      id: "eb-pa-01",
      code: "EB-PA-01",
      pillarTh: "E-Book ครูไทย",
      pillarEn: "Thai E-Book",
      pillarClass: "bg-amber-600 text-white",
      titleTh: "คัมภีร์ ว.PA ผ่านฉลุย 100%",
      titleEn: "PA Mastery Playbook 100%",
      priceThb: "290฿",
      priceUsd: "$8.99",
      href: "/ebooks",
      image: "/images/ebooks/eb01_pa_mastery.jpg",
    },
    {
      id: "edu-ef01",
      code: "EDU-EF01",
      pillarTh: "Edu-Verse",
      pillarEn: "Edu-Verse",
      pillarClass: "bg-rose-600 text-white",
      titleTh: "นักสืบแซลมอน EF สมองไว",
      titleEn: "Detective Salmon Brain & EF",
      priceThb: "99฿",
      priceUsd: "$4.99",
      href: "/edu/ef01",
      image: eduBySlug("ef01")?.coverImage || "/images/ebooks/eb01_pa_mastery.jpg",
    },
    {
      id: "stk-3d",
      code: "STK-3D",
      pillarTh: "AiAon Studio",
      pillarEn: "AiAon Studio",
      pillarClass: "bg-violet-600 text-white",
      titleTh: "ปั้นสติกเกอร์ LINE 3D จากรูปจริง",
      titleEn: "Custom 3D LINE Stickers",
      priceThb: "390฿",
      priceUsd: "$11.99",
      href: "/line-stickers",
      image: "/images/stickers/set2/main.png",
      imageBg: "bg-[#FAF8FF]",
    },
    {
      id: "aona10",
      code: "AONA10",
      pillarTh: "AiAon Tech",
      pillarEn: "AiAon Tech",
      pillarClass: "bg-blue-600 text-white",
      titleTh: "ระบบตรวจสุขาภิบาล 3 เวลา",
      titleEn: "3-Time Hygiene QR Matrix",
      priceThb: "490฿",
      priceUsd: "$14.99",
      href: "/digital-vault",
      image: "/images/mockups/aona10_hygiene_matrix_mockup.jpg",
    },
    {
      id: "eb-ai-02",
      code: "EB-AI-02",
      pillarTh: "E-Book ครูไทย",
      pillarEn: "Thai E-Book",
      pillarClass: "bg-amber-600 text-white",
      titleTh: "100 คำสั่ง AI ลับเสกงานครู",
      titleEn: "100 Secret AI Prompts for Teachers",
      priceThb: "290฿",
      priceUsd: "$8.99",
      href: "/ebooks",
      image: "/images/ebooks/eb02_ai_prompts.jpg",
    },
    {
      id: "audio-01",
      code: "AUDIO",
      pillarTh: "AiAon Audio",
      pillarEn: "AiAon Audio",
      pillarClass: "bg-teal-600 text-white",
      titleTh: "เพลงช่วยจำ & BGM ปลอดลิขสิทธิ์",
      titleEn: "Royalty-Free BGM & Study Songs",
      priceThb: "199฿",
      priceUsd: "$5.99",
      href: "/music-store",
      image: "/images/mockups/indie_folk_guitar_cover.png",
    },
    {
      id: "edu-st01",
      code: "BOXSET-6",
      pillarTh: "Edu-Verse",
      pillarEn: "Edu-Verse",
      pillarClass: "bg-rose-600 text-white",
      titleTh: "นิทานแก๊ง 6 แมว Season 1 (6 เล่ม)",
      titleEn: "6 Cats Watercolor Storybooks",
      priceThb: "349฿",
      priceUsd: "$11.99",
      href: "/edu/st01",
      image: eduBySlug("st01")?.coverImage || "/images/ebooks/eb03_car_research.jpg",
    },
    {
      id: "eb-car-03",
      code: "EB-CAR-03",
      pillarTh: "E-Book ครูไทย",
      pillarEn: "Thai E-Book",
      pillarClass: "bg-amber-600 text-white",
      titleTh: "สูตรลับวิจัยในชั้นเรียน 5 บท",
      titleEn: "Classroom Research (CAR) Guide",
      priceThb: "250฿",
      priceUsd: "$7.99",
      href: "/ebooks",
      image: "/images/ebooks/eb03_car_research.jpg",
    },
    {
      id: "edu-cb01",
      code: "EDU-CB01",
      pillarTh: "Edu-Verse",
      pillarEn: "Edu-Verse",
      pillarClass: "bg-rose-600 text-white",
      titleTh: "สมุดระบายสีแก๊ง 6 แมว (40 หน้า)",
      titleEn: "6 Cats Bold Coloring Book (40p)",
      priceThb: "49฿",
      priceUsd: "$2.99",
      href: "/edu/cb01",
      image: eduBySlug("cb01")?.coverImage || "/images/ebooks/eb04_google_sheets.jpg",
    },
    {
      id: "aone01",
      code: "AONE01",
      pillarTh: "AiAon Tech",
      pillarEn: "AiAon Tech",
      pillarClass: "bg-blue-600 text-white",
      titleTh: "ระบบเช็กชื่อ & พฤติกรรมนักเรียน",
      titleEn: "Student Attendance & Behavior OS",
      priceThb: "490฿",
      priceUsd: "$14.99",
      href: "/digital-vault",
      image: "/images/mockups/admin_dashboard_pro.png",
    },
    {
      id: "edu-fc01",
      code: "EDU-FC01",
      pillarTh: "Edu-Verse",
      pillarEn: "Edu-Verse",
      pillarClass: "bg-rose-600 text-white",
      titleTh: "แฟลชการ์ด 2 ภาษา 48 การ์ด + เสียง",
      titleEn: "48 Bilingual Audio Flashcards",
      priceThb: "59฿",
      priceUsd: "$3.49",
      href: "/edu/fc01",
      image: eduBySlug("fc01")?.coverImage || "/images/ebooks/eb05_active_learning.jpg",
    },
  ];

  const items = [...FLAGSHIP_ITEMS, ...FLAGSHIP_ITEMS];

  return (
    <section
      aria-label={t("สินค้าเด่นครบทั้ง 4 เสาหลัก AiAon", "Featured Flagship Products Across All 4 AiAon Pillars")}
      className="py-6 sm:py-8 bg-white border-b border-[#E2E8F0] overflow-hidden"
    >
      <style>{`
        @keyframes aiaon-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .aiaon-marquee-track {
          display: flex;
          width: max-content;
          animation: aiaon-marquee 40s linear infinite;
        }
        .aiaon-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-600">
          <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
          <span>
            {t(
              "FLAGSHIP SHOWCASE • สินค้าเด่นครบทั้ง 4 เสาหลัก (ระบบ AI • E-Book • Edu-Verse • Audio • สติกเกอร์ 3D)",
              "FLAGSHIP SHOWCASE • Featured Hits Across All 4 Pillars (Tech • E-Books • Edu-Verse • Audio • Studio)"
            )}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold">
          <Link
            href="/digital-vault"
            className="text-[#1D4ED8] hover:underline inline-flex items-center gap-1"
          >
            <span>{t("ดูระบบทั้งหมด", "All Systems")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-slate-300">•</span>
          <Link
            href="/edu"
            className="text-[#B45309] hover:underline inline-flex items-center gap-1"
          >
            <span>{t("คลังสื่อ 15 เล่ม", "15 Edu Kits")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-linear-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-linear-to-l from-white to-transparent z-10" />

        <div className="aiaon-marquee-track gap-3.5 px-2">
          {items.map((item, idx) => (
            <Link
              key={`${item.id}-${idx}`}
              href={item.href}
              className="group w-40 sm:w-48 shrink-0 rounded-2xl border border-[#E2E8F0] hover:border-[#2563EB]/60 bg-[#FFFDF7] p-2 shadow-2xs hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className={`relative aspect-square rounded-xl overflow-hidden border border-slate-100 ${item.imageBg || "bg-white"}`}>
                <img
                  src={item.image}
                  alt={lang === "en" ? item.titleEn : item.titleTh}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span
                  className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9.5px] font-bold shadow-xs ${item.pillarClass}`}
                >
                  {lang === "en" ? item.pillarEn : item.pillarTh}
                </span>
              </div>
              <div className="mt-2 px-1">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-500">
                  <span>{item.code}</span>
                  <span className="text-[#0F172A] font-extrabold">
                    {lang === "en" ? item.priceUsd : item.priceThb}
                  </span>
                </div>
                <div className="text-xs font-bold text-[#0F172A] truncate mt-0.5">
                  {lang === "en" ? item.titleEn : item.titleTh}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// 5. LIVE "TRY-IT-NOW" MINI INTERACTIVE PLAYGROUND (3-IN-1 BENTO)
// =========================================================================
const MINI_CATS = [
  { id: "kt", name: "ข้าวต้ม", emoji: "🎵", word: "Hello • สวัสดี!", aff: "หนูทักทายด้วยรอยยิ้มอบอุ่น!", speak: "Hello", badge: "bg-sky-100 text-sky-900 border-sky-200" },
  { id: "sb", name: "ชาบู", emoji: "🎀", word: "Sparkle • ฟันสะอาด!", aff: "แปรงฟัน 2 นาที ฟันแข็งแรง!", speak: "Sparkle", badge: "bg-pink-100 text-pink-900 border-pink-200" },
  { id: "sm", name: "แซลมอน", emoji: "🔎", word: "Focus • มีสมาธิ!", aff: "ใจที่สงบช่วยให้เห็นทางออกชัด!", speak: "Focus", badge: "bg-amber-100 text-amber-900 border-amber-200" },
  { id: "bb", name: "บ๊อบ", emoji: "🗺️", word: "Brave • กล้าหาญ!", aff: "หนูกล้าลองก้าวแรกเสมอ!", speak: "Brave", badge: "bg-teal-100 text-teal-900 border-teal-200" },
  { id: "mm", name: "แม่ใหญ่", emoji: "💖", word: "Warmth • อบอุ่นใจ!", aff: "หนูเป็นที่รักและปลอดภัยเสมอ!", speak: "Warmth", badge: "bg-rose-100 text-rose-900 border-rose-200" },
  { id: "md", name: "น้องดำ", emoji: "🎨", word: "Gentle • อ่อนโยน!", aff: "ความอ่อนโยนคือพลังวิเศษของหนู!", speak: "Gentle", badge: "bg-indigo-100 text-indigo-900 border-indigo-200" },
];

export function LiveTryItPlayground() {
  const { t } = useSiteLang();
  // Widget A: Web Audio Live Groove Synthesizer
  const [playing, setPlaying] = useState(false);
  const [beatStep, setBeatStep] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Widget B: 6-Cat Instant Bilingual Voice Picker
  const [catIdx, setCatIdx] = useState(0);

  // Widget C: Creative Laziness ROI Slider
  const [hoursPerWeek, setHoursPerWeek] = useState(6);

  const stopGroove = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setPlaying(false);
    setBeatStep(0);
  };

  const toggleGroove = () => {
    if (playing) {
      stopGroove();
      return;
    }
    try {
      const AudioCtor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtor();
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 392.0, 329.63];
      let step = 0;

      const playStep = () => {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = step % 2 === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(scale[step % scale.length], now);
        gain.gain.setValueAtTime(0.11, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);

        if (step % 4 === 0) {
          const kick = ctx.createOscillator();
          const kGain = ctx.createGain();
          kick.frequency.setValueAtTime(135, now);
          kick.frequency.exponentialRampToValueAtTime(42, now + 0.14);
          kGain.gain.setValueAtTime(0.22, now);
          kGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          kick.connect(kGain);
          kGain.connect(ctx.destination);
          kick.start(now);
          kick.stop(now + 0.16);
        }

        setBeatStep(step % 8);
        step += 1;
      };

      setPlaying(true);
      playStep();
      timerRef.current = setInterval(playStep, 315); // ~95 BPM eighth-note groove
    } catch {
      setPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handlePickCat = (i: number) => {
    setCatIdx(i);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(MINI_CATS[i].speak);
        u.lang = "en-US";
        u.rate = 0.9;
        window.speechSynthesis.speak(u);
      } catch {
        // ignore
      }
    }
  };

  const activeCat = MINI_CATS[catIdx];
  const savedHoursPerYear = Math.round(hoursPerWeek * 0.75 * 40);
  const savedWorkDays = Math.round(savedHoursPerYear / 8);

  return (
    <section className="py-14 sm:py-18 bg-[#FAF8F5] border-b border-[#E2E8F0]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#0D9488]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("INTERACTIVE PLAYGROUND • ลองเล่นของจริงใน 3 วินาที", "INTERACTIVE PLAYGROUND • TRY IT LIVE IN 3 SECONDS")}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {t("สัมผัสประสบการณ์จริงก่อนคลิกเข้าแต่ละโลก", "Experience Real Interactive Tools Right Here")}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] max-w-md">
            {t(
              "ทุกปุ่มด้านล่างทำงานจริงบนเบราว์เซอร์ทันที 100% — สะท้อน DNA งานโค้ด ดนตรี และสื่อเด็กเล็กของ AiAon",
              "Every widget below runs live in your browser with zero ads — showcasing AiAon's blend of Code, Music, and Early Learning."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* MINI APP 1: AIAON AUDIO LIVE GROOVE */}
          <div className="rounded-3xl bg-linear-to-br from-[#F0FDFA]/90 via-white to-white border-2 border-teal-200 hover:border-teal-400 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="h-1.5 w-full bg-linear-to-r from-[#0D9488] to-[#38BDF8]" />
            <div className="p-6 flex-1 flex flex-col justify-between gap-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 border border-teal-200 px-3 py-1 text-[11px] font-extrabold text-teal-900">
                    <Music className="w-3.5 h-3.5" />
                    <span>AiAon Audio • Live Synth</span>
                  </span>
                  <span className="text-[11px] font-mono font-bold text-teal-700">95 BPM</span>
                </div>
                <h3 className="text-lg font-extrabold text-[#0F172A]">
                  {t("กดฟังจังหวะ & คลื่นเสียงสด", "Play Live Groove & Waveform")}
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {t(
                    "สังเคราะห์เสียงแบบเรียลไทม์ด้วย Web Audio API — ตัวอย่างความสนุกของสื่อดนตรีเด็ก & BGM ปลอดลิขสิทธิ์",
                    "Real-time Web Audio synthesizer — a taste of our kid-friendly music kits & royalty-free BGM."
                  )}
                </p>

                {/* Animated Waveform Bars */}
                <div className="h-16 rounded-2xl bg-teal-50/70 border border-teal-200/80 px-4 flex items-center justify-center gap-1.5">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const h = playing
                      ? 18 + ((i * 19 + beatStep * 23) % 38)
                      : 10 + (i % 3) * 6;
                    return (
                      <span
                        key={i}
                        style={{ height: `${h}px` }}
                        className={`w-2 rounded-full transition-all duration-150 ${
                          playing ? "bg-linear-to-t from-teal-600 to-cyan-400" : "bg-teal-300/70"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleGroove}
                  className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                    playing
                      ? "bg-rose-600 hover:bg-rose-700 text-white"
                      : "bg-[#0F766E] hover:bg-[#115E59] text-white"
                  }`}
                >
                  {playing ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{playing ? t("หยุดจังหวะ", "Stop Beat") : t("กดฟังจังหวะสด", "Play Live Beat")}</span>
                </button>
                <Link
                  href="/music-store"
                  className="inline-flex items-center justify-center rounded-xl border border-teal-200 bg-teal-50 hover:bg-teal-100 px-3 py-2.5 text-xs font-bold text-teal-900"
                >
                  {t("ร้านเพลง →", "Audio →")}
                </Link>
              </div>
            </div>
          </div>

          {/* MINI APP 2: AIAON EDU-VERSE 6-CAT VOICE PICKER */}
          <div className="rounded-3xl bg-linear-to-br from-[#FEF9EF] via-white to-white border-2 border-amber-200 hover:border-amber-400 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="h-1.5 w-full bg-linear-to-r from-[#F59E0B] to-[#FB7185]" />
            <div className="p-6 flex-1 flex flex-col justify-between gap-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-[11px] font-extrabold text-amber-950">
                    <Palette className="w-3.5 h-3.5" />
                    <span>AiAon Edu-Verse • 15 Live</span>
                  </span>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="text-lg font-extrabold text-[#0F172A]">
                  {t("จิ้มแก๊ง 6 แมวฟังเสียง 2 ภาษา", "Tap 6 Cats for Bilingual Voice")}
                </h3>

                <div className="grid grid-cols-3 gap-1.5">
                  {MINI_CATS.map((c, idx) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handlePickCat(idx)}
                      className={`rounded-xl border px-2 py-1.5 text-xs font-bold cursor-pointer transition-all ${
                        idx === catIdx
                          ? "border-amber-500 bg-amber-200/80 text-slate-950 shadow-2xs"
                          : "border-amber-200/80 bg-white text-slate-700 hover:border-amber-400"
                      }`}
                    >
                      {c.emoji} {c.name}
                    </button>
                  ))}
                </div>

                <div className={`rounded-2xl border p-3 text-center space-y-0.5 ${activeCat.badge}`}>
                  <div className="text-sm font-extrabold">{activeCat.word}</div>
                  <div className="text-[11px] font-semibold opacity-90">“{activeCat.aff}”</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/edu/cb01"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 px-3.5 py-2.5 text-xs font-extrabold text-slate-950 transition-colors"
                >
                  <span>{t("ลองระบายสีฟรี", "Color Online Free")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/edu/fc01"
                  className="inline-flex items-center justify-center rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 px-3 py-2.5 text-xs font-bold text-amber-950"
                >
                  {t("การ์ดเสียง →", "Cards →")}
                </Link>
              </div>
            </div>
          </div>

          {/* MINI APP 3: CREATIVE LAZINESS TIME-SAVED ROI CALCULATOR */}
          <div className="rounded-3xl bg-linear-to-br from-[#EFF6FF]/90 via-white to-white border-2 border-blue-200 hover:border-blue-400 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="h-1.5 w-full bg-linear-to-r from-[#2563EB] to-[#6366F1]" />
            <div className="p-6 flex-1 flex flex-col justify-between gap-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 border border-blue-200 px-3 py-1 text-[11px] font-extrabold text-blue-900">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>AiAon Tech • Time ROI</span>
                  </span>
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-extrabold text-[#0F172A]">
                  {t("คำนวณเวลาที่ระบบคืนให้ชีวิตคุณ", "Calculate Hours Saved Per Year")}
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>{t("งานเอกสารซ้ำๆ ต่อสัปดาห์", "Repetitive tasks / week")}</span>
                    <span className="text-[#1D4ED8] font-mono">
                      {hoursPerWeek} {t("ชม./สัปดาห์", "hrs/wk")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={20}
                    step={1}
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    aria-label={t("ชั่วโมงงานเอกสารต่อสัปดาห์", "Weekly repetitive hours")}
                    className="w-full accent-[#2563EB] cursor-pointer"
                  />
                </div>

                <div className="rounded-2xl bg-blue-100/70 border border-blue-200 p-3.5 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[11px] font-bold text-blue-900">
                      {t("ระบบอัตโนมัติช่วยคืนเวลาให้", "Automation returns")}
                    </div>
                    <div className="text-2xl font-black text-[#1D4ED8] tabular-nums">
                      +{savedHoursPerYear} {t("ชม./ปี", "hrs/yr")}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-xl bg-white border border-blue-200 px-2.5 py-1 text-xs font-extrabold text-slate-900">
                      ≈ {savedWorkDays} {t("วันทำงานเต็ม!", "work days!")}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/digital-vault"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors"
              >
                <span>{t("ดูคลัง 20+ ระบบอัตโนมัติ", "Explore 20+ Automation Apps")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

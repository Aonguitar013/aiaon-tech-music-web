"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Palette,
  Wind,
  Heart,
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
  Layers,
  Gift,
  Play,
  Square,
  Volume2,
  VolumeX,
} from "lucide-react";
import { FaLine } from "react-icons/fa6";
import { playApplauseAndFanfare, playStarPop } from "@/lib/eduAudio";
import { playSoftTapChime } from "@/lib/eduPhonicsAudio";
import { type EduLang, getEduOrderLineUrl } from "@/lib/eduCatalog";

type PrimaryColor = "red" | "yellow" | "blue";
type BreathPhase = "idle" | "inhale" | "hold" | "exhale";

const MOOD_WHEEL = [
  { id: "happy", emoji: "😊", color: "bg-amber-100 border-amber-300 text-amber-950", titleTh: "มีความสุข (Happy)", titleEn: "Happy", tipTh: "ยอดเยี่ยมเลย! ลองวาดรูปสิ่งที่ทำให้หนูยิ้มวันนี้ลงในดอกไม้ขอบคุณ (P08) นะ!", tipEn: "Wonderful! Draw what made you smile inside your Gratitude Flower (P08)!" },
  { id: "calm", emoji: "😌", color: "bg-sky-100 border-sky-300 text-sky-950", titleTh: "สงบสบายใจ (Calm)", titleEn: "Calm", tipTh: "หัวใจโล่งสบายพร้อมสร้างงานศิลปะ! ลองวาดรูป 4 ขั้นตอน (P09–14) กันเลย", tipEn: "Peaceful heart ready to create! Try a 4-step guided drawing (P09–14)!" },
  { id: "shy", emoji: "🙈", color: "bg-indigo-100 border-indigo-300 text-indigo-950", titleTh: "ขี้อาย (Shy)", titleEn: "Shy", tipTh: "เขินนิดหน่อยไม่เป็นไรเลย น้องดำก็ขี้อายเหมือนกัน ค่อยๆ วอร์มเครื่องด้วยหุ่นนิ้วมือ (P23) นะ", tipEn: "Feeling shy is totally okay! Midnight is gentle too — warm up with finger puppets (P23)!" },
  { id: "angry", emoji: "😠", color: "bg-rose-100 border-rose-300 text-rose-950", titleTh: "โกรธ/หงุดหงิด (Angry)", titleEn: "Angry", tipTh: "ใจร้อนเหมือนไฟ มาลองกดปุ่มหายใจสายรุ้ง 4-4-4 ด้านล่างด้วยกัน 3 รอบนะ!", tipEn: "Big hot feelings! Tap the 4-4-4 Rainbow Breathing guide below for 3 slow rounds!" },
  { id: "sad", emoji: "😢", color: "bg-blue-100 border-blue-300 text-blue-950", titleTh: "เศร้า/เสียใจ (Sad)", titleEn: "Sad", tipTh: "ส่งกอดอุ่นๆ ให้นะครับ ลองขอกอดคุณพ่อคุณแม่ 10 วินาที หรือวาดความรู้สึกใส่กระดาษได้เลย", tipEn: "Sending a warm hug! Ask for a 10-second cuddle or draw your feelings softly." },
  { id: "proud", emoji: "🤩", color: "bg-emerald-100 border-emerald-300 text-emerald-950", titleTh: "ภูมิใจ (Proud)", titleEn: "Proud", tipTh: "เก่งมาก! อย่าลืมระบายสีหัวใจ 1 ดวงในขวดโหลความอ่อนโยน (P05) เป็นรางวัลนะ!", tipEn: "So proud of you! Color 1 heart inside your Kindness Jar (P05)!" },
];

const PRIMARY_COLORS: { id: PrimaryColor; nameTh: string; nameEn: string; hex: string; ring: string }[] = [
  { id: "red", nameTh: "สีแดง (Red)", nameEn: "Red", hex: "#EF4444", ring: "ring-red-400" },
  { id: "yellow", nameTh: "สีเหลือง (Yellow)", nameEn: "Yellow", hex: "#FACC15", ring: "ring-yellow-400" },
  { id: "blue", nameTh: "สีน้ำเงิน (Blue)", nameEn: "Blue", hex: "#3B82F6", ring: "ring-blue-400" },
];

function getMixResult(a: PrimaryColor, b: PrimaryColor) {
  const key = [a, b].sort().join("+");
  if (key === "red+yellow") return { hex: "#F97316", th: "สีส้ม (Orange)", en: "Orange", emoji: "🍊" };
  if (key === "blue+red") return { hex: "#8B5CF6", th: "สีม่วง (Purple)", en: "Purple", emoji: "🍇" };
  if (key === "blue+yellow") return { hex: "#22C55E", th: "สีเขียว (Green)", en: "Green", emoji: "🍏" };
  if (a === "red") return { hex: "#EF4444", th: "สีแดงเข้ม (Red)", en: "Red", emoji: "🍎" };
  if (a === "yellow") return { hex: "#FACC15", th: "สีเหลืองสด (Yellow)", en: "Yellow", emoji: "☀️" };
  return { hex: "#3B82F6", th: "สีน้ำเงินสด (Blue)", en: "Blue", emoji: "🐳" };
}

const STAGES = [
  { id: "a1", pages: "P03–P08", emoji: "💖", titleTh: "ด่าน 1: จานสี 6 อารมณ์ & สายรุ้งหายใจ", titleEn: "Stage 1: 6 Feelings & Rainbow Breathing" },
  { id: "a2", pages: "P09–P14", emoji: "✏️", titleTh: "ด่าน 2: วาดรูปตามขั้นตอน 4 สเต็ป 6 ภาพ", titleEn: "Stage 2: 6 Guided 4-Step Drawings" },
  { id: "a3", pages: "P15–P20", emoji: "🎨", titleTh: "ด่าน 3: ผสมแม่สี สมมาตร & การ์ตูน 4 ช่อง", titleEn: "Stage 3: Color Mixing, Symmetry & Comic" },
  { id: "a4", pages: "P21–P25", emoji: "✂️", titleTh: "ด่าน 4: มงกุฎ หุ่นนิ้วมือ & การ์ด SEL 9 ใบ", titleEn: "Stage 4: Crown, Puppets & 9 SEL Cards" },
  { id: "a5", pages: "P26–P28", emoji: "🖼️", titleTh: "ด่าน 5: กรอบรูปแกลเลอรี & เขาวงกตพู่กัน", titleEn: "Stage 5: Gallery Frame & Magic Maze" },
];

const GALLERY_IMAGES = [
  { src: "/edu/ac01/mockup-01-cover.webp", labelTh: "ปกหน้า & จุดเด่นชุดศิลปะ-พลังใจ 32 หน้า", labelEn: "Front Cover & 32-Page Highlights" },
  { src: "/edu/ac01/mockup-02-chapters.webp", labelTh: "ครบ 5 บทศิลปะ & SEL + หุ่นนิ้วมือ + มงกุฎ", labelEn: "Inside All 5 Art & SEL Chapters" },
  { src: "/edu/ac01/mockup-03-color-bw.webp", labelTh: "น้องดำประหยัดหมึก 100% (ไม่มีพื้นดำทึบ)", labelEn: "100% Ink-Friendly Color + B&W" },
  { src: "/edu/ac01/mockup-04-editions.webp", labelTh: "เทียบสิทธิ์ Home (99฿) vs Class Edition (199฿)", labelEn: "Home vs Class Edition Comparison" },
];

const FAQS = [
  {
    qTh: "น้องดำเป็นแมวดำ ปริ้นท์แล้วจะเปลืองหมึกไหม?",
    qEn: "Midnight is a black cat — will printing waste black ink?",
    aTh: "ไม่เปลืองแน่นอนครับ! เราล็อกกฎเหล็ก Ink-Friendly ไว้ใน UNIVERSE_BIBLE ตั้งแต่ต้น: โหมดสีใช้น้องดำโทนเทาพาสเทลนุ่ม (#475569) และโหมดขาว-ดำ (BW) เป็นลายเส้นโปร่ง 0% พื้นดำทึบ ปริ้นท์ที่บ้านหรือถ่ายเอกสารแจกทั้งห้องได้สบายครับ",
    aEn: "Not at all! Following our Ink-Friendly rule, Midnight uses soft pastel charcoal in Color mode and 100% clean open lineart with zero solid black fills in B&W mode.",
  },
  {
    qTh: "ลูกขี้อายมาก ไม่กล้าพูดกับเพื่อน ชุดนี้ช่วยได้อย่างไร?",
    qEn: "My child is very shy — how does this kit help?",
    aTh: "ชุดนี้ออกแบบให้ศิลปะเป็นพื้นที่ปลอดภัยครับ มีทั้งจานสี 6 อารมณ์ (ชี้บอกใจไม่ต้องฝืนพูด), บันไดความกล้า 5 ขั้น, หุ่นนิ้วมือแก๊งแมวไว้ซ้อมบทสนทนาผ่านการเล่น และโพยคำพูดสร้างความกล้าสำหรับพ่อแม่ท้ายเล่ม!",
    aEn: "Art creates a safe bridge: kids point to the 6-Feeling Wheel, climb the 5-Step Shy-to-Brave Ladder, role-play through cat finger puppets, and parents get a confidence phrase bank!",
  },
  {
    qTh: "ครบทั้ง 6 เล่มในจักรวาลแก๊ง 6 แมวแล้ว มีโปรเหมาครบชุดไหม?",
    qEn: "Is there a Complete 6-Book Universe Bundle now that all 6 cats are live?",
    aTh: "มีครับ! โปรเหมาครบจักรวาล 6/6 เล่ม (EF01 + RT01 + BB01 + MU01 + VL01 + AC01 = 192 หน้า • 24 ไฟล์ PDF + เว็บแอป QR ครบ 6/6) ราคาพิเศษเพียง 449 ฿ (จากปกติ 624 ฿ ประหยัด 175 ฿!)",
    aEn: "Yes! The Complete 6-Book Universe Bundle (192 pages, 24 PDFs + all 6 Hybrid QR apps) is 449 THB ($21.99) — saving 175 THB!",
  },
];

const STORAGE_KEY = "iaon_edu_ac01_stars_v1";

export function Ac01HubView() {
  const [lang, setLang] = useState<EduLang>("th");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedMood, setSelectedMood] = useState<string>("happy");
  const [colorA, setColorA] = useState<PrimaryColor>("red");
  const [colorB, setColorB] = useState<PrimaryColor>("yellow");

  // 4-4-4 Rainbow Breathing Animator
  const [breathRunning, setBreathRunning] = useState(false);
  const [breathPhase, setBreathPhase] = useState<BreathPhase>("idle");
  const [breathSec, setBreathSec] = useState(4);
  const [breathRounds, setBreathRounds] = useState(0);

  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMsg(null), 3200);
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
          setCompletedStages(parsed.filter((x) => typeof x === "string"));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // 4-4-4 Breathing Timer Loop
  useEffect(() => {
    if (!breathRunning) return;
    const timer = setInterval(() => {
      setBreathSec((prev) => {
        if (prev > 1) return prev - 1;
        setBreathPhase((ph) => {
          if (ph === "inhale") {
            if (soundEnabled) playSoftTapChime(523.25);
            return "hold";
          }
          if (ph === "hold") {
            if (soundEnabled) playSoftTapChime(659.25);
            return "exhale";
          }
          setBreathRounds((r) => r + 1);
          if (soundEnabled) playSoftTapChime(440);
          return "inhale";
        });
        return 4;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [breathRunning, soundEnabled]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((p) => (p === null ? null : (p + 1) % GALLERY_IMAGES.length));
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((p) =>
          p === null ? null : (p - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  const toggleBreath = () => {
    if (breathRunning) {
      setBreathRunning(false);
      setBreathPhase("idle");
      setBreathSec(4);
    } else {
      if (soundEnabled) playSoftTapChime(440);
      setBreathPhase("inhale");
      setBreathSec(4);
      setBreathRunning(true);
    }
  };

  const toggleStageStar = (stageId: string) => {
    setCompletedStages((prev) => {
      const exists = prev.includes(stageId);
      const next = exists ? prev.filter((id) => id !== stageId) : [...prev, stageId];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      if (!exists) {
        if (next.length === STAGES.length) {
          if (soundEnabled) playApplauseAndFanfare();
          showToast(
            lang === "th"
              ? "🏆 ครบ 5/5 ด่านแล้ว! ยอดศิลปินน้อย & หัวใจอ่อนโยนของน้องดำ!"
              : "🏆 All 5/5 Stars Complete! Midnight's Super Little Artist!"
          );
        } else {
          if (soundEnabled) playStarPop();
          showToast(
            lang === "th"
              ? `⭐ เก็บดาวเพิ่ม 1 ดวง! (${next.length}/${STAGES.length} ด่าน)`
              : `⭐ Star collected! (${next.length}/${STAGES.length} stages)`
          );
        }
      }
      return next;
    });
  };

  const activeMoodObj = MOOD_WHEEL.find((m) => m.id === selectedMood) ?? MOOD_WHEEL[0];
  const mixResult = getMixResult(colorA, colorB);

  const breathLabel =
    breathPhase === "inhale"
      ? lang === "th"
        ? "🌸 สูดกลิ่นดอกไม้ (หายใจเข้าช้าๆ)"
        : "🌸 Smell the Flower (Inhale Slowly)"
      : breathPhase === "hold"
        ? lang === "th"
          ? "☁️ กอดลมไว้เบาๆ (กลั้นหายใจ)"
          : "☁️ Hold Gently"
        : breathPhase === "exhale"
          ? lang === "th"
            ? "🕯️ เป่าเทียนช้าๆ (ผ่อนลมหายใจออก)"
            : "🕯️ Blow the Candle (Exhale Slowly)"
          : lang === "th"
            ? "กดปุ่มเริ่มเพื่อฝึกหายใจสายรุ้ง 4-4-4 กับน้องดำ"
            : "Tap Start to practice 4-4-4 Rainbow Breathing with Midnight";

  return (
    <div className="w-full overflow-x-hidden bg-[#FFFDF7] text-[#1E293B] -mt-4 md:-mt-8 pt-6 md:pt-10 pb-16 sm:pb-20 border-b border-indigo-200/80">
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-2xl border-2 border-indigo-300 bg-white px-4 py-3 text-sm font-bold text-[#1E293B] shadow-xl">
          {toastMsg}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        {/* TOP NAV + CONTROLS */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/edu"
            className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-white hover:bg-indigo-50 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-indigo-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{lang === "th" ? "กลับคลังสื่อครบ 6 เล่ม" : "Back to 6-Book Hub"}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundEnabled((v) => !v)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
                soundEnabled
                  ? "border-indigo-300 bg-indigo-600 text-white"
                  : "border-slate-300 bg-white text-slate-600"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? (lang === "th" ? "เปิดเสียงอยู่" : "Sound On") : (lang === "th" ? "ปิดเสียง" : "Muted")}</span>
            </button>

            <div className="inline-flex rounded-full border border-slate-200 bg-white p-0.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLang("th")}
                className={`rounded-full px-2.5 py-1 cursor-pointer ${
                  lang === "th" ? "bg-indigo-600 text-white" : "text-slate-600"
                }`}
              >
                TH
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-full px-2.5 py-1 cursor-pointer ${
                  lang === "en" ? "bg-indigo-600 text-white" : "text-slate-600"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* HERO BANNER */}
        <section className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-[#EEF2FF] via-white to-[#FEF9EF] p-5 sm:p-8 shadow-md shadow-indigo-900/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 min-w-0 space-y-4">
              <div className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-indigo-300 bg-white px-3 py-1 text-[11px] sm:text-xs font-bold text-indigo-900 max-w-full">
                <Palette className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>EDU-AC01 • ART &amp; GENTLE SEL STUDIO • เล่มที่ 6/6 ปิดครบจักรวาล!</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight break-words">
                {lang === "th" ? (
                  <>
                    สตูดิโอศิลปะ &amp; พลังใจอ่อนโยน{" "}
                    <span className="text-indigo-700 whitespace-nowrap">กับน้องดำ</span>
                  </>
                ) : (
                  <>
                    Midnight&apos;s Art, Craft &amp;{" "}
                    <span className="text-indigo-700">Gentle Feelings Studio</span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {lang === "th"
                  ? "ช่วยให้เด็กขี้อายกล้าแสดงออกและดูแลอารมณ์ตัวเองอย่างอ่อนโยน! ครบทั้งห้องทดลองผสมแม่สีสด + แอนิเมชันหายใจสายรุ้ง 4-4-4 คู่ใบงานศิลปะ & SEL 32 หน้าเต็ม (ประหยัดหมึก 100%)"
                  : "Empower shy & sensitive little artists! Interactive Color Mixer Lab + 4-4-4 Rainbow Breathing Guide paired with 32 ink-friendly art, craft & SEL pages."}
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="#studio-tools"
                  className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors"
                >
                  <Palette className="w-4 h-4" />
                  <span>{lang === "th" ? "เปิดห้องผสมสี & หายใจ 4-4-4" : "Open Art & Calm Tools"}</span>
                </a>
                <a
                  href="#freebie"
                  className="inline-flex items-center gap-2 rounded-2xl border-2 border-sky-300 bg-sky-50 hover:bg-sky-100 px-5 py-3 text-sm font-bold text-sky-900 transition-colors"
                >
                  <Download className="w-4 h-4 text-sky-700" />
                  <span>{lang === "th" ? "โหลดชุดทดลองฟรี 5 หน้า (0 ฿)" : "Free 5-Page Sample PDF"}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative flex flex-col items-center">
                <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full border-4 border-indigo-200 bg-white p-3 shadow-lg overflow-hidden flex items-center justify-center">
                  <img
                    src="/edu/midnight-3d.webp"
                    alt="Midnight 3D Mascot — EDU-AC01 Art & SEL Studio"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="-mt-3 relative z-10 rounded-full bg-indigo-600 px-3.5 py-1 text-xs font-extrabold text-white shadow">
                  🎨 น้องดำ (มิดไนท์) • 32 หน้า
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE TOOLS: COLOR MIXER + 4-4-4 RAINBOW BREATHING */}
        <section id="studio-tools" className="grid grid-cols-1 lg:grid-cols-12 gap-6 scroll-mt-24">
          {/* TOOL 1: PRIMARY COLOR MIXING LAB (P15) */}
          <div className="lg:col-span-6 rounded-3xl border-2 border-indigo-200 bg-white p-5 sm:p-6 shadow-sm space-y-5">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-700">
                <Palette className="w-3.5 h-3.5" />
                <span>HYBRID QR TOOL #1 • P15 FREEBIE</span>
              </span>
              <h2 className="text-xl font-extrabold text-[#0F172A]">
                {lang === "th" ? "🎨 ห้องทดลองผสมแม่สีสด (Color Mixing Lab)" : "🎨 Live Primary Color Mixing Lab"}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-600">
                  {lang === "th" ? "เลือกแม่สีที่ 1:" : "Pick Color 1:"}
                </div>
                <div className="flex gap-2">
                  {PRIMARY_COLORS.map((c) => (
                    <button
                      key={`a-${c.id}`}
                      type="button"
                      onClick={() => {
                        setColorA(c.id);
                        if (soundEnabled) playSoftTapChime(587.33);
                      }}
                      className={`w-11 h-11 rounded-full border-2 border-slate-800 cursor-pointer transition-transform ${
                        colorA === c.id ? `scale-110 ring-4 ${c.ring}` : "opacity-80 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      aria-label={c.nameEn}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-600">
                  {lang === "th" ? "เลือกแม่สีที่ 2:" : "Pick Color 2:"}
                </div>
                <div className="flex gap-2">
                  {PRIMARY_COLORS.map((c) => (
                    <button
                      key={`b-${c.id}`}
                      type="button"
                      onClick={() => {
                        setColorB(c.id);
                        if (soundEnabled) playSoftTapChime(659.25);
                      }}
                      className={`w-11 h-11 rounded-full border-2 border-slate-800 cursor-pointer transition-transform ${
                        colorB === c.id ? `scale-110 ring-4 ${c.ring}` : "opacity-80 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      aria-label={c.nameEn}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-indigo-100 bg-[#EEF2FF]/70 p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-16 h-16 rounded-2xl border-4 border-white shadow-md shrink-0 transition-colors duration-300"
                  style={{ backgroundColor: mixResult.hex }}
                />
                <div>
                  <div className="text-xs font-bold text-indigo-700">
                    {lang === "th" ? "ผลลัพธ์จากการผสมสี:" : "Mixed Color Result:"}
                  </div>
                  <div className="text-xl font-extrabold text-[#0F172A]">
                    {mixResult.emoji} {lang === "th" ? mixResult.th : mixResult.en}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TOOL 2: 4-4-4 RAINBOW CALM BREATHING (P07) */}
          <div className="lg:col-span-6 rounded-3xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 via-white to-[#EEF2FF] p-5 sm:p-6 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-sky-700">
                  <Wind className="w-3.5 h-3.5" />
                  <span>HYBRID QR TOOL #2 • P07</span>
                </span>
                <h2 className="text-xl font-extrabold text-[#0F172A]">
                  {lang === "th" ? "🌈 ตัวช่วยหายใจสายรุ้ง 4-4-4" : "🌈 4-4-4 Rainbow Calm Breathing"}
                </h2>
              </div>
              <span className="rounded-full bg-white border border-sky-200 px-3 py-1 text-xs font-extrabold text-sky-800">
                {breathRounds} {lang === "th" ? "รอบ" : "rounds"}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center py-2 gap-3">
              <div
                className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-1000 ${
                  breathPhase === "inhale"
                    ? "scale-110 border-emerald-400 bg-emerald-50"
                    : breathPhase === "hold"
                      ? "scale-110 border-amber-400 bg-amber-50"
                      : breathPhase === "exhale"
                        ? "scale-95 border-sky-400 bg-sky-50"
                        : "border-indigo-200 bg-white"
                }`}
              >
                <span className="text-3xl font-extrabold text-[#0F172A]">
                  {breathRunning ? breathSec : "4-4-4"}
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  {breathRunning ? (lang === "th" ? "วินาที" : "sec") : "READY"}
                </span>
              </div>
              <p className="text-sm font-bold text-center text-[#0F172A]">{breathLabel}</p>
            </div>

            <button
              type="button"
              onClick={toggleBreath}
              className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white cursor-pointer transition-colors ${
                breathRunning
                  ? "bg-rose-600 hover:bg-rose-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {breathRunning ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>
                {breathRunning
                  ? lang === "th"
                    ? "หยุดพักหายใจ"
                    : "Stop Breathing"
                  : lang === "th"
                    ? "เริ่มฝึกหายใจสายรุ้ง 4-4-4"
                    : "Start 4-4-4 Calm Breathing"}
              </span>
            </button>
          </div>
        </section>

        {/* TOOL 3: DAILY MOOD CHECK-IN (P03) */}
        <section className="rounded-3xl border-2 border-indigo-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-700">
              <Heart className="w-3.5 h-3.5" />
              <span>DAILY FEELINGS CHECK-IN • P03 FREEBIE</span>
            </span>
            <h2 className="text-xl font-extrabold text-[#0F172A]">
              {lang === "th"
                ? "💖 วันนี้หัวใจของหนูเป็นสีไหน? (แตะเพื่อรับคำแนะนำอ่อนโยนจากน้องดำ)"
                : "💖 How Does Your Heart Feel Today? (Tap for Midnight's Gentle Tip)"}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {MOOD_WHEEL.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setSelectedMood(m.id);
                  if (soundEnabled) playSoftTapChime(523.25);
                }}
                className={`rounded-2xl border-2 p-3 text-center cursor-pointer transition-all ${
                  selectedMood === m.id
                    ? `${m.color} shadow-sm scale-[1.02]`
                    : "border-slate-200 bg-[#FFFDF7] hover:border-indigo-300"
                }`}
              >
                <div className="text-3xl">{m.emoji}</div>
                <div className="text-xs font-extrabold mt-1">
                  {lang === "th" ? m.titleTh : m.titleEn}
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-indigo-200 bg-[#EEF2FF]/70 p-4 text-sm font-semibold text-[#1E293B]">
            <strong>{activeMoodObj.emoji} น้องดำแนะนำ:</strong>{" "}
            {lang === "th" ? activeMoodObj.tipTh : activeMoodObj.tipEn}
          </div>
        </section>

        {/* 5-STAGE STAR TRACKER */}
        <section className="rounded-3xl border-2 border-indigo-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-extrabold text-[#0F172A]">
                {lang === "th"
                  ? "⭐ ตารางสะสมดาวศิลปินน้อย 5 ด่าน (บันทึกอัตโนมัติ)"
                  : "⭐ 5-Stage Little Artist Star Tracker (Auto-Saved)"}
              </h2>
            </div>
            <span className="rounded-full bg-amber-100 border border-amber-300 px-3.5 py-1 text-xs font-extrabold text-amber-900">
              ⭐ {completedStages.length} / {STAGES.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {STAGES.map((st) => {
              const done = completedStages.includes(st.id);
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => toggleStageStar(st.id)}
                  className={`rounded-2xl border-2 p-3.5 text-left cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                    done
                      ? "border-indigo-500 bg-[#EEF2FF] shadow-sm"
                      : "border-slate-200 bg-[#FFFDF7] hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{st.emoji}</span>
                    <Star
                      className={`w-5 h-5 ${
                        done ? "fill-amber-400 text-amber-500" : "text-slate-300"
                      }`}
                    />
                  </div>
                  <div className="text-xs font-bold text-[#0F172A] leading-snug">
                    {lang === "th" ? st.titleTh : st.titleEn}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-indigo-700">
                    {st.pages}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* FREEBIE 5-PAGE DOWNLOAD */}
        <section
          id="freebie"
          className="rounded-3xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 via-white to-[#EEF2FF] p-6 sm:p-7 shadow-sm space-y-4 scroll-mt-24"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 border border-sky-300 px-3 py-1 text-xs font-extrabold text-sky-900">
                <Gift className="w-3.5 h-3.5 text-sky-700" />
                <span>FREE 5-PAGE LEAD MAGNET • โหลดฟรี 0 ฿ ไม่ต้องสมัครสมาชิก</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                {lang === "th"
                  ? "🎁 ดาวน์โหลดชุดทดลองฟรี 5 หน้า (ปก + จานสี 6 อารมณ์ P03 + วาดแมว 4 ขั้น P09 + ผสมแม่สี P15 + P32)"
                  : "🎁 Download Free 5-Page Sample Pack (Cover + 6 Feelings + Draw Cat + Color Mixing)"}
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="/edu/ac01/EDU-AC01_Freebie_5Pages_TH.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-700 hover:bg-sky-800 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>โหลดฟรี 5 หน้า (ภาษาไทย)</span>
              </a>
              <a
                href="/edu/ac01/EDU-AC01_Freebie_5Pages_EN.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-sky-300 bg-white hover:bg-sky-50 px-5 py-3.5 text-sm font-bold text-sky-900 transition-colors"
              >
                <Printer className="w-4 h-4 text-sky-700" />
                <span>Free 5-Page PDF (English)</span>
              </a>
            </div>
          </div>
        </section>

        {/* 4-MOCKUP GALLERY */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
              {lang === "th" ? "👀 ส่องตัวอย่างข้างในจริง (คลิกขยายได้)" : "👀 Peek Inside the 32-Page Studio"}
            </h2>
            <span className="text-xs font-bold text-indigo-700">4 Mockups • 300 DPI</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((img, idx) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group rounded-2xl border-2 border-indigo-200/80 bg-white overflow-hidden text-left shadow-xs hover:border-indigo-500 transition-all cursor-pointer"
              >
                <div className="aspect-square overflow-hidden bg-[#FEF9EF]">
                  <img
                    src={img.src}
                    alt={lang === "th" ? img.labelTh : img.labelEn}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
                  />
                </div>
                <div className="p-3 text-xs font-bold text-slate-700">
                  {lang === "th" ? img.labelTh : img.labelEn}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* DUAL-EDITION PRICING + COMPLETE 6-BOOK UNIVERSE BUNDLE */}
        <section id="order" className="space-y-5">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 border border-indigo-300 px-3 py-1 text-xs font-extrabold text-indigo-900">
              <Layers className="w-3.5 h-3.5" />
              <span>DUAL-EDITION LICENSE • ได้ครบ 4 ไฟล์ (TH/EN × สี/ขาวดำ)</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              สั่งซื้อเล่มเต็ม 32 หน้า (รับไฟล์ PDF ทันทีทาง LINE)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border-2 border-indigo-400 bg-white p-6 flex flex-col justify-between gap-5 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-extrabold text-indigo-900">
                    <Home className="w-3.5 h-3.5" />
                    <span>HOME EDITION • ใช้ในครอบครัว</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">32 หน้า • 4 PDF</span>
                </div>
                <div className="flex items-baseline gap-2.5">
                  <strong className="text-4xl font-extrabold text-indigo-700">99 ฿</strong>
                  <span className="text-sm text-slate-400 line-through">149 ฿</span>
                  <span className="text-xs font-semibold text-slate-600">($4.99)</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {[
                    "ครบ 32 หน้าเต็ม: 6 หน้า SEL + วาด 4 ขั้น 6 ภาพ + ผสมสี + มงกุฎ + หุ่นนิ้วมือ + การ์ด SEL 9 ใบ",
                    "ได้ครบ 4 ไฟล์ PDF (ไทย/อังกฤษ × สี/ขาวดำประหยัดหมึก ขอบเจาะรู 20mm)",
                    "โพยคำพูดสร้างความกล้าให้เด็กขี้อาย + เช็กลิสต์พัฒนาการ + ใบประกาศ",
                    "ใช้งานสตูดิโอผสมสี & หายใจ 4-4-4 บน /edu/ac01 ฟรีตลอดชีพ",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={getEduOrderLineUrl({ sku: "EDU-AC01", edition: "HOME", lang })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] px-5 py-3.5 text-base font-bold text-white shadow-sm transition-colors"
              >
                <FaLine className="w-5 h-5" />
                <span>สั่งซื้อ HOME EDITION (99 ฿) ทาง LINE</span>
              </a>
            </div>

            <div className="rounded-3xl border-2 border-sky-400 bg-white p-6 flex flex-col justify-between gap-5 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-extrabold text-sky-900">
                    <School className="w-3.5 h-3.5" />
                    <span>CLASS EDITION • 1 ครู / 1 ห้องเรียน</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">Classroom License</span>
                </div>
                <div className="flex items-baseline gap-2.5">
                  <strong className="text-4xl font-extrabold text-sky-700">199 ฿</strong>
                  <span className="text-sm text-slate-400 line-through">299 ฿</span>
                  <span className="text-xs font-semibold text-slate-600">($9.99)</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {[
                    "ปริ้นท์แจกนักเรียนทั้งห้องเรียนได้ไม่จำกัดชุด! (สิทธิ์ 1 ครู / 1 ห้องเรียน)",
                    "ทำมุมศิลปะ & มุมสงบใจ (Calm Corner) ในห้องอนุบาลได้ครบทั้งปี",
                    "ได้ครบ 4 ไฟล์ PDF (TH/EN × สี/ขาวดำประหยัดหมึก ถ่ายเอกสารคมชัด)",
                    "เปิดห้องผสมสี & แอนิเมชันหายใจ 4-4-4 ขึ้นจอสอนหน้าชั้นได้ฟรี!",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={getEduOrderLineUrl({ sku: "EDU-AC01", edition: "CLASS", lang })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-700 hover:bg-sky-800 px-5 py-3.5 text-base font-bold text-white shadow-sm transition-colors"
              >
                <FaLine className="w-5 h-5 text-[#7CF29C]" />
                <span>สั่งซื้อ CLASS EDITION (199 ฿) ทาง LINE</span>
              </a>
            </div>
          </div>

          {/* COMPLETE 6/6 UNIVERSE BUNDLE */}
          <div className="rounded-2xl border-2 border-amber-300 bg-[#FEF9EF] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm sm:text-base font-extrabold text-[#0F172A]">
                👑 ปิดครบจักรวาลแก๊ง 6 แมว! เหมาครบ 6/6 เล่ม Live (192 หน้า • 24 PDF + 6 เว็บแอป QR)
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                เพียง <strong className="text-amber-800">449 ฿</strong> (จากปกติ 624 ฿ • ประหยัด 175 ฿! เฉลี่ยเพียงเล่มละ 74.8 ฿)
              </p>
            </div>
            <a
              href={getEduOrderLineUrl({ sku: "EDU-AC01", edition: "ALL6_BUNDLE", lang })}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-500 px-5 py-3 text-sm font-extrabold text-slate-950 transition-colors"
            >
              <span>สั่งเหมาครบ 6 เล่ม (449 ฿)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="rounded-3xl border border-indigo-200 bg-white p-6 space-y-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <span>{lang === "th" ? "คำถามที่พบบ่อย (FAQ)" : "Frequently Asked Questions"}</span>
          </h2>
          <div className="divide-y divide-slate-100">
            {FAQS.map((f, idx) => {
              const open = openFaq === idx;
              return (
                <div key={f.qTh} className="py-3">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : idx)}
                    className="w-full flex items-center justify-between gap-3 text-left font-bold text-sm sm:text-base text-[#0F172A] cursor-pointer"
                  >
                    <span>{lang === "th" ? f.qTh : f.qEn}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-indigo-600 shrink-0 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {open && (
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {lang === "th" ? f.aTh : f.aEn}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={GALLERY_IMAGES[lightboxIndex].src}
              alt={GALLERY_IMAGES[lightboxIndex].labelTh}
              className="w-full h-auto block"
            />
            <div className="p-4 flex items-center justify-between gap-2 bg-[#FFFDF7] border-t border-slate-200">
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
                }
                className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs sm:text-sm font-bold text-[#0F172A] text-center">
                {lang === "th"
                  ? GALLERY_IMAGES[lightboxIndex].labelTh
                  : GALLERY_IMAGES[lightboxIndex].labelEn}
              </span>
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length)
                }
                className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

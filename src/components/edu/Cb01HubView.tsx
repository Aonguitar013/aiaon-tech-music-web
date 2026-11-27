"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Palette,
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
  RotateCcw,
  Eraser,
  Volume2,
  VolumeX,
  ImageDown,
} from "lucide-react";
import { FaLine } from "react-icons/fa6";
import { playApplauseAndFanfare, playStarPop } from "@/lib/eduAudio";
import { playSoftTapChime } from "@/lib/eduPhonicsAudio";
import { type EduLang, getEduOrderLineUrl } from "@/lib/eduCatalog";

interface CatColoringItem {
  id: string;
  nameTh: string;
  nameEn: string;
  lineart: string;
  wordTh: string;
  wordEn: string;
  affTh: string;
  affEn: string;
  recommended: string[];
  badgeClass: string;
}

const CATS_STUDIO: CatColoringItem[] = [
  {
    id: "khaotom",
    nameTh: "น้องข้าวต้ม",
    nameEn: "Khao Tom",
    lineart: "/edu/cb01/lineart/khaotom.png",
    wordTh: "สวัสดี!",
    wordEn: "HELLO!",
    affTh: "หนูทักทายเพื่อนใหม่ด้วยรอยยิ้มที่อบอุ่นได้เสมอ!",
    affEn: "I can greet new friends with a warm, cheerful smile!",
    recommended: ["#38BDF8", "#FBBF24", "#F9A8D4", "#A3E635"],
    badgeClass: "bg-sky-100 text-sky-900 border-sky-300",
  },
  {
    id: "shabu",
    nameTh: "น้องชาบู",
    nameEn: "Shabu",
    lineart: "/edu/cb01/lineart/shabu.png",
    wordTh: "เพื่อนรัก",
    wordEn: "FRIEND",
    affTh: "หนูเป็นเพื่อนที่น่ารัก ชอบแบ่งปันและชวนกันยิ้ม!",
    affEn: "I am a kind friend who loves to share and giggle!",
    recommended: ["#E07A5F", "#F472B6", "#FDE047", "#BEF264"],
    badgeClass: "bg-pink-100 text-pink-900 border-pink-300",
  },
  {
    id: "salmon",
    nameTh: "น้องแซลมอน",
    nameEn: "Detective Salmon",
    lineart: "/edu/cb01/lineart/salmon.png",
    wordTh: "ใจเย็น",
    wordEn: "CALM",
    affTh: "ใจที่สงบช่วยให้หนูมองเห็นทางออกได้ชัดเจนเสมอ!",
    affEn: "A calm heart helps me see clear solutions every time!",
    recommended: ["#D4A373", "#A78BFA", "#FB7185", "#A3E635"],
    badgeClass: "bg-amber-100 text-amber-900 border-amber-300",
  },
  {
    id: "bob",
    nameTh: "น้องบ๊อบ",
    nameEn: "Explorer Bob",
    lineart: "/edu/cb01/lineart/bob.png",
    wordTh: "กล้าหาญ",
    wordEn: "BRAVE",
    affTh: "แม้จะตื่นเต้นนิดหน่อย แต่หนูกล้าลองก้าวแรกเสมอ!",
    affEn: "Even when I feel nervous, I am brave enough to try!",
    recommended: ["#FB923C", "#FED7AA", "#34D399", "#F59E0B"],
    badgeClass: "bg-teal-100 text-teal-900 border-teal-300",
  },
  {
    id: "mami",
    nameTh: "แม่ใหญ่ (มามี้)",
    nameEn: "Mama Mami",
    lineart: "/edu/cb01/lineart/mami.png",
    wordTh: "อบอุ่นใจ",
    wordEn: "WARMTH",
    affTh: "หนูเป็นที่รักและปลอดภัยเสมอในบ้านแสนอบอุ่น!",
    affEn: "I am loved, safe, and cherished every single day!",
    recommended: ["#B08968", "#FDBA74", "#FEF3C7", "#FBBF24"],
    badgeClass: "bg-rose-100 text-rose-900 border-rose-300",
  },
  {
    id: "midnight",
    nameTh: "น้องดำ (มิดไนท์)",
    nameEn: "Midnight",
    lineart: "/edu/cb01/lineart/midnight.png",
    wordTh: "อ่อนโยน",
    wordEn: "GENTLE",
    affTh: "ความอ่อนโยนคือพลังวิเศษที่ทำให้โลกใบนี้น่าอยู่!",
    affEn: "My gentle heart is a superpower that makes the world kind!",
    recommended: ["#64748B", "#C084FC", "#FDE047", "#F9A8D4"],
    badgeClass: "bg-indigo-100 text-indigo-900 border-indigo-300",
  },
];

const CRAYON_PALETTE = [
  { name: "Amber", hex: "#F59E0B" },
  { name: "Sunny", hex: "#FDE047" },
  { name: "Coral", hex: "#FB7185" },
  { name: "Pink", hex: "#F472B6" },
  { name: "Lavender", hex: "#A78BFA" },
  { name: "Sky", hex: "#38BDF8" },
  { name: "Mint", hex: "#34D399" },
  { name: "Lime", hex: "#A3E635" },
  { name: "Ginger", hex: "#FB923C" },
  { name: "Caramel", hex: "#D4A373" },
  { name: "Charcoal", hex: "#64748B" },
  { name: "Cream", hex: "#FEF3C7" },
];

const CHAPTERS = [
  { id: "c1", pages: "P03–P08", emoji: "🎵", titleTh: "บทที่ 1: น้องข้าวต้ม (6 ภาพ • ดนตรี & พลังงาน)", titleEn: "Ch 1: Khao Tom (6 Pages • Rhythm & Joy)" },
  { id: "c2", pages: "P09–P14", emoji: "🎀", titleTh: "บทที่ 2: น้องชาบู (6 ภาพ • เพื่อนรัก & สุขอนามัย)", titleEn: "Ch 2: Shabu (6 Pages • Kindness & Hygiene)" },
  { id: "c3", pages: "P15–P20", emoji: "🔎", titleTh: "บทที่ 3: น้องแซลมอน (6 ภาพ • สมาธิ EF & นักสืบ)", titleEn: "Ch 3: Detective Salmon (6 Pages • Calm EF)" },
  { id: "c4", pages: "P21–P26", emoji: "🗺️", titleTh: "บทที่ 4: น้องบ๊อบ (6 ภาพ • ความกล้า & คำศัพท์)", titleEn: "Ch 4: Explorer Bob (6 Pages • Brave Explorer)" },
  { id: "c5", pages: "P27–P32", emoji: "💖", titleTh: "บทที่ 5: แม่ใหญ่ (6 ภาพ • กิจวัตร & กอดอุ่น)", titleEn: "Ch 5: Mama Mami (6 Pages • Warm Routine)" },
  { id: "c6", pages: "P33–P38", emoji: "🎨", titleTh: "บทที่ 6: น้องดำ (6 ภาพ • ศิลปะ & หัวใจอ่อนโยน)", titleEn: "Ch 6: Midnight (6 Pages • Gentle Heart Art)" },
];

const GALLERY_IMAGES = [
  { src: "/edu/cb01/mockup-01-cover.webp", labelTh: "ปกหน้า & จุดเด่นสมุดระบายสีแก๊ง 6 แมว 40 หน้า", labelEn: "Front Cover & 40-Page Highlights" },
  { src: "/edu/cb01/mockup-02-chapters.webp", labelTh: "ครบทั้ง 6 แมว × 6 ท่าทาง = 36 ภาพไม่ซ้ำ + ใบประกาศฯ", labelEn: "All 6 Cats × 6 Poses = 36 Unique Pages" },
  { src: "/edu/cb01/mockup-03-color-bw.webp", labelTh: "เส้นหนาขอบชัดสำหรับเด็ก 3–6 ปี + ประหยัดหมึก 100%", labelEn: "Bold Kids Outlines + 100% Ink-Friendly" },
  { src: "/edu/cb01/mockup-04-editions.webp", labelTh: "เทียบสิทธิ์ Home (49฿) vs Class Edition (99฿)", labelEn: "Home (49 THB) vs Class Edition (99 THB)" },
];

const FAQS = [
  {
    qTh: "สมุดระบายสี 40 หน้า ได้ไฟล์อะไรบ้าง? ปริ้นท์กระดาษ A4 ได้ไหม?",
    qEn: "What files are included in the 40-page set? Does it fit A4 & US Letter?",
    aTh: "ได้ครบ 4 ไฟล์ PDF ทันทีครับ (ภาษาไทย COLOR + ภาษาไทย BW + ภาษาอังกฤษ COLOR + ภาษาอังกฤษ BW) ออกแบบในกรอบปลอดภัย ปริ้นท์ได้ทั้ง A4 และ US Letter โดยไม่ตกขอบ พร้อมขอบซ้าย 18mm เจาะรูเข้าห่วงได้สบายครับ",
    aEn: "You receive all 4 PDFs (TH Color, TH B&W, EN Color, EN B&W) formatted inside a Universal Safe Print Box that prints cleanly on both US Letter (8.5×11 in) and A4!",
  },
  {
    qTh: "เด็กอายุ 3 ขวบที่เพิ่งหัดจับสีเทียน ระบายได้ไหม?",
    qEn: "Is this suitable for a 3-year-old just learning to hold crayons?",
    aTh: "เหมาะมากครับ! ทุกภาพใช้ระบบ Bold & Easy Lineart เส้นขอบหนาพิเศษ พื้นที่ระบายกว้าง ไม่มีรายละเอียดเล็กยิบย่อยจนลูกท้อ และมีเพียง 1 ภาพใหญ่ต่อ 1 หน้า พร้อมดาว 3 ดวงให้ระบายเป็นรางวัลท้ายหน้าครับ",
    aEn: "Yes! Every page features extra-bold, clean outlines and wide open coloring spaces tailored for preschool fine-motor control (ages 3–6), with 1 big illustration per page.",
  },
  {
    qTh: "น้องดำเป็นแมวดำ ปริ้นท์ออกมาจะดำทึบเปลืองหมึกไหม?",
    qEn: "Midnight is a black cat — will her pages waste black ink?",
    aTh: "ไม่เปลืองหมึก 100% ครับ! ภาพระบายสีของน้องดำเป็นลายเส้นโปร่งสีขาวล้วน (0% พื้นดำทึบ) เด็กๆ สามารถระบายสีเทา สีม่วง หรือสีสายรุ้งตามจินตนาการได้อย่างสนุกสนานครับ",
    aEn: "Zero solid black fills! Midnight's coloring pages use clean open white interiors so kids can color her charcoal, lavender, or rainbow while saving 100% printer ink.",
  },
];

const STORAGE_KEY = "iaon_edu_cb01_stars_v1";

export function Cb01HubView() {
  const [lang, setLang] = useState<EduLang>("th");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeCatIdx, setActiveCatIdx] = useState(0);
  const [brushColor, setBrushColor] = useState<string>("#F59E0B");
  const [brushSize, setBrushSize] = useState<number>(18);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeCat = CATS_STUDIO[activeCatIdx];

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
          setCompletedChapters(parsed.filter((x) => typeof x === "string"));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Initialize crisp white canvas background on mount / cat switch
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    clearCanvas();
  }, [activeCatIdx]);

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

  const getPointerCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const pos = getPointerCoords(e);
    lastPosRef.current = pos;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, brushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = isEraser ? "#FFFFFF" : brushColor;
    ctx.fill();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || !lastPosRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const pos = getPointerCoords(e);
    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = isEraser ? "#FFFFFF" : brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastPosRef.current = pos;
  };

  const handlePointerUp = () => {
    drawingRef.current = false;
    lastPosRef.current = null;
  };

  const handleSaveArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const out = document.createElement("canvas");
    out.width = canvas.width;
    out.height = canvas.height;
    const ctx = out.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(canvas, 0, 0);

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const pad = 28;
      const maxW = out.width - pad * 2;
      const maxH = out.height - pad * 2;
      const ratio = Math.min(maxW / img.width, maxH / img.height);
      const dw = img.width * ratio;
      const dh = img.height * ratio;
      ctx.drawImage(img, (out.width - dw) / 2, (out.height - dh) / 2, dw, dh);
      const link = document.createElement("a");
      link.download = `EDU-CB01_${activeCat.id}_coloring.png`;
      link.href = out.toDataURL("image/png");
      link.click();
      if (soundEnabled) playStarPop();
      showToast(
        lang === "th"
          ? `🎉 บันทึกภาพระบายสี ${activeCat.nameTh} เรียบร้อยแล้ว!`
          : `🎉 Saved your ${activeCat.nameEn} artwork PNG!`
      );
    };
    img.src = activeCat.lineart;
  };

  const toggleChapterStar = (chapterId: string) => {
    setCompletedChapters((prev) => {
      const exists = prev.includes(chapterId);
      const next = exists ? prev.filter((id) => id !== chapterId) : [...prev, chapterId];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      if (!exists) {
        if (next.length === CHAPTERS.length) {
          if (soundEnabled) playApplauseAndFanfare();
          showToast(
            lang === "th"
              ? "🏆 ครบ 6/6 แก๊งแมวแล้ว! ยอดนักระบายสีหัวใจอ่อนโยน!"
              : "🏆 All 6/6 Cats Complete! Super Gentle Heart Colorist!"
          );
        } else {
          if (soundEnabled) playStarPop();
          showToast(
            lang === "th"
              ? `⭐ เก็บดาวเพิ่ม 1 ดวง! (${next.length}/${CHAPTERS.length} บท)`
              : `⭐ Star collected! (${next.length}/${CHAPTERS.length} chapters)`
          );
        }
      }
      return next;
    });
  };

  return (
    <div className="w-full overflow-x-hidden bg-[#FFFDF7] text-[#1E293B] -mt-4 md:-mt-8 pt-6 md:pt-10 pb-16 sm:pb-20 border-b border-amber-200/80">
      {toastMsg && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-slate-900 text-white px-5 py-3 text-sm font-bold shadow-xl border border-amber-400/50 animate-bounce">
          {toastMsg}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* TOP NAV & LANG SWITCH */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/edu"
            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-800 shadow-xs transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-amber-600" />
            <span>{lang === "th" ? "กลับคลังสื่อ /edu (14 เล่ม Live)" : "Back to /edu Hub (14 Live)"}</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundEnabled((s) => !s)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              aria-label="Toggle sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              <span>{soundEnabled ? (lang === "th" ? "เสียงเปิด" : "Sound On") : (lang === "th" ? "ปิดเสียง" : "Muted")}</span>
            </button>

            <div className="inline-flex rounded-xl border border-amber-200 bg-white p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLang("th")}
                className={`rounded-lg px-3 py-1 cursor-pointer transition-colors ${
                  lang === "th" ? "bg-amber-400 text-slate-950" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🇹🇭 ไทย
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-lg px-3 py-1 cursor-pointer transition-colors ${
                  lang === "en" ? "bg-amber-400 text-slate-950" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🇬🇧 EN
              </button>
            </div>
          </div>
        </div>

        {/* HERO BANNER */}
        <section className="rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-[#FEF9EF] via-white to-[#FFF1F2] p-6 sm:p-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold text-slate-950">
                  NEW • EDU-CB01
                </span>
                <span className="rounded-full bg-white border border-amber-300 px-3 py-1 text-xs font-bold text-amber-900">
                  {lang === "th" ? "40 หน้าเต็ม • วัย 3–6 ปี • เริ่มเพียง 49 ฿!" : "40 Bold Pages • Ages 3–6 • From $2.99!"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1E293B] leading-tight">
                {lang === "th" ? (
                  <>
                    สมุดระบายสีแก๊ง 6 แมว{" "}
                    <span className="text-amber-600">&amp; คาแรกเตอร์พลังใจ</span>
                  </>
                ) : (
                  <>
                    The 6 Cats Gentle Heart{" "}
                    <span className="text-amber-600">Coloring Book (40 Pages)</span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {lang === "th"
                  ? "36 ภาพเส้นหนาขอบชัด 6 แมวครบทีม (ข้าวต้ม • ชาบู • แซลมอน • บ๊อบ • แม่ใหญ่ • น้องดำ) พร้อมคำศัพท์ 2 ภาษา TH/EN + ประโยคพลังใจสั้นๆ + ใบประกาศฯ หน้า 39 และสตูดิโอระบายสีตัวอย่างบนเว็บฟรี!"
                  : "36 bold & easy illustrations starring all 6 cats, paired with bilingual TH/EN vocabulary, Gentle Heart SEL affirmations, a color-in award certificate, and this free ad-free online coloring studio!"}
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="#coloring-studio"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 hover:bg-amber-500 px-5 py-3 text-sm font-extrabold text-slate-950 shadow-sm transition-colors"
                >
                  <Palette className="w-4 h-4" />
                  <span>{lang === "th" ? "ลองระบายสีบนเว็บเลย!" : "Try Online Coloring Studio!"}</span>
                </a>
                <a
                  href={lang === "th" ? "/edu/cb01/EDU-CB01_Freebie_5Pages_TH.pdf" : "/edu/cb01/EDU-CB01_Freebie_5Pages_EN.pdf"}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-emerald-400 bg-emerald-50 hover:bg-emerald-100 px-5 py-3 text-sm font-bold text-emerald-900 transition-colors"
                >
                  <Download className="w-4 h-4 text-emerald-700" />
                  <span>{lang === "th" ? "โหลดฟรี 5 หน้า (PDF 0฿)" : "Download Free 5-Page PDF"}</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-5">
              <button
                type="button"
                onClick={() => setLightboxIndex(0)}
                className="block w-full rounded-2xl overflow-hidden border-2 border-amber-300 shadow-lg bg-white hover:scale-[1.01] transition-transform cursor-pointer"
              >
                <img
                  src="/edu/cb01/mockup-01-cover.webp"
                  alt="EDU-CB01 Coloring Book Cover"
                  className="w-full h-auto object-cover aspect-square"
                />
              </button>
            </div>
          </div>
        </section>

        {/* INTERACTIVE ONLINE COLORING STUDIO */}
        <section
          id="coloring-studio"
          className="rounded-3xl border-2 border-amber-300 bg-white p-5 sm:p-7 shadow-lg space-y-5 scroll-mt-24"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>HYBRID QR INTERACTIVE STUDIO • 0฿ AD-FREE</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B] mt-0.5">
                {lang === "th"
                  ? "🎨 สตูดิโอระบายสีตัวอย่าง & จานสีแก๊ง 6 แมว"
                  : "🎨 Interactive 6-Cat Coloring & Palette Studio"}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  clearCanvas();
                  if (soundEnabled) playSoftTapChime(392);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === "th" ? "ล้างกระดาษ" : "Clear"}</span>
              </button>
              <button
                type="button"
                onClick={handleSaveArtwork}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white shadow-xs cursor-pointer"
              >
                <ImageDown className="w-3.5 h-3.5" />
                <span>{lang === "th" ? "บันทึกภาพ PNG" : "Save PNG"}</span>
              </button>
            </div>
          </div>

          {/* 6-Cat Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {CATS_STUDIO.map((cat, idx) => {
              const active = idx === activeCatIdx;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCatIdx(idx);
                    setIsEraser(false);
                    setBrushColor(cat.recommended[0]);
                    if (soundEnabled) playSoftTapChime(440 + idx * 45);
                  }}
                  className={`rounded-2xl border-2 px-3 py-2 text-xs font-extrabold transition-all cursor-pointer ${
                    active
                      ? "border-amber-500 bg-amber-50 text-slate-950 shadow-sm scale-[1.02]"
                      : "border-slate-200 bg-[#FFFDF7] text-slate-700 hover:border-amber-300"
                  }`}
                >
                  {lang === "th" ? cat.nameTh : cat.nameEn}
                </button>
              );
            })}
          </div>

          {/* Canvas + Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Drawing Stage */}
            <div className="lg:col-span-7 flex flex-col items-center space-y-3">
              <div className="relative w-full max-w-[440px] aspect-square rounded-3xl border-[3px] border-slate-900 bg-white shadow-inner overflow-hidden touch-none select-none">
                <canvas
                  ref={canvasRef}
                  width={520}
                  height={520}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  className="w-full h-full cursor-crosshair block"
                />
                <img
                  src={activeCat.lineart}
                  alt={activeCat.nameEn}
                  draggable={false}
                  className="pointer-events-none select-none absolute inset-0 w-full h-full object-contain p-5"
                />
              </div>

              <div className={`w-full max-w-[440px] rounded-2xl border px-4 py-3 text-center space-y-1 ${activeCat.badgeClass}`}>
                <div className="text-base font-extrabold">
                  {activeCat.wordTh} • {activeCat.wordEn}
                </div>
                <p className="text-xs sm:text-sm font-semibold opacity-90">
                  “{lang === "th" ? activeCat.affTh : activeCat.affEn}”
                </p>
              </div>
            </div>

            {/* Palette & Brush Controls */}
            <div className="lg:col-span-5 space-y-5 rounded-2xl border border-amber-200 bg-[#FEF9EF] p-4 sm:p-5">
              {/* Recommended Cat Swatches */}
              <div className="space-y-2">
                <div className="text-xs font-extrabold text-amber-900">
                  {lang === "th"
                    ? `✨ สีแนะนำประจำตัว ${activeCat.nameTh} (กดเลือกได้เลย)`
                    : `✨ Signature Colors for ${activeCat.nameEn}`}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {activeCat.recommended.map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => {
                        setIsEraser(false);
                        setBrushColor(hex);
                        if (soundEnabled) playSoftTapChime(587);
                      }}
                      style={{ backgroundColor: hex }}
                      className={`w-10 h-10 rounded-full border-2 cursor-pointer transition-transform ${
                        !isEraser && brushColor === hex
                          ? "border-slate-900 scale-110 ring-2 ring-amber-400"
                          : "border-slate-400 hover:scale-105"
                      }`}
                      aria-label={`Select color ${hex}`}
                    />
                  ))}
                </div>
              </div>

              {/* Full 12-Crayon Box */}
              <div className="space-y-2">
                <div className="text-xs font-extrabold text-slate-700">
                  {lang === "th" ? "🖍️ กล่องสีเทียน 12 สี (ไม่มีสีไหนผิด!)" : "🖍️ 12-Crayon Palette (Zero Wrong Colors!)"}
                </div>
                <div className="grid grid-cols-6 gap-2.5">
                  {CRAYON_PALETTE.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      title={c.name}
                      onClick={() => {
                        setIsEraser(false);
                        setBrushColor(c.hex);
                        if (soundEnabled) playSoftTapChime(523);
                      }}
                      style={{ backgroundColor: c.hex }}
                      className={`w-10 h-10 rounded-xl border-2 cursor-pointer transition-transform ${
                        !isEraser && brushColor === c.hex
                          ? "border-slate-900 scale-110 ring-2 ring-amber-400"
                          : "border-slate-300 hover:scale-105"
                      }`}
                      aria-label={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Brush Size + Eraser */}
              <div className="space-y-2">
                <div className="text-xs font-extrabold text-slate-700">
                  {lang === "th" ? "ขนาดหัวสี & ยางลบ" : "Brush Size & Eraser"}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { label: "S", size: 10 },
                    { label: "M", size: 18 },
                    { label: "L", size: 30 },
                  ].map((b) => (
                    <button
                      key={b.label}
                      type="button"
                      onClick={() => {
                        setIsEraser(false);
                        setBrushSize(b.size);
                      }}
                      className={`rounded-xl border-2 px-3.5 py-2 text-xs font-extrabold cursor-pointer ${
                        !isEraser && brushSize === b.size
                          ? "border-slate-900 bg-amber-400 text-slate-950"
                          : "border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setIsEraser((v) => !v)}
                    className={`inline-flex items-center gap-1.5 rounded-xl border-2 px-3.5 py-2 text-xs font-extrabold cursor-pointer ${
                      isEraser
                        ? "border-rose-500 bg-rose-100 text-rose-900"
                        : "border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    <Eraser className="w-3.5 h-3.5" />
                    <span>{lang === "th" ? "ยางลบ" : "Eraser"}</span>
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed">
                {lang === "th"
                  ? "💡 เคล็ดลับ: เส้นขอบดำของน้องแมวจะอยู่ชั้นบนสุดเสมอ ระบายทับได้เต็มที่โดยไม่เลอะเส้น! กด 'บันทึกภาพ PNG' เก็บผลงานลูกไว้ได้เลย"
                  : "💡 Tip: Bold black outlines stay locked on top so kids can paint freely without smudging the lines — tap Save PNG anytime!"}
              </p>
            </div>
          </div>
        </section>

        {/* 6-CHAPTER STAR PROGRESS TRACKER */}
        <section className="rounded-3xl border border-amber-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#1E293B]">
                {lang === "th" ? "⭐ เช็กลิสต์สะสมดาวครบแก๊ง 6 แมว (36 ภาพ)" : "⭐ 6-Cat Coloring Progress Tracker"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {lang === "th"
                  ? "ระบายครบแต่ละบทบนกระดาษแล้วมากดรับดาวบนหน้าจอได้เลย!"
                  : "Tap each chapter once your child finishes coloring on paper to earn stars!"}
              </p>
            </div>
            <span className="rounded-full bg-amber-100 border border-amber-300 px-3.5 py-1 text-xs font-extrabold text-amber-950">
              ⭐ {completedChapters.length} / {CHAPTERS.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CHAPTERS.map((ch) => {
              const done = completedChapters.includes(ch.id);
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => toggleChapterStar(ch.id)}
                  className={`text-left rounded-2xl border-2 p-4 transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    done
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-slate-200 bg-[#FFFDF7] hover:border-amber-300"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500">
                      <span>{ch.emoji}</span>
                      <span>{ch.pages}</span>
                    </div>
                    <div className="text-sm font-bold text-[#1E293B]">
                      {lang === "th" ? ch.titleTh : ch.titleEn}
                    </div>
                  </div>
                  <Star
                    className={`w-6 h-6 shrink-0 transition-transform ${
                      done ? "fill-amber-400 text-amber-500 scale-110" : "text-slate-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </section>

        {/* 4-MOCKUP GALLERY */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">
            {lang === "th" ? "🖼️ ตัวอย่างเนื้อหาจริงภายในเล่ม (40 หน้า)" : "🖼️ Look Inside All 40 Pages"}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group rounded-2xl border-2 border-amber-200 bg-white overflow-hidden shadow-sm hover:border-amber-400 transition-all text-left cursor-pointer"
              >
                <div className="aspect-square overflow-hidden bg-[#FEF9EF]">
                  <img
                    src={img.src}
                    alt={lang === "th" ? img.labelTh : img.labelEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-3 text-xs font-bold text-slate-700 leading-snug">
                  {lang === "th" ? img.labelTh : img.labelEn}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* PRICING: HOME (49฿) vs CLASS (99฿) + FREEBIE */}
        <section className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-[#FEF9EF] to-white p-6 sm:p-8 shadow-md space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
              {lang === "th" ? "สั่งซื้อไฟล์ PDF ครบ 40 หน้าเต็ม (รับไฟล์ทันที)" : "Get the Complete 40-Page Printable PDF Pack"}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === "th"
                ? "ได้ครบ 4 ไฟล์ PDF (ภาษาไทย + อังกฤษ × โหมดสี + โหมดขาวดำประหยัดหมึก) ปริ้นท์ A4 / US Letter ไม่ตกขอบ"
                : "Includes all 4 PDFs (Thai & English × Color & Ink-Saving B&W) ready for A4 & US Letter printing!"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* HOME 49 THB */}
            <div className="rounded-2xl border-2 border-amber-400 bg-white p-6 flex flex-col justify-between gap-5 shadow-sm">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-950">
                  <Home className="w-3.5 h-3.5" />
                  <span>HOME EDITION • สิทธิ์ครอบครัว</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-amber-700">49 ฿</span>
                  <span className="text-sm font-semibold text-slate-500">($2.99)</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {[
                    lang === "th" ? "ครบ 40 หน้าเต็ม (36 ภาพแก๊ง 6 แมว + ใบประกาศฯ)" : "Complete 40 pages (36 bold coloring pages + certificate)",
                    lang === "th" ? "ครบ 4 ไฟล์ PDF (TH/EN × สี/ขาวดำประหยัดหมึก)" : "All 4 PDFs (TH/EN × Color & Ink-Friendly B&W)",
                    lang === "th" ? "ปริ้นท์ซ้ำให้ลูกในบ้านได้ไม่จำกัดตลอดชีพ" : "Unlimited personal household printing forever",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={getEduOrderLineUrl({ sku: "EDU-CB01", edition: "HOME", lang })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] px-5 py-3.5 text-sm sm:text-base font-bold text-white shadow-sm transition-colors"
              >
                <FaLine className="w-5 h-5" />
                <span>{lang === "th" ? "สั่งซื้อ Home Edition (49 ฿) ทาง LINE" : "Order Home Edition ($2.99) via LINE"}</span>
              </a>
            </div>

            {/* CLASS 99 THB */}
            <div className="rounded-2xl border-2 border-sky-400 bg-white p-6 flex flex-col justify-between gap-5 shadow-sm">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-extrabold text-sky-950">
                  <School className="w-3.5 h-3.5" />
                  <span>CLASS EDITION • สิทธิ์คุณครู/ห้องเรียน</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-sky-700">99 ฿</span>
                  <span className="text-sm font-semibold text-slate-500">($5.99)</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {[
                    lang === "th" ? "สิทธิ์ปริ้นท์/ถ่ายเอกสารแจกนักเรียนในห้องได้ไม่อั้น" : "Single-teacher license for unlimited classroom copies",
                    lang === "th" ? "ครบ 4 ไฟล์ PDF + ใบประกาศฯ แจกเด็กทั้งห้อง" : "All 4 PDFs + printable class award certificate",
                    lang === "th" ? "เปิดสตูดิโอระบายสีหน้านี้ขึ้นจอสอนในห้องได้ฟรี" : "Project this ad-free coloring studio in class anytime",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={getEduOrderLineUrl({ sku: "EDU-CB01", edition: "CLASS", lang })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-700 hover:bg-sky-800 px-5 py-3.5 text-sm sm:text-base font-bold text-white shadow-sm transition-colors"
              >
                <FaLine className="w-5 h-5" />
                <span>{lang === "th" ? "สั่งซื้อ Class Edition (99 ฿) ทาง LINE" : "Order Class Edition ($5.99) via LINE"}</span>
              </a>
            </div>
          </div>

          {/* Freebie Direct Download Bar */}
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Printer className="w-6 h-6 text-emerald-700 shrink-0" />
              <div>
                <div className="text-sm font-extrabold text-emerald-950">
                  {lang === "th" ? "🎁 ดาวน์โหลดชุดทดลองฟรี 5 หน้า (TH / EN) ลองปริ้นท์ก่อนซื้อ!" : "🎁 Try 5 Free Sample Pages (TH / EN) Before Buying!"}
                </div>
                <div className="text-xs text-emerald-800">
                  {lang === "th" ? "ฟรี 0 ฿ ไม่ต้องสมัครสมาชิก โหลดไปให้ลูกลองระบายได้ทันที" : "100% free instant PDF download — zero signup required."}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <a
                href="/edu/cb01/EDU-CB01_Freebie_5Pages_TH.pdf"
                download
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-xs font-bold text-white"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF ไทย (5 หน้า)</span>
              </a>
              <a
                href="/edu/cb01/EDU-CB01_Freebie_5Pages_EN.pdf"
                download
                className="inline-flex items-center gap-1.5 rounded-xl bg-white hover:bg-emerald-100 border border-emerald-300 px-4 py-2 text-xs font-bold text-emerald-900"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF EN (5 Pages)</span>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-[#1E293B] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>{lang === "th" ? "คำถามที่พบบ่อย (FAQ)" : "Frequently Asked Questions"}</span>
          </h2>
          <div className="space-y-2.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.qTh}
                  className="rounded-2xl border border-amber-200 bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left text-sm font-bold text-[#1E293B] cursor-pointer hover:bg-[#FEF9EF]"
                  >
                    <span>{lang === "th" ? faq.qTh : faq.qEn}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-600 shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-amber-100 pt-3">
                      {lang === "th" ? faq.aTh : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* BACK TO HUB */}
        <div className="text-center pt-2">
          <Link
            href="/edu"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-amber-300 bg-white hover:bg-amber-50 px-6 py-3 text-sm font-extrabold text-slate-900 shadow-xs transition-colors"
          >
            <span>{lang === "th" ? "ดูคลังสื่อ AiAon Edu-Verse ครบทั้ง 14 เล่ม Live" : "Explore All 14 Live AiAon Edu-Verse Kits"}</span>
            <ArrowRight className="w-4 h-4 text-amber-600" />
          </Link>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center cursor-pointer hover:bg-slate-900"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={GALLERY_IMAGES[lightboxIndex].src}
              alt={GALLERY_IMAGES[lightboxIndex].labelTh}
              className="w-full h-auto max-h-[75vh] object-contain bg-[#FEF9EF]"
            />
            <div className="p-4 flex items-center justify-between gap-3 bg-white border-t border-amber-100">
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
                }
                className="rounded-xl border border-slate-200 p-2 hover:bg-slate-50 cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs sm:text-sm font-bold text-slate-800 text-center">
                {lang === "th"
                  ? GALLERY_IMAGES[lightboxIndex].labelTh
                  : GALLERY_IMAGES[lightboxIndex].labelEn}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length)}
                className="rounded-xl border border-slate-200 p-2 hover:bg-slate-50 cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

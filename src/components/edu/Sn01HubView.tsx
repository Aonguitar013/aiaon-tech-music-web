"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Square,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  ClipboardCheck,
  Sparkles,
  Download,
  Printer,
  Gift,
  Layers,
  Home,
  School,
  X,
  HelpCircle,
  ChevronDown,
  Award,
  BookOpen,
  SkipForward,
  SkipBack,
} from "lucide-react";
import { FaLine } from "react-icons/fa6";
import { playApplauseAndFanfare, playStarPop } from "@/lib/eduAudio";
import { playSoftTapChime } from "@/lib/eduPhonicsAudio";
import { type EduLang, getEduOrderLineUrl } from "@/lib/eduCatalog";

type DomainKey = "math" | "iq" | "reading" | "science";

interface MockExamQuestion {
  no: number;
  domain: DomainKey;
  promptTh: string;
  promptEn: string;
  optionsTh: [string, string, string];
  optionsEn: [string, string, string];
  correctIndex: 0 | 1 | 2;
}

const DOMAINS: {
  key: DomainKey;
  emoji: string;
  nameTh: string;
  nameEn: string;
  rangeTh: string;
  rangeEn: string;
  reviewPages: string;
  barClass: string;
  badgeClass: string;
}[] = [
  {
    key: "math",
    emoji: "🔢",
    nameTh: "ส่วนที่ 1: คณิตศาสตร์",
    nameEn: "Section 1: Math",
    rangeTh: "ข้อ 1–5",
    rangeEn: "Q1–5",
    reviewPages: "P03–P08",
    barClass: "bg-sky-500",
    badgeClass: "bg-sky-100 text-sky-900 border-sky-300",
  },
  {
    key: "iq",
    emoji: "🧩",
    nameTh: "ส่วนที่ 2: เชาวน์ & มิติสัมพันธ์",
    nameEn: "Section 2: IQ & Spatial Logic",
    rangeTh: "ข้อ 6–10",
    rangeEn: "Q6–10",
    reviewPages: "P09–P14",
    barClass: "bg-violet-500",
    badgeClass: "bg-violet-100 text-violet-900 border-violet-300",
  },
  {
    key: "reading",
    emoji: "📖",
    nameTh: "ส่วนที่ 3: ภาษาและการอ่าน",
    nameEn: "Section 3: Reading & Language",
    rangeTh: "ข้อ 11–15",
    rangeEn: "Q11–15",
    reviewPages: "P15–P19",
    barClass: "bg-amber-500",
    badgeClass: "bg-amber-100 text-amber-950 border-amber-300",
  },
  {
    key: "science",
    emoji: "🔬",
    nameTh: "ส่วนที่ 4: ความรู้รอบตัว & วิทย์",
    nameEn: "Section 4: Science & GK",
    rangeTh: "ข้อ 16–20",
    rangeEn: "Q16–20",
    reviewPages: "P20–P22",
    barClass: "bg-emerald-500",
    badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-300",
  },
];

// 100% Verified against book_spec_EDU-SN01.json (P23-P26 & P30 Answer Key)
const MOCK_QUESTIONS: MockExamQuestion[] = [
  // Section 1: Math (Q1-Q5)
  {
    no: 1,
    domain: "math",
    promptTh: "9 + 8 เท่ากับเท่าไร?",
    promptEn: "What is 9 + 8?",
    optionsTh: ["15", "17", "18"],
    optionsEn: ["15", "17", "18"],
    correctIndex: 1,
  },
  {
    no: 2,
    domain: "math",
    promptTh: "16 − 7 เท่ากับเท่าไร?",
    promptEn: "What is 16 − 7?",
    optionsTh: ["9", "8", "11"],
    optionsEn: ["9", "8", "11"],
    correctIndex: 0,
  },
  {
    no: 3,
    domain: "math",
    promptTh: "จำนวนใดมีค่ามากที่สุด?",
    promptEn: "Which number is the GREATEST?",
    optionsTh: ["29", "41", "38"],
    optionsEn: ["29", "41", "38"],
    correctIndex: 1,
  },
  {
    no: 4,
    domain: "math",
    promptTh: "เข็มสั้นชี้เลข 3 เข็มยาวชี้เลข 6 คือเวลาใด?",
    promptEn: "Short hand past 3, long hand on 6 — what time?",
    optionsTh: ["3:00", "6:30", "3:30"],
    optionsEn: ["3:00", "6:30", "3:30"],
    correctIndex: 2,
  },
  {
    no: 5,
    domain: "math",
    promptTh: "มีส้ม 12 ผล แบ่งให้เพื่อน 4 ผล เหลือส้มกี่ผล?",
    promptEn: "You have 12 oranges and share 4. How many left?",
    optionsTh: ["8 ผล", "9 ผล", "16 ผล"],
    optionsEn: ["8 oranges", "9 oranges", "16 oranges"],
    correctIndex: 0,
  },
  // Section 2: IQ & Spatial Logic (Q6-Q10)
  {
    no: 6,
    domain: "iq",
    promptTh: "อนุกรมตัวเลข: 2 , 4 , 6 , 8 , ___ ตัวต่อไปคือ?",
    promptEn: "Number pattern: 2 , 4 , 6 , 8 , ___ What comes next?",
    optionsTh: ["9", "10", "12"],
    optionsEn: ["9", "10", "12"],
    correctIndex: 1,
  },
  {
    no: 7,
    domain: "iq",
    promptTh: "ข้อใด 'ไม่เข้าพวก'?",
    promptEn: "Which one does NOT belong?",
    optionsTh: ["รถยนต์", "รถบัส", "แอปเปิล"],
    optionsEn: ["Car", "Bus", "Apple"],
    correctIndex: 2,
  },
  {
    no: 8,
    domain: "iq",
    promptTh: "ตาชั่งสมดุล: แมว 1 ตัว หนักเท่ากับปลา 4 ตัว ถ้ามีแมว 2 ตัวจะเท่ากับปลากี่ตัว?",
    promptEn: "1 cat balances 4 fish. How many fish balance 2 cats?",
    optionsTh: ["6 ตัว", "8 ตัว", "10 ตัว"],
    optionsEn: ["6 fish", "8 fish", "10 fish"],
    correctIndex: 1,
  },
  {
    no: 9,
    domain: "iq",
    promptTh: "กบอยู่ในแถวลำดับที่ 1, เป็ดลำดับที่ 2, แมวลำดับที่ 3 — ใครอยู่ 'ตรงกลาง'?",
    promptEn: "Frog is 1st, Duck is 2nd, Cat is 3rd. Who is in the MIDDLE?",
    optionsTh: ["เป็ด", "กบ", "แมว"],
    optionsEn: ["Duck", "Frog", "Cat"],
    correctIndex: 0,
  },
  {
    no: 10,
    domain: "iq",
    promptTh: "กล่องชั้นล่างมี 4 ก้อน ชั้นบนวางซ้อน 2 ก้อน รวมมีบล็อกกี่ก้อน?",
    promptEn: "4 cubes on the bottom layer + 2 cubes stacked on top = ?",
    optionsTh: ["5 ก้อน", "6 ก้อน", "8 ก้อน"],
    optionsEn: ["5 cubes", "6 cubes", "8 cubes"],
    correctIndex: 1,
  },
  // Section 3: Reading & Language (Q11-Q15)
  {
    no: 11,
    domain: "reading",
    promptTh: "คำใดสะกดตรงกับภาพ 'สัตว์ที่ร้องเหมียว'?",
    promptEn: "Which word rhymes with 'CAT'?",
    optionsTh: ["แมว", "เมว", "มัว"],
    optionsEn: ["HAT", "DOG", "SUN"],
    correctIndex: 0,
  },
  {
    no: 12,
    domain: "reading",
    promptTh: "คำตรงข้ามของ 'สูง' คือคำใด?",
    promptEn: "What is the opposite of 'TALL'?",
    optionsTh: ["ยาว", "เตี้ย", "ใหญ่"],
    optionsEn: ["Long", "Short", "Big"],
    correctIndex: 1,
  },
  {
    no: 13,
    domain: "reading",
    promptTh: "ช้าง 2 ______ (เติมลักษณนามให้ถูกต้อง)",
    promptEn: "Which letter begins the word 'SUN'?",
    optionsTh: ["ตัว", "เล่ม", "เชือก"],
    optionsEn: ["M", "T", "S"],
    correctIndex: 2,
  },
  {
    no: 14,
    domain: "reading",
    promptTh: "ประโยค 'น้องบ๊อบอ่านหนังสือที่ห้องสมุด' — น้องบ๊อบอยู่ที่ไหน?",
    promptEn: "'Bob reads a book at the library.' Where is Bob?",
    optionsTh: ["ตลาด", "ห้องสมุด", "สนามบิน"],
    optionsEn: ["Park", "Library", "Airport"],
    correctIndex: 1,
  },
  {
    no: 15,
    domain: "reading",
    promptTh: "คำใดเป็นคำควบกล้ำที่สะกดถูกต้อง?",
    promptEn: "Complete: 'The frog can ___ high.'",
    optionsTh: ["ปลา", "ปา", "ปาา"],
    optionsEn: ["jump", "book", "blue"],
    correctIndex: 0,
  },
  // Section 4: Science & GK (Q16-Q20)
  {
    no: 16,
    domain: "science",
    promptTh: "ข้อใดเป็น 'สิ่งไม่มีชีวิต'?",
    promptEn: "Which one is NON-LIVING?",
    optionsTh: ["สุนัข", "ต้นไม้", "เก้าอี้ไม้"],
    optionsEn: ["Puppy", "Tree", "Wooden chair"],
    correctIndex: 2,
  },
  {
    no: 17,
    domain: "science",
    promptTh: "สีน้ำเงิน ผสมกับ สีเหลือง จะได้สีอะไร?",
    promptEn: "Blue + Yellow paint makes what color?",
    optionsTh: ["สีเขียว", "สีชมพู", "สีดำ"],
    optionsEn: ["Green", "Pink", "Black"],
    correctIndex: 0,
  },
  {
    no: 18,
    domain: "science",
    promptTh: "เมื่อไม่สบายตัวร้อน ควรไปพบใคร?",
    promptEn: "When you have a fever, who helps you?",
    optionsTh: ["นักดับเพลิง", "คุณหมอ", "คนขับรถไฟ"],
    optionsEn: ["Firefighter", "Doctor", "Train driver"],
    correctIndex: 1,
  },
  {
    no: 19,
    domain: "science",
    promptTh: "ก่อนรับประทานอาหารทุกครั้ง ควรทำสิ่งใด?",
    promptEn: "What should you always do before eating?",
    optionsTh: ["ล้างมือให้สะอาด", "กระโดดตบ", "ปิดไฟ"],
    optionsEn: ["Wash your hands", "Jump on a bed", "Turn off lights"],
    correctIndex: 0,
  },
  {
    no: 20,
    domain: "science",
    promptTh: "1 ปี มีทั้งหมดกี่เดือน?",
    promptEn: "How many months are in 1 year?",
    optionsTh: ["7 เดือน", "10 เดือน", "12 เดือน"],
    optionsEn: ["7 months", "10 months", "12 months"],
    correctIndex: 2,
  },
];

const CHOICE_LABELS_TH = ["ก", "ข", "ค"] as const;
const CHOICE_LABELS_EN = ["A", "B", "C"] as const;

const TIMER_PRESETS = [
  { labelTh: "15 นาที (สอบจริง 20 ข้อ)", labelEn: "15 Min (Official Mock)", sec: 15 * 60 },
  { labelTh: "10 นาที (ซ้อมเร่งสปีด)", labelEn: "10 Min (Speed Drill)", sec: 10 * 60 },
  { labelTh: "5 นาที (ทีละส่วน 5 ข้อ)", labelEn: "5 Min (Single Section)", sec: 5 * 60 },
];

const GALLERY_IMAGES = [
  {
    src: "/edu/sn01/mockup-01-cover.webp",
    labelTh: "ปกหน้า Level 2 & จุดเด่นชุดติวสอบเข้า ป.1 32 หน้า",
    labelEn: "Level 2 Front Cover & 32-Page Highlights",
  },
  {
    src: "/edu/sn01/mockup-02-domains.webp",
    labelTh: "เจาะลึกครบ 5 ด่าน: คณิต, บล็อก 3D, ภาษา, วิทย์ + Mock Exam",
    labelEn: "Inside All 5 Readiness Domains & Mock Exam",
  },
  {
    src: "/edu/sn01/mockup-03-color-bw.webp",
    labelTh: "ครบทั้งโหมดสีพาสเทล & ขาว-ดำประหยัดหมึก 100%",
    labelEn: "Full Color + 100% Ink-Saving B&W Editions",
  },
  {
    src: "/edu/sn01/mockup-04-editions.webp",
    labelTh: "เทียบสิทธิ์ Home (129฿) vs Class Edition (249฿)",
    labelEn: "Home ($5.99) vs Class Edition ($8.99)",
  },
];

const FAQS = [
  {
    qTh: "ลูกอายุ 5 ขวบ ยังอ่านหนังสือไม่คล่อง ใช้ชุดติวสอบเข้า ป.1 นี้ได้ไหม?",
    qEn: "My 5-year-old isn't reading fluently yet — can they still use this kit?",
    aTh: "ได้ 100% ครับ! นี่คือจุดเด่นที่ออกแบบมาเพื่อแก้ปัญหานี้โดยเฉพาะ เพราะสนามสอบเข้า ป.1 จริงคุณครูจะอ่านโจทย์ให้เด็กฟัง หน้าเว็บ /edu/sn01 นี้จึงมีระบบ Audio Exam Simulator อ่านโจทย์ทั้ง 20 ข้อให้ฟังชัดเจนทีละข้อ (ปรับสปีดช้าได้) เด็กฝึกฟังคำสั่งแล้วฝนวงกลมในกระดาษคำตอบหน้า 27 เหมือนวันสอบจริงได้เลยครับ",
    aEn: "Yes, 100%! Real Grade 1 readiness screenings are often read aloud. Our free Audio Exam Simulator right here on /edu/sn01 reads all 20 Mock Exam questions aloud at a kid-friendly pace while your child bubbles their answers on Page 27.",
  },
  {
    qTh: "ต่างจากชุด Level 1 (แก๊ง 6 แมว 6 เล่มแรก) อย่างไร?",
    qEn: "How is Level 2 different from the 6 Level 1 books?",
    aTh: "Level 1 (วัย 3–6 ปี) เน้นปูพื้นฐานแยกด้านทั้ง EF, วินัย, ลีลามือ, ดนตรี, Phonics และ SEL ส่วน EDU-SN01 คือเล่มแรกของสาย Level 2 (วัย 5–7 ปี / อ.3 เตรียม ป.1) ที่ยกระดับโจทย์สู่แนวสอบเข้า ป.1 จริง เช่น นับบล็อก 3 มิติ (Isometric Cubes), ตาชั่งสมดุล, อ่านนาฬิกา, นับเหรียญ, ซูโดกุ LV2, อ่านจับใจความ และ Mock Exam จับเวลา 20 ข้อพร้อม OMR ครับ",
    aEn: "Level 1 (Ages 3–6) builds foundational habits across 6 separate books. EDU-SN01 launches Level 2 (Ages 5–7 / Pre-1st Grade), stepping up to real entrance-style challenges: 3D isometric cube counting, balance scales, analog clocks, coins, reading comprehension, and a timed 20-item Mock Exam with OMR scoring.",
  },
  {
    qTh: "ได้ไฟล์อะไรบ้าง? ปริ้นท์ A4 หรือ US Letter ได้ไหม?",
    qEn: "What files are included, and do they print on both A4 and US Letter?",
    aTh: "ได้รับครบทั้ง 4 ไฟล์ PDF ในชุดเดียวครับ (ภาษาไทย-สี / ภาษาไทย-ขาวดำประหยัดหมึก / ภาษาอังกฤษ-สี / ภาษาอังกฤษ-ขาวดำ) ออกแบบในกรอบปลอดภัย Universal Safe Box ปริ้นท์ได้ทั้ง A4 และ US Letter ไม่ตกขอบ 100% พร้อมเฉลยครบทุกหน้า (3 หน้า) และใบประกาศพร้อมลุย ป.1 ครับ",
    aEn: "You get crisp Full Color + Ink-Saving B&W PDFs formatted inside a Universal Safe Print Box that prints cleanly on both US Letter (8.5×11\") and A4 paper, complete with 3 verified Answer Key pages and a Gold Readiness Certificate.",
  },
];

const STORAGE_KEY = "iaon_edu_sn01_answers_v1";

function formatClock(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function buildSpokenScript(q: MockExamQuestion, lang: EduLang): string {
  if (lang === "th") {
    const cleanPrompt = q.promptTh
      .replace(/___+/g, "ช่องว่าง")
      .replace(/−/g, " ลบ ")
      .replace(/\+/g, " บวก ")
      .replace(/,/g, " ");
    return `ข้อที่ ${q.no}. ${cleanPrompt}. กอ ไก่ ${q.optionsTh[0]}. ขอ ไข่ ${q.optionsTh[1]}. คอ ควาย ${q.optionsTh[2]}.`;
  }
  const cleanPrompt = q.promptEn
    .replace(/___+/g, "blank")
    .replace(/−/g, " minus ")
    .replace(/\+/g, " plus ");
  return `Question ${q.no}. ${cleanPrompt}. A, ${q.optionsEn[0]}. B, ${q.optionsEn[1]}. C, ${q.optionsEn[2]}.`;
}

export function Sn01HubView() {
  const [lang, setLang] = useState<EduLang>("th");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [speechRate, setSpeechRate] = useState<number>(0.88);

  // Audio Exam Simulator State
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);

  // 15-Minute Exam Countdown Timer State
  const [timerPresetSec, setTimerPresetSec] = useState<number>(15 * 60);
  const [timeLeftSec, setTimeLeftSec] = useState<number>(15 * 60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  // 20-Item OMR Answer Sheet & Diagnostic Score State
  const [answers, setAnswers] = useState<Record<number, 0 | 1 | 2>>({});
  const [showGraded, setShowGraded] = useState<boolean>(false);

  // UI Helpers
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMsg(null), 3200);
  };

  // Init language from query & load saved OMR answers
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        setSpeechSupported("speechSynthesis" in window);
        const params = new URLSearchParams(window.location.search);
        const qLang = params.get("lang")?.toLowerCase();
        if (qLang === "en" || qLang === "th") setLang(qLang);

        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Record<string, number>;
          const clean: Record<number, 0 | 1 | 2> = {};
          for (const [k, v] of Object.entries(parsed)) {
            const qNo = Number(k);
            if (qNo >= 1 && qNo <= 20 && (v === 0 || v === 1 || v === 2)) {
              clean[qNo] = v;
            }
          }
          setAnswers(clean);
        }
      }
    } catch {
      // ignore storage errors
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // 15-Minute Timer Loop
  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setTimeLeftSec((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          if (soundEnabled) playApplauseAndFanfare();
          showToast(
            lang === "th"
              ? "⏰ หมดเวลาสอบแล้ว! วางดินสอแล้วมาตรวจคะแนน 4 ด้านกันเลย!"
              : "⏰ Time's up! Pencils down — let's check your 4-domain score!"
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, soundEnabled, lang]);

  // Lightbox Keyboard Nav
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

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    setIsSpeaking(false);
  };

  const speakQuestion = (q: MockExamQuestion) => {
    if (!soundEnabled) {
      showToast(
        lang === "th"
          ? "🔇 กำลังปิดเสียงอยู่ — กดปุ่ม 'เปิดเสียง' มุมบนขวาก่อนนะครับ"
          : "🔇 Sound is muted — tap Sound On at the top right first!"
      );
      return;
    }
    playSoftTapChime(587.33);
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      showToast(
        lang === "th"
          ? "เบราว์เซอร์นี้ไม่รองรับเสียงอ่านอัตโนมัติ (แนะนำเปิดผ่าน Chrome / Safari)"
          : "Web Speech API not supported in this browser (try Chrome or Safari)."
      );
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const script = buildSpokenScript(q, lang);
      const utter = new SpeechSynthesisUtterance(script);
      utter.lang = lang === "th" ? "th-TH" : "en-US";
      utter.rate = speechRate;
      utter.pitch = 1.04;

      const voices = window.speechSynthesis.getVoices();
      const prefix = lang === "th" ? "th" : "en-us";
      const match =
        voices.find((v) => v.lang.toLowerCase().startsWith(prefix)) ??
        voices.find((v) => v.lang.toLowerCase().startsWith(lang));
      if (match) utter.voice = match;

      utter.onstart = () => setIsSpeaking(true);
      utter.onend = () => setIsSpeaking(false);
      utter.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utter);
    } catch {
      setIsSpeaking(false);
    }
  };

  const goToQuestion = (idx: number, autoSpeak = false) => {
    const safeIdx = Math.max(0, Math.min(MOCK_QUESTIONS.length - 1, idx));
    stopSpeech();
    setCurrentIdx(safeIdx);
    if (autoSpeak) {
      setTimeout(() => speakQuestion(MOCK_QUESTIONS[safeIdx]), 80);
    }
  };

  const selectAnswer = (qNo: number, choiceIdx: 0 | 1 | 2) => {
    setAnswers((prev) => {
      const next = { ...prev, [qNo]: choiceIdx };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    if (soundEnabled) playStarPop();
  };

  const resetAllAnswers = () => {
    setAnswers({});
    setShowGraded(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    showToast(
      lang === "th"
        ? "ล้างกระดาษคำตอบ OMR เรียบร้อย พร้อมเริ่มสอบรอบใหม่!"
        : "OMR bubble sheet cleared — ready for a fresh attempt!"
    );
  };

  const handleGradeExam = () => {
    const nextGraded = !showGraded;
    setShowGraded(nextGraded);
    if (nextGraded && soundEnabled) {
      if (totalCorrect >= 17) {
        playApplauseAndFanfare();
      } else {
        playSoftTapChime(659.25);
      }
    }
  };

  const handleSelectPreset = (sec: number) => {
    setTimerRunning(false);
    setTimerPresetSec(sec);
    setTimeLeftSec(sec);
  };

  const currentQuestion = MOCK_QUESTIONS[currentIdx];
  const currentDomain =
    DOMAINS.find((d) => d.key === currentQuestion.domain) ?? DOMAINS[0];

  const answeredCount = Object.keys(answers).length;
  const totalCorrect = MOCK_QUESTIONS.reduce(
    (sum, q) => sum + (answers[q.no] === q.correctIndex ? 1 : 0),
    0
  );

  const domainScores = DOMAINS.map((d) => {
    const qs = MOCK_QUESTIONS.filter((q) => q.domain === d.key);
    const correct = qs.filter((q) => answers[q.no] === q.correctIndex).length;
    const answered = qs.filter((q) => answers[q.no] !== undefined).length;
    return { ...d, correct, total: qs.length, answered };
  });

  const readinessBanner =
    totalCorrect >= 17
      ? {
          style: "border-emerald-300 bg-emerald-50 text-emerald-950",
          titleTh: "🏆 ยอดเยี่ยมมาก! พร้อมลุยสนามสอบ ป.1 มั่นใจ 100%",
          titleEn: "🏆 Outstanding! 100% Ready to Shine in 1st Grade!",
          descTh:
            "พื้นฐานแน่นครบทั้ง 4 ด้านเลยครับ อย่าลืมมอบใบประกาศนียบัตรหน้า 31 เพื่อสร้างความภูมิใจให้น้องนะครับ!",
          descEn:
            "All 4 domains are rock solid! Award the Gold Readiness Certificate on Page 31 to celebrate!",
        }
      : totalCorrect >= 13
        ? {
            style: "border-amber-300 bg-amber-50 text-amber-950",
            titleTh: "🌟 พื้นฐานดีมาก! ทบทวนเฉพาะหมวดที่ได้ต่ำกว่า 4/5",
            titleEn: "🌟 Strong Progress! Gently Review Any Domain Under 4/5",
            descTh:
              "อีกนิดเดียวก็ทะลุเกณฑ์พร้อมสอบเต็มร้อยแล้ว ดูแถบคะแนน 4 ด้านแล้วเปิดทบทวนเฉพาะหน้าที่แนะนำได้เลยครับ",
            descEn:
              "Almost at gold mastery! Check the 4-domain bars below and review just the targeted pages.",
          }
        : {
            style: "border-rose-300 bg-rose-50 text-rose-950",
            titleTh: "💪 เริ่มต้นได้เยี่ยม! ฝึกซ้ำวันละ 2 หน้าอีก 7 วันคะแนนพุ่งแน่นอน",
            titleEn: "💪 Great First Run! Practice 2 Pages/Day for 7 Days & Retake",
            descTh:
              "การสอบจำลองครั้งแรกมีไว้ให้เห็นจุดที่ต้องช่วยกันฝึกครับ ทบทวนตามเลขหน้าแนะนำวันละ 15 นาที แล้วมาลองสอบใหม่กัน!",
            descEn:
              "Mock exams show us exactly where to help! Practice 15 mins/day with the suggested pages and watch the score jump!",
          };

  const timerProgressPct =
    timerPresetSec > 0 ? Math.round((timeLeftSec / timerPresetSec) * 100) : 0;
  const isLowTime = timeLeftSec > 0 && timeLeftSec <= 120;

  return (
    <div className="w-full overflow-x-hidden bg-[#FFFDF7] text-[#1E293B] -mt-4 md:-mt-8 pt-6 md:pt-10 pb-16 sm:pb-20 border-b border-sky-200/80">
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-2xl border-2 border-sky-300 bg-white px-4 py-3 text-sm font-bold text-[#1E293B] shadow-xl">
          {toastMsg}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        {/* TOP NAV + CONTROLS */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/edu"
            className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white hover:bg-sky-50 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-sky-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>
              {lang === "th" ? "กลับคลังสื่อ AiAon Edu-Verse" : "Back to Edu-Verse Hub"}
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            {/* Speech Rate Selector */}
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setSpeechRate(0.78)}
                className={`rounded-full px-2.5 py-1 cursor-pointer transition-colors ${
                  speechRate <= 0.8 ? "bg-amber-400 text-slate-950" : "text-slate-600"
                }`}
                title="Kid-friendly slower pace"
              >
                {lang === "th" ? "ช้า 0.8x" : "Slow"}
              </button>
              <button
                type="button"
                onClick={() => setSpeechRate(0.95)}
                className={`rounded-full px-2.5 py-1 cursor-pointer transition-colors ${
                  speechRate > 0.8 ? "bg-sky-600 text-white" : "text-slate-600"
                }`}
                title="Normal exam pace"
              >
                {lang === "th" ? "ปกติ 1x" : "Normal"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (soundEnabled) stopSpeech();
                setSoundEnabled((v) => !v);
              }}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
                soundEnabled
                  ? "border-sky-300 bg-sky-600 text-white"
                  : "border-slate-300 bg-white text-slate-600"
              }`}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
              <span>
                {soundEnabled
                  ? lang === "th"
                    ? "เปิดเสียงอยู่"
                    : "Sound On"
                  : lang === "th"
                    ? "ปิดเสียง"
                    : "Muted"}
              </span>
            </button>

            <div className="inline-flex rounded-full border border-slate-200 bg-white p-0.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  stopSpeech();
                  setLang("th");
                }}
                className={`rounded-full px-2.5 py-1 cursor-pointer ${
                  lang === "th" ? "bg-sky-600 text-white" : "text-slate-600"
                }`}
              >
                TH
              </button>
              <button
                type="button"
                onClick={() => {
                  stopSpeech();
                  setLang("en");
                }}
                className={`rounded-full px-2.5 py-1 cursor-pointer ${
                  lang === "en" ? "bg-sky-600 text-white" : "text-slate-600"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* HERO BANNER */}
        <section className="rounded-3xl border-2 border-sky-200 bg-gradient-to-br from-[#F0F9FF] via-white to-[#FEF9EF] p-5 sm:p-8 shadow-md shadow-sky-900/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 min-w-0 space-y-4">
              <div className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-sky-300 bg-white px-3 py-1 text-[11px] sm:text-xs font-bold text-sky-900 max-w-full">
                <GraduationCap className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>
                  EDU-SN01 • LEVEL 2 (อายุ 5–7 ปี) • AUDIO EXAM SIMULATOR 20 ข้อ
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight break-words">
                {lang === "th" ? (
                  <>
                    ติวเข้มสอบเข้า ป.1{" "}
                    <span className="text-sky-700">กับแก๊ง 6 แมว (Level 2)</span>
                  </>
                ) : (
                  <>
                    Grade 1 Entrance &amp;{" "}
                    <span className="text-sky-700">Readiness Exam Prep (Level 2)</span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {lang === "th"
                  ? "หมดปัญหาพ่อแม่ต้องนั่งอ่านโจทย์ให้ทีละข้อ! เปิดห้องสอบจำลองมีเสียงอ่านโจทย์ครบ 20 ข้อ + นาฬิกาจับเวลา 15 นาที + ตารางตรวจคำตอบ OMR วิเคราะห์จุดแข็ง 4 ด้าน คู่หนังสือติว 32 หน้าเต็ม (คณิต, นับบล็อก 3D, ตาชั่ง, ภาษา, วิทย์) ฟรีไม่มีโฆษณา"
                  : "No more reading every question aloud by hand! Launch the ad-free 20-Item Audio Exam Simulator + 15-Minute Countdown Timer + 4-Domain OMR Readiness Grader paired with our 32-page Level 2 workbook."}
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="#exam-simulator"
                  className="inline-flex items-center gap-2 rounded-2xl bg-sky-700 hover:bg-sky-800 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>
                    {lang === "th"
                      ? "เปิดห้องสอบจำลอง 20 ข้อ & จับเวลา"
                      : "Launch 20-Q Audio Exam Simulator"}
                  </span>
                </a>
                <a
                  href="#freebie"
                  className="inline-flex items-center gap-2 rounded-2xl border-2 border-amber-300 bg-amber-50 hover:bg-amber-100 px-5 py-3 text-sm font-bold text-amber-950 transition-colors"
                >
                  <Download className="w-4 h-4 text-amber-700" />
                  <span>
                    {lang === "th" ? "โหลดชุดทดลองฟรี 5 หน้า (0 ฿)" : "Free 5-Page Sample PDF"}
                  </span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative flex flex-col items-center">
                <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full border-4 border-sky-200 bg-white p-3 shadow-lg overflow-hidden flex items-center justify-center">
                  <img
                    src="/edu/salmon-3d.webp"
                    alt="Detective Salmon 3D Mascot — EDU-SN01 Grade 1 Exam Prep"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="-mt-3 relative z-10 rounded-full bg-sky-700 px-3.5 py-1 text-xs font-extrabold text-white shadow">
                  🎓 Level 2 • Mock Exam 20 ข้อ
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            HYBRID QR TOOLS #1 & #2: AUDIO EXAM SIMULATOR + 15-MIN TIMER
        ============================================================ */}
        <section
          id="exam-simulator"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 scroll-mt-24"
        >
          {/* TOOL 1: 20-QUESTION AUDIO EXAM SIMULATOR (LEFT 8 COLS) */}
          <div className="lg:col-span-8 rounded-3xl border-2 border-sky-200 bg-white p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-sky-700">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>HYBRID QR TOOL #1 • P23–P26 AUDIO EXAM SIMULATOR</span>
                </span>
                <h2 className="text-xl font-extrabold text-[#0F172A] mt-0.5">
                  {lang === "th"
                    ? "🎧 เสียงอ่านโจทย์สนามสอบจำลอง ป.1 (ครบ 20 ข้อ)"
                    : "🎧 20-Question Spoken Audio Exam Simulator"}
                </h2>
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-extrabold ${currentDomain.badgeClass}`}
              >
                {currentDomain.emoji}{" "}
                {lang === "th" ? currentDomain.nameTh : currentDomain.nameEn}
              </span>
            </div>

            {/* Section Quick Jump Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DOMAINS.map((d, sIdx) => {
                const startQIdx = sIdx * 5;
                const active = currentQuestion.domain === d.key;
                return (
                  <button
                    key={d.key}
                    type="button"
                    onClick={() => goToQuestion(startQIdx, false)}
                    className={`rounded-xl border-2 px-3 py-2 text-left transition-all cursor-pointer ${
                      active
                        ? "border-sky-500 bg-sky-50 shadow-xs"
                        : "border-slate-200 bg-[#FFFDF7] hover:border-sky-300"
                    }`}
                  >
                    <div className="text-xs font-extrabold text-[#0F172A]">
                      {d.emoji} {lang === "th" ? d.rangeTh : d.rangeEn}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-600 truncate">
                      {lang === "th"
                        ? d.nameTh.replace(/^ส่วนที่ \d+: /, "")
                        : d.nameEn.replace(/^Section \d+: /, "")}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Question Card */}
            <div className="rounded-2xl border-2 border-sky-200/90 bg-gradient-to-br from-[#F0F9FF]/70 via-white to-[#FEF9EF] p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-700 px-3.5 py-1 text-xs font-extrabold text-white">
                  {lang === "th"
                    ? `ข้อที่ ${currentQuestion.no} / 20`
                    : `Question ${currentQuestion.no} / 20`}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {lang === "th"
                    ? "ฝนคำตอบในกระดาษหน้า 27 หรือแตะเลือกด้านล่าง"
                    : "Bubble on Page 27 or tap an answer below"}
                </span>
              </div>

              <p className="text-lg sm:text-xl font-extrabold text-[#0F172A] leading-snug">
                {lang === "th" ? currentQuestion.promptTh : currentQuestion.promptEn}
              </p>

              {/* 3 Interactive Choice Buttons (Synced with OMR Table) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {([0, 1, 2] as const).map((cIdx) => {
                  const selected = answers[currentQuestion.no] === cIdx;
                  const isCorrect = currentQuestion.correctIndex === cIdx;
                  const choiceLetter =
                    lang === "th" ? CHOICE_LABELS_TH[cIdx] : CHOICE_LABELS_EN[cIdx];
                  const choiceText =
                    lang === "th"
                      ? currentQuestion.optionsTh[cIdx]
                      : currentQuestion.optionsEn[cIdx];

                  let btnStyle =
                    "border-slate-200 bg-white hover:border-sky-400 text-[#1E293B]";
                  if (showGraded) {
                    if (isCorrect) {
                      btnStyle =
                        "border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-200";
                    } else if (selected && !isCorrect) {
                      btnStyle =
                        "border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-200";
                    }
                  } else if (selected) {
                    btnStyle =
                      "border-sky-600 bg-sky-100 text-sky-950 ring-2 ring-sky-200";
                  }

                  return (
                    <button
                      key={cIdx}
                      type="button"
                      onClick={() => selectAnswer(currentQuestion.no, cIdx)}
                      className={`rounded-2xl border-2 px-4 py-3 text-left font-bold transition-all cursor-pointer flex items-center gap-3 ${btnStyle}`}
                    >
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0 border ${
                          selected
                            ? "bg-sky-700 text-white border-sky-700"
                            : "bg-[#FFFDF7] text-slate-800 border-slate-300"
                        }`}
                      >
                        {choiceLetter}
                      </span>
                      <span className="text-sm sm:text-base">{choiceText}</span>
                    </button>
                  );
                })}
              </div>

              {/* Audio Controls Row */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => speakQuestion(currentQuestion)}
                  className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-700 hover:bg-sky-800 px-5 py-3 text-sm sm:text-base font-bold text-white shadow-sm cursor-pointer transition-colors"
                >
                  <Volume2 className={`w-5 h-5 ${isSpeaking ? "animate-pulse" : ""}`} />
                  <span>
                    {isSpeaking
                      ? lang === "th"
                        ? "กำลังอ่านโจทย์... (กดเพื่ออ่านซ้ำ)"
                        : "Reading aloud... (Tap to repeat)"
                      : lang === "th"
                        ? `🔊 อ่านโจทย์ข้อ ${currentQuestion.no} ให้ฟัง`
                        : `🔊 Read Question ${currentQuestion.no} Aloud`}
                  </span>
                </button>

                {isSpeaking && (
                  <button
                    type="button"
                    onClick={stopSpeech}
                    className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-rose-600 hover:bg-rose-700 px-4 py-3 text-sm font-bold text-white cursor-pointer transition-colors"
                  >
                    <Square className="w-4 h-4" />
                    <span>{lang === "th" ? "หยุด" : "Stop"}</span>
                  </button>
                )}

                <div className="inline-flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => goToQuestion(currentIdx - 1, false)}
                    disabled={currentIdx === 0}
                    className="inline-flex items-center gap-1 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 px-3.5 py-3 text-xs sm:text-sm font-bold text-slate-800 cursor-pointer"
                  >
                    <SkipBack className="w-4 h-4" />
                    <span>{lang === "th" ? "ก่อนหน้า" : "Prev"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => goToQuestion(currentIdx + 1, true)}
                    disabled={currentIdx === MOCK_QUESTIONS.length - 1}
                    className="inline-flex items-center gap-1 rounded-2xl border-2 border-amber-300 bg-amber-100 hover:bg-amber-200 disabled:opacity-40 px-3.5 py-3 text-xs sm:text-sm font-bold text-amber-950 cursor-pointer"
                  >
                    <span>{lang === "th" ? "ข้อถัดไป + อ่าน" : "Next + Read"}</span>
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {!speechSupported && (
                <p className="text-xs font-semibold text-amber-800">
                  {lang === "th"
                    ? "* อุปกรณ์นี้ไม่รองรับเสียงอ่าน Web Speech API แนะนำเปิดบน Chrome หรือ Safari ครับ"
                    : "* Web Speech API is unavailable on this browser. Please open in Chrome or Safari."}
                </p>
              )}
            </div>

            {/* 1-20 Quick Number Grid */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span>
                  {lang === "th"
                    ? "เลือกกระโดดไปข้อที่ต้องการ (1–20):"
                    : "Jump to any question (1–20):"}
                </span>
                <span className="text-sky-800">
                  {lang === "th"
                    ? `ตอบแล้ว ${answeredCount}/20 ข้อ`
                    : `Answered ${answeredCount}/20`}
                </span>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                {MOCK_QUESTIONS.map((q, idx) => {
                  const isCurrent = idx === currentIdx;
                  const userAns = answers[q.no];
                  const hasAns = userAns !== undefined;
                  const isRight = hasAns && userAns === q.correctIndex;

                  let pillClass =
                    "border-slate-200 bg-[#FFFDF7] text-slate-700 hover:border-sky-400";
                  if (showGraded && hasAns) {
                    pillClass = isRight
                      ? "border-emerald-500 bg-emerald-100 text-emerald-950"
                      : "border-rose-500 bg-rose-100 text-rose-950";
                  } else if (hasAns) {
                    pillClass = "border-sky-400 bg-sky-100 text-sky-950";
                  }
                  if (isCurrent) {
                    pillClass += " ring-2 ring-sky-600 font-extrabold";
                  }

                  return (
                    <button
                      key={q.no}
                      type="button"
                      onClick={() => goToQuestion(idx, false)}
                      className={`h-9 rounded-xl border text-xs font-bold cursor-pointer transition-all ${pillClass}`}
                    >
                      {q.no}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* TOOL 2: 15-MINUTE EXAM COUNTDOWN TIMER (RIGHT 4 COLS) */}
          <div className="lg:col-span-4 rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-[#FEF9EF] via-white to-[#FFF5F5] p-5 sm:p-6 shadow-sm flex flex-col justify-between gap-5">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-800">
                <Clock className="w-3.5 h-3.5" />
                <span>HYBRID QR TOOL #2 • EXAM TIMER</span>
              </span>
              <h2 className="text-xl font-extrabold text-[#0F172A]">
                {lang === "th"
                  ? "⏱️ นาฬิกาจับเวลาสอบ 15 นาที"
                  : "⏱️ 15-Minute Readiness Timer"}
              </h2>
              <p className="text-xs text-slate-600">
                {lang === "th"
                  ? "ฝึกคุมสมาธิและบริหารเวลาเหมือนสนามสอบเข้า ป.1 จริง (โดยโค้ชแม่ใหญ่)"
                  : "Build real exam focus & pacing with Mama Mami's gentle countdown."}
              </p>
            </div>

            {/* Timer Preset Buttons */}
            <div className="flex flex-col gap-1.5">
              {TIMER_PRESETS.map((p) => (
                <button
                  key={p.sec}
                  type="button"
                  onClick={() => handleSelectPreset(p.sec)}
                  className={`rounded-xl border px-3 py-2 text-xs font-bold text-left cursor-pointer transition-colors ${
                    timerPresetSec === p.sec
                      ? "border-amber-400 bg-amber-100 text-amber-950"
                      : "border-slate-200 bg-white hover:bg-amber-50 text-slate-700"
                  }`}
                >
                  {lang === "th" ? p.labelTh : p.labelEn}
                </button>
              ))}
            </div>

            {/* Countdown Display */}
            <div
              className={`rounded-3xl border-2 p-5 text-center space-y-3 transition-colors ${
                isLowTime
                  ? "border-rose-400 bg-rose-50"
                  : timerRunning
                    ? "border-emerald-400 bg-emerald-50/70"
                    : "border-amber-200 bg-white"
              }`}
            >
              <div
                className={`font-mono text-5xl font-extrabold tracking-tight ${
                  isLowTime ? "text-rose-700" : "text-[#0F172A]"
                }`}
              >
                {formatClock(timeLeftSec)}
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    isLowTime ? "bg-rose-500" : "bg-sky-600"
                  }`}
                  style={{ width: `${timerProgressPct}%` }}
                />
              </div>
              <div className="text-xs font-bold text-slate-600">
                {timeLeftSec === 0
                  ? lang === "th"
                    ? "🔔 หมดเวลาสอบแล้ว!"
                    : "🔔 Time's Up!"
                  : isLowTime
                    ? lang === "th"
                      ? "⚡ เหลือไม่ถึง 2 นาที! ทวนกระดาษคำตอบเลย"
                      : "⚡ Under 2 minutes left — check your bubbles!"
                    : timerRunning
                      ? lang === "th"
                        ? "🎯 กำลังสอบจำลอง... ตั้งใจทำทีละข้อนะ!"
                        : "🎯 Exam in progress — steady focus!"
                      : lang === "th"
                        ? "พร้อมเริ่มจับเวลาสอบเมื่อกดปุ่มด้านล่าง"
                        : "Ready to start when you are!"}
              </div>
            </div>

            {/* Start / Pause / Reset Controls */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (timeLeftSec === 0) setTimeLeftSec(timerPresetSec);
                    setTimerRunning((r) => !r);
                    if (soundEnabled) playSoftTapChime(523.25);
                  }}
                  className={`flex-1 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white cursor-pointer transition-colors ${
                    timerRunning
                      ? "bg-rose-600 hover:bg-rose-700"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  {timerRunning ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  <span>
                    {timerRunning
                      ? lang === "th"
                        ? "พักเวลา"
                        : "Pause"
                      : lang === "th"
                        ? "เริ่มจับเวลา"
                        : "Start Timer"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTimerRunning(false);
                    setTimeLeftSec(timerPresetSec);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 cursor-pointer"
                  title="Reset timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setTimeLeftSec(timerPresetSec);
                  setTimerRunning(true);
                  goToQuestion(0, true);
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 hover:bg-amber-500 px-4 py-2.5 text-xs sm:text-sm font-extrabold text-slate-950 cursor-pointer transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {lang === "th"
                    ? "เริ่มสอบจับเวลา + อ่านข้อ 1 ทันที!"
                    : "Start Timer + Read Q1 Now!"}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================
            HYBRID QR TOOL #3: 20-ITEM OMR GRADER & 4-DOMAIN SCORECARD
        ============================================================ */}
        <section
          id="omr-grader"
          className="rounded-3xl border-2 border-sky-200 bg-white p-5 sm:p-7 shadow-sm space-y-6 scroll-mt-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-sky-700">
                <ClipboardCheck className="w-3.5 h-3.5" />
                <span>HYBRID QR TOOL #3 • P27 OMR SCORE &amp; 4-DOMAIN REPORT</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mt-0.5">
                {lang === "th"
                  ? "📝 ตารางตรวจคำตอบ 20 ข้อ & สรุปคะแนนความพร้อม ป.1 (4 ด้าน)"
                  : "📝 20-Item OMR Answer Grader & 4-Domain Readiness Scorecard"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                {lang === "th"
                  ? "แตะกรอกคำตอบตามกระดาษฝนวงกลมหน้า 27 ของน้อง แล้วกดตรวจคะแนนเพื่อดูกราฟจุดแข็ง-จุดที่ควรทบทวนทันที!"
                  : "Tap your child's bubbled answers from Page 27 and grade instantly to see 4-domain strengths & review targets!"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleGradeExam}
                className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-extrabold cursor-pointer shadow-sm transition-colors ${
                  showGraded
                    ? "bg-slate-900 hover:bg-slate-800 text-white"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                <Award className="w-4 h-4" />
                <span>
                  {showGraded
                    ? lang === "th"
                      ? "ซ่อนเฉลย (โหมดสอบ)"
                      : "Hide Key (Exam Mode)"
                    : lang === "th"
                      ? `ตรวจคะแนน (${answeredCount}/20 ข้อ)`
                      : `Grade Exam (${answeredCount}/20)`}
                </span>
              </button>
              <button
                type="button"
                onClick={resetAllAnswers}
                className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 px-3.5 py-3 text-xs sm:text-sm font-bold text-slate-700 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{lang === "th" ? "ล้างคำตอบ" : "Reset"}</span>
              </button>
            </div>
          </div>

          {/* 4-Domain Readiness Diagnostic Summary (shown when graded or previewed) */}
          {showGraded && (
            <div className="space-y-4">
              <div className={`rounded-2xl border-2 p-4 sm:p-5 ${readinessBanner.style}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-lg sm:text-xl font-extrabold">
                      {lang === "th" ? readinessBanner.titleTh : readinessBanner.titleEn}
                    </div>
                    <p className="text-xs sm:text-sm opacity-90">
                      {lang === "th" ? readinessBanner.descTh : readinessBanner.descEn}
                    </p>
                  </div>
                  <div className="shrink-0 rounded-2xl bg-white/90 border border-current/20 px-5 py-3 text-center">
                    <div className="text-3xl font-extrabold text-[#0F172A]">
                      {totalCorrect} / 20
                    </div>
                    <div className="text-[11px] font-bold text-slate-600">
                      {Math.round((totalCorrect / 20) * 100)}%{" "}
                      {lang === "th" ? "ความพร้อม" : "Readiness"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {domainScores.map((ds) => {
                  const pct = Math.round((ds.correct / ds.total) * 100);
                  const needsReview = ds.correct < 4;
                  return (
                    <div
                      key={ds.key}
                      className="rounded-2xl border border-slate-200 bg-[#FFFDF7] p-4 space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-extrabold text-[#0F172A]">
                          {ds.emoji}{" "}
                          {lang === "th"
                            ? ds.nameTh.replace(/^ส่วนที่ \d+: /, "")
                            : ds.nameEn.replace(/^Section \d+: /, "")}
                        </span>
                        <span className="font-mono text-sm font-extrabold text-sky-800">
                          {ds.correct}/{ds.total}
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${ds.barClass}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="text-[11px] font-bold">
                        {needsReview ? (
                          <span className="text-rose-700">
                            {lang === "th"
                              ? `📌 แนะนำทบทวนหน้า ${ds.reviewPages}`
                              : `📌 Review pages ${ds.reviewPages}`}
                          </span>
                        ) : (
                          <span className="text-emerald-700">
                            {lang === "th"
                              ? "✅ ยอดเยี่ยม! พร้อมสอบด้านนี้แล้ว"
                              : "✅ Ready! Strong mastery"}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4-Column x 5-Row Interactive OMR Bubble Sheet */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {DOMAINS.map((d) => {
              const qs = MOCK_QUESTIONS.filter((q) => q.domain === d.key);
              return (
                <div
                  key={d.key}
                  className="rounded-2xl border border-slate-200 bg-[#FFFDF7] p-4 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/80">
                    <span className="text-xs font-extrabold text-[#0F172A]">
                      {d.emoji}{" "}
                      {lang === "th"
                        ? d.nameTh.replace(/^ส่วนที่ \d+: /, "")
                        : d.nameEn.replace(/^Section \d+: /, "")}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-500">
                      {lang === "th" ? d.rangeTh : d.rangeEn}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {qs.map((q) => {
                      const userChoice = answers[q.no];
                      const correctChoice = q.correctIndex;
                      return (
                        <div
                          key={q.no}
                          className="flex items-center justify-between gap-2 rounded-xl bg-white border border-slate-200/70 px-2.5 py-1.5"
                        >
                          <button
                            type="button"
                            onClick={() => goToQuestion(q.no - 1, true)}
                            className="text-xs font-extrabold text-sky-800 hover:underline cursor-pointer shrink-0 w-9 text-left"
                            title={lang === "th" ? "กดเพื่อฟังโจทย์ข้อนี้" : "Tap to hear question"}
                          >
                            #{q.no}
                          </button>

                          <div className="flex items-center gap-1.5">
                            {([0, 1, 2] as const).map((cIdx) => {
                              const picked = userChoice === cIdx;
                              const isRight = correctChoice === cIdx;
                              const label =
                                lang === "th"
                                  ? CHOICE_LABELS_TH[cIdx]
                                  : CHOICE_LABELS_EN[cIdx];

                              let bubbleStyle =
                                "border-slate-300 bg-white text-slate-700 hover:border-sky-500";
                              if (showGraded) {
                                if (isRight) {
                                  bubbleStyle =
                                    "border-emerald-600 bg-emerald-500 text-white font-extrabold";
                                } else if (picked && !isRight) {
                                  bubbleStyle =
                                    "border-rose-600 bg-rose-500 text-white font-extrabold";
                                }
                              } else if (picked) {
                                bubbleStyle =
                                  "border-sky-700 bg-sky-700 text-white font-extrabold";
                              }

                              return (
                                <button
                                  key={cIdx}
                                  type="button"
                                  onClick={() => selectAnswer(q.no, cIdx)}
                                  className={`w-7 h-7 rounded-full border-2 text-xs flex items-center justify-center cursor-pointer transition-all ${bubbleStyle}`}
                                >
                                  {label}
                                </button>
                              );
                            })}
                          </div>

                          <span className="w-5 text-center text-xs font-extrabold shrink-0">
                            {showGraded
                              ? userChoice === correctChoice
                                ? "✅"
                                : "❌"
                              : userChoice !== undefined
                                ? "•"
                                : ""}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FREEBIE 5-PAGE DOWNLOAD */}
        <section
          id="freebie"
          className="rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-white to-[#F0F9FF] p-6 sm:p-7 shadow-sm space-y-4 scroll-mt-24"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-extrabold text-amber-950">
                <Gift className="w-3.5 h-3.5 text-amber-700" />
                <span>FREE 5-PAGE LEAD MAGNET • โหลดฟรี 0 ฿ ไม่ต้องสมัครสมาชิก</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                {lang === "th"
                  ? "🎁 ดาวน์โหลดชุดทดลองฟรี 5 หน้า (ปก + ตาชั่งสมดุล P09 + นับบล็อก 3D P11 + Mock Exam คณิต 5 ข้อ P23)"
                  : "🎁 Download Free 5-Page Sample Pack (Cover + Balance Scale + 3D Cubes + Math Mock Exam)"}
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="/edu/sn01/EDU-SN01_Freebie_5Pages_TH.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-700 hover:bg-sky-800 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>โหลดฟรี 5 หน้า (ภาษาไทย)</span>
              </a>
              <a
                href="/edu/sn01/EDU-SN01_Freebie_5Pages_EN.pdf"
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
              {lang === "th"
                ? "👀 ส่องตัวอย่างข้างในจริงครบ 32 หน้า (คลิกขยายได้)"
                : "👀 Peek Inside the 32-Page Level 2 Workbook"}
            </h2>
            <span className="text-xs font-bold text-sky-800">
              4 Mockups • Visual QA 64/64 Pass
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((img, idx) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group rounded-2xl border-2 border-sky-200/80 bg-white overflow-hidden text-left shadow-xs hover:border-sky-500 transition-all cursor-pointer"
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

        {/* DUAL-EDITION PRICING */}
        <section id="order" className="space-y-5">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 border border-sky-300 px-3 py-1 text-xs font-extrabold text-sky-900">
              <Layers className="w-3.5 h-3.5" />
              <span>DUAL-EDITION LICENSE • ได้ครบ 4 ไฟล์ (TH/EN × สี/ขาวดำ)</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              {lang === "th"
                ? "สั่งซื้อเล่มเต็ม 32 หน้า (รับไฟล์ PDF ทันทีทาง LINE)"
                : "Get the Complete 32-Page Level 2 Exam Prep Kit"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border-2 border-sky-400 bg-white p-6 flex flex-col justify-between gap-5 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-extrabold text-sky-900">
                    <Home className="w-3.5 h-3.5" />
                    <span>HOME EDITION • ใช้ในครอบครัว</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    32 หน้า • 4 PDF
                  </span>
                </div>
                <div className="flex items-baseline gap-2.5">
                  <strong className="text-4xl font-extrabold text-sky-700">
                    129 ฿
                  </strong>
                  <span className="text-sm text-slate-400 line-through">199 ฿</span>
                  <span className="text-xs font-semibold text-slate-600">($5.99)</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {[
                    "ครบ 32 หน้าเต็ม: คณิต ป.1 (6 หน้า), เชาวน์-บล็อก 3D (6 หน้า), ภาษา (5 หน้า), วิทย์-รอบตัว (3 หน้า)",
                    "Mock Exam สนามสอบจำลอง 20 ข้อ + กระดาษฝนคำตอบ OMR + เฉลยละเอียดครบ 3 หน้า + ใบประกาศ",
                    "ได้ครบ 4 ไฟล์ PDF (ไทย/อังกฤษ × สีพาสเทล/ขาว-ดำประหยัดหมึก A4 & US Letter)",
                    "ใช้งานห้องสอบจำลองมีเสียงอ่านโจทย์ 20 ข้อ (/edu/sn01) ฟรีตลอดชีพ ไม่มีโฆษณา",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={getEduOrderLineUrl({ sku: "EDU-SN01", edition: "HOME", lang })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] px-5 py-3.5 text-base font-bold text-white shadow-sm transition-colors"
              >
                <FaLine className="w-5 h-5" />
                <span>สั่งซื้อ HOME EDITION (129 ฿) ทาง LINE</span>
              </a>
            </div>

            <div className="rounded-3xl border-2 border-amber-400 bg-white p-6 flex flex-col justify-between gap-5 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-950">
                    <School className="w-3.5 h-3.5" />
                    <span>CLASS EDITION • 1 ครู / 1 ห้องเรียน</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    Classroom License
                  </span>
                </div>
                <div className="flex items-baseline gap-2.5">
                  <strong className="text-4xl font-extrabold text-amber-700">
                    249 ฿
                  </strong>
                  <span className="text-sm text-slate-400 line-through">349 ฿</span>
                  <span className="text-xs font-semibold text-slate-600">($8.99)</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {[
                    "ลิขสิทธิ์ครู 1 ท่าน ปริ้นท์/ถ่ายเอกสารแจกนักเรียน อ.3 หรือติว ป.1 ได้ไม่จำกัด (30–40 คน/ห้อง)",
                    "มีไฟล์ขาว-ดำประหยัดหมึก 100% เส้นคมชัดถ่ายเอกสารแจกทั้งห้องไม่ดำปื้น",
                    "ได้ทั้งภาษาไทย + ภาษาอังกฤษ (เหมาะกับห้องเรียน EP / Bilingual / เนอสเซอรี)",
                    "เปิดเสียงอ่านโจทย์ 20 ข้อ & นาฬิกาจับเวลา 15 นาทีขึ้นจอทีวีหน้าห้องเรียนได้ทันที!",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={getEduOrderLineUrl({ sku: "EDU-SN01", edition: "CLASS", lang })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-700 hover:bg-sky-800 px-5 py-3.5 text-base font-bold text-white shadow-sm transition-colors"
              >
                <FaLine className="w-5 h-5 text-[#06C755]" />
                <span>สั่งซื้อ CLASS EDITION (249 ฿) ทาง LINE</span>
              </a>
            </div>
          </div>

          {/* Link back to Level 1 All-6 Universe */}
          <div className="rounded-2xl border border-amber-200 bg-[#FEF9EF] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-[#0F172A]">
                  อยากปูพื้นฐาน Level 1 (วัย 3–6 ปี) ให้แน่นครบทั้ง 6 ด้านด้วยไหม?
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  โปรเหมาจักรวาล Level 1 ครบ 6 เล่ม (192 หน้า + 6 เว็บแอป) เพียง 449 ฿ (ประหยัด 175 ฿)
                </p>
              </div>
            </div>
            <Link
              href="/edu#mega-bundle"
              className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 px-4 py-2.5 text-xs sm:text-sm font-extrabold text-slate-950 transition-colors"
            >
              <span>ดูแพ็กเหมา Level 1 (449 ฿)</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-sky-700" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
              {lang === "th" ? "คำถามที่พบบ่อย (FAQ)" : "Frequently Asked Questions"}
            </h2>
          </div>

          <div className="space-y-2.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.qTh}
                  className="rounded-2xl border border-sky-200/80 bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-sky-50/50 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#0F172A]">
                      {lang === "th" ? faq.qTh : faq.qEn}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-sky-700 shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {lang === "th" ? faq.aTh : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-sky-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-[#FFFDF7]">
              <span className="text-xs sm:text-sm font-bold text-[#0F172A]">
                {lightboxIndex + 1}/{GALLERY_IMAGES.length} —{" "}
                {lang === "th"
                  ? GALLERY_IMAGES[lightboxIndex].labelTh
                  : GALLERY_IMAGES[lightboxIndex].labelEn}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative bg-[#FEF9EF] flex items-center justify-center">
              <img
                src={GALLERY_IMAGES[lightboxIndex].src}
                alt={GALLERY_IMAGES[lightboxIndex].labelEn}
                className="max-h-[75vh] w-auto object-contain"
              />
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-slate-800 cursor-pointer"
                aria-label="Previous mockup"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-slate-800 cursor-pointer"
                aria-label="Next mockup"
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

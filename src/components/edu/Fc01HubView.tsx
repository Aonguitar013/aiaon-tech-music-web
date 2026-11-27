"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Volume2,
  VolumeX,
  RotateCw,
  Shuffle,
  Sparkles,
  Download,
  CheckCircle2,
  Home,
  School,
  ChevronLeft,
  ChevronRight,
  X,
  HelpCircle,
  ChevronDown,
  Printer,
  ArrowRight,
  Trophy,
  Gamepad2,
} from "lucide-react";
import { FaLine } from "react-icons/fa6";
import { playApplauseAndFanfare, playStarPop } from "@/lib/eduAudio";
import { playSoftTapChime } from "@/lib/eduPhonicsAudio";
import { type EduLang, getEduOrderLineUrl } from "@/lib/eduCatalog";

interface FlashcardEntry {
  code: string;
  group: "cats" | "habits";
  catNameTh: string;
  catNameEn: string;
  emoji: string;
  wordTh: string;
  wordEn: string;
  cue: string;
  affTh: string;
  affEn: string;
  colorClass: string;
}

const DECK: FlashcardEntry[] = [
  { code: "FC-01", group: "cats", catNameTh: "น้องข้าวต้ม", catNameEn: "Khao Tom", emoji: "👋", wordTh: "สวัสดี", wordEn: "Hello", cue: "เฮล-โล", affTh: "หนูทักทายด้วยรอยยิ้มอบอุ่น!", affEn: "I greet new friends with a warm smile!", colorClass: "border-sky-300 bg-sky-50 text-sky-950" },
  { code: "FC-03", group: "cats", catNameTh: "น้องข้าวต้ม", catNameEn: "Khao Tom", emoji: "🎉", wordTh: "ไชโย!", wordEn: "Hooray", cue: "ฮู-เร่", affTh: "ทุกความพยายามน่าภูมิใจเสมอ!", affEn: "Every effort I make is worth celebrating!", colorClass: "border-sky-300 bg-sky-50 text-sky-950" },
  { code: "FC-06", group: "cats", catNameTh: "น้องข้าวต้ม", catNameEn: "Khao Tom", emoji: "🎵", wordTh: "จังหวะดนตรี", wordEn: "Rhythm", cue: "ริ-ธึม", affTh: "หนูคุมจังหวะหัวใจได้อย่างสนุก!", affEn: "I move and steady my energy like music!", colorClass: "border-sky-300 bg-sky-50 text-sky-950" },
  { code: "FC-07", group: "cats", catNameTh: "น้องชาบู", catNameEn: "Shabu", emoji: "🎀", wordTh: "เพื่อนรัก", wordEn: "Friend", cue: "เฟรนด์", affTh: "หนูเป็นเพื่อนใจดีที่ชอบแบ่งปัน!", affEn: "I am a kind friend who loves to share!", colorClass: "border-pink-300 bg-pink-50 text-pink-950" },
  { code: "FC-09", group: "cats", catNameTh: "น้องชาบู", catNameEn: "Shabu", emoji: "✨", wordTh: "สะอาดวิบวับ", wordEn: "Sparkle", cue: "สปาร์ก-เคิล", affTh: "มือสะอาดฟันสวย ภูมิใจจังเลย!", affEn: "Clean hands and sparkling teeth make me proud!", colorClass: "border-pink-300 bg-pink-50 text-pink-950" },
  { code: "FC-13", group: "cats", catNameTh: "น้องแซลมอน", catNameEn: "Salmon", emoji: "🔎", wordTh: "ใจเย็น", wordEn: "Calm", cue: "คาล์ม", affTh: "ใจที่สงบช่วยให้เห็นทางออกชัด!", affEn: "A calm heart helps me see clear solutions!", colorClass: "border-amber-300 bg-amber-50 text-amber-950" },
  { code: "FC-17", group: "cats", catNameTh: "น้องแซลมอน", catNameEn: "Salmon", emoji: "🧠", wordTh: "มีสมาธิ", wordEn: "Focus", cue: "โฟ-กัส", affTh: "หนูจดจ่อทีละอย่างได้อย่างยอดเยี่ยม!", affEn: "I focus on one fun task at a time!", colorClass: "border-amber-300 bg-amber-50 text-amber-950" },
  { code: "FC-19", group: "cats", catNameTh: "น้องบ๊อบ", catNameEn: "Bob", emoji: "🗺️", wordTh: "กล้าหาญ", wordEn: "Brave", cue: "เบรฟ", affTh: "หนูกล้าลองก้าวแรกแม้จะตื่นเต้น!", affEn: "I am brave enough to take the first step!", colorClass: "border-teal-300 bg-teal-50 text-teal-950" },
  { code: "FC-24", group: "cats", catNameTh: "น้องบ๊อบ", catNameEn: "Bob", emoji: "🧭", wordTh: "ผจญภัย", wordEn: "Adventure", cue: "แอด-เวน-เจอร์", affTh: "ทุกวันคือการผจญภัยแสนสนุก!", affEn: "Every new day is an exciting adventure!", colorClass: "border-teal-300 bg-teal-50 text-teal-950" },
  { code: "FC-25", group: "cats", catNameTh: "แม่ใหญ่", catNameEn: "Mama Mami", emoji: "💖", wordTh: "อบอุ่นใจ", wordEn: "Warmth", cue: "วอร์มธ", affTh: "หนูเป็นที่รักและปลอดภัยเสมอ!", affEn: "I am loved, safe, and cherished every day!", colorClass: "border-rose-300 bg-rose-50 text-rose-950" },
  { code: "FC-28", group: "cats", catNameTh: "แม่ใหญ่", catNameEn: "Mama Mami", emoji: "🙏", wordTh: "ขอบคุณ", wordEn: "Thank You", cue: "แธงก์ ยู", affTh: "คำว่าขอบคุณทำให้ทุกหัวใจยิ้มได้!", affEn: "Saying thank you makes every heart smile!", colorClass: "border-rose-300 bg-rose-50 text-rose-950" },
  { code: "FC-31", group: "cats", catNameTh: "น้องดำ", catNameEn: "Midnight", emoji: "🎨", wordTh: "อ่อนโยน", wordEn: "Gentle", cue: "เจน-เทิล", affTh: "ความอ่อนโยนคือพลังวิเศษของหนู!", affEn: "My gentle heart is my superpower!", colorClass: "border-indigo-300 bg-indigo-50 text-indigo-950" },
  { code: "FC-35", group: "cats", catNameTh: "น้องดำ", catNameEn: "Midnight", emoji: "🌈", wordTh: "หายใจ 4-4-4", wordEn: "Breathe", cue: "บรีธ", affTh: "หายใจช้าๆ ก้อนเมฆสีเทาก็จะหายไป!", affEn: "Inhale slowly, exhale softly — clouds melt away!", colorClass: "border-indigo-300 bg-indigo-50 text-indigo-950" },
  { code: "FC-37", group: "habits", catNameTh: "พลังใจ & กิจวัตร", catNameEn: "SEL & Habits", emoji: "😊", wordTh: "มีความสุข", wordEn: "Happy", cue: "แฮป-ปี้", affTh: "วันนี้หัวใจหนูยิ้มกว้างเหมือนพระอาทิตย์!", affEn: "My heart shines bright like the sun today!", colorClass: "border-amber-300 bg-amber-50 text-amber-950" },
  { code: "FC-39", group: "habits", catNameTh: "พลังใจ & กิจวัตร", catNameEn: "SEL & Habits", emoji: "🤝", wordTh: "แบ่งปัน", wordEn: "Share", cue: "แชร์", affTh: "การแบ่งปันทำให้ความสุขคูณสอง!", affEn: "Sharing doubles the joy for everyone!", colorClass: "border-rose-300 bg-rose-50 text-rose-950" },
  { code: "FC-41", group: "habits", catNameTh: "พลังใจ & กิจวัตร", catNameEn: "SEL & Habits", emoji: "🪥", wordTh: "แปรงฟัน", wordEn: "Brush Teeth", cue: "บรัช ทีธ", affTh: "แปรงฟัน 2 นาที ฟันแข็งแรงสะอาดใส!", affEn: "Two minutes of brushing keeps teeth strong!", colorClass: "border-pink-300 bg-pink-50 text-pink-950" },
  { code: "FC-42", group: "habits", catNameTh: "พลังใจ & กิจวัตร", catNameEn: "SEL & Habits", emoji: "🧼", wordTh: "ล้างมือ", wordEn: "Wash Hands", cue: "วอช แฮนด์ส", affTh: "ล้างมือฟอกสบู่ 20 วิ ไล่เชื้อโรคไป!", affEn: "20 seconds of soapy bubbles wash germs away!", colorClass: "border-teal-300 bg-teal-50 text-teal-950" },
  { code: "FC-43", group: "habits", catNameTh: "พลังใจ & กิจวัตร", catNameEn: "SEL & Habits", emoji: "🧸", wordTh: "เก็บของเล่น", wordEn: "Tidy Up", cue: "ไท-ดี้ อัพ", affTh: "เล่นเสร็จแล้วหนูเก็บเข้าที่ได้เอง!", affEn: "I can tidy up my toys all by myself!", colorClass: "border-amber-300 bg-amber-50 text-amber-950" },
  { code: "FC-45", group: "habits", catNameTh: "พลังใจ & กิจวัตร", catNameEn: "SEL & Habits", emoji: "📖", wordTh: "อ่านนิทาน", wordEn: "Read a Book", cue: "รีด อะ บุ๊ก", affTh: "นิทานหนึ่งเล่มพาหนูท่องโลกกว้าง!", affEn: "One cozy story opens a whole new world!", colorClass: "border-indigo-300 bg-indigo-50 text-indigo-950" },
  { code: "FC-48", group: "habits", catNameTh: "พลังใจ & กิจวัตร", catNameEn: "SEL & Habits", emoji: "🌙", wordTh: "ฝันดีนะ", wordEn: "Good Night", cue: "กู๊ด ไนท์", affTh: "หลับตาพักผ่อน พรุ่งนี้ตื่นมาสดใส!", affEn: "Rest peacefully for a bright tomorrow!", colorClass: "border-indigo-300 bg-indigo-50 text-indigo-950" },
];

const GALLERY_IMAGES = [
  { src: "/edu/fc01/mockup-01-cover.webp", labelTh: "ปกหน้า & จุดเด่นชุดแฟลชการ์ด 48 การ์ด (16 หน้า)", labelEn: "Front Cover & 48-Card Deck Highlights" },
  { src: "/edu/fc01/mockup-02-chapters.webp", labelTh: "ครบ 36 การ์ดแก๊ง 6 แมว + 12 การ์ดโบนัส + เช็กลิสต์", labelEn: "36 Cat Cards + 12 Bonus Cards + Checklist" },
  { src: "/edu/fc01/mockup-03-color-bw.webp", labelTh: "ครบทั้งโหมดสีสดใส & ขาว-ดำประหยัดหมึก", labelEn: "Full Color + Ink-Saving B&W Edition" },
  { src: "/edu/fc01/mockup-04-editions.webp", labelTh: "เทียบสิทธิ์ Home (59฿) vs Class Edition (119฿)", labelEn: "Home (59 THB) vs Class Edition (119 THB)" },
];

const FAQS = [
  {
    qTh: "ชุดแฟลชการ์ด 48 ใบ ปริ้นท์แล้วตัดยากไหม?",
    qEn: "Are the 48 flashcards easy to print and cut out?",
    aTh: "ตัดง่ายมากครับ! เราจัดวาง 4 การ์ดจัมโบ้ต่อ 1 หน้า A4 พร้อมกรอบเส้นประชัดเจน ปริ้นท์ลงกระดาษ 160–200 แกรมแล้วเคลือบร้อนตัดมุมมน คล้องห่วงพกไปเล่นในรถหรือร้านอาหารได้เลยครับ",
    aEn: "Super easy! Every page holds 4 jumbo cards inside clean dashed cut lines — print on 160–200 gsm cardstock, laminate, trim, and clip on a ring!",
  },
  {
    qTh: "โหมดขาว-ดำ (BW) เอาไปทำอะไรได้บ้าง?",
    qEn: "How can we use the included B&W ink-saving PDF?",
    aTh: "นอกจากประหยัดหมึกสำหรับคุณครูถ่ายเอกสารแจกนักเรียนทั้งห้องแล้ว ยังให้เด็กๆ ระบายสีการ์ดของตัวเองก่อนตัดและเคลือบแข็ง ช่วยให้จำคำศัพท์ได้แม่นขึ้น 2 เท่าครับ!",
    aEn: "Teachers can photocopy unlimited sets for class, and kids can color their own cards before cutting — doubling vocabulary retention!",
  },
];

export function Fc01HubView() {
  const [lang, setLang] = useState<EduLang>("th");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filterGroup, setFilterGroup] = useState<"all" | "cats" | "habits">("all");
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Mini Audio Quiz State
  const [quizTargetIdx, setQuizTargetIdx] = useState(0);
  const [quizOptions, setQuizOptions] = useState<number[]>([0, 1, 2]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<"idle" | "correct" | "wrong">("idle");

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const toastRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visibleDeck =
    filterGroup === "all" ? DECK : DECK.filter((c) => c.group === filterGroup);
  const currentCard = visibleDeck[cardIdx % visibleDeck.length] ?? DECK[0];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    if (toastRef.current) clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToastMsg(null), 2800);
  };

  const speakText = (text: string, speakLang: "th-TH" | "en-US") => {
    if (!soundEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = speakLang;
      u.rate = 0.88;
      window.speechSynthesis.speak(u);
    } catch {
      playSoftTapChime(523);
    }
  };

  const setupNewQuizRound = (avoidIdx?: number) => {
    const pool = DECK.map((_, i) => i).filter((i) => i !== avoidIdx);
    const target = pool[Math.floor(Math.random() * pool.length)] ?? 0;
    const distractors = DECK.map((_, i) => i)
      .filter((i) => i !== target)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    const opts = [target, ...distractors].sort(() => Math.random() - 0.5);
    setQuizTargetIdx(target);
    setQuizOptions(opts);
    setQuizFeedback("idle");
  };

  useEffect(() => {
    setupNewQuizRound();
  }, []);

  const handleQuizAnswer = (chosenIdx: number) => {
    if (chosenIdx === quizTargetIdx) {
      setQuizFeedback("correct");
      setQuizScore((s) => s + 1);
      if (soundEnabled) playStarPop();
      showToast(lang === "th" ? "🎉 เก่งมาก! ตอบถูกแล้ว +1 ดาว!" : "🎉 Awesome! Correct answer +1 star!");
      setTimeout(() => setupNewQuizRound(quizTargetIdx), 1100);
    } else {
      setQuizFeedback("wrong");
      if (soundEnabled) playSoftTapChime(280);
    }
  };

  const quizTarget = DECK[quizTargetIdx] ?? DECK[0];

  return (
    <div className="w-full overflow-x-hidden bg-[#FFFDF7] text-[#1E293B] -mt-4 md:-mt-8 pt-6 md:pt-10 pb-16 sm:pb-20 border-b border-teal-200/80">
      {toastMsg && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-slate-900 text-white px-5 py-3 text-sm font-bold shadow-xl border border-teal-400/50">
          {toastMsg}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* TOP NAV */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/edu"
            className="inline-flex items-center gap-1.5 rounded-xl border border-teal-200 bg-white hover:bg-teal-50 px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-800 shadow-xs transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-teal-600" />
            <span>{lang === "th" ? "กลับคลังสื่อ /edu (15 เล่ม Live)" : "Back to /edu Hub (15 Live)"}</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundEnabled((s) => !s)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-teal-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              <span>{soundEnabled ? (lang === "th" ? "เสียงเปิด" : "Sound On") : (lang === "th" ? "ปิดเสียง" : "Muted")}</span>
            </button>
            <div className="inline-flex rounded-xl border border-teal-200 bg-white p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLang("th")}
                className={`rounded-lg px-3 py-1 cursor-pointer ${lang === "th" ? "bg-teal-600 text-white" : "text-slate-600"}`}
              >
                🇹🇭 ไทย
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-lg px-3 py-1 cursor-pointer ${lang === "en" ? "bg-teal-600 text-white" : "text-slate-600"}`}
              >
                🇬🇧 EN
              </button>
            </div>
          </div>
        </div>

        {/* HERO */}
        <section className="rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-[#F0FDFA] via-white to-[#FEF9EF] p-6 sm:p-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-teal-600 px-3 py-1 text-xs font-extrabold text-white">
                  NEW • EDU-FC01
                </span>
                <span className="rounded-full bg-white border border-teal-300 px-3 py-1 text-xs font-bold text-teal-900">
                  {lang === "th" ? "48 การ์ดตัดเล่น (16 หน้า) • เริ่ม 59 ฿!" : "48 Jumbo Cut-Out Cards • From $3.49!"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1E293B] leading-tight">
                {lang === "th" ? (
                  <>
                    ชุดแฟลชการ์ดคำศัพท์ &amp; พลังใจ{" "}
                    <span className="text-teal-600">2 ภาษาแก๊ง 6 แมว</span>
                  </>
                ) : (
                  <>
                    The 6 Cats Bilingual Flashcards{" "}
                    <span className="text-teal-600">&amp; Affirmation Deck (48 Cards)</span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {lang === "th"
                  ? "ครบ 48 การ์ดจัมโบ้ (36 การ์ดแก๊ง 6 แมว + 12 การ์ดโบนัสอารมณ์/กิจวัตร) ตัดตามรอยประเคลือบใสเล่นซ้ำได้ตลอดปี พร้อมหน้าเว็บกดฟังเสียง TH/EN และเกมควิซฟรี!"
                  : "48 jumbo cut-out cards (36 character actions + 12 bonus feelings & habits) with dashed cut lines, bilingual phonics cues, and this ad-free audio deck & quiz!"}
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="#audio-deck"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-600 hover:bg-teal-700 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{lang === "th" ? "เปิดการ์ดกดฟังเสียงเลย!" : "Open Audio Flashcard Deck!"}</span>
                </a>
                <a
                  href={lang === "th" ? "/edu/fc01/EDU-FC01_Freebie_5Pages_TH.pdf" : "/edu/fc01/EDU-FC01_Freebie_5Pages_EN.pdf"}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-emerald-400 bg-emerald-50 hover:bg-emerald-100 px-5 py-3 text-sm font-bold text-emerald-900 transition-colors"
                >
                  <Download className="w-4 h-4 text-emerald-700" />
                  <span>{lang === "th" ? "โหลดฟรี 12 การ์ด (5 หน้า 0฿)" : "Download 12 Free Cards (PDF)"}</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-5">
              <button
                type="button"
                onClick={() => setLightboxIndex(0)}
                className="block w-full rounded-2xl overflow-hidden border-2 border-teal-300 shadow-lg bg-white hover:scale-[1.01] transition-transform cursor-pointer"
              >
                <img
                  src="/edu/fc01/mockup-01-cover.webp"
                  alt="EDU-FC01 Bilingual Flashcards Cover"
                  className="w-full h-auto object-cover aspect-square"
                />
              </button>
            </div>
          </div>
        </section>

        {/* INTERACTIVE AUDIO FLASHCARD DECK */}
        <section
          id="audio-deck"
          className="rounded-3xl border-2 border-teal-300 bg-white p-5 sm:p-7 shadow-lg space-y-5 scroll-mt-24"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-teal-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>HYBRID QR INTERACTIVE DECK • 0฿ AD-FREE</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B] mt-0.5">
                {lang === "th" ? "🃏 การ์ดพลิกได้ + กดฟังเสียงอ่าน TH / EN" : "🃏 Interactive Flip Cards + TH / EN Voice"}
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5 text-xs font-bold">
              {[
                { id: "all", th: "ทั้งหมด", en: "All" },
                { id: "cats", th: "แก๊ง 6 แมว", en: "6 Cats" },
                { id: "habits", th: "อารมณ์ & กิจวัตร", en: "Habits" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setFilterGroup(tab.id as "all" | "cats" | "habits");
                    setCardIdx(0);
                    setFlipped(false);
                  }}
                  className={`rounded-xl px-3 py-1.5 border cursor-pointer ${
                    filterGroup === tab.id
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  {lang === "th" ? tab.th : tab.en}
                </button>
              ))}
            </div>
          </div>

          {/* Big Flip Card */}
          <div className="max-w-md mx-auto space-y-4">
            <div
              onClick={() => {
                setFlipped((f) => !f);
                if (soundEnabled) playSoftTapChime(523);
              }}
              className={`rounded-3xl border-[3px] p-6 sm:p-8 text-center shadow-md cursor-pointer transition-all hover:scale-[1.01] select-none space-y-4 ${currentCard.colorClass}`}
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold opacity-80">
                <span>{currentCard.code}</span>
                <span>{lang === "th" ? currentCard.catNameTh : currentCard.catNameEn}</span>
              </div>

              {!flipped ? (
                <div className="py-4 space-y-3">
                  <div className="text-7xl">{currentCard.emoji}</div>
                  <div className="text-3xl sm:text-4xl font-extrabold">
                    {lang === "th" ? currentCard.wordTh : currentCard.wordEn}
                  </div>
                  <div className="text-base font-bold opacity-80">
                    {lang === "th" ? `${currentCard.wordEn} (${currentCard.cue})` : `${currentCard.wordTh} (${currentCard.cue})`}
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-slate-700">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{lang === "th" ? "แตะการ์ดเพื่อดูประโยคพลังใจ!" : "Tap card to reveal Gentle Affirmation!"}</span>
                  </div>
                </div>
              ) : (
                <div className="py-6 space-y-3">
                  <div className="text-4xl">💖</div>
                  <div className="text-lg sm:text-xl font-extrabold leading-relaxed">
                    “{lang === "th" ? currentCard.affTh : currentCard.affEn}”
                  </div>
                  <div className="text-xs font-bold opacity-75">
                    ({lang === "th" ? currentCard.affEn : currentCard.affTh})
                  </div>
                </div>
              )}
            </div>

            {/* Voice & Navigation Controls */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => speakText(currentCard.wordTh, "th-TH")}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 px-4 py-2.5 text-xs sm:text-sm font-extrabold text-slate-950 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>🇹🇭 ฟังเสียงไทย</span>
              </button>
              <button
                type="button"
                onClick={() => speakText(currentCard.wordEn, "en-US")}
                className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 px-4 py-2.5 text-xs sm:text-sm font-extrabold text-white cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>🇬🇧 Speak EN</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  setCardIdx((i) => (i - 1 + visibleDeck.length) % visibleDeck.length);
                  setFlipped(false);
                }}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-bold cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === "th" ? "ก่อนหน้า" : "Prev"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCardIdx(Math.floor(Math.random() * visibleDeck.length));
                  setFlipped(false);
                  if (soundEnabled) playSoftTapChime(659);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50 hover:bg-teal-100 px-3.5 py-2 text-xs font-bold text-teal-900 cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>{lang === "th" ? "สุ่มการ์ด" : "Shuffle"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCardIdx((i) => (i + 1) % visibleDeck.length);
                  setFlipped(false);
                }}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-bold cursor-pointer"
              >
                <span>{lang === "th" ? "ถัดไป" : "Next"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* MINI SOUND QUIZ */}
        <section className="rounded-3xl border border-amber-200 bg-[#FEF9EF] p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-amber-700" />
              <h2 className="text-lg sm:text-xl font-extrabold text-[#1E293B]">
                {lang === "th" ? "🎯 เกมควิซฟังเสียงทายคำศัพท์!" : "🎯 Listen & Match Vocabulary Quiz!"}
              </h2>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold text-slate-950">
              <Trophy className="w-3.5 h-3.5" />
              <span>{lang === "th" ? `คะแนน: ${quizScore} ดาว` : `Score: ${quizScore} Stars`}</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => speakText(quizTarget.wordEn, "en-US")}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 hover:bg-slate-800 px-5 py-3 text-sm font-bold text-white cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>{lang === "th" ? `กดฟังเสียงคำศัพท์ ("${quizTarget.wordEn}")` : `Play Word Audio ("${quizTarget.wordEn}")`}</span>
            </button>
            {quizFeedback === "wrong" && (
              <span className="text-xs font-bold text-rose-700">
                {lang === "th" ? "ลองฟังใหม่อีกครั้งนะ หนูทำได้!" : "Try one more time — you got this!"}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {quizOptions.map((idx) => {
              const opt = DECK[idx];
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => handleQuizAnswer(idx)}
                  className="rounded-2xl border-2 border-amber-200 bg-white hover:border-teal-400 p-4 text-center space-y-1.5 cursor-pointer transition-all shadow-xs"
                >
                  <div className="text-4xl">{opt.emoji}</div>
                  <div className="text-base font-extrabold text-[#1E293B]">{opt.wordTh}</div>
                  <div className="text-xs font-semibold text-slate-500">{opt.wordEn}</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* GALLERY */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">
            {lang === "th" ? "🖼️ ตัวอย่างการ์ดจริงภายในชุด (48 การ์ด)" : "🖼️ Look Inside All 48 Cards"}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group rounded-2xl border-2 border-teal-200 bg-white overflow-hidden shadow-sm hover:border-teal-400 transition-all text-left cursor-pointer"
              >
                <div className="aspect-square overflow-hidden bg-[#F0FDFA]">
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

        {/* PRICING */}
        <section className="rounded-3xl border-2 border-teal-300 bg-gradient-to-br from-[#F0FDFA] to-white p-6 sm:p-8 shadow-md space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
              {lang === "th" ? "สั่งซื้อชุดแฟลชการ์ดครบ 48 ใบ (รับไฟล์ PDF ทันที)" : "Get the Complete 48-Card Printable PDF Deck"}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === "th"
                ? "ได้ครบ 4 ไฟล์ PDF (TH/EN × สี/ขาวดำประหยัดหมึก) + เช็กลิสต์ 48 คำ + เว็บการ์ดเสียงฟรีตลอดชีพ"
                : "Includes all 4 PDFs (TH/EN × Color & Ink-Saving B&W) + 48-Word Checklist + Ad-Free Audio Deck!"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl border-2 border-teal-400 bg-white p-6 flex flex-col justify-between gap-5 shadow-sm">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1 text-xs font-extrabold text-teal-950">
                  <Home className="w-3.5 h-3.5" />
                  <span>HOME EDITION • สิทธิ์ครอบครัว</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-teal-700">59 ฿</span>
                  <span className="text-sm font-semibold text-slate-500">($3.49)</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {[
                    lang === "th" ? "ครบ 48 การ์ดจัมโบ้ (16 หน้าเต็ม 4 การ์ด/หน้า)" : "Complete 48 jumbo cards (16 pages, 4/page)",
                    lang === "th" ? "ครบ 4 ไฟล์ PDF (TH/EN × สี/ขาวดำ)" : "All 4 PDFs (TH/EN × Color & B&W)",
                    lang === "th" ? "ปริ้นท์เคลือบแข็งเล่นซ้ำในบ้านได้ไม่อั้น" : "Unlimited household printing & laminating",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={getEduOrderLineUrl({ sku: "EDU-FC01", edition: "HOME", lang })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] px-5 py-3.5 text-sm sm:text-base font-bold text-white shadow-sm"
              >
                <FaLine className="w-5 h-5" />
                <span>{lang === "th" ? "สั่งซื้อ Home Edition (59 ฿) ทาง LINE" : "Order Home Edition ($3.49) via LINE"}</span>
              </a>
            </div>

            <div className="rounded-2xl border-2 border-sky-400 bg-white p-6 flex flex-col justify-between gap-5 shadow-sm">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-extrabold text-sky-950">
                  <School className="w-3.5 h-3.5" />
                  <span>CLASS EDITION • สิทธิ์คุณครู/ห้องเรียน</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-sky-700">119 ฿</span>
                  <span className="text-sm font-semibold text-slate-500">($6.99)</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {[
                    lang === "th" ? "สิทธิ์ปริ้นท์แจกเด็กในห้องเรียนได้ไม่อั้น" : "Single-teacher unlimited classroom printing",
                    lang === "th" ? "ครบ 4 ไฟล์ PDF + เช็กลิสต์คำศัพท์ 48 คำ" : "All 4 PDFs + 48-Word Classroom Checklist",
                    lang === "th" ? "เปิดการ์ดเสียง & เกมควิซหน้านี้สอนหน้าห้องฟรี" : "Project audio deck & quiz in class anytime",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={getEduOrderLineUrl({ sku: "EDU-FC01", edition: "CLASS", lang })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-700 hover:bg-sky-800 px-5 py-3.5 text-sm sm:text-base font-bold text-white shadow-sm"
              >
                <FaLine className="w-5 h-5" />
                <span>{lang === "th" ? "สั่งซื้อ Class Edition (119 ฿) ทาง LINE" : "Order Class Edition ($6.99) via LINE"}</span>
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Printer className="w-6 h-6 text-emerald-700 shrink-0" />
              <div>
                <div className="text-sm font-extrabold text-emerald-950">
                  {lang === "th" ? "🎁 ดาวน์โหลดชุดทดลองฟรี 5 หน้า (12 การ์ดตัดเล่น!)" : "🎁 Try 12 Free Cut-Out Cards (5 Pages) Before Buying!"}
                </div>
                <div className="text-xs text-emerald-800">
                  {lang === "th" ? "ฟรี 0 ฿ ไม่ต้องสมัครสมาชิก โหลดไปลองปริ้นท์ตัดเล่นได้เลย" : "100% free instant PDF download — zero signup required."}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <a href="/edu/fc01/EDU-FC01_Freebie_5Pages_TH.pdf" download className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-xs font-bold text-white">
                <Download className="w-3.5 h-3.5" />
                <span>PDF ไทย (12 การ์ด)</span>
              </a>
              <a href="/edu/fc01/EDU-FC01_Freebie_5Pages_EN.pdf" download className="inline-flex items-center gap-1.5 rounded-xl bg-white hover:bg-emerald-100 border border-emerald-300 px-4 py-2 text-xs font-bold text-emerald-900">
                <Download className="w-3.5 h-3.5" />
                <span>PDF EN (12 Cards)</span>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-[#1E293B] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-teal-600" />
            <span>{lang === "th" ? "คำถามที่พบบ่อย (FAQ)" : "Frequently Asked Questions"}</span>
          </h2>
          <div className="space-y-2.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.qTh} className="rounded-2xl border border-teal-200 bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left text-sm font-bold text-[#1E293B] cursor-pointer hover:bg-[#F0FDFA]"
                  >
                    <span>{lang === "th" ? faq.qTh : faq.qEn}</span>
                    <ChevronDown className={`w-4 h-4 text-teal-600 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-teal-100 pt-3">
                      {lang === "th" ? faq.aTh : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <div className="text-center pt-2">
          <Link
            href="/edu"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-teal-300 bg-white hover:bg-teal-50 px-6 py-3 text-sm font-extrabold text-slate-900 shadow-xs"
          >
            <span>{lang === "th" ? "ดูคลังสื่อ AiAon Edu-Verse ครบทั้ง 15 เล่ม Live" : "Explore All 15 Live AiAon Edu-Verse Kits"}</span>
            <ArrowRight className="w-4 h-4 text-teal-600" />
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
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-teal-300"
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
              className="w-full h-auto max-h-[75vh] object-contain bg-[#F0FDFA]"
            />
            <div className="p-4 flex items-center justify-between gap-3 bg-white border-t border-teal-100">
              <button
                type="button"
                onClick={() => setLightboxIndex((lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)}
                className="rounded-xl border border-slate-200 p-2 hover:bg-slate-50 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs sm:text-sm font-bold text-slate-800 text-center">
                {lang === "th" ? GALLERY_IMAGES[lightboxIndex].labelTh : GALLERY_IMAGES[lightboxIndex].labelEn}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length)}
                className="rounded-xl border border-slate-200 p-2 hover:bg-slate-50 cursor-pointer"
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

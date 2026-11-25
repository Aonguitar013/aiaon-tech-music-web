"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
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
  Compass,
  BookOpen,
  Layers,
  Gift,
  Languages,
} from "lucide-react";
import { FaLine } from "react-icons/fa6";
import { playApplauseAndFanfare, playStarPop } from "@/lib/eduAudio";
import {
  speakCvcBlend,
  speakPhonicsCard,
  speakVocabWord,
  stopPhonicsSpeech,
} from "@/lib/eduPhonicsAudio";
import { type EduLang, getEduOrderLineUrl } from "@/lib/eduCatalog";

type PhonicsGroup = "all" | "ag" | "hn" | "ou" | "vz" | "vowels";
type VocabWorldId =
  | "animals"
  | "food"
  | "colors"
  | "body"
  | "nature"
  | "home";

interface PhonicsEntry {
  letter: string;
  pair: string;
  emoji: string;
  word: string;
  spokenPhoneme: string;
  ipa: string;
  thaiSound: string;
  thaiMeaning: string;
  group: "ag" | "hn" | "ou" | "vz";
  isVowel?: boolean;
  pageRef: string;
}

const PHONICS_26: PhonicsEntry[] = [
  { letter: "A", pair: "Aa", emoji: "🍎", word: "Apple", spokenPhoneme: "ah", ipa: "/æ/", thaiSound: "แอะ", thaiMeaning: "แอปเปิล", group: "ag", isVowel: true, pageRef: "P03" },
  { letter: "B", pair: "Bb", emoji: "⚽", word: "Ball", spokenPhoneme: "buh", ipa: "/b/", thaiSound: "เบอะ", thaiMeaning: "ลูกบอล", group: "ag", pageRef: "P03" },
  { letter: "C", pair: "Cc", emoji: "🐱", word: "Cat", spokenPhoneme: "kuh", ipa: "/k/", thaiSound: "เคอะ", thaiMeaning: "แมว", group: "ag", pageRef: "P03" },
  { letter: "D", pair: "Dd", emoji: "🐶", word: "Dog", spokenPhoneme: "duh", ipa: "/d/", thaiSound: "เดอะ", thaiMeaning: "สุนัข", group: "ag", pageRef: "P03" },
  { letter: "E", pair: "Ee", emoji: "🥚", word: "Egg", spokenPhoneme: "eh", ipa: "/e/", thaiSound: "เอะ", thaiMeaning: "ไข่ไก่", group: "ag", isVowel: true, pageRef: "P03" },
  { letter: "F", pair: "Ff", emoji: "🐟", word: "Fish", spokenPhoneme: "fff", ipa: "/f/", thaiSound: "เฟอะ", thaiMeaning: "ปลา", group: "ag", pageRef: "P03" },
  { letter: "G", pair: "Gg", emoji: "🐐", word: "Goat", spokenPhoneme: "guh", ipa: "/g/", thaiSound: "เกอะ", thaiMeaning: "แพะ", group: "ag", pageRef: "P03" },
  { letter: "H", pair: "Hh", emoji: "👒", word: "Hat", spokenPhoneme: "huh", ipa: "/h/", thaiSound: "เฮอะ", thaiMeaning: "หมวก", group: "hn", pageRef: "P04" },
  { letter: "I", pair: "Ii", emoji: "🧊", word: "Igloo", spokenPhoneme: "ih", ipa: "/ɪ/", thaiSound: "อิ", thaiMeaning: "บ้านน้ำแข็ง", group: "hn", isVowel: true, pageRef: "P04" },
  { letter: "J", pair: "Jj", emoji: "🍓", word: "Jam", spokenPhoneme: "juh", ipa: "/dʒ/", thaiSound: "เจอะ", thaiMeaning: "แยมผลไม้", group: "hn", pageRef: "P04" },
  { letter: "K", pair: "Kk", emoji: "🪁", word: "Kite", spokenPhoneme: "kuh", ipa: "/k/", thaiSound: "เคอะ", thaiMeaning: "ว่าว", group: "hn", pageRef: "P04" },
  { letter: "L", pair: "Ll", emoji: "🦁", word: "Lion", spokenPhoneme: "lll", ipa: "/l/", thaiSound: "เลอะ", thaiMeaning: "สิงโต", group: "hn", pageRef: "P04" },
  { letter: "M", pair: "Mm", emoji: "🌙", word: "Moon", spokenPhoneme: "mmm", ipa: "/m/", thaiSound: "เมอะ", thaiMeaning: "ดวงจันทร์", group: "hn", pageRef: "P04" },
  { letter: "N", pair: "Nn", emoji: "🪹", word: "Nest", spokenPhoneme: "nnn", ipa: "/n/", thaiSound: "เนอะ", thaiMeaning: "รังนก", group: "hn", pageRef: "P04" },
  { letter: "O", pair: "Oo", emoji: "🐙", word: "Octopus", spokenPhoneme: "aw", ipa: "/ɒ/", thaiSound: "เอาะ", thaiMeaning: "ปลาหมึกยักษ์", group: "ou", isVowel: true, pageRef: "P05" },
  { letter: "P", pair: "Pp", emoji: "🐷", word: "Pig", spokenPhoneme: "puh", ipa: "/p/", thaiSound: "เพอะ", thaiMeaning: "หมู", group: "ou", pageRef: "P05" },
  { letter: "Q", pair: "Qq", emoji: "👑", word: "Queen", spokenPhoneme: "kwuh", ipa: "/kw/", thaiSound: "เควอะ", thaiMeaning: "ราชินี", group: "ou", pageRef: "P05" },
  { letter: "R", pair: "Rr", emoji: "🌧️", word: "Rain", spokenPhoneme: "rrr", ipa: "/r/", thaiSound: "เรอะ", thaiMeaning: "ฝนตก", group: "ou", pageRef: "P05" },
  { letter: "S", pair: "Ss", emoji: "☀️", word: "Sun", spokenPhoneme: "sss", ipa: "/s/", thaiSound: "เซอะ", thaiMeaning: "พระอาทิตย์", group: "ou", pageRef: "P05" },
  { letter: "T", pair: "Tt", emoji: "🌳", word: "Tree", spokenPhoneme: "tuh", ipa: "/t/", thaiSound: "เทอะ", thaiMeaning: "ต้นไม้", group: "ou", pageRef: "P05" },
  { letter: "U", pair: "Uu", emoji: "☂️", word: "Umbrella", spokenPhoneme: "uh", ipa: "/ʌ/", thaiSound: "อะ", thaiMeaning: "ร่มกันฝน", group: "ou", isVowel: true, pageRef: "P05" },
  { letter: "V", pair: "Vv", emoji: "🚐", word: "Van", spokenPhoneme: "vvv", ipa: "/v/", thaiSound: "เวอะ", thaiMeaning: "รถตู้", group: "vz", pageRef: "P06" },
  { letter: "W", pair: "Ww", emoji: "🐳", word: "Whale", spokenPhoneme: "wuh", ipa: "/w/", thaiSound: "เวอะ", thaiMeaning: "วาฬยักษ์", group: "vz", pageRef: "P06" },
  { letter: "X", pair: "Xx", emoji: "🎁", word: "Box", spokenPhoneme: "ks", ipa: "/ks/", thaiSound: "คส์", thaiMeaning: "กล่องของขวัญ", group: "vz", pageRef: "P06" },
  { letter: "Y", pair: "Yy", emoji: "🪀", word: "Yo-yo", spokenPhoneme: "yuh", ipa: "/j/", thaiSound: "เยอะ", thaiMeaning: "ลูกดิ่งโยโย่", group: "vz", pageRef: "P06" },
  { letter: "Z", pair: "Zz", emoji: "🦓", word: "Zebra", spokenPhoneme: "zzz", ipa: "/z/", thaiSound: "เซอะ", thaiMeaning: "ม้าลาย", group: "vz", pageRef: "P06" },
];

const VOCAB_WORLDS: {
  id: VocabWorldId;
  pageRef: string;
  emoji: string;
  titleTh: string;
  titleEn: string;
  words: { emoji: string; word: string; thai: string }[];
}[] = [
  {
    id: "animals",
    pageRef: "P11 • Freebie",
    emoji: "🐾",
    titleTh: "สัตว์น่ารัก",
    titleEn: "Cute Animals",
    words: [
      { emoji: "🐱", word: "Cat", thai: "แมว" },
      { emoji: "🐶", word: "Dog", thai: "สุนัข" },
      { emoji: "🐟", word: "Fish", thai: "ปลา" },
      { emoji: "🐦", word: "Bird", thai: "นก" },
      { emoji: "🦆", word: "Duck", thai: "เป็ด" },
      { emoji: "🐝", word: "Bee", thai: "ผึ้ง" },
    ],
  },
  {
    id: "food",
    pageRef: "P12",
    emoji: "🍎",
    titleTh: "ผลไม้ & ของอร่อย",
    titleEn: "Fruits & Food",
    words: [
      { emoji: "🍎", word: "Apple", thai: "แอปเปิล" },
      { emoji: "🍌", word: "Banana", thai: "กล้วย" },
      { emoji: "🍇", word: "Grape", thai: "องุ่น" },
      { emoji: "🥚", word: "Egg", thai: "ไข่" },
      { emoji: "🎂", word: "Cake", thai: "เค้ก" },
      { emoji: "🥛", word: "Milk", thai: "นมสด" },
    ],
  },
  {
    id: "colors",
    pageRef: "P13",
    emoji: "🎨",
    titleTh: "สี & รูปทรง",
    titleEn: "Colors & Shapes",
    words: [
      { emoji: "🔴", word: "Red", thai: "สีแดง" },
      { emoji: "🔵", word: "Blue", thai: "สีฟ้า" },
      { emoji: "🟡", word: "Yellow", thai: "สีเหลือง" },
      { emoji: "🟢", word: "Green", thai: "สีเขียว" },
      { emoji: "⭐", word: "Star", thai: "รูปดาว" },
      { emoji: "❤️", word: "Heart", thai: "รูปหัวใจ" },
    ],
  },
  {
    id: "body",
    pageRef: "P14",
    emoji: "👕",
    titleTh: "ร่างกาย & เสื้อผ้า",
    titleEn: "Body & Clothes",
    words: [
      { emoji: "👁️", word: "Eye", thai: "ดวงตา" },
      { emoji: "👂", word: "Ear", thai: "ใบหู" },
      { emoji: "✋", word: "Hand", thai: "มือ" },
      { emoji: "👒", word: "Hat", thai: "หมวก" },
      { emoji: "👟", word: "Shoe", thai: "รองเท้า" },
      { emoji: "👕", word: "Shirt", thai: "เสื้อ" },
    ],
  },
  {
    id: "nature",
    pageRef: "P15",
    emoji: "☀️",
    titleTh: "ธรรมชาติ & ท้องฟ้า",
    titleEn: "Nature & Sky",
    words: [
      { emoji: "☀️", word: "Sun", thai: "พระอาทิตย์" },
      { emoji: "🌙", word: "Moon", thai: "ดวงจันทร์" },
      { emoji: "☁️", word: "Cloud", thai: "ก้อนเมฆ" },
      { emoji: "🌧️", word: "Rain", thai: "ฝน" },
      { emoji: "🌳", word: "Tree", thai: "ต้นไม้" },
      { emoji: "🌸", word: "Flower", thai: "ดอกไม้" },
    ],
  },
  {
    id: "home",
    pageRef: "P16",
    emoji: "🚗",
    titleTh: "ของใช้ & รถเรือ",
    titleEn: "Home & Vehicles",
    words: [
      { emoji: "🚗", word: "Car", thai: "รถยนต์" },
      { emoji: "🚌", word: "Bus", thai: "รถบัส" },
      { emoji: "⛵", word: "Boat", thai: "เรือ" },
      { emoji: "📖", word: "Book", thai: "หนังสือ" },
      { emoji: "☕", word: "Cup", thai: "แก้วน้ำ" },
      { emoji: "🛏️", word: "Bed", thai: "เตียงนอน" },
    ],
  },
];

const CVC_WORDS = [
  { emoji: "🐱", letters: ["C", "A", "T"], sounds: ["kuh", "ah", "tuh"], word: "Cat", thai: "แมว" },
  { emoji: "👒", letters: ["H", "A", "T"], sounds: ["huh", "ah", "tuh"], word: "Hat", thai: "หมวก" },
  { emoji: "🚌", letters: ["B", "U", "S"], sounds: ["buh", "uh", "sss"], word: "Bus", thai: "รถบัส" },
  { emoji: "☀️", letters: ["S", "U", "N"], sounds: ["sss", "uh", "nnn"], word: "Sun", thai: "พระอาทิตย์" },
];

const STAGES = [
  { id: "s1", pages: "P03–P10", emoji: "🔊", titleTh: "ด่าน 1: เสียงโฟนิกส์ A–Z & คัด 3 เส้น", titleEn: "Stage 1: A–Z Phonics & 3-Line Tracing" },
  { id: "s2", pages: "P11–P16", emoji: "🗺️", titleTh: "ด่าน 2: สะสมคำศัพท์รอบตัว 6 หมวด (36 คำ)", titleEn: "Stage 2: 6 Everyday Vocab Worlds (36 Words)" },
  { id: "s3", pages: "P17–P21", emoji: "🎯", titleTh: "ด่าน 3: วงกลมเสียงขึ้นต้น & จับคู่ภาพ-คำ", titleEn: "Stage 3: Beginning Sounds & Word Match" },
  { id: "s4", pages: "P22–P25", emoji: "🧩", titleTh: "ด่าน 4: เขาวงกต A➔Z & ผสมคำ CVC", titleEn: "Stage 4: A➔Z Maze, CVC & Word Search" },
  { id: "s5", pages: "P26–P28", emoji: "✂️", titleTh: "ด่าน 5: ตัดแปะแฟลชการ์ด A–Z ครบ 27 ใบ!", titleEn: "Stage 5: Cut & Play 27 A–Z Flashcards!" },
];

const GALLERY_IMAGES = [
  { src: "/edu/vl01/mockup-01-cover.webp", labelTh: "ปกหน้า & จุดเด่นชุดโฟนิกส์น้องบ๊อบ 32 หน้า", labelEn: "Front Cover & 32-Page Highlights" },
  { src: "/edu/vl01/mockup-02-chapters.webp", labelTh: "ส่องครบ 5 บทผจญภัยภาษา + แฟลชการ์ด 27 ใบ", labelEn: "Inside All 5 Phonics Units + 27 Flashcards" },
  { src: "/edu/vl01/mockup-03-color-bw.webp", labelTh: "ได้ครบทั้งสี + ขาวดำประหยัดหมึก (ขอบเจาะรู 20mm)", labelEn: "Color + Ink-Friendly B&W (20mm Margin)" },
  { src: "/edu/vl01/mockup-04-editions.webp", labelTh: "เทียบสิทธิ์ Home (99฿) vs Class Edition (199฿)", labelEn: "Home vs Class Edition Comparison" },
];

const FAQS = [
  {
    qTh: "พ่อแม่ไม่ได้เก่งภาษาอังกฤษ จะสอนลูกออกเสียงโฟนิกส์ตามเล่มนี้ได้ไหม?",
    qEn: "Can non-native parents teach phonics confidently with this kit?",
    aTh: "ได้ 100% ครับ! นี่คือเหตุผลที่เราสร้างหน้า /edu/vl01 นี้ขึ้นมา เพียงสแกน QR บนใบงานแล้วกดปุ่ม A–Z หรือคำศัพท์ 6 หมวด มือถือจะออกเสียงให้ฟังชัดๆ ทีละคำ พร้อมเปิดโหมดแปลไทยคู่กันได้เลย!",
    aEn: "100% yes! Just scan the QR code on any worksheet to tap and hear clear A–Z letter sounds, 36 core words, and CVC blending right from your phone.",
  },
  {
    qTh: "ซื้อครั้งเดียวได้ไฟล์อะไรบ้าง? ปริ้นท์ขาว-ดำได้ไหม?",
    qEn: "What files are included? Is it ink-friendly for B&W printing?",
    aTh: "ได้ครบ 4 ไฟล์ PDF ความละเอียดสูง 300 DPI (ไทย/อังกฤษ × สี/ขาวดำ) ครบ 32 หน้า เผื่อขอบเจาะรูด้านซ้าย 20mm ทุกหน้า เข้าแฟ้มสันห่วงและเคลือบแข็งหน้าคัด A–Z + แฟลชการ์ดได้ทันทีครับ",
    aEn: "You get all 4 high-res 300 DPI PDFs (TH/EN × Color/B&W), 32 pages each, with a 20mm left binder margin ready for laminating and dry-erase reuse.",
  },
  {
    qTh: "สิทธิ์ HOME (99฿) กับ CLASS (199฿) ต่างกันอย่างไร?",
    qEn: "What is the difference between HOME (99 THB) and CLASS (199 THB)?",
    aTh: "HOME Edition สำหรับคุณพ่อคุณแม่ปริ้นท์ให้ลูกๆ ในครอบครัวได้ไม่จำกัด ส่วน CLASS Edition สำหรับคุณครูปฐมวัย/ครูภาษาอังกฤษ ปริ้นท์แจกนักเรียนทั้งห้องเรียนได้ไม่จำกัดชุด พร้อมใบรับรองสิทธิ์ในเล่มครับ",
    aEn: "HOME is for unlimited personal family printing; CLASS grants a Single Classroom License for 1 teacher to print for all students in their classes.",
  },
];

const STORAGE_KEY = "iaon_edu_vl01_stars_v1";

export function Vl01HubView() {
  const [lang, setLang] = useState<EduLang>("th");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bilingualAudio, setBilingualAudio] = useState(true);
  const [phonicsGroup, setPhonicsGroup] = useState<PhonicsGroup>("all");
  const [activeLetter, setActiveLetter] = useState<string | null>("A");
  const [activeWorld, setActiveWorld] = useState<VocabWorldId>("animals");
  const [activeWord, setActiveWord] = useState<string | null>(null);
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
    return () => stopPhonicsSpeech();
  }, []);

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

  const filteredPhonics = PHONICS_26.filter((p) => {
    if (phonicsGroup === "all") return true;
    if (phonicsGroup === "vowels") return Boolean(p.isVowel);
    return p.group === phonicsGroup;
  });

  const selectedEntry =
    PHONICS_26.find((p) => p.letter === activeLetter) ?? PHONICS_26[0];
  const currentWorld =
    VOCAB_WORLDS.find((w) => w.id === activeWorld) ?? VOCAB_WORLDS[0];

  const handleTapPhonics = (entry: PhonicsEntry) => {
    setActiveLetter(entry.letter);
    speakPhonicsCard({
      letter: entry.letter,
      spokenPhoneme: entry.spokenPhoneme,
      word: entry.word,
      thaiMeaning: entry.thaiMeaning,
      bilingual: bilingualAudio,
      soundEnabled,
    });
  };

  const handleTapVocab = (word: string, thai: string) => {
    setActiveWord(word);
    speakVocabWord({
      word,
      thaiMeaning: thai,
      bilingual: bilingualAudio,
      soundEnabled,
    });
  };

  const handleTapCvc = (item: (typeof CVC_WORDS)[number]) => {
    setActiveWord(item.word);
    speakCvcBlend({
      sounds: item.sounds,
      word: item.word,
      thaiMeaning: item.thai,
      bilingual: bilingualAudio,
      soundEnabled,
    });
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
              ? "🏆 เย้! สะสมดาวครบ 5/5 ด่านแล้ว ยอดนักผจญภัยสายภาษาของน้องบ๊อบ!"
              : "🏆 All 5/5 Adventure Stars Unlocked! Super Phonics Explorer!"
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

  return (
    <div className="w-full overflow-x-hidden bg-[#FFFDF7] text-[#1E293B] -mt-4 md:-mt-8 pt-6 md:pt-10 pb-16 sm:pb-20 border-b border-teal-200/80">
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-2xl border-2 border-teal-300 bg-white px-4 py-3 text-sm font-bold text-[#1E293B] shadow-xl">
          {toastMsg}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        {/* TOP NAV + CONTROLS */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/edu"
            className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-white hover:bg-teal-50 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-teal-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{lang === "th" ? "กลับคลังสื่อ iAon Edu-Verse" : "Back to Edu-Verse Hub"}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setBilingualAudio((v) => !v)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
                bilingualAudio
                  ? "border-teal-300 bg-teal-50 text-teal-900"
                  : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{bilingualAudio ? "เสียง: EN + แปลไทย" : "Audio: EN Only"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (soundEnabled) stopPhonicsSpeech();
                setSoundEnabled((v) => !v);
              }}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
                soundEnabled
                  ? "border-teal-300 bg-teal-600 text-white"
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
                  lang === "th" ? "bg-teal-600 text-white" : "text-slate-600"
                }`}
              >
                TH
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-full px-2.5 py-1 cursor-pointer ${
                  lang === "en" ? "bg-teal-600 text-white" : "text-slate-600"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* HERO BANNER (WARM EDITORIAL + BOB TEAL) */}
        <section className="rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-[#F0FDFA] via-white to-[#FEF9EF] p-5 sm:p-8 shadow-md shadow-teal-900/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 min-w-0 space-y-4">
              <div className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-teal-300 bg-white px-3 py-1 text-[11px] sm:text-xs font-bold text-teal-900 max-w-full">
                <Compass className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>EDU-VL01 • PHONICS SOUNDBOARD • 3–6 ปี</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight break-words">
                {lang === "th" ? (
                  <>
                    นักผจญภัยสายภาษา &amp; Phonics{" "}
                    <span className="text-teal-700 whitespace-nowrap">กับน้องบ๊อบ</span>
                  </>
                ) : (
                  <>
                    Bob&apos;s Visual Phonics &amp;{" "}
                    <span className="text-teal-700">Early Vocabulary Adventure</span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {lang === "th"
                  ? "ไม่ใช่ใบงาน A–Z กระดาษใบ้! กดฟังเสียงโฟนิกส์ A–Z และคำศัพท์ 6 หมวด 2 ภาษาได้ทันทีจากหน้านี้ คู่กับใบงาน 32 หน้าเต็ม + 27 แฟลชการ์ดตัดเล่น + ขอบเจาะรู 20mm"
                  : "Never a silent worksheet! Tap any A–Z phonics tile or 36 everyday words below for instant audio right alongside our 32-page print kit & 27 cut-out flashcards."}
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="#soundboard"
                  className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 hover:bg-teal-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{lang === "th" ? "กดฟังเสียง Phonics A–Z ทันที" : "Open A–Z Soundboard"}</span>
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
                <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full border-4 border-teal-200 bg-white p-3 shadow-lg overflow-hidden flex items-center justify-center">
                  <img
                    src="/edu/bob-3d.webp"
                    alt="Bob 3D Mascot — EDU-VL01 Phonics Explorer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="-mt-3 relative z-10 rounded-full bg-teal-600 px-3.5 py-1 text-xs font-extrabold text-white shadow">
                  🐾 น้องบ๊อบ • 32 หน้า
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE TOOL 1: A-Z PHONICS SOUNDBOARD */}
        <section
          id="soundboard"
          className="rounded-3xl border-2 border-teal-200 bg-white p-5 sm:p-7 shadow-sm space-y-5 scroll-mt-24"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-teal-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>HYBRID QR TOOL #1 • P03–P06</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                {lang === "th"
                  ? "🔊 กระดานกดฟังเสียงโฟนิกส์ A–Z (แตะที่ตัวอักษรได้เลย!)"
                  : "🔊 Interactive A–Z Phonics Soundboard (Tap Any Letter!)"}
              </h2>
            </div>

            {/* Group filter tabs */}
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  { id: "all", label: "ทั้งหมด A–Z" },
                  { id: "ag", label: "A–G (P03)" },
                  { id: "hn", label: "H–N (P04)" },
                  { id: "ou", label: "O–U (P05)" },
                  { id: "vz", label: "V–Z (P06)" },
                  { id: "vowels", label: "✨ 5 สระ" },
                ] as { id: PhonicsGroup; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPhonicsGroup(tab.id)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors border ${
                    phonicsGroup === tab.id
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-[#F0FDFA] text-teal-900 border-teal-200 hover:bg-teal-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Spotlight Bar */}
          <div className="rounded-2xl border-2 border-teal-200 bg-[#F0FDFA] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white border-2 border-teal-300 flex items-center justify-center text-3xl font-extrabold text-teal-800 shrink-0 shadow-xs">
                {selectedEntry.pair}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-2xl">{selectedEntry.emoji}</span>
                  <strong className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                    {selectedEntry.word}
                  </strong>
                  <span className="rounded-full bg-teal-600 px-2.5 py-0.5 text-xs font-bold text-white">
                    {selectedEntry.ipa} • {selectedEntry.thaiSound}
                  </span>
                  <span className="rounded-full bg-white border border-teal-200 px-2.5 py-0.5 text-xs font-bold text-teal-800">
                    {selectedEntry.pageRef}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-1">
                  {lang === "th"
                    ? `ความหมาย: ${selectedEntry.thaiMeaning} — ฝึกออกเสียง "${selectedEntry.thaiSound}" สั้นๆ ชัดๆ แล้วต่อด้วยคำว่า "${selectedEntry.word}"`
                    : `Meaning: ${selectedEntry.thaiMeaning} — Say "${selectedEntry.spokenPhoneme}" crisply, then "${selectedEntry.word}"!`}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleTapPhonics(selectedEntry)}
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-600 hover:bg-teal-700 px-5 py-3 text-sm font-bold text-white shadow-sm cursor-pointer transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>{lang === "th" ? "ฟังซ้ำอีกครั้ง" : "Replay Sound"}</span>
            </button>
          </div>

          {/* 26 Phonics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            {filteredPhonics.map((item) => {
              const isSelected = activeLetter === item.letter;
              return (
                <button
                  key={item.letter}
                  type="button"
                  onClick={() => handleTapPhonics(item)}
                  className={`rounded-2xl border-2 p-2.5 sm:p-3 text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    isSelected
                      ? "border-teal-600 bg-[#F0FDFA] shadow-md scale-[1.02]"
                      : item.isVowel
                        ? "border-amber-200 bg-[#FEF9EF] hover:border-teal-400"
                        : "border-slate-200 bg-white hover:border-teal-400 hover:bg-[#F0FDFA]/50"
                  }`}
                >
                  <div className="flex items-center justify-between w-full text-[10px] font-bold text-slate-500">
                    <span>{item.pageRef}</span>
                    <span>{item.emoji}</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#0F172A] leading-none">
                    {item.pair}
                  </div>
                  <div className="text-xs font-bold text-teal-800 truncate w-full">
                    {item.word}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500">
                    {item.ipa} {item.thaiSound}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* INTERACTIVE TOOL 2: 6 VOCABULARY WORLDS + CVC BLENDING */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 rounded-3xl border-2 border-teal-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-teal-700">
                <BookOpen className="w-3.5 h-3.5" />
                <span>HYBRID QR TOOL #2 • P11–P16</span>
              </span>
              <h2 className="text-xl font-extrabold text-[#0F172A]">
                {lang === "th"
                  ? "🗺️ คลังคำศัพท์รอบตัว 6 หมวด (กดฟังเสียง 2 ภาษา)"
                  : "🗺️ 6 Everyday Visual Vocabulary Worlds (Tap to Hear)"}
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {VOCAB_WORLDS.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setActiveWorld(w.id)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer border transition-colors ${
                    activeWorld === w.id
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-[#FFFDF7] text-slate-700 border-slate-200 hover:border-teal-300"
                  }`}
                >
                  {w.emoji} {lang === "th" ? w.titleTh : w.titleEn}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {currentWorld.words.map((w) => {
                const isAct = activeWord === w.word;
                return (
                  <button
                    key={w.word}
                    type="button"
                    onClick={() => handleTapVocab(w.word, w.thai)}
                    className={`rounded-2xl border-2 p-3.5 text-left cursor-pointer transition-all flex items-center gap-3 ${
                      isAct
                        ? "border-teal-600 bg-[#F0FDFA] shadow-sm"
                        : "border-slate-200 bg-[#FFFDF7] hover:border-teal-300"
                    }`}
                  >
                    <span className="text-3xl shrink-0">{w.emoji}</span>
                    <div className="min-w-0">
                      <div className="text-base font-extrabold text-[#0F172A]">
                        {w.word}
                      </div>
                      <div className="text-xs font-semibold text-slate-600">
                        {w.thai}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CVC 3-Sound Blending Mini-Lab (P23) */}
          <div className="lg:col-span-4 rounded-3xl border-2 border-amber-200 bg-[#FEF9EF] p-5 sm:p-6 shadow-sm space-y-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CVC BLENDING • P23</span>
              </span>
              <h2 className="text-lg font-extrabold text-[#0F172A]">
                {lang === "th" ? "✨ กดฟังผสมคำ 3 เสียง!" : "✨ Tap to Blend 3 Sounds!"}
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                {lang === "th"
                  ? "ตรงกับหน้า P23 เป๊ะ 100% ชวนลูกแตะจุดอ่านทีละเสียง"
                  : "Matches Page 23 — hear each letter sound blend into a real word!"}
              </p>
            </div>

            <div className="space-y-2.5">
              {CVC_WORDS.map((c) => (
                <button
                  key={c.word}
                  type="button"
                  onClick={() => handleTapCvc(c)}
                  className="w-full rounded-2xl border border-amber-200 bg-white hover:border-teal-400 p-3 flex items-center justify-between gap-2 cursor-pointer transition-all shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{c.emoji}</span>
                    <div className="flex items-center gap-1 font-extrabold text-sm text-teal-800">
                      {c.letters.map((l, idx) => (
                        <span
                          key={`${c.word}-${idx}`}
                          className="w-7 h-7 rounded-lg bg-[#F0FDFA] border border-teal-200 inline-flex items-center justify-center"
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-[#0F172A]">{c.word}</div>
                    <div className="text-[11px] font-semibold text-slate-500">{c.thai}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 5-STAGE STAR TRACKER (LOCALSTORAGE) */}
        <section className="rounded-3xl border-2 border-teal-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-extrabold text-[#0F172A]">
                {lang === "th"
                  ? "⭐ ตารางสะสมดาวนักผจญภัย 5 ด่าน (บันทึกอัตโนมัติในเครื่อง)"
                  : "⭐ 5-Stage Explorer Star Tracker (Auto-Saved)"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {lang === "th"
                  ? "ทำใบงานจบแต่ละบทแล้วมากดรับดาวกับน้องบ๊อบให้ครบ 5 ดวง!"
                  : "Tap each stage after completing its pages to collect all 5 stars!"}
              </p>
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
                      ? "border-teal-500 bg-[#F0FDFA] shadow-sm"
                      : "border-slate-200 bg-[#FFFDF7] hover:border-teal-300"
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
                  <span className="text-[11px] font-mono font-bold text-teal-700">
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
          className="rounded-3xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 via-white to-[#F0FDFA] p-6 sm:p-7 shadow-sm space-y-4 scroll-mt-24"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 border border-sky-300 px-3 py-1 text-xs font-extrabold text-sky-900">
                <Gift className="w-3.5 h-3.5 text-sky-700" />
                <span>FREE 5-PAGE LEAD MAGNET • โหลดฟรี 0 ฿ ไม่ต้องสมัครสมาชิก</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                {lang === "th"
                  ? "🎁 ดาวน์โหลดชุดทดลองฟรี 5 หน้า (P01 ปก + P03 โฟนิกส์ A–G + P11 คำศัพท์สัตว์ + P17 เสียงขึ้นต้น + P32)"
                  : "🎁 Download Free 5-Page Sample Pack (Cover + A–G Phonics + Animals + Beginning Sounds)"}
              </h2>
              <p className="text-sm text-slate-600">
                {lang === "th"
                  ? "ลองปริ้นท์ A4 ให้ลูกฝึกออกเสียงคู่กระดานเสียงด้านบนก่อนตัดสินใจซื้อเล่มเต็ม 32 หน้าได้เลย!"
                  : "Print and test with the soundboard above before grabbing the full 32-page kit!"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="/edu/vl01/EDU-VL01_Freebie_5Pages_TH.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-700 hover:bg-sky-800 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>โหลดฟรี 5 หน้า (ภาษาไทย)</span>
              </a>
              <a
                href="/edu/vl01/EDU-VL01_Freebie_5Pages_EN.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-sky-300 bg-white hover:bg-sky-50 px-5 py-3.5 text-sm font-bold text-sky-900 transition-colors"
              >
                <Printer className="w-4 h-4 text-sky-700" />
                <span>Free 5-Page PDF (English)</span>
              </a>
            </div>
          </div>
        </section>

        {/* 4-MOCKUP GALLERY + LIGHTBOX */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
              {lang === "th"
                ? "👀 ส่องตัวอย่างข้างในจริง (คลิกขยายภาพใหญ่ได้)"
                : "👀 Peek Inside the 32-Page Kit (Click to Zoom)"}
            </h2>
            <span className="text-xs font-bold text-teal-700">4 Mockups • 300 DPI</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((img, idx) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group rounded-2xl border-2 border-teal-200/80 bg-white overflow-hidden text-left shadow-xs hover:border-teal-500 transition-all cursor-pointer"
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

        {/* DUAL-EDITION PRICING (HOME 99 / CLASS 199) */}
        <section id="order" className="space-y-5">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 border border-teal-300 px-3 py-1 text-xs font-extrabold text-teal-900">
              <Layers className="w-3.5 h-3.5" />
              <span>DUAL-EDITION LICENSE • ได้ครบ 4 ไฟล์ (TH/EN × สี/ขาวดำ)</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              {lang === "th"
                ? "สั่งซื้อเล่มเต็ม 32 หน้า (รับไฟล์ PDF ทันทีทาง LINE)"
                : "Get the Full 32-Page PDF Kit (Instant Delivery)"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* HOME EDITION */}
            <div className="rounded-3xl border-2 border-teal-400 bg-white p-6 flex flex-col justify-between gap-5 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1 text-xs font-extrabold text-teal-900">
                    <Home className="w-3.5 h-3.5" />
                    <span>HOME EDITION • ใช้ในครอบครัว</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">32 หน้า • 4 PDF</span>
                </div>
                <div className="flex items-baseline gap-2.5">
                  <strong className="text-4xl font-extrabold text-teal-700">99 ฿</strong>
                  <span className="text-sm text-slate-400 line-through">149 ฿</span>
                  <span className="text-xs font-semibold text-slate-600">($4.99)</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {[
                    "ครบ 32 หน้าเต็ม: โฟนิกส์ A–Z + คัด 3 เส้น + คำศัพท์ 6 หมวด + CVC + เขาวงกต",
                    "แถมแผ่นตัดแฟลชการ์ด A–Z 27 ใบติดป้ายเลขหน้า + เฉลยครบ + ใบประกาศ",
                    "ได้ครบ 4 ไฟล์ PDF (ไทย/อังกฤษ × สี/ขาวดำประหยัดหมึก ขอบเจาะรู 20mm)",
                    "ใช้งานกระดานฟังเสียง /edu/vl01 ฟรีตลอดชีพ ไร้โฆษณา",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={getEduOrderLineUrl({ sku: "EDU-VL01", edition: "HOME", lang })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] px-5 py-3.5 text-base font-bold text-white shadow-sm transition-colors"
              >
                <FaLine className="w-5 h-5" />
                <span>สั่งซื้อ HOME EDITION (99 ฿) ทาง LINE</span>
              </a>
            </div>

            {/* CLASS EDITION */}
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
                    "ครบ 32 หน้าเต็ม + 27 แฟลชการ์ด A–Z ทำมุมภาษาอังกฤษในห้องเรียนได้ทันที",
                    "ได้ครบ 4 ไฟล์ PDF (TH/EN × สี/ขาวดำประหยัดหมึก ถ่ายเอกสารคมชัด)",
                    "เปิดกระดานเสียง /edu/vl01 ขึ้นจอทีวี/โปรเจกเตอร์สอนหน้าชั้นได้ฟรี!",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={getEduOrderLineUrl({ sku: "EDU-VL01", edition: "CLASS", lang })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-700 hover:bg-sky-800 px-5 py-3.5 text-base font-bold text-white shadow-sm transition-colors"
              >
                <FaLine className="w-5 h-5 text-[#7CF29C]" />
                <span>สั่งซื้อ CLASS EDITION (199 ฿) ทาง LINE</span>
              </a>
            </div>
          </div>

          {/* ALL-5 UNIVERSE BUNDLE UPSELL STRIP */}
          <div className="rounded-2xl border-2 border-amber-300 bg-[#FEF9EF] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm sm:text-base font-extrabold text-[#0F172A]">
                🔥 คุ้มสุด! เหมาครบจักรวาล 5 เล่ม Live (EF01 + RT01 + BB01 + MU01 + VL01 = 160 หน้า)
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                เพียง <strong className="text-amber-800">399 ฿</strong> (จากปกติ 525 ฿ • ประหยัด 126 ฿! เฉลี่ยเล่มละ 79.8 ฿ ได้ครบ 20 ไฟล์ PDF)
              </p>
            </div>
            <a
              href={getEduOrderLineUrl({ sku: "EDU-VL01", edition: "ALL5_BUNDLE", lang })}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-500 px-5 py-3 text-sm font-extrabold text-slate-950 transition-colors"
            >
              <span>สั่งโปรเหมา 5 เล่ม (399 ฿)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="rounded-3xl border border-teal-200 bg-white p-6 space-y-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-teal-600" />
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
                      className={`w-4 h-4 text-teal-600 shrink-0 transition-transform ${
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

      {/* LIGHTBOX MODAL */}
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

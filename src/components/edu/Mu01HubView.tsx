"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Play,
  Square,
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
  Music,
  Layers,
  Gift,
  Eye,
  EyeOff,
  Headphones,
} from "lucide-react";
import { FaLine } from "react-icons/fa6";
import {
  playApplauseAndFanfare,
  playStarPop,
} from "@/lib/eduAudio";
import {
  playDynamicsPitchQuiz,
  playInstrumentSample,
  playNoteDurationDemo,
  startRhythmGroove,
} from "@/lib/eduMusicEngine";
import { type EduLang, getEduOrderLineUrl } from "@/lib/eduCatalog";

type TrackId = "t01" | "t02" | "t03" | "t04" | "t05" | "t06";

interface TrackMeta {
  id: TrackId;
  code: string;
  icon: string;
  pages: string;
  titleTh: string;
  titleEn: string;
  descTh: string;
  descEn: string;
  mp3Hint: string;
}

const MU_TRACKS: TrackMeta[] = [
  {
    id: "t01",
    code: "T01",
    icon: "👂",
    pages: "P03–P07",
    titleTh: "ควิซหูวิเศษ 5 ข้อ (ดัง-เบา / สูง-ต่ำ)",
    titleEn: "Magic Ears Quiz (Loud-Soft / High-Low)",
    descTh: "กดฟังเสียงทีละข้อ 1–5 แล้วให้ลูกวงกลมคำตอบบนหน้า P07 (ตรงเฉลย P29 100%)",
    descEn: "Tap Questions 1–5 and circle answers on Page 07 (Matches Key P29)",
    mp3Hint: "/edu/mu01/audio/t01_dynamics_pitch.mp3",
  },
  {
    id: "t02",
    code: "T02",
    icon: "🎼",
    pages: "P08–P13",
    titleTh: "เทียบความยาว 4 เพื่อนโน้ต (70 BPM)",
    titleEn: "Meet the 4 Note Friends (70 BPM)",
    descTh: "ฟังความต่างของตัวดำ (1) ตัวขาว (2) ตัวกลม (4) และตัวหยุด (เงียบ) พร้อมเสียงเคาะจังหวะ",
    descEn: "Hear Quarter (1), Half (2), Whole (4) notes & Quarter Rest on a 70 BPM beat",
    mp3Hint: "/edu/mu01/audio/t02_note_durations.mp3",
  },
  {
    id: "t03",
    code: "T03",
    icon: "👏",
    pages: "P14–P16 • Freebie!",
    titleTh: "จังหวะปรบมือช้า 70 BPM (4/4)",
    titleEn: "Clap-Along Backing Groove 70 BPM",
    descTh: "เปิดวนคู่หน้าปรบมือ 4/4 (รวมอยู่ในชุดแจกฟรี P14!) มีไฟนับจังหวะ 1-2-3-4 ชัดเจน",
    descEn: "Steady 70 BPM groove for Page 14 (Included in Freebie!) with visual 1-2-3-4 beats",
    mp3Hint: "/edu/mu01/audio/t03_rhythm_70bpm.mp3",
  },
  {
    id: "t04",
    code: "T04",
    icon: "🥁",
    pages: "P17–P19, P27",
    titleTh: "จังหวะปรบมือสนุก 95 BPM (4/4)",
    titleEn: "Upbeat Clap-Along Groove 95 BPM",
    descTh: "อัปสปีดความสนุกเป็น 95 BPM สำหรับด่านปรบมือขั้นสูงและด่านบอส P27",
    descEn: "Upbeat 95 BPM tempo for advanced clapping patterns & Page 27 Boss Stage",
    mp3Hint: "/edu/mu01/audio/t04_rhythm_95bpm.mp3",
  },
  {
    id: "t05",
    code: "T05",
    icon: "🎺",
    pages: "P20–P25",
    titleTh: "ควิซทายเสียงเครื่องดนตรี 8 ชนิด",
    titleEn: "8-Instrument Sound Quiz",
    descTh: "เรียงลำดับเสียงที่ 1–8 ตรงหน้า P23 & เฉลย P30 เป๊ะ 100% ห้ามสลับข้อ!",
    descEn: "Sounds 1–8 in exact Page 23 & Answer Key P30 order!",
    mp3Hint: "/edu/mu01/audio/t05_instruments_quiz.mp3",
  },
  {
    id: "t06",
    code: "T06",
    icon: "🎤",
    pages: "P26",
    titleTh: "เพลงธีม วงดนตรีน้องข้าวต้ม (TH/EN)",
    titleEn: "Theme Song: Khao Tom's Little Band",
    descTh: "ร้องและปรบมือตามเนื้อเพลงหน้า P26 (95 BPM) พร้อมเมโลดี้และตัวนับจังหวะสด",
    descEn: "Sing & clap along with Page 26 lyrics (95 BPM) with live beat visualizer",
    mp3Hint: "/edu/mu01/audio/t06_th.mp3",
  },
];

const T01_QUESTIONS: {
  num: 1 | 2 | 3 | 4 | 5;
  labelTh: string;
  labelEn: string;
  answerTh: string;
  answerEn: string;
}[] = [
  { num: 1, labelTh: "ข้อ 1", labelEn: "Q1", answerTh: "ก (ดัง f)", answerEn: "A (Loud f)" },
  { num: 2, labelTh: "ข้อ 2", labelEn: "Q2", answerTh: "ข (เบา p)", answerEn: "B (Soft p)" },
  { num: 3, labelTh: "ข้อ 3", labelEn: "Q3", answerTh: "ก (ดัง f)", answerEn: "A (Loud f)" },
  { num: 4, labelTh: "ข้อ 4", labelEn: "Q4", answerTh: "ก (เสียงสูง ↑)", answerEn: "A (High ↑)" },
  { num: 5, labelTh: "ข้อ 5", labelEn: "Q5", answerTh: "ข (เสียงต่ำ ↓)", answerEn: "B (Low ↓)" },
];

const T02_NOTES: {
  kind: "quarter" | "half" | "whole" | "rest";
  symbol: string;
  titleTh: string;
  titleEn: string;
  beatsTh: string;
  beatsEn: string;
}[] = [
  { kind: "quarter", symbol: "♩", titleTh: "โน้ตตัวดำ", titleEn: "Quarter Note", beatsTh: "1 จังหวะ (ต้า!)", beatsEn: "1 Beat (Ta!)" },
  { kind: "half", symbol: "𝅗𝅥", titleTh: "โน้ตตัวขาว", titleEn: "Half Note", beatsTh: "2 จังหวะ (ต้า-อา)", beatsEn: "2 Beats (Ta-a)" },
  { kind: "whole", symbol: "𝅝", titleTh: "โน้ตตัวกลม", titleEn: "Whole Note", beatsTh: "4 จังหวะ (ต้า-อา-อา-อา)", beatsEn: "4 Beats (Ta-a-a-a)" },
  { kind: "rest", symbol: "𝄽", titleTh: "ตัวหยุดตัวดำ", titleEn: "Quarter Rest", beatsTh: "เงียบ 1 จังหวะ (ชู่ว์!)", beatsEn: "1 Beat Rest (Shh!)" },
];

const T05_INSTRUMENTS: {
  num: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  icon: string;
  answerTh: string;
  answerEn: string;
}[] = [
  { num: 1, icon: "🥁", answerTh: "ก: กลอง (Drum)", answerEn: "A: Drum" },
  { num: 2, icon: "🎹", answerTh: "ข: เปียโน (Piano)", answerEn: "B: Piano" },
  { num: 3, icon: "🪇", answerTh: "ก: มาราคัส (Maracas)", answerEn: "A: Maracas" },
  { num: 4, icon: "🎸", answerTh: "ข: กีตาร์ (Guitar)", answerEn: "B: Guitar" },
  { num: 5, icon: "🎶", answerTh: "ข: ไซโลโฟน (Xylophone)", answerEn: "B: Xylophone" },
  { num: 6, icon: "🪘", answerTh: "ก: แทมบูรีน (Tambourine)", answerEn: "A: Tambourine" },
  { num: 7, icon: "🪈", answerTh: "ก: ขลุ่ยรีคอร์เดอร์ (Recorder)", answerEn: "A: Recorder" },
  { num: 8, icon: "🔔", answerTh: "ข: กิ๊ง / ไทรแองเกิล (Triangle)", answerEn: "B: Triangle" },
];

const GALLERY_IMAGES = [
  {
    src: "/edu/mu01/mockup-01-cover.webp",
    labelTh: "ปกหน้า & จุดเด่นสื่อดนตรี 32 หน้า",
    labelEn: "Front Cover & 32-Page Highlights",
  },
  {
    src: "/edu/mu01/mockup-02-chapters.webp",
    labelTh: "ตัวอย่างครบ 5 บทเรียนดนตรี + 6 แทร็ก QR",
    labelEn: "Inside All 5 Music Chapters + 6 QR Tracks",
  },
  {
    src: "/edu/mu01/mockup-03-color-bw.webp",
    labelTh: "ได้ทั้งเวอร์ชันสี + ขาวดำประหยัดหมึก",
    labelEn: "Full Color + Ink-Friendly B&W Included",
  },
  {
    src: "/edu/mu01/mockup-04-editions.webp",
    labelTh: "เทียบสิทธิ์ Home vs Class Edition",
    labelEn: "Home vs Class Edition Comparison",
  },
];

const CONFETTI_PIECES = [
  { left: "10%", delay: "0s", color: "bg-purple-400" },
  { left: "22%", delay: "0.08s", color: "bg-amber-400" },
  { left: "34%", delay: "0.14s", color: "bg-pink-400" },
  { left: "48%", delay: "0.04s", color: "bg-emerald-400" },
  { left: "60%", delay: "0.18s", color: "bg-sky-400" },
  { left: "73%", delay: "0.1s", color: "bg-yellow-300" },
  { left: "86%", delay: "0.16s", color: "bg-rose-400" },
];

const STORAGE_KEY = "iaon_edu_mu01_tracks_v1";

export function Mu01HubView() {
  const [lang, setLang] = useState<EduLang>("th");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTrack, setActiveTrack] = useState<TrackId>("t03");

  // Groove player state (T03 70 BPM, T04 95 BPM, T06 Theme 95 BPM)
  const [isPlayingGroove, setIsPlayingGroove] = useState(false);
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const stopGrooveRef = useRef<(() => void) | null>(null);

  // Quiz answer key reveal toggles (for parents/teachers)
  const [showT01Keys, setShowT01Keys] = useState(false);
  const [showT05Keys, setShowT05Keys] = useState(false);

  // Progress star tracker (persisted in localStorage)
  const [completedTracks, setCompletedTracks] = useState<TrackId[]>([]);
  const [isCelebrating, setIsCelebrating] = useState(false);
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

  const stopAnyGroove = () => {
    if (stopGrooveRef.current) {
      stopGrooveRef.current();
      stopGrooveRef.current = null;
    }
    setIsPlayingGroove(false);
    setCurrentBeat(0);
  };

  // Cleanup groove on unmount
  useEffect(() => {
    return () => {
      if (stopGrooveRef.current) stopGrooveRef.current();
    };
  }, []);

  // Load saved stars, ?lang=en, and #t01..#t06 QR hash deep-link
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const qLang = params.get("lang")?.toLowerCase();
      if (qLang === "en" || qLang === "th") setLang(qLang);

      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (["t01", "t02", "t03", "t04", "t05", "t06"].includes(hash)) {
        setActiveTrack(hash as TrackId);
      }

      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setCompletedTracks(parsed.filter((id) => typeof id === "string") as TrackId[]);
        }
      }
    } catch {
      // Ignore private browsing storage errors
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
    if (soundEnabled) playApplauseAndFanfare();
    if (customToast) showToast(customToast);
    if (celebrateTimerRef.current) clearTimeout(celebrateTimerRef.current);
    celebrateTimerRef.current = setTimeout(() => setIsCelebrating(false), 3200);
  };

  const handleSelectTrack = (id: TrackId) => {
    stopAnyGroove();
    setActiveTrack(id);
  };

  const handleToggleGroove = (bpm: 70 | 95, mode: "groove" | "theme") => {
    if (isPlayingGroove) {
      stopAnyGroove();
      return;
    }
    if (!soundEnabled) {
      showToast(
        lang === "th"
          ? "🔇 กำลังปิดเสียงอยู่ กดปุ่มเปิดเสียงด้านบนขวาก่อนนะครับ!"
          : "🔇 Sound is muted — tap Sound On at top-right first!"
      );
      return;
    }
    setIsPlayingGroove(true);
    stopGrooveRef.current = startRhythmGroove(bpm, mode, (beat) => {
      setCurrentBeat(beat);
    });
  };

  const toggleTrackStar = (trackId: TrackId) => {
    setCompletedTracks((prev) => {
      const exists = prev.includes(trackId);
      const next = exists
        ? prev.filter((id) => id !== trackId)
        : [...prev, trackId];

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }

      if (!exists) {
        if (next.length === MU_TRACKS.length) {
          triggerCelebration(
            lang === "th"
              ? "🏆 ปลดล็อกครบ 6/6 แทร็กดนตรีแล้ว! ยอดนักดนตรีน้อยประจำวงข้าวต้ม!"
              : "🏆 All 6/6 Music Tracks Complete! Khao Tom's Band Champion!"
          );
        } else if (soundEnabled) {
          playStarPop();
        }
      }
      return next;
    });
  };

  const currentTrackMeta =
    MU_TRACKS.find((t) => t.id === activeTrack) ?? MU_TRACKS[2];

  const faqs =
    lang === "th"
      ? [
          {
            q: "พ่อแม่ไม่มีพื้นฐานดนตรีเลย สามารถพาลูกเล่นชุด EDU-MU01 ได้ไหม?",
            a: "เล่นได้ 100% ครับ! ออกแบบโดยครูดนตรีสากลตัวจริง (ครูอ้น) ให้ใช้คำพูดง่ายๆ เช่น ตัวดำ = ต้า (1 จังหวะ), ตัวขาว = ต้า-อา (2 จังหวะ), ตัวหยุด = ชู่ว์! พร้อมเสียงประกอบและไฟนับจังหวะ 1-2-3-4 บนหน้าเว็บนี้ แค่กดเล่นตามทีละแทร็กได้เลยครับ",
          },
          {
            q: "หน้าเว็บนี้ใช้งานร่วมกับใบงาน 32 หน้าได้ทันทีเลยไหม?",
            a: "ใช้งานได้ทันทีทั้ง 6 แทร็ก (T01–T06) ด้วยเอนจินเสียง Web Audio ที่ล็อกลำดับคำถามและเฉลยตรงกับใบงานหน้า P07, P23, P29, P30 เป๊ะ 100% (ทำงานออฟไลน์บนมือถือและโปรเจกเตอร์ห้องเรียนได้เลย ไร้โฆษณา)",
          },
          {
            q: "ซื้อเล่มเต็ม 32 หน้า (129 ฿) ได้ไฟล์อะไรบ้าง? ปริ้นท์ A4 ได้ไหม?",
            a: "ได้ครบ 4 ไฟล์ PDF ความละเอียดสูง (ภาษาไทย สี/ขาวดำ + อังกฤษ สี/ขาวดำ) ปริ้นท์ได้ทั้ง A4 และ US Letter ไม่ตกขอบ พร้อมหน้าเฉลยควิซหูวิเศษ P29, เฉลยเครื่องดนตรี P30 และใบประกาศนียบัตรนักดนตรีน้อยครับ",
          },
        ]
      : [
          {
            q: "Can parents with zero musical background teach with EDU-MU01?",
            a: "Absolutely! Created by a real music teacher using kid-friendly rhythm words (Quarter = Ta, Half = Ta-a, Rest = Shh!) paired with this exact 6-track interactive player and 1-2-3-4 beat visualizer.",
          },
          {
            q: "Do all 6 QR tracks match the printed 32-page PDF answer keys?",
            a: "Yes — 100% math and sequence verified! T01 matches Page 07/29, T02–T04 lock strictly to 70 & 95 BPM 4/4 time, T05 matches the exact 8-instrument order on Page 23/30, and T06 matches the Page 26 theme song.",
          },
          {
            q: "What is included in the Full 32-Page Pack?",
            a: "All 4 print-ready PDFs (English Color/B&W + Thai Color/B&W) with Universal Safe Box margins for A4 & US Letter, plus complete Answer Keys (P29–P30) and a printable Little Musician Award Certificate.",
          },
        ];

  return (
    <div className="w-full overflow-x-hidden bg-[#FFFDF7] text-[#1E293B] -mt-4 md:-mt-8 pt-6 md:pt-10 pb-16 border-b border-purple-200/80">
      {/* Floating Toast */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="rounded-2xl border-2 border-purple-400 bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white shadow-2xl">
            {toastMsg}
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Top Utility Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/edu"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-purple-700 hover:border-purple-300 shadow-xs transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>iAon Edu-Verse</span>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-purple-700">EDU-MU01</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (soundEnabled) stopAnyGroove();
                setSoundEnabled((prev) => !prev);
              }}
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
                    ? "bg-purple-600 text-white shadow-xs"
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
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🇬🇧 EN
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================
            SECTION 1: HERO + INTERACTIVE 6-TRACK HYBRID QR MUSIC STUDIO
        ============================================================ */}
        <section className="relative rounded-3xl border-2 border-purple-200 bg-white p-5 sm:p-8 shadow-lg shadow-purple-900/5 overflow-hidden">
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

          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-100/70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-100/60 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start min-w-0">
            {/* Left: Interactive 6-Track Music Studio Stage */}
            <div className="lg:col-span-7 min-w-0 w-full flex flex-col items-center text-center space-y-5">
              <div className="inline-flex items-center justify-center gap-1.5 rounded-full border border-purple-300 bg-purple-50 px-3 py-1 text-[11px] sm:text-xs font-bold text-purple-900 max-w-full flex-wrap">
                <Headphones className="w-3.5 h-3.5 shrink-0 text-purple-700" />
                <span>
                  {lang === "th"
                    ? "HYBRID QR • ห้องซ้อมดนตรี 6 แทร็กน้องข้าวต้ม (70/95 BPM)"
                    : "HYBRID QR • KHAO TOM'S 6-TRACK MUSIC STUDIO (70/95 BPM)"}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFFDF7] p-1.5 ring-2 ring-purple-400 shadow-md overflow-hidden flex items-center justify-center shrink-0 transition-transform ${
                    isPlayingGroove || isCelebrating ? "scale-105 animate-bounce" : ""
                  }`}
                >
                  <img
                    src="/edu/khaotom-3d.webp"
                    alt="Khao Tom 3D Music Mascot"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] leading-tight">
                    {lang === "th"
                      ? "สนุกกับจังหวะและโน้ตดนตรีกับน้องข้าวต้ม"
                      : "Khao Tom's Music & Rhythm Studio"}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {lang === "th"
                      ? "เลือกแทร็ก T01–T06 ให้ตรงกับหน้าใบงาน แล้วกดเล่นเสียงจริงคู่กระดาษได้เลย!"
                      : "Pick Track T01–T06 matching your worksheet page and play live audio!"}
                  </p>
                </div>
              </div>

              {/* 6 Track Pill Selectors (#t01 - #t06) */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 w-full">
                {MU_TRACKS.map((t) => {
                  const active = activeTrack === t.id;
                  return (
                    <button
                      key={t.id}
                      id={t.id}
                      type="button"
                      onClick={() => handleSelectTrack(t.id)}
                      className={`rounded-xl border-2 px-2 py-2 text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                        active
                          ? "border-purple-600 bg-purple-600 text-white shadow-md shadow-purple-500/20"
                          : "border-slate-200 bg-[#FAF5FF] text-slate-800 hover:border-purple-400"
                      }`}
                    >
                      <span className="text-base leading-none">{t.icon}</span>
                      <span>{t.code}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Track Interactive Panel */}
              <div className="w-full rounded-2xl border-2 border-purple-200 bg-[#FAF5FF] p-4 sm:p-5 space-y-4 text-left">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-purple-800">
                      <span>{currentTrackMeta.code}</span>
                      <span>•</span>
                      <span>{currentTrackMeta.pages}</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-extrabold text-[#1E293B]">
                      {lang === "th" ? currentTrackMeta.titleTh : currentTrackMeta.titleEn}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      {lang === "th" ? currentTrackMeta.descTh : currentTrackMeta.descEn}
                    </p>
                  </div>
                </div>

                {/* TRACK T01: 5-Question Dynamics & Pitch Quiz */}
                {activeTrack === "t01" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {T01_QUESTIONS.map((q) => (
                        <button
                          key={q.num}
                          type="button"
                          onClick={() => {
                            if (!soundEnabled) {
                              showToast(lang === "th" ? "🔇 กรุณากดเปิดเสียงก่อนครับ" : "🔇 Please turn Sound On");
                              return;
                            }
                            playDynamicsPitchQuiz(q.num);
                          }}
                          className="rounded-xl border-2 border-purple-200 bg-white hover:border-purple-500 hover:bg-purple-50 p-3 text-center transition-all cursor-pointer shadow-xs active:scale-95"
                        >
                          <div className="text-xs font-extrabold text-purple-700">
                            🔊 {lang === "th" ? q.labelTh : q.labelEn}
                          </div>
                          {showT01Keys && (
                            <div className="mt-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded px-1 py-0.5">
                              {lang === "th" ? q.answerTh : q.answerEn}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowT01Keys((v) => !v)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-800 hover:text-purple-950 cursor-pointer"
                    >
                      {showT01Keys ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>
                        {showT01Keys
                          ? lang === "th"
                            ? "ซ่อนเฉลยหน้า P29"
                            : "Hide P29 Answer Key"
                          : lang === "th"
                            ? "ดูเฉลยหน้า P29 (สำหรับพ่อแม่/คุณครู)"
                            : "Reveal P29 Answer Key (Parents/Teachers)"}
                      </span>
                    </button>
                  </div>
                )}

                {/* TRACK T02: 4 Note Durations at 70 BPM */}
                {activeTrack === "t02" && (
                  <div className="grid grid-cols-2 gap-2.5">
                    {T02_NOTES.map((n) => (
                      <button
                        key={n.kind}
                        type="button"
                        onClick={() => {
                          if (!soundEnabled) {
                            showToast(lang === "th" ? "🔇 กรุณากดเปิดเสียงก่อนครับ" : "🔇 Please turn Sound On");
                            return;
                          }
                          playNoteDurationDemo(n.kind);
                        }}
                        className="rounded-xl border-2 border-purple-200 bg-white hover:border-purple-500 hover:bg-purple-50 p-3 flex items-center gap-3 text-left transition-all cursor-pointer shadow-xs active:scale-98"
                      >
                        <span className="w-10 h-10 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center text-2xl font-bold shrink-0">
                          {n.symbol}
                        </span>
                        <div className="min-w-0">
                          <div className="text-sm font-extrabold text-[#1E293B] truncate">
                            {lang === "th" ? n.titleTh : n.titleEn}
                          </div>
                          <div className="text-xs font-medium text-slate-600 truncate">
                            {lang === "th" ? n.beatsTh : n.beatsEn}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* TRACK T03 (70 BPM) & T04 (95 BPM): Clap-Along Beat Visualizer */}
                {(activeTrack === "t03" || activeTrack === "t04") && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-2.5">
                      {[1, 2, 3, 4].map((beat) => {
                        const lit = isPlayingGroove && currentBeat === beat;
                        return (
                          <div
                            key={beat}
                            className={`rounded-2xl border-2 py-4 text-center font-mono text-2xl font-extrabold transition-all ${
                              lit
                                ? beat === 1
                                  ? "border-amber-500 bg-amber-400 text-slate-950 scale-105 shadow-md"
                                  : "border-purple-600 bg-purple-600 text-white scale-105 shadow-md"
                                : "border-purple-200 bg-white text-slate-400"
                            }`}
                          >
                            {beat}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                      <button
                        type="button"
                        onClick={() =>
                          handleToggleGroove(
                            activeTrack === "t03" ? 70 : 95,
                            "groove"
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-600 hover:bg-purple-700 px-6 py-3 text-sm sm:text-base font-extrabold text-white shadow-md shadow-purple-500/20 cursor-pointer min-w-[190px]"
                      >
                        {isPlayingGroove ? (
                          <>
                            <Square className="w-4 h-4 fill-current" />
                            <span>{lang === "th" ? "หยุดจังหวะ" : "Stop Groove"}</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-current" />
                            <span>
                              {activeTrack === "t03"
                                ? lang === "th"
                                  ? "เล่นจังหวะ 70 BPM (ช้า)"
                                  : "Play 70 BPM (Slow)"
                                : lang === "th"
                                  ? "เล่นจังหวะ 95 BPM (สนุก)"
                                  : "Play 95 BPM (Upbeat)"}
                            </span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          triggerCelebration(
                            lang === "th"
                              ? "👏 ปรบมือตรงจังหวะเป๊ะมาก! น้องข้าวต้มขอปรบมือให้รางวัล!"
                              : "👏 Spot-on rhythm! Khao Tom applauds your steady beat!"
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-emerald-300 bg-emerald-50 hover:bg-emerald-100 px-4 py-3 text-sm font-bold text-emerald-900 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-emerald-700" />
                        <span>{lang === "th" ? "👏 ปรบมือให้ดาว!" : "👏 Applause!"}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* TRACK T05: 8-Instrument Sound Quiz (Exact P23 / P30 Order) */}
                {activeTrack === "t05" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {T05_INSTRUMENTS.map((inst) => (
                        <button
                          key={inst.num}
                          type="button"
                          onClick={() => {
                            if (!soundEnabled) {
                              showToast(lang === "th" ? "🔇 กรุณากดเปิดเสียงก่อนครับ" : "🔇 Please turn Sound On");
                              return;
                            }
                            playInstrumentSample(inst.num);
                          }}
                          className="rounded-xl border-2 border-purple-200 bg-white hover:border-purple-500 hover:bg-purple-50 p-2.5 text-center transition-all cursor-pointer shadow-xs active:scale-95"
                        >
                          <div className="text-lg leading-none">
                            {showT05Keys ? inst.icon : "🎧"}
                          </div>
                          <div className="mt-1 text-xs font-extrabold text-purple-900">
                            {lang === "th" ? `เสียงที่ ${inst.num}` : `Sound #${inst.num}`}
                          </div>
                          {showT05Keys && (
                            <div className="mt-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 rounded px-1 py-0.5 truncate">
                              {lang === "th" ? inst.answerTh : inst.answerEn}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowT05Keys((v) => !v)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-800 hover:text-purple-950 cursor-pointer"
                    >
                      {showT05Keys ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>
                        {showT05Keys
                          ? lang === "th"
                            ? "ซ่อนเฉลยหน้า P30"
                            : "Hide P30 Answer Key"
                          : lang === "th"
                            ? "ดูเฉลย 8 เครื่องดนตรีหน้า P30 (สำหรับพ่อแม่/คุณครู)"
                            : "Reveal 8 Instruments Answer Key P30"}
                      </span>
                    </button>
                  </div>
                )}

                {/* TRACK T06: Theme Song Sing-Along (P26 TH & EN) */}
                {activeTrack === "t06" && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleGroove(95, "theme")}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-600 hover:bg-purple-700 px-5 py-2.5 text-sm font-extrabold text-white shadow-md cursor-pointer"
                      >
                        {isPlayingGroove ? (
                          <>
                            <Square className="w-4 h-4 fill-current" />
                            <span>{lang === "th" ? "หยุดเพลงธีม" : "Stop Theme"}</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-current" />
                            <span>
                              {lang === "th"
                                ? "เล่นทำนองเพลง 95 BPM"
                                : "Play 95 BPM Sing-Along"}
                            </span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4].map((b) => (
                          <span
                            key={b}
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-extrabold border ${
                              isPlayingGroove && currentBeat === b
                                ? "bg-amber-400 border-amber-500 text-slate-950 scale-110"
                                : "bg-white border-purple-200 text-slate-400"
                            }`}
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-purple-200 bg-white p-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                      {lang === "th" ? (
                        <>
                          <div className="font-extrabold text-purple-900">
                            🎵 เนื้อเพลง: วงดนตรีน้องข้าวต้ม (ตรงกับหน้า P26)
                          </div>
                          <p>
                            เหมียว เหมียว ข้าวต้มมาแล้ว! ตบมือให้เป๊ะ ต้า-ต้า-ต้า-ต้า!
                            <br />
                            เจอตัวดำ ตบมือหนึ่งที (ต้า!) • เจอตัวขาว ลากยาวสองที (ต้า-อา!)
                            <br />
                            เจอตัวหยุด แบมือเงียบกริบ (ชู่ว์!) • เจอตัวกลม หมุนตัวสี่ที (ต้า-อา-อา-อา!)
                            <br />
                            ตีกลองตุ้มๆ เขย่าแซ็กๆ วงดนตรีข้าวต้มสุดยอดไปเลย เย้!
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="font-extrabold text-purple-900">
                            🎵 Lyrics: Khao Tom&apos;s Little Band (Matches Page 26)
                          </div>
                          <p>
                            Meow, meow, Khao Tom is here! Clap the steady beat: Ta-Ta-Ta-Ta!
                            <br />
                            Quarter note, clap one time (Ta!) • Half note, hold for two (Ta-a!)
                            <br />
                            Quarter rest, hands open wide (Shh!) • Whole note, spin for four (Ta-a-a-a!)
                            <br />
                            Boom the drum, shake the beat — Khao Tom&apos;s band is super sweet! Yay!
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: 6-Track Interactive Star Progress Tracker */}
            <div className="lg:col-span-5 min-w-0 w-full rounded-2xl border border-purple-200 bg-[#FAF5FF] p-4 sm:p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-[#1E293B] flex items-center gap-2">
                    <Music className="w-5 h-5 text-purple-600" />
                    <span>
                      {lang === "th" ? "สะสมดาว 6 แทร็กดนตรี" : "6-Track Music Star Board"}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {lang === "th"
                      ? "ฝึกจบแต่ละแทร็ก แตะดาวเก็บแต้มได้เลย (บันทึกในเครื่องอัตโนมัติ)"
                      : "Tap the star as your child finishes each track (saved on device)"}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-extrabold text-amber-900">
                  {completedTracks.length}/6 ⭐
                </span>
              </div>

              <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${(completedTracks.length / MU_TRACKS.length) * 100}%` }}
                />
              </div>

              <div className="space-y-1.5">
                {MU_TRACKS.map((t) => {
                  const done = completedTracks.includes(t.id);
                  const isSelected = activeTrack === t.id;
                  return (
                    <div
                      key={t.id}
                      className={`w-full flex items-center gap-2.5 rounded-xl border p-2.5 transition-all ${
                        isSelected
                          ? "border-purple-500 bg-purple-50 shadow-xs"
                          : done
                            ? "border-emerald-300 bg-white"
                            : "border-slate-200 bg-white hover:border-purple-300"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectTrack(t.id)}
                        className="flex items-center gap-2.5 flex-1 min-w-0 text-left cursor-pointer"
                      >
                        <span className="text-lg shrink-0">{t.icon}</span>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs sm:text-sm font-bold text-[#1E293B] truncate">
                            {t.code}: {lang === "th" ? t.titleTh : t.titleEn}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">
                            {t.pages}
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleTrackStar(t.id)}
                        aria-label={`Mark ${t.code} complete`}
                        className="p-1.5 rounded-lg hover:bg-amber-50 cursor-pointer shrink-0"
                      >
                        <Star
                          className={`w-5 h-5 transition-transform ${
                            done
                              ? "text-amber-500 fill-amber-400 scale-110"
                              : "text-slate-300"
                          }`}
                        />
                      </button>
                    </div>
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
                  src="/edu/mu01/mockup-01-cover.webp"
                  alt="EDU-MU01 Freebie Cover Preview"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
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
                    ? "ทดลองปริ้นท์ให้ลูกปรบมือคู่แทร็ก T03 ฟรี (0 ฿)"
                    : "TRY BEFORE YOU BUY • FREE 5-PAGE PDF WITH P14 RHYTHM!"}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">
                {lang === "th"
                  ? "ดาวน์โหลดชุดทดลองฟรี 5 หน้า (รู้จักโน้ตตัวดำ-ขาว + ปรบมือจังหวะ 70 BPM!)"
                  : "Download the 5-Page Free Sample (Note Friends + 70 BPM Clapping Page!)"}
              </h2>

              <p className="text-sm text-slate-700 leading-relaxed">
                {lang === "th"
                  ? "คลิกโหลดไฟล์ PDF ความละเอียดสูงไปปริ้นท์ A4 ได้เลยทันทีไม่ต้องลงทะเบียน แล้วเปิดแทร็ก T03 (70 BPM) ด้านบนให้ลูกปรบมือตามโน้ตบนกระดาษได้เลยวันนี้ครับ"
                  : "Direct 1-click download — no login required. Print on A4 or US Letter and play Track T03 (70 BPM) above so your child can clap along immediately!"}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href="/edu/mu01/EDU-MU01_Freebie_5Pages_TH.pdf"
                  download="EDU-MU01_Freebie_5Pages_TH.pdf"
                  onClick={() =>
                    showToast(
                      "📥 กำลังดาวน์โหลดชุดดนตรีน้องข้าวต้มฟรี (5 หน้า) — ปริ้นท์ A4 แล้วมาปรบมือ 70 BPM กันเลย!"
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-700 hover:bg-sky-800 px-5 py-3 text-sm sm:text-base font-bold text-white shadow-md shadow-sky-600/20 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>โหลดฟรี 5 หน้า (ภาษาไทย • PDF)</span>
                </a>

                <a
                  href="/edu/mu01/EDU-MU01_Freebie_5Pages_EN.pdf"
                  download="EDU-MU01_Freebie_5Pages_EN.pdf"
                  onClick={() =>
                    showToast(
                      "📥 Downloading Khao Tom's English 5-Page Music Freebie PDF — ready to print!"
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
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-300 bg-purple-50 px-3 py-1 text-xs font-bold text-purple-900">
              <Layers className="w-3.5 h-3.5 text-purple-700" />
              <span>
                {lang === "th"
                  ? "BLUE OCEAN MUSIC KIT • 4/4 BEAT-SUM VERIFIED 100%"
                  : "BLUE OCEAN MUSIC KIT • 4/4 BEAT-SUM VERIFIED 100%"}
              </span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
              {lang === "th"
                ? "ปลดล็อกเล่มเต็ม 32 หน้า (ครบ 4 ไฟล์ TH/EN × สี/ขาวดำ)"
                : "Unlock the Complete 32-Page Music Workbook (4 PDFs)"}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === "th"
                ? "ครบ 5 บทเรียนดนตรีพื้นฐาน: ดัง-เบา/สูง-ต่ำ, 4 เพื่อนโน้ต, ปรบมือ 70/95 BPM, รู้จักเครื่องดนตรี 8 ชนิด, ระบายสีตามโน้ต + เฉลย P29–P30"
                : "5 structured music chapters: Dynamics & Pitch, 4 Note Friends, 70/95 BPM Clapping, 8 Instruments, Color-by-Note & Complete Answer Keys!"}
            </p>
          </div>

          {/* 4-Image Gallery */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {GALLERY_IMAGES.map((img, idx) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden text-left hover:border-purple-400 shadow-xs transition-all cursor-pointer"
              >
                <div className="aspect-square overflow-hidden bg-[#FAF5FF]">
                  <img
                    src={img.src}
                    alt={lang === "th" ? img.labelTh : img.labelEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
            <div className="rounded-3xl border-2 border-purple-300 bg-white p-6 flex flex-col justify-between space-y-6 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 border border-purple-300 px-3 py-1 text-xs font-extrabold text-purple-900">
                    <Home className="w-3.5 h-3.5" />
                    <span>HOME EDITION</span>
                  </span>
                  <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-xs font-bold text-emerald-900">
                    {lang === "th" ? "คุ้มสุดสำหรับบ้าน 4–6 ปี" : "Best for Families 4–6"}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#1E293B]">
                    {lang === "th"
                      ? "สิทธิ์ใช้ในครอบครัว (Personal Use)"
                      : "Family & Personal License"}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2.5 flex-wrap">
                    <span className="text-4xl font-extrabold text-purple-700">
                      {lang === "th" ? "129 ฿" : "$5.99"}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      {lang === "th" ? "199 ฿" : "$8.99"}
                    </span>
                    <span className="text-xs font-medium text-slate-600">
                      {lang === "th" ? "(จ่ายครั้งเดียว)" : "(129 THB • One-time)"}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm text-slate-700">
                  {(lang === "th"
                    ? [
                        "ใบงานดนตรี 32 หน้าเต็ม ครบ 5 บทเรียน + ควิซหูวิเศษ + ทายเสียง 8 เครื่องดนตรี",
                        "ใช้งานคู่ห้องซ้อมเสียง 6 แทร็ก QR บนเว็บนี้ได้ตลอดชีพ (ไร้โฆษณา)",
                        "ได้ครบ 4 ไฟล์ PDF: ภาษาไทย (สี/ขาวดำ) + อังกฤษ (สี/ขาวดำ)",
                        "Universal Safe Box ปริ้นท์ได้ทั้ง A4 & US Letter พร้อมเฉลยครบ P29–P30",
                      ]
                    : [
                        "Full 32-page music workbook across 5 fun beginner chapters",
                        "Lifetime access to this 6-track interactive QR Music Studio (Ad-free)",
                        "All 4 PDFs included: English (Color/B&W) + Thai (Color/B&W)",
                        "A4 & US Letter print-ready + complete Answer Keys & Certificate",
                      ]
                  ).map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={getEduOrderLineUrl({
                  sku: "EDU-MU01",
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
                    ? "สั่งซื้อ Home Edition (129 ฿) ทาง LINE"
                    : "Order Home Edition ($5.99 / 129 THB) via LINE"}
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
                      ? "สำหรับครูอนุบาล / ครูดนตรี"
                      : "Preschool & Music Teachers"}
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
                      {lang === "th" ? "249 ฿" : "$12.99"}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      {lang === "th" ? "349 ฿" : "$16.99"}
                    </span>
                    <span className="text-xs font-medium text-slate-600">
                      {lang === "th"
                        ? "(ปริ้นท์แจกเด็กไม่จำกัด)"
                        : "(249 THB • Unlimited copies)"}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm text-slate-700">
                  {(lang === "th"
                    ? [
                        "สิทธิ์ถูกกฎหมายสำหรับคุณครู 1 ท่าน ปริ้นท์แจกนักเรียนทั้งห้องได้ไม่จำกัด",
                        "ได้ครบทั้ง 4 ไฟล์ PDF (TH/EN × สี/ขาวดำ) + เวอร์ชันขาวดำถ่ายเอกสารคมชัด",
                        "เปิดห้องซ้อม 6 แทร็กนี้ขึ้นจอทีวี/ลำโพงหน้าห้องสอนปรบมือพร้อมกันได้ทันที",
                        "ครบเฉลย P29–P30 + ใบประกาศนียบัตรนักดนตรีน้อยแจกจบคอร์ส",
                      ]
                    : [
                        "Legal Classroom License for 1 teacher — unlimited student prints",
                        "All 4 PDFs (EN/TH × Color/B&W) with ink-saving photocopier mode",
                        "Project this 6-track Beat & Quiz Studio on classroom speakers/TV",
                        "Complete P29–P30 Answer Keys & printable Student Certificates",
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
                  sku: "EDU-MU01",
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
                    ? "สั่งซื้อ Class Edition (249 ฿) ทาง LINE"
                    : "Order Class Edition ($12.99 / 249 THB) via LINE"}
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 4: CROSS-SELL ALL-4 UNIVERSE BUNDLE (319 THB)
        ============================================================ */}
        <section className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-[#FEF9EF] via-white to-[#FAF5FF] p-5 sm:p-8 shadow-md space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-950">
                <Gift className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  {lang === "th"
                    ? "🔥 ALL-4 UNIVERSE BUNDLE ครบ 4 เล่ม Live 100% (128 หน้า)"
                    : "🔥 ALL-4 UNIVERSE BUNDLE — ALL 4 KITS LIVE (128 PAGES)"}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">
                {lang === "th"
                  ? "เหมาครบทั้งจักรวาล 4 เล่ม: EF + วินัย 30 วัน + Busy Book + ดนตรี"
                  : "Get All 4 Live Hybrid QR Kits (128 Pages • 16 PDFs)!"}
              </h2>

              <p className="text-sm text-slate-700 leading-relaxed">
                {lang === "th"
                  ? "ประหยัดทันที 107 ฿! ได้ครบทั้ง 4 เล่มพร้อมเว็บ Hybrid QR ใช้งานได้จริงครบทุกเล่มวันนี้ (เฉลี่ยเพียงเล่มละ 79.75 ฿ เท่านั้น)"
                  : "Save 107 THB instantly! Unlock all 4 workbooks (EF01, RT01, BB01, MU01 — 16 PDFs) with all 4 interactive Hybrid QR companions live today!"}
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border-2 border-amber-300 bg-white p-4 text-center space-y-3 min-w-[240px] shadow-sm">
              <div>
                <div className="text-xs text-slate-400 line-through">
                  {lang === "th" ? "ปกติ 426 ฿" : "Regular $20.96"}
                </div>
                <div className="text-3xl font-extrabold text-amber-700">
                  {lang === "th" ? "319 ฿" : "$14.99"}
                </div>
                <div className="text-[11px] font-bold text-emerald-700">
                  {lang === "th"
                    ? "ประหยัดทันที 107 ฿ • ครบ 4/4 Live!"
                    : "Save 25% • All 4 Live Today!"}
                </div>
              </div>

              <a
                href={getEduOrderLineUrl({
                  sku: "EDU-MU01",
                  edition: "ALL4_BUNDLE",
                  lang,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-500 px-4 py-2.5 text-sm font-extrabold text-slate-950 transition-colors"
              >
                <FaLine className="w-4 h-4 text-[#047857]" />
                <span>
                  {lang === "th"
                    ? "สั่งเหมา 4 เล่ม (319 ฿)"
                    : "Order All-4 Bundle"}
                </span>
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <Link
              href="/edu/ef01"
              className="inline-flex items-center gap-1.5 font-extrabold text-amber-800 hover:text-amber-950"
            >
              <span>{lang === "th" ? "EDU-EF01 แซลมอน EF" : "EDU-EF01 Brain EF"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/edu/rt01"
              className="inline-flex items-center gap-1.5 font-extrabold text-rose-700 hover:text-rose-900"
            >
              <span>{lang === "th" ? "EDU-RT01 แม่ใหญ่วินัย 30 วัน" : "EDU-RT01 30-Day Routine"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/edu/bb01"
              className="inline-flex items-center gap-1.5 font-extrabold text-pink-700 hover:text-pink-900"
            >
              <span>{lang === "th" ? "EDU-BB01 ชาบู Busy Book" : "EDU-BB01 Busy Book"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ============================================================
            SECTION 5: FAQ ACCORDION
        ============================================================ */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#1E293B]">
            <HelpCircle className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg sm:text-xl font-extrabold">
              {lang === "th"
                ? "คำถามที่พบบ่อย & วิธีสอนดนตรีเด็กเล็กที่บ้าน"
                : "Parent & Teacher Music Guide (FAQ)"}
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
                    className="w-full flex items-center justify-between gap-3 text-left text-sm sm:text-base font-bold text-[#1E293B] hover:text-purple-700 transition-colors cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180 text-purple-600" : ""
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
                  ? "รองรับ A4 & US Letter • ตรวจจังหวะ 4/4 เป๊ะ 100% • ไร้โฆษณา"
                  : "A4 & US Letter • 4/4 Beat Verified • 100% Ad-Free Kid Safe"}
              </span>
            </span>
            <Link
              href="/edu"
              className="text-purple-700 hover:underline font-bold"
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

            <div className="relative flex items-center justify-center bg-[#FAF5FF] rounded-2xl p-2">
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

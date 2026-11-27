"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Square,
  ChevronLeft,
  ChevronRight,
  SkipBack,
  SkipForward,
  Sparkles,
  Download,
  Printer,
  Gift,
  Layers,
  Home,
  School,
  CheckCircle2,
  X,
  HelpCircle,
  ChevronDown,
  MessageCircleHeart,
  Moon,
  Bell,
  Star,
  ArrowRight,
  Lock,
} from "lucide-react";
import { FaLine } from "react-icons/fa6";
import { playSoftTapChime } from "@/lib/eduPhonicsAudio";
import type { EduLang } from "@/lib/eduCatalog";
import {
  SERIES_SEASON_1_BOOKS,
  type StorybookConfig,
  getNextBookWaitlistLineUrl,
  getStorybookOrderLineUrl,
} from "@/lib/storybookCatalog";

interface StorybookHubViewProps {
  book: StorybookConfig;
  renderWidget?: (ctx: { lang: EduLang; soundEnabled: boolean }) => React.ReactNode;
}

export function StorybookHubView({ book, renderWidget }: StorybookHubViewProps) {
  const [lang, setLang] = useState<EduLang>("th");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [speechRate, setSpeechRate] = useState<number>(0.82);

  // Audio Storybook Player State
  const [pageIdx, setPageIdx] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);
  const autoAdvanceRef = useRef<boolean>(true);

  // Habit Loop: Bedtime Reading Night Counter (localStorage)
  const [nightsRead, setNightsRead] = useState<number>(0);
  const [loggedTonight, setLoggedTonight] = useState<boolean>(false);

  // Lightbox & FAQ
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const storageKey = `aiaon_storybook_nights_${book.slug}`;
  const currentSummary = SERIES_SEASON_1_BOOKS.find((b) => b.sku === book.sku);
  const nextBook =
    SERIES_SEASON_1_BOOKS.find((b) => b.bookNo === book.bookNo + 1) ?? null;

  useEffect(() => {
    autoAdvanceRef.current = autoAdvance;
  }, [autoAdvance]);

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

      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!Number.isNaN(parsed) && parsed > 0) setNightsRead(parsed);
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
  }, [storageKey]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((p) => (p === null ? null : (p + 1) % book.galleryImages.length));
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((p) =>
          p === null ? null : (p - 1 + book.galleryImages.length) % book.galleryImages.length
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, book.galleryImages.length]);

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

  const speakPage = (idx: number, currentLang: EduLang = lang) => {
    if (!soundEnabled) {
      showToast(
        currentLang === "th"
          ? "🔇 กำลังปิดเสียงอยู่ — กดปุ่มเปิดเสียงมุมบนขวาก่อนนะครับ"
          : "🔇 Sound is muted — tap Sound On at top right first!"
      );
      return;
    }
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      showToast("Web Speech API is unavailable on this browser.");
      return;
    }

    const item = book.pages[idx];
    if (!item) return;

    try {
      window.speechSynthesis.cancel();
      const text = (currentLang === "th" ? item.linesTh : item.linesEn).join(" ");
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = currentLang === "th" ? "th-TH" : "en-US";
      utter.rate = speechRate;
      utter.pitch = 1.03;

      const voices = window.speechSynthesis.getVoices();
      const prefix = currentLang === "th" ? "th" : "en-us";
      const match =
        voices.find((v) => v.lang.toLowerCase().startsWith(prefix)) ??
        voices.find((v) => v.lang.toLowerCase().startsWith(currentLang));
      if (match) utter.voice = match;

      utter.onstart = () => setIsSpeaking(true);
      utter.onend = () => {
        setIsSpeaking(false);
        if (autoAdvanceRef.current && idx < book.pages.length - 1) {
          const nextIdx = idx + 1;
          setPageIdx(nextIdx);
          setTimeout(() => speakPage(nextIdx, currentLang), 650);
        }
      };
      utter.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utter);
    } catch {
      setIsSpeaking(false);
    }
  };

  const goToPage = (idx: number, playImmediately = false) => {
    const safe = Math.max(0, Math.min(book.pages.length - 1, idx));
    stopSpeech();
    setPageIdx(safe);
    if (playImmediately) {
      setTimeout(() => speakPage(safe, lang), 80);
    }
  };

  const handleLogBedtimeStar = () => {
    if (loggedTonight) return;
    const nextCount = nightsRead + 1;
    setNightsRead(nextCount);
    setLoggedTonight(true);
    if (soundEnabled) playSoftTapChime(659.25);
    try {
      window.localStorage.setItem(storageKey, String(nextCount));
    } catch {
      // ignore
    }
    showToast(
      lang === "th"
        ? `⭐ สะสมดาวคืนที่ ${nextCount} สำเร็จ! เก่งมากเลยเด็กดี`
        : `⭐ Night #${nextCount} star collected! Sweet dreams!`
    );
  };

  const currentStory = book.pages[pageIdx];
  const isLastStoryPage = pageIdx === book.pages.length - 1;

  return (
    <div className="w-full overflow-x-hidden bg-[#FFFDF7] text-[#1E293B] -mt-4 md:-mt-8 pt-6 md:pt-10 pb-16 sm:pb-20 border-b border-indigo-200/80">
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-2xl border-2 border-indigo-300 bg-white px-4 py-3 text-sm font-bold text-[#1E293B] shadow-xl">
          {toastMsg}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        {/* TOP NAV */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/edu"
            className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-white hover:bg-indigo-50 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-indigo-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>
              {lang === "th" ? "กลับคลังสื่อ AiAon Edu-Verse" : "Back to Edu-Verse Hub"}
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            {nightsRead > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-extrabold text-amber-950">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                <span>
                  {lang === "th" ? `อ่านแล้ว ${nightsRead} คืน` : `${nightsRead} Nights Read`}
                </span>
              </span>
            )}

            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setSpeechRate(0.76)}
                className={`rounded-full px-2.5 py-1 cursor-pointer ${
                  speechRate <= 0.8 ? "bg-amber-400 text-slate-950" : "text-slate-600"
                }`}
              >
                {lang === "th" ? "ช้าก่อนนอน" : "Bedtime Slow"}
              </button>
              <button
                type="button"
                onClick={() => setSpeechRate(0.92)}
                className={`rounded-full px-2.5 py-1 cursor-pointer ${
                  speechRate > 0.8 ? "bg-indigo-600 text-white" : "text-slate-600"
                }`}
              >
                {lang === "th" ? "ปกติ" : "Normal"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (soundEnabled) stopSpeech();
                setSoundEnabled((v) => !v);
              }}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold cursor-pointer ${
                soundEnabled
                  ? "border-indigo-300 bg-indigo-600 text-white"
                  : "border-slate-300 bg-white text-slate-600"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>
                {soundEnabled
                  ? lang === "th"
                    ? "เปิดเสียง"
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
                  lang === "th" ? "bg-indigo-600 text-white" : "text-slate-600"
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
                <Moon className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>{lang === "th" ? book.badgeTh : book.badgeEn}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight">
                {lang === "th" ? book.heroPrefixTh : book.heroPrefixEn}{" "}
                <span className="text-indigo-700">
                  {lang === "th" ? book.titleTh : book.titleEn}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {lang === "th" ? book.heroDescTh : book.heroDescEn}
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="#audio-storybook"
                  className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {lang === "th"
                      ? `เปิดเล่านิทานพร้อมเสียง (${book.pages.length} หน้า)`
                      : "Open Audio Storybook"}
                  </span>
                </a>
                <a
                  href="#freebie"
                  className="inline-flex items-center gap-2 rounded-2xl border-2 border-amber-300 bg-amber-50 hover:bg-amber-100 px-5 py-3 text-sm font-bold text-amber-950 transition-colors"
                >
                  <Download className="w-4 h-4 text-amber-700" />
                  <span>
                    {lang === "th" ? "โหลดตัวอย่างฟรี 5 หน้า (0 ฿)" : "Free 5-Page Sample PDF"}
                  </span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-52 sm:w-60 rounded-2xl overflow-hidden border-4 border-indigo-200 shadow-lg bg-white">
                <img
                  src={book.coverImage}
                  alt={book.coverAlt}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE AUDIO STORYBOOK PLAYER + PLUGGABLE WIDGET */}
        <section id="audio-storybook" className="grid grid-cols-1 lg:grid-cols-12 gap-6 scroll-mt-24">
          {/* LEFT 8 COLS: AUDIO STORYBOOK READER */}
          <div className="lg:col-span-8 rounded-3xl border-2 border-indigo-200 bg-white p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-700">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>HYBRID QR TOOL #1 • AUDIO STORYBOOK PLAYER</span>
                </span>
                <h2 className="text-xl font-extrabold text-[#0F172A]">
                  {lang === "th"
                    ? "🎧 เล่านิทานก่อนนอนพร้อมภาพประกอบจริง"
                    : "🎧 Interactive Bedtime Audio Storybook"}
                </h2>
              </div>
              <span className="rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-extrabold text-amber-950">
                {lang === "th" ? currentStory.tagTh : currentStory.tagEn}
              </span>
            </div>

            {/* Illustration Plate */}
            <div className="rounded-2xl overflow-hidden border-2 border-indigo-100 bg-[#FEF9EF] aspect-[4/3]">
              <img
                src={currentStory.image}
                alt={lang === "th" ? currentStory.tagTh : currentStory.tagEn}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Story Copy Card */}
            <div className="rounded-2xl border-2 border-amber-200 bg-[#FFFDF7] px-5 py-5 text-center space-y-1.5">
              {(lang === "th" ? currentStory.linesTh : currentStory.linesEn).map((line, i) => (
                <p key={i} className="text-base sm:text-lg font-bold text-[#0F172A] leading-relaxed">
                  {line}
                </p>
              ))}
            </div>

            {/* END-OF-STORY HABIT STAR + NEXT EPISODE TEASER (Shows on final page!) */}
            {isLastStoryPage && (
              <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-[#FFFDF7] to-pink-50 p-4 sm:p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-sm sm:text-base font-extrabold text-[#0F172A]">
                      {lang === "th"
                        ? "🌟 อ่านจบเล่มแล้ว! กดเก็บดาวก่อนนอนคืนนี้กันเถอะ"
                        : "🌟 Story Complete! Collect Tonight's Bedtime Star!"}
                    </p>
                    <p className="text-xs text-slate-600">
                      {lang === "th"
                        ? `สะสมแล้ว ${nightsRead} คืน — เปิดอ่านซ้ำทุกคืนช่วยสร้างวินัยการนอนได้ดีเยี่ยม`
                        : `${nightsRead} nights collected — repeating bedtime stories builds calm sleep habits.`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogBedtimeStar}
                    disabled={loggedTonight}
                    className={`shrink-0 inline-flex items-center justify-center gap-1.5 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-extrabold cursor-pointer transition-colors ${
                      loggedTonight
                        ? "bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-default"
                        : "bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-xs"
                    }`}
                  >
                    <Star className={`w-4 h-4 ${loggedTonight ? "fill-emerald-600" : "fill-slate-900"}`} />
                    <span>
                      {loggedTonight
                        ? lang === "th"
                          ? "เก็บดาวคืนนี้แล้ว!"
                          : "Star Collected!"
                        : lang === "th"
                          ? "กดรับดาวคืนนี้ (+1 ⭐)"
                          : "Collect Tonight's Star"}
                    </span>
                  </button>
                </div>

                {nextBook && (
                  <div className="rounded-2xl border border-pink-200 bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-pink-700 uppercase">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>
                          {lang === "th"
                            ? `ตอนต่อไป • เล่มที่ ${nextBook.bookNo} (${nextBook.sku})`
                            : `Next Episode • Book ${nextBook.bookNo} (${nextBook.sku})`}
                        </span>
                      </span>
                      <p className="text-sm sm:text-base font-extrabold text-[#0F172A]">
                        {nextBook.emoji} {lang === "th" ? nextBook.titleTh : nextBook.titleEn}
                      </p>
                      <p className="text-xs text-slate-600">
                        {lang === "th"
                          ? `${nextBook.characterTh} • ${nextBook.topicTh} — ลงชื่อรับแจ้งเตือนทาง LINE รับสิทธิ์ลดเปิดตัว 20฿!`
                          : `${nextBook.characterEn} • ${nextBook.topicEn} — Get notified first via LINE!`}
                      </p>
                    </div>
                    <a
                      href={getNextBookWaitlistLineUrl(nextBook, lang)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] px-4 py-2.5 text-xs font-extrabold text-white transition-colors"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>
                        {lang === "th" ? "แจ้งเตือนเมื่อเล่ม 2 ออก" : "Notify Me on Launch"}
                      </span>
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Player Controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => (isSpeaking ? stopSpeech() : speakPage(pageIdx, lang))}
                className={`flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm sm:text-base font-bold text-white cursor-pointer transition-colors ${
                  isSpeaking ? "bg-rose-600 hover:bg-rose-700" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isSpeaking ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>
                  {isSpeaking
                    ? lang === "th"
                      ? "หยุดเสียงเล่า"
                      : "Stop Reading"
                    : lang === "th"
                      ? `🔊 เล่าหน้านี้ให้ฟัง (${pageIdx + 1}/${book.pages.length})`
                      : `🔊 Read Page ${pageIdx + 1}/${book.pages.length} Aloud`}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setAutoAdvance((v) => !v)}
                className={`rounded-2xl border-2 px-3.5 py-3 text-xs font-extrabold cursor-pointer transition-colors ${
                  autoAdvance
                    ? "border-emerald-400 bg-emerald-50 text-emerald-900"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                {autoAdvance
                  ? lang === "th"
                    ? "🔁 พลิกหน้าอัตโนมัติ: เปิด"
                    : "🔁 Auto-Flip: ON"
                  : lang === "th"
                    ? "🔁 พลิกหน้าอัตโนมัติ: ปิด"
                    : "🔁 Auto-Flip: OFF"}
              </button>

              <div className="inline-flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => goToPage(pageIdx - 1, false)}
                  disabled={pageIdx === 0}
                  className="inline-flex items-center gap-1 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 px-3.5 py-3 text-xs sm:text-sm font-bold text-slate-800 cursor-pointer"
                >
                  <SkipBack className="w-4 h-4" />
                  <span>{lang === "th" ? "ก่อนหน้า" : "Prev"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => goToPage(pageIdx + 1, false)}
                  disabled={pageIdx === book.pages.length - 1}
                  className="inline-flex items-center gap-1 rounded-2xl border-2 border-amber-300 bg-amber-100 hover:bg-amber-200 disabled:opacity-40 px-3.5 py-3 text-xs sm:text-sm font-bold text-amber-950 cursor-pointer"
                >
                  <span>{lang === "th" ? "หน้าถัดไป" : "Next"}</span>
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Page Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {book.pages.map((sp, i) => (
                <button
                  key={sp.pageNo}
                  type="button"
                  onClick={() => goToPage(i, false)}
                  className={`w-9 h-9 rounded-xl border text-xs font-extrabold cursor-pointer transition-all ${
                    i === pageIdx
                      ? "border-indigo-600 bg-indigo-600 text-white shadow-xs"
                      : "border-slate-200 bg-[#FFFDF7] text-slate-700 hover:border-indigo-400"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT 4 COLS: PLUGGABLE WIDGET + DIALOGIC QUESTIONS */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {renderWidget && renderWidget({ lang, soundEnabled })}

            {/* 3 Bedtime Dialogic Questions */}
            <div className="rounded-3xl border-2 border-amber-200 bg-[#FEF9EF] p-5 space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <MessageCircleHeart className="w-5 h-5 text-amber-700 shrink-0" />
                <h3 className="text-base font-extrabold text-[#0F172A]">
                  {lang === "th" ? "3 คำถามชวนลูกคุยหลังอ่านจบ" : "3 Gentle Talk Questions"}
                </h3>
              </div>
              <div className="space-y-2.5">
                {book.dialogicQuestions.map((q) => (
                  <div
                    key={q.th}
                    className="rounded-2xl border border-amber-200/80 bg-white p-3.5 text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed"
                  >
                    {q.emoji} {lang === "th" ? q.th : q.en}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6-BOOK SERIES COLLECTION MAP (KID-PULL + SERIES RETENTION) */}
        <section className="rounded-3xl border-2 border-indigo-200 bg-white p-5 sm:p-7 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-extrabold text-amber-950">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  {lang === "th"
                    ? "THE 6 CATS GENTLE HEART SERIES • SEASON 1 (6 เล่ม)"
                    : "THE 6 CATS GENTLE HEART SERIES • SEASON 1 (6 BOOKS)"}
                </span>
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                {lang === "th"
                  ? "🐾 แผนที่สะสมนิทานพลังใจแก๊ง 6 แมว — เล่มไหนที่ลูกอยากอ่านต่อไป?"
                  : "🐾 Collect All 6 Gentle Heart Stories"}
              </h2>
            </div>
            {nextBook && (
              <a
                href={getNextBookWaitlistLineUrl(nextBook, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] px-4 py-2.5 text-xs sm:text-sm font-extrabold text-white transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span>
                  {lang === "th"
                    ? `รับแจ้งเตือนเล่ม ${nextBook.bookNo}: ${nextBook.characterTh}`
                    : `Notify Me: Book ${nextBook.bookNo}`}
                </span>
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {SERIES_SEASON_1_BOOKS.map((item) => {
              const isCurrent = item.sku === book.sku;
              const isLive = item.status === "live";
              const isNext = item.status === "next";

              return (
                <div
                  key={item.sku}
                  className={`rounded-2xl border-2 p-4 flex flex-col justify-between gap-3 transition-all ${
                    isCurrent
                      ? "border-indigo-500 bg-[#EEF2FF]/70 shadow-xs"
                      : isNext
                        ? "border-amber-400 bg-amber-50/60"
                        : isLive
                          ? "border-emerald-300 bg-emerald-50/40"
                          : "border-slate-200 bg-[#FFFDF7]"
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-extrabold text-slate-700">
                        {item.emoji} Book {item.bookNo} • {item.sku}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                          isCurrent
                            ? "bg-indigo-600 text-white"
                            : isNext
                              ? "bg-amber-500 text-slate-950"
                              : isLive
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {isCurrent
                          ? lang === "th"
                            ? "กำลังอ่าน"
                            : "READING"
                          : isNext
                            ? lang === "th"
                              ? "เล่มถัดไป!"
                              : "NEXT UP"
                            : isLive
                              ? lang === "th"
                                ? "พร้อมอ่าน"
                                : "LIVE"
                              : lang === "th"
                                ? "เร็วๆ นี้"
                                : "COMING SOON"}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-[#0F172A]">
                      {lang === "th" ? item.titleTh : item.titleEn}
                    </h3>
                    <p className="text-xs text-slate-600">
                      {lang === "th"
                        ? `${item.characterTh} • ${item.topicTh}`
                        : `${item.characterEn} • ${item.topicEn}`}
                    </p>
                  </div>

                  <div className="pt-1 flex items-center justify-between gap-2 border-t border-slate-200/70">
                    <Link
                      href={`/edu/${item.pairedWorkbookSlug}`}
                      className="text-[11px] font-bold text-indigo-700 hover:underline inline-flex items-center gap-1"
                    >
                      <span>
                        {lang === "th"
                          ? `คู่ใบงาน ${item.pairedWorkbookSku}`
                          : `Pairs w/ ${item.pairedWorkbookSku}`}
                      </span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    {isLive && !isCurrent ? (
                      <Link
                        href={`/edu/${item.slug}`}
                        className="text-xs font-extrabold text-emerald-700 hover:underline"
                      >
                        {lang === "th" ? "เปิดอ่าน →" : "Open →"}
                      </Link>
                    ) : isNext ? (
                      <a
                        href={getNextBookWaitlistLineUrl(item, lang)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-extrabold text-amber-800 hover:underline"
                      >
                        {lang === "th" ? "เตือนฉันทาง LINE →" : "Waitlist →"}
                      </a>
                    ) : !isCurrent ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400">
                        <Lock className="w-3 h-3" />
                        <span>Season 1</span>
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FREEBIE 5-PAGE DOWNLOAD */}
        <section
          id="freebie"
          className="rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-white to-[#EEF2FF] p-6 sm:p-7 shadow-sm space-y-4 scroll-mt-24"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-extrabold text-amber-950">
                <Gift className="w-3.5 h-3.5 text-amber-700" />
                <span>FREE 5-PAGE SAMPLE • โหลดฟรี 0 ฿ ไม่ต้องสมัครสมาชิก</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                {lang === "th" ? book.freebieTitleTh : book.freebieTitleEn}
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={book.freebieThUrl}
                download
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>โหลดฟรี 5 หน้า (ภาษาไทย)</span>
              </a>
              <a
                href={book.freebieEnUrl}
                download
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-indigo-300 bg-white hover:bg-indigo-50 px-5 py-3.5 text-sm font-bold text-indigo-900 transition-colors"
              >
                <Printer className="w-4 h-4 text-indigo-700" />
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
                ? "👀 ส่องตัวอย่างนิทานครบ 16 หน้า (คลิกขยายได้)"
                : "👀 Peek Inside the 16-Page Storybook"}
            </h2>
            <span className="text-xs font-bold text-indigo-700">4 Mockups • Full Color</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {book.galleryImages.map((img, idx) => (
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

        {/* 3-TIER PRICING: HOME (79฿) + HERO PAIR UPSELL (149฿) + CLASS (159฿) */}
        <section id="order" className="space-y-5">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 border border-indigo-300 px-3 py-1 text-xs font-extrabold text-indigo-900">
              <Layers className="w-3.5 h-3.5" />
              <span>DUAL-EDITION LICENSE • ได้ครบ 2 ภาษา (TH + EN สีเต็มรูปแบบ)</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              {lang === "th"
                ? "สั่งซื้อนิทานฉบับเต็ม 16 หน้า หรือจับคู่ใบงาน 32 หน้าสุดคุ้ม!"
                : "Get the Full 16-Page Storybook or Best-Value Pair Bundle"}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* CARD 1: HOME EDITION */}
            <div className="rounded-3xl border-2 border-indigo-300 bg-white p-6 flex flex-col justify-between gap-5 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-extrabold text-indigo-900">
                    <Home className="w-3.5 h-3.5" />
                    <span>HOME EDITION</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">16 หน้า • TH+EN</span>
                </div>
                <div className="flex items-baseline gap-2.5">
                  <strong className="text-4xl font-extrabold text-indigo-700">
                    {book.priceHomeThb} ฿
                  </strong>
                  <span className="text-sm text-slate-400 line-through">
                    {book.priceHomeRegularThb} ฿
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    ({book.priceHomeUsd})
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {book.homeBulletsTh.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={getStorybookOrderLineUrl({ book, mode: "HOME", lang })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] px-5 py-3.5 text-sm sm:text-base font-bold text-white shadow-sm transition-colors"
              >
                <FaLine className="w-5 h-5" />
                <span>สั่งซื้อ HOME ({book.priceHomeThb} ฿)</span>
              </a>
            </div>

            {/* CARD 2: HERO PAIR UPSELL (149฿) */}
            {currentSummary && (
              <div className="rounded-3xl border-2 border-amber-500 bg-gradient-to-b from-amber-50/70 via-white to-white p-6 flex flex-col justify-between gap-5 shadow-lg relative">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold text-slate-950">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>BEST VALUE • แพ็กคู่สุดคุ้ม</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-900">
                      48 หน้าเต็ม!
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2.5">
                    <strong className="text-4xl font-extrabold text-amber-700">
                      {currentSummary.pairPriceThb} ฿
                    </strong>
                    <span className="text-sm text-slate-400 line-through">
                      {currentSummary.regularPairThb} ฿
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700">
                      ประหยัด {currentSummary.regularPairThb - currentSummary.pairPriceThb} ฿
                    </span>
                  </div>
                  <p className="text-xs font-bold text-amber-950 bg-amber-100/80 border border-amber-200 rounded-xl px-3 py-2">
                    📖 นิทาน {book.sku} (16 หน้า) + 🎨 ใบงาน {currentSummary.pairedWorkbookSku} (32 หน้า) — พร้อมส่งทันที 100%
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {[
                      `ได้ครบนิทานภาพ ${book.sku} (16 หน้า TH+EN) อ่านก่อนนอน`,
                      `ได้ครบสมุดใบงาน ${currentSummary.pairedWorkbookSku} (32 หน้า สี+ขาวดำ TH+EN)`,
                      currentSummary.pairedWorkbookDescTh,
                      "ปลดล็อกใช้งาน Hybrid Web App ฟรีทั้ง 2 หน้าตลอดชีพ!",
                    ].map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={getStorybookOrderLineUrl({ book, mode: "PAIR", lang })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-600 px-5 py-3.5 text-sm sm:text-base font-extrabold text-slate-950 shadow-sm transition-colors"
                >
                  <FaLine className="w-5 h-5" />
                  <span>สั่งแพ็กคู่สุดคุ้ม ({currentSummary.pairPriceThb} ฿)</span>
                </a>
              </div>
            )}

            {/* CARD 3: CLASS EDITION */}
            <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 flex flex-col justify-between gap-5 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-900">
                    <School className="w-3.5 h-3.5" />
                    <span>CLASS EDITION • 1 ห้องเรียน</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">Classroom</span>
                </div>
                <div className="flex items-baseline gap-2.5">
                  <strong className="text-4xl font-extrabold text-slate-900">
                    {book.priceClassThb} ฿
                  </strong>
                  <span className="text-sm text-slate-400 line-through">
                    {book.priceClassRegularThb} ฿
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    ({book.priceClassUsd})
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {book.classBulletsTh.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={getStorybookOrderLineUrl({ book, mode: "CLASS", lang })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-700 hover:bg-indigo-800 px-5 py-3.5 text-sm sm:text-base font-bold text-white shadow-sm transition-colors"
              >
                <FaLine className="w-5 h-5 text-[#06C755]" />
                <span>สั่งซื้อ CLASS ({book.priceClassThb} ฿)</span>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-700" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
              {lang === "th" ? "คำถามที่พบบ่อย (FAQ)" : "Frequently Asked Questions"}
            </h2>
          </div>
          <div className="space-y-2.5">
            {book.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.qTh}
                  className="rounded-2xl border border-indigo-200/80 bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-indigo-50/50"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#0F172A]">
                      {lang === "th" ? faq.qTh : faq.qEn}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-indigo-700 shrink-0 transition-transform ${
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

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-indigo-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-[#FFFDF7]">
              <span className="text-xs sm:text-sm font-bold text-[#0F172A]">
                {lightboxIndex + 1}/{book.galleryImages.length} —{" "}
                {lang === "th"
                  ? book.galleryImages[lightboxIndex].labelTh
                  : book.galleryImages[lightboxIndex].labelEn}
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
                src={book.galleryImages[lightboxIndex].src}
                alt={book.galleryImages[lightboxIndex].labelEn}
                className="max-h-[75vh] w-auto object-contain"
              />
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + book.galleryImages.length) % book.galleryImages.length
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
                  setLightboxIndex((lightboxIndex + 1) % book.galleryImages.length)
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

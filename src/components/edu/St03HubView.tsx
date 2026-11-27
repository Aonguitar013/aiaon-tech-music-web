"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Square, Timer, RotateCcw, Star } from "lucide-react";
import { playSoftTapChime } from "@/lib/eduPhonicsAudio";
import type { EduLang } from "@/lib/eduCatalog";
import { ST03_CONFIG } from "@/lib/storybookCatalog";
import { StorybookHubView } from "@/components/edu/StorybookHubView";

interface RoutinePreset {
  id: string;
  seconds: number;
  emoji: string;
  labelTh: string;
  labelEn: string;
  hintTh: string;
  hintEn: string;
}

const ROUTINE_MODES: RoutinePreset[] = [
  {
    id: "tidy",
    seconds: 300,
    emoji: "🧸",
    labelTh: "1. เก็บของเล่น (5 น.)",
    labelEn: "1. Tidy Up (5m)",
    hintTh: "ก้าวที่ 1: ส่งของเล่นทุกชิ้นกลับบ้านก่อนหมดเวลา!",
    hintEn: "Step 1: Send every toy back home before the chime!",
  },
  {
    id: "wash",
    seconds: 120,
    emoji: "🪥",
    labelTh: "2. ล้างหน้า-แปรงฟัน (2 น.)",
    labelEn: "2. Wash & Brush (2m)",
    hintTh: "ก้าวที่ 2: ล้างหน้าเย็นฉ่ำ แปรงฟันยิ้มแฉ่งให้สดชื่น!",
    hintEn: "Step 2: Splash fresh water & brush for a bright smile!",
  },
  {
    id: "pack",
    seconds: 300,
    emoji: "🎒",
    labelTh: "3. แต่งตัว-กระเป๋า (5 น.)",
    labelEn: "3. Dress & Pack (5m)",
    hintTh: "ก้าวที่ 3: สวมชุดเก่ง เตรียมกระเป๋า และวางรองเท้าให้พร้อม!",
    hintEn: "Step 3: Get dressed, pack your bag & line up your shoes!",
  },
  {
    id: "calm",
    seconds: 600,
    emoji: "🌙",
    labelTh: "4. กอดอุ่นก่อนนอน (10 น.)",
    labelEn: "4. Calm Wind-Down (10m)",
    hintTh: "โหมดเย็นใจ: เตรียมตัวเข้านอน อ่านนิทาน และกอดอุ่นๆ",
    hintEn: "Cozy mode: Storytime, warm hugs & peaceful bedtime.",
  },
];

function CalmMorningTimerWidget({
  lang,
  soundEnabled,
}: {
  lang: EduLang;
  soundEnabled: boolean;
}) {
  const [modeIdx, setModeIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(ROUTINE_MODES[0].seconds);
  const [stars, setStars] = useState(0);

  const activeMode = ROUTINE_MODES[modeIdx];

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setRunning(false);
          setStars((s) => Math.min(20, s + 1));
          if (soundEnabled) {
            playSoftTapChime(523.25);
            setTimeout(() => playSoftTapChime(659.25), 180);
            setTimeout(() => playSoftTapChime(783.99), 360);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [running, soundEnabled]);

  const selectMode = (idx: number) => {
    setModeIdx(idx);
    setRunning(false);
    setRemaining(ROUTINE_MODES[idx].seconds);
    if (soundEnabled) playSoftTapChime(440 + idx * 45);
  };

  const toggleTimer = () => {
    if (running) {
      setRunning(false);
    } else {
      if (remaining === 0) setRemaining(activeMode.seconds);
      if (soundEnabled) playSoftTapChime(493.88);
      setRunning(true);
    }
  };

  const resetTimer = () => {
    setRunning(false);
    setRemaining(activeMode.seconds);
  };

  const dropStar = () => {
    setStars((s) => (s >= 20 ? 1 : s + 1));
    if (soundEnabled) {
      playSoftTapChime(659.25);
      setTimeout(() => playSoftTapChime(880), 120);
    }
  };

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="rounded-3xl border-2 border-rose-200 bg-gradient-to-br from-rose-50 via-white to-[#FEF9EF] p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-rose-700">
            <Timer className="w-3.5 h-3.5" />
            <span>HYBRID QR TOOL #2 • P06–P11</span>
          </span>
          <h2 className="text-lg font-extrabold text-[#0F172A]">
            {lang === "th"
              ? "💖 นาฬิกากิจวัตร 4 โหมด + ขวดโหลดาวทอง"
              : "💖 4-Mode Routine Timer & Star Jar"}
          </h2>
        </div>
        <button
          type="button"
          onClick={dropStar}
          title={lang === "th" ? "กดหยอดดาวทอง +1 ดวง" : "Tap to drop +1 Golden Star"}
          className="inline-flex items-center gap-1 rounded-full bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3 py-1 text-xs font-extrabold text-amber-900 cursor-pointer transition-colors"
        >
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span>
            {stars}/20 {lang === "th" ? "ดาว" : "★"}
          </span>
        </button>
      </div>

      {/* 4 Mode Preset Buttons */}
      <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
        {ROUTINE_MODES.map((m, idx) => (
          <button
            key={m.id}
            type="button"
            onClick={() => selectMode(idx)}
            className={`rounded-xl px-2.5 py-2 text-left border transition-colors cursor-pointer ${
              idx === modeIdx
                ? "border-rose-400 bg-rose-100 text-rose-900"
                : "border-slate-200 bg-white text-slate-600 hover:bg-rose-50"
            }`}
          >
            {m.emoji} {lang === "th" ? m.labelTh : m.labelEn}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center py-1 gap-2.5">
        <div
          className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center transition-all ${
            remaining === 0
              ? "border-emerald-400 bg-emerald-50 scale-105"
              : running
                ? "border-rose-400 bg-rose-50 scale-105"
                : "border-rose-200 bg-white"
          }`}
        >
          <span className="text-3xl font-extrabold text-[#0F172A] tabular-nums">
            {timeStr}
          </span>
          <span className="text-[11px] font-bold text-slate-500">
            {remaining === 0
              ? "⭐ +1 STAR!"
              : running
                ? activeMode.emoji + " GO!"
                : `${Math.round(activeMode.seconds / 60)} MIN`}
          </span>
        </div>

        <p className="text-xs sm:text-sm font-bold text-center text-[#0F172A] leading-snug">
          {remaining === 0
            ? lang === "th"
              ? "🌟 เย้! ทำเสร็จทันเวลา รับดาวทองหยอดขวดโหล +1 ดวง!"
              : "🌟 Awesome job! You earned +1 Golden Star for your jar!"
            : lang === "th"
              ? activeMode.hintTh
              : activeMode.hintEn}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={toggleTimer}
          className={`flex-1 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white cursor-pointer transition-colors ${
            running ? "bg-slate-700 hover:bg-slate-800" : "bg-rose-600 hover:bg-rose-700"
          }`}
        >
          {running ? <Square className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          <span>
            {running
              ? lang === "th"
                ? "พักชั่วคราว"
                : "Pause"
              : remaining === 0
                ? lang === "th"
                  ? "เริ่มรอบใหม่"
                  : "Start Again"
                : lang === "th"
                  ? "เริ่มจับเวลากิจวัตร"
                  : "Start Routine Timer"}
          </span>
        </button>
        <button
          type="button"
          onClick={resetTimer}
          aria-label="Reset routine timer"
          className="rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-3 text-slate-700 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function St03HubView() {
  return (
    <StorybookHubView
      book={ST03_CONFIG}
      renderWidget={({ lang, soundEnabled }) => (
        <CalmMorningTimerWidget lang={lang} soundEnabled={soundEnabled} />
      )}
    />
  );
}

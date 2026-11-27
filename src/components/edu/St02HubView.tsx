"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Square, Timer, RotateCcw } from "lucide-react";
import { playSoftTapChime } from "@/lib/eduPhonicsAudio";
import type { EduLang } from "@/lib/eduCatalog";
import { ST02_CONFIG } from "@/lib/storybookCatalog";
import { StorybookHubView } from "@/components/edu/StorybookHubView";

const TOTAL_BRUSH_SEC = 120;

function SparkleBrushTimerWidget({
  lang,
  soundEnabled,
}: {
  lang: EduLang;
  soundEnabled: boolean;
}) {
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(TOTAL_BRUSH_SEC);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setRunning(false);
          setCompletedCount((c) => c + 1);
          if (soundEnabled) {
            playSoftTapChime(523.25);
            setTimeout(() => playSoftTapChime(659.25), 180);
            setTimeout(() => playSoftTapChime(783.99), 360);
          }
          return 0;
        }
        if (prev === 81 || prev === 41) {
          if (soundEnabled) playSoftTapChime(587.33);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [running, soundEnabled]);

  const elapsed = TOTAL_BRUSH_SEC - remaining;
  const stage =
    remaining === 0
      ? 4
      : elapsed < 40
        ? 1
        : elapsed < 80
          ? 2
          : 3;

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;

  const stageLabel =
    stage === 4
      ? lang === "th"
        ? "🌟 เย้! ครบ 2 นาที ฟันขาววิ้ง ปราบแมงกินฟันสำเร็จ!"
        : "🌟 Mission Complete! 2-Minute Sparkle Smile!"
      : !running && remaining === TOTAL_BRUSH_SEC
        ? lang === "th"
          ? "กดเริ่มภารกิจ 3 ด่าน แปรงฟัน 2 นาทีพร้อมน้องชาบู!"
          : "Tap Start for Captain Shabu's 2-Min Brushing Mission!"
        : stage === 1
          ? lang === "th"
            ? "ด่าน 1 (0–40 วิ): วนเป็นวงกลมฟันหน้าและข้างนอก!"
            : "Stage 1: Gentle Sparkle Circles Outside!"
          : stage === 2
            ? lang === "th"
              ? "ด่าน 2 (40–80 วิ): อ้าปากกว้างถูฟันกรามด้านใน!"
              : "Stage 2: Open Wide & Scrub Back Molars!"
            : lang === "th"
              ? "ด่าน 3 (80–120 วิ): ปัดลิ้นเบาๆ 3 ที + บ้วนน้ำปิ๊ง!"
              : "Stage 3: Brush Tongue & Rinse Clean!";

  const toggleTimer = () => {
    if (running) {
      setRunning(false);
    } else {
      if (remaining === 0) setRemaining(TOTAL_BRUSH_SEC);
      if (soundEnabled) playSoftTapChime(440);
      setRunning(true);
    }
  };

  const resetTimer = () => {
    setRunning(false);
    setRemaining(TOTAL_BRUSH_SEC);
  };

  return (
    <div className="rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 via-white to-[#FEF9EF] p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-pink-700">
            <Timer className="w-3.5 h-3.5" />
            <span>HYBRID QR TOOL #2 • P08–P10</span>
          </span>
          <h2 className="text-lg font-extrabold text-[#0F172A]">
            {lang === "th" ? "🪥 นาฬิกาแปรงฟัน 2 นาที (3 ด่าน)" : "🪥 2-Minute Sparkle Brush Timer"}
          </h2>
        </div>
        <span className="rounded-full bg-white border border-pink-200 px-2.5 py-1 text-xs font-extrabold text-pink-800">
          {completedCount} {lang === "th" ? "ดาว" : "★"}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center py-1 gap-3">
        <div
          className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center transition-all ${
            stage === 4
              ? "border-emerald-400 bg-emerald-50 scale-105"
              : running
                ? "border-pink-400 bg-pink-50 scale-105"
                : "border-pink-200 bg-white"
          }`}
        >
          <span className="text-3xl font-extrabold text-[#0F172A] tabular-nums">
            {timeStr}
          </span>
          <span className="text-[11px] font-bold text-slate-500">
            {stage === 4 ? "DONE!" : running ? `STAGE ${stage}/3` : "2 MIN"}
          </span>
        </div>

        {/* 3-Stage Progress Pills */}
        <div className="grid grid-cols-3 gap-1.5 w-full text-[11px] font-extrabold text-center">
          {[
            { no: 1, labelTh: "1. ฟันนอก", labelEn: "1. Outside" },
            { no: 2, labelTh: "2. ฟันกราม", labelEn: "2. Molars" },
            { no: 3, labelTh: "3. ลิ้น+บ้วน", labelEn: "3. Rinse" },
          ].map((s) => (
            <div
              key={s.no}
              className={`rounded-xl py-1.5 px-1 border ${
                stage > s.no
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : stage === s.no && running
                    ? "border-pink-400 bg-pink-100 text-pink-900"
                    : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              {lang === "th" ? s.labelTh : s.labelEn}
            </div>
          ))}
        </div>

        <p className="text-xs sm:text-sm font-bold text-center text-[#0F172A] leading-snug">
          {stageLabel}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={toggleTimer}
          className={`flex-1 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white cursor-pointer transition-colors ${
            running ? "bg-rose-600 hover:bg-rose-700" : "bg-pink-600 hover:bg-pink-700"
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
                  ? "เริ่มแปรงรอบใหม่"
                  : "Brush Again"
                : lang === "th"
                  ? "เริ่มจับเวลา 2 นาที"
                  : "Start 2-Min Timer"}
          </span>
        </button>
        <button
          type="button"
          onClick={resetTimer}
          aria-label="Reset brush timer"
          className="rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-3 text-slate-700 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function St02HubView() {
  return (
    <StorybookHubView
      book={ST02_CONFIG}
      renderWidget={({ lang, soundEnabled }) => (
        <SparkleBrushTimerWidget lang={lang} soundEnabled={soundEnabled} />
      )}
    />
  );
}

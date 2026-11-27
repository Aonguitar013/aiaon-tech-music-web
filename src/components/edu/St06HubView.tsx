"use client";

import React, { useEffect, useState } from "react";
import { Search, Sparkles, Square, RotateCcw, Star, CheckCircle2 } from "lucide-react";
import { playSoftTapChime } from "@/lib/eduPhonicsAudio";
import type { EduLang } from "@/lib/eduCatalog";
import { ST06_CONFIG } from "@/lib/storybookCatalog";
import { StorybookHubView } from "@/components/edu/StorybookHubView";

const FOCUS_PRESETS = [
  { minutes: 3, labelTh: "3 นาที • อุ่นเครื่อง", labelEn: "3 Min • Warm-Up" },
  { minutes: 5, labelTh: "5 นาที • นักสืบ EF", labelEn: "5 Min • Detective" },
  { minutes: 10, labelTh: "10 นาที • ไขปริศนา", labelEn: "10 Min • Deep Focus" },
];

const DETECTIVE_STEPS = [
  { id: "breathe", emoji: "🌬️", th: "1. หยุด-หายใจ 1-2-3", en: "1. Pause & Breathe" },
  { id: "look", emoji: "🔎", th: "2. ส่องหาทีละมุม", en: "2. Check Corner by Corner" },
  { id: "persist", emoji: "⭐", th: "3. รอคอยไม่ยอมแพ้", en: "3. Stay Patient & Persist" },
];

function DetectiveFocusTimerWidget({
  lang,
  soundEnabled,
}: {
  lang: EduLang;
  soundEnabled: boolean;
}) {
  const [presetIdx, setPresetIdx] = useState(1); // Default 5 min
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(FOCUS_PRESETS[1].minutes * 60);
  const [cluesFound, setCluesFound] = useState(0);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  const activePreset = FOCUS_PRESETS[presetIdx];

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setRunning(false);
          setCluesFound((c) => c + 1);
          if (soundEnabled) {
            playSoftTapChime(523.25);
            setTimeout(() => playSoftTapChime(659.25), 160);
            setTimeout(() => playSoftTapChime(783.99), 320);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, soundEnabled]);

  const selectPreset = (idx: number) => {
    setPresetIdx(idx);
    setRunning(false);
    setRemaining(FOCUS_PRESETS[idx].minutes * 60);
    if (soundEnabled) playSoftTapChime(440 + idx * 50);
  };

  const toggleStep = (stepId: string) => {
    setCheckedSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
    if (soundEnabled) playSoftTapChime(659.25);
  };

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-white to-[#FEF9EF] p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-800">
            <Search className="w-3.5 h-3.5" />
            <span>HYBRID QR TOOL #2 • P05–P11</span>
          </span>
          <h2 className="text-lg font-extrabold text-[#0F172A]">
            {lang === "th"
              ? "🔍 นาฬิกา Focus Timer 5 นาที + สูตรนักสืบ 3 ขั้น"
              : "🔍 5-Min Detective Focus Timer & 3-Step Plan"}
          </h2>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-extrabold text-amber-900">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-600" />
          <span>
            {cluesFound} {lang === "th" ? "ดาว" : "★"}
          </span>
        </span>
      </div>

      {/* 3 Timer Presets */}
      <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
        {FOCUS_PRESETS.map((p, idx) => (
          <button
            key={p.minutes}
            type="button"
            onClick={() => selectPreset(idx)}
            className={`rounded-xl px-2 py-2 text-center border transition-colors cursor-pointer ${
              idx === presetIdx
                ? "border-amber-500 bg-amber-100 text-amber-950"
                : "border-slate-200 bg-white text-slate-600 hover:bg-amber-50"
            }`}
          >
            {lang === "th" ? p.labelTh : p.labelEn}
          </button>
        ))}
      </div>

      {/* Timer Display + 3-Step Detective Checklist */}
      <div className="flex flex-col sm:flex-row items-center gap-4 py-1">
        <div
          className={`w-28 h-28 shrink-0 rounded-full border-4 flex flex-col items-center justify-center transition-all ${
            remaining === 0
              ? "border-emerald-400 bg-emerald-50 scale-105"
              : running
                ? "border-amber-500 bg-amber-50 scale-105"
                : "border-amber-200 bg-white"
          }`}
        >
          <span className="text-3xl font-extrabold text-[#0F172A] tabular-nums">
            {timeStr}
          </span>
          <span className="text-[11px] font-bold text-amber-800">
            {remaining === 0 ? "⭐ SOLVED!" : running ? "🔍 FOCUS" : `${activePreset.minutes} MIN`}
          </span>
        </div>

        <div className="w-full space-y-1.5">
          {DETECTIVE_STEPS.map((st) => {
            const done = !!checkedSteps[st.id];
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => toggleStep(st.id)}
                className={`w-full flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold text-left cursor-pointer transition-colors ${
                  done
                    ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                    : "border-amber-200 bg-white text-slate-700 hover:bg-amber-50"
                }`}
              >
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 ${
                    done ? "text-emerald-600" : "text-slate-300"
                  }`}
                />
                <span>
                  {st.emoji} {lang === "th" ? st.th : st.en}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            if (running) {
              setRunning(false);
            } else {
              if (remaining === 0) setRemaining(activePreset.minutes * 60);
              if (soundEnabled) playSoftTapChime(523.25);
              setRunning(true);
            }
          }}
          className={`flex-1 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white cursor-pointer transition-colors ${
            running ? "bg-slate-700 hover:bg-slate-800" : "bg-amber-600 hover:bg-amber-700"
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
                  ? "เริ่มภารกิจรอบใหม่"
                  : "Start New Mission"
                : lang === "th"
                  ? "เริ่มจับเวลาสมาธินักสืบ"
                  : "Start Focus Timer"}
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            setRunning(false);
            setRemaining(activePreset.minutes * 60);
          }}
          aria-label="Reset focus timer"
          className="rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-3 text-slate-700 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function St06HubView() {
  return (
    <StorybookHubView
      book={ST06_CONFIG}
      renderWidget={({ lang, soundEnabled }) => (
        <DetectiveFocusTimerWidget lang={lang} soundEnabled={soundEnabled} />
      )}
    />
  );
}

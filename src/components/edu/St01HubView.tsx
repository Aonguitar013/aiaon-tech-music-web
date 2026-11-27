"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Square, Wind } from "lucide-react";
import { playSoftTapChime } from "@/lib/eduPhonicsAudio";
import type { EduLang } from "@/lib/eduCatalog";
import { ST01_CONFIG } from "@/lib/storybookCatalog";
import { StorybookHubView } from "@/components/edu/StorybookHubView";

type BreathPhase = "idle" | "inhale" | "hold" | "exhale";

function RainbowBreathingWidget({
  lang,
  soundEnabled,
}: {
  lang: EduLang;
  soundEnabled: boolean;
}) {
  const [breathRunning, setBreathRunning] = useState(false);
  const [breathPhase, setBreathPhase] = useState<BreathPhase>("idle");
  const [breathSec, setBreathSec] = useState(4);
  const [breathRounds, setBreathRounds] = useState(0);

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

  const breathLabel =
    breathPhase === "inhale"
      ? lang === "th"
        ? "🌸 สูดกลิ่นดอกไม้ (หายใจเข้าช้าๆ)"
        : "🌸 Smell the Flower (Inhale Slowly)"
      : breathPhase === "hold"
        ? lang === "th"
          ? "☁️ กอดลมไว้ในพุงเบาๆ (กลั้นหายใจ)"
          : "☁️ Hug Breath Gently"
        : breathPhase === "exhale"
          ? lang === "th"
            ? "🕯️ เป่าเทียนช้าๆ ฟู่ววว... (ผ่อนออก)"
            : "🕯️ Blow the Candle (Exhale Slowly)"
          : lang === "th"
            ? "กดเริ่มเพื่อฝึกหายใจสายรุ้ง 4-4-4 กับน้องดำ"
            : "Tap Start for 4-4-4 Rainbow Breathing";

  return (
    <div className="rounded-3xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 via-white to-[#EEF2FF] p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-sky-700">
            <Wind className="w-3.5 h-3.5" />
            <span>HYBRID QR TOOL #2 • P08–P10</span>
          </span>
          <h2 className="text-lg font-extrabold text-[#0F172A]">
            {lang === "th" ? "🌈 หายใจสายรุ้ง 4-4-4 ก่อนนอน" : "🌈 4-4-4 Bedtime Breathing"}
          </h2>
        </div>
        <span className="rounded-full bg-white border border-sky-200 px-2.5 py-1 text-xs font-extrabold text-sky-800">
          {breathRounds} {lang === "th" ? "รอบ" : "rds"}
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
        className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white cursor-pointer transition-colors ${
          breathRunning ? "bg-rose-600 hover:bg-rose-700" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {breathRunning ? <Square className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
        <span>
          {breathRunning
            ? lang === "th"
              ? "หยุดพักหายใจ"
              : "Stop Breathing"
            : lang === "th"
              ? "เริ่มฝึกหายใจสายรุ้ง 4-4-4"
              : "Start 4-4-4 Breathing"}
        </span>
      </button>
    </div>
  );
}

export function St01HubView() {
  return (
    <StorybookHubView
      book={ST01_CONFIG}
      renderWidget={({ lang, soundEnabled }) => (
        <RainbowBreathingWidget lang={lang} soundEnabled={soundEnabled} />
      )}
    />
  );
}

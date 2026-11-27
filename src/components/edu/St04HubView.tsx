"use client";

import React, { useEffect, useState } from "react";
import { Music, Square, Volume2, Heart } from "lucide-react";
import { playSoftTapChime } from "@/lib/eduPhonicsAudio";
import type { EduLang } from "@/lib/eduCatalog";
import { ST04_CONFIG } from "@/lib/storybookCatalog";
import { StorybookHubView } from "@/components/edu/StorybookHubView";

interface DrumSpeed {
  id: string;
  bpm: number;
  freq: number;
  emoji: string;
  labelTh: string;
  labelEn: string;
  hintTh: string;
  hintEn: string;
}

const DRUM_SPEEDS: DrumSpeed[] = [
  {
    id: "rocket",
    bpm: 120,
    freq: 330,
    emoji: "🚀",
    labelTh: "สปีด 1 • จรวด (120 BPM)",
    labelEn: "Speed 1 • Rocket (120 BPM)",
    hintTh: "ตึ๊งตังตึ๊งตัง! ปล่อยพลังปรบมือเร็วๆ ให้สนุกสุดเหวี่ยง!",
    hintEn: "Tap fast and wiggle out all that big rocket energy!",
  },
  {
    id: "march",
    bpm: 95,
    freq: 261.63,
    emoji: "🥾",
    labelTh: "สปีด 2 • สวนสนาม (95 BPM)",
    labelEn: "Speed 2 • March (95 BPM)",
    hintTh: "หนึ่ง... สอง... สาม... สี่... แตะเบรกเดินสวนสนามให้สม่ำเสมอ!",
    hintEn: "One, two, three, four—slow down into a steady march!",
  },
  {
    id: "heartbeat",
    bpm: 70,
    freq: 196,
    emoji: "💜",
    labelTh: "สปีด 3 • หัวใจอุ่น (70 BPM)",
    labelEn: "Speed 3 • Heartbeat (70 BPM)",
    hintTh: "ตึก... ตัก... ตึก... ตัก... วางมือบนอก ฟังจังหวะหัวใจสงบ",
    hintEn: "Lub... dub... slow and calm like a cozy sleeping heartbeat.",
  },
];

function HeartbeatDrumWidget({
  lang,
  soundEnabled,
}: {
  lang: EduLang;
  soundEnabled: boolean;
}) {
  const [speedIdx, setSpeedIdx] = useState(2);
  const [playing, setPlaying] = useState(false);
  const [beat, setBeat] = useState(0);
  const [pulse, setPulse] = useState(false);

  const active = DRUM_SPEEDS[speedIdx];

  useEffect(() => {
    if (!playing) return;
    const ms = Math.round(60000 / active.bpm);
    const id = setInterval(() => {
      setBeat((b) => {
        const next = (b % 4) + 1;
        if (soundEnabled) {
          playSoftTapChime(next === 1 ? active.freq * 1.25 : active.freq);
        }
        return next;
      });
      setPulse(true);
      setTimeout(() => setPulse(false), Math.min(180, ms / 2));
    }, ms);
    return () => clearInterval(id);
  }, [playing, active, soundEnabled]);

  const handleTapDrum = () => {
    setPulse(true);
    setBeat((b) => (b % 4) + 1);
    if (soundEnabled) playSoftTapChime(active.freq * 1.15);
    setTimeout(() => setPulse(false), 160);
  };

  return (
    <div className="rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-white to-[#FEF9EF] p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-purple-700">
            <Music className="w-3.5 h-3.5" />
            <span>HYBRID QR TOOL #2 • P07–P09</span>
          </span>
          <h2 className="text-lg font-extrabold text-[#0F172A]">
            {lang === "th"
              ? "🥁 กลองจังหวะหัวใจ 3 สปีด (70 / 95 / 120 BPM)"
              : "🥁 3-Speed Heartbeat Drum (70 / 95 / 120 BPM)"}
          </h2>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 border border-purple-200 px-3 py-1 text-xs font-extrabold text-purple-900">
          <Heart className="w-3.5 h-3.5 fill-purple-500 text-purple-600" />
          <span>{active.bpm} BPM</span>
        </span>
      </div>

      {/* 3 Speed Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-xs font-bold">
        {DRUM_SPEEDS.map((sp, idx) => (
          <button
            key={sp.id}
            type="button"
            onClick={() => {
              setSpeedIdx(idx);
              if (soundEnabled) playSoftTapChime(sp.freq * 1.2);
            }}
            className={`rounded-xl px-2.5 py-2 text-left border transition-colors cursor-pointer ${
              idx === speedIdx
                ? "border-purple-400 bg-purple-100 text-purple-950"
                : "border-slate-200 bg-white text-slate-600 hover:bg-purple-50"
            }`}
          >
            {sp.emoji} {lang === "th" ? sp.labelTh : sp.labelEn}
          </button>
        ))}
      </div>

      {/* Interactive Drum Circle */}
      <div className="flex flex-col items-center justify-center py-1 gap-2.5">
        <button
          type="button"
          onClick={handleTapDrum}
          aria-label="Tap heartbeat drum"
          className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-transform ${
            pulse
              ? "border-purple-500 bg-purple-100 scale-110 shadow-md"
              : playing
                ? "border-purple-400 bg-purple-50 scale-100"
                : "border-purple-200 bg-white hover:bg-purple-50"
          }`}
        >
          <span className="text-3xl">{active.emoji}</span>
          <span className="text-sm font-extrabold text-purple-900 tabular-nums mt-0.5">
            {beat > 0 ? `BEAT ${beat}/4` : "TAP!"}
          </span>
        </button>

        <p className="text-xs sm:text-sm font-bold text-center text-[#0F172A] leading-snug">
          {lang === "th" ? active.hintTh : active.hintEn}
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          if (!playing && soundEnabled) playSoftTapChime(active.freq * 1.25);
          setPlaying((p) => !p);
        }}
        className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white cursor-pointer transition-colors ${
          playing
            ? "bg-slate-700 hover:bg-slate-800"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {playing ? <Square className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        <span>
          {playing
            ? lang === "th"
              ? "หยุดจังหวะกลอง"
              : "Stop Drum Beat"
            : lang === "th"
              ? `เปิดจังหวะ ${active.bpm} BPM (${active.emoji})`
              : `Play ${active.bpm} BPM Beat (${active.emoji})`}
        </span>
      </button>
    </div>
  );
}

export function St04HubView() {
  return (
    <StorybookHubView
      book={ST04_CONFIG}
      renderWidget={({ lang, soundEnabled }) => (
        <HeartbeatDrumWidget lang={lang} soundEnabled={soundEnabled} />
      )}
    />
  );
}

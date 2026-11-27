"use client";

import React, { useState } from "react";
import { Heart, MessageCircleHeart, Volume2 } from "lucide-react";
import { playSoftTapChime, speakPhonicsCard } from "@/lib/eduPhonicsAudio";
import type { EduLang } from "@/lib/eduCatalog";
import { ST05_CONFIG } from "@/lib/storybookCatalog";
import { StorybookHubView } from "@/components/edu/StorybookHubView";

const HELLO_CARDS = [
  {
    id: "hi",
    emoji: "👋",
    th: "สวัสดี! เราชื่อบ๊อบนะ",
    en: "Hi! I'm Bob! Nice to meet you!",
    letter: "H",
    phoneme: "huh",
    word: "Hello",
  },
  {
    id: "play",
    emoji: "🖍️",
    th: "มาวาดรูปเล่นด้วยกันไหม?",
    en: "Want to draw and play together?",
    letter: "P",
    phoneme: "puh",
    word: "Play",
  },
  {
    id: "thanks",
    emoji: "💛",
    th: "ขอบคุณนะเพื่อนใหม่!",
    en: "Thank you, my new friend!",
    letter: "F",
    phoneme: "fff",
    word: "Friend",
  },
  {
    id: "bye",
    emoji: "🎒",
    th: "ตอนเย็นเจอกันนะแม่ใหญ่!",
    en: "See you this afternoon, Mama!",
    letter: "B",
    phoneme: "buh",
    word: "Brave",
  },
];

function BraveHelloBoardWidget({
  lang,
  soundEnabled,
}: {
  lang: EduLang;
  soundEnabled: boolean;
}) {
  const [heartTaps, setHeartTaps] = useState(0);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleTapHeart = () => {
    setHeartTaps((n) => n + 1);
    if (soundEnabled) {
      playSoftTapChime(523.25);
      setTimeout(() => playSoftTapChime(659.25), 110);
    }
  };

  const handleSpeakCard = (card: (typeof HELLO_CARDS)[number]) => {
    setActiveCard(card.id);
    speakPhonicsCard({
      letter: card.letter,
      spokenPhoneme: card.phoneme,
      word: card.word,
      thaiMeaning: lang === "th" ? card.th : "",
      bilingual: lang === "th",
      soundEnabled,
    });
  };

  return (
    <div className="rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 via-white to-[#FEF9EF] p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-teal-700">
            <MessageCircleHeart className="w-3.5 h-3.5" />
            <span>HYBRID QR TOOL #2 • P05–P09</span>
          </span>
          <h2 className="text-lg font-extrabold text-[#0F172A]">
            {lang === "th"
              ? "🎒 กระดานซ้อมคำทักทาย & ตราหัวใจอุ่น"
              : "🎒 Friendly Hello & Pocket Heart Board"}
          </h2>
        </div>

        <button
          type="button"
          onClick={handleTapHeart}
          className="inline-flex items-center gap-1 rounded-full bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3 py-1 text-xs font-extrabold text-amber-900 cursor-pointer transition-colors"
        >
          <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-600" />
          <span>
            {lang === "th" ? `แตะหัวใจอุ่น (${heartTaps})` : `Heart (${heartTaps})`}
          </span>
        </button>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        {lang === "th"
          ? "กดการ์ดด้านล่างเพื่อซ้อมพูดทักทายเพื่อนใหม่พร้อมเสียง Phonics A–Z (ใช้ก้าวที่ 1 แตะหัวใจอุ่น + ก้าวที่ 2 ยิ้มทักทายก่อนเข้าห้องเรียน!)"
          : "Tap any card below to practice friendly school greetings & phonics sounds before morning drop-off!"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {HELLO_CARDS.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => handleSpeakCard(card)}
            className={`rounded-2xl border p-3 text-left transition-all cursor-pointer flex items-start gap-2.5 ${
              activeCard === card.id
                ? "border-teal-500 bg-teal-100/80 shadow-xs"
                : "border-teal-200 bg-white hover:bg-teal-50"
            }`}
          >
            <span className="text-xl shrink-0">{card.emoji}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-extrabold text-teal-800">
                  {card.letter} • {card.word}
                </span>
                <Volume2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              </div>
              <div className="text-xs font-bold text-[#0F172A] mt-0.5 leading-snug">
                {lang === "th" ? card.th : card.en}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function St05HubView() {
  return (
    <StorybookHubView
      book={ST05_CONFIG}
      renderWidget={({ lang, soundEnabled }) => (
        <BraveHelloBoardWidget lang={lang} soundEnabled={soundEnabled} />
      )}
    />
  );
}

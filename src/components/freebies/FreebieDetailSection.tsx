"use client";

import React, { useState } from "react";
import {
  ShieldCheck, CheckCircle2, Zap, ArrowRight, Gift,
  Clock, Sparkles, HelpCircle, FileText,
  Lock, Laptop, ArrowLeft, MessageSquare,
  ChevronDown, Check, Download, Tag
} from "lucide-react";
import { RiLineLine } from "react-icons/ri";
import { FreebieDetailData } from "@/components/freebies/freebieDataHelper";
import { DvdCaseMockup } from "@/components/marketplace/DvdCaseMockup";
import { Book3DMockup } from "@/components/ebooks/Book3DMockup";
import { StudentCardMockup } from "@/components/student-vault/StudentCardMockup";
import { VinylRecordMockup } from "@/components/music-store/VinylRecordMockup";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { getLineOrderUrl } from "@/lib/line";

interface FreebieDetailSectionProps {
  freebie: FreebieDetailData;
  onClose?: () => void;
  onOpenUnlockModal: () => void;
}

export function FreebieDetailSection({
  freebie,
  onClose,
  onOpenUnlockModal,
}: FreebieDetailSectionProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const { openLineModal } = useLineModal();

  const handleLineChatClick = (e: React.MouseEvent) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: `ของแจกฟรี: ${freebie.title}`,
        price: 0,
        message: freebie.lineOrderMsg,
      });
    }
  };

  const accentStyles = {
    emerald: {
      border: "border-emerald-500/40",
      glow: "bg-emerald-500/15",
      text: "text-emerald-400",
      badge: "text-emerald-300 border-emerald-500/40 bg-emerald-500/20",
      btn: "from-emerald-500 via-teal-600 to-green-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.35)]",
    },
    rose: {
      border: "border-rose-500/40",
      glow: "bg-rose-500/15",
      text: "text-rose-400",
      badge: "text-rose-300 border-rose-500/40 bg-rose-500/20",
      btn: "from-rose-500 via-red-600 to-orange-600 hover:from-rose-400 hover:to-red-500 text-white shadow-[0_0_25px_rgba(244,63,94,0.35)]",
    },
    cyan: {
      border: "border-cyan-500/40",
      glow: "bg-cyan-500/15",
      text: "text-cyan-400",
      badge: "text-cyan-300 border-cyan-500/40 bg-cyan-500/20",
      btn: "from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_25px_rgba(6,182,212,0.35)]",
    },
    purple: {
      border: "border-purple-500/40",
      glow: "bg-purple-500/15",
      text: "text-purple-400",
      badge: "text-purple-300 border-purple-500/40 bg-purple-500/20",
      btn: "from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white shadow-[0_0_25px_rgba(168,85,247,0.35)]",
    },
    amber: {
      border: "border-amber-500/40",
      glow: "bg-amber-500/15",
      text: "text-amber-400",
      badge: "text-amber-300 border-amber-500/40 bg-amber-500/20",
      btn: "from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.35)]",
    },
    pink: {
      border: "border-pink-500/40",
      glow: "bg-pink-500/15",
      text: "text-pink-400",
      badge: "text-pink-300 border-pink-500/40 bg-pink-500/20",
      btn: "from-pink-500 via-rose-600 to-purple-600 hover:from-pink-400 hover:to-rose-500 text-white shadow-[0_0_25px_rgba(244,114,182,0.35)]",
    },
  }[freebie.themeColor] || {
    border: "border-emerald-500/40",
    glow: "bg-emerald-500/15",
    text: "text-emerald-400",
    badge: "text-emerald-300 border-emerald-500/40 bg-emerald-500/20",
    btn: "from-emerald-500 via-teal-600 to-green-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950",
  };

  // Render 3D Mockup inside Details View
  const renderMockup = () => {
    if (freebie.category === "music" || freebie.id.includes("music") || freebie.id.includes("guitar")) {
      return (
        <VinylRecordMockup
          code={freebie.code}
          title={freebie.title}
          categoryLabel={freebie.tag}
          bpm="85-110 BPM"
          duration="10 แทร็คสตูดิโอ"
          accentColor="purple"
          isPlaying={false}
          size="md"
          isInteractive={true}
        />
      );
    }

    if (freebie.id.includes("student")) {
      return (
        <StudentCardMockup
          code={freebie.code}
          title="Student AI Secret Kit"
          tagline="GEN Z SECRET REPORT PROMPTS"
          themeColor="pink"
          badgeText="STUDENT AI PASS"
          serialNo="FREE-2026-STU-KIT"
          isInteractive={true}
        />
      );
    }

    if (freebie.id.includes("teacher-ai-prompts")) {
      return (
        <Book3DMockup
          code={freebie.code}
          title={freebie.title}
          category={freebie.tag}
          themeColor="amber"
          rank={1}
          size="md"
          isInteractive={true}
        />
      );
    }

    // Default: 3D Acrylic DVD Case Mockup
    return (
      <DvdCaseMockup
        code={freebie.code}
        title={freebie.title}
        tagline={freebie.tag}
        isInteractive={true}
      />
    );
  };

  return (
    <div className="w-full flex flex-col gap-10 font-prompt text-white">

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 1: OUTCOME HEADLINE, PRICE TAG 0 ฿ & 3D MOCKUP HERO
      ───────────────────────────────────────────────────────────── */}
      <div className={`relative rounded-3xl bg-slate-950/90 border ${accentStyles.border} p-6 sm:p-10 overflow-hidden shadow-2xl`}>
        {/* Ambient Top Glow */}
        <div className={`absolute top-0 right-0 w-96 h-96 ${accentStyles.glow} blur-3xl rounded-full pointer-events-none -mr-20 -mt-20`} />

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${accentStyles.badge}`}>
            {freebie.badge}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white/80 border border-white/20">
            {freebie.fileType}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white/80 border border-white/20">
            {freebie.fileSize}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            🎁 แจกฟรี 100% ไม่มีข้อผูกมัด
          </span>
        </div>

        {/* Outcome Headline */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
          {freebie.headline}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-4xl">
          {freebie.subheadline}
        </p>

        {/* 3D Mockup Stage Hero */}
        <div className="w-full flex justify-center py-6 sm:py-8 my-4 bg-slate-900/60 rounded-2xl border border-white/10 backdrop-blur-sm">
          {renderMockup()}
        </div>

        {/* ── PRICE TAG: เขียนป้ายราคาเป็น 0 บาท อย่างเด่นชัด ── */}
        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-prompt mb-1">
              <span>ราคาปกติทั่วไป:</span>
              <span className="line-through text-slate-500 font-bold">฿{freebie.originalPrice.toLocaleString()} บาท</span>
              <span className="text-emerald-400 font-bold">ประหยัด 100%</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                0 บาท
              </span>
              <span className="text-base sm:text-xl font-extrabold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-xl border border-emerald-500/40">
                (แจกฟรี 0 ฿)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-prompt">
              💡 รับสิทธิ์การใช้งานถาวร • ไม่ต้องกรอกบัตรเครดิต • ไม่มีสัญญาผูกมัดใดๆ ทั้งสิ้น
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={onOpenUnlockModal}
              className={`px-7 py-4 rounded-xl bg-gradient-to-r ${accentStyles.btn} font-black text-base shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer`}
            >
              <Download className="w-5 h-5" />
              <span>ปลดล็อก &amp; ดาวน์โหลดฟรี (0 ฿)</span>
            </button>

            <a
              href={getLineOrderUrl(freebie.lineOrderMsg)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLineChatClick}
              className="px-6 py-4 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
            >
              <RiLineLine className="w-5 h-5 fill-white" />
              <span>ขอรับไฟล์ทาง LINE OA</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 2: BEFORE VS AFTER COMPARISON
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-slate-950/70 border border-white/10 p-6 sm:p-10 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
            {freebie.timeSaved}
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-6">
          ทำไมการใช้ไฟล์ชุดนี้ จึงเปลี่ยนผลลัพธ์การทำงานของคุณไปตลอดกาล
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before: ปัญหาเดิม */}
          <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/20">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-3">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>ชีวิตการทำงานแบบเดิม (ก่อนมีระบบนี้)</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {freebie.beforePain}
            </p>
          </div>

          {/* After: ชีวิตใหม่ */}
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ชีวิตการทำงานยุคใหม่ (เมื่อใช้ระบบนี้ฟรี)</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-semibold">
              {freebie.afterBenefit}
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 3: 3 CORE BREAKTHROUGHS
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-slate-950/70 border border-white/10 p-6 sm:p-10 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
            3 CORE HIGHLIGHTS
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-6">
          3 จุดเด่นและนวัตกรรมสำคัญของทรัพยากรชุดนี้
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {freebie.features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-white/15 transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-mono font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="font-bold text-base text-white">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 4: UNBOXING DELIVERABLES (สิ่งที่คุณจะได้รับทันที)
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-slate-950/70 border border-white/10 p-6 sm:p-10 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Gift className="w-5 h-5 text-purple-400" />
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider font-mono">
            DELIVERABLES INCLUDED
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-6">
          สิ่งที่คุณจะได้รับในชุดดาวน์โหลดนี้ (ไม่มีค่าใช้จ่าย)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {freebie.deliverables.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/50 border border-white/5 flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 5: HOW TO UNLOCK & USE (วิธีนำไปใช้ใน 3 ขั้นตอน)
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-slate-950/70 border border-white/10 p-6 sm:p-10 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Laptop className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
            EASY SETUP
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-6">
          วิธีปลดล็อกและเริ่มใช้งานง่ายๆ ใน 3 สเต็ป
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {freebie.howToUseSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden"
            >
              <span className="text-5xl font-black text-white/5 absolute top-3 right-3 font-mono">
                #{idx + 1}
              </span>
              <div className="text-xs font-bold text-emerald-400 mb-2 font-mono">
                STEP 0{idx + 1}
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-semibold relative z-10">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 6: SMART FAQ & BOTTOM ACTION BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-slate-950/70 border border-white/10 p-6 sm:p-10 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
            FREQUENTLY ASKED QUESTIONS
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-6">
          คำถามที่พบบ่อยเกี่ยวกับทรัพยากรนี้
        </h2>

        <div className="space-y-3 mb-10">
          {freebie.faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-900/60 border border-white/5 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-sm font-bold text-slate-200 hover:text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180 text-amber-400" : "text-slate-500"}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Dual Action Bar */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-emerald-400 font-bold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>ราคาพิเศษ: 0 บาท (แจกฟรี 100%)</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-white">
              พร้อมดาวน์โหลดและนำไปใช้งานแล้วหรือยัง?
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>กลับหน้ารวม</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenUnlockModal}
              className={`flex-1 sm:flex-initial px-8 py-4 rounded-xl bg-gradient-to-r ${accentStyles.btn} font-black text-base shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer`}
            >
              <Download className="w-5 h-5" />
              <span>ดาวน์โหลดฟรี (0 บาท)</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck, CheckCircle2, Zap, ArrowRight, Gift,
  Clock, AlertTriangle, Sparkles, UserCheck, HelpCircle,
  Laptop, ChevronDown, Check, Star, ArrowLeft, MessageSquare, Flame,
  Disc, Play, Pause, Volume2, Music, Headphones
} from "lucide-react";
import { MusicStoreProductItem } from "@/components/music-store/musicDataHelper";
import { VinylRecordMockup } from "@/components/music-store/VinylRecordMockup";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { getLineOrderUrl } from "@/lib/line";

interface MusicDetailSectionProps {
  product: MusicStoreProductItem;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  onClose?: () => void;
}

export function MusicDetailSection({
  product,
  isPlaying = false,
  onTogglePlay,
  onClose,
}: MusicDetailSectionProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const { openLineModal } = useLineModal();

  const handleLineOrderClick = (e: React.MouseEvent) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: `ผลงานเพลง: [${product.code}] ${product.title}`,
        price: product.price,
        message: product.lineOrderMsg,
      });
    }
  };

  const accentStyles = {
    amber: {
      border: "border-amber-500/30",
      glow: "bg-amber-500/10",
      text: "text-amber-700",
      badge: "text-amber-700 border-amber-500/30 bg-amber-500/10",
      btn: "from-amber-500 via-orange-600 to-amber-700 hover:from-amber-400 hover:to-orange-500 text-slate-950",
    },
    cyan: {
      border: "border-cyan-500/30",
      glow: "bg-cyan-500/10",
      text: "text-sky-700",
      badge: "text-sky-700 border-cyan-500/30 bg-cyan-500/10",
      btn: "from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white",
    },
    emerald: {
      border: "border-emerald-500/30",
      glow: "bg-emerald-500/10",
      text: "text-emerald-700",
      badge: "text-emerald-700 border-emerald-500/30 bg-emerald-500/10",
      btn: "from-emerald-500 via-teal-600 to-green-700 hover:from-emerald-400 hover:to-teal-500 text-slate-950",
    },
    purple: {
      border: "border-purple-500/30",
      glow: "bg-purple-500/10",
      text: "text-purple-700",
      badge: "text-purple-700 border-purple-500/30 bg-purple-500/10",
      btn: "from-purple-500 via-indigo-600 to-purple-700 hover:from-purple-400 hover:to-indigo-500 text-white",
    },
    pink: {
      border: "border-pink-500/30",
      glow: "bg-pink-500/10",
      text: "text-pink-700",
      badge: "text-pink-700 border-pink-500/30 bg-pink-500/10",
      btn: "from-pink-500 via-rose-600 to-purple-700 hover:from-pink-400 hover:to-rose-500 text-white",
    },
  }[product.accentColor] || {
    border: "border-amber-500/30",
    glow: "bg-amber-500/10",
    text: "text-amber-700",
    badge: "text-amber-700 border-amber-500/30 bg-amber-500/10",
    btn: "from-amber-500 via-orange-600 to-amber-700 hover:from-amber-400 hover:to-orange-500 text-slate-950",
  };

  return (
    <div className="w-full flex flex-col gap-10 font-prompt text-[#1E293B]">
      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 1: OUTCOME HEADLINE & 3D HOLOGRAPHIC VINYL HERO
      ───────────────────────────────────────────────────────────── */}
      <div className={`relative rounded-3xl bg-white border ${accentStyles.border} p-6 sm:p-10 overflow-hidden shadow-sm`}>
        {/* Ambient Top Glow */}
        <div className={`absolute top-0 right-0 w-96 h-96 ${accentStyles.glow} blur-3xl rounded-full pointer-events-none -mr-20 -mt-20`} />

        {/* Top Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${product.badgeColor}`}>
            {product.badge}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-100 text-[#475569] border border-[#E2E8F0]">
            {product.code} • {product.bpm} • {product.duration}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 border border-amber-500/30">
            ลด {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        </div>

        {/* Outcome Headline */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight mb-4">
          {product.headline}
        </h1>

        <p className="text-[#475569] text-sm sm:text-base lg:text-lg leading-relaxed font-light mb-8 max-w-3xl">
          {product.subheadline}
        </p>

        {/* 3D Holographic Vinyl Showcase Stage */}
        <div className="relative my-8 p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#E2E8F0] shadow-xs flex flex-col items-center justify-center">
          <div className="text-[11px] font-mono font-bold tracking-widest text-[#475569] uppercase mb-4 flex items-center gap-2">
            <Disc className="w-3.5 h-3.5 text-amber-700 animate-spin" style={{ animationDuration: "6s" }} />
            <span>3D VINYL RECORD & JACKET SLEEVE (เอาเมาส์ชี้เพื่อสไลด์แผ่นเสียงหมุนออกมา)</span>
          </div>

          <VinylRecordMockup
            code={product.code}
            title={product.title}
            categoryLabel={product.categoryLabel}
            bpm={product.bpm}
            duration={product.duration}
            accentColor={product.accentColor}
            isPlaying={isPlaying}
            size="lg"
            isInteractive={true}
            onPlayClick={onTogglePlay}
          />

          {/* Audio Preview Control Button */}
          {onTogglePlay && (
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={onTogglePlay}
                className={`px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2.5 transition-all shadow-lg ${
                  isPlaying
                    ? "bg-amber-400 text-slate-950 shadow-amber-500/30 scale-105"
                    : "bg-slate-100 text-[#0F172A] hover:bg-slate-200 border border-[#E2E8F0]"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>กำลังเล่นตัวอย่างเสียงสด (คลิกเพื่อหยุด)</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current text-amber-700" />
                    <span>ทดลองฟังทำนองตัวอย่าง (Audio Synth Preview)</span>
                  </>
                )}
              </button>
              <span className="text-xs text-[#475569] font-mono flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#475569]" /> Web Audio Synthesizer • คมชัดสดใส
              </span>
            </div>
          )}

          {/* Sample Hook Lyrics Preview */}
          <div className="w-full max-w-2xl mt-6 p-4 rounded-2xl bg-white border border-[#E2E8F0] text-xs sm:text-sm text-[#475569] italic leading-relaxed text-center">
            {product.sampleHook}
          </div>
        </div>

        {/* Pricing & CTA Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0]">
          <div>
            <div className="text-xs text-[#475569] mb-1">ราคาโปรโมชันพิเศษ (สิทธิ์ใช้งานตลอดชีพ)</div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-5xl font-black text-amber-700">฿{product.price.toLocaleString()}</span>
              <span className="text-slate-500 line-through text-lg">฿{product.originalPrice.toLocaleString()}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 border border-emerald-500/30 font-bold">
                ประหยัด ฿{(product.originalPrice - product.price).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href={getLineOrderUrl(product.lineOrderMsg)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLineOrderClick}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#06C755] via-[#05b34c] to-[#06C755] hover:from-[#05b34c] hover:to-[#049b42] text-white font-black text-base shadow-[0_0_25px_rgba(6,199,85,0.35)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>สั่งซื้อทาง LINE รับไฟล์ทันที</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 2: BEFORE / AFTER PAIN RELIEF & TIME SAVED
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-10">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-widest mb-3">
          <Clock className="w-4 h-4" />
          <span>เปรียบเทียบความคุ้มค่า & ผลลัพธ์ชัดเจน</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-6">
          ทำไมผลงานเพลง & BGM ชุดนี้ถึงเปลี่ยนชีวิตคุณได้?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Before */}
          <div className="p-6 rounded-2xl bg-rose-50/70 border border-rose-500/30">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-3">
              <AlertTriangle className="w-4 h-4" />
              <span>ก่อนใช้งาน (ความยุ่งยากเดิมๆ)</span>
            </div>
            <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
              {product.beforePain}
            </p>
          </div>

          {/* After */}
          <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-500/30">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-3">
              <CheckCircle2 className="w-4 h-4" />
              <span>หลังใช้งาน (ผลลัพธ์และความสำเร็จ)</span>
            </div>
            <p className="text-[#1E293B] text-sm sm:text-base leading-relaxed">
              {product.afterBenefit}
            </p>
          </div>
        </div>

        {/* Time Saved Highlight */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 flex items-center justify-center gap-3 text-center">
          <Sparkles className="w-5 h-5 text-amber-700 flex-shrink-0" />
          <span className="text-amber-700 font-bold text-sm sm:text-base">
            🚀 คุณค่าที่ได้รับ: {product.timeSaved}
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 3: 3 CORE BREAKTHROUGHS (นวัตกรรม 3 จุดเด่น)
      ───────────────────────────────────────────────────────────── */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-xs font-mono font-bold text-sky-700 uppercase tracking-widest mb-2">
            CORE BREAKTHROUGHS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            3 จุดเด่นสำคัญที่ออกแบบมาเพื่อคุณโดยเฉพาะ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {product.breakthroughs.map((b, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-sky-700 font-mono font-bold mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">{b.title}</h3>
                <p className="text-[#475569] text-sm leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 4: UNBOXING DELIVERABLES (สิ่งที่คุณจะได้รับทันที)
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-10">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-700 uppercase tracking-widest mb-3">
          <Gift className="w-4 h-4" />
          <span>WHAT YOU WILL GET (แกะกล่องสิ่งที่จะได้รับ)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-6">
          รับชุดไฟล์แพ็กเกจดิจิทัลครบชุด พร้อมใช้งานทันที
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {product.deliverables.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] hover:border-purple-500/30 transition-all flex items-start gap-4"
            >
              <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0F172A] mb-1">{item.title}</h4>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 5: ELIMINATING 3 MAIN FEARS (ทลาย 3 ข้อกังวลใจ)
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-10">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-widest mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>RISK REVERSAL & ZERO DOUBT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-6">
          ทลาย 3 ข้อกังวลใจที่ทุกคนมักจะถาม
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {product.fears.map((fear, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-amber-700 font-bold text-sm mb-3">
                  <HelpCircle className="w-4 h-4 flex-shrink-0" />
                  <span>คำถาม: {fear.question}</span>
                </div>
                <p className="text-[#475569] text-sm leading-relaxed">{fear.answer}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center gap-2 text-xs text-emerald-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ยืนยันความปลอดภัย 100%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 6: CREATOR AUTHORITY & TRACK RECORD
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-white border border-cyan-500/30 p-6 sm:p-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] flex-shrink-0 bg-[#FAF8F5]">
            <Image
              src="/images/kru_aon_profile.png"
              alt="ครูจิรวัฒน์ เดชเส้ง (ครูอ้น)"
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 112px, 144px"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-sky-700 border border-cyan-500/40">
                PRODUCER & EDUCATOR
              </span>
              <span className="text-xs text-[#475569] font-mono">
                ห้องอัดดนตรี & สตูดิโอครูอ้น
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] mb-2">
              ครูจิรวัฒน์ เดชเส้ง (ครูอ้น)
            </h3>
            <p className="text-sm text-[#475569] leading-relaxed font-light mb-4">
              ครูกลุ่มสาระการเรียนรู้ศิลปะ (ดนตรีสากล) โรงเรียนหาดใหญ่วิทยาลัย (ญ.ว.), ผู้ก่อตั้ง iAon Tech & Sound Lab 
              ผู้ผลิตเพลงช่วยจำสอบครูผู้ช่วย ชุด Backing Track วงดนตรี และเพลง BGM ปลอดลิขสิทธิ์สำหรับคลิป ว.PA 
              ด้วยประสบการณ์ด้านดนตรีสากลและระบบเทคโนโลยีดิจิทัลกว่า 10 ปี มั่นใจได้ในมาตรฐานความถูกต้องและคุณภาพระดับสตูดิโอ
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-[#475569] font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-700" /> Cubase 12 Pro Certified
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-700" /> สมาชิกครูและผู้ติดตามกว่า 10,000+ คน
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-700" /> ดูแลและซัปพอร์ตโดยตรง 1-on-1
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 7: SMART FAQ & DUAL CTA BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest mb-2">
            SMART FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            คำถามที่พบบ่อยเกี่ยวกับผลงานเพลง
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto mb-10">
          {product.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-[#0F172A] hover:text-amber-700 transition-colors"
              >
                <span className="text-sm sm:text-base">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#475569] transition-transform ${
                    activeFaq === idx ? "rotate-180 text-amber-700" : ""
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#E2E8F0] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dual CTA Bottom Bar */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs text-[#475569] mb-1">สั่งซื้อและรับไฟล์ดิจิทัลพร้อมใช้งานทันที</div>
            <div className="text-xl sm:text-2xl font-black text-[#0F172A]">
              [{product.code}] {product.title}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-bold text-sm border border-[#E2E8F0] transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>กลับหน้ารวม</span>
              </button>
            )}

            <a
              href={getLineOrderUrl(product.lineOrderMsg)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLineOrderClick}
              className="flex-1 sm:flex-initial px-8 py-4 rounded-xl bg-gradient-to-r from-[#06C755] via-[#05b34c] to-[#06C755] hover:from-[#05b34c] hover:to-[#049b42] text-white font-black text-base shadow-[0_0_25px_rgba(6,199,85,0.35)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>สั่งซื้อทาง LINE (฿{product.price.toLocaleString()})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

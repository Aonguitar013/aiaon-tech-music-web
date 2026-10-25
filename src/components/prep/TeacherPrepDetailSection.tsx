"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck, CheckCircle2, Zap, ArrowRight, Gift,
  Clock, AlertTriangle, Sparkles, UserCheck, HelpCircle,
  Laptop, ChevronDown, Check, Star, ArrowLeft, MessageSquare, Flame,
  Crown, GraduationCap, Send, Music, Headphones
} from "lucide-react";
import { PrepVipProduct } from "@/components/prep/prepDataHelper";
import { GoldenTicketMockup } from "@/components/prep/GoldenTicketMockup";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { getLineOrderUrl } from "@/lib/line";

interface TeacherPrepDetailSectionProps {
  product: PrepVipProduct;
  onClose?: () => void;
}

export function TeacherPrepDetailSection({
  product,
  onClose,
}: TeacherPrepDetailSectionProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const { openLineModal } = useLineModal();

  const handleLineOrderClick = (e: React.MouseEvent) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: product.title,
        price: product.price,
        message: product.lineOrderMsg,
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-10 font-prompt text-white">
      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 1: OUTCOME HEADLINE & 3D GOLDEN TICKET HERO
      ───────────────────────────────────────────────────────────── */}
      <div className="relative rounded-3xl bg-slate-950/85 border border-amber-500/40 p-6 sm:p-10 overflow-hidden shadow-2xl">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 blur-3xl rounded-full pointer-events-none -mr-20 -mt-20" />

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${product.badgeColor}`}>
            {product.badge}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white/80 border border-white/20">
            {product.code} • สิทธิ์ตลอดชีพ
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
            ลดทันที {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        </div>

        {/* Outcome Headline */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
          {product.headline}
        </h1>

        <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-light mb-8 max-w-3xl">
          {product.subheadline}
        </p>

        {/* 3D Golden Ticket Showcase Stage */}
        <div className="relative my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900/80 border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.2)] flex flex-col items-center justify-center">
          <div className="text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>3D HOLOGRAPHIC VIP GOLDEN EXAM TICKET (เอาเมาส์ชี้เพื่อหมุนตั๋วทองคำ 3 มิติ)</span>
          </div>

          <GoldenTicketMockup
            serialNo="TCH-2026-VIP-GOLDEN-PASS"
            candidateName="FUTURE GOVERNMENT TEACHER"
            examYear="2026"
            size="lg"
            isInteractive={true}
          />

          {/* Quick Bonus Tag */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-amber-300 font-medium bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-2xl">
            <Gift className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>โบนัสพิเศษในตั๋ว: รับฟรี! อัลบั้มเพลงช่วยจำกฎหมายครู Vol.1 (10 เพลงเต็ม + สมุด PDF มูลค่า 199 ฿)</span>
          </div>
        </div>

        {/* Pricing & CTA Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <div>
            <div className="text-xs text-slate-400 mb-1">ค่าสมัครสมาชิก VIP Pass ครั้งเดียวจบ (ไม่มีรายปี)</div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-5xl font-black text-amber-300">฿{product.price.toLocaleString()}</span>
              <span className="text-slate-500 line-through text-lg">฿{product.originalPrice.toLocaleString()}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                ประหยัด ฿{(product.originalPrice - product.price).toLocaleString()}
              </span>
            </div>
            <div className="text-xs text-amber-300/80 mt-1">{product.period}</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href={getLineOrderUrl(product.lineOrderMsg)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLineOrderClick}
              data-line-title={product.title}
              data-line-price={product.price}
              data-line-code={product.id}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#06C755] via-[#05b34c] to-[#06C755] hover:from-[#05b34c] hover:to-[#049b42] text-white font-black text-base shadow-[0_0_25px_rgba(6,199,85,0.35)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>สมัครเข้ากลุ่ม VIP รับตั๋วทองคำทันที</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 2: BEFORE / AFTER PAIN RELIEF & TIME SAVED
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-6 sm:p-10">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-3">
          <Clock className="w-4 h-4" />
          <span>เปรียบเทียบความคุ้มค่า & ผลลัพธ์ชัดเจน</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
          ทำไมตั๋วทองคำ VIP Exam Pass ถึงเปลี่ยนชีวิตคนสอบครูผู้ช่วย?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Before */}
          <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-3">
              <AlertTriangle className="w-4 h-4" />
              <span>ก่อนสมัคร (ความเหนื่อยล้าเดิมๆ)</span>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {product.beforePain}
            </p>
          </div>

          {/* After */}
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-3">
              <CheckCircle2 className="w-4 h-4" />
              <span>หลังมีตั๋ว VIP (ผลลัพธ์และความสำเร็จ)</span>
            </div>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              {product.afterBenefit}
            </p>
          </div>
        </div>

        {/* Time Saved Highlight */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 flex items-center justify-center gap-3 text-center">
          <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <span className="text-amber-200 font-bold text-sm sm:text-base">
            🚀 คุณค่าที่ได้รับ: {product.timeSaved}
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 3: 3 CORE BREAKTHROUGHS (นวัตกรรม 3 จุดเด่น)
      ───────────────────────────────────────────────────────────── */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">
            CORE BREAKTHROUGHS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            3 อาวุธลับติวสอบที่ไม่มีใครเหมือน
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {product.breakthroughs.map((b, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 4: UNBOXING DELIVERABLES (สิ่งที่คุณจะได้รับทันที)
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-6 sm:p-10">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-widest mb-3">
          <Gift className="w-4 h-4" />
          <span>WHAT YOU WILL GET (แกะกล่องสิ่งที่จะได้รับในตั๋ว VIP นี้)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
          รับสิทธิ์ติวสอบและสื่อการเรียนรู้ครบวงจร
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {product.deliverables.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-purple-500/30 transition-all flex items-start gap-4"
            >
              <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 5: ELIMINATING 3 MAIN FEARS (ทลาย 3 ข้อกังวลใจ)
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-6 sm:p-10">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>RISK REVERSAL & ZERO DOUBT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
          ทลาย 3 ข้อกังวลใจของคนเตรียมสอบ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {product.fears.map((fear, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-3">
                  <HelpCircle className="w-4 h-4 flex-shrink-0" />
                  <span>คำถาม: {fear.question}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{fear.answer}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ยืนยันความสบายใจ 100%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 6: CREATOR AUTHORITY & TRACK RECORD
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30 p-6 sm:p-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] flex-shrink-0 bg-slate-900">
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
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                PROVEN SUCCESS & MENTOR
              </span>
              <span className="text-xs text-slate-400 font-mono">
                โรงเรียนหาดใหญ่วิทยาลัย (ญ.ว.)
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              ครูจิรวัฒน์ เดชเส้ง (ครูอ้น)
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light mb-4">
              ครูดนตรีสากล ค.ศ.2 โรงเรียนหาดใหญ่วิทยาลัย, ผู้สอบบรรจุรับราชการครูติดอันดับต้นๆ ในรอบเดียว 
              ผู้สร้างสรรค์เพลงช่วยจำกฎหมายครูที่ติดหูคนสอบทั่วประเทศ และผู้พัฒนาบอทข้อสอบ Telegram ผสาน AI 
              พร้อมส่งต่อเทคนิคและคลังความรู้ให้ว่าที่ครูผู้ช่วยทุกคนก้าวสู่รั้วข้าราชการครูอย่างภาคภูมิใจ
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> สอบบรรจุรอบเดียวติดตัวจริง
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> สมาชิกติวสอบกว่า 3,000+ คน
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> ดูแลต่อเนื่องจนถึงวันรายงานตัว
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 7: SMART FAQ & DUAL CTA BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-6 sm:p-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-2">
            SMART FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            คำถามที่พบบ่อยเกี่ยวกับ AiAon Prep VIP
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto mb-10">
          {product.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-amber-300 transition-colors cursor-pointer"
              >
                <span className="text-sm sm:text-base">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    activeFaq === idx ? "rotate-180 text-amber-400" : ""
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dual CTA Bottom Bar */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs text-slate-400 mb-1">สมัครและรับลิงก์เข้ากลุ่ม Telegram VIP ทันที</div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {product.title}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
              data-line-title={product.title}
              data-line-price={product.price}
              data-line-code={product.id}
              className="flex-1 sm:flex-initial px-8 py-4 rounded-xl bg-gradient-to-r from-[#06C755] via-[#05b34c] to-[#06C755] hover:from-[#05b34c] hover:to-[#049b42] text-white font-black text-base shadow-[0_0_25px_rgba(6,199,85,0.35)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>สมัครทาง LINE (฿{product.price.toLocaleString()})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

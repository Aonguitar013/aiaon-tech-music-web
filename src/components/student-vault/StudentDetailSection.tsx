"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck, CheckCircle2, Zap, ArrowRight, Gift,
  Clock, AlertTriangle, Sparkles, UserCheck, HelpCircle,
  Laptop, ChevronDown, Check, Star, ArrowLeft, MessageSquare, Flame
} from "lucide-react";
import { StudentProductItem } from "@/components/student-vault/studentDataHelper";
import { StudentCardMockup } from "@/components/student-vault/StudentCardMockup";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";

interface StudentDetailSectionProps {
  product: StudentProductItem;
  onClose?: () => void;
}

export function StudentDetailSection({
  product,
  onClose,
}: StudentDetailSectionProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const { openLineModal } = useLineModal();

  const handleLineOrderClick = (e: React.MouseEvent) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: `ไอเทม: [${product.code}] ${product.title}`,
        price: product.price,
        message: product.lineOrderMsg,
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-10 font-prompt text-white">
      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 1: OUTCOME HEADLINE & 3D CYBER CARD HERO
      ───────────────────────────────────────────────────────────── */}
      <div className="relative rounded-3xl bg-slate-950/85 border border-pink-500/30 p-6 sm:p-10 overflow-hidden shadow-2xl">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 blur-3xl rounded-full pointer-events-none -mr-20 -mt-20" />

        {/* Top Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${product.badgeColor}`}>
            {product.badge}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white/80 border border-white/20">
            {product.code} • {product.serialNo}
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

        {/* 3D Holographic Card Showcase Stage */}
        <div className="relative my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900/80 border border-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.15)] flex flex-col items-center justify-center">
          <div className="text-[11px] font-mono font-bold tracking-widest text-pink-400 uppercase mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>3D HOLOGRAPHIC CYBER PASS (คลิกหรือเลื่อนเมาส์เพื่อหมุนการ์ด)</span>
          </div>

          <StudentCardMockup
            code={product.code}
            title={product.title}
            tagline={product.tagline}
            themeColor={product.themeColor}
            badgeText={product.code}
            serialNo={product.serialNo}
            isInteractive={true}
          />

          {/* Floating Trust Chips below Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-2xl mt-8 text-center">
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-1.5">
              <Laptop className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>ไม่ต้องลงแอปเพิ่ม</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
              <span>รองรับมือถือ 100%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>ข้อมูลอยู่บน Drive ตัวเอง</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>สิทธิ์ใช้งานตลอดชีพ</span>
            </div>
          </div>
        </div>

        {/* Hero Price & Action Box */}
        <div className="p-6 rounded-2xl bg-pink-950/20 border border-pink-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs text-slate-400 mb-1">ราคาพิเศษสำหรับนักเรียน (จ่ายครั้งเดียวตลอดชีพ)</div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300">
                ฿{product.price}
              </span>
              <span className="text-base text-slate-500 line-through">
                ฿{product.originalPrice}
              </span>
              <span className="text-xs font-bold text-emerald-400">
                (ประหยัด ฿{product.originalPrice - product.price})
              </span>
            </div>
            {product.perPersonNote && (
              <div className="text-xs text-cyan-300 mt-1 font-semibold">
                💡 {product.perPersonNote}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`https://line.me/R/oaMessage/@deu6776s/?${encodeURIComponent(product.lineOrderMsg)}`}
              onClick={handleLineOrderClick}
              data-line-title={`ไอเทม: ${product.title}`}
              data-line-price={product.price}
              data-line-code={product.code}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg bg-gradient-to-r ${product.btnGradient}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>สั่งซื้อผ่าน LINE OA ({product.price} ฿)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 2: "BEFORE VS AFTER" TRANSFORMATION TABLE
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-slate-950/80 border border-slate-800 p-6 sm:p-10 shadow-xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>BEFORE VS AFTER TRANSFORMATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            ชีวิตการเรียน: ก่อน vs หลัง มีไอเทมชิ้นนี้
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Before Pain Card */}
          <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base mb-3">
                <AlertTriangle className="w-5 h-5" />
                <span>❌ ก่อนมีไอเทมนี้ (ปัญหาที่ต้องเจอ)</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {product.beforePain}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-rose-500/20 text-xs text-rose-300/80">
              ⚠️ เสียเวลา เครียด ทำงานไม่ทัน และเสี่ยงคะแนนเก็บตกหล่น
            </div>
          </div>

          {/* After Benefit Card */}
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base mb-3">
                <CheckCircle2 className="w-5 h-5" />
                <span>✅ หลังมีไอเทมนี้ (ผลลัพธ์ที่ได้ทันที)</span>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed mb-4">
                {product.afterBenefit}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 text-xs text-emerald-300 font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{product.timeSaved}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 3: 3 CORE BREAKTHROUGHS / CAPABILITIES
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-slate-950/80 border border-slate-800 p-6 sm:p-10 shadow-xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase mb-2">
            <Star className="w-3.5 h-3.5" />
            <span>KEY CAPABILITIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            จุดเด่นที่ทำให้ไอเทมนี้คุ้มค่าเกินราคา
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {product.features.slice(0, 3).map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-pink-500/40 transition"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/30 flex items-center justify-center font-black text-sm mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  ฟีเจอร์ระดับมือโปร
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {feat}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1 text-[11px] text-pink-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>พร้อมใช้งานทันทีใน 2 นาที</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 4: UNBOXING DELIVERABLES (แกะกล่องสิ่งที่จะได้รับ)
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950/40 border border-pink-500/30 p-6 sm:p-10 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase mb-2">
              <Gift className="w-3.5 h-3.5" />
              <span>UNBOXING DELIVERABLES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              แกะกล่องสิ่งที่จะได้รับทันทีหลังชำระเงิน
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            ส่งมอบไฟล์โค้ด + เทมเพลต + สิทธิ์ตลอดชีพ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {product.deliverables.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 font-bold text-sm">
                #{idx + 1}
              </div>
              <div>
                <div className="text-sm font-bold text-white mb-1">
                  {item.title}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed font-light">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 5: ELIMINATING 3 FEARS / OBJECTIONS (ทลายความกังวล)
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-slate-950/80 border border-slate-800 p-6 sm:p-10 shadow-xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>NO-WORRY GUARANTEE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            ทลาย 3 ข้อกังวลใจของน้องๆ นักเรียนและผู้ปกครอง
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {product.fears.map((fear, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
              <div className="text-rose-400 text-xs font-bold">ความกังวลข้อที่ {idx + 1}:</div>
              <h4 className="text-white text-sm font-bold">
                “{fear.question}”
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                <span className="text-emerald-400 font-semibold">สบายใจได้ 100%:</span> {fear.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 6: CREATOR AUTHORITY & TRUST (ครูอ้น iAon Tech)
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center gap-8">
        <div className="relative shrink-0">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 p-1 shadow-2xl">
            <div className="w-full h-full rounded-[22px] bg-slate-950 flex flex-col items-center justify-center text-center p-3">
              <UserCheck className="w-10 h-10 text-cyan-400 mb-1" />
              <span className="text-xs font-bold text-white">ครูอ้น</span>
              <span className="text-[10px] text-slate-400">iAon Tech</span>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-zinc-950 text-[10px] font-black uppercase shadow-md">
            ค.ศ. 2
          </div>
        </div>

        <div className="space-y-3 flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DEVELOPED BY TEACHER FOR STUDENTS</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            ดูแลและพัฒนาโดย ครูจิรวัฒน์ เดชเส้ง (ครูอ้น)
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            ครูผู้สอนโรงเรียนหาดใหญ่วิทยาลัย (ญ.ว.) | มุ่งมั่นสร้างเครื่องมือช่วยเหลือนักเรียนให้ประหยัดเวลา มีผลงานที่โดดเด่นเข้าตากรรมการ TCAS และใช้ชีวิตในโรงเรียนได้อย่างมีความสุข
          </p>
          <div className="italic text-xs sm:text-sm text-amber-300 font-medium">
            “ให้ระบบทำงานแทน แล้วเอาเวลาไปใช้ชีวิตวัยรุ่นให้เต็มที่นะครับ”
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 7: SMART FAQS + DUAL CONVERSION CTA
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-slate-950/90 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-pink-400" />
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              คำถามที่พบบ่อยเฉพาะไอเทมนี้ (FAQ)
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            คลิกเพื่อดูคำตอบอย่างละเอียด
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {product.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-200 hover:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                    activeFaq === idx ? "rotate-180 text-pink-400" : ""
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dual Conversion CTA Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-pink-950 border border-pink-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs text-amber-400 font-bold uppercase mb-1">
              ⚡ ราคาพิเศษเฉพาะช่วงนี้ จ่ายครั้งเดียวตลอดชีพ
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              [ {product.code} ] {product.title}
            </div>
            <div className="text-xs text-slate-300 mt-1">
              เพียง <span className="text-pink-400 font-bold text-base">฿{product.price}</span> (จากปกติ ฿{product.originalPrice})
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {onClose && (
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-700"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>ปิดหน้าต่าง</span>
              </button>
            )}

            <a
              href={`https://line.me/R/oaMessage/@deu6776s/?${encodeURIComponent(product.lineOrderMsg)}`}
              onClick={handleLineOrderClick}
              data-line-title={`ไอเทม: ${product.title}`}
              data-line-price={product.price}
              data-line-code={product.code}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg bg-gradient-to-r ${product.btnGradient}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>สั่งซื้อทาง LINE OA ({product.price} ฿)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

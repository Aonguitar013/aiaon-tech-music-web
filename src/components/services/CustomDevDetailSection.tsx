"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck, CheckCircle2, Zap, ArrowRight, Gift,
  Clock, AlertTriangle, Sparkles, UserCheck, HelpCircle,
  Laptop, ChevronDown, Check, Star, ArrowLeft, MessageSquare,
  Cpu, Compass, Layers, Eye, FileText, Building2
} from "lucide-react";
import { CustomDevTierItem } from "@/components/services/customDevDataHelper";
import { CyberBlueprintMockup } from "@/components/services/CyberBlueprintMockup";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { getLineOrderUrl } from "@/lib/line";

interface CustomDevDetailSectionProps {
  tier: CustomDevTierItem;
  onClose?: () => void;
}

export function CustomDevDetailSection({
  tier,
  onClose,
}: CustomDevDetailSectionProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const { openLineModal } = useLineModal();

  const handleLineOrderClick = (e: React.MouseEvent) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: `บริการ: ${tier.name}`,
        price: tier.price,
        message: tier.lineOrderMsg,
      });
    }
  };

  const accentStyles = {
    cyan: {
      border: "border-cyan-500/40",
      glow: "bg-cyan-500/15",
      text: "text-cyan-400",
      badge: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
      btn: "from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black",
    },
    purple: {
      border: "border-purple-500/40",
      glow: "bg-purple-500/15",
      text: "text-purple-400",
      badge: "text-purple-300 border-purple-500/30 bg-purple-500/10",
      btn: "from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-pink-500 text-white font-black shadow-[0_0_30px_rgba(168,85,247,0.4)]",
    },
    amber: {
      border: "border-amber-500/40",
      glow: "bg-amber-500/15",
      text: "text-amber-400",
      badge: "text-amber-300 border-amber-500/30 bg-amber-500/10",
      btn: "from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black shadow-[0_0_30px_rgba(245,158,11,0.4)]",
    },
  }[tier.themeColor] || {
    border: "border-cyan-500/40",
    glow: "bg-cyan-500/15",
    text: "text-cyan-400",
    badge: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
    btn: "from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black",
  };

  return (
    <div className="w-full text-slate-100 font-prompt">
      <div className="relative rounded-3xl border border-slate-700/60 bg-slate-900/95 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Glow Accents */}
        <div className={`absolute top-0 right-0 w-96 h-96 ${accentStyles.glow} rounded-full blur-3xl pointer-events-none`} />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Bar with Close Button */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800 relative z-10">
          <div className="flex items-center gap-2">
            {tier.badge && (
              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${accentStyles.badge}`}>
                {tier.badge}
              </span>
            )}
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Bespoke Service • {tier.id.toUpperCase()}
            </span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all text-xs font-bold flex items-center gap-1"
            >
              <span>✕ ปิดหน้าต่าง</span>
            </button>
          )}
        </div>

        {/* ── PILLAR 1: OUTCOME-FOCUSED HEADLINE & 3D BLUEPRINT HERO ── */}
        <div className="py-8 border-b border-slate-800/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>ระยะเวลาส่งมอบ: {tier.deliveryDays}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
              {tier.headline}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {tier.subheadline}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
              <Zap className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-amber-300">
                {tier.timeSaved}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                {tier.price}
                <span className="text-xs font-normal text-slate-400 ml-2">/ เหมาจ่ายส่งมอบจบ</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <CyberBlueprintMockup
              tierId={tier.id}
              title={tier.name}
              themeColor={tier.themeColor}
              isFeatured={tier.isPopular}
              size="lg"
              isInteractive={true}
            />
            <span className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" /> แตะหรือวางเมาส์เพื่อหมุนดูพิมพ์เขียวสถาปัตยกรรม 3 มิติ
            </span>
          </div>
        </div>

        {/* ── PILLAR 2: BEFORE VS AFTER COMPARISON ── */}
        <div className="py-8 border-b border-slate-800/80 relative z-10">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center justify-center gap-2">
              <span>เปรียบเทียบความต่างอย่างชัดเจน</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">ชีวิตการทำงานเอกสารของโรงเรียน ก่อนและหลังให้เราพัฒนาระบบ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>ก่อนใช้บริการ (Before / ความเหนื่อยล้าเดิม)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {tier.beforePain}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>หลังติดตั้งระบบเสร็จ (After / ความสบายและเป็นระเบียบ)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {tier.afterBenefit}
              </p>
            </div>
          </div>
        </div>

        {/* ── PILLAR 3: 3 CORE BREAKTHROUGHS ── */}
        <div className="py-8 border-b border-slate-800/80 relative z-10">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center justify-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>3 จุดเด่นสำคัญที่ออกแบบมาเพื่อโรงเรียนโดยเฉพาะ</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">สถาปัตยกรรมระบบคลาวด์ความเร็วสูง ปลอดภัยตามบริบทราชการไทย</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tier.breakthroughs.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2.5 hover:border-slate-500 transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-black text-xs font-mono">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-sm text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── PILLAR 4: UNBOXING DELIVERABLES ── */}
        <div className="py-8 border-b border-slate-800/80 relative z-10">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center justify-center gap-2">
              <Gift className="w-5 h-5 text-purple-400" />
              <span>สิ่งที่คุณและโรงเรียนจะได้รับในการส่งมอบ (Deliverables)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">ส่งมอบโค้ด สิทธิ์ 100% เอกสารราชการ และการอบรมพร้อมดูแล</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {tier.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-start gap-3"
              >
                <Check className={`w-4 h-4 ${accentStyles.text} shrink-0 mt-0.5`} />
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PILLAR 5: ELIMINATING 3 FEARS ── */}
        <div className="py-8 border-b border-slate-800/80 relative z-10">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>ทลาย 3 ข้อกังวลใจของครูและผู้บริหาร</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">มั่นใจได้ 100% ตอบโจทย์ทั้งเรื่องงบประมาณ ความปลอดภัย และระเบียบพัสดุ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tier.fears.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-800/30 border border-slate-700/50 space-y-2"
              >
                <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
                  <span>❓ ข้อสงสัย #{idx + 1}</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-white">{item.question}</h4>
                <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-700/40">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── PILLAR 6: CREATOR AUTHORITY ── */}
        <div className="py-8 border-b border-slate-800/80 relative z-10">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-800/80 to-slate-900 border border-slate-700 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-cyan-500 to-purple-600 p-0.5 shrink-0 shadow-lg">
              <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-2xl sm:text-3xl font-black text-white">
                👨‍🏫
              </div>
            </div>

            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-bold">
                <UserCheck className="w-3.5 h-3.5" />
                <span>พัฒนาและดูแลโดยตรงโดย ครูอ้น — จิรวัฒน์ เดชเส้ง</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                ครูด้านเทคโนโลยี &amp; ผู้พัฒนาระบบโรงเรียนหาดใหญ่วิทยาลัย (ญ.ว.)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                เข้าใจบริบทภาระงานครูไทยอย่างลึกซึ้ง พัฒนาระบบขับเคลื่อนโรงเรียนขนาดใหญ่พิเศษกว่า 4,000 คนมาแล้วจริง ไม่ใช่นักเขียนโปรแกรมภายนอกที่ไม่เข้าใจระบบการศึกษา พร้อมดูแลอย่างจริงใจและถูกต้องตามระเบียบราชการ 100%
              </p>
            </div>
          </div>
        </div>

        {/* ── PILLAR 7: SMART FAQS & DUAL CTA ── */}
        <div className="pt-8 relative z-10 space-y-8">
          <div>
            <div className="text-center max-w-xl mx-auto mb-6">
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center justify-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                <span>คำถามที่พบบ่อย (FAQs)</span>
              </h2>
            </div>

            <div className="space-y-2.5 max-w-3xl mx-auto">
              {tier.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-700/60 bg-slate-800/40 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-white hover:text-cyan-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform ${activeFaq === idx ? "rotate-180 text-cyan-400" : "text-slate-400"}`}
                    />
                  </button>
                  {activeFaq === idx && (
                    <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-700/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dual Action Bar */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">แพ็กเกจที่คุณเลือก:</span>
              <span className="text-lg font-bold text-white">{tier.name}</span>
              <span className="text-xs text-cyan-400 ml-2">({tier.price})</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-bold transition-all w-full sm:w-auto"
                >
                  เลือกดูแพ็กเกจอื่น
                </button>
              )}

              <a
                href={getLineOrderUrl(tier.lineOrderMsg)}
                onClick={handleLineOrderClick}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,199,85,0.35)] hover:scale-105 transition-all bg-gradient-to-r from-[#06C755] via-[#05b34c] to-[#06C755] hover:from-[#05b34c] hover:to-[#049b42] text-white font-bold cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>ส่งบรีฟงาน &amp; จองคิวผ่าน LINE</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

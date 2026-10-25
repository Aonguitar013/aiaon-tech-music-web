"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck, CheckCircle2, Zap, ArrowRight, Gift, ShoppingCart,
  Clock, AlertTriangle, Sparkles, UserCheck, HelpCircle, FileText,
  Lock, Laptop, RefreshCw, MessageSquare, BookOpen, Download,
  Printer, ChevronDown, Check, Star, ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Book3DMockup } from "@/components/ebooks/Book3DMockup";
import { EbookMetadata } from "@/components/ebooks/ebookDataHelper";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { getLineOrderUrl } from "@/lib/line";

interface EbookDetailSectionProps {
  ebook: EbookMetadata;
  onAddToCart?: (ebook: EbookMetadata) => void;
  isInCart?: boolean;
}

export function EbookDetailSection({
  ebook,
  onAddToCart,
  isInCart = false,
}: EbookDetailSectionProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const { openLineModal } = useLineModal();

  const orderMessage = `สวัสดีครับครูอ้น สนใจสั่งซื้อ E-Book [${ebook.code}] ${ebook.title} ราคาพิเศษ ฿${ebook.earlyBirdPrice} บาท ครับ`;

  const handleLineOrderClick = (e: React.MouseEvent) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: `E-Book: [${ebook.code}] ${ebook.title}`,
        price: ebook.earlyBirdPrice,
        message: orderMessage,
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-10 font-prompt">
      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 1: ABOVE-THE-FOLD OUTCOME HEADLINE & 3D BOOK HERO
      ───────────────────────────────────────────────────────────── */}
      <div className="relative rounded-3xl bg-slate-950/80 border border-slate-800 p-6 sm:p-10 overflow-hidden shadow-2xl">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none -mr-20 -mt-20" />

        {/* Top Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
            #{ebook.rank} BESTSELLER • {ebook.code}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/60">
            {ebook.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
            ลดพิเศษ {ebook.discountPct}%
          </span>
        </div>

        {/* Outcome Headline */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
          {ebook.headline}
        </h1>

        <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-light mb-8 max-w-3xl">
          {ebook.subheadline}
        </p>

        {/* 3D Book Showcase Stage */}
        <div className="relative my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900/80 border border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.15)] flex flex-col items-center justify-center">
          <div className="text-[11px] font-mono font-bold tracking-widest text-indigo-400 uppercase mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>FUTURISTIC 3D HARDCOVER BOOK PREVIEW (คลิกหรือชี้เพื่อหมุน 3D)</span>
          </div>

          <Book3DMockup
            code={ebook.code}
            title={ebook.title}
            category={ebook.category}
            themeColor={ebook.themeColor}
            rank={ebook.rank}
            size="lg"
            isInteractive={true}
          />

          {/* Floating Trust Chips below Book */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-2xl mt-8 text-center">
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-1.5">
              <Laptop className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>อ่านได้ทุกอุปกรณ์</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-1.5">
              <Printer className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>พิมพ์ PDF A4 ได้</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>มี Prompts พร้อมใช้</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>อัปเดตฟรีตลอดชีพ</span>
            </div>
          </div>
        </div>

        {/* Hero Price & Action Box */}
        <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs text-slate-400 mb-1">ราคาพิเศษช่วงเปิดตัว (Early Bird)</div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black text-amber-400">
                ฿{ebook.earlyBirdPrice}
              </span>
              <span className="text-base text-slate-500 line-through">
                ฿{ebook.regularPrice}
              </span>
              <span className="text-xs font-bold text-emerald-400">
                (ประหยัดทันที ฿{ebook.regularPrice - ebook.earlyBirdPrice})
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              สิทธิ์องค์กร/สถานศึกษา: <span className="text-white font-bold">฿{ebook.schoolPrice}</span> (แชร์อ่านได้ทั้งโรงเรียน)
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {onAddToCart && (
              <button
                onClick={() => onAddToCart(ebook)}
                className={`w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
                  isInCart
                    ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>อยู่ในตะกร้าแล้ว</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>ใส่ตะกร้า</span>
                  </>
                )}
              </button>
            )}

            <a
              href={getLineOrderUrl(orderMessage)}
              onClick={handleLineOrderClick}
              data-line-title={`E-Book: ${ebook.title}`}
              data-line-price={ebook.earlyBirdPrice}
              data-line-code={ebook.code}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#06C755] via-[#05b34c] to-[#06C755] hover:from-[#05b34c] hover:to-[#049b42] text-white font-black rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-[#06C755]/30 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>สั่งซื้อทาง LINE OA</span>
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
            <span>TRANSFORMATION & TIME RECLAIM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            ชีวิตการทำงานของครู: ก่อน vs หลัง มีคัมภีร์เล่มนี้
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Before Pain Card */}
          <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base mb-3">
                <AlertTriangle className="w-5 h-5" />
                <span>❌ ก่อนมีคัมภีร์เล่มนี้ (ปัญหาที่ต้องเผชิญ)</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {ebook.beforePain}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-rose-500/20 text-xs text-rose-300/80">
              ⚠️ เสียเวลาลองผิดลองถูก เครียดสะสม และเสี่ยงถูกกรรมการประเมินตีกลับ
            </div>
          </div>

          {/* After Benefit Card */}
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base mb-3">
                <CheckCircle2 className="w-5 h-5" />
                <span>✅ หลังมีคัมภีร์เล่มนี้ (ผลลัพธ์ที่เปลี่ยนไป)</span>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed mb-4">
                {ebook.afterBenefit}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 text-xs text-emerald-300 font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{ebook.timeSaved}</span>
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
            <span>CORE BREAKTHROUGHS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            3 เสาหลักขุมพลังความรู้ที่คุณจะได้รับในเล่ม
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ebook.deliverables.slice(0, 3).map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-indigo-500/40 transition"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-black text-sm mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                  {feat.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1 text-[11px] text-indigo-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>นำไปปรับใช้ได้จริงทันที</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 4: UNBOXING DELIVERABLES (แกะกล่องสิ่งที่จะได้รับ)
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/40 border border-indigo-500/30 p-6 sm:p-10 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase mb-2">
              <Gift className="w-3.5 h-3.5" />
              <span>UNBOXING DELIVERABLES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              แกะกล่องสิ่งที่คุณครูจะได้รับทันทีหลังสั่งซื้อ
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            ส่งมอบลิงก์ส่วนตัว + สิทธิ์ตลอดชีพ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-1">
                1. สิทธิ์อ่านออนไลน์บน Interactive Web Reader
              </div>
              <div className="text-xs text-slate-400 leading-relaxed font-light">
                เปิดอ่านผ่านเว็บเบราว์เซอร์ได้ทันทีบนมือถือ แท็บเล็ต หรือคอมพิวเตอร์ ไม่ต้องติดตั้งแอปเพิ่ม ไม่เปลืองหน่วยความจำ
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-1">
                2. ฟังก์ชันพิมพ์เป็นเอกสาร PDF A4 มาตรฐาน
              </div>
              <div className="text-xs text-slate-400 leading-relaxed font-light">
                ทุกเล่มมีปุ่มกดพิมพ์เป็น PDF A4 คมชัดสูง จัดหน้าสวยงามพร้อมนำไปเข้าเล่มเสนอผู้บริหารหรือแนบระบบ DPA
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-1">
                3. คลัง Prompts & ไฟล์แม่แบบดาวน์โหลดได้
              </div>
              <div className="text-xs text-slate-400 leading-relaxed font-light">
                ชุดคำสั่ง AI และตารางตัวอย่าง คัดลอกไปปรับใช้แทนค่าในวงเล็บได้ทันที 100% ไม่ต้องเริ่มจากหน้ากระดาษเปล่า
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-1">
                4. สิทธิ์เข้าถึงตลอดชีพ + อัปเดตฟรีไม่มีวันหมดอายุ
              </div>
              <div className="text-xs text-slate-400 leading-relaxed font-light">
                ซื้อครั้งเดียวใช้งานได้ตลอดไป หากมีเกณฑ์การประเมินใหม่ของ ก.ค.ศ. จะได้รับการอัปเดตเนื้อหาเพิ่มเติมฟรี
              </div>
            </div>
          </div>
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
            ทลาย 3 ข้อกังวลใจที่คุณครูมักจะถามบ่อยที่สุด
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
            <div className="text-rose-400 text-xs font-bold">ความกังวลข้อที่ 1:</div>
            <h4 className="text-white text-sm font-bold">
              “ไม่เก่งคอม ไม่ถนัดเทคโนโลยี จะทำตามได้ไหม?”
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              <span className="text-emerald-400 font-semibold">สบายใจได้ 100% ครับ:</span> เนื้อหาเรียบเรียงแบบจับมือทำ (Step-by-Step) แค่คลิกตามขั้นตอน หรือ Copy คำสั่งไปวาง ทุกขั้นตอนมีตัวอย่างภาพประกอบชัดเจนครับ
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
            <div className="text-rose-400 text-xs font-bold">ความกังวลข้อที่ 2:</div>
            <h4 className="text-white text-sm font-bold">
              “เนื้อหาตรงตามเกณฑ์ ก.ค.ศ. และ สพฐ. ล่าสุดจริงไหม?”
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              <span className="text-emerald-400 font-semibold">ตรงตามระเบียบ 100% ครับ:</span> เขียนโดยครูผู้ปฏิบัติงานสอนจริง ผ่านการสังเคราะห์จากเกณฑ์ ว.PA และการประเมินในระบบ DPA ไม่ใช่ทฤษฎีลอยๆ แต่ใช้ปฏิบัติงานได้จริง
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
            <div className="text-rose-400 text-xs font-bold">ความกังวลข้อที่ 3:</div>
            <h4 className="text-white text-sm font-bold">
              “หากทำไฟล์หาย หรือต้องการใบเสร็จไปเบิก?”
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              <span className="text-emerald-400 font-semibold">มีบริการซัพพอร์ตตลอดเวลา:</span> สามารถทัก LINE OA ขอกู้คืนลิงก์ได้ตลอดชีพ และขอรับใบเสร็จรับเงินเพื่อนำไปประกอบการเบิกจ่ายของหน่วยงานได้ครับ
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 6: CREATOR CREDIBILITY & AUTHORITY (ครูอ้น iAon Tech)
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center gap-8">
        {/* Creator Avatar & Seal */}
        <div className="relative shrink-0">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-amber-400 p-1 shadow-2xl">
            <div className="w-full h-full rounded-[22px] bg-slate-950 overflow-hidden relative shadow-inner">
              <Image
                src="/images/kru_aon_profile.png"
                alt="ครูจิรวัฒน์ เดชเส้ง (ครูอ้น)"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 112px, 128px"
              />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-zinc-950 text-[10px] font-black uppercase shadow-md z-10">
            ค.ศ. 2
          </div>
        </div>

        {/* Creator Info */}
        <div className="space-y-3 flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AUTHOR & EDUCATIONAL SYSTEM ARCHITECT</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            เขียนและพัฒนาโดย ครูจิรวัฒน์ เดชเส้ง (ครูอ้น)
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            ครูชำนาญการ (ค.ศ.2) โรงเรียนหาดใหญ่วิทยาลัย (ญ.ว.) | ผู้ก่อตั้ง AiAon Tech และผู้ออกแบบระบบบริหารจัดการห้องเรียนดิจิทัลแก่นักเรียนกว่า 279 คน มุ่งมั่นส่งต่อนวัตกรรมและเทมเพลตที่ใช้ได้จริง เพื่อคืนเวลาชีวิตให้ครูไทยทุกคน
          </p>
          <div className="italic text-xs sm:text-sm text-amber-300 font-medium">
            “ให้ระบบทำงานแทนคุณ แล้วเอาเวลาไปใช้ชีวิตนะครับ”
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ELEMENT 7: SMART FAQS + DUAL CONVERSION CTA
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-slate-950/90 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              คำถามที่พบบ่อยเฉพาะเล่มนี้ (FAQ)
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            คลิกที่หัวข้อเพื่อดูคำตอบอย่างละเอียด
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {ebook.faqs.map((faq, idx) => (
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
                    activeFaq === idx ? "rotate-180 text-indigo-400" : ""
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
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs text-amber-400 font-bold uppercase mb-1">
              ⚡ สั่งซื้อวันนี้รับสิทธิ์พิเศษทันที
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              [ {ebook.code} ] {ebook.title}
            </div>
            <div className="text-xs text-slate-300 mt-1">
              ราคาพิเศษเพียง <span className="text-amber-400 font-bold text-base">฿{ebook.earlyBirdPrice}</span> (จากปกติ ฿{ebook.regularPrice})
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              href="/ebooks"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ดูเล่มอื่นในคลัง (30 เล่ม)</span>
            </Link>

            <a
              href={getLineOrderUrl(orderMessage)}
              onClick={handleLineOrderClick}
              data-line-title={`E-Book: ${ebook.title}`}
              data-line-price={ebook.earlyBirdPrice}
              data-line-code={ebook.code}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#06C755] via-[#05b34c] to-[#06C755] hover:from-[#05b34c] hover:to-[#049b42] text-white font-black rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-[#06C755]/30 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>สั่งซื้อทาง LINE OA ทันที</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck, CheckCircle2, Zap, ArrowRight, Gift, ShoppingCart,
  Clock, AlertTriangle, Sparkles, HelpCircle,
  Laptop, RefreshCw, MessageSquare, BookOpen,
  Printer, ChevronDown, Check, Star, ArrowLeft
} from "lucide-react";
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
    <div className="w-full flex flex-col gap-10 font-prompt text-[#1E293B]">
      {/* ELEMENT 1: ABOVE-THE-FOLD OUTCOME HEADLINE & 3D BOOK HERO */}
      <div className="relative rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-10 overflow-hidden shadow-sm">
        {/* Top Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
            #{ebook.rank} BESTSELLER • {ebook.code}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF8F5] text-[#475569] border border-[#E2E8F0]">
            {ebook.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FEF9EF] text-[#92400E] border border-[#FDE68A]">
            ลดพิเศษ {ebook.discountPct}%
          </span>
        </div>

        {/* Outcome Headline */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight mb-4">
          {ebook.headline}
        </h1>

        <p className="text-[#475569] text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-3xl">
          {ebook.subheadline}
        </p>

        {/* 3D Book Showcase Stage */}
        <div className="relative my-8 p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#E2E8F0] flex flex-col items-center justify-center">
          <div className="text-[11px] font-mono font-bold tracking-widest text-[#1D4ED8] uppercase mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
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
            <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] text-xs text-[#334155] font-medium flex items-center justify-center gap-1.5 shadow-2xs">
              <Laptop className="w-4 h-4 text-[#0E7490] shrink-0" />
              <span>อ่านได้ทุกอุปกรณ์</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] text-xs text-[#334155] font-medium flex items-center justify-center gap-1.5 shadow-2xs">
              <Printer className="w-4 h-4 text-[#059669] shrink-0" />
              <span>พิมพ์ PDF A4 ได้</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] text-xs text-[#334155] font-medium flex items-center justify-center gap-1.5 shadow-2xs">
              <Zap className="w-4 h-4 text-[#D97706] shrink-0" />
              <span>มี Prompts พร้อมใช้</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] text-xs text-[#334155] font-medium flex items-center justify-center gap-1.5 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>อัปเดตฟรีตลอดชีพ</span>
            </div>
          </div>
        </div>

        {/* Hero Price & Action Box */}
        <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs text-[#64748B] mb-1 font-medium">ราคาพิเศษช่วงเปิดตัว (Early Bird)</div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black text-[#D97706]">
                ฿{ebook.earlyBirdPrice}
              </span>
              <span className="text-base text-[#94A3B8] line-through">
                ฿{ebook.regularPrice}
              </span>
              <span className="text-xs font-bold text-[#059669]">
                (ประหยัดทันที ฿{ebook.regularPrice - ebook.earlyBirdPrice})
              </span>
            </div>
            <div className="text-xs text-[#64748B] mt-1">
              สิทธิ์องค์กร/สถานศึกษา: <span className="text-[#0F172A] font-bold">฿{ebook.schoolPrice}</span> (แชร์อ่านได้ทั้งโรงเรียน)
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {onAddToCart && (
              <button
                onClick={() => onAddToCart(ebook)}
                className={`w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  isInCart
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                    : "bg-white hover:bg-[#F1ECE4] text-[#0F172A] border border-[#E2E8F0]"
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
              className="w-full sm:w-auto px-7 py-3.5 bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-black rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>สั่งซื้อทาง LINE OA</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ELEMENT 2: BEFORE VS AFTER */}
      <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-10 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>TRANSFORMATION &amp; TIME RECLAIM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            ชีวิตการทำงานของครู: ก่อน vs หลัง มีคัมภีร์เล่มนี้
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-rose-50/70 border border-rose-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-700 font-bold text-base mb-3">
                <AlertTriangle className="w-5 h-5" />
                <span>❌ ก่อนมีคัมภีร์เล่มนี้ (ปัญหาที่ต้องเผชิญ)</span>
              </div>
              <p className="text-[#334155] text-sm leading-relaxed mb-4">
                {ebook.beforePain}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-rose-200 text-xs text-rose-700 font-medium">
              ⚠️ เสียเวลาลองผิดลองถูก เครียดสะสม และเสี่ยงถูกกรรมการประเมินตีกลับ
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-base mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>✅ หลังมีคัมภีร์เล่มนี้ (ผลลัพธ์ที่เปลี่ยนไป)</span>
              </div>
              <p className="text-[#1E293B] text-sm leading-relaxed mb-4">
                {ebook.afterBenefit}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#D97706] shrink-0" />
              <span>{ebook.timeSaved}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ELEMENT 3: 3 CORE BREAKTHROUGHS */}
      <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-10 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase mb-2">
            <Star className="w-3.5 h-3.5 text-cyan-600" />
            <span>CORE BREAKTHROUGHS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            3 เสาหลักขุมพลังความรู้ที่คุณจะได้รับในเล่ม
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ebook.deliverables.slice(0, 3).map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] flex flex-col justify-between hover:border-[#2563EB]/40 transition"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] flex items-center justify-center font-black text-sm mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-2 leading-snug">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {feat.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center gap-1 text-[11px] text-[#059669] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                <span>นำไปปรับใช้ได้จริงทันที</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ELEMENT 4: UNBOXING DELIVERABLES */}
      <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF9EF] border border-[#FDE68A] text-[#92400E] text-xs font-bold uppercase mb-2">
              <Gift className="w-3.5 h-3.5 text-[#D97706]" />
              <span>UNBOXING DELIVERABLES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              แกะกล่องสิ่งที่คุณครูจะได้รับทันทีหลังสั่งซื้อ
            </h2>
          </div>
          <span className="text-xs text-[#64748B] font-medium">
            ส่งมอบลิงก์ส่วนตัว + สิทธิ์ตลอดชีพ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: BookOpen,
              bg: "bg-cyan-50 border-cyan-200 text-cyan-700",
              title: "1. สิทธิ์อ่านออนไลน์บน Interactive Web Reader",
              desc: "เปิดอ่านผ่านเว็บเบราว์เซอร์ได้ทันทีบนมือถือ แท็บเล็ต หรือคอมพิวเตอร์ ไม่ต้องติดตั้งแอปเพิ่ม ไม่เปลืองหน่วยความจำ",
            },
            {
              icon: Printer,
              bg: "bg-emerald-50 border-emerald-200 text-emerald-700",
              title: "2. ฟังก์ชันพิมพ์เป็นเอกสาร PDF A4 มาตรฐาน",
              desc: "ทุกเล่มมีปุ่มกดพิมพ์เป็น PDF A4 คมชัดสูง จัดหน้าสวยงามพร้อมนำไปเข้าเล่มเสนอผู้บริหารหรือแนบระบบ DPA",
            },
            {
              icon: Zap,
              bg: "bg-purple-50 border-purple-200 text-purple-700",
              title: "3. คลัง Prompts & ไฟล์แม่แบบดาวน์โหลดได้",
              desc: "ชุดคำสั่ง AI และตารางตัวอย่าง คัดลอกไปปรับใช้แทนค่าในวงเล็บได้ทันที 100% ไม่ต้องเริ่มจากหน้ากระดาษเปล่า",
            },
            {
              icon: RefreshCw,
              bg: "bg-amber-50 border-amber-200 text-amber-700",
              title: "4. สิทธิ์เข้าถึงตลอดชีพ + อัปเดตฟรีไม่มีวันหมดอายุ",
              desc: "ซื้อครั้งเดียวใช้งานได้ตลอดไป หากมีเกณฑ์การประเมินใหม่ของ ก.ค.ศ. จะได้รับการอัปเดตเนื้อหาเพิ่มเติมฟรี",
            },
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${item.bg}`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0F172A] mb-1">{item.title}</div>
                  <div className="text-xs text-[#475569] leading-relaxed">{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ELEMENT 5: ELIMINATING 3 FEARS */}
      <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-10 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-bold uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>NO-WORRY GUARANTEE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            ทลาย 3 ข้อกังวลใจที่คุณครูมักจะถามบ่อยที่สุด
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              num: "ความกังวลข้อที่ 1:",
              q: "“ไม่เก่งคอม ไม่ถนัดเทคโนโลยี จะทำตามได้ไหม?”",
              lead: "สบายใจได้ 100% ครับ:",
              a: " เนื้อหาเรียบเรียงแบบจับมือทำ (Step-by-Step) แค่คลิกตามขั้นตอน หรือ Copy คำสั่งไปวาง ทุกขั้นตอนมีตัวอย่างภาพประกอบชัดเจนครับ",
            },
            {
              num: "ความกังวลข้อที่ 2:",
              q: "“เนื้อหาตรงตามเกณฑ์ ก.ค.ศ. และ สพฐ. ล่าสุดจริงไหม?”",
              lead: "ตรงตามระเบียบ 100% ครับ:",
              a: " เขียนโดยครูผู้ปฏิบัติงานสอนจริง ผ่านการสังเคราะห์จากเกณฑ์ ว.PA และการประเมินในระบบ DPA ไม่ใช่ทฤษฎีลอยๆ แต่ใช้ปฏิบัติงานได้จริง",
            },
            {
              num: "ความกังวลข้อที่ 3:",
              q: "“หากทำไฟล์หาย หรือต้องการใบเสร็จไปเบิก?”",
              lead: "มีบริการซัพพอร์ตตลอดเวลา:",
              a: " สามารถทัก LINE OA ขอกู้คืนลิงก์ได้ตลอดชีพ และขอรับใบเสร็จรับเงินเพื่อนำไปประกอบการเบิกจ่ายของหน่วยงานได้ครับ",
            },
          ].map((f, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] space-y-2.5">
              <div className="text-rose-700 text-xs font-bold">{f.num}</div>
              <h4 className="text-[#0F172A] text-sm font-bold">{f.q}</h4>
              <p className="text-[#475569] text-xs leading-relaxed">
                <span className="text-[#059669] font-semibold">{f.lead}</span>
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ELEMENT 6: CREATOR CREDIBILITY */}
      <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="relative shrink-0">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-[#2563EB] via-[#0E7490] to-[#D97706] p-1 shadow-md">
            <div className="w-full h-full rounded-[22px] bg-[#FAF8F5] overflow-hidden relative">
              <Image
                src="/images/kru_aon_profile.png"
                alt="ครูจิรวัฒน์ เดชเส้ง (ครูอ้น)"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 112px, 128px"
              />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-[#0F172A] text-[10px] font-black uppercase shadow-xs z-10">
            ค.ศ. 2
          </div>
        </div>

        <div className="space-y-3 flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-[#0E7490] border border-cyan-200 text-xs font-bold uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AUTHOR &amp; EDUCATIONAL SYSTEM ARCHITECT</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
            เขียนและพัฒนาโดย ครูจิรวัฒน์ เดชเส้ง (ครูอ้น)
          </h3>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            ครูชำนาญการ (ค.ศ.2) โรงเรียนหาดใหญ่วิทยาลัย (ญ.ว.) | ผู้ก่อตั้ง AiAon Tech และผู้ออกแบบระบบบริหารจัดการห้องเรียนดิจิทัลแก่นักเรียนกว่า 279 คน มุ่งมั่นส่งต่อนวัตกรรมและเทมเพลตที่ใช้ได้จริง เพื่อคืนเวลาชีวิตให้ครูไทยทุกคน
          </p>
          <div className="italic text-xs sm:text-sm text-[#B45309] font-semibold">
            “ให้ระบบทำงานแทนคุณ แล้วเอาเวลาไปใช้ชีวิตนะครับ”
          </div>
        </div>
      </div>

      {/* ELEMENT 7: SMART FAQS + DUAL CONVERSION CTA */}
      <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-[#2563EB]" />
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
              คำถามที่พบบ่อยเฉพาะเล่มนี้ (FAQ)
            </h3>
          </div>
          <p className="text-xs text-[#64748B]">
            คลิกที่หัวข้อเพื่อดูคำตอบอย่างละเอียด
          </p>
        </div>

        <div className="space-y-3">
          {ebook.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] overflow-hidden transition"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#0F172A] hover:bg-[#F1ECE4] transition cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#64748B] shrink-0 transition-transform ${
                    activeFaq === idx ? "rotate-180 text-[#2563EB]" : ""
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#E2E8F0] pt-3 bg-white">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dual Conversion CTA Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#BFDBFE] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs text-[#B45309] font-bold uppercase mb-1">
              ⚡ สั่งซื้อวันนี้รับสิทธิ์พิเศษทันที
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#0F172A]">
              [ {ebook.code} ] {ebook.title}
            </div>
            <div className="text-xs text-[#475569] mt-1">
              ราคาพิเศษเพียง <span className="text-[#D97706] font-bold text-base">฿{ebook.earlyBirdPrice}</span> (จากปกติ ฿{ebook.regularPrice})
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              href="/ebooks"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-[#F1ECE4] text-[#0F172A] text-xs font-bold transition flex items-center justify-center gap-1.5 border border-[#E2E8F0]"
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
              className="w-full sm:w-auto px-7 py-3.5 bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-black rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
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

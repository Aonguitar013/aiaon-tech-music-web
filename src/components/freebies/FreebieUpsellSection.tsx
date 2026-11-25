"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  X,
  Star,
} from "lucide-react";
import { getLineOrderUrl } from "@/lib/line";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { StudentVaultPromotionSection } from "@/components/student-vault/StudentVaultPromotionSection";
import { cn } from "@/lib/utils";

export interface UpsellOffer {
  itemCode: string;
  title: string;
  desc: string;
  regularPrice: number;
  price: number;
  savings: string;
  tag: string;
  badgeStyle: string;
  borderColor: string;
  message: string;
  isPopular?: boolean;
  features: string[];
}

export const UPSELL_OFFERS: UpsellOffer[] = [
  {
    itemCode: "SYS02-UPGRADE",
    title: "SYS02: ระบบคำนวณ ปพ.5 & ตัดเกรดอัตโนมัติ (ตัวเต็มครบทุกฟีเจอร์)",
    desc: "ผูกสูตรครบ 8 ระดับเกรด + คำนวณ GPAX + หน้าสรุปสถิติพร้อมปริ้นท์ส่งวิชาการ ก๊อปปี้ใช้ได้ทันที",
    regularPrice: 390,
    price: 199,
    savings: "ลดพิเศษ 49%",
    tag: "🟢 อัปเกรดเดี่ยวสุดฮิต",
    badgeStyle: "bg-emerald-50 text-emerald-800 border-emerald-200",
    borderColor: "border-[#E2E8F0] hover:border-emerald-400",
    message:
      "สวัสดีครับ ได้ลองโหลดไฟล์ฟรีแล้ว สนใจรับสิทธิ์อัปเกรดเป็น [SYS02] ระบบคำนวณ ปพ.5 & ตัดเกรดอัตโนมัติตัวเต็ม ราคาพิเศษ 199 บาทครับ [#TEACHER]",
    features: [
      "ผูกสูตรตัดเกรดอัตโนมัติครบ 8 ระดับ (0 - 4)",
      "คำนวณ GPAX และร้อยละคะแนนเก็บแบบเรียลไทม์",
      "หน้า Print-Ready แบบฟอร์ม ปพ.5 ส่งฝ่ายวิชาการได้ทันที",
      "มีเมนูภาษาไทยก๊อปปี้ชีตใช้งานได้ทันที ไม่ต้องแตะโค้ด",
    ],
  },
  {
    itemCode: "BUNDLE-01",
    title: "ชุดเอาตัวรอดครูประจำชั้นยุคดิจิทัล (มัดรวม 4 ระบบ Zero-Tech)",
    desc: "ได้ครบทั้งระบบคัดกรอง SDQ + ห้องเรียนสีขาว + เช็คการบ้าน + ตารางเวรความสะอาด",
    regularPrice: 600,
    price: 249,
    savings: "ลดพิเศษ 58%",
    tag: "👑 อัปเกรดยกเซ็ต คุ้มค่าสูงสุด",
    badgeStyle: "bg-amber-50 text-amber-800 border-amber-200",
    borderColor: "border-amber-300 hover:border-amber-400",
    isPopular: true,
    message:
      "สวัสดีครับ ได้ลองโหลดไฟล์ฟรีแล้ว สนใจรับสิทธิ์อัปเกรดเป็น [BUNDLE-01] ชุดเอาตัวรอดครูประจำชั้น (4 ระบบ) ราคาพิเศษ 249 บาทครับ [#TEACHER]",
    features: [
      "SYS09: ระบบคัดกรอง SDQ และดูแลช่วยเหลือนักเรียน",
      "AONE09: ระบบรายงานห้องเรียนสีขาว & คะแนนเก็บ",
      "STU02: ระบบเช็คการบ้าน & งานค้างประจำห้อง",
      "SYS27: ระบบจัดตารางเวรทำความสะอาด & ตรวจพื้นที่",
    ],
  },
];

interface UpsellCardProps {
  offer: UpsellOffer;
  isCompact?: boolean;
}

function UpsellCard({ offer, isCompact = false }: UpsellCardProps) {
  const { openLineModal } = useLineModal();
  const lineOrderUrl = getLineOrderUrl(offer.message);

  const handleOrderClick = (e: React.MouseEvent) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: offer.title,
        price: `${offer.price} ฿`,
        itemCode: offer.itemCode,
        message: offer.message,
      });
    }
  };

  return (
    <div
      className={cn(
        "relative flex flex-col h-full rounded-3xl p-5 sm:p-6 bg-white border transition-all duration-300 shadow-sm hover:shadow-md group hover:-translate-y-1",
        offer.borderColor,
        offer.isPopular && "ring-2 ring-amber-400/35"
      )}
    >
      {/* Popular Corner Badge */}
      {offer.isPopular && (
        <div className="absolute -top-3 right-5 px-3 py-0.5 rounded-full bg-amber-500 text-white font-prompt font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider shadow-xs flex items-center gap-1">
          <Star className="w-3 h-3 fill-white text-white" />
          <span>คุ้มค่าที่สุด</span>
        </div>
      )}

      {/* Top Tag Badge */}
      <div className="mb-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-prompt font-bold border",
            offer.badgeStyle
          )}
        >
          <span>{offer.tag}</span>
        </span>
      </div>

      {/* Title */}
      <h4 className="font-prompt text-base sm:text-lg md:text-xl font-bold text-[#0F172A] mb-2 leading-snug group-hover:text-[#0F766E] transition-colors">
        {offer.title}
      </h4>

      {/* Short Description */}
      <p className="text-xs sm:text-sm text-[#475569] font-prompt leading-relaxed mb-4">
        {offer.desc}
      </p>

      {/* Features List */}
      {!isCompact && (
        <div className="mb-5 flex-1">
          <ul className="space-y-2">
            {offer.features.map((feat, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs font-prompt text-[#1E293B]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pricing Block */}
      <div className="mt-auto pt-3 border-t border-[#F1F5F9] mb-4">
        <div className="flex items-baseline justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-prompt text-[#94A3B8] line-through">
              ปกติ {offer.regularPrice} ฿
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-prompt font-bold bg-rose-50 text-rose-700 border border-rose-200">
              {offer.savings}
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-prompt text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>จ่ายจบ ตลอดชีพ</span>
          </span>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="font-prompt text-2xl sm:text-3xl font-black text-[#0F172A]">
            {offer.price}
          </span>
          <span className="font-prompt text-xs sm:text-sm font-bold text-[#475569]">
            บาท
          </span>
          <span className="text-[10px] sm:text-[11px] font-prompt text-[#64748B] ml-1">
            (ราคาพิเศษเฉพาะหน้านี้)
          </span>
        </div>
      </div>

      {/* Action Button: LINE Green Order */}
      <a
        href={lineOrderUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleOrderClick}
        data-line-title={offer.title}
        data-line-price={`${offer.price} ฿`}
        data-line-code={offer.itemCode}
        title={`คลิกเพื่อสั่งซื้อ ${offer.title} ผ่าน LINE OA`}
        className="w-full h-11 py-2.5 px-4 rounded-xl font-prompt font-extrabold text-xs sm:text-sm flex items-center justify-between transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] cursor-pointer bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] shadow-xs group/btn"
      >
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-[#052E16] shrink-0" />
          <span>รับสิทธิ์อัปเกรด ({offer.price} ฿)</span>
        </div>

        <div className="w-5 h-5 rounded-md bg-[#052E16]/12 flex items-center justify-center shrink-0">
          <ArrowRight className="w-3 h-3 text-[#052E16] transition-transform group-hover/btn:translate-x-0.5" />
        </div>
      </a>
    </div>
  );
}

/**
 * 1. Permanent Section on /freebies page bottom
 */
export function FreebieUpsellSection({ className }: { className?: string }) {
  return (
    <section className={cn("relative py-12 sm:py-16 scroll-mt-20 border-t border-[#E2E8F0]", className)}>
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF9EF] border border-[#FDE68A] text-[#92400E] text-xs font-prompt font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>⚡ สิทธิ์อัปเกรดระบบตัวเต็มราคาพิเศษ (Impulse Upgrade)</span>
          </div>

          <h3 className="font-prompt text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] leading-tight">
            ต้องการระบบตัวเต็มที่{" "}
            <span className="text-[#0F766E]">
              ทำงานได้ครบวงจร 100%?
            </span>
          </h3>

          <p className="text-[#475569] font-prompt text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            อัปเกรดจากเทมเพลตตัวอย่างสู่ระบบมาตรฐานโรงเรียน ผูกสูตรครบ พร้อมใช้งานทันที
            ในราคาสุดพิเศษเฉพาะผู้เข้าชมหน้าคลังของแจกฟรี
          </p>
        </div>

        {/* 2 Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UPSELL_OFFERS.map((offer) => (
            <UpsellCard key={offer.itemCode} offer={offer} />
          ))}
        </div>

        {/* ── Student Vault Highlight Section (อาวุธลับวัยเรียน ม.ปลาย & ป.ตรี) ───── */}
        <StudentVaultPromotionSection className="mt-14 sm:mt-20 border-t border-[#E2E8F0] pt-10" />
      </div>
    </section>
  );
}

/**
 * 2. Instant Upsell Modal (Triggered right after downloading a freebie)
 */
export function InstantUpsellModal({
  isOpen,
  onClose,
  downloadedTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  downloadedTitle?: string;
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-sm" />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 16 }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          className="relative z-10 p-5 sm:p-8 max-w-3xl w-full border border-[#E2E8F0] bg-[#FAF8F5] shadow-2xl rounded-3xl overflow-hidden my-auto max-h-[92vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#64748B] hover:text-[#0F172A] transition-colors p-2 rounded-full hover:bg-white cursor-pointer z-20"
            aria-label="ปิดหน้าต่างข้อเสนอพิเศษ"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6 space-y-2 relative z-10 pr-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-prompt font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>ดาวน์โหลดสำเร็จเรียบร้อย!</span>
            </div>

            <h3 className="font-prompt text-xl sm:text-2xl md:text-3xl font-black text-[#0F172A] leading-tight">
              🎉 ดาวน์โหลดไฟล์ตัวอย่างสำเร็จ!{" "}
              <span className="text-[#0F766E]">
                รับสิทธิ์อัปเกรดเป็นระบบตัวเต็มในราคาพิเศษเฉพาะหน้านี้
              </span>
            </h3>

            {downloadedTitle && (
              <p className="text-[#475569] font-prompt text-xs sm:text-sm">
                ไฟล์ <span className="text-[#0F172A] font-semibold">&ldquo;{downloadedTitle}&rdquo;</span> กำลังเริ่มดาวน์โหลด...
                หากต้องการประหยัดเวลาเพิ่มขึ้น แนะนำรับสิทธิ์อัปเกรดตัวเต็มด้านล่างนี้ได้ทันที:
              </p>
            )}
          </div>

          {/* 2 Upsell Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative z-10 mb-5">
            {UPSELL_OFFERS.map((offer) => (
              <UpsellCard key={offer.itemCode} offer={offer} isCompact={false} />
            ))}
          </div>

          {/* Footer dismiss */}
          <div className="text-center pt-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-prompt text-[#64748B]">
            <span>⚡ สิทธิ์ราคาพิเศษนี้สามารถส่งข้อความจองสิทธิ์ผ่าน LINE OA ได้ทันที</span>
            <button
              onClick={onClose}
              className="text-[#475569] hover:text-[#0F172A] underline cursor-pointer py-1 font-medium"
            >
              ข้ามไปก่อน (ใช้งานไฟล์ฟรี)
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

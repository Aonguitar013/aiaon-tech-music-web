"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  CheckCircle2,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  X,
  Flame,
  Star,
  Gift,
  FileSpreadsheet,
  Package,
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
  glowColor: string;
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
    badgeStyle:
      "bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]",
    glowColor: "rgba(16,185,129,0.15)",
    borderColor: "border-emerald-500/40 hover:border-emerald-400",
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
    badgeStyle:
      "bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    glowColor: "rgba(245,158,11,0.18)",
    borderColor: "border-amber-500/40 hover:border-amber-300",
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
        "relative flex flex-col h-full rounded-2xl md:rounded-3xl p-5 sm:p-6 backdrop-blur-xl bg-slate-950/90 border transition-all duration-300 shadow-xl group hover:translate-y-[-3px]",
        offer.borderColor,
        offer.isPopular && "ring-1 ring-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.15)]"
      )}
      style={{
        boxShadow: `0 10px 40px -10px ${offer.glowColor}`,
      }}
    >
      {/* Popular Corner Badge */}
      {offer.isPopular && (
        <div className="absolute -top-3 right-5 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-prompt font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center gap-1">
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
      <h4 className="font-prompt text-base sm:text-lg md:text-xl font-bold text-white mb-2 leading-snug group-hover:text-emerald-300 transition-colors">
        {offer.title}
      </h4>

      {/* Short Description */}
      <p className="text-xs sm:text-sm text-white/70 font-prompt leading-relaxed mb-4">
        {offer.desc}
      </p>

      {/* Features List */}
      {!isCompact && (
        <div className="mb-5 flex-1">
          <ul className="space-y-2">
            {offer.features.map((feat, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs font-prompt text-white/80"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pricing Block */}
      <div className="mt-auto pt-3 border-t border-white/10 mb-4">
        <div className="flex items-baseline justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-prompt text-white/45 line-through">
              ปกติ {offer.regularPrice} ฿
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-prompt font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {offer.savings}
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-prompt text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>จ่ายจบ ตลอดชีพ</span>
          </span>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="font-prompt text-2xl sm:text-3xl font-black text-white">
            {offer.price}
          </span>
          <span className="font-prompt text-xs sm:text-sm font-bold text-white/70">
            บาท
          </span>
          <span className="text-[10px] sm:text-[11px] font-prompt text-white/40 ml-1">
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
        className="w-full h-11 py-2.5 px-4 rounded-xl font-prompt font-extrabold text-xs sm:text-sm flex items-center justify-between transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#06C755] via-[#05b34c] to-[#06C755] hover:from-[#05b34c] hover:via-[#049b42] hover:to-[#05b34c] text-white shadow-[0_0_20px_rgba(6,199,85,0.35)] hover:shadow-[0_0_30px_rgba(6,199,85,0.55)] border border-[#06C755]/40 relative overflow-hidden group/btn"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

        <div className="flex items-center gap-2 relative z-10">
          <ShoppingCart className="w-4 h-4 text-white shrink-0" />
          <span>รับสิทธิ์อัปเกรด ({offer.price} ฿)</span>
        </div>

        <div className="w-5 h-5 rounded-md bg-black/20 flex items-center justify-center relative z-10 shrink-0">
          <ArrowRight className="w-3 h-3 text-white transition-transform group-hover/btn:translate-x-0.5" />
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
    <section className={cn("relative py-12 sm:py-16 scroll-mt-20", className)}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-purple-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-prompt font-bold shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>⚡ สิทธิ์อัปเกรดระบบตัวเต็มราคาพิเศษ (Impulse Upgrade)</span>
          </div>

          <h3 className="font-prompt text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
            ต้องการระบบตัวเต็มที่{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 drop-shadow-[0_0_20px_rgba(16,185,129,0.35)]">
              ทำงานได้ครบวงจร 100%?
            </span>
          </h3>

          <p className="text-white/60 font-prompt text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
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
        <StudentVaultPromotionSection className="mt-14 sm:mt-20 border-t border-white/10 pt-10" />
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
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 16 }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          className="relative z-10 glass-card p-5 sm:p-8 max-w-3xl w-full border-emerald-500/40 bg-zinc-950/95 shadow-[0_0_70px_rgba(16,185,129,0.25)] rounded-3xl overflow-hidden my-auto max-h-[92vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient Glows */}
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-amber-500/15 blur-[80px] rounded-full pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 cursor-pointer z-20"
            aria-label="ปิดหน้าต่างข้อเสนอพิเศษ"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6 space-y-2 relative z-10 pr-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-prompt font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>ดาวน์โหลดสำเร็จเรียบร้อย!</span>
            </div>

            <h3 className="font-prompt text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
              🎉 ดาวน์โหลดไฟล์ตัวอย่างสำเร็จ!{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">
                รับสิทธิ์อัปเกรดเป็นระบบตัวเต็มในราคาพิเศษเฉพาะหน้านี้
              </span>
            </h3>

            {downloadedTitle && (
              <p className="text-white/60 font-prompt text-xs sm:text-sm">
                ไฟล์ <span className="text-white font-semibold">"{downloadedTitle}"</span> กำลังเริ่มดาวน์โหลด...
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
          <div className="text-center pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-prompt text-white/50">
            <span>⚡ สิทธิ์ราคาพิเศษนี้สามารถส่งข้อความจองสิทธิ์ผ่าน LINE OA ได้ทันที</span>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white underline cursor-pointer py-1"
            >
              ข้ามไปก่อน (ใช้งานไฟล์ฟรี)
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

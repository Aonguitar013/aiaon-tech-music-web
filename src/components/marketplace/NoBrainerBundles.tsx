"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ShoppingCart,
  ArrowRight,
  Headphones,
  Zap,
  Sparkles,
  Flame,
  Star,
  ShieldCheck,
  FileSpreadsheet,
  Layers,
} from "lucide-react";
import { getLineOrderUrl } from "@/lib/line";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { cn } from "@/lib/utils";

interface BundleItem {
  code: string;
  name: string;
  desc: string;
  isBonus?: boolean;
}

interface NoBrainerBundle {
  itemCode: string;
  title: string;
  badge: string;
  badgeStyle: string;
  cardGlow: string;
  borderColor: string;
  accentText: string;
  items: BundleItem[];
  regularPrice: number;
  price: number;
  savings: string;
  message: string;
  isHot?: boolean;
  isBestValue?: boolean;
  hasAudioPreview?: boolean;
}

const BUNDLE_DATA: NoBrainerBundle[] = [
  {
    itemCode: "BUNDLE-01",
    title: "ชุดเอาตัวรอดครูประจำชั้นยุคดิจิทัล",
    badge: "🟢 ZERO-TECH 100% (ก๊อปปี้ชีตใช้ได้ทันที)",
    badgeStyle:
      "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.25)]",
    cardGlow: "rgba(16,185,129,0.12)",
    borderColor: "border-emerald-500/30 hover:border-emerald-400/70",
    accentText: "text-emerald-400",
    items: [
      {
        code: "SYS09",
        name: "ระบบคัดกรอง SDQ & ดูแลช่วยเหลือนักเรียน",
        desc: "คำนวณคะแนน 5 ด้านอัตโนมัติ ส่งออกรายงานทันที",
      },
      {
        code: "AONE09",
        name: "ระบบรายงานห้องเรียนสีขาว & คะแนนเก็บ",
        desc: "บันทึก 4 ฝ่าย สรุปผลเป็นกราฟสีสันสดใส",
      },
      {
        code: "STU02",
        name: "ระบบเช็คการบ้าน & งานค้างประจำห้อง",
        desc: "ดูสถานะค้างงานรายคน ลดภาระตามงานเด็ก",
      },
      {
        code: "SYS27",
        name: "ระบบจัดตารางเวร & ตรวจความสะอาด",
        desc: "สุ่มเวร หมุนเวร และเช็คคะแนนเขตพื้นที่ 1 คลิก",
      },
    ],
    regularPrice: 600,
    price: 249,
    savings: "ประหยัด 58%",
    message:
      "สวัสดีครับ สนใจสั่งซื้อ [BUNDLE-01] ชุดเอาตัวรอดครูประจำชั้นยุคดิจิทัล (4 ระบบ) ราคาโปรโมชัน 249 บาทครับ [#TEACHER]",
  },
  {
    itemCode: "BUNDLE-02",
    title: "ชุดทางลัดปิดเทอมไว & ส่งงาน ว.PA",
    badge: "⭐ BEST VALUE (คุ้มค่าที่สุด)",
    badgeStyle:
      "bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    cardGlow: "rgba(245,158,11,0.15)",
    borderColor: "border-amber-500/40 hover:border-amber-300/80",
    accentText: "text-amber-400",
    isBestValue: true,
    items: [
      {
        code: "SYS02",
        name: "ระบบคำนวณ ปพ.5 & ตัดเกรดอัตโนมัติ",
        desc: "สูตรครบ 8 สาระ ตัดเกรด คำนวณ GPAX เที่ยงตรง 100%",
      },
      {
        code: "SYS05",
        name: "ระบบคลังข้อสอบ & Test Blueprint อัจฉริยะ",
        desc: "วิเคราะห์ความยากง่าย (p, r) พร้อมเฉลยแบบมืออาชีพ",
      },
      {
        code: "SYS11",
        name: "ระบบบันทึก PLC & ชุมชนแห่งการเรียนรู้",
        desc: "ฟอร์มบันทึกการประชุม PLC สำเร็จรูป พร้อมส่งเล่ม ว.PA",
      },
      {
        code: "BGM-01",
        name: "แถมฟรี! ดนตรีบรรเลง Acoustic Warmth BGM",
        desc: "ดนตรีเสียงพากย์นุ่ม อัดคลิปสอน ว.PA ปลอดลิขสิทธิ์ 100%",
        isBonus: true,
      },
    ],
    regularPrice: 750,
    price: 290,
    savings: "ประหยัด 61%",
    message:
      "สวัสดีครับ สนใจสั่งซื้อ [BUNDLE-02] ชุดทางลัดปิดเทอมไว & ส่งงาน ว.PA (3 ระบบ + แถม BGM) ราคาโปรโมชัน 290 บาทครับ [#TEACHER]",
  },
  {
    itemCode: "BUNDLE-03",
    title: "ชุดสอบติดครูผู้ช่วยฉบับเร่งรัด (Fast-Track Pass)",
    badge: "🔥 HOT CAMPAIGN (ขายดีอันดับ 1)",
    badgeStyle:
      "bg-rose-500/15 text-rose-300 border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.3)]",
    cardGlow: "rgba(244,63,94,0.15)",
    borderColor: "border-rose-500/40 hover:border-rose-300/80",
    accentText: "text-rose-400",
    isHot: true,
    hasAudioPreview: true,
    items: [
      {
        code: "MUS-01",
        name: "อัลบั้มเพลงช่วยจำกฎหมายครู Vol.1 (10 เพลง)",
        desc: "ไฟล์ MP3 คมชัดสูง + สมุดรวมเนื้อร้อง PDF ท่องจำติดหู",
      },
      {
        code: "PREP01",
        name: "บอทติวสอบ Telegram VIP Pass ตลอดชีพ",
        desc: "บอทยิงโจทย์ 3 เวลา 1,500 ข้อ + AI Gemini วิเคราะห์เฉลย",
      },
    ],
    regularPrice: 690,
    price: 390,
    savings: "ประหยัด 43%",
    message:
      "สวัสดีครับ สนใจสั่งซื้อ [BUNDLE-03] ชุดสอบติดครูผู้ช่วยฉบับเร่งรัด (เพลงช่วยจำ + บอท VIP) ราคาโปรโมชัน 390 บาทครับ [#TEACHER]",
  },
];

export function NoBrainerBundles({ className }: { className?: string }) {
  const { openLineModal } = useLineModal();

  return (
    <section
      id="no-brainer-bundles"
      className={cn("relative py-12 sm:py-16 scroll-mt-24", className)}
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[380px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3.5">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-prompt font-bold shadow-[0_0_15px_rgba(16,185,129,0.25)]"
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>⚡ ZERO-TECH IMPULSE DEALS • ซื้อง่าย เริ่มต้นเพียง 249 บาท</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-prompt text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            3 มหาบันเดิลสุดคุ้ม{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]">
              ก๊อปปี้ชีตใช้ได้ทันที ไม่ต้องแตะโค้ด
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/70 font-prompt text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
          >
            คัดสรรระบบที่ครูไทยใช้บ่อยที่สุด มัดรวมในราคาเข้าถึงง่าย
            ประหยัดเวลางานเอกสารไปทั้งเทอม ปลดล็อกและรับไฟล์พร้อมใช้อัตโนมัติทาง LINE OA ทันที
          </motion.p>
        </div>

        {/* 3 Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {BUNDLE_DATA.map((bundle, index) => {
            const lineOrderUrl = getLineOrderUrl(bundle.message);

            const handleOrderClick = (e: React.MouseEvent) => {
              if (!isMobileDevice()) {
                e.preventDefault();
                openLineModal({
                  title: bundle.title,
                  price: `${bundle.price} ฿`,
                  itemCode: bundle.itemCode,
                  message: bundle.message,
                });
              }
            };

            return (
              <motion.div
                key={bundle.itemCode}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "relative flex flex-col h-full rounded-3xl p-6 sm:p-7 backdrop-blur-xl bg-slate-950/80 border transition-all duration-300 shadow-xl group hover:translate-y-[-4px]",
                  bundle.borderColor,
                  bundle.isBestValue &&
                    "ring-1 ring-amber-500/30 md:scale-[1.02] shadow-[0_0_35px_rgba(245,158,11,0.18)]"
                )}
                style={{
                  boxShadow: `0 10px 40px -10px ${bundle.cardGlow}`,
                }}
              >
                {/* Popular Corner Badge */}
                {bundle.isBestValue && (
                  <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-prompt font-extrabold text-[11px] uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-white text-white" />
                    <span>แนะนำสูงสุด</span>
                  </div>
                )}

                {bundle.isHot && (
                  <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-prompt font-extrabold text-[11px] uppercase tracking-wider shadow-[0_0_15px_rgba(244,63,94,0.5)] flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 fill-white text-white" />
                    <span>ขายดีอันดับ 1</span>
                  </div>
                )}

                {/* Top Badge */}
                <div className="mb-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-prompt font-bold border",
                      bundle.badgeStyle
                    )}
                  >
                    <span>{bundle.badge}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-prompt text-xl sm:text-2xl font-extrabold text-white mb-2 leading-snug group-hover:text-emerald-300 transition-colors">
                  {bundle.title}
                </h3>
                <div className="text-[11px] font-mono font-bold text-white/40 mb-5">
                  ITEM CODE: {bundle.itemCode}
                </div>

                {/* Included Items Checklist */}
                <div className="mb-6 flex-1 space-y-3">
                  <div className="text-xs font-prompt font-bold text-white/70 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-2">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>รายการระบบที่ได้รับในชุด:</span>
                  </div>

                  <ul className="space-y-2.5">
                    {bundle.items.map((it, idx) => (
                      <li
                        key={idx}
                        className={cn(
                          "rounded-xl p-2.5 text-xs font-prompt flex items-start gap-2.5 transition-all border",
                          it.isBonus
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.15)]"
                            : "bg-white/5 border-white/10 text-white/90"
                        )}
                      >
                        <CheckCircle2
                          className={cn(
                            "w-4 h-4 shrink-0 mt-0.5",
                            it.isBonus ? "text-amber-400" : bundle.accentText
                          )}
                        />
                        <div className="min-w-0">
                          <div className="font-bold flex items-center gap-1.5 flex-wrap">
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-cyan-300 border border-cyan-500/20">
                              {it.code}
                            </span>
                            <span className="text-white text-xs">{it.name}</span>
                          </div>
                          <p className="text-[11px] text-white/60 mt-0.5 leading-relaxed">
                            {it.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing Block */}
                <div className="mb-5 pt-4 border-t border-white/10">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-prompt text-white/50 line-through">
                        ปกติ {bundle.regularPrice} ฿
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-prompt font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {bundle.savings}
                      </span>
                    </div>
                    <span className="text-[11px] font-prompt text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      จ่ายจบ ตลอดชีพ
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="font-prompt text-3xl sm:text-4xl font-black text-white">
                      {bundle.price}
                    </span>
                    <span className="font-prompt text-sm font-bold text-white/70">
                      บาท
                    </span>
                    <span className="text-[11px] font-prompt text-white/40 ml-1">
                      (ก๊อปปี้ชีตใช้ได้ทันที)
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 mt-auto">
                  {/* Primary LINE Order Button */}
                  <a
                    href={lineOrderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleOrderClick}
                    data-line-title={bundle.title}
                    data-line-price={`${bundle.price} ฿`}
                    data-line-code={bundle.itemCode}
                    title={`คลิกเพื่อสั่งซื้อ ${bundle.title} ผ่าน LINE OA`}
                    className="w-full h-12 py-3 px-4 rounded-xl font-prompt font-extrabold text-sm sm:text-base flex items-center justify-between transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#06C755] via-[#05b34c] to-[#06C755] hover:from-[#05b34c] hover:via-[#049b42] hover:to-[#05b34c] text-white shadow-[0_0_20px_rgba(6,199,85,0.35)] hover:shadow-[0_0_32px_rgba(6,199,85,0.6)] border border-[#06C755]/40 relative overflow-hidden group/btn"
                  >
                    {/* Subtle light sweep */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

                    <div className="flex items-center gap-2 relative z-10">
                      <ShoppingCart className="w-4 h-4 text-white shrink-0" />
                      <span>สั่งซื้อผ่าน LINE ({bundle.price} ฿)</span>
                    </div>

                    <div className="w-6 h-6 rounded-lg bg-black/20 flex items-center justify-center relative z-10 shrink-0">
                      <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover/btn:translate-x-0.5" />
                    </div>
                  </a>

                  {/* Secondary Audio Preview Button for BUNDLE-03 */}
                  {bundle.hasAudioPreview && (
                    <Link
                      href="/teacher-prep"
                      className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-rose-300 hover:text-white text-xs font-prompt font-bold flex items-center justify-center gap-2 border border-rose-500/25 hover:border-rose-400/50 transition-all cursor-pointer shadow-sm"
                    >
                      <Headphones className="w-3.5 h-3.5 text-rose-400" />
                      <span>🎧 ทดลองฟังเพลงตัวอย่าง &amp; ดูบอทติว</span>
                    </Link>
                  )}
                </div>

                {/* Footer Micro-assurance */}
                <div className="mt-3.5 pt-2 text-center text-[11px] font-prompt text-white/50 flex items-center justify-center gap-1.5">
                  <FileSpreadsheet className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>มีคลิปแนะนำ 3 นาที • ปลดล็อกชีตและบอทอัตโนมัติ</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

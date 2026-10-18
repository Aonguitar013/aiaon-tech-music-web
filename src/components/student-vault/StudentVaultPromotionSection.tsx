"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Sparkles,
  Zap,
  CheckCircle2,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  Star,
  FileCode,
  Layout,
  Presentation,
  Calculator,
  Flame,
  Award,
} from "lucide-react";
import { getLineOrderUrl } from "@/lib/line";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { cn } from "@/lib/utils";

export interface StudentPromoItem {
  itemCode: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeStyle: string;
  glowColor: string;
  borderColor: string;
  accentColor: string;
  regularPrice: number;
  price: number;
  savings: string;
  message: string;
  isHero?: boolean;
  features: string[];
  icon: React.ElementType;
}

export const STUDENT_PROMO_ITEMS: StudentPromoItem[] = [
  {
    itemCode: "BUNDLE-STU",
    title: "Student Survival Kit: แพ็กเอาตัวรอดวัยเรียน (มัดรวม 4 ไอเทม)",
    subtitle: "ครบเซ็ตทั้ง AI Prompts + เทมเพลตพอร์ต TCAS + สไลด์พรีเซนต์ A+ + ตารางคำนวณ GPAX",
    badge: "🔥 แพ็กมัดรวมขายดีอันดับ 1 วัยเรียน (ลดพิเศษ 51%)",
    badgeStyle:
      "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border-pink-500/40 shadow-[0_0_15px_rgba(255,0,127,0.3)]",
    glowColor: "rgba(255,0,127,0.22)",
    borderColor: "border-pink-500/50 hover:border-pink-400",
    accentColor: "text-pink-400",
    regularPrice: 406,
    price: 199,
    savings: "ประหยัด 51%",
    isHero: true,
    message:
      "สวัสดีครับครูอ้น สนใจสั่งซื้อ [BUNDLE-STU] แพ็กเอาตัวรอดวัยเรียน มัดรวมครบ 4 รายการ ราคาโปรโมชัน 199 บาทครับ [#STUDENT]",
    features: [
      "STU03: คัมภีร์ 50+ AI Prompts ปั่นรายงาน & สรุปสอบ (99 ฿)",
      "STU04: เทมเพลต Cyber-Port TCAS & Resume 1-Page (129 ฿)",
      "STU05: คู่มือสไลด์นำเสนอ 15 หน้า เกรด A+ (99 ฿)",
      "STU06: ระบบคำนวณเป้าเกรด GPAX & เช็กงานค้าง Google Apps Script (79 ฿)",
      "แถมฟรี! สิทธิ์อัปเดตไฟล์เวอร์ชันใหม่ตลอดปีการศึกษา 2026",
    ],
    icon: Flame,
  },
  {
    itemCode: "STU03",
    title: "คัมภีร์ 50+ AI Prompts ช่วยปั่นรายงาน & สรุปชีทสอบ",
    subtitle: "ชุดคำสั่งระดับเทพสำหรับ ChatGPT / Gemini / Claude ย่อชีท 50 หน้าเหลือหน้าเดียว และเสกรายงาน 5 บท",
    badge: "⚡ ยอดฮิต: ปั่นงานเร็วขึ้น 10 เท่า",
    badgeStyle:
      "bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]",
    glowColor: "rgba(245,158,11,0.16)",
    borderColor: "border-amber-500/40 hover:border-amber-300",
    accentColor: "text-amber-400",
    regularPrice: 250,
    price: 99,
    savings: "ลด 60%",
    message:
      "สวัสดีครับครูอ้น สนใจสั่งซื้อ [STU03] คัมภีร์ AI Prompts ช่วยปั่นงานและสรุปสอบ ราคา 99 บาทครับ [#STUDENT]",
    features: [
      "Prompt สรุปชีทสอบ & แปลงเนื้อหาเป็นตารางเปรียบเทียบ",
      "Prompt วางโครงร่างรายงาน 5 บท และปรับภาษาปากเป็นภาษาวิชาการ",
      "Prompt ย่อยวิจัยภาษาอังกฤษ 20 หน้าใน 5 ประเด็น (ป.ตรี)",
      "Prompt แก้โจทย์คณิต-ฟิสิกส์ทีละสเต็ป และดีบั๊กโค้ด",
    ],
    icon: Zap,
  },
  {
    itemCode: "STU04",
    title: "เทมเพลต Cyber-Port TCAS & เรซูเม่ฝึกงาน (Web Ready)",
    subtitle: "หน้าเว็บ Portfolio สไตล์ Cyberpunk Glassmorphism หมุนดู 3D บนมือถือ พร้อมไกด์ไลน์ 10 หน้ายื่น TCAS รอบ 1",
    badge: "🚀 อาวุธลับ TCAS รอบ 1 & สัมภาษณ์งาน",
    badgeStyle:
      "bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(0,242,254,0.25)]",
    glowColor: "rgba(0,242,254,0.16)",
    borderColor: "border-cyan-500/40 hover:border-cyan-300",
    accentColor: "text-cyan-400",
    regularPrice: 290,
    price: 129,
    savings: "ลด 56%",
    message:
      "สวัสดีครับครูอ้น สนใจสั่งซื้อ [STU04] เทมเพลต Cyber-Port TCAS & Resume ราคา 129 บาทครับ [#STUDENT]",
    features: [
      "ไฟล์ HTML/Tailwind แม่แบบสไตล์ Cyber-Tech ปริ้นท์เป็น PDF ได้",
      "โหมดพิมพ์แก้ไขข้อความบนหน้าเว็บได้ทันทีใน 1 คลิก",
      "ไกด์ไลน์โครงสร้าง 10 หน้าตามเกณฑ์ TCAS Portfolio รอบ 1",
      "กรอบแสดงผลงานด้วยเทคนิค STAR Method ชนะใจกรรมการ",
    ],
    icon: Layout,
  },
  {
    itemCode: "STU05",
    title: "เทมเพลตสไลด์นำเสนองานกลุ่ม & วิจัยจบ เกรด A+",
    subtitle: "พิมพ์เขียว 15 สไลด์พรีเซนต์ระดับ World-Class พร้อมพาเลทสี Dark Neon และ Prompt เจนสไลด์ใน 5 นาที",
    badge: "📊 สไลด์สะกดสายตาอาจารย์",
    badgeStyle:
      "bg-purple-500/15 text-purple-300 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.25)]",
    glowColor: "rgba(168,85,247,0.16)",
    borderColor: "border-purple-500/40 hover:border-purple-300",
    accentColor: "text-purple-400",
    regularPrice: 250,
    price: 99,
    savings: "ลด 60%",
    message:
      "สวัสดีครับครูอ้น สนใจสั่งซื้อ [STU05] เทมเพลตสไลด์นำเสนองาน Dark Neon ราคา 99 บาทครับ [#STUDENT]",
    features: [
      "โครงสร้าง 15 สไลด์พรีเซนต์โปรเจกต์/วิจัยให้ได้เกรด A",
      "ชุดโค้ดสี Hex Code โทน Cyberpunk Glassmorphism สำหรับ Canva",
      "Master Prompt สร้างเนื้อหาทุกสไลด์พร้อมสคริปต์คำพูด",
      "เทคนิคการตอบคำถาม Q&A จากคณะกรรมการแบบไม่จนมุม",
    ],
    icon: Presentation,
  },
  {
    itemCode: "STU06",
    title: "ตารางคำนวณเป้าเกรด GPAX & แพลนเนอร์เช็กงานค้าง",
    subtitle: "Google Apps Script ติดตั้งเมนูภาษาไทยอัตโนมัติ คำนวณเกรดที่ต้องทำในเทอมหน้าเพื่อพิชิตเป้าหมาย",
    badge: "🎯 วางแผนเกรด & หมดปัญหางานค้าง",
    badgeStyle:
      "bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]",
    glowColor: "rgba(16,185,129,0.16)",
    borderColor: "border-emerald-500/40 hover:border-emerald-300",
    accentColor: "text-emerald-400",
    regularPrice: 199,
    price: 79,
    savings: "ลด 60%",
    message:
      "สวัสดีครับครูอ้น สนใจสั่งซื้อ [STU06] ตารางคำนวณเป้า GPAX & เช็กงานค้าง ราคา 79 บาทครับ [#STUDENT]",
    features: [
      "เมนูภาษาไทย '🎓 เมนูวัยเรียน iAon' บน Google Sheets",
      "สูตรคำนวณ Target GPAX: คำนวณเกรดที่ต้องทำในเทอมที่เหลืออัตโนมัติ",
      "ตารางติดตามงานค้างรายวิชา พร้อม Dropdown และแถบสีเตือนงานด่วน",
      "แถมฟรีไฟล์ .csv แม่แบบนำเข้า Google Sheets ได้ใน 10 วินาที",
    ],
    icon: Calculator,
  },
];

export function StudentVaultPromotionSection({ className }: { className?: string }) {
  const { openLineModal } = useLineModal();

  const handleOrder = (item: StudentPromoItem, e: React.MouseEvent) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: item.title,
        price: `${item.price} ฿`,
        itemCode: item.itemCode,
        message: item.message,
      });
    }
  };

  const heroItem = STUDENT_PROMO_ITEMS.find((it) => it.isHero);
  const regularItems = STUDENT_PROMO_ITEMS.filter((it) => !it.isHero);

  return (
    <section id="student-vault-promo" className={cn("relative py-10 sm:py-14 scroll-mt-24", className)}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[360px] bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-2">
        
        {/* Header Block */}
        <div className="text-center mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/40 text-pink-300 text-xs font-prompt font-extrabold shadow-[0_0_15px_rgba(255,0,127,0.3)]">
            <GraduationCap className="w-4 h-4 text-pink-400" />
            <span>STUDENT VAULT • อาวุธลับวัยเรียน ม.ปลาย & ป.ตรี (ZERO-TECH)</span>
          </div>

          <h3 className="font-prompt text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
            ทางลัดวัยเรียนยุค AI:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 drop-shadow-[0_0_25px_rgba(255,0,127,0.35)]">
              ปั่นงานไว เกรดพุ่ง ยื่นพอร์ต TCAS ติดรอบ 1
            </span>
          </h3>

          <p className="text-white/70 font-prompt text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            รวมเครื่องมือสำเร็จรูปไม่ต้องเขียนโค้ดเอง จากครูอ้น iAon Tech ช่วยให้นักเรียน ม.ปลาย และนิสิต ป.ตรี ทำงานเสร็จไวใน 3 นาที มีเวลาพักผ่อนเพิ่มขึ้น!
          </p>
        </div>

        {/* 1. HERO BUNDLE (BUNDLE-STU) */}
        {heroItem && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 p-6 sm:p-8 rounded-3xl backdrop-blur-xl bg-slate-950/90 border-2 border-pink-500/50 hover:border-pink-400 transition-all duration-300 shadow-[0_0_40px_rgba(255,0,127,0.22)] relative overflow-hidden group"
          >
            {/* Ambient Background Flare */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/15 blur-3xl rounded-full pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn("px-3 py-1 rounded-full text-xs font-prompt font-extrabold border", heroItem.badgeStyle)}>
                    {heroItem.badge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-prompt font-bold border border-emerald-500/30">
                    🟢 ZERO-TECH 100% พร้อมใช้ทันที
                  </span>
                </div>

                <h4 className="font-prompt text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight group-hover:text-pink-300 transition-colors">
                  {heroItem.title}
                </h4>

                <p className="text-xs sm:text-sm text-white/70 font-prompt max-w-3xl leading-relaxed">
                  {heroItem.subtitle}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {heroItem.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-prompt text-white/85">
                      <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA Column */}
              <div className="w-full lg:w-72 shrink-0 p-5 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col justify-center">
                <div className="flex items-baseline justify-center gap-2 mb-1">
                  <span className="text-xs font-prompt text-white/50 line-through">
                    ปกติ {heroItem.regularPrice} ฿
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-prompt font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    {heroItem.savings}
                  </span>
                </div>

                <div className="flex items-baseline justify-center gap-1.5 mb-4">
                  <span className="font-prompt text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-300">
                    {heroItem.price}
                  </span>
                  <span className="font-prompt text-sm font-bold text-white/80">บาท</span>
                  <span className="text-[11px] font-prompt text-white/40">(จ่ายครั้งเดียวตลอดชีพ)</span>
                </div>

                <a
                  href={getLineOrderUrl(heroItem.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleOrder(heroItem, e)}
                  data-line-title={heroItem.title}
                  data-line-price={`${heroItem.price} ฿`}
                  data-line-code={heroItem.itemCode}
                  title={`สั่งซื้อ ${heroItem.title} ผ่าน LINE OA`}
                  className="w-full py-3 px-4 rounded-xl font-prompt font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#06C755] via-[#05b34c] to-[#06C755] hover:from-[#05b34c] hover:via-[#049b42] hover:to-[#05b34c] text-white shadow-[0_0_25px_rgba(6,199,85,0.4)] border border-[#06C755]/50 relative overflow-hidden group/btn"
                >
                  <ShoppingCart className="w-4 h-4 text-white shrink-0" />
                  <span>รับแพ็กมัดรวม ({heroItem.price} ฿)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover/btn:translate-x-1" />
                </a>

                <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[10px] text-white/60 font-prompt">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>ส่งไฟล์อัตโนมัติใน 10 วินาทีทาง LINE</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. FOUR SINGLE PRODUCTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {regularItems.map((item) => {
            const IconComp = item.icon;
            const lineUrl = getLineOrderUrl(item.message);

            return (
              <motion.div
                key={item.itemCode}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "flex flex-col h-full rounded-2xl p-5 sm:p-6 backdrop-blur-xl bg-slate-950/85 border transition-all duration-300 shadow-xl group hover:translate-y-[-3px]",
                  item.borderColor
                )}
                style={{
                  boxShadow: `0 8px 30px -8px ${item.glowColor}`,
                }}
              >
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={cn("inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-prompt font-bold border", item.badgeStyle)}>
                    <span>{item.badge}</span>
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:scale-110 transition-transform">
                    <IconComp className={cn("w-4 h-4", item.accentColor)} />
                  </div>
                </div>

                {/* Title */}
                <h4 className="font-prompt text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>

                {/* Subtitle */}
                <p className="text-xs text-white/70 font-prompt leading-relaxed mb-4">
                  {item.subtitle}
                </p>

                {/* Features List */}
                <div className="mb-5 flex-1">
                  <ul className="space-y-1.5">
                    {item.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-prompt text-white/80">
                        <CheckCircle2 className={cn("w-3.5 h-3.5 shrink-0 mt-0.5", item.accentColor)} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing & CTA */}
                <div className="mt-auto pt-3 border-t border-white/10">
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-prompt text-white/45 line-through">
                        ปกติ {item.regularPrice} ฿
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-prompt font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {item.savings}
                      </span>
                    </div>
                    <span className="text-[11px] font-prompt font-extrabold text-white">
                      <span className="text-xl sm:text-2xl font-black">{item.price}</span> ฿
                    </span>
                  </div>

                  <a
                    href={lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => handleOrder(item, e)}
                    data-line-title={item.title}
                    data-line-price={`${item.price} ฿`}
                    data-line-code={item.itemCode}
                    title={`สั่งซื้อ ${item.title} ผ่าน LINE OA`}
                    className="w-full h-10 py-2 px-3.5 rounded-xl font-prompt font-bold text-xs flex items-center justify-between transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#06C755] via-[#05b34c] to-[#06C755] text-white shadow-[0_0_15px_rgba(6,199,85,0.3)] border border-[#06C755]/40 group/btn"
                  >
                    <div className="flex items-center gap-1.5">
                      <ShoppingCart className="w-3.5 h-3.5 text-white shrink-0" />
                      <span>สั่งซื้อ {item.itemCode} ({item.price} ฿)</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover/btn:translate-x-0.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

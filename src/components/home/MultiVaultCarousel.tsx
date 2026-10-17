"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sparkles, ArrowRight, ChevronLeft, ChevronRight,
  ShieldCheck, Zap, Star, ExternalLink, Eye,
  Layers, Package, BookOpen, GraduationCap,
  Music, Bot, Code2, Users, Crown
} from "lucide-react";

// Import all 8 bespoke 3D custom mockups
import { DvdCaseMockup } from "@/components/marketplace/DvdCaseMockup";
import { Book3DMockup } from "@/components/ebooks/Book3DMockup";
import { CyberVaultCrateMockup } from "@/components/bundles/CyberVaultCrateMockup";
import { StudentCardMockup } from "@/components/student-vault/StudentCardMockup";
import { VinylRecordMockup } from "@/components/music-store/VinylRecordMockup";
import { GoldenTicketMockup } from "@/components/prep/GoldenTicketMockup";
import { CyberSentinelOrbMockup } from "@/components/services/CyberSentinelOrbMockup";
import { CyberBlueprintMockup } from "@/components/services/CyberBlueprintMockup";

export interface EcosystemVaultItem {
  id: string;
  badge: string;
  badgeClass: string;
  category: string;
  title: string;
  tagline: string;
  priceTag: string;
  highlightBenefit: string;
  linkUrl: string;
  ctaText: string;
  accentColor: "cyan" | "purple" | "emerald" | "amber" | "pink" | "blue";
  stats: string;
}

export const ECOSYSTEM_VAULTS: EcosystemVaultItem[] = [
  {
    id: "digital-vault",
    badge: "👑 เรือธงสำหรับครูไทย",
    badgeClass: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    category: "Google Apps Script 20+ Systems",
    title: "คลังกล่องซอฟต์แวร์โรงเรียน 3D",
    tagline: "ระบบเช็คชื่อ, ลา, ตรวจชุด, ยานพาหนะ, พัสดุ รันบน Google Workspace ตัวเอง 100%",
    priceTag: "เริ่มต้น 390 ฿ • ไร้รายเดือน",
    highlightBenefit: "⚡ เซฟเวลางานเอกสารครูกว่า 100 ชม./เทอม ข้อมูลปลอดภัยใน Drive คุณเอง",
    linkUrl: "/digital-vault",
    ctaText: "เปิดคลังกล่องซอฟต์แวร์ (DVD Vault)",
    accentColor: "cyan",
    stats: "20+ ระบบสำเร็จรูป",
  },
  {
    id: "bundles",
    badge: "🔥 คุ้มที่สุด • เหมาตลอดชีพ",
    badgeClass: "bg-linear-to-r from-amber-500 to-orange-500 text-zinc-950 border-amber-400 font-black",
    category: "Cyber Vault Supply Crate",
    title: "หีบสมบัติระบบเหมา All-in-One",
    tagline: "เหมาครบ 20 ระบบพร้อมสิทธิ์อัปเดตระบบใหม่ฟรีตลอดชีพ ไม่จำกัดจำนวนครูผู้ใช้งาน",
    priceTag: "เพียง 1,990 ฿ (ประหยัด 7,800 ฿)",
    highlightBenefit: "👑 จ่ายครั้งเดียวจบ ปลดล็อกทั้ง 20 กล่อง พร้อมใบเสร็จเบิกงบโรงเรียนได้",
    linkUrl: "/bundles",
    ctaText: "ปลดล็อกหีบสมบัติ (Bundles)",
    accentColor: "amber",
    stats: "ประหยัด 80%",
  },
  {
    id: "ebooks",
    badge: "📚 คัมภีร์ครูยุคใหม่",
    badgeClass: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    category: "30 Futuristic E-Books 3D",
    title: "คลัง 30 E-Book นวัตกรรมครูไทย",
    tagline: "เจาะลึก ว.PA, จัดการชั้นเรียน, สื่อ AI Gen, เกมห้องเรียน เล่ม 3 มิติพร้อมเปิดอ่าน",
    priceTag: "เริ่มต้นเล่มละ 59 ฿",
    highlightBenefit: "📖 ปกแข็ง 3D พลิกอ่านได้ พร้อมเทมเพลตและพรอมต์ AI ก๊อปปี้ไปใช้ได้ทันที",
    linkUrl: "/ebooks",
    ctaText: "เปิดคลัง 30 E-Book 3D",
    accentColor: "purple",
    stats: "30 เล่มนวัตกรรม",
  },
  {
    id: "ai-caretaker",
    badge: "🤖 นวัตกรรมใหม่ SMEs",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    category: "24/7 AI Watchdog Core",
    title: "SME AI Caretaker เฝ้าร้าน 24 ชม.",
    tagline: "แอดมิน AI ตอบแชท + ตรวจสลิปปลอมใน 2 วินาที + บันทึกชีต พร้อมครูอ้นเฝ้าดูแลระบบให้",
    priceTag: "เฉลี่ยแค่วันละ 33 บาท!",
    highlightBenefit: "🛡️ ระบบ AI คุม AI (Watchdog) เฝ้าระวัง 24 ชม. ไม่ต้องปวดหัวเรื่องเขียนโค้ด",
    linkUrl: "/ai-caretaker",
    ctaText: "สำรวจลูกแก้ว AI Caretaker",
    accentColor: "emerald",
    stats: "ตรวจสลิป 2 วิ",
  },
  {
    id: "teacher-prep",
    badge: "🎫 บัตรผ่านข้าราชการ",
    badgeClass: "bg-amber-400/25 text-amber-300 border-amber-400/50",
    category: "Holographic VIP Golden Ticket",
    title: "บอทติวสอบครูผู้ช่วย + เพลงช่วยจำ",
    tagline: "กลุ่ม Telegram VIP บอทส่งข้อสอบ 3 เวลา พร้อม AI วิเคราะห์ชอยส์ลวงและอัลบั้มเพลงจำมาตรา",
    priceTag: "เพียง 390 ฿ • สิทธิ์ตลอดชีพ",
    highlightBenefit: "🎯 ย่อยกฎหมายและหลักสูตรเป็นเพลงช่วยจำ สอบรอบเดียวติดอันดับต้นๆ",
    linkUrl: "/teacher-prep",
    ctaText: "รับตั๋วทองคำ VIP Golden Pass",
    accentColor: "amber",
    stats: "1,500+ คลังข้อสอบ",
  },
  {
    id: "student-vault",
    badge: "🎒 อนาคตเด็กไทย",
    badgeClass: "bg-pink-500/20 text-pink-300 border-pink-500/40",
    category: "Holographic Cyber Collector Pass",
    title: "คลังเด็ก ม.ปลาย Portfolio TCAS 3D",
    tagline: "บัตรสะสมไซเบอร์ 3 มิติ เว็บพอร์ตโฟลิโอ Interactive สำหรับยื่นมหาวิทยาลัยรอบที่ 1",
    priceTag: "เริ่มต้นเพียง 199 ฿",
    highlightBenefit: "✨ หน้าเว็บ 3D โดดเด่นเหนือพอร์ตกระดาษ สแกน QR Code ตรวจผลงานได้ทันที",
    linkUrl: "/student-vault",
    ctaText: "เปิดคลังบัตรนักเรียน TCAS",
    accentColor: "pink",
    stats: "TCAS 3D Pass",
  },
  {
    id: "music-store",
    badge: "💿 เพื่อการศึกษา & ว.PA",
    badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    category: "3D Vinyl Record & Sleeve",
    title: "แผ่นเสียงไวนิล 3D & เพลงช่วยจำ",
    tagline: "เพลงสรุปเนื้อหากฎหมายครู และ BGM บรรเลงไร้ลิขสิทธิ์ความยาว 60 นาทีสำหรับคลิปสอน ว.PA",
    priceTag: "เพียง 199 ฿ (แถมฟรีชีตเนื้อเพลง)",
    highlightBenefit: "🎵 ลิขสิทธิ์แท้ 100% เปิดในคลิปประเมินผ่านฉลุย ไร้ปัญหาติดลิขสิทธิ์เพลง",
    linkUrl: "/music-store",
    ctaText: "หมุนแผ่นเสียงไวนิล 3D",
    accentColor: "purple",
    stats: "BGM 60 นาทีเต็ม",
  },
  {
    id: "services",
    badge: "🛠️ งานสั่งทำระดับองค์กร",
    badgeClass: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    category: "Cyber Blueprint HUD Tablet",
    title: "รับสั่งทำ Web App & วิทยากร",
    tagline: "พัฒนาเว็บแอปพลิเคชันตามสั่งตรงบริบทโรงเรียน มีหนังสือราชการ และจัดอบรมครู On-site",
    priceTag: "เริ่มต้น 2,490 ฿ (เหมาจ่ายจบ)",
    highlightBenefit: "📐 พิมพ์เขียวสถาปัตยกรรมเฉพาะคุณ รันบน Google Cloud 100% ไร้ค่าโฮสต์",
    linkUrl: "/services",
    ctaText: "ดูพิมพ์เขียว & ขอใบเสนอราคา",
    accentColor: "blue",
    stats: "ส่งมอบใน 3-7 วัน",
  },
];

export function MultiVaultCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto rotate carousel every 6 seconds unless user hovers or interacts
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ECOSYSTEM_VAULTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + ECOSYSTEM_VAULTS.length) % ECOSYSTEM_VAULTS.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % ECOSYSTEM_VAULTS.length);
  };

  const activeItem = ECOSYSTEM_VAULTS[currentIndex];

  // Helper to render the corresponding 3D mockup
  const render3DMockup = (vault: EcosystemVaultItem) => {
    switch (vault.id) {
      case "digital-vault":
        return (
          <div className="transform scale-95 sm:scale-100 hover:scale-105 transition-transform duration-300">
            <DvdCaseMockup
              code="AONE01"
              title="เช็คชื่อ & พฤติกรรม V2"
              tagline="SMART ATTENDANCE & CONDUCT V2"
              isInteractive={true}
            />
          </div>
        );
      case "bundles":
        return (
          <div className="transform scale-90 sm:scale-100 hover:scale-105 transition-transform duration-300">
            <CyberVaultCrateMockup
              bundleId="all-in-one-lifetime"
              title="All-in-One 20 Systems Lifetime"
              tagline="หีบคลังสมบัติ 20 ระบบพร้อมอัปเดตตลอดชีพ"
              systemCount={20}
              themeColor="amber"
              isFeatured={true}
              size="md"
              isInteractive={true}
            />
          </div>
        );
      case "ebooks":
        return (
          <div className="transform scale-90 sm:scale-100 hover:scale-105 transition-transform duration-300">
            <Book3DMockup
              code="EB01"
              title="คัมภีร์ ว.PA ผ่านฉลุย 100%"
              category="ว.PA & วิทยฐานะ"
              themeColor="purple"
              rank={1}
              size="md"
              isInteractive={true}
            />
          </div>
        );
      case "ai-caretaker":
        return (
          <div className="transform scale-90 sm:scale-100 hover:scale-105 transition-transform duration-300">
            <CyberSentinelOrbMockup
              packageId="sme-pro"
              title="SME AI Pro Care (VIP)"
              themeColor="emerald"
              isFeatured={true}
              size="md"
              isInteractive={true}
            />
          </div>
        );
      case "teacher-prep":
        return (
          <div className="transform scale-90 sm:scale-100 hover:scale-105 transition-transform duration-300">
            <GoldenTicketMockup
              serialNo="VIP-2026-TEACHER-PASS"
              candidateName="FUTURE GOVERNMENT TEACHER"
              examYear="2026"
              size="md"
              isInteractive={true}
            />
          </div>
        );
      case "student-vault":
        return (
          <div className="transform scale-90 sm:scale-100 hover:scale-105 transition-transform duration-300">
            <StudentCardMockup
              code="STU01"
              title="เว็บ Portfolio ดิจิทัล TCAS 3D"
              tagline="SMART TCAS 3D PROFILE PASS"
              themeColor="pink"
              badgeText="TCAS 3D PASS"
              serialNo="STU-2026-TCAS-001"
              isInteractive={true}
            />
          </div>
        );
      case "music-store":
        return (
          <div className="transform scale-90 sm:scale-100 hover:scale-105 transition-transform duration-300">
            <VinylRecordMockup
              code="MUS-01"
              title="เพลงช่วยจำกฎหมายครู Vol.1"
              categoryLabel="เพลงช่วยจำสอบครูผู้ช่วย"
              bpm="115 BPM"
              duration="3:30"
              accentColor="purple"
              isPlaying={false}
              size="md"
              isInteractive={true}
            />
          </div>
        );
      case "services":
        return (
          <div className="transform scale-90 sm:scale-100 hover:scale-105 transition-transform duration-300">
            <CyberBlueprintMockup
              tierId="full-webapp"
              title="Full Custom Web App"
              themeColor="cyan"
              isFeatured={true}
              size="md"
              isInteractive={true}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      className="relative py-12 sm:py-16 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-slate-950/80 via-slate-900/90 to-slate-950/90 backdrop-blur-xl shadow-2xl"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
      aria-label="3D Multi-Vault Ecosystem Carousel"
    >
      {/* Background Ambient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-10 w-80 h-80 bg-purple-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm font-prompt font-bold shadow-[0_0_25px_rgba(6,182,212,0.3)]">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>3D INTERACTIVE ECOSYSTEM COMMAND CENTER</span>
          </div>

          <h2 className="font-prompt text-3xl sm:text-5xl font-black text-white leading-tight">
            สำรวจ 8 มหาคลังนวัตกรรม{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-amber-300 drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
              สไตล์ 3D ล้ำยุค
            </span>
          </h2>
          <p className="font-prompt text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            ทุกโซลูชันถูกออกแบบเป็นวัตถุ 3 มิติพร้อมให้คุณสัมผัส หมุนดูรายละเอียด หรือคลิกเปิดเข้าสู่คลังเจาะลึก 7 ข้อก่อนตัดสินใจได้ทันที
          </p>
        </div>

        {/* ── INTERACTIVE 3D STAGE & CAROUSEL VIEWPORT ── */}
        <div className="relative rounded-3xl p-6 sm:p-10 border border-white/10 bg-slate-900/60 shadow-2xl backdrop-blur-md overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Information, Highlights & Action */}
              <div className="lg:col-span-7 space-y-5 text-left order-2 lg:order-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`px-3.5 py-1 rounded-full text-xs font-bold border shadow-sm ${activeItem.badgeClass}`}>
                    {activeItem.badge}
                  </span>
                  <span className="text-xs font-mono text-cyan-300 font-bold bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
                    {activeItem.category}
                  </span>
                  <span className="text-xs font-mono text-white/40">
                    PORTAL {currentIndex + 1} OF {ECOSYSTEM_VAULTS.length}
                  </span>
                </div>

                <h3 className="font-prompt text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  {activeItem.title}
                </h3>

                <p className="font-prompt text-sm sm:text-base text-white/80 leading-relaxed">
                  {activeItem.tagline}
                </p>

                {/* Highlight Benefit Box */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">ผลลัพธ์ที่พิสูจน์แล้ว:</span>
                    <p className="text-xs sm:text-sm text-white/90 font-medium mt-0.5">
                      {activeItem.highlightBenefit}
                    </p>
                  </div>
                </div>

                {/* Pricing & Portal Access CTA */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
                  <div>
                    <span className="text-[11px] font-prompt text-white/50 uppercase tracking-wider block">ข้อเสนอและราคา:</span>
                    <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-200 to-amber-300 font-mono">
                      {activeItem.priceTag}
                    </span>
                  </div>

                  <Link
                    href={activeItem.linkUrl}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-linear-to-r from-cyan-500 via-blue-600 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white font-prompt font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                  >
                    <span>{activeItem.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: 3D Mockup Display Stage */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2 py-4 relative">
                {/* 3D Mockup Container */}
                <div className="relative z-10 flex items-center justify-center min-h-[260px] sm:min-h-[300px]">
                  {render3DMockup(activeItem)}
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-prompt text-white/50">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>แตะหรือวางเมาส์เพื่อหมุนวัตถุ 3 มิติในพื้นที่นี้</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Navigation Buttons & Indicators */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Dots Navigator */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
              {ECOSYSTEM_VAULTS.map((vault, idx) => (
                <button
                  key={vault.id}
                  onClick={() => {
                    setIsAutoPlay(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? "w-8 bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                      : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                  title={vault.title}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title="ย้อนกลับ"
                aria-label="Previous Portal"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="p-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                title="ถัดไป"
                aria-label="Next Portal"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

        {/* ── QUICK VAULT DIRECTORY TILES (8 ICONS) ── */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {ECOSYSTEM_VAULTS.map((vault, idx) => {
            const isSelected = currentIndex === idx;
            return (
              <button
                key={vault.id}
                onClick={() => {
                  setIsAutoPlay(false);
                  setCurrentIndex(idx);
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  isSelected
                    ? "bg-cyan-500/15 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-105"
                    : "bg-slate-900/40 border-white/10 hover:bg-white/5 hover:border-white/20 text-white/70"
                }`}
              >
                <span className="text-xl">
                  {vault.id === "digital-vault" && "📦"}
                  {vault.id === "bundles" && "🧰"}
                  {vault.id === "ebooks" && "📚"}
                  {vault.id === "ai-caretaker" && "🛡️"}
                  {vault.id === "teacher-prep" && "🎫"}
                  {vault.id === "student-vault" && "🎒"}
                  {vault.id === "music-store" && "💿"}
                  {vault.id === "services" && "📐"}
                </span>
                <span className={`text-[11px] font-prompt font-bold line-clamp-1 ${isSelected ? "text-cyan-300" : "text-white"}`}>
                  {vault.id === "digital-vault" && "คลังครู DVD"}
                  {vault.id === "bundles" && "หีบเหมา Crate"}
                  {vault.id === "ebooks" && "คลัง 30 E-Book"}
                  {vault.id === "ai-caretaker" && "AI Caretaker"}
                  {vault.id === "teacher-prep" && "ติวสอบ VIP"}
                  {vault.id === "student-vault" && "พอร์ต TCAS"}
                  {vault.id === "music-store" && "ไวนิล & BGM"}
                  {vault.id === "services" && "รับสั่งทำ Web"}
                </span>
                <span className="text-[9px] font-mono text-white/40">
                  {vault.stats}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}

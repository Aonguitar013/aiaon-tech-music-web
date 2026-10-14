"use client";

import { motion, Variants } from "framer-motion";
import {
  ArrowRight, Sparkles, Gift, GraduationCap, Package,
  CheckCircle2, ShieldCheck, Zap, Users, School,
  BookOpen, Music, Bot, Code2, Headphones
} from "lucide-react";
import Link from "next/link";

/* ============================================================
   ANIMATION VARIANTS
============================================================ */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const headingVariant: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSection() {
  return (
    <section
      className="relative pt-6 sm:pt-10 pb-12 flex flex-col items-center justify-center overflow-hidden px-4"
      aria-label="Hero Section"
    >
      {/* Background ambient orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full mix-blend-screen pointer-events-none -translate-x-1/2" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-pink-600/10 blur-[140px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-purple-600/10 blur-[140px] rounded-full mix-blend-screen pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,0.04) 1px,transparent 1px), linear-gradient(to bottom,rgba(255,255,255,0.04) 1px,transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Live Feature Marquee Strip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mb-6 overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-md py-2 px-4 shadow-inner"
      >
        <div className="flex items-center justify-center gap-4 sm:gap-8 text-xs font-prompt text-white/70 overflow-x-auto no-scrollbar whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5 text-cyan-300 font-semibold">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>🤖 Gemini 2.5 Flash ตรวจสลิปอัตโนมัติใน 2 วิ</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="inline-flex items-center gap-1.5 text-emerald-300 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>📦 ส่งมอบระบบและไฟล์ ZIP ตลอด 24 ชม.</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="inline-flex items-center gap-1.5 text-purple-300 font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>📚 คลัง 30 E-Book นวัตกรรม &amp; คู่มือครูไทย</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="inline-flex items-center gap-1.5 text-amber-300 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>🔒 Google Sheets 100% ไร้ค่าบริการรายเดือน</span>
          </span>
        </div>
      </motion.div>

      {/* Main Content Container */}
      <motion.div
        className="max-w-5xl mx-auto text-center z-10 space-y-6 flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Top Floating Badge */}
        <motion.div variants={fadeUp}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs sm:text-sm font-prompt font-semibold tracking-wide shadow-[0_0_25px_rgba(6,182,212,0.25)]">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>ไอทีง่ายๆ สไตล์ iAon — ให้ AI ทำงานแทนคุณ แล้วเอาเวลาไปใช้ชีวิตนะครับ</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={headingVariant}
          className="font-prompt text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]"
        >
          จักรวาลโซลูชันเพื่อการศึกษา ธุรกิจ &amp; ดนตรี{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
            เสกให้เป็นจริงในที่เดียว
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-lg text-white/75 max-w-3xl mx-auto font-prompt font-normal leading-relaxed"
        >
          รวมทุกสิ่งที่ครูอ้นเชี่ยวชาญและสร้างสรรค์ขึ้นจริง: <strong>20+ ระบบ Google Apps Script</strong> ไร้รายเดือน, <strong>คลัง 30 E-Book ครูไทย 3D</strong>, <strong>ระบบบอทติวสอบครูผู้ช่วย</strong>, <strong>AI Caretaker ดูแลร้านค้า 24 ชม.</strong>, <strong>เพลงช่วยจำ &amp; BGM ลิขสิทธิ์</strong> และ <strong>รับทำระบบตามสั่ง</strong>
        </motion.p>

        {/* Quick Solution Filter Pills */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-2 pt-1 max-w-4xl"
        >
          <a
            href="#bento-gas"
            className="px-3.5 py-1.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 font-prompt text-xs font-medium transition-all flex items-center gap-1.5"
          >
            <Package className="w-3.5 h-3.5 text-blue-400" />
            <span>20+ ระบบ Apps Script โรงเรียน</span>
          </a>
          <a
            href="#bento-ebooks"
            className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 font-prompt text-xs font-medium transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>คลัง 30 E-Book ครูไทย 3D</span>
          </a>
          <a
            href="#bento-caretaker"
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-prompt text-xs font-medium transition-all flex items-center gap-1.5"
          >
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Caretaker ดูแลร้านค้า 24 ชม.</span>
          </a>
          <a
            href="#bento-prep"
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-prompt text-xs font-medium transition-all flex items-center gap-1.5"
          >
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>ติวสอบครูผู้ช่วย + เพลงจำ</span>
          </a>
          <a
            href="#bento-music"
            className="px-3.5 py-1.5 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 text-pink-300 font-prompt text-xs font-medium transition-all flex items-center gap-1.5"
          >
            <Music className="w-3.5 h-3.5 text-pink-400" />
            <span>Music Store &amp; BGM ว.PA</span>
          </a>
          <a
            href="#bento-custom"
            className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-prompt text-xs font-medium transition-all flex items-center gap-1.5"
          >
            <Code2 className="w-3.5 h-3.5 text-amber-400" />
            <span>สั่งทำเว็บ &amp; วิทยากรบรรยาย</span>
          </a>
        </motion.div>

        {/* --- DUAL ACTION BUTTONS + FREEBIE BADGE --- */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 w-full sm:w-auto"
        >
          {/* Main Showcase Button */}
          <a
            href="#everything-i-can-do"
            className="group relative w-full sm:w-auto"
          >
            <span
              className="absolute inset-0 rounded-2xl bg-linear-to-r from-blue-600 via-cyan-500 to-emerald-500 blur-md opacity-40 group-hover:opacity-80 transition-all duration-300 pointer-events-none"
              aria-hidden="true"
            />
            <span className="relative inline-flex items-center justify-center gap-2.5 w-full px-7 py-3.5 rounded-2xl bg-linear-to-r from-blue-600 via-cyan-500 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-prompt font-bold text-sm sm:text-base transition-all duration-300 group-hover:scale-102 shadow-lg">
              <Zap className="w-4 h-4 shrink-0 text-cyan-200" />
              <span>⚡ สำรวจทุกสิ่งที่ครูอ้นทำได้ (All Portals)</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>

          {/* Freebies Button */}
          <Link
            href="/freebies"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-emerald-500/30 text-emerald-300 font-prompt font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all hover:scale-102 shadow-sm"
          >
            <Gift className="w-4 h-4 text-emerald-400 animate-bounce" />
            <span>🎁 รับโค้ดฟรี 7 ระบบ (รหัส FREE69)</span>
          </Link>
        </motion.div>

        {/* --- BLOCK 2: TRUST & SOCIAL PROOF BADGES --- */}
        <motion.div
          variants={fadeUp}
          className="pt-4 w-full max-w-4xl"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-xs">
            <div className="flex flex-col items-center justify-center p-2 text-center">
              <Zap className="w-5 h-5 text-cyan-400 mb-1" />
              <span className="font-prompt text-xl sm:text-2xl font-black text-white">59+</span>
              <span className="font-prompt text-[11px] text-white/50">ระบบและแพ็กเกจในคลัง</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 text-center border-l border-white/10">
              <BookOpen className="w-5 h-5 text-purple-400 mb-1" />
              <span className="font-prompt text-xl sm:text-2xl font-black text-white">30 เล่ม</span>
              <span className="font-prompt text-[11px] text-white/50">E-Book นวัตกรรมครูไทย</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 text-center border-l border-white/10">
              <Users className="w-5 h-5 text-pink-400 mb-1" />
              <span className="font-prompt text-xl sm:text-2xl font-black text-white">2,390+</span>
              <span className="font-prompt text-[11px] text-white/50">เพื่อนสมาชิกร่วมติดตาม</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 text-center border-l border-white/10">
              <School className="w-5 h-5 text-amber-400 mb-1" />
              <span className="font-prompt text-xl sm:text-2xl font-black text-white">0 ฿</span>
              <span className="font-prompt text-[11px] text-white/50">ไม่มีค่าบริการรายเดือน</span>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}

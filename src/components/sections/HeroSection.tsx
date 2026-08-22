"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { ArrowRight, Sparkles, Gift, GraduationCap, Package, CheckCircle2, ShieldCheck, Zap, Users, School } from "lucide-react";
import Link from "next/link";

/* ============================================================
   ANIMATION VARIANTS
============================================================ */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const headingVariant: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSection() {
  return (
    <section
      className="relative pt-12 pb-16 flex flex-col items-center justify-center overflow-hidden px-4"
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

      {/* Main Content Container */}
      <motion.div
        className="max-w-5xl mx-auto text-center z-10 space-y-7 flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Top Floating Badge */}
        <motion.div variants={fadeUp}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs sm:text-sm font-prompt font-semibold tracking-wide shadow-[0_0_25px_rgba(6,182,212,0.25)]">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>ไอทีง่ายๆ สไตล์ไอ้อ้น — ระบบอัตโนมัติและ AI เพื่อการศึกษา</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={headingVariant}
          className="font-prompt text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.12]"
        >
          เสกงานเอกสารโรงเรียน &amp; งานเรียน{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
            เสร็จในคลิกเดียว
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-base sm:text-xl text-white/75 max-w-3xl mx-auto font-prompt font-normal leading-relaxed"
        >
          ช่วยผ่อนแรงครูไทย เลิกงานตรงเวลา พร้อมเครื่องมือช่วยเรียนสำหรับนักเรียนยุคใหม่ รันบน Google Workspace ของตัวเอง ปลอดภัย 100% ไม่มีค่าบริการรายเดือน
        </motion.p>

        {/* --- DUAL ACTION BUTTONS + FREEBIE BADGE --- */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto"
        >
          {/* Cyan Teacher Button */}
          <Link
            href="/digital-vault"
            className="group relative w-full sm:w-auto"
          >
            <span
              className="absolute inset-0 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 blur-md opacity-40 group-hover:opacity-80 transition-all duration-300 pointer-events-none"
              aria-hidden="true"
            />
            <span className="relative inline-flex items-center justify-center gap-2.5 w-full px-7 py-4 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-prompt font-bold text-base transition-all duration-300 group-hover:scale-105 shadow-lg">
              <Package className="w-5 h-5 shrink-0" />
              <span>📦 ดูคลัง 20 ระบบครู &amp; โรงเรียน</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Pink Student Button */}
          <Link
            href="/student-vault"
            className="group relative w-full sm:w-auto"
          >
            <span
              className="absolute inset-0 rounded-2xl bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 blur-md opacity-30 group-hover:opacity-75 transition-all duration-300 pointer-events-none"
              aria-hidden="true"
            />
            <span className="relative inline-flex items-center justify-center gap-2.5 w-full px-7 py-4 rounded-2xl bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-prompt font-bold text-base transition-all duration-300 group-hover:scale-105 shadow-lg border border-pink-400/30">
              <GraduationCap className="w-5 h-5 shrink-0 text-pink-200" />
              <span>🎒 คลังนักเรียน &amp; TCAS (69-129 ฿)</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>

        {/* Freebie Claim Hook */}
        <motion.div variants={fadeUp} className="pt-1">
          <Link
            href="/digital-vault"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-prompt text-xs sm:text-sm font-semibold hover:bg-emerald-500/20 transition-all hover:scale-105"
          >
            <Gift className="w-4 h-4 text-emerald-400 shrink-0 animate-bounce" />
            <span>🎁 สมาชิกใหม่รับฟรี: ระบบฝึกจำหน้านักเรียน &amp; คำศัพท์ 3D Flashcard →</span>
          </Link>
        </motion.div>

        {/* --- BLOCK 2: TRUST & SOCIAL PROOF BADGES --- */}
        <motion.div
          variants={fadeUp}
          className="pt-6 w-full max-w-4xl"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
            <div className="flex flex-col items-center justify-center p-2 text-center">
              <Zap className="w-5 h-5 text-cyan-400 mb-1" />
              <span className="font-prompt text-xl sm:text-2xl font-black text-white">20+</span>
              <span className="font-prompt text-[11px] text-white/50">ระบบ Apps Script พร้อมใช้</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 text-center border-l border-white/10">
              <Users className="w-5 h-5 text-pink-400 mb-1" />
              <span className="font-prompt text-xl sm:text-2xl font-black text-white">2,390+</span>
              <span className="font-prompt text-[11px] text-white/50">เพื่อนสมาชิกร่วมติดตาม</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 text-center border-l border-white/10">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mb-1" />
              <span className="font-prompt text-xl sm:text-2xl font-black text-white">100%</span>
              <span className="font-prompt text-[11px] text-white/50">รันบน Google ตัวเองปลอดภัย</span>
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

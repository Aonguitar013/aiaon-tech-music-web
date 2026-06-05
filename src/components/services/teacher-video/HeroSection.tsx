"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { ArrowRight, MessageSquare, ChevronDown, CheckCircle, Video, GraduationCap } from "lucide-react";
import { FaLine } from "react-icons/fa6";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const headingVariant: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const chevronVariants: Variants = {
  initial: { y: 0, opacity: 0.5 },
  animate: {
    y: [0, 10, 0],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export function HeroSection() {
  return (
    <section
      className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-4 pt-8 md:pt-16"
      aria-label="Hero Section"
    >
      {/* Background gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, transparent 60%, rgba(6,199,85,0.05) 100%)",
        }}
      />

      {/* Blue ambient light */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -translate-x-1/3" />
      {/* Cyan/Green ambient light */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none translate-x-1/3" />

      {/* Inner grid layout for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        className="max-w-5xl mx-auto text-center z-10 space-y-8 flex-1 flex flex-col items-center justify-center py-12"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Animated Badge */}
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full glass-card text-xs font-medium text-white/80 select-none border border-blue-500/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#06C755] opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#06C755]" />
            </span>
            <span className="text-blue-400 font-bold tracking-wide font-prompt">AiAon Tech</span>
            <span className="text-white/20">|</span>
            <span className="text-[#06C755] font-bold tracking-wide font-prompt">ที่ปรึกษาและผลิตสื่อวิทยฐานะ (PA)</span>
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={headingVariant}
          className="font-prompt text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.15] max-w-4xl"
        >
          เปลี่ยนการทำ
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 drop-shadow-[0_0_24px_rgba(59,130,246,0.3)] mx-2">
            วิทยฐานะครู
          </span>
          <br />
          ให้เป็นเรื่อง
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 drop-shadow-[0_0_24px_rgba(16,185,129,0.3)] ml-2">
            ง่ายและมั่นใจ
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-prompt font-light leading-relaxed"
        >
          ที่ปรึกษาวางแผนแผนการสอน ผลิตวิดีโอ คลิปแนะนำสภาพปัญหา และระบบเทคโนโลยีห้องเรียน 
          <br className="hidden md:inline" />
          <span className="text-blue-400 font-medium">ถูกต้องตามหลักเกณฑ์ ก.ค.ศ. (PA) ล่าสุด</span> 
          {" "}ดูแลใกล้ชิดโดยเพื่อนร่วมวิชาชีพผู้เชี่ยวชาญด้านนวัตกรรม
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto"
        >
          {/* Green Line Button */}
          <a
            href="https://lin.ee/XXLvrKW"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full sm:w-auto"
          >
            <span
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#06C755] to-emerald-500 blur-md opacity-40 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500 pointer-events-none"
              aria-hidden="true"
            />
            <span className="relative inline-flex items-center justify-center gap-2.5 w-full px-8 py-4 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-prompt font-semibold text-base transition-all duration-300 group-hover:scale-105 shadow-[0_0_20px_rgba(6,199,85,0.35)]">
              <FaLine className="w-5.5 h-5.5 text-white" />
              ปรึกษาและประเมินผลงานฟรี
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>

          {/* Secondary Scroll Button */}
          <a
            href="#services"
            className="group relative w-full sm:w-auto"
          >
            <span className="relative inline-flex items-center justify-center gap-2.5 w-full px-8 py-4 rounded-full glass-card border border-white/10 text-white hover:text-blue-400 font-prompt font-normal text-base transition-all duration-300 group-hover:scale-105 hover:bg-white/5">
              ดูรายละเอียดบริการ
            </span>
          </a>
        </motion.div>

        {/* Trust Stats Bar */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-3 gap-4 md:gap-8 pt-8 max-w-2xl mx-auto w-full text-center"
        >
          {[
            { value: "100%", label: "ประเมินผ่านเกณฑ์ PA" },
            { value: "100+", label: "คุณครูร่วมงานทั่วประเทศ" },
            { value: "ก.ค.ศ.", label: "ตรงตามเกณฑ์ใหม่ 100%" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1.5 p-3 rounded-2xl glass-card bg-white/2 border border-white/5">
              <span className="font-prompt text-lg sm:text-2xl font-bold text-white bg-clip-text bg-gradient-to-r from-white to-white/70">{stat.value}</span>
              <span className="font-prompt text-[10px] sm:text-xs text-white/50 tracking-wide font-light">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <span className="font-prompt text-[9px] uppercase tracking-[0.25em] text-white/30 select-none">
          เลื่อนเพื่อดูข้อมูล
        </span>
        <div className="w-5.5 h-8.5 rounded-full border border-white/25 flex items-start justify-center pt-1.5 relative overflow-hidden">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-white/60"
            animate={{
              y: [0, 8, 0],
              opacity: [0.8, 0.2, 0.8],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </div>
        <motion.div
          variants={chevronVariants}
          initial="initial"
          animate="animate"
        >
          <ChevronDown className="w-3.5 h-3.5 text-white/30" />
        </motion.div>
      </div>
    </section>
  );
}

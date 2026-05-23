"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { ArrowRight, PlayCircle, ChevronDown } from "lucide-react";
import Link from "next/link";

/* ============================================================
   ANIMATION VARIANTS — defined outside component to avoid
   re-creation on every render.
============================================================ */

/** Shared staggered container — children animate in sequence */
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.1,
    },
  },
};

/** Fade-up for badge, subtext, and buttons */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Scale-in with slight upward drift for the main heading */
const headingVariant: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Scroll chevron infinite bounce */
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

/* ============================================================
   COMPONENT
============================================================ */

export function HeroSection() {
  const playControls = useAnimation();

  return (
    <section
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4"
      aria-label="Hero Section"
    >
      {/* ── Background decorations ──────────────────────────── */}

      {/* Diagonal tinted overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, transparent 50%, rgba(245,158,11,0.08) 100%)",
        }}
      />

      {/* Blue ambient orb — top-left */}
      <div className="absolute top-0 left-0 w-1/2 h-[75%] bg-blue-600/10 blur-[130px] rounded-full mix-blend-screen pointer-events-none -translate-x-1/4 -translate-y-1/4" />

      {/* Amber ambient orb — bottom-right */}
      <div className="absolute bottom-0 right-0 w-1/2 h-[75%] bg-amber-600/10 blur-[130px] rounded-full mix-blend-screen pointer-events-none translate-x-1/4 translate-y-1/4" />

      {/* Fine inner grid (denser than global grid for hero depth) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,0.04) 1px,transparent 1px), linear-gradient(to bottom,rgba(255,255,255,0.04) 1px,transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Main content container ───────────────────────────── */}
      <motion.div
        className="max-w-5xl mx-auto text-center z-10 space-y-8 flex-1 flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-sm font-medium text-white/80 select-none">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
            </span>
            <span className="text-blue-400 font-semibold tracking-wide">Technology</span>
            <span className="text-white/25 font-light">×</span>
            <span className="text-amber-400 font-semibold tracking-wide">Music</span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75 animate-ping" style={{ animationDelay: "0.5s" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={headingVariant}
          className="font-prompt text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.08]"
        >
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-cyan-400 drop-shadow-[0_0_28px_rgba(59,130,246,0.35)]">
            AiAon Tech
          </span>
          <span className="text-white/25 mx-3 md:mx-5 font-extralight">&amp;</span>
          <br className="sm:hidden" />
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 drop-shadow-[0_0_28px_rgba(245,158,11,0.35)]">
            Music Studio
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-white/75 max-w-3xl mx-auto font-prompt font-light leading-relaxed"
        >
          ลดภาระงานครู นักเรียน และคนทำงานด้วย{" "}
          <span className="text-blue-400 font-semibold">ระบบอัตโนมัติ (Smart Automation)</span>{" "}
          และพัฒนาทักษะด้วยคอร์สเรียนไอที พร้อมรองรับบริการ{" "}
          <span className="text-amber-400 font-semibold">สร้างสรรค์งานดนตรี & มิกซ์เสียง</span>{" "}
          โดยครูดนตรีสากลมืออาชีพ
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
        >
          {/* ── Cyan Tech Button ── */}
          <Link
            href="/dashboard/academy?category=Technology"
            id="hero-cta-tech"
            className="group relative w-full sm:w-auto"
          >
            {/* Expanding glow layer behind the button */}
            <span
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 blur-md opacity-40 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500 pointer-events-none"
              aria-hidden="true"
            />
            <span className="relative inline-flex items-center justify-center gap-2.5 w-full px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:from-blue-500 group-hover:to-cyan-400 text-white font-prompt font-semibold text-base transition-all duration-300 group-hover:scale-105 shadow-[0_0_24px_rgba(59,130,246,0.35)]">
              คอร์สเรียน & ระบบอัตโนมัติ
              {/* Arrow slides right on hover */}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </Link>

          {/* ── Amber Music Button (Secondary styled) ── */}
          <Link
            href="/dashboard/academy?category=Music"
            id="hero-cta-music"
            className="group relative w-full sm:w-auto"
            onMouseEnter={() => playControls.start("pulse")}
            onMouseLeave={() => playControls.start("idle")}
          >
            {/* Pulsing warm glow - softer for secondary style */}
            <span
              className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 blur-md opacity-10 group-hover:opacity-30 group-hover:scale-105 transition-all duration-500 pointer-events-none"
              aria-hidden="true"
            />
            <span className="relative inline-flex items-center justify-center gap-2.5 w-full px-8 py-4 rounded-full glass-card border border-amber-500/40 text-amber-400 group-hover:text-amber-300 font-prompt font-semibold text-base transition-all duration-300 group-hover:scale-105 shadow-[0_0_12px_rgba(245,158,11,0.1)] hover:bg-amber-500/5">
              {/* Animated play icon */}
              <motion.span
                animate={playControls}
                variants={{
                  idle: { rotate: 0, scale: 1 },
                  pulse: {
                    rotate: [0, -12, 0, -8, 0],
                    scale: [1, 1.18, 1, 1.12, 1],
                    transition: { duration: 0.55, ease: "easeInOut" },
                  },
                }}
                initial="idle"
                className="flex items-center"
              >
                <PlayCircle className="w-5 h-5" />
              </motion.span>
              บริการทำดนตรี & มิกซ์เสียง
            </span>
          </Link>
        </motion.div>

        {/* Stats row — subtle social proof */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-8 pt-4 text-center"
        >
          {[
            { value: "1,200+", label: "ชั่วโมงงานที่ประหยัดได้" },
            { value: "500+", label: "นักเรียน & ครูร่วมเรียน" },
            { value: "50+", label: "ระบบอัตโนมัติเปิดใช้งาน" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <span className="font-prompt text-xl font-bold text-white">{stat.value}</span>
              <span className="font-prompt text-xs text-white/40 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ────────────────────────────────── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
        <span className="font-prompt text-[10px] uppercase tracking-[0.2em] text-white/30 select-none">
          Scroll
        </span>
        {/* Animated mouse icon */}
        <div className="w-6 h-9 rounded-full border border-white/20 flex items-start justify-center pt-1.5 relative overflow-hidden">
          <motion.div
            className="w-1 h-2 rounded-full bg-white/50"
            animate={{
              y: [0, 10, 0],
              opacity: [0.8, 0.2, 0.8],
            }}
            transition={{
              duration: 1.8,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </div>
        {/* Bouncing chevron */}
        <motion.div
          variants={chevronVariants}
          initial="initial"
          animate="animate"
        >
          <ChevronDown className="w-4 h-4 text-white/30" />
        </motion.div>
      </div>
    </section>
  );
}

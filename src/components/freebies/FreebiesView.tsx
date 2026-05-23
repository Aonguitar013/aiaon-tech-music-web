"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Gift, Download, Music, Code2, X, LogIn,
  FileJson, FileSpreadsheet, Music2, Mic2,
  CheckCircle2, Star, Sparkles, Filter,
  ArrowRight,
} from "lucide-react";
import * as Icons from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */

type Category = "all" | "tech" | "music";

export interface Freebie {
  id: string;
  title: string;
  description: string;
  category: "tech" | "music";
  icon_name: string;
  color_from: string;
  color_to: string;
  glow_color: string;
  border_color: string;
  text_color: string;
  bg_color: string;
  tag: string;
  file_size: string;
  file_type: string;
  download_url: string;
}

/* ─────────────────────────────────────────────────────────────
   DOWNLOAD STATE MACHINE
───────────────────────────────────────────────────────────── */

type DlState = "idle" | "preparing" | "done";

/* ─────────────────────────────────────────────────────────────
   AUTH MODAL
───────────────────────────────────────────────────────────── */

function AuthModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1,    opacity: 1, y: 0 }}
        exit={{    scale: 0.92, opacity: 0, y: 12 }}
        transition={{ type: "spring", damping: 20, stiffness: 260 }}
        className="relative z-10 glass-card p-8 md:p-10 max-w-md w-full text-center border-purple-500/25 shadow-[0_0_60px_rgba(168,85,247,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
          <Gift className="w-8 h-8 text-white" />
        </div>

        <h2 className="font-prompt text-2xl font-bold text-white mb-3">
          ล็อกอินเพื่อดาวน์โหลดฟรี
        </h2>
        <p className="text-white/55 font-prompt text-sm leading-relaxed mb-8">
          สร้างบัญชีหรือล็อกอินเพื่อดาวน์โหลดทรัพยากรฟรีทั้งหมด
          ไม่มีค่าใช้จ่าย ไม่มีบัตรเครดิต
        </p>

        {/* Perks */}
        <ul className="space-y-2.5 mb-8 text-left">
          {[
            "ดาวน์โหลดของแจกฟรีทุกอย่างได้ไม่จำกัด",
            "เข้าถึงบทเรียนเพิ่มเติมและอัปเดตใหม่",
            "รับสิทธิ์ส่วนลดคอร์สพิเศษสำหรับสมาชิก",
          ].map((perk) => (
            <li key={perk} className="flex items-start gap-2.5 text-white/70 text-sm font-prompt">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              {perk}
            </li>
          ))}
        </ul>

        <Link
          href="/login?next=/freebies"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-prompt font-bold text-sm transition-all duration-300 hover:scale-[1.02] shadow-[0_0_24px_rgba(168,85,247,0.3)] hover:shadow-[0_0_36px_rgba(168,85,247,0.45)]"
          onClick={onClose}
        >
          <LogIn className="w-4 h-4" />
          ล็อกอิน / สมัครสมาชิกฟรี
        </Link>

        <p className="mt-4 text-white/25 font-prompt text-xs">
          ล็อกอินด้วย Google หรืออีเมลได้เลย — ง่ายและปลอดภัย
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FREEBIE CARD
───────────────────────────────────────────────────────────── */

function FreebieCard({
  freebie,
  isLoggedIn,
  onAuthPrompt,
}: {
  freebie: Freebie;
  isLoggedIn: boolean;
  onAuthPrompt: () => void;
}) {
  const [dlState, setDlState] = useState<DlState>("idle");
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const Icon = (Icons as any)[freebie.icon_name || "Gift"] || Icons.Gift;

  const handleDownload = useCallback(() => {
    if (!isLoggedIn) { onAuthPrompt(); return; }
    if (dlState !== "idle") return;

    setDlState("preparing");
    setProgress(0);

    let current = 0;
    timerRef.current = setInterval(() => {
      current += Math.random() * 22 + 8;
      if (current >= 100) {
        current = 100;
        clearInterval(timerRef.current!);
        setProgress(100);
        // Trigger real download
        setTimeout(() => {
          const a = document.createElement("a");
          a.href = freebie.download_url;
          a.download = freebie.title;
          a.target = "_blank";
          a.click();
          setDlState("done");
          // Reset after a moment
          setTimeout(() => { setDlState("idle"); setProgress(0); }, 3000);
        }, 300);
      } else {
        setProgress(Math.round(current));
      }
    }, 120);
  }, [isLoggedIn, dlState, freebie, onAuthPrompt]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Outer glow on hover */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${freebie.glow_color}, transparent 70%)` }}
      />

      <div className="relative glass-card border-white/8 group-hover:border-white/15 p-6 flex flex-col gap-5 h-full transition-all duration-300">

        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          {/* Icon */}
          <div className={`w-13 h-13 rounded-xl flex items-center justify-center bg-gradient-to-br ${freebie.color_from} ${freebie.color_to} shadow-lg group-hover:scale-105 transition-transform duration-300 shrink-0`}
            style={{ width: 52, height: 52 }}>
            <Icon className="w-6 h-6 text-white" />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 justify-end">
            <span className={`text-[10px] font-prompt font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${freebie.border_color} ${freebie.text_color} bg-white/3`}>
              {freebie.file_type}
            </span>
            <span className="text-[10px] font-prompt font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 text-white/40">
              {freebie.file_size}
            </span>
            <span className="text-[10px] font-prompt font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              ฟรี
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className={`font-prompt text-lg font-bold text-white mb-2 group-hover:${freebie.text_color} transition-colors duration-300 leading-snug`}>
            {freebie.title}
          </h3>
          <p className="font-prompt text-sm text-white/50 leading-relaxed">
            {freebie.description}
          </p>
        </div>

        {/* Tag */}
        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-prompt ${freebie.text_color} opacity-70`}>{freebie.tag}</span>
        </div>

        {/* Download button */}
        <div className="mt-auto">
          {dlState === "idle" && (
            <button
              onClick={handleDownload}
              className={`group/btn w-full py-3 px-4 rounded-xl border flex items-center justify-between text-sm font-semibold font-prompt tracking-wide transition-all duration-300
                ${freebie.border_color} ${freebie.text_color} ${freebie.bg_color}
                hover:brightness-125 hover:shadow-lg active:scale-95`}
              style={{ boxShadow: `0 0 0px ${freebie.glow_color}` }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 20px ${freebie.glow_color}`)}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
            >
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 group-hover/btn:animate-bounce" />
                <span>ดาวน์โหลดฟรี</span>
              </div>
              {isLoggedIn
                ? <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                : <LogIn className="w-4 h-4 opacity-60" />
              }
            </button>
          )}

          {dlState === "preparing" && (
            <div className={`w-full py-3 px-4 rounded-xl border ${freebie.border_color} ${freebie.bg_color} space-y-2`}>
              <div className="flex justify-between items-center">
                <span className={`text-xs font-prompt ${freebie.text_color}`}>กำลังเตรียมไฟล์...</span>
                <span className={`text-xs font-bold font-prompt ${freebie.text_color}`}>{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${freebie.color_from} ${freebie.color_to}`}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.15, ease: "linear" }}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {dlState === "done" && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full py-3 px-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center gap-2 text-emerald-400 text-sm font-semibold font-prompt"
            >
              <CheckCircle2 className="w-4 h-4" />
              ดาวน์โหลดสำเร็จ!
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN VIEW
───────────────────────────────────────────────────────────── */

interface FreebiesViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  initialFreebies: Freebie[];
}

const TABS: { label: string; value: Category; icon: React.ElementType }[] = [
  { label: "ทั้งหมด",      value: "all",   icon: Sparkles },
  { label: "เทคโนโลยี",    value: "tech",  icon: Code2 },
  { label: "ดนตรี",        value: "music", icon: Music },
];

export function FreebiesView({ user, initialFreebies }: FreebiesViewProps) {
  const [activeTab, setActiveTab] = useState<Category>("all");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const isLoggedIn = !!user;

  const filtered = initialFreebies.filter(
    (f) => activeTab === "all" || f.category === activeTab
  );

  return (
    <>
      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} />
        )}
      </AnimatePresence>

      <div className="w-full relative overflow-hidden min-h-screen pb-24">

        {/* Background glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/8 blur-[130px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/3" />
        <div className="absolute top-[40%] right-[-80px] w-[400px] h-[400px] bg-pink-600/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 md:pt-16">

          {/* ── Hero banner ─────────────────────────────────── */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-purple-500/30 bg-purple-500/5 text-purple-400 text-sm font-medium"
            >
              <Gift className="w-4 h-4" />
              <span>Free Resources — ดาวน์โหลดฟรี ไม่มีค่าใช้จ่าย</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-prompt text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight"
            >
              คลัง
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]">
                {" "}ของแจกฟรี
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-white/55 font-prompt leading-relaxed max-w-xl mx-auto"
            >
              รวบรวมทรัพยากรดิจิทัลคุณภาพสูงทั้งด้านเทคโนโลยีและดนตรี
              ดาวน์โหลดฟรีโดยลงทะเบียนเป็นสมาชิกเท่านั้น
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center gap-8 pt-2"
            >
              {[
                { value: `${initialFreebies.length}`, label: "ไฟล์ให้ดาวน์โหลด" },
                { value: "100%", label: "ฟรี ไม่มีค่าใช้จ่าย" },
                { value: "4.9★", label: "คะแนนจากผู้ใช้" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-0.5">
                  <span className="font-prompt text-xl font-bold text-white">{s.value}</span>
                  <span className="font-prompt text-xs text-white/35 uppercase tracking-wider">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Filter Tabs ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center justify-center gap-2 mb-12"
          >
            <Filter className="w-4 h-4 text-white/30 mr-1" />
            {TABS.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-prompt font-medium transition-all duration-250 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                      : "glass-card border-white/8 text-white/50 hover:text-white hover:border-white/15"
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </motion.div>

          {/* ── Cards Grid ────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filtered.map((freebie) => (
                <FreebieCard
                  key={freebie.id}
                  freebie={freebie}
                  isLoggedIn={isLoggedIn}
                  onAuthPrompt={() => setShowAuthModal(true)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── CTA for logged-out users ─────────────────────── */}
          {!isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-20 glass-card border-purple-500/20 p-8 md:p-12 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 pointer-events-none" />
              <div className="relative z-10 space-y-5 max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                  <Star className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-prompt text-2xl font-bold text-white">
                  สมัครสมาชิกฟรี — ดาวน์โหลดได้ทันที
                </h3>
                <p className="text-white/50 font-prompt text-sm leading-relaxed">
                  ไม่มีค่าใช้จ่าย ไม่ต้องใช้บัตรเครดิต สร้างบัญชีด้วย Google ได้ในไม่กี่วินาที
                </p>
                <Link
                  href="/login?next=/freebies"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-prompt font-bold text-sm transition-all duration-300 hover:scale-105 shadow-[0_0_24px_rgba(168,85,247,0.3)]"
                >
                  <LogIn className="w-4 h-4" />
                  สมัครสมาชิก / ล็อกอิน
                </Link>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </>
  );
}

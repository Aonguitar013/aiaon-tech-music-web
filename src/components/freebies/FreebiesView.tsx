"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Gift, Download, Music, Code2, X, LogIn,
  FileJson, FileSpreadsheet, Music2, Mic2,
  CheckCircle2, Star, Sparkles, Filter,
  ArrowRight, Share2,
} from "lucide-react";
import * as Icons from "lucide-react";
import { RiLineLine } from "react-icons/ri";
import { createClient } from "@/utils/supabase/client";

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
  const handleLineLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'custom:line' as any,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/freebies`
      }
    });
  };

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
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
          <Gift className="w-8 h-8 text-white" />
        </div>

        <h2 className="font-prompt text-2xl font-bold text-white mb-3">
          ล็อกอินเพื่อดาวน์โหลดฟรี
        </h2>
        <p className="text-white/55 font-prompt text-sm leading-relaxed mb-6">
          สร้างบัญชีหรือล็อกอินเพื่อดาวน์โหลดทรัพยากรฟรีทั้งหมด
          ไม่มีค่าใช้จ่าย ไม่มีบัตรเครดิต
        </p>

        {/* Perks */}
        <ul className="space-y-2.5 mb-6 text-left">
          {[
            "ดาวน์โหลดของแจกฟรีทุกอย่างได้ไม่จำกัด",
            "เข้าถึงบทเรียนเพิ่มเติมและอัปเดตใหม่",
            "รับสิทธิ์ส่วนลดคอร์สพิเศษสำหรับสมาชิก",
          ].map((perk) => (
            <li key={perk} className="flex items-start gap-2.5 text-white/80 text-base font-prompt leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              {perk}
            </li>
          ))}
        </ul>

        <Link
          href="/login?next=/freebies"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-prompt font-bold text-sm transition-all duration-300 hover:scale-[1.02] shadow-[0_0_24px_rgba(168,85,247,0.3)] hover:shadow-[0_0_36px_rgba(168,85,247,0.45)]"
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
   LINE UNLOCK MODAL
───────────────────────────────────────────────────────────── */

function LineUnlockModal({
  freebie,
  onClose,
  onSuccessDownload,
}: {
  freebie: Freebie | null;
  onClose: () => void;
  onSuccessDownload: (freebie: Freebie) => void;
}) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  if (!freebie) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError("กรุณากรอกรหัสผ่านปลดล็อกเพื่อดาวน์โหลด");
      return;
    }

    setError("");
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      onSuccessDownload(freebie);
      onClose();
    }, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        className="relative z-10 glass-card p-6 md:p-8 max-w-md w-full text-center border-[#06C755]/35 bg-zinc-950/95 shadow-[0_0_60px_rgba(6,199,85,0.25)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Effects */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#06C755]/15 blur-[60px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-emerald-500/15 blur-[60px] rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon Header */}
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#06C755] to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(6,199,85,0.4)]">
          <RiLineLine className="w-9 h-9 text-white" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06C755]/15 border border-[#06C755]/30 text-[#06C755] text-xs font-prompt font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          ปลดล็อกโค้ดและไฟล์ดาวน์โหลดฟรี
        </span>

        <h3 className="font-prompt text-xl md:text-2xl font-bold text-white mb-2 leading-snug">
          {freebie.title}
        </h3>

        <p className="text-white/80 font-prompt text-sm leading-relaxed mb-6">
          รับรหัสปลดล็อกโค้ดฟรี! เพียงกดเพิ่มเพื่อนใน LINE OA{" "}
          <span className="text-[#06C755] font-bold">@poMESoP</span>
        </p>

        {/* Action 1: Add LINE Button */}
        <a
          href="https://lin.ee/poMESoP"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-6 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-prompt font-bold text-base flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(6,199,85,0.35)] hover:shadow-[0_0_35px_rgba(6,199,85,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-95 mb-6 cursor-pointer"
        >
          <RiLineLine className="w-6 h-6 fill-white shrink-0" />
          <span>แอด LINE รับรหัสทันที</span>
        </a>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-zinc-950 px-3 text-[11px] font-prompt text-white/40 absolute uppercase tracking-wider">
            กรอกรหัสผ่านปลดล็อก
          </span>
        </div>

        {/* Action 2: Passcode Form */}
        <form onSubmit={handleUnlock} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-prompt text-white/70 mb-1.5 font-medium">
              รหัสผ่านปลดล็อกไฟล์ *
            </label>
            <input
              type="text"
              required
              className="w-full bg-white/5 border border-white/15 focus:border-[#06C755] focus:outline-none rounded-xl px-4 py-3 text-white font-prompt text-sm placeholder:text-white/30 transition-all focus:shadow-[0_0_15px_rgba(6,199,85,0.2)]"
              placeholder="กรอกรหัสผ่านที่ได้รับจาก LINE..."
              value={passcode}
              onChange={(e) => { setPasscode(e.target.value); setError(""); }}
            />
            {error && (
              <p className="text-rose-400 text-xs font-prompt mt-1.5">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-3.5 rounded-xl bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-prompt font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer"
          >
            {isVerifying ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                กำลังยืนยันรหัสผ่าน...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                ยืนยันรหัสผ่านและดาวน์โหลดไฟล์
              </>
            )}
          </button>
        </form>

        <p className="mt-4 text-white/35 font-prompt text-xs">
          สอบถามปัญหาการใช้งานเพิ่มเติมทาง LINE OA @poMESoP ได้ตลอด 24 ชั่วโมง
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
  onUnlockPrompt,
}: {
  freebie: Freebie;
  onUnlockPrompt: (freebie: Freebie) => void;
}) {
  const Icon = (Icons as any)[freebie.icon_name || "Gift"] || Icons.Gift;

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
          <div className={`w-13 h-13 rounded-xl flex items-center justify-center bg-linear-to-br ${freebie.color_from} ${freebie.color_to} shadow-lg group-hover:scale-105 transition-transform duration-300 shrink-0`}
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
          <p className="font-prompt text-base text-white/70 leading-relaxed">
            {freebie.description}
          </p>
        </div>

        {/* Tag */}
        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-prompt ${freebie.text_color} opacity-70`}>{freebie.tag}</span>
        </div>

        {/* Download button */}
        <div className="mt-auto">
          <button
            onClick={() => onUnlockPrompt(freebie)}
            className={`group/btn w-full py-3 px-4 rounded-xl border flex items-center justify-between text-sm font-semibold font-prompt tracking-wide transition-all duration-300 cursor-pointer
              ${freebie.border_color} ${freebie.text_color} ${freebie.bg_color}
              hover:brightness-125 hover:shadow-lg active:scale-95`}
            style={{ boxShadow: `0 0 0px ${freebie.glow_color}` }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 20px ${freebie.glow_color}`)}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
          >
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 group-hover/btn:animate-bounce" />
              <span>ดาวน์โหลดโค้ดฟรี</span>
            </div>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
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
  const [selectedFreebieForUnlock, setSelectedFreebieForUnlock] = useState<Freebie | null>(null);
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

      {/* LINE Unlock Modal */}
      <AnimatePresence>
        {selectedFreebieForUnlock && (
          <LineUnlockModal
            freebie={selectedFreebieForUnlock}
            onClose={() => setSelectedFreebieForUnlock(null)}
            onSuccessDownload={(freebieToDownload) => {
              const a = document.createElement("a");
              a.href = freebieToDownload.download_url;
              a.download = freebieToDownload.title;
              a.target = "_blank";
              a.click();
            }}
          />
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
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-rose-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]">
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
              ดาวน์โหลดโค้ดและทรัพยากรฟรีทันทีเพียงแอด LINE OA
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
                      ? "bg-linear-to-r from-purple-600 to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)]"
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
                  onUnlockPrompt={(item) => setSelectedFreebieForUnlock(item)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── CTA for LINE Community ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-20 glass-card border-[#06C755]/20 p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-[#06C755]/5 to-emerald-500/5 pointer-events-none" />
            <div className="relative z-10 space-y-5 max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#06C755] to-emerald-600 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(6,199,85,0.4)]">
                <RiLineLine className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-prompt text-2xl font-bold text-white">
                แอด LINE OA @poMESoP รับอัปเดตโค้ดฟรีทุกสัปดาห์
              </h3>
              <p className="text-white/60 font-prompt text-sm leading-relaxed">
                รับการแจ้งเตือนสคริปต์ใหม่ บทเรียนการสอนฟรี และรหัสส่วนลดพิเศษเฉพาะใน LINE
              </p>
              <a
                href="https://lin.ee/poMESoP"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-prompt font-bold text-sm transition-all duration-300 hover:scale-105 shadow-[0_0_24px_rgba(6,199,85,0.35)]"
              >
                <RiLineLine className="w-5 h-5 fill-white" />
                เพิ่มเพื่อน LINE OA @poMESoP
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}

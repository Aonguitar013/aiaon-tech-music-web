"use client";

import { useState, } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Gift, Download, Music, Code2, X, LogIn,
  CheckCircle2, Sparkles, Filter,
  ArrowRight, Eye, ShieldCheck, Zap, Tag
} from "lucide-react";
import * as Icons from "lucide-react";
import { RiLineLine } from "react-icons/ri";

// 3D Custom Mockup Components matching each specific category character
import { DvdCaseMockup } from "@/components/marketplace/DvdCaseMockup";
import { Book3DMockup } from "@/components/ebooks/Book3DMockup";
import { StudentCardMockup } from "@/components/student-vault/StudentCardMockup";
import { VinylRecordMockup } from "@/components/music-store/VinylRecordMockup";
import { getLineOrderUrl } from "@/lib/line";
import { FreebieDetailSection } from "./FreebieDetailSection";
import { getFreebieDetail } from "./freebieDataHelper";

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

  const VALID_PASSCODES = ["FREE69", "AIAON2026", "AIAONTECH"];
  const freebieLineMsg = `สวัสดีครับครูอ้น ขอรับรหัสปลดล็อกและไฟล์แจกฟรี:\n🎁 "${freebie.title}"\n📌 หมวด: ${freebie.tag}\nขอบคุณครับ 🙏`;
  const freebieLineUrl = getLineOrderUrl(freebieLineMsg);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!freebie) return;
    const cleanInput = passcode.trim().toUpperCase();

    if (!cleanInput) {
      setError("กรุณากรอกรหัสผ่านปลดล็อกเพื่อดาวน์โหลด");
      return;
    }

    if (!VALID_PASSCODES.includes(cleanInput)) {
      setError("❌ รหัสผ่านไม่ถูกต้อง กรุณาสแกนหรือแอด LINE OA @deu6776s เพื่อรับรหัสฟรี");
      return;
    }

    setError("");
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      onSuccessDownload(freebie);
      onClose();
    }, 600);
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

        <p className="text-white/80 font-prompt text-sm leading-relaxed mb-4">
          รับรหัสและลิงก์ปลดล็อกไฟล์ฟรี! เพียงสแกน QR Code หรือกดปุ่มทักแชต LINE OA{" "}
          <span className="text-[#06C755] font-bold">@deu6776s (AiAon Tech)</span>{" "}
          (ระบบพิมพ์ชื่อไฟล์นี้ให้พร้อมส่งอัตโนมัติ)
        </p>

        {/* QR Code Card for Desktop & Mobile */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4 flex flex-col items-center gap-2.5 shadow-inner">
          <div className="p-2 bg-white rounded-xl shadow-md ring-2 ring-[#06C755]/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(freebieLineUrl)}`}
              alt="LINE OA @deu6776s QR Code" 
              className="w-32 h-32 md:w-36 md:h-36 block rounded-lg"
            />
          </div>
          <div className="text-center">
            <div className="text-xs font-prompt text-white/90 font-semibold flex items-center justify-center gap-1.5 flex-wrap">
              <span>สแกน QR Code หรือค้นหา LINE ID:</span>
              <span className="text-[#06C755] font-bold select-all bg-[#06C755]/15 px-2 py-0.5 rounded-md border border-[#06C755]/30">@deu6776s</span>
            </div>
            <p className="text-[11px] font-prompt text-white/50 mt-1">
              เปิดกล้องมือถือสแกน เพื่อทักแชตรับรหัสผ่านปลดล็อกไฟล์นี้ได้ทันที
            </p>
          </div>
        </div>

        {/* Action 1: Pre-filled LINE OA Message Button */}
        <a
          href={freebieLineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-6 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-prompt font-bold text-base flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(6,199,85,0.35)] hover:shadow-[0_0_35px_rgba(6,199,85,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-95 mb-6 cursor-pointer"
        >
          <RiLineLine className="w-6 h-6 fill-white shrink-0" />
          <span>ทัก LINE รับรหัสปลดล็อกไฟล์นี้ (@deu6776s)</span>
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
          สอบถามปัญหาการใช้งานเพิ่มเติมทาง LINE OA @deu6776s (AiAon Tech) ได้ตลอด 24 ชั่วโมง
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FREEBIE CARD
───────────────────────────────────────────────────────────── */

function renderFreebie3DMockup(freebie: Freebie) {
  // 1. Music Category -> 3D Vinyl Record Mockup
  if (freebie.category === "music" || freebie.id.includes("music") || freebie.id.includes("guitar")) {
    return (
      <div className="flex items-center justify-center py-2 overflow-hidden">
        <VinylRecordMockup
          code="FREE-MUS"
          title={freebie.title}
          categoryLabel="Lo-Fi & Acoustic Backing Tracks"
          bpm="85-110 BPM"
          duration="10 แทร็คสตูดิโอ"
          accentColor="purple"
          isPlaying={false}
          size="sm"
          isInteractive={true}
        />
      </div>
    );
  }

  // 2. Student AI Prompts -> 3D Student Cyber Collector Pass
  if (freebie.id.includes("student")) {
    return (
      <div className="flex items-center justify-center py-2 overflow-hidden">
        <StudentCardMockup
          code="STU03"
          title="Student AI Secret Kit"
          tagline="GEN Z SECRET REPORT PROMPTS"
          themeColor="pink"
          badgeText="STUDENT AI PASS"
          serialNo="FREE-2026-STU-KIT"
          isInteractive={true}
        />
      </div>
    );
  }

  // 3. Teacher AI Prompts -> 3D Futuristic Hardcover Book Mockup
  if (freebie.id.includes("teacher-ai-prompts")) {
    return (
      <div className="flex items-center justify-center py-2 overflow-hidden">
        <Book3DMockup
          code="EB-AI"
          title="คัมภีร์ 20 AI Prompts ครูไทย"
          category="AI Teacher Mastery"
          themeColor="amber"
          rank={1}
          size="sm"
          isInteractive={true}
        />
      </div>
    );
  }

  // 4. Teacher Systems & Google Apps Script / Sheets -> 3D Cyberpunk Acrylic DVD Case Mockup
  // Map specific system presets
  let dvdCode = "AIAON";
  if (freebie.id.includes("sar-aona07") || freebie.tag.includes("AONA07")) {
    dvdCode = "AONA07";
  } else if (freebie.id.includes("active-shooter") || freebie.tag.includes("AONE12")) {
    dvdCode = "AONE12";
  } else if (freebie.id.includes("3d-flashcard") || freebie.tag.includes("AONE10")) {
    dvdCode = "AONE10";
  } else if (freebie.id.includes("asset-qr") || freebie.tag.includes("AONA04")) {
    dvdCode = "AONA04";
  } else if (freebie.id.includes("grade-tracker") || freebie.tag.includes("Google Sheets")) {
    dvdCode = "AONE13";
  }

  return (
    <div className="flex items-center justify-center py-2 overflow-hidden">
      <DvdCaseMockup
        code={dvdCode}
        title={freebie.title}
        tagline={freebie.tag}
        isInteractive={true}
      />
    </div>
  );
}

function FreebieCard({
  freebie,
  onUnlockPrompt,
  onViewDetails,
}: {
  freebie: Freebie;
  onUnlockPrompt: (freebie: Freebie) => void;
  onViewDetails: (freebie: Freebie) => void;
}) {
  const Icon = (Icons as unknown as Record<string, React.ElementType>)[freebie.icon_name || "Gift"] || Icons.Gift;
  const freebieDetail = getFreebieDetail(freebie);

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
        className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${freebie.glow_color}, transparent 70%)` }}
      />

      <div className="relative glass-card border-white/8 group-hover:border-white/20 p-6 sm:p-7 rounded-3xl flex flex-col gap-5 h-full transition-all duration-300 bg-slate-900/80 backdrop-blur-md">

        {/* Header row with badges */}
        <div className="flex items-start justify-between gap-3">
          {/* Icon Badge */}
          <div 
            className={`w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br ${freebie.color_from} ${freebie.color_to} shadow-lg group-hover:scale-105 transition-transform duration-300 shrink-0`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 justify-end">
            <span className={`text-[11px] font-prompt font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${freebie.border_color} ${freebie.text_color} bg-white/5`}>
              {freebie.file_type}
            </span>
            <span className="text-[11px] font-prompt font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/10 text-white/50 bg-black/30">
              {freebie.file_size}
            </span>
            <span className="text-[11px] font-prompt font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
              🎁 ฟรี 100%
            </span>
          </div>
        </div>

        {/* 3D Bespoke Character Mockup Stage - Click opens details */}
        <div 
          onClick={() => onViewDetails(freebie)}
          className="cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]"
          title="คลิกเพื่อดูรายละเอียดและข้อมูลเชิงลึกทั้งหมด"
        >
          {renderFreebie3DMockup(freebie)}
        </div>

        {/* Content - Click opens details */}
        <div className="flex-1 space-y-2">
          <h3 
            onClick={() => onViewDetails(freebie)}
            className={`font-prompt text-lg sm:text-xl font-bold text-white group-hover:${freebie.text_color} transition-colors duration-300 leading-snug cursor-pointer flex items-center justify-between gap-2`}
          >
            <span>{freebie.title}</span>
            <span className="shrink-0 text-white/40 group-hover:text-cyan-400 transition-colors text-xs font-normal font-prompt flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>ดูข้อมูล</span>
            </span>
          </h3>
          <p className="font-prompt text-xs sm:text-sm text-white/70 leading-relaxed">
            {freebie.description}
          </p>
        </div>

        {/* Tag & Category Metadata */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-prompt">
          <span className={`${freebie.text_color} font-semibold flex items-center gap-1.5`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{freebie.tag}</span>
          </span>
          <span className="text-white/40 font-mono text-[11px]">
            FREE RESOURCE
          </span>
        </div>

        {/* Prominent Price Tag: 0 บาท */}
        <div className="flex items-center justify-between pt-3 pb-1 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 shadow-inner">
          <div>
            <div className="text-[11px] font-prompt text-white/40 line-through">
              ราคาปกติ ฿{freebieDetail.originalPrice.toLocaleString()}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black font-prompt text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 drop-shadow-[0_0_15px_rgba(52,211,153,0.35)]">
                0 บาท
              </span>
              <span className="text-xs font-bold font-prompt text-emerald-400">
                (แจกฟรี)
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-prompt text-xs font-extrabold shadow-[0_0_14px_rgba(16,185,129,0.3)]">
              <Tag className="w-3.5 h-3.5 text-emerald-400" />
              <span>ราคา 0 บาท</span>
            </span>
          </div>
        </div>

        {/* Action buttons: ดูรายละเอียด & ปลดล็อก/ดาวน์โหลดฟรี */}
        <div className="mt-auto pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onViewDetails(freebie)}
            className="py-3 px-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white font-bold font-prompt text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-95 shadow-md"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>ดูรายละเอียด</span>
          </button>
          
          <button
            type="button"
            onClick={() => onUnlockPrompt(freebie)}
            className={`py-3 px-3.5 rounded-2xl border flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold font-prompt tracking-wide transition-all duration-300 cursor-pointer shadow-lg active:scale-95
              ${freebie.border_color} ${freebie.text_color} ${freebie.bg_color}
              hover:brightness-125`}
            style={{ boxShadow: `0 0 10px ${freebie.glow_color}` }}
          >
            <Download className="w-4 h-4" />
            <span>ดาวน์โหลดฟรี (0 ฿)</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
  initialFreebies: Freebie[];
}

const TABS: { label: string; value: Category; icon: React.ElementType }[] = [
  { label: "ทั้งหมด",      value: "all",   icon: Sparkles },
  { label: "เทคโนโลยี",    value: "tech",  icon: Code2 },
  { label: "ดนตรี",        value: "music", icon: Music },
];

export function FreebiesView({ initialFreebies }: FreebiesViewProps) {
  const [activeTab, setActiveTab] = useState<Category>("all");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedFreebieForUnlock, setSelectedFreebieForUnlock] = useState<Freebie | null>(null);
  const [selectedFreebieForDetails, setSelectedFreebieForDetails] = useState<Freebie | null>(null);

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

      {/* Freebie Detail Section Modal */}
      <AnimatePresence>
        {selectedFreebieForDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[990] flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
            onClick={() => setSelectedFreebieForDetails(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-5xl my-6 bg-slate-950/95 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] max-h-[92vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <FreebieDetailSection
                freebie={getFreebieDetail(selectedFreebieForDetails)}
                onClose={() => setSelectedFreebieForDetails(null)}
                onOpenUnlockModal={() => {
                  const targetFreebie = selectedFreebieForDetails;
                  setSelectedFreebieForDetails(null);
                  setSelectedFreebieForUnlock(targetFreebie);
                }}
              />
            </motion.div>
          </motion.div>
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
                  onViewDetails={(item) => setSelectedFreebieForDetails(item)}
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
                แอด LINE OA @deu6776s รับอัปเดตโค้ดฟรีทุกสัปดาห์
              </h3>
              <p className="text-white/60 font-prompt text-sm leading-relaxed">
                รับการแจ้งเตือนสคริปต์ใหม่ บทเรียนการสอนฟรี และรหัสส่วนลดพิเศษเฉพาะใน LINE
              </p>
              <a
                href={getLineOrderUrl(
                  "สวัสดีครับครูอ้น ขอสมัครรับอัปเดตโค้ดฟรีประจำสัปดาห์ และขอรหัสปลดล็อกคลังของแจกฟรี (Freebies) ครับ 🎁🙏"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-prompt font-bold text-sm transition-all duration-300 hover:scale-105 shadow-[0_0_24px_rgba(6,199,85,0.35)]"
              >
                <RiLineLine className="w-5 h-5 fill-white" />
                เพิ่มเพื่อน LINE OA @deu6776s
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}

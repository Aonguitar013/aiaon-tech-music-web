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
import { getLineOrderUrl, LINE_ADD_FRIEND_URL } from "@/lib/line";
import { QRCodeSVG } from "qrcode.react";
import { FreebieDetailSection } from "./FreebieDetailSection";
import { getFreebieDetail } from "./freebieDataHelper";
import { FreebieUpsellSection, InstantUpsellModal } from "./FreebieUpsellSection";

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
          <div className="p-3 bg-white rounded-2xl shadow-md ring-2 ring-[#06C755]/40 inline-flex items-center justify-center">
            <QRCodeSVG 
              value={LINE_ADD_FRIEND_URL}
              size={150}
              level="M"
              includeMargin={false}
              className="block rounded-lg"
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

const TONES: Record<string, { text: string; border: string; bg: string; groupHover: string }> = {
  emerald: { text: "text-emerald-700", border: "border-emerald-300", bg: "bg-emerald-50", groupHover: "group-hover:text-emerald-700" },
  rose: { text: "text-rose-700", border: "border-rose-300", bg: "bg-rose-50", groupHover: "group-hover:text-rose-700" },
  cyan: { text: "text-cyan-700", border: "border-cyan-300", bg: "bg-cyan-50", groupHover: "group-hover:text-cyan-700" },
  purple: { text: "text-purple-700", border: "border-purple-300", bg: "bg-purple-50", groupHover: "group-hover:text-purple-700" },
  amber: { text: "text-amber-700", border: "border-amber-300", bg: "bg-amber-50", groupHover: "group-hover:text-amber-700" },
  pink: { text: "text-pink-700", border: "border-pink-300", bg: "bg-pink-50", groupHover: "group-hover:text-pink-700" },
  blue: { text: "text-blue-700", border: "border-blue-300", bg: "bg-blue-50", groupHover: "group-hover:text-blue-700" },
  orange: { text: "text-orange-700", border: "border-orange-300", bg: "bg-orange-50", groupHover: "group-hover:text-orange-700" },
  teal: { text: "text-teal-700", border: "border-teal-300", bg: "bg-teal-50", groupHover: "group-hover:text-teal-700" },
  sky: { text: "text-sky-700", border: "border-sky-300", bg: "bg-sky-50", groupHover: "group-hover:text-sky-700" },
  indigo: { text: "text-indigo-700", border: "border-indigo-300", bg: "bg-indigo-50", groupHover: "group-hover:text-indigo-700" },
  violet: { text: "text-violet-700", border: "border-violet-300", bg: "bg-violet-50", groupHover: "group-hover:text-violet-700" },
  red: { text: "text-red-700", border: "border-red-300", bg: "bg-red-50", groupHover: "group-hover:text-red-700" },
  slate: { text: "text-slate-700", border: "border-slate-300", bg: "bg-slate-50", groupHover: "group-hover:text-slate-700" },
};

/** Light-surface tone for a freebie (Brand Bible V2.0: AA contrast on white) */
function toneFor(f: { text_color: string }) {
  const m = /text-([a-z]+)-\d+/.exec(f.text_color || "");
  return TONES[m?.[1] ?? "slate"] ?? TONES.slate;
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
  const t = toneFor(freebie);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col h-full rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/50 p-4 sm:p-5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Compact Header: Icon + Type/Size + Free Pill */}
      <div className="flex items-start justify-between gap-2.5 mb-3">
        <div
          onClick={() => onViewDetails(freebie)}
          className={`w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-br ${freebie.color_from} ${freebie.color_to} shadow-sm shrink-0 cursor-pointer group-hover:scale-105 transition-transform`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-1">
          <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md border ${t.border} ${t.text} ${t.bg}`}>
            {freebie.file_type}
          </span>
          <span className="text-[10px] font-mono text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-md">
            {freebie.file_size}
          </span>
          <span className="text-[10px] font-prompt font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-300 text-emerald-700">
            ฟรี 0฿
          </span>
        </div>
      </div>

      {/* Title & Concise 2-Line Description */}
      <div className="flex-1 mb-3.5">
        <div className={`text-[10.5px] font-prompt font-bold ${t.text} mb-1 flex items-center gap-1`}>
          <Sparkles className="w-3 h-3 shrink-0" />
          <span className="truncate">{freebie.tag}</span>
        </div>
        <h3
          onClick={() => onViewDetails(freebie)}
          className={`font-prompt text-sm sm:text-[15px] font-extrabold text-[#0F172A] ${t.groupHover} transition-colors leading-snug line-clamp-2 cursor-pointer mb-1.5`}
        >
          {freebie.title}
        </h3>
        <p className="font-prompt text-xs text-[#475569] leading-relaxed line-clamp-2">
          {freebie.description}
        </p>
      </div>

      {/* Compact Price + Dual Action Footer */}
      <div className="mt-auto pt-3 border-t border-[#F1F5F9] space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[11px] font-prompt text-[#94A3B8] line-through">
            มูลค่า ฿{freebieDetail.originalPrice.toLocaleString()}
          </span>
          <span className="font-prompt text-sm font-black text-emerald-700">
            แจกฟรี 0 บาท
          </span>
        </div>

        <div className="grid grid-cols-12 gap-2">
          <button
            type="button"
            onClick={() => onViewDetails(freebie)}
            className="col-span-5 h-9 px-2 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#E2E8F0] hover:border-[#BFDBFE] text-[#0F172A] hover:text-[#1D4ED8] font-bold font-prompt text-xs flex items-center justify-center gap-1 transition cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span>รายละเอียด</span>
          </button>

          <button
            type="button"
            onClick={() => onUnlockPrompt(freebie)}
            className="col-span-7 h-9 px-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-extrabold font-prompt text-xs flex items-center justify-center gap-1.5 shadow-2xs transition active:scale-[0.98] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>โหลดฟรี (0฿)</span>
            <ArrowRight className="w-3 h-3 shrink-0" />
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
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [downloadedFreebieTitle, setDownloadedFreebieTitle] = useState("");

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

              setDownloadedFreebieTitle(freebieToDownload.title);
              setTimeout(() => {
                setShowUpsellModal(true);
              }, 400);
            }}
          />
        )}
      </AnimatePresence>

      {/* Instant Upsell Modal */}
      <InstantUpsellModal
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
        downloadedTitle={downloadedFreebieTitle}
      />

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
            <div className="absolute inset-0 bg-[#0F172A]/50 backdrop-blur-sm" />

            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-5xl my-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto p-4 sm:p-6"
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

      <div className="w-full relative overflow-hidden min-h-screen bg-[#FAF8F5] pb-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10 pt-6 sm:pt-8">

          {/* ── SLIM 0-BAHT GIFT BOUTIQUE HERO ────────────────────────── */}
          <section className="mb-6 rounded-3xl bg-white border border-[#FDE68A] p-5 sm:p-7 shadow-2xs relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Copy */}
              <div className="lg:col-span-7 space-y-3 text-left">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs font-prompt font-bold">
                    <Gift className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>0-BAHT GIFT HUB • แจกฟรี 100%</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-[#64748B]">
                    {initialFreebies.length}+ ไฟล์ระบบ &amp; เพลง • ฟรี 75 หน้า Edu-Verse
                  </span>
                </div>

                <h1 className="font-prompt text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
                  คลังของแจกฟรี{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#D97706] via-[#EA580C] to-[#E11D48]">
                    หยิบไปใช้ได้จริง 0 ฿
                  </span>
                </h1>

                <p className="text-xs sm:text-sm text-[#475569] font-prompt leading-relaxed max-w-2xl">
                  ลองของจริงก่อนตัดสินใจซื้อ! แจกฟรีครบทั้งซอร์สโค้ด Google Apps Script, ชุดคำสั่ง AI, เพลง BGM ปลอดลิขสิทธิ์ และสื่อเด็กเล็ก <strong className="text-[#0F172A]">AiAon Edu-Verse ฟรี 75 หน้า (ครบ 15 เล่ม)</strong>
                </p>
              </div>

              {/* Right: Compact Edu-Verse 75-Page Free Mega Pack Card */}
              <div className="lg:col-span-5">
                <Link
                  href="/edu"
                  className="group flex items-center gap-3.5 rounded-2xl border border-amber-200 bg-[#FEF9EF] hover:border-amber-400 p-3 shadow-2xs hover:shadow-md transition-all"
                >
                  <div className="w-24 sm:w-28 aspect-[4/3] rounded-xl overflow-hidden border border-amber-200/80 shrink-0 bg-white">
                    <img
                      src="/edu/hero-banner-6cats.webp"
                      alt="แจกฟรีสื่อเด็กเล็ก 75 หน้า ครบ 15 เล่ม"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-amber-400 text-[#0F172A] text-[10px] font-extrabold mb-1">
                      🎁 ฟรี 75 หน้า (15 เล่ม!)
                    </span>
                    <div className="text-xs sm:text-sm font-extrabold text-[#0F172A] leading-snug">
                      สื่อเด็กเล็ก AiAon Edu-Verse
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5 inline-flex items-center gap-1 group-hover:text-[#B45309] font-semibold">
                      <span>กดไปโหลดฟรีทันที (0฿)</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* ── Clean Filter Toolbar ─────────────────────────────── */}
          <div className="rounded-2xl bg-white border border-[#E2E8F0] p-3 shadow-2xs mb-5 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#64748B] mr-1">
                <Filter className="w-3.5 h-3.5" />
                <span>หมวด:</span>
              </span>
              {TABS.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-prompt font-bold transition-all cursor-pointer border ${
                      isActive
                        ? "bg-[#0F172A] text-white border-[#0F172A]"
                        : "bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:text-[#0F172A] hover:bg-slate-100"
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-mono text-[#64748B]">
              พบ <strong className="text-[#0F172A]">{filtered.length}</strong> รายการแจกฟรี
            </span>
          </div>

          {/* ── Compact 3-Column Cards Grid ──────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
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

          {/* ── Permanent Bottom Impulse Upgrade Section ───── */}
          <div className="mt-10 sm:mt-14"><FreebieUpsellSection className="" /></div>

          {/* ── Compact LINE Community Strip with Founder Portrait ─── */}
          <div className="mt-10 rounded-3xl bg-white shadow-2xs border border-[#E2E8F0] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-left">
              <img
                src="/images/kru_aon_profile.png"
                alt="ครูอ้น จิรวัฒน์ เดชเส้ง — LINE OA @deu6776s"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover object-top border-2 border-white ring-2 ring-[#06C755]/40 shrink-0 bg-[#ECE9E2]"
              />
              <div>
                <h3 className="font-prompt text-base sm:text-lg font-extrabold text-[#0F172A]">
                  แอด LINE OA @deu6776s รับโค้ดฟรีอัปเดตทุกสัปดาห์
                </h3>
                <p className="text-[#64748B] font-prompt text-xs">
                  รับแจ้งเตือนสคริปต์ใหม่ ใบงานฟรีรายเดือน และรหัสปลดล็อกไฟล์ทั้งหมด
                </p>
              </div>
            </div>
            <a
              href={getLineOrderUrl(
                "สวัสดีครับครูอ้น ขอสมัครรับอัปเดตโค้ดฟรีประจำสัปดาห์ และขอรหัสปลดล็อกคลังของแจกฟรี (Freebies) ครับ 🎁🙏"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-prompt font-extrabold text-xs sm:text-sm transition shadow-xs"
            >
              <RiLineLine className="w-4 h-4 shrink-0" />
              <span>เพิ่มเพื่อน LINE OA @deu6776s</span>
            </a>
          </div>

        </div>
      </div>
    </>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle2, MessageCircle,
  GraduationCap, Package, Zap, ShieldCheck,
  Volume2, Cpu,
  Award, Star, BookOpen, Music, Bot,
  Code2, FileCheck2, Layers, Disc, Play, Pause, Radio, RefreshCw
} from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/sections/HeroSection";
import { MultiVaultCarousel } from "@/components/home/MultiVaultCarousel";
import { NoBrainerBundles } from "@/components/marketplace/NoBrainerBundles";
import { VinylRecordMockup } from "@/components/music-store/VinylRecordMockup";
import { getLineOrderUrl } from "@/lib/line";

type SolutionFilter = "ALL" | "TEACHER" | "BUSINESS" | "EXAM_PREP" | "MUSIC" | "STUDENT" | "CUSTOM";

export function HomeView() {
  // Filter state for solution showcase
  const [activeFilter, setActiveFilter] = useState<SolutionFilter>("ALL");

  // Simulator State 1: School Attendance Check-In (AONE01 Engine)
  const [simStudent, setSimStudent] = useState<string>("ด.ช. สมศักดิ์ ใจดี (ม.3/1 เลขที่ 1)");
  const [simStatus, setSimStatus] = useState<"present" | "late" | "leave">("present");
  const [simLog, setSimLog] = useState<{ id: number; time: string; text: string; type: string }[]>([
    {
      id: 1,
      time: "07:45",
      text: "🔔 [LINE Notify] ด.ช. สมศักดิ์ ใจดี มาถึงโรงเรียนตรงเวลา (เช็คชื่อเรียบร้อย)",
      type: "success",
    },
  ]);
  const [isBeeping, setIsBeeping] = useState<boolean>(false);

  // Simulator State 2: AI Slip Verification (Gemini 2.5 Flash Vision Simulator)
  const [slipTestCase, setSlipTestCase] = useState<"valid" | "invalid">("valid");
  const [isScanningSlip, setIsScanningSlip] = useState<boolean>(false);
  const [slipScanResult, setSlipScanResult] = useState<{
    status: "idle" | "success" | "error";
    message: string;
    details?: string;
  }>({
    status: "idle",
    message: "กดปุ่มด้านล่างเพื่อทดสอบส่งสลิปให้ AI ตรวจสอบแบบ Real-time",
  });

  // Simulator State 3: 3D Vinyl Audio Player Simulator
  const [selectedVinylTrack, setSelectedVinylTrack] = useState<{
    id: string;
    code: string;
    title: string;
    category: string;
    bpm: string;
    chordProgression: number[][];
    accentColor: "purple" | "amber" | "cyan";
  }>({
    id: "mus-01",
    code: "MUS-01",
    title: "เพลงช่วยจำ พ.ร.บ.การศึกษาแห่งชาติ 2542 (ท่อนฮุก 9 หมวด)",
    category: "เพลงช่วยจำสอบครูผู้ช่วย",
    bpm: "118 BPM",
    accentColor: "amber",
    chordProgression: [
      [261.63, 329.63, 392.0, 523.25], // C major
      [220.0, 261.63, 329.63, 440.0],  // A minor
      [174.61, 220.0, 261.63, 349.23], // F major
      [196.0, 246.94, 293.66, 392.0],  // G major
    ],
  });
  const [isVinylPlaying, setIsVinylPlaying] = useState<boolean>(false);

  // Simulator Active Tab (Check-in vs Slip Verifier vs Vinyl Player)
  const [playgroundTab, setPlaygroundTab] = useState<"attendance" | "slip" | "vinyl">("attendance");

  // Web Audio Synth for sound feedback
  const playWebAudioSound = (type: "beep" | "success" | "alert") => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === "beep") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === "success") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === "alert") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch {
      // Audio fallback silent
    }
  };

  const handleSimulateCheckIn = () => {
    playWebAudioSound("beep");
    setIsBeeping(true);
    setTimeout(() => setIsBeeping(false), 500);

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

    const statusText =
      simStatus === "present"
        ? "มาตรงเวลา (10/10 คะแนน)"
        : simStatus === "late"
        ? "มาสาย 15 นาที (บันทึกสถิติ)"
        : "แจ้งลาป่วย (มีหลักฐาน)";

    const newEntry = {
      id: Date.now(),
      time: timeStr,
      text: `🔔 [LINE Notify] ${simStudent} ➡️ สถานะ: ${statusText} — ส่งแจ้งเตือนผู้ปกครองสำเร็จ!`,
      type: simStatus === "present" ? "success" : simStatus === "late" ? "warning" : "info",
    };

    setSimLog((prev) => [newEntry, ...prev.slice(0, 3)]);
  };

  const handleSimulateSlipScan = () => {
    setIsScanningSlip(true);
    setSlipScanResult({
      status: "idle",
      message: "🤖 Gemini 2.5 Flash กำลังสแกน BOT Mini-QR & อ่านข้อมูล Thai OCR...",
    });

    setTimeout(() => {
      setIsScanningSlip(false);
      if (slipTestCase === "valid") {
        playWebAudioSound("success");
        setSlipScanResult({
          status: "success",
          message: "✅ สลิปถูกต้อง 100%! ตรวจพบ Mini-QR ธนาคารแห่งประเทศไทย + ยอดเงิน 490.00 ฿ ตรงกับบิล",
          details: "ปลดล็อกคำสั่งซื้อเรียบร้อย! ระบบสร้าง Secure Download Link (.ZIP) ส่งเข้า LINE ลูกค้าใน 1.8 วินาที",
        });
      } else {
        playWebAudioSound("alert");
        setSlipScanResult({
          status: "error",
          message: "❌ ตรวจพบความผิดพลาด: ยอดเงินในสลิป (10.00 ฿) ไม่ตรงกับราคาแพ็กเกจ (490.00 ฿)",
          details: "ระบบตัดเป็น Fail-Closed ไม่อนุมัติดาวน์โหลด พร้อมแจ้งเตือนเจ้าหน้าที่ผ่าน Telegram ทันที!",
        });
      }
    }, 1200);
  };

  // Vinyl Simulator Audio Synthesizer
  const vinylIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const vinylAudioCtxRef = useRef<AudioContext | null>(null);

  const stopVinylPreview = () => {
    if (vinylIntervalRef.current) {
      clearInterval(vinylIntervalRef.current);
      vinylIntervalRef.current = null;
    }
    setIsVinylPlaying(false);
  };

  useEffect(() => {
    return () => {
      if (vinylIntervalRef.current) clearInterval(vinylIntervalRef.current);
    };
  }, []);

  const handleToggleVinylPreview = () => {
    if (isVinylPlaying) {
      stopVinylPreview();
      return;
    }

    stopVinylPreview();
    setIsVinylPlaying(true);

    try {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!vinylAudioCtxRef.current) {
        vinylAudioCtxRef.current = new AudioContextClass();
      }
      const ctx = vinylAudioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      let step = 0;
      const playStep = () => {
        const chordIdx = Math.floor(step / 4) % selectedVinylTrack.chordProgression.length;
        const noteIdx = step % 4;
        const freq = selectedVinylTrack.chordProgression[chordIdx][noteIdx];

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.38);

        step++;
      };

      playStep();
      vinylIntervalRef.current = setInterval(playStep, 260);
    } catch {
      setIsVinylPlaying(false);
    }
  };

  return (
    <div className="w-full relative overflow-hidden min-h-screen pb-28 font-prompt text-white">
      
      {/* ── 1. HERO SECTION & TRUST BADGES ───────────────────────── */}
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32 relative z-10">

        {/* ── 2. 3D MULTI-VAULT ECOSYSTEM CAROUSEL (ศูนย์รวม 8 มหาคลัง) ── */}
        <MultiVaultCarousel />

        {/* ── 2.5 ZERO-TECH NO-BRAINER BUNDLES (3 มหาบันเดิลสุดคุ้ม) ── */}
        <NoBrainerBundles />

        {/* ── 3. INTERACTIVE ROLE NAVIGATOR (ค้นหาตามโจทย์ของคุณ) ─── */}
        <section id="everything-i-can-do" className="scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>THE ALL-IN-ONE SOLUTION MATRIX — ทุกความเชี่ยวชาญของครูอ้น</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              คุณต้องการโซลูชันด้านไหน?{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
                เรามีคำตอบพร้อมใช้ทันที
              </span>
            </h2>
            <p className="text-sm sm:text-base text-white/60">
              คลิกเลือกบทบาทของคุณ เพื่อเจาะลึกระบบ นวัตกรรม E-Book เพลง หรือบริการที่ออกแบบมาเพื่อคุณโดยเฉพาะ
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto mb-10">
            {[
              { id: "ALL", label: "🌟 ทั้งหมด (All Portals)", color: "border-white/20 hover:border-white/40" },
              { id: "TEACHER", label: "👨‍🏫 ครู & โรงเรียน (GAS + E-Books)", color: "border-blue-500/40 text-blue-300" },
              { id: "BUSINESS", label: "🤖 ร้านค้า & SME (AI Caretaker 24 ชม.)", color: "border-emerald-500/40 text-emerald-300" },
              { id: "EXAM_PREP", label: "🎓 ติวสอบครูผู้ช่วย (Telegram + เพลงจำ)", color: "border-cyan-500/40 text-cyan-300" },
              { id: "MUSIC", label: "🎵 ดนตรี & BGM ว.PA 60 นาที", color: "border-pink-500/40 text-pink-300" },
              { id: "STUDENT", label: "🎒 นักเรียน ม.ปลาย (พอร์ต TCAS 3D)", color: "border-purple-500/40 text-purple-300" },
              { id: "CUSTOM", label: "🛠️ สั่งทำระบบ & วิทยากรบรรยาย", color: "border-amber-500/40 text-amber-300" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as SolutionFilter)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                  activeFilter === tab.id
                    ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] border-cyan-400 scale-105"
                    : "bg-white/5 hover:bg-white/10 text-white/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── 3. MEGA BENTO GRID SHOWCASE (6 มหาเสาหลักบริการ) ───── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* BENTO 1: Google Apps Script 20+ Systems (Flagship) */}
            {(activeFilter === "ALL" || activeFilter === "TEACHER") && (
              <div id="bento-gas" className="lg:col-span-2 rounded-3xl p-7 sm:p-8 bg-linear-to-br from-blue-950/40 via-slate-900/90 to-slate-900 border border-blue-500/40 hover:border-blue-400 hover:shadow-[0_0_45px_rgba(59,130,246,0.25)] transition-all flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 blur-[100px] pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5" />
                      <span>👑 เรือธงยอดนิยม • สำหรับครู &amp; โรงเรียน</span>
                    </span>
                    <span className="text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                      ลดสูงสุด 51%
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                    คลัง 20+ ระบบอัตโนมัติ Google Apps Script &amp; Sheets
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                    เปลี่ยนงานเอกสารซ้ำซากให้กลายเป็นระบบออโตเมชันบน Google Workspace ของโรงเรียนคุณเอง <strong>ปลอดภัย 100% ไม่มีค่าบริการรายเดือน</strong> ข้อมูลทั้งหมดถูกจัดเก็บบน Google Drive ส่วนตัวของคุณ
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white">ระบบเช็คชื่อ LINE V2</h4>
                        <p className="text-[11px] text-white/50">สแกนบาร์โค้ด แจ้งเตือนผู้ปกครองอัตโนมัติ</p>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white">Smart Vehicle ยานพาหนะ</h4>
                        <p className="text-[11px] text-white/50">จองรถ ขอใช้รถ บันทึกน้ำมันผ่านเว็บแอป</p>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white">ระบบเกียรติบัตร QR Verify</h4>
                        <p className="text-[11px] text-white/50">ออกเกียรติบัตร PDF ส่งเมล + ตรวจสอบ QR ได้จริง</p>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white">ระบบตรวจชุด &amp; เบิกพัสดุ</h4>
                        <p className="text-[11px] text-white/50">บันทึกพฤติกรรม และระบบเบิกพัสดุโรงเรียน</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href="/digital-vault"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>สำรวจคลัง 20 ระบบเดี่ยว (เริ่มต้น 390 ฿)</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/bundles"
                    className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <span>ดูแพ็กเหมา 20 ระบบตลอดชีพ (4,990 ฿)</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* BENTO 2: AI Caretaker & 24/7 Watchdog (Business & SME) */}
            {(activeFilter === "ALL" || activeFilter === "BUSINESS") && (
              <div id="bento-caretaker" className="rounded-3xl p-7 sm:p-8 bg-linear-to-b from-emerald-950/40 via-slate-900/90 to-teal-950/40 border border-emerald-500/40 hover:border-emerald-400 hover:shadow-[0_0_45px_rgba(16,185,129,0.25)] transition-all flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/10 blur-[90px] pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5" />
                      <span>🤖 AI ออโตเมชัน • สำหรับร้านค้า &amp; SME</span>
                    </span>
                    <span className="text-[11px] font-mono bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded border border-emerald-500/40">
                      24/7 WATCHDOG
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mb-2">
                    AI Caretaker &amp; ยามเฝ้าระบบ 24 ชม.
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed mb-5">
                    เปลี่ยนร้านค้าให้เป็น <strong>&ldquo;บ้านหลังเล็ก&rdquo;</strong> ด้วย AI อัจฉริยะ ตอบแชท LINE OA + ตรวจสลิปโอนเงินปลอม 100% ใน 2 วินาที พร้อมระบบ Self-Healing ซ่อมแซมตัวเองเมื่อแผ่นงานพัง
                  </p>

                  <ul className="space-y-2 mb-6 text-xs text-white/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Gemini 2.5 Flash ตรวจสลิปแม่นยำ ไม่ผ่านยอดผิด</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>ดึงราคาสินค้าจาก Google Sheets ตอบลูกค้า 24 ชม.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>รายงานยอดและสถิติเข้า LINE เจ้าของร้านทุกสัปดาห์</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-baseline justify-between text-xs px-1">
                    <span className="text-white/50">ค่าดูแลระบบรายเดือน:</span>
                    <span className="text-emerald-300 font-bold text-sm">990 ฿/ด. (วันละ 33 บาท)</span>
                  </div>
                  <Link
                    href="/ai-caretaker"
                    className="w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>ดูบริการ AI Caretaker &amp; Simulator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* BENTO 3: 30 Teacher E-Books 3D Hardcovers */}
            {(activeFilter === "ALL" || activeFilter === "TEACHER") && (
              <div id="bento-ebooks" className="rounded-3xl p-7 sm:p-8 bg-linear-to-b from-purple-950/40 via-slate-900/90 to-indigo-950/40 border border-purple-500/40 hover:border-purple-400 hover:shadow-[0_0_45px_rgba(168,85,247,0.25)] transition-all flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-purple-500/10 blur-[90px] pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>📚 คลังความรู้ • 30 เล่มฉบับสมบูรณ์</span>
                    </span>
                    <span className="text-[11px] font-bold text-purple-200 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30">
                      3D COVERS
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mb-2">
                    คลัง 30 E-Book นวัตกรรม &amp; คู่มือครูไทย
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed mb-5">
                    คลังอีบุ๊ก 3 มิติล้ำยุค รวมสุดยอดคัมภีร์ ว.PA 15 ตัวชี้วัด, 100 คำสั่ง AI ลับเสกงานครู, สูตรลับวิจัยในชั้นเรียน CAR 5 บท, เทคนิค Google Sheets และ Active Learning
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <span className="font-semibold text-white/90">คัมภีร์ ว.PA ผ่านฉลุย 100%</span>
                      <span className="text-purple-300 font-bold">390 ฿</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <span className="font-semibold text-white/90">100 คำสั่ง AI ลับ เสกงานครู</span>
                      <span className="text-cyan-300 font-bold">290 ฿</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <span className="font-semibold text-white/90">วิจัยชั้นเรียน CAR 5 บท</span>
                      <span className="text-emerald-300 font-bold">350 ฿</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-baseline justify-between text-xs px-1">
                    <span className="text-white/50">แพ็กเกจเหมา 30 เล่มจบ:</span>
                    <span className="text-amber-300 font-bold text-sm">2,990 ฿ (เฉลี่ย 99 ฿/เล่ม)</span>
                  </div>
                  <Link
                    href="/ebooks"
                    className="w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>เปิดคลัง 30 E-Book ครูไทย</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* BENTO 4: AiAon Prep — Teacher Exam Prep & 100 Questions */}
            {(activeFilter === "ALL" || activeFilter === "EXAM_PREP" || activeFilter === "TEACHER") && (
              <div id="bento-prep" className="rounded-3xl p-7 sm:p-8 bg-linear-to-b from-cyan-950/40 via-slate-900/90 to-blue-950/40 border border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_45px_rgba(6,182,212,0.25)] transition-all flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/10 blur-[90px] pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>🎓 สอบบรรจุครูผู้ช่วย • กลุ่ม Telegram ฟรี</span>
                    </span>
                    <span className="text-[11px] font-bold text-cyan-200 bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/30">
                      100 ข้อสอบ AI
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mb-2">
                    AiAon Prep ติวสอบครูผู้ช่วย &amp; เพลงช่วยจำ
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed mb-5">
                    บอทติวข้อสอบผ่าน Telegram Native Poll ยิงตรง 3 เวลาชีวิต (07:30 / 12:15 / 20:00 น.) พร้อมบทวิเคราะห์เฉลยสไตล์ AI และ <strong>ท่อนฮุกเพลงช่วยจำ</strong> คล้องจองติดหู จำแม่นโดยไม่ต้องท่องเครียด
                  </p>

                  <ul className="space-y-2 mb-6 text-xs text-white/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>คลังข้อสอบ 100 ข้อ ครบ 5 หมวดหลักภาค ข</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>ทำโพลผ่านมือถือได้ทันที ไม่ต้องโหลดแอปเพิ่ม</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>จำลองระบบสอบเสมือนจริงบนหน้าเว็บ</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    href="/teacher-prep"
                    className="w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>ลองทำข้อสอบจำลอง &amp; เข้ากลุ่ม Telegram</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* BENTO 5: iAon Music Store & Audio Production */}
            {(activeFilter === "ALL" || activeFilter === "MUSIC" || activeFilter === "TEACHER") && (
              <div id="bento-music" className="rounded-3xl p-7 sm:p-8 bg-linear-to-b from-pink-950/40 via-slate-900/90 to-purple-950/40 border border-pink-500/40 hover:border-pink-400 hover:shadow-[0_0_45px_rgba(236,72,153,0.25)] transition-all flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-pink-500/10 blur-[90px] pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5" />
                      <span>🎵 เพลงเพื่อการศึกษา &amp; ลิขสิทธิ์ 100%</span>
                    </span>
                    <span className="text-[11px] font-bold text-pink-200 bg-pink-500/20 px-2 py-0.5 rounded border border-pink-500/30">
                      AUDIO VAULT
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mb-2">
                    iAon Music Store &amp; Audio Production
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed mb-5">
                    สตูดิโอดนตรีสร้างสรรค์โดยครูอ้น: เพลงช่วยจำสอบครูผู้ช่วย, ดนตรี BGM ปลอดลิขสิทธิ์สำหรับคลิปสอน 60 นาที ส่งประเมิน ว.PA (หมดปัญหาคลิปโดนแบนเสียง), Backing Track วงดุริยางค์ และรับแต่งเพลงโรงเรียน
                  </p>

                  <div className="space-y-2 mb-6 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <span className="font-semibold text-white/90">เพลงช่วยจำกฎหมายครู (10 เพลงเต็ม)</span>
                      <span className="text-amber-300 font-bold">199 ฿</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <span className="font-semibold text-white/90">BGM คลื่นสมอง คลิปสอน 60 นาที ว.PA</span>
                      <span className="text-pink-300 font-bold">149 ฿</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <span className="font-semibold text-white/90">รับแต่งเพลงประจำโรงเรียน/องค์กร</span>
                      <span className="text-cyan-300 font-bold">3,500 ฿</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/music-store"
                    className="w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>เข้าสู่ Music Store &amp; ฟังตัวอย่าง</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* BENTO 6: Custom Web App & AI Speaker */}
            {(activeFilter === "ALL" || activeFilter === "CUSTOM") && (
              <div id="bento-custom" className="rounded-3xl p-7 sm:p-8 bg-linear-to-b from-amber-950/40 via-slate-900/90 to-yellow-950/40 border border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_45px_rgba(245,158,11,0.25)] transition-all flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/10 blur-[90px] pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5" />
                      <span>🛠️ สั่งทำระบบ &amp; วิทยากรบรรยาย</span>
                    </span>
                    <span className="text-[11px] font-bold text-amber-200 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                      BESPOKE DEV
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mb-2">
                    รับเขียนระบบตามสั่ง &amp; อบรม AI เชิงปฏิบัติการ
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed mb-5">
                    สตูดิโอรับออกแบบและพัฒนาระบบตามแบบฟอร์มเฉพาะของโรงเรียนและองค์กรคุณ (Next.js, Supabase, GAS) พร้อมบริการวิทยากรบรรยายและจัด Workshop AI นวัตกรรมครูไทย
                  </p>

                  <ul className="space-y-2 mb-6 text-xs text-white/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Custom Full-stack Web App + LINE OA</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>เครื่องคำนวณราคาประเมินสดก่อนตัดสินใจ</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>วิทยากรบรรยาย ถ่ายทอดเข้าใจง่าย ได้งานจริงทันที</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    href="/services"
                    className="w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>ประเมินราคา &amp; ปรึกษาคิวบรรยาย</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* BENTO 7: Student Vault & TCAS 3D */}
            {(activeFilter === "ALL" || activeFilter === "STUDENT") && (
              <div id="bento-student" className="rounded-3xl p-7 sm:p-8 bg-linear-to-b from-pink-950/30 via-slate-900/90 to-purple-950/30 border border-pink-500/40 hover:border-pink-400 hover:shadow-[0_0_45px_rgba(236,72,153,0.25)] transition-all flex flex-col justify-between group relative overflow-hidden">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>🎒 ไอเทม ม.ปลาย • นักเรียน Gen Z</span>
                    </span>
                    <span className="text-xs font-bold text-pink-300">เริ่มต้น 69 ฿</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mb-2">
                    คลังไอเทมช่วยเรียน &amp; TCAS 3D
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed mb-5">
                    เว็บ Portfolio TCAS 3D แปะ QR Code หน้าปกพอร์ต กรรมการสแกนแล้วเปิดดูผลงานบนเว็บได้ทันที, ระบบเช็คการบ้านประจำห้อง และคัมภีร์ AI Prompts ทำรายงานใน 3 นาที
                  </p>

                  <ul className="space-y-2 mb-6 text-xs text-white/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                      <span>เว็บ Portfolio TCAS 3D (129 ฿)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                      <span>ระบบเช็คการบ้านประจำห้อง (290 ฿/ห้อง)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                      <span>Student AI Prompts Kit (69 ฿)</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    href="/student-vault"
                    className="w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>เข้าสู่คลังนักเรียน</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* ── 4. DUAL INTERACTIVE LIVE PLAYGROUND (พิสูจน์ความเจ๋งจริง) ── */}
        <section className="relative">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>INTERACTIVE PLAYGROUND — ทดลองระบบจริงก่อนตัดสินใจ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              เห็นการทำงานจริง{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-teal-300 to-emerald-400">
                สัมผัสความง่ายด้วยตัวคุณเอง
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              ทดสอบ 3 เอนจินยอดนิยม: ระบบเช็คชื่อส่ง LINE อัตโนมัติ, AI ตรวจสลิปโอนเงิน หรือแผ่นเสียง 3D ฟังเพลงช่วยจำสดๆ
            </p>

            {/* Switch Tabs */}
            <div className="inline-flex p-1 rounded-2xl bg-slate-900 border border-white/10 mt-3 flex-wrap justify-center gap-1">
              <button
                type="button"
                onClick={() => {
                  stopVinylPreview();
                  setPlaygroundTab("attendance");
                }}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  playgroundTab === "attendance"
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                🕹️ จำลองระบบเช็คชื่อ (AONE01)
              </button>
              <button
                type="button"
                onClick={() => {
                  stopVinylPreview();
                  setPlaygroundTab("slip");
                }}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  playgroundTab === "slip"
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                🤖 จำลอง AI ตรวจสลิป (Gemini)
              </button>
              <button
                type="button"
                onClick={() => setPlaygroundTab("vinyl")}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  playgroundTab === "vinyl"
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                🎵 หมุนแผ่นเสียง 3D (ฟังเพลงสด)
              </button>
            </div>
          </div>

          {/* Playground Box */}
          <div className="max-w-4xl mx-auto rounded-3xl border border-cyan-500/30 bg-slate-900/80 p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden">
            
            {/* MODE 1: ATTENDANCE CHECK-IN */}
            {playgroundTab === "attendance" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left Controller */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                      <Cpu className="w-4 h-4" /> แผงควบคุมเช็คชื่อจำลอง
                    </span>
                    <span className="text-[11px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                      AONE01 ENGINE
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs text-white/60 mb-1.5">เลือกนักเรียน:</label>
                    <select
                      value={simStudent}
                      onChange={(e) => setSimStudent(e.target.value)}
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 outline-none"
                    >
                      <option value="ด.ช. สมศักดิ์ ใจดี (ม.3/1 เลขที่ 1)" className="bg-slate-900">ด.ช. สมศักดิ์ ใจดี (ม.3/1 เลขที่ 1)</option>
                      <option value="ด.ญ. พิมพ์ใจ รักเรียน (ม.3/1 เลขที่ 2)" className="bg-slate-900">ด.ญ. พิมพ์ใจ รักเรียน (ม.3/1 เลขที่ 2)</option>
                      <option value="นายกิตติคุณ นวัตกรรม (ม.3/1 เลขที่ 3)" className="bg-slate-900">นายกิตติคุณ นวัตกรรม (ม.3/1 เลขที่ 3)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-white/60 mb-1.5">สถานะการมาเรียน:</label>
                    <div className="grid grid-cols-3 gap-2 text-xs font-medium">
                      {[
                        { id: "present", label: "✓ ตรงเวลา", color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" },
                        { id: "late", label: "⏳ สาย", color: "bg-amber-500/20 border-amber-500/40 text-amber-300" },
                        { id: "leave", label: "🏥 ลา", color: "bg-blue-500/20 border-blue-500/40 text-blue-300" },
                      ].map((st) => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => setSimStatus(st.id as "present" | "late" | "leave")}
                          className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                            simStatus === st.id ? `${st.color} ring-1` : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulateCheckIn}
                    className={`w-full py-4 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] shadow-lg cursor-pointer bg-linear-to-r from-cyan-500 to-blue-600 ${
                      isBeeping ? "ring-4 ring-cyan-300 scale-98" : ""
                    }`}
                  >
                    <Volume2 className="w-4 h-4 animate-pulse" />
                    <span>กดปุ่มเช็คชื่อ (มีเสียง Beep! จริง) ⚡</span>
                  </button>
                </div>

                {/* Right Feed */}
                <div className="rounded-2xl bg-black/50 border border-white/10 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>LINE Notify Real-time Feed</span>
                    </div>
                    <span className="text-[11px] text-white/40">เชื่อมต่อแล้ว</span>
                  </div>

                  <div className="space-y-2 min-h-[160px]">
                    <AnimatePresence>
                      {simLog.map((log) => (
                        <motion.div
                          key={log.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white/80 leading-relaxed"
                        >
                          <span className="text-emerald-400 font-mono font-bold mr-1.5">[{log.time}]</span>
                          {log.text}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <p className="text-[11px] text-center text-white/40 pt-1">
                    💡 ระบบจริงทำงานบน Google Apps Script รันบน Google Sheets ตัวเอง 100%
                  </p>
                </div>
              </div>
            ) : playgroundTab === "slip" ? (
              /* MODE 2: AI SLIP VERIFICATION */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                      <Bot className="w-4 h-4" /> AI Slip Verifier จำลอง
                    </span>
                    <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      GEMINI 2.5 FLASH
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs text-white/60 mb-2">เลือกเคสสลิปโอนเงินที่ต้องการทดสอบ:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSlipTestCase("valid")}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          slipTestCase === "valid"
                            ? "bg-emerald-500/20 border-emerald-400 text-emerald-200 ring-1"
                            : "bg-white/5 border-white/10 text-white/60"
                        }`}
                      >
                        <div className="font-bold text-xs">✅ สลิปถูกต้อง (490 ฿)</div>
                        <div className="text-[11px] text-white/40 mt-1">ยอดตรง + Mini-QR แท้</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSlipTestCase("invalid")}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          slipTestCase === "invalid"
                            ? "bg-rose-500/20 border-rose-400 text-rose-200 ring-1"
                            : "bg-white/5 border-white/10 text-white/60"
                        }`}
                      >
                        <div className="font-bold text-xs">❌ สลิปยอดไม่ตรง (10 ฿)</div>
                        <div className="text-[11px] text-white/40 mt-1">โอนไม่ครบบิล (ทดสอบบล็อก)</div>
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulateSlipScan}
                    disabled={isScanningSlip}
                    className="w-full py-4 rounded-2xl font-bold text-sm text-slate-950 flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] shadow-lg cursor-pointer bg-linear-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 disabled:opacity-50"
                  >
                    <Zap className="w-4 h-4" />
                    <span>{isScanningSlip ? "กำลังประมวลผล Mini-QR & OCR..." : "⚡ สั่ง AI ตรวจสลิปจำลอง (ใน 2 วินาที)"}</span>
                  </button>
                </div>

                {/* Right Result Display */}
                <div className="rounded-2xl bg-black/50 border border-white/10 p-5 space-y-3 min-h-[220px] flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <span className="text-xs font-bold text-white/80 flex items-center gap-1.5">
                        <FileCheck2 className="w-4 h-4 text-emerald-400" />
                        ผลการตรวจสอบโดย AI
                      </span>
                      <span className="text-[11px] text-white/40">BOT Verification API</span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                      <p className={`text-xs font-bold leading-relaxed ${
                        slipScanResult.status === "success"
                          ? "text-emerald-300"
                          : slipScanResult.status === "error"
                          ? "text-rose-300"
                          : "text-white/60"
                      }`}>
                        {slipScanResult.message}
                      </p>
                      {slipScanResult.details && (
                        <p className="text-[11px] text-white/70 leading-relaxed border-t border-white/10 pt-2">
                          {slipScanResult.details}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-center text-white/40">
                    💡 ระบบจริงเชื่อมต่อเว็บฮุก LINE OA + ส่งมอบไฟล์ .ZIP อัตโนมัติ 24 ชม.
                  </p>
                </div>
              </div>
            ) : (
              /* MODE 3: 3D VINYL AUDIO PLAYER SIMULATOR */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left: 3D Interactive Vinyl Stage */}
                <div className="flex flex-col items-center justify-center p-4 bg-black/40 rounded-2xl border border-amber-500/30 relative overflow-hidden group">
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[11px] font-mono font-bold text-amber-300">
                      3D TURNTABLE STAGE
                    </span>
                  </div>

                  <div className="py-2 scale-90 sm:scale-100 transition-transform">
                    <VinylRecordMockup
                      code={selectedVinylTrack.code}
                      title={selectedVinylTrack.title}
                      categoryLabel={selectedVinylTrack.category}
                      bpm={selectedVinylTrack.bpm}
                      duration="ท่อนฮุก 30 วิ"
                      accentColor={selectedVinylTrack.accentColor}
                      isPlaying={isVinylPlaying}
                      size="md"
                      isInteractive={true}
                      onPlayClick={handleToggleVinylPreview}
                    />
                  </div>

                  <p className="text-[11px] font-prompt text-white/50 text-center mt-2">
                    {isVinylPlaying
                      ? "🔊 กำลังเล่นตัวอย่างเสียงสดผ่าน Web Audio Synth... (คลิกเพื่อหยุด)"
                      : "👆 คลิกที่แผ่นเสียง หรือปุ่มด้านขวา เพื่อหมุนแผ่นและฟังเสียงดนตรีสด"}
                  </p>
                </div>

                {/* Right: Audio Control & Track Selector */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-sm font-bold text-amber-300 flex items-center gap-2">
                      <Music className="w-4 h-4 text-amber-400" />
                      <span>เครื่องเล่นแผ่นเสียงจำลอง &amp; เพลงช่วยจำ</span>
                    </span>
                    <span className="text-[11px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                      WEB AUDIO SYNTH
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs text-white/60 mb-2">เลือกเพลงที่ต้องการฟังตัวอย่าง:</label>
                    <div className="space-y-2">
                      {[
                        {
                          id: "mus-01",
                          code: "MUS-01",
                          title: "เพลงช่วยจำ พ.ร.บ.การศึกษาแห่งชาติ 2542",
                          category: "เพลงช่วยจำสอบครูผู้ช่วย",
                          bpm: "118 BPM",
                          accentColor: "amber" as const,
                          desc: "ท่อนฮุก 9 หมวดการศึกษา จำแม่นไม่ลืม",
                          chordProgression: [
                            [261.63, 329.63, 392.0, 523.25], // C
                            [220.0, 261.63, 329.63, 440.0],  // Am
                            [174.61, 220.0, 261.63, 349.23], // F
                            [196.0, 246.94, 293.66, 392.0],  // G
                          ],
                        },
                        {
                          id: "bgm-01",
                          code: "BGM-01",
                          title: "Acoustic Warmth BGM (คลิปสอน ว.PA)",
                          category: "เพลง BGM คลิป ว.PA",
                          bpm: "92 BPM",
                          accentColor: "cyan" as const,
                          desc: "กีตาร์โปร่งอบอุ่น ปลอดลิขสิทธิ์ 100%",
                          chordProgression: [
                            [329.63, 392.0, 493.88, 659.25], // Em
                            [261.63, 329.63, 392.0, 523.25], // C
                            [293.66, 369.99, 440.0, 587.33], // D
                            [196.0, 246.94, 293.66, 392.0],  // G
                          ],
                        },
                        {
                          id: "mus-02",
                          code: "MUS-02",
                          title: "เพลงสรุป พ.ร.บ.ระเบียบข้าราชการครู 2547",
                          category: "เพลงช่วยจำสอบครูผู้ช่วย",
                          bpm: "124 BPM",
                          accentColor: "purple" as const,
                          desc: "เจาะลึก 6 วินัยและการออกจากราชการ",
                          chordProgression: [
                            [220.0, 261.63, 329.63, 440.0],  // Am
                            [174.61, 220.0, 261.63, 349.23], // F
                            [261.63, 329.63, 392.0, 523.25], // C
                            [329.63, 392.0, 493.88, 659.25], // Em
                          ],
                        },
                      ].map((track) => (
                        <button
                          key={track.id}
                          type="button"
                          onClick={() => {
                            stopVinylPreview();
                            setSelectedVinylTrack(track);
                          }}
                          className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            selectedVinylTrack.id === track.id
                              ? "bg-amber-500/20 border-amber-400 text-amber-200 ring-1"
                              : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                          }`}
                        >
                          <div className="truncate mr-2">
                            <div className="text-xs font-bold truncate">{track.title}</div>
                            <div className="text-[11px] text-white/40 truncate">{track.desc} • {track.bpm}</div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-white/10 shrink-0">
                            {track.code}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Play / Stop Button */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="button"
                      onClick={handleToggleVinylPreview}
                      className={`flex-1 py-3.5 px-5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg cursor-pointer ${
                        isVinylPlaying
                          ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-900/40 animate-pulse"
                          : "bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-black shadow-amber-900/30 hover:scale-[1.02]"
                      }`}
                    >
                      {isVinylPlaying ? (
                        <>
                          <Pause className="w-4 h-4 fill-white" />
                          <span>หยุดเล่นเสียงตัวอย่าง</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-zinc-950" />
                          <span>กดเพื่อหมุนแผ่น &amp; ฟังตัวอย่างสด 🎵</span>
                        </>
                      )}
                    </button>

                    <Link
                      href="/music-store"
                      className="py-3.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-prompt font-semibold flex items-center justify-center gap-1.5 transition-all text-center"
                    >
                      <span>ดูคลังเพลงเต็ม</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* ── 5. WHY CHOOSE IAON TECH? (5 ข้อได้เปรียบที่ไม่มีใครเหมือน) ── */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>THE IAON ADVANTAGE — ทำไมผู้ใช้กว่า 2,390 คนถึงไว้วางใจ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              5 เหตุผลที่นวัตกรรมของครูอ้น{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
                ตอบโจทย์ชีวิตคุณที่สุด
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl p-6 bg-slate-900/60 border border-white/10 hover:border-blue-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-300 flex items-center justify-center font-black text-sm">
                1
              </div>
              <h3 className="text-lg font-bold text-white">ไร้ค่าบริการรายเดือน (Lifetime)</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                จ่ายครั้งเดียวได้สิทธิ์เป็นเจ้าของระบบตลอดชีพ รันบน Google Workspace ฟรีของคุณเอง ไม่ต้องผูกบัตรเครดิต ไม่เสี่ยงโดนตัดระบบกะทันหัน
              </p>
            </div>

            <div className="rounded-3xl p-6 bg-slate-900/60 border border-white/10 hover:border-emerald-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-black text-sm">
                2
              </div>
              <h3 className="text-lg font-bold text-white">ปลอดภัย ข้อมูลอยู่กับคุณ 100%</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                ข้อมูลนักเรียน โรงเรียน หรือร้านค้า ถูกจัดเก็บใน Google Drive และ Sheets ของคุณเอง ทางเราไม่มีการดึงข้อมูลส่วนบุคคลใดๆ ออกมาภายนอก
              </p>
            </div>

            <div className="rounded-3xl p-6 bg-slate-900/60 border border-white/10 hover:border-purple-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-black text-sm">
                3
              </div>
              <h3 className="text-lg font-bold text-white">สร้างจากหน้างานจริง โดยครูจริง</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                พัฒนาโดย ครู ค.ศ.2 โรงเรียนหาดใหญ่วิทยาลัย ทุกฟังก์ชันผ่านการทดสอบใช้งานจริงกับนักเรียน 279 คน แก้ปัญหาตรงจุด ไม่ใช่ทฤษฎีในห้องแอร์
              </p>
            </div>

            <div className="rounded-3xl p-6 bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black text-sm">
                4
              </div>
              <h3 className="text-lg font-bold text-white">ตรวจสลิป &amp; ส่งมอบระบบอัตโนมัติ 24 ชม.</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                สั่งซื้อและโอนเงินเวลาไหนก็ได้รับไฟล์ทันที ด้วยเอนจิน Gemini 2.5 Flash Vision ตรวจสลิปและเปิดลิงก์ดาวน์โหลด Secure ZIP ให้ใน 2 วินาที
              </p>
            </div>

            <div className="rounded-3xl p-6 bg-slate-900/60 border border-white/10 hover:border-pink-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-pink-500/20 text-pink-300 flex items-center justify-center font-black text-sm">
                5
              </div>
              <h3 className="text-lg font-bold text-white">ให้ Source Code ครบ ปรับแต่งได้</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                เปิดเผยซอร์สโค้ดพร้อมคู่มือคลิปสอนภาษาไทยทีละสเต็ป ติดตั้งเสร็จใน 3 นาที หรือเลือกรับบริการ VIP Setup ให้ครูอ้นช่วยติดตั้งให้
              </p>
            </div>

            <div className="rounded-3xl p-6 bg-slate-900/60 border border-white/10 hover:border-amber-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-black text-sm">
                6
              </div>
              <h3 className="text-lg font-bold text-white">ดูแลใกล้ชิดผ่าน LINE OA สไตล์พี่สอนน้อง</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                มีข้อสงสัยหรือติดขัดการใช้งาน สามารถทักปรึกษาครูอ้นโดยตรงผ่าน LINE Official Account (@deu6776s) อบอุ่น จริงใจ พร้อมช่วยเหลือเสมอครับ
              </p>
            </div>
          </div>
        </section>

        {/* ── 6. TESTIMONIALS & SOCIAL PROOF ──────────────────────── */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>REAL USER VOICES — ประสบการณ์จริงจากผู้ใช้งาน</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              เสียงตอบรับจาก{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-400">
                คุณครู เจ้าของธุรกิจ และนักเรียน
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "ครูวิภาดา กลิ่นแก้ว",
                role: "ครูประจำชั้น ม.3 โรงเรียนมัธยม",
                quote: "ระบบเช็คชื่อ LINE V2 ช่วยลดเวลาเช็คแถวหน้าเสาธงไปเยอะมาก ผปค. ได้รับข้อความทันที ไม่ต้องโทรตามเด็กรายคนอีกต่อไป เลิกงานตรงเวลาจริงค่ะ",
                stars: 5,
                badge: "ระบบเช็คชื่อ AONE01",
                badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
              },
              {
                name: "ครูธีรพัฒน์ สุขสำราญ",
                role: "หัวหน้างานสารสนเทศและยานพาหนะ",
                quote: "ระบบ Smart Vehicle ช่วยให้งานขอใช้รถและบันทึกบิลค่าน้ำมันมีความโปร่งใส ตรวจสอบง่าย เลิกปวดหัวกับเอกสารกระดาษหาย 100%",
                stars: 5,
                badge: "Smart Vehicle AONA02",
                badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30"
              },
              {
                name: "น้องก้องภพ (ก้อง)",
                role: "นักเรียน ม.6 ยื่น TCAS รอบ 1",
                quote: "เว็บ Portfolio 3D เท่มากครับ อาจารย์สัมภาษณ์สแกน QR Code หน้าปกแล้วชมว่าพอร์ตแปลกใหม่ ไม่เหมือนใคร ติดรอบ 1 เรียบร้อย!",
                stars: 5,
                badge: "เว็บพอร์ต 3D STU01",
                badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/30"
              }
            ].map((review, rIdx) => (
              <div key={rIdx} className="rounded-3xl p-6 bg-slate-900/60 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.stars)].map((_, s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${review.badgeColor}`}>
                      {review.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>
                <div className="border-t border-white/10 pt-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{review.name}</h4>
                    <p className="text-[11px] text-white/50">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. MEET THE CREATOR (ตัวตน & ความจริงใจ) ─────────────── */}
        <section className="rounded-3xl p-8 sm:p-12 border border-white/10 bg-slate-900/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-linear-to-br from-blue-500 via-purple-600 to-pink-500 p-1 shrink-0 shadow-[0_0_40px_rgba(59,130,246,0.3)]">
              <div className="w-full h-full rounded-[22px] bg-slate-950 flex flex-col items-center justify-center text-center p-3">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-pink-400">
                  iAon
                </span>
                <span className="text-[11px] text-white/50 uppercase tracking-widest mt-1">Tech Studio</span>
              </div>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>MEET THE CREATOR — ผู้พัฒนาและส่งมอบระบบ</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                นายจิรวัฒน์ เดชเส้ง{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-orange-400">
                  (ครูอ้น / iAon Tech)
                </span>
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                ครู ค.ศ.2 (ชำนาญการ) โรงเรียนหาดใหญ่วิทยาลัย ผู้พัฒนานวัตกรรม Google Apps Script, AI Automation และสื่อดนตรีเพื่อการศึกษา ภายใต้สโลแกน 
                <strong className="text-white"> &ldquo;ไอทีง่ายๆ สไตล์ iAon — ให้ AI ทำงานแทนคุณ แล้วเอาเวลาไปใช้ชีวิตนะครับ&rdquo;</strong> ผมมุ่งมั่นสร้างระบบที่เสถียร ใช้งานง่าย และไม่สร้างภาระค่าใช้จ่ายรายเดือนให้แก่ครู โรงเรียน และผู้ประกอบการไทย
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-white/60">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  เปิดเผย Source Code ปรับแต่งได้ 100%
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  มีคลิปสอนติดตั้งและดูแลโดยตรง
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  รันบน Google Drive ส่วนตัว ปลอดภัย
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. FAQ ACCORDION ────────────────────────────────────── */}
        <section className="rounded-3xl p-8 sm:p-12 border border-white/10 bg-slate-900/50 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              คำถามที่พบบ่อย (FAQ)
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              ทุกข้อสงสัยเกี่ยวกับระบบ สิทธิ์การใช้งาน และการติดตั้ง
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: "1. ไม่มีความรู้เรื่องเขียนโค้ดเลย จะใช้งานได้ไหม?",
                a: "ใช้งานได้ 100% ครับ ทุกระบบมีคู่มือติดตั้งภาษาไทยแบบทีละสเต็ป (เสร็จใน 2-3 นาที) เพียงแค่คัดลอกไฟล์ลงใน Google Drive ของคุณเองก็พร้อมใช้งานได้ทันที หรือจะเลือกออปชัน VIP Setup ให้ครูอ้นติดตั้งให้ก็ได้ครับ"
              },
              {
                q: "2. สิทธิ์การใช้งานเป็นอย่างไร มีค่าบริการรายเดือนหรือไม่?",
                a: "ระบบส่วนใหญ่ในคลังเป็นแบบจ่ายครั้งเดียวและเป็นเจ้าของสิทธิ์ใช้งานตลอดชีพ (One-Time Lifetime) ไม่มีค่าบริการรายเดือนหรือรายปีใดๆ ทั้งสิ้น เพราะระบบรันอยู่บน Google Workspace ฟรีของท่านเอง (ยกเว้นบริการเฝ้าระวัง AI Caretaker สำหรับร้านค้าที่มีค่าบริการดูแลระบบรายเดือน 990 ฿/ด.)"
              },
              {
                q: "3. ระบบชำระเงินและส่งมอบไฟล์ทำงานอย่างไร?",
                a: "หลังจากโอนเงินผ่าน PromptPay QR และอัปโหลดสลิป ระบบ Gemini 2.5 Flash Vision จะตรวจสลิปและอนุมัติอัตโนมัติภายใน 2 วินาที พร้อมเปิดปุ่มดาวน์โหลดไฟล์และเทมเพลตผ่าน OneDrive / ZIP ให้ท่านทันทีตลอด 24 ชม."
              },
              {
                q: "4. ปลอดภัยหรือไม่ ข้อมูลนักเรียนและโรงเรียนจะรั่วไหลไหม?",
                a: "ปลอดภัยสูงสุด 100% ครับ เนื่องจากระบบจะทำงานบน Google Drive และ Google Sheets ในบัญชี Google ส่วนตัวของท่านเอง ทางเราไม่เก็บข้อมูลส่วนบุคคลหรือข้อมูลนักเรียนไว้ในเซิร์ฟเวอร์ภายนอก"
              },
              {
                q: "5. หากติดปัญหาในการติดตั้งหรือใช้งาน มีคนช่วยเหลือไหม?",
                a: "มีครูอ้นคอยให้คำปรึกษาและซัพพอร์ตโดยตรงผ่าน LINE Official Account (@deu6776s) ท่านสามารถทักแชตมาสอบถามหรือขอคำแนะนำได้ตลอดเวลาครับ"
              }
            ].map((faq, fIdx) => (
              <div key={fIdx} className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-2 hover:bg-white/8 transition-colors">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span className="text-cyan-400">❓</span> {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 9. FINAL VIP LINE OA CTA (ปิดการขาย 24 ชม.) ─────────── */}
        <section className="rounded-3xl p-8 sm:p-14 border border-emerald-500/40 bg-linear-to-r from-emerald-950/50 via-slate-900 to-teal-950/50 text-center relative overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.2)]">
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wide">
              <MessageCircle className="w-4 h-4 fill-emerald-300 text-emerald-300" />
              <span>OFFICIAL LINE VIP SUPPORT (2,390+ FRIENDS)</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              พร้อมเสกงานเอกสาร &amp; ระบบของคุณให้{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-teal-200 to-cyan-300">
                เสร็จในคลิกเดียวแล้วหรือยัง?
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              แอด LINE ครูอ้นเพื่อรับโค้ดฟรี ปรึกษาโจทย์โรงเรียน ออกแบบระบบธุรกิจ หรือสอบถามรายละเอียดการสั่งซื้อได้ตลอด 24 ชั่วโมงครับ
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getLineOrderUrl(
                  "สวัสดีครับครูอ้น สนใจปรึกษาระบบอัตโนมัติโรงเรียน / บริการ AI Caretaker / ขอรับโค้ดฟรี จากหน้าแรก aiaon.tech ครับ 🙏"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all hover:scale-105 cursor-pointer"
              >
                <MessageCircle className="w-6 h-6 fill-zinc-950 text-zinc-950" />
                <span>ทักแชต LINE ครูอ้น (@deu6776s)</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <Link
                href="/freebies"
                className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-base transition-all"
              >
                <span>🎁 ดูของแจกฟรี 7 ระบบ</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, ArrowRight, CheckCircle2, MessageCircle,
  GraduationCap, Package, Briefcase, Zap, ShieldCheck,
  Bell, Volume2, Check, ExternalLink, QrCode, Cpu,
  Award, School, Heart, Flame, Gift, Star
} from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/sections/HeroSection";

export function HomeView() {
  // Simulator State
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

  // Play web audio sound
  const playBeep = () => {
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Audio fallback
    }
  };

  const handleSimulateCheckIn = () => {
    playBeep();
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

  return (
    <div className="w-full relative overflow-hidden min-h-screen pb-24 text-white">
      
      {/* ── BLOCK 1 & 2: HERO & TRUST BADGES ────────────────────── */}
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 relative z-10">

        {/* ── BLOCK 3: INTERACTIVE LIVE PLAYGROUND (ความว้าว) ─────── */}
        <section className="relative">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-prompt font-semibold">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>INTERACTIVE LIVE PLAYGROUND — ทดลองระบบจริง</span>
            </div>
            <h2 className="font-prompt text-3xl sm:text-4xl font-extrabold text-white">
              เห็นภาพจริงก่อนตัดสินใจ{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400">
                สัมผัสความง่ายด้วยตัวคุณเอง
              </span>
            </h2>
            <p className="font-prompt text-sm text-white/60">
              ลองกดปุ่มเช็คชื่อด้านล่าง เพื่อดูการจำลองส่ง LINE Notify และบันทึกข้อมูลเข้า Google Sheets แบบ Real-time
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-3xl border border-cyan-500/30 bg-slate-900/80 p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Left: Input Controller */}
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-prompt text-sm font-bold text-cyan-300 flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> แผงควบคุมเช็คชื่อจำลอง
                  </span>
                  <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                    AONE01 ENGINE
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-prompt text-white/60 mb-1.5">เลือกนักเรียน:</label>
                  <select
                    value={simStudent}
                    onChange={(e) => setSimStudent(e.target.value)}
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 font-prompt text-xs text-white focus:border-cyan-400 outline-none"
                  >
                    <option value="ด.ช. สมศักดิ์ ใจดี (ม.3/1 เลขที่ 1)" className="bg-slate-900">ด.ช. สมศักดิ์ ใจดี (ม.3/1 เลขที่ 1)</option>
                    <option value="ด.ญ. พิมพ์ใจ รักเรียน (ม.3/1 เลขที่ 2)" className="bg-slate-900">ด.ญ. พิมพ์ใจ รักเรียน (ม.3/1 เลขที่ 2)</option>
                    <option value="นายกิตติคุณ นวัตกรรม (ม.3/1 เลขที่ 3)" className="bg-slate-900">นายกิตติคุณ นวัตกรรม (ม.3/1 เลขที่ 3)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-prompt text-white/60 mb-1.5">สถานะการมาเรียน:</label>
                  <div className="grid grid-cols-3 gap-2 font-prompt text-xs font-medium">
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
                  className={`w-full py-4 rounded-2xl font-prompt font-bold text-sm text-white flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] shadow-lg cursor-pointer bg-linear-to-r from-cyan-500 to-blue-600 ${
                    isBeeping ? "ring-4 ring-cyan-300 scale-98" : ""
                  }`}
                >
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  <span>กดปุ่มเช็คชื่อ (มีเสียง Beep!) ⚡</span>
                </button>
              </div>

              {/* Right: Live LINE Notify Feed */}
              <div className="rounded-2xl bg-black/50 border border-white/10 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2 text-xs font-prompt font-bold text-emerald-400">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>LINE Notify Real-time Feed</span>
                  </div>
                  <span className="text-[10px] font-prompt text-white/40">เชื่อมต่อแล้ว</span>
                </div>

                <div className="space-y-2 min-h-[160px]">
                  <AnimatePresence>
                    {simLog.map((log) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs font-prompt text-white/80 leading-relaxed"
                      >
                        <span className="text-emerald-400 font-mono font-bold mr-1.5">[{log.time}]</span>
                        {log.text}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <p className="text-[11px] font-prompt text-center text-white/40 pt-1">
                  💡 ระบบจริงทำงานบน Google Apps Script รันบน Google Sheets ตัวเอง 100%
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── BLOCK 4: 3 SHOPPING PORTALS (3 ประตูสู่สินค้า) ───────── */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="font-prompt text-3xl sm:text-4xl font-extrabold text-white">
              เลือกชมสินค้าตามโจทย์ของคุณ{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                (3 ทางเลือกหลัก)
              </span>
            </h2>
            <p className="font-prompt text-sm text-white/60">
              ไม่ว่าคุณจะเป็นนักเรียน, คุณครูผู้สอน หรือโรงเรียน เรามีโซลูชันสำเร็จรูปพร้อมให้คุณใช้งานทันที
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Portal 1: Student Vault */}
            <div className="rounded-3xl p-8 bg-linear-to-b from-pink-950/30 via-slate-900/80 to-slate-900 border border-pink-500/40 hover:border-pink-400 hover:shadow-[0_0_40px_rgba(236,72,153,0.25)] transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-300 mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-prompt font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    สำหรับนักเรียน Gen Z
                  </span>
                  <span className="text-xs font-prompt text-pink-300 font-bold">เริ่มต้น 69 ฿</span>
                </div>
                <h3 className="font-prompt text-2xl font-extrabold text-white mb-3">
                  คลังไอเทมช่วยเรียน &amp; TCAS
                </h3>
                <p className="font-prompt text-xs text-white/60 leading-relaxed mb-6">
                  เว็บ Portfolio TCAS 3D แปะ QR Code หน้าปกพอร์ต, ระบบเช็คการบ้านห้อง (หารคนละ 7 ฿) และคัมภีร์ AI Prompts ทำรายงาน 3 นาที
                </p>
                <ul className="space-y-2 mb-8 text-xs font-prompt text-white/80">
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

              <Link
                href="/student-vault"
                className="w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-prompt font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all group-hover:scale-102"
              >
                <span>เข้าสู่คลังนักเรียน</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Portal 2: Teacher & Bundles */}
            <div className="rounded-3xl p-8 bg-linear-to-b from-purple-950/40 via-slate-900/90 to-indigo-950/40 border border-purple-500/60 shadow-[0_0_50px_rgba(168,85,247,0.25)] transition-all flex flex-col justify-between group lg:scale-105 ring-1 ring-purple-400/40">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-6 group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-prompt font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    👑 สำหรับคุณครู &amp; บุคลากร
                  </span>
                  <span className="text-xs font-prompt text-amber-300 font-bold">ลดสูงสุด 51%</span>
                </div>
                <h3 className="font-prompt text-2xl font-extrabold text-white mb-3">
                  คลัง 20 ระบบ &amp; แพ็กเกจเหมา
                </h3>
                <p className="font-prompt text-xs text-white/60 leading-relaxed mb-6">
                  ระบบเช็คชื่อ, ตรวจชุด, สารสนเทศยานพาหนะ Smart Vehicle, เกียรติบัตร QR Verify และดีล All-in-One 20 ระบบตลอดชีพ (4,990 ฿)
                </p>
                <ul className="space-y-2 mb-8 text-xs font-prompt text-white/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>20 ระบบ Google Apps Script (390-990 ฿)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Classroom Pro &amp; Admin Suite Bundles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>All-in-One 20 ระบบตลอดชีพ (4,990 ฿)</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/bundles"
                className="w-full py-4 px-6 rounded-2xl bg-linear-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-prompt font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all group-hover:scale-102"
              >
                <span>ดูแพ็กเกจเหมาสุดคุ้ม (Bundles)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Portal 3: Bespoke Services */}
            <div className="rounded-3xl p-8 bg-linear-to-b from-cyan-950/30 via-slate-900/80 to-slate-900 border border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.25)] transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-6 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-prompt font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    สำหรับโรงเรียน &amp; องค์กร
                  </span>
                  <span className="text-xs font-prompt text-cyan-300 font-bold">ตามโจทย์เฉพาะ</span>
                </div>
                <h3 className="font-prompt text-2xl font-extrabold text-white mb-3">
                  รับทำระบบตามสั่ง &amp; วิทยากร
                </h3>
                <p className="font-prompt text-xs text-white/60 leading-relaxed mb-6">
                  สตูดิโอรับออกแบบและพัฒนาระบบตามแบบฟอร์มโรงเรียนคุณโดยเฉพาะ พร้อมเครื่องคำนวณราคาประเมินสด และบริการจัดอบรม AI
                </p>
                <ul className="space-y-2 mb-8 text-xs font-prompt text-white/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Quick Custom ปรับแก้ชีตเดิม (2,490 ฿)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Full Custom Web App + LINE (5,900 ฿)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>วิทยากรบรรยาย &amp; Workshop อบรม AI</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/services"
                className="w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-white font-prompt font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all group-hover:scale-102"
              >
                <span>ประเมินราคา &amp; สั่งทำระบบ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </section>

        {/* ── TESTIMONIALS & SOCIAL PROOF ─────────────────────────── */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-prompt font-semibold">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>REAL USER VOICES — เสียงตอบรับจากผู้ใช้งานจริง</span>
            </div>
            <h2 className="font-prompt text-3xl sm:text-4xl font-extrabold text-white">
              ความประทับใจจาก{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-400">
                คุณครูและนักเรียน
              </span>
            </h2>
            <p className="font-prompt text-sm text-white/60">
              ประสบการณ์จริงจากการนำระบบอัตโนมัติของ AiAon Tech ไปใช้งานจริงในโรงเรียน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "ครูวิภาดา กลิ่นแก้ว",
                role: "ครูประจำชั้น ม.3 โรงเรียนมัธยม",
                quote: "ระบบเช็คชื่อ LINE V2 ช่วยลดเวลาเช็คแถวหน้าเสาธงไปเยอะมาก ผปค. ได้รับข้อความทันที ไม่ต้องโทรตามเด็กรายคนอีกต่อไป",
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
                    <span className={`text-[10px] font-prompt font-semibold px-2 py-0.5 rounded-full border ${review.badgeColor}`}>
                      {review.badge}
                    </span>
                  </div>
                  <p className="font-prompt text-xs sm:text-sm text-white/80 leading-relaxed italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>
                <div className="border-t border-white/10 pt-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-prompt text-xs font-bold text-white">{review.name}</h4>
                    <p className="font-prompt text-[10px] text-white/50">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ACCORDION ───────────────────────────────────────── */}
        <section className="rounded-3xl p-8 sm:p-12 border border-white/10 bg-slate-900/50 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-prompt text-2xl sm:text-3xl font-extrabold text-white">
              คำถามที่พบบ่อย (FAQ)
            </h2>
            <p className="font-prompt text-xs sm:text-sm text-white/60">
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
                a: "ทุกระบบเป็นการจ่ายครั้งเดียวและเป็นเจ้าของสิทธิ์ใช้งานตลอดชีพ (One-Time Lifetime) ไม่มีค่าบริการรายเดือนหรือรายปีใดๆ ทั้งสิ้น เพราะระบบรันอยู่บน Google Workspace ฟรีของท่านเอง"
              },
              {
                q: "3. ระบบชำระเงินและส่งมอบไฟล์ทำงานอย่างไร?",
                a: "หลังจากโอนเงินผ่าน PromptPay QR และอัปโหลดสลิป ระบบ Gemini 2.5 Flash Vision จะตรวจสลิปและอนุมัติอัตโนมัติภายใน 2 วินาที พร้อมเปิดปุ่มดาวน์โหลดไฟล์และเทมเพลตผ่าน OneDrive ให้ท่านทันที"
              },
              {
                q: "4. ปลอดภัยหรือไม่ ข้อมูลนักเรียนและโรงเรียนจะรั่วไหลไหม?",
                a: "ปลอดภัยสูงสุด 100% ครับ เนื่องจากระบบจะทำงานบน Google Drive และ Google Sheets ในบัญชี Google ส่วนตัวของท่านเอง ทางเราไม่เก็บข้อมูลส่วนบุคคลหรือข้อมูลนักเรียนไว้ในเซิร์ฟเวอร์ภายนอก"
              },
              {
                q: "5. หากติดปัญหาในการติดตั้งหรือใช้งาน มีคนช่วยเหลือไหม?",
                a: "มีครูอ้นคอยให้คำปรึกษาและซัพพอร์ตโดยตรงผ่าน LINE Official Account (@deu6776s) ท่านสามารถทักแชตมาสอบถามได้ตลอดเวลาครับ"
              }
            ].map((faq, fIdx) => (
              <div key={fIdx} className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-2 hover:bg-white/8 transition-colors">
                <h3 className="font-prompt text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span className="text-cyan-400">❓</span> {faq.q}
                </h3>
                <p className="font-prompt text-xs sm:text-sm text-white/70 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BLOCK 5: MEET THE CREATOR (ตัวตน & ความน่าเชื่อถือ) ─── */}
        <section className="rounded-3xl p-8 sm:p-12 border border-white/10 bg-slate-900/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-linear-to-br from-blue-500 via-purple-600 to-pink-500 p-1 shrink-0 shadow-[0_0_40px_rgba(59,130,246,0.3)]">
              <div className="w-full h-full rounded-[22px] bg-slate-950 flex flex-col items-center justify-center text-center p-3">
                <span className="font-prompt text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-pink-400">
                  iAon
                </span>
                <span className="text-[10px] font-prompt text-white/50 uppercase tracking-widest mt-1">Tech Studio</span>
              </div>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-prompt font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>MEET THE CREATOR — ผู้พัฒนาและดูแลระบบ</span>
              </div>
              <h3 className="font-prompt text-2xl sm:text-3xl font-extrabold text-white">
                นายจิรวัฒน์ เดชเส้ง{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-orange-400">
                  (ครูอ้น / iAon Tech)
                </span>
              </h3>
              <p className="font-prompt text-sm text-white/70 leading-relaxed">
                ครู ค.ศ.2 (ชำนาญการ) โรงเรียนหาดใหญ่วิทยาลัย ผู้พัฒนานวัตกรรม Google Apps Script และ AI เพื่อการศึกษา ด้วยแนวคิด 
                <strong className="text-white"> "ไอทีง่ายๆ สไตล์ไอ้อ้น"</strong> เราสร้างระบบเหล่านี้ขึ้นมาจากปัญหาจริงในห้องเรียน เพื่อช่วยให้ครูและนักเรียนไทยทำงานได้เร็วขึ้น 10 เท่า โดยไม่ต้องพึ่งพาโปรแกรมรายเดือนราคาแพง
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs font-prompt text-white/60">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  เปิดเผย Source Code ปรับแต่งได้ 100%
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  มีคลิปสอนติดตั้งและดูแลโดยตรง
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── BLOCK 6: FINAL VIP LINE OA CTA (ปิดการขาย 24 ชม.) ──── */}
        <section className="rounded-3xl p-8 sm:p-14 border border-emerald-500/40 bg-linear-to-r from-emerald-950/50 via-slate-900 to-teal-950/50 text-center relative overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.2)]">
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-prompt font-bold tracking-wide">
              <MessageCircle className="w-4 h-4 fill-emerald-300 text-emerald-300" />
              <span>OFFICIAL LINE VIP SUPPORT (2,390+ FRIENDS)</span>
            </div>

            <h2 className="font-prompt text-3xl sm:text-5xl font-black text-white leading-tight">
              พร้อมเสกงานเอกสารให้{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-teal-200 to-cyan-300">
                เสร็จในคลิกเดียวแล้วหรือยัง?
              </span>
            </h2>

            <p className="font-prompt text-sm sm:text-base text-white/70 leading-relaxed">
              แอด LINE ครูอ้นเพื่อรับโค้ดและระบบฟรี สอบถามการสั่งซื้อ หรือส่งแบบฟอร์มโรงเรียนมาปรึกษาและประเมินราคาได้ตลอด 24 ชั่วโมงครับ
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://lin.ee/poMESoP"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-prompt font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all hover:scale-105 cursor-pointer"
              >
                <MessageCircle className="w-6 h-6 fill-zinc-950 text-zinc-950" />
                <span>ทักแชต LINE ครูอ้น (@deu6776s)</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <Link
                href="/freebies"
                className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-prompt font-semibold text-base transition-all"
              >
                <span>🎁 ดูของแจกฟรีทั้งหมด</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

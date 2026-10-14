"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Bot, Sparkles, MessageCircle, ArrowRight,
  CheckCircle2, AlertTriangle, RefreshCw, 
  Receipt, CalendarCheck, BarChart3, 
  Zap, HelpCircle, UserCheck
} from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   DATA: 2 STARTER KITS ("บ้านหลังเล็ก" มาตรฐานเดียวกัน)
───────────────────────────────────────────────────────────── */

const STARTER_KITS = [
  {
    id: "kit-shop",
    badge: "🛍️ ชุดที่ 1 • ขายดีที่สุดสำหรับร้านออนไลน์",
    title: "แอดมิน AI ขายของ & ตรวจสลิปอัตโนมัติ",
    subtitle: "Smart Shop & Auto-Slip Verifier (LINE OA + Google Sheets)",
    target: "เหมาะสำหรับ: ร้านขายเสื้อผ้า, ร้านอาหาร/ขนม, พรีออเดอร์, ร้านค้าออนไลน์ทั่วไป",
    icon: Receipt,
    accent: "cyan",
    borderClass: "border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.15)]",
    features: [
      "ลูกค้าทัก LINE OA ➡️ AI ดึงข้อมูลสินค้า/ราคา/สต็อกจาก Google Sheets มาตอบทันที 24 ชม.",
      "ลูกค้าโอนเงินส่งสลิป ➡️ AI ตรวจสลิปแท้/ปลอม เช็กชื่อบัญชีและยอดเงินอัตโนมัติใน 2 วินาที",
      "บันทึกยอดขายลงตาราง Google Sheets พร้อมแจ้งเตือนเจ้าของร้านทันทีที่ปิดการขายได้",
      "เจ้าของร้านแก้ราคาหรือเพิ่มโปรโมชันใน Google Sheets เองได้ง่ายๆ เหมือนพิมพ์ Excel",
    ],
  },
  {
    id: "kit-booking",
    badge: "📅 ชุดที่ 2 • ยอดฮิตสำหรับธุรกิจบริการ",
    title: "แอดมิน AI รับจองคิว & นัดหมายอัตโนมัติ",
    subtitle: "Smart Booking & Queue Manager (LINE OA + Google Sheets)",
    target: "เหมาะสำหรับ: ร้านตัดผม/เสริมสวย, คลินิก, ร้านนวดสปา, คาเฟ่, โรงเรียนสอนพิเศษ",
    icon: CalendarCheck,
    accent: "purple",
    borderClass: "border-purple-500/40 hover:border-purple-400 shadow-[0_0_35px_rgba(168,85,247,0.15)]",
    features: [
      "ลูกค้าทัก LINE OA ➡️ AI เช็กตารางคิวว่างจาก Google Sheets และคุยรับจองคิวให้อัตโนมัติ",
      "ลงตารางนัดหมายใน Google Sheets ทันที ป้องกันคิวชนหรือรับคิวซ้ำซ้อน 100%",
      "ส่งข้อความแจ้งเตือนเจ้าของร้านเมื่อมีคิวใหม่ และแจ้งเตือนลูกค้าก่อนถึงเวลานัด",
      "เจ้าของร้านเปิด/ปิดวันหยุด หรือขยับคิวใน Google Sheets เองได้ตลอดเวลา",
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   DATA: PRICING PACKAGES
───────────────────────────────────────────────────────────── */

const CARE_PACKAGES = [
  {
    id: "sme-starter",
    name: "SME AI Starter Care",
    tagline: "สำหรับร้านค้าขนาดเล็ก เริ่มต้นมีแอดมิน AI เฝ้าร้าน 24 ชม.",
    setupFee: "3,900 ฿",
    monthlyFee: "990 ฿",
    dailyCost: "เฉลี่ยเพียงวันละ 33 บาท!",
    badge: "🟢 เริ่มต้นคุ้มค่า",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    borderClass: "border-emerald-500/30 hover:border-emerald-400",
    btnClass: "from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950",
    isPopular: false,
    includes: [
      "เลือกติดตั้งระบบ AI 1 ชุด (ชุดขายของ+ตรวจสลิป หรือ ชุดรับจองคิว)",
      "เชื่อมต่อ LINE OA + ตั้งค่าตาราง Google Sheets มาตรฐานพร้อมใช้งาน",
      "ระบบ AI Watchdog (AI คุม AI) เฝ้าระวังระบบล่ม/API หลุด ตลอด 24 ชม.",
      "กู้คืนและซ่อมแซมตาราง Google Sheets ฟรี เมื่อเผลอพิมพ์ผิดหรือทำสูตรพัง",
      "โหมดปลอดภัย: หากลูกค้าถามลึกเรื่องสินค้า AI จะส่งต่อให้เจ้าของร้านตอบเองทันที",
      "ส่งการ์ดรายงานสรุปผลงาน AI เข้า LINE เจ้าของร้านอัตโนมัติทุกสิ้นเดือน",
    ],
  },
  {
    id: "sme-pro",
    name: "SME AI Pro Care (VIP)",
    tagline: "สำหรับร้านค้าขายดี ที่ต้องการทั้งระบบขายของ + จองคิว + ปรับจูนความฉลาดทุกเดือน",
    setupFee: "5,900 ฿",
    monthlyFee: "1,500 ฿",
    dailyCost: "เฉลี่ยเพียงวันละ 50 บาท (ถูกกว่าจ้างแอดมิน 10 เท่า!)",
    badge: "🔥 แนะนำ • คุ้มที่สุดสำหรับร้านค้า",
    badgeClass: "bg-linear-to-r from-amber-500 to-orange-500 text-zinc-950 border-amber-400",
    borderClass: "border-amber-500/60 shadow-[0_0_45px_rgba(245,158,11,0.2)] ring-1 ring-amber-400/40 lg:scale-105",
    btnClass: "from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-zinc-950",
    isPopular: true,
    includes: [
      "ติดตั้งระบบ AI ครบทั้ง 2 ฟีเจอร์ (ตอบแชทขายของ + ตรวจสลิป + รับจองคิว)",
      "เชื่อมต่อ LINE OA + ผูกบัญชี API พร้อมตั้งเพดานงบป้องกันค่าไฟบานปลาย",
      "ระบบ AI Watchdog (AI คุม AI) เฝ้าระวัง 24 ชม. แจ้งเตือนตรงเข้า Telegram ครูอ้นทันทีที่สะดุด",
      "บริการปรับจูนคำสั่ง AI (Prompt Tuning) เดือนละ 2 ครั้ง ให้ตอบลูกค้าเนียนและฉลาดขึ้นเรื่อยๆ",
      "ซ่อมแซมตาราง Google Sheets ด่วนพิเศษ (Priority Rescue) เมื่อข้อมูลรวน",
      "ส่งการ์ดรายงานสรุปผลงาน AI (ยอดสลิป/จำนวนแชท/เวลาที่ประหยัดได้) เข้า LINE ทุกสัปดาห์!",
    ],
  },
];

export function AICaretakerView() {
  // Interactive Simulator State
  const [simScenario, setSimScenario] = useState<"slip" | "handoff" | "watchdog" | "report">("slip");
  const [selectedKit, setSelectedKit] = useState<string>("ชุดที่ 1: แอดมิน AI ขายของ & ตรวจสลิป");

  const getLineUrl = (pkgName: string, setup: string, monthly: string) => {
    const msg = `สวัสดีครับครูอ้น สนใจบริการ "🛡️ รับติดตั้ง & เฝ้าดูแลระบบ AI รายเดือน (AI Caretaker)" ครับ
📦 แพ็กเกจ: ${pkgName} (ค่าติดตั้ง ${setup} | ดูแลรายเดือน ${monthly}/เดือน)
🎯 ระบบที่สนใจ: ${selectedKit}

รบกวนขอคำปรึกษาและรายละเอียดการเริ่มต้นใช้งานด้วยครับ 🙏`;
    return `https://line.me/R/oaMessage/@deu6776s/?${encodeURIComponent(msg)}`;
  };

  return (
    <div className="w-full min-h-screen text-white overflow-hidden relative pb-28 font-prompt">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[650px] h-[550px] bg-emerald-600/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-cyan-600/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-[600px] h-[600px] bg-amber-600/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 relative z-10">

        {/* ── 1. HERO SECTION ─────────────────────────────────────── */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-prompt text-xs sm:text-sm font-bold tracking-wide shadow-[0_0_25px_rgba(16,185,129,0.25)]"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>NEW! AI CARETAKER &amp; 24/7 WATCHDOG SERVICE FOR SMEs</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-prompt text-3xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            อยากใช้ AI แต่กลัวทำพัง?{" "}
            <span className="block mt-2 text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-cyan-300 to-amber-300 drop-shadow-[0_0_35px_rgba(16,185,129,0.35)]">
              เราเซตระบบให้ + เฝ้าดูแล AI ให้ทุกเดือน!
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-prompt text-base sm:text-lg text-white/70 leading-relaxed max-w-3xl mx-auto"
          >
            บริการใหม่สำหรับ <strong className="text-white">พ่อค้าแม่ค้า &amp; ร้านค้าทั่วไป</strong> ที่อยากมีแอดมิน AI ตอบแชท ตรวจสลิป และรับจองคิว 24 ชม. โดยไม่ต้องปวดหัวเรื่องเทคนิค เพราะเรามีระบบ <strong className="text-emerald-300">&ldquo;AI คุม AI (Watchdog)&rdquo;</strong> และครูอ้นคอยดูแลแก้ปัญหาให้ตลอด 24 ชม. <span className="text-amber-300 font-bold">เริ่มต้นแค่วันละ 33 บาท!</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-3"
          >
            <a
              href="#packages"
              className="px-8 py-4 rounded-2xl bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-zinc-950 font-prompt font-black text-base flex items-center gap-2.5 shadow-[0_0_35px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-105"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>ดูแพ็กเกจติดตั้ง &amp; ดูแลรายเดือน</span>
            </a>

            <a
              href="#simulator"
              className="px-8 py-4 rounded-2xl bg-white/5 border border-white/15 hover:border-cyan-400/40 hover:bg-white/10 text-white font-prompt font-semibold text-base flex items-center gap-2 transition-all"
            >
              <Bot className="w-5 h-5 text-cyan-400" />
              <span>จำลองการทำงาน &ldquo;AI เฝ้า AI&rdquo;</span>
            </a>
          </motion.div>
        </div>

        {/* ── 2. WHY SMEs NEED AN AI CARETAKER (3 ปัญหาใหญ่ที่พ่อค้าแม่ค้าเจอ) ── */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="font-prompt text-2xl sm:text-3xl font-extrabold text-white">
              ทำไมพ่อค้าแม่ค้าใช้ AI เองแล้วมักจะ <span className="text-rose-400">&ldquo;ไปต่อไม่รอด&rdquo;?</span>
            </h2>
            <p className="font-prompt text-sm text-white/60">
              AI ไม่ใช่ตั้งค่าครั้งเดียวแล้วจบ นี่คือ 3 ปัญหาจริงที่ทีมครูอ้นรับจบดูแลแทนคุณทั้งหมด
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: AlertTriangle,
                problem: "1. เผลอพิมพ์แก้ตารางผิด ระบบรวนทันที",
                solution: "คุณแก้ราคา/สินค้าใน Google Sheets เองได้สบายใจ ถ้าเผลอลบคอลัมน์หรือทำสูตรพัง ระบบ AI Watchdog ของครูอ้นจะตรวจเจอและกู้คืนให้ทันที!",
                color: "border-rose-500/30 bg-rose-950/15",
                badge: "เรามีระบบกู้คืนตารางให้",
              },
              {
                icon: HelpCircle,
                problem: "2. กลัว AI ตอบมั่วเรื่องสินค้าที่ไม่มีในตาราง",
                solution: "เราตั้งกฎเหล็ก 'โหมดปลอดภัย' ถ้าลูกค้าถามลึกนอกเหนือจากในตาราง AI จะตอบสุภาพแล้วเด้งแจ้งเตือนเข้า LINE ให้เจ้าของร้านมาคุยเอง ไม่มั่วข้อมูล 100%",
                color: "border-amber-500/30 bg-amber-950/15",
                badge: "ส่งต่อเจ้าของร้านอัตโนมัติ",
              },
              {
                icon: RefreshCw,
                problem: "3. ระบบค้าง / Token หลุดตอนดึก ไม่มีคนซ่อม",
                solution: "เราใช้ 'AI คุม AI' คอยเช็กชีพจรระบบทุกชั่วโมง ถ้า API สะดุด ระบบจะรีเซ็ตตัวเองอัตโนมัติ และเด้งเข้า Telegram มือถือครูอ้นเพื่อเข้าแก้ไขทันที",
                color: "border-cyan-500/30 bg-cyan-950/15",
                badge: "AI Watchdog เฝ้า 24 ชม.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`p-7 rounded-3xl border ${item.color} flex flex-col justify-between space-y-4`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-white/10 text-white">
                        <Icon className="w-6 h-6 text-amber-400" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-prompt font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        ✓ {item.badge}
                      </span>
                    </div>
                    <h3 className="font-prompt text-lg font-bold text-white">{item.problem}</h3>
                    <p className="font-prompt text-xs sm:text-sm text-white/70 leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 3. INTERACTIVE SIMULATOR: ดูระบบ "AI คุม AI" ทำงานจริง ── */}
        <div id="simulator" className="mb-24 max-w-5xl mx-auto rounded-3xl border border-emerald-500/30 bg-slate-900/85 p-6 sm:p-10 shadow-[0_0_60px_rgba(16,185,129,0.15)] relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-prompt font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>LIVE ARCHITECTURE SIMULATOR</span>
            </div>
            <h3 className="font-prompt text-2xl sm:text-3xl font-extrabold text-white">
              ลองกดดูว่า <span className="text-emerald-400">&ldquo;ระบบเฝ้า AI ของครูอ้น&rdquo;</span> ทำงานอย่างไร?
            </h3>
            <p className="font-prompt text-xs sm:text-sm text-white/60">
              คลิกเลือกสถานการณ์ด้านล่าง เพื่อดูการทำงานร่วมกันระหว่าง AI ประจำร้าน, เจ้าของร้าน และครูอ้น
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {[
              { id: "slip", label: "1. ลูกค้าสั่งของ/ส่งสลิป", icon: Receipt },
              { id: "handoff", label: "2. ลูกค้าถามลึกเรื่องสินค้า", icon: UserCheck },
              { id: "watchdog", label: "3. ระบบสะดุด / ตารางพัง", icon: ShieldCheck },
              { id: "report", label: "4. รายงานสรุปทุกสัปดาห์", icon: BarChart3 },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const active = simScenario === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSimScenario(tab.id as "slip" | "handoff" | "watchdog" | "report")}
                  className={`p-3.5 rounded-2xl border font-prompt text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    active
                      ? "bg-emerald-500 text-zinc-950 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                      : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <TabIcon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Scenario Display Screen */}
          <AnimatePresence mode="wait">
            <motion.div
              key={simScenario}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl bg-black/60 border border-white/10 p-6 sm:p-8"
            >
              {simScenario === "slip" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-xs font-prompt font-bold text-cyan-400">💬 ฝั่งลูกค้า (ใน LINE ร้าน)</span>
                    <p className="font-prompt text-xs text-white/80">&ldquo;รับเซตโปรโมชัน A ค่ะ โอนเงินแล้วนะคะ (แนบรูปสลิป 590 บาท)&rdquo;</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
                    <span className="text-xs font-prompt font-bold text-emerald-300">🤖 แอดมิน AI ประจำร้าน (ทำงานใน 2 วิ)</span>
                    <p className="font-prompt text-xs text-white/90">✓ เช็กราคาจาก Google Sheets<br />✓ Gemini AI ตรวจสลิปแท้ + ยอดตรง 590฿<br />✓ บันทึกออเดอร์ลงตารางอัตโนมัติ</p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                    <span className="text-xs font-prompt font-bold text-amber-300">📱 แจ้งเตือนเจ้าของร้าน</span>
                    <p className="font-prompt text-xs text-white/80">&ldquo;🎉 มีออเดอร์ใหม่ชำระเงินแล้ว 590 ฿ (ตรวจสลิปผ่าน 100%) เตรียมจัดส่งได้เลยครับ!&rdquo;</p>
                  </div>
                </div>
              )}

              {simScenario === "handoff" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-xs font-prompt font-bold text-cyan-400">💬 ฝั่งลูกค้าถามนอกตาราง</span>
                    <p className="font-prompt text-xs text-white/80">&ldquo;ตัวนี้ถ้าคนแพ้ถั่วเหลืองทานได้ไหมคะ แล้วสั่งทำไซส์พิเศษได้ไหม?&rdquo;</p>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 space-y-2">
                    <span className="text-xs font-prompt font-bold text-purple-300">🛡️ ท่าที่ 1: โหมดปลอดภัย (ไม่มั่วข้อมูล)</span>
                    <p className="font-prompt text-xs text-white/90">AI ตอบลูกค้าอย่างสุภาพ: &ldquo;สำหรับรายละเอียดเชิงลึกข้อนี้ ขออนุญาตให้เจ้าของร้านมาตอบให้โดยตรงอีกสักครู่นะคะ 🙏&rdquo;</p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                    <span className="text-xs font-prompt font-bold text-amber-300">📲 เด้งเรียกเจ้าของร้านทันที</span>
                    <p className="font-prompt text-xs text-white/80">ส่ง LINE เตือนเจ้าของร้านให้เข้ามาตอบคำถามเฉพาะทางของร้านตัวเอง (ไม่ต้องกลัว AI ตอบมั่ว!)</p>
                  </div>
                </div>
              )}

              {simScenario === "watchdog" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-2">
                    <span className="text-xs font-prompt font-bold text-rose-300">🚨 เกิดปัญหาเทคนิค (ตี 1)</span>
                    <p className="font-prompt text-xs text-white/80">เจ้าของร้านเผลอลบหัวคอลัมน์ราคาใน Google Sheets หรือระบบเชื่อมต่อ API สะดุด</p>
                  </div>
                  <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 space-y-2">
                    <span className="text-xs font-prompt font-bold text-cyan-300">🤖 ท่าที่ 2: AI Watchdog (AI คุม AI)</span>
                    <p className="font-prompt text-xs text-white/90">ตรวจพบความผิดปกติอัตโนมัติ ➡️ สั่งสลับใช้โครงสร้างสำรองทันที และยิงสัญญาณเข้า Telegram ครูอ้น</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
                    <span className="text-xs font-prompt font-bold text-emerald-300">👨‍🔧 ครูอ้นซ่อมให้เรียบร้อย</span>
                    <p className="font-prompt text-xs text-white/80">ครูอ้นกดกู้คืนตารางและรีเซ็ตระบบให้กลับมาวิ่ง 100% โดยที่เจ้าของร้านไม่ต้องปวดหัวหาช่างเอง!</p>
                  </div>
                </div>
              )}

              {simScenario === "report" && (
                <div className="max-w-xl mx-auto p-6 rounded-2xl bg-linear-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-prompt text-sm font-bold text-emerald-300 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" /> ตัวอย่างการ์ดรายงานส่งเข้า LINE เจ้าของร้านอัตโนมัติ
                    </span>
                    <span className="text-[11px] font-prompt bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full">
                      ทุกสัปดาห์ / สิ้นเดือน
                    </span>
                  </div>
                  <div className="font-prompt text-xs sm:text-sm text-white/90 space-y-1.5 leading-relaxed">
                    <p className="font-bold text-white">📊 สรุปผลงานแอดมิน AI ประจำร้านของคุณ (ดูแลโดย ครูอ้น AiAon Tech)</p>
                    <p>✅ <strong>AI ช่วยตอบแชทลูกค้าทั้งหมด:</strong> 482 ครั้ง (ประหยัดเวลาคุณไป ~16 ชั่วโมง)</p>
                    <p>🧾 <strong>ตรวจสลิปโอนเงินแท้ / รับจองคิวสำเร็จ:</strong> 94 รายการ (ยอดรวม 48,500 บาท)</p>
                    <p>🛡️ <strong>สถานะสุขภาพระบบ (AI Watchdog):</strong> ปกติ 100% (ช่วยซ่อมการเชื่อมต่ออัตโนมัติ 2 ครั้ง)</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── 4. 2 STARTER KITS ("บ้านหลังเล็ก" 2 ชุดมาตรฐาน) ──────── */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="font-prompt text-2xl sm:text-4xl font-extrabold text-white">
              เลือกระบบ <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400">&ldquo;บ้านหลังเล็ก&rdquo;</span> ที่ตรงกับร้านของคุณ
            </h2>
            <p className="font-prompt text-sm text-white/60">
              สร้างบนโครงสร้างมาตรฐาน LINE OA + Google Sheets + Gemini AI ที่เสถียรและดูแลง่ายที่สุด
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {STARTER_KITS.map((kit) => {
              const Icon = kit.icon;
              return (
                <div
                  key={kit.id}
                  className={`rounded-3xl p-8 bg-slate-900/70 border transition-all flex flex-col justify-between ${kit.borderClass}`}
                >
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-prompt font-bold mb-4">
                      {kit.badge}
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3.5 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 shrink-0">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-prompt text-xl sm:text-2xl font-extrabold text-white">{kit.title}</h3>
                        <p className="font-prompt text-xs text-cyan-300 mt-0.5">{kit.subtitle}</p>
                      </div>
                    </div>

                    <p className="font-prompt text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3.5 py-2 mb-6">
                      🎯 {kit.target}
                    </p>

                    <ul className="space-y-3 mb-6">
                      {kit.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 font-prompt text-xs sm:text-sm text-white/80 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-prompt text-white/60">
                    <span>✓ แก้ข้อมูลเองใน Google Sheets ได้</span>
                    <span className="text-emerald-400 font-bold">✓ มี AI Watchdog เฝ้า 24 ชม.</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 5. PRICING & MONTHLY RETAINER PACKAGES ───────────────── */}
        <div id="packages" className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-prompt font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TRANSPARENT SME PRICING</span>
            </div>
            <h2 className="font-prompt text-3xl sm:text-4xl font-extrabold text-white">
              แพ็กเกจติดตั้ง &amp; <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-emerald-400">เฝ้าดูแลระบบ AI รายเดือน</span>
            </h2>
            <p className="font-prompt text-sm text-white/60">
              แยกค่าบริการชัดเจน ร้านค้าจ่ายค่าไฟ (API) ตามจริงของตัวเอง (ครูอ้นช่วยผูกและล็อกเพดานงบให้ปลอดภัย 100%)
            </p>
          </div>

          {/* Selector for which Kit before clicking LINE */}
          <div className="max-w-xl mx-auto mb-10 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-prompt text-xs sm:text-sm text-white/80 font-medium">เลือกระบบที่ต้องการให้ครูอ้นดูแล:</span>
            <select
              value={selectedKit}
              onChange={(e) => setSelectedKit(e.target.value)}
              className="w-full sm:w-auto bg-slate-900 border border-emerald-500/40 rounded-xl px-3.5 py-2 font-prompt text-xs text-emerald-300 font-bold outline-none"
            >
              <option value="ชุดที่ 1: แอดมิน AI ขายของ & ตรวจสลิป">🛍️ ชุดที่ 1: ขายของ &amp; ตรวจสลิปอัตโนมัติ</option>
              <option value="ชุดที่ 2: แอดมิน AI รับจองคิว & นัดหมาย">📅 ชุดที่ 2: รับจองคิว &amp; นัดหมายอัตโนมัติ</option>
              <option value="ทั้ง 2 ชุด (ขายของ+ตรวจสลิป + รับจองคิว)">🔥 เหมาทั้ง 2 ชุด (ขายของ + รับจองคิว)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            {CARE_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-8 bg-slate-900/75 border flex flex-col justify-between transition-all ${pkg.borderClass}`}
              >
                <div className={` -top-3.5 left-6 absolute px-4 py-1 rounded-full text-xs font-prompt font-bold border shadow-md ${pkg.badgeClass}`}>
                  {pkg.badge}
                </div>

                <div>
                  <h3 className="font-prompt text-2xl font-extrabold text-white mt-2">{pkg.name}</h3>
                  <p className="font-prompt text-xs text-white/60 mt-1 mb-6">{pkg.tagline}</p>

                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-black/50 border border-white/10 mb-3">
                    <div>
                      <span className="block font-prompt text-[11px] text-white/50">ค่าติดตั้งระบบแรกเข้า (ครั้งเดียว)</span>
                      <span className="font-prompt text-2xl sm:text-3xl font-black text-white">{pkg.setupFee}</span>
                    </div>
                    <div className="border-l border-white/10 pl-4">
                      <span className="block font-prompt text-[11px] text-emerald-300">ค่าเฝ้าดูแลระบบรายเดือน</span>
                      <span className="font-prompt text-2xl sm:text-3xl font-black text-emerald-400">{pkg.monthlyFee}</span>
                      <span className="font-prompt text-[11px] text-white/50"> / เดือน</span>
                    </div>
                  </div>

                  <p className="font-prompt text-xs font-bold text-amber-300 mb-6 flex items-center gap-1.5">
                    <Zap className="w-4 h-4" /> {pkg.dailyCost}
                  </p>

                  <div className="space-y-3 border-t border-white/10 pt-6 mb-8">
                    <p className="font-prompt text-xs font-bold text-white/50 uppercase tracking-wider">สิ่งที่คุณได้รับทุกเดือน:</p>
                    {pkg.includes.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2.5 font-prompt text-xs sm:text-sm text-white/85">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <a
                    href={getLineUrl(pkg.name, pkg.setupFee, pkg.monthlyFee)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 px-6 rounded-2xl font-prompt font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] bg-linear-to-r ${pkg.btnClass}`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>สมัครแพ็กเกจนี้ / ปรึกษาครูอ้นทาง LINE</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <p className="text-[11px] font-prompt text-center text-white/40">
                    *ไม่มีสัญญาผูกมัดรายปี ยกเลิกเมื่อไหร่ก็ได้ โค้ดและตาราง Google Sheets เป็นสิทธิ์ของร้านคุณ 100%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 6. DIY VS AI CARETAKER LINK ──────────────────────────── */}
        <div className="max-w-4xl mx-auto rounded-3xl p-8 border border-white/10 bg-white/5 text-center space-y-4">
          <h3 className="font-prompt text-xl font-bold text-white">
            💡 ถ้าคุณพอมีพื้นฐานไอที และอยากซื้อเฉพาะโค้ดไปติดตั้งเอง (ไม่มีรายเดือน)?
          </h3>
          <p className="font-prompt text-xs sm:text-sm text-white/60 max-w-2xl mx-auto">
            เรามีคลังระบบสำเร็จรูป Google Apps Script กว่า 25 ระบบ พร้อมคู่มือติดตั้งเสร็จใน 2 นาที จ่ายครั้งเดียวจบ เริ่มต้นเพียง 390 บาท!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/digital-vault"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-prompt text-xs sm:text-sm font-bold transition-all"
            >
              📦 ดูคลังโค้ดติดตั้งเอง (Digital Vault)
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30 hover:bg-cyan-500/30 text-cyan-300 font-prompt text-xs sm:text-sm font-bold transition-all"
            >
              🛠️ บริการสั่งทำระบบเฉพาะทางสำหรับโรงเรียน
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

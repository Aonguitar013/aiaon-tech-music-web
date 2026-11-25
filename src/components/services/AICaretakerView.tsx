"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Bot, Sparkles, MessageCircle, ArrowRight,
  CheckCircle2, AlertTriangle, RefreshCw,
  Receipt, CalendarCheck, BarChart3,
  Zap, HelpCircle, UserCheck, Eye
} from "lucide-react";
import Link from "next/link";
import { CyberSentinelOrbMockup } from "./CyberSentinelOrbMockup";
import { AICaretakerDetailSection } from "./AICaretakerDetailSection";
import { AI_CARETAKER_PACKAGES_DATA, AICaretakerPackageItem } from "./aiCaretakerDataHelper";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { getLineOrderUrl } from "@/lib/line";

const STARTER_KITS = [
  {
    id: "kit-shop",
    badge: "🛍️ ชุดที่ 1 • ขายดีที่สุดสำหรับร้านออนไลน์",
    title: "แอดมิน AI ขายของ & ตรวจสลิปอัตโนมัติ",
    subtitle: "Smart Shop & Auto-Slip Verifier (LINE OA + Google Sheets)",
    target: "เหมาะสำหรับ: ร้านขายเสื้อผ้า, ร้านอาหาร/ขนม, พรีออเดอร์, ร้านค้าออนไลน์ทั่วไป",
    icon: Receipt,
    borderClass: "border-[#E2E8F0] hover:border-[#2563EB]/50",
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
    borderClass: "border-[#E2E8F0] hover:border-[#7C3AED]/50",
    features: [
      "ลูกค้าทัก LINE OA ➡️ AI เช็กตารางคิวว่างจาก Google Sheets และคุยรับจองคิวให้อัตโนมัติ",
      "ลงตารางนัดหมายใน Google Sheets ทันที ป้องกันคิวชนหรือรับคิวซ้ำซ้อน 100%",
      "ส่งข้อความแจ้งเตือนเจ้าของร้านเมื่อมีคิวใหม่ และแจ้งเตือนลูกค้าก่อนถึงเวลานัด",
      "เจ้าของร้านเปิด/ปิดวันหยุด หรือขยับคิวใน Google Sheets เองได้ตลอดเวลา",
    ],
  },
];

export function AICaretakerView() {
  const [simScenario, setSimScenario] = useState<"slip" | "handoff" | "watchdog" | "report">("slip");
  const [selectedKit, setSelectedKit] = useState<string>("ชุดที่ 1: แอดมิน AI ขายของ & ตรวจสลิป");
  const [selectedPackage, setSelectedPackage] = useState<AICaretakerPackageItem | null>(null);

  const { openLineModal } = useLineModal();

  const handleLineClick = (e: React.MouseEvent, pkg: AICaretakerPackageItem) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: `บริการ: ${pkg.name}`,
        price: `${pkg.setupFeeText} + ${pkg.monthlyFeeText}`,
        message: `สวัสดีครับครูอ้น สนใจบริการ "🛡️ รับติดตั้ง & เฝ้าดูแลระบบ AI รายเดือน (AI Caretaker)" ครับ\n📦 แพ็กเกจ: ${pkg.name} (ค่าติดตั้ง ${pkg.setupFeeText} | ดูแลรายเดือน ${pkg.monthlyFeeText})\n🎯 ระบบที่สนใจ: ${selectedKit}\n\nรบกวนขอคำปรึกษาและรายละเอียดการเริ่มต้นใช้งานด้วยครับ 🙏`,
      });
    }
  };

  const getLineUrl = (pkgName: string, setup: string, monthly: string) => {
    const msg = `สวัสดีครับครูอ้น สนใจบริการ "🛡️ รับติดตั้ง & เฝ้าดูแลระบบ AI รายเดือน (AI Caretaker)" ครับ
📦 แพ็กเกจ: ${pkgName} (ค่าติดตั้ง ${setup} | ดูแลรายเดือน ${monthly}/เดือน)
🎯 ระบบที่สนใจ: ${selectedKit}

รบกวนขอคำปรึกษาและรายละเอียดการเริ่มต้นใช้งานด้วยครับ 🙏`;
    return getLineOrderUrl(msg);
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-[#1E293B] overflow-hidden relative pb-28 font-prompt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 relative z-10">

        {/* ── 1. HERO SECTION ─────────────────────────────────────── */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 font-prompt text-xs sm:text-sm font-bold tracking-wide"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>NEW! AI CARETAKER &amp; 24/7 WATCHDOG SERVICE FOR SMEs</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-prompt text-3xl sm:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-tight"
          >
            อยากใช้ AI แต่กลัวทำพัง?{" "}
            <span className="block mt-2 text-[#0F766E]">
              เราเซตระบบให้ + เฝ้าดูแล AI ให้ทุกเดือน!
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-prompt text-base sm:text-lg text-[#475569] leading-relaxed max-w-3xl mx-auto"
          >
            บริการใหม่สำหรับ <strong className="text-[#0F172A]">พ่อค้าแม่ค้า &amp; ร้านค้าทั่วไป</strong> ที่อยากมีแอดมิน AI ตอบแชท ตรวจสลิป และรับจองคิว 24 ชม. โดยไม่ต้องปวดหัวเรื่องเทคนิค เพราะเรามีระบบ <strong className="text-[#0F766E]">&ldquo;AI คุม AI (Watchdog)&rdquo;</strong> และครูอ้นคอยดูแลแก้ปัญหาให้ตลอด 24 ชม. <span className="text-[#B45309] font-bold">เริ่มต้นแค่วันละ 33 บาท!</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-3"
          >
            <a
              href="#packages"
              className="px-8 py-4 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-prompt font-black text-base flex items-center gap-2.5 shadow-sm transition-all duration-300 hover:scale-105"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>ดูแพ็กเกจติดตั้ง &amp; ดูแลรายเดือน</span>
            </a>

            <a
              href="#simulator"
              className="px-8 py-4 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#EFF6FF] text-[#0F172A] font-prompt font-semibold text-base flex items-center gap-2 transition-all shadow-2xs"
            >
              <Bot className="w-5 h-5 text-[#2563EB]" />
              <span>จำลองการทำงาน &ldquo;AI เฝ้า AI&rdquo;</span>
            </a>
          </motion.div>
        </div>

        {/* ── 2. WHY SMEs NEED AN AI CARETAKER ── */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="font-prompt text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              ทำไมพ่อค้าแม่ค้าใช้ AI เองแล้วมักจะ <span className="text-rose-600">&ldquo;ไปต่อไม่รอด&rdquo;?</span>
            </h2>
            <p className="font-prompt text-sm text-[#475569]">
              AI ไม่ใช่ตั้งค่าครั้งเดียวแล้วจบ นี่คือ 3 ปัญหาจริงที่ทีมครูอ้นรับจบดูแลแทนคุณทั้งหมด
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: AlertTriangle,
                problem: "1. เผลอพิมพ์แก้ตารางผิด ระบบรวนทันที",
                solution: "คุณแก้ราคา/สินค้าใน Google Sheets เองได้สบายใจ ถ้าเผลอลบคอลัมน์หรือทำสูตรพัง ระบบ AI Watchdog ของครูอ้นจะตรวจเจอและกู้คืนให้ทันที!",
                iconBg: "bg-rose-50 border-rose-200 text-rose-600",
                badge: "เรามีระบบกู้คืนตารางให้",
              },
              {
                icon: HelpCircle,
                problem: "2. กลัว AI ตอบมั่วเรื่องสินค้าที่ไม่มีในตาราง",
                solution: "เราตั้งกฎเหล็ก 'โหมดปลอดภัย' ถ้าลูกค้าถามลึกนอกเหนือจากในตาราง AI จะตอบสุภาพแล้วเด้งแจ้งเตือนเข้า LINE ให้เจ้าของร้านมาคุยเอง ไม่มั่วข้อมูล 100%",
                iconBg: "bg-amber-50 border-amber-200 text-amber-600",
                badge: "ส่งต่อเจ้าของร้านอัตโนมัติ",
              },
              {
                icon: RefreshCw,
                problem: "3. ระบบค้าง / Token หลุดตอนดึก ไม่มีคนซ่อม",
                solution: "เราใช้ 'AI คุม AI' คอยเช็กชีพจรระบบทุกชั่วโมง ถ้า API สะดุด ระบบจะรีเซ็ตตัวเองอัตโนมัติ และเด้งเข้า Telegram มือถือครูอ้นเพื่อเข้าแก้ไขทันที",
                iconBg: "bg-cyan-50 border-cyan-200 text-cyan-700",
                badge: "AI Watchdog เฝ้า 24 ชม.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-7 rounded-3xl border border-[#E2E8F0] bg-white shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className={`p-3 rounded-2xl border ${item.iconBg}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-prompt font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        ✓ {item.badge}
                      </span>
                    </div>
                    <h3 className="font-prompt text-lg font-bold text-[#0F172A]">{item.problem}</h3>
                    <p className="font-prompt text-xs sm:text-sm text-[#475569] leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 3. INTERACTIVE SIMULATOR ── */}
        <div id="simulator" className="mb-20 max-w-5xl mx-auto rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-prompt font-bold">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>LIVE ARCHITECTURE SIMULATOR</span>
            </div>
            <h3 className="font-prompt text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              ลองกดดูว่า <span className="text-[#0F766E]">&ldquo;ระบบเฝ้า AI ของครูอ้น&rdquo;</span> ทำงานอย่างไร?
            </h3>
            <p className="font-prompt text-xs sm:text-sm text-[#475569]">
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
                      ? "bg-[#06C755] text-[#052E16] border-[#059669] shadow-xs"
                      : "bg-[#FAF8F5] text-[#475569] border-[#E2E8F0] hover:bg-[#F1ECE4] hover:text-[#0F172A]"
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
              className="rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] p-6 sm:p-8"
            >
              {simScenario === "slip" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                  <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2">
                    <span className="text-xs font-prompt font-bold text-[#0E7490]">💬 ฝั่งลูกค้า (ใน LINE ร้าน)</span>
                    <p className="font-prompt text-xs text-[#334155]">&ldquo;รับเซตโปรโมชัน A ค่ะ โอนเงินแล้วนะคะ (แนบรูปสลิป 590 บาท)&rdquo;</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <span className="text-xs font-prompt font-bold text-emerald-800">🤖 แอดมิน AI ประจำร้าน (ทำงานใน 2 วิ)</span>
                    <p className="font-prompt text-xs text-[#1E293B]">✓ เช็กราคาจาก Google Sheets<br />✓ Gemini AI ตรวจสลิปแท้ + ยอดตรง 590฿<br />✓ บันทึกออเดอร์ลงตารางอัตโนมัติ</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FEF9EF] border border-[#FDE68A] space-y-2">
                    <span className="text-xs font-prompt font-bold text-[#92400E]">📱 แจ้งเตือนเจ้าของร้าน</span>
                    <p className="font-prompt text-xs text-[#334155]">&ldquo;🎉 มีออเดอร์ใหม่ชำระเงินแล้ว 590 ฿ (ตรวจสลิปผ่าน 100%) เตรียมจัดส่งได้เลยครับ!&rdquo;</p>
                  </div>
                </div>
              )}

              {simScenario === "handoff" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                  <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2">
                    <span className="text-xs font-prompt font-bold text-[#0E7490]">💬 ฝั่งลูกค้าถามนอกตาราง</span>
                    <p className="font-prompt text-xs text-[#334155]">&ldquo;ตัวนี้ถ้าคนแพ้ถั่วเหลืองทานได้ไหมคะ แล้วสั่งทำไซส์พิเศษได้ไหม?&rdquo;</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE] space-y-2">
                    <span className="text-xs font-prompt font-bold text-[#6D28D9]">🛡️ ท่าที่ 1: โหมดปลอดภัย (ไม่มั่วข้อมูล)</span>
                    <p className="font-prompt text-xs text-[#1E293B]">AI ตอบลูกค้าอย่างสุภาพ: &ldquo;สำหรับรายละเอียดเชิงลึกข้อนี้ ขออนุญาตให้เจ้าของร้านมาตอบให้โดยตรงอีกสักครู่นะคะ 🙏&rdquo;</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FEF9EF] border border-[#FDE68A] space-y-2">
                    <span className="text-xs font-prompt font-bold text-[#92400E]">📲 เด้งเรียกเจ้าของร้านทันที</span>
                    <p className="font-prompt text-xs text-[#334155]">ส่ง LINE เตือนเจ้าของร้านให้เข้ามาตอบคำถามเฉพาะทางของร้านตัวเอง (ไม่ต้องกลัว AI ตอบมั่ว!)</p>
                  </div>
                </div>
              )}

              {simScenario === "watchdog" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
                    <span className="text-xs font-prompt font-bold text-rose-700">🚨 เกิดปัญหาเทคนิค (ตี 1)</span>
                    <p className="font-prompt text-xs text-[#334155]">เจ้าของร้านเผลอลบหัวคอลัมน์ราคาใน Google Sheets หรือระบบเชื่อมต่อ API สะดุด</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] space-y-2">
                    <span className="text-xs font-prompt font-bold text-[#1D4ED8]">🤖 ท่าที่ 2: AI Watchdog (AI คุม AI)</span>
                    <p className="font-prompt text-xs text-[#1E293B]">ตรวจพบความผิดปกติอัตโนมัติ ➡️ สั่งสลับใช้โครงสร้างสำรองทันที และยิงสัญญาณเข้า Telegram ครูอ้น</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <span className="text-xs font-prompt font-bold text-emerald-800">👨‍🔧 ครูอ้นซ่อมให้เรียบร้อย</span>
                    <p className="font-prompt text-xs text-[#334155]">ครูอ้นกดกู้คืนตารางและรีเซ็ตระบบให้กลับมาวิ่ง 100% โดยที่เจ้าของร้านไม่ต้องปวดหัวหาช่างเอง!</p>
                  </div>
                </div>
              )}

              {simScenario === "report" && (
                <div className="max-w-xl mx-auto p-6 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3 gap-2">
                    <span className="font-prompt text-sm font-bold text-emerald-800 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-emerald-600" /> ตัวอย่างการ์ดรายงานส่งเข้า LINE เจ้าของร้านอัตโนมัติ
                    </span>
                    <span className="text-[11px] font-prompt bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0">
                      ทุกสัปดาห์ / สิ้นเดือน
                    </span>
                  </div>
                  <div className="font-prompt text-xs sm:text-sm text-[#334155] space-y-1.5 leading-relaxed">
                    <p className="font-bold text-[#0F172A]">📊 สรุปผลงานแอดมิน AI ประจำร้านของคุณ (ดูแลโดย ครูอ้น AiAon Tech)</p>
                    <p>✅ <strong>AI ช่วยตอบแชทลูกค้าทั้งหมด:</strong> 482 ครั้ง (ประหยัดเวลาคุณไป ~16 ชั่วโมง)</p>
                    <p>🧾 <strong>ตรวจสลิปโอนเงินแท้ / รับจองคิวสำเร็จ:</strong> 94 รายการ (ยอดรวม 48,500 บาท)</p>
                    <p>🛡️ <strong>สถานะสุขภาพระบบ (AI Watchdog):</strong> ปกติ 100% (ช่วยซ่อมการเชื่อมต่ออัตโนมัติ 2 ครั้ง)</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── 4. 2 STARTER KITS ──────── */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="font-prompt text-2xl sm:text-4xl font-extrabold text-[#0F172A]">
              เลือกระบบ <span className="text-[#2563EB]">&ldquo;บ้านหลังเล็ก&rdquo;</span> ที่ตรงกับร้านของคุณ
            </h2>
            <p className="font-prompt text-sm text-[#475569]">
              สร้างบนโครงสร้างมาตรฐาน LINE OA + Google Sheets + Gemini AI ที่เสถียรและดูแลง่ายที่สุด
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {STARTER_KITS.map((kit) => {
              const Icon = kit.icon;
              return (
                <div
                  key={kit.id}
                  className={`rounded-3xl p-7 sm:p-8 bg-white border shadow-sm transition-all flex flex-col justify-between ${kit.borderClass}`}
                >
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E2E8F0] text-[#334155] text-xs font-prompt font-bold mb-4">
                      {kit.badge}
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3.5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] shrink-0">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-prompt text-xl sm:text-2xl font-extrabold text-[#0F172A]">{kit.title}</h3>
                        <p className="font-prompt text-xs text-[#0E7490] font-medium mt-0.5">{kit.subtitle}</p>
                      </div>
                    </div>

                    <p className="font-prompt text-xs text-[#92400E] bg-[#FEF9EF] border border-[#FDE68A] rounded-xl px-3.5 py-2 mb-6">
                      🎯 {kit.target}
                    </p>

                    <ul className="space-y-3 mb-6">
                      {kit.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 font-prompt text-xs sm:text-sm text-[#1E293B] leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-1" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-prompt text-[#64748B]">
                    <span>✓ แก้ข้อมูลเองใน Google Sheets ได้</span>
                    <span className="text-[#059669] font-bold">✓ มี AI Watchdog เฝ้า 24 ชม.</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 5. PRICING & MONTHLY RETAINER PACKAGES ───────────────── */}
        <div id="packages" className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF9EF] border border-[#FDE68A] text-[#92400E] text-xs font-prompt font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>TRANSPARENT SME PRICING</span>
            </div>
            <h2 className="font-prompt text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              แพ็กเกจติดตั้ง &amp; <span className="text-[#0F766E]">เฝ้าดูแลระบบ AI รายเดือน</span>
            </h2>
            <p className="font-prompt text-sm text-[#475569]">
              แยกค่าบริการชัดเจน ร้านค้าจ่ายค่าไฟ (API) ตามจริงของตัวเอง (ครูอ้นช่วยผูกและล็อกเพดานงบให้ปลอดภัย 100%)
            </p>
          </div>

          {/* Selector for which Kit before clicking LINE */}
          <div className="max-w-xl mx-auto mb-10 p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-prompt text-xs sm:text-sm text-[#334155] font-semibold">เลือกระบบที่ต้องการให้ครูอ้นดูแล:</span>
            <select
              value={selectedKit}
              onChange={(e) => setSelectedKit(e.target.value)}
              className="w-full sm:w-auto bg-[#FAF8F5] border border-[#CBD5E1] rounded-xl px-3.5 py-2 font-prompt text-xs text-[#0F172A] font-bold outline-none focus:border-[#06C755]"
            >
              <option value="ชุดที่ 1: แอดมิน AI ขายของ & ตรวจสลิป">🛍️ ชุดที่ 1: ขายของ &amp; ตรวจสลิปอัตโนมัติ</option>
              <option value="ชุดที่ 2: แอดมิน AI รับจองคิว & นัดหมาย">📅 ชุดที่ 2: รับจองคิว &amp; นัดหมายอัตโนมัติ</option>
              <option value="ทั้ง 2 ชุด (ขายของ+ตรวจสลิป + รับจองคิว)">🔥 เหมาทั้ง 2 ชุด (ขายของ + รับจองคิว)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            {AI_CARETAKER_PACKAGES_DATA.map((pkg) => {
              const isPro = pkg.id === "sme-pro";
              const borderClass = isPro
                ? "border-amber-400 shadow-md ring-2 ring-amber-400/25 lg:scale-[1.02]"
                : "border-[#E2E8F0] hover:border-emerald-400 shadow-sm";

              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-3xl p-7 sm:p-8 bg-white border flex flex-col justify-between transition-all ${borderClass}`}
                >
                  <div className={`-top-3.5 left-6 absolute px-4 py-1 rounded-full text-xs font-prompt font-bold border shadow-xs ${pkg.badgeClass}`}>
                    {pkg.badge}
                  </div>

                  <div>
                    <div
                      onClick={() => setSelectedPackage(pkg)}
                      className="cursor-pointer mb-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] transform transition-transform hover:scale-[1.02]"
                      title="คลิกเพื่อดูเจาะลึก 7 ข้อก่อนตัดสินใจ"
                    >
                      <CyberSentinelOrbMockup
                        packageId={pkg.id}
                        title={pkg.name}
                        themeColor={pkg.accentColor}
                        isFeatured={pkg.isPopular}
                        size="md"
                        isInteractive={true}
                      />
                    </div>

                    <h3
                      onClick={() => setSelectedPackage(pkg)}
                      className="font-prompt text-2xl font-extrabold text-[#0F172A] mt-1 cursor-pointer hover:text-[#0F766E] transition-colors"
                    >
                      {pkg.name}
                    </h3>
                    <p className="font-prompt text-xs text-[#475569] mt-1 mb-6">{pkg.tagline}</p>

                    <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] mb-3">
                      <div>
                        <span className="block font-prompt text-[11px] text-[#64748B]">ค่าติดตั้งระบบแรกเข้า (ครั้งเดียว)</span>
                        <span className="font-prompt text-2xl sm:text-3xl font-black text-[#0F172A]">{pkg.setupFeeText}</span>
                      </div>
                      <div className="border-l border-[#E2E8F0] pl-4">
                        <span className="block font-prompt text-[11px] text-emerald-700 font-semibold">ค่าเฝ้าดูแลระบบรายเดือน</span>
                        <span className="font-prompt text-2xl sm:text-3xl font-black text-[#059669]">{pkg.monthlyFeeText}</span>
                      </div>
                    </div>

                    <p className="font-prompt text-xs font-bold text-[#B45309] mb-6 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-[#D97706]" /> {pkg.dailyCost}
                    </p>

                    <div className="space-y-3 border-t border-[#F1F5F9] pt-6 mb-8">
                      <p className="font-prompt text-xs font-bold text-[#64748B] uppercase tracking-wider">สิ่งที่คุณได้รับทุกเดือน:</p>
                      {pkg.includes.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2.5 font-prompt text-xs sm:text-sm text-[#1E293B]">
                          <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedPackage(pkg)}
                        className="w-full py-3 px-4 rounded-xl font-prompt font-bold text-xs sm:text-sm flex items-center justify-center gap-2 bg-[#FAF8F5] hover:bg-[#F1ECE4] text-[#0F172A] border border-[#E2E8F0] transition-all active:scale-95 cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-[#2563EB]" />
                        <span>เจาะลึก 7 ข้อ</span>
                      </button>

                      <a
                        href={getLineUrl(pkg.name, pkg.setupFeeText, pkg.monthlyFeeText)}
                        onClick={(e) => handleLineClick(e, pkg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 rounded-xl font-prompt font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.02] active:scale-95 bg-[#06C755] hover:bg-[#05b34c] text-[#052E16]"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>จองคิวทาง LINE</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>

                    <p className="text-[11px] font-prompt text-center text-[#64748B]">
                      *ไม่มีสัญญาผูกมัดรายปี ยกเลิกเมื่อไหร่ก็ได้ โค้ดและตาราง Google Sheets เป็นสิทธิ์ของร้านคุณ 100%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal: 7 Pillars Deep Dive Section */}
        <AnimatePresence>
          {selectedPackage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
              onClick={() => setSelectedPackage(null)}
            >
              <div
                className="w-full max-w-5xl my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <AICaretakerDetailSection
                  packageItem={selectedPackage}
                  onClose={() => setSelectedPackage(null)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 6. DIY VS AI CARETAKER LINK ──────────────────────────── */}
        <div className="max-w-4xl mx-auto rounded-3xl p-8 border border-[#E2E8F0] bg-white shadow-sm text-center space-y-4">
          <h3 className="font-prompt text-xl font-bold text-[#0F172A]">
            💡 ถ้าคุณพอมีพื้นฐานไอที และอยากซื้อเฉพาะโค้ดไปติดตั้งเอง (ไม่มีรายเดือน)?
          </h3>
          <p className="font-prompt text-xs sm:text-sm text-[#475569] max-w-2xl mx-auto">
            เรามีคลังระบบสำเร็จรูป Google Apps Script กว่า 25 ระบบ พร้อมคู่มือติดตั้งเสร็จใน 2 นาที จ่ายครั้งเดียวจบ เริ่มต้นเพียง 390 บาท!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/digital-vault"
              className="px-6 py-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F1ECE4] border border-[#E2E8F0] text-[#0F172A] font-prompt text-xs sm:text-sm font-bold transition-all"
            >
              📦 ดูคลังโค้ดติดตั้งเอง (Digital Vault)
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] hover:bg-[#DBEAFE] text-[#1D4ED8] font-prompt text-xs sm:text-sm font-bold transition-all"
            >
              🛠️ บริการสั่งทำระบบเฉพาะทางสำหรับโรงเรียน
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, } from "framer-motion";
import {
  CheckCircle2, ArrowRight,
  MessageCircle, Cpu, Sparkles, 
  Presentation, Building2, Users,
  Award, ShieldCheck, Zap, 
  Calculator, Check, FileSpreadsheet, QrCode, BellRing, Video
} from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────────────────────── */

interface CustomTier {
  id: string;
  name: string;
  badge?: string;
  badgeColor?: string;
  price: string;
  priceNum: number;
  deliveryDays: string;
  tagline: string;
  description: string;
  features: string[];
  recommendedFor: string;
  borderClass: string;
  btnGradient: string;
  isPopular?: boolean;
}

const CUSTOM_TIERS: CustomTier[] = [
  {
    id: "quick-custom",
    name: "Quick Customization",
    price: "2,490 ฿",
    priceNum: 2490,
    deliveryDays: "3–5 วันทำการ",
    tagline: "ปรับปรุงชีตเดิม & ออกรายงานอัตโนมัติ",
    description: "เหมาะสำหรับโรงเรียนที่มี Google Sheets เดิมอยู่แล้ว แต่อยากเพิ่มปุ่มกดออกรายงาน PDF หรือปรับสูตรให้ทำงานเร็วขึ้น",
    features: [
      "เขียนสคริปต์ Google Apps Script เชื่อมชีตเดิม",
      "สร้างระบบออกเอกสาร PDF หรือบัตรประจำตัวอัตโนมัติ",
      "ทำความสะอาดสูตรและโครงสร้างฐานข้อมูล",
      "ส่งมอบพร้อมวิดีโออธิบายการทำงานสั้นๆ",
      "รับประกันแก้ไขบั๊กฟรี 15 วัน",
    ],
    recommendedFor: "ครูประจำชั้น / ครูงานข้อมูลที่ต้องการแก้ชีตเดิม",
    borderClass: "border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]",
    btnGradient: "from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500",
  },
  {
    id: "full-webapp",
    name: "Full Custom Web App",
    badge: "🔥 ยอดนิยมที่สุด",
    badgeColor: "bg-linear-to-r from-purple-600 to-pink-500 text-white border-purple-400/40",
    price: "5,900 ฿",
    priceNum: 5900,
    deliveryDays: "7–10 วันทำการ",
    tagline: "ระบบเว็บแอปเต็มรูปแบบ + LINE แจ้งเตือน",
    description: "พัฒนาระบบใหม่ตั้งแต่ศูนย์ มีหน้าเว็บ UI สวยงาม รองรับมือถือและแท็บเล็ต พร้อมแจ้งเตือน LINE อัตโนมัติ",
    features: [
      "ออกแบบหน้าเว็บ Web App เฉพาะตามอัตลักษณ์โรงเรียน",
      "ระบบฐานข้อมูล Google Sheets ปลอดภัย 100%",
      "ระบบแจ้งเตือน LINE Notify / LINE OA ผู้ปกครองหรือครู",
      "ระบบสแกน QR Code / ตรวจสอบข้อมูลรายบุคคล",
      "คู่มือการใช้งาน + คลิปสอน + ดูแลระบบ 30 วัน",
    ],
    recommendedFor: "ฝ่ายวิชาการ / ฝ่ายกิจการนักเรียน / งานยานพาหนะ",
    borderClass: "border-purple-500/60 shadow-[0_0_40px_rgba(168,85,247,0.25)] scale-[1.02] ring-1 ring-purple-400/40",
    btnGradient: "from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-pink-500",
    isPopular: true,
  },
  {
    id: "school-suite",
    name: "School Enterprise Suite",
    badge: "👑 โซลูชันระดับโรงเรียน",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    price: "15,900 ฿",
    priceNum: 15900,
    deliveryDays: "14–20 วันทำการ",
    tagline: "ระบบรวมศูนย์ครบวงจรทั้งองค์กร + อบรมครู",
    description: "ออกแบบระบบรวมศูนย์หลายฝ่ายงาน เชื่อมต่อข้อมูลทั้งโรงเรียน พร้อมบริการจัดอบรมครูและจัดทำหนังสือราชการครบชุด",
    features: [
      "พัฒนาระบบ Multi-Module (เช่น เช็คชื่อ + พฤติกรรม + บริหาร)",
      "สิทธิ์แอดมินแยกตามกลุ่มสาระ / ระดับชั้น / ฝ่ายงาน",
      "Dashboard สรุปผลภาพรวมสำหรับผู้บริหารแบบ Real-time",
      "จัดอบรมการใช้งานให้ทีมครูผ่าน Online / On-site 1 รอบ",
      "ออกหนังสือเสนอราคา / ใบเสร็จรับเงินถูกต้องตามระบบราชการ",
      "ดูแลและซัพพอร์ตระบบ VIP ตลอด 1 ภาคเรียน",
    ],
    recommendedFor: "โรงเรียน, สถานศึกษา, วิทยาลัย หรือกลุ่มสาระใหญ่",
    borderClass: "border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]",
    btnGradient: "from-amber-500 via-orange-500 to-yellow-400 hover:from-amber-400 hover:to-orange-400 text-zinc-950",
  },
];

/* ─────────────────────────────────────────────────────────────
   ESTIMATOR CALCULATOR OPTIONS
───────────────────────────────────────────────────────────── */

interface SystemTypeOption {
  id: string;
  name: string;
  price: number;
  icon: React.ElementType;
  description: string;
}

const SYSTEM_TYPES: SystemTypeOption[] = [
  {
    id: "attendance",
    name: "ระบบงานนักเรียน & เช็คชื่อ (Attendance)",
    price: 2900,
    icon: Users,
    description: "เช็คชื่อเข้าแถว/รายคาบ, ตรวจเครื่องแต่งกาย, พฤติกรรม",
  },
  {
    id: "admin-assets",
    name: "ระบบงานบริหาร / พัสดุ / ยานพาหนะ",
    price: 3500,
    icon: Building2,
    description: "คุมรถโรงเรียน, บันทึกการลา, ยืม-คืนพัสดุอุปกรณ์",
  },
  {
    id: "auto-cert-doc",
    name: "ระบบออกเอกสาร & เกียรติบัตร QR อัตโนมัติ",
    price: 2900,
    icon: Award,
    description: "ออกเกียรติบัตร PDF จาก Slides + หน้าเว็บตรวจ QR ป้องกันปลอม",
  },
  {
    id: "full-custom",
    name: "ระบบเฉพาะทางตามโจทย์ของโรงเรียน (Full Custom)",
    price: 4900,
    icon: Cpu,
    description: "ออกแบบกระบวนการทำงานใหม่ตั้งแต่ต้นตามแบบฟอร์มเฉพาะ",
  },
];

interface AddonOption {
  id: string;
  name: string;
  price: number;
  icon: React.ElementType;
}

const ADDON_OPTIONS: AddonOption[] = [
  { id: "line-notify", name: "ระบบแจ้งเตือนผ่าน LINE Notify / LINE OA", price: 1000, icon: BellRing },
  { id: "qr-verify", name: "ระบบสร้างและสแกน QR Code ตรวจสอบ", price: 1200, icon: QrCode },
  { id: "excel-import", name: "บริการนำเข้ารายชื่อนักเรียน/ครูเดิมจาก Excel", price: 800, icon: FileSpreadsheet },
  { id: "training-video", name: "จัดทำคลิปสอนเฉพาะโรงเรียน + อบรม Online 1 ชม.", price: 1500, icon: Video },
];

export function ServicesView() {
  // Estimator state
  const [selectedType, setSelectedType] = useState<string>("attendance");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["line-notify"]);
  const [isUrgent, setIsUrgent] = useState<boolean>(false);

  // Calculate live estimate price
  const baseTypeObj = SYSTEM_TYPES.find((t) => t.id === selectedType) || SYSTEM_TYPES[0];
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const item = ADDON_OPTIONS.find((a) => a.id === addonId);
    return sum + (item ? item.price : 0);
  }, 0);
  const urgentCost = isUrgent ? 1500 : 0;
  const totalEstimate = baseTypeObj.price + addonsTotal + urgentCost;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const generateLineCustomUrl = () => {
    const typeName = baseTypeObj.name;
    const addonNames = selectedAddons
      .map((id) => ADDON_OPTIONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(", ");
    const speedText = isUrgent ? "ด่วนพิเศษ (3-5 วัน)" : "ปกติ (7-10 วัน)";

    const message = `สวัสดีครับครูอ้น สนใจสั่งทำระบบตามสั่งสำหรับโรงเรียนครับ 🚀
📋 ประเภทระบบ: ${typeName}
🧩 ฟังก์ชันเสริมที่ต้องการ: ${addonNames || "ไม่มี"}
⏱️ ความเร่งด่วน: ${speedText}
💰 ยอดประเมินเบื้องต้นจากหน้าเว็บ: ${totalEstimate.toLocaleString()} บาท

รบกวนขอคำปรึกษาและรายละเอียดเพิ่มเติมด้วยครับ 🙏`;

    return `https://line.me/R/oaMessage/@deu6776s/?${encodeURIComponent(message)}`;
  };

  const generateLineTierUrl = (tierName: string, price: string) => {
    const message = `สวัสดีครับครูอ้น สนใจบริการสั่งทำระบบแพ็กเกจ "${tierName}" (ราคา ${price}) ครับ รบกวนขอปรึกษารายละเอียดและขั้นตอนการดำเนินการด้วยครับ 🙏`;
    return `https://line.me/R/oaMessage/@deu6776s/?${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-[#070913] text-white overflow-hidden relative pb-28">
      
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-cyan-600/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-[600px] h-[600px] bg-amber-600/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-prompt text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>BESPOKE CUSTOM DEVELOPMENT &amp; SCHOOL AUTOMATION</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-prompt text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            รับออกแบบ &amp; พัฒนาระบบตามสั่ง{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
              เสกงานเอกสารโรงเรียน
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-prompt text-lg text-white/70 leading-relaxed max-w-2xl mx-auto"
          >
            ปรับแต่งให้ตรงตามบริบทและแบบฟอร์มของโรงเรียนคุณ 100% รันบน Google Workspace ตัวเอง ปลอดภัยตาม พ.ร.บ. คุ้มครองข้อมูล ไม่มีค่าบริการรายเดือน
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <a
              href="https://lin.ee/poMESoP"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-prompt font-bold text-base flex items-center gap-2.5 shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>ทักคุย Requirement &amp; ประเมินราคาฟรีผ่าน LINE</span>
            </a>

            <a
              href="#calculator"
              className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-white font-prompt font-medium text-base flex items-center gap-2 transition-all"
            >
              <Calculator className="w-5 h-5 text-cyan-400" />
              <span>ลองคำนวณราคาประเมินเบื้องต้น</span>
            </a>
          </motion.div>
        </div>

        {/* --- NEW! AI CARETAKER MONTHLY RETAINER BANNER FOR SMEs --- */}
        <div className="mb-20 rounded-3xl p-7 sm:p-10 border border-emerald-500/40 bg-linear-to-r from-emerald-950/60 via-slate-900 to-cyan-950/50 relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)]">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-prompt font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>🔥 บริการใหม่สำหรับพ่อค้าแม่ค้า &amp; ร้านค้าทั่วไป (AI CARETAKER)</span>
              </div>
              <h2 className="font-prompt text-2xl sm:text-3xl font-extrabold text-white">
                อยากมีแอดมิน AI ตอบแชท + ตรวจสลิป + รับจองคิว{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 to-cyan-300">
                  พร้อมคนเฝ้าดูแลระบบให้รายเดือน?
                </span>
              </h2>
              <p className="font-prompt text-xs sm:text-sm text-white/75 leading-relaxed">
                ไม่ต้องปวดหัวเซตเอง! เราติดตั้งระบบ AI มาตรฐานให้พร้อมใช้ และมีระบบ <strong>&ldquo;AI คุม AI (Watchdog)&rdquo;</strong> คอยเฝ้าระวัง ซ่อมตาราง Google Sheets เมื่อเผลอทำพัง และส่งการ์ดสรุปผลงานเข้า LINE ทุกสัปดาห์ <strong className="text-amber-300">เริ่มต้นเพียง 990 ฿/เดือน (วันละ 33 บาท!)</strong>
              </p>
            </div>

            <Link
              href="/ai-caretaker"
              className="px-7 py-4 rounded-2xl bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-zinc-950 font-prompt font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(16,185,129,0.45)] hover:scale-105 transition-all shrink-0"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>ดูแพ็กเกจเฝ้าดูแล AI รายเดือน</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* --- 4-STEP TRANSPARENT PROCESS --- */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h3 className="font-prompt text-2xl sm:text-3xl font-extrabold text-white">
              4 ขั้นตอนการทำงานที่ <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400">ชัดเจน &amp; รวดเร็ว</span>
            </h3>
            <p className="font-prompt text-sm text-white/60">
              ติดตามความคืบหน้าได้ทุกระยะ ทดสอบจนมั่นใจก่อนนำไปใช้งานจริง
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "พูดคุยโจทย์ & วางผัง (ฟรี)",
                desc: "ส่งตัวอย่างเอกสารหรือแบบฟอร์มที่ต้องการ ครูอ้นช่วยวิเคราะห์และสรุป Flow การทำงานให้ฟรี",
                color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
              },
              {
                step: "02",
                title: "พัฒนาระบบ (3-7 วัน)",
                desc: "เขียนโค้ด Google Apps Script และสร้างหน้า Web App บนสภาพแวดล้อมจริงตามสเปก",
                color: "text-purple-400 border-purple-500/20 bg-purple-500/5",
              },
              {
                step: "03",
                title: "ทดสอบ & ปรับแต่งร่วมกัน",
                desc: "ให้คุณครูและทีมงานทดลองกดใช้งานจริง ปรับแก้ตามฟีดแบคจนลงตัว 100%",
                color: "text-pink-400 border-pink-500/20 bg-pink-500/5",
              },
              {
                step: "04",
                title: "ส่งมอบ + วิดีโอสอนใช้งาน",
                desc: "โอนย้ายระบบเข้า Google Drive โรงเรียน พร้อมคลิปสอนและซัพพอร์ตตลอด 30 วัน",
                color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
              },
            ].map((p, idx) => (
              <div key={idx} className={`p-6 rounded-3xl border ${p.color} relative overflow-hidden flex flex-col justify-between`}>
                <div className="text-4xl font-black font-mono opacity-20 mb-4">{p.step}</div>
                <div>
                  <h4 className="font-prompt text-lg font-bold text-white mb-2">{p.title}</h4>
                  <p className="font-prompt text-xs text-white/60 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- INTERACTIVE PRICE ESTIMATOR CALCULATOR --- */}
        <div id="calculator" className="mb-24 max-w-5xl mx-auto rounded-3xl border border-cyan-500/30 bg-slate-900/80 p-6 sm:p-10 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-prompt font-semibold">
              <Calculator className="w-4 h-4" />
              <span>INTERACTIVE PRICE ESTIMATOR</span>
            </div>
            <h3 className="font-prompt text-2xl sm:text-4xl font-extrabold text-white">
              เครื่องมือประเมินงบประมาณ{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400">
                ตามความต้องการของคุณ
              </span>
            </h3>
            <p className="font-prompt text-sm text-white/60">
              เลือกฟังก์ชันที่โรงเรียนต้องการ เพื่อดูราคาประเมินและระยะเวลาจัดทำได้ทันที
            </p>
          </div>

          <div className="space-y-8">
            
            {/* Step 1: Select Main System Type */}
            <div>
              <h4 className="font-prompt text-sm font-bold text-cyan-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs text-cyan-300">1</span>
                <span>เลือกประเภทระบบหลัก:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SYSTEM_TYPES.map((type) => {
                  const isSelected = selectedType === type.id;
                  const IconComp = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                        isSelected
                          ? "border-cyan-400 bg-cyan-950/40 shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400"
                          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? "bg-cyan-500 text-zinc-950" : "bg-white/10 text-white/70"}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-prompt text-sm font-bold text-white">{type.name}</p>
                          <span className="font-prompt text-xs font-bold text-cyan-300 shrink-0">
                            {type.price.toLocaleString()} ฿
                          </span>
                        </div>
                        <p className="font-prompt text-xs text-white/60 leading-relaxed">{type.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Add-ons */}
            <div>
              <h4 className="font-prompt text-sm font-bold text-purple-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs text-purple-300">2</span>
                <span>เลือกฟังก์ชันเสริมที่ต้องการ (เลือกได้หลายข้อ):</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {ADDON_OPTIONS.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  const IconComp = addon.icon;
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? "border-purple-400 bg-purple-950/40 shadow-[0_0_15px_rgba(168,85,247,0.3)] ring-1 ring-purple-400"
                          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                          isSelected ? "bg-purple-600 border-purple-400" : "border-white/30 bg-white/5"
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <IconComp className="w-4 h-4 text-purple-300" />
                        <span className="font-prompt text-xs sm:text-sm font-medium text-white">{addon.name}</span>
                      </div>
                      <span className="font-prompt text-xs font-bold text-purple-300 shrink-0">
                        +{addon.price.toLocaleString()} ฿
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Urgency Option */}
            <div className="pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <p className="font-prompt text-sm font-bold text-white">ต้องการงานด่วนพิเศษ (Express 3-5 วัน)?</p>
                    <p className="font-prompt text-xs text-white/50">จัดคิวพัฒนาเร่งด่วนเป็นพิเศษให้ทันใช้งาน</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsUrgent(!isUrgent)}
                  className={`px-4 py-2 rounded-xl font-prompt text-xs font-bold transition-all cursor-pointer ${
                    isUrgent
                      ? "bg-amber-500 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  {isUrgent ? "✓ เลือกงานด่วน (+1,500 ฿)" : "+ เพิ่มงานด่วน (+1,500 ฿)"}
                </button>
              </div>
            </div>

            {/* Total Estimated Box & CTA */}
            <div className="p-6 sm:p-8 rounded-2xl bg-linear-to-r from-cyan-950/60 via-purple-950/60 to-slate-900 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(6,182,212,0.2)]">
              <div>
                <span className="text-xs font-prompt text-white/50 uppercase tracking-wider">ราคาประเมินเบื้องต้น (Estimated Budget)</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-prompt text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-200 to-purple-300">
                    {totalEstimate.toLocaleString()} ฿
                  </span>
                  <span className="font-prompt text-xs text-white/60">
                    (ระยะเวลาจัดทำ: {isUrgent ? "3–5 วัน" : "7–10 วัน"})
                  </span>
                </div>
              </div>

              <a
                href={generateLineCustomUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-prompt font-bold text-base flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all hover:scale-105 cursor-pointer shrink-0"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>ส่งสเปกนี้เพื่อคุยกับครูอ้นใน LINE ทันที</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

        {/* --- 3 READY-MADE TIERS --- */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h3 className="font-prompt text-2xl sm:text-4xl font-extrabold text-white">
              3 แพ็กเกจรับพัฒนายอดนิยม{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                (Standard Tiers)
              </span>
            </h3>
            <p className="font-prompt text-sm text-white/60">
              เลือกแพ็กเกจที่ตอบโจทย์ขนาดของโรงเรียนและองค์กรของคุณ
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {CUSTOM_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-8 border bg-slate-900/60 flex flex-col justify-between transition-all duration-300 ${tier.borderClass}`}
              >
                {tier.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-prompt font-bold shadow-md border ${tier.badgeColor}`}>
                    {tier.badge}
                  </div>
                )}

                <div>
                  <h4 className="font-prompt text-2xl font-extrabold text-white mb-1">{tier.name}</h4>
                  <p className="font-prompt text-xs text-white/60 mb-6">{tier.tagline}</p>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                    <span className="font-prompt text-3xl sm:text-4xl font-black text-white">{tier.price}</span>
                    <p className="font-prompt text-xs text-cyan-300 mt-1">ระยะเวลาส่งมอบ: {tier.deliveryDays}</p>
                  </div>

                  <p className="font-prompt text-xs text-white/70 leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  <div className="space-y-2.5 mb-8 border-t border-white/10 pt-6">
                    <p className="font-prompt text-xs font-bold text-white/40 uppercase tracking-wider mb-2">ขอบเขตงานที่ได้รับ:</p>
                    {tier.features.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs font-prompt text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <a
                    href={generateLineTierUrl(tier.name, tier.price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-6 rounded-2xl font-prompt font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-linear-to-r ${tier.btnGradient}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>จองคิวทำแพ็กเกจนี้ผ่าน LINE</span>
                  </a>
                  <p className="text-[11px] font-prompt text-center text-white/40">{tier.recommendedFor}</p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* --- SPEAKER & WORKSHOP BANNER --- */}
        <div className="mb-20 rounded-3xl p-8 sm:p-12 border border-amber-500/30 bg-linear-to-br from-amber-500/10 via-slate-900 to-purple-950/30 relative overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.15)]">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/15 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-prompt font-semibold">
                <Presentation className="w-4 h-4" />
                <span>AI SPEAKER &amp; WORKSHOP</span>
              </div>
              <h3 className="font-prompt text-2xl sm:text-4xl font-extrabold text-white">
                ขอเชิญครูอ้นเป็น{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-orange-400 to-yellow-300">
                  วิทยากรบรรยาย &amp; จัดอบรม AI
                </span>
              </h3>
              <p className="font-prompt text-sm text-white/70 leading-relaxed">
                หลักสูตร AI เพื่อการศึกษาลดภาระครู และ Automation ในโรงเรียน ถ่ายทอดจากประสบการณ์จริงเข้าใจง่าย Hands-on 100% มีหนังสือเชิญและเอกสารเสนอราคาถูกต้องตามระบบราชการ
              </p>
            </div>

            <a
              href={`https://line.me/R/oaMessage/@deu6776s/?${encodeURIComponent(
                "สวัสดีครับครูอ้น สนใจขอเชิญเป็นวิทยากรบรรยาย / จัดอบรมเชิงปฏิบัติการ AI เพื่อการศึกษาลดภาระครูและ Automation ให้กับทางโรงเรียนครับ รบกวนขอข้อมูลหลักสูตร ใบเสนอราคา และคิวว่างด้วยครับ 🙏"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-5 rounded-2xl bg-linear-to-r from-amber-500 via-orange-500 to-amber-400 text-zinc-950 font-prompt font-extrabold text-base flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(245,158,11,0.4)] hover:scale-105 transition-all shrink-0 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 fill-zinc-950 text-zinc-950" />
              <span>ขอคิววิทยากร / ขอใบเสนอราคา</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

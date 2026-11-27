"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, ArrowRight,
  MessageCircle, Cpu, Sparkles,
  Presentation, Building2, Users,
  Award, ShieldCheck, Zap,
  Calculator, Check, FileSpreadsheet, QrCode, BellRing, Video,
  Eye
} from "lucide-react";
import Link from "next/link";
import { CyberBlueprintMockup } from "./CyberBlueprintMockup";
import { CustomDevDetailSection } from "./CustomDevDetailSection";
import { CUSTOM_DEV_TIERS_DATA, CustomDevTierItem } from "./customDevDataHelper";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { getLineOrderUrl } from "@/lib/line";

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
  const [selectedType, setSelectedType] = useState<string>("attendance");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["line-notify"]);
  const [isUrgent, setIsUrgent] = useState<boolean>(false);

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

    return getLineOrderUrl(message);
  };

  const [selectedTier, setSelectedTier] = useState<CustomDevTierItem | null>(null);
  const { openLineModal } = useLineModal();

  const handleTierLineClick = (e: React.MouseEvent, tier: CustomDevTierItem) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: `บริการ: ${tier.name}`,
        price: tier.price,
        message: tier.lineOrderMsg,
      });
    }
  };

  const generateLineTierUrl = (tierName: string, price: string) => {
    const message = `สวัสดีครับครูอ้น สนใจบริการสั่งทำระบบแพ็กเกจ "${tierName}" (ราคา ${price}) ครับ รบกวนขอปรึกษารายละเอียดและขั้นตอนการดำเนินการด้วยครับ 🙏`;
    return getLineOrderUrl(message);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E293B] overflow-hidden relative pb-28 font-prompt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 relative z-10">

        {/* --- HERO SECTION --- */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8] font-prompt text-xs sm:text-sm font-semibold tracking-wide"
          >
            <Sparkles className="w-4 h-4 text-[#2563EB]" />
            <span>BESPOKE CUSTOM DEVELOPMENT &amp; SCHOOL AUTOMATION</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-prompt text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-tight"
          >
            รับออกแบบ &amp; พัฒนาระบบตามสั่ง{" "}
            <span className="text-[#2563EB]">
              เสกงานเอกสารโรงเรียน
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-prompt text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto"
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
              href={getLineOrderUrl(
                "สวัสดีครับครูอ้น สนใจบริการรับพัฒนาระบบตามสั่ง ขอรายละเอียดและราคาครับ 🙏"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-prompt font-extrabold text-base flex items-center gap-2.5 shadow-sm transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              <span>ทักคุย Requirement &amp; ประเมินราคาฟรีผ่าน LINE</span>
            </a>

            <a
              href="#calculator"
              className="px-8 py-4 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#EFF6FF] text-[#0F172A] font-prompt font-semibold text-base flex items-center gap-2 transition-all shadow-2xs"
            >
              <Calculator className="w-5 h-5 text-[#2563EB]" />
              <span>ลองคำนวณราคาประเมินเบื้องต้น</span>
            </a>
          </motion.div>
        </div>

        {/* --- AI CARETAKER MONTHLY RETAINER BANNER --- */}
        <div className="mb-12 rounded-3xl p-7 sm:p-10 border border-emerald-200 bg-white shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-prompt font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>🔥 บริการใหม่สำหรับพ่อค้าแม่ค้า &amp; ร้านค้าทั่วไป (AI CARETAKER)</span>
              </div>
              <h2 className="font-prompt text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                อยากมีแอดมิน AI ตอบแชท + ตรวจสลิป + รับจองคิว{" "}
                <span className="text-[#0F766E]">
                  พร้อมคนเฝ้าดูแลระบบให้รายเดือน?
                </span>
              </h2>
              <p className="font-prompt text-xs sm:text-sm text-[#475569] leading-relaxed">
                ไม่ต้องปวดหัวเซตเอง! เราติดตั้งระบบ AI มาตรฐานให้พร้อมใช้ และมีระบบ <strong className="text-[#0F172A]">&ldquo;AI คุม AI (Watchdog)&rdquo;</strong> คอยเฝ้าระวัง ซ่อมตาราง Google Sheets เมื่อเผลอทำพัง และส่งการ์ดสรุปผลงานเข้า LINE ทุกสัปดาห์ <strong className="text-[#B45309]">เริ่มต้นเพียง 990 ฿/เดือน (วันละ 33 บาท!)</strong>
              </p>
            </div>

            <Link
              href="/ai-caretaker"
              className="px-7 py-4 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-prompt font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xs hover:scale-105 transition-all shrink-0"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>ดูแพ็กเกจเฝ้าดูแล AI รายเดือน</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* --- 3D LINE STICKER SERVICE BANNER --- */}
        <div className="mb-20 rounded-3xl p-7 sm:p-10 border border-[#DDD6FE] bg-white shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left max-w-2xl">
              <img
                src="/images/stickers/set2/main.png"
                alt="iAon LINE Sticker 3D"
                className="w-24 h-24 rounded-2xl bg-[#FAF8F5] p-2 border border-[#E2E8F0] object-contain shrink-0 shadow-2xs"
              />
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-[#6D28D9] text-xs font-prompt font-bold">
                  <Sparkles className="w-4 h-4 text-[#7C3AED]" />
                  <span>🎨 บริการใหม่ยอดฮิต! รับทำสติกเกอร์ LINE คาแรกเตอร์ครู 3D ครบวงจร</span>
                </div>
                <h2 className="font-prompt text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                  เปลี่ยนรูปถ่ายคุณครูเป็น{" "}
                  <span className="text-[#7C3AED]">
                    สติกเกอร์ LINE พูดได้ประจำตัว!
                  </span>
                </h2>
                <p className="font-prompt text-xs sm:text-sm text-[#475569] leading-relaxed">
                  ปั้นคาแรกเตอร์ 3D จากรูปถ่ายจริง เลือกชุดและคำพูดเองได้ ดูแลไดคัท ใส่ฟอนต์ไทยคมชัด และส่งตรวจอนุมัติจนขึ้นขายบน <strong className="text-[#0F172A]">LINE STORE</strong> พร้อมแถมไฟล์ PNG ความละเอียดสูงเอาไปแต่งสไลด์สอน &amp; ปก ว.PA <strong className="text-[#059669]">เริ่มต้นเพียง 990 ฿ (ชุดยอดนิยม 16 รูป 1,490 ฿)</strong>
                </p>
              </div>
            </div>

            <Link
              href="/line-stickers"
              className="px-7 py-4 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-prompt font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xs hover:scale-105 transition-all shrink-0"
            >
              <Sparkles className="w-5 h-5" />
              <span>ดูตัวอย่าง 16 รูป &amp; สั่งทำสติกเกอร์</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* --- 4-STEP TRANSPARENT PROCESS --- */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h3 className="font-prompt text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              4 ขั้นตอนการทำงานที่ <span className="text-[#2563EB]">ชัดเจน &amp; รวดเร็ว</span>
            </h3>
            <p className="font-prompt text-sm text-[#475569]">
              ติดตามความคืบหน้าได้ทุกระยะ ทดสอบจนมั่นใจก่อนนำไปใช้งานจริง
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "พูดคุยโจทย์ & วางผัง (ฟรี)",
                desc: "ส่งตัวอย่างเอกสารหรือแบบฟอร์มที่ต้องการ ครูอ้นช่วยวิเคราะห์และสรุป Flow การทำงานให้ฟรี",
                numColor: "text-[#2563EB]",
              },
              {
                step: "02",
                title: "พัฒนาระบบ (3-7 วัน)",
                desc: "เขียนโค้ด Google Apps Script และสร้างหน้า Web App บนสภาพแวดล้อมจริงตามสเปก",
                numColor: "text-[#7C3AED]",
              },
              {
                step: "03",
                title: "ทดสอบ & ปรับแต่งร่วมกัน",
                desc: "ให้คุณครูและทีมงานทดลองกดใช้งานจริง ปรับแก้ตามฟีดแบคจนลงตัว 100%",
                numColor: "text-[#DB2777]",
              },
              {
                step: "04",
                title: "ส่งมอบ + วิดีโอสอนใช้งาน",
                desc: "โอนย้ายระบบเข้า Google Drive โรงเรียน พร้อมคลิปสอนและซัพพอร์ตตลอด 30 วัน",
                numColor: "text-[#059669]",
              },
            ].map((p, idx) => (
              <div key={idx} className="p-6 rounded-3xl border border-[#E2E8F0] bg-white shadow-sm flex flex-col justify-between">
                <div className={`text-4xl font-black font-mono opacity-30 mb-4 ${p.numColor}`}>{p.step}</div>
                <div>
                  <h4 className="font-prompt text-lg font-bold text-[#0F172A] mb-2">{p.title}</h4>
                  <p className="font-prompt text-xs text-[#475569] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- INTERACTIVE PRICE ESTIMATOR CALCULATOR --- */}
        <div id="calculator" className="mb-20 max-w-5xl mx-auto rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-10 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-prompt font-semibold">
              <Calculator className="w-4 h-4 text-[#2563EB]" />
              <span>INTERACTIVE PRICE ESTIMATOR</span>
            </div>
            <h3 className="font-prompt text-2xl sm:text-4xl font-extrabold text-[#0F172A]">
              เครื่องมือประเมินงบประมาณ{" "}
              <span className="text-[#2563EB]">
                ตามความต้องการของคุณ
              </span>
            </h3>
            <p className="font-prompt text-sm text-[#475569]">
              เลือกฟังก์ชันที่โรงเรียนต้องการ เพื่อดูราคาประเมินและระยะเวลาจัดทำได้ทันที
            </p>
          </div>

          <div className="space-y-8">
            {/* Step 1: Select Main System Type */}
            <div>
              <h4 className="font-prompt text-sm font-bold text-[#1D4ED8] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-xs text-[#1D4ED8]">1</span>
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
                          ? "border-[#2563EB] bg-[#EFF6FF] ring-1 ring-[#2563EB]"
                          : "border-[#E2E8F0] bg-[#FAF8F5] hover:border-[#CBD5E1] hover:bg-white"
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? "bg-[#2563EB] text-white" : "bg-white border border-[#E2E8F0] text-[#475569]"}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-prompt text-sm font-bold text-[#0F172A]">{type.name}</p>
                          <span className="font-prompt text-xs font-bold text-[#1D4ED8] shrink-0">
                            {type.price.toLocaleString()} ฿
                          </span>
                        </div>
                        <p className="font-prompt text-xs text-[#475569] leading-relaxed">{type.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Add-ons */}
            <div>
              <h4 className="font-prompt text-sm font-bold text-[#6D28D9] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center text-xs text-[#6D28D9]">2</span>
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
                          ? "border-[#7C3AED] bg-[#F5F3FF] ring-1 ring-[#7C3AED]"
                          : "border-[#E2E8F0] bg-[#FAF8F5] hover:border-[#CBD5E1] hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                          isSelected ? "bg-[#7C3AED] border-[#7C3AED]" : "border-[#CBD5E1] bg-white"
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <IconComp className="w-4 h-4 text-[#6D28D9]" />
                        <span className="font-prompt text-xs sm:text-sm font-medium text-[#0F172A]">{addon.name}</span>
                      </div>
                      <span className="font-prompt text-xs font-bold text-[#6D28D9] shrink-0">
                        +{addon.price.toLocaleString()} ฿
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Urgency Option */}
            <div className="pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-[#D97706] shrink-0" />
                  <div>
                    <p className="font-prompt text-sm font-bold text-[#0F172A]">ต้องการงานด่วนพิเศษ (Express 3-5 วัน)?</p>
                    <p className="font-prompt text-xs text-[#64748B]">จัดคิวพัฒนาเร่งด่วนเป็นพิเศษให้ทันใช้งาน</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsUrgent(!isUrgent)}
                  className={`px-4 py-2 rounded-xl font-prompt text-xs font-bold transition-all cursor-pointer border ${
                    isUrgent
                      ? "bg-amber-400 text-[#0F172A] border-amber-500 shadow-xs"
                      : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#CBD5E1]"
                  }`}
                >
                  {isUrgent ? "✓ เลือกงานด่วน (+1,500 ฿)" : "+ เพิ่มงานด่วน (+1,500 ฿)"}
                </button>
              </div>
            </div>

            {/* Total Estimated Box & CTA */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#BFDBFE] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0 hidden sm:block">
                  <img
                    src="/images/kru_aon_profile.png"
                    alt="ครูอ้น จิรวัฒน์ เดชเส้ง — สถาปนิกระบบ AiAon Tech"
                    className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-white ring-2 ring-[#BFDBFE] shadow-sm bg-[#ECE9E2]"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#06C755] ring-2 ring-white" />
                </div>
                <div>
                  <span className="text-xs font-prompt text-[#64748B] uppercase tracking-wider font-semibold">ราคาประเมินเบื้องต้น (Estimated Budget)</span>
                  <div className="flex items-baseline gap-2 mt-1 flex-wrap">
                    <span className="font-prompt text-4xl sm:text-5xl font-black text-[#0F172A]">
                      {totalEstimate.toLocaleString()} ฿
                    </span>
                    <span className="font-prompt text-xs text-[#475569]">
                      (ระยะเวลาจัดทำ: {isUrgent ? "3–5 วัน" : "7–10 วัน"})
                    </span>
                  </div>
                  <p className="font-prompt text-xs text-[#1D4ED8] font-medium mt-1">
                    คุยสเปกตรงกับครูอ้น ไม่ผ่านนายหน้า • ออกแบบตามบริบทโรงเรียนจริง 100%
                  </p>
                </div>
              </div>

              <a
                href={generateLineCustomUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-prompt font-extrabold text-base flex items-center justify-center gap-2.5 shadow-xs transition-all hover:scale-105 cursor-pointer shrink-0"
              >
                <MessageCircle className="w-5 h-5" />
                <span>ส่งสเปกนี้เพื่อคุยกับครูอ้นใน LINE ทันที</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* --- 3 READY-MADE TIERS --- */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h3 className="font-prompt text-2xl sm:text-4xl font-extrabold text-[#0F172A]">
              3 แพ็กเกจรับพัฒนายอดนิยม{" "}
              <span className="text-[#7C3AED]">
                (Standard Tiers)
              </span>
            </h3>
            <p className="font-prompt text-sm text-[#475569]">
              เลือกแพ็กเกจที่ตอบโจทย์ขนาดของโรงเรียนและองค์กรของคุณ
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {CUSTOM_DEV_TIERS_DATA.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-7 sm:p-8 border bg-white shadow-sm flex flex-col justify-between transition-all duration-300 ${tier.borderClass}`}
              >
                {tier.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-prompt font-bold shadow-xs border whitespace-nowrap ${tier.badgeColor}`}>
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div
                    onClick={() => setSelectedTier(tier)}
                    className="cursor-pointer mb-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] transform transition-transform hover:scale-[1.02]"
                    title="คลิกเพื่อดูเจาะลึก 7 ข้อก่อนตัดสินใจ"
                  >
                    <CyberBlueprintMockup
                      tierId={tier.id}
                      title={tier.name}
                      themeColor={tier.themeColor}
                      isFeatured={tier.isPopular}
                      size="md"
                      isInteractive={true}
                    />
                  </div>

                  <h4
                    onClick={() => setSelectedTier(tier)}
                    className="font-prompt text-2xl font-extrabold text-[#0F172A] mb-1 cursor-pointer hover:text-[#2563EB] transition-colors"
                  >
                    {tier.name}
                  </h4>
                  <p className="font-prompt text-xs text-[#64748B] mb-6">{tier.tagline}</p>

                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] mb-6">
                    <span className="font-prompt text-3xl sm:text-4xl font-black text-[#0F172A]">{tier.price}</span>
                    <p className="font-prompt text-xs text-[#0E7490] font-medium mt-1">ระยะเวลาส่งมอบ: {tier.deliveryDays}</p>
                  </div>

                  <p className="font-prompt text-xs text-[#475569] leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  <div className="space-y-2.5 mb-8 border-t border-[#F1F5F9] pt-6">
                    <p className="font-prompt text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">ขอบเขตงานที่ได้รับ:</p>
                    {tier.features.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs font-prompt text-[#1E293B]">
                        <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedTier(tier)}
                      className="w-full py-3 px-3 rounded-xl font-prompt font-bold text-xs flex items-center justify-center gap-1.5 bg-[#FAF8F5] hover:bg-[#F1ECE4] text-[#0F172A] border border-[#E2E8F0] transition-all active:scale-95 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-[#2563EB]" />
                      <span>เจาะลึก 7 ข้อ</span>
                    </button>

                    <a
                      href={generateLineTierUrl(tier.name, tier.price)}
                      onClick={(e) => handleTierLineClick(e, tier)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-3 rounded-xl font-prompt font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all hover:scale-[1.02] active:scale-95 bg-[#06C755] hover:bg-[#05b34c] text-[#052E16]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>จองคิว LINE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <p className="text-[11px] font-prompt text-center text-[#64748B]">{tier.recommendedFor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal: 7 Pillars Deep Dive Section */}
        <AnimatePresence>
          {selectedTier && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
              onClick={() => setSelectedTier(null)}
            >
              <div
                className="w-full max-w-5xl my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <CustomDevDetailSection
                  tier={selectedTier}
                  onClose={() => setSelectedTier(null)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- SPEAKER & WORKSHOP BANNER --- */}
        <div className="mb-12 rounded-3xl p-8 sm:p-12 border border-[#FDE68A] bg-white shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-6 text-center sm:text-left max-w-2xl">
              <div className="relative shrink-0">
                <img
                  src="/images/kru_aon_profile.png"
                  alt="ครูอ้น จิรวัฒน์ เดชเส้ง — วิทยากร Generative AI เพื่อการศึกษา"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover object-top border-2 border-[#FDE68A] shadow-sm bg-[#ECE9E2]"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-[#FEF9EF] border border-[#FDE68A] text-[10px] font-bold text-[#92400E] shadow-xs">
                  ครู ค.ศ.2 • ญ.ว.
                </span>
              </div>
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF9EF] border border-[#FDE68A] text-[#92400E] text-xs font-prompt font-semibold">
                  <Presentation className="w-4 h-4 text-[#D97706]" />
                  <span>AI SPEAKER &amp; WORKSHOP</span>
                </div>
                <h3 className="font-prompt text-2xl sm:text-4xl font-extrabold text-[#0F172A]">
                  ขอเชิญครูอ้นเป็น{" "}
                  <span className="text-[#D97706]">
                    วิทยากรบรรยาย &amp; จัดอบรม AI
                  </span>
                </h3>
                <p className="font-prompt text-sm text-[#475569] leading-relaxed">
                  หลักสูตร AI เพื่อการศึกษาลดภาระครู และ Automation ในโรงเรียน ถ่ายทอดจากประสบการณ์จริงเข้าใจง่าย Hands-on 100% มีหนังสือเชิญและเอกสารเสนอราคาถูกต้องตามระบบราชการ
                </p>
              </div>
            </div>

            <a
              href={getLineOrderUrl(
                "สวัสดีครับครูอ้น สนใจขอเชิญเป็นวิทยากรบรรยาย / จัดอบรมเชิงปฏิบัติการ AI เพื่อการศึกษาลดภาระครูและ Automation ให้กับทางโรงเรียนครับ รบกวนขอข้อมูลหลักสูตร ใบเสนอราคา และคิวว่างด้วยครับ 🙏"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-prompt font-extrabold text-base flex items-center justify-center gap-2.5 shadow-xs hover:scale-105 transition-all shrink-0 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>ขอคิววิทยากร / ขอใบเสนอราคา</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

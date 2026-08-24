"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, CheckCircle2, Crown, Zap, ShieldCheck, 
  ArrowRight, MessageCircle, Gift, Star, Award, Layers, HelpCircle, 
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface BundlePackage {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  tagline: string;
  originalPrice: number;
  bundlePrice: number;
  discountText: string;
  isFeatured?: boolean;
  borderGlow: string;
  bgGradient: string;
  btnGradient: string;
  systems: {
    code: string;
    name: string;
    originalPrice: number;
    description: string;
  }[];
  bonuses: string[];
  targetAudience: string;
}

const BUNDLE_PACKAGES: BundlePackage[] = [
  {
    id: "classroom-pro",
    badge: "🌟 ยอดนิยมสำหรับครูประจำชั้น",
    badgeColor: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
    title: "Classroom Master Pro Pack",
    tagline: "ชุด 3 ระบบบริหารชั้นเรียน & สร้างเล่มเอกสารครบวงจร",
    originalPrice: 1870,
    bundlePrice: 1490,
    discountText: "ประหยัดทันที 380 ฿",
    borderGlow: "hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]",
    bgGradient: "from-cyan-950/20 via-slate-900/40 to-blue-950/20",
    btnGradient: "from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500",
    targetAudience: "เหมาะสำหรับ: คุณครูประจำชั้น / หัวหน้าระดับชั้น / ครูฝ่ายปกครอง",
    systems: [
      {
        code: "AONE01",
        name: "ระบบเช็คชื่อและพฤติกรรมนักเรียน ม.3 V2",
        originalPrice: 490,
        description: "เช็คชื่อเข้าแถว ตรวจเครื่องแต่งกาย บันทึกพฤติกรรม และแจ้งเตือน LINE Notify",
      },
      {
        code: "AONE03",
        name: "ระบบตรวจติดตามเครื่องแต่งกาย ม.3",
        originalPrice: 390,
        description: "บันทึกตรวจระเบียบ ออกรายงานสถิติ และระบบปลดสถานะแก้ตัวอัตโนมัติ",
      },
      {
        code: "AONE09",
        name: "ระบบแกนนำห้องเรียนสีขาว & Auto-Report",
        originalPrice: 990,
        description: "ผัง Tree Chart 4 ฝ่าย 25 ตำแหน่ง + ออกเล่มรายงาน 37 หน้า PDF ในคลิกเดียว",
      },
    ],
    bonuses: [
      "สคริปต์ Google Apps Script ปลดล็อก Source Code 100%",
      "คู่มือการนำไปติดตั้งบน Google Drive ตัวเองใน 3 นาที",
      "อัปเดตระบบฟรีเมื่อ Google มีการปรับเวอร์ชัน",
    ],
  },
  {
    id: "admin-suite",
    badge: "🏢 ครบเครื่องงานบริหารโรงเรียน",
    badgeColor: "text-amber-300 border-amber-500/30 bg-amber-500/10",
    title: "School Admin & Office Suite",
    tagline: "ชุด 3 ระบบงานบริหาร ยานพาหนะ พัสดุ และเกียรติบัตร QR",
    originalPrice: 2270,
    bundlePrice: 1990,
    discountText: "ประหยัดทันที 280 ฿",
    borderGlow: "hover:border-amber-500/50 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]",
    bgGradient: "from-amber-950/20 via-slate-900/40 to-orange-950/20",
    btnGradient: "from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500",
    targetAudience: "เหมาะสำหรับ: หัวหน้าฝ่ายบริหาร / งานพัสดุ / งานยานพาหนะ / งานวิชาการ",
    systems: [
      {
        code: "AONA02",
        name: "ระบบสารสนเทศยานพาหนะ Smart Vehicle",
        originalPrice: 990,
        description: "ขออนุมัติใช้รถ บันทึกเติมน้ำมันแนบรูปบิล สรุปประวัติซ่อมบำรุง ออกรายงาน PDF",
      },
      {
        code: "AONA03",
        name: "ระบบออกเกียรติบัตรอัตโนมัติ + QR Verify",
        originalPrice: 690,
        description: "สร้างเกียรติบัตรจาก Slides ส่งอีเมลอัตโนมัติ พร้อมเว็บตรวจ QR ป้องกันปลอม",
      },
      {
        code: "AONA05",
        name: "ระบบยืม-คืนพัสดุและเครื่องดนตรีส่วนกลาง",
        originalPrice: 590,
        description: "ออกป้าย QR Tag ติดอุปกรณ์ บันทึกยืม-คืน คำนวณวันเตือน Overdue อัตโนมัติ",
      },
    ],
    bonuses: [
      "ระบบฐานข้อมูล Google Sheets แยกอิสระปลอดภัย 100%",
      "หน้าเว็บ Web App รองรับมือถือและคอมพิวเตอร์",
      "สิทธิ์ปรึกษาการตั้งค่าระบบผ่าน LINE กับครูอ้น",
    ],
  },
  {
    id: "all-in-one-lifetime",
    badge: "👑 คุ้มค่าที่สุด (ALL-IN-ONE LIFETIME VIP)",
    badgeColor: "text-purple-300 border-purple-500/40 bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.4)]",
    title: "All-in-One 20 Systems Lifetime",
    tagline: "เหมาคลังครบทุกระบบทั้ง 20 ระบบ + สิทธิ์เข้าถึงทุกระบบใหม่ตลอดชีพ",
    originalPrice: 10200,
    bundlePrice: 4990,
    discountText: "ประหยัดกว่า 5,200 ฿ (ลด 51%)",
    isFeatured: true,
    borderGlow: "border-purple-500/60 shadow-[0_0_50px_rgba(168,85,247,0.35)]",
    bgGradient: "from-purple-950/40 via-indigo-950/30 to-pink-950/30",
    btnGradient: "from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400",
    targetAudience: "เหมาะสำหรับ: โรงเรียน, สถานศึกษา, หรือคุณครูที่ต้องการชุดเครื่องมือดิจิทัลระดับมือโปรแบบครบวงจร",
    systems: [
      {
        code: "หมวด E",
        name: "11 ระบบงานนักเรียน & วิชาการ (AONE01 - AONE11)",
        originalPrice: 4890,
        description: "เช็คชื่อ V1/V2, ตรวจเครื่องแต่งกาย, พฤติกรรม, คะแนนดนตรี ม.3/ม.4, ใบขออนุญาต, เล่มสีขาว 37 หน้า, จำหน้า 3D, จองคิวสอบ",
      },
      {
        code: "หมวด A",
        name: "6 ระบบงานบริหาร & สำนักงาน (AONA01 - AONA06)",
        originalPrice: 3940,
        description: "ผังทำเนียบครู, Smart Vehicle คุมรถ, เกียรติบัตร QR Verify, สมุดโทรศัพท์, ยืม-คืนพัสดุ, ระบบบันทึกการลาและฝากสอน",
      },
      {
        code: "หมวด M",
        name: "3 ระบบกิจกรรม & ลูกเสือ (AONM01 - AONM03)",
        originalPrice: 1270,
        description: "ทำเนียบกองลูกเสือ, ตรวจเครื่องแบบลูกเสือ ม.1, ระบบลงเวลาห้องซ้อมดนตรี High-Speed I/O",
      },
    ],
    bonuses: [
      "🎁 ได้รับครบทั้ง 20 ระบบ (Google Apps Script Web Apps)",
      "🚀 สิทธิ์รับทุกระบบใหม่ที่ครูอ้นพัฒนาเพิ่มในอนาคตฟรีตลอดชีพ (Lifetime Updates)",
      "💬 สิทธิ์เข้ากลุ่ม VIP Support ให้คำปรึกษาและแก้ไขปัญหาโดยครูอ้นโดยตรง",
      "🎥 วิดีโอสอนปรับแต่งและติดตั้งแบบ Step-by-step",
    ],
  },
  {
    id: "scout-activity",
    badge: "🎪 กิจกรรม & ลูกเสือสุดคุ้ม",
    badgeColor: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
    title: "Activity & Scout Master Pack",
    tagline: "ชุด 3 ระบบบริหารงานลูกเสือ เช็คเครื่องแบบ และห้องกิจกรรม",
    originalPrice: 1270,
    bundlePrice: 990,
    discountText: "ประหยัดทันที 280 ฿",
    borderGlow: "hover:border-emerald-500/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]",
    bgGradient: "from-emerald-950/20 via-slate-900/40 to-teal-950/20",
    btnGradient: "from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500",
    targetAudience: "เหมาะสำหรับ: ผู้กำกับลูกเสือ / ครูผู้ดูแลกิจกรรมพัฒนาผู้เรียน / ครูดูแลห้องซ้อมดนตรี",
    systems: [
      {
        code: "AONM01",
        name: "ระบบทำเนียบและเลือกตำแหน่งลูกเสือ ม.1",
        originalPrice: 390,
        description: "ผัง Tree Chart นายหมู่/รองนายหมู่ อัปโหลดรูปชุดลูกเสือ และยืนยันด้วย PIN",
      },
      {
        code: "AONM02",
        name: "ระบบตรวจเช็คเครื่องแบบลูกเสือ ม.1",
        originalPrice: 390,
        description: "เช็คชื่อประจำฐาน ตรวจระเบียบเครื่องแบบ ติดตามตรวจซ่อม สถิติสรุปภาพรวม",
      },
      {
        code: "AONM03",
        name: "ระบบลงเวลาซ้อมดนตรี ส่วนกลาง",
        originalPrice: 490,
        description: "ระบบลงเวลาเข้า-ออกด้วย PIN คำนวณชั่วโมงสะสม Real-time โครงสร้าง High-Speed",
      },
    ],
    bonuses: [
      "ไฟล์สคริปต์พร้อมใช้งาน ติดตั้งรวดเร็วใน 3 นาที",
      "ระบบค้นหาข้อมูลผ่านเบอร์โทรและรหัสประจำตัว",
      "รองรับการใช้งานบนสมาร์ทโฟนครูทุกระบบ",
    ],
  },
];

export function BundlesView() {
  const [selectedBundle, setSelectedBundle] = useState<string>("all-in-one-lifetime");

  const generateLineOrderUrl = (bundleTitle: string, price: number) => {
    const text = encodeURIComponent(`สวัสดีครับครูอ้น สนใจสั่งซื้อแพ็กเกจเหมา: "${bundleTitle}" (ราคา ${price.toLocaleString()} บาท) ครับ รบกวนขอข้อมูลการชำระเงินและไฟล์ระบบด้วยครับ 🙏`);
    return `https://line.me/R/oaMessage/@deu6776s/?${text}`;
  };

  return (
    <div className="min-h-screen bg-[#070913] text-white overflow-hidden relative pb-28">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cyan-600/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-amber-600/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 font-prompt text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(168,85,247,0.2)]"
          >
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>EXCLUSIVE BUNDLE PACKAGES — คุ้มค่าที่สุด</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-prompt text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            แพ็กเกจเหมาสุดคุ้ม{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-amber-300 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              ลดภาระงานครู
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-prompt text-lg text-white/70 leading-relaxed"
          >
            ยกระดับการทำงานด้วยชุดระบบ Google Apps Script สำเร็จรูป ซื้อเป็นแพ็กเกจประหยัดสูงสุดกว่า 50% รันบน Google Sheets ของตัวเอง ปลอดภัย 100%
          </motion.p>
        </div>

        {/* --- BUNDLES GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {BUNDLE_PACKAGES.map((bundle, idx) => {
            const isSelected = selectedBundle === bundle.id;

            return (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-3xl p-8 transition-all duration-300 border flex flex-col justify-between ${
                  bundle.isFeatured 
                    ? "border-purple-500/60 bg-linear-to-b from-purple-950/30 via-slate-900/90 to-indigo-950/40 shadow-[0_0_50px_rgba(168,85,247,0.25)] ring-1 ring-purple-400/40 lg:scale-[1.02]" 
                    : "border-white/10 bg-slate-900/60 hover:border-white/20 " + bundle.borderGlow
                }`}
              >
                {/* Featured Glow Highlight */}
                {bundle.isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-linear-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-prompt text-xs font-bold shadow-[0_0_20px_rgba(236,72,153,0.5)] flex items-center gap-1.5 uppercase tracking-wider">
                    <Crown className="w-3.5 h-3.5 fill-white text-white" />
                    <span>👑 แนะนำมากที่สุด — ประหยัดกว่า 5,200 ฿</span>
                  </div>
                )}

                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3.5 py-1 rounded-full text-xs font-prompt font-semibold border ${bundle.badgeColor}`}>
                      {bundle.badge}
                    </span>
                    <span className="text-emerald-400 font-prompt text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                      {bundle.discountText}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-prompt text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    {bundle.title}
                  </h3>
                  <p className="font-prompt text-sm text-white/60 mb-6">
                    {bundle.tagline}
                  </p>

                  {/* Pricing Display */}
                  <div className="flex items-baseline gap-3 mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <span className="font-prompt text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-white to-amber-200">
                      {bundle.bundlePrice.toLocaleString()} ฿
                    </span>
                    <span className="font-prompt text-lg text-white/40 line-through">
                      {bundle.originalPrice.toLocaleString()} ฿
                    </span>
                    <span className="text-xs font-prompt text-cyan-300 ml-auto bg-cyan-500/10 px-2 py-1 rounded-lg border border-cyan-500/20">
                      จ่ายครั้งเดียวใช้ได้ตลอดชีพ
                    </span>
                  </div>

                  {/* Target Audience */}
                  <div className="text-xs font-prompt text-white/70 bg-white/5 px-3.5 py-2 rounded-xl border border-white/5 mb-6">
                    {bundle.targetAudience}
                  </div>

                  {/* Included Systems List */}
                  <div className="space-y-3 mb-8">
                    <h4 className="font-prompt text-xs font-bold text-white/50 uppercase tracking-wider">
                      ระบบที่รวมในแพ็กเกจนี้:
                    </h4>
                    {bundle.systems.map((sys, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-prompt text-sm font-bold text-white flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                              {sys.code}
                            </span>
                            {sys.name}
                          </span>
                          <span className="text-xs font-prompt text-white/40 line-through shrink-0">
                            {sys.originalPrice} ฿
                          </span>
                        </div>
                        <p className="font-prompt text-xs text-white/60 leading-relaxed">
                          {sys.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Bonuses Checklist */}
                  <div className="space-y-2.5 mb-8 pt-4 border-t border-white/10">
                    <h4 className="font-prompt text-xs font-bold text-white/50 uppercase tracking-wider mb-3">
                      สิทธิประโยชน์พิเศษที่ได้รับ:
                    </h4>
                    {bundle.bonuses.map((bonus, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs font-prompt text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{bonus}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call To Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <a
                    href={generateLineOrderUrl(bundle.title, bundle.bundlePrice)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 px-6 rounded-2xl text-white font-prompt font-bold text-base flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-98 shadow-lg cursor-pointer bg-linear-to-r ${bundle.btnGradient}`}
                  >
                    <MessageCircle className="w-5 h-5 fill-white/20 text-white" />
                    <span>สั่งซื้อแพ็กเกจนี้ผ่าน LINE OA ทันที</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <div className="text-center">
                    <Link 
                      href="/digital-vault" 
                      className="text-xs font-prompt text-white/50 hover:text-white transition-colors hover:underline inline-flex items-center gap-1"
                    >
                      <span>หรือดูรายละเอียดรายระบบใน Digital Vault</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* --- BUNDLE COMPARISON TABLE --- */}
        <div className="rounded-3xl p-8 sm:p-12 border border-white/10 bg-slate-900/70 max-w-5xl mx-auto mb-20 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-prompt font-bold text-purple-300 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
              📊 COMPARISON TABLE — ตารางเปรียบเทียบแพ็กเกจ
            </span>
            <h3 className="font-prompt text-2xl sm:text-3xl font-extrabold text-white">
              เลือกแพ็กเกจที่เหมาะกับภาระงานของคุณ
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-prompt text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/50">
                  <th className="py-3 px-4">คุณสมบัติ / แพ็กเกจ</th>
                  <th className="py-3 px-4 text-cyan-300">Classroom Pro</th>
                  <th className="py-3 px-4 text-amber-300">Admin Suite</th>
                  <th className="py-3 px-4 text-emerald-300">Scout &amp; Activity</th>
                  <th className="py-3 px-4 text-purple-300 font-bold bg-purple-500/10 rounded-t-xl">All-in-One Lifetime 👑</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">จำนวนระบบที่ได้รับ</td>
                  <td className="py-3 px-4">3 ระบบ (ม.3 &amp; สีขาว)</td>
                  <td className="py-3 px-4">3 ระบบ (ยานพาหนะ &amp; พัสดุ)</td>
                  <td className="py-3 px-4">3 ระบบ (ลูกเสือ &amp; ดนตรี)</td>
                  <td className="py-3 px-4 font-bold text-purple-300 bg-purple-500/5">ครบทั้ง 20 ระบบ ⚡</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">สิทธิ์ใช้งานตลอดชีพ</td>
                  <td className="py-3 px-4 text-emerald-400">✓ มี</td>
                  <td className="py-3 px-4 text-emerald-400">✓ มี</td>
                  <td className="py-3 px-4 text-emerald-400">✓ มี</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold bg-purple-500/5">✓ มีตลอดชีพ</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">สิทธิ์รับระบบใหม่ในอนาคตฟรี</td>
                  <td className="py-3 px-4 text-white/40">-</td>
                  <td className="py-3 px-4 text-white/40">-</td>
                  <td className="py-3 px-4 text-white/40">-</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold bg-purple-500/5">✓ ฟรีตลอดชีพ 🚀</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">สิทธิ์ปรึกษาครูอ้นผ่าน LINE OA</td>
                  <td className="py-3 px-4 text-emerald-400">✓ มี</td>
                  <td className="py-3 px-4 text-emerald-400">✓ มี</td>
                  <td className="py-3 px-4 text-emerald-400">✓ มี</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold bg-purple-500/5">✓ VIP Priority Support</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">ราคาพิเศษ</td>
                  <td className="py-3 px-4 font-bold text-cyan-300">1,490 ฿</td>
                  <td className="py-3 px-4 font-bold text-amber-300">1,990 ฿</td>
                  <td className="py-3 px-4 font-bold text-emerald-300">990 ฿</td>
                  <td className="py-3 px-4 font-black text-purple-300 bg-purple-500/10 rounded-b-xl text-base">4,990 ฿ (ลด 51%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* --- WHY BUY BUNDLE SECTION --- */}
        <div className="rounded-3xl p-8 sm:p-12 border border-white/10 bg-slate-900/60 max-w-5xl mx-auto mb-20 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <h3 className="font-prompt text-2xl sm:text-4xl font-extrabold text-white">
              ทำไมถึงควรเลือกซื้อแบบ <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400">แพ็กเกจ Bundle?</span>
            </h3>
            <p className="font-prompt text-sm text-white/60">
              ทุกระบบเชื่อมต่อข้อมูลกันได้อย่างลื่นไหล รันบน Google Account ของคุณครูเอง 100%
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-prompt text-lg font-bold text-white">ประหยัดสูงสุด 51%</h4>
              <p className="font-prompt text-xs text-white/60 leading-relaxed">
                ซื้อแยกทีละระบบราคารวมกว่าหมื่นบาท เหมายกชุดจ่ายเพียง 4,990 บาท ได้ครบ 20 ระบบพร้อมอัปเดตฟรีตลอดชีพ
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-prompt text-lg font-bold text-white">ปลอดภัย &amp; ไม่มีรายเดือน</h4>
              <p className="font-prompt text-xs text-white/60 leading-relaxed">
                ข้อมูลนักเรียนและเอกสารทั้งหมดจัดเก็บใน Google Drive ของคุณครูเอง ไม่ผ่านเซิร์ฟเวอร์คนกลาง ปลอดภัยตาม พ.ร.บ. คุ้มครองข้อมูล
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-prompt text-lg font-bold text-white">ซัพพอร์ตโดยครูอ้นโดยตรง</h4>
              <p className="font-prompt text-xs text-white/60 leading-relaxed">
                มีปัญหาสามารถทักปรึกษาผ่าน LINE OA ได้ตลอด มีคลิปสอนติดตั้งและแนะนำการใช้งานอย่างละเอียดทุกขั้นตอน
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

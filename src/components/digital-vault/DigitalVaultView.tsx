"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, ShoppingBag, Mic, Sliders, Keyboard, Headphones, 
  ExternalLink, Sparkles, CheckCircle2, Cpu, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { NoBrainerBundles } from "@/components/marketplace/NoBrainerBundles";
import { getProductSetupTier, getSetupTierInfo, SetupTier } from "@/components/marketplace/setupTierHelper";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  icon_name?: string;
  color_classes?: string;
  button_classes?: string;
  image_url?: string;
  setupTier?: "zero-tech" | "easy-setup" | "vip-enterprise";
}

interface HardwareGadget {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tag: string;
  shopeeUrl: string;
  badge: string;
  icon: React.ElementType;
  glowColor: string;
  borderColor: string;
  textColor: string;
  badgeGradient: string;
}

const HARDWARE_ITEMS: HardwareGadget[] = [
  {
    id: "shure-sm27",
    title: "ไมโครโฟน SHURE SM27",
    category: "Microphone / Voice-over",
    description:
      "ไมโครโฟนคอนเดนเซอร์ระดับโปร ให้เสียงพากย์ นุ่ม ลึก คมชัด มิติเสียงกว้าง เหมาะสำหรับการอัดวิดีโอ สตรีมมิ่ง สอนออนไลน์ และแคสต์เกม",
    highlights: [
      "Diaphragm ขนาดใหญ่ ตอบสนองความถี่กว้าง",
      "Low-pass Filter 3 ระดับ ตัดเสียงรบกวนยอดเยี่ยม",
      "โครงสร้างโลหะแข็งแกร่ง มาตรฐาน SHURE ระดับโลก",
    ],
    tag: "เสียงพากย์นุ่มคมชัดระดับสตูดิโอ",
    shopeeUrl: "https://shopee.co.th/search?keyword=SHURE%20SM27",
    badge: "iAon Approved",
    icon: Mic,
    glowColor: "rgba(239, 68, 68, 0.25)",
    borderColor: "border-red-500/30",
    textColor: "text-red-400",
    badgeGradient: "from-red-500 to-rose-600",
  },
  {
    id: "steinberg-ur44",
    title: "ออดิโออินเทอร์เฟซ Steinberg UR44",
    category: "Audio Interface",
    description:
      "Audio Interface 6x4 ช่องสัญญาณ พร้อม D-PRE Preamps คุณภาพสูง รองรับ 24-bit/192kHz ให้สัญญาณเสียงสะอาด ไร้เสียงรบกวน และไม่มี Latency",
    highlights: [
      "4 D-PRE Class-A Mic Preamps พร้อม 48V Phantom",
      "DSP Monitoring ในตัว ฟังสัญญาณสดไร้ดีเลย์",
      "พอร์ต MIDI In/Out + เชื่อมต่อได้ทั้ง PC, Mac, iPad",
    ],
    tag: "กล่องปรับแต่งเสียงใสสะอาด ไร้ดีเลย์",
    shopeeUrl: "https://shopee.co.th/search?keyword=Steinberg%20UR44",
    badge: "Studio Choice",
    icon: Sliders,
    glowColor: "rgba(59, 130, 246, 0.25)",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-400",
    badgeGradient: "from-blue-500 to-cyan-600",
  },
  {
    id: "tech-keyboard-desk",
    title: "Mechanical Keyboard & Studio Setup",
    category: "Desk Setup & Productivity",
    description:
      "คีย์บอร์ดแมคคานิคอลและอุปกรณ์จัดโต๊ะทำงานไอที ช่วยเพิ่มความสบายในการพิมพ์ ลดอาการเมื่อยล้าจากการเขียนโค้ดและตัดต่อยาวนาน",
    highlights: [
      "Custom Switches สัมผัสนุ่ม พิมพ์สบายมือ ไม่เมื่อยล้า",
      "รองรับการเชื่อมต่อไร้สาย Tri-mode (BT / 2.4G / Type-C)",
      "ดีไซน์ Ergonomic สวยงาม พรีเมียม เข้ากับโต๊ะทำงาน",
    ],
    tag: "พิมพ์งานลื่นไหล สบายมือ ตอบโจทย์สาย Code & Content",
    shopeeUrl: "https://shopee.co.th/search?keyword=Mechanical%20Keyboard%20Desk%20Setup",
    badge: "Daily Essential",
    icon: Keyboard,
    glowColor: "rgba(168, 85, 247, 0.25)",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    badgeGradient: "from-purple-500 to-pink-600",
  },
  {
    id: "ath-m50x",
    title: "หูฟังมอนิเตอร์ Audio-Technica ATH-M50x",
    category: "Studio Headphones",
    description:
      "หูฟังมอนิเตอร์ระดับมืออาชีพที่ครีเอเตอร์ทั่วโลกเลือกใช้ ให้ย่านเสียงแม่นยำ ไร้การปรุงแต่ง เพื่อการตรวจเช็คเสียงวิดีโอและงานเพลงที่สมบูรณ์แบบ",
    highlights: [
      "ไดรเวอร์ขนาด 45 mm ตอบสนองเบสแน่นและเสียงแหลมใส",
      "กันเสียงรบกวนรอบข้างยอดเยี่ยม (Sound Isolation)",
      "สายถอดเปลี่ยนได้ 3 แบบ พับเก็บได้ พกพาสะดวก",
    ],
    tag: "ฟังเก็บรายละเอียดเสียง ตัดต่อวิดีโอแม่นยำ",
    shopeeUrl: "https://shopee.co.th/search?keyword=Audio-Technica%20ATH-M50x",
    badge: "Pro Audio",
    icon: Headphones,
    glowColor: "rgba(245, 158, 11, 0.25)",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-400",
    badgeGradient: "from-amber-500 to-orange-600",
  },
];

function HardwareGadgetsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-28 border-t border-white/10 pt-20 relative"
      id="hardware-gadgets"
    >
      {/* Glow backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-amber-500/30 bg-amber-500/8 text-amber-400 text-sm font-prompt font-semibold">
          <Cpu className="w-4 h-4 text-amber-400" />
          <span>iAon Tech Approved Hardware &amp; Studio Gadgets</span>
        </div>

        <h2 className="font-prompt text-3xl md:text-5xl font-extrabold text-white leading-tight">
          อุปกรณ์ไอที &amp; สตูดิโอที่{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-orange-400 to-yellow-300 drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]">
            ครูอ้นใช้และแนะนำจริง
          </span>
        </h2>

        <p className="text-white/60 font-prompt text-base leading-relaxed max-w-xl mx-auto">
          คัดสรรเฉพาะอุปกรณ์คุณภาพสูงสำหรับจัดโต๊ะทำงาน อัดคลิป อบรมออนไลน์ และทำคอนเทนต์ เพื่อประสิทธิภาพที่ดีที่สุดในการทำงาน
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {HARDWARE_ITEMS.map((item, index) => {
          const IconComp = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-full flex flex-col"
            >
              {/* Glow overlay on hover */}
              <div
                className="absolute -inset-0.5 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, ${item.glowColor}, transparent 70%)`,
                }}
              />

              <div
                className={cn(
                  "relative glass-card flex flex-col h-full p-6 bg-zinc-950/80 border transition-all duration-300 group-hover:border-white/20 group-hover:translate-y-[-4px]",
                  item.borderColor
                )}
              >
                {/* Badge */}
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-[11px] font-prompt font-bold text-white bg-linear-to-r shadow-md",
                      item.badgeGradient
                    )}
                  >
                    {item.badge}
                  </span>
                  <span className="text-[11px] font-prompt text-white/40 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Header Icon + Title */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <IconComp className={cn("w-6 h-6", item.textColor)} />
                  </div>
                  <div>
                    <h3 className="font-prompt text-lg font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="mb-4 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-amber-300 text-xs font-prompt font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span>{item.tag}</span>
                </div>

                <p className="font-prompt text-xs text-white/70 leading-relaxed mb-4">
                  {item.description}
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {item.highlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-prompt text-white/80">
                      <CheckCircle2 className={cn("w-3.5 h-3.5 shrink-0 mt-0.5", item.textColor)} />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4 border-t border-white/10">
                  <a
                    href={item.shopeeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-linear-to-r from-[#FF5722] to-[#EE4D2D] hover:from-[#f04812] hover:to-[#d83c1c] text-white font-prompt font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,87,34,0.35)] hover:shadow-[0_0_30px_rgba(255,87,34,0.5)] border border-amber-400/20 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 fill-white/20 text-white shrink-0" />
                    <span>เช็กราคาบน Shopee</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/80 shrink-0" />
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function DigitalVaultView({ initialProducts }: { initialProducts: Product[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [setupTierFilter, setSetupTierFilter] = useState<"all" | SetupTier>("all");

  const zeroTechCount = initialProducts.filter(
    (p) => (p.setupTier || getProductSetupTier(p.id, p.title)) === "zero-tech"
  ).length;
  const easySetupCount = initialProducts.filter(
    (p) => (p.setupTier || getProductSetupTier(p.id, p.title)) === "easy-setup"
  ).length;
  const vipEnterpriseCount = initialProducts.filter(
    (p) => (p.setupTier || getProductSetupTier(p.id, p.title)) === "vip-enterprise"
  ).length;

  const setupTiers: { id: "all" | SetupTier; label: string; count: number; activeClass: string }[] = [
    {
      id: "all",
      label: "✨ ทั้งหมด",
      count: initialProducts.length || 20,
      activeClass: "bg-linear-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-105",
    },
    {
      id: "zero-tech",
      label: "🟢 ก๊อปปี้ใช้ได้ทันที (Zero-Tech)",
      count: zeroTechCount,
      activeClass: "bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.55)] scale-105",
    },
    {
      id: "easy-setup",
      label: "🟡 ตั้งค่าใน 3 นาที",
      count: easySetupCount,
      activeClass: "bg-linear-to-r from-amber-500 to-yellow-600 text-white border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-105",
    },
    {
      id: "vip-enterprise",
      label: "🔴 ระบบระดับโรงเรียน / VIP",
      count: vipEnterpriseCount,
      activeClass: "bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 text-white border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.4)] scale-105",
    },
  ];

  const categories = [
    { id: "All", label: "ทั้งหมด", count: initialProducts.length || 20 },
    { id: "Academic", label: "🎓 วิชาการ & นักเรียน (หมวด E)", count: 11 },
    { id: "Admin", label: "🏢 บริหาร & ยานพาหนะ (หมวด A)", count: 6 },
    { id: "Activity", label: "🎪 กิจกรรม & ดนตรี (หมวด M)", count: 3 },
    { id: "Free", label: "🎁 แจกฟรี (Freebies)", count: 8 },
    { id: "Hardware", label: "🎙️ สตูดิโอ & Gadgets", count: 4 },
  ];

  const handleCategoryClick = (catId: string) => {
    setFilterCategory(catId);
    if (catId === "Hardware") {
      const el = document.getElementById("hardware-gadgets");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const filteredProducts = initialProducts.filter((product) => {
    const title = (product.title || "").toLowerCase();
    const desc = (product.description || "").toLowerCase();
    const matchesSearch =
      title.includes(searchTerm.toLowerCase()) ||
      desc.includes(searchTerm.toLowerCase());
    
    let matchesFilter = false;
    if (filterCategory === "All" || filterCategory === "Hardware") {
      matchesFilter = true;
    } else if (filterCategory === "Academic") {
      matchesFilter = title.includes("aone") || title.includes("นักเรียน") || title.includes("คะแนน") || title.includes("เช็คชื่อ") || title.includes("พฤติกรรม") || title.includes("เครื่องแต่งกาย") || title.includes("ห้องเรียนสีขาว") || title.includes("สอบ");
    } else if (filterCategory === "Admin") {
      matchesFilter = title.includes("aona") || title.includes("บริหาร") || title.includes("ยานพาหนะ") || title.includes("เกียรติบัตร") || title.includes("พัสดุ") || title.includes("สมุดติดต่อ") || title.includes("การลา");
    } else if (filterCategory === "Activity") {
      matchesFilter = title.includes("aonm") || title.includes("ลูกเสือ") || title.includes("ดนตรี") || title.includes("ซ้อมดนตรี");
    } else if (filterCategory === "Free") {
      matchesFilter = product.price === "แจกฟรี" || product.price === "0" || title.includes("แจกฟรี") || title.includes("aone10");
    } else {
      matchesFilter = product.category === filterCategory;
    }

    const productTier = product.setupTier || getProductSetupTier(product.id, product.title);
    let matchesTier = true;
    if (setupTierFilter !== "all") {
      matchesTier = productTier === setupTierFilter;
    }
    
    return matchesSearch && matchesFilter && matchesTier;
  });

  return (
    <div className="min-h-screen text-white pt-8 md:pt-12 pb-20 relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-prompt">
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-prompt font-semibold"
          >
            <ShoppingBag className="w-4 h-4 text-purple-400" />
            <span>DIGITAL VAULT — คลัง 20 ระบบ Google Apps Script สำเร็จรูป</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-prompt text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            คลังระบบอัตโนมัติ{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-amber-300 drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]">
              ช่วยผ่อนแรงครู
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-white/70 font-prompt leading-relaxed max-w-2xl mx-auto"
          >
            รวบรวมระบบ Google Apps Script พร้อมคู่มือภาษาไทย 2 นาที รันบน Google Workspace ตัวเอง ปลอดภัย 100% ไร้ค่าบริการรายเดือน
          </motion.p>

          {/* Value Highlights Pill Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-prompt">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>ตรวจสลิปผ่าน AI อนุมัติใน 2 วิ</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>ดาวน์โหลดไฟล์ผ่าน OneDrive ทันที</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>มีออปชันให้ครูอ้นติดตั้งให้ (VIP Setup)</span>
            </span>
          </div>
        </div>

        {/* --- VIP BUNDLE PROMO BANNER --- */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-10 max-w-4xl mx-auto"
        >
          <Link 
            href="/bundles" 
            className="block p-4 sm:p-5 rounded-2xl bg-linear-to-r from-purple-950/70 via-indigo-950/50 to-pink-950/70 border border-purple-500/40 hover:border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] transition-all group"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-purple-300 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[11px] font-prompt font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      👑 LIFETIME DEAL
                    </span>
                    <p className="font-prompt text-sm sm:text-base font-extrabold text-white group-hover:text-purple-300 transition-colors">
                      เหมาคลัง 20 ระบบตลอดชีพ (ประหยัดสูงสุด 51%)
                    </p>
                  </div>
                  <p className="font-prompt text-xs text-white/60">
                    จ่ายเพียง 4,990 ฿ ได้ครบทั้ง 20 ระบบ + สิทธิ์รับทุกระบบใหม่ตลอดชีพ พร้อมซัพพอร์ต VIP
                  </p>
                </div>
              </div>
              <span className="px-5 py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-prompt text-xs font-bold shrink-0 inline-flex items-center gap-1.5 shadow-lg group-hover:scale-105 transition-transform">
                <span>ดูแพ็กเกจ Bundle</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* --- ZERO-TECH NO-BRAINER BUNDLES (3 มหาบันเดิลสุดคุ้ม) --- */}
        <NoBrainerBundles className="py-4 sm:py-6 mb-4" />

        {/* --- SETUP DIFFICULTY TIER FILTER --- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mb-8 max-w-4xl mx-auto px-2"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="text-xs font-prompt font-bold text-white/70 uppercase tracking-wider flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full shadow-inner">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>เลือกระดับความง่ายในการติดตั้ง &amp; ใช้งาน (Setup Difficulty Tier)</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {setupTiers.map((tier) => {
                const isActive = setupTierFilter === tier.id;
                const isZeroTech = tier.id === "zero-tech";

                return (
                  <button
                    key={tier.id}
                    onClick={() => setSetupTierFilter(tier.id)}
                    className={cn(
                      "py-2.5 px-4 sm:px-5 rounded-2xl font-prompt text-xs sm:text-sm font-bold transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-2 border",
                      isZeroTech && !isActive && "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:border-emerald-400 hover:scale-[1.02]",
                      isActive
                        ? tier.activeClass
                        : !isZeroTech && "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20"
                    )}
                  >
                    <span>{tier.label}</span>
                    <span
                      className={cn(
                        "text-[10px] font-mono px-1.5 py-0.2 rounded-full",
                        isActive ? "bg-white/20 text-white" : isZeroTech ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-white/50"
                      )}
                    >
                      {tier.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Categories Pills - Responsive Flex Wrap */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8 max-w-5xl mx-auto"
        >
          {categories.map((cat) => {
            const isActive = filterCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`py-2.5 px-4 sm:px-5 rounded-2xl font-prompt text-xs sm:text-sm font-semibold transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-linear-to-r from-purple-600 via-pink-600 to-rose-500 text-white border border-purple-400/40 shadow-[0_0_25px_rgba(168,85,247,0.45)] scale-105"
                    : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[11px] font-mono px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-white/10 text-white/50"}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-white/40" />
            </div>
            <input
              type="text"
              className="w-full bg-black/40 border border-white/10 hover:border-white/20 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 rounded-2xl py-3.5 pl-12 pr-12 text-white placeholder-white/40 transition-all font-prompt text-sm outline-none shadow-inner"
              placeholder="ค้นหาชื่อระบบ (เช่น เช็คชื่อ, เกียรติบัตร, ยานพาหนะ, รถโรงเรียน, ลูกเสือ, ดนตรี)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-prompt text-white/40 hover:text-white"
              >
                ล้างคำค้น
              </button>
            )}
          </div>
        </motion.div>

        {/* Product Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={product.id || index} product={product} index={index} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-white/40 glass-card border-white/5">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
              <p className="font-prompt text-lg">ไม่พบระบบที่ตรงกับคำค้นหา</p>
              <button
                onClick={() => { setSearchTerm(""); setFilterCategory("All"); setSetupTierFilter("all"); }}
                className="mt-4 px-5 py-2.5 bg-purple-600/30 border border-purple-500/40 text-purple-300 rounded-xl hover:bg-purple-600/50 font-prompt text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-lg"
              >
                ดูระบบทั้งหมด (20 ระบบ)
              </button>
            </div>
          )}
        </motion.div>

        {/* Hardware & Studio Gadgets Section */}
        <HardwareGadgetsSection />

      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ShoppingBag,
  Mic,
  Sliders,
  Keyboard,
  Headphones,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Zap,
  ShieldCheck,
  Clock,
  SlidersHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { NoBrainerBundles } from "@/components/marketplace/NoBrainerBundles";
import { StudentVaultPromotionSection } from "@/components/student-vault/StudentVaultPromotionSection";
import { getProductSetupTier, SetupTier } from "@/components/marketplace/setupTierHelper";
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
  badgeClass: string;
}

const HARDWARE_ITEMS: HardwareGadget[] = [
  {
    id: "shure-sm27",
    title: "ไมโครโฟน SHURE SM27",
    category: "Microphone / Voice-over",
    description:
      "ไมโครโฟนคอนเดนเซอร์ระดับโปร ให้เสียงพากย์นุ่ม ลึก คมชัด เหมาะสำหรับอัดคลิปสอนออนไลน์ สตรีมมิ่ง และงานเสียง",
    highlights: [
      "Diaphragm ขนาดใหญ่ ตอบสนองความถี่กว้าง",
      "Low-pass Filter 3 ระดับ ตัดเสียงรบกวนยอดเยี่ยม",
      "โครงสร้างโลหะแข็งแกร่ง มาตรฐาน SHURE",
    ],
    tag: "เสียงพากย์นุ่มคมชัดระดับสตูดิโอ",
    shopeeUrl: "https://shopee.co.th/search?keyword=SHURE%20SM27",
    badge: "AiAon Approved",
    icon: Mic,
    badgeClass: "bg-rose-50 text-rose-800 border-rose-200",
  },
  {
    id: "steinberg-ur44",
    title: "Steinberg UR44 Audio Interface",
    category: "Audio Interface",
    description:
      "Audio Interface 6x4 ช่องสัญญาณ พร้อม D-PRE Preamps 24-bit/192kHz สัญญาณเสียงสะอาด ไร้ดีเลย์",
    highlights: [
      "4 D-PRE Class-A Mic Preamps + 48V Phantom",
      "DSP Monitoring ในตัว ฟังเสียงสดไร้ดีเลย์",
      "รองรับทั้ง PC, Mac และ iPad",
    ],
    tag: "กล่องปรับแต่งเสียงใสสะอาด ไร้ดีเลย์",
    shopeeUrl: "https://shopee.co.th/search?keyword=Steinberg%20UR44",
    badge: "Studio Choice",
    icon: Sliders,
    badgeClass: "bg-blue-50 text-blue-800 border-blue-200",
  },
  {
    id: "tech-keyboard-desk",
    title: "Mechanical Keyboard & Studio Setup",
    category: "Desk Setup",
    description:
      "คีย์บอร์ดแมคคานิคอลและอุปกรณ์จัดโต๊ะทำงานไอที ช่วยพิมพ์โค้ดและทำเอกสารได้สบายมือตลอดวัน",
    highlights: [
      "Custom Switches สัมผัสนุ่ม ไม่เมื่อยนิ้ว",
      "เชื่อมต่อไร้สาย Tri-mode (BT / 2.4G / Type-C)",
      "ดีไซน์ Ergonomic เข้ากับโต๊ะทำงาน",
    ],
    tag: "พิมพ์งานลื่นไหล ตอบโจทย์สาย Code & Content",
    shopeeUrl: "https://shopee.co.th/search?keyword=Mechanical%20Keyboard%20Desk%20Setup",
    badge: "Daily Essential",
    icon: Keyboard,
    badgeClass: "bg-purple-50 text-purple-800 border-purple-200",
  },
  {
    id: "ath-m50x",
    title: "หูฟังมอนิเตอร์ Audio-Technica ATH-M50x",
    category: "Studio Headphones",
    description:
      "หูฟังมอนิเตอร์ระดับมืออาชีพ ให้ย่านเสียงแม่นยำ ไร้การปรุงแต่ง สำหรับตรวจเช็คเสียงวิดีโอและงานเพลง",
    highlights: [
      "ไดรเวอร์ 45 mm เบสแน่น เสียงแหลมใส",
      "กันเสียงรบกวนรอบข้างยอดเยี่ยม",
      "สายถอดเปลี่ยนได้ 3 แบบ พับเก็บพกพาสะดวก",
    ],
    tag: "ฟังเก็บรายละเอียดเสียง ตัดต่อวิดีโอแม่นยำ",
    shopeeUrl: "https://shopee.co.th/search?keyword=Audio-Technica%20ATH-M50x",
    badge: "Pro Audio",
    icon: Headphones,
    badgeClass: "bg-amber-50 text-amber-900 border-amber-200",
  },
];

function HardwareGadgetsSection() {
  return (
    <section
      className="mt-20 pt-16 border-t border-[#E2E8F0]"
      id="hardware-gadgets"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
            <Cpu className="w-3.5 h-3.5 text-amber-700" />
            <span>APPROVED HARDWARE &amp; STUDIO DESK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            อุปกรณ์ไอที &amp; สตูดิโอที่ครูอ้นใช้ทำงานจริง
          </h2>
          <p className="text-sm text-[#475569]">
            คัดเฉพาะอุปกรณ์ที่ทนและคุ้มค่าสำหรับอัดคลิป อบรมออนไลน์ และเขียนโค้ด
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {HARDWARE_ITEMS.map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.id}
              className="flex flex-col p-6 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/40 shadow-2xs hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center gap-2 mb-4">
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-[11px] font-bold border",
                    item.badgeClass
                  )}
                >
                  {item.badge}
                </span>
                <span className="text-[11px] text-[#64748B] font-mono truncate">
                  {item.category}
                </span>
              </div>

              <div className="flex items-start gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] shrink-0">
                  <IconComp className="w-5 h-5 text-[#2563EB]" />
                </div>
                <h3 className="text-base font-bold text-[#0F172A] leading-snug">
                  {item.title}
                </h3>
              </div>

              <p className="text-xs text-[#475569] leading-relaxed mb-4">
                {item.description}
              </p>

              <ul className="space-y-1.5 mb-5 flex-1">
                {item.highlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#1E293B]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#0F766E]" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>

              <a
                href={item.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full py-2.5 px-4 rounded-xl bg-[#F8FAFC] hover:bg-[#0F172A] text-[#0F172A] hover:text-white border border-[#E2E8F0] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>เช็กราคาบน Shopee</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
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

  const setupTiers: { id: "all" | SetupTier; label: string; count: number }[] = [
    { id: "all", label: "ทุกระดับ", count: initialProducts.length || 20 },
    { id: "zero-tech", label: "ก๊อปปี้ใช้ทันที (Zero-Tech)", count: zeroTechCount },
    { id: "easy-setup", label: "ตั้งค่าใน 3 นาที", count: easySetupCount },
    { id: "vip-enterprise", label: "ระดับโรงเรียน / VIP", count: vipEnterpriseCount },
  ];

  const academicCount = initialProducts.filter((p) => {
    const t = (p.title || "").toLowerCase();
    return (
      t.includes("aone") ||
      t.includes("นักเรียน") ||
      t.includes("คะแนน") ||
      t.includes("เช็คชื่อ") ||
      t.includes("พฤติกรรม") ||
      t.includes("ห้องเรียนสีขาว") ||
      t.includes("สอบ")
    );
  }).length;
  const adminCount = initialProducts.filter((p) => {
    const t = (p.title || "").toLowerCase();
    return (
      t.includes("aona") ||
      t.includes("บริหาร") ||
      t.includes("ยานพาหนะ") ||
      t.includes("เกียรติบัตร") ||
      t.includes("พัสดุ") ||
      t.includes("การลา") ||
      t.includes("แจ้งซ่อม") ||
      t.includes("สุขาภิบาล") ||
      t.includes("แม่บ้าน")
    );
  }).length;

  const categories = [
    { id: "All", label: "ทั้งหมด", count: initialProducts.length },
    { id: "Academic", label: "ครูผู้สอน & ห้องเรียน", count: academicCount },
    { id: "Admin", label: "บริหารโรงเรียน & อาคาร", count: adminCount },
    { id: "Hardware", label: "สตูดิโอ & Gadgets", count: 4 },
  ];

  const handleCategoryClick = (catId: string) => {
    setFilterCategory(catId);
    if (catId === "Hardware") {
      const el = document.getElementById("hardware-gadgets");
      if (el) el.scrollIntoView({ behavior: "smooth" });
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
      matchesFilter =
        title.includes("aone") ||
        title.includes("นักเรียน") ||
        title.includes("คะแนน") ||
        title.includes("เช็คชื่อ") ||
        title.includes("พฤติกรรม") ||
        title.includes("เครื่องแต่งกาย") ||
        title.includes("ห้องเรียนสีขาว") ||
        title.includes("สอบ");
    } else if (filterCategory === "Admin") {
      matchesFilter =
        title.includes("aona") ||
        title.includes("บริหาร") ||
        title.includes("ยานพาหนะ") ||
        title.includes("เกียรติบัตร") ||
        title.includes("พัสดุ") ||
        title.includes("สมุดติดต่อ") ||
        title.includes("การลา") ||
        title.includes("แจ้งซ่อม") ||
        title.includes("สุขาภิบาล") ||
        title.includes("แม่บ้าน");
    } else {
      matchesFilter = product.category === filterCategory;
    }

    const productTier = product.setupTier || getProductSetupTier(product.id, product.title);
    const matchesTier = setupTierFilter === "all" || productTier === setupTierFilter;

    return matchesSearch && matchesFilter && matchesTier;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-prompt overflow-x-hidden pb-20">
      {/* =================================================================
          1. PRECISION PRODUCT STUDIO HERO (LINEAR + STRIPE PERSONALITY)
      ================================================================= */}
      <section className="relative pt-8 pb-14 sm:pt-12 sm:pb-16 border-b border-[#E2E8F0] bg-[#FFFFFF]">
        {/* Subtle Precision Blueprint Grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none"
        />

        <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-7 space-y-5"
            >
              <div className="flex flex-wrap items-center gap-3">
                <img
                  src="/brand/svg/aiaon-tech_lockup_horizontal_fullcolor-on-light.svg"
                  alt="AiAon Tech"
                  className="h-8 sm:h-9 w-auto"
                />
                <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D4ED8] text-xs font-mono font-bold">
                  DIGITAL VAULT • {initialProducts.length} SYSTEMS
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] leading-[1.15] tracking-tight">
                คลังระบบโรงเรียนอัตโนมัติ{" "}
                <span className="text-[#2563EB]">พร้อมติดตั้งใน 3 นาที</span>
              </h1>

              <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl">
                รวบรวมซอร์สโค้ด Google Apps Script ที่ผ่านสนามจริงกับนักเรียนกว่า 4,000 คน รันบน Google Workspace ของโรงเรียนเอง 100% ปลอดภัยตาม PDPA และไม่มีค่ารายเดือนตลอดชีพ
              </p>

              {/* Technical Spec Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs">
                  <Clock className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span className="text-xs font-semibold text-[#0F172A]">ลดภาระงาน 20+ ชม./เดือน</span>
                </div>
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-[#0F172A]">ข้อมูลอยู่บน Drive ตัวเอง</span>
                </div>
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-semibold text-[#0F172A]">จ่ายครั้งเดียว ใช้ตลอดชีพ</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#vault-catalog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-sm shadow-sm transition-all"
                >
                  <span>เลือกดูระบบทั้งหมด ({initialProducts.length})</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/bundles"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-blue-50 text-[#0F172A] border border-[#CBD5E1] font-bold text-sm transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>เหมา 20 ระบบตลอดชีพ (4,990 ฿)</span>
                </Link>
              </div>
            </motion.div>

            {/* Right: Crisp Product Preview Frame */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl bg-white border border-[#E2E8F0] p-3 shadow-md space-y-3">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0]">
                  <Image
                    src="/brand/visuals/hero_aiaon_tech.webp"
                    alt="AiAon Tech — ระบบโรงเรียนอัตโนมัติ"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 480px"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 px-2 py-1">
                  <div>
                    <div className="text-[11px] font-mono font-bold text-[#2563EB]">
                      FIELD-TESTED ARCHITECTURE
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#0F172A]">
                      Web App + Google Sheets + Telegram 2 ทาง
                    </div>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                    0 ฿/เดือน
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =================================================================
          2. UNIFIED PRECISION COMMAND BAR + PRODUCT CATALOG
      ================================================================= */}
      <section id="vault-catalog" className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-10 sm:pt-12 scroll-mt-20">
        {/* Sleek Linear-Style Filter Toolbar */}
        <div className="rounded-3xl bg-white border border-[#E2E8F0] p-4 sm:p-5 shadow-2xs mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3.5">
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#64748B] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 rounded-2xl py-3 pl-11 pr-16 text-[#0F172A] placeholder-[#94A3B8] text-sm outline-none transition-all"
                placeholder="ค้นหาระบบ (เช่น แจ้งซ่อม, สุขาภิบาล, เช็คชื่อ, ห้องเรียนสีขาว, คะแนน)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] cursor-pointer"
                >
                  ล้าง
                </button>
              )}
            </div>

            {/* Category Segmented Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => {
                const isActive = filterCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={cn(
                      "px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 border",
                      isActive
                        ? "bg-[#0F172A] text-white border-[#0F172A]"
                        : "bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:text-[#0F172A] hover:bg-slate-100"
                    )}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={cn(
                        "text-[10px] font-mono px-1.5 py-0.5 rounded-full",
                        isActive ? "bg-white/20 text-white" : "bg-white text-[#64748B]"
                      )}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Setup Difficulty Sub-bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F1F5F9]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>ความยากการติดตั้ง:</span>
              </span>
              {setupTiers.map((tier) => {
                const isActive = setupTierFilter === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => setSetupTierFilter(tier.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 border",
                      isActive
                        ? "bg-[#EFF6FF] text-[#1D4ED8] border-[#93C5FD]"
                        : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#CBD5E1]"
                    )}
                  >
                    <span>{tier.label}</span>
                    <span className="text-[10px] font-mono opacity-75">({tier.count})</span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-mono text-[#64748B]">
              แสดง <strong className="text-[#0F172A]">{filteredProducts.length}</strong> / {initialProducts.length} ระบบ
            </div>
          </div>
        </div>

        {/* Clean 3-Column Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={product.id || index} product={product} index={index} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-[#64748B] bg-white rounded-3xl border border-[#E2E8F0]">
              <ShoppingBag className="w-14 h-14 mb-3 opacity-25" />
              <p className="text-lg text-[#0F172A] font-bold">ไม่พบระบบที่ตรงกับคำค้นหา</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterCategory("All");
                  setSetupTierFilter("all");
                }}
                className="mt-4 px-5 py-2.5 bg-[#1D4ED8] text-white rounded-xl hover:bg-[#1E40AF] text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                รีเซ็ตตัวกรองทั้งหมด
              </button>
            </div>
          )}
        </motion.div>

        {/* =================================================================
            3. LIFETIME DEAL & VALUE BUNDLES (CLEAN UPSELL BELOW CATALOG)
        ================================================================= */}
        <div className="mt-20 space-y-8">
          <Link
            href="/bundles"
            className="block p-6 sm:p-8 rounded-3xl bg-white border border-[#BFDBFE] hover:border-[#2563EB] shadow-2xs hover:shadow-md transition-all group"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
              <div className="space-y-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                  👑 ALL-IN-ONE LIFETIME DEAL • ประหยัดสูงสุด 51%
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                  เหมาคลัง 20 ระบบตลอดชีพ เพียง 4,990 ฿
                </h2>
                <p className="text-xs sm:text-sm text-[#475569]">
                  ได้ครบทั้ง 20 ระบบ + สิทธิ์รับทุกระบบใหม่ในอนาคตตลอดชีพ พร้อมซัปพอร์ต VIP จากครูอ้นโดยตรง
                </p>
              </div>
              <span className="px-6 py-3.5 rounded-2xl bg-[#0F172A] group-hover:bg-[#1D4ED8] text-white text-sm font-bold shrink-0 inline-flex items-center gap-2 transition-colors">
                <span>ดูแพ็กเกจเหมาทั้งหมด</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          <NoBrainerBundles className="py-2" />
          <StudentVaultPromotionSection className="py-2" />
        </div>

        {/* =================================================================
            4. APPROVED HARDWARE & STUDIO GADGETS
        ================================================================= */}
        <HardwareGadgetsSection />
      </section>
    </div>
  );
}

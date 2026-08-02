"use client";

import { useState } from "react";
import { 
  Search, ShoppingBag, Mic, Sliders, Keyboard, Headphones, 
  ExternalLink, Sparkles, CheckCircle2, Cpu 
} from "lucide-react";
import { useBrandTheme } from "@/components/providers/BrandThemeProvider";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/marketplace/ProductCard";
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

                {/* Highlight Tag */}
                <div className="mb-4 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-amber-300 text-xs font-prompt font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span>{item.tag}</span>
                </div>

                {/* Description */}
                <p className="font-prompt text-xs text-white/70 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Feature Bullet Points */}
                <ul className="space-y-2 mb-6 flex-1">
                  {item.highlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-prompt text-white/80">
                      <CheckCircle2 className={cn("w-3.5 h-3.5 shrink-0 mt-0.5", item.textColor)} />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                {/* Shopee Button */}
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
  const { brandTheme } = useBrandTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = [
    { id: "All", label: "ทั้งหมด" },
    { id: "GoogleScript", label: "กูเกิลสคริปต์" },
    { id: "EBook", label: "E-Book" },
    { id: "Service", label: "ดนตรี/ดีไซน์" },
    { id: "Hardware", label: "อุปกรณ์ไอที & Studio" },
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
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = false;
    if (filterCategory === "All" || filterCategory === "Hardware") {
      matchesFilter = true;
    } else if (filterCategory === "GoogleScript") {
      const cat = product.category?.toLowerCase() || "";
      const title = product.title.toLowerCase();
      const desc = product.description.toLowerCase();
      matchesFilter = 
        cat === "template" || 
        cat === "automation" || 
        cat === "script" || 
        cat === "googlescript" ||
        cat === "google script" ||
        cat === "google apps script" ||
        title.includes("script") || 
        title.includes("สคริปต์") || 
        desc.includes("script") || 
        desc.includes("สคริปต์");
    } else if (filterCategory === "EBook") {
      const cat = product.category?.toLowerCase() || "";
      const title = product.title.toLowerCase();
      const desc = product.description.toLowerCase();
      matchesFilter = 
        cat === "ebook" || 
        cat === "e-book" || 
        title.includes("ebook") || 
        title.includes("e-book") || 
        title.includes("อีบุ๊ก") || 
        title.includes("หนังสือ") || 
        desc.includes("ebook") || 
        desc.includes("e-book") || 
        desc.includes("อีบุ๊ก") || 
        desc.includes("หนังสือ") || 
        desc.includes("คู่มือ");
    } else if (filterCategory === "Service") {
      matchesFilter = product.category?.toLowerCase() === "service" || product.category?.toLowerCase() === "creative";
    } else {
      matchesFilter = product.category === filterCategory;
    }
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full relative overflow-hidden min-h-screen pb-24">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-purple-500/5 blur-[140px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/3" />
      <div className="absolute top-[35%] right-[-100px] w-[500px] h-[500px] bg-pink-500/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6 pt-12 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-purple-500/30 bg-purple-500/5 text-purple-400 text-sm font-prompt font-medium"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Digital Vault — คลังสินค้าดิจิทัลและระบบช่วยเหลือ</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-prompt text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight"
          >
            Digital{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-rose-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]">
              Vault
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-white/55 font-prompt leading-relaxed max-w-xl mx-auto"
          >
            รวมสินค้าดิจิทัล คู่มือปฏิบัติงาน และอุปกรณ์ไอที/สตูดิโอที่ออกแบบและเลือกใช้โดยครูอ้น
          </motion.p>
        </div>

        {/* Categories Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex bg-white/5 p-1 rounded-xl w-full max-w-lg mb-6 border border-white/10 mx-auto md:mx-0 overflow-x-auto"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex-1 py-2 px-3 whitespace-nowrap rounded-lg font-prompt text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 cursor-pointer ${
                filterCategory === cat.id
                  ? "bg-linear-to-r from-purple-600 to-pink-500 text-white border border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.45)]"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-white/40" />
            </div>
            <input
              type="text"
              className="w-full bg-black/40 border border-white/10 hover:border-white/20 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-white/40 transition-all font-prompt text-sm outline-none"
              placeholder="ค้นหาสินค้า (เช่น ระบบเช็คชื่อ, ให้คำปรึกษา)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
              <p className="font-prompt text-lg">ไม่พบสินค้าในคลังสินค้าดิจิทัล</p>
              <button
                onClick={() => { setSearchTerm(""); setFilterCategory("All"); }}
                className="mt-4 px-4 py-2 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/10 font-prompt text-sm transition-colors animate-pulse cursor-pointer"
              >
                ล้างการค้นหา
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

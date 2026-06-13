"use client";

import { useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { useBrandTheme } from "@/components/providers/BrandThemeProvider";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/marketplace/ProductCard";

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

export function DigitalVaultView({ initialProducts }: { initialProducts: Product[] }) {
  const { brandTheme } = useBrandTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = [
    { id: "All", label: "ทั้งหมด" },
    { id: "GoogleScript", label: "กูเกิลสคริปต์" },
    { id: "EBook", label: "E-Book" },
    { id: "Service", label: "ดนตรี/ดีไซน์" }
  ];

  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = false;
    if (filterCategory === "All") {
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
            รวมสินค้าดิจิทัลและคู่มือปฏิบัติงานที่ออกแบบมาเพื่อช่วยผ่อนแรงครูไทย ยกระดับประสิทธิภาพการสอนให้สูงสุด
          </motion.p>
        </div>

        {/* Categories Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex bg-white/5 p-1 rounded-xl w-full max-w-md mb-6 border border-white/10 mx-auto md:mx-0"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`flex-1 py-2 rounded-lg font-prompt text-sm font-medium transition-all duration-200 active:scale-95 ${
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
                className="mt-4 px-4 py-2 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/10 font-prompt text-sm transition-colors animate-pulse"
              >
                ล้างการค้นหา
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
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

export function ProductClientGrid({ initialProducts }: { initialProducts: Product[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = [
    { id: "All", label: "ทั้งหมด" },
    { id: "Template", label: "ระบบ/สคริปต์" },
    { id: "Service", label: "ดนตรี/ดีไซน์" }
  ];

  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = false;
    if (filterCategory === "All") {
      matchesFilter = true;
    } else if (filterCategory === "Template") {
      matchesFilter = product.category?.toLowerCase() === "template" || product.category?.toLowerCase() === "automation";
    } else if (filterCategory === "Service") {
      matchesFilter = product.category?.toLowerCase() === "service" || product.category?.toLowerCase() === "creative";
    } else {
      matchesFilter = product.category === filterCategory;
    }
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full flex flex-col min-h-0">
      {/* Category Filter (Pill Buttons Style) */}
      <div className="flex bg-white/5 p-1 rounded-xl w-full max-w-sm mb-6 border border-white/10 mx-auto md:mx-0">
          {categories.map((cat) => (
              <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  className={`flex-1 py-2 rounded-lg font-prompt text-sm font-medium transition-all duration-200 active:scale-95 ${
                      filterCategory === cat.id
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border border-amber-400/30 shadow-[0_0_15px_rgba(245,158,11,0.45)]"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
              >
                  {cat.label}
              </button>
          ))}
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-white/40" />
          </div>
          <input
            type="text"
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-prompt"
            placeholder="ค้นหาสินค้า (เช่น ระบบเช็คชื่อ, ให้คำปรึกษา)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id || index} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-white/40 glass-card border-white/5">
          <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
          <p className="font-prompt text-lg">ไม่พบสินค้าที่ตรงกับการค้นหา</p>
          <button
            onClick={() => { setSearchTerm(""); setFilterCategory("All"); }}
            className="mt-4 px-4 py-2 border border-amber-500/30 text-amber-400 rounded-lg hover:bg-amber-500/10 font-prompt text-sm transition-colors"
          >
            ล้างการค้นหา
          </button>
        </div>
      )}
    </div>
  );
}

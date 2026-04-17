"use client";

import { useState } from "react";
import { Search, ShoppingCart, Tag, Filter, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import { useBrandTheme } from "@/components/providers/BrandThemeProvider";

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
  const { brandTheme } = useBrandTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = ["All", "Template", "Service"];

  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterCategory === "All" || product.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full flex flex-col min-h-0">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-white/40" />
          </div>
          <input
            type="text"
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-prompt"
            placeholder="ค้นหาสินค้า (เช่น ระบบเช็คชื่อ, ให้คำปรึกษา)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          <div className="flex items-center gap-2 text-white/50 px-2 shrink-0">
            <Filter className="w-4 h-4" />
            <span className="font-prompt text-sm mr-2">หมวดหมู่:</span>
          </div>
          {categories.map((cat) => {
            const label =
              cat === "All" ? "ทั้งหมด" : cat === "Template" ? "ระบบ/สคริปต์" : "บริการพิเศษ";
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-lg border font-prompt text-sm transition-all shrink-0 ${
                  filterCategory === cat
                    ? "bg-blue-500 text-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => {
            // Parse format/type tag from description
            let rawDesc = product.description;
            let parsedType = "";
            const matchFormat = rawDesc.match(/\(Format:\s*(.+?)\)/);
            const matchType = rawDesc.match(/\(Type:\s*(.+?)\)/);
            if (matchFormat) {
              parsedType = matchFormat[1];
              rawDesc = rawDesc.replace(matchFormat[0], "").trim();
            } else if (matchType) {
              parsedType = matchType[1];
              rawDesc = rawDesc.replace(matchType[0], "").trim();
            }

            const IconComponent =
              (Icons as any)[product.icon_name || "Package"] || Package;
            const colorClass =
              product.color_classes ||
              "text-blue-400 bg-blue-500/10 border-blue-500/20";
            const buttonClass =
              product.button_classes || "bg-blue-500 hover:bg-blue-600";

            // Guard: a valid Supabase UUID is a string longer than 8 chars
            const isValidId =
              product.id &&
              typeof product.id === "string" &&
              product.id.length > 8;

            if (!isValidId) {
              console.warn(
                `[Marketplace] Product "${product.title}" has invalid id: "${product.id}" — link disabled.`
              );
            }

            const isMusicBrand = brandTheme === 'music';
            const hoverBorder = isMusicBrand ? "hover:border-amber-500/40" : "hover:border-blue-500/30";
            const hoverText = isMusicBrand ? "group-hover:text-amber-400" : "group-hover:text-blue-400";
            const focusGradient = isMusicBrand ? "from-amber-600 to-orange-400" : "from-blue-500 to-cyan-400";

            const CardInner = (
              <div className={`glass-card flex flex-col h-full border-white/10 ${hoverBorder} hover:bg-white/[0.03] transition-all duration-300 relative overflow-hidden bg-white/5 shadow-xl`}>
                
                {/* 16:9 Vault Cover */}
                <div className={`relative w-full aspect-video shrink-0 bg-black/40 border-b border-white/10 overflow-hidden ${hoverBorder} transition-colors`}>
                  {product.image_url ? (
                    <Image 
                      src={product.image_url} 
                      alt={product.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100" 
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${focusGradient} flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-500`}>
                      <IconComponent className="w-12 h-12 text-white/50 group-hover:scale-110 group-hover:text-white/80 transition-all duration-500" />
                    </div>
                  )}
                  
                  {/* Category Badge Overlay */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white/80 border border-white/20 px-3 py-1 rounded-full text-[10px] font-prompt font-medium uppercase tracking-wider shadow-lg z-10">
                    {product.category}
                  </div>
                </div>

                {/* Decorative glow at bottom */}
                <div className={`absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br ${focusGradient} opacity-5 group-hover:opacity-15 blur-[40px] rounded-full transition-opacity duration-500 pointer-events-none`}></div>

                <div className="p-6 flex flex-col flex-1 z-10 bg-gradient-to-b from-black/0 to-black/40">
                  <h3 className={`text-lg font-bold font-prompt text-white mb-2 line-clamp-2 leading-tight ${hoverText} transition-colors`}>
                    {product.title}
                  </h3>

                  {parsedType && (
                    <div className="flex items-center gap-1.5 mb-3 text-xs font-prompt text-emerald-400">
                      <Tag className="w-3.5 h-3.5" />
                      <span className="truncate">{parsedType}</span>
                    </div>
                  )}

                  <p className="text-sm font-prompt text-white/50 mb-6 flex-1 line-clamp-3">
                    {rawDesc}
                  </p>

                  <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/10">
                    <div>
                      <p className="text-xs text-white/40 font-prompt mb-1">ราคาเริ่มต้น</p>
                      <p className="text-lg font-bold text-white font-prompt">{product.price}</p>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-lg text-white font-prompt text-sm shadow-lg shadow-black/20 ${
                        isValidId ? (isMusicBrand ? "bg-amber-600 hover:bg-amber-500" : "bg-blue-600 hover:bg-blue-500") : "bg-white/10"
                      } transition-colors`}
                    >
                      {isValidId ? "ดูรายละเอียด →" : "ไม่มีข้อมูล"}
                    </div>
                  </div>
                </div>
              </div>
            );

            return isValidId ? (
              <Link
                key={product.id}
                href={`/dashboard/marketplace/${product.id}`}
                className="block group cursor-pointer"
              >
                {CardInner}
              </Link>
            ) : (
              <div key={`no-id-${index}`} className="opacity-40 cursor-not-allowed">
                {CardInner}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-white/40 glass-card border-white/5">
          <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
          <p className="font-prompt text-lg">ไม่พบสินค้าที่ตรงกับการค้นหา</p>
          <button
            onClick={() => { setSearchTerm(""); setFilterCategory("All"); }}
            className="mt-4 px-4 py-2 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/10 font-prompt text-sm transition-colors"
          >
            ล้างการค้นหา
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useBrandTheme } from "@/components/providers/BrandThemeProvider";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  icon_name?: string;
  color_classes?: string;
  button_classes?: string;
  category?: string;
  image_url?: string;
}

function getIconComponent(name?: string) {
  return name ? ((Icons as any)[name] || Icons.Package) : Icons.Package;
}

interface ProductsSectionProps {
  products: Product[];
}

export function ProductsSection({ products }: ProductsSectionProps) {
  const { brandTheme } = useBrandTheme();

  return (
    <section className="py-24 px-4 relative z-10 w-full overflow-hidden bg-black/50 border-y border-white/5" id="products">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 px-4">
          <h2 className="font-prompt text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Vault</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl font-prompt font-light leading-relaxed">
            รวมสินค้าดิจิทัลและคู่มือปฏิบัติงานที่ออกแบบมาเพื่อช่วยผ่อนแรงครูไทย ยกระดับประสิทธิภาพการสอนให้สูงสุด
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const IconComponent = getIconComponent(product.icon_name);
            const isMusicBrand = brandTheme === 'music';
            const hoverBorder = isMusicBrand ? "hover:border-amber-500/40" : "hover:border-blue-500/40";
            const focusGradient = isMusicBrand ? "from-amber-600 to-orange-400" : "from-blue-500 to-cyan-400";
            const buttonColor = isMusicBrand ? "bg-amber-600" : "bg-blue-600";
            const glowColor = isMusicBrand ? "bg-amber-500/10" : "bg-blue-500/10";
            
            return (
              <Link
                key={product.id}
                href={`/dashboard/marketplace/${product.id}`}
                className="group block h-full cursor-pointer"
              >
                <div className={`glass-card flex flex-col h-full border-white/10 ${hoverBorder} transition-all duration-300 relative overflow-hidden bg-white/5`}>
                  {/* Decorative ambient glow */}
                  <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] pointer-events-none transition-colors duration-500 ${glowColor}`} />

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
                  </div>

                  <div className="p-6 flex flex-col flex-1 relative z-10 bg-gradient-to-b from-black/0 to-black/40">
                    <h3 className={`text-2xl font-bold font-prompt text-white mb-3 transition-colors line-clamp-2 leading-snug ${isMusicBrand ? "group-hover:text-amber-400" : "group-hover:text-blue-400"}`}>
                      {product.title}
                    </h3>
                    <p className="text-sm md:text-base font-prompt text-white/60 mb-6 flex-1 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-full p-1.5 pl-5 mt-auto transition-colors">
                      <span className="font-bold text-white font-prompt tracking-wide text-sm">{product.price}</span>
                      <div className={`text-white rounded-full p-2 px-4 flex items-center gap-2 text-sm font-prompt transition-colors ${buttonColor}`}>
                        <Download className="w-4 h-4" /> สั่งซื้อเลย
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/dashboard/marketplace"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-purple-500/40 text-white font-prompt font-semibold text-base hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300 shadow-[0_0_0px_rgba(168,85,247,0)] hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]"
          >
            <span>ดูสินค้าทั้งหมด</span>
            <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}

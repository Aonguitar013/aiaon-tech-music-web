"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/marketplace/ProductCard";

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

interface ProductsSectionProps {
  products: Product[];
}

export function ProductsSection({ products }: ProductsSectionProps) {
  return (
    <section className="py-24 px-4 relative z-10 w-full overflow-hidden bg-black/50 border-y border-white/5" id="products">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 px-4">
          <h2 className="font-prompt text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Digital <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">Vault</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl font-prompt font-light leading-relaxed">
            รวมสินค้าดิจิทัลและคู่มือปฏิบัติงานที่ออกแบบมาเพื่อช่วยผ่อนแรงครูไทย ยกระดับประสิทธิภาพการสอนให้สูงสุด
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id || index} product={{ ...product, category: product.category || "Template" }} index={index} />
          ))}
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

"use client";

import React from "react";
import { Tag, Gift, Download, Sparkles, ShieldCheck, Zap, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useBrandTheme } from "@/components/providers/BrandThemeProvider";
import { cn } from "@/lib/utils";

export interface Product {
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

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { brandTheme } = useBrandTheme();

  let rawDesc = product.description;
  let parsedType = "";
  const matchFormat = rawDesc.match(/\(Format:\s*(.+?)\)/i);
  const matchType = rawDesc.match(/\(Type:\s*(.+?)\)/i);
  if (matchFormat) {
    parsedType = matchFormat[1];
    rawDesc = rawDesc.replace(matchFormat[0], "").trim();
  } else if (matchType) {
    parsedType = matchType[1];
    rawDesc = rawDesc.replace(matchType[0], "").trim();
  }

  const isMusicBrand = brandTheme === "music";
  const hoverBorder = isMusicBrand 
    ? "hover:border-amber-400 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]" 
    : "hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]";
  const hoverText = isMusicBrand ? "group-hover:text-amber-300" : "group-hover:text-cyan-300";
  const focusGradient = isMusicBrand ? "from-amber-600 to-orange-400" : "from-cyan-500 to-blue-600";

  const priceStr = (product.price || "").trim().toLowerCase();
  const isFree =
    priceStr === "0" ||
    priceStr === "0 thb" ||
    priceStr === "ฟรี" ||
    priceStr === "0 บาท" ||
    priceStr === "free" ||
    priceStr === "";

  // Parse numeric price for friendly discount anchor calculation
  const numericPrice = parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;
  const originalAnchorPrice = numericPrice > 0 ? Math.round(numericPrice * 1.6 + 100) : 590;

  const isValidId =
    product.id && typeof product.id === "string" && product.id.length > 8;

  const CardInner = (
    <div className={cn(
      "glass-card flex flex-col h-full rounded-3xl border border-white/10 transition-all duration-300 relative overflow-hidden bg-slate-950/70 shadow-xl hover:bg-slate-900/90",
      hoverBorder
    )}>
      {/* Top Ambient Glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none" />

      {/* FREE Badge Overlay */}
      {isFree && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 text-zinc-950 text-xs font-black font-prompt shadow-[0_0_20px_rgba(16,185,129,0.7)] border border-emerald-300/40 uppercase tracking-wider animate-pulse">
          <Gift className="w-3.5 h-3.5 shrink-0" />
          <span>🎁 รับโค้ดฟรี</span>
        </div>
      )}

      {/* 16:9 Cover Image */}
      <div className="relative w-full aspect-video shrink-0 bg-black/50 border-b border-white/10 overflow-hidden">
        {(() => {
          const lowerTitle = product.title.toLowerCase();
          let mockImage = product.image_url;

          if (!mockImage) {
            if (lowerTitle.includes("e-commerce") || lowerTitle.includes("payment")) {
              mockImage = "/images/mockups/ecommerce_store_mockup.png";
            } else if (lowerTitle.includes("admin") || lowerTitle.includes("crypto") || lowerTitle.includes("dashboard")) {
              mockImage = "/images/mockups/admin_dashboard_pro.png";
            } else if (lowerTitle.includes("portfolio") || lowerTitle.includes("gallery") || lowerTitle.includes("design") || lowerTitle.includes("figma")) {
              mockImage = "/images/mockups/portfolio_creative_ui.png";
            } else if (lowerTitle.includes("fitness") || lowerTitle.includes("social") || lowerTitle.includes("music") || lowerTitle.includes("app")) {
              mockImage = "/images/mockups/mobile_app_mockup.png";
            } else if (lowerTitle.includes("booking") || lowerTitle.includes("event") || lowerTitle.includes("restaurant") || lowerTitle.includes("travel") || lowerTitle.includes("job")) {
              mockImage = "/images/mockups/booking_schedule_ui.png";
            } else if (lowerTitle.includes("educational") || lowerTitle.includes("lms") || lowerTitle.includes("mentorship") || lowerTitle.includes("forum")) {
              mockImage = "/images/mockups/teaching_media_template_1779443134799.png";
            } else if (lowerTitle.includes("supabase") || lowerTitle.includes("database") || lowerTitle.includes("server") || lowerTitle.includes("api") || lowerTitle.includes("deployment") || lowerTitle.includes("pipeline")) {
              mockImage = "/images/mockups/workflow_automation_pro_1779443939357.png";
            } else if (lowerTitle.includes("code review") || lowerTitle.includes("bug") || lowerTitle.includes("refactoring") || lowerTitle.includes("seo") || lowerTitle.includes("audit") || lowerTitle.includes("conversion") || lowerTitle.includes("testing")) {
              mockImage = "/images/mockups/nextjs_masterclass_1779443916108.png";
            } else {
              mockImage = "/images/mockups/system_attendance_line_1779443112798.png";
            }
          }

          return mockImage ? (
            <Image
              src={mockImage}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-85 group-hover:opacity-100"
            />
          ) : (
            <div className={cn(
              "w-full h-full flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-500 bg-linear-to-br",
              focusGradient
            )}>
              <Download className="w-12 h-12 text-white/50 group-hover:scale-110 group-hover:text-white/80 transition-all duration-500" />
            </div>
          );
        })()}

        {/* Category Badge Overlay */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white/90 border border-white/20 px-3 py-1 rounded-full text-[10px] font-prompt font-semibold tracking-wider shadow-lg z-10">
          {product.category === "Template" ? "Automation" :
           product.category === "Service" ? "Creative" :
           product.category?.toLowerCase() === "ebook" || product.category?.toLowerCase() === "e-book" ? "E-Book" :
           product.category?.toLowerCase() === "googlescript" || product.category?.toLowerCase() === "google script" ? "Google Script" :
           product.category}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1 z-10">
        <h3 className={cn(
          "text-lg font-bold font-prompt text-white mb-2 line-clamp-2 leading-snug transition-colors",
          hoverText
        )}>
          {product.title}
        </h3>

        {parsedType && (
          <div className="flex items-center gap-1.5 mb-2.5 text-xs font-prompt text-cyan-400">
            <Tag className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{parsedType}</span>
          </div>
        )}

        <p className="text-xs font-prompt text-white/60 mb-5 flex-1 line-clamp-3 leading-relaxed">
          {rawDesc}
        </p>

        {/* --- FUTURISTIC & FRIENDLY CYBERPUNK NEON PRICE CAPSULE --- */}
        <div className="mt-auto space-y-3">
          
          <div className="p-3.5 rounded-2xl bg-linear-to-r from-slate-900 via-black to-slate-900 border border-cyan-500/30 shadow-[inset_0_1px_15px_rgba(6,182,212,0.12)] relative overflow-hidden">
            {/* Ambient accent light */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-[30px] rounded-full pointer-events-none" />

            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-prompt text-cyan-300 font-semibold flex items-center gap-1">
                <Zap className="w-3 h-3 text-cyan-400" />
                {isFree ? "ของขวัญฟรีสำหรับคุณ" : "ดีลพิเศษสำหรับครู & นักเรียน"}
              </span>
              <span className="text-[9px] font-prompt text-white/50 bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
                {isFree ? "แจกฟรี 100%" : "จ่ายครั้งเดียวตลอดชีพ"}
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-0.5">
              <div className="flex items-baseline gap-2">
                <span className={cn(
                  "font-prompt text-2xl font-black tracking-tight",
                  isFree 
                    ? "text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]" 
                    : "text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-white to-amber-200 drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                )}>
                  {isFree ? "0 ฿" : product.price}
                </span>

                {!isFree && numericPrice > 0 && (
                  <span className="font-prompt text-xs text-white/35 line-through">
                    {originalAnchorPrice} ฿
                  </span>
                )}
              </div>

              <span className="text-[10px] font-prompt text-emerald-400 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3 h-3" />
                <span>ไม่มีรายเดือน</span>
              </span>
            </div>
          </div>

          {/* Glowing CTA Button */}
          <div className={cn(
            "w-full py-3.5 px-5 rounded-2xl text-white font-prompt text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 group-hover:scale-[1.02] shadow-lg cursor-pointer",
            isValidId 
              ? (isFree 
                  ? "bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 shadow-[0_0_25px_rgba(16,185,129,0.4)]" 
                  : "bg-linear-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-cyan-400 text-white shadow-[0_0_25px_rgba(6,182,212,0.35)]") 
              : "bg-white/10 text-white/40 cursor-not-allowed"
          )}>
            {isFree ? (
              <>
                <Gift className="w-4 h-4 shrink-0" />
                <span>รับระบบและโค้ดฟรี →</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 shrink-0" />
                <span>สั่งซื้อระบบพร้อมใช้ →</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );

  return isValidId ? (
    <Link
      href={`/dashboard/marketplace/${product.id}`}
      className="block group cursor-pointer h-full"
    >
      {CardInner}
    </Link>
  ) : (
    <div className="opacity-40 cursor-not-allowed h-full">
      {CardInner}
    </div>
  );
}

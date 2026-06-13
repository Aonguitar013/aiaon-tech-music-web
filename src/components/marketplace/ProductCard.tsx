"use client";

import React from "react";
import { Tag, Gift, Download } from "lucide-react";
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
  const hoverBorder = isMusicBrand ? "hover:border-amber-500/40" : "hover:border-blue-500/30";
  const hoverText = isMusicBrand ? "group-hover:text-amber-400" : "group-hover:text-blue-400";
  const focusGradient = isMusicBrand ? "from-amber-600 to-orange-400" : "from-blue-500 to-cyan-400";
  const buttonBg = isMusicBrand
    ? "bg-amber-600 hover:bg-amber-500 shadow-amber-600/10 hover:shadow-[0_0_15px_rgba(245,158,11,0.35)]"
    : "bg-blue-600 hover:bg-blue-500 shadow-blue-600/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.35)]";

  const priceStr = (product.price || "").trim().toLowerCase();
  const isFree =
    priceStr === "0" ||
    priceStr === "0 thb" ||
    priceStr === "ฟรี" ||
    priceStr === "0 บาท" ||
    priceStr === "free" ||
    priceStr === "";

  const isValidId =
    product.id && typeof product.id === "string" && product.id.length > 8;

  const CardInner = (
    <div className={cn(
      "glass-card flex flex-col h-full border border-white/10 transition-all duration-300 relative overflow-hidden bg-white/5 shadow-xl hover:bg-white/[0.03]",
      hoverBorder
    )}>
      {/* FREE Badge */}
      {isFree && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400 text-black text-[10px] font-black font-prompt shadow-[0_0_15px_rgba(52,211,153,0.6)] border border-emerald-300/30 uppercase tracking-wider animate-pulse">
          <Gift className="w-3 h-3 shrink-0" />
          <span>แจกฟรี</span>
        </div>
      )}

      {/* 16:9 Cover Image */}
      <div className={cn(
        "relative w-full aspect-video shrink-0 bg-black/40 border-b border-white/10 overflow-hidden transition-colors",
        hoverBorder
      )}>
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
            } else if (lowerTitle.includes("ระบบเช็กชื่อ") || lowerTitle.includes("line") || lowerTitle.includes("notification") || lowerTitle.includes("chat")) {
              mockImage = "/images/mockups/system_attendance_line_1779443112798.png";
            } else if (lowerTitle.includes("สื่อการสอน")) {
              mockImage = "/images/mockups/teaching_media_template_1779443134799.png";
            } else if (lowerTitle.includes("apps script")) {
              mockImage = "/images/mockups/apps_script_course_1779443157476.png";
            } else if (lowerTitle.includes("blog") || lowerTitle.includes("magazine")) {
              mockImage = "/images/mockups/blog_magazine_template_1779443181794.png";
            } else if (lowerTitle.includes("real estate")) {
              mockImage = "/images/mockups/real_estate_ui_1779443205255.png";
            } else if (lowerTitle.includes("startup") || lowerTitle.includes("landing page") || lowerTitle.includes("link in bio")) {
              mockImage = "/images/mockups/startup_landing_page_1779443225117.png";
            } else {
              mockImage = "/images/mockups/portfolio_creative_ui.png";
            }
          }

          return mockImage ? (
            <Image
              src={mockImage}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100"
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
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white/80 border border-white/20 px-3 py-1 rounded-full text-[10px] font-prompt font-medium uppercase tracking-wider shadow-lg z-10">
          {product.category === "Template" ? "Automation" :
           product.category === "Service" ? "Creative" :
           product.category?.toLowerCase() === "ebook" || product.category?.toLowerCase() === "e-book" ? "E-Book" :
           product.category?.toLowerCase() === "googlescript" || product.category?.toLowerCase() === "google script" ? "Google Script" :
           product.category}
        </div>
      </div>

      {/* Decorative glow at bottom */}
      <div className={cn(
        "absolute bottom-0 right-0 w-40 h-40 opacity-5 group-hover:opacity-15 blur-[40px] rounded-full transition-opacity duration-500 pointer-events-none bg-linear-to-br",
        focusGradient
      )}></div>

      <div className="p-6 flex flex-col flex-1 z-10 bg-linear-to-b from-black/0 to-black/40">
        <h3 className={cn(
          "text-lg font-bold font-prompt text-white mb-2 line-clamp-2 leading-tight transition-colors",
          hoverText
        )}>
          {product.title}
        </h3>

        {parsedType && (
          <div className="flex items-center gap-1.5 mb-3 text-xs font-prompt text-emerald-400">
            <Tag className="w-3.5 h-3.5" />
            <span className="truncate">{parsedType}</span>
          </div>
        )}

        <p className="text-sm font-prompt text-white/50 mb-6 flex-1 line-clamp-3 leading-relaxed">
          {rawDesc}
        </p>

        {/* Price & Action Section */}
        <div className="mt-auto pt-4 border-t border-white/10">
          <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
            <span className="text-xs text-white/40 font-prompt uppercase tracking-wider">ราคาเริ่มต้น</span>
            <span className={cn(
              "text-xl font-bold font-prompt",
              isMusicBrand ? "text-amber-400" : "text-blue-400"
            )}>
              {product.price}
            </span>
          </div>

          <div className={cn(
            "w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-white font-prompt text-sm font-semibold transition-all duration-300 active:scale-95 cursor-pointer shadow-md",
            isValidId ? buttonBg : "bg-white/10 text-white/40 cursor-not-allowed"
          )}>
            <Download className="w-4 h-4 shrink-0" />
            <span>{isValidId ? (isFree ? "โหลดฟรี →" : "สั่งซื้อเลย →") : "ไม่มีข้อมูล"}</span>
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

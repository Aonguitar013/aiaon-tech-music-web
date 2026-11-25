"use client";

import React from "react";
import Link from "next/link";
import {
  Tag, Gift, ShieldCheck, Zap, ArrowRight, Eye,
  QrCode, Award, Truck, FileText, CheckSquare, Users, BookOpen, Clock,
  Music, Compass, Smartphone, Cpu, GraduationCap, Bot, 
  Activity, Star, Layers, ShoppingCart
} from "lucide-react";
import { useBrandTheme } from "@/components/providers/BrandThemeProvider";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { cn } from "@/lib/utils";
import { DvdCaseMockup } from "@/components/marketplace/DvdCaseMockup";

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
  setupTier?: "zero-tech" | "easy-setup" | "vip-enterprise";
}

interface ProductCardProps {
  product: Product;
  index: number;
}

import { getSystemCoverTheme } from "./systemCoverTheme";
import { getProductSetupTier, getSetupTierInfo } from "./setupTierHelper";
import { getLineOrderUrl, buildSystemOrderMessage, buildVipSetupOrderMessage } from "@/lib/line";

export function ProductCard({ product }: ProductCardProps) {
  const { brandTheme } = useBrandTheme();
  const { openLineModal } = useLineModal();

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
    ? "hover:border-amber-400 hover:shadow-md" 
    : "hover:border-[#2563EB]/50 hover:shadow-md";
  const hoverText = isMusicBrand ? "group-hover:text-amber-700" : "group-hover:text-[#1D4ED8]";

  const priceStr = (product.price || "").trim().toLowerCase();
  const isFree =
    priceStr === "0" ||
    priceStr === "0 thb" ||
    priceStr === "ฟรี" ||
    priceStr === "0 บาท" ||
    priceStr === "free" ||
    priceStr === "";

  const numericPrice = parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;
  const originalAnchorPrice = numericPrice > 0 ? Math.round(numericPrice * 1.6 + 100) : 590;

  // Generate dynamic bespoke theme
  const coverTheme = getSystemCoverTheme(product.title, product.category);
  const setupTier = product.setupTier || getProductSetupTier(product.id, product.title);
  const tierInfo = getSetupTierInfo(setupTier);

  const cleanPrice = isFree ? "ฟรี 0 ฿" : product.price.replace(/\s*THB/i, " ฿");
  const upperTitle = product.title.toUpperCase();
  let vipPrice = "+190 ฿";
  if (
    upperTitle.includes("AONE09") ||
    upperTitle.includes("ห้องเรียนสีขาว") ||
    upperTitle.includes("AONA02") ||
    upperTitle.includes("ยานพาหนะ")
  ) {
    vipPrice = "+690 ฿";
  } else if (
    upperTitle.includes("AONA01") ||
    upperTitle.includes("AONA03") ||
    upperTitle.includes("เกียรติบัตร") ||
    upperTitle.includes("AONE01") ||
    upperTitle.includes("AONE02") ||
    upperTitle.includes("AONE05") ||
    upperTitle.includes("AONE08") ||
    upperTitle.includes("AONE10") ||
    upperTitle.includes("3D") ||
    upperTitle.includes("AONM01") ||
    upperTitle.includes("AONA06") ||
    upperTitle.includes("AONA09") ||
    upperTitle.includes("AONA10")
  ) {
    vipPrice = "+350 ฿";
  }

  const displayTitle = product.title.includes(coverTheme.code)
    ? product.title
    : `[${coverTheme.code}] ${product.title}`;

  const lineOrderMessage = buildSystemOrderMessage({
    title: product.title,
    code: coverTheme.code,
    price: cleanPrice,
    vipPrice: vipPrice,
    isFree: isFree,
  });

  const vipLineOrderMessage = buildVipSetupOrderMessage({
    title: product.title,
    code: coverTheme.code,
    price: cleanPrice,
    vipPrice: vipPrice,
  });

  const lineOrderUrl = getLineOrderUrl(lineOrderMessage);
  const vipLineOrderUrl = getLineOrderUrl(vipLineOrderMessage);

  const detailHref = product.id
    ? `/dashboard/marketplace/${product.id}`
    : `/dashboard/marketplace`;

  const handleVipClick = (e: React.MouseEvent) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: `ระบบ ${displayTitle} (VIP Setup)`,
        price: `${cleanPrice} + ${vipPrice}`,
        itemCode: coverTheme.code,
        message: vipLineOrderMessage,
      });
    }
  };

  const handleOrderClick = (e: React.MouseEvent) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: displayTitle,
        price: cleanPrice,
        itemCode: coverTheme.code,
        message: lineOrderMessage,
      });
    }
  };

  return (
    <div className={cn(
      "flex flex-col h-full rounded-3xl border border-[#E2E8F0] transition-all duration-300 relative overflow-hidden bg-white shadow-sm hover:-translate-y-1 group",
      hoverBorder
    )}>
      
      {/* ── BESPOKE 3D HOLOGRAPHIC COVER ART / 3D DVD MOCKUP (Clickable to detail) ── */}
      <Link href={detailHref} className="block relative w-full border-b border-[#E2E8F0] overflow-hidden bg-[#FAF8F5] flex flex-col justify-center cursor-pointer">
        <DvdCaseMockup
          code={coverTheme.code}
          title={product.title}
          categoryName={coverTheme.categoryName}
          tagline={coverTheme.tagline}
          glowColor={coverTheme.glowColor}
        />
        {product.image_url && (
          <span className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 border border-[#BFDBFE] text-[#1D4ED8] text-[11px] font-prompt font-bold backdrop-blur-md shadow-xs">
            <Eye className="w-3.5 h-3.5" />
            <span>มีภาพหน้าจอจริง</span>
          </span>
        )}
      </Link>

      {/* ── CARD BODY ─────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 z-10">
        
        {/* Setup Tier Badge */}
        <div className="mb-2.5">
          <span className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-prompt font-extrabold border transition-all",
            tierInfo.badgeStyle
          )}>
            <span>{tierInfo.badgeText}</span>
          </span>
        </div>

        <Link href={detailHref} className="block group/title cursor-pointer mb-2">
          <h3 className={cn(
            "text-base sm:text-lg font-bold font-prompt text-[#0F172A] line-clamp-2 leading-snug transition-colors",
            hoverText
          )}>
            {product.title}
          </h3>
        </Link>

        {parsedType && (
          <div className="flex items-center gap-1.5 mb-2.5 text-xs font-prompt text-[#0E7490] font-medium">
            <Tag className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{parsedType}</span>
          </div>
        )}

        <Link href={detailHref} className="block flex-1 cursor-pointer mb-5">
          <p className="text-xs font-prompt text-[#475569] line-clamp-3 leading-relaxed hover:text-[#0F172A] transition-colors">
            {rawDesc}
          </p>
        </Link>

        {product.image_url && (
          <Link
            href={detailHref}
            className="mb-4 w-full py-2 px-3 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] hover:border-[#93C5FD] text-[#1D4ED8] font-prompt text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span>ดูรายละเอียด &amp; ภาพหน้าจอจริง</span>
          </Link>
        )}

        {/* --- CLEAN SINGLE-LINE PRICE & CTA FOOTER --- */}
        <div className="mt-auto pt-4 border-t border-[#F1F5F9] space-y-3">
          
          {/* Price Row — Never wraps */}
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="text-[11px] font-prompt text-[#64748B] font-medium whitespace-nowrap mb-0.5">
                {isFree ? "🎁 ของขวัญพิเศษ" : "⚡ จ่ายครั้งเดียวตลอดชีพ"}
              </div>
              <div className="flex items-baseline gap-2 whitespace-nowrap">
                <span className={cn(
                  "font-prompt text-2xl font-black tracking-tight whitespace-nowrap",
                  isFree 
                    ? "text-[#059669]" 
                    : "text-[#0F172A]"
                )}>
                  {cleanPrice}
                </span>

                {!isFree && numericPrice > 0 && (
                  <span className="font-prompt text-xs text-[#94A3B8] line-through whitespace-nowrap">
                    {originalAnchorPrice} ฿
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-prompt text-emerald-700 flex items-center gap-1 font-semibold whitespace-nowrap">
                <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>ไม่มีรายเดือน</span>
              </span>
            </div>
          </div>

          {/* VIP Setup Micro-badge (Direct LINE link with VIP preset message) */}
          {!isFree && (
            <a
              href={vipLineOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleVipClick}
              data-line-title={`ระบบ ${displayTitle} (VIP Setup)`}
              data-line-price={`${cleanPrice} + ${vipPrice}`}
              data-line-code={coverTheme.code}
              title="คลิกเพื่อสั่งซื้อพร้อมบริการให้ครูอ้นติดตั้งให้พร้อมใช้ (VIP Setup)"
              className="block text-[11px] font-prompt font-semibold text-[#92400E] hover:text-[#78350F] bg-[#FEF9EF] hover:bg-[#FEF3C7] border border-[#FDE68A] hover:border-amber-400 rounded-lg py-1.5 px-2.5 text-center whitespace-nowrap truncate transition-all cursor-pointer"
            >
              🛠️ ออปชันครูอ้นติดตั้งให้พร้อมใช้ ({vipPrice})
            </a>
          )}

          {/* ── ✨ SLEEK SINGLE-LINE LUXURY CTA BUTTON (Direct LINE link) ── */}
          <a
            href={lineOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOrderClick}
            data-line-title={displayTitle}
            data-line-price={cleanPrice}
            data-line-code={coverTheme.code}
            title="คลิกเพื่อสั่งซื้อผ่าน LINE OA ทันที"
            className={cn(
              "w-full h-11 px-4 rounded-xl font-prompt text-sm font-extrabold flex items-center justify-between whitespace-nowrap transition-all duration-300 group-hover:scale-[1.01] active:scale-[0.98] cursor-pointer relative overflow-hidden shadow-xs",
              isFree 
                ? "bg-[#06C755] hover:bg-[#05b34c] text-[#052E16]" 
                : "bg-[#06C755] hover:bg-[#05b34c] text-[#052E16]"
            )}
          >
            <div className="flex items-center gap-2 relative z-10 whitespace-nowrap">
              {isFree ? (
                <Gift className="w-4 h-4 text-[#052E16] shrink-0" />
              ) : (
                <ShoppingCart className="w-4 h-4 text-[#052E16] shrink-0" />
              )}
              <span className="tracking-tight">
                {isFree ? "รับระบบและโค้ดฟรี (LINE)" : "สั่งซื้อรับระบบทันที (LINE)"}
              </span>
            </div>

            <div className="w-6 h-6 rounded-lg bg-[#052E16]/12 group-hover:bg-[#052E16]/20 flex items-center justify-center relative z-10 shrink-0 transition-all">
              <ArrowRight className="w-3.5 h-3.5 text-[#052E16] transition-transform group-hover:translate-x-0.5" />
            </div>
          </a>

        </div>
      </div>
    </div>
  );
}


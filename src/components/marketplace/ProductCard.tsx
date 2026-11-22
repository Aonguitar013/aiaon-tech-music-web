"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Tag, Gift, ShieldCheck, Zap, ArrowRight, Eye, X, CheckCircle2,
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
  const [showMockupModal, setShowMockupModal] = useState(false);

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

  const isDirectFlagship =
    product.id?.startsWith("aona09-") || product.id?.startsWith("aona10-");

  const detailHref = isDirectFlagship
    ? lineOrderUrl
    : product.id
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
      "glass-card flex flex-col h-full rounded-3xl border border-white/10 transition-all duration-300 relative overflow-hidden bg-slate-950/70 shadow-xl hover:bg-slate-900/90 group",
      hoverBorder
    )}>
      
      {/* ── BESPOKE 3D HOLOGRAPHIC COVER ART / 3D DVD MOCKUP (Clickable to detail or preview) ── */}
      {isDirectFlagship && product.image_url ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setShowMockupModal(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setShowMockupModal(true);
            }
          }}
          className="block relative w-full border-b border-white/10 overflow-hidden bg-gradient-to-br from-cyan-950/40 via-slate-950 to-indigo-950/40 flex flex-col justify-center cursor-pointer"
        >
          <DvdCaseMockup
            code={coverTheme.code}
            title={product.title}
            categoryName={coverTheme.categoryName}
            tagline={coverTheme.tagline}
            glowColor={coverTheme.glowColor}
            isInteractive={false}
          />
          <span className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/20 hover:bg-cyan-500/35 border border-cyan-400/40 text-cyan-200 text-[11px] font-prompt font-bold backdrop-blur-md transition-all shadow-md">
            <Eye className="w-3.5 h-3.5" />
            <span>ดูภาพหน้าจอจริง</span>
          </span>
        </div>
      ) : (
        <Link href={detailHref} className="block relative w-full border-b border-white/10 overflow-hidden bg-gradient-to-br from-cyan-950/40 via-slate-950 to-indigo-950/40 flex flex-col justify-center cursor-pointer">
          <DvdCaseMockup
            code={coverTheme.code}
            title={product.title}
            categoryName={coverTheme.categoryName}
            tagline={coverTheme.tagline}
            glowColor={coverTheme.glowColor}
          />
        </Link>
      )}

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
            "text-base sm:text-lg font-bold font-prompt text-white line-clamp-2 leading-snug transition-colors",
            hoverText
          )}>
            {product.title}
          </h3>
        </Link>

        {parsedType && (
          <div className="flex items-center gap-1.5 mb-2.5 text-xs font-prompt text-cyan-400">
            <Tag className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{parsedType}</span>
          </div>
        )}

        <Link href={detailHref} className="block flex-1 cursor-pointer mb-5">
          <p className="text-xs font-prompt text-white/60 line-clamp-3 leading-relaxed hover:text-white/80 transition-colors">
            {rawDesc}
          </p>
        </Link>

        {product.image_url && (
          <button
            type="button"
            onClick={() => setShowMockupModal(true)}
            className="mb-4 w-full py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 hover:border-cyan-400/60 text-cyan-300 font-prompt text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span>ดูภาพหน้าจอจริง &amp; แดชบอร์ด (Mockup)</span>
          </button>
        )}

        {/* --- CLEAN SINGLE-LINE PRICE & CTA FOOTER --- */}
        <div className="mt-auto pt-4 border-t border-white/10 space-y-3">
          
          {/* Price Row — Never wraps */}
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="text-[11px] font-prompt text-white/50 font-medium whitespace-nowrap mb-0.5">
                {isFree ? "🎁 ของขวัญพิเศษ" : "⚡ จ่ายครั้งเดียวตลอดชีพ"}
              </div>
              <div className="flex items-baseline gap-2 whitespace-nowrap">
                <span className={cn(
                  "font-prompt text-2xl font-black tracking-tight whitespace-nowrap",
                  isFree 
                    ? "text-emerald-400" 
                    : "text-white"
                )}>
                  {cleanPrice}
                </span>

                {!isFree && numericPrice > 0 && (
                  <span className="font-prompt text-xs text-white/35 line-through whitespace-nowrap">
                    {originalAnchorPrice} ฿
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-prompt text-emerald-300 flex items-center gap-1 font-semibold whitespace-nowrap">
                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
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
              className="block text-[11px] font-prompt text-amber-300/90 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 hover:border-amber-400/50 rounded-lg py-1 px-2.5 text-center whitespace-nowrap truncate transition-all cursor-pointer"
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
              "w-full h-11 px-4 rounded-xl font-prompt text-sm font-extrabold flex items-center justify-between whitespace-nowrap transition-all duration-300 group-hover:scale-[1.01] active:scale-[0.98] cursor-pointer relative overflow-hidden",
              isFree 
                ? "bg-linear-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.25)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.45)]" 
                : "bg-linear-to-r from-[#06C755] via-[#05b34c] to-[#06C755] hover:from-[#05b34c] hover:via-[#049b42] hover:to-[#05b34c] text-white shadow-[0_0_20px_rgba(6,199,85,0.35)] group-hover:shadow-[0_0_32px_rgba(6,199,85,0.55)] border border-[#06C755]/30"
            )}
          >
            {/* Subtle Light Sweep */}
            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/45 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

            <div className="flex items-center gap-2 relative z-10 whitespace-nowrap">
              {isFree ? (
                <Gift className="w-4 h-4 text-zinc-950 shrink-0" />
              ) : (
                <ShoppingCart className="w-4 h-4 text-white shrink-0" />
              )}
              <span className="tracking-tight">
                {isFree ? "รับระบบและโค้ดฟรี (LINE)" : "สั่งซื้อรับระบบทันที (LINE)"}
              </span>
            </div>

            <div className={cn(
              "w-6 h-6 rounded-lg flex items-center justify-center relative z-10 shrink-0 transition-all",
              isFree ? "bg-zinc-950/12 group-hover:bg-zinc-950/20" : "bg-black/20 group-hover:bg-black/30"
            )}>
              <ArrowRight className={cn("w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5", isFree ? "text-zinc-950" : "text-white")} />
            </div>
          </a>

        </div>
      </div>

      {/* ── DEVICE MOCKUP PREVIEW MODAL ── */}
      {showMockupModal && product.image_url && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setShowMockupModal(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl border border-cyan-400/35 bg-slate-950/95 shadow-[0_0_60px_rgba(6,182,212,0.28)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10 bg-slate-900/80">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={cn("px-2.5 py-0.5 rounded-full text-[11px] font-prompt font-extrabold border shrink-0", coverTheme.badgeBg)}>
                  {coverTheme.code}
                </span>
                <h4 className="font-prompt text-sm sm:text-base font-bold text-white truncate">
                  {product.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowMockupModal(false)}
                aria-label="ปิดหน้าต่างพรีวิว"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mockup Showcase Image */}
            <div className="relative bg-[#060b18] border-b border-white/10">
              <img
                src={product.image_url}
                alt={`ตัวอย่างหน้าจอระบบ ${product.title}`}
                className="w-full max-h-[55vh] object-contain mx-auto"
              />
            </div>

            {/* Details & CTA */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                {coverTheme.pills.map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-200 text-xs font-prompt font-semibold"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>

              <p className="text-xs sm:text-sm font-prompt text-white/75 leading-relaxed">
                {rawDesc}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
                <div className="flex items-baseline gap-2">
                  <span className="font-prompt text-2xl font-black text-white">{cleanPrice}</span>
                  <span className="font-prompt text-xs text-emerald-300 font-semibold">• จ่ายครั้งเดียว ไม่มีรายเดือน</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={lineOrderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      setShowMockupModal(false);
                      handleOrderClick(e);
                    }}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-linear-to-r from-[#06C755] to-[#049b42] hover:from-[#05b34c] hover:to-[#038538] text-white font-prompt text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>สั่งซื้อรับระบบทันที</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


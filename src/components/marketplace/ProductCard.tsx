"use client";

import React from "react";
import Link from "next/link";
import {
  Gift, ShieldCheck, ArrowRight, Eye, ShoppingCart, Sparkles, Check
} from "lucide-react";
import { useBrandTheme } from "@/components/providers/BrandThemeProvider";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
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
  const matchFormat = rawDesc.match(/\(Format:\s*(.+?)\)/i);
  const matchType = rawDesc.match(/\(Type:\s*(.+?)\)/i);
  if (matchFormat) {
    rawDesc = rawDesc.replace(matchFormat[0], "").trim();
  } else if (matchType) {
    rawDesc = rawDesc.replace(matchType[0], "").trim();
  }

  const isMusicBrand = brandTheme === "music";
  const hoverBorder = isMusicBrand
    ? "hover:border-amber-400 hover:shadow-[0_14px_34px_rgba(217,119,6,0.10)]"
    : "hover:border-[#2563EB]/60 hover:shadow-[0_14px_34px_rgba(37,99,235,0.10)]";
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

  // Dynamic bespoke theme & setup tier
  const coverTheme = getSystemCoverTheme(product.title, product.category);
  const ThemeIcon = coverTheme.icon;
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

  const featurePills = (coverTheme.pills || []).slice(0, 3);

  return (
    <div
      className={cn(
        "flex flex-col h-full rounded-[24px] border border-[#E2E8F0] transition-all duration-300 relative overflow-hidden bg-white shadow-[0_4px_16px_rgba(15,23,42,0.04)] hover:-translate-y-1 group",
        hoverBorder
      )}
    >
      {/* ── VERCEL × FRAMER PRECISION SAAS BROWSER PREVIEW ── */}
      <Link
        href={detailHref}
        className="block relative w-full pt-4 px-4 pb-0 border-b border-[#E2E8F0] overflow-hidden cursor-pointer select-none"
        style={{
          backgroundColor: "#F8FAFC",
          backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      >
        {/* Subtle ambient accent glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl opacity-35 transition-opacity duration-500 group-hover:opacity-60"
          style={{ background: coverTheme.glowColor }}
        />

        {/* Top Floating Badges Row */}
        <div className="relative z-20 flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0F172A] text-white font-mono text-[11px] font-bold tracking-wide shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            <span>{coverTheme.code}</span>
          </span>

          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-prompt font-extrabold border shadow-2xs backdrop-blur-sm",
              tierInfo.badgeStyle
            )}
          >
            <span>{tierInfo.badgeText}</span>
          </span>
        </div>

        {/* Sleek macOS Browser Window Frame */}
        <div className="relative z-10 rounded-t-xl border border-b-0 border-[#CBD5E1]/90 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)] overflow-hidden transition-transform duration-500 group-hover:translate-y-[-2px]">
          {/* Browser Chrome Header */}
          <div className="h-6 px-2.5 bg-[#F1F5F9] border-b border-[#E2E8F0] flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#F87171]" />
              <span className="w-2 h-2 rounded-full bg-[#FBBF24]" />
              <span className="w-2 h-2 rounded-full bg-[#34D399]" />
            </div>
            <div className="px-2 py-0.5 rounded bg-white border border-[#E2E8F0] font-mono text-[9px] text-[#64748B] truncate max-w-[165px]">
              aiaon.tech/app/{coverTheme.code.toLowerCase()}
            </div>
            <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              LIVE
            </span>
          </div>

          {/* Viewport: Real Screenshot OR Clean SaaS UI Fallback */}
          <div className="relative aspect-[16/10] w-full bg-[#F8FAFC] overflow-hidden">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={`ตัวอย่างหน้าจอจริง ${product.title}`}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              />
            ) : (
              <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-[#F8FAFC] via-white to-[#EFF6FF]">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#1D4ED8] shadow-2xs">
                    <ThemeIcon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 rounded-md">
                    0฿ GAS APP
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    {coverTheme.tagline}
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="h-2 rounded-full bg-[#BFDBFE]" />
                    <div className="h-2 rounded-full bg-[#99F6E4]" />
                    <div className="h-2 rounded-full bg-[#FDE68A]" />
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Hover Quick-Preview Pill */}
            <div className="pointer-events-none absolute inset-0 bg-[#0F172A]/0 group-hover:bg-[#0F172A]/15 transition-colors duration-300 flex items-end justify-center pb-2.5">
              <span className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#BFDBFE] text-[#0F172A] text-[11px] font-prompt font-bold shadow-md">
                <Eye className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>ดูภาพหน้าจอจริง &amp; สเปก 7 ข้อ</span>
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* ── PRECISION CARD BODY ── */}
      <div className="p-5 flex flex-col flex-1 z-10">
        {/* Category & Zero-Monthly Micro Row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-prompt font-bold text-[#2563EB] truncate">
            <Sparkles className="w-3 h-3 shrink-0" />
            <span className="truncate">{coverTheme.categoryName}</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-prompt font-bold text-emerald-700 shrink-0">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>0฿/เดือน</span>
          </span>
        </div>

        {/* Title */}
        <Link href={detailHref} className="block group/title cursor-pointer mb-1.5">
          <h3
            className={cn(
              "text-base font-extrabold font-prompt text-[#0F172A] line-clamp-2 leading-snug transition-colors",
              hoverText
            )}
          >
            {product.title}
          </h3>
        </Link>

        {/* Concise 2-Line Description */}
        <Link href={detailHref} className="block cursor-pointer mb-3.5">
          <p className="text-xs font-prompt text-[#475569] line-clamp-2 leading-relaxed">
            {rawDesc}
          </p>
        </Link>

        {/* Tech Stack / Feature Spec Pills (Vercel Templates Style) */}
        {featurePills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {featurePills.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[10.5px] font-prompt font-semibold text-[#334155]"
              >
                <Check className="w-3 h-3 text-[#2563EB] shrink-0" />
                <span>{pill}</span>
              </span>
            ))}
          </div>
        )}

        {/* ── CLEAN PRECISION PRICE & DUAL-CTA FOOTER ── */}
        <div className="mt-auto pt-3.5 border-t border-[#F1F5F9] space-y-2.5">
          {/* Price + VIP Inline Row */}
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="text-[10px] font-prompt text-[#64748B] font-medium">
                {isFree ? "🎁 ดาวน์โหลดฟรีตลอดชีพ" : "⚡ ซื้อครั้งเดียว ใช้ตลอดชีพ"}
              </div>
              <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                <span
                  className={cn(
                    "font-prompt text-2xl font-black tracking-tight",
                    isFree ? "text-[#059669]" : "text-[#0F172A]"
                  )}
                >
                  {cleanPrice}
                </span>
                {!isFree && numericPrice > 0 && (
                  <span className="font-prompt text-xs text-[#94A3B8] line-through">
                    {originalAnchorPrice} ฿
                  </span>
                )}
              </div>
            </div>

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
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FEF9EF] hover:bg-[#FEF3C7] border border-[#FDE68A] text-[10.5px] font-prompt font-bold text-[#92400E] whitespace-nowrap transition cursor-pointer"
              >
                <span>🛠️ ให้ครูติดตั้ง {vipPrice}</span>
              </a>
            )}
          </div>

          {/* Dual Action Row: Preview + Order LINE */}
          <div className="grid grid-cols-12 gap-2">
            <Link
              href={detailHref}
              className="col-span-5 h-10 px-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#E2E8F0] hover:border-[#BFDBFE] text-[#0F172A] hover:text-[#1D4ED8] font-prompt text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap"
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
              <span>ดูหน้าจอจริง</span>
            </Link>

            <a
              href={lineOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleOrderClick}
              data-line-title={displayTitle}
              data-line-price={cleanPrice}
              data-line-code={coverTheme.code}
              title="คลิกเพื่อสั่งซื้อผ่าน LINE OA ทันที"
              className="col-span-7 h-10 px-3 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-prompt text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              {isFree ? (
                <Gift className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
              )}
              <span>{isFree ? "รับฟรี (LINE)" : "สั่งซื้อทันที"}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


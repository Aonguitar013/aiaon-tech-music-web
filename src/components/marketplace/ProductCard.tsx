"use client";

import React from "react";
import Link from "next/link";
import {
  Tag, Gift, ShieldCheck, Zap, ArrowRight, 
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
}

interface ProductCardProps {
  product: Product;
  index: number;
}

import { getSystemCoverTheme } from "./systemCoverTheme";

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
  const CoverIcon = coverTheme.icon;

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
    upperTitle.includes("AONA06")
  ) {
    vipPrice = "+350 ฿";
  }

  const displayTitle = product.title.includes(coverTheme.code)
    ? product.title
    : `[${coverTheme.code}] ${product.title}`;

  const lineOrderMessage = isFree
    ? `สวัสดีครับครูอ้น ขอรับระบบและโค้ดแจกฟรี:\n🎁 "${displayTitle}"\nรบกวนขอรหัสปลดล็อกและลิงก์ดาวน์โหลดด้วยครับ 🙏`
    : `สวัสดีครับครูอ้น สนใจสั่งซื้อระบบอัตโนมัติ:\n📦 "${displayTitle}"\n💰 ราคา: ${cleanPrice} (มีออปชันครูอ้นติดตั้งให้พร้อมใช้ ${vipPrice})\nรบกวนขอเลขบัญชี / PromptPay QR Code เพื่อชำระเงินและรับไฟล์ระบบด้วยครับ 🙏`;

  const vipLineOrderMessage = `สวัสดีครับครูอ้น สนใจสั่งซื้อระบบพร้อมบริการให้ครูอ้นติดตั้งให้ (VIP Setup):\n🛠️ "${displayTitle}"\n💰 ราคาตัวระบบ ${cleanPrice} + บริการติดตั้งพร้อมใช้ (${vipPrice})\nรบกวนขอเลขบัญชี / PromptPay QR Code ด้วยครับ 🙏`;

  const lineOrderUrl = `https://line.me/R/oaMessage/@deu6776s/?${encodeURIComponent(lineOrderMessage)}`;
  const vipLineOrderUrl = `https://line.me/R/oaMessage/@deu6776s/?${encodeURIComponent(vipLineOrderMessage)}`;

  const CardInner = (
    <div className={cn(
      "glass-card flex flex-col h-full rounded-3xl border border-white/10 transition-all duration-300 relative overflow-hidden bg-slate-950/70 shadow-xl hover:bg-slate-900/90",
      hoverBorder
    )}>
      
      {/* ── BESPOKE 3D HOLOGRAPHIC COVER ART / 3D DVD MOCKUP ── */}
      <div className="relative w-full border-b border-white/10 overflow-hidden bg-gradient-to-br from-cyan-950/40 via-slate-950 to-indigo-950/40 flex flex-col justify-center">
        <DvdCaseMockup
          code={coverTheme.code}
          title={product.title}
          categoryName={coverTheme.categoryName}
          tagline={coverTheme.tagline}
          glowColor={coverTheme.glowColor}
        />
      </div>

      {/* ── CARD BODY ─────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 z-10">
        <h3 className={cn(
          "text-base sm:text-lg font-bold font-prompt text-white mb-2 line-clamp-2 leading-snug transition-colors",
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

          {/* VIP Setup Micro-badge (Clickable for direct VIP Setup preset message) */}
          {!isFree && (
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isMobileDevice()) {
                  window.open(vipLineOrderUrl, "_blank", "noopener,noreferrer");
                } else {
                  openLineModal({
                    title: `ระบบ ${displayTitle} (VIP Setup)`,
                    price: `${cleanPrice} + ${vipPrice}`,
                    itemCode: coverTheme.code,
                    message: vipLineOrderMessage,
                  });
                }
              }}
              title="คลิกเพื่อสั่งซื้อพร้อมบริการให้ครูอ้นติดตั้งให้พร้อมใช้ (VIP Setup)"
              className="text-[11px] font-prompt text-amber-300/90 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 hover:border-amber-400/50 rounded-lg py-1 px-2.5 text-center whitespace-nowrap truncate transition-all cursor-pointer"
            >
              🛠️ ออปชันครูอ้นติดตั้งให้พร้อมใช้ ({vipPrice})
            </div>
          )}

          {/* ── ✨ SLEEK SINGLE-LINE LUXURY CTA BUTTON ── */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isMobileDevice()) {
                window.open(lineOrderUrl, "_blank", "noopener,noreferrer");
              } else {
                openLineModal({
                  title: displayTitle,
                  price: cleanPrice,
                  itemCode: coverTheme.code,
                  message: lineOrderMessage,
                });
              }
            }}
            title="คลิกเพื่อสั่งซื้อผ่าน LINE OA ทันที"
            className={cn(
              "w-full h-11 px-4 rounded-xl font-prompt text-sm font-extrabold flex items-center justify-between whitespace-nowrap transition-all duration-300 group-hover:scale-[1.01] active:scale-[0.98] cursor-pointer relative overflow-hidden",
              isFree 
                ? "bg-linear-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.25)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.45)]" 
                : "bg-linear-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:via-teal-200 hover:to-cyan-300 text-zinc-950 shadow-[0_0_20px_rgba(6,182,212,0.25)] group-hover:shadow-[0_0_32px_rgba(6,182,212,0.5)]"
            )}
          >
            {/* Subtle Light Sweep */}
            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/45 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

            <div className="flex items-center gap-2 relative z-10 whitespace-nowrap">
              {isFree ? (
                <Gift className="w-4 h-4 text-zinc-950 shrink-0" />
              ) : (
                <ShoppingCart className="w-4 h-4 text-zinc-950 shrink-0" />
              )}
              <span className="tracking-tight">
                {isFree ? "รับระบบและโค้ดฟรี (LINE)" : "สั่งซื้อรับระบบทันที (LINE)"}
              </span>
            </div>

            <div className="w-6 h-6 rounded-lg bg-zinc-950/12 group-hover:bg-zinc-950/20 flex items-center justify-center relative z-10 shrink-0 transition-all">
              <ArrowRight className="w-3.5 h-3.5 text-zinc-950 transition-transform group-hover:translate-x-0.5" />
            </div>
          </button>

        </div>
      </div>
    </div>
  );

  const detailHref = product.id 
    ? `/dashboard/marketplace/${product.id}` 
    : `/dashboard/marketplace`;

  return (
    <Link
      href={detailHref}
      className="block group cursor-pointer h-full"
    >
      {CardInner}
    </Link>
  );
}


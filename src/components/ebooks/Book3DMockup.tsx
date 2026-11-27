"use client";

import React, { useState } from "react";
import { Award, BookOpen, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface Book3DMockupProps {
  code: string;
  title: string;
  category?: string;
  themeColor?: string;
  rank?: number;
  earlyBirdPrice?: number;
  coverImage?: string | null;
  previewSnippet?: string;
  size?: "sm" | "md" | "lg";
  isInteractive?: boolean;
  className?: string;
}

/**
 * Editorial Hardcover 3D Book + Matte-Black E-Reader Inside-Page Mockup (Transparent BG)
 * - Back-Left: 3D Hardcover Book with visible left spine + 3D top page edges
 * - Front-Right: Leaning matte-black E-Reader showing a real clean inside reading page
 */
export function Book3DMockup({
  code = "EB-PA-01",
  title = "คัมภีร์ ว.PA ผ่านฉลุย 100%",
  category = "ว.PA & วิทยฐานะ",
  themeColor = "amber",
  rank = 1,
  coverImage = null,
  previewSnippet,
  size = "md",
  isInteractive = true,
  className = "",
}: Book3DMockupProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Refined Editorial Publisher Palettes (Warm Bookstore / Stripe Press Style)
  const editorialThemes: Record<
    string,
    {
      spine: string;
      coverBg: string;
      accent: string;
      badgeBg: string;
      ribbon: string;
      paperTint: string;
      titleText: string;
      subText: string;
    }
  > = {
    emerald: {
      spine: "#065F46",
      coverBg: "linear-gradient(155deg, #ECFDF5 0%, #D1FAE5 55%, #FFFFFF 100%)",
      accent: "#059669",
      badgeBg: "bg-emerald-700 text-white",
      ribbon: "#059669",
      paperTint: "rgba(5, 150, 105, 0.14)",
      titleText: "text-[#064E3B]",
      subText: "text-[#047857]",
    },
    cyan: {
      spine: "#0E7490",
      coverBg: "linear-gradient(155deg, #ECFEFF 0%, #CFFAFE 55%, #FFFFFF 100%)",
      accent: "#0891B2",
      badgeBg: "bg-cyan-700 text-white",
      ribbon: "#0891B2",
      paperTint: "rgba(8, 145, 178, 0.14)",
      titleText: "text-[#164E63]",
      subText: "text-[#0E7490]",
    },
    purple: {
      spine: "#5B21B6",
      coverBg: "linear-gradient(155deg, #F5F3FF 0%, #EDE9FE 55%, #FFFFFF 100%)",
      accent: "#7C3AED",
      badgeBg: "bg-violet-700 text-white",
      ribbon: "#7C3AED",
      paperTint: "rgba(124, 58, 237, 0.14)",
      titleText: "text-[#4C1D95]",
      subText: "text-[#6D28D9]",
    },
    amber: {
      spine: "#92400E",
      coverBg: "linear-gradient(155deg, #FFFBEB 0%, #FEF3C7 55%, #FFFFFF 100%)",
      accent: "#D97706",
      badgeBg: "bg-amber-700 text-white",
      ribbon: "#D97706",
      paperTint: "rgba(217, 119, 6, 0.16)",
      titleText: "text-[#78350F]",
      subText: "text-[#B45309]",
    },
    rose: {
      spine: "#9F1239",
      coverBg: "linear-gradient(155deg, #FFF1F2 0%, #FFE4E6 55%, #FFFFFF 100%)",
      accent: "#E11D48",
      badgeBg: "bg-rose-700 text-white",
      ribbon: "#E11D48",
      paperTint: "rgba(225, 29, 72, 0.14)",
      titleText: "text-[#881337]",
      subText: "text-[#BE123C]",
    },
    blue: {
      spine: "#1E40AF",
      coverBg: "linear-gradient(155deg, #EFF6FF 0%, #DBEAFE 55%, #FFFFFF 100%)",
      accent: "#2563EB",
      badgeBg: "bg-blue-700 text-white",
      ribbon: "#2563EB",
      paperTint: "rgba(37, 99, 235, 0.14)",
      titleText: "text-[#1E3A8A]",
      subText: "text-[#1D4ED8]",
    },
    teal: {
      spine: "#115E59",
      coverBg: "linear-gradient(155deg, #F0FDFA 0%, #CCFBF1 55%, #FFFFFF 100%)",
      accent: "#0D9488",
      badgeBg: "bg-teal-700 text-white",
      ribbon: "#0D9488",
      paperTint: "rgba(13, 148, 136, 0.14)",
      titleText: "text-[#134E4A]",
      subText: "text-[#0F766E]",
    },
    orange: {
      spine: "#9A3412",
      coverBg: "linear-gradient(155deg, #FFF7ED 0%, #FFEDD5 55%, #FFFFFF 100%)",
      accent: "#EA580C",
      badgeBg: "bg-orange-700 text-white",
      ribbon: "#EA580C",
      paperTint: "rgba(234, 88, 12, 0.14)",
      titleText: "text-[#7C2D12]",
      subText: "text-[#C2410C]",
    },
    pink: {
      spine: "#9D174D",
      coverBg: "linear-gradient(155deg, #FDF2F8 0%, #FCE7F3 55%, #FFFFFF 100%)",
      accent: "#DB2777",
      badgeBg: "bg-pink-700 text-white",
      ribbon: "#DB2777",
      paperTint: "rgba(219, 39, 119, 0.14)",
      titleText: "text-[#831843]",
      subText: "text-[#BE185D]",
    },
    indigo: {
      spine: "#3730A3",
      coverBg: "linear-gradient(155deg, #EEF2FF 0%, #E0E7FF 55%, #FFFFFF 100%)",
      accent: "#4F46E5",
      badgeBg: "bg-indigo-700 text-white",
      ribbon: "#4F46E5",
      paperTint: "rgba(79, 70, 229, 0.14)",
      titleText: "text-[#312E81]",
      subText: "text-[#4338CA]",
    },
    slate: {
      spine: "#1E293B",
      coverBg: "linear-gradient(155deg, #F8FAFC 0%, #F1F5F9 55%, #FFFFFF 100%)",
      accent: "#334155",
      badgeBg: "bg-slate-800 text-white",
      ribbon: "#D97706",
      paperTint: "rgba(15, 23, 42, 0.1)",
      titleText: "text-[#0F172A]",
      subText: "text-[#475569]",
    },
  };

  const theme = editorialThemes[themeColor] || editorialThemes.amber;

  const dims = {
    sm: {
      containerH: "h-[186px]",
      bookW: 104,
      bookH: 146,
      spineW: 8,
      topPageH: 5,
      tabletW: 82,
      tabletH: 118,
      tabletChin: "pb-3.5 pt-1.5 px-1.5",
      fontSizeTitle: "text-[9px]",
      pageHeading: "text-[7.5px]",
      pageBody: "text-[6.2px]",
    },
    md: {
      containerH: "h-[236px]",
      bookW: 132,
      bookH: 186,
      spineW: 10,
      topPageH: 6,
      tabletW: 104,
      tabletH: 148,
      tabletChin: "pb-4 pt-2 px-2",
      fontSizeTitle: "text-[11px]",
      pageHeading: "text-[9px]",
      pageBody: "text-[7.5px]",
    },
    lg: {
      containerH: "h-[322px] sm:h-[352px]",
      bookW: 184,
      bookH: 258,
      spineW: 13,
      topPageH: 8,
      tabletW: 144,
      tabletH: 204,
      tabletChin: "pb-6 pt-2.5 px-2.5",
      fontSizeTitle: "text-sm",
      pageHeading: "text-[11.5px]",
      pageBody: "text-[9.5px]",
    },
  }[size];

  const insideText =
    previewSnippet ||
    `สรุปเทคนิคและขั้นตอนปฏิบัติจริง พร้อมเทมเพลตสำเร็จรูปและตัวอย่างนำไปใช้ในงานครูได้ทันที (${category})`;

  const renderEditorialCover = () => (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col justify-between p-3"
      style={{ background: theme.coverBg }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: theme.accent }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <span
            className={cn(
              "px-1.5 py-0.5 rounded font-bold tracking-wider text-[7.5px]",
              theme.badgeBg
            )}
          >
            {code}
          </span>
          <span className="text-[7px] font-bold text-[#64748B]">AiAon</span>
        </div>
        <div
          className={cn(
            "text-[7.5px] font-semibold uppercase tracking-wider truncate",
            theme.subText
          )}
        >
          {category}
        </div>
      </div>

      <div className="relative z-10 my-auto py-0.5">
        <div
          className="w-6 h-0.5 rounded-full mb-1"
          style={{ background: theme.accent }}
        />
        <h4
          className={cn(
            "font-extrabold leading-tight line-clamp-4",
            theme.titleText,
            dims.fontSizeTitle
          )}
        >
          {title}
        </h4>
      </div>

      <div className="relative z-10 pt-1 border-t border-slate-900/10 flex items-center justify-between">
        <div className="flex items-center gap-1 text-[6.5px] text-[#475569] font-semibold">
          <BookOpen className="w-2 h-2 shrink-0" style={{ color: theme.accent }} />
          <span className="truncate">PDF + Web</span>
        </div>
        <div
          className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 text-white"
          style={{ background: theme.accent }}
        >
          {rank <= 10 ? (
            <Award className="w-2 h-2" />
          ) : (
            <ShieldCheck className="w-2 h-2" />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "relative w-full bg-transparent flex items-end justify-center overflow-visible select-none pb-4 pt-5",
        dims.containerH,
        className
      )}
      style={{ perspective: "1200px" }}
      onMouseEnter={() => isInteractive && setIsHovered(true)}
      onMouseLeave={() => isInteractive && setIsHovered(false)}
      onClick={() => isInteractive && setIsHovered(!isHovered)}
    >
      {/* Transparent-BG Composite Stage: 3D Hardcover Book + Leaning Matte-Black E-Reader */}
      <div
        className="relative flex items-end justify-center cursor-pointer bg-transparent"
        style={{
          width: `${dims.bookW + dims.spineW + Math.round(dims.tabletW * 0.56)}px`,
          height: `${dims.bookH + dims.topPageH}px`,
        }}
      >
        {/* Soft Left-Cast Transparent Studio Shadow (matches reference lighting) */}
        <div
          aria-hidden="true"
          className="absolute -bottom-2 -left-3 right-2 h-5 rounded-full blur-md pointer-events-none transition-all duration-500"
          style={{
            background:
              "linear-gradient(90deg, rgba(15,23,42,0.02) 0%, rgba(15,23,42,0.28) 28%, rgba(15,23,42,0.22) 82%, rgba(15,23,42,0.04) 100%)",
            transform: isHovered ? "scaleX(1.04) translateY(2px)" : "scaleX(1)",
          }}
        />

        {/* ── 1. BACK-LEFT: 3D HARDCOVER BOOK WITH SEAMLESS TOP PAGE EDGES + THICK LEFT SPINE ── */}
        <div
          className="relative transition-all duration-500 ease-out transform-gpu"
          style={{
            width: `${dims.spineW + dims.bookW}px`,
            height: `${dims.topPageH + dims.bookH}px`,
            marginRight: `${Math.round(dims.tabletW * 0.48)}px`,
            transform: isHovered
              ? "translateY(-4px) translateX(-3px)"
              : "translateY(0px)",
            filter: "drop-shadow(-10px 12px 14px rgba(15,23,42,0.18))",
          }}
        >
          {/* Seamless 3D Top Pages Parallelogram (Connects Spine Top-Left to Cover Top-Right with 0 Overhang) */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 z-10 overflow-hidden"
            style={{
              width: `${dims.spineW + dims.bookW}px`,
              height: `${dims.topPageH + 1}px`,
              clipPath: `polygon(0% 0%, calc(100% - ${dims.spineW}px) 0%, 100% 100%, ${dims.spineW}px 100%)`,
              background: `linear-gradient(180deg, ${theme.spine} 0px, ${theme.spine} 2px, #F8FAFC 2.5px, #E2E8F0 5px, #FFFFFF 7.5px, #E2E8F0 10px, #CBD5E1 100%)`,
              boxShadow: "inset 0 -2px 4px rgba(15,23,42,0.12)",
            }}
          />

          {/* Thick Visible Left Spine (Top-Left at y=0, Top-Right at y=topPageH) */}
          <div
            className="absolute left-0 z-20 flex flex-col justify-between items-center py-2.5 text-white/95 overflow-hidden"
            style={{
              top: `${dims.topPageH}px`,
              width: `${dims.spineW}px`,
              height: `${dims.bookH}px`,
              background: `linear-gradient(90deg, ${theme.spine} 0%, #0F172A 100%)`,
              boxShadow:
                "inset -2px 0 6px rgba(0,0,0,0.38), inset 1.5px 0 2px rgba(255,255,255,0.22)",
              transform: `skewY(${Math.round((Math.atan(dims.topPageH / dims.spineW) * 180) / Math.PI)}deg)`,
              transformOrigin: "right top",
              borderTopLeftRadius: "2px",
              borderBottomLeftRadius: "3px",
            }}
          >
            <span className="text-[4.5px] font-bold tracking-wider text-amber-300">
              iA
            </span>
            <div
              className="text-[5.5px] sm:text-[6px] font-bold tracking-wider text-white/90 whitespace-nowrap overflow-hidden text-ellipsis max-w-[115px]"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {code}
            </div>
            <span className="text-[4.5px] font-mono text-white/65">#{rank}</span>
          </div>

          {/* Front Hardcover Face (Sits flush at left=spineW, top=topPageH) */}
          <div
            className="absolute z-20 rounded-r-[3px] overflow-hidden bg-white border border-slate-300/75"
            style={{
              left: `${dims.spineW}px`,
              top: `${dims.topPageH}px`,
              width: `${dims.bookW}px`,
              height: `${dims.bookH}px`,
              boxShadow:
                "inset 2px 0 5px rgba(255,255,255,0.45), 6px 10px 18px rgba(15, 23, 42, 0.16)",
            }}
          >
            {coverImage ? (
              <img
                src={coverImage}
                alt={`ปกหนังสือ ${title}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              renderEditorialCover()
            )}

            {/* Spine Crease Lighting */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-3 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(15,23,42,0.25) 0%, rgba(255,255,255,0.24) 45%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* ── 2. FRONT-RIGHT: MATTE-BLACK E-READER SHOWING CLEAN INSIDE PAGE PREVIEW ── */}
        <div
          className="absolute bottom-0 right-0 z-30 transition-all duration-500 ease-out transform-gpu"
          style={{
            width: `${dims.tabletW}px`,
            height: `${dims.tabletH}px`,
            transform: isHovered
              ? "translateX(6px) translateY(-6px) rotateY(-4deg) rotateZ(-0.4deg) scale(1.04)"
              : "translateX(0px) translateY(0px) rotateY(-8deg) rotateZ(-1.6deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Matte-Black Kindle/E-Reader Body */}
          <div
            className={cn(
              "relative w-full h-full rounded-[12px] bg-gradient-to-br from-[#27272A] via-[#18181B] to-[#09090B] border-l-[3px] border-t border-r border-b border-l-[#3F3F46] border-t-[#3F3F46]/60 border-r-[#09090B] border-b-[#09090B] flex flex-col",
              dims.tabletChin
            )}
            style={{
              boxShadow:
                "-12px 12px 22px rgba(15, 23, 42, 0.34), 0 4px 10px rgba(15, 23, 42, 0.22), inset 0 1px 1px rgba(255,255,255,0.16)",
            }}
          >
            {/* Clean Crisp White Inside-Book Reading Screen */}
            <div className="relative w-full h-full rounded-[4px] overflow-hidden bg-white ring-1 ring-black/80 flex flex-col justify-between p-2 sm:p-2.5 text-left">
              {/* Top Chapter Bar + Bookmark Ribbon */}
              <div className="flex items-center justify-between gap-1 border-b border-slate-200/90 pb-1">
                <div className="flex items-center gap-1 min-w-0">
                  <span
                    className="w-0.5 h-2.5 rounded-full shrink-0"
                    style={{ background: theme.accent }}
                  />
                  <span className="font-mono text-[6px] sm:text-[7px] font-bold uppercase tracking-wider text-[#475569] truncate">
                    {code}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="w-2 h-2.5 shrink-0"
                  style={{
                    background: theme.accent,
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%)",
                  }}
                />
              </div>

              {/* Bold Thai Reading Title + Highlight Callout Box */}
              <div className="my-auto py-1 space-y-1.5">
                <div
                  className={cn(
                    "font-extrabold text-[#0F172A] leading-tight line-clamp-2",
                    dims.pageHeading
                  )}
                >
                  {title}
                </div>

                <div
                  className="rounded-md p-1.5 border-l-2"
                  style={{
                    backgroundColor: theme.paperTint,
                    borderLeftColor: theme.accent,
                  }}
                >
                  <p
                    className={cn(
                      "text-[#1E293B] font-medium leading-snug line-clamp-3",
                      dims.pageBody
                    )}
                  >
                    {insideText}
                  </p>
                </div>
              </div>

              {/* Bottom Reader Page Number Line */}
              <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-200/80">
                <span
                  className="h-[1.5px] flex-1 rounded-full opacity-45"
                  style={{ background: theme.accent }}
                />
                <span className="font-mono text-[6.5px] font-bold text-[#334155]">
                  08
                </span>
              </div>

              {/* Subtle Anti-Glare Diagonal Glass Reflection */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(125deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 36%, transparent 50%)",
                }}
              />
            </div>

            {/* Bottom Chin Indicator */}
            <div
              aria-hidden="true"
              className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-white/15"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

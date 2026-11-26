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
  size?: "sm" | "md" | "lg";
  isInteractive?: boolean;
  className?: string;
}

/**
 * Editorial Hardcover 3D Book Mockup (Brand V2.0 — Warm Bookstore Edition)
 * - If `coverImage` is present: renders the real high-res cover artwork on a realistic 3D hardcover.
 * - Otherwise: renders a Stripe Press / Kinokuniya-inspired Editorial Publisher Hardcover.
 */
export function Book3DMockup({
  code = "EB-PA-01",
  title = "คัมภีร์ ว.PA ผ่านฉลุย 100%",
  category = "ว.PA & วิทยฐานะ",
  themeColor = "amber",
  rank = 1,
  coverImage = null,
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
      containerH: "h-[188px]",
      bookW: 124,
      bookH: 168,
      spineW: 16,
      fontSizeTitle: "text-[10px]",
    },
    md: {
      containerH: "h-[244px]",
      bookW: 164,
      bookH: 220,
      spineW: 20,
      fontSizeTitle: "text-xs",
    },
    lg: {
      containerH: "h-[330px] sm:h-[360px]",
      bookW: 224,
      bookH: 300,
      spineW: 26,
      fontSizeTitle: "text-sm sm:text-base",
    },
  }[size];

  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-center overflow-visible select-none py-2",
        dims.containerH,
        className
      )}
      style={{ perspective: "1200px" }}
      onMouseEnter={() => isInteractive && setIsHovered(true)}
      onMouseLeave={() => isInteractive && setIsHovered(false)}
      onClick={() => isInteractive && setIsHovered(!isHovered)}
    >
      {/* Soft Editorial Paper Shadow on Table */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 w-36 h-8 rounded-full blur-xl pointer-events-none transition-all duration-500"
        style={{
          background: "rgba(15, 23, 42, 0.16)",
          transform: isHovered
            ? "translate(-50%, 4px) scale(1.08)"
            : "translate(-50%, 0px) scale(0.95)",
        }}
      />

      {/* 3D Book Stage */}
      <div
        className="relative transition-all duration-500 ease-out transform-gpu cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered
            ? "rotateY(-12deg) rotateX(2deg) translateZ(14px) translateY(-6px) scale(1.03)"
            : "rotateY(-20deg) rotateX(5deg) translateZ(0px)",
        }}
      >
        <div
          className="relative transition-transform duration-500"
          style={{
            width: `${dims.bookW}px`,
            height: `${dims.bookH}px`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* 1. LEFT HARDCOVER SPINE */}
          <div
            className="absolute left-0 top-0 h-full origin-left flex flex-col justify-between items-center py-2.5 text-white/95 rounded-l-[3px] z-20"
            style={{
              width: `${dims.spineW}px`,
              transform: `rotateY(-90deg) translateZ(${dims.spineW / 2}px)`,
              background: `linear-gradient(180deg, ${theme.spine} 0%, #0F172A 100%)`,
              boxShadow: "inset -2px 0 6px rgba(0,0,0,0.35)",
            }}
          >
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[6px] font-bold tracking-wider text-amber-300">AiAon</span>
              <div className="w-2 h-0.5 rounded-full bg-white/40" />
            </div>

            <div
              className="text-[7px] sm:text-[8px] font-semibold tracking-wider text-white/85 whitespace-nowrap overflow-hidden text-ellipsis max-w-[130px]"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              [{code}] {title}
            </div>

            <span className="text-[6px] font-mono text-white/60">#{rank}</span>
          </div>

          {/* 2. RIGHT PAGES THICKNESS BLOCK */}
          <div
            className="absolute right-0 top-[3px] bottom-[3px] origin-right rounded-r-[2px] z-10"
            style={{
              width: `${dims.spineW - 4}px`,
              transform: `rotateY(90deg) translateZ(-${dims.spineW / 2 - 2}px)`,
              background:
                "repeating-linear-gradient(0deg, #FFFDF7 0px, #F8FAFC 2px, #E2E8F0 3px, #FFFDF7 4px)",
              boxShadow: "inset 3px 0 6px rgba(15,23,42,0.16)",
            }}
          />

          {/* 3. BOTTOM PAGES THICKNESS BLOCK */}
          <div
            className="absolute bottom-0 left-[2px] right-[2px] origin-bottom rounded-b-[2px] z-10"
            style={{
              height: `${dims.spineW - 6}px`,
              transform: `rotateX(-90deg) translateZ(-${dims.spineW / 2 - 3}px)`,
              background:
                "repeating-linear-gradient(90deg, #FFFDF7 0px, #F8FAFC 2px, #E2E8F0 3px, #FFFDF7 4px)",
              boxShadow: "inset 0 3px 6px rgba(15,23,42,0.16)",
            }}
          />

          {/* Subtle Editorial Bookmark Ribbon */}
          <div
            className="absolute -bottom-3.5 right-7 w-2.5 h-5 z-30 transition-transform duration-500 origin-top shadow-xs pointer-events-none"
            style={{
              background: theme.ribbon,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)",
              transform: isHovered ? "rotate(-4deg) translateY(2px)" : "rotate(2deg)",
            }}
          />

          {/* 4. FRONT HARDCOVER FACE */}
          {coverImage ? (
            <div
              className="relative w-full h-full rounded-r-xl rounded-l-[3px] overflow-hidden z-20 bg-white border border-slate-200/80"
              style={{
                boxShadow:
                  "inset 2px 0 4px rgba(255,255,255,0.45), 10px 14px 24px rgba(15, 23, 42, 0.22)",
              }}
            >
              <img
                src={coverImage}
                alt={`ปกหนังสือ ${title}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Realistic Hardcover Spine Crease Highlight */}
              <div
                className="absolute left-0 top-0 bottom-0 w-3.5 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(15,23,42,0.28) 0%, rgba(255,255,255,0.22) 38%, rgba(15,23,42,0.12) 56%, transparent 100%)",
                }}
              />
              {/* Subtle Paper Sheen on Hover */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none transition-opacity duration-500"
                style={{ opacity: isHovered ? 1 : 0 }}
              />
            </div>
          ) : (
            <div
              className="relative w-full h-full rounded-r-xl rounded-l-[3px] overflow-hidden flex flex-col justify-between p-3 sm:p-3.5 z-20 border border-slate-200"
              style={{
                background: theme.coverBg,
                boxShadow:
                  "inset 2px 0 4px rgba(255,255,255,0.7), 10px 14px 24px rgba(15, 23, 42, 0.16)",
              }}
            >
              {/* Hardcover Spine Crease */}
              <div
                className="absolute left-0 top-0 bottom-0 w-3 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(15,23,42,0.14) 0%, rgba(255,255,255,0.45) 42%, rgba(15,23,42,0.06) 62%, transparent 100%)",
                }}
              />

              {/* Top Editorial Accent Strip */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ background: theme.accent }}
              />

              {/* Top Header */}
              <div className="relative z-10 pl-2 pt-1">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-[8px] font-bold tracking-wider",
                      theme.badgeBg
                    )}
                  >
                    #{rank} • {code}
                  </span>
                  <span className="text-[8px] font-bold text-[#64748B] tracking-tight">
                    AiAon Edu
                  </span>
                </div>
                <div
                  className={cn(
                    "text-[8px] font-semibold uppercase tracking-wider truncate",
                    theme.subText
                  )}
                >
                  {category}
                </div>
              </div>

              {/* Middle Editorial Title Block */}
              <div className="relative z-10 pl-2 my-auto py-1">
                <div
                  className="w-7 h-0.5 rounded-full mb-2"
                  style={{ background: theme.accent }}
                />
                <h4
                  className={cn(
                    "font-extrabold leading-snug line-clamp-4",
                    theme.titleText,
                    dims.fontSizeTitle
                  )}
                >
                  {title}
                </h4>
              </div>

              {/* Bottom Publisher Seal */}
              <div className="relative z-10 pl-2 pt-2 border-t border-slate-900/10 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[8px] text-[#475569] font-semibold">
                  <BookOpen className="w-2.5 h-2.5 shrink-0" style={{ color: theme.accent }} />
                  <span className="truncate">Web + PDF A4</span>
                </div>
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-white"
                  style={{ background: theme.accent }}
                  title="AiAon Official Editorial Edition"
                >
                  {rank <= 10 ? (
                    <Award className="w-2.5 h-2.5" />
                  ) : (
                    <ShieldCheck className="w-2.5 h-2.5" />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Sparkles, Award, Bookmark, ShieldCheck, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Book3DMockupProps {
  code: string;
  title: string;
  category?: string;
  themeColor?: string;
  rank?: number;
  earlyBirdPrice?: number;
  size?: "sm" | "md" | "lg";
  isInteractive?: boolean;
  className?: string;
}

export function Book3DMockup({
  code = "EB01",
  title = "คัมภีร์ ว.PA ผ่านฉลุย 100%",
  category = "ว.PA & วิทยฐานะ",
  themeColor = "cyan",
  rank = 1,
  earlyBirdPrice,
  size = "md",
  isInteractive = true,
  className = "",
}: Book3DMockupProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Theme color maps for futuristic neon accents
  const themeGlows: Record<string, {
    primary: string;
    border: string;
    badge: string;
    ribbon: string;
    ambient: string;
    gradient: string;
  }> = {
    emerald: {
      primary: "#10b981",
      border: "rgba(16, 185, 129, 0.4)",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      ribbon: "#059669",
      ambient: "rgba(16, 185, 129, 0.35)",
      gradient: "from-emerald-950 via-slate-950 to-slate-900",
    },
    cyan: {
      primary: "#06b6d4",
      border: "rgba(6, 182, 212, 0.4)",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
      ribbon: "#0891b2",
      ambient: "rgba(6, 182, 212, 0.35)",
      gradient: "from-cyan-950 via-slate-950 to-slate-900",
    },
    purple: {
      primary: "#a855f7",
      border: "rgba(168, 85, 247, 0.4)",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      ribbon: "#9333ea",
      ambient: "rgba(168, 85, 247, 0.35)",
      gradient: "from-purple-950 via-slate-950 to-slate-900",
    },
    amber: {
      primary: "#f59e0b",
      border: "rgba(245, 158, 11, 0.4)",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      ribbon: "#d97706",
      ambient: "rgba(245, 158, 11, 0.35)",
      gradient: "from-amber-950 via-slate-950 to-slate-900",
    },
    rose: {
      primary: "#f43f5e",
      border: "rgba(244, 63, 94, 0.4)",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      ribbon: "#e11d48",
      ambient: "rgba(244, 63, 94, 0.35)",
      gradient: "from-rose-950 via-slate-950 to-slate-900",
    },
    blue: {
      primary: "#3b82f6",
      border: "rgba(59, 130, 246, 0.4)",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      ribbon: "#2563eb",
      ambient: "rgba(59, 130, 246, 0.35)",
      gradient: "from-blue-950 via-slate-950 to-slate-900",
    },
    teal: {
      primary: "#14b8a6",
      border: "rgba(20, 184, 166, 0.4)",
      badge: "bg-teal-500/20 text-teal-300 border-teal-500/40",
      ribbon: "#0d9488",
      ambient: "rgba(20, 184, 166, 0.35)",
      gradient: "from-teal-950 via-slate-950 to-slate-900",
    },
    orange: {
      primary: "#f97316",
      border: "rgba(249, 115, 22, 0.4)",
      badge: "bg-orange-500/20 text-orange-300 border-orange-500/40",
      ribbon: "#ea580c",
      ambient: "rgba(249, 115, 22, 0.35)",
      gradient: "from-orange-950 via-slate-950 to-slate-900",
    },
    pink: {
      primary: "#ec4899",
      border: "rgba(236, 72, 153, 0.4)",
      badge: "bg-pink-500/20 text-pink-300 border-pink-500/40",
      ribbon: "#db2777",
      ambient: "rgba(236, 72, 153, 0.35)",
      gradient: "from-pink-950 via-slate-950 to-slate-900",
    },
    indigo: {
      primary: "#6366f1",
      border: "rgba(99, 102, 241, 0.4)",
      badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
      ribbon: "#4f46e5",
      ambient: "rgba(99, 102, 241, 0.35)",
      gradient: "from-indigo-950 via-slate-950 to-slate-900",
    },
  };

  const theme = themeGlows[themeColor] || themeGlows.cyan;

  // Dimensions based on size
  const dims = {
    sm: {
      containerH: "h-[190px]",
      bookW: 125,
      bookH: 175,
      spineW: 18,
      fontSizeTitle: "text-[10px]",
      fontSizeCode: "text-[8px]",
    },
    md: {
      containerH: "h-[235px]",
      bookW: 155,
      bookH: 215,
      spineW: 22,
      fontSizeTitle: "text-xs",
      fontSizeCode: "text-[9px]",
    },
    lg: {
      containerH: "h-[320px] sm:h-[350px]",
      bookW: 215,
      bookH: 295,
      spineW: 28,
      fontSizeTitle: "text-sm sm:text-base",
      fontSizeCode: "text-xs",
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
      {/* ── Ambient Underglow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-36 rounded-full blur-[45px] pointer-events-none transition-all duration-700"
        style={{
          background: theme.ambient,
          opacity: isHovered ? 0.9 : 0.45,
          transform: isHovered ? "translate(-50%, -45%) scale(1.15)" : "translate(-50%, -50%) scale(1)",
        }}
      />

      {/* ── 3D Book Stage ── */}
      <div
        className="relative transition-all duration-700 ease-out transform-gpu cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered
            ? "rotateY(-18deg) rotateX(4deg) translateZ(15px) translateY(-6px) scale(1.03)"
            : "rotateY(-24deg) rotateX(7deg) translateZ(0px)",
        }}
      >
        {/* Book Container with dimensions */}
        <div
          className="relative transition-transform duration-500"
          style={{
            width: `${dims.bookW}px`,
            height: `${dims.bookH}px`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* ══════════════════════════════════════════════════════
              1. 3D HARDCOVER SPINE (LEFT EDGE)
          ══════════════════════════════════════════════════════ */}
          <div
            className="absolute left-0 top-0 h-full origin-left flex flex-col justify-between items-center py-2 text-white/90 shadow-2xl rounded-l-[3px] z-20 border-l border-y border-white/20"
            style={{
              width: `${dims.spineW}px`,
              transform: `rotateY(-90deg) translateZ(${dims.spineW / 2}px)`,
              background: `linear-gradient(180deg, #090e17 0%, ${theme.primary}22 30%, #030712 70%, #000000 100%)`,
            }}
          >
            {/* Top spine foil badge */}
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[7px] font-mono font-black text-amber-400">iA</span>
              <div
                className="w-2.5 h-0.5 rounded-full"
                style={{ background: theme.primary }}
              />
            </div>

            {/* Vertical Spine Title & Code */}
            <div
              className="text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-slate-200/90 whitespace-nowrap overflow-hidden text-ellipsis max-w-[140px]"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                textShadow: `0 0 10px ${theme.primary}80`,
              }}
            >
              [{code}] {title}
            </div>

            {/* Bottom author mark */}
            <div className="flex flex-col items-center">
              <span className="text-[6px] font-mono text-white/60 tracking-tighter">ครูอ้น</span>
              <span className="text-[5px] font-mono text-amber-400/80">2026</span>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════
              2. 3D RIGHT PAGES THICKNESS BLOCK (PAGE RIDGES)
          ══════════════════════════════════════════════════════ */}
          <div
            className="absolute right-0 top-[2px] bottom-[2px] origin-right shadow-inner rounded-r-[2px] z-10"
            style={{
              width: `${dims.spineW - 4}px`,
              transform: `rotateY(90deg) translateZ(-${dims.spineW / 2 - 2}px)`,
              background: "repeating-linear-gradient(0deg, #f8fafc 0px, #f1f5f9 2px, #e2e8f0 3px, #cbd5e1 4px)",
              borderRight: "1px solid rgba(255,255,255,0.4)",
              boxShadow: "inset 4px 0 8px rgba(0,0,0,0.35)",
            }}
          />

          {/* ══════════════════════════════════════════════════════
              3. 3D BOTTOM PAGES THICKNESS BLOCK + SATIN RIBBON
          ══════════════════════════════════════════════════════ */}
          <div
            className="absolute bottom-0 left-[2px] right-[2px] origin-bottom shadow-inner rounded-b-[2px] z-10"
            style={{
              height: `${dims.spineW - 6}px`,
              transform: `rotateX(-90deg) translateZ(-${dims.spineW / 2 - 3}px)`,
              background: "repeating-linear-gradient(90deg, #f8fafc 0px, #f1f5f9 2px, #e2e8f0 3px, #cbd5e1 4px)",
              boxShadow: "inset 0 4px 8px rgba(0,0,0,0.4)",
            }}
          />

          {/* Satin Ribbon Bookmark Dangling from Bottom */}
          <div
            className="absolute -bottom-4 right-8 w-3 h-6 z-30 transition-transform duration-500 origin-top shadow-md pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${theme.ribbon} 0%, #fbbf24 100%)`,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)",
              transform: isHovered ? "rotate(-5deg) translateY(2px)" : "rotate(3deg)",
            }}
          />

          {/* ══════════════════════════════════════════════════════
              4. 3D HARDCOVER FRONT COVER (MAIN FACE)
          ══════════════════════════════════════════════════════ */}
          <div
            className={cn(
              "relative w-full h-full rounded-r-xl rounded-l-sm overflow-hidden flex flex-col justify-between p-3 sm:p-3.5 z-20 transition-all duration-300",
              "border-t border-r border-b",
              "bg-gradient-to-br",
              theme.gradient
            )}
            style={{
              borderColor: theme.border,
              boxShadow: `
                inset 1px 1px 2px rgba(255,255,255,0.25),
                inset -2px -2px 4px rgba(0,0,0,0.6),
                12px 18px 30px rgba(0, 0, 0, 0.75),
                0 0 25px ${theme.primary}25
              `,
            }}
          >
            {/* Hardcover Inner Bevel Ridge / Groove (Indentation near spine) */}
            <div className="absolute left-2.5 top-0 bottom-0 w-[1.5px] bg-gradient-to-r from-black/60 via-white/10 to-transparent pointer-events-none shadow-[1px_0_2px_rgba(0,0,0,0.8)]" />

            {/* Cyber Circuit & Geometric Background Grid */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `
                  radial-gradient(${theme.primary} 1px, transparent 1px),
                  linear-gradient(to right, ${theme.primary}10 1px, transparent 1px),
                  linear-gradient(to bottom, ${theme.primary}10 1px, transparent 1px)
                `,
                backgroundSize: "16px 16px, 16px 16px, 16px 16px",
              }}
            />

            {/* Futuristic Holographic Glass Reflection Sweep */}
            <div
              className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transition-transform duration-1000 rotate-12"
              style={{
                transform: isHovered ? "translateX(70%) translateY(70%)" : "translateX(-30%) translateY(-30%)",
              }}
            />

            {/* ── TOP HEADER: Rank & Code Pill ── */}
            <div className="relative z-10 pl-2">
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-wider border shadow-sm",
                    theme.badge
                  )}
                >
                  #{rank} • {code}
                </span>

                <div className="flex items-center gap-1 text-[8px] font-mono text-amber-400">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>2026</span>
                </div>
              </div>

              <div className="text-[8px] text-slate-400 uppercase tracking-widest font-semibold truncate">
                {category}
              </div>
            </div>

            {/* ── MIDDLE: Thai Book Title & Cyber Accent ── */}
            <div className="relative z-10 pl-2 my-auto py-1">
              {/* Glowing accent bar */}
              <div
                className="w-8 h-1 rounded-full mb-2 shadow-[0_0_8px_currentColor]"
                style={{ background: theme.primary, color: theme.primary }}
              />

              <h4
                className={cn(
                  "font-black text-white leading-snug line-clamp-3 transition-colors",
                  dims.fontSizeTitle
                )}
                style={{
                  textShadow: "0 2px 8px rgba(0,0,0,0.9), 0 0 15px rgba(255,255,255,0.15)",
                }}
              >
                {title}
              </h4>
            </div>

            {/* ── BOTTOM: Security Seal & Format Deliverable Badge ── */}
            <div className="relative z-10 pl-2 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[8px] text-slate-300 font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">Web Reader + A4</span>
              </div>

              {/* Hologram Gold Guarantee Sticker */}
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow-md border border-amber-300/60"
                style={{
                  background: "radial-gradient(circle, #fef08a 0%, #ca8a04 100%)",
                }}
                title="iAon Tech Official Guaranteed 2026"
              >
                <Award className="w-3 h-3 text-zinc-950" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

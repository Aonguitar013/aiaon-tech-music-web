"use client";

import React, { useState } from "react";
import { Sparkles, Award, Wifi, QrCode, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StudentCardMockupProps {
  code: string;
  title: string;
  tagline?: string;
  themeColor?: "pink" | "cyan" | "amber" | "purple";
  badgeText?: string;
  serialNo?: string;
  isInteractive?: boolean;
  className?: string;
}

export function StudentCardMockup({
  code = "STU01",
  title = "เว็บ Portfolio ดิจิทัล TCAS 3D",
  tagline = "SMART TCAS 3D PROFILE PASS",
  themeColor = "pink",
  badgeText = "TCAS 3D PASS",
  serialNo = "STU-2026-TCAS-001",
  isInteractive = true,
  className = "",
}: StudentCardMockupProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Theme palettes
  const palettes = {
    pink: {
      primary: "#ec4899",
      secondary: "#a855f7",
      border: "rgba(236, 72, 153, 0.45)",
      ambient: "rgba(236, 72, 153, 0.35)",
      gradient: "from-pink-950 via-slate-950 to-purple-950",
      chipColor: "#fde047",
      textAccent: "text-pink-300",
      pill: "bg-pink-500/20 text-pink-300 border-pink-500/40",
    },
    cyan: {
      primary: "#06b6d4",
      secondary: "#3b82f6",
      border: "rgba(6, 182, 212, 0.45)",
      ambient: "rgba(6, 182, 212, 0.35)",
      gradient: "from-cyan-950 via-slate-950 to-blue-950",
      chipColor: "#38bdf8",
      textAccent: "text-cyan-300",
      pill: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    },
    amber: {
      primary: "#f59e0b",
      secondary: "#ea580c",
      border: "rgba(245, 158, 11, 0.45)",
      ambient: "rgba(245, 158, 11, 0.35)",
      gradient: "from-amber-950 via-slate-950 to-orange-950",
      chipColor: "#fbbf24",
      textAccent: "text-amber-300",
      pill: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    },
    purple: {
      primary: "#a855f7",
      secondary: "#ec4899",
      border: "rgba(168, 85, 247, 0.45)",
      ambient: "rgba(168, 85, 247, 0.35)",
      gradient: "from-purple-950 via-slate-950 to-pink-950",
      chipColor: "#e879f9",
      textAccent: "text-purple-300",
      pill: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    },
  }[themeColor] || {
    primary: "#ec4899",
    secondary: "#a855f7",
    border: "rgba(236, 72, 153, 0.45)",
    ambient: "rgba(236, 72, 153, 0.35)",
    gradient: "from-pink-950 via-slate-950 to-purple-950",
    chipColor: "#fde047",
    textAccent: "text-pink-300",
    pill: "bg-pink-500/20 text-pink-300 border-pink-500/40",
  };

  return (
    <div
      className={cn(
        "relative w-full h-[240px] sm:h-[260px] flex items-center justify-center overflow-visible select-none py-2",
        className
      )}
      style={{ perspective: "1100px" }}
      onMouseEnter={() => isInteractive && setIsHovered(true)}
      onMouseLeave={() => isInteractive && setIsHovered(false)}
      onClick={() => isInteractive && setIsHovered(!isHovered)}
    >
      {/* ── Ambient Radial Backlight Glow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-48 rounded-full blur-[45px] pointer-events-none transition-all duration-700"
        style={{
          background: palettes.ambient,
          opacity: isHovered ? 0.9 : 0.45,
          transform: isHovered
            ? "translate(-50%, -50%) scale(1.2)"
            : "translate(-50%, -50%) scale(1)",
        }}
      />

      {/* ── 3D Card Stage ── */}
      <div
        className="relative transition-all duration-700 ease-out transform-gpu cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered
            ? "rotateY(-14deg) rotateX(4deg) translateZ(12px) translateY(-6px) scale(1.04)"
            : "rotateY(-20deg) rotateX(7deg) translateZ(0px)",
        }}
      >
        {/* Card Slab (Acrylic Slab / Magnetic PSA-style Frame) */}
        <div
          className={cn(
            "relative w-[165px] h-[230px] sm:w-[175px] sm:h-[245px] rounded-2xl p-3 flex flex-col justify-between overflow-hidden",
            "border-2 transition-all duration-500 shadow-2xl",
            "bg-gradient-to-br",
            palettes.gradient
          )}
          style={{
            borderColor: palettes.border,
            boxShadow: `
              inset 1px 1px 2px rgba(255,255,255,0.4),
              inset -2px -2px 4px rgba(0,0,0,0.7),
              0 20px 35px rgba(0,0,0,0.85),
              0 0 25px ${palettes.primary}30
            `,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Cyberpunk Grid Background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(${palettes.primary} 1.5px, transparent 1.5px),
                linear-gradient(to right, ${palettes.primary}15 1px, transparent 1px),
                linear-gradient(to bottom, ${palettes.primary}15 1px, transparent 1px)
              `,
              backgroundSize: "14px 14px, 14px 14px, 14px 14px",
            }}
          />

          {/* Holographic Prism Rainbow Reflection Foil */}
          <div
            className="absolute -inset-full pointer-events-none transition-transform duration-1000 opacity-60 mix-blend-color-dodge rotate-25"
            style={{
              background: `
                linear-gradient(
                  135deg,
                  transparent 20%,
                  rgba(236,72,153,0.3) 35%,
                  rgba(6,182,212,0.4) 50%,
                  rgba(245,158,11,0.3) 65%,
                  transparent 80%
                )
              `,
              transform: isHovered
                ? "translateX(70%) translateY(70%)"
                : "translateX(-40%) translateY(-40%)",
            }}
          />

          {/* Glass Bevel Highlights (Edge shine) */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

          {/* ══════════════════════════════════════════════════
              TOP SECTION: Header, Code, NFC Wave & Serial
          ══════════════════════════════════════════════════ */}
          <div className="relative z-10" style={{ transform: "translateZ(8px)" }}>
            <div className="flex items-center justify-between mb-1.5">
              <span
                className={cn(
                  "px-2 py-0.5 rounded-md text-[8px] sm:text-[9px] font-black uppercase tracking-wider border shadow-sm font-mono",
                  palettes.pill
                )}
              >
                {code} • {badgeText}
              </span>

              <div className="flex items-center gap-1 text-white/80">
                <Wifi className="w-3 h-3 text-cyan-300 rotate-90" />
                <span className="text-[7px] font-mono font-bold tracking-tighter text-amber-300">NFC</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[7px] font-mono text-slate-400 border-b border-white/10 pb-1">
              <span>iAonTech 2026</span>
              <span className="text-white/60 tracking-wider">GEN-Z PASS</span>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════
              MIDDLE SECTION: Gold Microchip & Thai Title
          ══════════════════════════════════════════════════ */}
          <div className="relative z-10 my-auto py-1" style={{ transform: "translateZ(10px)" }}>
            {/* Embedded Gold Microchip */}
            <div className="flex items-center justify-between mb-2">
              <div
                className="w-8 h-6 rounded-md p-0.5 border border-amber-300/80 shadow-md relative overflow-hidden flex flex-col justify-between"
                style={{
                  background: "linear-gradient(135deg, #fef08a 0%, #ca8a04 50%, #eab308 100%)",
                }}
                title="Smart Contactless Microchip"
              >
                {/* Microchip internal etched circuit tracks */}
                <div className="w-full h-[1px] bg-amber-900/40 my-auto" />
                <div className="flex justify-between w-full h-[1px] bg-amber-900/40 my-auto">
                  <div className="w-1.5 h-full bg-amber-900/60" />
                  <div className="w-1.5 h-full bg-amber-900/60" />
                </div>
                <div className="w-full h-[1px] bg-amber-900/40 my-auto" />
              </div>

              {/* Holographic Security Shield */}
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center border border-white/40 shadow-sm"
                style={{
                  background: "radial-gradient(circle, #38bdf8 0%, #0369a1 100%)",
                }}
              >
                <ShieldCheck className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Glowing Accent Title */}
            <div
              className="w-6 h-0.5 rounded-full mb-1.5"
              style={{ background: palettes.primary }}
            />

            <h4
              className="text-xs sm:text-sm font-black text-white leading-tight line-clamp-2"
              style={{
                textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 0 10px rgba(255,255,255,0.2)",
              }}
            >
              {title}
            </h4>

            <p className="text-[8px] text-slate-300 font-mono mt-1 tracking-tight truncate">
              {tagline}
            </p>
          </div>

          {/* ══════════════════════════════════════════════════
              BOTTOM SECTION: Barcode, QR Mini & Serial No
          ══════════════════════════════════════════════════ */}
          <div
            className="relative z-10 pt-2 border-t border-white/10"
            style={{ transform: "translateZ(8px)" }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[8px] font-mono text-amber-300 font-bold tracking-wider">
                {serialNo}
              </span>
              <div className="flex items-center gap-1 text-[7px] font-mono text-emerald-400">
                <Zap className="w-2.5 h-2.5 fill-emerald-400" />
                <span>ACTIVE</span>
              </div>
            </div>

            {/* Simulated Cyber Barcode */}
            <div className="w-full h-3 rounded bg-black/60 px-1.5 flex items-center justify-between border border-white/10">
              <div className="flex items-center gap-[2px] h-2">
                <div className="w-[2px] h-full bg-white/70" />
                <div className="w-[1px] h-full bg-white/70" />
                <div className="w-[3px] h-full bg-white/70" />
                <div className="w-[1px] h-full bg-white/70" />
                <div className="w-[2px] h-full bg-white/70" />
                <div className="w-[4px] h-full bg-white/70" />
                <div className="w-[1px] h-full bg-white/70" />
                <div className="w-[2px] h-full bg-white/70" />
                <div className="w-[1px] h-full bg-white/70" />
              </div>
              <span className="text-[6px] font-mono text-white/50 tracking-widest">
                LIFETIME PASS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

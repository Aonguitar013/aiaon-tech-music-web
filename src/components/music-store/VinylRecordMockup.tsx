"use client";

import React, { useState } from "react";
import { Disc, Sparkles, Music, ShieldCheck, Zap, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VinylRecordMockupProps {
  code: string;
  title: string;
  categoryLabel?: string;
  bpm?: string;
  duration?: string;
  accentColor?: "amber" | "cyan" | "emerald" | "purple" | "pink";
  isPlaying?: boolean;
  size?: "sm" | "md" | "lg";
  isInteractive?: boolean;
  className?: string;
  onPlayClick?: () => void;
}

export function VinylRecordMockup({
  code = "MUS-01",
  title = "เพลงช่วยจำกฎหมายครู Vol.1",
  categoryLabel = "เพลงช่วยจำสอบครูผู้ช่วย",
  bpm = "115 BPM",
  duration = "3:30",
  accentColor = "amber",
  isPlaying = false,
  size = "md",
  isInteractive = true,
  className = "",
  onPlayClick,
}: VinylRecordMockupProps) {
  const [isHovered, setIsHovered] = useState(false);

  const activeColor = {
    amber: {
      primary: "#f59e0b",
      border: "rgba(245, 158, 11, 0.45)",
      ambient: "rgba(245, 158, 11, 0.35)",
      gradient: "from-amber-950 via-slate-950 to-orange-950",
      labelGradient: "from-amber-400 to-orange-500",
      pill: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    },
    cyan: {
      primary: "#06b6d4",
      border: "rgba(6, 182, 212, 0.45)",
      ambient: "rgba(6, 182, 212, 0.35)",
      gradient: "from-cyan-950 via-slate-950 to-blue-950",
      labelGradient: "from-cyan-400 to-blue-500",
      pill: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    },
    emerald: {
      primary: "#10b981",
      border: "rgba(16, 185, 129, 0.45)",
      ambient: "rgba(16, 185, 129, 0.35)",
      gradient: "from-emerald-950 via-slate-950 to-teal-950",
      labelGradient: "from-emerald-400 to-teal-500",
      pill: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    },
    purple: {
      primary: "#a855f7",
      border: "rgba(168, 85, 247, 0.45)",
      ambient: "rgba(168, 85, 247, 0.35)",
      gradient: "from-purple-950 via-slate-950 to-indigo-950",
      labelGradient: "from-purple-400 to-indigo-500",
      pill: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    },
    pink: {
      primary: "#ec4899",
      border: "rgba(236, 72, 153, 0.45)",
      ambient: "rgba(236, 72, 153, 0.35)",
      gradient: "from-pink-950 via-slate-950 to-purple-950",
      labelGradient: "from-pink-400 to-rose-500",
      pill: "bg-pink-500/20 text-pink-300 border-pink-500/40",
    },
  }[accentColor] || {
    primary: "#f59e0b",
    border: "rgba(245, 158, 11, 0.45)",
    ambient: "rgba(245, 158, 11, 0.35)",
    gradient: "from-amber-950 via-slate-950 to-orange-950",
    labelGradient: "from-amber-400 to-orange-500",
    pill: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  };

  const dims = {
    sm: {
      containerH: "h-[190px]",
      sleeveW: 135,
      sleeveH: 135,
      discSize: 125,
      fontSizeTitle: "text-[10px]",
    },
    md: {
      containerH: "h-[220px] sm:h-[230px]",
      sleeveW: 155,
      sleeveH: 155,
      discSize: 145,
      fontSizeTitle: "text-xs",
    },
    lg: {
      containerH: "h-[300px] sm:h-[320px]",
      sleeveW: 220,
      sleeveH: 220,
      discSize: 205,
      fontSizeTitle: "text-sm sm:text-base",
    },
  }[size];

  const isSlideOut = isHovered || isPlaying;

  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-center overflow-visible select-none py-2",
        dims.containerH,
        className
      )}
      style={{ perspective: "1000px" }}
      onMouseEnter={() => isInteractive && setIsHovered(true)}
      onMouseLeave={() => isInteractive && setIsHovered(false)}
      onClick={() => isInteractive && setIsHovered(!isHovered)}
    >
      {/* ── Ambient Radial Backlight Glow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-40 rounded-full blur-[45px] pointer-events-none transition-all duration-700"
        style={{
          background: activeColor.ambient,
          opacity: isSlideOut ? 0.95 : 0.45,
          transform: isSlideOut
            ? "translate(-50%, -50%) scale(1.2)"
            : "translate(-50%, -50%) scale(1)",
        }}
      />

      {/* ── 3D Stage Container ── */}
      <div
        className="relative transition-all duration-700 ease-out transform-gpu cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: isSlideOut
            ? "rotateY(-14deg) rotateX(4deg) translateZ(10px) translateY(-4px) scale(1.03)"
            : "rotateY(-20deg) rotateX(6deg) translateZ(0px)",
        }}
      >
        {/* Outer Wrap to hold Jacket Sleeve and Sliding Vinyl Disc */}
        <div
          className="relative transition-transform duration-500"
          style={{
            width: `${dims.sleeveW}px`,
            height: `${dims.sleeveH}px`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* ════════════════════════════════════════════════════════════
              1. 3D COMPANION VINYL RECORD (SLIDING OUT & ROTATING)
          ════════════════════════════════════════════════════════════ */}
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.9)] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10 cursor-pointer overflow-hidden",
              isPlaying ? "animate-[spin_4s_linear_infinite]" : isSlideOut ? "rotate-45" : "rotate-0"
            )}
            style={{
              width: `${dims.discSize}px`,
              height: `${dims.discSize}px`,
              right: isSlideOut ? `-${dims.discSize * 0.42}px` : `-${dims.discSize * 0.16}px`,
              transform: isSlideOut ? "translateZ(-2px)" : "translateZ(-8px)",
              background: `
                radial-gradient(circle at 50% 50%, #050507 0%, #09090b 35%, #18181b 45%, #09090b 70%, #000000 100%)
              `,
              boxShadow: `
                0 0 0 1px rgba(255,255,255,0.15),
                0 15px 35px rgba(0,0,0,0.8),
                0 0 20px ${activeColor.primary}25
              `,
            }}
            title={isPlaying ? "กำลังเล่นเมโลดี้ตัวอย่าง..." : "แผ่นเสียงไวนิล 3D หมุนสไลด์ได้"}
            onClick={(e) => {
              if (onPlayClick) {
                e.stopPropagation();
                onPlayClick();
              }
            }}
          >
            {/* Fine Concentric Vinyl Grooves (Microgroove texture) */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none opacity-45"
              style={{
                backgroundImage: `
                  repeating-radial-gradient(
                    circle at 50% 50%,
                    transparent 0px,
                    transparent 2px,
                    rgba(255,255,255,0.06) 2.5px,
                    transparent 3px
                  )
                `,
              }}
            />

            {/* Holographic Prism Rainbow Light Sheen (Two opposing cones of light) */}
            <div
              className="absolute inset-0 rounded-full opacity-60 mix-blend-screen pointer-events-none"
              style={{
                background: `
                  conic-gradient(
                    from 30deg at 50% 50%,
                    transparent 0deg,
                    rgba(255,255,255,0.3) 30deg,
                    rgba(6,182,212,0.35) 45deg,
                    rgba(236,72,153,0.35) 60deg,
                    transparent 80deg,
                    transparent 180deg,
                    rgba(255,255,255,0.3) 210deg,
                    rgba(245,158,11,0.35) 225deg,
                    rgba(16,185,129,0.35) 240deg,
                    transparent 260deg,
                    transparent 360deg
                  )
                `,
              }}
            />

            {/* Center Vinyl Label (ฉลากตรงกลางแผ่นเสียง) */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/30 shadow-inner flex flex-col items-center justify-center p-1"
              style={{
                width: `${dims.discSize * 0.36}px`,
                height: `${dims.discSize * 0.36}px`,
                background: `linear-gradient(135deg, ${activeColor.primary} 0%, #1e1b4b 100%)`,
              }}
            >
              {/* Spindle Center Hole */}
              <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-white/50 shadow-inner my-auto" />

              <span className="text-[6px] sm:text-[7px] font-mono font-black text-white uppercase tracking-tighter truncate max-w-[80%]">
                {code}
              </span>
              <span className="text-[5px] font-mono text-white/70">iAon Sound</span>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              2. 3D ALBUM JACKET SLEEVE (SQUARE FRONT JACKET)
          ════════════════════════════════════════════════════════════ */}
          <div
            className={cn(
              "relative w-full h-full rounded-xl p-3 sm:p-4 flex flex-col justify-between overflow-hidden",
              "border-2 transition-all duration-300 shadow-2xl z-20",
              "bg-gradient-to-br",
              activeColor.gradient
            )}
            style={{
              borderColor: activeColor.border,
              boxShadow: `
                inset 1px 1px 2px rgba(255,255,255,0.3),
                inset -2px -2px 4px rgba(0,0,0,0.7),
                8px 16px 30px rgba(0, 0, 0, 0.8),
                0 0 25px ${activeColor.primary}25
              `,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Inner Vinyl Mouth Shadow (Right side opening where vinyl slides in) */}
            <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-gradient-to-l from-black/80 via-black/40 to-transparent pointer-events-none border-r border-white/20" />

            {/* Cyber Acoustic Soundwave / Grid Background */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `
                  radial-gradient(${activeColor.primary} 1.5px, transparent 1.5px),
                  linear-gradient(to right, ${activeColor.primary}15 1px, transparent 1px),
                  linear-gradient(to bottom, ${activeColor.primary}15 1px, transparent 1px)
                `,
                backgroundSize: "14px 14px, 14px 14px, 14px 14px",
              }}
            />

            {/* Holographic Gloss Sweep Reflection */}
            <div
              className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transition-transform duration-1000 rotate-15"
              style={{
                transform: isSlideOut ? "translateX(70%) translateY(70%)" : "translateX(-30%) translateY(-30%)",
              }}
            />

            {/* ── Top Bar: Code, Category & Audio Pulse ── */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-1">
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-md text-[8px] sm:text-[9px] font-mono font-black uppercase tracking-wider border shadow-sm",
                    activeColor.pill
                  )}
                >
                  {code} • {bpm}
                </span>

                <div className="flex items-center gap-1 text-[8px] font-mono text-amber-400">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>24-BIT</span>
                </div>
              </div>

              <div className="text-[8px] text-slate-300 font-semibold truncate">
                {categoryLabel}
              </div>
            </div>

            {/* ── Middle: Thai Song Title & Audio Waves ── */}
            <div className="relative z-10 my-auto py-1">
              {/* Glowing accent bar */}
              <div
                className="w-7 h-1 rounded-full mb-1.5 shadow-[0_0_8px_currentColor]"
                style={{ background: activeColor.primary, color: activeColor.primary }}
              />

              <h4
                className={cn(
                  "font-black text-white leading-tight line-clamp-2",
                  dims.fontSizeTitle
                )}
                style={{
                  textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 0 12px rgba(255,255,255,0.2)",
                }}
              >
                {title}
              </h4>

              {/* Soundwaves visual animation */}
              <div className="flex items-center gap-0.5 mt-2 h-2.5">
                {[40, 75, 55, 90, 65, 80, 45, 95, 60, 85].map((h, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-[2px] rounded-full transition-all duration-300",
                      isPlaying ? "animate-pulse" : "opacity-40"
                    )}
                    style={{
                      height: isPlaying ? `${h}%` : "30%",
                      background: activeColor.primary,
                      animationDelay: `${i * 70}ms`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ── Bottom: Hologram Seal & Format Pill ── */}
            <div className="relative z-10 pt-1.5 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[7px] text-slate-300 font-medium truncate">
                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>WAV 24-bit + สิทธิ์ตลอดชีพ</span>
              </div>

              {/* Gold Hologram Certified Master Seal */}
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 border border-amber-300/60 shadow-sm"
                style={{
                  background: "radial-gradient(circle, #fef08a 0%, #ca8a04 100%)",
                }}
                title="100% Royalty Free Master Audio"
              >
                <Disc className="w-2.5 h-2.5 text-zinc-950" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

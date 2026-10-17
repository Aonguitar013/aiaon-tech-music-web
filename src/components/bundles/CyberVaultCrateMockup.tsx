"use client";

import React, { useState } from "react";
import { Sparkles, Crown, Shield, Zap, Lock, Database, Layers } from "lucide-react";

export interface CyberVaultCrateMockupProps {
  bundleId: string;
  title: string;
  tagline?: string;
  systemCount?: number;
  themeColor?: "cyan" | "amber" | "purple" | "emerald";
  isFeatured?: boolean;
  size?: "sm" | "md" | "lg";
  isInteractive?: boolean;
  className?: string;
}

export function CyberVaultCrateMockup({
  bundleId = "all-in-one-lifetime",
  title = "All-in-One 20 Systems Lifetime",
  tagline = "คลัง 20 ระบบพร้อมอัปเดตตลอดชีพ",
  systemCount = 20,
  themeColor = "purple",
  isFeatured = false,
  size = "md",
  isInteractive = true,
  className = "",
}: CyberVaultCrateMockupProps) {
  const [isHovered, setIsHovered] = useState(false);

  const colors = {
    cyan: {
      primary: "#06b6d4",
      secondary: "#3b82f6",
      border: "rgba(6, 182, 212, 0.5)",
      glow: "rgba(6, 182, 212, 0.4)",
      innerGlow: "from-cyan-500/40 via-blue-500/30 to-transparent",
      accentBadge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
      chestGrad: "from-slate-900 via-cyan-950/40 to-slate-950",
      lockColor: "text-cyan-400",
      goldTrim: "border-cyan-400/60 bg-cyan-500/20",
    },
    amber: {
      primary: "#f59e0b",
      secondary: "#f97316",
      border: "rgba(245, 158, 11, 0.5)",
      glow: "rgba(245, 158, 11, 0.4)",
      innerGlow: "from-amber-500/40 via-orange-500/30 to-transparent",
      accentBadge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      chestGrad: "from-slate-900 via-amber-950/40 to-slate-950",
      lockColor: "text-amber-400",
      goldTrim: "border-amber-400/60 bg-amber-500/20",
    },
    purple: {
      primary: "#a855f7",
      secondary: "#ec4899",
      border: "rgba(168, 85, 247, 0.6)",
      glow: "rgba(168, 85, 247, 0.45)",
      innerGlow: "from-purple-500/50 via-pink-500/40 to-amber-500/30",
      accentBadge: "bg-purple-500/25 text-purple-300 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]",
      chestGrad: "from-slate-950 via-purple-950/50 to-slate-900",
      lockColor: "text-amber-300",
      goldTrim: "border-amber-400/80 bg-gradient-to-r from-amber-400/20 to-purple-400/20",
    },
    emerald: {
      primary: "#10b981",
      secondary: "#14b8a6",
      border: "rgba(16, 185, 129, 0.5)",
      glow: "rgba(16, 185, 129, 0.4)",
      innerGlow: "from-emerald-500/40 via-teal-500/30 to-transparent",
      accentBadge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      chestGrad: "from-slate-900 via-emerald-950/40 to-slate-950",
      lockColor: "text-emerald-400",
      goldTrim: "border-emerald-400/60 bg-emerald-500/20",
    },
  }[themeColor] || {
    primary: "#a855f7",
    secondary: "#ec4899",
    border: "rgba(168, 85, 247, 0.6)",
    glow: "rgba(168, 85, 247, 0.45)",
    innerGlow: "from-purple-500/50 via-pink-500/40 to-amber-500/30",
    accentBadge: "bg-purple-500/25 text-purple-300 border-purple-500/50",
    chestGrad: "from-slate-950 via-purple-950/50 to-slate-900",
    lockColor: "text-amber-300",
    goldTrim: "border-amber-400/80 bg-gradient-to-r from-amber-400/20 to-purple-400/20",
  };

  const dims = {
    sm: {
      containerH: "h-[190px]",
      chestW: 200,
      chestH: 120,
      lidH: 45,
      scale: 0.85,
    },
    md: {
      containerH: "h-[220px] sm:h-[240px]",
      chestW: 240,
      chestH: 140,
      lidH: 52,
      scale: 1,
    },
    lg: {
      containerH: "h-[270px] sm:h-[300px]",
      chestW: 280,
      chestH: 165,
      lidH: 60,
      scale: 1.15,
    },
  }[size];

  return (
    <div
      className={`relative w-full ${dims.containerH} flex items-center justify-center select-none ${className}`}
      style={{ perspective: "1100px" }}
      onMouseEnter={() => isInteractive && setIsHovered(true)}
      onMouseLeave={() => isInteractive && setIsHovered(false)}
    >
      {/* ──────────────── Ambient Floor Glow ──────────────── */}
      <div
        className="absolute bottom-2 w-48 sm:w-64 h-12 rounded-full blur-2xl transition-all duration-700 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(ellipse at center, ${colors.primary} 0%, transparent 75%)`
            : `radial-gradient(ellipse at center, ${colors.glow} 0%, transparent 70%)`,
          opacity: isHovered ? 0.9 : 0.55,
          transform: isHovered ? "scale(1.2)" : "scale(1)",
        }}
      />

      {/* ──────────────── 3D CYBER VAULT CRATE CONTAINER ──────────────── */}
      <div
        className="relative transition-transform duration-500 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered
            ? "rotateX(14deg) rotateY(-18deg) translateY(-8px) scale(1.04)"
            : "rotateX(12deg) rotateY(-8deg) translateY(0px) scale(1)",
        }}
      >
        {/* ── Outer Halo Rings ── */}
        <div
          className="absolute -inset-4 rounded-3xl blur-xl opacity-30 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
            opacity: isHovered ? 0.65 : 0.25,
          }}
        />

        {/* ── FLOATING HOLOGRAPHIC DATA CORES (Emerging on Hover) ── */}
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 pointer-events-none transition-all duration-500 z-30"
          style={{
            transform: isHovered
              ? "translateX(-50%) translateY(-12px) translateZ(40px) scale(1)"
              : "translateX(-50%) translateY(0px) translateZ(0px) scale(0.85)",
            opacity: isHovered ? 1 : 0.75,
          }}
        >
          <div
            className={`px-3 py-1 rounded-full text-[11px] font-mono font-black border backdrop-blur-md flex items-center gap-1.5 shadow-xl ${colors.accentBadge}`}
          >
            {isFeatured ? (
              <Crown className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
            ) : (
              <Database className="w-3.5 h-3.5 text-cyan-300" />
            )}
            <span>{systemCount} SYSTEMS UNLOCKED</span>
          </div>
        </div>

        {/* ── VAULT CRATE LID (Upper Hydraulic Open Section) ── */}
        <div
          className="relative transition-all duration-500 ease-out z-20"
          style={{
            width: `${dims.chestW}px`,
            height: `${dims.lidH}px`,
            transformStyle: "preserve-3d",
            transformOrigin: "top center",
            transform: isHovered
              ? "rotateX(-24deg) translateY(-10px) translateZ(15px)"
              : "rotateX(0deg) translateY(0px) translateZ(0px)",
          }}
        >
          {/* Lid Top Face */}
          <div
            className={`w-full h-full rounded-t-2xl border-2 ${colors.goldTrim} bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 shadow-xl overflow-hidden relative`}
            style={{
              borderColor: colors.border,
              boxShadow: `0 0 25px ${colors.glow}`,
            }}
          >
            {/* Cyber Grid Inset on Lid */}
            <div className="absolute inset-1.5 rounded-t-xl bg-slate-950/80 border border-white/10 flex items-center justify-between px-3 overflow-hidden">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[9px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                  VAULT://{bundleId.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span className="text-[9px] font-mono text-amber-300 font-bold">LIFETIME</span>
              </div>
            </div>

            {/* Corner Armor Bolts */}
            <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white/20 border border-white/40" />
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white/20 border border-white/40" />

            {/* Hydraulic Hinge Accents */}
            <div className="absolute bottom-0 left-6 w-3 h-2 bg-slate-700 border-x border-slate-500" />
            <div className="absolute bottom-0 right-6 w-3 h-2 bg-slate-700 border-x border-slate-500" />
          </div>
        </div>

        {/* ── VAULT CRATE INTERIOR BEAM (Light Erupting from Inside) ── */}
        <div
          className="absolute left-4 right-4 h-8 transition-opacity duration-500 pointer-events-none z-15"
          style={{
            top: `${dims.lidH - 10}px`,
            background: `radial-gradient(ellipse at center, ${colors.primary} 0%, rgba(255,255,255,0.4) 40%, transparent 80%)`,
            filter: "blur(6px)",
            opacity: isHovered ? 1 : 0.35,
            transform: isHovered ? "scaleY(2.2) translateY(-4px)" : "scaleY(1)",
          }}
        />

        {/* ── VAULT CRATE MAIN BODY (Front Box Section) ── */}
        <div
          className="relative rounded-b-2xl border-2 border-t-0 overflow-hidden shadow-2xl transition-all duration-300"
          style={{
            width: `${dims.chestW}px`,
            height: `${dims.chestH}px`,
            background: `linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(2, 6, 23, 0.98))`,
            borderColor: colors.border,
            boxShadow: isHovered
              ? `0 15px 45px rgba(0,0,0,0.8), 0 0 35px ${colors.glow}`
              : `0 10px 30px rgba(0,0,0,0.6), 0 0 15px ${colors.glow}`,
          }}
        >
          {/* Carbon Fiber / Grid Pattern Background */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "12px 12px",
            }}
          />

          {/* Golden / Metallic Edge Armor Strips */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="absolute left-0 inset-y-0 w-2.5 bg-gradient-to-r from-white/10 to-transparent border-r border-white/5" />
          <div className="absolute right-0 inset-y-0 w-2.5 bg-gradient-to-l from-white/10 to-transparent border-l border-white/5" />

          {/* ── Center Digital Vault Lock Mechanism ── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
            {/* Holographic Lock Icon Badge */}
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-500 mb-2.5 ${colors.goldTrim}`}
              style={{
                boxShadow: `0 0 20px ${colors.glow}`,
                transform: isHovered ? "scale(1.1) rotate(5deg)" : "scale(1)",
              }}
            >
              {isFeatured ? (
                <Crown className="w-6 h-6 text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              ) : (
                <Lock className={`w-5 h-5 ${colors.lockColor}`} />
              )}
            </div>

            {/* Package Code & Title */}
            <div className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
              IAONTECH SECURE VAULT
            </div>
            <h4 className="text-xs sm:text-sm font-black text-white line-clamp-1 mt-0.5 max-w-[200px]">
              {title}
            </h4>
            <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5 max-w-[190px]">
              {tagline}
            </div>

            {/* Microchips / LED Security Indicators */}
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-[9px] font-mono text-slate-400 font-semibold ml-1">
                256-BIT ENCRYPTED
              </span>
            </div>
          </div>

          {/* Bottom Reinforcement Plates & Corner Rivets */}
          <div className="absolute bottom-1.5 left-2 w-2 h-2 rounded-full bg-white/20 border border-white/30" />
          <div className="absolute bottom-1.5 right-2 w-2 h-2 rounded-full bg-white/20 border border-white/30" />
          <div className="absolute bottom-0 inset-x-4 h-1.5 rounded-t-sm bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
    </div>
  );
}

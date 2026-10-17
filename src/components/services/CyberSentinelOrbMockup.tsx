"use client";

import React, { useState } from "react";
import { ShieldCheck, Bot, Sparkles, Zap, Lock, Eye, Activity, CheckCircle2 } from "lucide-react";

export interface CyberSentinelOrbMockupProps {
  packageId?: string;
  title?: string;
  themeColor?: "emerald" | "amber" | "cyan";
  isFeatured?: boolean;
  size?: "sm" | "md" | "lg";
  isInteractive?: boolean;
  className?: string;
}

export function CyberSentinelOrbMockup({
  packageId = "sme-pro",
  title = "SME AI Pro Care (24/7 Sentinel)",
  themeColor = "emerald",
  isFeatured = false,
  size = "md",
  isInteractive = true,
  className = "",
}: CyberSentinelOrbMockupProps) {
  const [isHovered, setIsHovered] = useState(false);

  const colors = {
    emerald: {
      primary: "#10b981",
      secondary: "#06b6d4",
      glow: "rgba(16, 185, 129, 0.45)",
      ringBorder: "border-emerald-400/50",
      coreGrad: "from-emerald-400 via-teal-500 to-cyan-500",
      radarBorder: "border-emerald-500/30",
      accentBadge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      hudColor: "text-emerald-400",
    },
    amber: {
      primary: "#f59e0b",
      secondary: "#f97316",
      glow: "rgba(245, 158, 11, 0.45)",
      ringBorder: "border-amber-400/50",
      coreGrad: "from-amber-400 via-orange-500 to-yellow-500",
      radarBorder: "border-amber-500/30",
      accentBadge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      hudColor: "text-amber-400",
    },
    cyan: {
      primary: "#06b6d4",
      secondary: "#3b82f6",
      glow: "rgba(6, 182, 212, 0.45)",
      ringBorder: "border-cyan-400/50",
      coreGrad: "from-cyan-400 via-blue-500 to-indigo-500",
      radarBorder: "border-cyan-500/30",
      accentBadge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
      hudColor: "text-cyan-400",
    },
  }[themeColor] || {
    primary: "#10b981",
    secondary: "#06b6d4",
    glow: "rgba(16, 185, 129, 0.45)",
    ringBorder: "border-emerald-400/50",
    coreGrad: "from-emerald-400 via-teal-500 to-cyan-500",
    radarBorder: "border-emerald-500/30",
    accentBadge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    hudColor: "text-emerald-400",
  };

  const dims = {
    sm: {
      containerH: "h-[190px]",
      outerSize: 150,
      coreSize: 65,
    },
    md: {
      containerH: "h-[220px] sm:h-[240px]",
      outerSize: 185,
      coreSize: 82,
    },
    lg: {
      containerH: "h-[270px] sm:h-[300px]",
      outerSize: 230,
      coreSize: 105,
    },
  }[size];

  return (
    <div
      className={`relative w-full ${dims.containerH} flex items-center justify-center select-none ${className}`}
      style={{ perspective: "1100px" }}
      onMouseEnter={() => isInteractive && setIsHovered(true)}
      onMouseLeave={() => isInteractive && setIsHovered(false)}
    >
      {/* ──────────────── Ambient Floor Energy Radial Glow ──────────────── */}
      <div
        className="absolute bottom-2 w-52 sm:w-72 h-14 rounded-full blur-2xl transition-all duration-700 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(ellipse at center, ${colors.primary} 0%, transparent 75%)`
            : `radial-gradient(ellipse at center, ${colors.glow} 0%, transparent 70%)`,
          transform: isHovered ? "scale(1.3)" : "scale(1)",
          opacity: isHovered ? 0.95 : 0.6,
        }}
      />

      {/* ──────────────── 3D GYROSCOPE SENTINEL CONTAINER ──────────────── */}
      <div
        className="relative transition-transform duration-500 ease-out flex items-center justify-center"
        style={{
          width: `${dims.outerSize}px`,
          height: `${dims.outerSize}px`,
          transformStyle: "preserve-3d",
          transform: isHovered
            ? "rotateX(18deg) rotateY(-20deg) translateY(-8px) scale(1.06)"
            : "rotateX(12deg) rotateY(-10deg) translateY(0px) scale(1)",
        }}
      >
        {/* Outer Halo Energy Flare */}
        <div
          className="absolute -inset-4 rounded-full blur-xl pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
            opacity: isHovered ? 0.75 : 0.3,
          }}
        />

        {/* ── Top Floating Status HUD Tag ── */}
        <div
          className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none transition-all duration-500 z-30 whitespace-nowrap"
          style={{
            transform: isHovered
              ? "translateX(-50%) translateY(-10px) translateZ(40px) scale(1)"
              : "translateX(-50%) translateY(0px) translateZ(0px) scale(0.9)",
            opacity: isHovered ? 1 : 0.8,
          }}
        >
          <div
            className={`px-3 py-1 rounded-full text-[10px] font-mono font-black border backdrop-blur-md flex items-center gap-1.5 shadow-xl ${colors.accentBadge}`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>AI WATCHDOG 24/7 ACTIVE</span>
          </div>
        </div>

        {/* ── OUTER GYROSCOPE RING 1 (Z-Rotated / Orbiting Ring) ── */}
        <div
          className={`absolute inset-0 rounded-full border-2 ${colors.ringBorder} transition-transform duration-700 pointer-events-none`}
          style={{
            boxShadow: `0 0 20px ${colors.glow}, inset 0 0 15px ${colors.glow}`,
            transform: isHovered
              ? "rotateZ(45deg) rotateX(65deg) scale(1.08)"
              : "rotateZ(25deg) rotateX(60deg) scale(1)",
            animation: "spin 12s linear infinite",
          }}
        >
          {/* Orbital Satellite Node 1 */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border border-emerald-400 shadow-[0_0_10px_#10b981]" />
        </div>

        {/* ── MIDDLE GYROSCOPE RING 2 (Y-Rotated / Counter-Orbiting Ring) ── */}
        <div
          className={`absolute inset-2.5 rounded-full border border-dashed ${colors.ringBorder} transition-transform duration-700 pointer-events-none`}
          style={{
            boxShadow: `0 0 15px ${colors.glow}`,
            transform: isHovered
              ? "rotateZ(-35deg) rotateY(65deg) scale(1.05)"
              : "rotateZ(-20deg) rotateY(55deg) scale(1)",
            animation: "spin 16s linear infinite reverse",
          }}
        >
          {/* Orbital Satellite Node 2 */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyan-300 border border-cyan-400 shadow-[0_0_8px_#06b6d4]" />
        </div>

        {/* ── INNER GYROSCOPE RING 3 (Horizontal Scanner Plane) ── */}
        <div
          className="absolute inset-5 rounded-full border border-white/20 transition-transform duration-500 pointer-events-none"
          style={{
            transform: isHovered ? "rotateX(75deg)" : "rotateX(70deg)",
            background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
          }}
        />

        {/* ── RADAR SCANNING SWEEP BEAM ── */}
        <div
          className="absolute inset-4 rounded-full overflow-hidden pointer-events-none opacity-40"
          style={{
            animation: "spin 4s linear infinite",
          }}
        >
          <div
            className="w-1/2 h-1/2 origin-bottom-right"
            style={{
              background: `linear-gradient(45deg, ${colors.primary} 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* ── CENTRAL GLOWING AI CORE SPHERE ── */}
        <div
          className="relative rounded-full flex flex-col items-center justify-center text-center overflow-hidden z-20 shadow-2xl transition-all duration-500"
          style={{
            width: `${dims.coreSize}px`,
            height: `${dims.coreSize}px`,
            background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${colors.primary} 35%, #022c22 80%, #000000 100%)`,
            boxShadow: isHovered
              ? `0 0 35px ${colors.primary}, inset 0 0 20px rgba(255,255,255,0.6)`
              : `0 0 20px ${colors.primary}, inset 0 0 10px rgba(255,255,255,0.4)`,
            transform: isHovered ? "scale(1.12)" : "scale(1)",
          }}
        >
          {/* Core Surface Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* Core Center Icon */}
          <div className="relative z-10 flex flex-col items-center justify-center p-1">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 font-black drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]" />
            <span className="text-[8px] font-mono font-black text-slate-950 tracking-tighter mt-0.5 uppercase">
              AI WATCHDOG
            </span>
          </div>

          {/* Internal Pulse Ring */}
          <div
            className="absolute inset-1 rounded-full border border-white/40 animate-ping opacity-30 pointer-events-none"
            style={{ animationDuration: "2.5s" }}
          />
        </div>

        {/* ── BOTTOM HUD TELEMETRY DATA ── */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 pointer-events-none transition-all duration-500 z-30"
          style={{
            transform: isHovered
              ? "translateX(-50%) translateY(8px) translateZ(30px) scale(1)"
              : "translateX(-50%) translateY(0px) translateZ(0px) scale(0.9)",
            opacity: isHovered ? 1 : 0.75,
          }}
        >
          <div className="px-2.5 py-0.5 rounded-lg bg-slate-950/90 border border-white/10 text-[9px] font-mono text-slate-300 flex items-center gap-1.5 shadow-md">
            <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>SLIP-VERIFY: 2.0s</span>
          </div>
        </div>
      </div>
    </div>
  );
}

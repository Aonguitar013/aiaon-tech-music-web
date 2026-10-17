"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, ShieldCheck, Terminal, Cpu, Layers,
  Compass, Zap, CheckCircle2, ArrowRight, CornerRightDown,
  Activity, Radio
} from "lucide-react";

interface CyberBlueprintMockupProps {
  tierId: string;
  title: string;
  themeColor?: "cyan" | "purple" | "amber";
  isFeatured?: boolean;
  size?: "sm" | "md" | "lg";
  isInteractive?: boolean;
  className?: string;
}

export function CyberBlueprintMockup({
  tierId,
  title,
  themeColor = "cyan",
  isFeatured = false,
  size = "md",
  isInteractive = true,
  className = "",
}: CyberBlueprintMockupProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Theme palettes for the Cyber Blueprint HUD
  const themes = {
    cyan: {
      primary: "rgb(6, 182, 212)",
      primaryHex: "#06b6d4",
      glowBg: "rgba(6, 182, 212, 0.25)",
      border: "border-cyan-500/40",
      accentBorder: "border-cyan-400",
      text: "text-cyan-400",
      badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      radarColor: "from-cyan-500/30",
      accentClass: "shadow-[0_0_35px_rgba(6,182,212,0.35)]",
    },
    purple: {
      primary: "rgb(168, 85, 247)",
      primaryHex: "#a855f7",
      glowBg: "rgba(168, 85, 247, 0.25)",
      border: "border-purple-500/50",
      accentBorder: "border-purple-400",
      text: "text-purple-400",
      badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      radarColor: "from-purple-500/30",
      accentClass: "shadow-[0_0_45px_rgba(168,85,247,0.45)] ring-1 ring-purple-400/40",
    },
    amber: {
      primary: "rgb(245, 158, 11)",
      primaryHex: "#f59e0b",
      glowBg: "rgba(245, 158, 11, 0.25)",
      border: "border-amber-500/50",
      accentBorder: "border-amber-400",
      text: "text-amber-400",
      badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      radarColor: "from-amber-500/30",
      accentClass: "shadow-[0_0_40px_rgba(245,158,11,0.35)]",
    },
  };

  const currentTheme = themes[themeColor] || themes.cyan;

  // Sizing definitions
  const dimensions = {
    sm: { w: "w-[240px]", h: "h-[160px]", scale: "scale-90" },
    md: { w: "w-[280px]", h: "h-[190px]", scale: "scale-100" },
    lg: { w: "w-[340px]", h: "h-[230px]", scale: "scale-110" },
  }[size];

  // Specific architectural diagram node data based on tier
  const blueprintNodes = {
    "quick-custom": [
      { label: "Google Sheet", icon: "📊", x: "15%", y: "45%" },
      { label: "GAS Engine", icon: "⚡", x: "50%", y: "45%" },
      { label: "PDF / Print", icon: "📄", x: "85%", y: "45%" },
    ],
    "full-webapp": [
      { label: "Mobile UI", icon: "📱", x: "15%", y: "30%" },
      { label: "QR Scanner", icon: "📷", x: "15%", y: "70%" },
      { label: "Cloud Core", icon: "🛡️", x: "50%", y: "50%" },
      { label: "LINE Notify", icon: "💬", x: "85%", y: "30%" },
      { label: "Live Sheet", icon: "📈", x: "85%", y: "70%" },
    ],
    "school-suite": [
      { label: "Admin Portal", icon: "👑", x: "15%", y: "25%" },
      { label: "Staff Nodes", icon: "👥", x: "15%", y: "75%" },
      { label: "Ecosystem Core", icon: "🌐", x: "50%", y: "50%" },
      { label: "Executive HUD", icon: "📊", x: "85%", y: "25%" },
      { label: "Smart DB", icon: "🗄️", x: "85%", y: "75%" },
    ],
  }[tierId] || [
    { label: "Input", icon: "📥", x: "20%", y: "50%" },
    { label: "Processing", icon: "⚙️", x: "50%", y: "50%" },
    { label: "Output", icon: "📤", x: "80%", y: "50%" },
  ];

  return (
    <div
      className={`relative select-none flex items-center justify-center p-3 font-prompt ${className}`}
      onMouseEnter={() => isInteractive && setIsHovered(true)}
      onMouseLeave={() => isInteractive && setIsHovered(false)}
      style={{ perspective: "1000px" }}
    >
      {/* 3D Blueprint Container */}
      <motion.div
        animate={{
          rotateX: isHovered ? 16 : 8,
          rotateY: isHovered ? -16 : -8,
          rotateZ: isHovered ? 2 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className={`relative ${dimensions.w} ${dimensions.h} rounded-2xl bg-slate-950/90 border ${currentTheme.border} backdrop-blur-md overflow-hidden ${currentTheme.accentClass} transition-shadow duration-500`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Holographic Projection Ambient Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 blur-xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${currentTheme.primaryHex} 0%, transparent 70%)`,
          }}
        />

        {/* Blueprint Cad Grid Lines */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `linear-gradient(to right, ${currentTheme.primaryHex}22 1px, transparent 1px), linear-gradient(to bottom, ${currentTheme.primaryHex}22 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
        />

        {/* Holographic Light Beam Sweeping horizontally */}
        <motion.div
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none z-10"
        />

        {/* Top Header HUD Bar */}
        <div className="relative z-20 flex items-center justify-between px-3.5 py-2 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-2" />
            <span className="text-[10px] font-mono font-bold tracking-wider text-white/80 uppercase">
              {tierId.toUpperCase()} • BLUEPRINT
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/50">
            <Radio className={`w-3 h-3 ${currentTheme.text} animate-pulse`} />
            <span>SYS_ONLINE</span>
          </div>
        </div>

        {/* Blueprint Architectural Schematic Canvas */}
        <div className="relative z-20 w-full h-[calc(100%-60px)] flex items-center justify-center p-2">
          {/* Holographic Circuit / Node Grid */}
          <div className="relative w-full h-full border border-dashed border-white/10 rounded-xl bg-slate-900/40 p-2 overflow-hidden">
            {/* Center Crosshair Target */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
              <div className={`w-28 h-28 rounded-full border border-dashed ${currentTheme.border} animate-[spin_20s_linear_infinite]`} />
              <div className="absolute w-36 h-36 rounded-full border border-dotted border-white/10" />
            </div>

            {/* Connecting Vector Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
              <line x1="20%" y1="50%" x2="50%" y2="50%" stroke={currentTheme.primaryHex} strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="50%" y1="50%" x2="80%" y2="50%" stroke={currentTheme.primaryHex} strokeWidth="1.5" strokeDasharray="3 3" />
              {blueprintNodes.length > 3 && (
                <>
                  <line x1="20%" y1="35%" x2="50%" y2="50%" stroke={currentTheme.primaryHex} strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="20%" y1="65%" x2="50%" y2="50%" stroke={currentTheme.primaryHex} strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="50%" y1="50%" x2="80%" y2="35%" stroke={currentTheme.primaryHex} strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="50%" y1="50%" x2="80%" y2="65%" stroke={currentTheme.primaryHex} strokeWidth="1" strokeDasharray="2 2" />
                </>
              )}
            </svg>

            {/* Animated Data Packets Flowing */}
            <motion.div
              animate={{
                left: ["20%", "50%", "80%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-[48%] w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff] z-10"
            />

            {/* Render Architecture Nodes */}
            {blueprintNodes.map((node, i) => (
              <div
                key={i}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5 z-10"
                style={{ left: node.x, top: node.y }}
              >
                <div className={`w-7 h-7 rounded-lg bg-slate-950 border ${currentTheme.border} flex items-center justify-center text-xs shadow-md transition-transform duration-300 hover:scale-125`}>
                  <span>{node.icon}</span>
                </div>
                <span className="text-[8px] font-mono text-white/70 whitespace-nowrap bg-black/60 px-1 rounded">
                  {node.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Status HUD Bar */}
        <div className="relative z-20 flex items-center justify-between px-3 py-1.5 border-t border-white/10 bg-black/50 text-[9px] font-mono text-white/60">
          <span className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${currentTheme.text} bg-current`} />
            BESPOKE ARCHITECTURE
          </span>
          <span className={`${currentTheme.text} font-bold`}>
            100% GOOGLE CLOUD
          </span>
        </div>

        {/* Outer Corner Tech Accents */}
        <div className={`absolute top-1 left-1 w-2 h-2 border-t border-l ${currentTheme.accentBorder}`} />
        <div className={`absolute top-1 right-1 w-2 h-2 border-t border-r ${currentTheme.accentBorder}`} />
        <div className={`absolute bottom-1 left-1 w-2 h-2 border-b border-l ${currentTheme.accentBorder}`} />
        <div className={`absolute bottom-1 right-1 w-2 h-2 border-b border-r ${currentTheme.accentBorder}`} />
      </motion.div>
    </div>
  );
}

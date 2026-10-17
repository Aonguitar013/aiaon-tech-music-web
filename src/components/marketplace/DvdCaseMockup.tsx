"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface DvdCaseMockupProps {
  code: string;
  title: string;
  categoryName?: string;
  tagline?: string;
  glowColor?: string;
  accentGradient?: string;
  icon?: React.ReactNode;
  heroBadge?: string;
  isInteractive?: boolean;
  className?: string;
}

export function DvdCaseMockup({
  code = "AONE09",
  title = "ระบบแกนนำห้องเรียนสีขาว & เล่มรายงาน 37 หน้า",
  categoryName = "กิจการนักเรียน & รางวัล",
  tagline = "WHITE CLASSROOM 37-PAGE AUTO REPORT",
  glowColor = "rgba(6, 182, 212, 0.4)",
  accentGradient = "from-cyan-400 via-teal-300 to-indigo-400",
  icon,
  heroBadge = "HERO EDITION ⭐",
  isInteractive = true,
  className = "",
}: DvdCaseMockupProps) {
  const [isPulled, setIsPulled] = useState(false);

  return (
    <div
      className={cn(
        "relative w-full h-[220px] sm:h-[240px] flex items-center justify-center overflow-visible select-none py-2",
        className
      )}
      style={{ perspective: "1000px" }}
      onClick={(e) => {
        if (isInteractive) {
          e.stopPropagation();
          setIsPulled(!isPulled);
        }
      }}
    >
      {/* Ambient Radial Backlight Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 rounded-full blur-[45px] pointer-events-none opacity-50 group-hover:opacity-85 transition-opacity duration-500"
        style={{ background: glowColor }}
      />

      {/* 3D Rotated Stage */}
      <div
        className="relative transition-all duration-500 ease-out transform-gpu group-hover:scale-105"
        style={{
          transformStyle: "preserve-3d",
          transform: isPulled 
            ? "rotateY(-10deg) rotateX(4deg) translateZ(10px)" 
            : "rotateY(-20deg) rotateX(6deg)",
        }}
      >
        {/* DVD Box Container */}
        <div
          className="relative w-[145px] h-[195px] sm:w-[155px] sm:h-[205px] rounded-[6px_10px_10px_6px] transition-transform duration-500"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ── 1. DVD SPINE (LEFT) ── */}
          <div
            className="absolute left-0 top-0 w-[14px] h-full origin-left flex flex-col justify-between items-center py-2 text-white/90 shadow-2xl border-l border-y border-white/25 rounded-l-[4px] z-10"
            style={{
              transform: "rotateY(-90deg) translateZ(7px)",
              background: "linear-gradient(180deg, #071120 0%, #0d213a 50%, #050c18 100%)",
            }}
          >
            <span className="text-[7px] font-mono font-bold text-cyan-300">iA</span>
            <div
              className="text-[8px] font-mono font-bold tracking-widest text-cyan-200/90 whitespace-nowrap"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              [{code}] {code === "AONE09" ? "WHITE CLASSROOM" : code}
            </div>
            <span className="text-[6px] font-mono text-white/50">DVD</span>
          </div>

          {/* ── 2. COMPANION DVD DISC (SLIDING OUT) ── */}
          <div
            className={cn(
              "absolute top-[22px] w-[140px] h-[140px] sm:w-[150px] sm:h-[150px] rounded-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.8)]",
              isPulled
                ? "right-[-90px] translate-z-[20px] rotate-[-8deg] rotate-45 shadow-[0_15px_35px_rgba(6,182,212,0.6)]"
                : "right-[-35px] translate-z-[-2px] group-hover:right-[-65px] group-hover:rotate-12"
            )}
            title="คลิกเพื่อดึงแผ่นดิสก์เข้า/ออก"
          >
            {/* Holographic Iridescent Disc Texture */}
            <div
              className="absolute inset-0 rounded-full opacity-85"
              style={{
                background: `
                  radial-gradient(circle at 50% 50%, transparent 22%, #080f1d 22.5%, #080f1d 24.5%, transparent 25%),
                  conic-gradient(
                    from 0deg,
                    #06b6d4 0deg,
                    #3b82f6 45deg,
                    #8b5cf6 90deg,
                    #ec4899 135deg,
                    #eab308 180deg,
                    #10b981 225deg,
                    #06b6d4 270deg,
                    #8b5cf6 315deg,
                    #06b6d4 360deg
                  )
                `,
                mixBlendMode: "screen",
              }}
            />

            {/* Disc Printed Label Ring */}
            <div className="absolute inset-0 rounded-full border border-white/20 flex flex-col items-center justify-between p-3 pointer-events-none">
              <span className="text-[7px] font-mono text-cyan-200 font-bold tracking-wider">iAon DVD</span>
              <div className="text-center my-auto">
                <div className="text-[9px] font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-mono">
                  {code}
                </div>
                <div className="text-[6px] text-cyan-300 font-bold uppercase tracking-tight">
                  HERO ENGINE
                </div>
              </div>
              <span className="text-[6px] font-mono text-white/50">GAS &bull; 2026</span>
            </div>

            {/* Disc Center Holes */}
            <div className="absolute w-[50px] h-[50px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/25 pointer-events-none" />
            <div
              className="absolute w-[32px] h-[32px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white/40 shadow-inner"
              style={{
                background: "radial-gradient(circle, rgba(10,15,30,0.95) 0%, rgba(10,15,30,0.95) 50%, rgba(255,255,255,0.4) 60%, transparent 100%)",
              }}
            />
          </div>

          {/* ── 3. DVD FRONT COVER (CYBERPUNK GLASS ACRYLIC) ── */}
          <div
            className="absolute inset-0 rounded-[4px_10px_10px_4px] overflow-hidden flex flex-col justify-between p-3 text-white border border-white/30 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(255,255,255,0.15)]"
            style={{
              transform: "translateZ(8px)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(10,20,38,0.75) 45%, rgba(6,182,212,0.15) 100%)",
            }}
          >
            {/* Top Bar on Front Cover */}
            <div className="flex items-center justify-between border-b border-white/15 pb-1">
              <div className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded bg-cyan-500/30 border border-cyan-400/60 flex items-center justify-center text-[7px] font-bold text-cyan-300">
                  iA
                </span>
                <span className="text-[8px] font-mono font-bold text-cyan-200">iAon Tech</span>
              </div>
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-[7px] font-black tracking-tight">
                {heroBadge}
              </span>
            </div>

            {/* Center Hero Graphic on Front Cover */}
            <div className="my-auto py-1 text-center relative flex flex-col items-center">
              <div className="relative mb-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-slate-900/90 to-cyan-950/80 border border-cyan-400/40 p-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl filter drop-shadow-[0_0_6px_rgba(6,182,212,0.9)]">
                    📑
                  </span>
                  <span className="text-[7px] font-mono font-bold text-cyan-200 mt-0.5">37 หน้า</span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 text-[6px] font-black px-1 rounded shadow">
                  1 คลิก
                </div>
              </div>

              <div className="text-[8px] font-mono font-bold text-cyan-300 tracking-wider uppercase">
                [{code}]
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-white leading-tight font-prompt line-clamp-2 px-1">
                {code === "AONE09" ? "แกนนำห้องเรียนสีขาว & เล่ม 37 หน้า" : title}
              </div>
            </div>

            {/* Bottom Specs on Front Cover */}
            <div className="pt-1.5 border-t border-white/15 flex items-center justify-between text-[7px] font-mono text-white/70">
              <span className="text-emerald-300 font-bold">● Google Docs</span>
              <span className="text-cyan-300">Drive Ready</span>
            </div>

            {/* Glossy Specular Highlight Sheen */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(115deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.08) 20%, transparent 40%, transparent 65%, rgba(6,182,212,0.2) 85%, rgba(255,255,255,0.25) 100%)",
                mixBlendMode: "overlay",
              }}
            />
          </div>

          {/* ── 4. DVD BACK COVER ── */}
          <div
            className="absolute inset-0 rounded-[10px_4px_4px_10px] bg-slate-950 border border-white/15 p-2 flex flex-col justify-between text-[7px] text-slate-400"
            style={{ transform: "translateZ(-8px) rotateY(180deg)" }}
          >
            <div>
              <div className="font-mono text-cyan-400 font-bold text-[8px] mb-1">[{code}] SPECS</div>
              <p className="line-clamp-4 leading-tight text-slate-300">
                ระบบจัดการแกนนำห้องเรียนสีขาว 4 ฝ่าย 25 ตำแหน่ง ผังองค์กรอัตโนมัติ พร้อมเสกเล่มรายงาน 37 หน้า
              </p>
            </div>
            <div className="font-mono text-[6px] text-slate-500">aiaon.tech &bull; 2026</div>
          </div>
        </div>

        {/* ── 5. FLOOR MIRROR REFLECTION ── */}
        <div
          className="absolute -bottom-[25px] left-[-15px] w-[180px] h-[40px] pointer-events-none rounded-full blur-[10px] opacity-40 group-hover:opacity-70 transition-opacity"
          style={{
            background: "radial-gradient(ellipse at center, rgba(6,182,212,0.6) 0%, rgba(139,92,246,0.2) 50%, transparent 80%)",
            transform: "rotateX(90deg) translateZ(-15px)",
          }}
        />
      </div>

      {/* Floating Click Hint (Mobile/Desktop) */}
      <div className="absolute bottom-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="text-[9px] font-prompt px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 shadow-md">
          {isPulled ? "💿 เก็บแผ่น" : "💿 ดึงแผ่น"}
        </span>
      </div>
    </div>
  );
}

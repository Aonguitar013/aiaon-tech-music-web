"use client";

import React, { useState } from "react";
import { Sparkles, Crown, GraduationCap, CheckCircle2, QrCode, Shield, Zap } from "lucide-react";

export interface GoldenTicketMockupProps {
  serialNo?: string;
  candidateName?: string;
  examYear?: string;
  size?: "sm" | "md" | "lg";
  isInteractive?: boolean;
  className?: string;
}

export function GoldenTicketMockup({
  serialNo = "VIP-2026-TEACHER-PASS",
  candidateName = "FUTURE GOVERNMENT TEACHER",
  examYear = "2026",
  size = "md",
  isInteractive = true,
  className = "",
}: GoldenTicketMockupProps) {
  const [isHovered, setIsHovered] = useState(false);

  const dims = {
    sm: {
      containerH: "h-[190px]",
      ticketW: 280,
      ticketH: 140,
      stubW: 65,
    },
    md: {
      containerH: "h-[220px] sm:h-[240px]",
      ticketW: 330,
      ticketH: 165,
      stubW: 78,
    },
    lg: {
      containerH: "h-[260px] sm:h-[280px]",
      ticketW: 380,
      ticketH: 190,
      stubW: 90,
    },
  }[size];

  return (
    <div
      className={`relative w-full ${dims.containerH} flex items-center justify-center select-none ${className}`}
      style={{ perspective: "1100px" }}
      onMouseEnter={() => isInteractive && setIsHovered(true)}
      onMouseLeave={() => isInteractive && setIsHovered(false)}
    >
      {/* ──────────────── Ambient Golden Aura Floor Glow ──────────────── */}
      <div
        className="absolute bottom-2 w-56 sm:w-80 h-14 rounded-full blur-2xl transition-all duration-700 pointer-events-none"
        style={{
          background: isHovered
            ? "radial-gradient(ellipse at center, rgba(245, 158, 11, 0.85) 0%, rgba(234, 179, 8, 0.4) 45%, transparent 75%)"
            : "radial-gradient(ellipse at center, rgba(245, 158, 11, 0.5) 0%, transparent 70%)",
          transform: isHovered ? "scale(1.25)" : "scale(1)",
          opacity: isHovered ? 1 : 0.7,
        }}
      />

      {/* ──────────────── 3D GOLDEN TICKET ROOT ──────────────── */}
      <div
        className="relative transition-transform duration-500 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered
            ? "rotateX(14deg) rotateY(-18deg) translateY(-8px) scale(1.05)"
            : "rotateX(10deg) rotateY(-8deg) translateY(0px) scale(1)",
        }}
      >
        {/* Outer Golden Halo Flare */}
        <div
          className="absolute -inset-3 rounded-2xl blur-xl transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(245, 158, 11, 0.6), rgba(234, 179, 8, 0.3), rgba(249, 115, 22, 0.5))",
            opacity: isHovered ? 0.8 : 0.35,
          }}
        />

        {/* Floating Crown / VIP Stamp on Hover */}
        <div
          className="absolute -top-7 right-6 z-30 pointer-events-none transition-all duration-500"
          style={{
            transform: isHovered
              ? "translateY(-8px) translateZ(35px) scale(1.05)"
              : "translateY(0px) translateZ(0px) scale(0.9)",
            opacity: isHovered ? 1 : 0.85,
          }}
        >
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black text-[10px] tracking-wider uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.6)] border border-amber-200">
            <Crown className="w-3.5 h-3.5 fill-slate-950" />
            <span>LIFETIME VIP EXAM PASS</span>
          </div>
        </div>

        {/* ──────────────── THE TICKET BODY (Golden Slab with Perforation) ──────────────── */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl flex border-2 border-amber-400/80"
          style={{
            width: `${dims.ticketW}px`,
            height: `${dims.ticketH}px`,
            background: "linear-gradient(135deg, #1e1305 0%, #2a1b08 30%, #150d03 70%, #2e1e07 100%)",
            boxShadow: isHovered
              ? "0 20px 50px rgba(0,0,0,0.85), 0 0 35px rgba(245, 158, 11, 0.5), inset 0 0 20px rgba(245, 158, 11, 0.25)"
              : "0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(245, 158, 11, 0.3)",
          }}
        >
          {/* Holographic Rainbow Sheen Sweep across ticket */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-700 z-20"
            style={{
              background:
                "linear-gradient(115deg, transparent 20%, rgba(255, 230, 150, 0.35) 42%, rgba(255, 255, 255, 0.55) 50%, rgba(200, 240, 255, 0.35) 58%, transparent 80%)",
              backgroundSize: "200% 200%",
              opacity: isHovered ? 0.95 : 0.4,
              transform: isHovered ? "translateX(25%)" : "translateX(-25%)",
              transition: "transform 1.2s ease-in-out, opacity 0.5s ease",
            }}
          />

          {/* Micro Guilloche / Circuit Wave Pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#f59e0b 1px, transparent 1px), radial-gradient(#fbbf24 1px, transparent 1px)",
              backgroundSize: "16px 16px",
              backgroundPosition: "0 0, 8px 8px",
            }}
          />

          {/* Golden Corner Trim Accents */}
          <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-amber-300 pointer-events-none" />
          <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-amber-300 pointer-events-none" />
          <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-amber-300 pointer-events-none" />
          <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-amber-300 pointer-events-none" />

          {/* ── LEFT SECTION: MAIN TICKET CONTENT ── */}
          <div className="flex-1 p-3.5 sm:p-4 flex flex-col justify-between relative z-10">
            {/* Top Bar: Ministry / Exam Banner */}
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-950 font-bold" />
                </div>
                <div>
                  <div className="text-[10px] font-black font-mono tracking-wider text-amber-300 uppercase">
                    AIAON PREP EXAM PASS
                  </div>
                  <div className="text-[8px] text-amber-200/60 font-mono">
                    สพฐ. • ก.ค.ศ. • สอบครูผู้ช่วย {examYear}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/40 font-bold">
                  PASS GUARANTEE
                </span>
              </div>
            </div>

            {/* Middle: Golden Big Typography */}
            <div className="my-auto py-1">
              <div className="text-[9px] font-mono text-amber-400/70 tracking-widest uppercase">
                OFFICIAL ADMISSION TICKET
              </div>
              <h3 className="text-sm sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                บัตรทองคำเตรียมสอบครูผู้ช่วย
              </h3>
              <p className="text-[9px] sm:text-[10px] text-amber-100/70 line-clamp-1 mt-0.5">
                Telegram Daily Quiz 3 เวลา + AI เฉลยรายข้อ + เพลงช่วยจำกฎหมาย
              </p>
            </div>

            {/* Bottom Bar: Serial & Verification Badges */}
            <div className="flex items-center justify-between pt-2 border-t border-amber-500/20 text-[9px] font-mono">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{serialNo}</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                <span>ACTIVE LIFETIME</span>
              </div>
            </div>
          </div>

          {/* ── PERFORATED DIVIDER LINE (Dotted Tear Line with Semi-Circle Cutouts) ── */}
          <div className="relative w-0 border-r-2 border-dashed border-amber-400/50 flex flex-col justify-between items-center my-0 z-20">
            {/* Top Semi-Circle Notch */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#070913] border-b-2 border-amber-400/80 shadow-inner" />
            {/* Bottom Semi-Circle Notch */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#070913] border-t-2 border-amber-400/80 shadow-inner" />
          </div>

          {/* ── RIGHT SECTION: TICKET STUB (QR Code & VIP Seal) ── */}
          <div
            className="p-2 sm:p-3 flex flex-col items-center justify-between relative z-10 bg-gradient-to-b from-amber-950/40 via-amber-900/20 to-amber-950/50"
            style={{ width: `${dims.stubW}px` }}
          >
            <div className="text-[8px] font-mono font-bold tracking-widest text-amber-300 uppercase text-center">
              ADMIT ONE
            </div>

            {/* Holographic QR Box */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-950/90 border border-amber-400/60 p-1 flex items-center justify-center shadow-lg relative group">
              <QrCode className="w-full h-full text-amber-300 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
              <div className="absolute inset-0 bg-amber-400/10 rounded-xl pointer-events-none" />
            </div>

            {/* Gold Hologram Stamp */}
            <div className="text-center">
              <div className="text-[8px] font-mono font-black text-amber-300 tracking-tighter">
                TELEGRAM VIP
              </div>
              <div className="text-[7px] text-amber-200/50 font-mono">
                ฿390 ONLY
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

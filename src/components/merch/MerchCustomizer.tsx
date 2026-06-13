"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shirt, Sparkles, Code2, Sliders, User, Info, 
  CreditCard, Plus, Minus, RefreshCw, Check, Copy, 
  ExternalLink, ChevronRight, CheckCircle2, ShoppingBag, 
  FileText, Truck, HelpCircle
} from "lucide-react";
import { RiLineLine } from "react-icons/ri";
import { QRCodeSVG } from "qrcode.react";
import generatePayload from "promptpay-qr";
import { useBrandTheme } from "@/components/providers/BrandThemeProvider";
import { cn } from "@/lib/utils";

// --- INTERFACES & TYPES ---
type TShirtColor = {
  id: string;
  name: string;
  hex: string;
  bgClass: string;
  textColor: string;
};

type GraphicStyle = {
  id: string;
  name: string;
  description: string;
  badge: string;
  priceBonus: number;
};

type TShirtSize = {
  id: string;
  name: string;
  chest: string;
  length: string;
  sleeve: string;
};

interface OrderForm {
  name: string;
  phone: string;
  address: string;
  lineId: string;
}

// --- CONSTANTS ---
const BASE_PRICE = 450;
const SHIPPING_FEE = 50;

const COLORS: TShirtColor[] = [
  { id: "cyber-black", name: "Cyber Black", hex: "#121316", bgClass: "bg-[#121316]", textColor: "text-white" },
  { id: "space-grey", name: "Space Grey", hex: "#374151", bgClass: "bg-[#374151]", textColor: "text-white" },
  { id: "neon-purple", name: "Neon Purple", hex: "#3B0764", bgClass: "bg-[#3B0764]", textColor: "text-purple-300" },
  { id: "tech-white", name: "Tech White", hex: "#F8F9FA", bgClass: "bg-[#F8F9FA] border border-white/10", textColor: "text-neutral-900" },
];

const GRAPHICS: GraphicStyle[] = [
  { 
    id: "unified-studio", 
    name: "AiAon Tech & Music Studio Edition", 
    description: "ลายลิมิเต็ดอิดิชันรวมทั้งสายเดฟและสายทำเพลง: ด้านหน้าพิมพ์โลโก้ Technology × Music และตรา AiAon Tech & Music Studio ด้วยสีฟ้าและส้มพรีเมียม (พิมพ์กลางอก) ด้านหลังเป็นผังลวดลายคลาสสิก",
    badge: "Flagship Edition", 
    priceBonus: 40 
  },
  { 
    id: "minimalist-dev", 
    name: "Minimalist Dev", 
    description: "โลโก้กล่องโค้ดจิ๋วเรียบหรูที่หน้าอกซ้าย พร้อม binary cursor ดีไซน์มินิมอลสำหรับเดฟ",
    badge: "Front Print Only", 
    priceBonus: 0 
  },
  { 
    id: "automation-blueprint", 
    name: "Automation Blueprint", 
    description: "ผังระบบออโตเมชันสุดล้ำแบบ Node-Graph (n8n style) ที่แผ่นหลัง และโลโก้ทริกเกอร์ที่หน้าอกซ้าย",
    badge: "Front & Back Print", 
    priceBonus: 40 
  },
  { 
    id: "cyber-waveform", 
    name: "Cyber Waveform", 
    description: "การผสมผสานของบล็อกโค้ด JavaScript และคลื่นความถี่ดนตรีดิจิทัลที่แผ่นหลัง ดีไซน์พรีเมียมเทคเอฟเฟกต์",
    badge: "Front & Back Print", 
    priceBonus: 40 
  },
];

const SIZES: TShirtSize[] = [
  { id: "s", name: "S", chest: "36\"", length: "26\"", sleeve: "7.5\"" },
  { id: "m", name: "M", chest: "38\"", length: "27\"", sleeve: "8.0\"" },
  { id: "l", name: "L", chest: "40\"", length: "28\"", sleeve: "8.5\"" },
  { id: "xl", name: "XL", chest: "42\"", length: "29\"", sleeve: "9.0\"" },
  { id: "xxl", name: "XXL", chest: "44\"", length: "30\"", sleeve: "9.5\"" },
];

type StrapType = {
  id: string;
  name: string;
  description: string;
};

const STRAP_TYPES: StrapType[] = [
  { id: "metal", name: "สายปรับเหล็ก (Metal Buckle)", description: "สายรัดแบบหัวเข็มขัดโลหะคลาสสิก ปรับขนาดได้ละเอียด ทนทานหรูหรา" },
  { id: "snapback", name: "สายแป๊กพลาสติก (Snapback)", description: "สายรัดปุ่มกดพลาสติกสไตล์สตรีทเรโทร ปรับขนาดได้สะดวก" },
  { id: "velcro", name: "สายตีนตุ๊กแก (Velcro)", description: "สายแปะตีนตุ๊กแกแบบสปอร์ต สวมใส่ง่ายและกระชับหัว" },
];

// --- SUB-COMPONENT: CAP SVG VECTOR DESIGN ---
interface CapSVGProps {
  color: TShirtColor;
  customText: string;
  isBack: boolean;
}

function CapSVG({ color, customText, isBack }: CapSVGProps) {
  const isWhite = color.id === "tech-white";
  return (
    <svg 
      viewBox="0 0 500 500" 
      className="w-full h-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Shading gradients */}
        <linearGradient id="cap-shading" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="60%" stopColor="#000000" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
        </linearGradient>
        <filter id="neon-glow-cap" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {!isBack ? (
        // FRONT VIEW CAP
        <>
          {/* Main Crown (Dome) */}
          <path 
            d="M 120 300 C 120 120, 380 120, 380 300 C 340 310, 160 310, 120 300 Z" 
            fill={color.hex} 
            stroke={isWhite ? "#E5E7EB" : "#374151"} 
            strokeWidth="1.5"
          />
          {/* Crown shading */}
          <path 
            d="M 120 300 C 120 120, 380 120, 380 300 C 340 310, 160 310, 120 300 Z" 
            fill="url(#cap-shading)" 
            pointerEvents="none"
          />
          
          {/* Seams Panel Details */}
          <path d="M 250 135 L 250 305" stroke={isWhite ? "#D1D5DB" : "#1F2937"} strokeWidth="1" opacity="0.4" />
          <path d="M 250 135 Q 180 200, 122 300" stroke={isWhite ? "#D1D5DB" : "#1F2937"} strokeWidth="1" opacity="0.4" />
          <path d="M 250 135 Q 320 200, 378 300" stroke={isWhite ? "#D1D5DB" : "#1F2937"} strokeWidth="1" opacity="0.4" />
          
          {/* Crown top button */}
          <ellipse cx="250" cy="133" rx="10" ry="5" fill={color.hex} stroke={isWhite ? "#E5E7EB" : "#374151"} strokeWidth="1" />
          <ellipse cx="250" cy="133" rx="10" ry="5" fill="url(#cap-shading)" pointerEvents="none" />

          {/* Visor (Bill) */}
          <path 
            d="M 120 300 C 100 315, 90 350, 170 355 C 250 360, 330 350, 380 300 Z" 
            fill={color.hex} 
            stroke={isWhite ? "#E5E7EB" : "#374151"} 
            strokeWidth="1.5"
          />
          <path 
            d="M 120 300 C 100 315, 90 350, 170 355 C 250 360, 330 350, 380 300 Z" 
            fill="url(#cap-shading)" 
            pointerEvents="none"
          />
          {/* Visor stitching lines */}
          <path d="M 126 312 C 115 325, 115 342, 175 346 C 235 350, 305 342, 355 312" fill="none" stroke={isWhite ? "#9CA3AF" : "#4B5563"} strokeWidth="0.8" strokeDasharray="3,3" />

          {/* FRONT EMBROIDERY: "AiAon Tech & Music Studio" pill badge & text */}
          <g transform="translate(250, 235) scale(0.7)" textAnchor="middle">
            {/* Pill Badge: Technology x Music */}
            <g transform="translate(0, -45)">
              <rect x="-80" y="-12" width="160" height="24" rx="12" fill="#111827" opacity="0.9" stroke="#374151" strokeWidth="1" />
              <circle cx="-62" cy="0" r="3" fill="#3B82F6" />
              <text x="0" y="3" fill="#3B82F6" fontFamily="sans-serif" fontSize="8.5" fontWeight="bold" letterSpacing="0.5">
                Technology <tspan fill="#6B7280">×</tspan> <tspan fill="#F59E0B">Music</tspan>
              </text>
              <circle cx="62" cy="0" r="3" fill="#F59E0B" />
            </g>
            
            {/* Main Brand Typography */}
            <g filter={isWhite ? "" : "url(#neon-glow-cap)"}>
              <text x="0" y="10" fontFamily="sans-serif" fontSize="20" fontWeight="800" letterSpacing="0.2">
                <tspan fill="url(#blue-cyan-cap-grad)">AiAon Tech</tspan>
                <tspan fill="#9CA3AF" fontWeight="normal"> &amp; </tspan>
                <tspan fill="url(#yellow-orange-cap-grad)">Music Studio</tspan>
              </text>
            </g>
            
            <defs>
              <linearGradient id="blue-cyan-cap-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
              <linearGradient id="yellow-orange-cap-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
          </g>

          {/* Eyelets (Ventilation holes) */}
          <circle cx="180" cy="200" r="4" fill="#000000" opacity="0.4" />
          <circle cx="180" cy="200" r="3" fill="none" stroke={isWhite ? "#D1D5DB" : "#4B5563"} strokeWidth="1" />
          <circle cx="320" cy="200" r="4" fill="#000000" opacity="0.4" />
          <circle cx="320" cy="200" r="3" fill="none" stroke={isWhite ? "#D1D5DB" : "#4B5563"} strokeWidth="1" />
        </>
      ) : (
        // BACK VIEW CAP (showing adjustment strap)
        <>
          {/* Crown base */}
          <path 
            d="M 120 300 C 120 120, 380 120, 380 300 C 340 302, 160 302, 120 300 Z" 
            fill={color.hex} 
            stroke={isWhite ? "#E5E7EB" : "#374151"} 
            strokeWidth="1.5"
          />
          <path 
            d="M 120 300 C 120 120, 380 120, 380 300 C 340 302, 160 302, 120 300 Z" 
            fill="url(#cap-shading)" 
            pointerEvents="none"
          />

          {/* Back cutout arch (the opening above the strap) */}
          <path 
            d="M 180 300 C 180 250, 320 250, 320 300 Z" 
            fill="#1A1D20" 
            stroke={isWhite ? "#E5E7EB" : "#374151"} 
            strokeWidth="1.5"
          />

          {/* Adjustment Strap (Default representation) */}
          <rect x="190" y="285" width="120" height="12" rx="3" fill="#111" stroke="#333" strokeWidth="1" />
          {/* Buckle metal detail */}
          <rect x="240" y="281" width="16" height="20" rx="2" fill="#9CA3AF" stroke="#4B5563" strokeWidth="1" />
          
          {/* Seam lines on back */}
          <path d="M 250 135 L 250 250" stroke={isWhite ? "#D1D5DB" : "#1F2937"} strokeWidth="1" opacity="0.4" />
          <path d="M 250 135 Q 180 200, 122 300" stroke={isWhite ? "#D1D5DB" : "#1F2937"} strokeWidth="1" opacity="0.4" />
          <path d="M 250 135 Q 320 200, 378 300" stroke={isWhite ? "#D1D5DB" : "#1F2937"} strokeWidth="1" opacity="0.4" />
          
          {/* Crown top button */}
          <ellipse cx="250" cy="133" rx="10" ry="5" fill={color.hex} stroke={isWhite ? "#E5E7EB" : "#374151"} strokeWidth="1" />

          {/* Custom text embroidery on the back (above the cutout) */}
          {customText && customText.trim().length > 0 && (
            <text 
              x="250" 
              y="235" 
              textAnchor="middle" 
              fill={isWhite ? "#1E293B" : "#22D3EE"} 
              fontFamily="monospace" 
              fontSize="11" 
              fontWeight="bold" 
              letterSpacing="1"
              filter={isWhite ? "" : "url(#neon-glow-cap)"}
            >
              {customText.toUpperCase()}
            </text>
          )}
        </>
      )}
    </svg>
  );
}

// --- SUB-COMPONENT: T-SHIRT SVG VECTOR DESIGN ---
interface TShirtSVGProps {
  color: TShirtColor;
  graphic: GraphicStyle;
  customText: string;
  isBack: boolean;
}

function TShirtSVG({ color, graphic, customText, isBack }: TShirtSVGProps) {
  // SVG viewBox is 0 0 500 500
  const isWhite = color.id === "tech-white";
  const glowColor = isWhite ? "rgba(0, 0, 0, 0.15)" : "rgba(34, 211, 238, 0.4)";
  
  return (
    <svg 
      viewBox="0 0 500 500" 
      className="w-full h-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soft fabric shadow gradients */}
        <linearGradient id="fabric-shading" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.03" />
          <stop offset="50%" stopColor="#000000" stopOpacity="0.0" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
        </linearGradient>

        <linearGradient id="fold-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>

        {/* Glow Filters */}
        <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="neon-glow-strong" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" result="blur1" />
          <feGaussianBlur stdDeviation="3" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* --- BASE SHIRT PATH --- */}
      <path 
        d="M 200 80 Q 250 100 300 80 L 380 110 L 440 185 L 395 215 L 352 178 L 342 430 Q 250 435 158 430 L 148 178 L 105 215 L 60 185 L 120 110 Z" 
        fill={color.hex} 
        stroke={isWhite ? "#E5E7EB" : "#374151"} 
        strokeWidth="1.5"
      />

      {/* --- COLLAR RIBBING --- */}
      {isBack ? (
        // Back Collar
        <>
          <path 
            d="M 200 80 Q 250 86 300 80" 
            fill="none" 
            stroke={isWhite ? "#D1D5DB" : "#1F2937"} 
            strokeWidth="5" 
          />
          <path 
            d="M 200 80 Q 250 86 300 80" 
            fill="none" 
            stroke={isWhite ? "#E5E7EB" : "#4B5563"} 
            strokeWidth="1" 
          />
        </>
      ) : (
        // Front Collar
        <>
          <path 
            d="M 200 80 Q 250 100 300 80 Q 250 112 200 80" 
            fill={isWhite ? "#E5E7EB" : "#1F2937"} 
            stroke={isWhite ? "#D1D5DB" : "#374151"} 
            strokeWidth="1" 
          />
          {/* Inner label stitching detail */}
          <path 
            d="M 220 98 Q 250 106 280 98" 
            fill="none" 
            stroke={isWhite ? "#9CA3AF" : "#4B5563"} 
            strokeWidth="0.5" 
            strokeDasharray="2,2" 
          />
        </>
      )}

      {/* --- SLEEVE SEAMS --- */}
      <path 
        d="M 120 110 Q 140 144 148 178" 
        fill="none" 
        stroke={isWhite ? "#E5E7EB" : "#1F2937"} 
        strokeWidth="1.5" 
        opacity="0.6"
      />
      <path 
        d="M 380 110 Q 360 144 352 178" 
        fill="none" 
        stroke={isWhite ? "#E5E7EB" : "#1F2937"} 
        strokeWidth="1.5" 
        opacity="0.6"
      />

      {/* --- FABRIC SHADING & TEXTURE OVERLAY --- */}
      <path 
        d="M 200 80 Q 250 100 300 80 L 380 110 L 440 185 L 395 215 L 352 178 L 342 430 Q 250 435 158 430 L 148 178 L 105 215 L 60 185 L 120 110 Z" 
        fill="url(#fabric-shading)" 
        pointerEvents="none" 
      />

      {/* Wrinkles / folds shadows */}
      <path 
        d="M 148 178 Q 165 190 180 185" 
        fill="none" 
        stroke="#000" 
        strokeWidth="2.5" 
        opacity="0.15" 
      />
      <path 
        d="M 352 178 Q 335 190 320 185" 
        fill="none" 
        stroke="#000" 
        strokeWidth="2.5" 
        opacity="0.15" 
      />
      <path 
        d="M 158 430 Q 250 422 342 430" 
        fill="none" 
        stroke="#000" 
        strokeWidth="1.5" 
        opacity="0.1" 
      />
      {/* Dynamic fold lines on sides */}
      <path 
        d="M 160 250 Q 185 270 175 300" 
        fill="none" 
        stroke="#000" 
        strokeWidth="3" 
        opacity="0.08" 
      />
      <path 
        d="M 340 250 Q 315 270 325 300" 
        fill="none" 
        stroke="#000" 
        strokeWidth="3" 
        opacity="0.08" 
      />

      {/* --- PRINT GRAPHICS --- */}
      {!isBack ? (
        // ================= FRONT PRINT =================
        <>
          {graphic.id === "unified-studio" ? (
            // Center Chest Flagship Graphic
            <g transform="translate(250, 195) scale(0.85)" textAnchor="middle">
              {/* Pill Badge: Technology x Music */}
              <g transform="translate(0, -50)">
                <rect x="-80" y="-12" width="160" height="24" rx="12" fill="#111827" opacity="0.9" stroke="#374151" strokeWidth="1" />
                
                {/* Blue dot on left */}
                <circle cx="-62" cy="0" r="3" fill="#3B82F6" />
                
                {/* Text */}
                <text x="0" y="3" fill="#3B82F6" fontFamily="sans-serif" fontSize="8.5" fontWeight="bold" letterSpacing="0.5">
                  Technology <tspan fill="#6B7280">×</tspan> <tspan fill="#F59E0B">Music</tspan>
                </text>
                
                {/* Yellow dot on right */}
                <circle cx="62" cy="0" r="3" fill="#F59E0B" />
              </g>
              
              {/* Main Brand Typography: AiAon Tech & Music Studio */}
              <g filter="url(#neon-glow)">
                <text x="0" y="10" fontFamily="sans-serif" fontSize="21" fontWeight="800" letterSpacing="0.2">
                  <tspan fill="url(#blue-cyan-grad)">AiAon Tech</tspan>
                  <tspan fill="#9CA3AF" fontWeight="normal"> &amp; </tspan>
                  <tspan fill="url(#yellow-orange-grad)">Music Studio</tspan>
                </text>
              </g>
              
              {/* Gradients definitions for text */}
              <defs>
                <linearGradient id="blue-cyan-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
                <linearGradient id="yellow-orange-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#F97316" />
                </linearGradient>
              </defs>
            </g>
          ) : (
            // Left Chest Group for other graphics
            <g transform="translate(160, 130) scale(0.9)">
              {graphic.id === "minimalist-dev" ? (
                // Minimalist code tags: <iAonTech />
                <g filter="url(#neon-glow)">
                  <rect x="0" y="0" width="80" height="28" rx="6" fill="#1E293B" stroke="#06B6D4" strokeWidth="1.5" />
                  <text x="40" y="18" textAnchor="middle" fill="#22D3EE" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    &lt;iAonTech/&gt;
                  </text>
                  <circle cx="70" cy="8" r="2" fill="#22D3EE" className="animate-ping" />
                </g>
              ) : graphic.id === "automation-blueprint" ? (
                // Mini automation node icon
                <g filter="url(#neon-glow)">
                  <rect x="0" y="0" width="70" height="26" rx="13" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1" />
                  <circle cx="15" cy="13" r="5" fill="#818CF8" />
                  <line x1="20" x2="35" y1="13" y2="13" stroke="#818CF8" strokeWidth="1" strokeDasharray="2,2" />
                  <circle cx="42" cy="13" r="5" fill="#C084FC" />
                  <text x="56" y="16" fill="#C084FC" fontSize="10" fontWeight="bold">►</text>
                </g>
              ) : (
                // Mini waveform icon
                <g filter="url(#neon-glow)">
                  <rect x="0" y="0" width="75" height="26" rx="5" fill="#2E1065" stroke="#F472B6" strokeWidth="1" />
                  <line x1="12" x2="12" y1="7" y2="19" stroke="#EC4899" strokeWidth="2" />
                  <line x1="20" x2="20" y1="5" y2="21" stroke="#F472B6" strokeWidth="2" />
                  <line x1="28" x2="28" y1="9" y2="17" stroke="#A855F7" strokeWidth="2" />
                  <line x1="36" x2="36" y1="4" y2="22" stroke="#3B82F6" strokeWidth="2" />
                  <line x1="44" x2="44" y1="11" y2="15" stroke="#60A5FA" strokeWidth="2" />
                  <text x="53" y="16" fill="#F472B6" fontSize="8" fontFamily="sans-serif" fontWeight="bold">MIDI</text>
                </g>
              )}
            </g>
          )}
        </>
      ) : (
        // ================= BACK PRINT =================
        <g transform="translate(135, 130)">
          {graphic.id === "minimalist-dev" ? (
            // Back is plain for minimalist dev (per graphic specs, or we can add a small collar neck label)
            <g transform="translate(115, 0)">
              <text x="0" y="-10" textAnchor="middle" fill={isWhite ? "#6B7280" : "#4B5563"} fontFamily="monospace" fontSize="8" tracking-wider="true" opacity="0.6">
                DESIGNED BY IAONTECH
              </text>
              <line x1="-30" x2="30" y1="-2" y2="-2" stroke={isWhite ? "#D1D5DB" : "#374151"} strokeWidth="1" opacity="0.6" />
            </g>
          ) : graphic.id === "unified-studio" ? (
            // Combined Tech & Music Back Design
            <g>
              {/* Outer border box */}
              <rect x="0" y="0" width="230" height="250" rx="12" fill="#09090e" stroke="#1E293B" strokeWidth="1.5" />
              
              {/* Title bar */}
              <path d="M 0 35 L 230 35" stroke="#1E293B" strokeWidth="1.5" />
              <text x="12" y="22" fill="#06B6D4" fontSize="9" fontFamily="monospace" fontWeight="bold">
                unified_studio_core_v1.0
              </text>
              <circle cx="215" cy="18" r="4" fill="#F59E0B" />
              
              {/* Waveform graphic in middle */}
              <g transform="translate(15, 50)" filter="url(#neon-glow)">
                {[3, 10, 20, 15, 30, 45, 35, 55, 70, 45, 30, 15, 25, 10, 30, 45, 55, 70, 50, 40, 20, 8].map((h, i) => (
                  <rect 
                    key={i} 
                    x={i * 9} 
                    y={35 - h/2} 
                    width="4.5" 
                    height={h} 
                    rx="2" 
                    fill={`url(#unified-wave-grad)`} 
                  />
                ))}
              </g>

              {/* Code + Node elements below */}
              <g transform="translate(15, 130)">
                <rect x="0" y="0" width="200" height="105" rx="8" fill="#111" opacity="0.9" stroke="#1E293B" strokeWidth="1" />
                
                {/* Visualizing small nodes inside */}
                <circle cx="35" cy="30" r="10" fill="#1E293B" stroke="#00F0FF" strokeWidth="1" />
                <text x="35" y="33" textAnchor="middle" fill="#00F0FF" fontFamily="monospace" fontSize="6">WEB</text>
                
                <line x1="45" x2="75" y1="30" y2="30" stroke="#00F0FF" strokeWidth="1" strokeDasharray="2,2" />
                
                <circle cx="85" cy="30" r="10" fill="#1E293B" stroke="#F59E0B" strokeWidth="1" />
                <text x="85" y="33" textAnchor="middle" fill="#F59E0B" fontFamily="monospace" fontSize="6">MIDI</text>

                <line x1="95" x2="125" y1="30" y2="30" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2,2" />

                <circle cx="135" cy="30" r="10" fill="#1E293B" stroke="#A855F7" strokeWidth="1" />
                <text x="135" y="33" textAnchor="middle" fill="#A855F7" fontFamily="monospace" fontSize="6">OUT</text>

                {/* Status line */}
                <text x="12" y="65" fill="#9CA3AF" fontFamily="monospace" fontSize="8">&gt;_ system_status: <tspan fill="#34D399">ONLINE</tspan></text>
                <text x="12" y="80" fill="#9CA3AF" fontFamily="monospace" fontSize="8">&gt;_ tempo: <tspan fill="#F59E0B">120bpm</tspan> | code: <tspan fill="#06B6D4">active</tspan></text>
              </g>

              {/* Definitions */}
              <defs>
                <linearGradient id="unified-wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#F97316" />
                </linearGradient>
              </defs>
            </g>
          ) : graphic.id === "automation-blueprint" ? (
            // Big automation blueprint
            <g>
              {/* Outer boundary box */}
              <rect x="0" y="0" width="230" height="250" rx="12" fill="#0A0B10" stroke="#1E293B" strokeWidth="1.5" />
              <path d="M 0 35 L 230 35" stroke="#1E293B" strokeWidth="1.5" />
              <text x="12" y="22" fill="#818CF8" fontSize="9" fontFamily="monospace" fontWeight="bold">
                n8n_AUTOMATION_BLUEPRINT v1.0
              </text>
              <circle cx="215" cy="18" r="4" fill="#10B981" />
              
              {/* Node 1: Trigger */}
              <g transform="translate(25, 60)">
                <rect x="0" y="0" width="80" height="30" rx="4" fill="#062F4F" stroke="#00F0FF" strokeWidth="1.5" filter="url(#neon-glow)" />
                <text x="40" y="18" textAnchor="middle" fill="#00F0FF" fontFamily="monospace" fontSize="8" fontWeight="bold">webhook_rcv</text>
              </g>
              
              {/* Node 2: Router */}
              <g transform="translate(125, 60)">
                <rect x="0" y="0" width="80" height="30" rx="4" fill="#1E1B4B" stroke="#C084FC" strokeWidth="1.5" filter="url(#neon-glow)" />
                <text x="40" y="18" textAnchor="middle" fill="#C084FC" fontFamily="monospace" fontSize="8" fontWeight="bold">js_condition</text>
              </g>

              {/* Node 3: Action A */}
              <g transform="translate(25, 150)">
                <rect x="0" y="0" width="80" height="30" rx="4" fill="#022C22" stroke="#34D399" strokeWidth="1" />
                <text x="40" y="18" textAnchor="middle" fill="#34D399" fontFamily="monospace" fontSize="8" fontWeight="bold">line_notify</text>
              </g>

              {/* Node 4: Action B */}
              <g transform="translate(125, 150)">
                <rect x="0" y="0" width="80" height="30" rx="4" fill="#3C0713" stroke="#F43F5E" strokeWidth="1" />
                <text x="40" y="18" textAnchor="middle" fill="#F43F5E" fontFamily="monospace" fontSize="8" fontWeight="bold">db_sync</text>
              </g>

              {/* Node 5: Music Loop Output */}
              <g transform="translate(75, 205)">
                <rect x="0" y="0" width="80" height="30" rx="4" fill="#312E81" stroke="#F472B6" strokeWidth="1.5" filter="url(#neon-glow)" />
                <text x="40" y="18" textAnchor="middle" fill="#F472B6" fontFamily="monospace" fontSize="8" fontWeight="bold">play_midi_out</text>
              </g>

              {/* Connecting Lines */}
              <path d="M 65 90 L 65 150" stroke="#00F0FF" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
              <path d="M 165 90 L 165 150" stroke="#C084FC" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
              <path d="M 105 75 L 125 75" stroke="#818CF8" strokeWidth="1.5" fill="none" />
              <path d="M 65 180 C 65 195, 115 195, 115 205" stroke="#34D399" strokeWidth="1" fill="none" />
              <path d="M 165 180 C 165 195, 115 195, 115 205" stroke="#F43F5E" strokeWidth="1" fill="none" />
            </g>
          ) : (
            // Cyber Waveform with JavaScript Code
            <g>
              {/* Box */}
              <rect x="0" y="0" width="230" height="250" rx="12" fill="#09090e" stroke="#881337" strokeWidth="1.5" />
              
              {/* Waveform graphic */}
              <g transform="translate(15, 40)" filter="url(#neon-glow-strong)">
                {/* Simulated digital soundwave */}
                {[5, 15, 30, 20, 45, 60, 50, 75, 95, 60, 40, 20, 35, 15, 45, 60, 80, 100, 70, 55, 30, 10].map((h, i) => (
                  <rect 
                    key={i} 
                    x={i * 9} 
                    y={50 - h/2} 
                    width="4" 
                    height={h} 
                    rx="2" 
                    fill={`url(#wave-grad-${i % 2})`} 
                  />
                ))}
              </g>

              {/* Code overlay at bottom */}
              <g transform="translate(15, 115)">
                <rect x="0" y="0" width="200" height="115" rx="8" fill="#111" opacity="0.9" stroke="#374151" strokeWidth="1" />
                
                <text x="12" y="20" fill="#9CA3AF" fontFamily="monospace" fontSize="7.5">&lt;script&gt;</text>
                
                <text x="20" y="38" fill="#EC4899" fontFamily="monospace" fontSize="8">const</text>
                <text x="50" y="38" fill="#60A5FA" fontFamily="monospace" fontSize="8">aiaonTech</text>
                <text x="96" y="38" fill="#E5E7EB" fontFamily="monospace" fontSize="8">= {`{`}</text>

                <text x="32" y="52" fill="#E5E7EB" fontFamily="monospace" fontSize="8">type: </text>
                <text x="62" y="52" fill="#A7F3D0" fontFamily="monospace" fontSize="8">&quot;Cyber-Producer&quot;</text>
                <text x="142" y="52" fill="#9CA3AF" fontFamily="monospace" fontSize="8">,</text>

                <text x="32" y="66" fill="#E5E7EB" fontFamily="monospace" fontSize="8">tempo: </text>
                <text x="67" y="66" fill="#FBBF24" fontFamily="monospace" fontSize="8">120</text>
                <text x="82" y="66" fill="#A855F7" fontFamily="monospace" fontSize="8">/* bpm */</text>
                <text x="122" y="66" fill="#9CA3AF" fontFamily="monospace" fontSize="8">,</text>

                <text x="32" y="80" fill="#F472B6" fontFamily="monospace" fontSize="8">output</text>
                <text x="62" y="80" fill="#E5E7EB" fontFamily="monospace" fontSize="8">: () =&gt; </text>
                <text x="97" y="80" fill="#34D399" fontFamily="monospace" fontSize="8">"MUSIC_AUTOMATION"</text>

                <text x="20" y="94" fill="#E5E7EB" fontFamily="monospace" fontSize="8">{`};`}</text>
                <text x="12" y="108" fill="#9CA3AF" fontFamily="monospace" fontSize="7.5">&lt;/script&gt;</text>
              </g>

              {/* Wave color gradient definitions */}
              <defs>
                <linearGradient id="wave-grad-0" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </g>
          )}
        </g>
      )}

      {/* --- CUSTOM TEXT SLEEVE PRINT --- */}
      {customText && customText.trim().length > 0 && (
        <>
          {(!isBack) ? (
            // FRONT VIEW: Custom text is on the shirt's Left Sleeve (Viewer's right side)
            // Sleeve cuff center is around x=412, y=197. Let's place it rotated parallel to sleeve opening.
            <g transform="translate(415, 195) rotate(-33)">
              <text 
                x="0" 
                y="-10" 
                textAnchor="middle" 
                fill="#22D3EE" 
                fontFamily="monospace" 
                fontSize="9.5" 
                fontWeight="bold" 
                letterSpacing="1.5"
                filter="url(#neon-glow)"
              >
                {customText.toUpperCase()}
              </text>
            </g>
          ) : (
            // BACK VIEW: Custom text is on the shirt's Left Sleeve (Viewer's left side)
            // Sleeve cuff center is around x=85, y=197.
            <g transform="translate(85, 195) rotate(33)">
              <text 
                x="0" 
                y="-10" 
                textAnchor="middle" 
                fill="#22D3EE" 
                fontFamily="monospace" 
                fontSize="9.5" 
                fontWeight="bold" 
                letterSpacing="1.5"
                filter="url(#neon-glow)"
              >
                {customText.toUpperCase()}
              </text>
            </g>
          )}
        </>
      )}
    </svg>
  );
}

// --- MAIN COMPONENT ---
interface MerchCustomizerProps {
  user: any; // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

export function MerchCustomizer({ user }: MerchCustomizerProps) {
  const { brandTheme } = useBrandTheme();

  // Customizer States
  const [selectedColor, setSelectedColor] = useState<TShirtColor>(COLORS[0]);
  const [selectedGraphic, setSelectedGraphic] = useState<GraphicStyle>(GRAPHICS[0]);
  const [selectedSize, setSelectedSize] = useState<TShirtSize>(SIZES[2]); // Default M or L (L is SIZES[2])
  const [customText, setCustomText] = useState<string>("");
  const [isBack, setIsBack] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"style" | "color" | "personalize" | "size" | "order">("style");
  const [previewMode, setPreviewMode] = useState<"svg" | "mockup">("mockup");
  const [selectedProduct, setSelectedProduct] = useState<"tshirt" | "cap">("tshirt");
  const [selectedStrap, setSelectedStrap] = useState<StrapType>(STRAP_TYPES[0]);

  // Reset preview mode if minimalist is chosen (since we only generated mockups for blueprint/waveform)
  useEffect(() => {
    if (selectedGraphic.id === "minimalist-dev") {
      setPreviewMode("svg");
    }
  }, [selectedGraphic]);

  // Tab auto-selector check
  useEffect(() => {
    if (selectedProduct === "cap") {
      if (activeTab === "style") {
        setActiveTab("color");
      }
    }
  }, [selectedProduct, activeTab]);

  // Zoom States for Hover Magnifier
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const getMockupImage = () => {
    if (selectedProduct === "cap") {
      return "/images/mockups/cap_combined_studio.png";
    }
    if (selectedGraphic.id === "unified-studio") {
      return selectedColor.id === "tech-white"
        ? "/images/mockups/tshirt_white_studio_v2.png"
        : "/images/mockups/tshirt_combined_studio.png";
    }
    if (selectedGraphic.id === "automation-blueprint") {
      return "/images/mockups/tshirt_cyber_automation.png";
    }
    if (selectedGraphic.id === "cyber-waveform") {
      return "/images/mockups/tshirt_synthwave_waveform.png";
    }
    return null;
  };

  // Checkout Form States
  const [form, setForm] = useState<OrderForm>({
    name: "",
    phone: "",
    address: "",
    lineId: ""
  });
  const [formErrors, setFormErrors] = useState<Partial<OrderForm>>({});
  
  // Payment Flow States
  const [paymentStep, setPaymentStep] = useState<"form" | "qr" | "success">("form");
  const [qrCodePayload, setQrCodePayload] = useState<string>("");
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [copiedInvoice, setCopiedInvoice] = useState<boolean>(false);

  // Auto set theme defaults
  useEffect(() => {
    setSelectedColor(COLORS[0]); // Primary default to Cyber Black
    setSelectedGraphic(GRAPHICS[0]); // Default to flagship unified tech/music design
  }, [brandTheme]);

  // Calculate Prices
  const productUnitPrice = selectedProduct === "cap" ? 350 : (BASE_PRICE + selectedGraphic.priceBonus);
  const totalPrice = (productUnitPrice * qty) + SHIPPING_FEE;

  // Handle Form Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof OrderForm]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: Partial<OrderForm> = {};
    if (!form.name.trim()) errors.name = "กรุณากรอกชื่อ-นามสกุล";
    if (!form.phone.trim()) {
      errors.phone = "กรุณากรอกเบอร์โทรศัพท์";
    } else if (!/^[0-9-]{9,15}$/.test(form.phone.replace(/\s/g, ""))) {
      errors.phone = "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง";
    }
    if (!form.address.trim()) errors.address = "กรุณากรอกที่อยู่ในการจัดส่ง";
    if (!form.lineId.trim()) errors.lineId = "กรุณากรอก LINE ID เพื่อการติดต่อกลับ";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Order Submit & QR Code Generation
  const handleProceedToPayment = () => {
    if (!validateForm()) {
      // Go to order tab if not already there
      setActiveTab("order");
      // Scroll to error
      const el = document.getElementById("order-form-anchor");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // Generate Invoice Number
    const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, "");
    const rand = Math.floor(1000 + Math.random() * 9000);
    const inv = `INV-${dateStr}-${rand}`;
    setInvoiceNumber(inv);

    // Generate PromptPay Payload
    // PromptPay account phone number (default mock for user to test, normally set in env)
    const promptpayNumber = process.env.NEXT_PUBLIC_PROMPTPAY_NUMBER || "0864070000"; 
    const payload = generatePayload(promptpayNumber, { amount: totalPrice });
    setQrCodePayload(payload);
    
    setPaymentStep("qr");
  };

  // Generate LINE Share Message URL
  const generateLineUrl = () => {
    const orderDetails = 
      selectedProduct === "cap"
        ? `🛒 [สั่งซื้อหมวกแก๊ป AiAonTech]
--------------------------------
🧾 เลขที่ใบสั่งซื้อ: ${invoiceNumber}
🧢 ดีไซน์หมวก: AiAon Tech & Music Studio Flagship
🎨 สีหมวก: ${selectedColor.name}
🔧 สายปรับหลัง: ${selectedStrap.name}
✍️ ชื่อปักหลังหมวก: ${customText.trim() ? customText : "-ไม่ระบุ-"}
🔢 จำนวน: ${qty} ใบ
💰 ยอดเงินโอน: ${totalPrice} บาท (รวมส่ง)
--------------------------------
📍 ข้อมูลจัดส่ง:
ชื่อ: ${form.name}
เบอร์โทร: ${form.phone}
LINE ID: ${form.lineId}
ที่อยู่: ${form.address}
--------------------------------
*แนบรูปภาพสลิปชำระเงินมาในแชทนี้ได้เลยครับ*`
        : `🛒 [สั่งซื้อเสื้อยืด AiAonTech]
--------------------------------
🧾 เลขที่ใบสั่งซื้อ: ${invoiceNumber}
👕 ลายสกรีน: ${selectedGraphic.name}
🎨 สีเสื้อ: ${selectedColor.name}
📏 ขนาด: ${selectedSize.name} (อก ${selectedSize.chest} ยาว ${selectedSize.length})
✍️ ชื่อที่แขนเสื้อ: ${customText.trim() ? customText : "-ไม่ระบุ-"}
🔢 จำนวน: ${qty} ตัว
💰 ยอดเงินโอน: ${totalPrice} บาท (รวมส่ง)
--------------------------------
📍 ข้อมูลจัดส่ง:
ชื่อ: ${form.name}
เบอร์โทร: ${form.phone}
LINE ID: ${form.lineId}
ที่อยู่: ${form.address}
--------------------------------
*แนบรูปภาพสลิปชำระเงินมาในแชทนี้ได้เลยครับ*`;

    return `https://line.me/R/share?text=${encodeURIComponent(orderDetails)}`;
  };

  // Copy Order summary details
  const copyOrderDetails = () => {
    const orderDetails = 
      selectedProduct === "cap"
        ? `🧾 ใบสั่งซื้อหมวกแก๊ป AiAonTech (${invoiceNumber})
🧢 ลาย: AiAon Tech & Music Studio Flagship | สี: ${selectedColor.name} | สายปรับ: ${selectedStrap.name}
✍️ ปักชื่อด้านหลัง: ${customText.trim() ? customText : "-ไม่ระบุ-"}
🔢 จำนวน: ${qty} ใบ
💰 ยอดเงินโอน: ${totalPrice} บาท
📍 จัดส่ง: ${form.name} (โทร. ${form.phone}) ที่อยู่: ${form.address} (LINE ID: ${form.lineId})`
        : `🧾 ใบสั่งซื้อเสื้อยืด AiAonTech (${invoiceNumber})
👕 ลาย: ${selectedGraphic.name} | สี: ${selectedColor.name} | ไซส์: ${selectedSize.name}
✍️ พิมพ์ชื่อแขนเสื้อ: ${customText.trim() ? customText : "-ไม่ระบุ-"}
🔢 จำนวน: ${qty} ตัว
💰 ยอดเงินโอน: ${totalPrice} บาท
📍 จัดส่ง: ${form.name} (โทร. ${form.phone}) ที่อยู่: ${form.address} (LINE ID: ${form.lineId})`;

    navigator.clipboard.writeText(orderDetails);
    setCopiedInvoice(true);
    setTimeout(() => setCopiedInvoice(false), 2000);
  };

  // Download isolated Vector Graphic for printing
  const downloadVectorDesign = (side: "front" | "back") => {
    let svgContent = "";
    
    // Definitions of gradients and filters
    const defs = `
      <defs>
        <linearGradient id="blue-cyan-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="yellow-orange-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
        <linearGradient id="blue-cyan-cap-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="yellow-orange-cap-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
        <linearGradient id="unified-wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
        <linearGradient id="wave-grad-0" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="neon-glow-cap" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="neon-glow-strong" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" result="blur1" />
          <feGaussianBlur stdDeviation="3" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    `;

    if (selectedProduct === "cap") {
      if (side === "front") {
        svgContent = `
          <!-- Front Cap Graphic -->
          <g transform="translate(250, 250) scale(1.8)" textAnchor="middle">
            <g transform="translate(0, -45)">
              <rect x="-80" y="-12" width="160" height="24" rx="12" fill="#111827" stroke="#374151" strokeWidth="1" />
              <circle cx="-62" cy="0" r="3" fill="#3B82F6" />
              <text x="0" y="3" fill="#3B82F6" fontFamily="sans-serif" fontSize="8.5" fontWeight="bold" letterSpacing="0.5">
                Technology <tspan fill="#6B7280">×</tspan> <tspan fill="#F59E0B">Music</tspan>
              </text>
              <circle cx="62" cy="0" r="3" fill="#F59E0B" />
            </g>
            <g filter="url(#neon-glow-cap)">
              <text x="0" y="10" fontFamily="sans-serif" fontSize="20" fontWeight="800" letterSpacing="0.2">
                <tspan fill="url(#blue-cyan-cap-grad)">AiAon Tech</tspan>
                <tspan fill="#9CA3AF" fontWeight="normal"> &amp; </tspan>
                <tspan fill="url(#yellow-orange-cap-grad)">Music Studio</tspan>
              </text>
            </g>
          </g>
        `;
      } else {
        svgContent = `
          <!-- Back Cap Embroidery Text -->
          <g transform="translate(250, 250) scale(2.0)" textAnchor="middle">
            <text x="0" y="0" fill="#22D3EE" fontFamily="monospace" fontSize="14" fontWeight="bold" letterSpacing="1.5" filter="url(#neon-glow-cap)">
              \${(customText || "STUDIO").toUpperCase()}
            </text>
          </g>
        `;
      }
    } else {
      // T-Shirt Graphic export
      if (side === "front") {
        if (selectedGraphic.id === "unified-studio") {
          svgContent = `
            <!-- Front Shirt Unified Studio Graphic -->
            <g transform="translate(250, 250) scale(1.8)" textAnchor="middle">
              <g transform="translate(0, -50)">
                <rect x="-80" y="-12" width="160" height="24" rx="12" fill="#111827" stroke="#374151" strokeWidth="1" />
                <circle cx="-62" cy="0" r="3" fill="#3B82F6" />
                <text x="0" y="3" fill="#3B82F6" fontFamily="sans-serif" fontSize="8.5" fontWeight="bold" letterSpacing="0.5">
                  Technology <tspan fill="#6B7280">×</tspan> <tspan fill="#F59E0B">Music</tspan>
                </text>
                <circle cx="62" cy="0" r="3" fill="#F59E0B" />
              </g>
              <g filter="url(#neon-glow)">
                <text x="0" y="10" fontFamily="sans-serif" fontSize="21" fontWeight="800" letterSpacing="0.2">
                  <tspan fill="url(#blue-cyan-grad)">AiAon Tech</tspan>
                  <tspan fill="#9CA3AF" fontWeight="normal"> &amp; </tspan>
                  <tspan fill="url(#yellow-orange-grad)">Music Studio</tspan>
                </text>
              </g>
            </g>
          `;
        } else if (selectedGraphic.id === "minimalist-dev") {
          svgContent = `
            <!-- Front Shirt Minimalist Dev Graphic -->
            <g transform="translate(250, 250) scale(2.5)" textAnchor="middle">
              <rect x="-50" y="-15" width="100" height="30" rx="6" fill="#1E293B" stroke="#06B6D4" strokeWidth="1.5" />
              <text x="0" y="4" fill="#22D3EE" fontFamily="monospace" fontSize="9" fontWeight="bold">
                &lt;iAonTech/&gt;
              </text>
            </g>
          `;
        } else if (selectedGraphic.id === "automation-blueprint") {
          svgContent = `
            <!-- Front Shirt Automation Blueprint Mini Graphic -->
            <g transform="translate(250, 250) scale(2.5)" textAnchor="middle">
              <rect x="-35" y="-13" width="70" height="26" rx="13" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1.2" />
              <circle cx="-20" cy="0" r="5" fill="#818CF8" />
              <line x1="-15" x2="0" y1="0" y2="0" stroke="#818CF8" strokeWidth="1" strokeDasharray="2,2" />
              <circle cx="7" cy="0" r="5" fill="#C084FC" />
              <text x="21" y="3" fill="#C084FC" fontSize="10" fontWeight="bold">►</text>
            </g>
          `;
        } else {
          svgContent = `
            <!-- Front Shirt Cyber Waveform Mini Graphic -->
            <g transform="translate(250, 250) scale(2.5)" textAnchor="middle">
              <rect x="-37" y="-13" width="75" height="26" rx="5" fill="#2E1065" stroke="#F472B6" strokeWidth="1.2" />
              <line x1="-25" x2="-25" y1="-6" y2="6" stroke="#EC4899" strokeWidth="2" />
              <line x1="-17" x2="-17" y1="-8" y2="8" stroke="#F472B6" strokeWidth="2" />
              <line x1="-9" x2="-9" y1="-4" y2="4" stroke="#A855F7" strokeWidth="2" />
              <line x1="-1" x2="-1" y1="-9" y2="9" stroke="#3B82F6" strokeWidth="2" />
              <line x1="7" x2="7" y1="-2" y2="2" stroke="#60A5FA" strokeWidth="2" />
              <text x="16" y="3" fill="#F472B6" fontSize="8" fontFamily="sans-serif" fontWeight="bold">MIDI</text>
            </g>
          `;
        }
      } else {
        // Back View Graphic
        if (selectedGraphic.id === "unified-studio") {
          svgContent = `
            <!-- Back Shirt Unified Studio Design -->
            <g transform="translate(135, 125)">
              <rect x="0" y="0" width="230" height="250" rx="12" fill="#09090e" stroke="#1E293B" strokeWidth="1.5" />
              <path d="M 0 35 L 230 35" stroke="#1E293B" strokeWidth="1.5" />
              <text x="12" y="22" fill="#06B6D4" fontSize="9" fontFamily="monospace" fontWeight="bold">unified_studio_core_v1.0</text>
              <circle cx="215" cy="18" r="4" fill="#F59E0B" />
              <g transform="translate(15, 50)" filter="url(#neon-glow)">
                <rect x="0" y="22.5" width="4.5" height="25" rx="2" fill="url(#unified-wave-grad)" />
                <rect x="9" y="15" width="4.5" height="40" rx="2" fill="url(#unified-wave-grad)" />
                <rect x="18" y="5" width="4.5" height="60" rx="2" fill="url(#unified-wave-grad)" />
                <rect x="27" y="10" width="4.5" height="50" rx="2" fill="url(#unified-wave-grad)" />
                <rect x="36" y="-5" width="4.5" height="80" rx="2" fill="url(#unified-wave-grad)" />
                <rect x="45" y="-12.5" width="4.5" height="95" rx="2" fill="url(#unified-wave-grad)" />
                <rect x="54" y="-7.5" width="4.5" height="85" rx="2" fill="url(#unified-wave-grad)" />
                <rect x="63" y="-22.5" width="4.5" height="115" rx="2" fill="url(#unified-wave-grad)" />
                <rect x="72" y="-35" width="4.5" height="140" rx="2" fill="url(#unified-wave-grad)" />
                <rect x="81" y="-22.5" width="4.5" height="115" rx="2" fill="url(#unified-wave-grad)" />
                <rect x="90" y="-15" width="4.5" height="100" rx="2" fill="url(#unified-wave-grad)" />
                <rect x="99" y="-7.5" width="4.5" height="85" rx="2" fill="url(#unified-wave-grad)" />
                <rect x="108" y="-12.5" width="4.5" height="95" rx="2" fill="url(#unified-wave-grad)" />
                <rect x="117" y="-5" width="4.5" height="80" rx="2" fill="url(#unified-wave-grad)" />
                <rect x="126" y="5" width="4.5" height="60" rx="2" fill="url(#unified-wave-grad)" />
                <rect x="135" y="15" width="4.5" height="40" rx="2" fill="url(#unified-wave-grad)" />
                <rect x="144" y="22.5" width="4.5" height="25" rx="2" fill="url(#unified-wave-grad)" />
              </g>
              <g transform="translate(15, 130)">
                <rect x="0" y="0" width="200" height="105" rx="8" fill="#111" stroke="#1E293B" strokeWidth="1" />
                <circle cx="35" cy="30" r="10" fill="#1E293B" stroke="#00F0FF" strokeWidth="1" />
                <text x="35" y="33" textAnchor="middle" fill="#00F0FF" fontFamily="monospace" fontSize="6">WEB</text>
                <line x1="45" x2="75" y1="30" y2="30" stroke="#00F0FF" strokeWidth="1" strokeDasharray="2,2" />
                <circle cx="85" cy="30" r="10" fill="#1E293B" stroke="#F59E0B" strokeWidth="1" />
                <text x="85" y="33" textAnchor="middle" fill="#F59E0B" fontFamily="monospace" fontSize="6">MIDI</text>
                <line x1="95" x2="125" y1="30" y2="30" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2,2" />
                <circle cx="135" cy="30" r="10" fill="#1E293B" stroke="#A855F7" strokeWidth="1" />
                <text x="135" y="33" textAnchor="middle" fill="#A855F7" fontFamily="monospace" fontSize="6">OUT</text>
                <text x="12" y="65" fill="#9CA3AF" fontFamily="monospace" fontSize="8">&gt;_ system_status: <tspan fill="#34D399">ONLINE</tspan></text>
                <text x="12" y="80" fill="#9CA3AF" fontFamily="monospace" fontSize="8">&gt;_ tempo: <tspan fill="#F59E0B">120bpm</tspan> | code: <tspan fill="#06B6D4">active</tspan></text>
              </g>
            </g>
          `;
        } else if (selectedGraphic.id === "minimalist-dev") {
          svgContent = `
            <!-- Back Shirt Minimalist Dev Neck Label -->
            <g transform="translate(250, 250)" textAnchor="middle">
              <text x="0" y="-10" fill="#4B5563" fontFamily="monospace" fontSize="8" letterSpacing="2" opacity="0.6">DESIGNED BY IAONTECH</text>
              <line x1="-30" x2="30" y1="-2" y2="-2" stroke="#374151" strokeWidth="1" opacity="0.6" />
            </g>
          `;
        } else if (selectedGraphic.id === "automation-blueprint") {
          svgContent = `
            <!-- Back Shirt Automation Blueprint Design -->
            <g transform="translate(135, 125)">
              <rect x="0" y="0" width="230" height="250" rx="12" fill="#0A0B10" stroke="#1E293B" strokeWidth="1.5" />
              <path d="M 0 35 L 230 35" stroke="#1E293B" strokeWidth="1.5" />
              <text x="12" y="22" fill="#818CF8" fontSize="9" fontFamily="monospace" fontWeight="bold">n8n_AUTOMATION_BLUEPRINT v1.0</text>
              <circle cx="215" cy="18" r="4" fill="#10B981" />
              
              <g transform="translate(25, 60)">
                <rect x="0" y="0" width="80" height="30" rx="4" fill="#062F4F" stroke="#00F0FF" strokeWidth="1.5" filter="url(#neon-glow)" />
                <text x="40" y="18" textAnchor="middle" fill="#00F0FF" fontFamily="monospace" fontSize="8" fontWeight="bold">webhook_rcv</text>
              </g>
              <g transform="translate(125, 60)">
                <rect x="0" y="0" width="80" height="30" rx="4" fill="#1E1B4B" stroke="#C084FC" strokeWidth="1.5" filter="url(#neon-glow)" />
                <text x="40" y="18" textAnchor="middle" fill="#C084FC" fontFamily="monospace" fontSize="8" fontWeight="bold">js_condition</text>
              </g>
              <g transform="translate(25, 150)">
                <rect x="0" y="0" width="80" height="30" rx="4" fill="#022C22" stroke="#34D399" strokeWidth="1" />
                <text x="40" y="18" textAnchor="middle" fill="#34D399" fontFamily="monospace" fontSize="8" fontWeight="bold">line_notify</text>
              </g>
              <g transform="translate(125, 150)">
                <rect x="0" y="0" width="80" height="30" rx="4" fill="#3C0713" stroke="#F43F5E" strokeWidth="1" />
                <text x="40" y="18" textAnchor="middle" fill="#F43F5E" fontFamily="monospace" fontSize="8" fontWeight="bold">db_sync</text>
              </g>
              <g transform="translate(75, 205)">
                <rect x="0" y="0" width="80" height="30" rx="4" fill="#312E81" stroke="#F472B6" strokeWidth="1.5" filter="url(#neon-glow)" />
                <text x="40" y="18" textAnchor="middle" fill="#F472B6" fontFamily="monospace" fontSize="8" fontWeight="bold">play_midi_out</text>
              </g>
              
              <path d="M 65 90 L 65 150" stroke="#00F0FF" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
              <path d="M 165 90 L 165 150" stroke="#C084FC" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
              <path d="M 105 75 L 125 75" stroke="#818CF8" strokeWidth="1.5" fill="none" />
              <path d="M 65 180 C 65 195, 115 195, 115 205" stroke="#34D399" strokeWidth="1" fill="none" />
              <path d="M 165 180 C 165 195, 115 195, 115 205" stroke="#F43F5E" strokeWidth="1" fill="none" />
            </g>
          `;
        } else {
          svgContent = `
            <!-- Back Shirt Cyber Waveform Design -->
            <g transform="translate(135, 125)">
              <rect x="0" y="0" width="230" height="250" rx="12" fill="#09090e" stroke="#881337" strokeWidth="1.5" />
              <g transform="translate(15, 40)" filter="url(#neon-glow-strong)">
                <rect x="0" y="47.5" width="4" height="5" rx="2" fill="url(#wave-grad-0)" />
                <rect x="9" y="42.5" width="4" height="15" rx="2" fill="url(#wave-grad-1)" />
                <rect x="18" y="35" width="4" height="30" rx="2" fill="url(#wave-grad-0)" />
                <rect x="27" y="40" width="4" height="20" rx="2" fill="url(#wave-grad-1)" />
                <rect x="36" y="27.5" width="4" height="45" rx="2" fill="url(#wave-grad-0)" />
                <rect x="45" y="20" width="4" height="60" rx="2" fill="url(#wave-grad-1)" />
                <rect x="54" y="25" width="4" height="50" rx="2" fill="url(#wave-grad-0)" />
                <rect x="63" y="12.5" width="4" height="75" rx="2" fill="url(#wave-grad-1)" />
                <rect x="72" y="2.5" width="4" height="95" rx="2" fill="url(#wave-grad-0)" />
                <rect x="81" y="20" width="4" height="60" rx="2" fill="url(#wave-grad-1)" />
                <rect x="90" y="30" width="4" height="40" rx="2" fill="url(#wave-grad-0)" />
                <rect x="99" y="40" width="4" height="20" rx="2" fill="url(#wave-grad-1)" />
                <rect x="108" y="32.5" width="4" height="35" rx="2" fill="url(#wave-grad-0)" />
                <rect x="117" y="42.5" width="4" height="15" rx="2" fill="url(#wave-grad-1)" />
                <rect x="126" y="27.5" width="4" height="45" rx="2" fill="url(#wave-grad-0)" />
                <rect x="135" y="20" width="4" height="60" rx="2" fill="url(#wave-grad-1)" />
                <rect x="144" y="10" width="4" height="80" rx="2" fill="url(#wave-grad-0)" />
                <rect x="153" y="0" width="4" height="100" rx="2" fill="url(#wave-grad-1)" />
              </g>
              <g transform="translate(15, 115)">
                <rect x="0" y="0" width="200" height="115" rx="8" fill="#111" stroke="#374151" strokeWidth="1" />
                <text x="12" y="20" fill="#9CA3AF" fontFamily="monospace" fontSize="7.5">&lt;script&gt;</text>
                <text x="20" y="38" fill="#EC4899" fontFamily="monospace" fontSize="8">const</text>
                <text x="50" y="38" fill="#60A5FA" fontFamily="monospace" fontSize="8">aiaonTech</text>
                <text x="96" y="38" fill="#E5E7EB" fontFamily="monospace" fontSize="8">= {</text>
                <text x="32" y="52" fill="#E5E7EB" fontFamily="monospace" fontSize="8">type: </text>
                <text x="62" y="52" fill="#A7F3D0" fontFamily="monospace" fontSize="8">&quot;Cyber-Producer&quot;</text>
                <text x="32" y="66" fill="#E5E7EB" fontFamily="monospace" fontSize="8">tempo: </text>
                <text x="67" y="66" fill="#FBBF24" fontFamily="monospace" fontSize="8">120</text>
                <text x="32" y="80" fill="#F472B6" fontFamily="monospace" fontSize="8">output</text>
                <text x="62" y="80" fill="#E5E7EB" fontFamily="monospace" fontSize="8">: () =&gt; </text>
                <text x="97" y="80" fill="#34D399" fontFamily="monospace" fontSize="8">"MUSIC_AUTOMATION"</text>
                <text x="20" y="94" fill="#E5E7EB" fontFamily="monospace" fontSize="8">};</text>
                <text x="12" y="108" fill="#9CA3AF" fontFamily="monospace" fontSize="7.5">&lt;/script&gt;</text>
              </g>
            </g>
          `;
        }
      }
    }

    const fullSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="2000" height="2000">
        <style>
          text { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
        </style>
        <rect width="500" height="500" fill="#0B0F19" />
        ${defs}
        ${svgContent}
      </svg>
    `;

    const blob = new Blob([fullSvg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `aiaontech-${selectedProduct}-${side}-print-design.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full relative overflow-hidden min-h-screen pb-24">
      {/* Background glow effects */}
      <div className="absolute top-[10%] left-[-100px] w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-[-100px] w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-purple-500/30 bg-purple-500/5 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>AiAonTech Cyber Merch v1.0</span>
          </div>

          <h1 className="font-prompt text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            {selectedProduct === "cap" ? "ออกแบบหมวกแก๊ป" : "ออกแบบเสื้อยืด"}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.35)]">
              {" "}AiAonTech
            </span>
          </h1>

          <p className="text-white/60 font-prompt text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            {selectedProduct === "cap" 
              ? "ปรับแต่งหมวกแก๊ปสไตล์สตูดิโอของคุณ เลือกสี สายปรับระดับ พร้อมปักชื่อด้านหลังแบบพรีเมียมเท่ๆ"
              : "แต่งตัวตามสไตล์สายเดฟและการทำเพลงของคุณ เลือกสี ปรับลายสกรีน พร้อมสลักชื่อส่วนตัวของคุณบนแขนเสื้อด้วยระบบจำลองแบบเรียลไทม์"}
          </p>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: T-SHIRT/CAP VIEWER PANEL (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Product Category Selector */}
            <div className="flex gap-1.5 p-1 bg-black/40 border border-white/5 rounded-2xl w-full">
              <button
                onClick={() => {
                  setSelectedProduct("tshirt");
                  setPreviewMode("mockup");
                  setIsBack(false);
                  setActiveTab("style");
                }}
                className={cn(
                  "flex-1 py-2.5 rounded-xl font-prompt text-xs font-semibold transition-all flex items-center justify-center gap-1.5",
                  selectedProduct === "tshirt"
                    ? "bg-linear-to-r from-cyan-500 to-blue-600 text-black shadow-lg"
                    : "text-white/60 hover:text-white hover:bg-white/3"
                )}
              >
                <Shirt className="w-3.5 h-3.5 shrink-0" />
                <span>เสื้อยืดไอที (T-Shirt)</span>
              </button>
              <button
                onClick={() => {
                  setSelectedProduct("cap");
                  setPreviewMode("mockup");
                  setIsBack(false);
                  setActiveTab("color");
                }}
                className={cn(
                  "flex-1 py-2.5 rounded-xl font-prompt text-xs font-semibold transition-all flex items-center justify-center gap-1.5",
                  selectedProduct === "cap"
                    ? "bg-linear-to-r from-cyan-500 to-blue-600 text-black shadow-lg"
                    : "text-white/60 hover:text-white hover:bg-white/3"
                )}
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>หมวกแก๊ปสตูดิโอ (Cap)</span>
              </button>
            </div>

            {/* Toggle Preview Mode */}
            <div className="flex justify-between items-center px-1">
              <span className="font-prompt text-xs text-white/50">การแสดงผลตัวอย่าง:</span>
              <div className="flex gap-1 p-0.5 rounded-xl bg-black/40 border border-white/5">
                <button
                  onClick={() => setPreviewMode("svg")}
                  className={cn(
                    "px-3 py-1 rounded-lg font-prompt text-xs transition-all",
                    previewMode === "svg"
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      : "text-white/60 hover:text-white"
                  )}
                >
                  แบบจำลอง 2D
                </button>
                <button
                  onClick={() => setPreviewMode("mockup")}
                  disabled={selectedProduct === "tshirt" && selectedGraphic.id === "minimalist-dev"}
                  className={cn(
                    "px-3 py-1 rounded-lg font-prompt text-xs transition-all",
                    selectedProduct === "tshirt" && selectedGraphic.id === "minimalist-dev" && "opacity-40 cursor-not-allowed",
                    previewMode === "mockup"
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      : "text-white/60 hover:text-white"
                  )}
                  title={selectedProduct === "tshirt" && selectedGraphic.id === "minimalist-dev" ? "แบบลายนี้ไม่มีภาพสินค้าจริง" : ""}
                >
                  ภาพสินค้าจริง
                </button>
              </div>
            </div>

            {/* Visualizer Display Box */}
            <div className="relative aspect-square rounded-3xl glass-card border-white/8 bg-black/40 overflow-hidden p-6 md:p-10 flex items-center justify-center group">
              {/* Outer glowing ambient reflection */}
              <div 
                className="absolute inset-0 transition-opacity duration-700 opacity-20 group-hover:opacity-30 blur-2xl pointer-events-none" 
                style={{ 
                  background: `radial-gradient(circle at center, ${selectedColor.hex}dd, transparent 60%)` 
                }} 
              />
              
              {previewMode === "mockup" && getMockupImage() ? (
                // Real Mockup Render (Front & Back side by side in studio image) with Hover Magnifier zoom!
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full relative rounded-2xl overflow-hidden cursor-zoom-in"
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                >
                  <div 
                    className="w-full h-full relative"
                    style={{
                      transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                      transform: isZoomed ? "scale(2.4)" : "scale(1)",
                      transition: isZoomed ? "transform 0.15s ease-out" : "transform 0.25s ease-out, transform-origin 0s"
                    }}
                  >
                    <Image
                      src={getMockupImage()!}
                      alt={`${selectedProduct === "cap" ? "Cap" : selectedGraphic.name} Mockup`}
                      fill
                      className="object-cover pointer-events-none"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                </motion.div>
              ) : (
                // Perspective card flip structure (2D Vector SVG)
                <motion.div 
                  className="w-full h-full relative cursor-pointer"
                  animate={{ rotateY: isBack ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                  onClick={() => setIsBack(!isBack)}
                >
                  {/* Front Side */}
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {selectedProduct === "cap" ? (
                      <CapSVG 
                        color={selectedColor} 
                        customText={customText} 
                        isBack={false} 
                      />
                    ) : (
                      <TShirtSVG 
                        color={selectedColor} 
                        graphic={selectedGraphic} 
                        customText={customText} 
                        isBack={false} 
                      />
                    )}
                  </div>

                  {/* Back Side */}
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    {selectedProduct === "cap" ? (
                      <CapSVG 
                        color={selectedColor} 
                        customText={customText} 
                        isBack={true} 
                      />
                    ) : (
                      <TShirtSVG 
                        color={selectedColor} 
                        graphic={selectedGraphic} 
                        customText={customText} 
                        isBack={true} 
                      />
                    )}
                  </div>
                </motion.div>
              )}

              {previewMode === "svg" && (
                <>
                  {/* View side badge */}
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/70 text-xs font-prompt">
                    <span>แสดงมุม:</span>
                    <span className="font-bold text-cyan-400">{isBack ? (selectedProduct === "cap" ? "ด้านหลังปรับสาย" : "ด้านหลัง (Back)") : (selectedProduct === "cap" ? "ด้านหน้าหมวก" : "ด้านหน้า (Front)")}</span>
                  </div>

                  {/* Quick Flip button */}
                  <button 
                    onClick={() => setIsBack(!isBack)}
                    className="absolute bottom-4 right-4 p-2.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 hover:scale-105 active:scale-95 transition-all duration-200"
                    title="หมุนมุมมอง"
                  >
                    <RefreshCw className="w-4 h-4 animate-spin-slow" />
                  </button>
                </>
              )}

              {previewMode === "mockup" && (
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-cyan-500/20 text-cyan-400 text-[10px] font-prompt uppercase font-semibold tracking-wider">
                  <span>ดีไซน์สินค้าจริงที่จะใช้จัดส่ง</span>
                </div>
              )}
            </div>

            {/* Spec Quick Details Badge */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="p-3 rounded-2xl glass-card border-white/5 bg-white/2 text-left">
                <p className="text-[10px] text-white/40 font-prompt">MATERIAL</p>
                <p className="text-xs text-white/80 font-prompt font-semibold mt-0.5">{selectedProduct === "cap" ? "Premium Twill" : "Comb #32 Cotton"}</p>
              </div>
              <div className="p-3 rounded-2xl glass-card border-white/5 bg-white/2 text-left">
                <p className="text-[10px] text-white/40 font-prompt">{selectedProduct === "cap" ? "VISOR" : "THICKNESS"}</p>
                <p className="text-xs text-white/80 font-prompt font-semibold mt-0.5">{selectedProduct === "cap" ? "Curved Brim" : "Premium 230gsm"}</p>
              </div>
              <div className="p-3 rounded-2xl glass-card border-white/5 bg-white/2 text-left">
                <p className="text-[10px] text-white/40 font-prompt">EMB/PRINT</p>
                <p className="text-xs text-white/80 font-prompt font-semibold mt-0.5">{selectedProduct === "cap" ? "3D Embroidery" : "Digital Screen"}</p>
              </div>
            </div>

            {/* Download Print File Button */}
            <button
              onClick={() => downloadVectorDesign(isBack ? "back" : "front")}
              className="w-full py-3 px-4 rounded-2xl border border-dashed border-cyan-500/30 hover:border-cyan-500/60 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-400 font-prompt font-semibold text-xs transition-all flex items-center justify-center gap-2 active:scale-98 shadow-md"
              title="ดาวน์โหลดลายสกรีนเวกเตอร์ SVG"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>ดาวน์โหลดไฟล์ลายสกรีนคมชัดสูง (Vector SVG/4K Print Ready)</span>
            </button>
            
          </div>

          {/* RIGHT COLUMN: CONFIGURATOR DASHBOARD (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tabs Selector Bar */}
            <div className="flex border-b border-white/10 gap-1 overflow-x-auto pb-px">
              {(selectedProduct === "tshirt"
                ? [
                    { id: "style", label: "เลือกลายสกรีน", icon: Sparkles },
                    { id: "color", label: "เลือกสีเสื้อ", icon: Shirt },
                    { id: "personalize", label: "พิมพ์ชื่อที่แขน", icon: User },
                    { id: "size", label: "ขนาดไซส์", icon: Sliders },
                    { id: "order", label: "สั่งซื้อเสื้อ", icon: CreditCard },
                  ]
                : [
                    { id: "color", label: "เลือกสีหมวก", icon: Shirt },
                    { id: "personalize", label: "ปักชื่อด้านหลัง", icon: User },
                    { id: "size", label: "สายปรับหลังหมวก", icon: Sliders },
                    { id: "order", label: "สั่งซื้อหมวก", icon: CreditCard },
                  ]
              ).map((t) => {
                const TabIcon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-3 border-b-2 font-prompt text-sm font-medium transition-all duration-200 shrink-0 whitespace-nowrap -mb-px",
                      isActive 
                        ? "border-cyan-400 text-cyan-400 bg-cyan-400/5 shadow-[0_4px_10px_rgba(34,211,238,0.05)]" 
                        : "border-transparent text-white/60 hover:text-white hover:border-white/10"
                    )}
                  >
                    <TabIcon className="w-4 h-4" />
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* Configurator Card */}
            <div className="glass-card border-white/8 bg-black/20 p-6 md:p-8 min-h-[350px] flex flex-col justify-between">
              
              {/* TAB 1: GRAPHIC STYLES */}
              {activeTab === "style" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-prompt text-lg font-bold text-white mb-1">เลือกสไตล์สกรีน</h3>
                    <p className="text-white/50 text-xs font-prompt">แต่ละลายผ่านการออกแบบอย่างประณีตเพื่อให้เข้ากับสายไอทีและโปรดิวเซอร์</p>
                  </div>
                  
                  <div className="space-y-3">
                    {GRAPHICS.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => {
                          setSelectedGraphic(g);
                          if (g.id !== "minimalist-dev") {
                            setIsBack(true); // Flip to back for back designs automatically
                          } else {
                            setIsBack(false);
                          }
                        }}
                        className={cn(
                          "w-full text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4",
                          selectedGraphic.id === g.id
                            ? "bg-cyan-500/5 border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.05)]"
                            : "bg-white/3 border-white/5 hover:bg-white/5 hover:border-white/10"
                        )}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-prompt text-base font-bold text-white">{g.name}</span>
                            <span className="text-[10px] font-prompt px-2 py-0.5 rounded-full border border-white/10 text-white/40 uppercase tracking-wider">
                              {g.badge}
                            </span>
                          </div>
                          <p className="text-white/60 font-prompt text-xs leading-relaxed max-w-xl">{g.description}</p>
                        </div>
                        <div className="shrink-0 flex items-center gap-3">
                          <span className="font-prompt font-bold text-white text-sm">
                            {g.priceBonus > 0 ? `+${g.priceBonus} บาท` : "ราคาปกติ"}
                          </span>
                          <div className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center shrink-0",
                            selectedGraphic.id === g.id ? "border-cyan-400 bg-cyan-400 text-black" : "border-white/20"
                          )}>
                            {selectedGraphic.id === g.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedGraphic.id !== "minimalist-dev" && (
                    <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-2.5 text-amber-300/95 text-xs font-prompt">
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <span><strong>โน้ต:</strong> ลาย {selectedGraphic.name} จะพิมพ์ขนาดใหญ่อยู่ที่แผ่นหลังและมีโลโก้เล็กที่หน้าอกซ้าย ระบบได้หมุนตัวอย่างเสื้อไปทางด้านหลังให้ท่านโดยอัตโนมัติแล้ว</span>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: T-SHIRT FABRIC COLORS OR CAP COLORS */}
              {activeTab === "color" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-prompt text-lg font-bold text-white mb-1">
                      {selectedProduct === "cap" ? "เลือกสีหมวกแก๊ป" : "เลือกสีเสื้อยืด"}
                    </h3>
                    <p className="text-white/50 text-xs font-prompt">
                      {selectedProduct === "cap" 
                        ? "สีสันเรียบเท่ ทรงสปอร์ตและสตรีท ปักด้วยความประณีตสูง" 
                        : "สีสันเรียบเท่ ทนทานต่อการซัก ไม่ยืดไม่ย้วย ถักทอด้วยคอตตอนพรีเมียม"}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {COLORS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedColor(c)}
                        className={cn(
                          "w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center gap-3",
                          selectedColor.id === c.id
                            ? "bg-cyan-500/5 border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.05)]"
                            : "bg-white/3 border-white/5 hover:bg-white/5 hover:border-white/10"
                        )}
                      >
                        {/* Circle Color Indicator */}
                        <div 
                          className={cn(
                            "w-8 h-8 rounded-full shrink-0 border shadow-inner flex items-center justify-center",
                            c.id === "tech-white" ? "border-neutral-300" : "border-white/10"
                          )}
                          style={{ backgroundColor: c.hex }}
                        >
                          {selectedColor.id === c.id && (
                            <Check className={cn("w-4 h-4 stroke-[3]", c.id === "tech-white" ? "text-neutral-900" : "text-white")} />
                          )}
                        </div>
                        <div>
                          <p className="font-prompt text-base font-bold text-white leading-none">{c.name}</p>
                          <p className="font-prompt text-[11px] text-white/40 mt-1">
                            {selectedProduct === "cap" ? "Premium Twill Cotton" : "100% Premium Cotton"}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/2 p-4 text-xs font-prompt text-white/60 space-y-2">
                    <p className="font-bold text-white text-sm">
                      {selectedProduct === "cap" ? "ข้อมูลหมวกแก๊ปและคำแนะนำ:" : "ข้อมูลเนื้อผ้าและคำแนะนำการใช้งาน:"}
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      {selectedProduct === "cap" ? (
                        <>
                          <li>หมวกแก๊ปทรง Dad Hat สุดเท่ ผลิตจากผ้า Twill Cotton 100% เนื้อหนาอยู่ทรงสวย</li>
                          <li>งานปักโลโก้แบบ 3D Embroidery คมชัด มีมิติ ลายปักหน้าและหลังแข็งแรง</li>
                          <li>ทำความสะอาดโดยการเช็ดเฉพาะจุด หรือซักมืออย่างเบามือเพื่อคงรูปทรงหมวก</li>
                        </>
                      ) : (
                        <>
                          <li>เนื้อผ้า Premium Cotton 100% เบอร์ 32 ให้สัมผัสนุ่มสบาย ไม่ร้อน ระบายอากาศได้ดีเยี่ยม</li>
                          <li>การสกรีนด้วยสีพรีเมียมรองพื้นแบบยืดหยุ่นสูง เพื่อให้สีสกรีนคงทนถาวร ไม่แตกหักง่าย</li>
                          <li>แนะนำให้รีดกลับด้าน และหลีกเลี่ยงการรีดทับลายสกรีนโดยตรงเพื่อถนอมลายเสื้อ</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 3: PERSONALIZATION (SLEEVE TEXT OR CAP BACK EMBROIDERY) */}
              {activeTab === "personalize" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-prompt text-lg font-bold text-white mb-1">
                      {selectedProduct === "cap" ? "ปักชื่อด้านหลังหมวกแก๊ป" : "พิมพ์ชื่อสลักที่แขนเสื้อด้านซ้าย"}
                    </h3>
                    <p className="text-white/50 text-xs font-prompt">
                      {selectedProduct === "cap"
                        ? "เพิ่มความพิเศษด้วยการปักชื่อหรือข้อความที่ด้านหลังหมวกแก๊ปเหนือสายปรับ"
                        : "เพิ่มความเป็นเจ้าของหรือใส่โค้ดแฮนเดิลของคุณในรูปแบบอักษร Matrix Glow เท่ๆ"}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <input 
                        type="text" 
                        maxLength={12}
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value.replace(/[^A-Za-z0-9_\- ]/g, ""))}
                        placeholder="พิมพ์อักษรภาษาอังกฤษ เช่น DEV-AON"
                        className="w-full bg-black/40 border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-3 text-white font-mono placeholder:text-white/25 focus:ring-1 focus:ring-cyan-500 transition-all font-semibold uppercase tracking-wider text-base"
                      />
                      <div className="absolute right-3 top-3.5 text-xs text-white/30 font-mono">
                        {customText.length}/12ตัว
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] text-white/40 font-prompt shrink-0 mt-1 mr-1">แนะนำ:</span>
                      {["ADMIN", "DEV-MASTER", "STUDENT", "GUITARIST", "N8N-GOD", "PRODUCER"].map((word) => (
                        <button
                          key={word}
                          onClick={() => setCustomText(word)}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-white/8 bg-white/2 text-cyan-400 hover:bg-white/5 hover:border-cyan-400/30 transition-all"
                        >
                          {word}
                        </button>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 flex items-start gap-2.5 text-cyan-300/90 text-xs font-prompt">
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        {selectedProduct === "cap" ? (
                          <><strong>งานปักหลังหมวก:</strong> ชื่อนี้จะถูกปักด้วยตัวพิมพ์ใหญ่ (UPPERCASE) ที่ด้านหลังหมวกแก๊ปเหนือช่องปรับระดับเพื่อความเรียบหรู ลองคลิกปุ่มหมุนเพื่อดูตัวอย่างด้านหลัง</>
                        ) : (
                          <><strong>การสกรีน:</strong> ชื่อนี้จะถูกสกรีนด้วยตัวพิมพ์ใหญ่ (UPPERCASE) ที่ขอบแขนเสื้อด้านซ้าย เพื่อสร้างมิติจุดสะดุดตาเฉพาะตัว! ลองคลิกที่ปุ่มหมุนเสื้อเพื่อตรวจสอบมุมมองของแขนซ้าย</>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: SIZES & FIT GUIDE OR STRAP TYPE */}
              {activeTab === "size" && (
                selectedProduct === "cap" ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-prompt text-lg font-bold text-white mb-1">สายปรับหลังหมวกแก๊ป</h3>
                      <p className="text-white/50 text-xs font-prompt">เลือกประเภทสายรัดด้านหลังหมวกเพื่อให้เหมาะกับสไตล์การใช้งานของคุณ (ขนาดฟรีไซส์ปรับรอบหัวได้ 54-60 ซม.)</p>
                    </div>

                    <div className="space-y-3">
                      {STRAP_TYPES.map((st) => (
                        <button
                          key={st.id}
                          onClick={() => setSelectedStrap(st)}
                          className={cn(
                            "w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4",
                            selectedStrap.id === st.id
                              ? "bg-cyan-500/5 border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.05)]"
                              : "bg-white/3 border-white/5 hover:bg-white/5 hover:border-white/10"
                          )}
                        >
                          <div className="space-y-1">
                            <span className="font-prompt text-base font-bold text-white">{st.name}</span>
                            <p className="text-white/60 font-prompt text-xs leading-relaxed">{st.description}</p>
                          </div>
                          <div className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center shrink-0",
                            selectedStrap.id === st.id ? "border-cyan-400 bg-cyan-400 text-black" : "border-white/20"
                          )}>
                            {selectedStrap.id === st.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl border border-white/5 bg-white/2 text-xs font-prompt text-white/60 space-y-2">
                      <p className="font-bold text-white text-sm">การสวมใส่หมวกแก๊ป:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>หมวกแก๊ปใช้แพทเทิร์นแบบ Unstructured Dad Hat มีรูปทรงที่โอบรับศีรษะได้ดี</li>
                        <li>ปรับขนาดได้ง่ายเพื่อให้สวมใส่กระชับและเบาสบายตลอดวัน</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-prompt text-lg font-bold text-white mb-1">เลือกขนาดไซส์</h3>
                      <p className="text-white/50 text-xs font-prompt">ทรงเสื้อ Semi-Oversize ใส่สบายพอดีตัว ใส่ได้ทั้งชายและหญิง</p>
                    </div>
                    
                    {/* Selectors */}
                    <div className="grid grid-cols-5 gap-2">
                      {SIZES.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSelectedSize(s)}
                          className={cn(
                            "py-3.5 rounded-xl border transition-all text-center flex flex-col items-center justify-center font-prompt",
                            selectedSize.id === s.id
                              ? "bg-cyan-500/10 border-cyan-400 text-cyan-400 font-bold shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                              : "bg-white/3 border-white/5 text-white/60 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <span className="text-base font-bold">{s.name}</span>
                          <span className="text-[10px] text-white/40 font-normal mt-0.5">อก {s.chest}</span>
                        </button>
                      ))}
                    </div>

                    {/* Size Guide Table */}
                    <div className="rounded-2xl border border-white/5 overflow-hidden">
                      <table className="w-full text-left font-prompt text-xs border-collapse">
                        <thead>
                          <tr className="bg-white/3 border-b border-white/8 text-white/50">
                            <th className="p-3 font-semibold">ไซส์ (Size)</th>
                            <th className="p-3 font-semibold">รอบอก (Chest)</th>
                            <th className="p-3 font-semibold">ความยาว (Length)</th>
                            <th className="p-3 font-semibold">ความยาวแขน (Sleeve)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-white/70">
                          {SIZES.map((s) => (
                            <tr 
                              key={s.id} 
                              className={cn(
                                "transition-colors",
                                selectedSize.id === s.id ? "bg-cyan-500/3 text-white" : "hover:bg-white/1"
                              )}
                            >
                              <td className="p-3 font-bold">{s.name}</td>
                              <td className="p-3">{s.chest} นิ้ว</td>
                              <td className="p-3">{s.length} นิ้ว</td>
                              <td className="p-3">{s.sleeve} นิ้ว</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              )}

              {/* TAB 5: ORDER FORM & CHECKOUT */}
              {activeTab === "order" && (
                <div className="space-y-5" id="order-form-anchor">
                  <div>
                    <h3 className="font-prompt text-lg font-bold text-white mb-1">
                      {selectedProduct === "cap" ? "ข้อมูลผู้สั่งจองหมวกแก๊ป" : "ข้อมูลผู้สั่งจองเสื้อยืด"}
                    </h3>
                    <p className="text-white/50 text-xs font-prompt">กรอกข้อมูลการจัดส่งและสร้างลิงก์ยืนยันผ่านแอปพลิเคชัน LINE</p>
                  </div>
                  
                  {/* Form fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-white/50 font-prompt">ชื่อ-นามสกุล ผู้รับ *</label>
                      <input 
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="กรอกชื่อจริงของคุณ"
                        className={cn(
                          "w-full bg-black/40 border rounded-xl px-4 py-2.5 text-white text-sm font-prompt transition-all placeholder:text-white/20",
                          formErrors.name ? "border-red-500/50" : "border-white/10 focus:border-cyan-500"
                        )}
                      />
                      {formErrors.name && <p className="text-[11px] text-red-400 font-prompt">{formErrors.name}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-white/50 font-prompt">เบอร์โทรติดต่อ *</label>
                      <input 
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        placeholder="กรอกเบอร์โทร 10 หลัก"
                        className={cn(
                          "w-full bg-black/40 border rounded-xl px-4 py-2.5 text-white text-sm font-prompt transition-all placeholder:text-white/20",
                          formErrors.phone ? "border-red-500/50" : "border-white/10 focus:border-cyan-500"
                        )}
                      />
                      {formErrors.phone && <p className="text-[11px] text-red-400 font-prompt">{formErrors.phone}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-white/50 font-prompt">LINE ID (สำหรับสิทธิ์ส่งสลิป) *</label>
                      <input 
                        type="text"
                        name="lineId"
                        value={form.lineId}
                        onChange={handleInputChange}
                        placeholder="เช่น aiaon_developer"
                        className={cn(
                          "w-full bg-black/40 border rounded-xl px-4 py-2.5 text-white text-sm font-prompt transition-all placeholder:text-white/20",
                          formErrors.lineId ? "border-red-500/50" : "border-white/10 focus:border-cyan-500"
                        )}
                      />
                      {formErrors.lineId && <p className="text-[11px] text-red-400 font-prompt">{formErrors.lineId}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-white/50 font-prompt">
                        {selectedProduct === "cap" ? "จำนวนหมวกแก๊ป *" : "จำนวนเสื้อ *"}
                      </label>
                      <div className="flex items-center h-10 border border-white/10 rounded-xl bg-black/40 overflow-hidden w-full max-w-[140px]">
                        <button 
                          onClick={() => qty > 1 && setQty(qty - 1)}
                          className="w-10 h-full flex items-center justify-center hover:bg-white/5 text-white transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="flex-1 text-center font-mono font-bold text-white text-sm">
                          {qty}
                        </span>
                        <button 
                          onClick={() => setQty(qty + 1)}
                          className="w-10 h-full flex items-center justify-center hover:bg-white/5 text-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs text-white/50 font-prompt">ที่อยู่สำหรับจัดส่งสินค้า *</label>
                      <textarea 
                        name="address"
                        value={form.address}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="กรอก บ้านเลขที่ ถนน ตำบล อำเภอ จังหวัด รหัสไปรษณีย์"
                        className={cn(
                          "w-full bg-black/40 border rounded-xl px-4 py-2.5 text-white text-sm font-prompt transition-all placeholder:text-white/20 resize-none",
                          formErrors.address ? "border-red-500/50" : "border-white/10 focus:border-cyan-500"
                        )}
                      />
                      {formErrors.address && <p className="text-[11px] text-red-400 font-prompt">{formErrors.address}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* NEXT / PREV BUTTON ROW */}
              <div className="pt-8 mt-auto border-t border-white/5 flex items-center justify-between gap-4">
                {/* Active Info Tag */}
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-white/40 font-prompt leading-none uppercase">
                    {selectedProduct === "cap" ? "ราคาต่อใบ" : "ราคาต่อตัว"}
                  </span>
                  <span className="font-prompt font-bold text-white text-lg mt-0.5">
                    {productUnitPrice} บาท <span className="text-xs text-white/50 font-normal">/ Qty: {qty}</span>
                  </span>
                </div>

                <div className="flex gap-2">
                  {/* If Style/Color/Personalize/Size, show next button */}
                  {activeTab !== "order" ? (
                    <button
                      onClick={() => {
                        const tshirtTabs: ("style" | "color" | "personalize" | "size" | "order")[] = ["style", "color", "personalize", "size", "order"];
                        const capTabs: ("style" | "color" | "personalize" | "size" | "order")[] = ["color", "personalize", "size", "order"];
                        const tabs = selectedProduct === "cap" ? capTabs : tshirtTabs;
                        const nextIdx = tabs.indexOf(activeTab) + 1;
                        setActiveTab(tabs[nextIdx]);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-prompt font-semibold text-sm transition-all duration-200 hover:scale-[1.02] flex items-center gap-1"
                    >
                      <span>ขั้นตอนถัดไป</span>
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  ) : (
                    <button
                      onClick={handleProceedToPayment}
                      className="px-6 py-2.5 rounded-xl bg-linear-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-black hover:scale-[1.02] font-prompt font-bold text-sm transition-all duration-200 flex items-center gap-1.5 shadow-[0_0_25px_rgba(34,211,238,0.2)]"
                    >
                      <CreditCard className="w-4 h-4 stroke-[2.5]" />
                      <span>ดำเนินการชำระเงิน</span>
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Price calculation list (always visible) */}
            <div className="p-5 rounded-2xl glass-card border-white/5 bg-white/2 space-y-3.5">
              <h4 className="font-prompt font-bold text-white text-sm flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-cyan-400" /> 
                {selectedProduct === "cap" ? "สรุปรายการออกแบบหมวกแก๊ป" : "สรุปรายการออกแบบเสื้อยืด"}
              </h4>
              <div className="divide-y divide-white/5 text-xs font-prompt text-white/70 space-y-2">
                <div className="flex justify-between pb-2">
                  {selectedProduct === "cap" ? (
                    <span>หมวกแก๊ปสตูดิโอ ({selectedStrap.name}) x {qty}</span>
                  ) : (
                    <span>เสื้อยืดพรีเมียม ({selectedSize.name}) x {qty}</span>
                  )}
                  <span className="text-white">{productUnitPrice * qty} บาท</span>
                </div>
                {selectedProduct === "cap" ? (
                  <div className="flex justify-between py-2">
                    <span>งานปักหน้าหมวก (Studio Flagship Edition)</span>
                    <span className="text-cyan-400">ฟรีงานปักพิเศษ</span>
                  </div>
                ) : (
                  <div className="flex justify-between py-2">
                    <span>ลายสกรีน ({selectedGraphic.name})</span>
                    <span className="text-cyan-400">{selectedGraphic.priceBonus > 0 ? `+${selectedGraphic.priceBonus} บาท` : "ฟรีสกรีน"}</span>
                  </div>
                )}
                {customText.trim() && (
                  <div className="flex justify-between py-2">
                    <span>
                      {selectedProduct === "cap"
                        ? `ปักชื่อด้านหลังหมวก (${customText.toUpperCase()})`
                        : `พิมพ์ชื่อแขนเสื้อ (${customText.toUpperCase()})`}
                    </span>
                    <span className="text-emerald-400">
                      {selectedProduct === "cap" ? "ฟรีงานปักชื่อพิเศษ" : "ฟรีพิมพ์ชื่อพิเศษ"}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span>ค่าบริการจัดส่งพัสดุด่วน</span>
                  <span className="text-white">{SHIPPING_FEE} บาท</span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-bold border-t border-white/10 text-white">
                  <span>ยอดเงินรวมทั้งสิ้น</span>
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-emerald-400 text-lg">
                    {totalPrice} บาท
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* --- PAYMENT DIALOG POPUPS (ANALYSE PAYMENT STEP) --- */}
      <AnimatePresence>
        {paymentStep === "qr" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setPaymentStep("form")} />
            
            {/* QR Code Container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              className="relative z-10 glass-card p-6 md:p-8 max-w-lg w-full text-center border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col gap-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-cyan-400" />
                  <span className="font-prompt font-bold text-white text-base">ชำระเงินทาง PromptPay QR</span>
                </div>
                <button 
                  onClick={() => setPaymentStep("form")} 
                  className="text-white/40 hover:text-white transition-colors font-prompt text-xs p-1"
                >
                  ย้อนกลับ
                </button>
              </div>

              {/* Order Info Badge */}
              <div className="bg-white/3 border border-white/5 rounded-2xl p-3.5 text-left text-xs font-prompt space-y-2">
                <div className="flex justify-between text-white/55">
                  <span>เลขที่คำสั่งซื้อ:</span>
                  <span className="font-mono font-bold text-white">{invoiceNumber}</span>
                </div>
                <div className="flex justify-between text-white/55">
                  <span>สินค้า:</span>
                  <span className="font-semibold text-white">
                    {selectedProduct === "cap" 
                      ? `หมวกแก๊ป ${selectedColor.name} (${selectedStrap.name})`
                      : `เสื้อ ${selectedColor.name} (${selectedSize.name}) [${selectedGraphic.name}]`}
                  </span>
                </div>
                {customText.trim() && (
                  <div className="flex justify-between text-white/55">
                    <span>{selectedProduct === "cap" ? "ปักชื่อหลังหมวก:" : "สกรีนชื่อ:"}</span>
                    <span className="font-mono font-semibold text-emerald-400">{customText.toUpperCase()}</span>
                  </div>
                )}
                <div className="border-t border-white/5 pt-2 flex justify-between text-sm font-bold text-white">
                  <span>จำนวนเงินโอน:</span>
                  <span className="text-cyan-400 text-base">{totalPrice}.00 บาท</span>
                </div>
              </div>

              {/* QR Code Renders */}
              <div className="mx-auto bg-white p-5 rounded-2xl flex flex-col items-center gap-3 w-fit shadow-2xl relative">
                {/* PromptPay Header */}
                <div className="w-[180px] h-[34px] relative bg-[#003d64] flex items-center justify-center rounded">
                  {/* PromptPay stylized text */}
                  <span className="text-white font-bold tracking-wider text-[11px] font-sans">Prompt Pay</span>
                  <span className="absolute -bottom-1 right-2 text-[6px] text-white/50">THAILAND</span>
                </div>

                {qrCodePayload ? (
                  <QRCodeSVG 
                    value={qrCodePayload} 
                    size={180} 
                    level="Q"
                    includeMargin={false} 
                  />
                ) : (
                  <div className="w-[180px] h-[180px] flex items-center justify-center border border-dashed border-gray-300">
                    <span className="text-xs text-gray-500 font-prompt">กำลังโหลด QR Code...</span>
                  </div>
                )}

                <p className="text-[10px] text-gray-400 font-prompt font-bold leading-none mt-1">
                  ยอดโอนเงิน: {totalPrice}.00 บาท
                </p>
              </div>

              <div className="space-y-1.5 font-prompt">
                <p className="text-xs text-white/70">
                  สแกนรหัส QR ด้านบนเพื่อโอนเงินผ่านแอปธนาคารของคุณได้ทันที 
                </p>
                <p className="text-[10px] text-amber-300/80">
                  *สแกนเสร็จสิ้นกรุณาบันทึกรูปภาพสลิปชำระเงินไว้เพื่อใช้ยืนยันออเดอร์ในขั้นตอนถัดไป*
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={copyOrderDetails}
                  className="flex-1 py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-white font-prompt font-semibold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{copiedInvoice ? "คัดลอกข้อมูลแล้ว!" : "คัดลอกข้อมูลใบสั่งซื้อ"}</span>
                </button>

                <button
                  onClick={() => setPaymentStep("success")}
                  className="flex-1 py-3 px-4 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-black font-prompt font-bold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>ฉันโอนเงินเรียบร้อยแล้ว</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {paymentStep === "success" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
            
            {/* Success Invoice receipt */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              className="relative z-10 glass-card p-8 max-w-md w-full text-center border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.15)] flex flex-col items-center gap-5"
            >
              {/* Giant check icon */}
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5] animate-bounce" />
              </div>

              <h2 className="font-prompt text-2xl font-bold text-white leading-tight">
                จองสั่งซื้อเรียบร้อยแล้ว!
              </h2>
              
              <p className="text-white/60 font-prompt text-xs leading-relaxed max-w-sm">
                การชำระเงินโอนได้รับการบันทึกในระบบจำลอง <strong>กรุณากดปุ่มด้านล่างเพื่อเปิด LINE ส่งสลิป</strong> และยืนยัน{selectedProduct === "cap" ? "รายละเอียดหมวก" : "ลายเสื้อ"}ที่ออกแบบกับแอดมินโดยตรงเพื่อผลิตสินค้า
              </p>

              {/* Receipt card info */}
              <div className="w-full bg-white/3 border border-white/5 rounded-2xl p-4 text-left text-xs font-prompt space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-white/40">รหัสการโอนเงิน:</span>
                  <span className="font-mono font-bold text-white">{invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">{selectedProduct === "cap" ? "สีหมวก / สายปรับ:" : "สีเสื้อ / ไซส์:"}</span>
                  <span className="text-white">
                    {selectedProduct === "cap" 
                      ? `${selectedColor.name} / ${selectedStrap.name}` 
                      : `${selectedColor.name} / ไซส์ ${selectedSize.name}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">{selectedProduct === "cap" ? "ดีไซน์หมวก:" : "ลายสกรีน:"}</span>
                  <span className="text-cyan-400">
                    {selectedProduct === "cap" ? "AiAon Tech & Music Studio Flagship" : selectedGraphic.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">{selectedProduct === "cap" ? "ปักหลังหมวก:" : "สลักที่แขน:"}</span>
                  <span className="font-mono font-bold text-emerald-400">{customText ? customText.toUpperCase() : "ไม่มี"}</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-2.5 text-sm font-bold text-white">
                  <span>ชำระผ่าน PromptPay:</span>
                  <span className="text-emerald-400">{totalPrice} บาท</span>
                </div>
              </div>

              {/* Copy message warning prompt */}
              <div className="p-3.5 rounded-xl bg-cyan-500/5 border border-cyan-500/10 text-cyan-300 text-[11px] font-prompt text-left w-full leading-relaxed">
                📢 ลิงก์ด้านล่างจะเปิดโปรแกรม LINE เพื่อส่งสรุปคำสั่งซื้อให้แอดมินโดยอัตโนมัติ หากไม่มีไลน์เปิดได้กรุณากดปุ่ม <strong>&quot;คัดลอกข้อมูล&quot;</strong> เพื่อคัดลอกรายละเอียดไปแปะส่งให้แอดมินแทนครับ
              </div>

              {/* Line Share Button & Copy Info button */}
              <div className="flex flex-col gap-2 w-full pt-2">
                <a
                  href={generateLineUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-prompt font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-[0_0_25px_rgba(6,199,85,0.2)]"
                >
                  <RiLineLine className="w-5 h-5 text-white" />
                  <span>ส่งสลิป &amp; ยืนยันออเดอร์ผ่าน LINE</span>
                </a>

                <div className="flex gap-2 w-full">
                  <button
                    onClick={copyOrderDetails}
                    className="flex-1 py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-white font-prompt font-semibold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{copiedInvoice ? "คัดลอกแล้ว!" : "คัดลอกข้อมูลสรุป"}</span>
                  </button>

                  <button
                    onClick={() => {
                      setPaymentStep("form");
                      setForm({ name: "", phone: "", address: "", lineId: "" });
                      setCustomText("");
                      setQty(1);
                    }}
                    className="flex-1 py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-white/50 hover:text-white font-prompt font-semibold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <span>{selectedProduct === "cap" ? "สั่งจองหมวกเพิ่ม" : "สั่งจองเสื้อเพิ่ม"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

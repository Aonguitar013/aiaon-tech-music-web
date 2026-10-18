"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  X, Copy, Check, ExternalLink, ShieldCheck,
  Smartphone, QrCode
} from "lucide-react";
import { FaLine } from "react-icons/fa6";

export interface LineModalPayload {
  message: string;
  title?: string;
  price?: number | string;
  itemCode?: string;
}

interface LineModalContextType {
  openLineModal: (payload: LineModalPayload) => void;
  closeLineModal: () => void;
  isOpen: boolean;
  payload: LineModalPayload | null;
}

const LineModalContext = createContext<LineModalContextType | undefined>(undefined);

/**
 * Robust detection of mobile/tablet vs desktop
 * Returns true for iPhone, Android phone, iPad, and small touch devices (< 768px).
 * Returns false for desktop PCs, laptops, and Mac/Windows desktop browsers.
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;

  const ua = navigator.userAgent || "";
  const maxTouch = navigator.maxTouchPoints || 0;

  // 1. Mobile phones (iOS / Android)
  const isMobileOS = /iPhone|iPod|Android.*Mobile|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  if (isMobileOS) return true;

  // 2. Tablets (iPad, iPadOS Safari reporting MacIntel, Android tablets)
  const isTablet =
    /iPad|Android(?!.*Mobile)|Tablet/i.test(ua) ||
    (ua.includes("Macintosh") && maxTouch > 1);
  if (isTablet) return true;

  // 3. Small screens with touch (< 768px)
  if (window.innerWidth < 768 && ("ontouchstart" in window || maxTouch > 0)) {
    return true;
  }

  // 4. Default to desktop (Windows, Mac, Linux laptops & PCs)
  return false;
}

/**
 * Fallback clipboard copy utility supporting non-secure contexts & headless browsers
 */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fallback to document.execCommand
  }

  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "-9999px";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}

const LINE_ACCOUNT_ID = "@deu6776s";
const LINE_ADD_FRIEND_URL = "https://line.me/R/ti/p/%40deu6776s";

export function LineModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState<LineModalPayload | null>(null);

  const openLineModal = useCallback((newPayload: LineModalPayload) => {
    setPayload(newPayload);
    setIsOpen(true);
  }, []);

  const closeLineModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Global capture interceptor: catches desktop clicks on ANY line.me link
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Never intercept on mobile/tablet devices
      if (isMobileDevice()) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      // Allow intentional bypass (e.g. "เปิดบน LINE PC" button inside the modal itself)
      if (anchor.getAttribute("data-no-line-modal") === "true") return;

      const href = anchor.getAttribute("href") || "";
      if (
        href.includes("line.me/R/oaMessage") ||
        href.includes("line.me/R/ti/p") ||
        href.includes("page.line.me")
      ) {
        // Desktop user clicked a LINE link -> prevent standard bounce to line.me/th/
        e.preventDefault();
        e.stopPropagation();

        let extractedMessage = "";
        try {
          const url = new URL(href, window.location.href);
          if (url.searchParams.get("text")) {
            extractedMessage = url.searchParams.get("text") || "";
          } else if (url.searchParams.get("message")) {
            extractedMessage = url.searchParams.get("message") || "";
          } else if (url.search.length > 1) {
            extractedMessage = decodeURIComponent(url.search.slice(1));
          }
        } catch {
          extractedMessage = "";
        }

        const title = anchor.getAttribute("data-line-title") || undefined;
        const price = anchor.getAttribute("data-line-price") || undefined;
        const itemCode = anchor.getAttribute("data-line-code") || undefined;

        openLineModal({
          message:
            extractedMessage ||
            "สวัสดีครับครูอ้น ติดต่อสอบถามเรื่องระบบ/สินค้าจากเว็บไซต์ aiaon.tech ครับ 🙏",
          title,
          price,
          itemCode,
        });
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, [openLineModal]);

  return (
    <LineModalContext.Provider value={{ openLineModal, closeLineModal, isOpen, payload }}>
      {children}
      <LineOrderModal
        isOpen={isOpen}
        onClose={closeLineModal}
        message={payload?.message || ""}
        title={payload?.title}
        price={payload?.price}
        itemCode={payload?.itemCode}
      />
    </LineModalContext.Provider>
  );
}

export function useLineModal() {
  const context = useContext(LineModalContext);
  if (!context) {
    throw new Error("useLineModal must be used within a LineModalProvider");
  }
  return context;
}

interface LineOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  title?: string;
  price?: number | string;
  itemCode?: string;
}

export function LineOrderModal({
  isOpen,
  onClose,
  message,
  title,
  price,
  itemCode,
}: LineOrderModalProps) {
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyMessage = async () => {
    const ok = await copyToClipboard(message);
    if (ok) {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    }
  };

  const handleCopyId = async () => {
    const ok = await copyToClipboard(LINE_ACCOUNT_ID);
    if (ok) {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const linePcHref = `https://line.me/R/oaMessage/%40deu6776s/?${encodeURIComponent(message)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="line-order-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-[0_0_50px_rgba(6,199,85,0.18)] overflow-hidden font-prompt text-slate-100 my-auto"
          >
            {/* Top Glowing Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#06C755] via-teal-400 to-indigo-500" />

            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-950/40">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#06C755] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#06C755]/25">
                  <FaLine className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#06C755]/20 text-[#06C755] border border-[#06C755]/30 uppercase tracking-wider">
                      LINE Official Account
                    </span>
                    <span className="text-xs text-slate-400 font-mono">@deu6776s</span>
                  </div>
                  <h2
                    id="line-order-modal-title"
                    className="text-base sm:text-lg font-bold text-white mt-1 leading-snug"
                  >
                    {title || "สั่งซื้อและติดต่อผ่าน LINE OA ครูอ้น"}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="ปิดหน้าต่าง"
                className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center shrink-0 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Left Column: QR Code (2 of 5 cols) */}
              <div className="md:col-span-2 flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-3">
                  <QrCode className="w-4 h-4 text-[#06C755]" />
                  <span>สแกนด้วยมือถือเพื่อแชต</span>
                </div>

                {/* QR Code Container */}
                <div className="p-3 bg-white rounded-2xl shadow-inner inline-flex items-center justify-center">
                  <QRCodeSVG
                    value={LINE_ADD_FRIEND_URL}
                    size={160}
                    level="M"
                    includeMargin={false}
                  />
                </div>

                {/* LINE ID chip with copy button */}
                <button
                  type="button"
                  onClick={handleCopyId}
                  title="คลิกเพื่อคัดลอก LINE ID"
                  className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 hover:border-[#06C755]/50 text-xs text-slate-200 transition group"
                >
                  <span className="text-slate-400">ID:</span>
                  <span className="font-mono font-bold text-white">{LINE_ACCOUNT_ID}</span>
                  {copiedId ? (
                    <span className="text-[11px] text-[#06C755] font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> คัดลอกแล้ว
                    </span>
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400 group-hover:text-white" />
                  )}
                </button>

                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  เปิดกล้องมือถือหรือแอป LINE สแกน QR เพื่อเริ่มแชตกับครูอ้นได้ทันที
                </p>

                {/* Frictionless Trust Badges below QR */}
                <div className="mt-3.5 pt-3 border-t border-slate-800/80 w-full text-left space-y-2 text-[11px] font-prompt">
                  <div className="flex items-start gap-1.5 text-amber-300/95 leading-snug">
                    <span className="text-xs shrink-0 mt-0.5">⚡</span>
                    <span>ส่งมอบลิงก์อัตโนมัติใน 10 วินาทีหลังส่งสลิป (AI Slip Verification)</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-emerald-300/95 leading-snug">
                    <span className="text-xs shrink-0 mt-0.5">🛡️</span>
                    <span>ระบบมาตรฐานพร้อมใช้ ไม่ต้องเขียนโค้ดเอง</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-cyan-300/95 leading-snug">
                    <span className="text-xs shrink-0 mt-0.5">♾️</span>
                    <span>ชำระครั้งเดียว ใช้งานได้ตลอดชีพ ไม่มีค่ารายเดือน</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Message & Desktop Options (3 of 5 cols) */}
              <div className="md:col-span-3 flex flex-col justify-between space-y-4">
                {/* Header info */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                      <span>ขั้นตอน: คัดลอกข้อความแล้วส่งใน LINE</span>
                    </span>
                    {price && (
                      <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        ยอดชำระ ฿{price}
                      </span>
                    )}
                  </div>

                  {itemCode && (
                    <div className="text-[11px] text-indigo-300 font-mono mb-1.5">
                      รหัสสินค้า: [{itemCode}]
                    </div>
                  )}

                  {/* Message Preview Box */}
                  <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-3.5 text-xs text-slate-200 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto leading-relaxed select-all">
                    {message}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5">
                  {/* Primary: Copy Message */}
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg ${
                      copiedMessage
                        ? "bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-400/50"
                        : "bg-[#06C755] hover:bg-[#05b34c] text-white shadow-[#06C755]/25 hover:scale-[1.01] active:scale-[0.99]"
                    }`}
                  >
                    {copiedMessage ? (
                      <>
                        <Check className="w-4 h-4 text-white shrink-0" />
                        <span>คัดลอกข้อความแล้ว! นำไปวางใน LINE ได้เลย ✓</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 shrink-0" />
                        <span>คัดลอกข้อความสั่งซื้อนี้ (คลิกเดียว)</span>
                      </>
                    )}
                  </button>

                  {/* Secondary: Open via LINE PC */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="text-[11px] text-slate-400 text-center mb-1.5">
                      หรือหากติดตั้งแอป LINE บนคอมพิวเตอร์เครื่องนี้:
                    </div>
                    <a
                      href={linePcHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-no-line-modal="true"
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700/70 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      <span>เปิดแชตด้วยแอป LINE PC</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Reassurance */}
            <div className="px-6 py-3.5 bg-slate-950/70 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>ครูอ้นตอบเองทุกข้อความ ได้รับไฟล์และคำแนะนำโดยตรง ปลอดภัย 100%</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

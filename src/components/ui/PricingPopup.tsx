"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Sparkles, Check, ArrowRight, Zap } from "lucide-react";

const POPUP_KEY = "iaon_pricing_popup_lastSeen";
const POPUP_COOLDOWN_HOURS = 24; // Show again after 24 hours

function FloatingStars() {
  const stars = [
    { top: "12%", left: "8%",  delay: "0s",   size: 7  },
    { top: "65%", left: "88%", delay: "1.8s",  size: 11 },
    { top: "30%", left: "82%", delay: "0.6s",  size: 9  },
    { top: "78%", left: "15%", delay: "2.5s",  size: 13 },
    { top: "8%",  left: "75%", delay: "3.2s",  size: 7  },
    { top: "50%", left: "5%",  delay: "1.2s",  size: 10 },
    { top: "88%", left: "60%", delay: "0.4s",  size: 8  },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0">
      {stars.map((s, i) => (
        <svg
          key={i}
          className="absolute animate-sparkle-float"
          style={{ top: s.top, left: s.left, animationDelay: s.delay, opacity: 0 }}
          width={s.size} height={s.size} viewBox="0 0 20 20" fill="none"
        >
          <path
            d="M10 0L12.245 7.755L20 10L12.245 12.245L10 20L7.755 12.245L0 10L7.755 7.755L10 0Z"
            fill="rgba(6, 182, 212, 0.75)"
          />
        </svg>
      ))}
    </div>
  );
}

export function PricingPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const last = localStorage.getItem(POPUP_KEY);
    const shouldShow =
      !last ||
      Date.now() - parseInt(last, 10) > POPUP_COOLDOWN_HOURS * 60 * 60 * 1000;

    if (!shouldShow) return;

    // Delay appearance for a natural browsing experience
    const timer = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem(POPUP_KEY, String(Date.now()));
    setVisible(false);
  };

  const features = [
    "ปลดล็อกเข้าเรียน 10 คอร์สเรียนพรีเมียม ทั้งหมดบนเว็บ",
    "รับแม่แบบซอฟต์แวร์สำเร็จรูปครบทั้ง 30 ระบบ",
    "อัปเดตคอร์สและระบบใหม่ฟรีตลอดระยะเวลาสมาชิก",
    "รับใบรับรอง Certificate หลังเรียนจบรายคอร์ส",
    "สำรองข้อมูลแบบรายวันลงคลาวด์ระบบ",
  ];

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            onClick={dismiss}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="popup-modal"
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 26, delay: 0.05 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
            aria-modal="true"
            role="dialog"
            aria-labelledby="pricing-popup-title"
          >
            <div className="relative w-full max-w-md pointer-events-auto">

              {/* Outer glow halo */}
              <div className="absolute -inset-1 rounded-3xl bg-linear-to-br from-blue-500/15 via-amber-400/10 to-purple-500/15 blur-2xl pointer-events-none" />

              {/* Card */}
              <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E2E8F0] shadow-2xl">
                {/* Top gradient stripe */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-blue-600 via-cyan-500 to-violet-600 z-10" />

                {/* Content wrapper */}
                <div className="relative z-10 p-7 sm:p-8">

                  {/* Close button */}
                  <button
                    onClick={dismiss}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#FAF8F5] hover:bg-slate-100 border border-[#E2E8F0] text-[#475569] hover:text-[#0F172A] transition-all active:scale-90 cursor-pointer"
                    aria-label="ปิด"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Header badge */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-blue-600 to-cyan-600 text-[11px] text-white font-bold tracking-wider uppercase font-prompt">
                      <Sparkles className="w-3 h-3 animate-pulse" />
                      RECOMMENDED
                    </span>
                    <span className="text-[#475569] text-[11px] font-prompt">สำหรับผู้เยี่ยมชมใหม่</span>
                  </div>

                  {/* Headline */}
                  <h2
                    id="pricing-popup-title"
                    className="font-prompt text-2xl sm:text-3xl font-bold leading-snug text-[#0F172A] mb-1"
                  >
                    อัปเกรดสู่{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600">
                      VIP Pro Academy
                    </span>
                  </h2>
                  <p className="font-prompt text-[#475569] text-sm leading-relaxed mb-6">
                    ปลดล็อกเข้าถึงคอร์สเรียนพรีเมียมและแม่แบบระบบทั้งหมด
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-6 bg-[#FAF8F5] border border-[#E2E8F0] rounded-2xl px-5 py-4">
                    <Zap className="w-5 h-5 text-blue-600 shrink-0 mb-0.5" />
                    <span className="font-prompt text-5xl font-extrabold text-[#0F172A]">
                      290
                    </span>
                    <span className="font-prompt text-[#475569] text-sm pb-1">บาท / เดือน</span>
                    <span className="ml-auto font-prompt text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold whitespace-nowrap">
                      ทดลองฟรีก่อนได้
                    </span>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-2.5 mb-7">
                    {features.map((feat) => (
                      <li key={feat} className="flex items-center gap-3 font-prompt text-sm text-[#1E293B]">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 border border-blue-200 shrink-0">
                          <Check className="w-3 h-3 text-blue-700" />
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-3">
                    <Link href="/login" onClick={dismiss} className="block">
                      <button className="btn-shimmer w-full py-4 rounded-2xl bg-[#0F172A] hover:bg-slate-800 text-white font-prompt font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all cursor-pointer">
                        <Sparkles className="w-4 h-4" />
                        สมัครใช้งาน VIP Pro เลย
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>

                    <Link href="/saas#pricing" onClick={dismiss} className="block">
                      <button className="w-full py-3 rounded-2xl border border-[#E2E8F0] hover:border-slate-300 bg-[#FAF8F5] hover:bg-slate-100 text-[#0F172A] font-prompt font-medium text-sm active:scale-[0.98] transition-all cursor-pointer">
                        ดูแผนบริการทั้งหมด
                      </button>
                    </Link>
                  </div>

                  {/* Dismiss link */}
                  <p className="text-center mt-4">
                    <button
                      onClick={dismiss}
                      className="font-prompt text-[11px] text-white/25 hover:text-white/50 transition-colors cursor-pointer"
                    >
                      ใช้แผนฟรีต่อไปก่อน
                    </button>
                  </p>

                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

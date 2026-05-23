"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaLine } from "react-icons/fa6";
import { useState, useEffect } from "react";

export function FloatingLINEButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Show button after a short delay for better UX
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-[99] flex items-center gap-2 group pointer-events-auto print:hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Tooltip text */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="bg-black/80 backdrop-blur-md text-white border border-green-500/30 px-3.5 py-2 rounded-xl text-xs font-prompt shadow-[0_4px_12px_rgba(0,0,0,0.5)] select-none flex flex-col gap-0.5"
              >
                <span className="font-bold text-green-400 text-[10px] uppercase tracking-wider">AiAon Tech</span>
                <span>ปรึกษาระบบ/สอบถามฟรี</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Circle Button */}
          <a
            href="https://lin.ee/XXLvrKW"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_24px_rgba(6,199,85,0.45)] cursor-pointer"
          >
            {/* Pulsing ring animation */}
            <span className="absolute -inset-1.5 rounded-full bg-[#06C755] opacity-25 animate-ping pointer-events-none" />
            <span className="absolute -inset-3 rounded-full bg-[#06C755] opacity-10 animate-pulse pointer-events-none" />

            <FaLine className="w-8.5 h-8.5 text-white filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

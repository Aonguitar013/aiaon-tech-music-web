"use client";

import { useBrandTheme } from "@/components/providers/BrandThemeProvider";
import { Laptop, Music, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { brandTheme, toggleTheme } = useBrandTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl backdrop-blur-md border transition-all duration-500 overflow-hidden group hover:scale-110"
      style={{
        background: brandTheme === "music" ? "rgba(245, 158, 11, 0.15)" : "rgba(59, 130, 246, 0.15)",
        borderColor: brandTheme === "music" ? "rgba(245, 158, 11, 0.3)" : "rgba(59, 130, 246, 0.3)",
      }}
    >
      {/* Glow background */}
      <div 
        className="absolute inset-0 opacity-50 blur-xl transition-all duration-500"
        style={{
          background: brandTheme === "music" ? "#f59e0b" : "#3b82f6"
        }}
      />
      
      <div className="relative z-10 flex items-center justify-center w-6 h-6">
        <AnimatePresence mode="wait">
          {brandTheme === "tech" ? (
            <motion.div
              key="tech"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <Laptop className="w-6 h-6 text-blue-400" />
            </motion.div>
          ) : (
            <motion.div
              key="music"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <Music className="w-6 h-6 text-amber-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sparkles effect on hover */}
      <Sparkles className={`absolute top-1 right-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${brandTheme === 'music' ? 'text-amber-200' : 'text-blue-200'}`} />
    </button>
  );
}

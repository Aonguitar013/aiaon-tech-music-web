"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.1)_0%,rgba(0,0,0,0)_50%,rgba(245,158,11,0.1)_100%)] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-1/2 h-[80%] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none -translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-[80%] bg-amber-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none translate-x-1/4 translate-y-1/4"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto text-center z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-white/80 mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-blue-400">Technology</span>
          <span className="mx-1 text-white/30">x</span>
          <span className="text-amber-400">Music</span>
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-prompt text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">AiAon Tech</span>
          <span className="text-white/40 mx-2 md:mx-4 font-light">&</span><br className="sm:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">Music Studio</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-prompt font-medium leading-relaxed"
        >
          Empowering Education with Smart Automation & Soulful Melodies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <Link href="/dashboard/academy?category=Technology" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)] font-prompt">
            คอร์สเรียนเทคฯ <ArrowRight className="w-5 h-5" />
          </Link>
          
          <Link href="/dashboard/academy?category=Music" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-600 to-orange-400 hover:from-amber-500 hover:to-orange-300 text-white font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.3)] font-prompt text-gray-900 border border-amber-400/50">
            <PlayCircle className="w-5 h-5 text-white" /> <span className="text-white">คอร์สเรียนดนตรี</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

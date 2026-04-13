"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="max-w-5xl mx-auto text-center z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-blue-400 mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Next-Gen Tech Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-prompt text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]"
        >
          Master the Future of <br className="hidden md:block" />
          <span className="glow-text">Tech & Workflow</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light"
        >
          An elite ecosystem for learning, automation tools, and digital assets. Join the ranks of modern tech professionals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            Explore Academy <ArrowRight className="w-5 h-5" />
          </button>
          
          <button className="w-full sm:w-auto px-8 py-4 rounded-full glass-card text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
            <PlayCircle className="w-5 h-5" /> Watch Intro
          </button>
        </motion.div>
      </div>
    </section>
  );
}

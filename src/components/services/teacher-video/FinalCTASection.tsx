"use client";

import { MessageSquare, Sparkles, Gift } from "lucide-react";
import { FaLine } from "react-icons/fa6";

export function FinalCTASection() {
  return (
    <section className="relative py-20 px-4 md:py-24 scroll-mt-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[300px] bg-gradient-to-r from-blue-600/10 to-green-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8 p-8 sm:p-12 md:p-16 rounded-3xl glass-card border border-white/8 bg-gradient-to-b from-white/3 to-white/1 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold font-prompt mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          START YOUR JOURNEY TODAY
        </div>

        {/* Heading */}
        <h2 className="font-prompt text-2xl sm:text-3xl md:text-4xl.5 font-bold text-white leading-tight">
          ให้วิทยฐานะ PA ของคุณครูเป็นเรื่องง่าย <br className="hidden sm:inline" />
          และผ่านเกณฑ์ประเมินได้อย่างไร้ความกังวล
        </h2>

        {/* Sub-headline */}
        <p className="font-prompt text-xs sm:text-sm md:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
          ปรึกษาฟรี! ร่วมออกแบบแนวคิด วางแผนประเมินวิทยฐานะเบื้องต้นโดยไม่มีค่าใช้จ่าย
          ทีมงานครูและผู้เชี่ยวชาญด้านเทคโนโลยีพร้อมดูแลเคียงข้างคุณครูจนสำเร็จผลประเมินครับ
        </p>

        {/* Big Line CTA Button */}
        <div className="pt-4 flex flex-col items-center justify-center gap-4">
          <a
            href="https://lin.ee/XXLvrKW"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-prompt font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(6,199,85,0.4)] hover:shadow-[0_0_40px_rgba(6,199,85,0.6)]"
          >
            {/* Pulsing ring animation */}
            <span className="absolute -inset-1 rounded-full bg-[#06C755] opacity-25 animate-ping pointer-events-none group-hover:scale-105 transition-transform" />
            <FaLine className="w-6.5 h-6.5 text-white filter drop-shadow-md shrink-0" />
            แอด LINE ปรึกษาฟรีได้ทันที
          </a>

          {/* Bonus Promo text */}
          <div className="flex items-center justify-center gap-2 text-white/50 text-[10px] sm:text-xs font-prompt font-light bg-white/3 border border-white/5 px-4 py-2 rounded-xl mt-2 select-none">
            <Gift className="w-4 h-4 text-amber-400 shrink-0" />
            <span>พิเศษ! ทักวันนี้ รับฟรีตัวอย่างแผนการสอน PA และสคริปต์สอน Active Learning</span>
          </div>
        </div>

      </div>
    </section>
  );
}

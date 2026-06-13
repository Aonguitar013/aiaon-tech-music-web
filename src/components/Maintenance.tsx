"use client";

import { Geist, Prompt } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const prompt = Prompt({
    variable: "--font-prompt",
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin", "thai"],
});

export default function Maintenance() {
    return (
        <div className={cn(
            "min-h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden relative font-prompt antialiased",
            geist.variable,
            prompt.variable
        )}>
            {/* Background Effect: รังสีความขลัง (AIAON Blue & Emerald) */}
            <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-emerald-600/10 blur-[180px] rounded-full animate-pulse [animation-delay:2s]" />

            <div className="relative z-10 max-w-2xl w-full px-6 text-center">
                {/* Animated Icon: วงแหวนแห่งเทคโนโลยี */}
                <div className="mb-12 relative inline-block">
                    <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse"></div>
                    <div className="relative w-32 h-32 border border-white/5 rounded-full flex items-center justify-center backdrop-blur-3xl bg-white/5 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
                        <div className="absolute inset-2 border-t-2 border-blue-500 rounded-full animate-spin [animation-duration:3s]"></div>
                        <div className="absolute inset-4 border-b-2 border-emerald-500 rounded-full animate-spin [animation-direction:reverse] [animation-duration:2.5s]"></div>
                        <div className="absolute inset-7 border-r-2 border-blue-400/30 rounded-full animate-spin [animation-duration:5s]"></div>
                        <span className="absolute text-4xl filter drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">⚡</span>
                    </div>
                </div>

                {/* Heading: AIAON TECH */}
                <h1 className="font-prompt text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 uppercase">
                    AIAON <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">TECH</span>
                </h1>

                <div className="h-[2px] w-32 bg-linear-to-r from-transparent via-white/10 to-transparent mx-auto mb-10" />

                <p className="font-prompt text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-xl mx-auto mb-12">
                    " Coming Soon! <strong className="text-white font-medium"> เรากำลังอัปเดตคอร์สเรียนและเพิ่มสินค้าดิจิทัลใหม่ให้ครบครันยิ่งขึ้น </strong>.
                    เพื่อยกระดับประสบการณ์การใช้งานของสมาชิกทุกท่าน ขออภัยในความไม่สะดวกในช่วงเวลานี้ แล้วพบกันเร็วๆ นี้นะครับ"
                </p>

                {/* Status Badge */}
                <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-mono tracking-[0.3em] bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent uppercase font-bold">
                        Optimizing Ecosystem
                    </span>
                </div>

                {/* Footer Text */}
                <div className="mt-24 text-white/20 font-prompt text-xs tracking-[0.4em] uppercase font-light">
                    AIAON TECH &copy; 2026 | <span className="text-white/40">Status: Evolving</span>
                </div>
            </div>

            {/* Grid Pattern: ให้ความรู้สึกเหมือนกำลังวางผังเมือง */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>
        </div>
    );
}
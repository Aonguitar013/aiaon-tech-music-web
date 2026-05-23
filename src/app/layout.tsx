import type { Metadata } from "next";
import { Inter, Prompt, Geist } from "next/font/google";
import "./globals.css";
import React from "react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { MouseGlowGrid } from "@/components/layout/MouseGlowGrid";
import { createClient } from "@/utils/supabase/server";
import { FaYoutube, FaTiktok, FaFacebook, FaLine } from "react-icons/fa6";
import { BrandThemeProvider } from "@/components/providers/BrandThemeProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { FloatingLINEButton } from "@/components/ui/FloatingLINEButton";
import Maintenance from "@/components/Maintenance";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const prompt = Prompt({
  variable: "--font-prompt",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  title: "iAonTechxMusic | Tech Influencer Ecosystem",
  description:
    "แพลตฟอร์มการศึกษาและดิจิทัลมาร์เก็ตเพลซระดับพรีเมียม สร้างโดย iAonTechxMusic",
  keywords: ["iAon", "Tech", "Music", "Academy", "Marketplace", "SaaS", "Thai"],
  openGraph: {
    title: "iAonTechxMusic | Tech Influencer Ecosystem",
    description:
      "แพลตฟอร์มการศึกษาและดิจิทัลมาร์เก็ตเพลซระดับพรีเมียม สร้างโดย iAonTechxMusic",
    locale: "th_TH",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  // --- สวิตช์ไฟควบคุมโหมดปิดปรับปรุง ---
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

  return (
    <html
      lang="th"
      className={cn("dark", "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${prompt.variable} antialiased font-sans flex flex-col min-h-screen relative`}
        suppressHydrationWarning
      >
        <BrandThemeProvider>

          {/* ถ้าเปิดโหมด Maintenance จะแสดงแค่หน้า Maintenance เท่านั้น */}
          {isMaintenance ? (
            <Maintenance />
          ) : (
            <>
              {/* ============================================================
                  GLOBAL BACKGROUND LAYER
                  - AnimatedGrid: CSS grid + mouse-reactive cursor glow
                  - Ambient Lights: floating blurred orbs for ambient depth
                  All layers are pointer-events:none so they never block clicks.
              ============================================================ */}

              {/* Animated grid background (full viewport, fixed) */}
              <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <MouseGlowGrid />

                {/* Global Ambient Lights — gently animated */}
                <div className="ambient-light-primary w-[600px] h-[600px] top-[-200px] left-[-150px] opacity-70" />
                <div className="ambient-light-secondary w-[500px] h-[500px] top-[20%] right-[-120px] opacity-60" />
                {/* Subtle third orb at bottom for depth */}
                <div className="absolute rounded-full blur-[140px] bg-blue-600/10 pointer-events-none w-[400px] h-[400px] bottom-[-100px] left-1/2 -translate-x-1/2" />
              </div>

              {/* --- Navbar --- */}
              <Navbar user={data?.user} />
              <ThemeToggle />
              <FloatingLINEButton />

              {/* --- Main Content --- */}
              <main className="flex-grow pt-28 relative z-10">
                {children}
              </main>

              {/* ============================================================
                  FOOTER
              ============================================================ */}
              <footer
                id="footer"
                className="border-t border-white/10 mt-24 py-16 relative overflow-hidden z-10"
              >
                {/* Footer background */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/8 blur-[100px] pointer-events-none rounded-full" />

                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-12 text-center md:text-left relative z-10 w-full">
                  {/* Brand */}
                  <div className="space-y-4 md:max-w-sm">
                    <h2 className="font-prompt text-2xl font-normal tracking-widest text-white uppercase flex items-center gap-1">
                      iAonTech<span className="text-blue-500">xMusic</span>
                    </h2>
                    <p className="text-white/50 text-sm font-prompt leading-relaxed">
                      Tech Educator &amp; Content Creator. มุ่งมั่นสร้างระบบลดภาระครู
                      และยกระดับการศึกษาด้วย Automation
                    </p>
                  </div>

                  {/* Quick Links */}
                  <div className="space-y-4">
                    <h3 className="text-white font-bold font-prompt text-lg">Quick Links</h3>
                    <ul className="space-y-2 text-white/50 text-sm font-prompt">
                      <li><a href="/#about"    className="hover:text-blue-400 transition-colors duration-200">About Me</a></li>
                      <li><a href="/#academy"  className="hover:text-blue-400 transition-colors duration-200">Academy</a></li>
                      <li><a href="/#products" className="hover:text-blue-400 transition-colors duration-200">Marketplace</a></li>
                      <li><a href="/saas"     className="hover:text-blue-400 transition-colors duration-200">SaaS Tools</a></li>
                    </ul>
                  </div>

                  {/* Social */}
                  <div className="space-y-4">
                    <h3 className="text-white font-bold font-prompt text-lg">Connect With Me</h3>
                    <div className="flex justify-center md:justify-start gap-3">
                      <a href="#" className="p-2.5 glass-card hover:bg-red-500/20 text-white hover:text-red-400 transition-all duration-200 hover:scale-110" title="YouTube" aria-label="YouTube">
                        <FaYoutube className="w-5 h-5" />
                      </a>
                      <a href="#" className="p-2.5 glass-card hover:bg-white/10 text-white hover:text-white transition-all duration-200 hover:scale-110" title="TikTok" aria-label="TikTok">
                        <FaTiktok className="w-5 h-5" />
                      </a>
                      <a href="#" className="p-2.5 glass-card hover:bg-blue-600/20 text-white hover:text-blue-400 transition-all duration-200 hover:scale-110" title="Facebook" aria-label="Facebook">
                        <FaFacebook className="w-5 h-5" />
                      </a>
                      <a href="#" className="p-2.5 glass-card hover:bg-green-500/20 text-white hover:text-green-400 transition-all duration-200 hover:scale-110" title="LINE" aria-label="LINE">
                        <FaLine className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/30 font-prompt text-xs relative z-10">
                  <p suppressHydrationWarning>
                    © {new Date().getFullYear()} AiAon Tech Ecosystem. All Rights Reserved.
                  </p>
                </div>
              </footer>
            </>
          )}

        </BrandThemeProvider>
      </body>
    </html>
  );
}
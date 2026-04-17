import type { Metadata } from "next";
import { Inter, Prompt, Geist } from "next/font/google";
import "./globals.css";
import React from "react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { createClient } from "@/utils/supabase/server";
import { FaYoutube, FaTiktok, FaFacebook, FaLine } from "react-icons/fa6";
import { BrandThemeProvider } from "@/components/providers/BrandThemeProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  title: "Tech Influencer Ecosystem",
  description: "Advanced Educational Platform and Digital Marketplace",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)} suppressHydrationWarning>
      <body className={`${inter.variable} ${prompt.variable} antialiased font-sans flex flex-col min-h-screen relative`} suppressHydrationWarning>
        <BrandThemeProvider>
          {/* Navigation Bar */}
          <Navbar user={data?.user} />
          
          <ThemeToggle />

        {/* Global Ambient Lights */}
        <div className="ambient-light-primary w-[500px] h-[500px] top-[-200px] left-[-100px]" />
        <div className="ambient-light-secondary w-[400px] h-[400px] top-[20%] right-[-100px]" />

        {/* Main Content */}
        <main className="flex-grow pt-28">
          {children}
        </main>

        {/* Footer */}
        <footer id="footer" className="border-t border-white/10 mt-24 py-16 bg-black/50 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[120px] pointer-events-none rounded-full"></div>
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-12 text-center md:text-left relative z-10 w-full">
            <div className="space-y-4 md:max-w-sm">
              <h2 className="font-prompt text-2xl font-bold tracking-widest text-white uppercase">
                AiAon <span className="text-blue-500">Tech</span>
              </h2>
              <p className="text-white/50 text-sm font-prompt leading-relaxed">
                Tech Educator & Content Creator. มุ่งมั่นสร้างระบบลดภาระครู และยกระดับการศึกษาด้วย Automation
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-white font-bold font-prompt text-lg">Quick Links</h3>
              <ul className="space-y-2 text-white/50 text-sm font-prompt">
                <li><a href="#about" className="hover:text-blue-400 transition-colors">About Me</a></li>
                <li><a href="#academy" className="hover:text-blue-400 transition-colors">Academy</a></li>
                <li><a href="#products" className="hover:text-blue-400 transition-colors">Marketplace</a></li>
                <li><a href="#saas" className="hover:text-blue-400 transition-colors">SaaS Tools</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-bold font-prompt text-lg">Connect With Me</h3>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="#" className="p-2 glass-card hover:bg-red-500/20 text-white hover:text-red-500 transition-colors" title="YouTube"><FaYoutube className="w-5 h-5"/></a>
                <a href="#" className="p-2 glass-card hover:bg-black/40 text-white hover:text-white transition-colors" title="TikTok"><FaTiktok className="w-5 h-5"/></a>
                <a href="#" className="p-2 glass-card hover:bg-blue-600/20 text-white hover:text-blue-500 transition-colors" title="Facebook"><FaFacebook className="w-5 h-5"/></a>
                <a href="#" className="p-2 glass-card hover:bg-green-500/20 text-white hover:text-green-500 transition-colors" title="LINE"><FaLine className="w-5 h-5"/></a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/30 font-prompt text-xs relative z-10">
            <p suppressHydrationWarning>© {new Date().getFullYear()} AiAon Tech Ecosystem. All Rights Reserved.</p>
          </div>
        </footer>
        </BrandThemeProvider>
      </body>
    </html>
  );
}

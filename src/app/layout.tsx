import type { Metadata } from "next";
import { Inter, Prompt, Geist } from "next/font/google";
import "./globals.css";
import React from "react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { MouseGlowGrid } from "@/components/layout/MouseGlowGrid";
import { FaYoutube, FaTiktok, FaFacebook, FaLine } from "react-icons/fa6";
import { BrandThemeProvider } from "@/components/providers/BrandThemeProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { FloatingLINEButton } from "@/components/ui/FloatingLINEButton";
import { CommandMenuProvider } from "@/components/command-menu/CommandMenuProvider";
import { MobileStickyActionBar } from "@/components/layout/MobileStickyActionBar";
import { LineModalProvider } from "@/components/ui/LineOrderModal";
import Maintenance from "@/components/Maintenance";
import { MarketingPixels } from "@/components/analytics/MarketingPixels";
import { getLineOrderUrl } from "@/lib/line";

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
  metadataBase: new URL("https://www.aiaon.tech"),
  title: {
    default: "AiAon Tech — คลังระบบ Google Apps Script & สื่อการสอน AI โดย ครูอ้น",
    template: "%s | AiAon Tech",
  },
  description:
    "แพลตฟอร์มคลัง 20 ระบบอัตโนมัติ Google Apps Script ช่วยลดภาระงานครูและโรงเรียนไทย, กลุ่ม Telegram ติวสอบครูผู้ช่วยพร้อมเพลงช่วยจำ Suno, คลังเพลงลิขสิทธิ์ และสื่อการสอน AI พัฒนาโดย ครูจิรวัฒน์ เดชเส้ง (ครูอ้น ค.ศ.2 รร.หาดใหญ่วิทยาลัย)",
  keywords: [
    "AiAon Tech",
    "ไอทีง่ายๆ สไตล์ไอ้อ้น",
    "ครูอ้น",
    "จิรวัฒน์ เดชเส้ง",
    "Google Apps Script",
    "ระบบเช็คชื่อนักเรียน",
    "ระบบตรวจเครื่องแต่งกาย",
    "ระบบบริหารยานพาหนะ",
    "ระบบเกียรติบัตร QR",
    "เพลงจำข้อสอบครูผู้ช่วย",
    "ติวสอบครูผู้ช่วย",
    "AiAon Prep",
    "ว.PA 15 ตัวชี้วัด",
    "เว็บพอร์ต TCAS 3D",
    "เพลงลิขสิทธิ์",
    "เสียงตามสายโรงเรียน",
    "AI เพื่อการศึกษา",
  ],
  authors: [{ name: "นายจิรวัฒน์ เดชเส้ง (ครูอ้น)", url: "https://www.aiaon.tech" }],
  creator: "นายจิรวัฒน์ เดชเส้ง (ครูอ้น ญ.ว.)",
  publisher: "AiAon Tech Ecosystem",
  openGraph: {
    title: "AiAon Tech — คลังระบบ Google Apps Script & สื่อการสอน AI โดย ครูอ้น",
    description:
      "เสกงานเอกสารโรงเรียน & งานเรียนให้เสร็จในคลิกเดียว ด้วย 20 ระบบ Google Apps Script สำเร็จรูป, กลุ่มติวสอบครูผู้ช่วย, คลังเพลงลิขสิทธิ์ และสื่อการสอน AI ไม่มีรายเดือน",
    url: "https://www.aiaon.tech",
    siteName: "AiAon Tech Ecosystem",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AiAon Tech — คลังระบบ Google Apps Script & สื่อการสอน AI โดย ครูอ้น",
    description:
      "เสกงานเอกสารโรงเรียน & งานเรียนให้เสร็จในคลิกเดียว ด้วย 20 ระบบ Google Apps Script สำเร็จรูป, กลุ่มติวสอบครูผู้ช่วย และสื่อการสอน AI",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // NOTE: Auth state is resolved client-side inside <Navbar /> so this layout
  // never reads cookies and public pages can be statically cached on the CDN.

  // --- สวิตช์ไฟควบคุมโหมดปิดปรับปรุง ---
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

  return (
    <html
      lang="th"
      className={cn("dark", prompt.variable, geist.variable)}
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${prompt.variable} antialiased font-prompt flex flex-col min-h-screen relative`}
        suppressHydrationWarning
      >
        <BrandThemeProvider>
          <LineModalProvider>
          <CommandMenuProvider>
          <MarketingPixels />

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
              <div data-bg-grid="" className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <MouseGlowGrid />

                {/* Global Ambient Lights — gently animated */}
                <div className="ambient-light-primary w-[600px] h-[600px] top-[-200px] left-[-150px] opacity-70" />
                <div className="ambient-light-secondary w-[500px] h-[500px] top-[20%] right-[-120px] opacity-60" />
                {/* Subtle third orb at bottom for depth */}
                <div className="absolute rounded-full blur-[140px] bg-blue-600/10 pointer-events-none w-[400px] h-[400px] bottom-[-100px] left-1/2 -translate-x-1/2" />
              </div>

              {/* --- Navbar --- */}
              <Navbar />
              <ThemeToggle />
              <FloatingLINEButton />
              <MobileStickyActionBar />

              {/* --- Main Content --- */}
              <main className="grow pt-4 md:pt-8 pb-20 lg:pb-0 relative z-10">
                {children}
              </main>

              {/* ============================================================
                  FOOTER — Warm Premium Editorial V2.0
              ============================================================ */}
              <footer
                id="footer"
                data-aiaon-shell=""
                className="border-t border-[#E2E8F0] bg-[#F8FAFC] text-[#1E293B] mt-24 py-14 relative overflow-hidden z-10"
              >
                <div className="max-w-[1240px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-left relative z-10 w-full">
                  {/* Brand */}
                  <div className="space-y-3.5 md:col-span-1">
                    <a href="/" aria-label="AiAon Tech" className="inline-block">
                      <img
                        src="/brand/svg/aiaon-tech_lockup_tagline_fullcolor-on-light.svg"
                        alt="AiAon Tech — Intelligent Technology. More Human Life."
                        className="h-11 w-auto"
                      />
                    </a>
                    <p className="text-[#475569] text-sm font-prompt leading-relaxed">
                      สตูดิโอนวัตกรรม สื่อการสอน และงานดนตรี โดย ครูอ้น (Teacher · Musician · Maker)
                    </p>
                  </div>

                  {/* 4-Pillar Quick Links */}
                  <div className="space-y-3">
                    <h3 className="text-[#0F172A] font-bold font-prompt text-sm uppercase tracking-wider">
                      Ecosystem Pillars
                    </h3>
                    <ul className="space-y-2 text-[#475569] text-sm font-prompt">
                      <li><a href="/digital-vault" className="hover:text-[#2563EB] transition-colors">01 คลังระบบโรงเรียน (Digital Vault)</a></li>
                      <li><a href="/krurank" className="hover:text-[#2563EB] transition-colors">01 ทำเนียบครูผู้ช่วย (KruRank AI)</a></li>
                      <li><a href="/edu" className="hover:text-[#92400E] font-medium text-[#0F172A] transition-colors">02 สื่อเด็กเล็ก Hybrid QR (AiAon Edu-Verse)</a></li>
                      <li><a href="/ebooks" className="hover:text-[#92400E] transition-colors">02 คลัง E-Book ครูไทย &amp; ติวสอบ</a></li>
                      <li><a href="/line-stickers" className="hover:text-[#6D28D9] transition-colors">03 สติกเกอร์ LINE 3D &amp; อิโมจิ (AiAon Studio)</a></li>
                      <li><a href="/music-store" className="hover:text-[#0F766E] transition-colors">03 ร้านเพลงช่วยจำ &amp; BGM (AiAon Audio)</a></li>
                    </ul>
                  </div>

                  {/* Resources & Legal */}
                  <div className="space-y-3">
                    <h3 className="text-[#0F172A] font-bold font-prompt text-sm uppercase tracking-wider">
                      คลัง &amp; นโยบาย
                    </h3>
                    <ul className="space-y-2 text-[#475569] text-sm font-prompt">
                      <li><a href="/bundles" className="hover:text-[#2563EB] transition-colors">แพ็กเกจเหมาสุดคุ้ม (Bundles)</a></li>
                      <li><a href="/freebies" className="hover:text-[#92400E] transition-colors">ของแจกฟรี (Freebies)</a></li>
                      <li><a href="/about" className="hover:text-[#0F172A] transition-colors">เกี่ยวกับครูอ้น (About AiAon)</a></li>
                      <li><a href="/brand/AiAon_Brand_Kit_v2.0.zip" download className="hover:text-[#2563EB] transition-colors">ดาวน์โหลด Brand Kit V2.0 (.ZIP)</a></li>
                      <li><a href="/terms" className="hover:text-[#0F172A] transition-colors">เงื่อนไขการใช้งาน (Terms)</a></li>
                      <li><a href="/privacy" className="hover:text-[#0F172A] transition-colors">นโยบายความเป็นส่วนตัว (PDPA)</a></li>
                      <li><a href="/refund" className="hover:text-[#0F172A] transition-colors">นโยบายการคืนเงิน (Refund)</a></li>
                    </ul>
                  </div>

                  {/* Social */}
                  <div className="space-y-3">
                    <h3 className="text-[#0F172A] font-bold font-prompt text-sm uppercase tracking-wider">
                      Connect With iAon
                    </h3>
                    <div className="flex gap-2.5">
                      <a
                        href="https://www.youtube.com/@aiaontech"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#475569] hover:text-red-600 hover:border-red-200 transition-all shadow-2xs"
                        title="YouTube"
                        aria-label="YouTube"
                      >
                        <FaYoutube className="w-5 h-5" />
                      </a>
                      <a
                        href="https://www.tiktok.com/@aiaontech"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#475569] hover:text-[#0F172A] hover:border-slate-300 transition-all shadow-2xs"
                        title="TikTok"
                        aria-label="TikTok"
                      >
                        <FaTiktok className="w-5 h-5" />
                      </a>
                      <a
                        href="https://www.facebook.com/iAontech"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#475569] hover:text-[#2563EB] hover:border-blue-200 transition-all shadow-2xs"
                        title="Facebook"
                        aria-label="Facebook"
                      >
                        <FaFacebook className="w-5 h-5" />
                      </a>
                      <a
                        href={getLineOrderUrl(
                          "สวัสดีครับครูอ้น ติดต่อสอบถามข้อมูลระบบดิจิทัล / เพลงลิขสิทธิ์ / บริการ AI จากเว็บไซต์ www.aiaon.tech ครับ 🙏"
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-[#06C755] text-[#052E16] hover:bg-[#05b34c] transition-all shadow-2xs"
                        title="LINE OA (@deu6776s)"
                        aria-label="LINE OA (@deu6776s)"
                      >
                        <FaLine className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Copyright & Legal Links Bar */}
                <div className="border-t border-[#E2E8F0] mt-10 pt-6 pb-20 pr-20 text-[#64748B] font-prompt text-xs relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 max-w-[1240px] mx-auto px-4 sm:px-6">
                  <p suppressHydrationWarning>
                    © {new Date().getFullYear()} AiAon Tech Ecosystem · One Universe, Different Worlds.
                  </p>
                  <div className="flex items-center gap-5">
                    <a href="/terms" className="hover:text-[#0F172A] transition-colors">เงื่อนไขการใช้งาน</a>
                    <span>•</span>
                    <a href="/privacy" className="hover:text-[#0F172A] transition-colors">PDPA</a>
                    <span>•</span>
                    <a href="/refund" className="hover:text-[#0F172A] transition-colors">นโยบายคืนเงิน</a>
                  </div>
                </div>
              </footer>
            </>
          )}

          </CommandMenuProvider>
          </LineModalProvider>
        </BrandThemeProvider>
      </body>
    </html>
  );
}
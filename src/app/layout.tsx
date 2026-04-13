import type { Metadata } from "next";
import { Inter, Prompt, Geist } from "next/font/google";
import "./globals.css";
import React from "react";
import { cn } from "@/lib/utils";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body className={`${inter.variable} ${prompt.variable} antialiased font-sans flex flex-col min-h-screen relative`}>
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 p-4">
          <div className="max-w-7xl mx-auto glass-panel rounded-full px-6 py-4 flex justify-between items-center w-full">
            <div className="text-xl font-prompt font-bold text-white tracking-widest uppercase">
              Influence<span className="text-blue-500">.Lab</span>
            </div>
            <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
              <span className="hover:text-white cursor-pointer transition-colors">Academy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Products</span>
              <span className="hover:text-white cursor-pointer transition-colors">SaaS Tools</span>
              <span className="hover:text-white cursor-pointer transition-colors">Consulting</span>
            </div>
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-2 rounded-full font-medium transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              Sign In
            </button>
          </div>
        </nav>

        {/* Global Ambient Lights */}
        <div className="ambient-light-primary w-[500px] h-[500px] top-[-200px] left-[-100px]" />
        <div className="ambient-light-secondary w-[400px] h-[400px] top-[20%] right-[-100px]" />

        {/* Main Content */}
        <main className="flex-grow pt-28">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-24 py-12 text-center text-white/40 font-prompt text-sm">
          <p>© {new Date().getFullYear()} Influence.Lab Ecosystem. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}

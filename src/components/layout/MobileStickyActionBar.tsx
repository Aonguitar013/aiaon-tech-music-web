"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Gift, Database, MessageCircle } from "lucide-react";
import { FaLine } from "react-icons/fa6";
import { useCommandMenu } from "@/components/command-menu/CommandMenuProvider";
import { getLineOrderUrl } from "@/lib/line";

export function MobileStickyActionBar() {
  const pathname = usePathname() || "/";
  const { open: openCommandMenu } = useCommandMenu();

  // Dynamic context-aware LINE CTA button config
  const lineConfig = useMemo(() => {
    if (pathname.startsWith("/ebooks")) {
      return {
        label: "สั่ง E-Book",
        message: "สวัสดีครับครูอ้น สนใจสั่งซื้อ E-Book สื่อการสอน AI ครับ รบกวนขอรายละเอียดและวิธีสั่งซื้อด้วยครับ 🙏",
      };
    }
    if (pathname.startsWith("/freebies")) {
      return {
        label: "รับไฟล์ฟรี",
        message: "สวัสดีครับครูอ้น ขอรับรหัสปลดล็อกและลิงก์ดาวน์โหลดคลังของแจกฟรี (Freebies) ครับ 🎁🙏",
      };
    }
    if (pathname.startsWith("/bundles")) {
      return {
        label: "สั่งแพ็กเกจ",
        message: "สวัสดีครับครูอ้น สนใจโปรโมชัน VIP Bundle Deals อยากปรึกษาแพ็กเกจเหมาที่เหมาะกับโรงเรียนครับ 🙏",
      };
    }
    if (pathname.startsWith("/student-vault")) {
      return {
        label: "สั่งทำพอร์ต",
        message: "สวัสดีครับครูอ้น สนใจบริการสร้างเว็บพอร์ตฟอลิโอ 3D TCAS สำหรับนักเรียนครับ 🙏",
      };
    }
    if (pathname.startsWith("/music-store") || pathname.startsWith("/music-templates")) {
      return {
        label: "สั่งเพลง AI",
        message: "สวัสดีครับครูอ้น สนใจสั่งซื้อเพลงลิขสิทธิ์ / เพลงช่วยจำสอบครูผู้ช่วย Suno AI ครับ 🎵🙏",
      };
    }
    if (pathname.startsWith("/teacher-prep")) {
      return {
        label: "สมัครติวสอบ",
        message: "สวัสดีครับครูอ้น สนใจสมัครเข้ากลุ่ม Telegram VIP ติวสอบครูผู้ช่วย AiAon Prep ครับ 🙏",
      };
    }
    if (pathname.startsWith("/services") || pathname.startsWith("/ai-caretaker")) {
      return {
        label: "จองคิว AI",
        message: "สวัสดีครับครูอ้น สนใจบริการ AI Caretaker / จ้างพัฒนาระบบพิเศษ ปรึกษาคิวติดตั้งครับ 🙏",
      };
    }
    if (pathname.startsWith("/saas") || pathname.startsWith("/digital-vault")) {
      return {
        label: "สั่งซื้อระบบ",
        message: "สวัสดีครับครูอ้น สนใจสั่งซื้อระบบ Google Apps Script จากคลัง Digital Vault ครับ 🙏",
      };
    }

    return {
      label: "ทักแชต LINE",
      message: "สวัสดีครับครูอ้น สนใจปรึกษาระบบอัตโนมัติ / นวัตกรรมโรงเรียน จากเว็บไซต์ aiaon.tech ครับ 🙏",
    };
  }, [pathname]);

  const lineHref = getLineOrderUrl(lineConfig.message);

  return (
    <aside
      aria-label="เมนูลัดบนมือถือ"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/92 backdrop-blur-2xl border-t border-white/10 px-3 py-2 shadow-[0_-8px_30px_rgba(0,0,0,0.85)] font-prompt print:hidden"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-1.5">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 active:scale-90 ${
            pathname === "/"
              ? "text-cyan-400 font-bold bg-cyan-500/10"
              : "text-white/60 hover:text-white"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">หน้าแรก</span>
        </Link>

        {/* 2. Quick Search (Command Menu Trigger) */}
        <button
          type="button"
          onClick={openCommandMenu}
          aria-label="ค้นหาด่วน (Ctrl+K)"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-white/60 hover:text-white transition-all duration-200 active:scale-90 cursor-pointer"
        >
          <div className="relative">
            <Search className="w-5 h-5 text-cyan-400" />
            <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-75" />
          </div>
          <span className="text-[10px] mt-0.5 text-cyan-300 font-medium">ค้นหา</span>
        </button>

        {/* 3. Freebies with FREE Badge */}
        <Link
          href="/freebies"
          className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 active:scale-90 ${
            pathname.startsWith("/freebies")
              ? "text-pink-400 font-bold bg-pink-500/10"
              : "text-white/60 hover:text-white"
          }`}
        >
          <div className="relative">
            <Gift className="w-5 h-5 text-pink-400" />
            <span className="absolute -top-1 -right-2 px-1 py-[0.5px] rounded-full text-[8px] font-black bg-pink-500 text-white shadow-[0_0_8px_rgba(236,72,153,0.8)]">
              FREE
            </span>
          </div>
          <span className="text-[10px] mt-0.5">แจกฟรี</span>
        </Link>

        {/* 4. Digital Vault */}
        <Link
          href="/digital-vault"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 active:scale-90 ${
            pathname.startsWith("/digital-vault") || pathname.startsWith("/saas")
              ? "text-blue-400 font-bold bg-blue-500/10"
              : "text-white/60 hover:text-white"
          }`}
        >
          <Database className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">20 ระบบ</span>
        </Link>

        {/* 5. High-Converting LINE OA CTA Button */}
        <a
          href={lineHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lineConfig.label}
          className="relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#06C755] to-emerald-500 hover:from-[#05b34c] hover:to-emerald-600 text-white font-bold text-xs shadow-[0_0_20px_rgba(6,199,85,0.4)] active:scale-95 transition-all duration-200 shrink-0 select-none ml-1 cursor-pointer"
        >
          {/* Online status indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <FaLine className="w-4 h-4 text-white" />
          <span className="whitespace-nowrap">{lineConfig.label}</span>
        </a>
      </div>
    </aside>
  );
}

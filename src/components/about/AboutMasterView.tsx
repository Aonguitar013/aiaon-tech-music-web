"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Copy,
  Check,
  MessageCircle,
  Store,
  Radio,
  Award,
  BadgeCheck,
  Calendar,
  Hash,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  GraduationCap,
  Rocket,
  Music,
  Guitar,
  Clock,
  ArrowRight,
  Send,
  Laptop,
  Download,
  Layers,
  Quote,
} from "lucide-react";
import { getLineOrderUrl } from "@/lib/line";

/* ============================================================
   TYPES & DATA (OFFICIAL AiAon BRAND V2.0 PROFILE)
============================================================ */

type DirectoryTab = "channels" | "stores" | "gear";
type GearCategory = "all" | "mobile" | "audio" | "pc";

interface PillarBrandItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  href: string;
  logoSrc: string;
  surfaceBg: string;
  borderClass: string;
  accentText: string;
  badge: string;
}

interface ChannelItem {
  id: string;
  platform: string;
  name: string;
  handle: string;
  role: string;
  schedule: string;
  url: string;
  badge: string;
  icon: string;
}

interface GearItem {
  id: string;
  name: string;
  category: GearCategory;
  roleInWorkflow: string;
  badge: string;
  tiktokShopUrl: string;
  shopeeUrl: string;
  lazadaUrl: string;
}

interface Certificate {
  id: string;
  imageSrc: string;
  title: string;
  issuer: string;
  credentialId: string;
  issueDate: string;
  category: string;
  categoryColor: string;
  verifyUrl?: string;
}

const FOUR_PILLARS: PillarBrandItem[] = [
  {
    id: "tech",
    number: "01",
    name: "AiAon Tech",
    tagline: "ระบบงานโรงเรียน 0-Baht, Google Apps Script & AI Caretaker",
    href: "/digital-vault",
    logoSrc: "/brand/svg/aiaon-tech_lockup_horizontal_fullcolor-on-light.svg",
    surfaceBg: "bg-[#F8FAFC]",
    borderClass: "border-[#BFDBFE] hover:border-[#2563EB]",
    accentText: "text-[#1D4ED8]",
    badge: "Precision Product Studio",
  },
  {
    id: "edu",
    number: "02",
    name: "AiAon Edu-Verse",
    tagline: "สื่อเด็กเล็ก Hybrid QR 6 โลกการเรียนรู้ & คลัง 30 E-Book ครูไทย",
    href: "/edu",
    logoSrc: "/brand/svg/aiaon-edu_lockup_horizontal_fullcolor-on-light.svg",
    surfaceBg: "bg-[#FFFDF7]",
    borderClass: "border-[#FDE68A] hover:border-[#F59E0B]",
    accentText: "text-[#92400E]",
    badge: "Warm Storybook",
  },
  {
    id: "audio",
    number: "03",
    name: "AiAon Audio",
    tagline: "เพลงช่วยจำกฎหมายครู & BGM คลิป ว.PA ปลอดลิขสิทธิ์ 100%",
    href: "/music-store",
    logoSrc: "/brand/svg/aiaon-audio_lockup_horizontal_fullcolor-on-light.svg",
    surfaceBg: "bg-[#F5FAF9]",
    borderClass: "border-[#99F6E4] hover:border-[#0D9488]",
    accentText: "text-[#0F766E]",
    badge: "Boutique Vinyl Studio",
  },
  {
    id: "studio",
    number: "04",
    name: "AiAon Studio",
    tagline: "โรงงานปั้นสติกเกอร์ LINE 3D จากรูปจริง & คลัง 30+ On Sale",
    href: "/line-stickers",
    logoSrc: "/brand/svg/aiaon-studio_lockup_horizontal_fullcolor-on-light.svg",
    surfaceBg: "bg-[#FAF8FF]",
    borderClass: "border-[#DDD6FE] hover:border-[#7C3AED]",
    accentText: "text-[#6D28D9]",
    badge: "Playful 3D Toy Gallery",
  },
];

const OFFICIAL_CHANNELS: ChannelItem[] = [
  {
    id: "fb-page",
    platform: "Facebook Page",
    name: "ไอทีง่ายๆ สไตล์ iAon",
    handle: "@iaontech",
    role: "ศูนย์กลางไลฟ์สดโชว์ระบบ AI ของจริง, คลิป Reels และรีวิวอุปกรณ์ทำงาน",
    schedule: "ไลฟ์สดทุกวันอังคาร 20:00 น.",
    url: "https://www.facebook.com/search/top?q=%E0%B9%84%E0%B8%AD%E0%B8%97%E0%B8%B5%E0%B8%87%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B9%86%20%E0%B8%AA%E0%B9%84%E0%B8%95%E0%B8%A5%E0%B9%8C%20iAon",
    badge: "MAIN HUB",
    icon: "🚩",
  },
  {
    id: "line-oa",
    platform: "LINE Official Account",
    name: "AiAon โดยครูอ้น",
    handle: "@deu6776s",
    role: "จุดรับลูกค้า ปรึกษาระบบ AI Caretaker, ส่งมอบงาน และติดต่อวิทยากร",
    schedule: "ตอบไวทุกวัน • มี AI ช่วยรับเรื่อง 24 ชม.",
    url: getLineOrderUrl(
      "สวัสดีครับครูอ้น สนใจปรึกษางานระบบ AI / วิทยากรบรรยาย หรือสอบถามข้อมูลครับ 🙏"
    ),
    badge: "OFFICIAL CONTACT",
    icon: "💬",
  },
  {
    id: "tiktok",
    platform: "TikTok",
    name: "iAonTech",
    handle: "@iaontech",
    role: "คลิปสั้น 60 วิ โชว์ระบบ AI แก้ปัญหางานจริง และป้ายยาแกดเจ็ตพร้อมตะกร้า",
    schedule: "จ. / พ. / ศ. 18:30 น.",
    url: "https://www.tiktok.com/@iaontech",
    badge: "SHORT VIDEO",
    icon: "🎵",
  },
  {
    id: "youtube",
    platform: "YouTube",
    name: "iAonTech / ไอทีง่ายๆ สไตล์ iAon",
    handle: "@iaontech",
    role: "คลิปยาวเจาะลึกเบื้องหลังการทำงานของระบบ AI และรีวิวอุปกรณ์แบบเต็มระบบ",
    schedule: "ทุกวันอาทิตย์ 19:00 น.",
    url: "https://www.youtube.com/@iaontech",
    badge: "DEEP DIVE",
    icon: "📺",
  },
  {
    id: "instagram",
    platform: "Instagram",
    name: "iAonTech",
    handle: "@iaontech",
    role: "แกลเลอรีจัดโต๊ะทำงาน Studio และคลิป Reels สั้นเข้าใจง่าย",
    schedule: "อัปเดตทุกวัน",
    url: "https://www.instagram.com/iaontech",
    badge: "VISUAL & REELS",
    icon: "📸",
  },
  {
    id: "threads",
    platform: "Threads",
    name: "Aon Jirawat | iAonTech",
    handle: "@iaontech",
    role: "สรุปทริคการใช้ AI ซื้อเวลาชีวิต อ่านจบไวใน 30 วินาที",
    schedule: "สรุปสั้นทุกวัน",
    url: "https://www.threads.net/@iaontech",
    badge: "QUICK INSIGHTS",
    icon: "🧵",
  },
  {
    id: "fb-personal",
    platform: "Facebook ส่วนตัว",
    name: "Aon Jirawat",
    handle: "เพื่อน 1,800+ คน",
    role: "เล่าเรื่องเบื้องหลังการสร้างระบบ และไลฟ์สไตล์ครูดนตรี ร.ร.หาดใหญ่วิทยาลัย",
    schedule: "สตอรี่ & โพสต์ทุกวัน",
    url: "https://www.facebook.com/search/top?q=Aon%20Jirawat",
    badge: "PERSONAL",
    icon: "📘",
  },
];

const GADGET_STORES = [
  {
    id: "tiktok-shop",
    platform: "TikTok Shop",
    storeName: "iAonTech Studio & Gadget",
    tagline: "กดตะกร้าหน้าช่อง @iAonTech พร้อมคูปองส่งฟรี",
    description:
      "รวมไมโครโฟน กล้องเว็บแคม ขาตั้งมือถือ และอุปกรณ์จัดโต๊ะคอมที่ครูอ้นใช้จริงในคลิปสั้นทุกชิ้น",
    url: "https://www.tiktok.com/@iaontech",
    badge: "ขายดีในคลิปสั้น",
    icon: "🎵",
  },
  {
    id: "shopee-store",
    platform: "Shopee & Shopee Video",
    storeName: "iAonTech Gadget",
    tagline: "ร้าน Official ของแท้ 100% + โค้ดลด Shopee Video",
    description:
      "เก็บโค้ดส่วนลดจากคลิปรีวิวสั้นก่อนกดสั่งซื้อไมค์ กล้อง และอุปกรณ์ไอทีชิ้นโปรด",
    url: "https://shopee.co.th/search?keyword=shure%20sm27",
    badge: "โค้ดลดคุ้มมาก",
    icon: "🧡",
  },
  {
    id: "lazada-store",
    platform: "Lazada",
    storeName: "iAonTech Official Select",
    tagline: "พิกัด LazMall ของแท้ประกันศูนย์ไทย",
    description:
      "เหมาะสำหรับสายช้อปแคมเปญใหญ่ ผ่อน 0% จอมอนิเตอร์ คอมพิวเตอร์ และสมาร์ตโฟน",
    url: "https://www.lazada.co.th/catalog/?q=logitech+streamcam",
    badge: "LazMall ประกันศูนย์",
    icon: "💙",
  },
];

const STUDIO_GEAR_ITEMS: GearItem[] = [
  {
    id: "iphone-17-pm",
    name: "iPhone 17 Pro Max 256GB",
    category: "mobile",
    roleInWorkflow: "รับแจ้งเตือน Telegram ระบบ AI 24 ชม., ถ่ายคลิปสั้น และรีโมตงานนอกสถานที่",
    badge: "ใช้ทุกวัน 24 ชม.",
    tiktokShopUrl: "https://www.tiktok.com/@iaontech",
    shopeeUrl: "https://shopee.co.th/search?keyword=iphone%2017%20pro%20max",
    lazadaUrl: "https://www.lazada.co.th/catalog/?q=iphone+17+pro+max",
  },
  {
    id: "shure-sm27",
    name: "SHURE SM27 + Steinberg UR44",
    category: "audio",
    roleInWorkflow: "พูดไลฟ์สดทุกคืนวันอังคาร, อัดเสียงคลิปสั้น และสั่งงาน AI ด้วยเสียงไทยคมชัด",
    badge: "เสียงระดับสตูดิโอ",
    tiktokShopUrl: "https://www.tiktok.com/@iaontech",
    shopeeUrl: "https://shopee.co.th/search?keyword=shure%20sm27",
    lazadaUrl: "https://www.lazada.co.th/catalog/?q=shure+sm27",
  },
  {
    id: "logitech-streamcam",
    name: "Logitech StreamCam (1080p 60fps)",
    category: "audio",
    roleInWorkflow: "ไลฟ์สดเพจ 'ไอทีง่ายๆ สไตล์ iAon' และอัดคลิปสอนระบบคู่หน้าจอคอม",
    badge: "ภาพลื่น 60fps",
    tiktokShopUrl: "https://www.tiktok.com/@iaontech",
    shopeeUrl: "https://shopee.co.th/search?keyword=logitech%20streamcam",
    lazadaUrl: "https://www.lazada.co.th/catalog/?q=logitech+streamcam",
  },
  {
    id: "rtx5060-pc",
    name: "PC i7-14700F + RTX 5060 + 32GB DDR5",
    category: "pc",
    roleInWorkflow: "ศูนย์บัญชาการหลัก รัน AI Agents, ตัดต่อวิดีโอ และพัฒนาระบบให้ลูกค้า",
    badge: "เครื่องหลักสตูดิโอ",
    tiktokShopUrl: "https://www.tiktok.com/@iaontech",
    shopeeUrl: "https://shopee.co.th/search?keyword=rtx%205060",
    lazadaUrl: "https://www.lazada.co.th/catalog/?q=rtx+5060",
  },
  {
    id: "acer-nitro",
    name: "Acer Nitro NL16 (i5-13420H + RTX 3050)",
    category: "pc",
    roleInWorkflow: "พกไปทำงานที่ ร.ร.หาดใหญ่วิทยาลัย และขึ้นเวทีวิทยากรอบรม AI นอกสถานที่",
    badge: "พกพาสายวิทยากร",
    tiktokShopUrl: "https://www.tiktok.com/@iaontech",
    shopeeUrl: "https://shopee.co.th/search?keyword=acer%20nitro%2016",
    lazadaUrl: "https://www.lazada.co.th/catalog/?q=acer+nitro+16",
  },
  {
    id: "ipad-pro",
    name: "iPad Pro 11\" Cellular + Keyboard",
    category: "mobile",
    roleInWorkflow: "เปิดโพยสคริปต์ไลฟ์สด และตรวจแดชบอร์ดลูกค้าแบบพกพาได้ทุกที่",
    badge: "คล่องตัวสุดๆ",
    tiktokShopUrl: "https://www.tiktok.com/@iaontech",
    shopeeUrl: "https://shopee.co.th/search?keyword=ipad%20pro%2011",
    lazadaUrl: "https://www.lazada.co.th/catalog/?q=ipad+pro+11",
  },
];

const CERTIFICATES: Certificate[] = [
  {
    id: "cert-google-ai",
    imageSrc: "/images/cert-google-ai.png",
    title: "Introduction to AI",
    issuer: "Google · Coursera",
    credentialId: "WF5PYDSIAA55",
    issueDate: "Apr 13, 2026",
    category: "AI & Machine Learning",
    categoryColor: "text-[#1D4ED8] bg-[#EFF6FF] border-[#BFDBFE]",
    verifyUrl: "https://coursera.org/verify/WF5PYDSIAA55",
  },
  {
    id: "cert-canva-ai",
    imageSrc: "/images/cert-canva-ai.png",
    title: "Work Smarter with AI",
    issuer: "Canva Design School",
    credentialId: "e73e41",
    issueDate: "June 13, 2026",
    category: "AI & Design",
    categoryColor: "text-[#6D28D9] bg-[#F5F3FF] border-[#DDD6FE]",
  },
  {
    id: "cert-workspace-ai",
    imageSrc: "/images/cert-workspace-ai.png",
    title: "AI FOR DIGITAL INNOVATION",
    issuer: "Workspace Thailand",
    credentialId: "CERT202606130001",
    issueDate: "June 13, 2026",
    category: "AI & Innovation",
    categoryColor: "text-[#0F766E] bg-[#F0FDFA] border-[#99F6E4]",
    verifyUrl: "https://www.workspace.in.th",
  },
];

/* ============================================================
   MAIN COMPONENT: AboutMasterView (Editorial Magazine Profile)
============================================================ */

export function AboutMasterView() {
  const [activeTab, setActiveTab] = useState<DirectoryTab>("channels");
  const [selectedGearCat, setSelectedGearCat] = useState<GearCategory>("all");
  const [copiedBioLink, setCopiedBioLink] = useState(false);
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);

  // Compact ROI Calculator States
  const [students, setStudents] = useState(35);
  const [timePerStudent, setTimePerStudent] = useState(15);
  const [reportHours, setReportHours] = useState(8);

  const termTimeSavedHours = Math.round(
    (students * timePerStudent * 100) / 3600 + reportHours
  );
  const equivalentSleepDays = (termTimeSavedHours / 8).toFixed(1);

  const filteredGear =
    selectedGearCat === "all"
      ? STUDIO_GEAR_ITEMS
      : STUDIO_GEAR_ITEMS.filter((item) => item.category === selectedGearCat);

  const handleCopyBioUrl = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText("https://www.aiaon.tech/about");
      setCopiedBioLink(true);
      setTimeout(() => setCopiedBioLink(false), 2500);
    }
  };

  const handlePrevCert = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedCertIndex === null) return;
    setSelectedCertIndex(
      (prev) => (prev !== null ? (prev - 1 + CERTIFICATES.length) % CERTIFICATES.length : null)
    );
  };

  const handleNextCert = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedCertIndex === null) return;
    setSelectedCertIndex(
      (prev) => (prev !== null ? (prev + 1) % CERTIFICATES.length : null)
    );
  };

  useEffect(() => {
    if (selectedCertIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCertIndex(null);
      else if (e.key === "ArrowLeft") handlePrevCert();
      else if (e.key === "ArrowRight") handleNextCert();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedCertIndex]);

  const activeCert = selectedCertIndex !== null ? CERTIFICATES[selectedCertIndex] : null;

  return (
    <div className="w-full min-h-screen pb-24 font-prompt text-[#1E293B] overflow-x-clip">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-16">
        {/* ══════════════════════════════════════════════════════
            STICKY EDITORIAL JUMP BAR
        ══════════════════════════════════════════════════════ */}
        <div className="flex justify-center sticky top-20 z-30">
          <nav
            aria-label="สารบัญหน้าเกี่ยวกับเรา"
            className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-xs overflow-x-auto max-w-full scrollbar-none"
          >
            {[
              { href: "#identity", label: "เรื่องราว" },
              { href: "#philosophy", label: "ปรัชญา" },
              { href: "#brand-ecosystem", label: "4 เสา & Brand Kit" },
              { href: "#certificates", label: "ใบรับรอง AI" },
              { href: "#channels", label: "ช่องทาง & อุปกรณ์" },
              { href: "#contact", label: "ติดต่องาน" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="min-h-[36px] inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* ══════════════════════════════════════════════════════
            BLOCK 1: EDITORIAL MAGAZINE COVER HERO (#identity)
        ══════════════════════════════════════════════════════ */}
        <section id="identity" className="scroll-mt-28">
          <div className="rounded-[28px] bg-white border border-[#E2E8F0] shadow-[0_8px_22px_rgba(15,23,42,0.04)] p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Editorial Portrait Column */}
              <div className="lg:col-span-4 flex flex-col items-center">
                <div className="relative w-56 h-64 sm:w-64 sm:h-72 rounded-3xl overflow-hidden border border-[#E2E8F0] bg-[#F8FAFC] shadow-sm">
                  <Image
                    src="/me.png"
                    alt="ครูอ้น จิรวัฒน์ เดชเส้ง — ผู้ก่อตั้ง AiAon"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 224px, 256px"
                    priority
                  />
                  <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#E2E8F0] px-3 py-2 text-center shadow-xs">
                    <div className="text-xs font-extrabold text-[#0F172A]">
                      ครูอ้น • จิรวัฒน์ เดชเส้ง
                    </div>
                    <div className="text-[11px] font-medium text-[#475569]">
                      ครู ค.ศ.2 ดนตรีสากล • ร.ร.หาดใหญ่วิทยาลัย
                    </div>
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>พร้อมรับบรรยาย &amp; วางระบบ AI</span>
                </div>
              </div>

              {/* Magazine Masthead Copy */}
              <div className="lg:col-span-8 min-w-0 text-center lg:text-left space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-bold tracking-wider uppercase">
                  <span>THE STORY OF AiAON • TEACHER · MUSICIAN · MAKER</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.16]">
                  เมื่อคนขี้เกียจทำงานเอกสาร{" "}
                  <span className="text-[#2563EB]">เสกโค้ดให้คอมทำงานแทน</span>
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-[#475569] leading-relaxed">
                  ผม <strong className="text-[#0F172A]">ครูอ้น (จิรวัฒน์ เดชเส้ง)</strong>{" "}
                  ข้าราชการครู ค.ศ.2 ดนตรีสากล โรงเรียนหาดใหญ่วิทยาลัย จังหวัดสงขลา
                  ผู้ก่อตั้งระบบนิเวศ <strong className="text-[#0F172A]">AiAon</strong>{" "}
                  ที่นำพลังของ Google Apps Script, AI Automation และงานออกแบบสื่อการสอนมาเปลี่ยนภาระงานซ้ำซาก
                  ให้กลายเป็นเวลาคุณภาพสำหรับห้องเรียนและชีวิตจริง
                </p>

                {/* Role Chips */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {[
                    { icon: GraduationCap, label: "ครู ค.ศ.2 ดนตรีสากล (ญ.ว.)", tone: "text-[#1D4ED8]" },
                    { icon: Rocket, label: "Smart School 0-Baht Architect", tone: "text-[#0F766E]" },
                    { icon: Music, label: "Music Producer & BGM", tone: "text-[#B45309]" },
                    { icon: Guitar, label: "วิทยากร Generative AI", tone: "text-[#6D28D9]" },
                  ].map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#334155]"
                    >
                      <tag.icon className={`w-3.5 h-3.5 shrink-0 ${tag.tone}`} />
                      <span>{tag.label}</span>
                    </span>
                  ))}
                </div>

                {/* Primary Actions */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                  <a
                    href={getLineOrderUrl(
                      "สวัสดีครับครูอ้น ติดต่อจากหน้าเกี่ยวกับเรา สนใจปรึกษาเรื่องระบบ AI / วิทยากรบรรยาย ครับ 🙏"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-extrabold text-sm transition shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>ทัก LINE OA (@deu6776s)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyBioUrl}
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#E2E8F0] hover:border-[#BFDBFE] text-[#0F172A] text-sm font-bold transition cursor-pointer"
                  >
                    {copiedBioLink ? (
                      <>
                        <Check className="w-4 h-4 text-[#059669]" />
                        <span className="text-[#059669]">คัดลอกลิงก์แล้ว!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#2563EB]" />
                        <span>แชร์หน้าแนะนำตัว</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            BLOCK 2: CREATIVE LAZINESS PHILOSOPHY (#philosophy)
        ══════════════════════════════════════════════════════ */}
        <section id="philosophy" className="scroll-mt-28">
          <div className="rounded-[28px] bg-white border border-[#E2E8F0] shadow-[0_8px_22px_rgba(15,23,42,0.04)] p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1D4ED8] mb-3">
                  <Quote className="w-4 h-4" />
                  <span>Creative Laziness Philosophy</span>
                </div>
                <blockquote className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] leading-snug">
                  “ให้ระบบทำงานแทนคุณ แล้วเอาเวลาไปใช้ชีวิตนะครับ”
                </blockquote>
                <p className="text-sm text-[#64748B] mt-3 leading-relaxed">
                  เพราะเทคโนโลยีที่ดีที่สุดไม่ใช่ระบบที่ซับซ้อนที่สุด แต่คือระบบที่ลดแรงเสียดทานและคืนเวลาให้มนุษย์ได้มากที่สุด
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    num: "01",
                    title: "0-Baht & Lean",
                    desc: "ออกแบบบนเครื่องมือที่โรงเรียนมีอยู่แล้ว เช่น Google Workspace ไม่ต้องเสียค่าเซิร์ฟเวอร์รายเดือน",
                  },
                  {
                    num: "02",
                    title: "Real Classroom Tested",
                    desc: "ทุกระบบและทุก E-Book ผ่านการใช้งานจริงในโรงเรียนกับนักเรียนกว่า 279 คนก่อนเปิดแบ่งปัน",
                  },
                  {
                    num: "03",
                    title: "Zero-Friction UX",
                    desc: "กดใช้งานง่ายบนมือถือ ไม่ต้องเก่งโค้ด มีคู่มือและไฟล์แม่แบบพร้อมเริ่มต้นใน 3 นาที",
                  },
                ].map((p) => (
                  <div
                    key={p.num}
                    className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-5 flex flex-col gap-2"
                  >
                    <span className="text-xs font-black text-[#2563EB] tracking-wider">
                      {p.num}
                    </span>
                    <h3 className="text-sm font-extrabold text-[#0F172A]">{p.title}</h3>
                    <p className="text-xs text-[#475569] leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            BLOCK 3: OFFICIAL 4-PILLAR ECOSYSTEM & BRAND KIT V2.0
        ══════════════════════════════════════════════════════ */}
        <section id="brand-ecosystem" className="scroll-mt-28 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1D4ED8] mb-1.5">
                <Layers className="w-4 h-4" />
                <span>AiAon Brand Ecosystem V2.0</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                4 เสาหลักของจักรวาล AiAon
              </h2>
            </div>
            <p className="text-sm text-[#475569] max-w-md md:text-right">
              ระบบอัตลักษณ์แบบ 4-Room Territory Tinting ที่รวมเทคโนโลยี สื่อการสอน ดนตรี และงานสร้างสรรค์ 3D ไว้ภายใต้บ้านหลังเดียว
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FOUR_PILLARS.map((pillar) => (
              <Link
                key={pillar.id}
                href={pillar.href}
                className={`group rounded-3xl ${pillar.surfaceBg} border ${pillar.borderClass} p-5 flex flex-col justify-between transition-all duration-300 shadow-[0_8px_22px_rgba(15,23,42,0.04)] hover:shadow-md hover:-translate-y-1 min-w-0`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-xs font-black ${pillar.accentText}`}>
                      {pillar.number}
                    </span>
                    <span className="text-[11px] font-semibold text-[#64748B] truncate">
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Official Outlined SVG Lockup */}
                  <div className="h-14 w-full rounded-2xl bg-white border border-[#E2E8F0] px-3.5 py-2.5 flex items-center justify-center mb-4">
                    <img
                      src={pillar.logoSrc}
                      alt={`โลโก้ทางการ ${pillar.name}`}
                      className="max-h-9 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>

                  <p className="text-xs text-[#475569] leading-relaxed mb-4">
                    {pillar.tagline}
                  </p>
                </div>

                <div
                  className={`inline-flex items-center gap-1.5 text-xs font-extrabold ${pillar.accentText}`}
                >
                  <span>สำรวจ {pillar.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* Official Brand Kit V2.0 Press & Download Bar */}
          <div className="rounded-3xl bg-white border border-[#BFDBFE] p-6 sm:p-7 shadow-[0_8px_22px_rgba(15,23,42,0.04)] flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-1.5 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-[11px] font-bold">
                <Sparkles className="w-3 h-3" />
                <span>OFFICIAL PRESS &amp; MEDIA KIT V2.0</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A]">
                ดาวน์โหลด AiAon Brand Kit V2.0 (.ZIP)
              </h3>
              <p className="text-xs sm:text-sm text-[#475569]">
                รวมไฟล์โลโก้ Outlined SVG (32 ไฟล์), Transparent PNG ความละเอียด 2400px และ App Icons ครบทั้ง 4 เสา สำหรับสื่อประชาสัมพันธ์และหน่วยงานที่เชิญบรรยาย
              </p>
            </div>

            <a
              href="/brand/AiAon_Brand_Kit_v2.0.zip"
              download="AiAon_Brand_Kit_v2.0.zip"
              className="min-h-[46px] px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-bold inline-flex items-center justify-center gap-2 transition shadow-xs shrink-0 w-full md:w-auto"
            >
              <Download className="w-4 h-4" />
              <span>ดาวน์โหลด Brand Kit V2.0</span>
            </a>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            BLOCK 4: VERIFIED AI CREDENTIALS (#certificates)
        ══════════════════════════════════════════════════════ */}
        <section id="certificates" className="scroll-mt-28 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B45309] mb-1.5">
                <Award className="w-4 h-4" />
                <span>Verified AI Credentials</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                ใบประกาศนียบัตร &amp; ความเชี่ยวชาญด้าน AI
              </h2>
            </div>
            <p className="text-sm text-[#475569]">
              คลิกที่ใบประกาศนียบัตรเพื่อขยายดูรายละเอียดเต็มจอ
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATES.map((cert, index) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCertIndex(index)}
                className="group rounded-3xl border border-[#E2E8F0] bg-white overflow-hidden cursor-pointer transition-all duration-300 shadow-[0_8px_22px_rgba(15,23,42,0.04)] hover:border-[#2563EB]/50 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#F8FAFC]">
                  <Image
                    src={cert.imageSrc}
                    alt={cert.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#0F172A]/35">
                    <div className="p-2.5 rounded-full bg-white text-[#0F172A] shadow-md">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${cert.categoryColor}`}
                    >
                      <BadgeCheck className="w-3 h-3" />
                      {cert.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <h3 className="text-base font-extrabold text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-[#475569] font-medium mt-1">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="border-t border-[#F1F5F9] pt-3 flex items-center justify-between text-xs text-[#64748B]">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#B45309]" />
                      {cert.issueDate}
                    </span>
                    <span className="font-mono font-semibold text-[#1D4ED8] truncate max-w-[130px]">
                      #{cert.credentialId}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            BLOCK 5: TABBED EDITORIAL DIRECTORY (#channels)
            (7 Official Channels | 3 Gadget Stores | Studio Gear)
        ══════════════════════════════════════════════════════ */}
        <section id="channels" className="scroll-mt-28">
          <div className="rounded-[28px] bg-white border border-[#E2E8F0] shadow-[0_8px_22px_rgba(15,23,42,0.04)] p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-7">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1D4ED8] mb-1.5">
                  <Radio className="w-4 h-4" />
                  <span>Official Directory &amp; Studio Setup</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                  ช่องทางทางการ หน้าร้านไอที และอุปกรณ์จริงบนโต๊ะครูอ้น
                </h2>
              </div>

              {/* 3 Clean Directory Tabs */}
              <div className="inline-flex flex-wrap gap-2 bg-[#F8FAFC] p-1.5 rounded-2xl border border-[#E2E8F0]">
                {[
                  { id: "channels" as DirectoryTab, icon: Radio, label: "7 ช่องทางหลัก" },
                  { id: "stores" as DirectoryTab, icon: Store, label: "3 หน้าร้านไอที" },
                  { id: "gear" as DirectoryTab, icon: Laptop, label: "อุปกรณ์จริง (6)" },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition cursor-pointer ${
                        active
                          ? "bg-[#0F172A] text-white shadow-xs"
                          : "text-[#475569] hover:text-[#0F172A] hover:bg-white"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TAB 1: 7 OFFICIAL CHANNELS */}
            {activeTab === "channels" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {OFFICIAL_CHANNELS.map((ch) => (
                  <a
                    key={ch.id}
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl bg-[#F8FAFC] hover:bg-[#EFF6FF]/60 border border-[#E2E8F0] hover:border-[#BFDBFE] p-5 flex flex-col justify-between transition"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-2xl">{ch.icon}</span>
                        <span className="text-[10px] font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-white border border-[#E2E8F0] text-[#475569]">
                          {ch.badge}
                        </span>
                      </div>
                      <div className="text-[11px] font-bold text-[#64748B]">
                        {ch.platform}
                      </div>
                      <h3 className="text-base font-extrabold text-[#0F172A] group-hover:text-[#1D4ED8] transition">
                        {ch.name}
                      </h3>
                      <div className="text-xs font-mono text-[#2563EB] mb-2">
                        {ch.handle}
                      </div>
                      <p className="text-xs text-[#475569] leading-relaxed mb-3">
                        {ch.role}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-[#0F172A]">
                      <span className="text-[11px] text-[#B45309] truncate pr-2">
                        {ch.schedule}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* TAB 2: 3 OFFICIAL GADGET STORES */}
            {activeTab === "stores" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {GADGET_STORES.map((store) => (
                  <div
                    key={store.id}
                    className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl">{store.icon}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FEF9EF] text-[#92400E] border border-[#FDE68A]">
                          {store.badge}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-[#64748B] uppercase">
                        {store.platform}
                      </div>
                      <h3 className="text-lg font-extrabold text-[#0F172A] mt-0.5 mb-1.5">
                        {store.storeName}
                      </h3>
                      <p className="text-xs font-semibold text-[#1D4ED8] mb-2">
                        {store.tagline}
                      </p>
                      <p className="text-xs text-[#475569] leading-relaxed mb-5">
                        {store.description}
                      </p>
                    </div>
                    <a
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold transition"
                    >
                      <span>ไปที่หน้าร้าน {store.platform}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: STUDIO GEAR CHECKLIST */}
            {activeTab === "gear" && (
              <div className="space-y-5">
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "all" as GearCategory, label: "ทั้งหมด (6)" },
                    { key: "mobile" as GearCategory, label: "📱 มือถือ & ไอแพด" },
                    { key: "audio" as GearCategory, label: "🎙️ ไมค์ & กล้อง" },
                    { key: "pc" as GearCategory, label: "💻 คอม & โน้ตบุ๊ก" },
                  ].map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setSelectedGearCat(cat.key)}
                      className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer ${
                        selectedGearCat === cat.key
                          ? "bg-[#1D4ED8] text-white border-[#1D4ED8]"
                          : "bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:text-[#0F172A]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredGear.map((gear) => (
                    <div
                      key={gear.id}
                      className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-5 flex flex-col justify-between gap-4"
                    >
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-[11px] font-bold mb-2.5">
                          {gear.badge}
                        </span>
                        <h3 className="text-sm sm:text-base font-extrabold text-[#0F172A] mb-1.5">
                          {gear.name}
                        </h3>
                        <p className="text-xs text-[#475569] leading-relaxed">
                          {gear.roleInWorkflow}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-[#E2E8F0]">
                        <a
                          href={gear.tiktokShopUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[36px] flex items-center justify-center rounded-lg bg-white hover:bg-cyan-50 border border-[#E2E8F0] text-[11px] font-bold text-[#0F172A] transition"
                        >
                          🎵 TikTok
                        </a>
                        <a
                          href={gear.shopeeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[36px] flex items-center justify-center rounded-lg bg-white hover:bg-orange-50 border border-[#E2E8F0] text-[11px] font-bold text-[#C2410C] transition"
                        >
                          🧡 Shopee
                        </a>
                        <a
                          href={gear.lazadaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[36px] flex items-center justify-center rounded-lg bg-white hover:bg-blue-50 border border-[#E2E8F0] text-[11px] font-bold text-[#1D4ED8] transition"
                        >
                          💙 Lazada
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            BLOCK 6: ROI CALCULATOR + SPEAKER & CONSULTING (#contact)
        ══════════════════════════════════════════════════════ */}
        <section id="contact" className="scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Compact Time-Saved Calculator */}
            <div className="lg:col-span-6 rounded-[28px] bg-white border border-[#E2E8F0] shadow-[0_8px_22px_rgba(15,23,42,0.04)] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1D4ED8] mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Smart School ROI Calculator</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mb-5">
                  ลองคำนวณเวลาที่ระบบช่วยซื้อคืนให้คุณครู
                </h2>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-1.5">
                      <span className="text-[#475569]">จำนวนนักเรียนต่อห้อง</span>
                      <span className="font-bold text-[#1D4ED8]">{students} คน</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={students}
                      onChange={(e) => setStudents(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-1.5">
                      <span className="text-[#475569]">เวลาเช็คชื่อ &amp; แจ้งเตือนเดิม (ต่อคน)</span>
                      <span className="font-bold text-[#1D4ED8]">{timePerStudent} วินาที</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="45"
                      value={timePerStudent}
                      onChange={(e) => setTimePerStudent(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-1.5">
                      <span className="text-[#475569]">เวลาทำรายงานสรุปต่อเทอม</span>
                      <span className="font-bold text-[#1D4ED8]">{reportHours} ชั่วโมง</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="30"
                      value={reportHours}
                      onChange={(e) => setReportHours(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] p-4 grid grid-cols-2 gap-4 text-center">
                <div className="border-r border-[#BFDBFE] pr-2">
                  <div className="text-[11px] font-semibold text-[#475569]">
                    ประหยัดได้ต่อภาคเรียน
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#1D4ED8]">
                    {termTimeSavedHours} ชม.
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#475569]">
                    คืนเวลานอนพักผ่อน
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0F766E]">
                    ~{equivalentSleepDays} วัน
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Speaker & Consulting Booking Card */}
            <div className="lg:col-span-6 rounded-[28px] bg-white border border-[#E2E8F0] shadow-[0_8px_22px_rgba(15,23,42,0.04)] p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SPEAKER &amp; CONSULTING</span>
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] leading-snug">
                  เชิญเป็นวิทยากร Workshop AI หรือวางระบบให้องค์กรของคุณ
                </h2>

                <p className="text-sm text-[#475569] leading-relaxed">
                  รับเชิญเป็นวิทยากรบรรยายเชิงปฏิบัติการ (Hands-on Workshop) ด้าน Generative AI เพื่อการศึกษา,
                  การสร้างระบบ Google Apps Script 0-Baht สำหรับสถานศึกษา และการวางระบบ Automation ให้ธุรกิจ SME
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-[#334155]">
                  {[
                    "Workshop ปฏิบัติจริง ได้ระบบกลับไปใช้ในโรงเรียนทันที",
                    "ให้คำปรึกษาออกแบบระบบ Custom Enterprise เฉพาะองค์กร",
                    "ออกหนังสือเชิญวิทยากรและเอกสารเบิกจ่ายได้ตามระเบียบราชการ",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 flex flex-wrap gap-3">
                <a
                  href={getLineOrderUrl(
                    "สวัสดีครับครูอ้น สนใจติดต่อเชิญเป็นวิทยากรบรรยาย / ปรึกษาระบบสำหรับองค์กรครับ 🙏"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[46px] flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-extrabold text-sm transition shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>นัดหมายผ่าน LINE OA</span>
                </a>
                <Link
                  href="/services"
                  className="min-h-[46px] inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#E2E8F0] text-[#0F172A] font-bold text-sm transition"
                >
                  <span>ดูบริการองค์กร</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════
          CERTIFICATE LIGHTBOX MODAL
      ══════════════════════════════════════════════════════ */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {activeCert && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCertIndex(null)}
                className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 md:p-8 bg-[#0F172A]/90 backdrop-blur-md select-none"
              >
                <button
                  type="button"
                  onClick={() => setSelectedCertIndex(null)}
                  className="absolute top-4 right-4 z-50 p-3 rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
                  aria-label="ปิดหน้าต่าง"
                >
                  <X className="w-5 h-5" />
                </button>

                {CERTIFICATES.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevCert}
                      className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20 transition cursor-pointer hidden sm:block"
                      aria-label="ใบรับรองก่อนหน้า"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextCert}
                      className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20 transition cursor-pointer hidden sm:block"
                      aria-label="ใบรับรองถัดไป"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <motion.div
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-4xl flex flex-col items-center gap-5"
                >
                  <div className="relative w-full aspect-[16/10] max-h-[65vh] rounded-2xl overflow-hidden border border-white/15 bg-white/5">
                    <Image
                      src={activeCert.imageSrc}
                      alt={activeCert.title}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 1280px) 100vw, 1024px"
                      priority
                    />
                  </div>

                  <div className="text-center space-y-2 text-white px-4">
                    <h3 className="text-lg sm:text-xl font-bold">{activeCert.title}</h3>
                    <p className="text-sm text-white/75">
                      {activeCert.issuer} • ออกเมื่อ {activeCert.issueDate} • ID:{" "}
                      <span className="font-mono">{activeCert.credentialId}</span>
                    </p>
                    {activeCert.verifyUrl && (
                      <a
                        href={activeCert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-300 hover:text-sky-200 underline underline-offset-4"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>ตรวจสอบใบรับรองออนไลน์</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

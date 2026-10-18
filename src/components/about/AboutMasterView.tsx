"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Copy,
  Check,
  MessageCircle,
  Store,
  Cpu,
  Radio,
  Globe,
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
  Smartphone,
  Bell,
  ArrowRight,
  UserCheck,
  Send,
  Sliders,
  Laptop,
} from "lucide-react";
import { getLineOrderUrl } from "@/lib/line";

/* ============================================================
   TYPES & DATA DEFINITIONS
============================================================ */

type GearCategory = "all" | "mobile" | "audio" | "pc";

interface ChannelCardItem {
  id: string;
  stepOrder: number;
  stepLabel: string;
  platform: string;
  name: string;
  handle: string;
  role: string;
  schedule: string;
  url: string;
  buttonText: string;
  badge: string;
  colorClass: string;
  borderClass: string;
  bgGlow: string;
  iconText: string;
}

interface GearItem {
  id: string;
  name: string;
  category: GearCategory;
  roleInWorkflow: string;
  whyKruAonLovesIt: string;
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

const OFFICIAL_CHANNELS: ChannelCardItem[] = [
  {
    id: "fb-page",
    stepOrder: 1,
    stepLabel: "ขั้นที่ 1 • หน้าร้านหลัก & ไลฟ์สดแม่พิมพ์",
    platform: "Facebook Page",
    name: "ไอทีง่ายๆ สไตล์ iAon",
    handle: "@iaontech",
    role: "ศูนย์กลางไลฟ์สดโชว์ระบบ AI ของจริง, ลงคลิป Reels สั้น และป้ายยาอุปกรณ์ไอทีที่ใช้ทำงานจริง",
    schedule: "🔴 ไลฟ์สดทุกวันอังคาร 20:00 น. • โพสต์ทุกวัน",
    url: "https://www.facebook.com/search/top?q=%E0%B9%84%E0%B8%AD%E0%B8%97%E0%B8%B5%E0%B8%87%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B9%86%20%E0%B8%AA%E0%B9%84%E0%B8%95%E0%B8%A5%E0%B9%8C%20iAon",
    buttonText: "ไปที่เพจ ไอทีง่ายๆ สไตล์ iAon",
    badge: "MAIN HUB",
    colorClass: "text-blue-400",
    borderClass: "border-blue-500/30 hover:border-blue-400/70",
    bgGlow: "from-blue-600/20 via-indigo-600/10 to-transparent",
    iconText: "🚩",
  },
  {
    id: "fb-personal",
    stepOrder: 2,
    stepLabel: "ขั้นที่ 2 • พื้นที่เล่าเรื่องชีวิตจริง & เพื่อนคุ้นเคย",
    platform: "Facebook ส่วนตัว",
    name: "Aon Jirawat",
    handle: "ฐานเพื่อน 1,800+ คน",
    role: "อัปเดตเรื่องเล่าเบื้องหลังการทำระบบ, ไลฟ์สไตล์ครูดนตรี ร.ร.หาดใหญ่วิทยาลัย และแชร์เคสลูกค้าจริง",
    schedule: "📱 อัปเดตสตอรี่ & โพสต์ทุกวัน",
    url: "https://www.facebook.com/search/top?q=Aon%20Jirawat",
    buttonText: "ส่องเฟซบุ๊ก Aon Jirawat",
    badge: "PERSONAL STORY",
    colorClass: "text-sky-400",
    borderClass: "border-sky-500/30 hover:border-sky-400/70",
    bgGlow: "from-sky-600/20 via-cyan-600/10 to-transparent",
    iconText: "📘",
  },
  {
    id: "instagram",
    stepOrder: 3,
    stepLabel: "ขั้นที่ 3 • แกลเลอรีจัดโต๊ะคอม & Reels อัตโนมัติ",
    platform: "Instagram",
    name: "iAonTech | ไอทีง่ายๆ สไตล์ iAon",
    handle: "@iaontech",
    role: "รวมภาพมุมโต๊ะทำงาน Studio, คลิป Reels สั้นเข้าใจง่าย และพอร์ตโฟลิโออุปกรณ์เทคโนโลยี",
    schedule: "📸 ซิงค์อัตโนมัติจากเพจหลักทุกวัน",
    url: "https://www.instagram.com/iaontech",
    buttonText: "ติดตาม IG @iaontech",
    badge: "VISUAL & REELS",
    colorClass: "text-pink-400",
    borderClass: "border-pink-500/30 hover:border-pink-400/70",
    bgGlow: "from-pink-600/20 via-purple-600/10 to-transparent",
    iconText: "📸",
  },
  {
    id: "threads",
    stepOrder: 4,
    stepLabel: "ขั้นที่ 4 • สรุปข่าวไว AI & ไอเดียสั้น 30 วิ",
    platform: "Threads / X",
    name: "Aon Jirawat | iAonTech",
    handle: "@iaontech",
    role: "ทริคสั้นๆ เรื่องการใช้ AI ซื้อเวลาชีวิต, อัปเดตเทรนด์เทคโนโลยีรายวัน อ่านจบไวใน 30 วินาที",
    schedule: "🧵 โพสต์สรุปสั้นทุกวัน",
    url: "https://www.threads.net/@iaontech",
    buttonText: "อ่านทริคบน Threads @iaontech",
    badge: "QUICK INSIGHTS",
    colorClass: "text-slate-200",
    borderClass: "border-slate-500/30 hover:border-slate-300/70",
    bgGlow: "from-slate-500/20 via-zinc-600/10 to-transparent",
    iconText: "🧵",
  },
  {
    id: "tiktok",
    stepOrder: 5,
    stepLabel: "ขั้นที่ 5 • คลิปสั้น 60 วิ โชว์ความเจ๋ง & ป้ายยา",
    platform: "TikTok",
    name: "iAonTech",
    handle: "@iaontech",
    role: "คลิปสั้นโชว์ระบบ AI ซ่อมตารางตัวเองใน 2 วิ, แก้ปัญหาธุรกิจ และรีวิวแกดเจ็ตพร้อมตะกร้าสินค้า",
    schedule: "🎬 ลงคลิปใหม่ทุก จันทร์ / พุธ / ศุกร์ 18:30 น.",
    url: "https://www.tiktok.com/@iaontech",
    buttonText: "ดูคลิปใน TikTok @iAonTech",
    badge: "SHORT VIDEO",
    colorClass: "text-cyan-400",
    borderClass: "border-cyan-500/30 hover:border-cyan-400/70",
    bgGlow: "from-cyan-500/20 via-rose-500/10 to-transparent",
    iconText: "🎵",
  },
  {
    id: "youtube",
    stepOrder: 6,
    stepLabel: "ขั้นที่ 6 • คลิปยาวเจาะลึก & คลังความรู้ถาวร",
    platform: "YouTube",
    name: "iAonTech / ไอทีง่ายๆ สไตล์ iAon",
    handle: "@iaontech",
    role: "คลิปยาว 8–10 นาที เจาะลึกเบื้องหลังการทำงานของระบบ AI, รีวิวอุปกรณ์แบบเต็มระบบ และ YouTube Shorts",
    schedule: "📺 คลิปยาวทุกวันอาทิตย์ 19:00 น.",
    url: "https://www.youtube.com/@iaontech",
    buttonText: "เปิดช่อง YouTube iAonTech",
    badge: "DEEP DIVE",
    colorClass: "text-red-400",
    borderClass: "border-red-500/30 hover:border-red-400/70",
    bgGlow: "from-red-600/20 via-orange-600/10 to-transparent",
    iconText: "📺",
  },
  {
    id: "line-oa",
    stepOrder: 7,
    stepLabel: "ขั้นที่ 7 • จุดรับลูกค้า ปิดการขาย & ส่งมอบงาน",
    platform: "LINE Official Account",
    name: "AiAon Tech โดยครูอ้น",
    handle: "@deu6776s",
    role: "ช่องทางหลักในการปรึกษาติดตั้งระบบ AI Caretaker รายเดือน, ส่งสลิปโอนเงิน, รับระบบ และติดต่อเชิญเป็นวิทยากร",
    schedule: "💬 ตอบกลับไวทุกวัน • มีระบบ AI ช่วยรับเรื่อง 24 ชม.",
    url: getLineOrderUrl(
      "สวัสดีครับครูอ้น สนใจปรึกษางานระบบ AI / วิทยากรบรรยาย หรือสอบถามข้อมูลครับ 🙏"
    ),
    buttonText: "แอด LINE OA @deu6776s ทันที",
    badge: "OFFICIAL CONTACT",
    colorClass: "text-emerald-400",
    borderClass: "border-emerald-500/40 hover:border-emerald-400",
    bgGlow: "from-emerald-500/25 via-teal-500/10 to-transparent",
    iconText: "💬",
  },
];

const GADGET_STORES = [
  {
    id: "tiktok-shop",
    platform: "TikTok Shop",
    storeName: "iAonTech Studio & Gadget",
    tagline: "กดตะกร้าหน้าช่อง TikTok @iAonTech พร้อมคูปองส่งฟรี",
    description:
      "รวมไมโครโฟน กล้องเว็บแคม ขาตั้งมือถือ และอุปกรณ์จัดโต๊ะคอมที่ครูอ้นใช้โชว์ในคลิปสั้นทุกชิ้น",
    url: "https://www.tiktok.com/@iaontech",
    buttonLabel: "เข้าสู่ TikTok Shop: iAonTech Studio & Gadget",
    badge: "ขายดีในคลิปสั้น",
    accent: "from-cyan-500 to-rose-500",
    border: "border-cyan-500/40 hover:border-cyan-400",
    icon: "🎵",
  },
  {
    id: "shopee-store",
    platform: "Shopee & Shopee Video",
    storeName: "iAonTech Gadget",
    tagline: "คัดเฉพาะร้าน Official ของแท้ 100% + โค้ดลด Shopee Video",
    description:
      "ดูคลิปรีวิวสั้นใน Shopee Video ของครูอ้นเพื่อเก็บโค้ดส่วนลด 30–50% ก่อนกดสั่งซื้ออุปกรณ์ไอทีชิ้นโปรด",
    url: "https://shopee.co.th/search?keyword=shure%20sm27",
    buttonLabel: "เข้าสู่ Shopee: iAonTech Gadget",
    badge: "โค้ดลด Shopee Video โหดมาก",
    accent: "from-orange-500 to-amber-500",
    border: "border-orange-500/40 hover:border-orange-400",
    icon: "🧡",
  },
  {
    id: "lazada-store",
    platform: "Lazada",
    storeName: "iAonTech Official Select",
    tagline: "พิกัด LazMall ของแท้ประกันศูนย์ไทย คัดโดยครูอ้น",
    description:
      "เหมาะสำหรับสายช้อปแคมเปญใหญ่ ดับเบิลเดย์ ผ่อน 0% อุปกรณ์คอมพิวเตอร์ จอมอนิเตอร์ และสมาร์ตโฟน",
    url: "https://www.lazada.co.th/catalog/?q=logitech+streamcam",
    buttonLabel: "เข้าสู่ Lazada: iAonTech Official Select",
    badge: "LazMall ประกันศูนย์",
    accent: "from-blue-500 to-indigo-600",
    border: "border-blue-500/40 hover:border-blue-400",
    icon: "💙",
  },
];

const STUDIO_GEAR_ITEMS: GearItem[] = [
  {
    id: "iphone-17-pm",
    name: "iPhone 17 Pro Max 256GB (คู่ใจครูอ้น)",
    category: "mobile",
    roleInWorkflow: "ใช้รับแจ้งเตือน Telegram ยามเฝ้าระบบ AI 24 ชม., ถ่ายคลิปมุมโต๊ะทำงาน และรีโมต AnyDesk",
    whyKruAonLovesIt: "กล้องถ่ายคลิปสั้นคมกริบ แบตอึด คุมระบบลูกค้าได้จากทุกที่แม้ตอนสอนดนตรีที่โรงเรียน",
    badge: "ใช้ทุกวัน 24 ชม.",
    tiktokShopUrl: "https://www.tiktok.com/@iaontech",
    shopeeUrl: "https://shopee.co.th/search?keyword=iphone%2017%20pro%20max",
    lazadaUrl: "https://www.lazada.co.th/catalog/?q=iphone+17+pro+max",
  },
  {
    id: "shure-sm27",
    name: "ไมค์คอนเดนเซอร์ SHURE SM27 + Steinberg UR44",
    category: "audio",
    roleInWorkflow: "ใช้พูดไลฟ์สดทุกคืนวันอังคาร, อัดเสียงคลิปสั้น และสั่งงาน AI ด้วยเสียงภาษาไทยแม่นยำ 100%",
    whyKruAonLovesIt: "เสียงนุ่ม หนา คมชัดระดับห้องอัดเพลง พูดนานแค่ไหนคนฟังก็ไม่ล้าหู และสั่งงาน AI พิมพ์ตามเป๊ะ",
    badge: "เสียงหล่อระดับสตูดิโอ",
    tiktokShopUrl: "https://www.tiktok.com/@iaontech",
    shopeeUrl: "https://shopee.co.th/search?keyword=shure%20sm27",
    lazadaUrl: "https://www.lazada.co.th/catalog/?q=shure+sm27",
  },
  {
    id: "logitech-streamcam",
    name: "กล้องเว็บแคม Logitech StreamCam (Full HD 60fps)",
    category: "audio",
    roleInWorkflow: "ใช้ไลฟ์สดบนเพจ 'ไอทีง่ายๆ สไตล์ iAon' และอัดคลิปสอนระบบแบบเห็นหน้าคู่กับหน้าจอคอม",
    whyKruAonLovesIt: "ภาพลื่น 60fps โฟกัสไวมาก เวลาหยิบมือถือหรือแกดเจ็ตขึ้นมาโชว์หน้ากล้อง ไม่เบลอเลย",
    badge: "ภาพคมชัด 60fps",
    tiktokShopUrl: "https://www.tiktok.com/@iaontech",
    shopeeUrl: "https://shopee.co.th/search?keyword=logitech%20streamcam",
    lazadaUrl: "https://www.lazada.co.th/catalog/?q=logitech+streamcam",
  },
  {
    id: "rtx5060-pc",
    name: "คอมตั้งโต๊ะ i7-14700F + RTX 5060 + RAM 32GB DDR5",
    category: "pc",
    roleInWorkflow: "ศูนย์บัญชาการหลักวันเสาร์ 10 โมงเช้า ใช้รัน Antigravity AI, ตัดคลิป และเซ็ตระบบให้ลูกค้า",
    whyKruAonLovesIt: "เปิด 20 หน้าต่างพร้อมไลฟ์สดและรัน AI ไปด้วยไม่มีสะดุดแม้แต่วินาทีเดียว",
    badge: "เครื่องหลักห้องบัญชาการ",
    tiktokShopUrl: "https://www.tiktok.com/@iaontech",
    shopeeUrl: "https://shopee.co.th/search?keyword=rtx%205060",
    lazadaUrl: "https://www.lazada.co.th/catalog/?q=rtx+5060",
  },
  {
    id: "acer-nitro",
    name: "โน้ตบุ๊กสายลุย Acer Nitro NL16 (i5-13420H + RTX 3050)",
    category: "pc",
    roleInWorkflow: "พกไปทำงานที่โรงเรียนหาดใหญ่วิทยาลัย และใช้ขึ้นเวทีตอนไปเป็นวิทยากรอบรม AI นอกสถานที่",
    whyKruAonLovesIt: "จอใหญ่ 16 นิ้ว การ์ดจอแยก พกไปสาธิตระบบให้ผู้บริหารหรือลูกค้าดูข้างนอกได้ลื่นไหล",
    badge: "พกพาสายวิทยากร",
    tiktokShopUrl: "https://www.tiktok.com/@iaontech",
    shopeeUrl: "https://shopee.co.th/search?keyword=acer%20nitro%2016",
    lazadaUrl: "https://www.lazada.co.th/catalog/?q=acer+nitro+16",
  },
  {
    id: "ipad-pro",
    name: "iPad Pro 11 นิ้ว (Cellular) + Smart Keyboard Folio",
    category: "mobile",
    roleInWorkflow: "ใช้เปิดโพยสคริปต์ตอนไลฟ์สดวันอังคาร และตรวจเช็กแดชบอร์ดลูกค้าแบบพกพาในร้านกาแฟ",
    whyKruAonLovesIt: "บางเบา เปิดปุ๊บติดปั๊บ ใส่ซิมเน็ตในตัว หยิบขึ้นมาเช็กระบบลูกค้าได้ทันทีไม่ต้องต่อ Wi-Fi",
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
    categoryColor: "text-blue-400",
    verifyUrl: "https://coursera.org/verify/WF5PYDSIAA55",
  },
  {
    id: "cert-canva-ai",
    imageSrc: "/images/cert-canva-ai.png",
    title: "Certificate of Completion: Work smarter with AI",
    issuer: "Canva Design School",
    credentialId: "e73e41",
    issueDate: "June 13, 2026",
    category: "AI & Design",
    categoryColor: "text-purple-400",
  },
  {
    id: "cert-workspace-ai",
    imageSrc: "/images/cert-workspace-ai.png",
    title: "AI FOR DIGITAL INNOVATION",
    issuer: "Workspace Thailand",
    credentialId: "CERT202606130001",
    issueDate: "June 13, 2026",
    category: "AI & Innovation",
    categoryColor: "text-cyan-400",
    verifyUrl: "https://www.workspace.in.th",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ============================================================
   MAIN COMPONENT: AboutMasterView
============================================================ */

export function AboutMasterView() {
  const [selectedGearCat, setSelectedGearCat] = useState<GearCategory>("all");
  const [copiedBioLink, setCopiedBioLink] = useState(false);
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);

  // Automation ROI Calculator States
  const [students, setStudents] = useState(35);
  const [timePerStudent, setTimePerStudent] = useState(15);
  const [reportHours, setReportHours] = useState(8);

  // Notification Demo Simulator States
  const [chatMessages, setChatMessages] = useState<Array<{ id: number; time: string; text: string }>>([
    { id: 1, time: "07:55", text: "🔔 ระบบเช็คชื่ออัตโนมัติ AiAon Tech พร้อมใช้งาน" },
  ]);
  const [isScanning, setIsScanning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const dailyTimeSavedSeconds = students * timePerStudent;
  const termTimeSavedHours = Math.round(
    (dailyTimeSavedSeconds * 100) / 3600 + reportHours
  );
  const equivalentSleepDays = (termTimeSavedHours / 8).toFixed(1);

  const triggerScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setShowAlert(false);

    setTimeout(() => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;
      const studentNames = [
        "เด็กชายภัทรพล",
        "เด็กหญิงนภัสสร",
        "เด็กชายธนากร",
        "เด็กหญิงกัญญารัตน์",
        "เด็กชายณัฐพงษ์",
      ];
      const randomName = studentNames[Math.floor(Math.random() * studentNames.length)];

      const newMsg = {
        id: Date.now(),
        time: timeStr,
        text: `📍 ${randomName} เช็คชื่อเข้าเรียนแล้ว (แจ้งเตือนผู้ปกครองทาง LINE เรียบร้อย)`,
      };

      setChatMessages((prev) => [...prev, newMsg]);
      setIsScanning(false);
      setShowAlert(true);

      setTimeout(() => setShowAlert(false), 4000);
    }, 800);
  };

  const filteredGear =
    selectedGearCat === "all"
      ? STUDIO_GEAR_ITEMS
      : STUDIO_GEAR_ITEMS.filter((item) => item.category === selectedGearCat);

  const handleCopyBioUrl = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText("https://www.aiaon.tech/about#channels");
      setCopiedBioLink(true);
      setTimeout(() => setCopiedBioLink(false), 2500);
    }
  };

  // Certificate Lightbox Nav
  const handlePrevCert = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedCertIndex === null) return;
    setSelectedCertIndex((prev) =>
      prev !== null ? (prev - 1 + CERTIFICATES.length) % CERTIFICATES.length : null
    );
  };

  const handleNextCert = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedCertIndex === null) return;
    setSelectedCertIndex((prev) =>
      prev !== null ? (prev + 1) % CERTIFICATES.length : null
    );
  };

  const handleCloseCert = () => {
    setSelectedCertIndex(null);
  };

  useEffect(() => {
    if (selectedCertIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseCert();
      else if (e.key === "ArrowLeft") handlePrevCert();
      else if (e.key === "ArrowRight") handleNextCert();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedCertIndex]);

  const activeCert = selectedCertIndex !== null ? CERTIFICATES[selectedCertIndex] : null;

  return (
    <div className="w-full relative overflow-hidden min-h-screen pb-28 font-prompt text-white">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[750px] h-[650px] bg-blue-600/12 blur-[190px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[700px] h-[700px] bg-purple-600/12 blur-[190px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 left-10 w-[650px] h-[650px] bg-cyan-600/10 blur-[190px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[650px] h-[650px] bg-amber-500/10 blur-[190px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,0.04) 1px,transparent 1px), linear-gradient(to bottom,rgba(255,255,255,0.04) 1px,transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 relative z-10 space-y-24">
        
        {/* ============================================================
           NAV PILLS (Quick Scroll Menu)
        ============================================================ */}
        <div className="w-full flex justify-center sticky top-20 z-40">
          <nav className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.6)] overflow-x-auto max-w-full no-scrollbar">
            <a
              href="#identity"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
            >
              👤 ประวัติครูอ้น
            </a>
            <a
              href="#channels"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-cyan-300 hover:text-white hover:bg-cyan-500/20 transition-all whitespace-nowrap"
            >
              📲 7 ช่องทางหลัก
            </a>
            <a
              href="#stores"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-300 hover:text-white hover:bg-amber-500/20 transition-all whitespace-nowrap"
            >
              🛒 3 หน้าร้านไอที
            </a>
            <a
              href="#gear"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-teal-300 hover:text-white hover:bg-teal-500/20 transition-all whitespace-nowrap"
            >
              🎧 โต๊ะทำงาน &amp; อุปกรณ์
            </a>
            <a
              href="#certificates"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-purple-300 hover:text-white hover:bg-purple-500/20 transition-all whitespace-nowrap"
            >
              🏆 ใบเซอร์ AI
            </a>
            <a
              href="#showcase"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-300 hover:text-white hover:bg-blue-500/20 transition-all whitespace-nowrap"
            >
              ⏱️ เครื่องคำนวณเวลา
            </a>
          </nav>
        </div>

        {/* ============================================================
           SECTION 1: HERO & IDENTITY (KRU AON'S STORY)
        ============================================================ */}
        <section id="identity" className="pt-2">
          <div className="glass-card relative rounded-3xl border border-white/15 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
            {/* Ambient Corner Highlights */}
            <div className="absolute -top-32 -left-10 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-32 -right-10 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center relative z-10">
              
              {/* Profile Avatar Card with Cyber Glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="shrink-0 flex flex-col items-center"
              >
                <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-3xl p-1.5 relative group">
                  <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-cyan-400 via-purple-500 to-amber-400 opacity-60 blur-md group-hover:opacity-90 transition-opacity" />
                  <div className="relative w-full h-full rounded-3xl bg-zinc-950 overflow-hidden border border-white/20 flex items-center justify-center">
                    <Image
                      src="/me.png"
                      alt="ครูอ้น จิรวัฒน์ เดชเส้ง - AiAon Tech"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 208px, 256px"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 text-center">
                      <span className="font-prompt text-xs font-bold text-white px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                        ครู ค.ศ.2 • ดนตรีสากล ญ.ว.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="font-prompt text-xs font-semibold text-emerald-400">
                    พร้อมรับบรรยาย &amp; ดูแลระบบ AI 24 ชม.
                  </span>
                </div>
              </motion.div>

              {/* Story & Philosophy Details */}
              <div className="flex-1 text-center lg:text-left space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-bold tracking-wide">
                  <UserCheck className="w-4 h-4 text-cyan-400" />
                  <span>ABOUT KRU AON • จิรวัฒน์ เดชเส้ง</span>
                </div>

                <h1 className="font-prompt text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  เมื่อคนขี้เกียจทำงานเอกสาร{" "}
                  <span className="block sm:inline bg-linear-to-r from-cyan-400 via-teal-300 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                    เสกโค้ดให้คอมทำงานแทน!
                  </span>
                </h1>

                <p className="font-prompt text-white/80 text-base sm:text-lg leading-relaxed">
                  สวัสดีครับ ผม <strong>ครูอ้น (จิรวัฒน์ เดชเส้ง)</strong> ข้าราชการครู ค.ศ.2 กลุ่มสาระการเรียนรู้ศิลปะ (ดนตรีสากล) โรงเรียนหาดใหญ่วิทยาลัย จังหวัดสงขลา ด้วยหัวใจที่รักในเสียงดนตรีและหลงใหลในโลกของเทคโนโลยี ผมจึงทุ่มเทเขียนโปรแกรมและสร้างสรรค์ระบบ <strong>Smart School Automation &amp; AI Caretaker</strong> ขึ้นมา เพื่อเปลี่ยนเวลาตรวจเอกสาร งานธุรการ และการตอบแชทที่ซ้ำซาก ให้กลายเป็นเวลาสอนเด็กๆ และเวลาใช้ชีวิตของพวกเราครับ
                </p>

                {/* Badge tags */}
                <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start pt-2">
                  {[
                    { icon: GraduationCap, text: "ข้าราชการครู ค.ศ.2 (ดนตรีสากล)", color: "text-blue-400" },
                    { icon: Rocket, text: "Google Apps Script & AI Automation", color: "text-cyan-400" },
                    { icon: Music, text: "เพลงช่วยจำ & BGM ปลอดลิขสิทธิ์", color: "text-pink-400" },
                    { icon: ShieldCheck, text: "AI Caretaker แอดมินเฝ้าร้าน 24 ชม.", color: "text-emerald-400" },
                    { icon: Guitar, text: "วิทยากรบรรยาย Generative AI", color: "text-amber-400" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-white/85 text-xs sm:text-sm hover:bg-white/10 transition-colors"
                    >
                      <item.icon className={`w-4 h-4 ${item.color} shrink-0`} />
                      <span className="font-prompt font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-4">
                  <a
                    href={getLineOrderUrl(
                      "สวัสดีครับครูอ้น ติดต่อจากหน้าเกี่ยวกับเรา สนใจปรึกษาเรื่องระบบ AI / วิทยากรบรรยาย ครับ 🙏"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-prompt inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-zinc-950 font-extrabold text-sm shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all hover:scale-102"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>ทัก LINE OA ครูอ้น (@deu6776s)</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <button
                    onClick={handleCopyBioUrl}
                    className="font-prompt inline-flex items-center gap-2 px-5 py-3 rounded-full glass-card border border-white/15 hover:border-cyan-400/50 text-white/80 hover:text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                  >
                    {copiedBioLink ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300">คัดลอกลิงก์ aiaon.tech/about แล้ว!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-cyan-400" />
                        <span>แชร์หน้าแนะนำตัวครูอ้น</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 2: 7 OFFICIAL CHANNELS MATRIX (MERGED FROM /CHANNELS)
        ============================================================ */}
        <section id="channels" className="pt-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="font-prompt inline-flex items-center gap-2 text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
                <Radio className="w-4 h-4" />
                <span>ALL OFFICIAL CHANNELS • 7 ช่องทางทางการของครูอ้น</span>
              </div>
              <h2 className="font-prompt text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                📲 ติดตามจักรวาล <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-teal-300 to-amber-300">iAonTech</span> ได้ครบทุกแพลตฟอร์ม
              </h2>
            </div>
            <p className="font-prompt text-white/60 text-sm md:text-right max-w-md">
              คลิกติดตามช่องทางต้นทางของแท้ 100% เรียงลำดับจากไลฟ์สดแม่พิมพ์ ➔ คลิปสั้น ➔ คลิปยาว ➔ และจุดรับบริการที่ LINE OA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {OFFICIAL_CHANNELS.map((ch) => (
              <motion.div
                key={ch.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className={`group glass-card relative rounded-3xl bg-linear-to-br ${ch.bgGlow} border ${ch.borderClass} p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between shadow-xl`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-prompt text-xs font-bold px-3 py-1 rounded-full bg-white/5 text-white/80 border border-white/10">
                      {ch.stepLabel}
                    </span>
                    <span className={`font-prompt text-xs font-extrabold tracking-wider ${ch.colorClass}`}>
                      {ch.badge}
                    </span>
                  </div>

                  <div className="flex items-start gap-3.5 mb-3.5">
                    <div className="text-3xl shrink-0 bg-white/5 w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
                      {ch.iconText}
                    </div>
                    <div>
                      <div className="font-prompt text-xs text-white/55 font-semibold">
                        {ch.platform}
                      </div>
                      <h3 className="font-prompt text-lg sm:text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                        {ch.name}
                      </h3>
                      <div className="font-mono text-xs text-cyan-400">{ch.handle}</div>
                    </div>
                  </div>

                  <p className="font-prompt text-white/75 text-sm leading-relaxed mb-3">
                    {ch.role}
                  </p>
                  <div className="font-prompt text-xs text-amber-300/95 font-semibold mb-5">
                    {ch.schedule}
                  </div>
                </div>

                <a
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-prompt inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 group-hover:border-cyan-500/40 text-sm font-bold text-white transition-all"
                >
                  <span>{ch.buttonText}</span>
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================================
           SECTION 3: 3 OFFICIAL GADGET & AFFILIATE STORES
        ============================================================ */}
        <section id="stores" className="pt-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="font-prompt inline-flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
                <Store className="w-4 h-4" />
                <span>OFFICIAL GADGET &amp; TECH STORES • 3 แพลตฟอร์มหลัก</span>
              </div>
              <h2 className="font-prompt text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                🛒 หน้าร้านไอที &amp; พิกัดแกดเจ็ตที่ครูอ้นคัดมาให้แล้ว
              </h2>
            </div>
            <p className="font-prompt text-white/60 text-sm md:text-right max-w-md">
              สะดวกช้อปบนแพลตฟอร์มไหน กดคลิกไปที่หน้าร้านต้นทางได้ทันที ของแท้ 100% พร้อมโค้ดลดพิเศษ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GADGET_STORES.map((store, idx) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 + idx * 0.08 }}
                className={`glass-card relative rounded-3xl border ${store.border} p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-xl`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-3xl">{store.icon}</span>
                    <span className="font-prompt px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {store.badge}
                    </span>
                  </div>

                  <div className="font-prompt text-xs font-bold uppercase tracking-wider text-white/50 mb-1">
                    {store.platform}
                  </div>
                  <h3 className="font-prompt text-xl font-extrabold text-white mb-2">
                    {store.storeName}
                  </h3>
                  <p className="font-prompt text-cyan-300 text-xs sm:text-sm font-semibold mb-3">
                    {store.tagline}
                  </p>
                  <p className="font-prompt text-white/70 text-sm leading-relaxed mb-6">
                    {store.description}
                  </p>
                </div>

                <a
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-prompt w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-linear-to-r ${store.accent} text-white font-bold text-sm shadow-lg hover:opacity-95 transition-all`}
                >
                  <span>{store.buttonLabel}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================================
           SECTION 4: KRU AON'S STUDIO GEAR CHECKLIST
        ============================================================ */}
        <section id="gear" className="pt-6">
          <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">
              <div>
                <div className="font-prompt inline-flex items-center gap-2 text-teal-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
                  <Laptop className="w-4 h-4" />
                  <span>KRU AON&apos;S REAL WORKING GEAR</span>
                </div>
                <h2 className="font-prompt text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  🎧 เปิดกรุอุปกรณ์จริงบนโต๊ะทำงานครูอ้น (ใช้จริง รีวิวจริงทุกชิ้น)
                </h2>
                <p className="font-prompt text-white/65 text-sm mt-1">
                  อุปกรณ์ทุกชิ้นด้านล่างคืออาวุธจริงที่ครูอ้นใช้สร้างระบบ AI, ไลฟ์สด และสอนดนตรี กดเทียบราคาจากทั้ง 3 ร้านได้เลย
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "all", label: "ทั้งหมด (6)" },
                  { key: "mobile", label: "📱 มือถือ & ไอแพด" },
                  { key: "audio", label: "🎙️ ไมค์ & กล้องไลฟ์สด" },
                  { key: "pc", label: "💻 คอม & โน้ตบุ๊ก" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedGearCat(tab.key as GearCategory)}
                    className={`font-prompt px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedGearCat === tab.key
                        ? "bg-linear-to-r from-cyan-400 to-teal-400 text-zinc-950 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                        : "bg-white/5 text-white/75 border border-white/10 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredGear.map((gear) => (
                <div
                  key={gear.id}
                  className="rounded-2xl bg-black/40 border border-white/10 p-5 sm:p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-prompt px-2.5 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold">
                        {gear.badge}
                      </span>
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>

                    <h3 className="font-prompt text-base sm:text-lg font-extrabold text-white mb-2">
                      {gear.name}
                    </h3>
                    <p className="font-prompt text-xs text-cyan-300/95 mb-2 leading-relaxed">
                      <strong>หน้าที่ในระบบครูอ้น:</strong> {gear.roleInWorkflow}
                    </p>
                    <p className="font-prompt text-xs text-white/65 leading-relaxed mb-5">
                      &ldquo;{gear.whyKruAonLovesIt}&rdquo;
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-3.5 border-t border-white/10">
                    <div className="font-prompt text-[11px] font-semibold text-white/55">
                      คลิกเช็กราคาของแท้ในหน้าร้านครูอ้น:
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <a
                        href={gear.tiktokShopUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-prompt flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-white/5 hover:bg-cyan-500/15 border border-cyan-500/30 text-[11px] font-bold text-cyan-300 transition-all"
                      >
                        <span>🎵 TikTok</span>
                      </a>
                      <a
                        href={gear.shopeeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-prompt flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-white/5 hover:bg-orange-500/15 border border-orange-500/30 text-[11px] font-bold text-orange-300 transition-all"
                      >
                        <span>🧡 Shopee</span>
                      </a>
                      <a
                        href={gear.lazadaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-prompt flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-white/5 hover:bg-blue-500/15 border border-blue-500/30 text-[11px] font-bold text-blue-300 transition-all"
                      >
                        <span>💙 Lazada</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 5: VERIFIED CERTIFICATIONS & ACHIEVEMENTS
        ============================================================ */}
        <section id="certificates" className="pt-6">
          <div className="text-center mb-12 px-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs sm:text-sm font-prompt font-medium mb-4">
              <Award className="w-4 h-4" />
              ความสำเร็จและใบประกาศนียบัตร
            </span>

            <h2 className="font-prompt text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">
              Certificates &amp;{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-purple-400 to-pink-400">
                AI Credentials
              </span>
            </h2>

            <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base font-prompt font-light leading-relaxed">
              ใบรับรองความเชี่ยวชาญด้าน AI และนวัตกรรมดิจิทัลที่ผ่านการเรียนรู้และทดสอบจริง
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {CERTIFICATES.map((cert, index) => (
              <motion.div
                key={cert.id}
                variants={cardVariants}
                onClick={() => setSelectedCertIndex(index)}
                className="group relative rounded-3xl border border-white/10 bg-white/3 backdrop-blur-sm overflow-hidden cursor-pointer
                           transition-all duration-300 ease-out hover:border-purple-500/40 hover:shadow-[0_8px_40px_rgba(168,85,247,0.2)] hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-white/5">
                  <Image
                    src={cert.imageSrc}
                    alt={cert.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="p-3 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 shadow-lg">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-prompt font-semibold backdrop-blur-md bg-black/60 border border-white/15 ${cert.categoryColor}`}
                    >
                      <BadgeCheck className="w-3 h-3" />
                      {cert.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3 relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-prompt text-base font-semibold text-white leading-snug group-hover:text-purple-200 transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-prompt text-white/55 font-medium mt-1">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-3 space-y-1.5 text-xs font-prompt text-white/50">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                      <span>ออกเมื่อ: {cert.issueDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-purple-400/80 shrink-0" />
                      <span>ID: </span>
                      <span className="text-purple-300 font-mono font-semibold">{cert.credentialId}</span>
                    </div>
                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[11px] font-prompt text-cyan-400 hover:text-cyan-300 pt-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>ตรวจสอบใบรับรองออนไลน์</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ============================================================
           SECTION 6: SMART SCHOOL AUTOMATION & ROI SIMULATOR
        ============================================================ */}
        <section id="showcase" className="pt-6">
          <div className="text-center mb-12 px-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-card border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs sm:text-sm font-prompt font-medium mb-4">
              <Cpu className="w-4 h-4" /> SMART SCHOOL AUTOMATION
            </span>
            <h2 className="font-prompt text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">
              นวัตกรรมลดภาระงานครู <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-teal-400">เห็นภาพจริงใน 1 นาที</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base font-prompt font-light leading-relaxed">
              ทดลองเลื่อนสไลเดอร์คำนวณชั่วโมงที่ระบบช่วยซื้อเวลาชีวิตกลับคืน และกดสแกนการ์ดเพื่อดูการแจ้งเตือนจำลองด้านล่างได้เลย
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Left: ROI Time Calculator */}
            <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between bg-white/3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

              <div>
                <h3 className="font-prompt text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>เครื่องคำนวณเวลาที่ประหยัดได้</span>
                </h3>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2 font-prompt text-sm">
                      <span className="text-white/75">จำนวนนักเรียนในห้องเรียน</span>
                      <span className="font-bold text-cyan-400">{students} คน</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={students}
                      onChange={(e) => setStudents(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2 font-prompt text-sm">
                      <span className="text-white/75">เวลาที่ใช้เช็คชื่อและแจ้งเตือนแบบเดิม (ต่อคน)</span>
                      <span className="font-bold text-cyan-400">{timePerStudent} วินาที</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="45"
                      value={timePerStudent}
                      onChange={(e) => setTimePerStudent(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2 font-prompt text-sm">
                      <span className="text-white/75">เวลาทำรายงานฝ่ายวิชาการต่อเทอม</span>
                      <span className="font-bold text-cyan-400">{reportHours} ชั่วโมง</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="30"
                      value={reportHours}
                      onChange={(e) => setReportHours(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* Result display */}
              <div className="mt-8 pt-6 border-t border-white/10 bg-blue-500/10 rounded-2xl p-5 border border-blue-500/20">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="border-r border-white/10 pr-2">
                    <span className="text-[11px] uppercase font-prompt tracking-wider text-white/50 block mb-1">
                      ประหยัดได้ต่อภาคเรียน
                    </span>
                    <span className="text-3xl sm:text-4xl font-extrabold font-prompt text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                      {termTimeSavedHours} ชม.
                    </span>
                  </div>
                  <div className="pl-2">
                    <span className="text-[11px] uppercase font-prompt tracking-wider text-white/50 block mb-1">
                      คืนเวลานอนพักผ่อน
                    </span>
                    <span className="text-3xl sm:text-4xl font-extrabold font-prompt text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-400">
                      ~ {equivalentSleepDays} วัน
                    </span>
                  </div>
                </div>
                <p className="text-xs text-white/60 font-prompt text-center mt-4 leading-relaxed">
                  * คำนวณจากการเปิดเรียน 100 วันต่อหนึ่งภาคเรียน ยิ่งมีหลายห้องเรียน หรือสอนหลายระดับชั้น เวลาที่ประหยัดได้จะเพิ่มขึ้นเป็นทวีคูณ!
                </p>
              </div>

            </div>

            {/* Right: Interactive Phone Preview */}
            <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between items-center bg-white/3 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

              <div className="w-full text-center lg:text-left mb-6">
                <h3 className="font-prompt text-xl sm:text-2xl font-bold text-white mb-1.5 flex items-center justify-center lg:justify-start gap-2.5">
                  <Smartphone className="w-5 h-5 text-cyan-400" />
                  <span>เครื่องจำลองแจ้งเตือน LINE</span>
                </h3>
                <p className="text-xs sm:text-sm font-prompt text-white/60">
                  จำลองการส่งข้อมูลเช็คชื่อเข้า LINE ของผู้ปกครองแบบ Real-time
                </p>
              </div>

              {/* Mobile Phone Mockup */}
              <div className="relative w-full max-w-[270px] aspect-[9/18] bg-zinc-950 rounded-[38px] border-4 border-zinc-800 p-2 shadow-2xl overflow-hidden flex flex-col justify-between">
                
                {/* Dynamic Notification Banner */}
                <AnimatePresence>
                  {showAlert && (
                    <motion.div
                      initial={{ y: -60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -60, opacity: 0 }}
                      className="absolute top-6 left-2 right-2 bg-zinc-900/95 backdrop-blur-md rounded-2xl p-2.5 border border-white/10 shadow-lg z-50 flex gap-2.5 items-start"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#06C755] flex items-center justify-center shrink-0">
                        <Bell className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="text-[11px] font-bold font-prompt text-white">AiAon Tech OA</span>
                          <span className="text-[11px] text-white/40">ตอนนี้</span>
                        </div>
                        <p className="text-[11px] font-prompt text-white/80 leading-normal line-clamp-2">
                          สแกนบัตรสำเร็จ! ส่งแจ้งผลแจ้งเตือนเข้าสมาร์ตโฟนผู้ปกครองเรียบร้อยแล้ว
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Status Bar */}
                <div className="h-5 flex justify-between items-center px-4 text-[11px] text-white/70 font-sans z-10">
                  <span>08:02</span>
                  <div className="w-16 h-3 bg-zinc-800 rounded-full absolute left-1/2 -translate-x-1/2 top-1" />
                  <div className="flex gap-1">
                    <span>📶</span>
                    <span>🔋</span>
                  </div>
                </div>

                {/* Chat Stream */}
                <div className="flex-1 bg-zinc-900/90 rounded-[28px] mt-1 mb-2 p-3 overflow-y-auto flex flex-col gap-2 relative">
                  <div className="text-center my-1">
                    <span className="text-[11px] bg-black/40 text-white/40 px-2.5 py-0.5 rounded-full font-prompt">
                      วันนี้
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 relative z-10">
                    {chatMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-zinc-800 border border-white/5 rounded-2xl p-2.5 max-w-[90%] self-start"
                      >
                        <p className="text-[11px] font-prompt text-white/90 leading-relaxed">
                          {msg.text}
                        </p>
                        <span className="text-[10px] text-white/35 block text-right mt-1 font-prompt">
                          {msg.time}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={triggerScan}
                  disabled={isScanning}
                  className={`w-full py-2.5 rounded-xl font-prompt font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-all z-10 cursor-pointer ${
                    isScanning
                      ? "bg-zinc-800 text-white/50 cursor-wait"
                      : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                  }`}
                >
                  {isScanning ? (
                    <>
                      <span className="w-2.5 h-2.5 border border-white/30 border-t-white animate-spin rounded-full inline-block" />
                      กำลังสแกนบัตร...
                    </>
                  ) : (
                    <>
                      <span>สแกนการ์ดนักเรียน (จำลอง)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs text-white/45 font-prompt">
                  * ลองคลิกปุ่มสีฟ้าจำลองด้านบนเพื่อทดสอบการยิงแจ้งเตือน LINE
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* ============================================================
           SECTION 7: SPEAKER & CONSULTATION BOOKING BANNER
        ============================================================ */}
        <section className="pt-4">
          <div className="rounded-3xl p-8 sm:p-12 relative overflow-hidden bg-linear-to-r from-blue-900/40 via-purple-900/40 to-teal-900/40 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] text-center">
            <div className="max-w-3xl mx-auto space-y-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold tracking-wide">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>SPEAKER &amp; CONSULTING • เชิญเป็นวิทยากร &amp; ปรึกษางานระบบ</span>
              </span>

              <h2 className="font-prompt text-2xl sm:text-4xl font-extrabold text-white">
                พร้อมยกระดับองค์กรและการศึกษาด้วยพลัง AI แล้วหรือยัง?
              </h2>

              <p className="font-prompt text-white/75 text-sm sm:text-base leading-relaxed">
                ครูอ้นยินดีรับเชิญเป็นวิทยากรบรรยาย อบรมเชิงปฏิบัติการ (Workshop) การประยุกต์ใช้ AI ในโรงเรียน, การสร้างระบบ Automation ด้วย Google Apps Script หรือการวางสถาปัตยกรรมระบบสำหรับธุรกิจ SME
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={getLineOrderUrl(
                    "สวัสดีครับครูอ้น สนใจติดต่อเชิญเป็นวิทยากรบรรยาย / ปรึกษาระบบสำหรับองค์กรครับ 🙏"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-prompt inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-linear-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-zinc-950 font-extrabold text-sm sm:text-base shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all hover:scale-102"
                >
                  <Send className="w-4 h-4" />
                  <span>ส่งข้อความนัดหมายผ่าน LINE OA ทันที</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ============================================================
         CERTIFICATE LIGHTBOX MODAL
      ============================================================ */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseCert}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md select-none"
          >
            <button
              onClick={handleCloseCert}
              className="absolute top-4 right-4 z-50 p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {CERTIFICATES.length > 1 && (
              <>
                <button
                  onClick={handlePrevCert}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer hidden sm:block"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextCert}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer hidden sm:block"
                  aria-label="Next certificate"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl flex flex-col items-center gap-6"
            >
              <div className="relative w-full aspect-[16/10] max-h-[65vh] rounded-2xl overflow-hidden border border-white/15 bg-black/50 flex items-center justify-center">
                <Image
                  src={activeCert.imageSrc}
                  alt={activeCert.title}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </div>

              <div className="w-full max-w-3xl text-center px-4 space-y-3">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-prompt font-semibold backdrop-blur-md bg-white/5 border border-white/10 ${activeCert.categoryColor}`}
                >
                  <BadgeCheck className="w-3.5 h-3.5" />
                  {activeCert.category}
                </span>

                <h3 className="font-prompt text-lg md:text-2xl font-bold text-white tracking-tight leading-snug">
                  {activeCert.title}
                </h3>

                <p className="text-sm md:text-base font-prompt text-white/70">
                  {activeCert.issuer}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 border-t border-white/10 text-xs md:text-sm font-prompt text-white/50">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-400/80 shrink-0" />
                    <span>Issue Date:</span>
                    <span className="text-white/80 font-medium">{activeCert.issueDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Hash className="w-4 h-4 text-purple-400/80 shrink-0" />
                    <span>Credential ID:</span>
                    <span className="text-purple-300 font-mono font-semibold">
                      {activeCert.credentialId}
                    </span>
                  </div>
                  {activeCert.verifyUrl && (
                    <a
                      href={activeCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Verify Certificate
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

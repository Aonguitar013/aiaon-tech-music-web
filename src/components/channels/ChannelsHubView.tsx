"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  ShoppingBag,
  Tv,
  Smartphone,
  Mic,
  Monitor,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  Play,
  Share2,
  Store,
  Flame,
  Cpu,
  Headphones,
  ArrowRight,
  Radio,
  Globe,
} from "lucide-react";

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
    url: "https://lin.ee/poMESoP",
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
    border: "border-cyan-500/40",
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
    border: "border-orange-500/40",
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
    border: "border-blue-500/40",
    icon: "💙",
  },
];

const STUDIO_GEAR_ITEMS: GearItem[] = [
  {
    id: "iphone-14-pm",
    name: "iPhone 14 Pro Max (คู่ใจครูอ้น)",
    category: "mobile",
    roleInWorkflow: "ใช้รับแจ้งเตือน Telegram ยามเฝ้าระบบ AI 24 ชม., ถ่ายคลิปมุมโต๊ะทำงาน และรีโมต AnyDesk",
    whyKruAonLovesIt: "กล้องถ่ายคลิปสั้นคมกริบ แบตอึด คุมระบบลูกค้าได้จากทุกที่แม้ตอนสอนดนตรีที่โรงเรียน",
    badge: "ใช้ทุกวัน 24 ชม.",
    tiktokShopUrl: "https://www.tiktok.com/@iaontech",
    shopeeUrl: "https://shopee.co.th/search?keyword=iphone%20pro%20max",
    lazadaUrl: "https://www.lazada.co.th/catalog/?q=iphone+pro+max",
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

export function ChannelsHubView() {
  const [selectedGearCat, setSelectedGearCat] = useState<GearCategory>("all");
  const [copiedBioLink, setCopiedBioLink] = useState(false);

  const filteredGear =
    selectedGearCat === "all"
      ? STUDIO_GEAR_ITEMS
      : STUDIO_GEAR_ITEMS.filter((item) => item.category === selectedGearCat);

  const handleCopyHubUrl = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText("https://www.aiaon.tech/channels");
      setCopiedBioLink(true);
      setTimeout(() => setCopiedBioLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-28 pb-16 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/25 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-medium mb-6">
              <Globe className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>ศูนย์รวมช่องทางทางการ & พิกัดอุปกรณ์ไอทีของแท้ 100%</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              จักรวาลช่องทาง{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                iAonTech & ไอทีง่ายๆ สไตล์ iAon
              </span>
            </h1>

            <p className="text-slate-300 max-w-3xl text-base md:text-lg mb-8 leading-relaxed">
              รวมทุกช่องทางโซเชียลมีเดีย หน้าร้านป้ายยาอุปกรณ์เทคโนโลยีทั้ง 3 แพลตฟอร์ม
              และจุดติดต่องานระบบ <strong className="text-teal-300">AI Caretaker</strong> ของ{" "}
              <strong className="text-white">ครูอ้น (จิรวัฒน์ เดชเส้ง)</strong> ไว้ในหน้าเดียว
              คลิกเชื่อมต่อไปยังลิงก์ต้นทางของแท้ได้ทันที!
            </p>

            {/* Quick Action Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://lin.ee/poMESoP"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold shadow-lg shadow-emerald-950/50 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>ทัก LINE OA: AiAon Tech (@deu6776s)</span>
                <ExternalLink className="w-4 h-4 opacity-80" />
              </a>

              <Link
                href="/ai-caretaker"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-teal-500/40 text-teal-300 font-semibold transition-all"
              >
                <ShieldCheck className="w-5 h-5 text-teal-400" />
                <span>ดูบริการเฝ้าดูแล AI รายเดือน (990฿/ด.)</span>
              </Link>

              <button
                onClick={handleCopyHubUrl}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium transition-all cursor-pointer"
              >
                {copiedBioLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">คัดลอกลิงก์ aiaon.tech/channels แล้ว!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>คัดลอกลิงก์หน้านี้ (สำหรับแปะ Bio)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3 OFFICIAL GADGET & AFFILIATE STORES */}
      <section className="container mx-auto px-4 max-w-6xl pt-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 text-sm font-bold uppercase tracking-wider mb-2">
              <Store className="w-4 h-4" />
              <span>OFFICIAL GADGET & TECH STORES (3 แพลตฟอร์มหลัก)</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              🛒 หน้าร้านขายของไอที & พิกัดอุปกรณ์ที่ครูอ้นคัดมาให้แล้ว
            </h2>
          </div>
          <p className="text-slate-400 text-sm md:text-right max-w-md">
            สะดวกแอปไหน กดคลิกไปที่หน้าร้านต้นทางได้เลย ทุกชิ้นคัดเฉพาะร้านของแท้ที่ครูอ้นใช้งานจริง
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GADGET_STORES.map((store) => (
            <div
              key={store.id}
              className={`relative rounded-2xl bg-slate-900/80 border ${store.border} p-6 flex flex-col justify-between hover:translate-y-[-3px] transition-all duration-200 shadow-xl`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-3xl">{store.icon}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-amber-300 border border-amber-500/30">
                    {store.badge}
                  </span>
                </div>

                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  {store.platform}
                </div>
                <h3 className="text-xl font-extrabold text-white mb-2">{store.storeName}</h3>
                <p className="text-cyan-300 text-xs font-medium mb-3">{store.tagline}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{store.description}</p>
              </div>

              <a
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r ${store.accent} text-white font-bold text-sm shadow-md hover:opacity-95 transition-all`}
              >
                <span>{store.buttonLabel}</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CHRONOLOGICAL SOCIAL CHANNELS (ORDERED BY REAL CONTENT FLOW) */}
      <section className="container mx-auto px-4 max-w-6xl pt-16">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-sm font-bold uppercase tracking-wider mb-2">
            <Radio className="w-4 h-4" />
            <span>ALL OFFICIAL CHANNELS (เรียงตามลำดับการปล่อยคอนเทนต์จริง)</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            📲 ติดตามครูอ้นได้ครบทุกช่องทาง (คลิกไปที่ลิงก์ต้นทางได้ทันที)
          </h2>
          <p className="text-slate-400 text-sm">
            เรียงลำดับจากจุดปล่อยไลฟ์สดแม่พิมพ์ ➔ กระจายสู่เฟซบุ๊ก/IG/Threads ➔ หั่นเป็นคลิปสั้น TikTok ➔ คลิปยาว YouTube ➔ ปิดจบรับงานที่ LINE OA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {OFFICIAL_CHANNELS.map((ch) => (
            <div
              key={ch.id}
              className={`group relative rounded-2xl bg-gradient-to-br ${ch.bgGlow} bg-slate-900/80 border ${ch.borderClass} p-6 transition-all duration-200 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-950/80 text-slate-300 border border-slate-800">
                    {ch.stepLabel}
                  </span>
                  <span className={`text-xs font-extrabold ${ch.colorClass}`}>{ch.badge}</span>
                </div>

                <div className="flex items-start gap-3.5 mb-3">
                  <div className="text-3xl shrink-0 bg-slate-950/90 w-12 h-12 rounded-xl flex items-center justify-center border border-slate-800">
                    {ch.iconText}
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">{ch.platform}</div>
                    <h3 className="text-lg md:text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                      {ch.name}
                    </h3>
                    <div className="text-xs font-mono text-cyan-400">{ch.handle}</div>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-3">{ch.role}</p>
                <div className="text-xs text-amber-300/90 font-medium mb-5">{ch.schedule}</div>
              </div>

              <a
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-950/90 hover:bg-cyan-500/20 border border-slate-800 group-hover:border-cyan-500/40 text-sm font-semibold text-white transition-all"
              >
                <span>{ch.buttonText}</span>
                <ExternalLink className="w-4 h-4 text-cyan-400" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 4. KRU AON'S REAL STUDIO & TECH GEAR SHOWCASE */}
      <section className="container mx-auto px-4 max-w-6xl pt-16">
        <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-teal-400 text-sm font-bold uppercase tracking-wider mb-2">
                <Cpu className="w-4 h-4" />
                <span>KRU AON&apos;S REAL WORKING GEAR</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                🎧 เปิดกรุอุปกรณ์จริงบนโต๊ะทำงานครูอ้น (ใช้จริง รีวิวจริงทุกชิ้น)
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                อุปกรณ์ทุกชิ้นข้างล่างนี้คืออาวุธจริงที่ครูอ้นใช้สร้างระบบ AI, ไลฟ์สด และสอนดนตรี กดเทียบราคาจากทั้ง 3 ร้านได้เลย
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
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedGearCat === tab.key
                      ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                      : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700"
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
                className="rounded-2xl bg-slate-950/90 border border-slate-800/90 p-5 flex flex-col justify-between hover:border-cyan-500/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold">
                      {gear.badge}
                    </span>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{gear.name}</h3>
                  <p className="text-xs text-cyan-300/90 mb-2">
                    <strong>หน้าที่ในระบบครูอ้น:</strong> {gear.roleInWorkflow}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    &ldquo;{gear.whyKruAonLovesIt}&rdquo;
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800/80">
                  <div className="text-[11px] font-semibold text-slate-400">
                    คลิกเช็กราคาของแท้ในหน้าร้านครูอ้น:
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <a
                      href={gear.tiktokShopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-[11px] font-bold text-cyan-300 transition-all"
                    >
                      <span>🎵 TikTok</span>
                    </a>
                    <a
                      href={gear.shopeeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-orange-500/30 text-[11px] font-bold text-orange-300 transition-all"
                    >
                      <span>🧡 Shopee</span>
                    </a>
                    <a
                      href={gear.lazadaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-blue-500/30 text-[11px] font-bold text-blue-300 transition-all"
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
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Gift,
  Palette,
  Camera,
  FileCheck2,
  Layers,
  Star,
  HelpCircle,
  ChevronDown,
  Wand2,
  Download,
  Award,
  Check,
  Smile,
  Music,
} from "lucide-react";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { getLineOrderUrl } from "@/lib/line";

interface StickerPackage {
  id: string;
  code: string;
  name: string;
  countLabel: string;
  count: number;
  price: string;
  priceNum: number;
  originalPrice: string;
  badge?: string;
  badgeColor?: string;
  isPopular?: boolean;
  deliveryDays: string;
  tagline: string;
  description: string;
  features: string[];
  borderClass: string;
  btnGradient: string;
}

const STICKER_PACKAGES: StickerPackage[] = [
  {
    id: "starter-8",
    code: "STK-08",
    name: "Starter Teacher Pack",
    countLabel: "8 แอ็กชัน + Main/Tab",
    count: 8,
    price: "990 ฿",
    priceNum: 990,
    originalPrice: "1,590 ฿",
    badge: "⚡ เริ่มต้นคุ้มค่า • จบไว",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    deliveryDays: "1–2 วันทำการ (ไม่รวมเวลา LINE ตรวจ)",
    tagline: "ชุดเริ่มต้น 8 คำพูดฮิตประจำตัวครู",
    description:
      "เหมาะสำหรับคุณครูที่อยากมีสติกเกอร์คาแรกเตอร์ตัวเองไว้ส่งในกลุ่มงานโรงเรียน กลุ่มผู้ปกครอง หรือกลุ่มนักเรียนในงบเบาๆ",
    features: [
      "ปั้นคาแรกเตอร์ 3D/การ์ตูนพรีเมียมจากรูปถ่ายจริง 1 ชุดแต่งกาย",
      "สติกเกอร์ 8 ท่าทาง + 8 คำพูดฮิต (เลือกคำพูดเองได้ทุกคำ)",
      "ไดคัทพื้นหลังใส ตีขอบขาว + ป้ายข้อความฟอนต์อ่านง่ายคมชัด",
      "จัดทำรูปหน้าปก (main.png) และไอคอนถาดแชท (tab.png) ครบมาตรฐาน LINE",
      "ดูแลส่งตรวจอนุมัติขึ้น LINE STORE + ส่งเป็น Gift เข้า LINE ให้ใช้ฟรี 1 ชุด",
      "แถมฟรี! ไฟล์ภาพ PNG ความละเอียดสูงทั้ง 8 รูป สำหรับแต่งสไลด์/เอกสาร",
    ],
    borderClass:
      "border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]",
    btnGradient:
      "from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white",
  },
  {
    id: "pro-16",
    code: "STK-16",
    name: "Signature Teacher 16 Pack",
    countLabel: "16 แอ็กชัน + Main/Tab",
    count: 16,
    price: "1,490 ฿",
    priceNum: 1490,
    originalPrice: "2,490 ฿",
    badge: "🔥 ขายดีอันดับ 1 • แบบเดียวกับครูอ้น!",
    badgeColor:
      "bg-linear-to-r from-[#06C755] via-emerald-500 to-teal-500 text-zinc-950 border-emerald-300/60",
    isPopular: true,
    deliveryDays: "2–3 วันทำการ (ไม่รวมเวลา LINE ตรวจ)",
    tagline: "ครบทุกอารมณ์การสอน ตรวจงาน ประชุม และชีวิตครู",
    description:
      "เซ็ตมาตรฐานยอดนิยม 16 รูป ครอบคลุมทั้งคำทักทาย รับทราบ ตามงาน เช็กชื่อ ให้กำลังใจ และมุกฮาๆ ในโรงเรียน คุ้มค่าที่สุด!",
    features: [
      "ปั้นคาแรกเตอร์ 3D/การ์ตูนพรีเมียมจากรูปถ่ายจริง (เลือกชุด & พร็อพประจำวิชาได้)",
      "สติกเกอร์จัดเต็ม 16 ท่าทาง + 16 คำพูดประจำตัวครู (เลือกเองหรือใช้โพยครูอ้นได้)",
      "ไดคัทพื้นหลังใส ตีขอบขาวสติกเกอร์ + ป้ายคำพูดฟอนต์ Prompt สีสดคมชัด 100%",
      "ตรวจเช็กระเบียบ LINE Creators Market ทุกพิกเซล การันตีผ่านการอนุมัติ 100%",
      "ดูแลอัปโหลด & ส่งตรวจจนขึ้น LINE STORE + ส่งสติกเกอร์เข้า LINE ครูฟรีทันที!",
      "แถมฟรี! ไฟล์ PNG 16 ท่าความละเอียดสูง เอาไปทำปก ว.PA / สื่อการสอน / คลิปสั้น",
    ],
    borderClass:
      "border-[#06C755]/70 shadow-[0_0_45px_rgba(6,199,85,0.28)] scale-[1.02] ring-1 ring-[#06C755]/50",
    btnGradient:
      "from-[#06C755] via-emerald-500 to-teal-500 hover:from-[#05b34c] hover:to-emerald-400 text-zinc-950",
  },
  {
    id: "vip-24",
    code: "STK-24",
    name: "Master Multi-Costume 24 Pack",
    countLabel: "24 แอ็กชัน (คละชุดได้ 2-3 ชุด)",
    count: 24,
    price: "1,990 ฿",
    priceNum: 1990,
    originalPrice: "3,490 ฿",
    badge: "👑 จัดเต็มคละชุด • คุ้มสุดระดับ VIP",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    deliveryDays: "3–4 วันทำการ (ไม่รวมเวลา LINE ตรวจ)",
    tagline: "คละชุดข้าราชการ + ชุดประจำวิชา + ชุดลำลองในเซ็ตเดียว",
    description:
      "สำหรับคุณครู ผู้บริหาร หรือกลุ่มสาระฯ ที่ต้องการสติกเกอร์ชุดใหญ่ 24 รูป สามารถคละชุดแต่งกายได้ถึง 3 สไตล์ในคอลเลกชันเดียว",
    features: [
      "ปั้นคาแรกเตอร์ครูคละชุดแต่งกายได้ 2–3 ชุด (เช่น ชุดกากี + ชุดพละ/ดนตรี + ชุดสูท)",
      "สติกเกอร์ชุดใหญ่ 24 ท่าทาง + 24 คำพูด ครอบคลุมทั้งงานราชการและแชทส่วนตัว",
      "ไดคัทพื้นหลังใส ตีขอบขาว + ออกแบบป้ายข้อความแยกโทนสีตามอารมณ์คำพูด",
      "ดูแลส่งตรวจอนุมัติขึ้น LINE STORE ครบวงจร (ฝากขายร้าน iAon หรือเข้าบัญชีครูเองได้)",
      "ส่งสติกเกอร์ชุดจริงเป็น Gift ให้คุณครูและเพื่อนครูรวม 2 ชุดฟรีทันทีที่อนุมัติ",
      "แถมฟรี! คลังภาพ PNG คาแรกเตอร์ครู 24 แอ็กชัน สำหรับสร้าง Personal Branding",
    ],
    borderClass:
      "border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]",
    btnGradient:
      "from-amber-400 via-orange-400 to-yellow-400 hover:from-amber-300 hover:to-orange-300 text-zinc-950",
  },
];

const SET1_CAPTIONS = [
  "สวัสดีคร้าบ",
  "รับทราบครับ!",
  "ขอบคุณมากครับ",
  "สุดยอดไปเลย!",
  "กำลังปั่นงาน...",
  "โอเค จัดไป!",
  "ขอคิดดูก่อนนะ",
  "สู้ๆ นะครับ!",
  "งานเข้าแล้ว!",
  "เหนื่อยจังเลย...",
  "พักเบรกแป๊บ",
  "เลิฟเลยครับ",
  "จัดส่งเรียบร้อย!",
  "ติดประชุมครับ",
  "ฝันดีราตรีสวัสดิ์",
  "ยินดีด้วยคร้าบ!",
];

const SET2_CAPTIONS = [
  "มาซ้อมวงด่วน!",
  "ตั้งสายหรือยัง?",
  "ฟังจังหวะด้วย!",
  "ขออีกเทคเดียว!",
  "เสียงเพี้ยนนะเรา!",
  "ซ้อมหรือยังครับ?",
  "ไพเราะมาก!",
  "ส่งคลิปสอบด้วย!",
  "เก็บเครื่องดนตรี!",
  "พร้อมขึ้นเวที!",
  "เบาเสียงหน่อย!",
  "โซโล่หล่อมาก!",
  "เข้าห้องดนตรี!",
  "เอาไปเลย เกรด 4!",
  "ซ้อมจนนิ้วล็อก...",
  "วงนี้คุณภาพ!",
];

const OUTFIT_STYLES = [
  { id: "subject", label: "🎸 ชุดประจำวิชา / สายลุย (ดนตรี, พละ, วิทย์, คอมฯ, ศิลปะ)" },
  { id: "khaki", label: "👔 ชุดข้าราชการสีกากี / ชุดสูทผู้บริหารเนี๊ยบๆ" },
  { id: "casual", label: "👕 ชุดครูวัยรุ่น สมาร์ทแคชชวล / เสื้อโปโลโรงเรียน" },
  { id: "mixed", label: "✨ คละหลายชุดในเซ็ตเดียว (สำหรับแพ็กเกจ 16 หรือ 24 รูป)" },
];

const PUBLISH_MODES = [
  {
    id: "iaon-store",
    title: "ฝากวางขายบนร้าน iAon Tech (แนะนำ • สะดวกที่สุด 100%)",
    desc: "ไม่ต้องสมัครบัญชี LINE Creators ไม่ต้องกรอกเอกสารภาษีญี่ปุ่นหรือผูก PayPal เอง ครูอ้นอัปโหลดขึ้นร้าน iAon Tech ให้ครบวงจร พออนุมัติปุ๊บ ครูอ้นกดส่งสติกเกอร์เข้า LINE คุณครูให้ใช้งานฟรีทันที และแชร์ลิงก์ให้เพื่อนครู/นักเรียนกดซื้อได้เลย!",
  },
  {
    id: "own-account",
    title: "อัปโหลดเข้าบัญชี LINE Creators ของคุณครูเอง",
    desc: "ครูอ้นส่งมอบไฟล์ ZIP มาตรฐาน LINE (ครบทั้ง 01-16.png, main.png, tab.png) พร้อมโพยชื่อและคำอธิบาย 2 ภาษา ให้คุณครูกดอัปโหลดเข้าบัญชีตัวเองเพื่อรับส่วนแบ่งยอดขายเข้าบัญชีคุณครูโดยตรง",
  },
];

export function LineStickersView() {
  const [activePortfolioTab, setActivePortfolioTab] = useState<"set2" | "set1">("set2");
  const [selectedPkgId, setSelectedPkgId] = useState<string>("pro-16");
  const [selectedOutfit, setSelectedOutfit] = useState<string>("subject");
  const [selectedPublishMode, setSelectedPublishMode] = useState<string>("iaon-store");
  const [customSubjectNote, setCustomSubjectNote] = useState<string>("");
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const { openLineModal } = useLineModal();

  const selectedPkg =
    STICKER_PACKAGES.find((p) => p.id === selectedPkgId) || STICKER_PACKAGES[1];
  const selectedOutfitObj =
    OUTFIT_STYLES.find((o) => o.id === selectedOutfit) || OUTFIT_STYLES[0];
  const selectedPublishObj =
    PUBLISH_MODES.find((m) => m.id === selectedPublishMode) || PUBLISH_MODES[0];

  const buildStickerOrderMsg = (pkg: StickerPackage) => {
    const noteLine = customSubjectNote.trim()
      ? `\n📝 วิชาที่สอน / คาแรกเตอร์ที่อยากได้: ${customSubjectNote.trim()}`
      : "";
    return `สวัสดีครับครูอ้น สนใจจ้างทำสติกเกอร์ LINE คาแรกเตอร์ครู ครบวงจรครับ 🎨✨
📦 แพ็กเกจ: [${pkg.code}] ${pkg.name} (${pkg.countLabel})
💰 ราคาโปรเปิดตัว: ${pkg.price}
👔 สไตล์ชุดที่ต้องการ: ${selectedOutfitObj.label}
🏪 รูปแบบการวางขาย: ${selectedPublishObj.title}${noteLine}

รบกวนขอเลขบัญชี / PromptPay QR Code และขั้นตอนการส่งรูปถ่ายกับลิสต์คำพูดด้วยครับ 🙏`;
  };

  const handleOrderClick = (e: React.MouseEvent, pkg: StickerPackage) => {
    const msg = buildStickerOrderMsg(pkg);
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: `รับทำสติกเกอร์ LINE: ${pkg.name} (${pkg.count} รูป)`,
        price: pkg.price,
        itemCode: pkg.code,
        message: msg,
      });
    }
  };

  const activeSetFolder = activePortfolioTab === "set2" ? "set2" : "set1";
  const activeCaptions = activePortfolioTab === "set2" ? SET2_CAPTIONS : SET1_CAPTIONS;

  return (
    <div className="min-h-screen bg-[#070913] text-white overflow-x-hidden relative pb-28">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[650px] h-[550px] bg-[#06C755]/10 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-cyan-500/10 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-[550px] h-[550px] bg-amber-500/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 relative z-10">
        {/* ─── HERO SECTION ─── */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#06C755]/40 bg-[#06C755]/15 text-[#4ade80] font-prompt text-xs sm:text-sm font-bold tracking-wide shadow-[0_0_25px_rgba(6,199,85,0.25)]"
          >
            <Sparkles className="w-4 h-4 text-[#4ade80] animate-pulse" />
            <span>NEW SERVICE • บริการรับทำสติกเกอร์ LINE คาแรกเตอร์ครู 3D ครบวงจร</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-prompt text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            เปลี่ยนรูปถ่ายของคุณครู เป็น{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#06C755] via-emerald-300 to-cyan-300 drop-shadow-[0_0_35px_rgba(6,199,85,0.35)]">
              สติกเกอร์ LINE ประจำตัวสุดเท่
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="font-prompt text-base sm:text-lg text-white/75 leading-relaxed max-w-3xl mx-auto"
          >
            แค่ส่งรูปถ่าย 1–2 รูป + คำพูดฮิตติดปากเวลาสอนหรือคุยงาน ครูอ้นดูแลให้ครบวงจรตั้งแต่ปั้นคาแรกเตอร์ 3D ไดคัทขอบขาว ใส่ฟอนต์ภาษาไทยคมชัด ไปจนถึงส่งตรวจอนุมัติและวางขายจริงบน{" "}
            <strong className="text-[#4ade80]">LINE STORE</strong> พร้อมแถมไฟล์ PNG ความละเอียดสูงเอาไปแต่งสไลด์สอนและปกเล่ม ว.PA ต่อได้ทันที!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <a
              href="#packages"
              className="px-8 py-4 rounded-2xl bg-linear-to-r from-[#06C755] to-emerald-500 hover:from-[#05b34c] hover:to-emerald-400 text-zinc-950 font-prompt font-black text-base flex items-center gap-2.5 shadow-[0_0_30px_rgba(6,199,85,0.4)] transition-all duration-300 hover:scale-105"
            >
              <Wand2 className="w-5 h-5" />
              <span>ดูแพ็กเกจ &amp; สั่งทำสติกเกอร์ (เริ่ม 990 ฿)</span>
            </a>

            <a
              href="https://line.me/S/sticker/38143374"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-2xl bg-white/5 border border-white/15 hover:border-[#06C755]/50 hover:bg-white/10 text-white font-prompt font-semibold text-sm sm:text-base flex items-center gap-2 transition-all"
            >
              <ExternalLink className="w-4 h-4 text-[#4ade80]" />
              <span>ดูของจริงบน LINE STORE (ชุดที่ 1 On Sale)</span>
            </a>
          </motion.div>
        </div>

        {/* ─── LIVE PORTFOLIO SHOWCASE (SET 1 & SET 2) ─── */}
        <div className="mb-24 rounded-3xl border border-white/10 bg-slate-900/75 backdrop-blur-xl p-6 sm:p-10 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06C755]/15 border border-[#06C755]/30 text-[#4ade80] text-xs font-prompt font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>REAL PRODUCTION GALLERY • ผลงานจริงที่ผ่านระบบ LINE Creators Market</span>
              </div>
              <h2 className="font-prompt text-2xl sm:text-3xl font-extrabold text-white">
                ตัวอย่างผลงานจริง 16 แอ็กชัน (คมชัดทุกคำ • ไดคัทเนี้ยบทุกรูป)
              </h2>
              <p className="font-prompt text-xs sm:text-sm text-white/60 mt-1">
                คลิกสลับดูตัวอย่างทั้ง 2 สไตล์: ชุดครูดนตรีสากลสายลุย และชุดคำพูดทำงานรายวัน
              </p>
            </div>

            {/* Switch Tabs */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setActivePortfolioTab("set2")}
                className={`px-4 py-2.5 rounded-xl font-prompt text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activePortfolioTab === "set2"
                    ? "bg-linear-to-r from-[#06C755] to-emerald-500 text-zinc-950 shadow-[0_0_20px_rgba(6,199,85,0.35)]"
                    : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
                }`}
              >
                <Music className="w-4 h-4" />
                <span>ชุดที่ 2: ครูดนตรีสากลสายลุย (ID: 49349839)</span>
              </button>

              <button
                type="button"
                onClick={() => setActivePortfolioTab("set1")}
                className={`px-4 py-2.5 rounded-xl font-prompt text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activePortfolioTab === "set1"
                    ? "bg-linear-to-r from-cyan-400 to-blue-500 text-zinc-950 shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                    : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
                }`}
              >
                <Smile className="w-4 h-4" />
                <span>ชุดที่ 1: Daily Expressions (On Sale บน LINE STORE)</span>
              </button>
            </div>
          </div>

          {/* Collection Status Bar */}
          <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={`/images/stickers/${activeSetFolder}/main.png`}
                alt="Main Sticker Cover"
                className="w-16 h-16 rounded-2xl bg-slate-800/80 p-1.5 border border-white/15 object-contain shrink-0"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-prompt text-base sm:text-lg font-extrabold text-white">
                    {activePortfolioTab === "set2"
                      ? "iAon - ครูดนตรีสากลสายลุย (iAon - Western Music Teacher)"
                      : "iAon - Daily Expressions (ไอ้อ้น สติกเกอร์พูดได้รายวัน)"}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-prompt font-bold ${
                      activePortfolioTab === "set1"
                        ? "bg-[#06C755]/20 text-[#4ade80] border border-[#06C755]/40"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    }`}
                  >
                    {activePortfolioTab === "set1"
                      ? "🟢 ON SALE บน LINE STORE"
                      : "⏳ ส่งตรวจ LINE Creators แล้ว (ID: 49349839)"}
                  </span>
                </div>
                <p className="font-prompt text-xs text-white/60 mt-1">
                  มาตรฐานไฟล์แท้: 16 รูป (`370×320 px`) + รูปปก `main.png` (`240×240 px`) + ไอคอนแท็บ `tab.png` (`96×74 px`)
                </p>
              </div>
            </div>

            <a
              href={
                activePortfolioTab === "set1"
                  ? "https://line.me/S/sticker/38143374"
                  : "https://line.me/S/shop/sticker/author/6844942"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#06C755]/20 hover:bg-[#06C755]/30 border border-[#06C755]/40 text-[#4ade80] font-prompt text-xs font-bold flex items-center gap-2 transition-all shrink-0"
            >
              <span>เปิดดูร้าน iAon Tech บน LINE STORE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 16 Sticker Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
            {Array.from({ length: 16 }, (_, idx) => {
              const numStr = String(idx + 1).padStart(2, "0");
              const caption = activeCaptions[idx] || `แอ็กชัน #${numStr}`;
              return (
                <motion.div
                  key={`${activeSetFolder}-${numStr}`}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.02 }}
                  className="group rounded-2xl bg-[#111626] hover:bg-[#172036] border border-white/8 hover:border-[#06C755]/50 p-3 flex flex-col items-center justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(6,199,85,0.18)]"
                >
                  <div className="w-full flex items-center justify-between text-[10px] font-mono text-white/40 mb-1">
                    <span>#{numStr}</span>
                    <span className="text-[#4ade80] opacity-0 group-hover:opacity-100 transition-opacity">
                      PNG ใส
                    </span>
                  </div>
                  <div className="w-full aspect-square flex items-center justify-center p-1">
                    <img
                      src={`/images/stickers/${activeSetFolder}/${numStr}.png`}
                      alt={caption}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)] group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <p className="font-prompt text-[11px] font-semibold text-white/80 text-center mt-2 line-clamp-1">
                    {caption}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── WHY TEACHERS LOVE THIS (3 VALUE PILLARS) ─── */}
        <div className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Palette,
              title: "1. คาแรกเตอร์ครู 3D เอกลักษณ์เฉพาะตัว",
              desc: "ปั้นจากใบหน้าและบุคลิกจริงของคุณครู เลือกใส่ชุดกากี ชุดพละ ชุดสูท หรือถือพร็อพประจำวิชา (กีตาร์, ไมค์, หลอดทดลอง, กระดาน) ได้ตามสั่ง",
              color: "border-cyan-500/30 bg-cyan-500/5 text-cyan-300",
            },
            {
              icon: ShieldCheck,
              title: "2. ดูแลส่งตรวจ LINE STORE จนผ่าน 100%",
              desc: "ไม่ต้องปวดหัวกับกฎรูปตกขอบ พื้นหลังไม่ใส หรือตั้งค่าภาษาอังกฤษใน LINE Creators Market ครูอ้นจัดการแพ็กไฟล์และส่งตรวจให้จนขึ้นวางขายจริง",
              color: "border-[#06C755]/30 bg-[#06C755]/5 text-[#4ade80]",
            },
            {
              icon: Gift,
              title: "3. ได้ทั้งสติกเกอร์ LINE + คลังภาพ PNG แต่งสื่อ",
              desc: "นอกจากได้สติกเกอร์ไว้กดส่งในแชทแล้ว ยังได้รับไฟล์ภาพ PNG ความละเอียดสูงครบทุกท่า เอาไปแปะหน้าปกสไลด์สอน ปกรายงาน ว.PA หรือทำคลิป TikTok ได้คุ้มสุดๆ",
              color: "border-amber-500/30 bg-amber-500/5 text-amber-300",
            },
          ].map((item, i) => {
            const IconComp = item.icon;
            return (
              <div
                key={i}
                className={`p-6 sm:p-7 rounded-3xl border ${item.color} flex flex-col justify-between`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-prompt text-lg sm:text-xl font-extrabold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="font-prompt text-xs sm:text-sm text-white/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── 3 PRICING PACKAGES ─── */}
        <div id="packages" className="mb-24 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-prompt font-bold">
              <Award className="w-4 h-4" />
              <span>SPECIAL LAUNCH PRICING • โปรโมชันเปิดตัวสำหรับเพื่อนครู</span>
            </div>
            <h2 className="font-prompt text-2xl sm:text-4xl font-extrabold text-white">
              เลือกแพ็กเกจสติกเกอร์ LINE{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#06C755] to-cyan-400">
                ที่เหมาะกับสไตล์คุณครู
              </span>
            </h2>
            <p className="font-prompt text-sm text-white/60">
              ราคาเดียวจบครบวงจร ไม่มีบวกเพิ่ม ได้ทั้งสติกเกอร์ขึ้น LINE STORE และไฟล์ภาพ PNG ความละเอียดสูง
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {STICKER_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-7 sm:p-8 border bg-slate-900/80 flex flex-col justify-between transition-all duration-300 backdrop-blur-sm ${pkg.borderClass}`}
              >
                {pkg.badge && (
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-prompt font-extrabold shadow-md border whitespace-nowrap ${pkg.badgeColor}`}
                  >
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 pt-2">
                    <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white/80 font-mono text-xs font-bold">
                      {pkg.code}
                    </span>
                    <span className="font-prompt text-xs font-bold text-[#4ade80]">
                      {pkg.countLabel}
                    </span>
                  </div>

                  <h3 className="font-prompt text-2xl font-extrabold text-white mb-1">
                    {pkg.name}
                  </h3>
                  <p className="font-prompt text-xs text-white/60 mb-5">
                    {pkg.tagline}
                  </p>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-5">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-prompt text-3xl sm:text-4xl font-black text-white">
                        {pkg.price}
                      </span>
                      <span className="font-prompt text-sm text-white/40 line-through">
                        {pkg.originalPrice}
                      </span>
                    </div>
                    <p className="font-prompt text-xs text-cyan-300 mt-1">
                      ⏱️ ระยะเวลาผลิตภาพ: {pkg.deliveryDays}
                    </p>
                  </div>

                  <p className="font-prompt text-xs text-white/75 leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  <div className="space-y-2.5 mb-8 border-t border-white/10 pt-5">
                    <p className="font-prompt text-xs font-bold text-white/50 uppercase tracking-wider mb-2">
                      สิ่งที่คุณครูจะได้รับครบชุด:
                    </p>
                    {pkg.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2.5 text-xs font-prompt text-white/85"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  <a
                    href={getLineOrderUrl(buildStickerOrderMsg(pkg))}
                    onClick={(e) => handleOrderClick(e, pkg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-4 rounded-2xl font-prompt font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] active:scale-95 bg-linear-to-r ${pkg.btnGradient}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>สั่งทำชุดนี้ผ่าน LINE ({pkg.price})</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── INTERACTIVE CUSTOM BRIEF BUILDER ─── */}
        <div className="mb-24 max-w-4xl mx-auto rounded-3xl border border-[#06C755]/40 bg-slate-900/85 p-6 sm:p-10 shadow-[0_0_50px_rgba(6,199,85,0.15)]">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#06C755]/15 border border-[#06C755]/30 text-[#4ade80] text-xs font-prompt font-bold">
              <Wand2 className="w-3.5 h-3.5" />
              <span>1-CLICK STICKER BRIEF BUILDER</span>
            </div>
            <h3 className="font-prompt text-2xl sm:text-3xl font-extrabold text-white">
              จัดสเปกสติกเกอร์ของคุณครู แล้วส่งให้ครูอ้นใน 1 คลิก
            </h3>
            <p className="font-prompt text-xs sm:text-sm text-white/60">
              เลือกจำนวนรูป สไตล์ชุด และรูปแบบการวางขาย ระบบจะสรุปใบสั่งทำส่งเข้าแชท LINE ครูอ้นอัตโนมัติ
            </p>
          </div>

          <div className="space-y-6">
            {/* 1. Choose Package */}
            <div>
              <label className="block font-prompt text-xs sm:text-sm font-bold text-[#4ade80] mb-3">
                1. เลือกขนาดชุดสติกเกอร์:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {STICKER_PACKAGES.map((pkg) => {
                  const isSel = selectedPkgId === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPkgId(pkg.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSel
                          ? "border-[#06C755] bg-[#06C755]/15 ring-1 ring-[#06C755]"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-prompt text-sm font-bold text-white">
                          {pkg.count} แอ็กชัน
                        </span>
                        <span className="font-prompt text-sm font-black text-[#4ade80]">
                          {pkg.price}
                        </span>
                      </div>
                      <p className="font-prompt text-xs text-white/60">
                        {pkg.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Choose Outfit */}
            <div>
              <label className="block font-prompt text-xs sm:text-sm font-bold text-cyan-300 mb-3">
                2. เลือกสไตล์ชุดแต่งกายที่อยากให้วาด:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OUTFIT_STYLES.map((outfit) => {
                  const isSel = selectedOutfit === outfit.id;
                  return (
                    <button
                      key={outfit.id}
                      type="button"
                      onClick={() => setSelectedOutfit(outfit.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        isSel
                          ? "border-cyan-400 bg-cyan-950/40 ring-1 ring-cyan-400"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSel
                            ? "bg-cyan-400 border-cyan-300 text-zinc-950"
                            : "border-white/30"
                        }`}
                      >
                        {isSel && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="font-prompt text-xs sm:text-sm text-white">
                        {outfit.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Choose Publishing Mode */}
            <div>
              <label className="block font-prompt text-xs sm:text-sm font-bold text-amber-300 mb-3">
                3. เลือกรูปแบบการนำขึ้นวางขายบน LINE STORE:
              </label>
              <div className="grid grid-cols-1 gap-3">
                {PUBLISH_MODES.map((mode) => {
                  const isSel = selectedPublishMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setSelectedPublishMode(mode.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSel
                          ? "border-amber-400 bg-amber-950/30 ring-1 ring-amber-400"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-1">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSel
                              ? "bg-amber-400 border-amber-300 text-zinc-950"
                              : "border-white/30"
                          }`}
                        >
                          {isSel && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="font-prompt text-sm font-bold text-white">
                          {mode.title}
                        </span>
                      </div>
                      <p className="font-prompt text-xs text-white/65 pl-7 leading-relaxed">
                        {mode.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Optional Subject / Props Note */}
            <div>
              <label className="block font-prompt text-xs sm:text-sm font-bold text-white/80 mb-2">
                4. ระบุวิชาที่สอน หรือพร็อพประจำตัวสั้นๆ (ไม่บังคับ):
              </label>
              <input
                type="text"
                value={customSubjectNote}
                onChange={(e) => setCustomSubjectNote(e.target.value)}
                placeholder="เช่น ครูภาษาไทยถือไมค์, ครูดนตรีสะพายกีตาร์, ครูคณิตใส่แว่นถือไม้บรรทัด..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-white/35 font-prompt text-sm focus:outline-none focus:border-[#06C755]"
              />
            </div>

            {/* Summary & Submit CTA */}
            <div className="p-6 rounded-2xl bg-linear-to-r from-emerald-950/70 via-slate-900 to-cyan-950/70 border border-[#06C755]/40 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div>
                <p className="font-prompt text-xs text-white/60">
                  แพ็กเกจที่เลือก: <strong className="text-white">{selectedPkg.name} ({selectedPkg.countLabel})</strong>
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-prompt text-3xl sm:text-4xl font-black text-[#4ade80]">
                    {selectedPkg.price}
                  </span>
                  <span className="font-prompt text-xs text-white/50">
                    (ดูแลครบวงจรจนวางขายบน LINE STORE)
                  </span>
                </div>
              </div>

              <a
                href={getLineOrderUrl(buildStickerOrderMsg(selectedPkg))}
                onClick={(e) => handleOrderClick(e, selectedPkg)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-linear-to-r from-[#06C755] to-emerald-500 hover:from-[#05b34c] hover:to-emerald-400 text-zinc-950 font-prompt font-black text-base flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(6,199,85,0.4)] hover:scale-105 transition-all shrink-0"
              >
                <MessageCircle className="w-5 h-5" />
                <span>ส่งบรีฟนี้สั่งทำกับครูอ้นทาง LINE</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* ─── 4-STEP EASY WORKFLOW ─── */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className="font-prompt text-2xl sm:text-3xl font-extrabold text-white">
              4 ขั้นตอนง่ายๆ{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#06C755] to-cyan-400">
                คุณครูรอรับสติกเกอร์ใน LINE ได้เลย
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: "01",
                title: "ส่งรูปถ่าย 1–2 รูป + เลือกชุด",
                desc: "ส่งรูปถ่ายหน้าตรงยิ้มสดใสใน LINE OA พร้อมบอกชุดและพร็อพประจำวิชาที่อยากได้",
              },
              {
                step: "02",
                title: "เลือกคำพูดฮิต (หรือใช้โพยครูอ้น)",
                desc: "แจ้งคำพูด 8 / 16 / 24 คำที่ต้องการ (ถ้าคิดไม่ออก ครูอ้นมีโพยคำพูดครูยอดฮิตให้เลือกครบทุกสายงาน)",
              },
              {
                step: "03",
                title: "ปั้นคาแรกเตอร์ & ตรวจร่าง (1–3 วัน)",
                desc: "ครูอ้นสร้างคาแรกเตอร์ 3D ไดคัทขอบขาว วางป้ายฟอนต์ไทยคมชัด ส่งให้ตรวจและรับไฟล์ PNG ความละเอียดสูง",
              },
              {
                step: "04",
                title: "ส่งตรวจ LINE & รับ Gift เข้าแชท!",
                desc: "ครูอ้นส่งขึ้นระบบ LINE Creators Market เมื่ออนุมัติปุ๊บ กดส่งสติกเกอร์ชุดจริงเข้า LINE คุณครูทันที!",
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-white/10 bg-white/5 flex flex-col justify-between"
              >
                <div className="text-3xl font-black font-mono text-[#4ade80]/30 mb-3">
                  STEP {s.step}
                </div>
                <div>
                  <h4 className="font-prompt text-base font-bold text-white mb-2">
                    {s.title}
                  </h4>
                  <p className="font-prompt text-xs text-white/65 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── FAQ SECTION ─── */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h3 className="font-prompt text-2xl sm:text-3xl font-extrabold text-white">
              คำถามที่พบบ่อย (FAQ)
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "ต้องสมัครบัญชี LINE Creators Market หรือกรอกเอกสารภาษีเองไหม?",
                a: "ไม่ต้องเลยครับ! คุณครูสามารถเลือกแบบ 'ฝากวางขายบนร้าน iAon Tech' ได้เลย ครูอ้นจัดการอัปโหลดและส่งตรวจให้ทั้งหมด พออนุมัติปุ๊บ ครูอ้นกดส่งสติกเกอร์ชุดนั้นเป็นของขวัญ (Gift) ให้เข้า LINE คุณครูฟรี 1 ชุดทันที และเพื่อนครูคนอื่นๆ ก็กดซื้อจากลิงก์ร้านได้ตามปกติครับ (หรือถ้าคุณครูมีบัญชีตัวเองและอยากเอาขึ้นบัญชีตัวเอง ก็เลือกให้ครูอ้นส่งไฟล์ ZIP สำเร็จรูปให้ได้เช่นกันครับ)",
              },
              {
                q: "LINE ใช้เวลาตรวจอนุมัตินานแค่ไหน?",
                a: "ครูอ้นใช้เวลาผลิตและแพ็กไฟล์ให้เสร็จภายใน 1–3 วันทำการ จากนั้นเมื่อกด Request Review แล้ว ทางทีมงาน LINE จะใช้เวลาตรวจอนุมัติประมาณ 1–3 วันทำการก็พร้อมกด Release วางขายบน LINE STORE ได้เลยครับ",
              },
              {
                q: "เอาไฟล์ภาพไปใช้ทำหน้าปก ว.PA หรือสไลด์สอนต่อได้ไหม?",
                a: "ได้ 100% ครับ! ทุกแพ็กเกจครูอ้นแถมไฟล์ภาพ PNG พื้นหลังใสความละเอียดสูงครบทุกแอ็กชัน คุณครูสามารถนำไปวางบน Canva, PowerPoint, Google Slides, ปกรายงาน ว.PA หรือทำคลิปสั้นสร้างตัวตนได้เลยครับ",
              },
              {
                q: "ถ้ายังคิดคำพูด 16 คำไม่ออก ครูอ้นช่วยคิดให้ได้ไหม?",
                a: "ยินดีมากๆ ครับ! ครูอ้นมี 'โพยคำพูดครูยอดฮิตแยกตามวิชาและงานโรงเรียน' (เช่น เซ็ตครูประจำชั้น, เซ็ตครูวิชาการ, เซ็ตครูดนตรี/พละ, เซ็ตส่งงานราชการ) ให้คุณครูจิ้มเลือกหรือปรับคำให้เข้ากับสไตล์ตัวเองได้เลยครับ",
              },
            ].map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span className="font-prompt text-sm sm:text-base font-bold text-white flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-[#4ade80] shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-white/60 shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5 font-prompt text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

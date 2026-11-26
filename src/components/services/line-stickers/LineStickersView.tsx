"use client";

import { useState, useRef } from "react";
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
  Award,
  Check,
  Smile,
  Music,
  HelpCircle,
  ChevronDown,
  Wand2,
  Upload,
  User,
  Phone,
  FileText,
  Loader2,
  Send,
  RefreshCw,
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
    name: "Starter 3D Pack (ชุดเริ่มต้น 8 รูป)",
    countLabel: "สติกเกอร์ภาพนิ่ง 3D 8 รูป + ฟรีภาพปกแชท",
    count: 8,
    price: "990 ฿",
    priceNum: 990,
    originalPrice: "1,590 ฿",
    badge: "⚡ เริ่มต้นคุ้มค่า • จบไวในงบเบาๆ",
    badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
    deliveryDays: "ผลิตภาพ 1–2 วัน (LINE ตรวจอนุมัติเฉลี่ย 1–3 วัน)",
    tagline: "ชุดเริ่มต้น 8 คำพูดฮิตประจำตัว (สำหรับทุกอาชีพ & แชทส่วนตัว)",
    description:
      "เหมาะสำหรับผู้ที่อยากมีสติกเกอร์คาแรกเตอร์ 3D ของตัวเอง ลูกน้อย คู่รัก หรือร้านค้า ไว้ส่งในแชทกลุ่มทำงานและครอบครัวในงบประหยัด",
    features: [
      "ปั้นคาแรกเตอร์ 3D พรีเมียมจากรูปถ่ายจริง 1 ชุดแต่งกาย (เลือกสีชุด/พร็อพได้)",
      "สติกเกอร์ภาพนิ่ง 3D คมชัดสูง 8 ท่าทาง + 8 คำพูดฮิต (เลือกคำพูดเองได้ทุกคำ)",
      "ไดคัทพื้นหลังใส ตีขอบขาว + ป้ายข้อความฟอนต์อ่านง่ายคมชัด",
      "จัดทำภาพหน้าปกสติกเกอร์ (Main) และไอคอนถาดแชท (Tab) ครบมาตรฐาน LINE",
      "ดูแลส่งตรวจอนุมัติขึ้น LINE STORE + ส่งเป็นของขวัญ (Gift) เข้า LINE ให้ใช้ฟรี 1 ชุด",
      "แถมฟรี! ไฟล์ภาพ PNG พื้นหลังใสความละเอียดสูงทั้ง 8 รูป (ใช้แต่งภาพ/สไลด์/ปกร้านได้ทันที)",
    ],
    borderClass:
      "border-[#E2E8F0] hover:border-cyan-400 hover:shadow-md",
    btnGradient:
      "from-[#2563EB] to-[#0891B2] hover:from-[#1D4ED8] hover:to-[#0E7490] text-white",
  },
  {
    id: "pro-16",
    code: "STK-16",
    name: "Signature Pro 16 Pack (ชุดยอดนิยม 16 รูป)",
    countLabel: "สติกเกอร์ภาพนิ่ง 3D 16 รูป + ฟรีภาพปกแชท",
    count: 16,
    price: "1,490 ฿",
    priceNum: 1490,
    originalPrice: "2,490 ฿",
    badge: "🔥 ขายดีอันดับ 1 • คุ้มค่าที่สุด!",
    badgeColor:
      "bg-[#06C755] text-[#052E16] border-[#059669]",
    isPopular: true,
    deliveryDays: "ผลิตภาพ 2–3 วัน (LINE ตรวจอนุมัติเฉลี่ย 1–3 วัน)",
    tagline: "ครบทุกอารมณ์ทำงาน ตอบลูกค้า สอนหนังสือ ประชุม และชีวิตประจำวัน",
    description:
      "เซ็ตมาตรฐานยอดนิยม 16 รูป ครอบคลุมทั้งคำทักทาย รับทราบ ส่งงาน ปิดการขาย ให้กำลังใจ และมุกน่ารักๆ ใช้ได้คุ้มทุกสถานการณ์!",
    features: [
      "ปั้นคาแรกเตอร์ 3D พรีเมียมจากรูปถ่ายจริง (เลือกชุด สีเสื้อ โลโก้บนอกเสื้อ & พร็อพคู่ใจได้)",
      "สติกเกอร์ภาพนิ่ง 3D จัดเต็ม 16 ท่าทาง + 16 คำพูด (มีโพยสำเร็จรูป 6 สายอาชีพให้จิ้มเลือก)",
      "ไดคัทพื้นหลังใส ตีขอบขาวสติกเกอร์ + ป้ายคำพูดฟอนต์ Prompt สีสดคมชัด 100%",
      "ตรวจเช็กระเบียบ LINE Creators Market ทุกพิกเซล การันตีดูแลจนผ่านการอนุมัติ 100%",
      "เลือกเปิดขายสาธารณะ หรือตั้งค่าส่วนตัว (ซื้อได้เฉพาะคนที่มีลิงก์) + ส่ง Gift ฟรี 1 ชุดทันที!",
      "แถมฟรี! ไฟล์ PNG 16 ท่าความละเอียดสูง ใช้ทำปกร้าน / สื่อการสอน / ว.PA / คลิปสั้นเชิงพาณิชย์ได้",
    ],
    borderClass:
      "border-[#06C755] shadow-md lg:scale-[1.02] ring-2 ring-[#06C755]/25",
    btnGradient:
      "from-[#06C755] to-[#05B34C] hover:from-[#05B34C] hover:to-[#049B42] text-[#052E16]",
  },
  {
    id: "vip-24",
    code: "STK-24",
    name: "Master VIP Multi-Look 24 Pack",
    countLabel: "สติกเกอร์ภาพนิ่ง 3D 24 รูป (คละชุดได้ 2-3 ชุด)",
    count: 24,
    price: "1,990 ฿",
    priceNum: 1990,
    originalPrice: "3,490 ฿",
    badge: "👑 จัดเต็มคละชุด • คุ้มสุดระดับ VIP / องค์กร",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    deliveryDays: "ผลิตภาพ 3–4 วัน (LINE ตรวจอนุมัติเฉลี่ย 1–3 วัน)",
    tagline: "คละชุดทำงาน + ชุดลำลอง + ชุดยูนิฟอร์มร้าน/องค์กร ในเซ็ตเดียว",
    description:
      "สำหรับเจ้าของแบรนด์ ผู้บริหาร คุณครู หรือคู่รัก/ครอบครัว ที่ต้องการสติกเกอร์ชุดใหญ่ 24 รูป สามารถคละชุดแต่งกายได้ถึง 3 สไตล์ในคอลเลกชันเดียว",
    features: [
      "ปั้นคาแรกเตอร์ 3D คละชุดแต่งกายได้ 2–3 ชุด (เช่น ชุดสูทผู้บริหาร + ชุดยูนิฟอร์มร้าน + ชุดลำลองไปเที่ยว)",
      "สติกเกอร์ภาพนิ่ง 3D ชุดใหญ่ 24 ท่าทาง + 24 คำพูด ครอบคลุมทั้งแชทงาน แชทลูกค้า และแชทครอบครัว",
      "ไดคัทพื้นหลังใส ตีขอบขาว + ออกแบบป้ายข้อความแยกโทนสีหรือคุมโทนสีแบรนด์ (CI Color)",
      "ดูแลส่งตรวจอนุมัติขึ้น LINE STORE ครบวงจร (พร้อมออกใบเสนอราคา/ใบเสร็จรับเงินสำหรับองค์กรได้)",
      "ส่งสติกเกอร์ชุดจริงเป็นของขวัญ (Gift) ให้คุณและคนสนิทรวม 2 ชุดฟรีทันทีที่อนุมัติ!",
      "แถมฟรี! คลังภาพ PNG คาแรกเตอร์ 24 แอ็กชัน สำหรับสร้าง Personal Branding & การตลาดครบวงจร",
    ],
    borderClass:
      "border-[#FDE68A] hover:border-amber-400 hover:shadow-md",
    btnGradient:
      "from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-[#0F172A]",
  },
];

const SET1_CAPTIONS = [
  "สุดยอดไปเลย!",
  "ช็อกเลยครับ!",
  "ปูเสื่อรอดู...",
  "แอบส่องแป๊บ",
  "อุ๊ย! ขำไม่ไหว",
  "หมดสภาพ...",
  "ไฟลุกพร้อมลุย!",
  "สวัสดี / ขอบคุณครับ",
  "เดี๋ยวก่อน! งานเข้าแล้ว",
  "ร้องไห้หนักมาก",
  "เลิฟเลยครับ!",
  "เย้! ยินดีด้วยคร้าบ!",
  "ขอบคุณจากใจครับ",
  "ขอคิดดูก่อนนะ...",
  "เฮ้อ... โล่งอก!",
  "ฝันดี ราตรีสวัสดิ์",
];

const SET2_CAPTIONS = [
  "พร้อมลุย!",
  "1.. 2.. 3.. ไป!",
  "เช็กซาวด์ OK!",
  "ตั้งสายแป๊บ...",
  "เอาไป 10 เต็ม!",
  "ผิดคอร์ด!!",
  "เข้าห้องซ้อมด่วน!",
  "ส่งคลิปซ้อมด้วย!",
  "อินเนอร์มาเต็ม!",
  "รัวกลองรอเลย!",
  "ขอบคุณครับ",
  "ตรวจงานโต้รุ่ง...",
  "รวมวงด่วน!",
  "รับทราบ จัดให้!",
  "555+ ขำไม่ไหว",
  "เจอกันคาบหน้า!",
];

type PortfolioSetId = "set4_yadom" | "set5_football" | "set3_khaotom" | "set2" | "set1";

interface PortfolioSetConfig {
  id: PortfolioSetId;
  folder: string;
  tabLabel: string;
  title: string;
  statusBadge: string;
  isLive: boolean;
  storeUrl: string;
  activeTabClass: string;
  captions: string[];
}

const PORTFOLIO_SETS: PortfolioSetConfig[] = [
  {
    id: "set4_yadom",
    folder: "set4_yadom",
    tabLabel: "🌿 น้องยาดมเขียว 3D (24 รูป)",
    title: "น้องยาดมเขียว 3D พลังชีวิตคนไทย (Nong Yadom 3D • มาสคอต)",
    statusBadge: "🟡 ส่งตรวจ LINE Creators แล้ว (ID: 49404291)",
    isLive: false,
    storeUrl: "https://line.me/S/shop/sticker/author/6844942",
    activeTabClass: "bg-linear-to-r from-emerald-400 to-teal-500 text-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    captions: [
      "ขอสูดแป๊บ!", "ชื่นใจสุดๆ", "รับทราบจ้า!", "ขอบคุณมากนะ",
      "สวัสดีเช้าวันใหม่", "ความดันขึ้นแล้วนะ!", "จะเป็นลม...", "งานเข้าจนหน้ามืด",
      "ใจเย็นๆ สูดลึกๆ", "รอดเพราะอันนี้แหละ", "ประชุมยาวมาก!", "สู้ชีวิต แต่ชีวิตสู้กลับ",
      "ขอพักสมอง 5 นาที", "โอเค จัดไป!", "สู้ๆ นะ เดี๋ยวก็ผ่านไป", "หิวแล้ว กินไรดี?",
      "เงินเดือนออกยัง?", "สภาพตอนบ่ายสาม", "ปวดหัวตุ้บๆ", "ช็อกเลยดิ!",
      "5555 ขำจนหอบ", "กำลังรีบไป!", "เติมพลังสมุนไพร!", "หมดแรงแล้ว ฝันดีนะ",
    ],
  },
  {
    id: "set5_football",
    folder: "set5_football",
    tabLabel: "⚽ ไอ้ลูกบอลสายปั่น (24 รูป)",
    title: "ไอ้ลูกบอลสายปั่น ขิงเพื่อนบอล (Troll Football 3D • มาสคอต)",
    statusBadge: "🟡 กำลังตรวจ LINE Creators (ID: 49399480)",
    isLive: false,
    storeUrl: "https://line.me/S/shop/sticker/author/6844942",
    activeTabClass: "bg-linear-to-r from-amber-400 to-orange-500 text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]",
    captions: [
      "รับปี๊บไหมเพื่อน?", "ออกจากรูได้แล้ว!", "เงียบกริบเลยนะกลุ่มนี้", "สภาพ!",
      "คาบ้านเลยนะ!", "ข้างบนหนาวจัง!", "ปีหน้าว่ากันใหม่นะ", "แชมป์ว่าวอีกแล้ว!",
      "เช็กตารางคะแนนแป๊บ", "ตื่นยัง? บอลจบแล้ว", "ไหนบอกจะถล่ม?", "เซฟโค้ชด้วยนะ!",
      "ยับเลยเพื่อนรัก!", "ขอเสียงคนแพ้หน่อย!", "ไม่ได้โม้ แค่เรื่องจริง", "ทีมคนจริง ไม่พูดเยอะ",
      "VAR เช็กด่วน!", "กรรมการเข้าข้างป่ะเนี่ย!", "โดนทดเจ็บอีกแล้ว!", "ปลดโค้ชเถอะ!",
      "คืนนี้เจอกัน อย่าหนี!", "ขอคลุมปี๊บแป๊บ...", "ขอมุดหลุมก่อนนะ", "ปิดไฟนอนดีกว่า...",
    ],
  },
  {
    id: "set3_khaotom",
    folder: "set3_khaotom",
    tabLabel: "🐾 ข้าวต้มแมวแฉ็ง (สัตว์เลี้ยง 3D)",
    title: "ข้าวต้มแมวแฉ็ง (Khao Tom - Cute Daily Life • สัตว์เลี้ยง)",
    statusBadge: "🟢 ผ่านอนุมัติแล้ว บน LINE STORE (ID: 49380562)",
    isLive: true,
    storeUrl: "https://line.me/S/sticker/38176379",
    activeTabClass: "bg-linear-to-r from-pink-400 to-rose-500 text-zinc-950 shadow-[0_0_20px_rgba(244,63,94,0.4)]",
    captions: [
      "สวัสดีวันสดใสจ้า", "คิดถึงที่สุดเลย!", "เป็นห่วงนะรู้ไหม", "ทานข้าวหรือยังจ๊ะ?",
      "รักที่สุดในโลก!", "กอดๆ เติมพลังนะ", "กลับบ้านดีๆ น้า", "สู้ๆ นะคนเก่ง!",
      "ขอบคุณที่ดูแลกันนะ", "โอเค ตามใจเลยจ้า!", "งอนแล้วนะ ง้อด้วย!", "โชคดี มีความสุขนะ",
      "เฮงๆ รวยๆ ตลอดไป", "สุขภาพแข็งแรงนะจ๊ะ", "พักผ่อนบ้างนะ เป็นห่วง", "ฝันดี ราตรีสวัสดิ์จ้า",
    ],
  },
  {
    id: "set2",
    folder: "set2",
    tabLabel: "🎸 ครูดนตรีสากล (On Sale)",
    title: "iAon - ครูดนตรีสากลสายลุย (iAon - Western Music Teacher)",
    statusBadge: "🟢 ON SALE บน LINE STORE (ID: 49349839)",
    isLive: true,
    storeUrl: "https://line.me/S/sticker/38159226",
    activeTabClass: "bg-linear-to-r from-[#06C755] to-emerald-500 text-zinc-950 shadow-[0_0_20px_rgba(6,199,85,0.35)]",
    captions: SET2_CAPTIONS,
  },
  {
    id: "set1",
    folder: "set1",
    tabLabel: "😊 Daily Expressions (On Sale)",
    title: "iAon - Daily Expressions (ไอ้อ้น สติกเกอร์พูดได้รายวัน)",
    statusBadge: "🟢 ON SALE บน LINE STORE (ID: 49318083)",
    isLive: true,
    storeUrl: "https://line.me/S/sticker/38143374",
    activeTabClass: "bg-linear-to-r from-cyan-400 to-blue-500 text-zinc-950 shadow-[0_0_20px_rgba(6,182,212,0.35)]",
    captions: SET1_CAPTIONS,
  },
];

const PRESET_CAPTION_PACKS: Record<string, { label: string; words: string[] }> = {
  office: {
    label: "🏢 โพยออฟฟิศ: พนักงานออฟฟิศ / สายทำงาน / WFH ยอดฮิต",
    words: [
      "สวัสดีคร้าบ/ค่ะ",
      "รับทราบ! จัดให้",
      "โอเค ตามนี้เลย!",
      "ขอบคุณมากจ้า",
      "สุดยอดไปเลย!",
      "กำลังปั่นงาน...",
      "ติดประชุมด่วน!",
      "ส่งไฟล์แล้วนะ!",
      "รออนุมัติจ้า",
      "ตามงานหน่อยนะ!",
      "งานเข้าอีกแล้ว!",
      "กาแฟเยียวยาใจ",
      "เคลียร์งานเสร็จ!",
      "สู้ๆ นะทีมเรา!",
      "เลิกงานแล้ว บาย!",
      "ฝันดี พักผ่อนนะ",
      "ขอแก้แป๊บเดียว!",
      "ไฟลุกท่วมโต๊ะ!",
      "เดดไลน์มารอแล้ว",
      "เงินเดือนออกแล้ว!",
      "พักเที่ยงกันเถอะ",
      "ฝากดูอันนี้หน่อย",
      "ยินดีด้วยนะ!",
      "กลับบ้านปลอดภัย!",
    ],
  },
  general: {
    label: "📚 โพยคุณครู: คำพูดครูยอดฮิตทั่วไป (ใช้ได้ทุกวัน)",
    words: [
      "สวัสดีจ้า",
      "รับทราบ!",
      "ขอบคุณมากจ้า",
      "สุดยอดไปเลย!",
      "ส่งงานด้วยนะ!",
      "กำลังปั่นงาน...",
      "ติดประชุมด่วน!",
      "สอนอยู่จ้า",
      "เอาไปเลย เกรด 4!",
      "สู้ๆ นะทุกคน!",
      "งานเข้าอีกแล้ว!",
      "พักเบรกเติมพลัง",
      "ตรวจงานเรียบร้อย!",
      "โอเค จัดไป!",
      "เหนื่อยจัง พักแป๊บ",
      "ฝันดี ราตรีสวัสดิ์",
      "ตรงเวลาด้วยนะ!",
      "เก่งมากลูกศิษย์!",
      "ฝากดูแลด้วยนะ",
      "กำลังเดินทางจ้า",
      "เช็กชื่อหน่อยจ้า!",
      "เลิฟเลย!",
      "ยินดีด้วยนะ!",
      "เจอกันพรุ่งนี้!",
    ],
  },
  executive: {
    label: "🏛️ โพยผู้บริหาร: หัวหน้างาน / ผู้บริหาร / ผอ. / เจ้าของธุรกิจ",
    words: [
      "สวัสดีครับ/ค่ะ",
      "รับทราบ ดำเนินการเลย",
      "อนุมัติ! จัดไป",
      "ขอบคุณทีมงานทุกคน",
      "ติดประชุมผู้บริหาร",
      "ฝากติดตามเรื่องด้วย",
      "เอกสารเรียบร้อยดีมาก",
      "ด่วนที่สุด!",
      "ยอดเยี่ยมมากครับ",
      "เป็นกำลังใจให้นะครับ",
      "เดินทางปลอดภัย",
      "พักดื่มกาแฟก่อน",
      "สรุปผลส่งด้วยนะครับ",
      "โอเค ตามนี้เลย",
      "สู้ไปด้วยกัน!",
      "พักผ่อนนะครับ",
      "รบกวนตรวจทานด้วย",
      "ขอบคุณสำหรับความร่วมมือ",
      "เจอกันที่ห้องประชุม",
      "พร้อมลุยงานใหญ่!",
      "ภูมิใจในทีมนี้!",
      "จัดส่งตามกำหนด",
      "ยินดีด้วยครับ!",
      "ราตรีสวัสดิ์ครับ",
    ],
  },
  activity: {
    label: "🎸 โพยครูสายลุย: ครูสายกิจกรรม (ดนตรี / พละ / วิทย์ / คอมฯ)",
    words: [
      "เข้าคาบเรียนด่วน!",
      "ซ้อมหรือยังพวกเรา?",
      "ส่งคลิปสอบด้วยนะ!",
      "ตั้งใจฟังครูหน่อย!",
      "เอาไปเลย เกรด 4!",
      "เก็บอุปกรณ์ด้วย!",
      "ขออีกเทคเดียว!",
      "พร้อมลุยสนามจริง!",
      "ใครยังไม่ส่งงาน?",
      "สุดยอดฝีมือเลย!",
      "ครูสอนอยู่นะครับ",
      "รับทราบ จัดให้!",
      "สู้ๆ ว่าที่แชมป์!",
      "เหนื่อยแต่คุ้ม!",
      "ขอบคุณมากครับ",
      "เจอกันคาบหน้า!",
      "วอร์มร่างกายก่อน!",
      "ตั้งสติหน่อยพวกเรา!",
      "ผลงานคุณภาพ!",
      "ปั่นโปรเจกต์ไฟลุก!",
      "พักดื่มน้ำก่อน",
      "ปรบมือให้เลย!",
      "โอเค ผ่านฉลุย!",
      "กลับบ้านปลอดภัย!",
    ],
  },
  student: {
    label: "🎒 โพยนักเรียน/นักศึกษา: วัยเรียนสายปั่นงาน / ส่งครู / คุยกับเพื่อน",
    words: [
      "สวัสดีครับ/ค่ะ",
      "รับทราบค้าบ!",
      "ส่งงานแล้วนะครับ!",
      "ขอบคุณมากค้าบ",
      "กำลังปั่นการบ้าน...",
      "อ่านหนังสือสอบ!",
      "ขอเกรด 4 นะครับ!",
      "ไปเรียนก่อนนะ!",
      "งานกลุ่มไฟลุก!",
      "สู้ๆ นะเพื่อน!",
      "การบ้านท่วมหัว!",
      "พักกินหนมแป๊บ",
      "เข้าใจแล้วค้าบ!",
      "โอเค จัดไป!",
      "ง่วงไม่ไหวแล้ว...",
      "ฝันดี ราตรีสวัสดิ์",
      "รอก่อนกำลังไป!",
      "เลิฟเลยค้าบ!",
      "สอบผ่านแล้วเย้!",
      "เลิกเรียนแล้ว!",
      "จดสรุปแป๊บนะ",
      "ขอถามหน่อยค้าบ",
      "ยินดีด้วยนะ!",
      "เจอกันที่โรงเรียน!",
    ],
  },
  seller: {
    label: "🛍️ โพยแม่ค้าออนไลน์ / เซลส์ / เจ้าของแบรนด์ (ปิดการขาย & ตอบลูกค้า)",
    words: [
      "สวัสดีจ้า ยินดีต้อนรับ",
      "รับออเดอร์จ้า!",
      "ขอบคุณที่อุดหนุนน้า",
      "จัดส่งเรียบร้อยจ้า!",
      "แจ้งเลขพัสดุจ้า",
      "พร้อมส่งมากๆ เลย!",
      "โอนแล้วแจ้งสลิปน้า",
      "กำลังแพ็กของจ้า...",
      "สนใจชิ้นไหนทักเลย!",
      "โปรคุ้มมาก ห้ามพลาด!",
      "ของเข้าใหม่จ้า!",
      "รอรับความปังได้เลย",
      "เฮงๆ รวยๆ ปังๆ จ้า",
      "โอเค จัดให้เลย!",
      "ขอเช็กสต็อกแป๊บน้า",
      "ฝันดี ขอบคุณนะจ๊ะ",
      "ลดพิเศษให้เลย!",
      "รีวิวให้ด้วยน้า",
      "เลิฟลูกค้าที่สุด!",
      "ตอบช้าขออภัยจ้า",
      "ยอดเข้าแล้ว ขอบคุณจ้า",
      "ส่งด่วนให้วันนี้เลย!",
      "มีของแถมให้ด้วยน้า",
      "ไว้แวะมาอุดหนุนใหม่นะ",
    ],
  },
  medical: {
    label: "🩺 โพยคุณหมอ / พยาบาล / เภสัชกร / สายสุขภาพ (อยู่เวร & ดูแลสุขภาพ)",
    words: [
      "สวัสดีจ้า",
      "รับทราบเคสจ้า!",
      "ขึ้นเวรแล้วจ้า!",
      "ลงเวรแล้ว เย้!",
      "รับเวรต่อเลยจ้า",
      "คนไข้เต็มวอร์ดเลย!",
      "ดูแลสุขภาพด้วยนะ",
      "ทานยาให้ครบนะจ๊ะ",
      "เคสด่วนเข้าจ้า!",
      "สู้ๆ นะทีมเวรเรา!",
      "พักเติมกาแฟแป๊บ",
      "ตรวจเรียบร้อยดีมาก",
      "โอเค จัดการให้เลย",
      "ขอบคุณมากนะคะ/ครับ",
      "ง่วงไม่ไหว กาแฟด่วน",
      "นอนพักผ่อนเยอะๆ นะ",
      "ดื่มน้ำเยอะๆ น้า",
      "หายไวๆ นะคะ/ครับ",
      "เป็นกำลังใจให้นะ!",
      "ติดตรวจคนไข้อยู่จ้า",
      "ผลตรวจปกติ เยี่ยมมาก!",
      "ส่งเวรเรียบร้อย!",
      "ยินดีด้วยนะจ๊ะ!",
      "ราตรีสวัสดิ์ พักผ่อนนะ",
    ],
  },
  family: {
    label: "💕 โพยสายอ้อนแฟน / ครอบครัว / อวยพรมงคล (ส่งความรัก & พลังบวกทุกวัน)",
    words: [
      "สวัสดีวันสดใสจ้า",
      "คิดถึงที่สุดเลย!",
      "เป็นห่วงนะรู้ไหม",
      "ทานข้าวหรือยังจ๊ะ?",
      "รักที่สุดในโลก!",
      "กอดๆ เติมพลังนะ",
      "กลับบ้านดีๆ น้า",
      "สู้ๆ นะคนเก่ง!",
      "ขอบคุณที่ดูแลกันนะ",
      "โอเค ตามใจเลยจ้า!",
      "งอนแล้วนะ ง้อด้วย!",
      "โชคดี มีความสุขนะ",
      "เฮงๆ รวยๆ ตลอดไป",
      "สุขภาพแข็งแรงนะจ๊ะ",
      "พักผ่อนบ้างนะ เป็นห่วง",
      "ฝันดี ราตรีสวัสดิ์จ้า",
      "ถึงบ้านแล้วบอกด้วยนะ",
      "รออยู่นะจ๊ะ!",
      "เลิฟยู จุ๊บๆ!",
      "เหนื่อยไหม กอดกัน",
      "บุญรักษา พระคุ้มครอง",
      "วันนี้สดใสจังเลย",
      "ยินดีด้วยนะคนเก่ง!",
      "บ๊ายบาย เจอกันนะ!",
    ],
  },
};

function extractShortNickname(rawName: string): string {
  const cleaned = rawName
    .trim()
    .replace(/^(คุณครู|ครู|อาจารย์|ผอ\.|รองฯ|คุณหมอ|หมอ|พยาบาล|เภสัช|คุณ|พี่|น้อง|เด็กชาย|เด็กหญิง|ด\.ช\.|ด\.ญ\.|แม่ค้า|บอส|เฮีย|เจ๊)\s*/i, "")
    .trim();
  return cleaned || "อ้น";
}

function buildNicknameCaptions(rawName: string): string[] {
  const n = extractShortNickname(rawName);
  return [
    `${n}สวัสดีจ้า`,
    `${n}รับทราบ!`,
    `${n}โอเค!`,
    `${n}ขอบคุณจ้า`,
    `สุดยอดไปเลย!`,
    `${n}จัดให้เลย!`,
    `${n}ปั่นงานอยู่...`,
    `${n}ติดประชุม!`,
    `${n}สอนอยู่จ้า`,
    `${n}ทวงงานนะ!`,
    `${n}ให้เกรด 4!`,
    `สู้ๆ นะทุกคน!`,
    `${n}งานเข้าแล้ว!`,
    `${n}พักเบรกแป๊บ`,
    `ตรวจงานเสร็จแล้ว!`,
    `ฝันดีราตรีสวัสดิ์`,
    `${n}เลิฟเลย!`,
    `${n}เหนื่อยจัง...`,
    `${n}พร้อมลุย!`,
    `ยินดีด้วยนะ!`,
    `${n}รอแป๊บนะ`,
    `${n}กำลังไปจ้า`,
    `เก่งมากเลย!`,
    `บ๊ายบาย เจอกัน!`,
  ];
}

function buildOfficeNicknameCaptions(rawName: string): string[] {
  const n = extractShortNickname(rawName);
  return [
    `${n}สวัสดีจ้า`,
    `${n}รับทราบ!`,
    `${n}โอเคจัดไป!`,
    `${n}ขอบคุณจ้า`,
    `สุดยอดไปเลย!`,
    `${n}จัดให้เลย!`,
    `${n}ปั่นงานอยู่...`,
    `${n}ติดประชุม!`,
    `${n}ส่งงานแล้วนะ!`,
    `${n}ตามงานนะ!`,
    `อนุมัติผ่าน!`,
    `สู้ๆ นะทีมเรา!`,
    `${n}งานเข้าแล้ว!`,
    `${n}พักจิบกาแฟ`,
    `${n}เคลียร์งานจบ!`,
    `${n}เลิกงานแล้ว!`,
    `${n}เลิฟเลย!`,
    `${n}เหนื่อยจัง...`,
    `${n}พร้อมลุย!`,
    `ยินดีด้วยนะ!`,
    `${n}รอแป๊บนะ`,
    `${n}กำลังไปจ้า`,
    `เก่งมากเลย!`,
    `ฝันดี พักผ่อนนะ`,
  ];
}

function buildStudentNicknameCaptions(rawName: string): string[] {
  const n = extractShortNickname(rawName);
  return [
    `${n}สวัสดีจ้า`,
    `${n}รับทราบ!`,
    `${n}โอเคจัดไป!`,
    `${n}ขอบคุณจ้า`,
    `${n}ส่งงานแล้วนะ!`,
    `${n}ปั่นการบ้านอยู่`,
    `${n}ตั้งใจเรียนอยู่!`,
    `${n}อ่านหนังสือสอบ`,
    `${n}ขอเกรด 4 นะ!`,
    `สู้ๆ นะทุกคน!`,
    `การบ้านท่วมหัว!`,
    `${n}พักกินหนมแป๊บ`,
    `${n}สอบผ่านแล้วเย้!`,
    `${n}เลิกเรียนแล้ว!`,
    `${n}ง่วงจังเลย...`,
    `ฝันดีราตรีสวัสดิ์`,
    `${n}เลิฟเลย!`,
    `สุดยอดไปเลย!`,
    `${n}พร้อมลุย!`,
    `ยินดีด้วยนะ!`,
    `${n}รอแป๊บนะ`,
    `${n}กำลังไปเรียน!`,
    `เก่งมากเลย!`,
    `บ๊ายบาย เจอกัน!`,
  ];
}

function buildSellerNicknameCaptions(rawName: string): string[] {
  const n = extractShortNickname(rawName);
  return [
    `${n}สวัสดีจ้า`,
    `${n}รับออเดอร์จ้า!`,
    `${n}ขอบคุณที่อุดหนุน`,
    `${n}จัดส่งแล้วจ้า!`,
    `แจ้งเลขพัสดุน้า`,
    `พร้อมส่งมาก!`,
    `${n}กำลังแพ็กของจ้า`,
    `โอนแล้วแจ้งสลิปน้า`,
    `${n}เช็กสต็อกแป๊บจ้า`,
    `โปรคุ้มมาก!`,
    `${n}ลดพิเศษให้เลย!`,
    `ยอดเข้าแล้ว ขอบคุณจ้า!`,
    `เฮงๆ รวยๆ น้า!`,
    `${n}โอเค จัดให้เลย!`,
    `รีวิวให้ด้วยน้า`,
    `ฝันดี ขอบคุณน้า`,
    `${n}เลิฟลูกค้าที่สุด!`,
    `ของเข้าใหม่จ้า!`,
    `${n}พร้อมลุยส่งด่วน!`,
    `${n}ยินดีให้บริการ!`,
    `รอรับได้เลยจ้า`,
    `มีของแถมให้น้า`,
    `สุดยอดไปเลย!`,
    `แวะมาอุดหนุนใหม่นะ`,
  ];
}

function buildMedicalNicknameCaptions(rawName: string): string[] {
  const n = extractShortNickname(rawName);
  return [
    `${n}สวัสดีจ้า`,
    `${n}รับทราบเคสจ้า!`,
    `${n}ขึ้นเวรแล้วจ้า!`,
    `${n}ลงเวรแล้ว เย้!`,
    `${n}รับเวรต่อเลย!`,
    `คนไข้เต็มเลย!`,
    `ดูแลสุขภาพด้วยนะ`,
    `ทานยาให้ครบนะจ๊ะ`,
    `เคสด่วนเข้าจ้า!`,
    `สู้ๆ นะทีมเรา!`,
    `${n}พักเติมกาแฟแป๊บ`,
    `${n}ตรวจเรียบร้อยจ้า`,
    `${n}โอเค จัดให้เลย!`,
    `${n}ขอบคุณมากจ้า`,
    `หายไวๆ นะจ๊ะ!`,
    `นอนพักผ่อนเยอะๆ นะ`,
    `${n}เลิฟเลย!`,
    `ผลตรวจเยี่ยมมาก!`,
    `${n}พร้อมลุยเวรดึก!`,
    `ยินดีด้วยจ้า!`,
    `${n}ติดตรวจอยู่น้า`,
    `ดื่มน้ำเยอะๆ นะ`,
    `${n}ส่งเวรเรียบร้อย!`,
    `ฝันดี พักผ่อนนะ`,
  ];
}

function buildFamilyNicknameCaptions(rawName: string): string[] {
  const n = extractShortNickname(rawName);
  return [
    `${n}สวัสดีวันสดใส`,
    `${n}คิดถึงจังเลย!`,
    `${n}เป็นห่วงนะจ๊ะ`,
    `ทานข้าวหรือยัง?`,
    `${n}รักที่สุดเลย!`,
    `กอดเติมพลังนะ`,
    `กลับบ้านดีๆ น้า`,
    `สู้ๆ นะคนเก่ง!`,
    `${n}ขอบคุณนะจ๊ะ`,
    `${n}โอเค ตามใจเลย!`,
    `${n}งอนแล้ว ง้อด้วย!`,
    `โชคดี มีสุขนะ`,
    `เฮงๆ รวยๆ จ้า!`,
    `สุขภาพแข็งแรงนะ`,
    `พักผ่อนบ้างน้า`,
    `ฝันดีนะ จุ๊บๆ`,
    `${n}เลิฟยูที่สุด!`,
    `${n}รออยู่นะจ๊ะ`,
    `ถึงบ้านบอกด้วยนะ`,
    `ยินดีด้วยนะ!`,
    `เหนื่อยไหม กอดกัน`,
    `บุญรักษานะจ๊ะ`,
    `เก่งมากเลย!`,
    `บ๊ายบาย เจอกันนะ!`,
  ];
}

const OUTFIT_STYLES = [
  { id: "office-smart", label: "💼 ชุดพนักงานออฟฟิศ / สมาร์ทแคชชวล / สูทเบลเซอร์วัยทำงาน" },
  { id: "office-casual", label: "👕 ชุดลำลองสบายๆ / เสื้อโปโลบริษัท / ยูนิฟอร์มองค์กร / WFH" },
  { id: "seller-shop", label: "🛍️ ชุดแม่ค้าออนไลน์ / เจ้าของแบรนด์ / เซลส์ (ถือกล่องพัสดุ/ป้ายโปร/ถุงช้อป)" },
  { id: "medical-coat", label: "🩺 ชุดคุณหมอ / ชุดพยาบาล / เภสัชกร / ชุดสครับ (Scrub) สายสุขภาพ" },
  { id: "family-casual", label: "💕 ชุดไปเที่ยวคาเฟ่ / ชุดลำลองน่ารักอ้อนแฟน / ชุดผ้าไทยอวยพรมงคล" },
  { id: "student-uniform", label: "🎒 ชุดนักเรียน / ชุดนักศึกษา / ชุดพละโรงเรียน / ชุดรับปริญญา" },
  { id: "subject", label: "🎸 ชุดคุณครูประจำวิชา / สายลุย (ดนตรี, พละ, วิทย์, คอมฯ, ศิลปะ)" },
  { id: "khaki", label: "👔 ชุดข้าราชการสีกากี / ชุดสูทผู้บริหารเนี๊ยบๆ" },
  { id: "casual", label: "🏫 ชุดครูวัยรุ่น สมาร์ทแคชชวล / เสื้อโปโลโรงเรียน" },
  { id: "mixed", label: "✨ คละหลายชุดในเซ็ตเดียว (สำหรับแพ็กเกจ 16 หรือ 24 รูป)" },
];

const CHARACTER_TYPES = [
  { id: "female", label: "👩 ผู้หญิง (Female)" },
  { id: "male", label: "👨 ผู้ชาย (Male)" },
  { id: "couple", label: "💑 คู่รัก / 2 คนในเซ็ตเดียว" },
  { id: "kid", label: "👶 เด็ก / ลูกน้อย" },
  { id: "pet-mascot", label: "🐾 สัตว์เลี้ยง / มาสคอตแบรนด์" },
];

const PUBLISH_MODES = [
  {
    id: "iaon-store-public",
    title: "🌐 ฝากวางขายสาธารณะบนร้าน iAon Tech (แนะนำ • สะดวกที่สุด 100%)",
    desc: "ไม่ต้องสมัครบัญชี LINE Creators หรือกรอกภาษีญี่ปุ่นเอง ครูอ้นอัปโหลดขึ้นร้าน iAon Tech ให้ครบวงจร พออนุมัติปุ๊บ ส่งสติกเกอร์เป็น Gift เข้า LINE ให้คุณใช้ฟรีทันที และเพื่อนๆ สามารถค้นหาหรือกดซื้อจากลิงก์ได้ทั่วโลก!",
  },
  {
    id: "iaon-store-private",
    title: "🔒 ฝากอัปโหลดแบบส่วนตัว (ซ่อนจากหน้าร้าน • โหลดได้เฉพาะคนที่มีลิงก์)",
    desc: "เหมาะสำหรับผู้ที่ต้องการความเป็นส่วนตัว คู่รัก ลูกน้อย หรือใช้เฉพาะในองค์กร สติกเกอร์จะไม่แสดงในหน้าค้นหาสาธารณะของ LINE STORE เฉพาะคนที่คุณส่งลิงก์ให้เท่านั้นถึงจะเห็นและดาวน์โหลดได้ (ครูอ้นส่ง Gift ให้ใช้ฟรีเหมือนเดิม!)",
  },
  {
    id: "own-account",
    title: "💼 อัปโหลดเข้าบัญชี LINE Creators ของลูกค้า/บริษัทเอง (รับรายได้จากยอดขาย 100%)",
    desc: "ครูอ้นส่งมอบไฟล์ ZIP มาตรฐาน LINE (ครบทั้ง 01-16.png, main.png, tab.png) พร้อมโพยชื่อและคำอธิบาย 2 ภาษา ให้คุณกดอัปโหลดเข้าบัญชีตัวเองเพื่อรับส่วนแบ่งยอดขายเข้าบัญชีของคุณหรือบริษัทโดยตรง",
  },
];

export function LineStickersView() {
  const [activePortfolioTab, setActivePortfolioTab] = useState<PortfolioSetId>("set4_yadom");
  const [selectedPkgId, setSelectedPkgId] = useState<string>("pro-16");
  const [selectedOutfit, setSelectedOutfit] = useState<string>("office-smart");
  const [selectedPublishMode, setSelectedPublishMode] = useState<string>("iaon-store-public");

  // Full Brief Form States
  const [teacherName, setTeacherName] = useState<string>("");
  const [contactInfo, setContactInfo] = useState<string>("");
  const [characterType, setCharacterType] = useState<string>("female");
  const [colorTheme, setColorTheme] = useState<string>("");
  const [propsAndTrait, setPropsAndTrait] = useState<string>("");
  const [stickerTitleTh, setStickerTitleTh] = useState<string>("");
  const [stickerTitleEn, setStickerTitleEn] = useState<string>("");
  const [selectedPresetKey, setSelectedPresetKey] = useState<string>("office-nickname");
  const [captions, setCaptions] = useState<string[]>(
    buildOfficeNicknameCaptions("")
  );
  const [photoBase64, setPhotoBase64] = useState<string>("");
  const [photoFileName, setPhotoFileName] = useState<string>("");
  const [isSubmittingBrief, setIsSubmittingBrief] = useState<boolean>(false);
  const [submittedOrderId, setSubmittedOrderId] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { openLineModal } = useLineModal();

  const selectedPkg =
    STICKER_PACKAGES.find((p) => p.id === selectedPkgId) || STICKER_PACKAGES[1];
  const selectedOutfitObj =
    OUTFIT_STYLES.find((o) => o.id === selectedOutfit) || OUTFIT_STYLES[0];
  const selectedPublishObj =
    PUBLISH_MODES.find((m) => m.id === selectedPublishMode) || PUBLISH_MODES[0];

  // Client-side image compression via HTML5 Canvas (Max 900px, JPEG 75% quality per iaon_coding_dna.md)
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFileName(file.name);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const MAX_DIM = 800;
        let width = img.width;
        let height = img.height;
        if (width > height && width > MAX_DIM) {
          height = Math.round((height * MAX_DIM) / width);
          width = MAX_DIM;
        } else if (height > MAX_DIM) {
          width = Math.round((width * MAX_DIM) / height);
          height = MAX_DIM;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL("image/jpeg", 0.72);
          setPhotoBase64(compressed);
        }
      };
      if (typeof ev.target?.result === "string") {
        img.src = ev.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const applyPresetCaptions = (presetKey: string) => {
    setSelectedPresetKey(presetKey);
    if (presetKey === "nickname") {
      setCaptions(buildNicknameCaptions(teacherName));
      return;
    }
    if (presetKey === "office-nickname") {
      setCaptions(buildOfficeNicknameCaptions(teacherName));
      return;
    }
    if (presetKey === "student-nickname") {
      setCaptions(buildStudentNicknameCaptions(teacherName));
      return;
    }
    if (presetKey === "seller-nickname") {
      setCaptions(buildSellerNicknameCaptions(teacherName));
      return;
    }
    if (presetKey === "medical-nickname") {
      setCaptions(buildMedicalNicknameCaptions(teacherName));
      return;
    }
    if (presetKey === "family-nickname") {
      setCaptions(buildFamilyNicknameCaptions(teacherName));
      return;
    }
    const pack = PRESET_CAPTION_PACKS[presetKey];
    if (pack) {
      setCaptions([...pack.words]);
    }
  };

  const handleOutfitSelect = (outfitId: string) => {
    setSelectedOutfit(outfitId);
    if (outfitId === "office-smart" || outfitId === "office-casual") {
      setSelectedPresetKey("office-nickname");
      setCaptions(buildOfficeNicknameCaptions(teacherName));
    } else if (outfitId === "seller-shop") {
      setSelectedPresetKey("seller-nickname");
      setCaptions(buildSellerNicknameCaptions(teacherName));
    } else if (outfitId === "medical-coat") {
      setSelectedPresetKey("medical-nickname");
      setCaptions(buildMedicalNicknameCaptions(teacherName));
    } else if (outfitId === "family-casual") {
      setSelectedPresetKey("family-nickname");
      setCaptions(buildFamilyNicknameCaptions(teacherName));
    } else if (outfitId === "student-uniform") {
      setSelectedPresetKey("student-nickname");
      setCaptions(buildStudentNicknameCaptions(teacherName));
    } else if (outfitId === "subject" || outfitId === "casual" || outfitId === "khaki") {
      setSelectedPresetKey("nickname");
      setCaptions(buildNicknameCaptions(teacherName));
    }
  };

  const handleTeacherNameChange = (val: string) => {
    setTeacherName(val);
    if (selectedPresetKey === "nickname") {
      setCaptions(buildNicknameCaptions(val));
    } else if (selectedPresetKey === "office-nickname") {
      setCaptions(buildOfficeNicknameCaptions(val));
    } else if (selectedPresetKey === "student-nickname") {
      setCaptions(buildStudentNicknameCaptions(val));
    } else if (selectedPresetKey === "seller-nickname") {
      setCaptions(buildSellerNicknameCaptions(val));
    } else if (selectedPresetKey === "medical-nickname") {
      setCaptions(buildMedicalNicknameCaptions(val));
    } else if (selectedPresetKey === "family-nickname") {
      setCaptions(buildFamilyNicknameCaptions(val));
    }
  };

  const updateSingleCaption = (index: number, value: string) => {
    setCaptions((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const selectedCharTypeObj =
    CHARACTER_TYPES.find((c) => c.id === characterType) || CHARACTER_TYPES[0];

  const buildStickerOrderMsg = (pkg: StickerPackage, orderId?: string) => {
    const activeCaps = captions
      .slice(0, pkg.count)
      .map((c, idx) => `${String(idx + 1).padStart(2, "0")}.${c}`)
      .join(", ");
    const orderTag = orderId ? `\n🆔 รหัสใบสั่งทำ: ${orderId}` : "";
    const nameTag = teacherName.trim() ? `\n👤 ชื่อบนสติกเกอร์: ${teacherName.trim()} (${selectedCharTypeObj.label})` : "";
    const colorLine = colorTheme.trim() ? `\n🎨 สีชุด/สีแบรนด์ (CI): ${colorTheme.trim()}` : "";
    const noteLine = propsAndTrait.trim()
      ? `\n🎸 อาชีพ/พร็อพ/จุดเด่น: ${propsAndTrait.trim()}`
      : "";
    return `สวัสดีครับครูอ้น สนใจจ้างทำสติกเกอร์ LINE คาแรกเตอร์ 3D ครบวงจรครับ 🎨✨${orderTag}${nameTag}
📦 แพ็กเกจ: [${pkg.code}] ${pkg.name} (${pkg.countLabel})
💰 ราคาโปรเปิดตัว: ${pkg.price}
👔 สไตล์ชุดที่ต้องการ: ${selectedOutfitObj.label}${colorLine}
🏪 รูปแบบการวางขาย: ${selectedPublishObj.title}${noteLine}
💬 คำพูดที่เลือก (${pkg.count} คำ): ${activeCaps}

รบกวนขอเลขบัญชี / PromptPay QR Code เพื่อชำระเงินและเริ่มผลิตสติกเกอร์ได้เลยครับ 🙏`;
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

  const handleBriefFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!teacherName.trim()) {
      setSubmitError("กรุณากรอกชื่อเล่นหรือชื่อที่ใช้บนสติกเกอร์ก่อนกดส่งบรีฟครับ");
      return;
    }

    setIsSubmittingBrief(true);
    try {
      const activeCaptions = captions
        .slice(0, selectedPkg.count)
        .map((c, i) => c.trim() || `คำพูดที่ ${i + 1}`);

      const combinedTrait = [
        `เพศ/รูปแบบ: ${selectedCharTypeObj.label}`,
        colorTheme.trim() ? `สีเสื้อ/สีแบรนด์: ${colorTheme.trim()}` : "",
        propsAndTrait.trim() ? `พร็อพ/จุดเด่น: ${propsAndTrait.trim()}` : "ตามรูปถ่ายต้นแบบ",
      ]
        .filter(Boolean)
        .join(" | ");

      const res = await fetch("/api/sticker-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherName: teacherName.trim(),
          contactInfo: contactInfo.trim(),
          packageCode: selectedPkg.code,
          packageName: selectedPkg.name,
          packagePrice: selectedPkg.price,
          stickerCount: selectedPkg.count,
          outfitStyle: selectedOutfitObj.label,
          publishMode: selectedPublishObj.title,
          propsAndTrait: combinedTrait,
          stickerTitleTh:
            stickerTitleTh.trim() || `${teacherName.trim()} สดใสทุกวัน`,
          stickerTitleEn:
            stickerTitleEn.trim() || `${teacherName.trim()} Cute Daily Life`,
          captions: activeCaptions,
          photoBase64: photoBase64 || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "ส่งบรีฟไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      } else {
        setSubmittedOrderId(data.orderId || "STK-READY");
      }
    } catch {
      setSubmitError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSubmittingBrief(false);
    }
  };

  const activePortfolio =
    PORTFOLIO_SETS.find((p) => p.id === activePortfolioTab) || PORTFOLIO_SETS[0];
  const activeSetFolder = activePortfolio.folder;
  const activeCaptions = activePortfolio.captions;

  return (
    <div className="min-h-screen text-[#1E293B] overflow-x-hidden relative pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 relative z-10">
        {/* ─── HERO SECTION ─── */}
        <div className="text-center max-w-4xl mx-auto mb-14 space-y-6">
          <div className="flex justify-center">
            <img
              src="/brand/svg/aiaon-studio_lockup_horizontal_fullcolor-on-light.svg"
              alt="AiAon Studio by AiAon Tech"
              className="h-10 sm:h-12 w-auto"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#DDD6FE] bg-[#FAF5FF] text-[#6D28D9] font-prompt text-xs sm:text-sm font-bold tracking-wide"
          >
            <Sparkles className="w-4 h-4 text-[#7C3AED]" />
            <span>บริการรับทำสติกเกอร์ LINE คาแรกเตอร์ 3D ครบวงจร</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-prompt text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-tight"
          >
            เปลี่ยนรูปถ่ายของคุณ เป็น{" "}
            <span className="text-[#7C3AED]">
              สติกเกอร์ LINE คาแรกเตอร์ 3D สุดเท่
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="font-prompt text-base sm:text-lg text-[#475569] leading-relaxed max-w-3xl mx-auto"
          >
            รองรับทุกสายอาชีพ! ทั้ง <strong className="text-[#0F172A]">พนักงานออฟฟิศ • แม่ค้าออนไลน์/แบรนด์ร้านค้า • คุณหมอ/พยาบาล • คู่รัก/ลูกน้อย/สัตว์เลี้ยง • นักเรียน • และคุณครู</strong> แค่ส่งรูปถ่าย 1 รูป + จิ้มเลือกโพยคำพูดฮิตบนหน้าเว็บนี้ ครูอ้นดูแลครบวงจรจนขึ้น{" "}
            <strong className="text-[#007A36]">LINE STORE</strong> พร้อมแถมไฟล์ PNG พื้นหลังใสความละเอียดสูงเอาไปแต่งปกร้านและสื่อโซเชียลได้ทันที!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <a
              href="#brief-form"
              className="px-8 py-4 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-prompt font-black text-base flex items-center gap-2.5 shadow-sm transition-all duration-300 hover:scale-105"
            >
              <Wand2 className="w-5 h-5" />
              <span>กรอกบรีฟ &amp; อัปโหลดรูปสั่งทำทันที (เริ่ม 990 ฿)</span>
            </a>

            <a
              href="https://line.me/S/sticker/38143374"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#7C3AED] hover:bg-[#FAF5FF] text-[#0F172A] font-prompt font-semibold text-sm sm:text-base flex items-center gap-2 transition-all shadow-2xs"
            >
              <ExternalLink className="w-4 h-4 text-[#6D28D9]" />
              <span>ดูของจริงบน LINE STORE (ชุดที่ 1 On Sale)</span>
            </a>
          </motion.div>
        </div>

        {/* ─── LIVE PORTFOLIO SHOWCASE (5 REAL PRODUCTION SETS) ─── */}
        <div className="mb-20 rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col gap-6 mb-8 pb-6 border-b border-[#E2E8F0]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-prompt font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>REAL PRODUCTION GALLERY • ผลงานจริงที่ผ่านระบบ LINE Creators Market</span>
              </div>
              <h2 className="font-prompt text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                ตัวอย่างผลงานจริง 5 สไตล์ (คนจริง • สัตว์เลี้ยง • มาสคอต 3D)
              </h2>
              <p className="font-prompt text-xs sm:text-sm text-[#475569] mt-1">
                คลิกสลับดูตัวอย่างครบทุกแนว: คมชัดทุกคำ • ไดคัทเนี้ยบทุกรูป • รองรับทั้ง 16 และ 24 แอ็กชัน
              </p>
            </div>

            {/* Switch Tabs (5 Real Sets) */}
            <div className="flex flex-wrap items-center gap-2.5">
              {PORTFOLIO_SETS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePortfolioTab(item.id)}
                  className={`px-4 py-2.5 rounded-xl font-prompt text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                    activePortfolioTab === item.id
                      ? item.activeTabClass + " border-transparent"
                      : "bg-[#FAF8F5] text-[#475569] border-[#E2E8F0] hover:bg-[#F1ECE4] hover:text-[#0F172A]"
                  }`}
                >
                  <span>{item.tabLabel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Collection Status Bar */}
          <div className="mb-6 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={`/images/stickers/${activeSetFolder}/main.png`}
                alt="Main Sticker Cover"
                className="w-16 h-16 rounded-2xl bg-white p-1.5 border border-[#E2E8F0] object-contain shrink-0 shadow-2xs"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-prompt text-base sm:text-lg font-extrabold text-[#0F172A]">
                    {activePortfolio.title}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-prompt font-bold border ${
                      activePortfolio.isLive
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    {activePortfolio.statusBadge}
                  </span>
                </div>
                <p className="font-prompt text-xs text-[#64748B] mt-1">
                  มาตรฐานไฟล์แท้: {activeCaptions.length} รูป (`370×320 px`) + รูปปก `main.png` (`240×240 px`) + ไอคอนแท็บ `tab.png` (`96×74 px`)
                </p>
              </div>
            </div>

            <a
              href={activePortfolio.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-prompt text-xs font-extrabold flex items-center gap-2 transition-all shrink-0 shadow-xs"
            >
              <span>{activePortfolio.isLive ? "เปิดดูชุดนี้บน LINE STORE" : "เปิดดูร้าน iAon Tech บน LINE STORE"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Dynamic 16 / 24 Sticker Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
            {Array.from({ length: activeCaptions.length }, (_, idx) => {
              const numStr = String(idx + 1).padStart(2, "0");
              const caption = activeCaptions[idx] || `แอ็กชัน #${numStr}`;
              return (
                <motion.div
                  key={`${activeSetFolder}-${numStr}`}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.02 }}
                  className="group rounded-2xl bg-[#FAF8F5] hover:bg-white border border-[#E2E8F0] hover:border-[#06C755] p-3 flex flex-col items-center justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-sm"
                >
                  <div className="w-full flex items-center justify-between text-[10px] font-mono text-[#94A3B8] mb-1">
                    <span>#{numStr}</span>
                    <span className="text-[#059669] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      PNG ใส
                    </span>
                  </div>
                  <div className="w-full aspect-square flex items-center justify-center p-1">
                    <img
                      src={`/images/stickers/${activeSetFolder}/${numStr}.png`}
                      alt={caption}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain drop-shadow-[0_4px_10px_rgba(15,23,42,0.14)] group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <p className="font-prompt text-[11px] font-semibold text-[#1E293B] text-center mt-2 line-clamp-1">
                    {caption}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── 3 PRICING PACKAGES ─── */}
        <div id="packages" className="mb-20 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-prompt font-bold">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>SPECIAL LAUNCH PRICING • โปรโมชันเปิดตัวสุดคุ้มสำหรับทุกสายอาชีพ</span>
            </div>
            <h2 className="font-prompt text-2xl sm:text-4xl font-extrabold text-[#0F172A]">
              เลือกแพ็กเกจสติกเกอร์ LINE 3D{" "}
              <span className="text-[#059669]">
                ที่เหมาะกับสไตล์และธุรกิจของคุณ
              </span>
            </h2>
            <p className="font-prompt text-sm text-[#475569]">
              ราคาเดียวจบครบวงจร ไม่มีบวกเพิ่ม ได้ทั้งสติกเกอร์ภาพนิ่ง 3D ขึ้น LINE STORE และไฟล์ภาพ PNG ความละเอียดสูง (ต้องการชุดใหญ่ 32–40 รูป หรือออกใบเสนอราคาองค์กร ทัก LINE ได้เลยครับ)
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {STICKER_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-7 sm:p-8 border bg-white shadow-sm flex flex-col justify-between transition-all duration-300 ${pkg.borderClass}`}
              >
                {pkg.badge && (
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-prompt font-extrabold shadow-xs border whitespace-nowrap ${pkg.badgeColor}`}
                  >
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 pt-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E2E8F0] text-[#475569] font-mono text-xs font-bold">
                      {pkg.code}
                    </span>
                    <span className="font-prompt text-xs font-bold text-[#059669]">
                      {pkg.countLabel}
                    </span>
                  </div>

                  <h3 className="font-prompt text-2xl font-extrabold text-[#0F172A] mb-1">
                    {pkg.name}
                  </h3>
                  <p className="font-prompt text-xs text-[#64748B] mb-5">
                    {pkg.tagline}
                  </p>

                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] mb-5">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-prompt text-3xl sm:text-4xl font-black text-[#0F172A]">
                        {pkg.price}
                      </span>
                      <span className="font-prompt text-sm text-[#94A3B8] line-through">
                        {pkg.originalPrice}
                      </span>
                    </div>
                    <p className="font-prompt text-xs text-[#0E7490] font-medium mt-1">
                      ⏱️ ระยะเวลาผลิตภาพ: {pkg.deliveryDays}
                    </p>
                  </div>

                  <p className="font-prompt text-xs text-[#475569] leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  <div className="space-y-2.5 mb-8 border-t border-[#F1F5F9] pt-5">
                    <p className="font-prompt text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
                      สิ่งที่คุณจะได้รับครบชุด:
                    </p>
                    {pkg.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2.5 text-xs font-prompt text-[#1E293B]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F1F5F9] space-y-2.5">
                  <a
                    href="#brief-form"
                    onClick={() => setSelectedPkgId(pkg.id)}
                    className={`w-full py-3.5 px-4 rounded-2xl font-prompt font-black text-sm flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.02] active:scale-95 bg-linear-to-r ${pkg.btnGradient}`}
                  >
                    <Wand2 className="w-4 h-4" />
                    <span>เลือกชุดนี้ &amp; กรอกบรีฟด้านล่าง ({pkg.price})</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── FULL INTERACTIVE BRIEF FORM + PHOTO UPLOAD + 16-WORD PICKER ─── */}
        <div
          id="brief-form"
          className="mb-20 max-w-5xl mx-auto rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-10 shadow-sm scroll-mt-24"
        >
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-prompt font-bold">
              <Wand2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>DIRECT AI STUDIO BRIEF FORM • ส่งบรีฟตรงเข้าห้องผลิตสติกเกอร์ครูอ้น</span>
            </div>
            <h3 className="font-prompt text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              แบบฟอร์มส่งบรีฟ &amp; อัปโหลดรูปถ่ายต้นแบบ
            </h3>
            <p className="font-prompt text-xs sm:text-sm text-[#475569]">
              กรอกข้อมูลด้านล่างให้ครบ ระบบจะส่งรูปถ่ายและคำพูดทั้ง {selectedPkg.count} คำตรงไปที่ระบบ AI ของครูอ้นเพื่อปั้นคาแรกเตอร์ต้นแบบให้ตรวจทันที!
            </p>
          </div>

          {submittedOrderId ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-3xl border border-emerald-300 bg-emerald-50 text-center space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-[#06C755] text-[#052E16] flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-9 h-9 stroke-[3]" />
              </div>
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-white border border-emerald-200 text-emerald-800 font-mono text-xs font-bold">
                  รหัสใบสั่งทำ: {submittedOrderId}
                </span>
                <h4 className="font-prompt text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                  ส่งบรีฟและรูปถ่ายถึงระบบ AI ของครูอ้นเรียบร้อยแล้วครับ! 🎉
                </h4>
                <p className="font-prompt text-sm text-[#475569] max-w-xl mx-auto leading-relaxed">
                  ตอนนี้ข้อมูลและรูปถ่ายของ <strong className="text-[#0F172A]">{teacherName}</strong> ถูกส่งเข้าห้องผลิตของครูอ้นแล้ว ขั้นตอนสุดท้าย กดปุ่มด้านล่างเพื่อรับ <strong className="text-[#0F172A]">QR Code พร้อมเพย์ ({selectedPkg.price})</strong> และรับภาพคาแรกเตอร์ต้นแบบใน LINE OA ได้เลยครับ!
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
                <a
                  href={getLineOrderUrl(
                    buildStickerOrderMsg(selectedPkg, submittedOrderId)
                  )}
                  onClick={(e) => {
                    const msg = buildStickerOrderMsg(
                      selectedPkg,
                      submittedOrderId
                    );
                    if (!isMobileDevice()) {
                      e.preventDefault();
                      openLineModal({
                        title: `ชำระเงินสติกเกอร์ LINE (${submittedOrderId})`,
                        price: selectedPkg.price,
                        itemCode: selectedPkg.code,
                        message: msg,
                      });
                    }
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-prompt font-black text-base flex items-center gap-2.5 shadow-sm hover:scale-105 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>กดยืนยันใน LINE &amp; รับ QR พร้อมเพย์ ({selectedPkg.price})</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                <button
                  type="button"
                  onClick={() => setSubmittedOrderId("")}
                  className="px-5 py-4 rounded-2xl bg-white hover:bg-[#FAF8F5] border border-[#E2E8F0] text-[#475569] font-prompt text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>แก้ไขข้อมูลบรีฟอีกครั้ง</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleBriefFormSubmit} className="space-y-8">
              {/* STEP 1: Customer Info & Photo Upload */}
              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] space-y-5">
                <h4 className="font-prompt text-base font-extrabold text-[#059669] flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  <span>ส่วนที่ 1: ข้อมูลผู้สั่งทำ &amp; รูปถ่ายต้นแบบ (รองรับทุกอาชีพ / ร้านค้า / คู่รัก / สัตว์เลี้ยง)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-prompt text-xs font-bold text-[#334155] mb-1.5">
                      ชื่อเล่น / ชื่อแบรนด์ที่ใช้เรียกบนสติกเกอร์ (จำเป็น) *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={teacherName}
                        onChange={(e) => handleTeacherNameChange(e.target.value)}
                        placeholder="เช่น เมย์, บอย, ร้านพลอยสวย, หมอเจ, ครูอ้น..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] placeholder:text-[#94A3B8] font-prompt text-sm focus:outline-none focus:border-[#06C755] focus:ring-2 focus:ring-[#06C755]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-prompt text-xs font-bold text-[#334155] mb-1.5">
                      เบอร์โทร หรือ ชื่อ LINE ของคุณ (ไว้ส่งรูปต้นแบบให้ตรวจ)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        placeholder="เช่น 08x-xxx-xxxx หรือชื่อใน LINE..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] placeholder:text-[#94A3B8] font-prompt text-sm focus:outline-none focus:border-[#06C755] focus:ring-2 focus:ring-[#06C755]/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Character Gender / Type Pills */}
                <div>
                  <label className="block font-prompt text-xs font-bold text-[#334155] mb-2">
                    รูปแบบคาแรกเตอร์ / เพศ (ช่วยให้ AI ปั้นโครงหน้าและเลือกหมวด LINE ได้แม่นยำ 100%):
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CHARACTER_TYPES.map((ct) => {
                      const isSel = characterType === ct.id;
                      return (
                        <button
                          key={ct.id}
                          type="button"
                          onClick={() => setCharacterType(ct.id)}
                          className={`px-3.5 py-2 rounded-xl font-prompt text-xs font-bold transition-all cursor-pointer border ${
                            isSel
                              ? "bg-[#06C755] text-[#052E16] border-[#059669] shadow-xs"
                              : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#0F172A]"
                          }`}
                        >
                          {ct.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Photo Upload Box */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pt-1">
                  <div className="sm:col-span-2">
                    <label className="block font-prompt text-xs font-bold text-[#334155] mb-1.5">
                      อัปโหลดรูปถ่ายต้นแบบ (รูปเซลฟี่เห็นหน้า-ทรงผมชัด หรือรูปคู่/สัตว์เลี้ยง/โลโก้ร้าน)
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoSelect}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full p-4 rounded-2xl border-2 border-dashed border-[#06C755]/60 hover:border-[#06C755] bg-white hover:bg-emerald-50/40 text-left flex items-center justify-between gap-4 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-prompt text-sm font-bold text-[#0F172A]">
                            {photoFileName
                              ? `เลือกรูปแล้ว: ${photoFileName}`
                              : "คลิกเพื่อเลือกรูปถ่ายจากมือถือ / คอมพิวเตอร์"}
                          </p>
                          <p className="font-prompt text-xs text-[#64748B]">
                            (หากต้องการส่งหลายรูป เช่น รูปคน + รูปโลโก้ร้าน สามารถส่งเพิ่มในแชท LINE หลังกดยืนยันได้ครับ)
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1.5 rounded-xl bg-[#06C755] text-[#052E16] font-prompt text-xs font-black shrink-0">
                        เลือกรูป
                      </span>
                    </button>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    {photoBase64 ? (
                      <div className="relative group">
                        <img
                          src={photoBase64}
                          alt="Customer Reference Preview"
                          className="w-28 h-28 rounded-2xl object-cover border-2 border-[#06C755] shadow-sm"
                        />
                        <span className="block text-[11px] font-prompt text-emerald-700 text-center mt-1 font-bold">
                          ✓ รูปต้นแบบพร้อมส่ง
                        </span>
                      </div>
                    ) : (
                      <div className="w-28 h-28 rounded-2xl border border-[#E2E8F0] bg-white flex flex-col items-center justify-center text-[#94A3B8] p-2 text-center">
                        <Camera className="w-6 h-6 mb-1" />
                        <span className="font-prompt text-[10px]">
                          อัปโหลดที่นี่ หรือส่งรูปใน LINE ภายหลังได้
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Color Theme + Props & Facial Traits + Sticker Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block font-prompt text-xs font-bold text-[#334155] mb-1.5">
                      🎨 สีเสื้อ / สีประจำแบรนด์ (CI Color) / โลโก้บนอกเสื้อ
                    </label>
                    <input
                      type="text"
                      value={colorTheme}
                      onChange={(e) => setColorTheme(e.target.value)}
                      placeholder="เช่น สูทสีชมพูพาสเทล, เสื้อเชิ้ตสีฟ้า, สีแบรนด์เขียว-ทอง, หรือตามรูปถ่าย"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] placeholder:text-[#94A3B8] font-prompt text-xs sm:text-sm focus:outline-none focus:border-[#06C755]"
                    />
                  </div>
                  <div>
                    <label className="block font-prompt text-xs font-bold text-[#334155] mb-1.5">
                      🎸 อาชีพ / พร็อพคู่ใจ / จุดเด่นใบหน้า (แว่นตา, ทรงผม, สัตว์เลี้ยง)
                    </label>
                    <input
                      type="text"
                      value={propsAndTrait}
                      onChange={(e) => setPropsAndTrait(e.target.value)}
                      placeholder="เช่น ถือแก้วกาแฟ+โน้ตบุ๊ก, ถือกล่องพัสดุ, ใส่แว่นกลม, อุ้มแมวส้ม..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] placeholder:text-[#94A3B8] font-prompt text-xs sm:text-sm focus:outline-none focus:border-[#06C755]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-prompt text-xs font-bold text-[#334155] mb-1.5">
                      ชื่อชุดสติกเกอร์ภาษาไทย (โชว์บน LINE • เว้นว่างให้ครูอ้นตั้งให้ได้)
                    </label>
                    <input
                      type="text"
                      value={stickerTitleTh}
                      onChange={(e) => setStickerTitleTh(e.target.value)}
                      placeholder="เช่น เมย์สายลุยออฟฟิศ / พลอยแม่ค้าออนไลน์ / ครูอ้นใจดี"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] placeholder:text-[#94A3B8] font-prompt text-xs sm:text-sm focus:outline-none focus:border-[#06C755]"
                    />
                  </div>
                  <div>
                    <label className="block font-prompt text-xs font-bold text-[#334155] mb-1.5">
                      ชื่อชุดภาษาอังกฤษ (เว้นว่างไว้ได้เลย • ครูอ้นตั้งชื่อภาษาอังกฤษให้ฟรี!)
                    </label>
                    <input
                      type="text"
                      value={stickerTitleEn}
                      onChange={(e) => setStickerTitleEn(e.target.value)}
                      placeholder="เว้นว่างได้เลย หรือระบุ เช่น May Office Cute Life"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] placeholder:text-[#94A3B8] font-prompt text-xs sm:text-sm focus:outline-none focus:border-[#06C755]"
                    />
                  </div>
                </div>
              </div>

              {/* STEP 2: Package, Outfit & Publishing Mode */}
              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] space-y-6">
                <h4 className="font-prompt text-base font-extrabold text-[#1D4ED8] flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  <span>ส่วนที่ 2: เลือกขนาดแพ็กเกจ, ชุดแต่งกาย และการวางขาย</span>
                </h4>

                {/* Package Size */}
                <div>
                  <label className="block font-prompt text-xs font-bold text-[#334155] mb-2.5">
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
                              ? "border-[#06C755] bg-emerald-50 ring-1 ring-[#06C755]"
                              : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-prompt text-sm font-bold text-[#0F172A]">
                              {pkg.count} แอ็กชัน
                            </span>
                            <span className="font-prompt text-sm font-black text-[#059669]">
                              {pkg.price}
                            </span>
                          </div>
                          <p className="font-prompt text-xs text-[#64748B]">
                            {pkg.name}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Outfit Style */}
                <div>
                  <label className="block font-prompt text-xs font-bold text-[#334155] mb-2.5">
                    2. เลือกสไตล์ชุดแต่งกายหลัก:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {OUTFIT_STYLES.map((outfit) => {
                      const isSel = selectedOutfit === outfit.id;
                      return (
                        <button
                          key={outfit.id}
                          type="button"
                          onClick={() => handleOutfitSelect(outfit.id)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                            isSel
                              ? "border-[#2563EB] bg-[#EFF6FF] ring-1 ring-[#2563EB]"
                              : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSel
                                ? "bg-[#2563EB] border-[#2563EB] text-white"
                                : "border-[#CBD5E1]"
                            }`}
                          >
                            {isSel && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="font-prompt text-xs sm:text-sm text-[#0F172A]">
                            {outfit.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Publishing Mode */}
                <div>
                  <label className="block font-prompt text-xs font-bold text-[#334155] mb-2.5">
                    3. รูปแบบการนำขึ้นวางขายบน LINE STORE:
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
                              ? "border-amber-400 bg-[#FEF9EF] ring-1 ring-amber-400"
                              : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 mb-1">
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                isSel
                                  ? "bg-amber-500 border-amber-500 text-white"
                                  : "border-[#CBD5E1]"
                              }`}
                            >
                              {isSel && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className="font-prompt text-sm font-bold text-[#0F172A]">
                              {mode.title}
                            </span>
                          </div>
                          <p className="font-prompt text-xs text-[#475569] pl-7 leading-relaxed">
                            {mode.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* STEP 3: Interactive 8 / 16 / 24 Captions Grid with 1-Click Preset Loader */}
              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-prompt text-base font-extrabold text-[#B45309] flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      <span>
                        ส่วนที่ 3: กำหนดคำพูดบนสติกเกอร์ทั้ง {selectedPkg.count} รูป
                      </span>
                    </h4>
                    <p className="font-prompt text-xs text-[#475569] mt-0.5 leading-relaxed">
                      💡 <strong className="text-[#0F172A]">ไม่ต้องคิดท่าทางเอง!</strong> ครูอ้นและระบบ AI จะออกแบบท่าทางและอารมณ์ให้เข้ากับคำพูดแต่ละข้อโดยอัตโนมัติ (คลิกปุ่มโพยด้านล่างเพื่อเติมคำใน 1 คลิก หรือพิมพ์แก้คำที่ต้องการได้เลย แนะนำไม่เกิน 12–15 ตัวอักษรเพื่อความคมชัดสูงสุด)
                    </p>
                  </div>

                  {/* Preset Loader Buttons (All Top-Selling Nickname & General Presets) */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => applyPresetCaptions("office-nickname")}
                      className={`px-3 py-2 rounded-xl font-prompt text-xs font-bold transition-all cursor-pointer border ${
                        selectedPresetKey === "office-nickname"
                          ? "bg-amber-400 text-[#0F172A] border-amber-500 shadow-xs"
                          : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#0F172A]"
                      }`}
                    >
                      {`💼 โพยชื่อเล่นสายออฟฟิศ (เช่น "${extractShortNickname(teacherName)}รับทราบ!", "${extractShortNickname(teacherName)}ส่งงานแล้วนะ!")`}
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPresetCaptions("seller-nickname")}
                      className={`px-3 py-2 rounded-xl font-prompt text-xs font-bold transition-all cursor-pointer border ${
                        selectedPresetKey === "seller-nickname"
                          ? "bg-amber-400 text-[#0F172A] border-amber-500 shadow-xs"
                          : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#0F172A]"
                      }`}
                    >
                      {`🛍️ โพยชื่อเล่นแม่ค้าออนไลน์/เซลส์ (เช่น "${extractShortNickname(teacherName)}รับออเดอร์จ้า!", "${extractShortNickname(teacherName)}จัดส่งแล้วจ้า!")`}
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPresetCaptions("medical-nickname")}
                      className={`px-3 py-2 rounded-xl font-prompt text-xs font-bold transition-all cursor-pointer border ${
                        selectedPresetKey === "medical-nickname"
                          ? "bg-amber-400 text-[#0F172A] border-amber-500 shadow-xs"
                          : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#0F172A]"
                      }`}
                    >
                      {`🩺 โพยชื่อเล่นหมอ/พยาบาล (เช่น "${extractShortNickname(teacherName)}ขึ้นเวรแล้วจ้า!", "${extractShortNickname(teacherName)}ดูแลสุขภาพนะ")`}
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPresetCaptions("family-nickname")}
                      className={`px-3 py-2 rounded-xl font-prompt text-xs font-bold transition-all cursor-pointer border ${
                        selectedPresetKey === "family-nickname"
                          ? "bg-amber-400 text-[#0F172A] border-amber-500 shadow-xs"
                          : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#0F172A]"
                      }`}
                    >
                      {`💕 โพยชื่อเล่นสายอ้อนแฟน/ครอบครัว (เช่น "${extractShortNickname(teacherName)}คิดถึงจังเลย!", "${extractShortNickname(teacherName)}รักที่สุดเลย!")`}
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPresetCaptions("student-nickname")}
                      className={`px-3 py-2 rounded-xl font-prompt text-xs font-bold transition-all cursor-pointer border ${
                        selectedPresetKey === "student-nickname"
                          ? "bg-amber-400 text-[#0F172A] border-amber-500 shadow-xs"
                          : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#0F172A]"
                      }`}
                    >
                      {`🎒 โพยชื่อเล่นนักเรียน/นักศึกษา (เช่น "${extractShortNickname(teacherName)}ปั่นการบ้านอยู่", "${extractShortNickname(teacherName)}ขอเกรด 4 นะ!")`}
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPresetCaptions("nickname")}
                      className={`px-3 py-2 rounded-xl font-prompt text-xs font-bold transition-all cursor-pointer border ${
                        selectedPresetKey === "nickname"
                          ? "bg-amber-400 text-[#0F172A] border-amber-500 shadow-xs"
                          : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#0F172A]"
                      }`}
                    >
                      {`✨ โพยชื่อเล่นสายคุณครู (เช่น "${extractShortNickname(teacherName)}สอนอยู่จ้า", "${extractShortNickname(teacherName)}ให้เกรด 4!")`}
                    </button>
                    {Object.entries(PRESET_CAPTION_PACKS).map(([key, pack]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => applyPresetCaptions(key)}
                        className={`px-3 py-2 rounded-xl font-prompt text-xs font-bold transition-all cursor-pointer border ${
                          selectedPresetKey === key
                            ? "bg-amber-400 text-[#0F172A] border-amber-500 shadow-xs"
                            : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#0F172A]"
                        }`}
                      >
                        {pack.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {Array.from({ length: selectedPkg.count }, (_, idx) => {
                    const numStr = String(idx + 1).padStart(2, "0");
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-white border border-[#CBD5E1] rounded-xl px-3 py-2 focus-within:border-[#06C755] focus-within:ring-2 focus-within:ring-[#06C755]/15"
                      >
                        <span className="font-mono text-xs font-bold text-[#059669] shrink-0">
                          #{numStr}
                        </span>
                        <input
                          type="text"
                          maxLength={22}
                          value={captions[idx] || ""}
                          onChange={(e) => updateSingleCaption(idx, e.target.value)}
                          placeholder={`คำพูดที่ ${numStr}...`}
                          className="w-full bg-transparent text-[#0F172A] placeholder:text-[#94A3B8] font-prompt text-xs sm:text-sm focus:outline-none"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {submitError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 font-prompt text-xs sm:text-sm text-center">
                  ⚠️ {submitError}
                </div>
              )}

              {/* Submit Brief Bar */}
              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-5">
                <div>
                  <p className="font-prompt text-xs text-[#475569]">
                    แพ็กเกจที่เลือก:{" "}
                    <strong className="text-[#0F172A]">
                      [{selectedPkg.code}] {selectedPkg.name} ({selectedPkg.count} รูป)
                    </strong>
                  </p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-prompt text-3xl sm:text-4xl font-black text-[#059669]">
                      {selectedPkg.price}
                    </span>
                    <span className="font-prompt text-xs text-[#64748B]">
                      (ส่งบรีฟตรงเข้าเครื่องครูอ้น + ปั้นรูปต้นแบบให้ตรวจก่อนทำครบเซ็ต)
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingBrief}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] disabled:opacity-50 text-[#052E16] font-prompt font-black text-base flex items-center justify-center gap-2.5 shadow-sm hover:scale-[1.02] transition-all cursor-pointer shrink-0"
                >
                  {isSubmittingBrief ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>กำลังส่งบรีฟและรูปถ่ายให้ครูอ้น...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>🚀 ส่งบรีฟ &amp; รูปถ่ายเข้าห้องผลิตครูอ้นทันที</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ─── WHY CUSTOMERS LOVE THIS (3 VALUE PILLARS) ─── */}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Palette,
              title: "1. คาแรกเตอร์ 3D เอกลักษณ์เฉพาะตัวคุณ",
              desc: "ปั้นจากใบหน้าและบุคลิกจริงของคุณ เลือกใส่ชุดสูทออฟฟิศ ชุดแม่ค้าออนไลน์ ชุดหมอ-พยาบาล ชุดคู่รัก หรือชุดคุณครู พร้อมระบุสีแบรนด์ (CI) และโลโก้บนอกเสื้อได้ตามสั่ง",
              iconClass: "bg-[#FAF5FF] border-[#DDD6FE] text-[#6D28D9]",
            },
            {
              icon: ShieldCheck,
              title: "2. ดูแลส่งตรวจ LINE STORE จนผ่าน 100%",
              desc: "ไม่ต้องปวดหัวกับกฎรูปตกขอบ พื้นหลังไม่ใส หรือการตั้งค่าภาษาอังกฤษใน LINE Creators Market ครูอ้นจัดการแพ็กไฟล์และส่งตรวจให้ครบวงจร (เลือกเปิดสาธารณะหรือซ่อนลิงก์ส่วนตัวได้)",
              iconClass: "bg-emerald-50 border-emerald-200 text-emerald-700",
            },
            {
              icon: Gift,
              title: "3. ได้ทั้งสติกเกอร์ LINE + คลังภาพ PNG คมชัดสูง",
              desc: "นอกจากได้สติกเกอร์ไว้กดส่งในแชทแล้ว ยังได้รับไฟล์ภาพ PNG พื้นหลังใสความละเอียดสูงครบทุกท่า เอาไปทำปกร้านค้า ป้ายโฆษณา สไลด์นำเสนอ หรือทำคลิป TikTok เชิงพาณิชย์ได้ทันที",
              iconClass: "bg-[#FEF9EF] border-[#FDE68A] text-[#92400E]",
            },
          ].map((item, i) => {
            const IconComp = item.icon;
            return (
              <div
                key={i}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 ${item.iconClass}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-prompt text-lg sm:text-xl font-extrabold text-[#0F172A] mb-2">
                    {item.title}
                  </h3>
                  <p className="font-prompt text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── FAQ SECTION ─── */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h3 className="font-prompt text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              คำถามที่พบบ่อย (FAQ)
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "ต้องสมัครบัญชี LINE Creators Market หรือกรอกเอกสารภาษีเองไหม?",
                a: "ไม่ต้องเลยครับ! คุณสามารถเลือกแบบ 'ฝากวางขายบนร้าน iAon Tech' ได้เลย ครูอ้นจัดการอัปโหลดและส่งตรวจให้ทั้งหมด พออนุมัติปุ๊บ ครูอ้นกดส่งสติกเกอร์ชุดนั้นเป็นของขวัญ (Gift) เข้า LINE ให้คุณใช้งานฟรี 1 ชุดทันที และเพื่อนๆ หรือลูกค้าก็กดดาวน์โหลดจากลิงก์ได้ตามปกติครับ",
              },
              {
                q: "ใช้เวลาผลิตและรอ LINE ตรวจอนุมัตินานแค่ไหน? (สำหรับคนรีบใช้งาน / ส่งเป็นของขวัญ)",
                a: "ครูอ้นปั้นภาพคาแรกเตอร์ต้นแบบรูปที่ 1 ให้คุณตรวจภายใน 24 ชม. หลังยืนยันออเดอร์ เมื่อคุณอนุมัติต้นแบบแล้ว จะผลิตครบทั้ง 8/16/24 รูปและส่งตรวจขึ้นระบบ LINE ทันที โดยปกติทีมงาน LINE ใช้เวลาตรวจอนุมัติเพียง 1–3 วันทำการเท่านั้นครับ!",
              },
              {
                q: "ไม่อยากให้คนแปลกหน้าค้นเจอรูปเราบน LINE STORE ตั้งเป็นแบบส่วนตัวได้ไหม?",
                a: "ทำได้ 100% ครับ! ในฟอร์มส่วนที่ 2 คุณสามารถเลือก '🔒 ฝากอัปโหลดแบบส่วนตัว (ซ่อนจากหน้าร้าน)' ได้เลย สติกเกอร์ของคุณจะไม่แสดงในระบบค้นหาสาธารณะของ LINE STORE เฉพาะครอบครัว เพื่อน หรือคนที่คุณส่งลิงก์ให้เท่านั้นถึงจะมองเห็นและดาวน์โหลดได้ครับ",
              },
              {
                q: "สั่งทำในนามบริษัท / แบรนด์ร้านค้า ออกใบเสนอราคาและใบเสร็จรับเงินได้ไหม? และใครเป็นเจ้าของลิขสิทธิ์ภาพ?",
                a: "ออกเอกสารใบเสนอราคาและใบเสร็จรับเงินให้ได้ครบถ้วนครับ! และไฟล์ภาพ PNG พื้นหลังใสความละเอียดสูงทั้งหมดที่แถมให้ ลูกค้าสามารถนำไปใช้งานเชิงพาณิชย์ โพสต์โปรโมตร้านค้า ติดป้ายโฆษณา พิมพ์สติกเกอร์ หรือแต่งสไลด์ได้โดยไม่ติดลิขสิทธิ์ 100% ครับ",
              },
              {
                q: "อยากทำสติกเกอร์คู่รัก 2 คน, รูปลูกน้อย, สัตว์เลี้ยง หรือชุดใหญ่ 32–40 รูป รับทำไหม?",
                a: "รับทำทั้งหมดครับ! คุณสามารถติ๊กเลือกรูปแบบ 'คู่รัก / เด็ก / สัตว์เลี้ยง / มาสคอต' ในฟอร์มส่วนที่ 1 ได้เลย ส่วนถ้าต้องการชุดใหญ่พิเศษ 32 หรือ 40 รูป หรือต้องการส่งรูปถ่ายหลายมุม สามารถกดส่งบรีฟเบื้องต้นแล้วส่งรูปเพิ่มเติมใน LINE OA ได้ทันทีครับ",
              },
            ].map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E2E8F0] bg-white shadow-2xs overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5] transition-colors"
                  >
                    <span className="font-prompt text-sm sm:text-base font-bold text-[#0F172A] flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-[#6D28D9] shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#64748B] shrink-0 transition-transform ${
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
                        className="px-5 pb-5 font-prompt text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#F1F5F9] pt-3"
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

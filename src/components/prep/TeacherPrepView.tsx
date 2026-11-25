"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Bot, Music, Send, CheckCircle2,
  XCircle, Clock,
  ArrowRight, Zap,
  Headphones, MessageCircle, Lightbulb, Play, Pause,
  Crown, BookOpen
} from "lucide-react";
import Link from "next/link";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { GoldenTicketMockup } from "@/components/prep/GoldenTicketMockup";
import { PREP_VIP_DATA, PREP_BOT_ONLY_DATA, KRURANK_AI_PRO_DATA, PrepVipProduct } from "@/components/prep/prepDataHelper";
import { TeacherPrepDetailSection } from "@/components/prep/TeacherPrepDetailSection";
import { getLineOrderUrl } from "@/lib/line";

interface QuizItem {
  id: string;
  timeSlot: string;
  category: string;
  badgeColor: string;
  question: string;
  options: string[];
  correctIndex: number;
  aiExplanation: string;
  mnemonicTip: string;
}

const SAMPLE_QUIZZES: QuizItem[] = [
  {
    id: "q-morning",
    timeSlot: "🌅 รอบเช้า 07:30 น. • กฎหมายการศึกษา & พ.ร.บ.",
    category: "ภาค ข • กฎหมายการศึกษา",
    badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
    question:
      "ข้อใดคือ 'โทษทางวินัยอย่างไม่ร้ายแรง' ตาม พ.ร.บ.ระเบียบข้าราชการครูและบุคลากรทางการศึกษา?",
    options: [
      "ก. ภาคทัณฑ์, ตัดเงินเดือน, ลดขั้นเงินเดือน",
      "ข. ว่ากล่าวตักเตือน, ภาคทัณฑ์, ตัดเงินเดือน",
      "ค. ภาคทัณฑ์, ลดเงินเดือน, ปลดออก",
      "ง. ตัดเงินเดือน, ลดเงินเดือน, ไล่ออก",
    ],
    correctIndex: 0,
    aiExplanation:
      "💡 วิเคราะห์โดย AI ครูอ้น: โทษทางวินัยมีทั้งหมด 5 สถาน แบ่งเป็น 'ไม่ร้ายแรง 3 สถาน' ได้แก่ ภาคทัณฑ์, ตัดเงินเดือน, ลดขั้นเงินเดือน (ปัจจุบันปรับคำเป็นลดเงินเดือนตามกฎหมายแก้ไขเพิ่มเติม) ส่วน 'ร้ายแรง 2 สถาน' คือ ปลดออก และ ไล่ออก! ข้อ ข. หลอกคำว่า 'ว่ากล่าวตักเตือน' (ใช้กรณีทำผิดเล็กน้อยและงดโทษภาคทัณฑ์ ไม่นับเป็น 1 ใน 5 สถานโทษทางวินัย)",
    mnemonicTip:
      "🎵 ท่อนฮุกเพลงจำ: 'วินัยครูมีห้าสถาน... ไม่ร้ายแรงสามงาน คือ ภาค-ตัด-ลด! ถ้าร้ายแรงจำให้หมด คือ ปลด-ไล่ออก!'",
  },
  {
    id: "q-noon",
    timeSlot: "☀️ รอบเที่ยง 12:15 น. • วิชาการศึกษา & การออกแบบการเรียนรู้",
    category: "ภาค ข • มาตรฐานวิชาการศึกษา",
    badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
    question:
      "การออกแบบการจัดการเรียนรู้แบบ Backward Design (เข้าใจด้วยกระบวนการย้อนกลับ) ขั้นตอนแรกสุดที่ครูต้องทำคือข้อใด?",
    options: [
      "ก. ออกแบบกิจกรรมการเรียนรู้แบบ Active Learning ที่น่าสนใจ",
      "ข. กำหนดเป้าหมายการเรียนรู้ หรือผลลัพธ์ที่ต้องการให้เกิดกับผู้เรียน",
      "ค. สร้างเครื่องมือวัดและประเมินผลตามสภาพจริง (Rubrics)",
      "ง. สำรวจสื่อเทคโนโลยีและแหล่งเรียนรู้ในชุมชน",
    ],
    correctIndex: 1,
    aiExplanation:
      "💡 วิเคราะห์โดย AI ครูอ้น: Backward Design มี 3 ขั้นตอนหลักเสมอ: 1. กำหนดเป้าหมายการเรียนรู้ที่ต้องการ (Identify Desired Results) 2. กำหนดหลักฐานการเรียนรู้และการประเมินผล (Determine Acceptable Evidence) 3. วางแผนจัดประสบการณ์และกิจกรรมการเรียนรู้ (Plan Learning Experiences) ข้อสอบชอบหลอกให้ครูเลือกทำกิจกรรมก่อน!",
    mnemonicTip:
      "🎵 ท่อนฮุกเพลงจำ: 'Backward Design ย้อนศรสามขั้น... หนึ่งตั้งเป้าหมาย สองสร้างเกณฑ์วัด สามจัดกิจกรรม!'",
  },
  {
    id: "q-night",
    timeSlot: "🌙 รอบค่ำ 20:00 น. • มาตรฐานวิชาชีพครู & จรรยาบรรณ",
    category: "ภาค ข • วินัยและจรรยาบรรณ",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    question:
      "ครูนำผลงานของนักเรียนไปตีพิมพ์เผยแพร่เป็นผลงานของตนเองเพื่อขอเลื่อนวิทยฐานะ เป็นการกระทำที่ผิดจรรยาบรรณต่อสิ่งใดโดยตรงที่สุด?",
    options: [
      "ก. จรรยาบรรณต่อตนเอง",
      "ข. จรรยาบรรณต่อวิชาชีพ",
      "ค. จรรยาบรรณต่อผู้รับบริการ",
      "ง. จรรยาบรรณต่อสังคม",
    ],
    correctIndex: 2,
    aiExplanation:
      "💡 วิเคราะห์โดย AI ครูอ้น: นักเรียนถือเป็น 'ผู้รับบริการ' โดยตรงของครู การแสวงหาประโยชน์ส่วนตนโดยมิชอบจากผลงานผู้เรียน ถือเป็นการละเมิดจรรยาบรรณต่อผู้รับบริการ และยังอาจเข้าข่ายผิดวินัยร้ายแรงเรื่องการลอกเลียนผลงานทางวิชาการอีกด้วย!",
    mnemonicTip:
      "🎵 ท่อนฮุกเพลงจำ: 'จรรยาบรรณห้าด้านท่องไว้... ตนเอง วิชาชีพ ผู้รับบริการ ร่วมวิชาชีพ และ สังคมไทย!'",
  },
];

interface MnemonicSong {
  id: string;
  title: string;
  topic: string;
  genre: string;
  lyrics: string[];
  examFrequency: string;
}

const MNEMONIC_SONGS: MnemonicSong[] = [
  {
    id: "s1",
    title: "เพลง: โทษวินัย 5 สถาน (ไม่ร้ายแรง 3 • ร้ายแรง 2)",
    topic: "พ.ร.บ.ระเบียบข้าราชการครูฯ มาตรา 96",
    genre: "Acoustic Pop สดใส 110 BPM",
    lyrics: [
      "วินัยครูมีห้าสถาน... จำให้ขึ้นใจในห้องสอบหนา",
      "ไม่ร้ายแรงสามงาน คือ ภาคทัณฑ์ - ตัดเงินเดือน - ลดเงินเดือน!",
      "ถ้าร้ายแรงสองข้อเตือน... ปลดออกได้บำนาญ ไล่ออกไม่เหลือสักบาทเดียว!",
    ],
    examFrequency: "🔥 ออกสอบทุกสนาม 100%",
  },
  {
    id: "s2",
    title: "เพลง: คุรุสภา & มาตรฐานวิชาชีพ 3 ด้าน",
    topic: "พ.ร.บ.สภาครูและบุคลากรทางการศึกษา 2546",
    genre: "Bright Indie Folk 120 BPM",
    lyrics: [
      "มาตรฐานวิชาชีพมีสามประการ... ความรู้และประสบการณ์วิชาชีพหนึ่ง",
      "การปฏิบัติงานข้อสองต้องซึ้ง... การปฏิบัติตนนั้นหึ่ง คือ จรรยาบรรณ!",
      "ใบอนุญาตประกอบวิชาชีพมีอายุห้าปี... ต่อล่วงหน้าดีๆ ร้อยแปดสิบวัน!",
    ],
    examFrequency: "⭐ ออกสอบซ้ำกว่า 8 รอบ",
  },
  {
    id: "s3",
    title: "เพลง: Bloom's Taxonomy 6 ขั้นบันไดการเรียนรู้",
    topic: "วิชาการศึกษา • การวัดและประเมินผล",
    genre: "Groove R&B Chill 95 BPM",
    lyrics: [
      "จำ - เข้าใจ - ประยุกต์ใช้... สามขั้นแรกก้าวไปในระดับฐาน",
      "วิเคราะห์ - ประเมินค่า - สร้างสรรค์ตระการ... ขั้นสูงสุดของงานสร้างนวัตกรรม!",
    ],
    examFrequency: "🎯 จุดตัดคะแนน ภาค ข",
  },
];

const PREP_TIERS = [
  {
    id: "free-channel",
    name: "Telegram กลุ่มติวฟรี (Public Channel)",
    price: "ฟรี 0 ฿",
    period: "เข้ากลุ่มได้ทันที ไม่มีค่าใช้จ่าย",
    badge: "🟢 เปิดรับสมาชิกใหม่",
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
    borderClass: "border-[#E2E8F0] hover:border-emerald-400",
    isPopular: false,
    productData: null,
    features: [
      "รับโจทย์ Daily Quiz ส่งตรงเข้า Telegram วันละ 1 ข้อ (กดทำ Poll เช็กคำตอบได้ทันที)",
      "สรุปเก็งจุดออกสอบซ้ำ (High-Yield One-Page Summary) รายสัปดาห์",
      "ทดลองฟังตัวอย่างเพลงช่วยจำกฎหมายครู (Mnemonic Songs Preview)",
      "แจ้งเตือนข่าวประกาศรับสมัครสอบครูผู้ช่วย สพฐ. / กทม. / อปท. ก่อนใคร",
    ],
    ctaText: "เข้ากลุ่ม Telegram ติวฟรี / ทักรับลิงก์",
    isVip: false,
  },
  {
    id: "bot-only-pass",
    name: "AiAon Prep VIP Bot Pass (เฉพาะกลุ่ม & บอท AI)",
    price: "290 ฿",
    period: "จ่ายครั้งเดียว • ดูแลยาวจนกว่าจะสอบบรรจุติด!",
    badge: "🎯 สั่งซื้อแยก • เน้นฝึกทำข้อสอบ",
    badgeClass: "bg-cyan-50 text-cyan-800 border-cyan-200 font-bold",
    borderClass: "border-[#E2E8F0] hover:border-cyan-400",
    isPopular: false,
    productData: PREP_BOT_ONLY_DATA,
    features: [
      "🤖 บอทส่งข้อสอบ Telegram Daily Quiz ครบ 3 รอบทุกวัน (07:30 / 12:15 / 20:00 น.) พร้อม AI อธิบายเฉลยละเอียดทุกตัวเลือก",
      "📚 คลังข้อสอบคู่ขนานจำลองกว่า 1,500 ข้อ สังเคราะห์จากจุดออกสอบจริง ปลอดลิขสิทธิ์ 100%",
      "🎙️ ระบบ AI ซ้อมสัมภาษณ์ ภาค ค: เก็งคำถามกรรมการ + วิเคราะห์จุดแข็งในการตอบรายบุคคล",
      "🎁 โบนัสเมื่อสอบติด: รับฟรี E-Book [EB30] คู่มือครูบรรจุใหม่ + ส่วนลด 50% ระบบแฟ้มประเมินครูผู้ช่วย [AONA08]!",
      "💡 ข้อสังเกต: แพ็กเกจนี้ไม่รวมเพลงช่วยจำ หากต้องการฟังเพลงสามารถซื้อแยกได้ที่ Music Store หรือเลือกบันเดิลด้านขวา",
    ],
    ctaText: "สมัครเฉพาะกลุ่ม VIP บอท AI (290 ฿)",
    isVip: true,
  },
  {
    id: "vip-bundle-pass",
    name: "All-in-One VIP + Music Bundle (สุดคุ้ม)",
    price: "390 ฿",
    period: "จ่ายครั้งเดียว • กลุ่มติว + เพลง MP3 ตลอดชีพ",
    badge: "👑 แนะนำอันดับ 1 • ประหยัด 99 ฿",
    badgeClass: "bg-amber-400 text-[#0F172A] border-amber-500 font-black",
    borderClass: "border-amber-400 shadow-md ring-2 ring-amber-400/25 lg:scale-[1.02]",
    isPopular: true,
    productData: PREP_VIP_DATA,
    features: [
      "🤖 รวมสิทธิ์กลุ่ม Telegram บอท AI ติวสอบ Daily Quiz 3 เวลา + เฉลยละเอียดทุกข้อตลอดชีพ",
      "🎵 แถมฟรีทันที! อัลบั้มเพลงช่วยจำกฎหมายครู Vol.1 รวม 10 เพลงเต็ม MP3 + สมุดเนื้อร้อง PDF (มูลค่า 199 ฿)",
      "📚 คลังข้อสอบคู่ขนาน 1,500 ข้อ + ไฟล์ข้อสอบย้อนหลัง 5 ปีครบทุกวิชา",
      "🎙️ ระบบ AI ซ้อมสัมภาษณ์ ภาค ค รายบุคคล",
      "🎁 ฟรี E-Book [EB30] คู่มือครูบรรจุใหม่ + ส่วนลด 50% ระบบแฟ้ม [AONA08]",
    ],
    ctaText: "สมัคร All-in-One Bundle (390 ฿)",
    isVip: true,
  },
  {
    id: "krurank-ai-pass",
    name: "ทำเนียบว่าที่ครูผู้ช่วย (KruRank AI PRO)",
    price: "499 ฿",
    period: "จบฤดูกาลสอบ (ตลอดชีพ) • เว็บแอปซ้อมสอบสด",
    badge: "🔥 ใหม่! ซ้อมสอบ AI บนเว็บ",
    badgeClass: "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE] font-black",
    borderClass: "border-[#BFDBFE] hover:border-[#2563EB]",
    isPopular: false,
    productData: KRURANK_AI_PRO_DATA,
    features: [
      "🎮 Web Application ซ้อมสอบ Gamified เปิดผ่านมือถือได้ทันที ไม่ต้องโหลดแอป",
      "🤖 ครูอ้น AI ติวเตอร์ ชี้จุดดักหลอก 24 ชม. พร้อมสูตรจำด่วนฟันธง 1 ประโยค (ทำข้อสอบไม่อั้นตลอดชีพ)",
      "📜 ครอบคลุม ภาค ก (กฎหมาย วินัย จรรยาบรรณ) และ ภาค ข ครบ 5 วิชาเอกยอดนิยม (ดนตรี, ปฐมวัย, ไทย, คณิต, คอมฯ)",
      "🏆 ทำเนียบจัดอันดับระดับประเทศ (National Leaderboard) เทียบความแม่นยำรายวิชาเอก & เขตพื้นที่การศึกษา",
      "📸 การ์ดคะแนน 1080x1920 พร้อมปุ่มแชร์สถิติจริงลง TikTok / Reels / Instagram Story ใน 1 วินาที",
    ],
    ctaText: "เปิดสิทธิ์ KruRank PRO (499 ฿)",
    isVip: true,
  },
];

export function TeacherPrepView() {
  const [activeQuizIdx, setActiveQuizIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [activeSongIdx, setActiveSongIdx] = useState<number>(0);
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<PrepVipProduct>(PREP_VIP_DATA);
  const { openLineModal } = useLineModal();

  const currentQuiz = SAMPLE_QUIZZES[activeQuizIdx];
  const currentSong = MNEMONIC_SONGS[activeSongIdx];

  const playSound = (type: "correct" | "wrong" | "melody") => {
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const now = ctx.currentTime;

      if (type === "correct") {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.15, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.25);
        });
      } else if (type === "wrong") {
        [300, 240].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.1, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.2);
        });
      } else {
        const notes = [523.25, 587.33, 659.25, 783.99, 659.25, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.18);
          gain.gain.setValueAtTime(0.12, now + idx * 0.18);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.18);
          osc.stop(now + idx * 0.18 + 0.3);
        });
      }
    } catch {
      // Ignore audio errors on restricted devices
    }
  };

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
    if (idx === currentQuiz.correctIndex) {
      playSound("correct");
    } else {
      playSound("wrong");
    }
  };

  const handleSwitchQuiz = (idx: number) => {
    setActiveQuizIdx(idx);
    setSelectedOption(null);
  };

  const handleToggleSongPreview = () => {
    if (!isPlayingPreview) {
      playSound("melody");
      setIsPlayingPreview(true);
      setTimeout(() => setIsPlayingPreview(false), 1400);
    } else {
      setIsPlayingPreview(false);
    }
  };

  const getLinePrepUrl = (isVip: boolean) => {
    const msg = isVip
      ? `สวัสดีครับครูอ้น สนใจสมัคร "👑 AiAon Prep VIP Exam Pass (390 ฿)" เข้ากลุ่ม Telegram บอทติวสอบครูผู้ช่วย + คลังเพลงช่วยจำครับ รบกวนขอเลขบัญชี/QR พร้อมเพย์ด้วยครับ 🙏`
      : `สวัสดีครับครูอ้น ขอรับลิงก์เข้ากลุ่ม "🟢 Telegram ติวสอบครูผู้ช่วยฟรี (AiAon Prep)" ครับ 🙏`;
    return getLineOrderUrl(msg);
  };

  const handleVipOrderClick = (e: React.MouseEvent, product?: PrepVipProduct) => {
    const targetProduct = product || PREP_VIP_DATA;
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: targetProduct.title,
        price: targetProduct.price,
        message: targetProduct.lineOrderMsg,
      });
    }
  };

  return (
    <div className="w-full relative overflow-hidden min-h-screen bg-[#FAF8F5] pt-10 md:pt-14 pb-28 text-[#1E293B] font-prompt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">

        {/* 1. HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs sm:text-sm font-semibold"
          >
            <GraduationCap className="w-4 h-4 text-[#2563EB]" />
            <span>AIAON PREP ECOSYSTEM • กลุ่มเทเลแกรมติวสอบครูผู้ช่วยด้วย AI + ดนตรี</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-[#0F172A]"
          >
            เปลี่ยนการอ่านหนังสือสอบที่แสนสาหัส{" "}
            <span className="text-[#2563EB]">
              ให้สอบติดในรอบเดียวด้วยบอท Telegram &amp; เพลงช่วยจำ
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base lg:text-lg text-[#475569] max-w-3xl mx-auto leading-relaxed"
          >
            ผสานความเชี่ยวชาญของ <strong className="text-[#0F172A]">ครูอ้น (ครูดนตรีสากล ค.ศ.2 โรงเรียนหาดใหญ่วิทยาลัย &amp; ผู้พัฒนาระบบ AI)</strong>{" "}
            เสิร์ฟข้อสอบเก็งแม่นยำเข้ามือถือคุณวันละ 3 เวลา (เช้า-เที่ยง-ค่ำ) พร้อม AI อธิบายเฉลยรายข้อ และเพลงช่วยจำ พ.ร.บ. ที่ฟังแค่ 3 รอบก็จำขึ้นใจ
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <button
              type="button"
              onClick={() => setIsDetailModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm transition-all hover:scale-105 cursor-pointer"
            >
              <Crown className="w-5 h-5" />
              <span>เปิดตั๋วทองคำ VIP (เจาะลึก 7 ข้อ • 390 ฿)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={getLinePrepUrl(false)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-[#EFF6FF] border border-[#E2E8F0] hover:border-[#2563EB] text-[#0F172A] font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#2563EB]" />
              <span>ขอรับลิงก์กลุ่ม Telegram ติวฟรี</span>
            </a>
          </motion.div>

          {/* 3 Core Pillars Mini Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
            {[
              {
                icon: Clock,
                title: "1. บอทยิงข้อสอบ 3 เวลาชีวิต",
                desc: "07:30 ตื่นนอน • 12:15 พักเที่ยง • 20:00 ก่อนนอน สะสมวันละนิดแต่สม่ำเสมอ",
                iconCls: "bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]",
              },
              {
                icon: Music,
                title: "2. เพลงช่วยจำ (Earworm Effect)",
                desc: "เปลี่ยน พ.ร.บ. และวินัยครูสุดหิน ให้เป็นท่อนฮุกติดหู เปิดฟังตอนขับรถได้ทันที",
                iconCls: "bg-[#F5F3FF] border-[#DDD6FE] text-[#7C3AED]",
              },
              {
                icon: Bot,
                title: "3. AI เฉลยละเอียด + ซ้อมสัมภาษณ์",
                desc: "ตอบผิดปุ๊บ AI ชี้จุดหลอกทันที พร้อมระบบเก็งคำถามสัมภาษณ์ ภาค ค",
                iconCls: "bg-[#FEF9EF] border-[#FDE68A] text-[#D97706]",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-4 bg-white border border-[#E2E8F0] shadow-2xs flex items-start gap-3.5"
              >
                <div className={`p-2.5 rounded-xl border shrink-0 ${item.iconCls}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">{item.title}</h3>
                  <p className="text-xs text-[#475569] mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. LIVE INTERACTIVE TELEGRAM BOT SIMULATOR & AUDIO PREVIEWS */}
        <section className="space-y-8" id="simulator">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3FF] text-[#6D28D9] text-xs font-bold border border-[#DDD6FE]">
              <Zap className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>LIVE TELEGRAM BOT SIMULATOR • ทดลองทำข้อสอบจริง</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A]">
              สัมผัสประสบการณ์ในกลุ่ม{" "}
              <span className="text-[#2563EB]">
                Telegram AiAon Prep
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#475569]">
              ลองกดเลือกช่วงเวลาและคลิกคำตอบด้านล่าง เพื่อดูการทำงานของบอทข้อสอบและคำอธิบายเฉลยจาก AI
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Telegram Daily Quiz Simulator */}
            <div className="lg:col-span-7 rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#2563EB] flex items-center justify-center shadow-xs">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0F172A] flex items-center gap-2">
                      AiAon Prep Daily Quiz Bot
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        ONLINE
                      </span>
                    </h3>
                    <p className="text-xs text-[#64748B]">จำลองหน้าต่าง Telegram Quiz Mode</p>
                  </div>
                </div>

                {/* Time Slot Selector */}
                <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded-xl border border-[#E2E8F0]">
                  {["07:30 เช้า", "12:15 เที่ยง", "20:00 ค่ำ"].map((label, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSwitchQuiz(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        activeQuizIdx === idx
                          ? "bg-[#2563EB] text-white shadow-2xs"
                          : "text-[#475569] hover:text-[#0F172A]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quiz Question Card */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#0E7490]">
                    {currentQuiz.timeSlot}
                  </span>
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-semibold ${currentQuiz.badgeColor}`}>
                    {currentQuiz.category}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] text-sm sm:text-base font-bold text-[#0F172A] leading-relaxed">
                  {currentQuiz.question}
                </div>

                {/* 4 Options */}
                <div className="space-y-2.5">
                  {currentQuiz.options.map((opt, oIdx) => {
                    const isSelected = selectedOption === oIdx;
                    const isCorrect = oIdx === currentQuiz.correctIndex;
                    const isAnswered = selectedOption !== null;

                    let btnStyle = "bg-[#FAF8F5] border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#EFF6FF] text-[#1E293B]";

                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-900 font-bold";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-rose-50 border-rose-400 text-rose-900 font-bold";
                      } else {
                        btnStyle = "bg-[#FAF8F5] border-[#E2E8F0] text-[#94A3B8] opacity-70";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => !isAnswered && handleSelectOption(oIdx)}
                        disabled={isAnswered}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs sm:text-sm cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && (
                          <span className="shrink-0">
                            {isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : isSelected ? (
                              <XCircle className="w-5 h-5 text-rose-600" />
                            ) : null}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* AI Explanation Box */}
                <AnimatePresence>
                  {selectedOption !== null && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] p-4 sm:p-5 space-y-3"
                    >
                      <div className="text-xs sm:text-sm text-[#1E293B] leading-relaxed">
                        {currentQuiz.aiExplanation}
                      </div>
                      <div className="text-xs text-[#92400E] bg-[#FEF9EF] p-2.5 rounded-xl border border-[#FDE68A] flex items-center gap-2 font-medium">
                        <Lightbulb className="w-4 h-4 text-[#D97706] shrink-0" />
                        <span>{currentQuiz.mnemonicTip}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right 5 Cols: Mnemonic Audio Preview Lab */}
            <div className="lg:col-span-5 rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#7C3AED] flex items-center justify-center shadow-xs">
                    <Headphones className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                      คลังเพลงช่วยจำ (Mnemonic Songs)
                    </h3>
                    <p className="text-xs text-[#64748B]">แต่งและเรียบเรียงโดย ครูอ้น (ดนตรีสากล ญ.ว.)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {MNEMONIC_SONGS.map((song, sIdx) => (
                  <button
                    key={song.id}
                    type="button"
                    onClick={() => setActiveSongIdx(sIdx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      activeSongIdx === sIdx
                        ? "bg-[#F5F3FF] border-[#7C3AED] text-[#0F172A]"
                        : "bg-[#FAF8F5] border-[#E2E8F0] text-[#475569] hover:text-[#0F172A]"
                    }`}
                  >
                    <div className="truncate">
                      <div className="text-xs sm:text-sm font-bold truncate">{song.title}</div>
                      <div className="text-[11px] text-[#64748B] truncate">{song.topic}</div>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FEF9EF] text-[#92400E] border border-[#FDE68A] shrink-0 font-semibold">
                      {song.examFrequency}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Song Lyrics */}
              <div className="rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#6D28D9]">{currentSong.genre}</span>
                  <button
                    type="button"
                    onClick={handleToggleSongPreview}
                    className="px-3 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    {isPlayingPreview ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlayingPreview ? "กำลังเล่นโน้ตตัวอย่าง..." : "ฟังเมโลดี้ตัวอย่าง 🎵"}</span>
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  {currentSong.lyrics.map((line, lIdx) => (
                    <p
                      key={lIdx}
                      className="text-xs text-[#1E293B] bg-white rounded-lg px-3 py-2 border border-[#E2E8F0] leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <p className="text-[11px] text-[#64748B] text-center pt-1">
                  🎧 สมาชิกกลุ่ม VIP สามารถดาวน์โหลดไฟล์ MP3 เต็มเพลงฟังออฟไลน์ใน Telegram ได้เลย
                </p>

                <Link
                  href="/music-store"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FEF9EF] hover:bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] font-bold text-xs flex items-center justify-center gap-2 transition-all mt-2"
                >
                  <Music className="w-4 h-4 text-[#D97706]" />
                  <span>เข้าสู่ร้านค้าเพลงช่วยจำ &amp; BGM คลิป ว.PA ปลอดลิขสิทธิ์</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. TEACHER LIFETIME ECOSYSTEM */}
        <section className="rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] bg-white shadow-sm space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
              THE LIFETIME TEACHER JOURNEY • ดูแลกันตั้งแต่สอบบรรจุจนถึง ค.ศ.3
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              ทำไมครูยุคใหม่ถึงเลือกเริ่มต้นที่ AiAon Prep?
            </h2>
            <p className="text-xs sm:text-sm text-[#475569]">
              เพราะเราไม่ได้แค่ติวให้คุณสอบติด แต่เตรียมเครื่องมือลดภาระงานเอกสารไว้รอรับคุณตั้งแต่วันแรกที่รายงานตัวเข้าโรงเรียน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                stage: "STAGE 1 • ช่วงเตรียมสอบบรรจุ",
                title: "สอบติดด้วย AI & เพลงช่วยจำ",
                desc: "ตะลุยโจทย์ผ่าน Telegram Daily Quiz วันละ 3 รอบ + ฟังเพลงจำกฎหมาย + ซ้อมสัมภาษณ์ ภาค ค กับ AI จนมั่นใจเต็มร้อย",
                badge: "AiAon Prep (Telegram)",
                textColor: "text-[#0E7490]",
              },
              {
                stage: "STAGE 2 • ครูผู้ช่วย 2 ปีแรก (ประเมิน 4 ครั้ง)",
                title: "ผ่านประเมินเข้มข้นแบบไม่เหนื่อย",
                desc: "เมื่อสอบติด รับทันทีคู่มือครูบรรจุใหม่ [EB30] และสิทธิ์ลด 50% ระบบแฟ้มสะสมงานดิจิทัล E-Portfolio [AONA08] สำหรับประเมินครูผู้ช่วย",
                badge: "EB30 + ระบบ AONA08",
                textColor: "text-[#6D28D9]",
              },
              {
                stage: "STAGE 3 • ครู ค.ศ.2 - ค.ศ.3 & งานโรงเรียน",
                title: "เสกงาน ว.PA & SAR เสร็จในคลิกเดียว",
                desc: "ต่อยอดสู่ระบบเช็คชื่อ LINE [AONE01], ระบบจัดทำเล่ม ว.PA & SAR 15 ตัวชี้วัดอัตโนมัติ [AONA07] ให้มีเวลาไปใช้ชีวิตและสอนเด็กอย่างมีความสุข",
                badge: "AONA07 + 20 ระบบครู",
                textColor: "text-[#B45309]",
              },
            ].map((step, sIdx) => (
              <div
                key={sIdx}
                className="rounded-2xl p-6 border border-[#E2E8F0] bg-[#FAF8F5] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`text-xs font-extrabold ${step.textColor}`}>{step.stage}</span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white border border-[#E2E8F0] text-[#475569] font-medium">
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0F172A]">{step.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. PRICING & TELEGRAM JOIN CARDS */}
        <section className="space-y-10" id="join-telegram">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A]">
              เลือกกลุ่ม{" "}
              <span className="text-[#D97706]">
                Telegram เตรียมสอบครูผู้ช่วย
              </span>{" "}
              ที่เหมาะกับคุณ
            </h2>
            <p className="text-xs sm:text-sm text-[#475569]">
              เริ่มต้นเข้ากลุ่มติวฟรีได้ทันที หรืออัปเกรดเป็น VIP Exam Pass เพียงครั้งเดียว ดูแลยาวจนกว่าจะสอบติด
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
            {PREP_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-3xl p-6 sm:p-7 bg-white shadow-sm border ${tier.borderClass} flex flex-col justify-between space-y-6 transition-all`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${tier.badgeClass}`}>
                      {tier.badge}
                    </span>
                  </div>

                  {tier.isVip && (
                    <div
                      onClick={() => {
                        if (tier.productData) setSelectedDetailProduct(tier.productData);
                        setIsDetailModalOpen(true);
                      }}
                      className="relative w-full my-2 cursor-pointer flex justify-center py-3 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0]"
                      title="คลิกเพื่อเจาะลึก 7 องค์ประกอบของตั๋วทองคำนี้"
                    >
                      <GoldenTicketMockup
                        serialNo={tier.id === "bot-only-pass" ? "VIP-BOT-ONLY-PASS" : tier.id === "krurank-ai-pass" ? "KRURANK-PRO-2026" : "VIP-2026-TEACHER-PASS"}
                        size="md"
                        isInteractive={true}
                      />
                    </div>
                  )}

                  <div>
                    <h3
                      onClick={() => {
                        if (tier.productData) {
                          setSelectedDetailProduct(tier.productData);
                          setIsDetailModalOpen(true);
                        }
                      }}
                      className={`text-xl sm:text-2xl font-extrabold text-[#0F172A] ${
                        tier.isVip ? "cursor-pointer hover:text-[#2563EB] transition-colors" : ""
                      }`}
                    >
                      {tier.name}
                    </h3>
                    <div className="flex flex-wrap items-baseline gap-2 mt-2">
                      <span className="text-3xl sm:text-4xl font-black text-[#0F172A]">
                        {tier.price}
                      </span>
                      <span className="text-xs text-[#64748B]">{tier.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 pt-2 border-t border-[#F1F5F9]">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-[#1E293B] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {tier.isVip && tier.productData ? (
                  <div className="space-y-2.5 pt-2">
                    {tier.id === "krurank-ai-pass" && (
                      <Link
                        href="/krurank"
                        className="w-full py-3 px-3 rounded-2xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#BFDBFE] transition-all cursor-pointer"
                      >
                        <span>🎮 เข้าสู่สนามสอบสด /krurank</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (tier.productData) setSelectedDetailProduct(tier.productData);
                          setIsDetailModalOpen(true);
                        }}
                        className="w-full py-3 px-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#F1ECE4] text-[#0F172A] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#E2E8F0] transition-all cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>เจาะลึก 7 ข้อ</span>
                      </button>

                      <a
                        href={getLineOrderUrl(tier.productData.lineOrderMsg)}
                        onClick={(e) => handleVipOrderClick(e, tier.productData!)}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-line-title={tier.productData.title}
                        data-line-price={tier.productData.price}
                        data-line-code={tier.productData.id}
                        className="w-full py-3 px-3 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all hover:scale-[1.02] cursor-pointer bg-[#06C755] hover:bg-[#05b34c] text-[#052E16]"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{tier.id === "bot-only-pass" ? "สมัครเฉพาะบอท" : tier.id === "krurank-ai-pass" ? "สั่งซื้อสิทธิ์ PRO" : "สมัครบันเดิลคุ้มสุด"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <a
                    href={getLinePrepUrl(false)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.02] cursor-pointer bg-[#06C755] hover:bg-[#05b34c] text-[#052E16]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 7-PILLARS TEACHER PREP DETAIL MODAL */}
      <AnimatePresence>
        {isDetailModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0F172A]/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-slate-950 border border-amber-500/40 rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-8 shadow-2xl"
            >
              <div className="sticky top-0 z-50 flex items-center justify-between pb-3 bg-slate-950/90 backdrop-blur-sm border-b border-white/10 mb-6">
                <span className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>เจาะลึก 7 องค์ประกอบหลัก • {selectedDetailProduct.title}</span>
                </span>
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  ✕ ปิดหน้าต่าง
                </button>
              </div>

              <TeacherPrepDetailSection
                product={selectedDetailProduct}
                onClose={() => setIsDetailModalOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Bot, Music, Sparkles, Send, CheckCircle2,
  XCircle, Clock, 
  ArrowRight, Zap, 
  Headphones, MessageCircle, Lightbulb, Play, Pause
} from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   DATA: INTERACTIVE DAILY QUIZ SIMULATOR (3 วิชาหลัก)
───────────────────────────────────────────────────────────── */

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
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
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
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
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
      "💡 วิเคราะห์โดย AI ครูอ้น: Backward Design ของ Wiggins & McTighe มี 3 ขั้นตอนเรียงลำดับเหล็กคือ: ขั้นที่ 1 กำหนดผลลัพธ์ที่ต้องการ (Identify Desired Results) ➡️ ขั้นที่ 2 กำหนดหลักฐานการวัดผล (Determine Acceptable Evidence) ➡️ ขั้นที่ 3 จึงค่อยออกแบบกิจกรรมการเรียนรู้ (Plan Learning Experiences) ข้อสอบชอบหลอกให้ตอบ 'สร้างเครื่องมือวัดผล' เป็นขั้นแรก ต้องระวังครับ!",
    mnemonicTip:
      "🎵 ท่อนฮุกเพลงจำ: 'Backward ย้อนกลับ तीनก้าวเดิน... หนึ่งเป้าชัด-สองวัดผล-สามค่อยคิดกิจกรรม!'",
  },
  {
    id: "q-night",
    timeSlot: "🌙 รอบค่ำ 20:00 น. • จิตวิทยาและมาตรฐานวิชาชีพครู",
    category: "ภาค ข & ค • จิตวิทยาและการจัดการชั้นเรียน",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    question:
      "เมื่อนักเรียนส่งงานครบตรงเวลาทุกครั้ง ครูจึง 'ยกเลิกการบ้านช่วงวันหยุดสุดสัปดาห์' เพื่อให้นักเรียนได้พักผ่อน ตรงกับหลักการเสริมแรงใดของ Skinner?",
    options: [
      "ก. การเสริมแรงทางบวก (Positive Reinforcement)",
      "ข. การเสริมแรงทางลบ (Negative Reinforcement)",
      "ค. การลงโทษทางบวก (Positive Punishment)",
      "ง. การลงโทษทางลบ (Negative Punishment)",
    ],
    correctIndex: 1,
    aiExplanation:
      "💡 วิเคราะห์โดย AI ครูอ้น: คำว่า 'ทางลบ (Negative)' ในทฤษฎีของ Skinner ไม่ได้แปลว่าไม่ดี แต่แปลว่า 'การเอาออก/ถอนสิ่งเร้าที่เด็กไม่ชอบออกไป' เพื่อเพิ่มพฤติกรรมดี! การยกเลิกการบ้านวันหยุด (เอาสิ่งที่เด็กไม่อยากทำออก) เพื่อให้เด็กส่งงานตรงเวลาต่อไป จึงเป็น 'การเสริมแรงทางลบ (Negative Reinforcement)' ออกสอบเกือบทุกปี!",
    mnemonicTip:
      "🎵 ท่อนฮุกเพลงจำ: 'เสริมแรงคืออยากให้ทำซ้ำ... บวกคือให้รางวัลนำ ลบคือถอนภาระออก!'",
  },
];

/* ─────────────────────────────────────────────────────────────
   DATA: MNEMONIC SONGS (เพลงช่วยจำสไตล์ครูดนตรีสากล ญ.ว.)
───────────────────────────────────────────────────────────── */

const MNEMONIC_SONGS = [
  {
    id: "song-1",
    title: "เพลง 'วินัยครู 5 สถาน & ทางสายกลาง'",
    genre: "Acoustic Pop • 110 BPM (ฟังสบายตอนขับรถ)",
    topic: "พ.ร.บ.ระเบียบข้าราชการครูฯ (หมวดวินัยและการรักษาวินัย)",
    lyrics: [
      "🎤 (Verse) โทษวินัยครูไทยมีอยู่ 5 สถาน จำให้ขึ้นใจไม่ต้องอ่านจนตาลาย...",
      "🎶 (Chorus) ไม่ร้ายแรงมี 3 คือ ภาคทัณฑ์ - ตัดเงินเดือน - ลดเงินเดือน!",
      "🔥 (Hook) ถ้าร้ายแรงมี 2 เตือนไว้... ปลดออกได้บำเหน็จบำนาญ ส่วนไล่ออกไม่ได้สักบาทเดียว!",
      "💡 (Bridge) โทษวินัยล้างไม่ได้ด้วย พ.ร.บ.ล้างมลทิน... เว้นแต่คำสั่งตักเตือน!",
    ],
    examFrequency: "ออกสอบทุกปี 100%",
  },
  {
    id: "song-2",
    title: "เพลง 'Backward Design & Bloom's Taxonomy 6 ขั้น'",
    genre: "Lo-Fi Groove • 95 BPM (ฟังก่อนนอนจำแม่น)",
    topic: "มาตรฐานวิชาการศึกษา (หลักสูตรและการวัดผล)",
    lyrics: [
      "🎤 (Verse) บลูมยุคใหม่ปรับคำเป็น Verb... จำ-เข้าใจ-ประยุกต์ใช้ ให้ครบครัน",
      "🎶 (Chorus) วิเคราะห์-ประเมินค่า แล้วก้าวสู่ขั้นสูงสุดคือ 'คิดสร้างสรรค์ (Creating)'!",
      "🔥 (Hook) ย้อนกลับ Backward Design 3 ขั้น: 1. เป้าหมาย ➔ 2. หลักฐานวัดผล ➔ 3. กิจกรรม!",
    ],
    examFrequency: "จุดเก็บคะแนน 3-5 ข้อ",
  },
  {
    id: "song-3",
    title: "เพลง 'พ.ร.บ.การศึกษาแห่งชาติ & สภาครู'",
    genre: "Synth-Pop Cyber • 120 BPM (ปลุกพลังตอนเช้า)",
    topic: "กฎหมายการศึกษา & มาตรฐานวิชาชีพ (คุรุสภา)",
    lyrics: [
      "🎤 (Verse) ใบอนุญาตประกอบวิชาชีพครู อายุ 5 ปี... ต่อได้ภายใน 180 วันก่อนหมด!",
      "🎶 (Chorus) คณะกรรมการคุรุสภามี 39 คน... ก.ค.ศ. มี 31 คน จำเลขให้แม่นยำ!",
      "🔥 (Hook) การศึกษาขั้นพื้นฐาน 15 ปี... อนุบาล 3 - ประถม 6 - ม.ต้น 3 - ม.ปลาย 3!",
    ],
    examFrequency: "ออกสอบภาค ข ทุกสนาม",
  },
];

/* ─────────────────────────────────────────────────────────────
   DATA: MEMBERSHIP TIERS
───────────────────────────────────────────────────────────── */

const PREP_TIERS = [
  {
    id: "free-channel",
    name: "Telegram กลุ่มติวฟรี (Public Channel)",
    price: "ฟรี 0 ฿",
    period: "เข้ากลุ่มได้ทันที ไม่มีค่าใช้จ่าย",
    badge: "🟢 เปิดรับสมาชิกใหม่",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    borderClass: "border-emerald-500/30 hover:border-emerald-400",
    isPopular: false,
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
    id: "vip-pass",
    name: "AiAon Prep VIP Exam Pass",
    price: "390 ฿",
    period: "จ่ายครั้งเดียว • ดูแลยาวจนกว่าจะสอบบรรจุติด!",
    badge: "👑 แนะนำ • คุ้มที่สุดสำหรับคนจะสอบติดรอบนี้",
    badgeClass: "bg-linear-to-r from-amber-400 to-orange-500 text-zinc-950 border-amber-400",
    borderClass: "border-amber-500/60 shadow-[0_0_45px_rgba(245,158,11,0.2)] ring-1 ring-amber-400/40 lg:scale-105",
    isPopular: true,
    features: [
      "🤖 บอทส่งข้อสอบ Telegram Daily Quiz ครบ 3 รอบทุกวัน (07:30 / 12:15 / 20:00 น.) พร้อม AI อธิบายเฉลยละเอียดทุกตัวเลือก",
      "📚 คลังข้อสอบคู่ขนาน (Original High-Yield Simulated Exam) สังเคราะห์จากจุดออกสอบจริง ปลอดลิขสิทธิ์ 100%",
      "🎵 คลังเพลงช่วยจำกฎหมายครู & วิชาการศึกษา (Full MP3 + เนื้อร้องไฮไลต์) ฟังจำง่ายไม่ต้องท่องจำแบบเครียดๆ",
      "🎙️ ระบบ AI ซ้อมสัมภาษณ์ ภาค ค: เก็งคำถามกรรมการ + วิเคราะห์จุดแข็งในการตอบรายบุคคล",
      "🎁 โบนัสเมื่อสอบติด: รับฟรี E-Book [EB30] คู่มือครูบรรจุใหม่ + ส่วนลด 50% ระบบแฟ้มประเมินครูผู้ช่วย [AONA08]!",
    ],
    ctaText: "สมัครเข้ากลุ่ม VIP Exam Pass (390 ฿)",
    isVip: true,
  },
];

export function TeacherPrepView() {
  // Quiz Simulator State
  const [activeQuizIdx, setActiveQuizIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Mnemonic Song Player State
  const [activeSongIdx, setActiveSongIdx] = useState<number>(0);
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);

  const currentQuiz = SAMPLE_QUIZZES[activeQuizIdx];
  const currentSong = MNEMONIC_SONGS[activeSongIdx];

  // Web Audio Chime for Quiz & Song Preview
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
        // Short upbeat triad melody preview
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
    return `https://line.me/R/oaMessage/@deu6776s/?${encodeURIComponent(msg)}`;
  };

  return (
    <div className="w-full relative overflow-hidden min-h-screen pt-8 md:pt-12 pb-28 text-white font-prompt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 relative z-10">

        {/* ── 1. HERO SECTION ──────────────────────────────────────── */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold shadow-[0_0_25px_rgba(6,182,212,0.25)]"
          >
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>AIAON PREP ECOSYSTEM • กลุ่มเทเลแกรมติวสอบครูผู้ช่วยด้วย AI + ดนตรี</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
          >
            เปลี่ยนการอ่านหนังสือสอบที่แสนสาหัส{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400">
              ให้สอบติดในรอบเดียวด้วยบอท Telegram &amp; เพลงช่วยจำ
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base lg:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            ผสานความเชี่ยวชาญของ <strong className="text-white">ครูอ้น (ครูดนตรีสากล ค.ศ.2 โรงเรียนหาดใหญ่วิทยาลัย &amp; ผู้พัฒนาระบบ AI)</strong>{" "}
            เสิร์ฟข้อสอบเก็งแม่นยำเข้ามือถือคุณวันละ 3 เวลา (เช้า-เที่ยง-ค่ำ) พร้อม AI อธิบายเฉลยรายข้อ และเพลงช่วยจำ พ.ร.บ. ที่ฟังแค่ 3 รอบก็จำขึ้นใจ
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <a
              href={getLinePrepUrl(true)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(6,182,212,0.4)] border border-cyan-300/40 transition-all hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>สมัครเข้ากลุ่ม VIP Exam Pass (390 ฿ ตลอดชีพ)</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={getLinePrepUrl(false)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl glass-card bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4 text-cyan-400" />
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
                color: "text-cyan-400 border-cyan-500/25 bg-cyan-500/5",
              },
              {
                icon: Music,
                title: "2. เพลงช่วยจำ (Earworm Effect)",
                desc: "เปลี่ยน พ.ร.บ. และวินัยครูสุดหิน ให้เป็นท่อนฮุกติดหู เปิดฟังตอนขับรถได้ทันที",
                color: "text-purple-400 border-purple-500/25 bg-purple-500/5",
              },
              {
                icon: Bot,
                title: "3. AI เฉลยละเอียด + ซ้อมสัมภาษณ์",
                desc: "ตอบผิดปุ๊บ AI ชี้จุดหลอกทันที พร้อมระบบเก็งคำถามสัมภาษณ์ ภาค ค",
                color: "text-amber-400 border-amber-500/25 bg-amber-500/5",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-4 border glass-card ${item.color} flex items-start gap-3.5`}
              >
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 2. INTERACTIVE TELEGRAM QUIZ & MNEMONIC SIMULATOR ────── */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>LIVE TELEGRAM BOT SIMULATOR • ทดลองทำข้อสอบจริง</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold">
              สัมผัสประสบการณ์ในกลุ่ม{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400">
                Telegram AiAon Prep
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              ลองกดเลือกช่วงเวลาและคลิกคำตอบด้านล่าง เพื่อดูการทำงานของบอทข้อสอบและคำอธิบายเฉลยจาก AI
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Cols: Telegram Daily Quiz Simulator */}
            <div className="lg:col-span-7 rounded-3xl border border-cyan-500/30 bg-slate-900/75 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.12)] space-y-6">
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      AiAon Prep Daily Quiz Bot
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        ONLINE
                      </span>
                    </h3>
                    <p className="text-xs text-white/50">จำลองหน้าต่าง Telegram Quiz Mode</p>
                  </div>
                </div>

                {/* Time Slot Selector */}
                <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
                  {["07:30 เช้า", "12:15 เที่ยง", "20:00 ค่ำ"].map((label, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSwitchQuiz(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        activeQuizIdx === idx
                          ? "bg-cyan-500 text-zinc-950 shadow-sm"
                          : "text-white/60 hover:text-white"
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
                  <span className="text-xs font-semibold text-cyan-300">
                    {currentQuiz.timeSlot}
                  </span>
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full border ${currentQuiz.badgeColor}`}>
                    {currentQuiz.category}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-sm sm:text-base font-bold text-white leading-relaxed">
                  {currentQuiz.question}
                </div>

                {/* 4 Options */}
                <div className="space-y-2.5">
                  {currentQuiz.options.map((opt, oIdx) => {
                    const isSelected = selectedOption === oIdx;
                    const isCorrect = oIdx === currentQuiz.correctIndex;
                    const showResult = selectedOption !== null;

                    let btnStyle = "bg-white/5 border-white/10 text-white/85 hover:bg-white/10 hover:border-cyan-500/40";
                    if (showResult) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.2)]";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-rose-500/20 border-rose-400 text-rose-200";
                      } else {
                        btnStyle = "bg-white/[0.02] border-white/5 text-white/40";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleSelectOption(oIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {showResult && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* AI Explanation Box (Appears after clicking an option) */}
                <AnimatePresence mode="wait">
                  {selectedOption !== null && (
                    <motion.div
                      key={currentQuiz.id + "-exp"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-2xl p-4 sm:p-5 bg-linear-to-br from-cyan-950/60 via-slate-900 to-purple-950/50 border border-cyan-500/40 space-y-2.5"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        <span>
                          {selectedOption === currentQuiz.correctIndex
                            ? "🎉 ตอบถูกต้องครับ! มาดูทริคจำแม่นๆ จาก AI ครูอ้น:"
                            : "💪 ไม่เป็นไรครับ! นี่คือจุดหลอกที่คนมักพลาด มาดูเฉลยกัน:"}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                        {currentQuiz.aiExplanation}
                      </p>
                      <div className="pt-2 border-t border-white/10 text-xs font-semibold text-purple-300">
                        {currentQuiz.mnemonicTip}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right 5 Cols: Mnemonic Songs Studio Box */}
            <div className="lg:col-span-5 rounded-3xl border border-purple-500/30 bg-slate-900/75 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.12)] space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <Headphones className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      คลังเพลงช่วยจำ (Mnemonic Songs)
                    </h3>
                    <p className="text-xs text-white/50">แต่งและเรียบเรียงโดย ครูอ้น (ดนตรีสากล ญ.ว.)</p>
                  </div>
                </div>
              </div>

              {/* Song Selector Tabs */}
              <div className="space-y-2">
                {MNEMONIC_SONGS.map((song, sIdx) => (
                  <button
                    key={song.id}
                    type="button"
                    onClick={() => setActiveSongIdx(sIdx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      activeSongIdx === sIdx
                        ? "bg-purple-500/20 border-purple-400 text-white"
                        : "bg-white/5 border-white/10 text-white/65 hover:text-white"
                    }`}
                  >
                    <div className="truncate">
                      <div className="text-xs sm:text-sm font-bold truncate">{song.title}</div>
                      <div className="text-[11px] text-white/50 truncate">{song.topic}</div>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                      {song.examFrequency}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Song Lyrics & Audio Chime Preview */}
              <div className="rounded-2xl bg-black/50 border border-purple-500/25 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-purple-300">{currentSong.genre}</span>
                  <button
                    type="button"
                    onClick={handleToggleSongPreview}
                    className="px-3 py-1.5 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    {isPlayingPreview ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlayingPreview ? "กำลังเล่นโน้ตตัวอย่าง..." : "ฟังเมโลดี้ตัวอย่าง 🎵"}</span>
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  {currentSong.lyrics.map((line, lIdx) => (
                    <p
                      key={lIdx}
                      className="text-xs text-white/85 bg-white/5 rounded-lg px-3 py-2 border border-white/5 leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <p className="text-[11px] text-white/45 text-center pt-1">
                  🎧 สมาชิกกลุ่ม VIP สามารถดาวน์โหลดไฟล์ MP3 เต็มเพลงฟังออฟไลน์ใน Telegram ได้เลย
                </p>

                <Link
                  href="/music-store"
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition-all mt-2"
                >
                  <Music className="w-4 h-4" />
                  <span>เข้าสู่ร้านค้าเพลงช่วยจำ &amp; BGM คลิป ว.PA ปลอดลิขสิทธิ์</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ── 3. TEACHER LIFETIME ECOSYSTEM (เติบโตไปด้วยกันตลอดชีพครู) ─ */}
        <section className="rounded-3xl p-6 sm:p-10 border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              THE LIFETIME TEACHER JOURNEY • ดูแลกันตั้งแต่สอบบรรจุจนถึง ค.ศ.3
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              ทำไมครูยุคใหม่ถึงเลือกเริ่มต้นที่ AiAon Prep?
            </h2>
            <p className="text-xs sm:text-sm text-white/65">
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
                color: "border-cyan-500/30 bg-cyan-950/20",
                textColor: "text-cyan-300",
              },
              {
                stage: "STAGE 2 • ครูผู้ช่วย 2 ปีแรก (ประเมิน 4 ครั้ง)",
                title: "ผ่านประเมินเข้มข้นแบบไม่เหนื่อย",
                desc: "เมื่อสอบติด รับทันทีคู่มือครูบรรจุใหม่ [EB30] และสิทธิ์ลด 50% ระบบแฟ้มสะสมงานดิจิทัล E-Portfolio [AONA08] สำหรับประเมินครูผู้ช่วย",
                badge: "EB30 + ระบบ AONA08",
                color: "border-purple-500/30 bg-purple-950/20",
                textColor: "text-purple-300",
              },
              {
                stage: "STAGE 3 • ครู ค.ศ.2 - ค.ศ.3 & งานโรงเรียน",
                title: "เสกงาน ว.PA & SAR เสร็จในคลิกเดียว",
                desc: "ต่อยอดสู่ระบบเช็คชื่อ LINE [AONE01], ระบบจัดทำเล่ม ว.PA & SAR 15 ตัวชี้วัดอัตโนมัติ [AONA07] ให้มีเวลาไปใช้ชีวิตและสอนเด็กอย่างมีความสุข",
                badge: "AONA07 + 20 ระบบครู",
                color: "border-amber-500/30 bg-amber-950/20",
                textColor: "text-amber-300",
              },
            ].map((step, sIdx) => (
              <div
                key={sIdx}
                className={`rounded-2xl p-6 border ${step.color} flex flex-col justify-between space-y-4`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-extrabold ${step.textColor}`}>{step.stage}</span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-white/80">
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white">{step.title}</h3>
                  <p className="text-xs text-white/70 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. PRICING & TELEGRAM JOIN CARDS ─────────────────────── */}
        <section className="space-y-10" id="join-telegram">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              เลือกกลุ่ม{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-orange-400">
                Telegram เตรียมสอบครูผู้ช่วย
              </span>{" "}
              ที่เหมาะกับคุณ
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              เริ่มต้นเข้ากลุ่มติวฟรีได้ทันที หรืออัปเกรดเป็น VIP Exam Pass เพียงครั้งเดียว ดูแลยาวจนกว่าจะสอบติด
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            {PREP_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-3xl p-7 sm:p-9 bg-slate-900/80 backdrop-blur-xl border ${tier.borderClass} flex flex-col justify-between space-y-6 transition-all`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${tier.badgeClass}`}>
                      {tier.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-white">{tier.name}</h3>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-200 to-amber-300">
                        {tier.price}
                      </span>
                      <span className="text-xs text-white/60">{tier.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 pt-2 border-t border-white/10">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/85 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={getLinePrepUrl(tier.isVip)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg transition-all hover:scale-[1.02] cursor-pointer ${
                    tier.isVip
                      ? "bg-linear-to-r from-amber-400 via-orange-500 to-amber-500 text-zinc-950 shadow-[0_0_30px_rgba(245,158,11,0.35)]"
                      : "bg-linear-to-r from-emerald-500 to-teal-600 text-zinc-950"
                  }`}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

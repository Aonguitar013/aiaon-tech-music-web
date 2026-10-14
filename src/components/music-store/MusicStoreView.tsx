"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music, Headphones, Play, Pause, ShoppingBag, Sparkles,
  CheckCircle2, ShieldCheck, FileAudio, Disc, Mic2, Sliders,
  ArrowRight, MessageCircle, GraduationCap, Film,
  Guitar, Plus, Check, } from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   TYPES & DATA: IAONTECH x MUSIC COMMERCIAL STORE
───────────────────────────────────────────────────────────── */

type MusicCategory = "ALL" | "MNEMONIC" | "BGM_PA" | "BACKING_STUDIO" | "CUSTOM";

interface MusicTrackProduct {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: Exclude<MusicCategory, "ALL">;
  categoryLabel: string;
  bpm: string;
  duration: string;
  format: string;
  price: number;
  originalPrice?: number;
  badge: string;
  badgeColor: string;
  accentColor: "amber" | "cyan" | "purple" | "pink" | "emerald";
  sampleHook: string;
  highlights: string[];
  chordProgression: number[][]; // Frequencies for Web Audio Synth Preview
  tempoMs: number;
}

const MUSIC_PRODUCTS: MusicTrackProduct[] = [
  {
    id: "album-mnemonic-vol1",
    code: "MUS-01",
    title: "อัลบั้มเต็ม Vol.1: เพลงช่วยจำกฎหมายครู & พ.ร.บ. ฉบับสอบติดในรอบเดียว",
    subtitle: "รวม 10 เพลงฮิตเนื้อหาสอบครูผู้ช่วย (ภาค ข) + หนังสือเนื้อร้องไฮไลต์จุดออกสอบ PDF",
    category: "MNEMONIC",
    categoryLabel: "🎓 เพลงช่วยจำสอบครูผู้ช่วย",
    bpm: "105–120 BPM",
    duration: "10 เพลงเต็ม (32 นาที)",
    format: "MP3 320kbps + สมุดเนื้อร้อง PDF",
    price: 199,
    originalPrice: 390,
    badge: "🔥 ขายดีอันดับ 1 • สอบครูผู้ช่วย",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    accentColor: "amber",
    sampleHook:
      "🎵 'วินัยครูมีห้าสถาน... ไม่ร้ายแรงสามงาน คือ ภาค-ตัด-ลด! ถ้าร้ายแรงจำให้หมด คือ ปลด-ไล่ออก! ใบประกอบวิชาชีพอยู่ได้ห้าปี ยื่นต่อล่วงหน้าดีๆ ร้อยแปดสิบวัน!'",
    highlights: [
      "ครบ 10 หัวข้อออกสอบซ้ำทุกปี: พ.ร.บ.การศึกษาแห่งชาติ, โทษวินัย 5 สถาน, คุรุสภา, ก.ค.ศ., Backward Design, Bloom's 6 ขั้น",
      "แต่งและเรียบเรียงดนตรีให้ติดหู (Earworm Effect) เปิดฟังตอนขับรถหรือก่อนนอน จำแม่นโดยไม่ต้องท่องเครียด",
      "แถมฟรี! ไฟล์สมุดเนื้อร้อง PDF ไฮไลต์คำสำคัญที่ข้อสอบชอบเอามาหลอก",
      "💡 พิเศษ: หากสมัครกลุ่ม VIP Exam Pass (390 ฿) รับอัลบั้มนี้ฟรีทันทีในกลุ่ม Telegram!",
    ],
    chordProgression: [
      [261.63, 329.63, 392.0, 523.25], // C Maj
      [392.0, 493.88, 587.33, 783.99], // G Maj
      [220.0, 261.63, 329.63, 440.0],  // A Min
      [349.23, 440.0, 523.25, 698.46], // F Maj
    ],
    tempoMs: 420,
  },
  {
    id: "single-discipline-5",
    code: "MUS-02",
    title: "ซิงเกิล: 'โทษวินัยครู 5 สถาน & ทางสายกลาง' (Single + Backing Track)",
    subtitle: "Acoustic Pop ฟังสบาย จำแม่นทุกมาตราสำคัญของวินัยข้าราชการครู",
    category: "MNEMONIC",
    categoryLabel: "🎓 เพลงช่วยจำสอบครูผู้ช่วย",
    bpm: "110 BPM",
    duration: "3:15 นาที",
    format: "MP3 (Vocal + Instrumental) + คอร์ด PDF",
    price: 49,
    originalPrice: 99,
    badge: "🎵 ซิงเกิลยอดฮิต",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    accentColor: "cyan",
    sampleHook:
      "🎵 'ไม่ร้ายแรงมี 3 คือ ภาคทัณฑ์ - ตัดเงินเดือน - ลดเงินเดือน... ถ้าร้ายแรงมี 2 เตือนไว้ ปลดออกได้บำเหน็จบำนาญ ส่วนไล่ออกไม่ได้สักบาทเดียว!'",
    highlights: [
      "แยกแยะชัดเจนระหว่าง 'ว่ากล่าวตักเตือน' กับ 'โทษทางวินัย 5 สถาน' ไม่โดนข้อสอบหลอก 100%",
      "ได้ทั้งไฟล์เพลงร้องเต็ม และไฟล์ดนตรีล้วน (Instrumental) เอาไปฝึกร้องจำเองได้",
    ],
    chordProgression: [
      [293.66, 369.99, 440.0, 587.33], // D Maj
      [220.0, 277.18, 329.63, 440.0],  // A Maj
      [246.94, 293.66, 369.99, 493.88], // B Min
      [196.0, 246.94, 293.66, 392.0],  // G Maj
    ],
    tempoMs: 400,
  },
  {
    id: "bgm-pa-acoustic-pack",
    code: "BGM-01",
    title: "แพ็กเกจเพลงบรรเลง: 'iAon Acoustic Warmth BGM Pack' (สำหรับคลิป ว.PA 60 นาที)",
    subtitle: "15 แทร็กกีตาร์โปร่ง Most M-45 อัดสดจากสตูดิโอครูอ้น ปลอดลิขสิทธิ์ 100% ตลอดชีพ",
    category: "BGM_PA",
    categoryLabel: "🎬 เพลง BGM คลิปส่ง ว.PA (ปลอดลิขสิทธิ์)",
    bpm: "75–95 BPM",
    duration: "15 แทร็ก (วนลูปเนียนไร้รอยต่อ)",
    format: "WAV 24-bit & MP3 + ใบรับรองลิขสิทธิ์ PDF",
    price: 290,
    originalPrice: 590,
    badge: "🛡️ ขายดีช่วงส่ง ว.PA • ไม่ติดลิขสิทธิ์ 100%",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    accentColor: "emerald",
    sampleHook:
      "🎸 [เสียงบรรเลงกีตาร์โปร่ง Acoustic Duo อบอุ่น นุ่มนวล ย่านความถี่ถูก EQ หลบเสียงพูดของครูไว้เรียบร้อย เสียงพูดครูชัดเจน กรรมการฟังสบายหู]",
    highlights: [
      "แก้ปัญหาครูทำคลิปสภาพปัญหา / คลิปการสอน ว.PA / คลิปโรงเรียนลง YouTube แล้วโดนดูดเสียงหรือติดลิขสิทธิ์",
      "มิกซ์เสียงพิเศษใน Cubase 12 โดยตัดย่านความถี่กลาง (Mid-Range Carve) ไม่ให้กวนเสียงพูดของครูในคลิป",
      "แถมใบรับรองสิทธิ์การใช้งานเชิงพาณิชย์และวิชาการ (Official License Certificate) ใช้ได้ตลอดชีพ",
    ],
    chordProgression: [
      [196.0, 246.94, 293.66, 392.0],  // G Maj warm
      [164.81, 246.94, 329.63, 392.0], // E Min7
      [261.63, 329.63, 392.0, 493.88], // C Maj7
      [293.66, 369.99, 440.0, 587.33], // D Sus4
    ],
    tempoMs: 520,
  },
  {
    id: "bgm-inspiring-lofi",
    code: "BGM-02",
    title: "แพ็กเกจเพลงบรรเลง: 'Inspiring Classroom & Tech Review Lo-Fi Pack'",
    subtitle: "12 แทร็ก Lo-Fi Chill & Modern Synth สำหรับคลิปรีวิวไอที คลิปสรุป SAR และงานเกษียณ",
    category: "BGM_PA",
    categoryLabel: "🎬 เพลง BGM คลิปส่ง ว.PA (ปลอดลิขสิทธิ์)",
    bpm: "85–100 BPM",
    duration: "12 แทร็กเต็ม",
    format: "WAV & MP3 + ใบรับรองลิขสิทธิ์ PDF",
    price: 290,
    originalPrice: 490,
    badge: "✨ สไตล์ช่อง iAon Tech",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    accentColor: "purple",
    sampleHook:
      "🎹 [บีต Lo-Fi นุ่มลึก ผสานเปียโนไฟฟ้าและกีตาร์คลีน สไตล์เดียวกับคลิปรีวิวไอทีของครูอ้น ใช้ปักตะกร้า TikTok / YouTube Shorts ได้ปลอดภัย 100%]",
    highlights: [
      "ใช้ปักตะกร้าขายของ Affiliate บน TikTok, Shopee Video, YouTube Shorts ได้โดยไม่โดนปิดกั้นเสียงเพลง",
      "เหมาะมากสำหรับเปิดคลอในห้องเรียนระหว่างเด็กทำใบงาน หรือใส่ในคลิปสรุปผลงานโรงเรียน (SAR)",
      "จ่ายครั้งเดียว ใช้ได้ไม่จำกัดจำนวนคลิปตลอดชีพ",
    ],
    chordProgression: [
      [261.63, 311.13, 392.0, 466.16], // C Min7
      [349.23, 415.3, 523.25, 622.25], // F Min7
      [233.08, 293.66, 349.23, 466.16], // Bb Maj7
      [311.13, 392.0, 466.16, 622.25], // Eb Maj7
    ],
    tempoMs: 480,
  },
  {
    id: "backing-track-band-kit",
    code: "STU-01",
    title: "ชุด Backing Track ซ้อมวงดนตรี & กีตาร์โปร่ง 2 ไลน์ (พร้อม Click Track มาตรฐานห้องอัด)",
    subtitle: "10 แทร็กฝึกซ้อมเข้าจังหวะ Band Grooving แยกไลน์เครื่องดนตรี + คอร์ดและแท็บ PDF",
    category: "BACKING_STUDIO",
    categoryLabel: "🎸 Backing Track & พรีเซ็ตห้องอัด",
    bpm: "90–130 BPM",
    duration: "10 ชุดฝึกซ้อม (แยก Stems)",
    format: "MP3 + WAV Stems + Tab PDF",
    price: 250,
    originalPrice: 450,
    badge: "🎸 ขวัญใจครูดนตรี & นักเรียนวงสตริง",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/40",
    accentColor: "pink",
    sampleHook:
      "🥁 [เสียงนับ Click Track 1-2-3-4 คมชัด ตามด้วยเบส กลอง และกีตาร์ริทึมแน่นๆ ให้คุณหรือนักเรียนฝึกโซโล่และร้องทับได้เหมือนอยู่ในห้องอัดจริง]",
    highlights: [
      "ออกแบบจากประสบการณ์คุมวงดนตรีโรงเรียนหาดใหญ่วิทยาลัย ช่วยแก้ปัญหาเด็กเล่นไม่ตรงจังหวะ (Click Track Mastery)",
      "มีทั้งเวอร์ชันมีเสียงนำ (Guide) และเวอร์ชันตัดเสียงกีตาร์/เสียงร้องออก (Minus-One)",
      "นำไปใช้เป็นสื่อการสอนวิชาดนตรีปฏิบัติในโรงเรียนได้ทันที",
    ],
    chordProgression: [
      [220.0, 329.63, 440.0, 523.25],
      [293.66, 369.99, 440.0, 587.33],
      [329.63, 415.3, 493.88, 659.25],
      [220.0, 329.63, 440.0, 659.25],
    ],
    tempoMs: 360,
  },
  {
    id: "cubase-12-presets",
    code: "STU-02",
    title: "Cubase 12 Pro Track Presets: พรีเซ็ตกีตาร์โปร่ง 2 ไลน์ & ร้องใสสไตล์ครูอ้น",
    subtitle: "ชุดตั้งค่า EQ, Compressor, RoomWorks Reverb สำเร็จรูป โหลดใส่ Cubase แล้วเสียงดีทันที",
    category: "BACKING_STUDIO",
    categoryLabel: "🎸 Backing Track & พรีเซ็ตห้องอัด",
    bpm: "All BPM",
    duration: "ใช้งานได้ตลอดชีพ",
    format: ".trackpreset (Cubase 12+) + คู่มืออัดเสียง PDF",
    price: 390,
    originalPrice: 690,
    badge: "🎚️ สูตรลับห้องอัดครูอ้น",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    accentColor: "amber",
    sampleHook:
      "🎙️ [พรีเซ็ตปลั๊กอิน Stock ในตัว Cubase 12 ไม่ต้องซื้อปลั๊กอินเพิ่ม! เซตค่า Pre-Delay 35ms และ Cut Low 130Hz ให้กีตาร์โปร่งพุ่งใส มีมิติระดับสตูดิโอ]",
    highlights: [
      "ใช้ Stock Plugins ที่มากับ Cubase 12 ล้วนๆ ไม่ต้องเสียเงินซื้อปลั๊กอินนอกเพิ่มแม้แต่บาทเดียว",
      "แถมฟรี! คู่มือ E-Book 'ขั้นตอนการอัดร้องพร้อมกีตาร์โปร่ง และการซิงค์วิดีโอ 4K' ฉบับจับมือทำ",
    ],
    chordProgression: [
      [329.63, 415.3, 493.88, 659.25],
      [246.94, 329.63, 392.0, 493.88],
      [220.0, 277.18, 329.63, 440.0],
      [329.63, 415.3, 493.88, 659.25],
    ],
    tempoMs: 440,
  },
  {
    id: "custom-school-brand-song",
    code: "CUS-01",
    title: "บริการรับแต่งและผลิตเพลงตามสั่ง (เพลงโรงเรียน / เพลงช่วยจำเฉพาะวิชา / จิงเกิลร้านค้า)",
    subtitle: "ผสานเทคโนโลยี AI + อัดกีตาร์สดและมิกซ์มาสเตอร์ในสตูดิโอ Cubase 12 โดยครูอ้น",
    category: "CUSTOM",
    categoryLabel: "✨ รับแต่งเพลง & จิงเกิลตามสั่ง",
    bpm: "ตามบรีฟลูกค้า",
    duration: "2:00 – 3:30 นาที",
    format: "WAV Master + MP3 + Minus-One + ลิขสิทธิ์ 100%",
    price: 1900,
    originalPrice: 3500,
    badge: "👑 สั่งทำพิเศษ • งานไวคุณภาพห้องอัด",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    accentColor: "cyan",
    sampleHook:
      "✨ 'อยากมีเพลงประจำห้องเรียน เพลงช่วยจำเนื้อหาวิชาตัวเองเอาไปยื่นนวัตกรรม ว.PA ค.ศ.3 หรือเพลงจิงเกิลเปิดหน้าร้าน... บรีฟเนื้อหามาได้เลย ครูอ้นจัดให้ครบจบในที่เดียว!'",
    highlights: [
      "เหมาะสำหรับคุณครูที่ต้องการสร้าง 'นวัตกรรมสื่อเพลงประกอบการสอน' เพื่อยื่นประเมิน ว.PA (ชำนาญการ / ชำนาญการพิเศษ)",
      "เหมาะสำหรับร้านค้า SME ที่ต้องการเพลงจิงเกิลจำง่าย เปิดในร้านหรือใส่ในคลิปโฆษณาตัวเอง",
      "ได้รับทั้งไฟล์เพลงเต็ม, ไฟล์ดนตรีคาราโอเกะ (Minus-One), และเนื้อร้องพร้อมคอร์ดกีตาร์",
    ],
    chordProgression: [
      [261.63, 329.63, 392.0, 523.25],
      [329.63, 392.0, 493.88, 659.25],
      [349.23, 440.0, 523.25, 698.46],
      [392.0, 493.88, 587.33, 783.99],
    ],
    tempoMs: 380,
  },
];

const CATEGORIES: { id: MusicCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "ALL", label: "🎵 สินค้าเพลงทั้งหมด", icon: Disc },
  { id: "MNEMONIC", label: "🎓 เพลงช่วยจำสอบครูผู้ช่วย", icon: GraduationCap },
  { id: "BGM_PA", label: "🎬 เพลง BGM คลิป ว.PA (ปลอดลิขสิทธิ์)", icon: Film },
  { id: "BACKING_STUDIO", label: "🎸 Backing Track & พรีเซ็ตห้องอัด", icon: Guitar },
  { id: "CUSTOM", label: "✨ รับแต่งเพลงตามสั่ง", icon: Mic2 },
];

export function MusicStoreView() {
  const [selectedCategory, setSelectedCategory] = useState<MusicCategory>("ALL");
  const [playingTrack, setPlayingTrack] = useState<MusicTrackProduct | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [cart, setCart] = useState<MusicTrackProduct[]>([]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const filteredProducts =
    selectedCategory === "ALL"
      ? MUSIC_PRODUCTS
      : MUSIC_PRODUCTS.filter((p) => p.category === selectedCategory);

  // Stop audio preview cleanly
  const stopAudioPreview = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Play pleasant Web Audio chord arpeggio preview for any track
  const handleTogglePlay = (track: MusicTrackProduct) => {
    if (playingTrack?.id === track.id && isPlaying) {
      stopAudioPreview();
      return;
    }

    stopAudioPreview();
    setPlayingTrack(track);
    setIsPlaying(true);

    try {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      let step = 0;

      const playStep = () => {
        const chordIdx = Math.floor(step / 4) % track.chordProgression.length;
        const noteIdx = step % 4;
        const freq = track.chordProgression[chordIdx][noteIdx];

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = track.category === "BGM_PA" ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.11, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (track.tempoMs / 1000) * 1.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + (track.tempoMs / 1000) * 1.4);

        step++;
        if (step >= 16) {
          stopAudioPreview();
        }
      };

      playStep();
      intervalRef.current = setInterval(playStep, track.tempoMs);
    } catch {
      // Fallback visual-only mode if browser blocks audio
      setTimeout(() => setIsPlaying(false), 5000);
    }
  };

  const toggleCartItem = (item: MusicTrackProduct) => {
    setCart((prev) =>
      prev.some((x) => x.id === item.id)
        ? prev.filter((x) => x.id !== item.id)
        : [...prev, item]
    );
  };

  const totalCartPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const getSingleBuyLineUrl = (item: MusicTrackProduct) => {
    const msg = `สวัสดีครับครูอ้น สนใจสั่งซื้อเพลง/สื่อเสียงจากหน้าเว็บ iAonTech Music Store ครับ 🎵
📀 รหัสสินค้า: [${item.code}] ${item.title}
💰 ราคา: ${item.price.toLocaleString()} บาท
📦 รูปแบบไฟล์: ${item.format}

รบกวนขอ QR พร้อมเพย์สำหรับชำระเงินและรับลิงก์ดาวน์โหลดด้วยครับ 🙏`;
    return `https://line.me/R/oaMessage/@deu6776s/?${encodeURIComponent(msg)}`;
  };

  const getCartCheckoutLineUrl = () => {
    const listText = cart
      .map((item, idx) => `${idx + 1}. [${item.code}] ${item.title} (${item.price.toLocaleString()} ฿)`)
      .join("\n");
    const msg = `สวัสดีครับครูอ้น สนใจสั่งซื้อแพ็กเกจเพลง/สื่อเสียงรวม ${cart.length} รายการครับ 🎵
${listText}

💵 ยอดรวมทั้งหมด: ${totalCartPrice.toLocaleString()} บาท
รบกวนขอ QR พร้อมเพย์สำหรับชำระเงินด้วยครับ 🙏`;
    return `https://line.me/R/oaMessage/@deu6776s/?${encodeURIComponent(msg)}`;
  };

  return (
    <div className="w-full relative overflow-hidden min-h-screen pt-8 md:pt-12 pb-36 text-white font-prompt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">

        {/* ── 1. HERO BANNER ───────────────────────────────────────── */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs sm:text-sm font-semibold shadow-[0_0_25px_rgba(245,158,11,0.25)]"
          >
            <Music className="w-4 h-4 text-amber-400" />
            <span>IAONTECH x MUSIC STORE • สตูดิโอเพลงช่วยจำ &amp; เพลง BGM ปลอดลิขสิทธิ์</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
          >
            เปลี่ยนเรื่องยากให้จำติดหู{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 via-orange-400 to-pink-400">
              และใส่เพลงคลิป ว.PA แบบไม่ติดลิขสิทธิ์ 100%
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base lg:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            สร้างสรรค์และบันทึกเสียงจากสตูดิโอจริงบน <strong className="text-white">Steinberg Cubase 12</strong> โดย{" "}
            <strong className="text-amber-300">ครูอ้น (ครูดนตรีสากล ค.ศ.2 โรงเรียนหาดใหญ่วิทยาลัย)</strong>{" "}
            ครบทั้งเพลงช่วยจำสอบครูผู้ช่วย, เพลงบรรเลงกีตาร์โปร่งใส่คลิปการสอน 60 นาทีส่ง ว.PA พร้อมใบรับรองลิขสิทธิ์ และบริการรับแต่งเพลงตามสั่ง
          </motion.p>

          {/* Trust Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            {[
              {
                icon: ShieldCheck,
                title: "ปลอดลิขสิทธิ์ 100% ตลอดชีพ",
                desc: "ทุกแพ็กเกจเพลง BGM มีใบรับรองสิทธิ์ ใส่คลิปส่ง ว.PA ลง YouTube/TikTok ไม่โดนเคลมเสียง",
                color: "border-emerald-500/30 bg-emerald-500/5 text-emerald-300",
              },
              {
                icon: Headphones,
                title: "กดฟังตัวอย่างได้ทุกอัลบั้ม",
                desc: "ทดลองฟังเมโลดี้และอ่านเนื้อร้องท่อนฮุกตัวอย่างบนหน้าเว็บได้ทันทีก่อนตัดสินใจซื้อ",
                color: "border-amber-500/30 bg-amber-500/5 text-amber-300",
              },
              {
                icon: Sliders,
                title: "มาตรฐานห้องอัด Cubase 12",
                desc: "มิกซ์เสียงหลบย่านความถี่เสียงพูดครูไว้เรียบร้อย เปิดคลอเบาๆ เสียงพูดครูยังคมชัด 100%",
                color: "border-cyan-500/30 bg-cyan-500/5 text-cyan-300",
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

        {/* ── 2. CATEGORY FILTER TABS ──────────────────────────────── */}
        <section className="space-y-8">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    isActive
                      ? "bg-linear-to-r from-amber-400 to-orange-500 text-zinc-950 border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.35)] scale-105"
                      : "bg-slate-900/70 text-white/75 border-white/10 hover:border-amber-500/40 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── 3. MUSIC CATALOG GRID ────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProducts.map((item) => {
              const isThisPlaying = playingTrack?.id === item.id && isPlaying;
              const inCart = cart.some((x) => x.id === item.id);

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl p-6 sm:p-8 bg-slate-900/80 backdrop-blur-xl border border-white/15 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-6 shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
                >
                  <div className="space-y-4">
                    {/* Top Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                      <span className="text-xs font-mono text-white/45 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                        {item.code} • {item.bpm}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <div className="text-xs font-semibold text-amber-300/90 mb-1">
                        {item.categoryLabel}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                        {item.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-white/65 mt-1.5 leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Interactive Audio Sample Player Box */}
                    <div className="rounded-2xl bg-black/50 border border-white/10 p-4 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => handleTogglePlay(item)}
                          className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                            isThisPlaying
                              ? "bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]"
                              : "bg-linear-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-zinc-950"
                          }`}
                        >
                          {isThisPlaying ? (
                            <>
                              <Pause className="w-4 h-4 fill-current" />
                              <span>หยุดฟังตัวอย่าง</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 fill-current" />
                              <span>ฟังเมโลดี้ตัวอย่าง 🎵</span>
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-2 text-[11px] text-white/50">
                          <FileAudio className="w-3.5 h-3.5 text-amber-400" />
                          <span>{item.duration}</span>
                        </div>
                      </div>

                      <div className="text-xs text-amber-200/90 bg-white/5 rounded-xl p-3 border border-white/5 leading-relaxed">
                        {item.sampleHook}
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2 pt-1">
                      {item.highlights.map((hl, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs text-white/80 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & Action Footer */}
                  <div className="pt-4 border-t border-white/10 space-y-4">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[11px] text-white/50 block">รูปแบบไฟล์ที่ได้รับ: {item.format}</span>
                        <div className="flex items-baseline gap-2.5 mt-0.5">
                          <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-amber-300 via-orange-300 to-yellow-200">
                            {item.price.toLocaleString()} ฿
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-white/40 line-through">
                              {item.originalPrice.toLocaleString()} ฿
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleCartItem(item)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                          inCart
                            ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                            : "bg-white/5 border-white/15 text-white/75 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {inCart ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        <span>{inCart ? "อยู่ในตะกร้าแล้ว" : "เลือกใส่ตะกร้า"}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <a
                        href={getSingleBuyLineUrl(item)}
                        data-line-title={`เพลงลิขสิทธิ์: ${item.title}`}
                        data-line-price={item.price}
                        data-line-code={item.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3.5 px-5 rounded-2xl bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.3)] border border-cyan-300/30 transition-all hover:scale-[1.02] cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>สั่งซื้อรับไฟล์ทันที ({item.price.toLocaleString()} ฿)</span>
                      </a>

                      {item.category === "MNEMONIC" ? (
                        <Link
                          href="/teacher-prep"
                          className="py-3.5 px-4 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                        >
                          <GraduationCap className="w-4 h-4" />
                          <span>ดูกลุ่ม Telegram VIP (แถมฟรี!)</span>
                        </Link>
                      ) : (
                        <a
                          href={getSingleBuyLineUrl(item)}
                          data-line-title={`สอบถามเพลง: ${item.title}`}
                          data-line-price={item.price}
                          data-line-code={item.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-3.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                        >
                          <MessageCircle className="w-4 h-4 text-emerald-400" />
                          <span>สอบถาม / ขอฟังเดโม่เต็ม</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── 4. ALL-IN-ONE STUDIO AUDIO BUNDLE BANNER ─────────────── */}
        <section className="rounded-3xl p-8 sm:p-12 border border-amber-500/40 bg-linear-to-r from-amber-950/40 via-slate-900/90 to-purple-950/40 relative overflow-hidden shadow-[0_0_60px_rgba(245,158,11,0.15)]">
          <div className="max-w-3xl mx-auto text-center space-y-5 relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SUPER AUDIO BUNDLE • เหมาคลังเพลงสุดคุ้ม</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              เหมารวมเพลงช่วยจำ + แพ็กเกจ BGM คลิป ว.PA ปลอดลิขสิทธิ์ทั้งหมด{" "}
              <span className="text-amber-300">เพียง 590 ฿!</span> (จากปกติ 1,468 ฿)
            </h2>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              ได้ครบทั้งอัลบั้มเพลงช่วยจำสอบครูผู้ช่วย 10 เพลง + เพลงบรรเลง Acoustic &amp; Lo-Fi BGM 27 แทร็กพร้อมใบรับรองลิขสิทธิ์ + ชุด Backing Track ซ้อมวงดนตรี ดาวน์โหลดเก็บไว้ใช้ได้ตลอดชีพ
            </p>
            <div className="pt-2">
              <a
                href={`https://line.me/R/oaMessage/@deu6776s/?${encodeURIComponent(
                  "สวัสดีครับครูอ้น สนใจโปรโมชันเหมา '🎵 Super Audio Bundle (เพลงช่วยจำ 10 เพลง + BGM ปลอดลิขสิทธิ์ 27 แทร็ก + Backing Track)' ราคาพิเศษ 590 บาทครับ รบกวนขอ QR พร้อมเพย์ด้วยครับ 🙏"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-linear-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-zinc-950 font-black text-sm sm:text-base shadow-[0_0_35px_rgba(245,158,11,0.4)] transition-all hover:scale-105 cursor-pointer"
              >
                <Disc className="w-5 h-5" />
                <span>รับโปรเหมาคลังเพลง 590 ฿ ทันที</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* ── STICKY BOTTOM BAR (NOW PLAYING / CART CHECKOUT) ────────── */}
      <AnimatePresence>
        {(isPlaying || cart.length > 0) && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 z-50 max-w-5xl mx-auto rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-amber-500/40 p-4 shadow-[0_10px_50px_rgba(0,0,0,0.85)] flex flex-col sm:flex-row items-center justify-between gap-4 font-prompt"
          >
            {/* Left: Now Playing Info */}
            {playingTrack && isPlaying ? (
              <div className="flex items-center gap-3.5 min-w-0">
                <button
                  type="button"
                  onClick={stopAudioPreview}
                  className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <Pause className="w-5 h-5 fill-current" />
                </button>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 animate-pulse">
                      กำลังเล่นตัวอย่างเสียง 🎵
                    </span>
                    <span className="text-xs font-bold text-white truncate">
                      {playingTrack.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60 truncate mt-0.5">
                    {playingTrack.sampleHook}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    เลือกไว้ในตะกร้า {cart.length} รายการ
                  </div>
                  <div className="text-xs text-amber-300 font-semibold">
                    ยอดรวมทั้งหมด: {totalCartPrice.toLocaleString()} บาท
                  </div>
                </div>
              </div>
            )}

            {/* Right: Checkout Action */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {cart.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={() => setCart([])}
                    className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white/60 hover:text-white cursor-pointer"
                  >
                    ล้างตะกร้า
                  </button>
                  <a
                    href={getCartCheckoutLineUrl()}
                    data-line-title={`สั่งซื้อเพลงลิขสิทธิ์ ${cart.length} รายการ`}
                    data-line-price={`${totalCartPrice.toLocaleString()} ฿`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-linear-to-r from-emerald-400 to-teal-500 text-zinc-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>สั่งซื้อ {cart.length} เพลงที่เลือก ({totalCartPrice.toLocaleString()} ฿)</span>
                  </a>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

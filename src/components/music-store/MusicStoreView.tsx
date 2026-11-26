"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Headphones,
  Play,
  Pause,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  FileAudio,
  Disc,
  Mic2,
  Sliders,
  ArrowRight,
  MessageCircle,
  GraduationCap,
  Film,
  Plus,
  Check,
  BookOpen,
  Volume2,
} from "lucide-react";
import Link from "next/link";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { getLineOrderUrl } from "@/lib/line";
import {
  MUSIC_STORE_PRODUCTS_DATA,
  MusicStoreProductItem,
} from "@/components/music-store/musicDataHelper";
import { VinylRecordMockup } from "@/components/music-store/VinylRecordMockup";
import { MusicDetailSection } from "@/components/music-store/MusicDetailSection";
import { HIDDEN_MUSIC_STORE_CODES } from "@/config/catalogVisibility";

type MusicCategory = "ALL" | "MNEMONIC" | "BGM_PA" | "BACKING_STUDIO" | "CUSTOM";

const MUSIC_PRODUCTS = MUSIC_STORE_PRODUCTS_DATA.filter(
  (p) => !HIDDEN_MUSIC_STORE_CODES.includes(p.code)
);

const CATEGORIES: {
  id: MusicCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "ALL", label: "ทั้งหมด", icon: Disc },
  { id: "MNEMONIC", label: "เพลงช่วยจำสอบครู", icon: GraduationCap },
  { id: "BGM_PA", label: "BGM คลิป ว.PA", icon: Film },
  { id: "CUSTOM", label: "รับแต่งเพลงตามสั่ง", icon: Mic2 },
];

export function MusicStoreView() {
  const [selectedCategory, setSelectedCategory] = useState<MusicCategory>("ALL");
  const [playingTrack, setPlayingTrack] = useState<MusicStoreProductItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [cart, setCart] = useState<MusicStoreProductItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<MusicStoreProductItem | null>(null);

  const { openLineModal } = useLineModal();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const filteredProducts =
    selectedCategory === "ALL"
      ? MUSIC_PRODUCTS
      : MUSIC_PRODUCTS.filter((p) => p.category === selectedCategory);

  const featuredDeckTrack = playingTrack || MUSIC_PRODUCTS[0];

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

  const handleTogglePlay = (track: MusicStoreProductItem) => {
    if (playingTrack?.id === track.id && isPlaying) {
      stopAudioPreview();
      return;
    }

    stopAudioPreview();
    setPlayingTrack(track);
    setIsPlaying(true);

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
      setTimeout(() => setIsPlaying(false), 5000);
    }
  };

  const toggleCartItem = (item: MusicStoreProductItem) => {
    setCart((prev) =>
      prev.some((x) => x.id === item.id)
        ? prev.filter((x) => x.id !== item.id)
        : [...prev, item]
    );
  };

  const totalCartPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSingleBuyClick = (e: React.MouseEvent, item: MusicStoreProductItem) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: `เพลงลิขสิทธิ์: [${item.code}] ${item.title}`,
        price: item.price,
        message: item.lineOrderMsg,
      });
    }
  };

  const handleCartCheckoutClick = (e: React.MouseEvent) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      const listText = cart
        .map((item, idx) => `${idx + 1}. [${item.code}] ${item.title} (${item.price.toLocaleString()} ฿)`)
        .join("\n");
      const msg = `สวัสดีครับครูอ้น สนใจสั่งซื้อแพ็กเกจเพลง/สื่อเสียงรวม ${cart.length} รายการครับ 🎵\n${listText}\n\n💵 ยอดรวมทั้งหมด: ${totalCartPrice.toLocaleString()} บาท\nรบกวนขอ QR พร้อมเพย์สำหรับชำระเงินด้วยครับ 🙏`;
      openLineModal({
        title: `สั่งซื้อเพลงในตะกร้า (${cart.length} รายการ)`,
        price: totalCartPrice,
        message: msg,
      });
    }
  };

  const handleBundleBuyClick = (e: React.MouseEvent) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      const bundleMsg =
        "สวัสดีครับครูอ้น สนใจโปรโมชันเหมา '🎵 Super Audio Bundle (เพลงช่วยจำ 10 เพลง + BGM ปลอดลิขสิทธิ์ 27 แทร็ก + Backing Track)' ราคาพิเศษ 590 บาทครับ รบกวนขอ QR พร้อมเพย์ด้วยครับ 🙏";
      openLineModal({
        title: "Super Audio Bundle (เหมาคลังเพลง 590 ฿)",
        price: 590,
        message: bundleMsg,
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F5FAF9] text-[#1E293B] font-prompt overflow-x-hidden pb-36">
      {/* =================================================================
          1. BOUTIQUE VINYL & RECORDING STUDIO HERO (NOW-PLAYING DECK)
      ================================================================= */}
      <section className="relative pt-8 pb-14 sm:pt-12 sm:pb-16 border-b border-[#E2E8F0] bg-[#FFFFFF]">
        <div className="absolute top-0 right-0 w-[440px] h-[440px] bg-[#EA580C]/[0.05] blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-[#0D9488]/[0.05] blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-7 space-y-5"
            >
              <div className="flex flex-wrap items-center gap-3">
                <img
                  src="/brand/svg/aiaon-audio_lockup_horizontal_fullcolor-on-light.svg"
                  alt="AiAon Audio by AiAon Tech"
                  className="h-9 sm:h-10 w-auto"
                />
                <span className="px-3 py-1 rounded-full bg-[#FFF7ED] border border-[#FED7AA] text-[#C2410C] text-xs font-mono font-bold">
                  CUBASE 12 STUDIO • 100% ROYALTY-FREE
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] leading-[1.15] tracking-tight">
                เพลงช่วยจำติดหู &amp;{" "}
                <span className="text-[#EA580C]">BGM คลิป ว.PA ปลอดลิขสิทธิ์</span>
              </h1>

              <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl">
                บันทึกเสียงและมิกซ์มาสเตอร์จริงบน <strong className="text-[#0F172A]">Steinberg Cubase 12</strong> โดยครูอ้น (ครูดนตรีสากล ค.ศ.2 ร.ร.หาดใหญ่วิทยาลัย) ออกแบบย่านความถี่หลบเสียงพูดครูโดยเฉพาะ ใส่คลิปส่ง ว.PA ลง YouTube / TikTok ได้สบายใจไม่โดนเคลมเสียง
              </p>

              {/* 3 Studio Spec Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-[#0F172A]">มีใบรับรองลิขสิทธิ์ 100%</span>
                </div>
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs">
                  <Sliders className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span className="text-xs font-semibold text-[#0F172A]">มิกซ์หลบเสียงพูดครู</span>
                </div>
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs">
                  <Headphones className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span className="text-xs font-semibold text-[#0F172A]">กดฟังตัวอย่างสดได้ทุกชุด</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#tracklist"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm shadow-sm transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>ทดลองฟังแทร็กทั้งหมด</span>
                </a>
                <a
                  href={getLineOrderUrl(
                    "สวัสดีครับครูอ้น สนใจโปรโมชันเหมา '🎵 Super Audio Bundle (เพลงช่วยจำ 10 เพลง + BGM ปลอดลิขสิทธิ์ 27 แทร็ก + Backing Track)' ราคาพิเศษ 590 บาทครับ รบกวนขอ QR พร้อมเพย์ด้วยครับ 🙏"
                  )}
                  onClick={handleBundleBuyClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-orange-50 text-[#0F172A] border border-[#FED7AA] font-bold text-sm transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#EA580C]" />
                  <span>เหมาคลังเพลงทั้งหมด 590 ฿</span>
                </a>
              </div>
            </motion.div>

            {/* Right: Interactive Live Turntable Studio Deck */}
            {featuredDeckTrack && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="lg:col-span-5"
              >
                <div className="rounded-3xl bg-white border border-[#E2E8F0] p-5 shadow-md space-y-4">
                  {/* Deck Top Bar */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="inline-flex items-center gap-2 font-mono font-bold text-[#0F172A]">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isPlaying ? "bg-[#EA580C] animate-pulse" : "bg-emerald-500"
                        }`}
                      />
                      <span>{isPlaying ? "NOW PLAYING • LIVE SYNTH" : "STUDIO TURNTABLE DECK"}</span>
                    </span>
                    <span className="font-mono text-[#64748B]">
                      {featuredDeckTrack.code} • {featuredDeckTrack.bpm}
                    </span>
                  </div>

                  {/* Warm Vinyl Stage */}
                  <div className="rounded-2xl bg-linear-to-br from-[#FAF6EF] via-[#F4EDE2] to-[#ECE3D4] border border-[#E5DDD0] py-5 px-4 flex items-center justify-center overflow-hidden">
                    <VinylRecordMockup
                      code={featuredDeckTrack.code}
                      title={featuredDeckTrack.title}
                      categoryLabel={featuredDeckTrack.categoryLabel}
                      bpm={featuredDeckTrack.bpm}
                      duration={featuredDeckTrack.duration}
                      accentColor={featuredDeckTrack.accentColor}
                      isPlaying={isPlaying}
                      size="md"
                      isInteractive={true}
                      onPlayClick={() => handleTogglePlay(featuredDeckTrack)}
                    />
                  </div>

                  {/* Tactile Transport Controls */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <div className="min-w-0">
                      <div className="text-sm font-extrabold text-[#0F172A] truncate">
                        {featuredDeckTrack.title}
                      </div>
                      <div className="text-xs text-[#64748B] truncate">
                        {featuredDeckTrack.duration} • {featuredDeckTrack.format}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTogglePlay(featuredDeckTrack)}
                      className={`shrink-0 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                        isPlaying
                          ? "bg-rose-600 hover:bg-rose-700 text-white"
                          : "bg-[#0F172A] hover:bg-[#EA580C] text-white"
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4 fill-current" />
                          <span>หยุดฟัง</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          <span>กดฟังสด</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* =================================================================
          2. QUICK-LISTEN ALBUM TRACKLIST + CATEGORY FILTER BAR
      ================================================================= */}
      <section id="tracklist" className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-10 scroll-mt-20">
        {/* Clean Category Bar */}
        <div className="rounded-3xl bg-white border border-[#E2E8F0] p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    isActive
                      ? "bg-[#0F766E] text-white border-[#0F766E]"
                      : "bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:text-[#0F172A] hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
          <div className="text-xs font-mono text-[#64748B] flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-[#EA580C]" />
            <span>{filteredProducts.length} อัลบั้มพร้อมดาวน์โหลด</span>
          </div>
        </div>

        {/* Apple Music / Bandcamp Style Quick-Listen Tracklist */}
        <div className="rounded-3xl bg-white border border-[#E2E8F0] overflow-hidden shadow-2xs">
          <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider">
            <span>QUICK AUDITION TRACKLIST (กดฟังเทียบทุกชุดในคลิกเดียว)</span>
            <span className="hidden sm:inline">BPM / DURATION / PRICE</span>
          </div>
          <div className="divide-y divide-[#F1F5F9]">
            {filteredProducts.map((item, idx) => {
              const isThisPlaying = playingTrack?.id === item.id && isPlaying;
              const inCart = cart.some((x) => x.id === item.id);
              return (
                <div
                  key={`row-${item.id}`}
                  className={`px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 transition-colors ${
                    isThisPlaying ? "bg-[#FFF7ED]" : "hover:bg-[#F8FAFC]"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="text-xs font-mono text-[#94A3B8] w-5 shrink-0 hidden sm:inline">
                      0{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleTogglePlay(item)}
                      aria-label={`ฟังตัวอย่าง ${item.title}`}
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                        isThisPlaying
                          ? "bg-[#EA580C] text-white shadow-sm"
                          : "bg-[#F8FAFC] hover:bg-[#0F172A] text-[#0F172A] hover:text-white border border-[#E2E8F0]"
                      }`}
                    >
                      {isThisPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>
                    <div className="min-w-0">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(item)}
                        className="text-sm font-bold text-[#0F172A] hover:text-[#EA580C] truncate block text-left cursor-pointer"
                      >
                        {item.title}
                      </button>
                      <div className="text-[11px] text-[#64748B] truncate">
                        {item.code} • {item.categoryLabel}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden md:inline text-xs font-mono text-[#64748B]">
                      {item.bpm} • {item.duration}
                    </span>
                    <span className="text-sm font-extrabold text-[#0F172A] font-mono">
                      ฿{item.price.toLocaleString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleCartItem(item)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        inCart
                          ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                          : "bg-white border-[#E2E8F0] text-[#475569] hover:border-[#0F172A] hover:text-[#0F172A]"
                      }`}
                    >
                      {inCart ? "✓ ในตะกร้า" : "+ ตะกร้า"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =================================================================
            3. BOUTIQUE VINYL ALBUM SHELF (DETAILED 2-COL CARDS)
        ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {filteredProducts.map((item) => {
            const isThisPlaying = playingTrack?.id === item.id && isPlaying;
            const inCart = cart.some((x) => x.id === item.id);

            return (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl p-6 sm:p-7 bg-white border border-[#E2E8F0] hover:border-[#EA580C]/50 transition-all flex flex-col justify-between space-y-5 shadow-2xs hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full border bg-[#FFF7ED] border-[#FED7AA] text-[#C2410C]">
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono text-[#475569] bg-[#F8FAFC] px-2.5 py-1 rounded-lg border border-[#E2E8F0]">
                      {item.code} • {item.bpm}
                    </span>
                  </div>

                  {/* 3D Vinyl Stage */}
                  <div
                    onClick={() => setSelectedProduct(item)}
                    className="relative w-full cursor-pointer flex justify-center py-5 px-4 rounded-2xl bg-linear-to-br from-[#FAF6EF] via-[#F4EDE2] to-[#ECE3D4] border border-[#E5DDD0] overflow-hidden"
                    title="คลิกเพื่อเจาะลึก 7 องค์ประกอบของผลงานนี้"
                  >
                    <VinylRecordMockup
                      code={item.code}
                      title={item.title}
                      categoryLabel={item.categoryLabel}
                      bpm={item.bpm}
                      duration={item.duration}
                      accentColor={item.accentColor}
                      isPlaying={isThisPlaying}
                      size="md"
                      isInteractive={true}
                      onPlayClick={() => handleTogglePlay(item)}
                    />
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-[#0F766E] mb-1">
                      {item.categoryLabel}
                    </div>
                    <h2
                      onClick={() => setSelectedProduct(item)}
                      className="text-xl font-extrabold text-[#0F172A] leading-snug cursor-pointer hover:text-[#EA580C] transition-colors"
                    >
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#475569] mt-1 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Sample Hook Preview */}
                  <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleTogglePlay(item)}
                        className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                          isThisPlaying
                            ? "bg-rose-600 text-white"
                            : "bg-[#EA580C] hover:bg-[#C2410C] text-white"
                        }`}
                      >
                        {isThisPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-current" />
                            <span>หยุดฟัง</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>ฟังตัวอย่างเสียง</span>
                          </>
                        )}
                      </button>
                      <span className="text-[11px] font-mono text-[#64748B] flex items-center gap-1">
                        <FileAudio className="w-3.5 h-3.5 text-[#0F766E]" />
                        {item.duration}
                      </span>
                    </div>
                    <p className="text-xs text-[#1E293B] bg-white rounded-xl p-3 border border-[#E2E8F0] leading-relaxed">
                      {item.sampleHook}
                    </p>
                  </div>

                  <ul className="space-y-1.5">
                    {item.highlights.map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs text-[#1E293B]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Actions */}
                <div className="pt-4 border-t border-[#F1F5F9] space-y-3.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <div>
                      <span className="text-[11px] text-[#64748B] block">ไฟล์ที่ได้รับ: {item.format}</span>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl font-black text-[#0F172A]">
                          {item.price.toLocaleString()} ฿
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-[#94A3B8] line-through">
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
                          ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                          : "bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:text-[#0F172A]"
                      }`}
                    >
                      {inCart ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      <span>{inCart ? "อยู่ในตะกร้า" : "ใส่ตะกร้า"}</span>
                    </button>
                  </div>

                  {item.id === "album-mnemonic-vol1" && (
                    <div className="rounded-xl p-2.5 bg-[#FEF9EF] border border-[#FDE68A] flex items-center justify-between gap-2">
                      <span className="text-[11px] text-[#92400E]">
                        👑 <strong>คุ้มกว่าเมื่อซื้อคู่:</strong> รับเพลงนี้ฟรีเมื่อสมัครกลุ่มติวสอบ AI (390 ฿)
                      </span>
                      <Link
                        href="/teacher-prep#join-telegram"
                        className="shrink-0 whitespace-nowrap text-[11px] font-bold text-[#92400E] hover:text-[#0F172A] underline"
                      >
                        ดูบันเดิล ➔
                      </Link>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(item)}
                      className="py-3 px-3.5 rounded-2xl bg-[#F8FAFC] hover:bg-slate-100 text-[#0F172A] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition border border-[#E2E8F0] cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-[#0F766E]" />
                      <span>เจาะลึก 7 ข้อ</span>
                    </button>

                    <a
                      href={getLineOrderUrl(item.lineOrderMsg)}
                      onClick={(e) => handleSingleBuyClick(e, item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>สั่งซื้อ ({item.price.toLocaleString()} ฿)</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* =================================================================
            4. SUPER AUDIO BUNDLE BANNER
        ================================================================= */}
        <section className="rounded-3xl p-8 sm:p-12 border border-[#FED7AA] bg-linear-to-r from-[#FFF7ED] via-white to-[#F0FDFA] text-center space-y-5 shadow-2xs">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SUPER AUDIO BUNDLE • เหมาคลังเพลงสุดคุ้ม</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] max-w-3xl mx-auto leading-tight">
            เหมารวมเพลงช่วยจำ + BGM คลิป ว.PA ปลอดลิขสิทธิ์ทั้งหมด{" "}
            <span className="text-[#EA580C]">เพียง 590 ฿</span> (ปกติ 1,468 ฿)
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] max-w-2xl mx-auto leading-relaxed">
            ได้ครบทั้งอัลบั้มเพลงช่วยจำสอบครู 10 เพลง + เพลงบรรเลง Acoustic &amp; Lo-Fi BGM 27 แทร็กพร้อมใบรับรองลิขสิทธิ์ + Backing Track ดาวน์โหลดเก็บใช้ได้ตลอดชีพ
          </p>
          <div className="pt-2">
            <a
              href={getLineOrderUrl(
                "สวัสดีครับครูอ้น สนใจโปรโมชันเหมา '🎵 Super Audio Bundle (เพลงช่วยจำ 10 เพลง + BGM ปลอดลิขสิทธิ์ 27 แทร็ก + Backing Track)' ราคาพิเศษ 590 บาทครับ รบกวนขอ QR พร้อมเพย์ด้วยครับ 🙏"
              )}
              onClick={handleBundleBuyClick}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#0F172A] hover:bg-[#EA580C] text-white font-extrabold text-sm sm:text-base shadow-sm transition-all cursor-pointer"
            >
              <Disc className="w-5 h-5" />
              <span>รับโปรเหมาคลังเพลง 590 ฿ ทันที</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </section>

      {/* STICKY NOW-PLAYING & CART BAR */}
      <AnimatePresence>
        {(isPlaying || cart.length > 0) && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 z-40 max-w-5xl mx-auto rounded-2xl bg-white/95 backdrop-blur-xl border border-[#E2E8F0] p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-prompt"
          >
            {playingTrack && isPlaying ? (
              <div className="flex items-center gap-3.5 min-w-0">
                <button
                  type="button"
                  onClick={stopAudioPreview}
                  className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <Pause className="w-5 h-5 fill-current" />
                </button>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 animate-pulse">
                      กำลังเล่นตัวอย่างเสียง 🎵
                    </span>
                    <span className="text-xs font-bold text-[#0F172A] truncate">
                      {playingTrack.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#475569] truncate mt-0.5">
                    {playingTrack.sampleHook}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#0F172A]">
                    เลือกไว้ในตะกร้า {cart.length} รายการ
                  </div>
                  <div className="text-xs text-amber-700 font-semibold">
                    ยอดรวมทั้งหมด: {totalCartPrice.toLocaleString()} บาท
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {cart.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={() => setCart([])}
                    className="px-3 py-2.5 rounded-xl bg-[#F8FAFC] hover:bg-slate-100 border border-[#E2E8F0] text-xs text-[#475569] hover:text-[#0F172A] cursor-pointer"
                  >
                    ล้างตะกร้า
                  </button>
                  <a
                    href={getLineOrderUrl(
                      `สวัสดีครับครูอ้น สนใจสั่งซื้อแพ็กเกจเพลง/สื่อเสียงรวม ${cart.length} รายการครับ 🎵\n` +
                        cart
                          .map((item, idx) => `${idx + 1}. [${item.code}] ${item.title} (${item.price.toLocaleString()} ฿)`)
                          .join("\n") +
                        `\n\n💵 ยอดรวมทั้งหมด: ${totalCartPrice.toLocaleString()} บาท\nรบกวนขอ QR พร้อมเพย์สำหรับชำระเงินด้วยครับ 🙏`
                    )}
                    onClick={handleCartCheckoutClick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>
                      สั่งซื้อ {cart.length} เพลง ({totalCartPrice.toLocaleString()} ฿)
                    </span>
                  </a>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7-PILLARS MUSIC PRODUCT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0F172A]/50 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-8 shadow-2xl"
            >
              <div className="sticky top-0 z-50 flex items-center justify-between pb-3 bg-[#F8FAFC]/95 backdrop-blur-sm border-b border-[#E2E8F0] mb-6">
                <span className="text-xs sm:text-sm font-bold text-[#0F172A] flex items-center gap-2">
                  <Disc className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: "8s" }} />
                  <span>
                    [{selectedProduct.code}] เจาะลึก 7 องค์ประกอบหลัก • {selectedProduct.title}
                  </span>
                </span>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] hover:bg-slate-100 text-[#475569] hover:text-[#0F172A] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  ✕ ปิดหน้าต่าง
                </button>
              </div>

              <MusicDetailSection
                product={selectedProduct}
                isPlaying={playingTrack?.id === selectedProduct.id && isPlaying}
                onTogglePlay={() => handleTogglePlay(selectedProduct)}
                onClose={() => setSelectedProduct(null)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

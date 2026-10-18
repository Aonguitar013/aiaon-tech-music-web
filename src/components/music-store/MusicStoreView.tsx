"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music, Headphones, Play, Pause, ShoppingBag, Sparkles,
  CheckCircle2, ShieldCheck, FileAudio, Disc, Mic2, Sliders,
  ArrowRight, MessageCircle, GraduationCap, Film,
  Guitar, Plus, Check, BookOpen, Volume2
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

/* ─────────────────────────────────────────────────────────────
   TYPES & DATA: IAONTECH x MUSIC COMMERCIAL STORE
───────────────────────────────────────────────────────────── */

type MusicCategory = "ALL" | "MNEMONIC" | "BGM_PA" | "BACKING_STUDIO" | "CUSTOM";

const MUSIC_PRODUCTS = MUSIC_STORE_PRODUCTS_DATA;

const CATEGORIES: { id: MusicCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "ALL", label: "🎵 สินค้าเพลงทั้งหมด", icon: Disc },
  { id: "MNEMONIC", label: "🎓 เพลงช่วยจำสอบครูผู้ช่วย", icon: GraduationCap },
  { id: "BGM_PA", label: "🎬 เพลง BGM คลิป ว.PA (ปลอดลิขสิทธิ์)", icon: Film },
  { id: "BACKING_STUDIO", label: "🎸 Backing Track & พรีเซ็ตห้องอัด", icon: Guitar },
  { id: "CUSTOM", label: "✨ รับแต่งเพลงตามสั่ง", icon: Mic2 },
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
      const bundleMsg = "สวัสดีครับครูอ้น สนใจโปรโมชันเหมา '🎵 Super Audio Bundle (เพลงช่วยจำ 10 เพลง + BGM ปลอดลิขสิทธิ์ 27 แทร็ก + Backing Track)' ราคาพิเศษ 590 บาทครับ รบกวนขอ QR พร้อมเพย์ด้วยครับ 🙏";
      openLineModal({
        title: "Super Audio Bundle (เหมาคลังเพลง 590 ฿)",
        price: 590,
        message: bundleMsg,
      });
    }
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-pink-400">
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
                desc: "ทดลองฟังเมโลดี้สดผ่าน Web Audio Synth และอ่านท่อนฮุกตัวอย่างบนหน้าเว็บได้ทันทีก่อนตัดสินใจซื้อ",
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
                className={`rounded-2xl p-4 border ${item.color} flex items-start gap-3.5 backdrop-blur-md`}
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
                      ? "bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.35)] scale-105"
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

                    {/* ──────────────── 3D Holographic Vinyl Record Mockup ──────────────── */}
                    <div
                      onClick={() => setSelectedProduct(item)}
                      className="relative w-full my-4 cursor-pointer flex justify-center py-2"
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

                    {/* Title & Subtitle */}
                    <div>
                      <div className="text-xs font-semibold text-amber-300/90 mb-1">
                        {item.categoryLabel}
                      </div>
                      <h2
                        onClick={() => setSelectedProduct(item)}
                        className="text-xl sm:text-2xl font-extrabold text-white leading-snug cursor-pointer hover:text-amber-300 transition-colors"
                      >
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
                              : "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-zinc-950"
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
                          <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200">
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

                    {/* Cross-sell banner for MUS-01 */}
                    {item.id === "album-mnemonic-vol1" && (
                      <div className="rounded-xl p-2.5 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border border-amber-500/30 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-amber-200">
                          👑 <strong>คุ้มกว่าเมื่อซื้อคู่:</strong> รับเพลงนี้ฟรีทันทีเมื่อสมัครกลุ่ม Telegram ติวสอบบอท AI (390 ฿)
                        </span>
                        <Link
                          href="/teacher-prep#join-telegram"
                          className="shrink-0 text-[11px] font-bold text-amber-300 hover:text-white underline"
                        >
                          ดูบันเดิล 390 ฿ ➔
                        </Link>
                      </div>
                    )}

                    {/* Dual Action Buttons: เจาะลึก 7 ข้อ & สั่งซื้อรับไฟล์ทันที */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(item)}
                        className="py-3 px-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition border border-white/15 cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4 text-amber-400" />
                        <span>เจาะลึก 7 ข้อ</span>
                      </button>

                      <a
                        href={getLineOrderUrl(item.lineOrderMsg)}
                        onClick={(e) => handleSingleBuyClick(e, item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-4 rounded-2xl bg-gradient-to-r from-[#06C755] via-[#05b34c] to-[#06C755] hover:from-[#05b34c] hover:via-[#049b42] hover:to-[#05b34c] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,199,85,0.35)] border border-[#06C755]/30 transition-all hover:scale-[1.02] cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>สั่งซื้อรับไฟล์ทันที ({item.price.toLocaleString()} ฿)</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── 4. ALL-IN-ONE STUDIO AUDIO BUNDLE BANNER ─────────────── */}
        <section className="rounded-3xl p-8 sm:p-12 border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-purple-950/40 relative overflow-hidden shadow-[0_0_60px_rgba(245,158,11,0.15)]">
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
                href={getLineOrderUrl(
                  "สวัสดีครับครูอ้น สนใจโปรโมชันเหมา '🎵 Super Audio Bundle (เพลงช่วยจำ 10 เพลง + BGM ปลอดลิขสิทธิ์ 27 แทร็ก + Backing Track)' ราคาพิเศษ 590 บาทครับ รบกวนขอ QR พร้อมเพย์ด้วยครับ 🙏"
                )}
                onClick={handleBundleBuyClick}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-zinc-950 font-black text-sm sm:text-base shadow-[0_0_35px_rgba(245,158,11,0.4)] transition-all hover:scale-105 cursor-pointer"
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
            className="fixed bottom-4 left-4 right-4 z-40 max-w-5xl mx-auto rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-amber-500/40 p-4 shadow-[0_10px_50px_rgba(0,0,0,0.85)] flex flex-col sm:flex-row items-center justify-between gap-4 font-prompt"
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
                    href={getLineOrderUrl(
                      `สวัสดีครับครูอ้น สนใจสั่งซื้อแพ็กเกจเพลง/สื่อเสียงรวม ${cart.length} รายการครับ 🎵\n` +
                      cart.map((item, idx) => `${idx + 1}. [${item.code}] ${item.title} (${item.price.toLocaleString()} ฿)`).join("\n") +
                      `\n\n💵 ยอดรวมทั้งหมด: ${totalCartPrice.toLocaleString()} บาท\nรบกวนขอ QR พร้อมเพย์สำหรับชำระเงินด้วยครับ 🙏`
                    )}
                    onClick={handleCartCheckoutClick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#06C755] to-[#05b34c] hover:from-[#05b34c] hover:to-[#049b42] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(6,199,85,0.35)] cursor-pointer"
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

      {/* ─────────────────────────────────────────────────────────────
          7-PILLARS MUSIC PRODUCT DETAIL MODAL
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-slate-950 border border-amber-500/30 rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-8 shadow-2xl"
            >
              <div className="sticky top-0 z-50 flex items-center justify-between pb-3 bg-slate-950/90 backdrop-blur-sm border-b border-white/10 mb-6">
                <span className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Disc className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: "8s" }} />
                  <span>[{selectedProduct.code}] เจาะลึก 7 องค์ประกอบหลัก • {selectedProduct.title}</span>
                </span>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
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

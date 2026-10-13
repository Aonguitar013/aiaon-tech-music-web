"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Sparkles, Award, FileText, Laptop, Video,
  CheckSquare, HeartHandshake, Palette, Users, Search,
  ShoppingCart, Check, ArrowRight, ShieldCheck, Download,
  MessageCircle, ExternalLink, HelpCircle, Star, Filter,
  Layers, ChevronDown, CheckCircle2, Zap
} from "lucide-react";
import Link from "next/link";
import rawEbooks from "@/data/ebooks-catalog.json";

interface EbookItem {
  rank: number;
  code: string;
  title: string;
  category: string;
  earlyBirdPrice: number;
  regularPrice: number;
  schoolPrice: number;
  dirName: string;
  description: string;
  highlights: string[];
  synopsis: string;
  themeColor: string;
  iconName: string;
  shortCategory: string;
  discountPct: number;
}

const EBOOKS_DATA: EbookItem[] = rawEbooks as EbookItem[];

// Category Filter Tabs
const CATEGORIES = [
  { id: "ALL", label: "ทั้งหมด 30 เล่ม", icon: BookOpen },
  { id: "PA", label: "ว.PA & วิทยฐานะ", icon: Award },
  { id: "AI", label: "AI & เทคโนโลยี", icon: Sparkles },
  { id: "RESEARCH", label: "วิจัย & แผนการสอน", icon: FileText },
  { id: "CLASSROOM", label: "จัดการชั้นเรียน & จิตวิทยา", icon: HeartHandshake },
  { id: "ADMIN", label: "งานบริหาร & ธุรการ", icon: Users },
];

export function EbooksCatalogView() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<EbookItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Cart operations
  const addToCart = (item: EbookItem) => {
    if (!cart.some((c) => c.code === item.code)) {
      setCart((prev) => [...prev, item]);
    }
  };

  const removeFromCart = (code: string) => {
    setCart((prev) => prev.filter((c) => c.code !== code));
  };

  const isInCart = (code: string) => cart.some((c) => c.code === code);

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.earlyBirdPrice, 0),
    [cart]
  );

  const originalTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.regularPrice, 0),
    [cart]
  );

  // Filtered books
  const filteredBooks = useMemo(() => {
    return EBOOKS_DATA.filter((book) => {
      // Category Match
      let catMatch = true;
      if (selectedCategory === "PA") {
        catMatch = book.category.includes("ว.PA") || book.title.includes("PA") || book.category.includes("วิชาชีพ");
      } else if (selectedCategory === "AI") {
        catMatch = book.category.includes("AI") || book.category.includes("เทคโนโลยี") || book.category.includes("AR");
      } else if (selectedCategory === "RESEARCH") {
        catMatch = book.category.includes("วิจัย") || book.category.includes("แผนการสอน") || book.category.includes("Active");
      } else if (selectedCategory === "CLASSROOM") {
        catMatch = book.category.includes("ชั้นเรียน") || book.category.includes("แนะแนว") || book.category.includes("จิตวิทยา");
      } else if (selectedCategory === "ADMIN") {
        catMatch = book.category.includes("บริหาร") || book.category.includes("สารบรรณ") || book.category.includes("พัสดุ") || book.category.includes("การเงิน");
      }

      // Search Query
      const query = searchQuery.toLowerCase().trim();
      const searchMatch =
        query === "" ||
        book.title.toLowerCase().includes(query) ||
        book.code.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query) ||
        book.synopsis.toLowerCase().includes(query);

      return catMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  // Color mapper helper
  const getBadgeClass = (theme: string) => {
    switch (theme) {
      case "emerald": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "cyan": return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "purple": return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "amber": return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "rose": return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      case "blue": return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "teal": return "bg-teal-500/10 text-teal-400 border-teal-500/30";
      case "orange": return "bg-orange-500/10 text-orange-400 border-orange-500/30";
      case "pink": return "bg-pink-500/10 text-pink-400 border-pink-500/30";
      default: return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
    }
  };

  const getBorderGlow = (theme: string) => {
    switch (theme) {
      case "emerald": return "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]";
      case "cyan": return "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]";
      case "purple": return "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]";
      case "amber": return "hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]";
      case "rose": return "hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]";
      default: return "hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-20 selection:bg-indigo-500 selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>iAon Tech 2026 Bestseller E-Book Collection</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6"
          >
            คลัง 30 สุดยอด E-Book<br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              นวัตกรรม & คู่มือครูไทย ยุคใหม่
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-8 font-light"
          >
            เรียงลำดับจากความต้องการสูงสุดของครูไทย (อันดับ 1 ถึง 30) แก้ปัญหาตรงจุด ปลดล็อก ว.PA เสกงานด้วย AI 
            และคืนเวลาชีวิตให้คุณครูทุกคน <span className="text-white font-medium">“ให้ระบบทำงานแทนคุณ แล้วเอาเวลาไปใช้ชีวิตนะครับ”</span>
          </motion.p>

          {/* Value Props Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto text-left"
          >
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">เนื้อหาเข้มข้น</div>
                <div className="text-xs sm:text-sm font-bold text-white">ใช้ส่งตรวจได้จริง</div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">แถมฟรี Prompts</div>
                <div className="text-xs sm:text-sm font-bold text-white">คัดลอกสั่ง AI ทันที</div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">ฟอร์แมตมาตรฐาน</div>
                <div className="text-xs sm:text-sm font-bold text-white">อ่าน Web + พิมพ์ A4</div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">อัปเดตฟรีตลอดชีพ</div>
                <div className="text-xs sm:text-sm font-bold text-white">ประกันมาตรฐาน ก.ค.ศ.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. FILTER & SEARCH CONTROLS
      ───────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-6 backdrop-blur-xl shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition flex items-center gap-2 ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                      : "bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อเล่ม, รหัส, ว.PA..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. E-BOOK PRODUCT GRID (30 ITEMS)
      ───────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-slate-400">
            แสดงผล <span className="text-indigo-400 font-bold">{filteredBooks.length}</span> จาก 30 เล่ม
          </div>
          {cart.length > 0 && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 px-3.5 py-1.5 rounded-xl hover:bg-indigo-600 hover:text-white transition font-bold"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>เปิดดูตะกร้า ({cart.length} เล่ม)</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => {
            const inCart = isInCart(book.code);
            return (
              <motion.div
                key={book.code}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`bg-slate-900/70 border border-slate-800/80 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden ${getBorderGlow(
                  book.themeColor
                )}`}
              >
                {/* Top Rank & Category Pill */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold border ${getBadgeClass(
                        book.themeColor
                      )}`}
                    >
                      อันดับ #{book.rank} • {book.code}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      ประหยัด {book.discountPct}%
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition leading-snug mb-2 line-clamp-2">
                    {book.title}
                  </h3>

                  {/* Synopsis */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2 font-light">
                    {book.synopsis}
                  </p>

                  {/* Highlights Bullet */}
                  <div className="bg-slate-950/60 rounded-2xl p-3.5 mb-5 border border-slate-800/60 space-y-2">
                    <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>จุดเด่นประจำเล่ม</span>
                    </div>
                    {book.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="text-xs text-slate-400 flex items-start gap-2 leading-tight">
                        <span className="text-indigo-400 font-bold shrink-0 text-[11px]">✓</span>
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Actions */}
                <div className="pt-4 border-t border-slate-800/80">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <div className="text-[11px] text-slate-500 font-medium">ราคาพิเศษเปิดตัว</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white">
                          ฿{book.earlyBirdPrice}
                        </span>
                        <span className="text-xs text-slate-500 line-through">
                          ฿{book.regularPrice}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-500">สิทธิ์สถานศึกษา</div>
                      <div className="text-xs font-semibold text-slate-400">
                        ฿{book.schoolPrice}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => (inCart ? removeFromCart(book.code) : addToCart(book))}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                        inCart
                          ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30"
                          : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30"
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>เลือกแล้ว</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>ใส่ตะกร้า</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`https://line.me/R/ti/p/@aiaon?text=${encodeURIComponent(
                        `สวัสดีครับครูอ้น สนใจสั่งซื้อ E-Book [${book.code}] ${book.title} ราคา ${book.earlyBirdPrice} บาท ครับ`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1 border border-slate-700/60"
                    >
                      <span>สั่งซื้อทันที</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SUPER BUNDLE VALUE PACK (เหมา 30 เล่ม สุดคุ้ม)
      ───────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-2 border-indigo-500/40 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase mb-4">
                <Zap className="w-3.5 h-3.5" />
                <span>ULTIMATE MASTER PACK • ลดกระหน่ำ 70%</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                แพ็กเกจเหมาคลัง 30 เล่มจบ<br />
                <span className="text-indigo-400">“The All-in-One Thai Teacher Vault”</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                ปลดล็อกทุกความก้าวหน้าในวิชาชีพครู รับสิทธิ์การอ่านออนไลน์และดาวน์โหลดไฟล์แม่แบบทั้ง 30 เล่ม 
                (ว.PA, แผน Active Learning, AI Prompts, วิจัย CAR 5 บท, งานสารบรรณ, Google Sheets อัตโนมัติ) 
                พร้อมสิทธิ์เข้ากลุ่ม VIP ครูนักพัฒนา อัปเดตฟรีตลอดชีพ
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>รับสิทธิ์ใช้งานครบทั้ง 30 เล่ม ตลอดชีพ</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>แถมฟรี คลัง AI Prompts พร้อมใช้กว่า 500 คำสั่ง</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>พิมพ์เอกสารเป็น PDF A4 สวยงามเข้าเล่มได้ทันที</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>ปรึกษาแนวทางการประเมินกับครูอ้นโดยตรง</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-6 text-center">
              <div className="text-xs text-slate-400 mb-1">มูลค่ารวมแยกเล่ม ฿19,200</div>
              <div className="text-slate-500 line-through text-base font-bold mb-1">฿9,900</div>
              <div className="text-4xl sm:text-5xl font-black text-amber-400 mb-2">
                ฿2,990
              </div>
              <div className="text-xs text-emerald-400 font-semibold mb-6">
                เฉลี่ยเพียงเล่มละ 99 บาทเท่านั้น!
              </div>

              <a
                href={`https://line.me/R/ti/p/@aiaon?text=${encodeURIComponent(
                  "สวัสดีครับครูอ้น สนใจสั่งซื้อเหมาแพ็กเกจ 30 เล่มจบ The All-in-One Thai Teacher Vault ราคาพิเศษ 2,990 บาท ครับ"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-extrabold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
              >
                <span>สั่งซื้อแพ็กเหมา 30 เล่ม</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. FAQ SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            คำถามที่พบบ่อย (FAQ)
          </h2>
          <p className="text-slate-400 text-sm">
            ข้อสงสัยเกี่ยวกับการสั่งซื้อและรูปแบบการใช้งาน E-Book
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "E-Book จัดส่งในรูปแบบใด และอ่านอย่างไร?",
              a: "คุณครูจะได้รับลิงก์ส่วนตัวสำหรับเปิดอ่านผ่านเว็บเบราว์เซอร์ได้ทันทีบนมือถือ แท็บเล็ต หรือคอมพิวเตอร์ และทุกเล่มมีปุ่ม 'พิมพ์เป็นเอกสาร A4 (PDF)' ให้คุณครูกดบันทึกเป็นไฟล์ PDF คุณภาพสูงเพื่อเข้าเล่มส่งประเมินได้ทันทีครับ",
            },
            {
              q: "คำสั่ง AI Prompts ในเล่มใช้กับ AI ตัวไหนได้บ้าง?",
              a: "ออกแบบและทดสอบแล้วว่ารองรับทั้ง ChatGPT (GPT-4o), Google Gemini, Claude และ Microsoft Copilot สามารถคัดลอกคำสั่งไปวางแล้วแทนที่ข้อมูลในวงเล็บได้ทันที 100% ครับ",
            },
            {
              q: "เนื้อหาตรงตามเกณฑ์ ว.PA ล่าสุดของ ก.ค.ศ. หรือไม่?",
              a: "ตรง 100% ครับ เขียนและเรียบเรียงโดยครูอ้น (นายจิรวัฒน์ เดชเส้ง) ซึ่งปฏิบัติงานสอนจริงที่โรงเรียนหาดใหญ่วิทยาลัย ผ่านการทดลองใช้จริงในระบบ DPA และสอดรับกับ 8 ตัวชี้วัดมาตรฐานอย่างสมบูรณ์",
            },
            {
              q: "หากต้องการออกใบเสร็จรับเงิน หรือเบิกจ่ายทำได้หรือไม่?",
              a: "สามารถแจ้งแอดมินทาง LINE OA เพื่อขอรับใบเสร็จรับเงินสำหรับนำไปประกอบการเบิกจ่ายตามระเบียบของหน่วยงานหรือสถานศึกษาได้ครับ",
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden transition"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-200 hover:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                    activeFaq === idx ? "rotate-180 text-indigo-400" : ""
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. FLOATING CART MODAL / DRAWER
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-bold text-white text-base">
                    รายการ E-Book ในตะกร้า ({cart.length} เล่ม)
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-slate-400 hover:text-white text-xs font-semibold px-2 py-1"
                >
                  ปิด
                </button>
              </div>

              {/* Items List */}
              <div className="p-5 overflow-y-auto space-y-3 flex-1">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-sm">
                    ยังไม่มี E-Book ในตะกร้าครับ
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.code}
                      className="flex items-center justify-between gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">
                          [{item.code}] {item.title}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          ฿{item.earlyBirdPrice}{" "}
                          <span className="line-through text-slate-600 text-[10px]">
                            ฿{item.regularPrice}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.code)}
                        className="text-rose-400 hover:text-rose-300 text-xs shrink-0 px-2 py-1"
                      >
                        ลบ
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Checkout */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-slate-800 bg-slate-950/60">
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="text-slate-400">ยอดรวมพิเศษ:</span>
                    <div className="text-right">
                      <span className="text-slate-500 line-through text-xs mr-2">
                        ฿{originalTotal}
                      </span>
                      <span className="text-xl font-black text-indigo-400">
                        ฿{cartTotal}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`https://line.me/R/ti/p/@aiaon?text=${encodeURIComponent(
                      `สวัสดีครับครูอ้น ต้องการสั่งซื้อ E-Book รวม ${
                        cart.length
                      } เล่ม:\n${cart
                        .map((c) => `- [${c.code}] ${c.title} (฿${c.earlyBirdPrice})`)
                        .join("\n")}\nยอดรวมทั้งสิ้น ฿${cartTotal} บาท ครับ`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm transition shadow-lg shadow-indigo-600/30"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>ยืนยันคำสั่งซื้อทาง LINE OA</span>
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

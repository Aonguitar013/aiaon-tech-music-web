"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Sparkles, Award, FileText,
  HeartHandshake, Users, Search,
  ShoppingCart, Check, ArrowRight, ShieldCheck, Download,
  MessageCircle, Star,
  ChevronDown, CheckCircle2, Zap
} from "lucide-react";
import rawEbooks from "@/data/ebooks-catalog.json";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { Book3DMockup } from "@/components/ebooks/Book3DMockup";
import { findEbookByCode, EbookMetadata } from "@/components/ebooks/ebookDataHelper";
import { EbookDetailSection } from "@/components/ebooks/EbookDetailSection";
import { getLineOrderUrl } from "@/lib/line";
import { TOP_10_EBOOK_CODES, EBOOK_BUNDLE_SETS, EbookBundleSet } from "@/config/catalogVisibility";

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
  coverImage?: string | null;
}

const EBOOKS_DATA: EbookItem[] = (rawEbooks as unknown) as EbookItem[];

const CATEGORIES = [
  { id: "TOP10", label: "🔥 10 เล่มขายดี", icon: Star },
  { id: "ALL", label: "ทั้งหมด 30 เล่ม", icon: BookOpen },
  { id: "PA", label: "ว.PA & วิทยฐานะ", icon: Award },
  { id: "AI", label: "AI & เทคโนโลยี", icon: Sparkles },
  { id: "RESEARCH", label: "วิจัย & แผนการสอน", icon: FileText },
  { id: "CLASSROOM", label: "จัดการชั้นเรียน & จิตวิทยา", icon: HeartHandshake },
  { id: "ADMIN", label: "งานบริหาร & ธุรการ", icon: Users },
];

export function EbooksCatalogView() {
  const [selectedCategory, setSelectedCategory] = useState<string>("TOP10");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<EbookItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [detailEbook, setDetailEbook] = useState<EbookMetadata | null>(null);

  const addToCart = (item: EbookItem) => {
    if (!cart.some((c) => c.code === item.code)) {
      setCart((prev) => [...prev, item]);
    }
  };

  const removeFromCart = (code: string) => {
    setCart((prev) => prev.filter((c) => c.code !== code));
  };

  const isInCart = (code: string) => cart.some((c) => c.code === code);

  const { openLineModal } = useLineModal();

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.earlyBirdPrice, 0),
    [cart]
  );

  const originalTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.regularPrice, 0),
    [cart]
  );

  const cartOrderMessage = useMemo(() => {
    return `สวัสดีครับครูอ้น ต้องการสั่งซื้อ E-Book รวม ${cart.length} เล่ม:\n${cart
      .map((c) => `- [${c.code}] ${c.title} (฿${c.earlyBirdPrice})`)
      .join("\n")}\nยอดรวมทั้งสิ้น ฿${cartTotal} บาท ครับ`;
  }, [cart, cartTotal]);

  const handleCartCheckoutClick = (e: React.MouseEvent) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      setIsCartOpen(false);
      openLineModal({
        title: `สั่งซื้อ E-Book รวม ${cart.length} เล่ม`,
        price: cartTotal,
        message: cartOrderMessage,
      });
    }
  };

  const filteredBooks = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return EBOOKS_DATA.filter((book) => {
      let catMatch = true;
      if (query === "") {
        if (selectedCategory === "TOP10") {
          catMatch = TOP_10_EBOOK_CODES.includes(book.code);
        } else if (selectedCategory === "PA") {
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
      }

      const searchMatch =
        query === "" ||
        book.title.toLowerCase().includes(query) ||
        book.code.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query) ||
        book.synopsis.toLowerCase().includes(query);

      return catMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  const handleBundleSetOrder = (e: React.MouseEvent, set: EbookBundleSet) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: `${set.title} (${set.bookCount} เล่ม)`,
        price: set.bundlePrice,
        message: set.lineOrderMsg,
      });
    }
  };

  const getBadgeClass = (theme: string) => {
    switch (theme) {
      case "emerald": return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "cyan": return "bg-cyan-50 text-cyan-800 border-cyan-200";
      case "purple": return "bg-purple-50 text-purple-800 border-purple-200";
      case "amber": return "bg-amber-50 text-amber-800 border-amber-200";
      case "rose": return "bg-rose-50 text-rose-700 border-rose-200";
      case "blue": return "bg-blue-50 text-blue-800 border-blue-200";
      case "teal": return "bg-teal-50 text-teal-800 border-teal-200";
      case "orange": return "bg-orange-50 text-orange-800 border-orange-200";
      case "pink": return "bg-pink-50 text-pink-700 border-pink-200";
      default: return "bg-indigo-50 text-indigo-800 border-indigo-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E293B] pt-10 sm:pt-14 pb-20 selection:bg-amber-200 selection:text-[#0F172A] font-prompt">
      {/* 1. HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-14">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF9EF] border border-[#FDE68A] text-[#92400E] text-xs sm:text-sm font-bold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#D97706]" />
            <span>iAon Tech 2026 Bestseller E-Book Collection</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-[#0F172A] mb-6"
          >
            คลัง 30 สุดยอด E-Book<br />
            <span className="text-[#D97706]">
              นวัตกรรม &amp; คู่มือครูไทย ยุคใหม่
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-[#475569] leading-relaxed max-w-3xl mx-auto mb-8"
          >
            เรียงลำดับจากความต้องการสูงสุดของครูไทย (อันดับ 1 ถึง 30) แก้ปัญหาตรงจุด ปลดล็อก ว.PA เสกงานด้วย AI
            และคืนเวลาชีวิตให้คุณครูทุกคน <span className="text-[#0F172A] font-semibold">“ให้ระบบทำงานแทนคุณ แล้วเอาเวลาไปใช้ชีวิตนะครับ”</span>
          </motion.p>

          {/* Value Props Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto text-left"
          >
            <div className="bg-white border border-[#E2E8F0] shadow-2xs rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[#64748B]">เนื้อหาเข้มข้น</div>
                <div className="text-xs sm:text-sm font-bold text-[#0F172A]">ใช้ส่งตรวจได้จริง</div>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] shadow-2xs rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[#64748B]">แถมฟรี Prompts</div>
                <div className="text-xs sm:text-sm font-bold text-[#0F172A]">คัดลอกสั่ง AI ทันที</div>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] shadow-2xs rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center shrink-0">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[#64748B]">ฟอร์แมตมาตรฐาน</div>
                <div className="text-xs sm:text-sm font-bold text-[#0F172A]">อ่าน Web + พิมพ์ A4</div>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] shadow-2xs rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[#64748B]">อัปเดตฟรีตลอดชีพ</div>
                <div className="text-xs sm:text-sm font-bold text-[#0F172A]">ประกันมาตรฐาน ก.ค.ศ.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 1.5 CURATED E-BOOK BUNDLE SETS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
              📦 ไม่อยากเลือกทีละเล่ม? จัดเป็นชุดเซตคุ้มกว่า
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mt-1">
              3 ชุดเซต E-Book ยอดนิยม (ประหยัดสูงสุด 62%)
            </h2>
          </div>
          <button
            onClick={() => setSelectedCategory("ALL")}
            className="text-xs sm:text-sm text-[#1D4ED8] hover:text-[#1E40AF] underline underline-offset-4 self-start sm:self-auto font-semibold cursor-pointer"
          >
            ดูรายเล่มครบทั้งหมด 30 เล่ม →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EBOOK_BUNDLE_SETS.map((set) => {
            const borderStyles =
              set.accent === "amber"
                ? "border-amber-200 hover:border-amber-400"
                : set.accent === "cyan"
                  ? "border-cyan-200 hover:border-cyan-400"
                  : "border-purple-200 hover:border-purple-400";
            const badgeStyles =
              set.accent === "amber"
                ? "bg-amber-50 text-amber-800 border-amber-200"
                : set.accent === "cyan"
                  ? "bg-cyan-50 text-cyan-800 border-cyan-200"
                  : "bg-purple-50 text-purple-800 border-purple-200";
            return (
              <div
                key={set.id}
                className={`rounded-3xl bg-white border p-5 sm:p-6 shadow-sm hover:shadow-md flex flex-col justify-between transition-all duration-300 ${borderStyles}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${badgeStyles}`}>
                      {set.badge}
                    </span>
                    <span className="text-xs font-bold text-[#64748B]">{set.bookCount} เล่ม</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] mb-1.5">{set.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed mb-4">{set.subtitle}</p>
                </div>

                <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] text-[#94A3B8] line-through">
                      ฿{set.originalPrice.toLocaleString()}
                    </div>
                    <div className="text-xl font-black text-[#0F172A]">
                      ฿{set.bundlePrice.toLocaleString()}
                    </div>
                  </div>
                  <a
                    href={getLineOrderUrl(set.lineOrderMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => handleBundleSetOrder(e, set)}
                    className="px-4 py-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-extrabold text-xs inline-flex items-center gap-1.5 shadow-xs transition cursor-pointer shrink-0"
                  >
                    <span>สั่งซื้อชุดเซต</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. FILTER & SEARCH CONTROLS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10">
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition flex items-center gap-2 cursor-pointer border ${
                    isSelected
                      ? "bg-[#0F172A] text-white border-[#0F172A] shadow-xs"
                      : "bg-[#FAF8F5] hover:bg-[#F1ECE4] text-[#475569] hover:text-[#0F172A] border-[#E2E8F0]"
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
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อเล่ม, รหัส, ว.PA..."
              className="w-full bg-[#FAF8F5] border border-[#CBD5E1] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:bg-white transition"
            />
          </div>
        </div>
      </section>

      {/* 3. E-BOOK PRODUCT GRID */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-[#475569]">
            แสดงผล <span className="text-[#1D4ED8] font-bold">{filteredBooks.length}</span> จาก 30 เล่ม
          </div>
          {cart.length > 0 && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] px-3.5 py-1.5 rounded-xl hover:bg-[#DBEAFE] transition font-bold cursor-pointer"
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
                className="group relative flex flex-col h-full"
              >
                <div className="relative z-10 bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-3xl p-6 flex flex-col justify-between h-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-extrabold border ${getBadgeClass(
                          book.themeColor
                        )}`}
                      >
                        อันดับ #{book.rank} • {book.code}
                      </span>
                      <span className="text-[11px] text-[#059669] font-semibold">
                        ประหยัด {book.discountPct}%
                      </span>
                    </div>

                    <div
                      onClick={() => {
                        const meta = findEbookByCode(book.code);
                        if (meta) setDetailEbook(meta);
                      }}
                      className="relative w-full mb-4 cursor-pointer py-3 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] flex justify-center"
                      title="คลิกเพื่อเจาะลึก 7 องค์ประกอบของ E-Book เล่มนี้"
                    >
                      <Book3DMockup
                        code={book.code}
                        title={book.title}
                        category={book.shortCategory || book.category}
                        themeColor={book.themeColor}
                        rank={book.rank}
                        size="md"
                        isInteractive={true}
                      />
                    </div>

                    <h3
                      onClick={() => {
                        const meta = findEbookByCode(book.code);
                        if (meta) setDetailEbook(meta);
                      }}
                      className="text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-[#1D4ED8] transition leading-snug mb-2 line-clamp-2 cursor-pointer"
                    >
                      {book.title}
                    </h3>

                    <p className="text-xs text-[#475569] leading-relaxed mb-4 line-clamp-2">
                      {book.synopsis}
                    </p>

                    <div className="bg-[#FAF8F5] rounded-2xl p-3.5 mb-5 border border-[#E2E8F0] space-y-2">
                      <div className="text-[11px] font-bold text-[#334155] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                        <Star className="w-3 h-3 text-[#D97706] fill-[#D97706]" />
                        <span>จุดเด่นประจำเล่ม</span>
                      </div>
                      {book.highlights.slice(0, 3).map((hl, i) => (
                        <div key={i} className="text-xs text-[#475569] flex items-start gap-2 leading-tight">
                          <span className="text-[#059669] font-bold shrink-0 text-[11px]">✓</span>
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & Actions */}
                  <div className="pt-4 border-t border-[#F1F5F9]">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <div className="text-[11px] text-[#64748B] font-medium">ราคาพิเศษเปิดตัว</div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-[#D97706]">
                            ฿{book.earlyBirdPrice}
                          </span>
                          <span className="text-xs text-[#94A3B8] line-through">
                            ฿{book.regularPrice}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[11px] text-[#64748B]">สิทธิ์สถานศึกษา</div>
                        <div className="text-xs font-semibold text-[#334155]">
                          ฿{book.schoolPrice}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          const meta = findEbookByCode(book.code);
                          if (meta) setDetailEbook(meta);
                        }}
                        className="py-2.5 px-2 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 border border-[#BFDBFE] cursor-pointer"
                        title="ดูเจาะลึก 7 องค์ประกอบ"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span className="truncate">เจาะลึก</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => (inCart ? removeFromCart(book.code) : addToCart(book))}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer border ${
                          inCart
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : "bg-[#FAF8F5] hover:bg-[#F1ECE4] text-[#0F172A] border-[#E2E8F0]"
                        }`}
                      >
                        {inCart ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span className="truncate">เลือกแล้ว</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span className="truncate">ใส่ตะกร้า</span>
                          </>
                        )}
                      </button>

                      <a
                        href={getLineOrderUrl(
                          `สวัสดีครับครูอ้น สนใจสั่งซื้อ E-Book [${book.code}] ${book.title} ราคา ${book.earlyBirdPrice} บาท ครับ`
                        )}
                        data-line-title={`E-Book: ${book.title}`}
                        data-line-price={book.earlyBirdPrice}
                        data-line-code={book.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-2 bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1 shadow-xs"
                      >
                        <span className="truncate">สั่งซื้อ</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. SUPER BUNDLE VALUE PACK */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="bg-white border-2 border-[#FDE68A] rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF9EF] text-[#92400E] border border-[#FDE68A] text-xs font-bold uppercase mb-4">
                <Zap className="w-3.5 h-3.5 text-[#D97706]" />
                <span>ULTIMATE MASTER PACK • ลดกระหน่ำ 70%</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] mb-4 leading-tight">
                แพ็กเกจเหมาคลัง 30 เล่มจบ<br />
                <span className="text-[#1D4ED8]">“The All-in-One Thai Teacher Vault”</span>
              </h2>
              <p className="text-[#475569] text-sm sm:text-base leading-relaxed mb-6">
                ปลดล็อกทุกความก้าวหน้าในวิชาชีพครู รับสิทธิ์การอ่านออนไลน์และดาวน์โหลดไฟล์แม่แบบทั้ง 30 เล่ม
                (ว.PA, แผน Active Learning, AI Prompts, วิจัย CAR 5 บท, งานสารบรรณ, Google Sheets อัตโนมัติ)
                พร้อมสิทธิ์เข้ากลุ่ม VIP ครูนักพัฒนา อัปเดตฟรีตลอดชีพ
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#1E293B]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                  <span>รับสิทธิ์ใช้งานครบทั้ง 30 เล่ม ตลอดชีพ</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                  <span>แถมฟรี คลัง AI Prompts พร้อมใช้กว่า 500 คำสั่ง</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                  <span>พิมพ์เอกสารเป็น PDF A4 สวยงามเข้าเล่มได้ทันที</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                  <span>ปรึกษาแนวทางการประเมินกับครูอ้นโดยตรง</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E2E8F0] rounded-2xl p-6 text-center">
              <div className="text-xs text-[#64748B] mb-1">มูลค่ารวมแยกเล่ม ฿19,200</div>
              <div className="text-[#94A3B8] line-through text-base font-bold mb-1">฿9,900</div>
              <div className="text-4xl sm:text-5xl font-black text-[#D97706] mb-2">
                ฿2,990
              </div>
              <div className="text-xs text-[#059669] font-semibold mb-6">
                เฉลี่ยเพียงเล่มละ 99 บาทเท่านั้น!
              </div>

              <a
                href={getLineOrderUrl(
                  "สวัสดีครับครูอ้น สนใจสั่งซื้อเหมาแพ็กเกจ 30 เล่มจบ The All-in-One Thai Teacher Vault ราคาพิเศษ 2,990 บาท ครับ"
                )}
                data-line-title="แพ็กเกจเหมา 30 เล่มจบ (Ultimate Master Pack)"
                data-line-price="2,990"
                data-line-code="VAULT-30"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-extrabold rounded-xl shadow-xs transition flex items-center justify-center gap-2 text-sm"
              >
                <span>สั่งซื้อแพ็กเหมา 30 เล่ม</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
            คำถามที่พบบ่อย (FAQ)
          </h2>
          <p className="text-[#64748B] text-sm">
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
              className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-2xs transition"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0F172A] hover:bg-[#FAF8F5] cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#64748B] shrink-0 transition-transform ${
                    activeFaq === idx ? "rotate-180 text-[#1D4ED8]" : ""
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#F1F5F9] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. FLOATING CART MODAL / DRAWER */}
      {cart.length > 0 && !isCartOpen && (
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 left-4 right-24 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-40 flex items-center justify-between gap-3 rounded-2xl bg-[#0F172A] px-4 py-3 font-semibold text-white shadow-lg transition active:scale-95 hover:bg-[#1E293B] cursor-pointer"
        >
          <span className="flex items-center gap-2 text-sm">
            <ShoppingCart className="h-4 w-4 shrink-0" />
            ตะกร้า {cart.length} เล่ม · ฿{cartTotal}
          </span>
          <span className="whitespace-nowrap rounded-full bg-white/15 px-3 py-1 text-xs">ดูตะกร้า →</span>
        </button>
      )}

      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#E2E8F0] rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#1D4ED8]" />
                  <h3 className="font-bold text-[#0F172A] text-base">
                    รายการ E-Book ในตะกร้า ({cart.length} เล่ม)
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-[#64748B] hover:text-[#0F172A] text-xs font-semibold px-2 py-1 cursor-pointer"
                >
                  ปิด
                </button>
              </div>

              <div className="p-5 overflow-y-auto space-y-3 flex-1">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-[#64748B] text-sm">
                    ยังไม่มี E-Book ในตะกร้าครับ
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.code}
                      className="flex items-center justify-between gap-3 bg-[#FAF8F5] p-3 rounded-2xl border border-[#E2E8F0]"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#0F172A] truncate">
                          [{item.code}] {item.title}
                        </div>
                        <div className="text-[11px] text-[#475569]">
                          ฿{item.earlyBirdPrice}{" "}
                          <span className="line-through text-[#94A3B8] text-[11px]">
                            ฿{item.regularPrice}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.code)}
                        className="text-rose-600 hover:text-rose-700 text-xs font-semibold shrink-0 px-2 py-1 cursor-pointer"
                      >
                        ลบ
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-5 border-t border-[#E2E8F0] bg-[#FAF8F5]">
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="text-[#475569]">ยอดรวมพิเศษ:</span>
                    <div className="text-right">
                      <span className="text-[#94A3B8] line-through text-xs mr-2">
                        ฿{originalTotal}
                      </span>
                      <span className="text-xl font-black text-[#D97706]">
                        ฿{cartTotal}
                      </span>
                    </div>
                  </div>

                  <a
                    href={getLineOrderUrl(cartOrderMessage)}
                    onClick={handleCartCheckoutClick}
                    data-line-title={`สั่งซื้อ E-Book รวม ${cart.length} เล่ม`}
                    data-line-price={cartTotal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-extrabold rounded-xl flex items-center justify-center gap-2 text-sm transition shadow-xs"
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

      {/* 7. E-BOOK 7-PILLARS DETAIL MODAL */}
      <AnimatePresence>
        {detailEbook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0F172A]/65 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#FAF8F5] border border-[#E2E8F0] rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-8 shadow-2xl"
            >
              <div className="sticky top-0 z-50 flex items-center justify-between pb-3 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E2E8F0] mb-6">
                <span className="text-xs sm:text-sm font-bold text-[#1D4ED8]">
                  [{detailEbook.code}] เจาะลึก 7 องค์ประกอบหลัก E-Book
                </span>
                <button
                  onClick={() => setDetailEbook(null)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] text-[#475569] hover:text-[#0F172A] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  ✕ ปิดหน้าต่าง
                </button>
              </div>

              <EbookDetailSection
                ebook={detailEbook}
                onAddToCart={(eb) => {
                  addToCart(eb as unknown as EbookItem);
                }}
                isInCart={isInCart(detailEbook.code)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

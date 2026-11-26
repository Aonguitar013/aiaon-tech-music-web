"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  Award,
  FileText,
  HeartHandshake,
  Users,
  Search,
  ShoppingCart,
  Check,
  ArrowRight,
  ShieldCheck,
  Download,
  MessageCircle,
  Star,
  ChevronDown,
  CheckCircle2,
  Zap,
  X,
  Library,
} from "lucide-react";
import rawEbooks from "@/data/ebooks-catalog.json";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { Book3DMockup } from "@/components/ebooks/Book3DMockup";
import { findEbookByCode, EbookMetadata } from "@/components/ebooks/ebookDataHelper";
import { EbookDetailSection } from "@/components/ebooks/EbookDetailSection";
import { PillarThemeWrapper } from "@/components/layout/PillarThemeWrapper";
import { getLineOrderUrl } from "@/lib/line";
import {
  TOP_10_EBOOK_CODES,
  EBOOK_BUNDLE_SETS,
  EbookBundleSet,
} from "@/config/catalogVisibility";

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

const EBOOKS_DATA: EbookItem[] = rawEbooks as unknown as EbookItem[];

const FEATURED_HERO_BOOKS = EBOOKS_DATA.filter((b) =>
  ["EB-PA-01", "EB-AI-02", "EB-CAR-03"].includes(b.code)
);

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
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
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

  const openBookDetail = (code: string) => {
    const meta = findEbookByCode(code);
    if (meta) setDetailEbook(meta);
  };

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

  const handleSingleBookOrder = (e: React.MouseEvent, book: EbookItem) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: `E-Book: [${book.code}] ${book.title}`,
        price: book.earlyBirdPrice,
        message: `สวัสดีครับครูอ้น สนใจสั่งซื้อ E-Book [${book.code}] ${book.title} ราคา ${book.earlyBirdPrice} บาท ครับ`,
      });
    }
  };

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

  const handleUltimatePackOrder = (e: React.MouseEvent) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: "แพ็กเกจเหมา 30 เล่มจบ (Ultimate Master Pack)",
        price: 2990,
        message:
          "สวัสดีครับครูอ้น สนใจสั่งซื้อเหมาแพ็กเกจ 30 เล่มจบ The All-in-One Thai Teacher Vault ราคาพิเศษ 2,990 บาท ครับ",
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
          catMatch =
            book.category.includes("ว.PA") ||
            book.title.includes("PA") ||
            book.category.includes("วิชาชีพ");
        } else if (selectedCategory === "AI") {
          catMatch =
            book.category.includes("AI") ||
            book.category.includes("เทคโนโลยี") ||
            book.category.includes("AR");
        } else if (selectedCategory === "RESEARCH") {
          catMatch =
            book.category.includes("วิจัย") ||
            book.category.includes("แผนการสอน") ||
            book.category.includes("Active");
        } else if (selectedCategory === "CLASSROOM") {
          catMatch =
            book.category.includes("ชั้นเรียน") ||
            book.category.includes("แนะแนว") ||
            book.category.includes("จิตวิทยา");
        } else if (selectedCategory === "ADMIN") {
          catMatch =
            book.category.includes("บริหาร") ||
            book.category.includes("สารบรรณ") ||
            book.category.includes("พัสดุ") ||
            book.category.includes("การเงิน");
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

  const getBadgeClass = (theme: string) => {
    switch (theme) {
      case "emerald":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "cyan":
        return "bg-cyan-50 text-cyan-800 border-cyan-200";
      case "purple":
        return "bg-violet-50 text-violet-800 border-violet-200";
      case "amber":
        return "bg-amber-50 text-amber-900 border-amber-200";
      case "rose":
        return "bg-rose-50 text-rose-800 border-rose-200";
      case "blue":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "teal":
        return "bg-teal-50 text-teal-800 border-teal-200";
      case "orange":
        return "bg-orange-50 text-orange-800 border-orange-200";
      case "pink":
        return "bg-pink-50 text-pink-800 border-pink-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  // Helper to get real cover previews for each curated bundle
  const getBundleCoverPreviews = (set: EbookBundleSet) => {
    const targetCodes =
      set.codes.length > 0
        ? set.codes
        : ["EB-PA-01", "EB-AI-02", "EB-CAR-03", "EB-SHEET-04"];
    return EBOOKS_DATA.filter(
      (b) => targetCodes.includes(b.code) && Boolean(b.coverImage)
    ).slice(0, 3);
  };

  return (
    <PillarThemeWrapper pillar="edu" className="overflow-x-clip">
      <div className="min-h-screen text-[#1E293B] pt-8 sm:pt-12 pb-24 selection:bg-amber-200 selection:text-[#0F172A] font-prompt">
        {/* ══════════════════════════════════════════════════════
            1. EDITORIAL BOOKSTORE HERO MASTHEAD
        ══════════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto mb-14">
          <div className="rounded-[28px] bg-white border border-[#FDE68A] shadow-[0_8px_22px_rgba(15,23,42,0.04)] p-6 sm:p-10 lg:p-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Masthead Copy */}
              <div className="lg:col-span-7 min-w-0">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF9EF] border border-[#FDE68A] text-[#92400E] text-xs font-bold tracking-wide mb-5">
                  <Library className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>AiAon Edu-Verse • Editorial Bookstore 2026</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.16] text-[#0F172A] mb-4">
                  คลัง 30 สุดยอด E-Book{" "}
                  <span className="text-[#B45309]">คู่มือ &amp; นวัตกรรมครูไทย</span>
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-[#475569] leading-relaxed mb-6 max-w-2xl">
                  คัดสรรและเรียบเรียงจากงานสอนจริง ปลดล็อก ว.PA เสกงานด้วย AI ทำวิจัย 5 บท
                  และระบบ Google Sheets อัตโนมัติ{" "}
                  <span className="text-[#0F172A] font-semibold">
                    “ให้ระบบทำงานแทนคุณ แล้วเอาเวลาไปใช้ชีวิตนะครับ”
                  </span>
                </p>

                {/* Primary Hero CTAs */}
                <div className="flex flex-wrap items-center gap-3 mb-7">
                  <a
                    href="#bookstore-shelf"
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-bold transition shadow-xs"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>เลือกดู 10 เล่มขายดี</span>
                  </a>
                  <a
                    href="#bundle-sets"
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#78350F] text-sm font-bold transition border border-[#FDE68A]"
                  >
                    <Sparkles className="w-4 h-4 text-[#B45309]" />
                    <span>ดู 3 ชุดเซตประหยัดสูงสุด 62%</span>
                  </a>
                </div>

                {/* 4 Compact Value Props */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    {
                      icon: CheckCircle2,
                      tone: "bg-emerald-50 text-emerald-700 border-emerald-200",
                      label: "ตรงเกณฑ์ ก.ค.ศ.",
                      sub: "ใช้ส่งตรวจได้จริง",
                    },
                    {
                      icon: Sparkles,
                      tone: "bg-amber-50 text-amber-700 border-amber-200",
                      label: "แถม AI Prompts",
                      sub: "คัดลอกสั่งได้ทันที",
                    },
                    {
                      icon: Download,
                      tone: "bg-sky-50 text-sky-700 border-sky-200",
                      label: "Web + PDF A4",
                      sub: "พิมพ์เข้าเล่มคมชัด",
                    },
                    {
                      icon: ShieldCheck,
                      tone: "bg-violet-50 text-violet-700 border-violet-200",
                      label: "อัปเดตตลอดชีพ",
                      sub: "ไม่มีวันหมดอายุ",
                    },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl bg-[#FFFDF7] border border-[#E2E8F0] p-3 flex items-center gap-2.5 min-w-0"
                      >
                        <div
                          className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${item.tone}`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#0F172A] truncate">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-[#64748B] truncate">
                            {item.sub}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Real-Cover Editorial Bookshelf Showcase */}
              <div className="lg:col-span-5 min-w-0">
                <div className="rounded-3xl bg-[#FEF9EF] border border-[#FDE68A] p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#92400E] flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706]" />
                      Editor&apos;s Pick • Top 3 ปกจริง
                    </span>
                    <span className="text-[11px] font-semibold text-[#64748B]">
                      คลิกปกเพื่อเจาะลึก
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {FEATURED_HERO_BOOKS.map((book) => (
                      <button
                        key={book.code}
                        type="button"
                        onClick={() => openBookDetail(book.code)}
                        className="group text-left flex flex-col gap-2 cursor-pointer min-w-0"
                      >
                        <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-white border border-[#E2E8F0] shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
                          {book.coverImage && (
                            <img
                              src={book.coverImage}
                              alt={`ปก ${book.title}`}
                              className="w-full h-full object-cover"
                            />
                          )}
                          <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-[#0F172A]/85 text-white text-[10px] font-bold">
                            #{book.rank}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="text-[11px] font-bold text-[#0F172A] group-hover:text-[#B45309] line-clamp-2 leading-snug transition">
                            {book.title}
                          </div>
                          <div className="text-xs font-black text-[#B45309] mt-0.5">
                            ฿{book.earlyBirdPrice}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            2. CURATED E-BOOK BUNDLE SETS (3 ชุดเซตยอดนิยม)
        ══════════════════════════════════════════════════════ */}
        <section
          id="bundle-sets"
          className="px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto mb-12 scroll-mt-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
                Curated Reading Sets • จัดเซตคุ้มกว่าเลือกทีละเล่ม
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mt-1">
                3 ชุดเซต E-Book ยอดนิยม (ประหยัดสูงสุด 67%)
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("ALL");
                document
                  .getElementById("bookstore-shelf")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs sm:text-sm text-[#92400E] hover:text-[#78350F] underline underline-offset-4 self-start sm:self-auto font-bold cursor-pointer"
            >
              ดูรายเล่มครบทั้งหมด 30 เล่ม →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {EBOOK_BUNDLE_SETS.map((set) => {
              const borderStyles =
                set.accent === "amber"
                  ? "border-[#FDE68A] hover:border-[#F59E0B]"
                  : set.accent === "cyan"
                    ? "border-sky-200 hover:border-sky-400"
                    : "border-violet-200 hover:border-violet-400";
              const badgeStyles =
                set.accent === "amber"
                  ? "bg-[#FEF9EF] text-[#92400E] border-[#FDE68A]"
                  : set.accent === "cyan"
                    ? "bg-sky-50 text-sky-900 border-sky-200"
                    : "bg-violet-50 text-violet-900 border-violet-200";
              const coverPreviews = getBundleCoverPreviews(set);
              const savePct = Math.round(
                ((set.originalPrice - set.bundlePrice) / set.originalPrice) * 100
              );

              return (
                <div
                  key={set.id}
                  className={`rounded-3xl bg-white border p-5 sm:p-6 shadow-[0_8px_22px_rgba(15,23,42,0.04)] hover:shadow-md flex flex-col justify-between transition-all duration-300 min-w-0 ${borderStyles}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${badgeStyles}`}
                      >
                        {set.badge}
                      </span>
                      <span className="text-xs font-bold text-[#059669] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        ลด {savePct}%
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] mb-1.5">
                      {set.title}
                    </h3>
                    <p className="text-xs text-[#475569] leading-relaxed mb-4">
                      {set.subtitle}
                    </p>

                    {/* Mini Real Cover Strip */}
                    {coverPreviews.length > 0 && (
                      <div className="flex items-center gap-2 mb-4 p-2.5 rounded-2xl bg-[#FFFDF7] border border-[#E2E8F0]">
                        <div className="flex -space-x-2 shrink-0">
                          {coverPreviews.map((b) => (
                            <img
                              key={b.code}
                              src={b.coverImage || ""}
                              alt={b.title}
                              className="w-9 h-12 rounded-md object-cover border-2 border-white shadow-xs"
                            />
                          ))}
                        </div>
                        <div className="text-[11px] text-[#475569] leading-tight min-w-0">
                          <span className="font-bold text-[#0F172A]">
                            รวม {set.bookCount} เล่มครบชุด
                          </span>
                          <div className="truncate text-[#64748B]">
                            พร้อม Web Reader + พิมพ์ A4
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3.5 border-t border-[#F1F5F9] flex items-center justify-between gap-3">
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
                      className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-extrabold text-xs inline-flex items-center gap-1.5 shadow-xs transition cursor-pointer shrink-0"
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

        {/* ══════════════════════════════════════════════════════
            3. BOOKSTORE FILTER & SEARCH SHELF
        ══════════════════════════════════════════════════════ */}
        <section
          id="bookstore-shelf"
          className="px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto mb-8 scroll-mt-24"
        >
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-4 sm:p-5 shadow-[0_8px_22px_rgba(15,23,42,0.04)] flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id && searchQuery.trim() === "";
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      if (searchQuery) setSearchQuery("");
                    }}
                    className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition flex items-center gap-2 cursor-pointer border ${
                      isSelected
                        ? "bg-[#0F172A] text-white border-[#0F172A] shadow-xs"
                        : "bg-[#FFFDF7] hover:bg-[#FEF9EF] text-[#475569] hover:text-[#0F172A] border-[#E2E8F0]"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Box */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาชื่อเล่ม, รหัส, ว.PA..."
                aria-label="ค้นหา E-Book"
                className="w-full min-h-[44px] bg-[#FFFDF7] border border-[#CBD5E1] rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#D97706] focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="ล้างคำค้นหา"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#64748B] hover:text-[#0F172A] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            4. E-BOOK BOOKSTORE PRODUCT GRID
        ══════════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto mb-20">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="text-sm text-[#475569]">
              แสดงผล{" "}
              <span className="text-[#0F172A] font-extrabold">
                {filteredBooks.length}
              </span>{" "}
              จาก {EBOOKS_DATA.length} เล่ม
              {searchQuery.trim() !== "" && (
                <span className="ml-2 text-xs text-[#92400E] font-semibold">
                  สำหรับคำค้น “{searchQuery}”
                </span>
              )}
            </div>

            {cart.length > 0 && (
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-2 min-h-[40px] text-xs sm:text-sm bg-[#FEF9EF] text-[#92400E] border border-[#FDE68A] px-3.5 py-1.5 rounded-xl hover:bg-[#FEF3C7] transition font-bold cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>
                  เปิดดูตะกร้า ({cart.length} เล่ม • ฿{cartTotal.toLocaleString()})
                </span>
              </button>
            )}
          </div>

          {filteredBooks.length === 0 ? (
            <div className="rounded-3xl bg-white border border-[#E2E8F0] p-12 text-center shadow-2xs">
              <BookOpen className="w-10 h-10 text-[#94A3B8] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#0F172A] mb-1">
                ไม่พบ E-Book ที่ตรงกับคำค้นหา
              </h3>
              <p className="text-sm text-[#64748B] mb-5">
                ลองเปลี่ยนคำค้นหา หรือกดดูรายการทั้งหมด 30 เล่มได้เลยครับ
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("ALL");
                }}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#0F172A] text-white text-sm font-bold hover:bg-[#1E293B] transition cursor-pointer"
              >
                แสดงครบทั้งหมด 30 เล่ม
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => {
                const inCart = isInCart(book.code);
                return (
                  <motion.article
                    key={book.code}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className="group relative flex flex-col h-full min-w-0"
                  >
                    <div className="relative z-10 bg-white border border-[#E2E8F0] hover:border-[#F59E0B]/70 rounded-3xl p-5 sm:p-6 flex flex-col justify-between h-full transition-all duration-300 shadow-[0_8px_22px_rgba(15,23,42,0.04)] hover:shadow-md hover:-translate-y-1 min-w-0">
                      <div>
                        {/* Card Top Meta Row */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-extrabold border truncate ${getBadgeClass(
                              book.themeColor
                            )}`}
                          >
                            #{book.rank} • {book.code}
                          </span>
                          <span className="text-[11px] text-[#059669] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold shrink-0">
                            ประหยัด {book.discountPct}%
                          </span>
                        </div>

                        {/* Editorial Book Display Stage */}
                        <div
                          onClick={() => openBookDetail(book.code)}
                          className="relative w-full mb-4 cursor-pointer py-3 rounded-2xl bg-[#FEF9EF]/80 border border-[#FDE68A]/70 flex justify-center overflow-hidden"
                          title="คลิกเพื่อเจาะลึก 7 องค์ประกอบของ E-Book เล่มนี้"
                        >
                          <Book3DMockup
                            code={book.code}
                            title={book.title}
                            category={book.shortCategory || book.category}
                            themeColor={book.themeColor}
                            rank={book.rank}
                            coverImage={book.coverImage}
                            size="md"
                            isInteractive={true}
                          />
                        </div>

                        {/* Book Title & Synopsis */}
                        <h3
                          onClick={() => openBookDetail(book.code)}
                          className="text-base sm:text-lg font-extrabold text-[#0F172A] group-hover:text-[#B45309] transition leading-snug mb-2 line-clamp-2 cursor-pointer"
                        >
                          {book.title}
                        </h3>

                        <p className="text-xs text-[#475569] leading-relaxed mb-4 line-clamp-2">
                          {book.synopsis}
                        </p>

                        {/* Highlights Box */}
                        <div className="bg-[#FFFDF7] rounded-2xl p-3.5 mb-5 border border-[#E2E8F0] space-y-2">
                          <div className="text-[11px] font-bold text-[#92400E] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                            <Star className="w-3 h-3 text-[#D97706] fill-[#D97706]" />
                            <span>จุดเด่นประจำเล่ม</span>
                          </div>
                          {book.highlights.slice(0, 3).map((hl, i) => (
                            <div
                              key={i}
                              className="text-xs text-[#334155] flex items-start gap-2 leading-snug"
                            >
                              <span className="text-[#059669] font-bold shrink-0 text-[11px]">
                                ✓
                              </span>
                              <span className="line-clamp-1">{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing & Actions */}
                      <div className="pt-4 border-t border-[#F1F5F9]">
                        <div className="flex items-baseline justify-between gap-2 mb-4">
                          <div>
                            <div className="text-[11px] text-[#64748B] font-medium">
                              ราคาพิเศษเปิดตัว
                            </div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-black text-[#B45309]">
                                ฿{book.earlyBirdPrice}
                              </span>
                              <span className="text-xs text-[#94A3B8] line-through">
                                ฿{book.regularPrice}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[11px] text-[#64748B]">
                              สิทธิ์สถานศึกษา
                            </div>
                            <div className="text-xs font-bold text-[#334155]">
                              ฿{book.schoolPrice.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => openBookDetail(book.code)}
                            className="min-h-[44px] py-2 px-2 bg-[#FFFDF7] hover:bg-[#FEF9EF] text-[#0F172A] rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 border border-[#E2E8F0] hover:border-[#FDE68A] cursor-pointer"
                            title="ดูเจาะลึก 7 องค์ประกอบ"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                            <span className="truncate">เจาะลึก</span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              inCart ? removeFromCart(book.code) : addToCart(book)
                            }
                            className={`min-h-[44px] py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer border ${
                              inCart
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                : "bg-[#FFFDF7] hover:bg-[#F8FAFC] text-[#0F172A] border-[#E2E8F0]"
                            }`}
                          >
                            {inCart ? (
                              <>
                                <Check className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">เลือกแล้ว</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">ใส่ตะกร้า</span>
                              </>
                            )}
                          </button>

                          <a
                            href={getLineOrderUrl(
                              `สวัสดีครับครูอ้น สนใจสั่งซื้อ E-Book [${book.code}] ${book.title} ราคา ${book.earlyBirdPrice} บาท ครับ`
                            )}
                            onClick={(e) => handleSingleBookOrder(e, book)}
                            data-line-title={`E-Book: ${book.title}`}
                            data-line-price={book.earlyBirdPrice}
                            data-line-code={book.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[44px] py-2 px-2 bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1 shadow-xs"
                          >
                            <span className="truncate">สั่งซื้อ</span>
                            <ArrowRight className="w-3 h-3 shrink-0" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </section>

        {/* ══════════════════════════════════════════════════════
            5. ULTIMATE 30-BOOK LIBRARY PACK
        ══════════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto mb-20">
          <div className="bg-white border-2 border-[#FDE68A] rounded-[28px] p-6 sm:p-10 lg:p-12 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF9EF] text-[#92400E] border border-[#FDE68A] text-xs font-bold uppercase mb-4">
                  <Zap className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>ULTIMATE LIBRARY PACK • ประหยัดสูงสุด 70%</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4 leading-tight">
                  แพ็กเกจเหมาคลัง 30 เล่มจบ
                  <br />
                  <span className="text-[#B45309]">
                    “The All-in-One Thai Teacher Library”
                  </span>
                </h2>
                <p className="text-[#475569] text-sm sm:text-base leading-relaxed mb-6">
                  ปลดล็อกทุกความก้าวหน้าในวิชาชีพครู รับสิทธิ์อ่านออนไลน์และพิมพ์ไฟล์ PDF A4
                  ครบทั้ง 30 เล่ม (ว.PA, แผน Active Learning, 100 AI Prompts, วิจัย CAR 5 บท,
                  งานสารบรรณ, Google Sheets อัตโนมัติ) พร้อมสิทธิ์อัปเดตฟรีตลอดชีพ
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#1E293B]">
                  {[
                    "รับสิทธิ์ใช้งานครบทั้ง 30 เล่ม ตลอดชีพ",
                    "แถมฟรี คลัง AI Prompts พร้อมใช้กว่า 500 คำสั่ง",
                    "พิมพ์เอกสารเป็น PDF A4 สวยงามเข้าเล่มได้ทันที",
                    "ปรึกษาแนวทางการประเมินกับครูอ้นโดยตรง",
                  ].map((perk, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#FEF9EF] border border-[#FDE68A] rounded-2xl p-6 text-center">
                <div className="text-xs text-[#64748B] mb-1">
                  มูลค่ารวมแยกเล่ม ฿19,200
                </div>
                <div className="text-[#94A3B8] line-through text-base font-bold mb-1">
                  ฿9,900
                </div>
                <div className="text-4xl sm:text-5xl font-black text-[#B45309] mb-2">
                  ฿2,990
                </div>
                <div className="text-xs text-[#059669] font-bold mb-6">
                  เฉลี่ยเพียงเล่มละ 99 บาทเท่านั้น!
                </div>

                <a
                  href={getLineOrderUrl(
                    "สวัสดีครับครูอ้น สนใจสั่งซื้อเหมาแพ็กเกจ 30 เล่มจบ The All-in-One Thai Teacher Vault ราคาพิเศษ 2,990 บาท ครับ"
                  )}
                  onClick={handleUltimatePackOrder}
                  data-line-title="แพ็กเกจเหมา 30 เล่มจบ (Ultimate Master Pack)"
                  data-line-price="2,990"
                  data-line-code="VAULT-30"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] py-3.5 px-4 bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-extrabold rounded-xl shadow-xs transition flex items-center justify-center gap-2 text-sm"
                >
                  <span>สั่งซื้อแพ็กเหมา 30 เล่ม</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            6. EDITORIAL FAQ SECTION
        ══════════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-2">
              คำถามที่พบบ่อย (FAQ)
            </h2>
            <p className="text-[#64748B] text-sm">
              ข้อสงสัยเกี่ยวกับการสั่งซื้อ การอ่านผ่านเว็บ และการพิมพ์เป็นเอกสาร PDF A4
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
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full min-h-[52px] p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0F172A] hover:bg-[#FFFDF7] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#64748B] shrink-0 transition-transform ${
                      activeFaq === idx ? "rotate-180 text-[#B45309]" : ""
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

        {/* ══════════════════════════════════════════════════════
            7. FLOATING CART BAR & MODAL
        ══════════════════════════════════════════════════════ */}
        {cart.length > 0 && !isCartOpen && (
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 left-4 right-20 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-40 min-h-[48px] flex items-center justify-between gap-3 rounded-2xl bg-[#0F172A] px-4 py-3 font-semibold text-white shadow-lg transition active:scale-95 hover:bg-[#1E293B] cursor-pointer"
          >
            <span className="flex items-center gap-2 text-sm">
              <ShoppingCart className="h-4 w-4 shrink-0 text-amber-400" />
              ตะกร้า {cart.length} เล่ม · ฿{cartTotal.toLocaleString()}
            </span>
            <span className="whitespace-nowrap rounded-full bg-white/15 px-3 py-1 text-xs">
              ดูตะกร้า →
            </span>
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
                    <ShoppingCart className="w-5 h-5 text-[#B45309]" />
                    <h3 className="font-bold text-[#0F172A] text-base">
                      รายการ E-Book ในตะกร้า ({cart.length} เล่ม)
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="min-h-[36px] text-[#64748B] hover:text-[#0F172A] text-xs font-bold px-2.5 py-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                  >
                    ✕ ปิด
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
                        className="flex items-center justify-between gap-3 bg-[#FFFDF7] p-3 rounded-2xl border border-[#E2E8F0]"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {item.coverImage && (
                            <img
                              src={item.coverImage}
                              alt={item.title}
                              className="w-9 h-12 rounded-md object-cover border border-[#E2E8F0] shrink-0"
                            />
                          )}
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
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.code)}
                          className="text-rose-700 hover:text-rose-800 text-xs font-bold shrink-0 px-2 py-1 cursor-pointer"
                        >
                          ลบ
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-5 border-t border-[#E2E8F0] bg-[#FEF9EF]">
                    <div className="flex items-center justify-between mb-3 text-sm">
                      <span className="text-[#475569] font-medium">ยอดรวมพิเศษ:</span>
                      <div className="text-right">
                        <span className="text-[#94A3B8] line-through text-xs mr-2">
                          ฿{originalTotal.toLocaleString()}
                        </span>
                        <span className="text-xl font-black text-[#B45309]">
                          ฿{cartTotal.toLocaleString()}
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
                      className="w-full min-h-[48px] py-3 bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-extrabold rounded-xl flex items-center justify-center gap-2 text-sm transition shadow-xs"
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

        {/* ══════════════════════════════════════════════════════
            8. E-BOOK 7-PILLARS DETAIL MODAL
        ══════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {detailEbook && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0F172A]/65 backdrop-blur-sm overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                className="relative bg-[#FFFDF7] border border-[#FDE68A] rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-8 shadow-2xl"
              >
                <div className="sticky top-0 z-50 flex items-center justify-between pb-3 bg-[#FFFDF7]/95 backdrop-blur-sm border-b border-[#E2E8F0] mb-6">
                  <span className="text-xs sm:text-sm font-bold text-[#92400E] truncate pr-3">
                    [{detailEbook.code}] เจาะลึก 7 องค์ประกอบหลัก E-Book
                  </span>
                  <button
                    type="button"
                    onClick={() => setDetailEbook(null)}
                    className="min-h-[36px] px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] text-[#475569] hover:text-[#0F172A] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
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
    </PillarThemeWrapper>
  );
}

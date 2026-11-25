"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Printer,
  QrCode,
  Layers,
  Gift,
  CheckCircle2,
  Zap,
  Home,
  School,
  Download,
  Scissors,
  HeartHandshake,
  BookOpenCheck,
  Filter,
} from "lucide-react";
import { FaLine } from "react-icons/fa6";
import { EDU_CATALOG, getEduOrderLineUrl } from "@/lib/eduCatalog";

type AudienceMode = "home" | "class";
type GoalFilterId = "all" | "bb01" | "rt01" | "ef01" | "mu01" | "vl01";

const GOAL_FILTERS: {
  id: GoalFilterId;
  age: string;
  goal: string;
  emoji: string;
  desc: string;
}[] = [
  {
    id: "all",
    age: "ทุกช่วงวัย 3–6 ปี",
    goal: "ดูครบทั้ง 5 เล่ม Live",
    emoji: "🐾",
    desc: "แสดงสื่อการสอน Hybrid QR ครบทั้ง 5 ชุดพร้อมใช้งานในจักรวาลแก๊ง 6 แมว",
  },
  {
    id: "vl01",
    age: "วัย 3–6 ปี",
    goal: "โฟนิกส์ A–Z / คำศัพท์ 2 ภาษา",
    emoji: "🗺️",
    desc: "กดฟังเสียงโฟนิกส์ A–Z + คำศัพท์ 6 หมวด 36 คำ + ผสมคำ CVC + 27 แฟลชการ์ดตัดเล่นกับน้องบ๊อบ",
  },
  {
    id: "bb01",
    age: "วัย 3–5 ปี",
    goal: "ฝึกลีลามือ / ไม่ยอมแปรงฟัน",
    emoji: "🪥",
    desc: "แก้ปัญหาลูกงอแงตอนแปรงฟัน & ฝึกกล้ามเนื้อมัดเล็กด้วยบอร์ดแปรงฟัน P15 + การ์ดตีนตุ๊กแก 45 ชิ้น",
  },
  {
    id: "rt01",
    age: "วัย 3–6 ปี",
    goal: "แก้ลูกงอแงตอนเช้า / สร้างวินัย",
    emoji: "⏰",
    desc: "เลิกบ่นซ้ำด้วยตารางกิจวัตร 3 ช่วงเวลา + ขวดโหล 20 ดาว + นาฬิกาจับเวลาแม่ใหญ่",
  },
  {
    id: "ef01",
    age: "วัย 4–6 ปี",
    goal: "ฝึกสมอง EF / เตรียม ป.1",
    emoji: "🧠",
    desc: "อัปสกิลสมาธิ โค้ดดิ้งไร้จอ และซูโดกุภาพ 4×4 คู่นาฬิกา Focus Timer น้องแซลมอน",
  },
  {
    id: "mu01",
    age: "วัย 4–6 ปี",
    goal: "ดนตรีเสียงจริง / ฝึกจังหวะ",
    emoji: "🎵",
    desc: "ปูพื้นฐานจังหวะและโน้ตดนตรีจากศูนย์ คู่ห้องซ้อม 6 แทร็กเสียงจริง 70/95 BPM น้องข้าวต้ม",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Download,
    colorBg: "bg-amber-100 text-amber-800 border-amber-200",
    title: "โหลดไฟล์ PDF ทันที",
    desc: "รับลิงก์ไฟล์ความละเอียดสูงทันทีหลังโอน หรือกดโหลดชุดทดลองฟรี 25 หน้า (ครบ 5 เล่ม) ไปลองปริ้นท์ดูก่อน 0 ฿",
  },
  {
    step: "02",
    icon: Printer,
    colorBg: "bg-sky-100 text-sky-800 border-sky-200",
    title: "ปริ้นท์ A4 / US Letter (มีขาวดำประหยัดหมึก)",
    desc: "ทุกชุดแถมไฟล์ขาว-ดำเส้นคมประหยัดหมึก ปริ้นท์ที่บ้านหรือร้านถ่ายเอกสารได้ไม่ตกขอบ 100%",
  },
  {
    step: "03",
    icon: Scissors,
    colorBg: "bg-rose-100 text-rose-800 border-rose-200",
    title: "เคลือบใสติดตีนตุ๊กแกเล่นซ้ำได้ตลอดปี",
    desc: "เผื่อขอบเจาะรู 20mm เข้าห่วงพกไปร้านอาหารได้ + สแกน QR เปิดนาฬิกาจับเวลาบนมือถือคู่กระดาษ",
  },
];

export function EduHubClient() {
  const [audience, setAudience] = useState<AudienceMode>("home");
  const [selectedGoal, setSelectedGoal] = useState<GoalFilterId>("all");

  const filteredCatalog =
    selectedGoal === "all"
      ? EDU_CATALOG
      : EDU_CATALOG.filter((item) => item.slug === selectedGoal);

  const activeGoalMeta =
    GOAL_FILTERS.find((g) => g.id === selectedGoal) ?? GOAL_FILTERS[0];

  const handleSelectAudience = (mode: AudienceMode) => {
    setAudience(mode);
    const el = document.getElementById("catalog");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full overflow-x-hidden bg-[#FFFDF7] text-[#1E293B] -mt-4 md:-mt-8 pt-6 md:pt-10 pb-16 sm:pb-20 border-b border-amber-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-14">
        {/* ============================================================
            BLOCK 1: HERO — 3-SECOND PAIN POINT + DUAL-PATH (HOME / CLASS)
        ============================================================ */}
        <section className="relative rounded-3xl border border-amber-200/90 bg-gradient-to-br from-[#FEF9EF] via-white to-[#FFF5F5] overflow-hidden shadow-lg shadow-amber-900/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>iAon EDU-VERSE • สื่อเด็กเล็ก 3–6 ปี มาตรฐานครูตัวจริง</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-[#1E293B] leading-[1.2] tracking-tight">
                เลิกบ่นซ้ำทุกเช้า!{" "}
                <span className="text-rose-600">สื่อกิจกรรมไร้จอ + QR จับเวลา</span>{" "}
                ที่ลูกหยิบเล่นเองได้ทุกวัน
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                เปลี่ยนเวลาหน้าจอมือถือให้เป็นการเรียนรู้บนกระดาษที่ลูกสนุกจริง — ครบทั้ง
                <strong className="text-slate-900"> ฝึกสมอง EF, ตารางสร้างวินัย 30 วัน, Busy Book 45 การ์ดตีนตุ๊กแก</strong>{" "}
                และดนตรีเด็กเล็ก โดยแก๊ง 6 แมว &amp; ครูอ้น{" "}
                <span className="font-semibold text-slate-800">
                  ได้ครบ TH/EN + สีและขาวดำประหยัดหมึกทุกชุด
                </span>
              </p>

              {/* Dual-Path Audience Buttons (Home vs Class) */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleSelectAudience("home")}
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm sm:text-base font-bold transition-all cursor-pointer shadow-md ${
                    audience === "home"
                      ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20"
                      : "bg-white hover:bg-rose-50 text-slate-900 border-2 border-rose-300"
                  }`}
                >
                  <Home className="w-4 h-4 shrink-0" />
                  <span>สำหรับคุณพ่อคุณแม่ (Home • เริ่ม 99฿)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectAudience("class")}
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm sm:text-base font-bold transition-all cursor-pointer shadow-sm ${
                    audience === "class"
                      ? "bg-sky-700 hover:bg-sky-800 text-white shadow-sky-500/20"
                      : "bg-white hover:bg-sky-50 text-slate-900 border-2 border-sky-300"
                  }`}
                >
                  <School className="w-4 h-4 shrink-0" />
                  <span>สำหรับคุณครูอนุบาล (Class • ปริ้นท์ไม่อั้น)</span>
                </button>
              </div>

              {/* Quick Freebie & Bundle Micro-Links */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs sm:text-sm font-semibold">
                <a
                  href="#catalog"
                  className="inline-flex items-center gap-1.5 text-amber-800 hover:text-amber-950 underline underline-offset-4"
                >
                  <Download className="w-4 h-4 text-amber-600" />
                  <span>ทดลองโหลดฟรีครบ 5 เล่ม รวม 25 หน้า (0 ฿ ไม่ต้องสมัคร)</span>
                </a>
                <a
                  href="#mega-bundle"
                  className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-900 underline underline-offset-4"
                >
                  <Gift className="w-4 h-4 text-emerald-600" />
                  <span>โปรเหมาสุดคุ้ม 249฿ / 399฿ (ครบ 5 เล่ม)</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-full p-4 sm:p-6 lg:p-6 flex flex-col justify-center">
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-200/80 shadow-md bg-white">
                <img
                  src="/edu/hero-banner-6cats.webp"
                  alt="iAon Edu-Verse 6 Cats Squad — สื่อการสอนเด็กเล็ก Hybrid QR"
                  className="w-full h-auto object-cover aspect-[16/10] lg:aspect-[4/3]"
                />
                <div className="bg-white/95 backdrop-blur-sm border-t border-amber-100 px-4 py-2.5 flex items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-slate-800">
                    🐾 แก๊ง 6 แมว • 5/6 เล่ม Live เต็มระบบ (160 หน้า)
                  </span>
                  <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 font-bold text-emerald-800 shrink-0">
                    ฟรี 25 หน้า!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            BLOCK 2: CREATOR CREDIBILITY & TRUST STRIP
        ============================================================ */}
        <section
          aria-label="มาตรฐานการออกแบบโดยครูตัวจริง"
          className="rounded-3xl border border-amber-200/80 bg-white p-5 sm:p-6 shadow-sm space-y-5"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
                <BookOpenCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-[#1E293B]">
                  ออกแบบโดยครูตัวจริง • มาตรฐาน Zero AI-Slop 100% • ขอบเจาะรู 20mm • การ์ดติดป้ายเลขหน้า
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  พัฒนาโดย <strong>ครูอ้น (จิรวัฒน์ เดชเส้ง)</strong> ครู ค.ศ.2 — ตรวจคำตอบทางคณิตศาสตร์ &amp; พัฒนาการเด็กเล็กครบทุกหน้า ไม่มีภาพเพี้ยนหรือโจทย์มั่ว
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800 shrink-0 self-start md:self-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>ปลอดภัยไร้โฆษณา 100%</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {[
              {
                icon: QrCode,
                accent: "bg-rose-50 text-rose-700 border-rose-200",
                title: "Hybrid QR บนกระดาษ",
                desc: "สแกนเปิด Focus Timer, Routine Timer หรือนาฬิกาแปรงฟัน 2 นาที ไร้โฆษณาบนมือถือทันที",
              },
              {
                icon: ShieldCheck,
                accent: "bg-amber-50 text-amber-800 border-amber-200",
                title: "Zero AI-Slop 100%",
                desc: "เขาวงกต ซูโดกุ การ์ดตีนตุ๊กแก 45 ชิ้น และโน้ตดนตรีตรวจถูกต้องทุกหน้าพร้อมเฉลย",
              },
              {
                icon: Printer,
                accent: "bg-sky-50 text-sky-800 border-sky-200",
                title: "ขอบเจาะรู 20mm + ขาวดำ",
                desc: "เข้าสันห่วง/เคลือบใสไม่กินเนื้อหา แถมไฟล์ขาว-ดำประหยัดหมึก A4 & US Letter ทุกเล่ม",
              },
              {
                icon: Layers,
                accent: "bg-emerald-50 text-emerald-800 border-emerald-200",
                title: "การ์ดติดป้ายเลขหน้า",
                desc: "การ์ดตีนตุ๊กแกทุกใบมีแท็ก [P09]–[P18] ชัดเจน ตัดแล้วไม่สับสนหลงบอร์ด 100%",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200/80 bg-[#FFFDF7] p-4 space-y-2"
                >
                  <div
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center ${item.accent}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#1E293B]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            BLOCK 3: SHOP BY AGE & GOAL (INTERACTIVE FILTER BAR)
        ============================================================ */}
        <section id="shop-by-goal" className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700">
                <Filter className="w-3.5 h-3.5" />
                <span>SHOP BY AGE &amp; GOAL</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mt-0.5">
                เลือกตามช่วงวัย &amp; ปัญหาของลูก
              </h2>
            </div>
            {selectedGoal !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedGoal("all")}
                className="text-xs sm:text-sm font-bold text-rose-700 hover:text-rose-900 underline underline-offset-4 cursor-pointer"
              >
                ล้างตัวกรอง (แสดงครบทั้ง 4 เล่ม)
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5">
            {GOAL_FILTERS.map((g) => {
              const active = selectedGoal === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setSelectedGoal(g.id)}
                  className={`text-left rounded-2xl border-2 p-3.5 transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                    active
                      ? "border-rose-500 bg-rose-50 shadow-md shadow-rose-500/10"
                      : "border-slate-200 bg-white hover:border-amber-300 hover:bg-[#FEF9EF]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-lg leading-none">{g.emoji}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                        active
                          ? "bg-rose-600 text-white"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {g.age}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#1E293B] leading-snug">
                    {g.goal}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-amber-200 bg-[#FEF9EF] px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-slate-700">
            <span>
              <strong className="text-slate-900">
                {activeGoalMeta.emoji} {activeGoalMeta.age} — {activeGoalMeta.goal}:
              </strong>{" "}
              {activeGoalMeta.desc}
            </span>
            <span className="font-bold text-amber-900 shrink-0">
              พบ {filteredCatalog.length} ชุดสื่อ
            </span>
          </div>
        </section>

        {/* ============================================================
            BLOCK 4: 4-SKU EDITORIAL CATALOG GRID (HOME / CLASS AWARE)
        ============================================================ */}
        <section id="catalog" className="space-y-5 scroll-mt-24">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
                คลังสื่อการสอน 5/6 เล่ม Live (iAon Edu-Verse)
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                คลิกเข้าหน้าแต่ละเล่มเพื่อใช้งานเครื่องมือ Hybrid QR และดาวน์โหลดชุดทดลองฟรี (ครบ 5 เล่ม รวม 25 หน้า!)
              </p>
            </div>

            {/* Inline Audience Switcher Pill */}
            <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-1 shadow-xs text-xs font-bold">
              <button
                type="button"
                onClick={() => setAudience("home")}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
                  audience === "home"
                    ? "bg-rose-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>ราคาพ่อแม่ (Home)</span>
              </button>
              <button
                type="button"
                onClick={() => setAudience("class")}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
                  audience === "class"
                    ? "bg-sky-700 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <School className="w-3.5 h-3.5" />
                <span>ราคาคุณครู (Class)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCatalog.map((item) => {
              const isLive = item.status === "live";

              const cardStyle =
                item.accent === "amber"
                  ? "border-amber-200 bg-white hover:border-amber-400"
                  : item.accent === "rose"
                    ? "border-rose-200 bg-white hover:border-rose-400"
                    : item.accent === "pink"
                      ? "border-pink-200 bg-white hover:border-pink-400"
                      : item.accent === "teal"
                        ? "border-teal-200 bg-white hover:border-teal-400"
                        : "border-purple-200 bg-white hover:border-purple-400";

              const topTint =
                item.accent === "amber"
                  ? "bg-amber-50/70 border-amber-100"
                  : item.accent === "rose"
                    ? "bg-rose-50/70 border-rose-100"
                    : item.accent === "pink"
                      ? "bg-pink-50/70 border-pink-100"
                      : item.accent === "teal"
                        ? "bg-[#F0FDFA] border-teal-100"
                        : "bg-purple-50/70 border-purple-100";

              const ringAccent =
                item.accent === "amber"
                  ? "ring-amber-400"
                  : item.accent === "rose"
                    ? "ring-rose-400"
                    : item.accent === "pink"
                      ? "ring-pink-400"
                      : item.accent === "teal"
                        ? "ring-teal-500"
                        : "ring-purple-400";

              const ctaBg =
                item.accent === "rose"
                  ? "bg-rose-600 hover:bg-rose-700 text-white"
                  : item.accent === "pink"
                    ? "bg-pink-600 hover:bg-pink-700 text-white"
                    : item.accent === "teal"
                      ? "bg-teal-600 hover:bg-teal-700 text-white"
                      : item.accent === "fuchsia"
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-amber-400 hover:bg-amber-500 text-slate-950";

              const activePrice =
                audience === "home" ? item.priceHomeThb : item.priceClassThb;
              const altPrice =
                audience === "home" ? item.priceClassThb : item.priceHomeThb;

              return (
                <article
                  key={item.sku}
                  className={`rounded-3xl border-2 overflow-hidden flex flex-col justify-between shadow-md shadow-slate-900/5 transition-all ${cardStyle}`}
                >
                  <div>
                    {/* Top pastel header strip */}
                    <div
                      className={`px-5 py-3 border-b flex items-center justify-between gap-2 flex-wrap ${topTint}`}
                    >
                      <span className="rounded-full bg-white border border-slate-200 px-3 py-0.5 text-xs font-mono font-bold text-slate-800">
                        {item.sku}
                      </span>
                      <span
                        className={`rounded-full px-3 py-0.5 text-[11px] font-bold border ${
                          isLive
                            ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                            : "bg-purple-100 text-purple-900 border-purple-300"
                        }`}
                      >
                        {item.badgeTh}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        <div className="sm:col-span-5 rounded-2xl overflow-hidden border border-slate-200 bg-[#FEF9EF] aspect-square shadow-xs">
                          <img
                            src={item.coverImage}
                            alt={item.titleTh}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="sm:col-span-7 space-y-2.5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-12 h-12 rounded-full bg-[#FFFDF7] p-1 ring-2 ${ringAccent} shadow-sm overflow-hidden flex items-center justify-center shrink-0`}
                            >
                              <img
                                src={item.heroImage}
                                alt={item.characterNameEn}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-500">
                                {item.characterNameTh}
                              </div>
                              <div className="text-xs font-bold text-amber-800">
                                {item.ageRangeTh}
                              </div>
                            </div>
                          </div>

                          <h3 className="text-base sm:text-lg font-extrabold text-[#1E293B] leading-snug">
                            {item.titleTh}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {item.subtitleTh}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Action Footer */}
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-4 border-t border-slate-100 bg-[#FFFDF7]/70 space-y-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap text-xs sm:text-sm">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-slate-700">
                          {audience === "home" ? "🏠 Home" : "🏫 Class"}
                        </span>
                        <strong
                          className={`text-xl font-extrabold ${
                            audience === "home"
                              ? "text-rose-700"
                              : "text-sky-700"
                          }`}
                        >
                          {activePrice} ฿
                        </strong>
                        <span className="text-xs text-slate-500">
                          ({item.pages} หน้า • 4 PDF)
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {audience === "home"
                          ? `สิทธิ์ครู Class ${altPrice} ฿`
                          : `สิทธิ์บ้าน Home ${altPrice} ฿`}
                      </span>
                    </div>

                    {isLive ? (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link
                          href={`/edu/${item.slug}`}
                          className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold shadow-sm transition-colors ${ctaBg}`}
                        >
                          <span>เปิดหน้า Hybrid QR &amp; โหลดฟรี 5 หน้า</span>
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </Link>
                        {audience === "class" && (
                          <a
                            href={getEduOrderLineUrl({
                              sku: item.sku,
                              edition: "CLASS",
                              lang: "th",
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-sky-300 bg-sky-50 hover:bg-sky-100 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-sky-900 transition-colors"
                          >
                            <FaLine className="w-4 h-4 text-[#06C755]" />
                            <span>สั่ง Class</span>
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <a
                          href={getEduOrderLineUrl({
                            sku: item.sku,
                            edition:
                              audience === "class" ? "CLASS" : "ALL4_BUNDLE",
                            lang: "th",
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 border-purple-300 bg-purple-50 hover:bg-purple-100 px-4 py-2.5 text-sm font-bold text-purple-900 transition-colors"
                        >
                          <FaLine className="w-4 h-4 text-[#06C755] shrink-0" />
                          <span>
                            {audience === "class"
                              ? `จองสิทธิ์ Class Edition (${item.priceClassThb} ฿) ทาง LINE`
                              : "รับพร้อม All-4 Bundle ครบ 4 เล่ม (319 ฿)"}
                          </span>
                        </a>
                        <p className="text-[11px] text-center font-medium text-purple-800">
                          * ซื่อสัตย์ 100%: ไฟล์ PDF 32 หน้าเสร็จแล้ว • 6 แทร็กเสียงจริงอัปเดตฟรีบนเว็บเมื่อเปิดระบบ
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            BLOCK 5: HOW IT WORKS IN 3 EASY STEPS
        ============================================================ */}
        <section
          id="how-it-works"
          className="rounded-3xl border border-amber-200/90 bg-[#FEF9EF] p-6 sm:p-8 shadow-sm space-y-6"
        >
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-amber-300 px-3 py-1 text-xs font-bold text-amber-900">
              <span>HOW IT WORKS • มือใหม่ไม่เคยปริ้นท์ก็ทำได้ใน 5 นาที</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
              ใช้งานง่ายๆ ใน 3 ขั้นตอน
            </h2>
            <p className="text-sm text-slate-600">
              จ่ายครั้งเดียวเก็บไฟล์ใช้ได้ตลอดชีพ ปริ้นท์ซ้ำให้น้องคนเล็กหรือทำบอร์ดติดตู้เย็นได้ไม่จำกัด
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="rounded-2xl border border-amber-200/80 bg-white p-5 sm:p-6 space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${step.colorBg}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-2xl font-extrabold text-amber-300">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#1E293B]">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            BLOCK 6: HONEST LAUNCH BUNDLES + LINE OA COMMUNITY STRIP
        ============================================================ */}
        <section
          id="mega-bundle"
          className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-[#FEF9EF] via-white to-[#FFF5F5] p-6 sm:p-8 shadow-lg shadow-amber-900/5 space-y-6 scroll-mt-24"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-950">
                <Gift className="w-3.5 h-3.5 text-amber-700" />
                <span>LAUNCH PROMOTION • คุ้มที่สุดสำหรับบ้านที่มีลูกวัย 3–6 ปี</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
                เลือกแพ็กเกจเหมาสุดคุ้ม สั่งซื้อและรับไฟล์ทาง LINE OA ทันที
              </h2>
              <p className="text-sm text-slate-600">
                โปร่งใส 100%: โอนพร้อมเพย์รับลิงก์ดาวน์โหลดไฟล์ PDF ความละเอียดสูงทันที ครบทั้งภาษาไทย-อังกฤษ และสี-ขาวดำประหยัดหมึก
              </p>
            </div>

            {/* Mini 4-book visual stack */}
            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              {EDU_CATALOG.map((item) => (
                <div
                  key={item.sku}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-amber-200 shadow-sm bg-white"
                >
                  <img
                    src={item.coverImage}
                    alt={item.sku}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Option 1: 3-Book Live Trio Pack (249 THB — 100% Live Today!) */}
            <div className="rounded-2xl border-2 border-emerald-400 bg-white p-5 sm:p-6 flex flex-col justify-between gap-5 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-extrabold text-white">
                    <Zap className="w-3.5 h-3.5" />
                    <span>แนะนำ • เว็บ QR พร้อมใช้ 100% วันนี้!</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
                    96 หน้า • 12 PDF
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#1E293B]">
                    แพ็ก 3 เล่มพร้อมใช้ทันที (EF01 + RT01 + BB01)
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2.5 flex-wrap">
                    <span className="text-4xl font-extrabold text-emerald-700">
                      249 ฿
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      297 ฿
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      (ประหยัด 48 ฿ • เฉลี่ยเล่มละ 83 ฿)
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 text-sm text-slate-700">
                  {[
                    "EDU-EF01 น้องแซลมอน EF 32 หน้า + เว็บ Focus Timer ใช้ได้ทันที",
                    "EDU-RT01 แม่ใหญ่สร้างวินัย 30 วัน 32 หน้า + Routine Timer ใช้ได้ทันที",
                    "EDU-BB01 น้องชาบู Busy Book 45 การ์ด + บอร์ดแปรงฟัน + Brush Timer ใช้ได้ทันที",
                    "ครบ 12 ไฟล์ PDF (TH/EN × สี/ขาวดำ) ไม่มีเล่มรออัปเดต พร้อมลุยวันนี้เลย!",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={getEduOrderLineUrl({
                  sku: "EDU-EF01",
                  edition: "TRIO_LIVE",
                  lang: "th",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] px-5 py-3.5 text-base font-bold text-white shadow-md shadow-emerald-500/20 transition-colors"
              >
                <FaLine className="w-5 h-5 shrink-0" />
                <span>สั่งซื้อแพ็ก 3 เล่มพร้อมใช้ (249 ฿) ทาง LINE</span>
              </a>
            </div>

            {/* Option 2: All-5 Universe Bundle (399 THB — Save 126 THB!) */}
            <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 sm:p-6 flex flex-col justify-between gap-5 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold text-slate-950">
                    🔥 เหมาครบจักรวาล 5 เล่ม Live (ประหยัด 126 ฿)
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">
                    160 หน้า • 20 PDF
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#1E293B]">
                    All-5 Universe Bundle (EF01 + RT01 + BB01 + MU01 + VL01)
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2.5 flex-wrap">
                    <span className="text-4xl font-extrabold text-amber-700">
                      399 ฿
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      525 ฿
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      (เฉลี่ยเพียงเล่มละ 79.8 ฿!)
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 text-sm text-slate-700">
                  {[
                    "ได้ครบทั้ง 5 เล่ม Live เต็มระบบ (EF01 + RT01 + BB01 + MU01 + VL01 = 160 หน้า)",
                    "รวมเล่มใหม่ EDU-VL01 น้องบ๊อบ Phonics A–Z + 27 แฟลชการ์ด + กระดานเสียง A–Z!",
                    "ครบทั้ง 5/5 เว็บแอป Hybrid QR ไร้โฆษณา (Focus, Routine, Brush, Music Studio, Phonics)",
                    "ครบ 20 ไฟล์ PDF (TH/EN × สี/ขาวดำ) ปริ้นท์ซ้ำได้ตลอดชีพในครอบครัว",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={getEduOrderLineUrl({
                  sku: "EDU-VL01",
                  edition: "ALL5_BUNDLE",
                  lang: "th",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 hover:bg-amber-500 px-5 py-3.5 text-base font-bold text-slate-950 shadow-sm transition-colors"
              >
                <FaLine className="w-5 h-5 text-[#047857] shrink-0" />
                <span>สั่งซื้อ All-5 Bundle ครบ 5 เล่ม (399 ฿) ทาง LINE</span>
              </a>
            </div>
          </div>

          {/* Value-First LINE OA Lead Strip */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-emerald-950">
                  ยังไม่แน่ใจว่าเหมาะกับวัยลูกไหม? แอด LINE OA ปรึกษาครูอ้น + รับใบงานฟรีรายเดือนได้เลย!
                </div>
                <p className="text-xs text-emerald-900/80 mt-0.5">
                  สอบถามวิธีเคลือบตีนตุ๊กแก หรือขอใบเสร็จสิทธิ์โรงเรียน (Class Edition) ได้โดยตรงครับ
                </p>
              </div>
            </div>
            <a
              href={getEduOrderLineUrl({
                sku: "EDU-EF01",
                edition: "HOME",
                lang: "th",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-emerald-100 border border-emerald-300 px-4 py-2.5 text-xs sm:text-sm font-bold text-emerald-900 transition-colors"
            >
              <FaLine className="w-4 h-4 text-[#06C755]" />
              <span>ทักแชท LINE ครูอ้น</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

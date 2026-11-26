"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Gift,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  Download,
  Layers,
  Award,
} from "lucide-react";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { getLineOrderUrl } from "@/lib/line";

const PILLARS = [
  {
    id: "tech",
    number: "01",
    logo: "/brand/svg/aiaon-tech_lockup_horizontal_fullcolor-on-light.svg",
    logoAlt: "AiAon Tech",
    audience: "สำหรับครู โรงเรียน & องค์กร",
    title: "ระบบอัตโนมัติโรงเรียน & AI ติวเตอร์",
    desc: "รวม 20+ ระบบ Google Apps Script ใช้งานจริงในโรงเรียนใหญ่ (แจ้งซ่อม QR, สุขาภิบาล, เช็กชื่อ, ห้องเรียนสีขาว) พร้อม KruRank AI และรับพัฒนาเว็บแอป",
    image: "/brand/visuals/hero_aiaon_tech.webp",
    accentBorder: "hover:border-[#2563EB]/50",
    pillBg: "bg-blue-50 text-[#1D4ED8] border-blue-200",
    ctaBg: "bg-[#1D4ED8] hover:bg-[#1E40AF] text-white",
    href: "/digital-vault",
    ctaText: "เข้าคลังระบบ AiAon Tech",
    quickLinks: [
      { label: "Digital Vault (20+ ระบบ)", href: "/digital-vault" },
      { label: "แพ็กเหมา Bundles", href: "/bundles" },
      { label: "รับทำระบบตามสั่ง", href: "/services" },
    ],
  },
  {
    id: "edu",
    number: "02",
    logo: "/brand/svg/aiaon-edu_lockup_horizontal_fullcolor-on-light.svg",
    logoAlt: "AiAon Edu-Verse by AiAon Tech",
    audience: "สำหรับพ่อแม่ & ครูอนุบาล (วัย 3–6 ปี)",
    title: "สื่อกิจกรรมเด็กเล็กไร้จอ + Hybrid QR",
    desc: "6 เล่ม 192 หน้า โดยแก๊ง 6 แมว (ฝึกสมอง EF, ตารางวินัย 30 วัน, Busy Book แปรงฟัน, ดนตรีเสียงจริง, Phonics, ศิลปะ SEL) โหลดทดลองฟรี 30 หน้า",
    image: "/brand/visuals/hero_aiaon_edu.webp",
    accentBorder: "hover:border-[#F59E0B]/60",
    pillBg: "bg-amber-50 text-[#92400E] border-amber-200",
    ctaBg: "bg-[#92400E] hover:bg-[#78350F] text-white",
    href: "/edu",
    ctaText: "เข้าจักรวาล AiAon Edu-Verse",
    quickLinks: [
      { label: "ครบ 6 เล่ม (ฟรี 30 หน้า)", href: "/edu" },
      { label: "คลัง E-Book ครูไทย", href: "/ebooks" },
      { label: "ติวสอบครูผู้ช่วย", href: "/teacher-prep" },
    ],
  },
  {
    id: "audio",
    number: "03",
    logo: "/brand/svg/aiaon-audio_lockup_horizontal_fullcolor-on-light.svg",
    logoAlt: "AiAon Audio by AiAon Tech",
    audience: "สำหรับผู้สอบครู นักดนตรี & ครีเอเตอร์",
    title: "เพลงช่วยจำสอบครู & BGM ปลอดลิขสิทธิ์",
    desc: "เพลงช่วยจำกฎหมายการศึกษา, ดนตรีประกอบคลิป ว.PA ปลอดลิขสิทธิ์ 100%, Backing Track วงดนตรี และเทมเพลตสตูดิโอ Cubase ระดับมืออาชีพ",
    image: "/brand/visuals/hero_aiaon_audio.webp",
    accentBorder: "hover:border-[#EA580C]/50",
    pillBg: "bg-orange-50 text-[#C2410C] border-orange-200",
    ctaBg: "bg-[#0F766E] hover:bg-[#115E59] text-white",
    href: "/music-store",
    ctaText: "เปิดร้าน AiAon Audio",
    quickLinks: [
      { label: "ร้านเพลง & BGM ว.PA", href: "/music-store" },
      { label: "เทมเพลตทำเพลง", href: "/music-templates" },
      { label: "Band Grooving", href: "/band-grooving" },
    ],
  },
  {
    id: "studio",
    number: "04",
    logo: "/brand/svg/aiaon-studio_lockup_horizontal_fullcolor-on-light.svg",
    logoAlt: "AiAon Studio by AiAon Tech",
    audience: "สำหรับร้านค้า องค์กร ครู & บุคคลทั่วไป",
    title: "รับทำสติกเกอร์ LINE 3D & คาแรกเตอร์ส่วนตัว",
    desc: "ปั้นสติกเกอร์ 3D จากรูปถ่ายจริง ดูแลครบวงจรจนอนุมัติขึ้น LINE STORE พร้อมพอร์ตผลงานจริงกว่า 30+ ชุด On Sale และไฟล์ PNG พื้นใสแต่งปกร้าน",
    image: "/brand/visuals/hero_aiaon_studio.webp",
    accentBorder: "hover:border-[#7C3AED]/50",
    pillBg: "bg-purple-50 text-[#6D28D9] border-purple-200",
    ctaBg: "bg-[#6D28D9] hover:bg-[#5B21B6] text-white",
    href: "/line-stickers",
    ctaText: "เข้าสตูดิโอ AiAon Studio",
    quickLinks: [
      { label: "สั่งทำสติกเกอร์ LINE 3D", href: "/line-stickers" },
      { label: "พอร์ตนักเรียน TCAS", href: "/student-vault" },
      { label: "สินค้าที่ระลึก", href: "/merch" },
    ],
  },
];

const FEATURED_FLAGSHIPS = [
  {
    tag: "BEST SELLER • 6 เล่มครบชุด",
    tagColor: "bg-amber-100 text-amber-900",
    title: "AiAon Edu-Verse All-6 Bundle",
    subtitle: "สื่อกิจกรรมไร้จอ 192 หน้า + เว็บแอป QR จับเวลา & เสียงจริง",
    price: "449 ฿",
    oldPrice: "714 ฿",
    image: "/edu/bb01/mockup-01-cover.webp",
    href: "/edu",
    cta: "ดูทั้ง 6 เล่ม & โหลดฟรี 30 หน้า",
  },
  {
    tag: "POPULAR SERVICE • 30+ ON SALE",
    tagColor: "bg-purple-100 text-purple-900",
    title: "รับทำสติกเกอร์ LINE 3D จากรูปจริง",
    subtitle: "เลือกโพยคำพูดฮิตบนเว็บ ส่งรูปเดียวจบ ดูแลจนขึ้น LINE STORE",
    price: "เริ่ม 990 ฿",
    oldPrice: "1,590 ฿",
    image: "/edu/ef01/mockup-01-cover.webp",
    href: "/line-stickers",
    cta: "ดูตัวอย่าง & เลือกแพ็กเกจ",
  },
  {
    tag: "TEACHER FAVORITE • จ่ายครั้งเดียว",
    tagColor: "bg-blue-100 text-blue-900",
    title: "Digital Vault คลัง 20+ ระบบโรงเรียน",
    subtitle: "แจ้งซ่อม QR Telegram, สุขาภิบาล, เช็กชื่อ, ห้องเรียนสีขาว 37 หน้า",
    price: "เริ่ม 390 ฿",
    oldPrice: "990 ฿",
    image: "/images/mockups/aona10_hygiene_matrix_mockup.jpg",
    href: "/digital-vault",
    cta: "เลือกชมระบบทั้งหมด",
  },
];

export function HomeView() {
  const { openLineModal } = useLineModal();

  const handleLineClick = (e: React.MouseEvent) => {
    const msg =
      "สวัสดีครับครูอ้น สนใจสอบถามข้อมูลสินค้า/บริการจากเว็บไซต์ www.aiaon.tech ครับ 🙏";
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: "ติดต่อปรึกษาและสั่งซื้อกับครูอ้น (AiAon Tech)",
        message: msg,
      });
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC] text-[#1E293B] font-prompt overflow-x-hidden">
      {/* =================================================================
          BLOCK 1: CINEMATIC EDITORIAL HERO (ABOVE THE FOLD)
      ================================================================= */}
      <section className="relative pt-8 pb-16 sm:pt-12 sm:pb-24 border-b border-[#E2E8F0]">
        {/* Subtle Warm Studio Paper Ambient */}
        <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-blue-500/[0.04] blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-amber-500/[0.06] blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Editorial Copy & Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-2xs text-xs font-semibold text-[#475569]">
                <span className="w-2 h-2 rounded-full bg-[#06C755]" />
                <span>Creative Tech Studio • โดย ครูอ้น (Teacher · Musician · Maker)</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] font-extrabold text-[#0F172A] leading-[1.14] tracking-tight">
                เทคโนโลยีที่ทำงานแทนคุณ{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2563EB] via-[#0EA5E9] to-[#0D9488]">
                  เพื่อให้คุณมีเวลาใช้ชีวิตมากขึ้น
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl">
                <strong className="text-[#0F172A] font-semibold">
                  Intelligent Technology. More Human Life.
                </strong>{" "}
                — ศูนย์รวมระบบอัตโนมัติโรงเรียน สื่อการสอนเด็กเล็ก Hybrid QR เพลงเพื่อการศึกษา และสตูดิโอสติกเกอร์ LINE 3D ที่ออกแบบจากหน้างานจริง
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <a
                  href="#pillars"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Layers className="w-4 h-4" />
                  <span>สำรวจ 4 โลกผลงาน</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href="/freebies"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#FEF3C7] hover:bg-amber-200/80 text-[#78350F] border border-amber-300/70 font-bold text-sm sm:text-base transition-all"
                >
                  <Gift className="w-4 h-4" />
                  <span>รับของแจกฟรี 0 ฿</span>
                </Link>
              </div>

              {/* Real Verified Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E2E8F0]">
                {[
                  { value: "20+", label: "ระบบโรงเรียน GAS" },
                  { value: "6 เล่ม", label: "สื่อเด็กเล็ก 192 หน้า" },
                  { value: "30+", label: "LINE Store On Sale" },
                  { value: "4,000+", label: "นร.ใช้งานจริง" },
                ].map((stat) => (
                  <div key={stat.label} className="min-w-0">
                    <div className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#475569] mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Magazine Visual Collage (Real Flagship Assets) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="lg:col-span-6"
            >
              <div className="grid grid-cols-12 gap-3.5 sm:gap-4">
                {/* Top Full Visual: 6 Cats Pixar Ensemble */}
                <Link
                  href="/edu"
                  className="col-span-12 group relative rounded-3xl overflow-hidden bg-white border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-all aspect-[16/9]"
                >
                  <Image
                    src="/edu/hero-banner-6cats.webp"
                    alt="AiAon Edu-Verse 6 Cats Pixar Ensemble"
                    fill
                    priority
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#0F172A]/80 via-[#0F172A]/30 to-transparent p-4 sm:p-5 flex items-end justify-between gap-3">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400 text-[#0F172A] text-[10px] font-extrabold uppercase tracking-wider mb-1">
                        AiAon Edu-Verse • 6/6 Live
                      </span>
                      <p className="text-white font-bold text-sm sm:text-base leading-snug">
                        สื่อกิจกรรมเด็กเล็ก 3–6 ปี + QR จับเวลา (แจกฟรี 30 หน้า)
                      </p>
                    </div>
                    <span className="shrink-0 w-9 h-9 rounded-full bg-white text-[#0F172A] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>

                {/* Bottom Left: School System Mockup */}
                <Link
                  href="/digital-vault"
                  className="col-span-6 group relative rounded-3xl overflow-hidden bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all aspect-[4/3]"
                >
                  <Image
                    src="/brand/visuals/hero_aiaon_tech.webp"
                    alt="AiAon Tech School Automation"
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 300px"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#0F172A]/85 via-[#0F172A]/35 to-transparent p-3.5">
                    <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider block">
                      AiAon Tech
                    </span>
                    <span className="text-white text-xs sm:text-sm font-bold line-clamp-1">
                      20+ ระบบโรงเรียน GAS
                    </span>
                  </div>
                </Link>

                {/* Bottom Right: Studio / Audio Showcase */}
                <Link
                  href="/line-stickers"
                  className="col-span-6 group relative rounded-3xl overflow-hidden bg-[#FAF5FF] border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all aspect-[4/3]"
                >
                  <Image
                    src="/brand/visuals/hero_aiaon_studio.webp"
                    alt="AiAon Studio 3D LINE Stickers"
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 300px"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#0F172A]/80 via-[#0F172A]/25 to-transparent p-3.5">
                    <span className="text-[10px] font-bold text-purple-200 uppercase tracking-wider block">
                      AiAon Studio
                    </span>
                    <span className="text-white text-xs sm:text-sm font-bold line-clamp-1">
                      สติกเกอร์ LINE 3D &amp; อิโมจิ
                    </span>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =================================================================
          BLOCK 2: 4-PILLAR GRAND GATEWAYS (OFFICIAL SVG LOCKUPS)
      ================================================================= */}
      <section id="pillars" className="py-16 sm:py-24 scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#2563EB]">
                4-PILLAR ECOSYSTEM
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                เลือกโลกที่คุณกำลังมองหา
              </h2>
              <p className="text-sm sm:text-base text-[#475569]">
                ทุกผลงานจัดหมวดหมู่ชัดเจนใน 4 เสาหลัก เพื่อให้คุณเข้าถึงโซลูชันที่ตรงจุดที่สุดในคลิกเดียว
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors shrink-0"
            >
              <span>ดูภาพรวมจักรวาล AiAon ทั้งหมด</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((p) => (
              <article
                key={p.id}
                className={`group rounded-3xl bg-white border border-[#E2E8F0] ${p.accentBorder} shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col`}
              >
                {/* Top Visual Preview */}
                <Link
                  href={p.href}
                  className="relative aspect-[16/9] w-full bg-[#F8FAFC] overflow-hidden border-b border-[#E2E8F0] block"
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs border border-[#E2E8F0] text-xs font-mono font-bold text-[#0F172A] shadow-2xs">
                    {p.number}
                  </span>
                </Link>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-5">
                  <div className="space-y-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <img
                        src={p.logo}
                        alt={p.logoAlt}
                        className="h-8 sm:h-9 w-auto"
                      />
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${p.pillBg}`}
                      >
                        {p.audience}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] leading-snug">
                      {p.title}
                    </h3>

                    <p className="text-sm text-[#475569] leading-relaxed">
                      {p.desc}
                    </p>

                    {/* Quick Sub-Links */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {p.quickLinks.map((ql) => (
                        <Link
                          key={ql.href}
                          href={ql.href}
                          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#F8FAFC] hover:bg-slate-100 border border-[#E2E8F0] text-[#1E293B] transition-colors"
                        >
                          {ql.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={p.href}
                    className={`w-full py-3.5 px-5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${p.ctaBg}`}
                  >
                    <span>{p.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          BLOCK 3: FEATURED FLAGSHIPS (3 ตัวท็อปขายดี)
      ================================================================= */}
      <section className="py-16 sm:py-20 bg-[#FFFFFF] border-y border-[#E2E8F0]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#92400E]">
              FEATURED FLAGSHIPS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              3 ผลงานยอดนิยมที่คนเลือกใช้มากที่สุด
            </h2>
            <p className="text-sm sm:text-base text-[#475569]">
              คัดเฉพาะตัวท็อปที่แก้ปัญหาได้ทันที จ่ายครั้งเดียว ไม่มีค่ารายเดือน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_FLAGSHIPS.map((item) => (
              <div
                key={item.title}
                className="group rounded-3xl bg-white border border-[#E2E8F0] hover:border-slate-300 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                <Link
                  href={item.href}
                  className="relative aspect-[16/10] bg-[#F8FAFC] overflow-hidden border-b border-[#E2E8F0] block"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </Link>
                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2.5">
                    <span
                      className={`inline-block text-[11px] font-extrabold px-2.5 py-1 rounded-full ${item.tagColor}`}
                    >
                      {item.tag}
                    </span>
                    <h3 className="text-lg font-extrabold text-[#0F172A] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-[#0F172A]">
                        {item.price}
                      </span>
                      <span className="text-sm text-[#64748B] line-through">
                        {item.oldPrice}
                      </span>
                    </div>
                    <Link
                      href={item.href}
                      className="w-full py-3 px-4 rounded-xl bg-[#F8FAFC] hover:bg-[#0F172A] text-[#0F172A] hover:text-white border border-[#E2E8F0] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>{item.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          BLOCK 4: 0-BAHT FREEBIES MAGNET STRIP
      ================================================================= */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-[#FEF9EF] border border-amber-200 p-7 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-2xs">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>TRY BEFORE YOU BUY • 0 BAHT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                ยังไม่แน่ใจ? ลองโหลดของจริงไปใช้ฟรีก่อนได้เลย 0 ฿
              </h2>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                ครูอ้นเตรียมชุดทดลองใช้งานจริงให้ฟรีไม่มีเงื่อนไข ทั้ง{" "}
                <strong className="text-[#0F172A]">ใบงานเด็กเล็ก 30 หน้า (ครบ 6 เล่ม)</strong>,{" "}
                <strong className="text-[#0F172A]">ระบบครู Google Apps Script แจกฟรี</strong> และ{" "}
                <strong className="text-[#0F172A]">แทร็กเพลง BGM ปลอดลิขสิทธิ์</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
              <Link
                href="/freebies"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                <span>เปิดคลังของแจกฟรี</span>
              </Link>
              <Link
                href="/edu"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-amber-50 text-[#0F172A] border border-amber-300 font-bold text-sm transition-all"
              >
                <span>โหลดใบงานเด็กฟรี 30 หน้า</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          BLOCK 5: FOUNDER EDITORIAL STORY (MAGAZINE STYLE)
      ================================================================= */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-white border border-[#E2E8F0] p-7 sm:p-10 lg:p-12 shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Founder Portrait */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-4 border-[#F8FAFC] shadow-lg bg-[#F8FAFC]">
                <Image
                  src="/images/kru_aon_profile.png"
                  alt="ครูจิรวัฒน์ เดชเส้ง (ครูอ้น)"
                  fill
                  className="object-cover object-top"
                  sizes="256px"
                />
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#475569]">
                <Award className="w-4 h-4 text-[#2563EB]" />
                <span>Google AI &amp; Canva AI Certified</span>
              </div>
            </div>

            {/* Editorial Story */}
            <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#0F172A]">
                <span>FOUNDER • TEACHER · MUSICIAN · MAKER</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] leading-tight">
                ครูจิรวัฒน์ เดชเส้ง (ครูอ้น)
              </h2>

              <blockquote className="text-base sm:text-lg font-semibold text-[#1D4ED8] bg-blue-50/70 border-l-4 border-[#2563EB] px-5 py-3.5 rounded-r-2xl text-left">
                “ผมเชื่อในปรัชญา ‘คนขี้เกียจที่สร้างสรรค์ (Creative Laziness)’ — งานอะไรที่ต้องทำซ้ำๆ ให้ AI และโค้ดทำแทน เพื่อให้เราเหลือเวลาไปสอนเด็ก เล่นดนตรี และอยู่กับครอบครัว”
              </blockquote>

              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                ครูชำนาญการ (ค.ศ.2) วิชาดนตรีสากล โรงเรียนหาดใหญ่วิทยาลัย (ญ.ว.) และผู้ก่อตั้ง{" "}
                <strong className="text-[#0F172A]">AiAon Tech</strong> ทุกชิ้นงานบนเว็บนี้ไม่ได้เกิดจากการนั่งเทียน แต่ผ่านการใช้งานจริงกับนักเรียนกว่า 4,000 คน ครู 200+ ท่าน และลูกค้าทั่วประเทศ
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-[#1E293B] font-medium pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ครูอ้นตอบแชตและซัปพอร์ตเองทุกเคส
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ส่งมอบไฟล์ไว ใช้งานได้ตลอดชีพ
                </span>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0F172A] hover:text-[#2563EB] underline underline-offset-4 transition-colors"
                >
                  <span>อ่านเรื่องราวและผลงานของครูอ้นเพิ่มเติม</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          BLOCK 6: CLEAN FINAL CTA (LINE OA & CUSTOM SERVICES)
      ================================================================= */}
      <section className="pb-12 sm:pb-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-white border border-[#E2E8F0] p-8 sm:p-14 text-center space-y-6 shadow-sm">
            <div className="flex justify-center">
              <img
                src="/brand/svg/aiaon-tech_lockup_tagline_fullcolor-on-light.svg"
                alt="AiAon Tech — Intelligent Technology. More Human Life."
                className="h-12 sm:h-14 w-auto"
              />
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] max-w-2xl mx-auto leading-tight">
              พร้อมลดภาระงานและเริ่มใช้งานระบบจริงวันนี้แล้วหรือยัง?
            </h2>

            <p className="text-sm sm:text-base text-[#475569] max-w-xl mx-auto">
              ทักคุยปรึกษา สั่งซื้อสินค้า หรือสอบถามงานพัฒนาเว็บแอปเฉพาะองค์กรได้โดยตรงทาง LINE Official Account{" "}
              <span className="font-mono font-bold text-[#0F172A]">@deu6776s</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={getLineOrderUrl(
                  "สวัสดีครับครูอ้น สนใจสอบถามข้อมูลสินค้า/บริการจากเว็บไซต์ www.aiaon.tech ครับ 🙏"
                )}
                onClick={handleLineClick}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-extrabold text-sm sm:text-base shadow-sm transition-all hover:scale-[1.01]"
              >
                <MessageSquare className="w-5 h-5" />
                <span>ทักแชต LINE OA ครูอ้น (@deu6776s)</span>
              </a>

              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-[#F8FAFC] hover:bg-slate-100 text-[#0F172A] border border-[#E2E8F0] font-bold text-sm sm:text-base transition-all"
              >
                <span>ประเมินราคาสั่งทำระบบเฉพาะทาง</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

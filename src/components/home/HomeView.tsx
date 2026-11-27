"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  Download,
  Award,
} from "lucide-react";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { getLineOrderUrl } from "@/lib/line";
import { useSiteLang } from "@/components/providers/LanguageProvider";
import {
  ScrollProgressBar,
  SpotlightTiltCard,
  LiveShowcaseMarquee,
  LiveTryItPlayground,
} from "@/components/home/HomeInteractiveWidgets";
import {
  GuidedConciergeBar,
  BeforeAfterComparisonSlider,
  FloatingAmbientPlayer,
} from "@/components/home/HomeFuturisticAddons";
import { HomeBrandHeroSlider } from "@/components/home/HomeBrandHeroSlider";

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
    glowColor: "rgba(37, 99, 235, 0.13)",
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
    audience: "สำหรับพ่อแม่ & ครูอนุบาล (วัย 3–7 ปี)",
    title: "สื่อกิจกรรมเด็กเล็กไร้จอ + นิทาน & ระบายสี Hybrid QR",
    desc: "ครบ 15 เล่ม Live โดยแก๊ง 6 แมว: ใบงาน Level 1–2 (ป.1) 7 เล่ม + นิทานสีน้ำ 6 เล่ม + สมุดระบายสี 40 หน้า + แฟลชการ์ด 48 ใบ โหลดทดลองฟรีรวม 75 หน้า!",
    image: "/brand/visuals/hero_aiaon_edu.webp",
    accentBorder: "hover:border-[#F59E0B]/60",
    glowColor: "rgba(245, 158, 11, 0.15)",
    pillBg: "bg-amber-50 text-[#92400E] border-amber-200",
    ctaBg: "bg-[#92400E] hover:bg-[#78350F] text-white",
    href: "/edu",
    ctaText: "เข้าจักรวาล AiAon Edu-Verse (15 เล่ม)",
    quickLinks: [
      { label: "ครบ 15 เล่ม (ฟรี 75 หน้า)", href: "/edu" },
      { label: "สมุดระบายสี 40 หน้า (49฿)", href: "/edu/cb01" },
      { label: "แฟลชการ์ดเสียง 48 ใบ (59฿)", href: "/edu/fc01" },
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
    glowColor: "rgba(15, 118, 110, 0.13)",
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
    glowColor: "rgba(124, 58, 237, 0.13)",
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
    tag: "BEST SELLER • 15 เล่ม Live!",
    tagColor: "bg-amber-100 text-amber-900 border border-amber-300",
    cardAccent: "border-amber-200 hover:border-amber-400",
    ctaAccent: "bg-amber-400 hover:bg-amber-500 text-slate-950",
    title: "AiAon Edu-Verse (เริ่ม 49฿ • แพ็กเหมา 449฿)",
    subtitle: "ใบงาน 7 เล่ม + นิทานภาพ 6 เล่ม + สมุดระบายสี 40 หน้า + แฟลชการ์ด 48 ใบ + เว็บ QR ฟรี!",
    price: "เริ่ม 49 ฿",
    oldPrice: "All-6 449 ฿",
    image: "/edu/cb01/mockup-01-cover.webp",
    href: "/edu",
    cta: "ดูครบ 15 เล่ม & โหลดฟรี 75 หน้า",
  },
  {
    tag: "POPULAR SERVICE • 30+ ON SALE",
    tagColor: "bg-purple-100 text-purple-900 border border-purple-200",
    cardAccent: "border-purple-200 hover:border-purple-400",
    ctaAccent: "bg-purple-600 hover:bg-purple-700 text-white",
    title: "รับทำสติกเกอร์ LINE 3D จากรูปจริง",
    subtitle: "เลือกโพยคำพูดฮิตบนเว็บ ส่งรูปเดียวจบ ดูแลจนขึ้น LINE STORE",
    price: "เริ่ม 990 ฿",
    oldPrice: "1,590 ฿",
    image: "/brand/visuals/hero_aiaon_studio.webp",
    href: "/line-stickers",
    cta: "ดูตัวอย่าง & เลือกแพ็กเกจ",
  },
  {
    tag: "TEACHER FAVORITE • จ่ายครั้งเดียว",
    tagColor: "bg-blue-100 text-blue-900 border border-blue-200",
    cardAccent: "border-blue-200 hover:border-blue-400",
    ctaAccent: "bg-[#1D4ED8] hover:bg-[#1E40AF] text-white",
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
  const { t } = useSiteLang();

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
      {/* Top Scroll Progress Line */}
      <ScrollProgressBar />

      {/* =================================================================
          BLOCK 1: 4-SUB-BRAND CINEMA HERO SLIDER (OFFICIAL BRAND KIT V2.0)
      ================================================================= */}
      <HomeBrandHeroSlider />

      {/* =================================================================
          NEW BLOCK 1.5: INFINITE 15-BOOK LIVE SHOWCASE MARQUEE
      ================================================================= */}
      <LiveShowcaseMarquee />

      {/* =================================================================
          NEW BLOCK 1.6: SMART CONCIERGE BAR ("คุณคือใคร?")
      ================================================================= */}
      <GuidedConciergeBar />

      {/* =================================================================
          NEW BLOCK 1.7: BEFORE / AFTER INTERACTIVE COMPARISON SLIDER
      ================================================================= */}
      <BeforeAfterComparisonSlider />

      {/* =================================================================
          NEW BLOCK 1.8: LIVE "TRY-IT-NOW" 3-IN-1 INTERACTIVE PLAYGROUND
      ================================================================= */}
      <LiveTryItPlayground />

      {/* =================================================================
          BLOCK 2: 4-PILLAR GRAND GATEWAYS (3D TILT + CURSOR SPOTLIGHT)
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
            {PILLARS.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
              >
                <SpotlightTiltCard glowColor={p.glowColor} className="h-full">
                  <article
                    className={`h-full group rounded-3xl bg-white border border-[#E2E8F0] ${p.accentBorder} shadow-2xs hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col`}
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
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-5 relative z-20">
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
                </SpotlightTiltCard>
              </motion.div>
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
            {FEATURED_FLAGSHIPS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`group rounded-3xl bg-white border-2 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col ${item.cardAccent}`}
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
                      className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-2xs ${item.ctaAccent}`}
                    >
                      <span>{item.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
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
                <strong className="text-[#0F172A]">สื่อเด็กเล็ก &amp; นิทานฟรี 75 หน้า (ครบ 15 เล่ม)</strong>,{" "}
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
                <span>โหลดสื่อเด็กฟรี 75 หน้า</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          BLOCK 5: FOUNDER EDITORIAL STORY (KINFOLK / MAGAZINE GRADE)
      ================================================================= */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl border-2 border-amber-200/80 bg-linear-to-br from-[#FFFDF9] via-white to-[#EFF6FF]/75 shadow-lg shadow-slate-900/5 overflow-hidden"
          >
            {/* Top Editorial Accent Ribbon */}
            <div className="h-1.5 w-full bg-linear-to-r from-[#2563EB] via-[#F59E0B] to-[#0D9488]" />

            <div className="p-7 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left: Warm Studio Founder Portrait + Badges */}
              <div className="lg:col-span-4 flex flex-col items-center">
                <div className="relative">
                  {/* Soft ambient glow behind portrait */}
                  <div className="absolute -inset-3 rounded-[2rem] bg-linear-to-tr from-blue-200/40 via-amber-200/40 to-teal-200/40 blur-xl pointer-events-none" />
                  <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl bg-[#F0ECE4] ring-1 ring-amber-200/80">
                    <Image
                      src="/images/kru_aon_profile.png"
                      alt="ครูจิรวัฒน์ เดชเส้ง (ครูอ้น)"
                      fill
                      className="object-cover object-top"
                      sizes="288px"
                    />
                  </div>
                  {/* Floating Verified Educator Pill */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap inline-flex items-center gap-1.5 rounded-full bg-[#0F172A] text-white px-4 py-1.5 text-xs font-extrabold shadow-lg border-2 border-white">
                    <span className="w-2 h-2 rounded-full bg-[#06C755]" />
                    <span>{t("ครู ค.ศ.2 • รร.หาดใหญ่วิทยาลัย", "Music Educator • Thailand")}</span>
                  </div>
                </div>

                {/* 3 Colorful Role Pills */}
                <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
                  <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-[11px] font-extrabold text-blue-800">
                    🎓 Teacher
                  </span>
                  <span className="rounded-full bg-orange-50 border border-orange-200 px-3 py-1 text-[11px] font-extrabold text-orange-800">
                    🎸 Musician
                  </span>
                  <span className="rounded-full bg-amber-50 border border-amber-300 px-3 py-1 text-[11px] font-extrabold text-amber-900">
                    ⚡ Maker
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#475569]">
                  <Award className="w-4 h-4 text-[#2563EB]" />
                  <span>Google AI &amp; Canva AI Certified</span>
                </div>
              </div>

              {/* Right: Editorial Story */}
              <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-extrabold text-amber-900">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>FOUNDER &amp; CREATOR • AIAON TECH</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] leading-tight">
                  {t("ครูจิรวัฒน์ เดชเส้ง (ครูอ้น)", "Jirawat Dechseng (Teacher Aon)")}
                </h2>

                <blockquote className="text-base sm:text-lg font-semibold text-[#1E3A8A] bg-linear-to-r from-blue-50 via-[#EFF6FF]/80 to-white border-l-4 border-[#2563EB] px-5 py-4 rounded-r-2xl text-left shadow-2xs">
                  {t(
                    "“ผมเชื่อในปรัชญา ‘คนขี้เกียจที่สร้างสรรค์ (Creative Laziness)’ — งานอะไรที่ต้องทำซ้ำๆ ให้ AI และโค้ดทำแทน เพื่อให้เราเหลือเวลาไปสอนเด็ก เล่นดนตรี และอยู่กับครอบครัว”",
                    "“I believe in ‘Creative Laziness’ — let AI and clean code handle repetitive work so we have more time to teach, make music, and be present with family.”"
                  )}
                </blockquote>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  {t(
                    "ครูชำนาญการ (ค.ศ.2) วิชาดนตรีสากล โรงเรียนหาดใหญ่วิทยาลัย (ญ.ว.) และผู้ก่อตั้ง AiAon Tech ทุกชิ้นงานบนเว็บนี้ไม่ได้เกิดจากการนั่งเทียน แต่ผ่านการใช้งานจริงกับนักเรียนกว่า 4,000 คน ครู 200+ ท่าน และลูกค้าทั่วประเทศ",
                    "Music educator at Hatyaiwittayalai School and founder of AiAon Tech. Every tool, printable kit, and audio track here is field-tested with 4,000+ students, 200+ teachers, and families."
                  )}
                </p>

                {/* Mini Proof Chips */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {[
                    { num: "4,000+", lbl: t("นักเรียนใช้งานจริง", "Real Students"), bg: "bg-blue-50/70 border-blue-200/80 text-blue-900" },
                    { num: "15 เล่ม", lbl: t("สื่อ Edu-Verse Live", "Edu-Verse Live"), bg: "bg-amber-50/80 border-amber-200/80 text-amber-950" },
                    { num: "100%", lbl: t("ตอบแชตดูแลเองทุกเคส", "Direct Support"), bg: "bg-emerald-50/80 border-emerald-200/80 text-emerald-900" },
                  ].map((chip) => (
                    <div key={chip.lbl} className={`rounded-2xl border p-3 text-center ${chip.bg}`}>
                      <div className="text-base sm:text-lg font-black">{chip.num}</div>
                      <div className="text-[11px] font-bold opacity-85">{chip.lbl}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-between gap-4 pt-2">
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-[#1E293B] font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {t("ครูอ้นตอบแชตเองทุกเคส", "Personal Support")}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {t("ส่งมอบไฟล์ไว ใช้งานได้ตลอดชีพ", "Instant Lifetime Delivery")}
                    </span>
                  </div>

                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0F172A] hover:bg-slate-800 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs transition-colors"
                  >
                    <span>{t("อ่านเรื่องราวครูอ้นเพิ่มเติม", "Read Full Story")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
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

      {/* Floating Glassmorphism Ambient Focus Lo-Fi Player (Off by default) */}
      <FloatingAmbientPlayer />
    </div>
  );
}

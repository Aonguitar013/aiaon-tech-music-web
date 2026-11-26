"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  Crown,
  Zap,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  Award,
  ExternalLink,
  BookOpen,
  Layers,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { BUNDLE_PACKAGES_DATA, BundleItem } from "@/components/bundles/bundleDataHelper";
import { CyberVaultCrateMockup } from "@/components/bundles/CyberVaultCrateMockup";
import { BundleDetailSection } from "@/components/bundles/BundleDetailSection";
import { getLineOrderUrl } from "@/lib/line";
import { HIDDEN_BUNDLE_IDS } from "@/config/catalogVisibility";

const BUNDLE_PACKAGES = BUNDLE_PACKAGES_DATA.filter(
  (b) => !HIDDEN_BUNDLE_IDS.includes(b.id)
);

export function BundlesView() {
  const [selectedBundle, setSelectedBundle] = useState<BundleItem | null>(null);
  const { openLineModal } = useLineModal();

  const handleLineOrderClick = (e: React.MouseEvent, bundle: BundleItem) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: `แพ็กเกจเหมา: ${bundle.title}`,
        price: bundle.bundlePrice,
        message: bundle.lineOrderMsg,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] overflow-x-hidden relative pb-24 font-prompt">
      {/* =================================================================
          1. EXECUTIVE VALUE VAULT HERO (STRIPE PRICING PERSONALITY)
      ================================================================= */}
      <section className="relative pt-8 pb-14 sm:pt-12 sm:pb-16 border-b border-[#E2E8F0] bg-[#FFFFFF]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none"
        />

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
                  src="/brand/svg/aiaon-tech_lockup_horizontal_fullcolor-on-light.svg"
                  alt="AiAon Tech"
                  className="h-8 sm:h-9 w-auto"
                />
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs font-mono font-bold">
                  <Crown className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>EXECUTIVE BUNDLES • SAVE UP TO 51%</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-[1.15]">
                เหมาคลังระบบโรงเรียน{" "}
                <span className="text-[#2563EB]">จ่ายครั้งเดียว ใช้ตลอดชีพ</span>
              </h1>

              <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl">
                ปลดล็อกชุดระบบ Google Apps Script ระดับมาตรฐานโรงเรียนใหญ่แบบยกเซ็ต ประหยัดกว่าซื้อแยกสูงสุดกว่า{" "}
                <strong className="text-[#0F172A]">5,200 ฿</strong> ข้อมูลเก็บใน Google Drive ของโรงเรียนเอง 100% ไร้ค่ารายเดือนตลอดชีพ
              </p>

              {/* 3 Value Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-1 max-w-lg">
                <div className="rounded-2xl bg-white border border-[#E2E8F0] px-3.5 py-2.5 shadow-2xs">
                  <div className="text-lg sm:text-xl font-black text-[#0F172A]">51%</div>
                  <div className="text-[11px] text-[#64748B]">ประหยัดสูงสุด</div>
                </div>
                <div className="rounded-2xl bg-white border border-[#E2E8F0] px-3.5 py-2.5 shadow-2xs">
                  <div className="text-lg sm:text-xl font-black text-[#2563EB]">20 ระบบ</div>
                  <div className="text-[11px] text-[#64748B]">ครบทุกฝ่ายงาน</div>
                </div>
                <div className="rounded-2xl bg-white border border-[#E2E8F0] px-3.5 py-2.5 shadow-2xs">
                  <div className="text-lg sm:text-xl font-black text-emerald-700">0 ฿/ด.</div>
                  <div className="text-[11px] text-[#64748B]">ไร้ค่ารายเดือน</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#bundle-tiers"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0F172A] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-sm transition-all"
                >
                  <span>เลือกแพ็กเกจที่เหมาะกับคุณ</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#compare-table"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-[#0F172A] border border-[#CBD5E1] font-bold text-sm transition-all"
                >
                  <span>ดูตารางเปรียบเทียบ</span>
                </a>
              </div>
            </motion.div>

            {/* Right: Executive Lifetime Highlight Card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl bg-white border border-[#FDE68A] p-4 shadow-md space-y-3.5">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0]">
                  <Image
                    src="/images/mockups/aona10_hygiene_matrix_mockup.jpg"
                    alt="AiAon Tech All-in-One School Systems"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 480px"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0F172A]/90 text-amber-300 text-[11px] font-bold">
                    👑 ALL-IN-ONE LIFETIME
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 px-1">
                  <div>
                    <div className="text-xs font-bold text-[#92400E]">เหมาครบ 20 ระบบ + อัปเดตฟรีตลอดชีพ</div>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl font-black text-[#0F172A]">4,990 ฿</span>
                      <span className="text-xs text-[#94A3B8] line-through">10,190 ฿</span>
                    </div>
                  </div>
                  <a
                    href="#bundle-tiers"
                    className="shrink-0 px-4 py-2.5 rounded-xl bg-[#FEF3C7] hover:bg-amber-200 text-[#78350F] font-bold text-xs transition-colors"
                  >
                    ดูรายละเอียด ↓
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 space-y-16">
        {/* =================================================================
            2. 3-COLUMN PRICING TIER CARDS
        ================================================================= */}
        <section id="bundle-tiers" className="scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
            {BUNDLE_PACKAGES.map((bundle, idx) => (
              <motion.article
                key={bundle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className={`relative rounded-3xl p-6 sm:p-7 transition-all duration-300 border flex flex-col justify-between bg-white ${
                  bundle.isFeatured
                    ? "border-[#2563EB] ring-2 ring-[#2563EB]/15 shadow-lg"
                    : "border-[#E2E8F0] hover:border-[#CBD5E1] shadow-2xs hover:shadow-md"
                }`}
              >
                {bundle.isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0F172A] text-amber-300 text-xs font-bold shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                    <span>คุ้มที่สุด — ประหยัดกว่า 5,200 ฿</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold border bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A]">
                      {bundle.badge}
                    </span>
                    <span className="text-emerald-800 text-xs font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0">
                      {bundle.discountText}
                    </span>
                  </div>

                  {/* 3D Crate Preview */}
                  <div
                    onClick={() => setSelectedBundle(bundle)}
                    className="relative w-full my-3 cursor-pointer flex justify-center py-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]"
                    title="คลิกเพื่อเจาะลึก 7 องค์ประกอบของหีบสมบัตินี้"
                  >
                    <CyberVaultCrateMockup
                      bundleId={bundle.id}
                      title={bundle.title}
                      tagline={bundle.tagline}
                      systemCount={bundle.id === "all-in-one-lifetime" ? 20 : bundle.systems.length}
                      themeColor={bundle.themeColor}
                      isFeatured={bundle.isFeatured}
                      size="md"
                      isInteractive={true}
                    />
                  </div>

                  <h2
                    onClick={() => setSelectedBundle(bundle)}
                    className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mb-1.5 cursor-pointer hover:text-[#2563EB] transition-colors"
                  >
                    {bundle.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#475569] mb-5 leading-relaxed">
                    {bundle.tagline}
                  </p>

                  {/* Pricing Box */}
                  <div className="flex flex-wrap items-baseline gap-2 mb-5 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <span className="text-3xl sm:text-4xl font-black text-[#0F172A]">
                      {bundle.bundlePrice.toLocaleString()} ฿
                    </span>
                    <span className="text-sm text-[#94A3B8] line-through">
                      {bundle.originalPrice.toLocaleString()} ฿
                    </span>
                    <span className="text-[11px] font-bold text-[#1D4ED8] ml-auto bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      จ่ายครั้งเดียวตลอดชีพ
                    </span>
                  </div>

                  <div className="text-xs text-[#475569] bg-[#FFFFFF] px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] mb-5">
                    {bundle.targetAudience}
                  </div>

                  {/* Included Systems */}
                  <div className="space-y-2.5 mb-6">
                    <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>ระบบที่รวมในแพ็กเกจ:</span>
                    </h3>
                    {bundle.systems.map((sys, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]"
                      >
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <span className="text-xs sm:text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-[#1D4ED8] border border-blue-200">
                              {sys.code}
                            </span>
                            {sys.name}
                          </span>
                          <span className="text-[11px] text-[#94A3B8] line-through shrink-0">
                            {sys.originalPrice} ฿
                          </span>
                        </div>
                        <p className="text-[11px] text-[#475569] leading-relaxed">
                          {sys.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Bonuses */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-[#F1F5F9]">
                    <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
                      สิทธิพิเศษที่ได้รับ:
                    </h3>
                    {bundle.bonuses.map((bonus, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-[#1E293B]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{bonus}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="space-y-2.5 pt-4 border-t border-[#F1F5F9]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedBundle(bundle)}
                      className="w-full py-3 px-3.5 rounded-2xl bg-[#F8FAFC] hover:bg-slate-100 text-[#0F172A] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition border border-[#E2E8F0] cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-[#2563EB]" />
                      <span>เจาะลึก 7 ข้อ</span>
                    </button>

                    <a
                      href={getLineOrderUrl(bundle.lineOrderMsg)}
                      onClick={(e) => handleLineOrderClick(e, bundle)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-line-title={`แพ็กเกจเหมา: ${bundle.title}`}
                      data-line-price={bundle.bundlePrice}
                      data-line-code={bundle.id}
                      className="w-full py-3 px-3.5 rounded-2xl text-[#052E16] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer bg-[#06C755] hover:bg-[#05b34c]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>สั่งซื้อทาง LINE</span>
                    </a>
                  </div>

                  <div className="text-center pt-1">
                    <Link
                      href="/digital-vault"
                      className="text-xs text-[#64748B] hover:text-[#0F172A] hover:underline inline-flex items-center gap-1"
                    >
                      <span>ดูรายระบบใน Digital Vault</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* =================================================================
            3. CLEAN EXECUTIVE COMPARISON TABLE
        ================================================================= */}
        <section
          id="compare-table"
          className="rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] bg-white shadow-2xs space-y-6 scroll-mt-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider">
                COMPARISON MATRIX
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1">
                เปรียบเทียบแพ็กเกจให้เลือกง่ายใน 10 วินาที
              </h2>
            </div>
            <span className="text-xs text-[#64748B]">ทุกแพ็กเกจออกใบเสร็จรับเงินได้</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[#64748B]">
                  <th className="py-3.5 px-4">คุณสมบัติ / แพ็กเกจ</th>
                  <th className="py-3.5 px-4 text-[#0F172A] font-bold">Homeroom Pro</th>
                  <th className="py-3.5 px-4 text-[#0F172A] font-bold">Admin Suite</th>
                  <th className="py-3.5 px-4 text-[#92400E] font-extrabold bg-[#FEF9EF] rounded-t-xl border-x border-t border-[#FDE68A]">
                    All-in-One Lifetime 👑
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] text-[#475569]">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-[#0F172A]">จำนวนระบบที่ได้รับ</td>
                  <td className="py-3.5 px-4">3 ระบบ (ชั้นเรียน &amp; สีขาว)</td>
                  <td className="py-3.5 px-4">3 ระบบ (ยานพาหนะ &amp; พัสดุ)</td>
                  <td className="py-3.5 px-4 font-bold text-[#0F172A] bg-[#FEF9EF]/70 border-x border-[#FDE68A]">
                    ครบทั้ง 20 ระบบ ⚡
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-[#0F172A]">สิทธิ์ใช้งานตลอดชีพ</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">✓ มี</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">✓ มี</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-bold bg-[#FEF9EF]/70 border-x border-[#FDE68A]">
                    ✓ มีตลอดชีพ
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-[#0F172A]">สิทธิ์รับระบบใหม่ในอนาคตฟรี</td>
                  <td className="py-3.5 px-4 text-[#94A3B8]">—</td>
                  <td className="py-3.5 px-4 text-[#94A3B8]">—</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-bold bg-[#FEF9EF]/70 border-x border-[#FDE68A]">
                    ✓ ฟรีตลอดชีพ 🚀
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-[#0F172A]">ซัปพอร์ตโดยครูอ้น (LINE OA)</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">✓ มี</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">✓ มี</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-bold bg-[#FEF9EF]/70 border-x border-[#FDE68A]">
                    ✓ VIP Priority Support
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-[#0F172A]">ราคาพิเศษ</td>
                  <td className="py-3.5 px-4 font-bold text-[#0F172A]">1,490 ฿</td>
                  <td className="py-3.5 px-4 font-bold text-[#0F172A]">1,990 ฿</td>
                  <td className="py-3.5 px-4 font-black text-[#92400E] bg-[#FEF9EF] rounded-b-xl border-x border-b border-[#FDE68A] text-base">
                    4,990 ฿ (ลด 51%)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =================================================================
            4. 3-PILLAR WHY BUNDLE STRIP
        ================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-[#0F172A]">ประหยัดสูงสุด 51%</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              ซื้อแยกทีละระบบราคารวมกว่าหมื่นบาท เหมายกชุดจ่ายเพียง 4,990 ฿ ได้ครบ 20 ระบบพร้อมอัปเดตฟรีตลอดชีพ
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-[#0F172A]">ปลอดภัย &amp; ไม่มีรายเดือน</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              ข้อมูลนักเรียนและเอกสารจัดเก็บใน Google Drive ของคุณครูเอง 100% ไม่ผ่านเซิร์ฟเวอร์คนกลาง ปลอดภัยตาม PDPA
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-[#0F172A]">ซัปพอร์ตโดยครูอ้นโดยตรง</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              มีปัญหาทักปรึกษาทาง LINE OA ได้ตลอด พร้อมคู่มือติดตั้งภาษาไทย 3 นาทีเสร็จ
            </p>
          </div>
        </section>
      </div>

      {/* 7-PILLARS BUNDLE DETAIL MODAL (WARM CREAM EDITORIAL) */}
      <AnimatePresence>
        {selectedBundle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0F172A]/50 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-8 shadow-2xl"
            >
              <div className="sticky top-0 z-50 flex items-center justify-between pb-3 bg-[#F8FAFC]/95 backdrop-blur-sm border-b border-[#E2E8F0] mb-6">
                <span className="text-xs sm:text-sm font-bold text-[#0F172A] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D97706]" />
                  <span>เจาะลึก 7 องค์ประกอบหลัก • {selectedBundle.title}</span>
                </span>
                <button
                  onClick={() => setSelectedBundle(null)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] hover:bg-slate-100 text-[#475569] hover:text-[#0F172A] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  ✕ ปิดหน้าต่าง
                </button>
              </div>

              <BundleDetailSection
                bundle={selectedBundle}
                onClose={() => setSelectedBundle(null)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

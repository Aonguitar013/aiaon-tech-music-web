"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, CheckCircle2, Crown, Zap, ShieldCheck,
  ArrowRight, MessageCircle, Award,
  ExternalLink, BookOpen, Layers
} from "lucide-react";
import Link from "next/link";
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
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E293B] overflow-hidden relative pb-28 font-prompt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 relative z-10">

        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#DDD6FE] bg-[#F5F3FF] text-[#6D28D9] font-prompt text-sm font-semibold tracking-wide"
          >
            <Sparkles className="w-4 h-4 text-[#7C3AED]" />
            <span>EXCLUSIVE BUNDLE PACKAGES — คุ้มค่าที่สุด</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-prompt text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-tight"
          >
            แพ็กเกจเหมาหีบสมบัติ{" "}
            <span className="text-[#2563EB]">
              ลดภาระงานครู
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-prompt text-base sm:text-lg text-[#475569] leading-relaxed"
          >
            ยกระดับการทำงานด้วยชุดระบบ Google Apps Script สำเร็จรูป ซื้อเป็นแพ็กเกจประหยัดสูงสุดกว่า 50% รันบน Google Sheets ของตัวเอง ปลอดภัย 100%
          </motion.p>
        </div>

        {/* --- BUNDLES GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {BUNDLE_PACKAGES.map((bundle, idx) => {
            return (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-3xl p-7 sm:p-8 transition-all duration-300 border flex flex-col justify-between bg-white shadow-sm hover:shadow-md ${
                  bundle.isFeatured
                    ? "border-[#7C3AED] ring-2 ring-[#7C3AED]/20 lg:scale-[1.02]"
                    : "border-[#E2E8F0] hover:border-[#CBD5E1]"
                }`}
              >
                {/* Featured Highlight */}
                {bundle.isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-linear-to-r from-[#7C3AED] to-[#DB2777] text-white font-prompt text-xs font-bold shadow-sm flex items-center gap-1.5 uppercase tracking-wider whitespace-nowrap">
                    <Crown className="w-3.5 h-3.5 fill-white text-white" />
                    <span>👑 แนะนำมากที่สุด — ประหยัดกว่า 5,200 ฿</span>
                  </div>
                )}

                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-prompt font-semibold border ${bundle.badgeColor}`}>
                      {bundle.badge}
                    </span>
                    <span className="text-emerald-800 font-prompt text-xs font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0">
                      {bundle.discountText}
                    </span>
                  </div>

                  {/* 3D Cyber Vault Crate Mockup */}
                  <div
                    onClick={() => setSelectedBundle(bundle)}
                    className="relative w-full my-4 cursor-pointer flex justify-center py-3 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0]"
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

                  {/* Title & Tagline */}
                  <h3
                    onClick={() => setSelectedBundle(bundle)}
                    className="font-prompt text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-2 cursor-pointer hover:text-[#2563EB] transition-colors"
                  >
                    {bundle.title}
                  </h3>
                  <p className="font-prompt text-sm text-[#475569] mb-6">
                    {bundle.tagline}
                  </p>

                  {/* Pricing Display */}
                  <div className="flex flex-wrap items-baseline gap-2.5 mb-6 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0]">
                    <span className="font-prompt text-4xl sm:text-5xl font-black text-[#0F172A]">
                      {bundle.bundlePrice.toLocaleString()} ฿
                    </span>
                    <span className="font-prompt text-lg text-[#94A3B8] line-through">
                      {bundle.originalPrice.toLocaleString()} ฿
                    </span>
                    <span className="text-xs font-prompt font-semibold text-[#0E7490] ml-auto bg-[#ECFEFF] px-2.5 py-1 rounded-lg border border-[#A5F3FC]">
                      จ่ายครั้งเดียวใช้ได้ตลอดชีพ
                    </span>
                  </div>

                  {/* Target Audience */}
                  <div className="text-xs font-prompt text-[#475569] bg-[#FAF8F5] px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] mb-6">
                    {bundle.targetAudience}
                  </div>

                  {/* Included Systems List */}
                  <div className="space-y-3 mb-8">
                    <h4 className="font-prompt text-xs font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>ระบบที่รวมในหีบนี้:</span>
                    </h4>
                    {bundle.systems.map((sys, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-colors">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-prompt text-sm font-bold text-[#0F172A] flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded text-[11px] font-mono bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                              {sys.code}
                            </span>
                            {sys.name}
                          </span>
                          <span className="text-xs font-prompt text-[#94A3B8] line-through shrink-0">
                            {sys.originalPrice} ฿
                          </span>
                        </div>
                        <p className="font-prompt text-xs text-[#475569] leading-relaxed">
                          {sys.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Bonuses Checklist */}
                  <div className="space-y-2.5 mb-8 pt-4 border-t border-[#F1F5F9]">
                    <h4 className="font-prompt text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3">
                      สิทธิประโยชน์พิเศษที่ได้รับ:
                    </h4>
                    {bundle.bonuses.map((bonus, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs font-prompt text-[#1E293B]">
                        <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                        <span>{bonus}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call To Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedBundle(bundle)}
                      className="w-full py-3.5 px-4 rounded-2xl bg-[#FAF8F5] hover:bg-[#F1ECE4] text-[#0F172A] font-prompt font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition border border-[#E2E8F0] cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-[#D97706]" />
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
                      className="w-full py-3.5 px-4 rounded-2xl text-[#052E16] font-prompt font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] shadow-xs cursor-pointer bg-[#06C755] hover:bg-[#05b34c]"
                    >
                      <MessageCircle className="w-4 h-4 text-[#052E16]" />
                      <span>สั่งซื้อทาง LINE</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="text-center pt-1">
                    <Link
                      href="/digital-vault"
                      className="text-xs font-prompt text-[#64748B] hover:text-[#0F172A] transition-colors hover:underline inline-flex items-center gap-1"
                    >
                      <span>หรือดูรายละเอียดรายระบบใน Digital Vault</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- BUNDLE COMPARISON TABLE --- */}
        <div className="rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] bg-white shadow-sm max-w-5xl mx-auto mb-20 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-block text-xs font-prompt font-bold text-[#6D28D9] px-3 py-1 rounded-full bg-[#F5F3FF] border border-[#DDD6FE]">
              📊 COMPARISON TABLE — ตารางเปรียบเทียบแพ็กเกจ
            </span>
            <h3 className="font-prompt text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              เลือกแพ็กเกจที่เหมาะกับภาระงานของคุณ
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-prompt text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[#64748B]">
                  <th className="py-3 px-4">คุณสมบัติ / แพ็กเกจ</th>
                  <th className="py-3 px-4 text-[#0E7490]">Homeroom Pro</th>
                  <th className="py-3 px-4 text-[#B45309]">Admin Suite</th>
                  <th className="py-3 px-4 text-[#6D28D9] font-bold bg-[#F5F3FF] rounded-t-xl">All-in-One Lifetime 👑</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] text-[#475569]">
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#0F172A]">จำนวนระบบที่ได้รับ</td>
                  <td className="py-3 px-4">3 ระบบ (งานชั้นเรียน &amp; สีขาว)</td>
                  <td className="py-3 px-4">3 ระบบ (ยานพาหนะ &amp; พัสดุ)</td>
                  <td className="py-3 px-4 font-bold text-[#6D28D9] bg-[#F5F3FF]/60">ครบทั้ง 20 ระบบ ⚡</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#0F172A]">สิทธิ์ใช้งานตลอดชีพ</td>
                  <td className="py-3 px-4 text-[#059669] font-semibold">✓ มี</td>
                  <td className="py-3 px-4 text-[#059669] font-semibold">✓ มี</td>
                  <td className="py-3 px-4 text-[#059669] font-bold bg-[#F5F3FF]/60">✓ มีตลอดชีพ</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#0F172A]">สิทธิ์รับระบบใหม่ในอนาคตฟรี</td>
                  <td className="py-3 px-4 text-[#94A3B8]">-</td>
                  <td className="py-3 px-4 text-[#94A3B8]">-</td>
                  <td className="py-3 px-4 text-[#059669] font-bold bg-[#F5F3FF]/60">✓ ฟรีตลอดชีพ 🚀</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#0F172A]">สิทธิ์ปรึกษาครูอ้นผ่าน LINE OA</td>
                  <td className="py-3 px-4 text-[#059669] font-semibold">✓ มี</td>
                  <td className="py-3 px-4 text-[#059669] font-semibold">✓ มี</td>
                  <td className="py-3 px-4 text-[#059669] font-bold bg-[#F5F3FF]/60">✓ VIP Priority Support</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#0F172A]">ราคาพิเศษ</td>
                  <td className="py-3 px-4 font-bold text-[#0E7490]">1,490 ฿</td>
                  <td className="py-3 px-4 font-bold text-[#B45309]">1,990 ฿</td>
                  <td className="py-3 px-4 font-black text-[#6D28D9] bg-[#F5F3FF] rounded-b-xl text-base">4,990 ฿ (ลด 51%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* --- WHY BUY BUNDLE SECTION --- */}
        <div className="rounded-3xl p-8 sm:p-12 border border-[#E2E8F0] bg-white shadow-sm max-w-5xl mx-auto mb-12">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <h3 className="font-prompt text-2xl sm:text-4xl font-extrabold text-[#0F172A]">
              ทำไมถึงควรเลือกซื้อแบบ <span className="text-[#2563EB]">แพ็กเกจ Bundle?</span>
            </h3>
            <p className="font-prompt text-sm text-[#475569]">
              ทุกระบบเชื่อมต่อข้อมูลกันได้อย่างลื่นไหล รันบน Google Account ของคุณครูเอง 100%
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB]">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-prompt text-lg font-bold text-[#0F172A]">ประหยัดสูงสุด 51%</h4>
              <p className="font-prompt text-xs text-[#475569] leading-relaxed">
                ซื้อแยกทีละระบบราคารวมกว่าหมื่นบาท เหมายกชุดจ่ายเพียง 4,990 บาท ได้ครบ 20 ระบบพร้อมอัปเดตฟรีตลอดชีพ
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center text-[#6D28D9]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-prompt text-lg font-bold text-[#0F172A]">ปลอดภัย &amp; ไม่มีรายเดือน</h4>
              <p className="font-prompt text-xs text-[#475569] leading-relaxed">
                ข้อมูลนักเรียนและเอกสารทั้งหมดจัดเก็บใน Google Drive ของคุณครูเอง ไม่ผ่านเซิร์ฟเวอร์คนกลาง ปลอดภัยตาม พ.ร.บ. คุ้มครองข้อมูล
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#FEF9EF] border border-[#FDE68A] flex items-center justify-center text-[#D97706]">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-prompt text-lg font-bold text-[#0F172A]">ซัพพอร์ตโดยครูอ้นโดยตรง</h4>
              <p className="font-prompt text-xs text-[#475569] leading-relaxed">
                มีปัญหาสามารถทักปรึกษาผ่าน LINE OA ได้ตลอด มีคลิปสอนติดตั้งและแนะนำการใช้งานอย่างละเอียดทุกขั้นตอน
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 7-PILLARS BUNDLE DETAIL MODAL */}
      <AnimatePresence>
        {selectedBundle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0F172A]/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-slate-950 border border-purple-500/40 rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-8 shadow-2xl"
            >
              <div className="sticky top-0 z-50 flex items-center justify-between pb-3 bg-slate-950/90 backdrop-blur-sm border-b border-white/10 mb-6">
                <span className="text-xs sm:text-sm font-bold text-purple-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>เจาะลึก 7 องค์ประกอบหลัก • {selectedBundle.title}</span>
                </span>
                <button
                  onClick={() => setSelectedBundle(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
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

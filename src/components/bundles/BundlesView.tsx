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

const BUNDLE_PACKAGES = BUNDLE_PACKAGES_DATA;

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
    <div className="min-h-screen bg-[#070913] text-white overflow-hidden relative pb-28">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cyan-600/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-amber-600/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 font-prompt text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(168,85,247,0.2)]"
          >
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>EXCLUSIVE BUNDLE PACKAGES — คุ้มค่าที่สุด</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-prompt text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            แพ็กเกจเหมาหีบสมบัติ{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              ลดภาระงานครู
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-prompt text-lg text-white/70 leading-relaxed"
          >
            ยกระดับการทำงานด้วยชุดระบบ Google Apps Script สำเร็จรูป ซื้อเป็นแพ็กเกจประหยัดสูงสุดกว่า 50% รันบน Google Sheets ของตัวเอง ปลอดภัย 100%
          </motion.p>
        </div>

        {/* --- BUNDLES GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {BUNDLE_PACKAGES.map((bundle, idx) => {
            return (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-3xl p-8 transition-all duration-300 border flex flex-col justify-between ${
                  bundle.isFeatured 
                    ? "border-purple-500/60 bg-gradient-to-b from-purple-950/30 via-slate-900/90 to-indigo-950/40 shadow-[0_0_50px_rgba(168,85,247,0.25)] ring-1 ring-purple-400/40 lg:scale-[1.02]" 
                    : "border-white/10 bg-slate-900/60 hover:border-white/20 " + bundle.borderGlow
                }`}
              >
                {/* Featured Glow Highlight */}
                {bundle.isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-prompt text-xs font-bold shadow-[0_0_20px_rgba(236,72,153,0.5)] flex items-center gap-1.5 uppercase tracking-wider">
                    <Crown className="w-3.5 h-3.5 fill-white text-white" />
                    <span>👑 แนะนำมากที่สุด — ประหยัดกว่า 5,200 ฿</span>
                  </div>
                )}

                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3.5 py-1 rounded-full text-xs font-prompt font-semibold border ${bundle.badgeColor}`}>
                      {bundle.badge}
                    </span>
                    <span className="text-emerald-400 font-prompt text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                      {bundle.discountText}
                    </span>
                  </div>

                  {/* ──────────────── 3D Cyber Vault Crate Mockup ──────────────── */}
                  <div
                    onClick={() => setSelectedBundle(bundle)}
                    className="relative w-full my-4 cursor-pointer flex justify-center py-2"
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
                    className="font-prompt text-2xl sm:text-3xl font-extrabold text-white mb-2 cursor-pointer hover:text-amber-300 transition-colors"
                  >
                    {bundle.title}
                  </h3>
                  <p className="font-prompt text-sm text-white/60 mb-6">
                    {bundle.tagline}
                  </p>

                  {/* Pricing Display */}
                  <div className="flex items-baseline gap-3 mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <span className="font-prompt text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-amber-200">
                      {bundle.bundlePrice.toLocaleString()} ฿
                    </span>
                    <span className="font-prompt text-lg text-white/40 line-through">
                      {bundle.originalPrice.toLocaleString()} ฿
                    </span>
                    <span className="text-xs font-prompt text-cyan-300 ml-auto bg-cyan-500/10 px-2 py-1 rounded-lg border border-cyan-500/20">
                      จ่ายครั้งเดียวใช้ได้ตลอดชีพ
                    </span>
                  </div>

                  {/* Target Audience */}
                  <div className="text-xs font-prompt text-white/70 bg-white/5 px-3.5 py-2 rounded-xl border border-white/5 mb-6">
                    {bundle.targetAudience}
                  </div>

                  {/* Included Systems List */}
                  <div className="space-y-3 mb-8">
                    <h4 className="font-prompt text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      <span>ระบบที่รวมในหีบนี้:</span>
                    </h4>
                    {bundle.systems.map((sys, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-prompt text-sm font-bold text-white flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded text-[11px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                              {sys.code}
                            </span>
                            {sys.name}
                          </span>
                          <span className="text-xs font-prompt text-white/40 line-through shrink-0">
                            {sys.originalPrice} ฿
                          </span>
                        </div>
                        <p className="font-prompt text-xs text-white/60 leading-relaxed">
                          {sys.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Bonuses Checklist */}
                  <div className="space-y-2.5 mb-8 pt-4 border-t border-white/10">
                    <h4 className="font-prompt text-xs font-bold text-white/50 uppercase tracking-wider mb-3">
                      สิทธิประโยชน์พิเศษที่ได้รับ:
                    </h4>
                    {bundle.bonuses.map((bonus, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs font-prompt text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{bonus}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call To Action Buttons: เจาะลึก 7 ข้อ & สั่งซื้อทาง LINE */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedBundle(bundle)}
                      className="w-full py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-prompt font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition border border-white/15 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span>เจาะลึก 7 ข้อ</span>
                    </button>

                    <a
                      href={`https://line.me/R/ti/p/@aiaon?text=${encodeURIComponent(bundle.lineOrderMsg)}`}
                      onClick={(e) => handleLineOrderClick(e, bundle)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3.5 px-4 rounded-2xl text-white font-prompt font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] shadow-lg cursor-pointer bg-gradient-to-r ${bundle.btnGradient}`}
                    >
                      <MessageCircle className="w-4 h-4 fill-white/20 text-white" />
                      <span>สั่งซื้อทาง LINE</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="text-center pt-1">
                    <Link 
                      href="/digital-vault" 
                      className="text-xs font-prompt text-white/50 hover:text-white transition-colors hover:underline inline-flex items-center gap-1"
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
        <div className="rounded-3xl p-8 sm:p-12 border border-white/10 bg-slate-900/70 max-w-5xl mx-auto mb-20 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-prompt font-bold text-purple-300 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
              📊 COMPARISON TABLE — ตารางเปรียบเทียบแพ็กเกจ
            </span>
            <h3 className="font-prompt text-2xl sm:text-3xl font-extrabold text-white">
              เลือกแพ็กเกจที่เหมาะกับภาระงานของคุณ
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-prompt text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/50">
                  <th className="py-3 px-4">คุณสมบัติ / แพ็กเกจ</th>
                  <th className="py-3 px-4 text-cyan-300">Classroom Pro</th>
                  <th className="py-3 px-4 text-amber-300">Admin Suite</th>
                  <th className="py-3 px-4 text-emerald-300">Scout &amp; Activity</th>
                  <th className="py-3 px-4 text-purple-300 font-bold bg-purple-500/10 rounded-t-xl">All-in-One Lifetime 👑</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">จำนวนระบบที่ได้รับ</td>
                  <td className="py-3 px-4">3 ระบบ (ม.3 &amp; สีขาว)</td>
                  <td className="py-3 px-4">3 ระบบ (ยานพาหนะ &amp; พัสดุ)</td>
                  <td className="py-3 px-4">3 ระบบ (ลูกเสือ &amp; ดนตรี)</td>
                  <td className="py-3 px-4 font-bold text-purple-300 bg-purple-500/5">ครบทั้ง 20 ระบบ ⚡</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">สิทธิ์ใช้งานตลอดชีพ</td>
                  <td className="py-3 px-4 text-emerald-400">✓ มี</td>
                  <td className="py-3 px-4 text-emerald-400">✓ มี</td>
                  <td className="py-3 px-4 text-emerald-400">✓ มี</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold bg-purple-500/5">✓ มีตลอดชีพ</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">สิทธิ์รับระบบใหม่ในอนาคตฟรี</td>
                  <td className="py-3 px-4 text-white/40">-</td>
                  <td className="py-3 px-4 text-white/40">-</td>
                  <td className="py-3 px-4 text-white/40">-</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold bg-purple-500/5">✓ ฟรีตลอดชีพ 🚀</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">สิทธิ์ปรึกษาครูอ้นผ่าน LINE OA</td>
                  <td className="py-3 px-4 text-emerald-400">✓ มี</td>
                  <td className="py-3 px-4 text-emerald-400">✓ มี</td>
                  <td className="py-3 px-4 text-emerald-400">✓ มี</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold bg-purple-500/5">✓ VIP Priority Support</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">ราคาพิเศษ</td>
                  <td className="py-3 px-4 font-bold text-cyan-300">1,490 ฿</td>
                  <td className="py-3 px-4 font-bold text-amber-300">1,990 ฿</td>
                  <td className="py-3 px-4 font-bold text-emerald-300">990 ฿</td>
                  <td className="py-3 px-4 font-black text-purple-300 bg-purple-500/10 rounded-b-xl text-base">4,990 ฿ (ลด 51%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* --- WHY BUY BUNDLE SECTION --- */}
        <div className="rounded-3xl p-8 sm:p-12 border border-white/10 bg-slate-900/60 max-w-5xl mx-auto mb-20 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <h3 className="font-prompt text-2xl sm:text-4xl font-extrabold text-white">
              ทำไมถึงควรเลือกซื้อแบบ <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">แพ็กเกจ Bundle?</span>
            </h3>
            <p className="font-prompt text-sm text-white/60">
              ทุกระบบเชื่อมต่อข้อมูลกันได้อย่างลื่นไหล รันบน Google Account ของคุณครูเอง 100%
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-prompt text-lg font-bold text-white">ประหยัดสูงสุด 51%</h4>
              <p className="font-prompt text-xs text-white/60 leading-relaxed">
                ซื้อแยกทีละระบบราคารวมกว่าหมื่นบาท เหมายกชุดจ่ายเพียง 4,990 บาท ได้ครบ 20 ระบบพร้อมอัปเดตฟรีตลอดชีพ
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-prompt text-lg font-bold text-white">ปลอดภัย &amp; ไม่มีรายเดือน</h4>
              <p className="font-prompt text-xs text-white/60 leading-relaxed">
                ข้อมูลนักเรียนและเอกสารทั้งหมดจัดเก็บใน Google Drive ของคุณครูเอง ไม่ผ่านเซิร์ฟเวอร์คนกลาง ปลอดภัยตาม พ.ร.บ. คุ้มครองข้อมูล
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-prompt text-lg font-bold text-white">ซัพพอร์ตโดยครูอ้นโดยตรง</h4>
              <p className="font-prompt text-xs text-white/60 leading-relaxed">
                มีปัญหาสามารถทักปรึกษาผ่าน LINE OA ได้ตลอด มีคลิปสอนติดตั้งและแนะนำการใช้งานอย่างละเอียดทุกขั้นตอน
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          7-PILLARS BUNDLE DETAIL MODAL
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedBundle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
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

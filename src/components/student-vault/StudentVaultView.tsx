"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, CheckCircle2, ArrowRight,
  MessageCircle, Bot,
  Star,
  Check, Copy, Flame, Gift, BookOpen
} from "lucide-react";
import Link from "next/link";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { STUDENT_PRODUCTS_DATA, StudentProductItem } from "@/components/student-vault/studentDataHelper";
import { StudentCardMockup } from "@/components/student-vault/StudentCardMockup";
import { StudentDetailSection } from "@/components/student-vault/StudentDetailSection";
import { getLineOrderUrl } from "@/lib/line";
import { HIDDEN_STUDENT_PRODUCT_CODES } from "@/config/catalogVisibility";

const STUDENT_PRODUCTS = STUDENT_PRODUCTS_DATA.filter(
  (p) => !HIDDEN_STUDENT_PRODUCT_CODES.includes(p.code)
);

export function StudentVaultView() {
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [selectedProd, setSelectedProd] = useState<StudentProductItem | null>(null);
  const { openLineModal } = useLineModal();

  const samplePrompt = "จงเป็นผู้เชี่ยวชาญด้าน [วิชา...] ช่วยเขียนโครงร่างรายงานเรื่อง [หัวข้อ...] แบ่งเป็น 5 บท พร้อมแนวคิดบทนำ ประเด็นสำคัญ และรายการอ้างอิง";

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(samplePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E293B] overflow-hidden relative pb-28 font-prompt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 relative z-10">

        {/* --- HERO HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-200 bg-pink-50 text-pink-700 font-prompt text-sm font-semibold tracking-wide"
          >
            <Flame className="w-4 h-4 text-pink-600" />
            <span>STUDENT VAULT — คลังไอเทมตัวช่วยเรียนสำหรับนักเรียน Gen Z</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-prompt text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-tight"
          >
            เสกงานเรียนให้เป็นเรื่องง่าย{" "}
            <span className="text-[#DB2777]">
              สไตล์เด็กยุคใหม่
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-prompt text-base sm:text-lg text-[#475569] leading-relaxed"
          >
            รวมระบบเว็บ Portfolio TCAS 3D, ระบบเช็คการบ้านประจำห้อง และคัมภีร์ AI Prompts ราคาเบาๆ สบายกระเป๋า ใช้งานง่ายบนมือถือ
          </motion.p>

          {/* Quick Freebie Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex flex-wrap items-center justify-center gap-2.5 p-3 px-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-prompt text-xs sm:text-sm font-semibold"
          >
            <Gift className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>🎁 แจกฟรีสำหรับนักเรียน-นักศึกษา: คู่มือ AI Prompts ลับ &amp; 3D Flashcard</span>
            <Link href="/freebies" className="text-[#0F172A] underline hover:text-emerald-700 transition-colors font-bold">
              กดรับฟรีที่นี่ →
            </Link>
          </motion.div>
        </div>

        {/* --- STUDENT PRODUCTS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto gap-8 mb-20">
          {STUDENT_PRODUCTS.map((prod, idx) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative rounded-3xl p-7 sm:p-8 bg-white border border-[#E2E8F0] hover:border-pink-300 shadow-sm hover:shadow-md flex flex-col justify-between transition-all duration-300"
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-prompt font-semibold border ${prod.badgeColor}`}>
                    {prod.badge}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#FAF8F5] border border-[#E2E8F0] text-[#475569]">
                    {prod.code}
                  </span>
                </div>

                {/* 3D Holographic Cyber Pass Mockup */}
                <div
                  onClick={() => setSelectedProd(prod)}
                  className="relative w-full mb-6 cursor-pointer py-3 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] flex justify-center"
                  title="คลิกเพื่อเจาะลึก 7 องค์ประกอบของไอเทมนี้"
                >
                  <StudentCardMockup
                    code={prod.code}
                    title={prod.title}
                    tagline={prod.tagline}
                    themeColor={prod.themeColor}
                    badgeText={prod.code}
                    serialNo={prod.serialNo}
                    isInteractive={true}
                  />
                </div>

                {/* Title & Tagline */}
                <h3
                  onClick={() => setSelectedProd(prod)}
                  className="font-prompt text-2xl font-extrabold text-[#0F172A] mb-2 cursor-pointer hover:text-[#DB2777] transition-colors"
                >
                  {prod.title}
                </h3>
                <p className="font-prompt text-xs text-[#64748B] mb-6 leading-relaxed">
                  {prod.tagline}
                </p>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] mb-6">
                  <div className="flex flex-wrap items-baseline gap-2.5">
                    <span className="font-prompt text-4xl font-black text-[#0F172A]">
                      {prod.price} ฿
                    </span>
                    <span className="font-prompt text-base text-[#94A3B8] line-through">
                      {prod.originalPrice} ฿
                    </span>
                    <span className="text-[11px] font-prompt font-semibold text-pink-700 ml-auto bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-200">
                      จ่ายครั้งเดียวตลอดชีพ
                    </span>
                  </div>
                  {prod.perPersonNote && (
                    <p className="text-xs font-prompt text-[#0E7490] mt-2 font-medium">
                      💡 {prod.perPersonNote}
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="font-prompt text-xs text-[#475569] leading-relaxed mb-6">
                  {prod.description}
                </p>

                {/* Features List */}
                <div className="space-y-2.5 mb-8 border-t border-[#F1F5F9] pt-4">
                  <h4 className="font-prompt text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
                    สิ่งที่คุณจะได้รับ:
                  </h4>
                  {prod.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs font-prompt text-[#1E293B]">
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order & Detail Buttons */}
              <div className="pt-4 border-t border-[#F1F5F9] grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProd(prod)}
                  className="w-full py-3.5 px-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#F1ECE4] text-[#0F172A] font-prompt font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition border border-[#E2E8F0] cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#DB2777]" />
                  <span>เจาะลึก 7 ข้อ</span>
                </button>

                <a
                  href={getLineOrderUrl(prod.lineOrderMsg)}
                  onClick={(e) => {
                    if (!isMobileDevice()) {
                      e.preventDefault();
                      openLineModal({
                        title: `ไอเทม: [${prod.code}] ${prod.title}`,
                        price: prod.price,
                        message: prod.lineOrderMsg,
                      });
                    }
                  }}
                  data-line-title={`ไอเทม: ${prod.title}`}
                  data-line-price={prod.price}
                  data-line-code={prod.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-3 rounded-2xl text-[#052E16] font-prompt font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-[1.02] shadow-xs cursor-pointer bg-[#06C755] hover:bg-[#05b34c]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>สั่งซื้อ LINE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- ALL-IN-ONE STUDENT SUPER PACK --- */}
        <div className="rounded-3xl p-8 sm:p-12 border-2 border-pink-200 bg-white shadow-sm max-w-4xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-[#6D28D9] text-xs font-prompt font-bold">
                <Star className="w-3.5 h-3.5 fill-[#7C3AED] text-[#7C3AED]" />
                <span>STUDENT ALL-IN-ONE SUPER PACK (เหมาหมด 3 ไอเทม)</span>
              </div>
              <h3 className="font-prompt text-2xl sm:text-4xl font-extrabold text-[#0F172A]">
                เหมาครบ 3 ไอเทม เพียง{" "}
                <span className="text-[#DB2777]">390 ฿</span>{" "}
                <span className="text-lg text-[#94A3B8] line-through font-normal">(จากปกติ 488 ฿)</span>
              </h3>
              <p className="font-prompt text-sm text-[#475569] leading-relaxed">
                ได้ทั้ง <strong className="text-[#0F172A]">เว็บ Portfolio TCAS 3D + ระบบเช็คการบ้านห้อง + คัมภีร์ AI Prompts</strong> ครบจบในแพ็กเกจเดียว พร้อมสิทธิ์อัปเดตฟรีตลอดการเรียน!
              </p>
            </div>

            <a
              href={getLineOrderUrl(
                'สวัสดีครับครูอ้น สนใจสั่งซื้อแพ็กเกจเหมา "Student All-in-One Super Pack (390 บาท)" ได้ครบทั้ง 3 ระบบ (เว็บพอร์ต TCAS 3D + ระบบเช็คการบ้านห้อง + คัมภีร์ AI) ครับ รบกวนขอข้อมูลชำระเงินด้วยครับ 🙏'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-prompt font-extrabold text-base flex items-center justify-center gap-2.5 shadow-xs transition-all hover:scale-105 shrink-0 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>สั่งซื้อ Super Pack 390 ฿</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* --- INTERACTIVE TCAS 3D PORTFOLIO DEMO SIMULATOR --- */}
        <div className="rounded-3xl p-8 sm:p-10 border border-[#E2E8F0] bg-white shadow-sm max-w-4xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="inline-block text-xs font-prompt font-bold text-pink-700 px-3 py-1 rounded-full bg-pink-50 border border-pink-200">
              🎮 LIVE SIMULATOR — ตัวอย่างหน้าเว็บ Portfolio 3D
            </span>
            <h3 className="font-prompt text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              เมื่อกรรมการสแกน QR Code จะเห็นหน้านี้ทันที
            </h3>
            <p className="font-prompt text-xs text-[#475569]">
              จำลองหน้าเว็บ Portfolio ดิจิทัล ที่คุณสามารถเปลี่ยนรูปและข้อความผ่าน Google Sheets ของตัวเองได้ง่ายๆ
            </p>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-[#FAF8F5] p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-[#E2E8F0] pb-6">
              <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-pink-500 to-purple-600 flex items-center justify-center text-3xl shadow-sm">
                🎓
              </div>
              <div className="text-center sm:text-left space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h4 className="font-prompt text-xl font-extrabold text-[#0F172A]">นายกิตติคุณ นวัตกรรม (น้องคิง)</h4>
                  <span className="text-[11px] font-prompt font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    ม.6 สายวิทย์-คอม
                  </span>
                </div>
                <p className="font-prompt text-xs text-[#DB2777] font-semibold">
                  เป้าหมาย: คณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์และ AI
                </p>
                <p className="font-prompt text-xs text-[#64748B]">
                  โรงเรียนตัวอย่างวิทยา • GPAX: 3.89 • กิจกรรมดีเด่นระดับชาติ
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] text-center space-y-1">
                <span className="text-xs font-prompt text-[#64748B]">🏆 ผลงาน &amp; รางวัล</span>
                <p className="font-prompt text-sm font-bold text-[#0E7490]">12 เกียรติบัตร</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] text-center space-y-1">
                <span className="text-xs font-prompt text-[#64748B]">🚀 โครงงานที่พัฒนา</span>
                <p className="font-prompt text-sm font-bold text-[#DB2777]">3 AI Projects</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] text-center space-y-1">
                <span className="text-xs font-prompt text-[#64748B]">📱 วิดีโอแนะนำตัว</span>
                <p className="font-prompt text-sm font-bold text-[#D97706]">YouTube 4K HD</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-prompt text-[#64748B] pt-2 border-t border-[#E2E8F0]">
              <span>⚡ แก้ไขข้อมูลสดผ่าน Google Sheets ไม่ต้องเขียนโค้ด</span>
              <span className="text-[#DB2777] font-bold">STU01 (129 ฿)</span>
            </div>
          </div>
        </div>

        {/* --- STUDENT PROMPT TESTER --- */}
        <div className="rounded-3xl p-8 sm:p-10 border border-[#FDE68A] bg-white shadow-sm max-w-4xl mx-auto mb-20 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[#92400E] font-prompt text-sm font-bold">
              <Bot className="w-5 h-5 text-[#D97706]" />
              <span>ตัวอย่าง Prompt ในชุดคัมภีร์ AI Secret Kit (STU03)</span>
            </div>
            <button
              onClick={handleCopyPrompt}
              className="px-3.5 py-1.5 rounded-xl bg-[#FEF9EF] hover:bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] font-prompt text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? "คัดลอกสำเร็จ!" : "ก๊อปปี้ไปลองใช้"}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2E8F0] font-mono text-xs text-[#1E293B] leading-relaxed">
            {samplePrompt}
          </div>
          <p className="text-xs font-prompt text-[#64748B]">
            💡 ในคัมภีร์ฉบับเต็มมี Prompt พร้อมใช้กว่า 20 หมวดหมู่ (รายงาน, สไลด์ Canva, สรุปสอบ, ออกแบบโครงงาน) ราคาเพียง 69 ฿
          </p>
        </div>

        {/* --- STUDENT FAQ ACCORDION --- */}
        <div className="rounded-3xl p-8 sm:p-12 border border-[#E2E8F0] bg-white shadow-sm max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-prompt text-2xl font-extrabold text-[#0F172A]">
              คำถามที่น้องๆ ถามบ่อย (Student FAQ)
            </h3>
            <p className="font-prompt text-xs text-[#64748B]">
              ทุกข้อสงสัยเกี่ยวกับการสั่งซื้อ การติดตั้ง และการใช้งาน
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "1. ไม่เคยเขียนโค้ดมาก่อนเลย จะทำเว็บ Portfolio เองได้ไหม?",
                a: "ทำได้แน่นอน 100% ครับ! น้องแค่กรอกชื่อ รูปผลงาน และเกียรติบัตรลงใน Google Sheets ของตัวเอง เว็บจะสร้างหน้า 3D ให้อัตโนมัติใน 1 นาที พร้อม QR Code ไปแปะหน้าปกพอร์ตได้ทันที มีคลิปสอน 2 นาทีให้ดูด้วยครับ"
              },
              {
                q: "2. สั่งซื้อแล้วชำระเงินทางไหนได้บ้าง?",
                a: "ชำระเงินผ่าน PromptPay QR Code หรือแอปธนาคารใดก็ได้ครับ หลังจากโอนเงินระบบจะอนุมัติและส่งมอบไฟล์ทันที"
              },
              {
                q: "3. ระบบเช็คการบ้านห้อง (290 ฿) ใช้ได้กี่คน?",
                a: "ซื้อครั้งเดียวใช้ได้ทั้งห้องตลอดปีการศึกษาเลยครับ! สามารถแชร์ลิงก์ให้เพื่อนในห้อง 40 คนเปิดดูการบ้านบนมือถือได้ทุกคน ตกคนละ 7 บาทเท่านั้น"
              }
            ].map((faq, fIdx) => (
              <div key={fIdx} className="rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] p-5 space-y-2">
                <h4 className="font-prompt text-sm font-bold text-[#0F172A] flex items-center gap-2">
                  <span className="text-[#DB2777]">💡</span> {faq.q}
                </h4>
                <p className="font-prompt text-xs text-[#475569] leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7-PILLARS STUDENT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0F172A]/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-slate-950 border border-pink-500/30 rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-8 shadow-2xl"
            >
              <div className="sticky top-0 z-50 flex items-center justify-between pb-3 bg-slate-950/90 backdrop-blur-sm border-b border-white/10 mb-6">
                <span className="text-xs sm:text-sm font-bold text-pink-300">
                  [{selectedProd.code}] เจาะลึก 7 องค์ประกอบหลัก • {selectedProd.title}
                </span>
                <button
                  onClick={() => setSelectedProd(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  ✕ ปิดหน้าต่าง
                </button>
              </div>

              <StudentDetailSection
                product={selectedProd}
                onClose={() => setSelectedProd(null)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

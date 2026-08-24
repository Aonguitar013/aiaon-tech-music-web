"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, GraduationCap, CheckCircle2, ArrowRight,
  MessageCircle, QrCode, BookOpen, Clock, Zap, Bot,
  Award, FileText, Share2, Star, Users, ExternalLink,
  Laptop, Check, Copy, Flame, Gift
} from "lucide-react";
import Link from "next/link";

interface StudentProduct {
  id: string;
  code: string;
  badge: string;
  badgeColor: string;
  title: string;
  tagline: string;
  price: number;
  originalPrice: number;
  perPersonNote?: string;
  borderGlow: string;
  btnGradient: string;
  description: string;
  features: string[];
  lineOrderMsg: string;
}

const STUDENT_PRODUCTS: StudentProduct[] = [
  {
    id: "web-portfolio-tcas",
    code: "STU01",
    badge: "🔥 ฮิตสุดสำหรับ ม.ปลาย ยื่น TCAS รอบ 1",
    badgeColor: "text-pink-300 border-pink-500/30 bg-pink-500/10",
    title: "เว็บ Portfolio ดิจิทัล TCAS 3D",
    tagline: "หน้าเว็บโปรไฟล์ส่วนตัวสุดเท่ แปะ QR Code หน้าปกพอร์ต",
    price: 129,
    originalPrice: 290,
    borderGlow: "border-pink-500/40 hover:border-pink-400 hover:shadow-[0_0_35px_rgba(236,72,153,0.3)]",
    btnGradient: "from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-400 hover:to-cyan-400",
    description: "เปลี่ยนพอร์ตธรรมดาให้กลายเป็นหน้าเว็บ Interactive สไตล์ Cyberpunk แสดงผลงาน เกียรติบัตร และวิดีโอคลิป แก้ข้อมูลผ่าน Google Sheets ของตัวเองได้ทันทีใน 1 นาที",
    features: [
      "มี QR Code ประจำตัว นำไปแปะหน้าปกพอร์ตโฟลิโอ TCAS รอบ 1 ได้เลย",
      "หมวดแสดงผลงาน (Activities) + รางวัลเกียรติบัตร (Certificates Showcase)",
      "หมวดคลิปวิดีโอแสดงทักษะ (Skill Demo / Music / Project)",
      "แก้ไขข้อมูลและรูปภาพใน Google Sheets ของตัวเองได้ตลอดชีพ",
      "มีคู่มือสอนเปิดใช้งานภายใน 2 นาที (ไม่ต้องมีความรู้โค้ดก็ทำได้)",
    ],
    lineOrderMsg: "สวัสดีครับครูอ้น สนใจสั่งซื้อ 'เว็บ Portfolio TCAS 3D (129 บาท)' ครับ รบกวนขอข้อมูลชำระเงินและไฟล์ระบบด้วยครับ 🙏",
  },
  {
    id: "homework-tracker-hub",
    code: "STU02",
    badge: "👥 ซื้อครั้งเดียวใช้ได้ทั้งห้อง (หารคนละ 7 ฿)",
    badgeColor: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
    title: "ระบบเช็คการบ้าน & งานค้างประจำห้อง",
    tagline: "Classroom Homework Hub ศูนย์รวมงานทุกวิชาบนมือถือ",
    price: 290,
    originalPrice: 590,
    perPersonNote: "หารกัน 40 คนในห้อง ตกคนละ 7 บาทเท่านั้น!",
    borderGlow: "border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.3)]",
    btnGradient: "from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500",
    description: "เว็บแอปประจำห้องเรียน ให้หัวหน้าห้องหรือตัวแทนคอยอัปเดตงาน เพื่อนทุกคนเปิดดูบนมือถือได้ตลอด 24 ชม. มีเวลานับถอยหลัง (Countdown) เตือนก่อนถึงวันส่ง",
    features: [
      "แสดงรายการการบ้านแยกตามรายวิชา และครูผู้สอน",
      "ระบบนับถอยหลังวันส่ง (Countdown Timer) เตือนงานด่วน",
      "แปะลิงก์ Google Form หรือ Google Drive สำหรับส่งงานได้ในตัว",
      "เพื่อนในห้องทุกคนเปิดดูได้ผ่านมือถือ ไม่ต้องโหลดแอปเพิ่ม",
      "สิทธิ์ใช้งานถาวรประจำห้องเรียนตลอดปีการศึกษา",
    ],
    lineOrderMsg: "สวัสดีครับครูอ้น สนใจสั่งซื้อ 'ระบบเช็คการบ้านประจำห้อง (290 บาท)' ครับ รบกวนขอข้อมูลชำระเงินและไฟล์ระบบด้วยครับ 🙏",
  },
  {
    id: "student-ai-secret-kit",
    code: "STU03",
    badge: "⚡ ราคาเท่าชานมไข่มุก 1 แก้ว",
    badgeColor: "text-amber-300 border-amber-500/30 bg-amber-500/10",
    title: "คัมภีร์ AI Prompts ลับสำหรับนักเรียน",
    tagline: "Student AI Secret Kit เสกรายงาน & สไลด์ Canva ใน 3 นาที",
    price: 69,
    originalPrice: 159,
    borderGlow: "border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_35px_rgba(245,158,11,0.3)]",
    btnGradient: "from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500",
    description: "รวมชุดคำสั่ง AI Prompts ภาษาไทยแบบพร้อมใช้ ช่วยทำการบ้าน เสกโครงร่างรายงาน 5 บท สรุปเนื้อหาเตรียมสอบ และสร้างเนื้อหาสไลด์พรีเซนต์ Canva ใน 3 นาที",
    features: [
      "Prompt เสกโครงร่างรายงาน 5 บท + บทนำ + แหล่งอ้างอิง",
      "Prompt สรุปบทเรียนเป็นตารางเปรียบเทียบ & ข้อสอบกากบาทเตรียมสอบ",
      "Prompt เจนเนื้อหาสไลด์ Canva 10 หน้าใน 1 นาที (พร้อมใช้ Bulk Create)",
      "Prompt ช่วยคิดไอเดียโครงงานวิทยาศาสตร์ / โครงงานนวัตกรรม",
      "ก๊อปปี้ไปวางใน ChatGPT / Gemini ใช้งานได้ทันที 100%",
    ],
    lineOrderMsg: "สวัสดีครับครูอ้น สนใจสั่งซื้อ 'คัมภีร์ AI Prompts สำหรับนักเรียน (69 บาท)' ครับ รบกวนขอข้อมูลชำระเงินและไฟล์ระบบด้วยครับ 🙏",
  },
];

export function StudentVaultView() {
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  const samplePrompt = "จงเป็นผู้เชี่ยวชาญด้าน [วิชา...] ช่วยเขียนโครงร่างรายงานเรื่อง [หัวข้อ...] แบ่งเป็น 5 บท พร้อมแนวคิดบทนำ ประเด็นสำคัญ และรายการอ้างอิง";

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(samplePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-white overflow-hidden relative pb-28">
      
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-pink-600/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cyan-600/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 relative z-10">
        
        {/* --- HERO HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 font-prompt text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(236,72,153,0.2)]"
          >
            <Flame className="w-4 h-4 text-pink-400 animate-pulse" />
            <span>STUDENT VAULT — คลังไอเทมตัวช่วยเรียนสำหรับนักเรียน Gen Z</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-prompt text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            เสกงานเรียนให้เป็นเรื่องง่าย{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-400 to-cyan-300 drop-shadow-[0_0_30px_rgba(236,72,153,0.4)]">
              สไตล์เด็กยุคใหม่
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-prompt text-lg text-white/70 leading-relaxed"
          >
            รวมระบบเว็บ Portfolio TCAS 3D, ระบบเช็คการบ้านประจำห้อง และคัมภีร์ AI Prompts ราคาเบาๆ สบายกระเป๋า ใช้งานง่ายบนมือถือ
          </motion.p>

          {/* Quick Freebie Banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 p-3 px-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-prompt text-xs sm:text-sm font-semibold shadow-[0_0_25px_rgba(16,185,129,0.2)]"
          >
            <Gift className="w-4 h-4 text-emerald-400 shrink-0 animate-bounce" />
            <span>🎁 สมาชิกทุกคนรับฟรี: ระบบฝึกจำคำศัพท์ &amp; จำหน้า 3D Flashcard</span>
            <Link href="/digital-vault" className="text-white underline hover:text-emerald-200 transition-colors">
              กดรับฟรีที่นี่ →
            </Link>
          </motion.div>
        </div>

        {/* --- STUDENT PRODUCTS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {STUDENT_PRODUCTS.map((prod, idx) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-3xl p-8 bg-slate-900/70 border flex flex-col justify-between transition-all duration-300 ${prod.borderGlow}`}
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-prompt font-semibold border ${prod.badgeColor}`}>
                    {prod.badge}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-white/60">
                    {prod.code}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-prompt text-2xl font-extrabold text-white mb-2">
                  {prod.title}
                </h3>
                <p className="font-prompt text-xs text-white/60 mb-6 leading-relaxed">
                  {prod.tagline}
                </p>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-prompt text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-white to-pink-200">
                      {prod.price} ฿
                    </span>
                    <span className="font-prompt text-base text-white/40 line-through">
                      {prod.originalPrice} ฿
                    </span>
                    <span className="text-[11px] font-prompt text-pink-300 ml-auto bg-pink-500/10 px-2 py-1 rounded-lg border border-pink-500/20">
                      จ่ายครั้งเดียวตลอดชีพ
                    </span>
                  </div>
                  {prod.perPersonNote && (
                    <p className="text-xs font-prompt text-cyan-300 mt-2 font-medium">
                      💡 {prod.perPersonNote}
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="font-prompt text-xs text-white/70 leading-relaxed mb-6">
                  {prod.description}
                </p>

                {/* Features List */}
                <div className="space-y-2.5 mb-8 border-t border-white/10 pt-4">
                  <h4 className="font-prompt text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                    สิ่งที่คุณจะได้รับ:
                  </h4>
                  {prod.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs font-prompt text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Button */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <a
                  href={`https://line.me/R/oaMessage/@deu6776s/?${encodeURIComponent(prod.lineOrderMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 px-6 rounded-2xl text-white font-prompt font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] shadow-lg cursor-pointer bg-linear-to-r ${prod.btnGradient}`}
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>สั่งซื้อผ่าน LINE OA ({prod.price} ฿)</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- ALL-IN-ONE STUDENT SUPER PACK --- */}
        <div className="rounded-3xl p-8 sm:p-12 border border-purple-500/50 bg-linear-to-br from-purple-950/40 via-slate-900 to-pink-950/40 max-w-4xl mx-auto mb-20 relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.25)]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/15 blur-[120px] rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-prompt font-bold">
                <Star className="w-3.5 h-3.5 fill-purple-300" />
                <span>STUDENT ALL-IN-ONE SUPER PACK (เหมาหมด 3 ไอเทม)</span>
              </div>
              <h3 className="font-prompt text-2xl sm:text-4xl font-extrabold text-white">
                เหมาครบ 3 ไอเทม เพียง{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-300 via-pink-300 to-amber-200">
                  390 ฿
                </span>{" "}
                <span className="text-lg text-white/40 line-through font-normal">(จากปกติ 488 ฿)</span>
              </h3>
              <p className="font-prompt text-sm text-white/70 leading-relaxed">
                ได้ทั้ง **เว็บ Portfolio TCAS 3D + ระบบเช็คการบ้านห้อง + คัมภีร์ AI Prompts** ครบจบในแพ็กเกจเดียว พร้อมสิทธิ์อัปเดตฟรีตลอดการเรียน!
              </p>
            </div>

            <a
              href="https://line.me/R/oaMessage/@deu6776s/?สวัสดีครับครูอ้น สนใจสั่งซื้อ 'Student All-in-One Super Pack (390 บาท)' ได้ครบทั้ง 3 ระบบครับ รบกวนขอข้อมูลชำระเงินด้วยครับ 🙏"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-5 rounded-2xl bg-linear-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-prompt font-extrabold text-base flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(236,72,153,0.4)] transition-all hover:scale-105 shrink-0 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 fill-white" />
              <span>สั่งซื้อ Super Pack 390 ฿</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* --- INTERACTIVE TCAS 3D PORTFOLIO DEMO SIMULATOR --- */}
        <div className="rounded-3xl p-8 sm:p-12 border border-pink-500/30 bg-slate-900/60 max-w-4xl mx-auto mb-20 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-prompt font-bold text-pink-400 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
              🎮 LIVE SIMULATOR — ตัวอย่างหน้าเว็บ Portfolio 3D
            </span>
            <h3 className="font-prompt text-2xl sm:text-3xl font-extrabold text-white">
              เมื่อกรรมการสแกน QR Code จะเห็นหน้านี้ทันที
            </h3>
            <p className="font-prompt text-xs text-white/60">
              จำลองหน้าเว็บ Portfolio ดิจิทัล ที่คุณสามารถเปลี่ยนรูปและข้อความผ่าน Google Sheets ของตัวเองได้ง่ายๆ
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/60 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-white/10 pb-6">
              <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-pink-500 to-purple-600 flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(236,72,153,0.4)]">
                🎓
              </div>
              <div className="text-center sm:text-left space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h4 className="font-prompt text-xl font-extrabold text-white">นายกิตติคุณ นวัตกรรม (น้องคิง)</h4>
                  <span className="text-[10px] font-prompt bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    ม.6 สายวิทย์-คอม
                  </span>
                </div>
                <p className="font-prompt text-xs text-pink-300 font-semibold">
                  เป้าหมาย: คณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์และ AI
                </p>
                <p className="font-prompt text-xs text-white/50">
                  โรงเรียนตัวอย่างวิทยา • GPAX: 3.89 • กิจกรรมดีเด่นระดับชาติ
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center space-y-1">
                <span className="text-xs font-prompt text-white/50">🏆 ผลงาน &amp; รางวัล</span>
                <p className="font-prompt text-sm font-bold text-cyan-300">12 เกียรติบัตร</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center space-y-1">
                <span className="text-xs font-prompt text-white/50">🚀 โครงงานที่พัฒนา</span>
                <p className="font-prompt text-sm font-bold text-pink-300">3 AI Projects</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center space-y-1">
                <span className="text-xs font-prompt text-white/50">📱 วิดีโอแนะนำตัว</span>
                <p className="font-prompt text-sm font-bold text-amber-300">YouTube 4K HD</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-prompt text-white/50 pt-2 border-t border-white/10">
              <span>⚡ แก้ไขข้อมูลสดผ่าน Google Sheets ไม่ต้องเขียนโค้ด</span>
              <span className="text-pink-300 font-bold">STU01 (129 ฿)</span>
            </div>
          </div>
        </div>

        {/* --- STUDENT PROMPT TESTER --- */}
        <div className="rounded-3xl p-8 sm:p-10 border border-amber-500/30 bg-slate-900/50 max-w-4xl mx-auto mb-20 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-300 font-prompt text-sm font-bold">
              <Bot className="w-5 h-5" />
              <span>ตัวอย่าง Prompt ในชุดคัมภีร์ AI Secret Kit (STU03)</span>
            </div>
            <button
              onClick={handleCopyPrompt}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 font-prompt text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? "คัดลอกสำเร็จ!" : "ก๊อปปี้ไปลองใช้"}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs text-white/80 leading-relaxed">
            {samplePrompt}
          </div>
          <p className="text-xs font-prompt text-white/50">
            💡 ในคัมภีร์ฉบับเต็มมี Prompt พร้อมใช้กว่า 20 หมวดหมู่ (รายงาน, สไลด์ Canva, สรุปสอบ, ออกแบบโครงงาน) ราคาเพียง 69 ฿
          </p>
        </div>

        {/* --- STUDENT FAQ ACCORDION --- */}
        <div className="rounded-3xl p-8 sm:p-12 border border-white/10 bg-slate-900/40 max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-prompt text-2xl font-extrabold text-white">
              คำถามที่น้องๆ ถามบ่อย (Student FAQ)
            </h3>
            <p className="font-prompt text-xs text-white/60">
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
              <div key={fIdx} className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-2">
                <h4 className="font-prompt text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-pink-400">💡</span> {faq.q}
                </h4>
                <p className="font-prompt text-xs text-white/70 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

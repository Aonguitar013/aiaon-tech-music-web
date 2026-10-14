"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Bell, FileText, 
  ChevronDown, MessageSquare, ArrowRight, Zap, CheckCircle2, 
  ShieldCheck, Play, Volume2, VolumeX, Music, 
  Heart, Coffee, Laptop, Award, } from "lucide-react";

interface Student {
  id: number;
  name: string;
  avatar: string;
  avatarBg: string;
  no: number;
  status: "none" | "present" | "late" | "leave" | "absent";
}

interface LineMessage {
  id: string;
  title: string;
  body: string;
  time: string;
}

export function SaaSView() {
  // Audio state
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Interactive Simulator State
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "ด.ช. กานต์ วงศ์ดี", avatar: "ก", avatarBg: "from-blue-500 to-indigo-600", no: 1, status: "none" },
    { id: 2, name: "ด.ญ. แพรวา รักเรียน", avatar: "พ", avatarBg: "from-pink-500 to-rose-600", no: 2, status: "none" },
    { id: 3, name: "ด.ช. ภูมินทร์ ใจใส", avatar: "ภ", avatarBg: "from-teal-500 to-emerald-600", no: 3, status: "none" }
  ]);

  const [messages, setMessages] = useState<LineMessage[]>([
    {
      id: "welcome",
      title: "AiAon Tech Bot",
      body: "🔔 ยินดีต้อนรับสู่ระบบ 'iAon IT ง่ายๆ'! ลองกดปุ่มเช็คชื่อนักเรียนทางซ้ายดูครับ ระบบจะยิง LINE แจ้งเตือนผู้ปกครองอัตโนมัติทันที!",
      time: "07:30"
    }
  ]);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "ทำไมครูดนตรีถึงลุกขึ้นมาเขียนระบบอัตโนมัติ?",
      a: "เพราะผมเป็นครูดนตรีที่ขี้เกียจทำงานเอกสารซ้ำซากครับ! ผมอยากเอาเวลาไปจับกีตาร์ ซ้อมวงดนตรีกับเด็กๆ และเตรียมสื่อสอนดีๆ มากกว่าต้องมานั่งกรอกคะแนนและพิมพ์รายงานทีละคน ผมเลยสร้างระบบให้คอมพิวเตอร์ทำงานเอกสารแทน 100% ครับ"
    },
    {
      q: "ไม่มีความรู้เรื่องเขียนโปรแกรมเลย จะใช้งานได้ไหม?",
      a: "ใช้งานได้สบายมากครับ 100% เพราะระบบรันบน Google Sheets ที่ทุกคนคุ้นเคยอยู่แล้ว มีคู่มือสอนคลิกตามทีละสเต็ป 3 นาทีจบ ไม่ต้องพิมพ์โค้ดเองแม้แต่บรรทัดเดียวครับ"
    },
    {
      q: "ข้อมูลนักเรียนและโรงเรียนจะปลอดภัยไหม มีรายเดือนหรือเปล่า?",
      a: "ปลอดภัยที่สุดครับ เพราะระบบทั้งหมดรันบนบัญชี Google Workspace ของโรงเรียนหรือของครูเอง ข้อมูลไม่ผ่านเซิร์ฟเวอร์คนอื่น และจ่ายครั้งเดียวใช้ได้ตลอดชีพ ไม่มีค่าบริการรายเดือนสักบาทเดียวครับ"
    },
    {
      q: "ถ้าอยากได้ระบบเฉพาะทางของโรงเรียนตัวเอง ครูอ้นรับทำให้ไหม?",
      a: "รับทำครับ! สามารถส่งแบบฟอร์มเดิมของโรงเรียนมาให้ผมช่วยออกแบบและปรับแต่งให้กลายเป็น Web App อัตโนมัติ พร้อมแจ้งเตือน LINE ได้เลยที่หน้า Services ครับ"
    }
  ];

  // Web audio beep effect
  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Audio fallback
    }
  };

  const handleStatusChange = (id: number, status: "present" | "late" | "leave" | "absent") => {
    playBeep();

    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );

    const student = students.find((s) => s.id === id);
    if (!student) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    let statusLabel = "";
    if (status === "present") statusLabel = "มาเรียนตรงเวลา (10/10 คะแนน)";
    if (status === "late") statusLabel = "มาสาย (บันทึกเวลา 08:15 น.)";
    if (status === "leave") statusLabel = "ขอลา (มีใบลา/แจ้งผู้ปกครอง)";
    if (status === "absent") statusLabel = "ขาดเรียน (แจ้งเตือนด่วน!)";

    const newMsg: LineMessage = {
      id: crypto.randomUUID(),
      title: "ระบบเช็คชื่ออัตโนมัติ",
      body: `📢 [แจ้งเตือนผู้ปกครอง]\nนักเรียน: ${student.name} (เลขที่ ${student.no})\nสถานะ: ${statusLabel}\nบันทึกเมื่อ: ${timeStr} น. ซิงค์ลง Google Sheets สำเร็จ!`,
      time: timeStr,
    };

    setMessages((prev) => [newMsg, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-white overflow-hidden relative pb-24">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-cyan-600/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* --- 1. HERO SECTION: THE MUSIC TEACHER & AUTOMATION STORY --- */}
      <section className="max-w-7xl mx-auto pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Tag Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-prompt text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            >
              <Music className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>เรื่องราวของ &quot;ครูดนตรี&quot; ผู้หลงใหลในระบบออโตเมชัน</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-prompt text-4xl sm:text-6xl font-black leading-[1.12] tracking-tight text-white"
            >
              iAon <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">IT ง่ายๆ</span> <br />
              <span className="text-2xl sm:text-4xl font-normal text-white/80">
                เมื่อ &quot;คนขี้เกียจทำงานเอกสาร&quot; เสกโค้ดให้คอมทำงานแทน!
              </span>
            </motion.h1>

            {/* Description / Story */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-prompt text-base sm:text-lg font-light text-white/75 max-w-2xl leading-relaxed"
            >
              &quot;ผมเป็นครูดนตรีที่ชอบเทคโนโลยี... แต่ <strong className="text-cyan-300">ผมขี้เกียจทำงานเอกสารซ้ำซากมากๆ!</strong> ผมเชื่อว่าคอมพิวเตอร์เกิดมาเพื่อทำงานแทนมนุษย์ ถ้างานไหนต้องทำซ้ำเกิน 2 ครั้ง ผมจะเขียนโค้ดให้มันทำงานเองทันที!&quot;
            </motion.p>

            {/* Philosophy quote */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 font-prompt text-xs sm:text-sm text-white/80 flex items-start gap-3"
            >
              <Coffee className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>ปรัชญาไอ้อ้น:</strong> ประหยัดเวลาเอกสารวันละ 2 ชั่วโมง เอาเวลาไปจับคอร์ดกีตาร์ ซ้อมดนตรี และกลับบ้านไปใช้ชีวิตกับครอบครัวตรงเวลาครับ ☕🎸
              </span>
            </motion.div>

            {/* Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <a href="#demo">
                <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 font-prompt font-bold text-white shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105">
                  <Play className="w-4 h-4 fill-white text-white" />
                  <span>ทดลองกดเล่น Simulator สด</span>
                </button>
              </a>

              <Link href="/digital-vault">
                <button className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-white/15 hover:border-white/30 hover:bg-white/5 font-prompt font-semibold text-white transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <span>📦 ดูคลัง 20 ระบบสำเร็จรูป</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>

            {/* Trust badge */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-4 border-t border-white/5 flex flex-wrap gap-x-6 gap-y-2 text-white/50 font-prompt text-xs"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                บันทึกผล &amp; แจ้งเตือน LINE ใน 2 วินาที
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                รันบน Google Sheets ตัวเอง 100% ปลอดภัย ไร้รายเดือน
              </span>
            </motion.div>
          </div>

          {/* Right: Creator Persona Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative w-full aspect-square max-w-[420px] mx-auto"
          >
            <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/20 to-purple-500/20 blur-[90px] rounded-full pointer-events-none" />
            
            <div className="relative rounded-3xl border border-cyan-500/40 p-6 bg-slate-950/80 shadow-[0_0_50px_rgba(6,182,212,0.2)] space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-cyan-500 to-purple-600 p-0.5">
                    <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center font-prompt font-black text-cyan-300 text-lg">
                      iAon
                    </div>
                  </div>
                  <div>
                    <h3 className="font-prompt font-bold text-white text-base">ครูอ้น (จิรวัฒน์ เดชเส้ง)</h3>
                    <p className="text-xs text-white/50 font-prompt">ครู ค.ศ.2 (ชำนาญการ) โรงเรียนหาดใหญ่วิทยาลัย</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[10px] font-prompt font-bold">
                  🎸 Music × AI
                </span>
              </div>

              <div className="space-y-3 font-prompt text-xs text-white/80">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                  <Music className="w-5 h-5 text-pink-400 shrink-0" />
                  <span><strong>วิชาเอก:</strong> ดนตรีสากล &amp; วงโยธวาทิต</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                  <Laptop className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span><strong>ความหลงใหล:</strong> Google Apps Script, Python, n8n, Web App</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                  <Heart className="w-5 h-5 text-amber-400 shrink-0" />
                  <span><strong>เป้าหมาย:</strong> ช่วยครูไทยเลิกงานตรงเวลา &amp; เด็กไทยเรียนสนุก</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-center font-prompt text-xs text-cyan-300">
                ⚡ พัฒนาระบบจริงมาแล้วกว่า 30+ ระบบ ให้สถานศึกษาทั่วประเทศ
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- 2. INTERACTIVE SIMULATOR SECTION --- */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5" id="demo">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-prompt font-semibold">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>LIVE INTERACTIVE SIMULATOR</span>
          </div>
          <h2 className="font-prompt text-3xl sm:text-5xl font-black tracking-tight text-white">
            สัมผัสความง่ายของ <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">ระบบเช็คชื่อ &amp; แจ้งเตือน LINE</span>
          </h2>
          <p className="font-prompt font-light text-white/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            ลองคลิกปุ่มบันทึกสถานะนักเรียนบนแท็บเล็ตของคุณครู (ด้านซ้าย) แล้วฟังเสียง Beep! สังเกตข้อความ LINE Notify เด้งขึ้นบนมือถือ (ด้านขวา)
          </p>
          
          {/* Sound toggle button */}
          <button 
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 transition-all text-xs font-prompt cursor-pointer"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>เปิดเสียงเอฟเฟกต์แล้ว (Web Audio)</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-white/40" />
                <span>ปิดเสียงอยู่ (คลิกเพื่อเปิด)</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Left panel: Teacher's Tablet */}
          <div className="lg:col-span-7 flex flex-col glass-card border border-white/10 bg-slate-950/80 rounded-3xl overflow-hidden shadow-2xl relative p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)] animate-pulse"></div>
                <h3 className="font-prompt text-base sm:text-lg font-bold text-white">
                  หน้าจอเช็คชื่อของครู (บนมือถือ/แท็บเล็ต)
                </h3>
              </div>
              <span className="font-prompt text-[11px] text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                ม.3/1 (วิชาดนตรีสากล)
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {students.map((student) => (
                <div 
                  key={student.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${student.avatarBg} flex items-center justify-center font-prompt font-bold text-white shadow-md`}>
                      {student.avatar}
                    </div>
                    <div className="font-prompt">
                      <p className="text-sm font-bold text-white flex items-center gap-2">
                        {student.name}
                        {student.status !== "none" && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            ✓ เช็คแล้ว
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-white/40">เลขที่ {student.no} | รหัส 1024{student.id}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 self-end sm:self-center font-prompt text-xs">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, "present")}
                      className={`px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                        student.status === "present"
                          ? "bg-emerald-500/25 border-emerald-500 text-emerald-300 font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                          : "bg-white/5 border-white/10 text-white/70 hover:border-emerald-500/40"
                      }`}
                    >
                      <span>✓ มาเรียน</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, "late")}
                      className={`px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                        student.status === "late"
                          ? "bg-amber-500/25 border-amber-500 text-amber-300 font-bold shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                          : "bg-white/5 border-white/10 text-white/70 hover:border-amber-500/40"
                      }`}
                    >
                      <span>⏳ สาย</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, "leave")}
                      className={`px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                        student.status === "leave"
                          ? "bg-blue-500/25 border-blue-500 text-blue-300 font-bold shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                          : "bg-white/5 border-white/10 text-white/70 hover:border-blue-500/40"
                      }`}
                    >
                      <span>🏥 ลา</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-prompt text-white/40 border-t border-white/5">
              <span>💡 คลิกเลือกสถานะเพื่อดูการแจ้งเตือนสด</span>
              <button
                type="button"
                onClick={() => {
                  setStudents(students.map((s) => ({ ...s, status: "none" })));
                  setMessages([{
                    id: "reset",
                    title: "ระบบ",
                    body: "🔔 ล้างข้อมูลจำลองเรียบร้อยแล้ว ลองกดเช็คชื่อนักเรียนได้ใหม่เลยครับ!",
                    time: "รีเซ็ต"
                  }]);
                }}
                className="text-cyan-400 hover:underline cursor-pointer"
              >
                ล้างข้อมูล &amp; รีเซ็ต
              </button>
            </div>
          </div>

          {/* Right panel: Phone LINE simulation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] aspect-[9/18.5] bg-[#111] rounded-[42px] p-3 shadow-2xl border-4 border-[#333] flex flex-col overflow-hidden">
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-40 flex items-end justify-center pb-1">
                <div className="w-12 h-1 bg-[#222] rounded-full mb-0.5"></div>
              </div>

              <div className="w-full h-full rounded-[32px] bg-[#1a1b1d] overflow-hidden flex flex-col relative z-20">
                
                <div className="bg-[#242528] pt-6 pb-3.5 px-4 border-b border-black/20 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#00c300] flex items-center justify-center shadow-md relative shrink-0">
                      <MessageSquare className="w-4.5 h-4.5 text-white" />
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-rose-600 rounded-full"></span>
                    </div>
                    <div className="font-prompt text-left">
                      <p className="text-sm font-semibold text-white leading-tight">LINE Notify</p>
                      <p className="text-[10px] text-white/50">แจ้งเตือนผู้ปกครองอัตโนมัติ</p>
                    </div>
                  </div>
                  <span className="text-[9px] text-[#00c300] font-bold border border-[#00c300]/40 px-2 py-0.5 rounded-full bg-[#00c300]/10 select-none">
                    ONLINE
                  </span>
                </div>

                <div className="flex-1 p-3 overflow-y-auto space-y-3 flex flex-col-reverse relative scrollbar-none">
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-start gap-2 max-w-[95%]"
                      >
                        <div className="w-7 h-7 rounded-full bg-[#00c300] flex items-center justify-center text-[10px] text-white font-bold shrink-0 mt-0.5 shadow-sm">
                          LN
                        </div>
                        
                        <div className="flex items-end gap-1.5">
                          <div className="bg-[#2a2c30] border border-white/5 text-white/95 px-3 py-2.5 rounded-2xl rounded-tl-none font-prompt text-xs leading-relaxed text-left whitespace-pre-wrap shadow-md">
                            {msg.body}
                          </div>
                          
                          <span className="text-[8px] text-white/30 shrink-0 select-none pb-0.5">
                            {msg.time}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <div className="text-center py-2 text-[9px] text-white/20 font-prompt">
                    -- ฟีดการแจ้งเตือนแบบ Real-time --
                  </div>
                </div>

                <div className="bg-[#242528] p-2.5 border-t border-black/20 text-center text-[10px] text-white/40 font-prompt">
                  🔒 ข้อมูลส่งตรงจาก Google Apps Script
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- 3. THE 4 PILLARS OF PRODUCTIVITY --- */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5">
        <div className="text-center mb-12 space-y-3">
          <h2 className="font-prompt text-3xl sm:text-4xl font-extrabold text-white">
            ทำไมระบบออโตเมชันถึงเปลี่ยนชีวิตครู?
          </h2>
          <p className="font-prompt font-light text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
            นี่คือ 4 เหตุผลที่ทำให้ครูทั่วประเทศหันมาใช้ระบบ Google Apps Script สไตล์ไอ้อ้น
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "1. เลิกงานตรงเวลา",
              desc: "หมดเวลาไปกับการนั่งพิมพ์และรวมยอดตอนเย็น ระบบประมวลผลสถิติ ขาด ลา มา สาย ให้อัตโนมัติในคลิกเดียว",
              icon: Coffee,
              color: "from-amber-500 to-orange-600",
              glow: "rgba(245,158,11,0.3)"
            },
            {
              title: "2. ผู้ปกครองอุ่นใจ",
              desc: "แจ้งเตือน LINE หาผู้ปกครองทันทีเมื่อเด็กถึงห้องเรียน เพิ่มความโปร่งใสและสร้างความไว้วางใจให้โรงเรียน",
              icon: Bell,
              color: "from-green-500 to-emerald-600",
              glow: "rgba(16,185,129,0.3)"
            },
            {
              title: "3. รันบนชีตตัวเอง 100%",
              desc: "ข้อมูลเก็บอยู่ใน Google Drive ของโรงเรียนคุณเอง ปลอดภัย ไร้กังวลเรื่องข้อมูลรั่วไหล และไม่มีค่าเช่ารายเดือน",
              icon: FileText,
              color: "from-blue-500 to-cyan-600",
              glow: "rgba(6,182,212,0.3)"
            },
            {
              title: "4. นำไปเสนอ ว.PA ได้",
              desc: "ทุกระบบถูกออกแบบเป็นนวัตกรรมดิจิทัล สามารถนำไปเขียนรายงานผลการพัฒนางานตามเกณฑ์ ว.PA ได้ทันที",
              icon: Award,
              color: "from-purple-500 to-pink-600",
              glow: "rgba(168,85,247,0.3)"
            }
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-white/10 bg-slate-950/70 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${feat.color} flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-prompt text-lg font-bold text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="font-prompt text-xs text-white/60 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- 4. FAQS SECTION --- */}
      <section className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5">
        <div className="text-center mb-10 space-y-3">
          <h2 className="font-prompt text-3xl sm:text-4xl font-extrabold text-white">
            คำถามที่พบบ่อย (FAQs)
          </h2>
          <p className="font-prompt text-sm text-white/60">
            ตอบทุกข้อสงสัยเกี่ยวกับการใช้งานระบบ Google Apps Script สไตล์ไอ้อ้น
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-prompt font-bold text-sm sm:text-base flex items-center justify-between gap-4 cursor-pointer hover:text-cyan-300"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaq === idx ? "rotate-180 text-cyan-400" : "text-white/40"}`} />
              </button>
              {openFaq === idx && (
                <div className="p-5 pt-0 text-xs sm:text-sm font-prompt text-white/70 leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- 5. FINAL ACTION CTA --- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6">
        <div className="rounded-3xl p-8 sm:p-12 border border-cyan-500/40 bg-linear-to-r from-cyan-950/40 via-slate-900 to-purple-950/40 text-center relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.2)] space-y-6">
          <h2 className="font-prompt text-3xl sm:text-5xl font-black text-white">
            พร้อมเปลี่ยนงานเอกสารให้เป็น{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-purple-300 to-pink-300">
              เรื่องง่ายๆ หรือยัง?
            </span>
          </h2>
          <p className="font-prompt text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            เลือกดูคลัง 20 ระบบพร้อมใช้, ดาวน์โหลดของแจกฟรี หรือทักแชตปรึกษาครูอ้นได้ตลอดเวลาครับ
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/digital-vault"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-prompt font-bold text-base shadow-lg transition-all hover:scale-105"
            >
              <span>📦 ดูคลัง 20 ระบบพร้อมใช้</span>
            </Link>

            <a
              href="https://lin.ee/poMESoP"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-white font-prompt font-bold text-base flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-white text-white" />
              <span>ทักแชต LINE ครูอ้น (@deu6776s)</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

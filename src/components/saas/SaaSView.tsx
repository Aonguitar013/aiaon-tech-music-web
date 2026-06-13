"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  Bell, 
  Sparkles, 
  BarChart3, 
  FileText, 
  Check, 
  ChevronDown, 
  MessageSquare, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Play, 
  Volume2, 
  VolumeX,
  Plus
} from "lucide-react";

interface SaaSViewProps {
  user?: any;
}

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

function FloatingSparkles() {
  const sparkles = [
    { top: "15%", left: "12%", delay: "0s", size: 8 },
    { top: "55%", left: "85%", delay: "1.5s", size: 12 },
    { top: "35%", left: "78%", delay: "0.8s", size: 10 },
    { top: "72%", left: "20%", delay: "2.3s", size: 14 },
    { top: "10%", left: "80%", delay: "3.1s", size: 8 },
    { top: "45%", left: "8%", delay: "1.9s", size: 11 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-2xl">
      {sparkles.map((sp, idx) => (
        <svg
          key={idx}
          className="absolute animate-sparkle-float text-cyan-400/25 fill-cyan-400/25 animate-sparkle-float"
          style={{
            top: sp.top,
            left: sp.left,
            width: `${sp.size}px`,
            height: `${sp.size}px`,
            animationDelay: sp.delay,
          }}
          viewBox="0 0 24 24"
        >
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
        </svg>
      ))}
    </div>
  );
}

export function SaaSView({ user }: SaaSViewProps) {
  // Audio state
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };
  
  // Interactive Simulator State
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "ด.ช. กานต์ วงศ์ดี", avatar: "ก", avatarBg: "from-blue-500 to-indigo-600", no: 1, status: "none" },
    { id: 2, name: "ด.ญ. แพรวา รักเรียน", avatar: "พ", avatarBg: "from-pink-500 to-rose-600", no: 2, status: "none" },
    { id: 3, name: "ด.ช. ภูมินทร์ ใจใส", avatar: "ภ", avatarBg: "from-teal-500 to-emerald-600", no: 3, status: "none" }
  ]);

  const [messages, setMessages] = useState<LineMessage[]>([
    {
      id: "welcome",
      title: "LINE",
      body: "🔔 ยินดีต้อนรับสู่ระบบ iAon ClassFlow! ทดลองกดปุ่มสถานะเช็คชื่อของนักเรียนทางด้านซ้าย เพื่อดูการแจ้งเตือนสดแบบจำลองได้เลยค่ะ",
      time: "ระบบ"
    }
  ]);

  // Audio beep sound effect
  const playNotificationSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Double beep for LINE notification feel
      const playBeep = (delay: number, frequency: number, duration: number) => {
        setTimeout(() => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          
          osc.type = "sine";
          osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
          
          gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
          // Exponential decay
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
          
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          
          osc.start();
          osc.stop(audioCtx.currentTime + duration);
        }, delay);
      };
      
      playBeep(0, 587.33, 0.15); // D5
      playBeep(120, 880.00, 0.25); // A5
    } catch (e) {
      console.warn("Audio Context failed to initialize: ", e);
    }
  };

  const handleStatusChange = (studentId: number, status: Student["status"]) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, status };
      }
      return s;
    }));

    const student = students.find(s => s.id === studentId);
    if (!student) return;

    // Generate Line Message Template
    const now = new Date();
    const timeString = now.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }) + " น.";
    
    let statusText = "";
    let emoji = "";
    let statusTheme = "";

    switch(status) {
      case "present":
        statusText = "มาเรียน";
        emoji = "🏫 เข้าร่วมชั้นเรียน";
        statusTheme = "ปกติ";
        break;
      case "late":
        statusText = "เข้าเรียนสาย";
        emoji = "⚠️ สาย (กรุณาตรงต่อเวลา)";
        statusTheme = "สาย";
        break;
      case "leave":
        statusText = "ขอลา (ป่วย/ธุระ)";
        emoji = "📝 ลา (ได้รับอนุมัติแล้ว)";
        statusTheme = "ลา";
        break;
      case "absent":
        statusText = "ขาดเรียน";
        emoji = "❌ ขาดเรียน (ยังไม่พบการลงทะเบียน)";
        statusTheme = "ขาดเรียน";
        break;
    }

    const newMessage: LineMessage = {
      id: `${studentId}-${status}-${Date.now()}`,
      title: "LINE",
      body: `📢 [iAon ClassFlow]
📌 รายงานสถานะเข้าเรียนรายวัน
-------------------------------
👤 ชื่อ: ${student.name} (เลขที่ ${student.no})
⏱️ เวลา: ${timeString}
📊 สถานะ: ${statusText} ${emoji}
-------------------------------
🏫 โรงเรียนวิทยานวัตกรรมสากล`,
      time: timeString
    };

    setMessages(prev => [newMessage, ...prev].slice(0, 5));
    playNotificationSound();
  };

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "ระบบเช็คชื่อ LINE ทำงานอย่างไร ต้องติดตั้งโปรแกรมไหม?",
      a: "ไม่ต้องติดตั้งโปรแกรมใดๆ บนคอมพิวเตอร์ครับ ตัวระบบทำงานในรูปแบบ Web Application คุณครูสามารถเช็คชื่อผ่านเว็บบราวเซอร์ในมือถือ แท็บเล็ต หรือโน้ตบุ๊กได้ทันที ข้อมูลจะถูกบันทึกลงฐานข้อมูลและส่งสัญญาณ API ไปหา LINE เพื่อแจ้งกลุ่มคุณครูหรือผู้ปกครองทันที"
    },
    {
      q: "หากต้องการส่งการแจ้งเตือนเข้ากลุ่มผู้ปกครอง ต้องทำอย่างไร?",
      a: "คุณครูเพียงเชิญ LINE Bot เข้าไปในกลุ่มห้องเรียน จากนั้นคัดลอก Token สำหรับกลุ่มนั้นๆ มาวางในระบบ iAon ClassFlow เพียงเท่านี้ระบบก็จะสามารถยิงข้อมูลสรุปยอดผู้มาเรียน ขาด สาย ลา เข้าสู่กลุ่มผู้ปกครองได้แบบอัตโนมัติ"
    },
    {
      q: "ระบบสคริปต์ Google Apps Script ปลอดภัยและเสถียรแค่ไหน?",
      a: "ปลอดภัย 100% เนื่องจากรันอยู่บนเซิร์ฟเวอร์คลาวด์ของ Google ของบัญชีคุณครูเอง ข้อมูลนักเรียนทั้งหมดจะถูกเก็บอยู่ใน Google Sheets ของคุณครูโดยตรง ทำให้ไม่มีความเสี่ยงเรื่องข้อมูลรั่วไหลออกภายนอก"
    },
    {
      q: "สามารถกำหนดเทมเพลตข้อความของตัวเองได้ไหม?",
      a: "ได้แน่นอนครับ ในแพ็กเกจ Pro Teacher คุณครูสามารถเข้าไปปรับแต่งหน้าตาข้อความของ LINE ได้เองอย่างอิสระ เช่น การเพิ่มชื่อเล่นครู, การใส่ลิงก์ดูรายงานสรุปแบบภาพรวม หรือการระบุหมายเหตุพิเศษในวันนั้นๆ"
    }
  ];

  return (
    <div className="min-h-screen bg-[#070913] text-white overflow-hidden relative pb-20">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-15%] w-[50%] h-[50%] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-[30%] right-[-10%] w-[45%] h-[45%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* --- HERO SECTION --- */}
      <section className="max-w-7xl mx-auto pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Tag Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-prompt text-sm font-medium tracking-wide shadow-[0_0_15px_rgba(59,130,246,0.1)]"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>ระบบเช็คชื่อ & แจ้งเตือนผ่าน LINE อัตโนมัติ</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-prompt text-4xl sm:text-6xl font-bold leading-tight tracking-tight text-white"
            >
              iAon <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-indigo-500">ClassFlow</span> <br />
              <span className="text-2xl sm:text-4xl font-light text-white/90">ลดงานครู 80% เพิ่มความโปร่งใสสู่ผู้ปกครอง</span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-prompt text-base sm:text-xl font-light text-white/70 max-w-2xl leading-relaxed"
            >
              เช็คชื่ออัจฉริยะในชั้นเรียน ส่ง LINE รายบุคคลเข้ากลุ่มทันที พร้อมระบบเก็บข้อมูลอัตโนมัติลง Google Sheets ด้วยคีย์ฟังก์ชัน Apps Script อัจฉริยะ
            </motion.p>

            {/* Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link href={user ? "/dashboard" : "/login"}>
                <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-prompt font-semibold text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] active:scale-95 transition-all flex items-center justify-center gap-2 group">
                  <span>ทดลองใช้งานฟรี</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <a href="#demo">
                <button className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 font-prompt font-medium text-white transition-all active:scale-95 flex items-center justify-center gap-2">
                  <Play className="w-4 h-4 fill-white text-white" />
                  <span>ทดลองเล่นเครื่องจำลอง</span>
                </button>
              </a>
            </motion.div>

            {/* Trust badge */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-6 border-t border-white/5 flex flex-wrap gap-x-8 gap-y-3 text-white/40 font-prompt text-sm"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-cyan-500" />
                <span>รวดเร็ว บันทึกผลใน 2 วินาที</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4.5 h-4.5 text-cyan-500" />
                <span>ปลอดภัย เชื่อมต่อ Google Sheets โดยตรง</span>
              </div>
            </motion.div>
          </div>

          {/* Hero mockup frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative w-full aspect-square max-w-[450px] mx-auto"
          >
            <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full"></div>
            <div className="relative border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-black/40 group aspect-[4/3] w-full">
              {/* Browser bar */}
              <div className="bg-black/80 px-4 py-2 border-b border-white/10 flex items-center gap-1.5 select-none shrink-0">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <div className="ml-4 h-4 w-40 rounded bg-white/5 flex items-center px-2 text-[8px] text-white/40 overflow-hidden truncate">
                  iaontechxmusic.com/dashboard/saas
                </div>
              </div>
              
              {/* Dashboard mockup image */}
              <div className="relative w-full h-[calc(100%-32px)]">
                <Image 
                  src="/images/mockups/saas_dashboard_mockup.png" 
                  alt="SaaS Dashboard Mockup" 
                  fill 
                  className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-102 transition-transform duration-700" 
                />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- INTERACTIVE SIMULATOR SECTION --- */}
      <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 relative z-10" id="demo">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-prompt text-3xl sm:text-5xl font-bold tracking-tight">
            ทดลองจำลองระบบ <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">LINE</span>
          </h2>
          <p className="font-prompt font-light text-white/60 max-w-2xl mx-auto text-base sm:text-lg">
            ลองคลิกปุ่มบันทึกสถานะของเด็กนักเรียนบนหน้าจอแท็บเล็ตของคุณครู (ด้านซ้าย) <br className="hidden sm:inline" />
            แล้วสังเกตผลการแจ้งเตือนสด ๆ บนหน้าจอมือถือ (ด้านขวา)
          </p>
          
          {/* Sound toggle button */}
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 text-white/80 transition-all text-xs font-prompt"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>เปิดเสียงเอฟเฟกต์แล้ว</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-white/40" />
                <span>ปิดเสียงอยู่</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Teacher's Tablet */}
          <div className="lg:col-span-7 flex flex-col glass-card border border-white/10 bg-white/5 rounded-2xl overflow-hidden shadow-2xl relative">
            
            {/* Glowing borders */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-blue-500/40 to-transparent"></div>
            
            {/* Tablet Header */}
            <div className="bg-black/60 p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] animate-pulse"></div>
                <h3 className="font-prompt text-lg font-semibold text-white">ระบบบันทึกผลเข้าเรียนรายวัน (ฝ่ายครู)</h3>
              </div>
              <span className="font-prompt text-xs text-white/40 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                ห้อง ม.3/1 (วิชาภาษาอังกฤษ)
              </span>
            </div>

            {/* Tablet Content */}
            <div className="p-6 flex-1 space-y-4">
              <div className="text-white/40 text-xs font-prompt flex justify-between border-b border-white/5 pb-2">
                <span>รายชื่อนักเรียนในชั้น</span>
                <span>เลือกบันทึกสถานะ</span>
              </div>
              
              <div className="space-y-3">
                {students.map((student) => (
                  <div 
                    key={student.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-white/5 bg-black/20 hover:bg-black/40 transition-colors gap-3"
                  >
                    
                    {/* Student Info */}
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-linear-to-br ${student.avatarBg} flex items-center justify-center font-prompt font-bold text-white shadow-md`}>
                        {student.avatar}
                      </div>
                      <div className="font-prompt">
                        <p className="text-base font-semibold text-white flex items-center gap-2">
                          {student.name}
                          {student.status !== "none" && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-white/5 border border-white/10">
                              เช็คแล้ว
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-white/40">เลขที่ {student.no} | รหัส 1024{student.id}</p>
                      </div>
                    </div>

                    {/* Attendance Status Picker Buttons */}
                    <div className="flex flex-wrap gap-2 sm:gap-1.5 self-end sm:self-center font-prompt text-xs">
                      
                      {/* มาเรียน */}
                      <button
                        onClick={() => handleStatusChange(student.id, "present")}
                        className={`px-3 py-2 rounded-lg border transition-all duration-200 flex items-center gap-1 active:scale-95 ${
                          student.status === "present"
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                            : "bg-white/5 border-white/10 text-white/70 hover:border-emerald-500/30 hover:text-white"
                        }`}
                      >
                        {student.status === "present" && <Check className="w-3.5 h-3.5 shrink-0" />}
                        <span>มาเรียน</span>
                      </button>

                      {/* สาย */}
                      <button
                        onClick={() => handleStatusChange(student.id, "late")}
                        className={`px-3 py-2 rounded-lg border transition-all duration-200 flex items-center gap-1 active:scale-95 ${
                          student.status === "late"
                            ? "bg-amber-500/20 border-amber-500 text-amber-400 font-semibold shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                            : "bg-white/5 border-white/10 text-white/70 hover:border-amber-500/30 hover:text-white"
                        }`}
                      >
                        {student.status === "late" && <Check className="w-3.5 h-3.5 shrink-0" />}
                        <span>สาย</span>
                      </button>

                      {/* ลา */}
                      <button
                        onClick={() => handleStatusChange(student.id, "leave")}
                        className={`px-3 py-2 rounded-lg border transition-all duration-200 flex items-center gap-1 active:scale-95 ${
                          student.status === "leave"
                            ? "bg-sky-500/20 border-sky-500 text-sky-400 font-semibold shadow-[0_0_12px_rgba(14,165,233,0.2)]"
                            : "bg-white/5 border-white/10 text-white/70 hover:border-sky-500/30 hover:text-white"
                        }`}
                      >
                        {student.status === "leave" && <Check className="w-3.5 h-3.5 shrink-0" />}
                        <span>ลา</span>
                      </button>

                      {/* ขาด */}
                      <button
                        onClick={() => handleStatusChange(student.id, "absent")}
                        className={`px-3 py-2 rounded-lg border transition-all duration-200 flex items-center gap-1 active:scale-95 ${
                          student.status === "absent"
                            ? "bg-rose-500/20 border-rose-500 text-rose-400 font-semibold shadow-[0_0_12px_rgba(244,63,94,0.2)]"
                            : "bg-white/5 border-white/10 text-white/70 hover:border-rose-500/30 hover:text-white"
                        }`}
                      >
                        {student.status === "absent" && <Check className="w-3.5 h-3.5 shrink-0" />}
                        <span>ขาด</span>
                      </button>

                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Tablet Footer */}
            <div className="bg-black/40 p-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 font-prompt gap-3">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>จำลองการทำซ้ำเสร็จสมบูรณ์ ข้อมูลอัปเดตแบบเรียลไทม์</span>
              </span>
              <button 
                onClick={() => {
                  setStudents(prev => prev.map(s => ({ ...s, status: "none" })));
                  setMessages([{
                    id: "welcome",
                    title: "LINE",
                    body: "🔔 ยินดีต้อนรับสู่ระบบ iAon ClassFlow! ทดลองกดปุ่มสถานะเช็คชื่อของนักเรียนทางด้านซ้าย เพื่อดูการแจ้งเตือนสดแบบจำลองได้เลยค่ะ",
                    time: "ระบบ"
                  }]);
                }}
                className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline cursor-pointer"
              >
                ล้างข้อมูล & รีเซ็ตทั้งหมด
              </button>
            </div>

          </div>

          {/* Right panel: Phone LINE simulation */}
          <div className="lg:col-span-5 flex justify-center">
            
            {/* Phone outer wrapper */}
            <div className="relative w-full max-w-[340px] aspect-[9/18.5] bg-[#111] rounded-[42px] p-3 shadow-2xl border-4 border-[#333] flex flex-col overflow-hidden">
              
              {/* Notch / Speaker */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-40 flex items-end justify-center pb-1">
                <div className="w-12 h-1 bg-[#222] rounded-full mb-0.5"></div>
              </div>

              {/* Screen Content - LINE App Theme (Dark Mode style) */}
              <div className="w-full h-full rounded-[32px] bg-[#1a1b1d] overflow-hidden flex flex-col relative z-20">
                
                {/* Header (LINE Green / Black Style) */}
                <div className="bg-[#242528] pt-6 pb-3.5 px-4 border-b border-black/20 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#00c300] flex items-center justify-center shadow-md relative shrink-0">
                      <MessageSquare className="w-4.5 h-4.5 text-white" />
                      {/* Red notification dot */}
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-rose-600 rounded-full"></span>
                    </div>
                    <div className="font-prompt text-left">
                      <p className="text-sm font-semibold text-white leading-tight">LINE</p>
                      <p className="text-[10px] text-white/50">บัญชีทางการ (ส่งอัตโนมัติ)</p>
                    </div>
                  </div>
                  <span className="text-[9px] text-[#00c300] font-bold border border-[#00c300]/40 px-2 py-0.5 rounded-full bg-[#00c300]/10 select-none">
                    CONNECTED
                  </span>
                </div>

                {/* LINE Chat Messages Area */}
                <div className="flex-1 p-3 overflow-y-auto space-y-3.5 flex flex-col-reverse relative scrollbar-none">
                  
                  {/* Messages list with AnimatePresence */}
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        className="flex items-start gap-2 max-w-[90%]"
                      >
                        {/* LINE Mini Avatar */}
                        <div className="w-7 h-7 rounded-full bg-[#00c300] flex items-center justify-center text-[10px] text-white font-bold shrink-0 mt-0.5 shadow-sm">
                          LN
                        </div>
                        
                        {/* Message Bubble */}
                        <div className="flex items-end gap-1.5">
                          <div className="bg-[#2a2c30] border border-white/5 text-white/95 px-3 py-2.5 rounded-2xl rounded-tl-none font-prompt text-xs leading-relaxed text-left whitespace-pre-wrap shadow-md">
                            {msg.body}
                          </div>
                          
                          {/* Message Time stamp */}
                          <span className="text-[8px] text-white/30 shrink-0 select-none pb-0.5">
                            {msg.time}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Dummy background content helper */}
                  <div className="text-center py-2 text-[9px] text-white/20 font-prompt">
                    -- เริ่มต้นบทสนทนาจำลอง --
                  </div>
                </div>

                {/* Input Bar Simulator */}
                <div className="bg-[#242528] p-2.5 border-t border-black/20 flex items-center gap-2.5 shrink-0">
                  <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center text-white/40 text-[16px] font-bold select-none cursor-not-allowed">
                    +
                  </div>
                  <div className="flex-1 bg-[#1a1b1d] rounded-full py-1.5 px-3 border border-white/5 text-[10px] text-white/30 text-left font-prompt select-none">
                    บัญชีนี้รับเฉพาะข้อความแจ้งเตือน (รับเข้าเท่านั้น)
                  </div>
                </div>

              </div>

              {/* Internal Reflection light glare */}
              <div className="absolute top-3 left-3 right-3 h-20 bg-linear-to-b from-white/5 to-transparent rounded-t-[32px] pointer-events-none z-30"></div>
            </div>

          </div>

        </div>
      </section>

      {/* --- FEATURE SECTION --- */}
      <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-prompt text-3xl sm:text-5xl font-bold tracking-tight">
            ระบบมีอะไรน่าสนใจบ้าง?
          </h2>
          <p className="font-prompt font-light text-white/60 max-w-2xl mx-auto text-base sm:text-lg">
            ฟีเจอร์เด็ดของระบบ iAon ClassFlow ที่ออกแบบมาโดยผสานเทคโนโลยีคลาวด์และ API ที่มีประสิทธิภาพสูง
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "LINE API",
              desc: "ระบบจัดฟอร์แมตข้อความแบบสเปกสูง เพื่อยิงแจ้งเตือนตรงสู่ห้องแชทครอบครัว หรือครูผู้ดูแลโดยไม่ต้องพิมพ์ส่งเองรายคน",
              icon: MessageSquare,
              color: "from-green-500 to-emerald-600",
              glow: "rgba(16,185,129,0.3)"
            },
            {
              title: "Google Sheets Sync",
              desc: "ข้อมูลการเข้าเรียนจะเก็บอย่างเป็นระเบียบลงบนกูเกิลชีตของคุณครูโดยตรง แก้ไขง่าย โหลดรายงานสะดวก มั่นใจเรื่องความเป็นส่วนตัว",
              icon: FileText,
              color: "from-blue-500 to-indigo-600",
              glow: "rgba(59,130,246,0.3)"
            },
            {
              title: "Apps Script Trigger",
              desc: "รันฟังก์ชันหลังบ้านด้วยโค้ด Apps Script ประสิทธิภาพสูง ตอบสนองคำสั่งแบบอัตโนมัติ 24 ชม. ปราศจากค่าเซิร์ฟเวอร์",
              icon: Zap,
              color: "from-amber-500 to-orange-600",
              glow: "rgba(245,158,11,0.3)"
            },
            {
              title: "Dashboard & Charts",
              desc: "มีเครื่องมือสถิติประมวลผล สรุปยอดขาด สาย ลา รายบุคคล รายสัปดาห์ หรือรายภาคเรียน เพื่อส่งรายงานวิชาการโรงเรียนได้อย่างรวดเร็ว",
              icon: BarChart3,
              color: "from-purple-500 to-pink-600",
              glow: "rgba(168,85,247,0.3)"
            }
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card flex flex-col p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-all duration-300 relative group"
                style={{
                  boxShadow: `0 0 10px rgba(0,0,0,0.5)`
                }}
                whileHover={{
                  y: -5,
                  boxShadow: `0 0 25px ${feat.glow}`
                }}
              >
                {/* Decorative background shadow */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${feat.color} opacity-5 group-hover:opacity-10 blur-2xl rounded-full transition-opacity duration-300 pointer-events-none`}></div>
                
                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${feat.color} flex items-center justify-center mb-6 shadow-md shadow-black/40`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-prompt text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="font-prompt text-sm text-white/60 leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-prompt text-3xl sm:text-5xl font-bold tracking-tight">
            แผนบริการราคาแพ็คเกจ
          </h2>
          <p className="font-prompt font-light text-white/60 max-w-2xl mx-auto text-base sm:text-lg">
            เลือกแผนบริการที่เหมาะสมกับขนาดห้องเรียนและรูปแบบการเรียนการสอนของคุณครู
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Free Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.01, borderColor: "rgba(6, 182, 212, 0.35)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseMove={handleMouseMove}
            className="glass-card flex flex-col p-8 rounded-2xl border border-white/10 relative justify-between transition-all duration-300"
            style={{
              background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(6, 182, 212, 0.08), transparent 80%), rgba(9, 9, 11, 0.6)"
            }}
          >
            <div className="space-y-6 font-prompt text-left relative z-10">
              <div>
                <h3 className="text-lg font-semibold text-white/80">คุณครูทั่วไป (Free)</h3>
                <p className="text-xs text-white/40 mt-1">เหมาะสำหรับทดลองระบบหรือใช้ห้องเรียนเดี่ยว</p>
              </div>

              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl font-bold tracking-tight">0</span>
                <span className="text-sm font-medium text-white/50">บาท / ตลอดชีพ</span>
              </div>

              <ul className="space-y-3.5 text-sm text-white/70 pt-4 border-t border-white/5">
                <li className="flex items-center gap-2.5 group/item">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-500/10 border border-slate-500/20 group-hover/item:scale-110 transition-transform shrink-0">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  </span>
                  <span className="group-hover/item:text-cyan-300 transition-colors">บันทึกชื่อนักเรียนสูงสุด 30 คน</span>
                </li>
                <li className="flex items-center gap-2.5 group/item">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-500/10 border border-slate-500/20 group-hover/item:scale-110 transition-transform shrink-0">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  </span>
                  <span className="group-hover/item:text-cyan-300 transition-colors">เช็คชื่อมา สาย ลา ขาด ได้ปกติ</span>
                </li>
                <li className="flex items-center gap-2.5 group/item">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-500/10 border border-slate-500/20 group-hover/item:scale-110 transition-transform shrink-0">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  </span>
                  <span className="group-hover/item:text-cyan-300 transition-colors">แจ้งเตือน LINE ลิงก์มาตรฐาน</span>
                </li>
                <li className="flex items-center gap-2.5 group/item">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-500/10 border border-slate-500/20 group-hover/item:scale-110 transition-transform shrink-0">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  </span>
                  <span className="group-hover/item:text-cyan-300 transition-colors">จัดเก็บข้อมูลใน Google Sheets</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 relative z-10">
              <Link href={user ? "/dashboard" : "/login"} className="w-full block">
                <button className="w-full py-3.5 rounded-full border border-white/10 hover:border-cyan-400/40 bg-white/5 hover:bg-cyan-500/5 text-white hover:text-cyan-300 font-prompt font-semibold text-sm active:scale-95 transition-all cursor-pointer shadow-md hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                  เริ่มต้นใช้งานฟรี
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Pro Teacher Tier (Recommended) */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -12, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            onMouseMove={handleMouseMove}
            className="glass-card border-glow-premium flex flex-col p-8 rounded-2xl bg-linear-to-b from-blue-950/25 to-black/90 relative justify-between shadow-[0_0_35px_rgba(6,182,212,0.18)] transition-all duration-300 md:scale-105 z-20"
            style={{
              background: "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(6, 182, 212, 0.15), rgba(139, 92, 246, 0.1) 50%, transparent 80%), rgba(9, 9, 11, 0.5)"
            }}
          >
            {/* Twinkling particle stars inside card background */}
            <FloatingSparkles />

            {/* Float recommended label badge */}
            <div className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1.5 rounded-full bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-500 text-[10px] text-white font-bold tracking-wider font-prompt uppercase shadow-md badge-glow-pulse flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>RECOMMENDED</span>
            </div>

            <div className="space-y-6 font-prompt text-left relative z-10">
              <div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-200 to-cyan-400 flex items-center gap-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  <span>ครูมืออาชีพ (Pro)</span>
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                </h3>
                <p className="text-xs text-cyan-300/80 mt-1">ฟีเจอร์ครบ สำหรับการจัดการห้องเรียนส่วนตัวขั้นเทพ</p>
              </div>

              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-white to-cyan-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]">190</span>
                <span className="text-sm font-medium text-white/50">บาท / เดือน</span>
              </div>

              <ul className="space-y-3.5 text-sm text-white/90 pt-4 border-t border-cyan-500/20">
                <li className="flex items-center gap-2.5 group/item">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_8px_rgba(6,182,212,0.3)] group-hover/item:scale-110 transition-transform shrink-0">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  </span>
                  <span className="font-medium text-white group-hover/item:text-cyan-300 transition-colors">บันทึกชื่อนักเรียนได้ไม่จำกัด</span>
                </li>
                <li className="flex items-center gap-2.5 group/item">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_8px_rgba(6,182,212,0.3)] group-hover/item:scale-110 transition-transform shrink-0">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  </span>
                  <span className="group-hover/item:text-cyan-300 transition-colors">จัดการห้องเรียนแยกกันสูงสุด 5 ห้อง</span>
                </li>
                <li className="flex items-center gap-2.5 group/item">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_8px_rgba(6,182,212,0.3)] group-hover/item:scale-110 transition-transform shrink-0">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  </span>
                  <span className="text-cyan-300 font-medium group-hover/item:text-cyan-200 transition-colors">ปรับแต่งเนื้อหาข้อความ LINE เองได้</span>
                </li>
                <li className="flex items-center gap-2.5 group/item">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_8px_rgba(6,182,212,0.3)] group-hover/item:scale-110 transition-transform shrink-0">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  </span>
                  <span className="group-hover/item:text-cyan-300 transition-colors">ระบบวิเคราะห์ประเมินกราฟสถิติรายสัปดาห์</span>
                </li>
                <li className="flex items-center gap-2.5 group/item">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_8px_rgba(6,182,212,0.3)] group-hover/item:scale-110 transition-transform shrink-0">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  </span>
                  <span className="group-hover/item:text-cyan-300 transition-colors">สำรองข้อมูลแบบรายวันลงคลาวด์ระบบ</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 relative z-10">
              <Link href={user ? "/dashboard" : "/login"} className="w-full block">
                <button className="btn-shimmer w-full py-4 rounded-full bg-linear-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:via-cyan-400 hover:to-indigo-500 text-white font-prompt font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] active:scale-95 transition-all cursor-pointer">
                  สมัครใช้งาน Pro
                </button>
              </Link>
            </div>
          </motion.div>

          {/* School License */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.01, borderColor: "rgba(245, 158, 11, 0.35)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseMove={handleMouseMove}
            className="glass-card flex flex-col p-8 rounded-2xl border border-white/10 relative justify-between transition-all duration-300"
            style={{
              background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(245, 158, 11, 0.08), rgba(99, 102, 241, 0.06) 50%, transparent 80%), rgba(9, 9, 11, 0.6)"
            }}
          >
            <div className="space-y-6 font-prompt text-left relative z-10">
              <div>
                <h3 className="text-lg font-semibold text-white/80">ระดับโรงเรียน (School)</h3>
                <p className="text-xs text-white/40 mt-1">ยกระดับทั้งระดับสายชั้น หรือระบบใหญ่ทั้งโรงเรียน</p>
              </div>

              <div className="flex items-baseline gap-1 text-white">
                <span className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white to-amber-200 drop-shadow-[0_0_10px_rgba(245,158,11,0.2)]">ติดต่อเรา</span>
                <span className="text-xs font-medium text-white/50">สำหรับใบเสนอราคา</span>
              </div>

              <ul className="space-y-3.5 text-sm text-white/70 pt-4 border-t border-white/5">
                <li className="flex items-center gap-2.5 group/item">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.3)] group-hover/item:scale-110 transition-transform shrink-0">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                  </span>
                  <span className="group-hover/item:text-amber-300 transition-colors">ไม่จำกัดนักเรียน และไม่จำกัดจำนวนคุณครู</span>
                </li>
                <li className="flex items-center gap-2.5 group/item">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.3)] group-hover/item:scale-110 transition-transform shrink-0">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                  </span>
                  <span className="group-hover/item:text-amber-300 transition-colors">ระบบ Portal แอดมินกลางสำหรับโรงเรียน</span>
                </li>
                <li className="flex items-center gap-2.5 group/item">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.3)] group-hover/item:scale-110 transition-transform shrink-0">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                  </span>
                  <span className="group-hover/item:text-amber-300 transition-colors">รองรับการเชื่อมต่อ LINE Official Account</span>
                </li>
                <li className="flex items-center gap-2.5 group/item">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.3)] group-hover/item:scale-110 transition-transform shrink-0">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                  </span>
                  <span className="group-hover/item:text-amber-300 transition-colors">บริการเชื่อมต่อ API ดาต้าเบสเดิมของโรงเรียน</span>
                </li>
                <li className="flex items-center gap-2.5 group/item">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.3)] group-hover/item:scale-110 transition-transform shrink-0">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                  </span>
                  <span className="group-hover/item:text-amber-300 transition-colors">ให้คำปรึกษาและซัพพอร์ตโดยวิศวกรตรง</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 relative z-10">
              <a href="mailto:contact@iaontechxmusic.com" className="w-full block">
                <button className="w-full py-3.5 rounded-full border border-amber-500/30 hover:border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-prompt font-semibold text-sm active:scale-95 transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.05)] hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  ติดต่อฝ่ายขาย
                </button>
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-prompt text-3xl sm:text-5xl font-bold tracking-tight">
            คำถามที่พบบ่อย
          </h2>
          <p className="font-prompt font-light text-white/60 text-base">
            ตอบคำถามและข้อสงสัยเบื้องต้นเกี่ยวกับการทำงานของระบบจัดการเข้าเรียนครู iAon ClassFlow
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="glass-card border border-white/5 bg-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/10"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left font-prompt font-semibold text-base sm:text-lg text-white hover:text-cyan-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-300 ${
                    openFaq === idx ? "rotate-180 text-cyan-400" : ""
                  }`} 
                />
              </button>

              <AnimatePresence initial={false}>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-1 border-t border-white/5 font-prompt font-light text-sm sm:text-base text-white/70 leading-relaxed text-left">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA BOTTOM --- */}
      <section className="max-w-5xl mx-auto py-16 px-4 sm:px-6 relative z-10">
        <div className="relative rounded-3xl overflow-hidden border border-cyan-500/20 bg-linear-to-r from-blue-950/20 via-[#0a0f26]/80 to-indigo-950/20 p-8 sm:p-12 text-center shadow-[0_0_50px_rgba(6,182,212,0.1)]">
          
          {/* Radial light in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-prompt text-2xl sm:text-4xl font-bold tracking-tight">
              เริ่มลดภาระงานสอนของคุณตั้งแต่วันนี้
            </h2>
            <p className="font-prompt font-light text-white/70 text-sm sm:text-base">
              สัมผัสความลื่นไหล สะดวก รวดเร็ว ในการรายงานและเก็บประวัตินักเรียน มอบการสื่อสารที่โปร่งใสสู่ผู้ปกครองเพื่อความไว้วางใจที่สูงขึ้น
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Link href={user ? "/dashboard" : "/login"}>
                <button className="px-8 py-3.5 rounded-full bg-white text-[#070913] hover:bg-white/90 font-prompt font-bold text-sm tracking-wide shadow-lg active:scale-95 transition-all">
                  สร้างบัญชีใช้งานฟรี
                </button>
              </Link>
              <a href="mailto:contact@iaontechxmusic.com">
                <button className="px-8 py-3.5 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 font-prompt font-semibold text-sm text-white active:scale-95 transition-all">
                  ติดต่อสอบถามเพิ่มเติม
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

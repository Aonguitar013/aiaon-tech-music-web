"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Clock, Smartphone, Bell, HelpCircle, Check, ArrowRight } from "lucide-react";

export function AutomationShowcase() {
  // ROI Calculator States
  const [students, setStudents] = useState(35);
  const [timePerStudent, setTimePerStudent] = useState(15); // seconds
  const [reportHours, setReportHours] = useState(8); // hours per semester

  // LINE Notification Simulation States
  const [chatMessages, setChatMessages] = useState<Array<{ id: number; time: string; text: string }>>([
    { id: 1, time: "07:55", text: "🔔 ระบบเช็คชื่ออัตโนมัติ AiAon Tech พร้อมใช้งาน" },
  ]);
  const [isScanning, setIsScanning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Calculations
  const dailyTimeSavedSeconds = students * timePerStudent;
  const termTimeSavedHours = Math.round(
    ((dailyTimeSavedSeconds * 100) / 3600) + reportHours // assuming 100 school days per semester
  );
  
  // Equivalent comparison
  const equivalentSleepDays = (termTimeSavedHours / 8).toFixed(1); // 8 hours of sleep per day

  // Simulation Trigger
  const triggerScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setShowAlert(false);

    // Beep / Scan animation duration
    setTimeout(() => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      const studentNames = ["เด็กชายภัทรพล", "เด็กหญิงนภัสสร", "เด็กชายธนากร", "เด็กหญิงกัญญารัตน์", "เด็กชายณัฐพงษ์"];
      const randomName = studentNames[Math.floor(Math.random() * studentNames.length)];
      
      const newMsg = {
        id: Date.now(),
        time: timeStr,
        text: `📍 ${randomName} เช็คชื่อเข้าเรียนแล้ว (แจ้งเตือนผู้ปกครองทาง LINE เรียบร้อย)`
      };

      setChatMessages(prev => [...prev, newMsg]);
      setIsScanning(false);
      setShowAlert(true);

      // Auto hide notification banner after 4 seconds
      setTimeout(() => setShowAlert(false), 4000);
    }, 800);
  };

  return (
    <section className="py-24 px-4 relative z-10 w-full overflow-hidden border-b border-white/5 bg-linear-to-b from-black via-zinc-950 to-black" id="showcase">
      {/* Radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 px-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-card border-blue-500/20 bg-blue-500/5 text-blue-400 text-sm font-prompt font-medium mb-4">
            <Cpu className="w-4 h-4" /> Smart school automation
          </span>
          <h2 className="font-prompt text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
            นวัตกรรมลดภาระงานครู <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-teal-400">เห็นภาพจริงใน 1 นาที</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base md:text-lg font-prompt font-light leading-relaxed">
            ทดลองจำลองการคำนวณชั่วโมงการทำงานที่จะประหยัดได้ และดูตัวอย่างระบบแจ้งเตือน LINE ของเราแบบ Interactive ด้านล่างนี้
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* ─────────────────────────────────────────────────────────────
             LEFT COLUMN: ROI CALCULATOR
          ───────────────────────────────────────────────────────────── */}
          <div className="glass-card border-white/10 p-8 flex flex-col justify-between bg-white/3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-[60px] rounded-full pointer-events-none" />
            
            <div>
              <h3 className="font-prompt text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-400" />
                เครื่องคำนวณเวลาที่ประหยัดได้
              </h3>
              
              <div className="space-y-6">
                {/* Slider 1: Students */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-prompt text-white/70">จำนวนนักเรียนในห้องเรียน</label>
                    <span className="text-sm font-bold font-prompt text-blue-400">{students} คน</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={students}
                    onChange={(e) => setStudents(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Slider 2: Time per student */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-prompt text-white/70">เวลาที่ใช้เช็คชื่อและส่งแจ้งเตือนแบบเดิม (ต่อคน)</label>
                    <span className="text-sm font-bold font-prompt text-blue-400">{timePerStudent} วินาที</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="45"
                    value={timePerStudent}
                    onChange={(e) => setTimePerStudent(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Slider 3: Semester reports */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-prompt text-white/70">เวลาที่ใช้จัดทำรายงานส่งฝ่ายวิชาการต่อภาคเรียน</label>
                    <span className="text-sm font-bold font-prompt text-blue-400">{reportHours} ชั่วโมง</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="30"
                    value={reportHours}
                    onChange={(e) => setReportHours(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Results display */}
            <div className="mt-10 pt-8 border-t border-white/10 bg-blue-500/5 rounded-2xl p-6 border border-blue-500/10">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="border-r border-white/10 pr-2">
                  <span className="text-[10px] uppercase font-prompt tracking-wider text-white/40 block mb-1">ประหยัดได้ต่อภาคเรียน</span>
                  <span className="text-3xl md:text-4xl font-bold font-prompt text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                    {termTimeSavedHours} ชม.
                  </span>
                </div>
                <div className="pl-2">
                  <span className="text-[10px] uppercase font-prompt tracking-wider text-white/40 block mb-1">คืนเวลานอนพักผ่อน</span>
                  <span className="text-3xl md:text-4xl font-bold font-prompt text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-400">
                    ~ {equivalentSleepDays} วัน
                  </span>
                </div>
              </div>
              <p className="text-xs text-white/55 font-prompt text-center mt-4 leading-relaxed">
                * คำนวณจากการเปิดเรียน 100 วันต่อหนึ่งภาคการศึกษา หากคุณครูมีหลายห้องเรียน หรือหลายระดับชั้น ตัวเลขชั่วโมงที่ช่วยลดภาระงานจะเพิ่มขึ้นเป็นทวีคูณ!
              </p>
            </div>

          </div>

          {/* ─────────────────────────────────────────────────────────────
             RIGHT COLUMN: INTERACTIVE PHONE PREVIEW
          ───────────────────────────────────────────────────────────── */}
          <div className="glass-card border-white/10 p-8 flex flex-col justify-between items-center bg-white/3 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-48 h-48 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none" />

            <div className="w-full text-center lg:text-left mb-6">
              <h3 className="font-prompt text-2xl font-bold text-white mb-2 flex items-center justify-center lg:justify-start gap-3">
                <Smartphone className="w-6 h-6 text-cyan-400" />
                เครื่องจำลองแจ้งเตือน LINE
              </h3>
              <p className="text-sm font-prompt text-white/60">
                จำลองการส่งข้อมูลเช็คชื่อเข้า LINE ของผู้ปกครองแบบ Real-time
              </p>
            </div>

            {/* Mobile Phone Mockup */}
            <div className="relative w-full max-w-[270px] aspect-[9/18] bg-zinc-950 rounded-[38px] border-4 border-zinc-800 p-2 shadow-2xl overflow-hidden flex flex-col justify-between">
              
              {/* Dynamic Notification Banner */}
              <AnimatePresence>
                {showAlert && (
                  <motion.div
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    className="absolute top-6 left-2 right-2 bg-zinc-900/95 backdrop-blur-md rounded-2xl p-2.5 border border-white/10 shadow-lg z-50 flex gap-2.5 items-start"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#06C755] flex items-center justify-center shrink-0">
                      <Bell className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-[10px] font-bold font-prompt text-white">AiAon Tech OA</span>
                        <span className="text-[8px] text-white/40">ตอนนี้</span>
                      </div>
                      <p className="text-[9px] font-prompt text-white/80 leading-normal line-clamp-2">
                        สแกนบัตรสำเร็จ! ส่งแจ้งผลแจ้งเตือนเข้าสมาร์ตโฟนผู้ปกครองเรียบร้อยแล้ว
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Phone Status Bar */}
              <div className="h-5 flex justify-between items-center px-4 text-[9px] text-white/70 font-sans z-10">
                <span>08:02</span>
                {/* Speaker Notch */}
                <div className="w-16 h-3 bg-zinc-800 rounded-full absolute left-1/2 -translate-x-1/2 top-1" />
                <div className="flex gap-1">
                  <span>📶</span>
                  <span>🔋</span>
                </div>
              </div>

              {/* Chat View */}
              <div className="flex-1 bg-zinc-900/90 rounded-[28px] mt-1 mb-2 p-3 overflow-y-auto flex flex-col gap-2 relative">
                {/* Background decorative watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                  <span className="font-prompt font-bold text-2xl tracking-widest">AIAON</span>
                </div>

                <div className="text-center my-1">
                  <span className="text-[8px] bg-black/30 text-white/40 px-2 py-0.5 rounded-full font-prompt">วันนี้</span>
                </div>

                <div className="flex flex-col gap-2 relative z-10">
                  {chatMessages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-zinc-800 border border-white/5 rounded-2xl p-2.5 max-w-[90%] self-start"
                    >
                      <p className="text-[10px] font-prompt text-white/90 leading-relaxed">
                        {msg.text}
                      </p>
                      <span className="text-[8px] text-white/35 block text-right mt-1 font-prompt">
                        {msg.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Button to simulate */}
              <button
                onClick={triggerScan}
                disabled={isScanning}
                className={`w-full py-2.5 rounded-xl font-prompt font-semibold text-[10px] flex items-center justify-center gap-1.5 transition-all z-10 cursor-pointer ${
                  isScanning 
                    ? "bg-zinc-800 text-white/50 cursor-wait" 
                    : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                }`}
              >
                {isScanning ? (
                  <>
                    <span className="w-2.5 h-2.5 border border-white/30 border-t-white animate-spin rounded-full inline-block" />
                    กำลังสแกนบัตร...
                  </>
                ) : (
                  <>
                    <span>สแกนการ์ดนักเรียน (จำลอง)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

            </div>

            <div className="mt-4 text-center">
              <span className="text-xs text-white/40 font-prompt">
                * ทดลองคลิกปุ่มสีฟ้าจำลองด้านบนเพื่อทดสอบการทำงานของระบบ
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

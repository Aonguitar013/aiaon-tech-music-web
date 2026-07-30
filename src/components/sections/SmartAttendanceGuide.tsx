"use client";

import { motion } from "framer-motion";
import { BookOpen, ExternalLink, GraduationCap, MonitorPlay } from "lucide-react";

const GAMMA_EMBED_URL = "https://gamma.app/embed/ze0oqbpojgfi6n0";
const GAMMA_SHARE_URL = "https://gamma.app/docs/ze0oqbpojgfi6n0";

export function SmartAttendanceGuide() {
  return (
    <section
      className="py-24 px-4 relative z-10 w-full overflow-hidden"
      id="smart-attendance-guide"
    >
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-500/8 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-cyan-500/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 px-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-sm font-prompt font-medium mb-4"
          >
            <GraduationCap className="w-4 h-4" />
            ม.3 โรงเรียนหาดใหญ่วิทยาลัย
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="font-prompt text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white"
          >
            คู่มือ{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-indigo-400 to-purple-400">
              Smart Attendance
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/60 max-w-xl mx-auto text-base md:text-lg font-prompt font-light leading-relaxed"
          >
            เทคนิคและการใช้งานระบบ Smart Attendance สำหรับนักเรียนชั้นมัธยมศึกษาปีที่ 3
          </motion.p>
        </div>

        {/* iframe Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
          viewport={{ once: true, margin: "-60px" }}
          className="group relative rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm overflow-hidden
                     hover:border-white/20 hover:shadow-[0_12px_60px_rgba(99,102,241,0.2)] transition-all duration-500 ease-out"
        >
          {/* Hover gradient overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-indigo-500/5 via-transparent to-cyan-500/5 pointer-events-none z-10" />

          {/* Card top bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8 bg-white/2">
            <div className="flex items-center gap-2.5">
              {/* Traffic-light dots */}
              <span className="w-3 h-3 rounded-full bg-rose-500/70" />
              <span className="w-3 h-3 rounded-full bg-amber-400/70" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
            </div>

            <div className="flex items-center gap-1.5 text-white/40 text-xs font-prompt">
              <MonitorPlay className="w-3.5 h-3.5 text-cyan-400/70" />
              <span>Smart Attendance · Hatyai Wittayalai</span>
            </div>

            <a
              href={GAMMA_SHARE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="เปิดในแท็บใหม่"
              className="flex items-center gap-1 text-[11px] font-prompt text-white/40 hover:text-cyan-400 transition-colors duration-200"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">เปิดแบบเต็ม</span>
            </a>
          </div>

          {/* Responsive iframe wrapper — 16:9 on all screens */}
          <div className="relative w-full aspect-video">
            <iframe
              src={GAMMA_EMBED_URL}
              title="คู่มือเทคนิคและการใช้งาน Smart Attendance Hatyai Wittayalai M.3"
              allow="fullscreen"
              loading="lazy"
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>

          {/* Card footer */}
          <div className="flex items-center gap-2 px-5 py-3 border-t border-white/8 bg-white/2">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400/70 shrink-0" />
            <p className="text-[11px] font-prompt text-white/35 leading-relaxed">
              คู่มือเทคนิคและการใช้งาน Smart Attendance — โรงเรียนหาดใหญ่วิทยาลัย ชั้น ม.3
            </p>
          </div>
        </motion.div>

        {/* Quick-access pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8"
        >
          <a
            href={GAMMA_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                       border border-indigo-500/25 bg-indigo-500/8
                       text-indigo-300 text-sm font-prompt font-medium
                       hover:bg-indigo-500/15 hover:border-indigo-400/40
                       transition-all duration-300 group/pill"
          >
            <ExternalLink className="w-4 h-4 group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5 transition-transform duration-200" />
            เปิดคู่มือแบบเต็มหน้าจอ
          </a>
        </motion.div>
      </div>
    </section>
  );
}

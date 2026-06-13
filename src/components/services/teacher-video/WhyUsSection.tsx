"use client";

import { motion } from "framer-motion";
import { Users, Cpu, ShieldCheck, Flame, Check, HelpCircle } from "lucide-react";
import { FaLine } from "react-icons/fa6";

interface PillarItem {
  icon: React.ElementType;
  title: string;
  desc: string;
  colorClass: string;
  bgGlow: string;
}

const PILLARS: PillarItem[] = [
  {
    icon: Users,
    title: "เพื่อนร่วมวิชาชีพที่เข้าใจครูจริง",
    desc: "เราเป็น 'ครูผู้สอนจริง' ที่อยู่ในระบบโรงเรียน เข้าใจภาระงาน ความกดดัน และความยากลำบากในการจัดทำวิทยฐานะ คุยภาษาเดียวกัน ช่วยลดความเครียดและเป็นคู่คิดเคียงข้างคุณ",
    colorClass: "text-blue-400",
    bgGlow: "from-blue-500/10 to-transparent"
  },
  {
    icon: Cpu,
    title: "ผู้เชี่ยวชาญด้าน Tech & Innovation",
    desc: "ภายใต้แบรนด์ AiAon Tech เรานำเข้าเครื่องมือเทคโนโลยีการศึกษา ระบบอัตโนมัติ และ AI ช่วยสอนระดับโมเดิร์น ทำให้แผนการสอนและนวัตกรรมของคุณโดดเด่นล้ำหน้าในสายตากรรมการ",
    colorClass: "text-green-400",
    bgGlow: "from-green-500/10 to-transparent"
  },
  {
    icon: ShieldCheck,
    title: "แม่นยำ 8 ตัวชี้วัดเกณฑ์ ก.ค.ศ.",
    desc: "ศึกษาและแกะเกณฑ์ PA ของ ก.ค.ศ. อย่างละเอียด ทุกแผนและทุกคลิปสภาพปัญหาจะถูกวางโครงสร้างตามเกณฑ์คะแนนจริง เพื่อให้มั่นใจว่าผลงานของท่านตรงจุดประเมินอย่างมีประสิทธิภาพ",
    colorClass: "text-purple-400",
    bgGlow: "from-purple-500/10 to-transparent"
  }
];

export function WhyUsSection() {
  return (
    <section className="relative py-24 border-t border-white/5 bg-zinc-950/30 overflow-hidden">
      {/* Lights */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Hook */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold font-prompt">
              WHY CHOOSE US
            </span>
            <h2 className="font-prompt text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              ทำไมต้องทำคลิป PA กับ{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-green-400">
                AiAon Tech?
              </span>
            </h2>
            <p className="font-prompt text-sm sm:text-base text-white/70 leading-relaxed">
              เราไม่ใช่แค่โปรดักชั่นเฮาส์ทั่วไปที่รับจ้างถ่ายรูปวิดีโอ 
              แต่เราคือ **"เพื่อนร่วมวิชาชีพ"** ที่มีพื้นฐานด้านการจัดการเรียนรู้ 
              และมีความเชี่ยวชาญด้านเทคโนโลยีสื่อสมัยใหม่ 
              พร้อมประยุกต์ใช้เพื่อลดภาระงานครูอย่างแท้จริง
            </p>

            {/* Quick list checklist */}
            <div className="space-y-3.5 pt-2 max-w-md mx-auto lg:mx-0">
              {[
                "มีครูพี่เลี้ยงประเมินช่วยวิเคราะห์แผนรายข้อ",
                "ปรับปรุงระบบเสียงจนชัดเจนสูงสุด ไร้เสียงลมรบกวน",
                "วิดีโอคมชัดระดับ Full HD อัปโหลดขึ้นระบบได้ทันที",
                "รับประกันปรับแก้ไขงานฟรี ตามขอบเขตตกลง",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-left">
                  <div className="w-5 h-5 rounded-full bg-[#06C755]/15 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#06C755]" />
                  </div>
                  <span className="font-prompt text-xs sm:text-sm text-white/95">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="https://lin.ee/XXLvrKW"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-prompt font-semibold text-sm transition-all duration-300 hover:scale-[1.02] shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                คุยกับทีมงานครูโดยตรง
              </a>
            </div>
          </div>

          {/* Right Column: Key Pillars */}
          <div className="lg:col-span-7 space-y-6">
            {PILLARS.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.15 }}
                  className="group relative rounded-2xl glass-card border border-white/5 p-6 hover:border-white/15 transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle hover gradient background */}
                  <div className={`absolute inset-0 bg-linear-to-r ${pillar.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  <div className="relative z-10 flex flex-col sm:flex-row gap-5 items-start">
                    {/* Icon container */}
                    <div className={`w-12 h-12 rounded-xl bg-white/3 flex items-center justify-center shrink-0 border border-white/8 ${pillar.colorClass} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="font-prompt text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors duration-200">
                        {pillar.title}
                      </h3>
                      <p className="font-prompt text-xs sm:text-sm text-white/60 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

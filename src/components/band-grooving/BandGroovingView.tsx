"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import {
  Clock,
  Sparkles,
  Music,
  CheckCircle2,
  AlertCircle,
  Award,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const timingData = [
  { name: "ท่อนเริ่มต้น", amateur: 12, pro: 2 },
  { name: "ท่อนโซโล่ที่เร็ว", amateur: 18, pro: 3 },
  { name: "ท่อนส่งยากๆ", amateur: 25, pro: 2 },
  { name: "ท่อนจบเพลง", amateur: 15, pro: 1 },
];

const skillData = [
  { subject: "ความนิ่งจังหวะ", A: 95 },
  { subject: "การคุมไดนามิก", A: 85 },
  { subject: "การฟังเพื่อน", A: 90 },
  { subject: "การแก้ปัญหาเฉพาะหน้า", A: 80 },
  { subject: "ความแน่นกลองเบส", A: 95 },
];

const dynamicData = [
  { name: "Intro", energy: 40 },
  { name: "Verse 1", energy: 30 },
  { name: "Pre-Chorus", energy: 60 },
  { name: "Chorus", energy: 95 },
  { name: "Solo", energy: 85 },
  { name: "Outro", energy: 20 },
];

// Helper components for custom recharts tooltips to match dark aesthetic
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border-white/10 bg-black/80 shadow-xl rounded-lg text-xs font-prompt">
        <p className="text-white/60 mb-1.5 font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 my-0.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color || entry.fill }}
            />
            <span className="text-white font-semibold">
              {entry.name}: {entry.value}%
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function BandGroovingView() {
  return (
    <div className="w-full relative overflow-hidden pb-24">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/5 blur-[130px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/3" />
      <div className="absolute top-[40%] right-[-80px] w-[450px] h-[450px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Header / Hero Section */}
        <header className="text-center mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-sky-500/30 bg-sky-500/5 text-sky-400 text-sm font-prompt font-medium"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>TRAINING STRATEGY: BAND CLINIC PREP</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-prompt text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
          >
            เจาะลึกกลยุทธ์การฝึก{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-sky-300 drop-shadow-[0_0_20px_rgba(56,189,248,0.25)]">
              Band Grooving
            </span>
            <br />
            และการเล่นกับ{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-teal-300 drop-shadow-[0_0_20px_rgba(45,212,191,0.25)]">
              Click Track
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-white/60 font-prompt leading-relaxed max-w-3xl mx-auto"
          >
            เจาะลึกแผนการซ้อม 2 ชั่วโมง (40% ของหลักสูตร) ที่จะเปลี่ยน &quot;วงนักเรียน&quot; ให้กลายเป็น &quot;วงมืออาชีพ&quot; เพื่อป้องกันความผิดพลาดที่พบบ่อยที่สุดในห้องบันทึกเสียงและบนเวทีประกวดระดับประเทศ
          </motion.p>
        </header>

        {/* Metrics Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card border-white/8 bg-white/5 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="font-prompt text-2xl font-bold text-white border-l-4 border-sky-500 pl-4">
                  ทำไมต้องให้ความสำคัญกับ Click Track?
                </h2>
                <p className="font-prompt text-base text-white/70 leading-relaxed">
                  สถิติจากการบันทึกเสียงสดพบว่า วงที่ไม่ได้ฝึกกับ Click Track จะมีอัตราความคลาดเคลื่อนของจังหวะ (Timing Deviation) สูงถึง 15-20% ในท่อนส่ง ซึ่งส่งผลให้การตัดต่อเสียง (Editing) ทำได้ยากและสูญเสีย &quot;Groove&quot; ที่เป็นธรรมชาติไป แผนการซ้อมนี้จึงมุ่งเน้นการลดความคลาดเคลื่อนให้เหลือต่ำกว่า 2%
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-xl font-bold shrink-0">
                      90%
                    </div>
                    <p className="font-prompt text-sm font-medium text-white/80">
                      คือโอกาสล่มของวงในห้องอัดหาก &quot;กลองและเบส&quot; ไม่เกาะจังหวะกัน
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 text-xl font-bold shrink-0">
                      40%
                    </div>
                    <p className="font-prompt text-sm font-medium text-white/80">
                      ของคะแนน Band Clinic มาจากความ &quot;Tight&quot; และ &quot;Dynamic&quot; ของวง
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={timingData}
                      margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis
                        dataKey="name"
                        stroke="rgba(255,255,255,0.4)"
                        tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: "var(--font-prompt)" }}
                      />
                      <YAxis
                        stroke="rgba(255,255,255,0.4)"
                        tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: "var(--font-prompt)" }}
                        unit="%"
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        wrapperStyle={{
                          fontFamily: "var(--font-prompt)",
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      />
                      <Bar
                        name="เล่นตามใจ (Amateur)"
                        dataKey="amateur"
                        fill="rgba(244, 63, 94, 0.75)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        name="เกาะคลิกแทร็ก (Molegoon)"
                        dataKey="pro"
                        fill="rgba(14, 165, 233, 0.75)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="font-prompt text-[11px] text-center text-white/40">
                  เปรียบเทียบค่าความแปรปรวนของจังหวะระหว่างวงที่ฝึกและไม่ฝึกกับคลิกแทร็ก
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Process Flow Section */}
        <section className="mb-20">
          <div className="text-center mb-12 space-y-2">
            <h2 className="font-prompt text-3xl font-bold text-white">เส้นทางการพัฒนา (Training Path)</h2>
            <p className="font-prompt text-base text-white/50">กระบวนการ 6 ขั้นตอนเพื่อสร้างความเสถียรใน 120 นาที</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="glass-card border-sky-500/20 hover:border-sky-500/30 bg-sky-500/5 p-6 rounded-xl relative group hover:scale-[1.02] transition-all duration-300"
            >
              <span className="absolute -top-4 left-6 bg-linear-to-r from-sky-500 to-sky-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg shadow-sky-500/20">
                1
              </span>
              <h3 className="font-prompt font-bold text-sky-400 mt-2 mb-2 group-hover:text-sky-300 transition-colors">
                Individual Sync
              </h3>
              <p className="font-prompt text-sm text-white/70 leading-relaxed">
                จูนประสาทสัมผัสรายคนกับ Metronome เพื่อหาจุด Rush/Drag ของแต่ละบุคคล
              </p>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="glass-card border-sky-500/20 hover:border-sky-500/30 bg-sky-500/5 p-6 rounded-xl relative group hover:scale-[1.02] transition-all duration-300"
            >
              <span className="absolute -top-4 left-6 bg-linear-to-r from-sky-500 to-sky-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg shadow-sky-500/20">
                2
              </span>
              <h3 className="font-prompt font-bold text-sky-400 mt-2 mb-2 group-hover:text-sky-300 transition-colors">
                Rhythm Backbone
              </h3>
              <p className="font-prompt text-sm text-white/70 leading-relaxed">
                ล็อก Drum & Bass ให้กลายเป็นเนื้อเดียวกัน เน้นความหนาของ Kick และ Bass Note
              </p>
            </motion.div>
            
            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="glass-card border-sky-500/20 hover:border-sky-500/30 bg-sky-500/5 p-6 rounded-xl relative group hover:scale-[1.02] transition-all duration-300"
            >
              <span className="absolute -top-4 left-6 bg-linear-to-r from-sky-500 to-sky-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg shadow-sky-500/20">
                3
              </span>
              <h3 className="font-prompt font-bold text-sky-400 mt-2 mb-2 group-hover:text-sky-300 transition-colors">
                Full Integration
              </h3>
              <p className="font-prompt text-sm text-white/70 leading-relaxed">
                ประกอบร่างเครื่องดนตรีทั้งหมดและเสียงร้อง โดยมี Click Track คุมระบบภาพรวม
              </p>
            </motion.div>
            
            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="glass-card border-teal-500/20 hover:border-teal-500/30 bg-teal-500/5 p-6 rounded-xl relative group hover:scale-[1.02] transition-all duration-300"
            >
              <span className="absolute -top-4 left-6 bg-linear-to-r from-teal-500 to-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg shadow-teal-500/20">
                4
              </span>
              <h3 className="font-prompt font-bold text-teal-400 mt-2 mb-2 group-hover:text-teal-300 transition-colors">
                Dynamic Control
              </h3>
              <p className="font-prompt text-sm text-white/70 leading-relaxed">
                ฝึกการผ่อน-เร่ง อารมณ์เพลง (เบา-ดัง) เพื่อสร้างมิติ ไม่ให้ซาวด์บวมและแย่งกันดัง
              </p>
            </motion.div>
            
            {/* Step 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="glass-card border-teal-500/20 hover:border-teal-500/30 bg-teal-500/5 p-6 rounded-xl relative group hover:scale-[1.02] transition-all duration-300"
            >
              <span className="absolute -top-4 left-6 bg-linear-to-r from-teal-500 to-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg shadow-teal-500/20">
                5
              </span>
              <h3 className="font-prompt font-bold text-teal-400 mt-2 mb-2 group-hover:text-teal-300 transition-colors">
                Stage Mock-up
              </h3>
              <p className="font-prompt text-sm text-white/70 leading-relaxed">
                จำลองการเล่นสดโดยไม่มีคลิกแทร็กกลางลำโพง ฝึกสัญชาตญาณการฟังเพื่อน
              </p>
            </motion.div>
            
            {/* Step 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="glass-card border-teal-500/20 hover:border-teal-500/30 bg-teal-500/5 p-6 rounded-xl relative group hover:scale-[1.02] transition-all duration-300"
            >
              <span className="absolute -top-4 left-6 bg-linear-to-r from-teal-500 to-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg shadow-teal-500/20">
                6
              </span>
              <h3 className="font-prompt font-bold text-teal-400 mt-2 mb-2 group-hover:text-teal-300 transition-colors">
                Emergency Drill
              </h3>
              <p className="font-prompt text-sm text-white/70 leading-relaxed">
                ซ้อมรับมือเหตุการณ์ &quot;Show Must Go On&quot; เมื่อเพื่อนเล่นหลุด หรือเครื่องดนตรีมีปัญหา
              </p>
            </motion.div>
          </div>
        </section>

        {/* Deep Dive: Rhythm & Dynamic Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          
          {/* Radar Chart Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card border-white/8 bg-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-prompt text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-teal-400" />
                ทักษะที่ต้องเน้นย้ำ (Core Skills Radar)
              </h3>
              <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillData}>
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      stroke="rgba(255,255,255,0.5)"
                      tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "var(--font-prompt)" }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      stroke="rgba(255,255,255,0.2)"
                      tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                    />
                    <Radar
                      name="เป้าหมายหลังการซ้อม 2 ชม."
                      dataKey="A"
                      stroke="#0d9488"
                      fill="#0d9488"
                      fillOpacity={0.25}
                    />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <p className="font-prompt text-sm text-white/55 mt-6 leading-relaxed">
              ในการทำ Band Clinic วิทยากรจะประเมิน 5 แกนหลักนี้เป็นพิเศษ โดยเฉพาะ <strong className="text-teal-400 font-semibold">&apos;ความนิ่งของจังหวะ&apos;</strong> และ <strong className="text-teal-400 font-semibold">&apos;การบาลานซ์เสียง&apos;</strong> ซึ่งเป็นพื้นฐานที่นักดนตรีวัยรุ่นมักจะพลาดเมื่อมีความตื่นเต้นเข้ามาเกี่ยวข้อง
            </p>
          </motion.div>

          {/* Area Chart Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card border-white/8 bg-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-prompt text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-sky-400" />
                การจัดการพลังงานใน 1 เพลง (Dynamic Energy)
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={dynamicData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                      dataKey="name"
                      stroke="rgba(255,255,255,0.4)"
                      tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: "var(--font-prompt)" }}
                    />
                    <YAxis
                      stroke="rgba(255,255,255,0.4)"
                      tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: "var(--font-prompt)" }}
                      unit="%"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      name="ระดับพลังงาน"
                      type="monotone"
                      dataKey="energy"
                      stroke="#0284c7"
                      fillOpacity={1}
                      fill="url(#colorEnergy)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <p className="font-prompt text-sm text-white/55 mt-6 leading-relaxed">
              กราฟแสดงการคุมระดับความดัง (Volume) ที่เหมาะสม: ท่อน Verse ต้องเปิดพื้นที่ให้เสียงร้อง ส่วนท่อน Chorus คือการระเบิดพลังร่วมกับจังหวะที่แม่นยำ การฝึก Dynamic จะช่วยให้วง <strong className="text-sky-400 font-semibold">&quot;ดูแพง&quot;</strong> และ <strong className="text-sky-400 font-semibold">&quot;มีรสนิยม&quot;</strong>
            </p>
          </motion.div>
        </section>

        {/* Conclusion Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card border-white/8 bg-black/40 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Ambient Footer Glow */}
          <div className="absolute inset-0 bg-linear-to-br from-sky-500/5 to-teal-500/5 pointer-events-none" />
          
          <h2 className="font-prompt text-2xl font-bold text-white mb-4">เป้าหมายสุดท้าย: &quot;Lock & Flow&quot;</h2>
          <p className="font-prompt text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            เมื่อเราฝึกซ้อมอย่างหนักกับ Click Track จนจังหวะเข้าไปอยู่ในจิตสำนึก เราจะไม่ต้องกังวลเรื่อง &quot;หลุด&quot; อีกต่อไป และจะสามารถใช้สมองไปโฟกัสที่การ &quot;สื่อสารอารมณ์เพลง&quot; ได้อย่างเต็มที่
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <div className="text-center py-4 sm:py-0">
              <div className="text-4xl font-bold text-sky-400 font-prompt">120</div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-prompt mt-2">นาทีซ้อมทองคำ</div>
            </div>
            <div className="text-center py-4 sm:py-0">
              <div className="text-4xl font-bold text-teal-400 font-prompt">100%</div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-prompt mt-2">ความพร้อมบันทึกเสียง</div>
            </div>
            <div className="text-center py-4 sm:py-0">
              <div className="text-4xl font-bold text-amber-400 font-prompt">0</div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-prompt mt-2">อัตราการหยุดกลางคัน</div>
            </div>
          </div>
        </motion.footer>

      </div>
    </div>
  );
}

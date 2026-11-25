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
import { Sparkles, Award, Zap } from "lucide-react";
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

interface TooltipProps {
  active?: boolean;
  label?: string | number;
  payload?: Array<{ name?: string; value?: number | string; color?: string; fill?: string }>;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 border border-[#E2E8F0] bg-white shadow-md rounded-xl text-xs font-prompt">
        <p className="text-[#64748B] mb-1.5 font-medium">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 my-0.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color || entry.fill }}
            />
            <span className="text-[#0F172A] font-semibold">
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
    <div className="w-full relative overflow-hidden bg-[#FAF8F5] text-[#1E293B] pt-10 md:pt-14 pb-24 min-h-screen font-prompt">
      <div className="max-w-6xl mx-auto px-4 relative z-10">

        {/* Header / Hero Section */}
        <header className="text-center mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-200 bg-sky-50 text-sky-800 text-sm font-prompt font-semibold"
          >
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>TRAINING STRATEGY: BAND CLINIC PREP</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-prompt text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight"
          >
            เจาะลึกกลยุทธ์การฝึก{" "}
            <span className="text-[#0284C7]">Band Grooving</span>
            <br />
            และการเล่นกับ{" "}
            <span className="text-[#0F766E]">Click Track</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-[#475569] font-prompt leading-relaxed max-w-3xl mx-auto"
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
            className="border border-[#E2E8F0] bg-white rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="font-prompt text-2xl font-bold text-[#0F172A] border-l-4 border-[#0284C7] pl-4">
                  ทำไมต้องให้ความสำคัญกับ Click Track?
                </h2>
                <p className="font-prompt text-base text-[#475569] leading-relaxed">
                  สถิติจากการบันทึกเสียงสดพบว่า วงที่ไม่ได้ฝึกกับ Click Track จะมีอัตราความคลาดเคลื่อนของจังหวะ (Timing Deviation) สูงถึง 15-20% ในท่อนส่ง ซึ่งส่งผลให้การตัดต่อเสียง (Editing) ทำได้ยากและสูญเสีย &quot;Groove&quot; ที่เป็นธรรมชาติไป แผนการซ้อมนี้จึงมุ่งเน้นการลดความคลาดเคลื่อนให้เหลือต่ำกว่า 2%
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0284C7] text-xl font-extrabold shrink-0">
                      90%
                    </div>
                    <p className="font-prompt text-sm font-medium text-[#1E293B]">
                      คือโอกาสล่มของวงในห้องอัดหาก &quot;กลองและเบส&quot; ไม่เกาะจังหวะกัน
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0F766E] text-xl font-extrabold shrink-0">
                      40%
                    </div>
                    <p className="font-prompt text-sm font-medium text-[#1E293B]">
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
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis
                        dataKey="name"
                        stroke="#94A3B8"
                        tick={{ fill: "#475569", fontSize: 11, fontFamily: "var(--font-prompt)" }}
                      />
                      <YAxis
                        stroke="#94A3B8"
                        tick={{ fill: "#475569", fontSize: 11, fontFamily: "var(--font-prompt)" }}
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
                          color: "#475569",
                        }}
                      />
                      <Bar
                        name="เล่นตามใจ (Amateur)"
                        dataKey="amateur"
                        fill="#E11D48"
                        radius={[6, 6, 0, 0]}
                      />
                      <Bar
                        name="เกาะคลิกแทร็ก (Molegoon)"
                        dataKey="pro"
                        fill="#0284C7"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="font-prompt text-[11px] text-center text-[#64748B]">
                  เปรียบเทียบค่าความแปรปรวนของจังหวะระหว่างวงที่ฝึกและไม่ฝึกกับคลิกแทร็ก
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Process Flow Section */}
        <section className="mb-20">
          <div className="text-center mb-12 space-y-2">
            <h2 className="font-prompt text-3xl font-extrabold text-[#0F172A]">เส้นทางการพัฒนา (Training Path)</h2>
            <p className="font-prompt text-base text-[#475569]">กระบวนการ 6 ขั้นตอนเพื่อสร้างความเสถียรใน 120 นาที</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: "1",
                title: "Individual Sync",
                desc: "จูนประสาทสัมผัสรายคนกับ Metronome เพื่อหาจุด Rush/Drag ของแต่ละบุคคล",
                tone: "sky",
              },
              {
                num: "2",
                title: "Rhythm Backbone",
                desc: "ล็อก Drum & Bass ให้กลายเป็นเนื้อเดียวกัน เน้นความหนาของ Kick และ Bass Note",
                tone: "sky",
              },
              {
                num: "3",
                title: "Full Integration",
                desc: "ประกอบร่างเครื่องดนตรีทั้งหมดและเสียงร้อง โดยมี Click Track คุมระบบภาพรวม",
                tone: "sky",
              },
              {
                num: "4",
                title: "Dynamic Control",
                desc: "ฝึกการผ่อน-เร่ง อารมณ์เพลง (เบา-ดัง) เพื่อสร้างมิติ ไม่ให้ซาวด์บวมและแย่งกันดัง",
                tone: "teal",
              },
              {
                num: "5",
                title: "Stage Mock-up",
                desc: "จำลองการเล่นสดโดยไม่มีคลิกแทร็กกลางลำโพง ฝึกสัญชาตญาณการฟังเพื่อน",
                tone: "teal",
              },
              {
                num: "6",
                title: "Emergency Drill",
                desc: 'ซ้อมรับมือเหตุการณ์ "Show Must Go On" เมื่อเพื่อนเล่นหลุด หรือเครื่องดนตรีมีปัญหา',
                tone: "teal",
              },
            ].map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="border border-[#E2E8F0] hover:border-sky-300 bg-white shadow-sm hover:shadow-md p-6 rounded-3xl relative group transition-all duration-300"
              >
                <span
                  className={`absolute -top-4 left-6 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-xs ${
                    step.tone === "sky" ? "bg-[#0284C7]" : "bg-[#0F766E]"
                  }`}
                >
                  {step.num}
                </span>
                <h3
                  className={`font-prompt font-bold mt-2 mb-2 ${
                    step.tone === "sky" ? "text-[#0284C7]" : "text-[#0F766E]"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="font-prompt text-sm text-[#475569] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
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
            className="border border-[#E2E8F0] bg-white shadow-sm rounded-3xl p-6 md:p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-prompt text-xl font-bold text-[#0F172A] mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#0F766E]" />
                ทักษะที่ต้องเน้นย้ำ (Core Skills Radar)
              </h3>
              <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillData}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis
                      dataKey="subject"
                      stroke="#94A3B8"
                      tick={{ fill: "#334155", fontSize: 11, fontFamily: "var(--font-prompt)" }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      stroke="#CBD5E1"
                      tick={{ fill: "#64748B", fontSize: 10 }}
                    />
                    <Radar
                      name="เป้าหมายหลังการซ้อม 2 ชม."
                      dataKey="A"
                      stroke="#0D9488"
                      fill="#0D9488"
                      fillOpacity={0.22}
                    />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <p className="font-prompt text-sm text-[#475569] mt-6 leading-relaxed">
              ในการทำ Band Clinic วิทยากรจะประเมิน 5 แกนหลักนี้เป็นพิเศษ โดยเฉพาะ <strong className="text-[#0F766E] font-semibold">&apos;ความนิ่งของจังหวะ&apos;</strong> และ <strong className="text-[#0F766E] font-semibold">&apos;การบาลานซ์เสียง&apos;</strong> ซึ่งเป็นพื้นฐานที่นักดนตรีวัยรุ่นมักจะพลาดเมื่อมีความตื่นเต้นเข้ามาเกี่ยวข้อง
            </p>
          </motion.div>

          {/* Area Chart Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-[#E2E8F0] bg-white shadow-sm rounded-3xl p-6 md:p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-prompt text-xl font-bold text-[#0F172A] mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#0284C7]" />
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
                        <stop offset="5%" stopColor="#0284C7" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#0284C7" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis
                      dataKey="name"
                      stroke="#94A3B8"
                      tick={{ fill: "#475569", fontSize: 11, fontFamily: "var(--font-prompt)" }}
                    />
                    <YAxis
                      stroke="#94A3B8"
                      tick={{ fill: "#475569", fontSize: 11, fontFamily: "var(--font-prompt)" }}
                      unit="%"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      name="ระดับพลังงาน"
                      type="monotone"
                      dataKey="energy"
                      stroke="#0284C7"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorEnergy)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <p className="font-prompt text-sm text-[#475569] mt-6 leading-relaxed">
              กราฟแสดงการคุมระดับความดัง (Volume) ที่เหมาะสม: ท่อน Verse ต้องเปิดพื้นที่ให้เสียงร้อง ส่วนท่อน Chorus คือการระเบิดพลังร่วมกับจังหวะที่แม่นยำ การฝึก Dynamic จะช่วยให้วง <strong className="text-[#0284C7] font-semibold">&quot;ดูแพง&quot;</strong> และ <strong className="text-[#0284C7] font-semibold">&quot;มีรสนิยม&quot;</strong>
            </p>
          </motion.div>
        </section>

        {/* Conclusion Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-[#E2E8F0] bg-white shadow-sm rounded-3xl p-8 md:p-12 text-center"
        >
          <h2 className="font-prompt text-2xl font-extrabold text-[#0F172A] mb-4">เป้าหมายสุดท้าย: &quot;Lock &amp; Flow&quot;</h2>
          <p className="font-prompt text-[#475569] mb-10 max-w-2xl mx-auto leading-relaxed">
            เมื่อเราฝึกซ้อมอย่างหนักกับ Click Track จนจังหวะเข้าไปอยู่ในจิตสำนึก เราจะไม่ต้องกังวลเรื่อง &quot;หลุด&quot; อีกต่อไป และจะสามารถใช้สมองไปโฟกัสที่การ &quot;สื่อสารอารมณ์เพลง&quot; ได้อย่างเต็มที่
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0]">
            <div className="text-center py-4 sm:py-0">
              <div className="text-4xl font-extrabold text-[#0284C7] font-prompt">120</div>
              <div className="text-xs uppercase tracking-widest text-[#64748B] font-prompt mt-2">นาทีซ้อมทองคำ</div>
            </div>
            <div className="text-center py-4 sm:py-0">
              <div className="text-4xl font-extrabold text-[#0F766E] font-prompt">100%</div>
              <div className="text-xs uppercase tracking-widest text-[#64748B] font-prompt mt-2">ความพร้อมบันทึกเสียง</div>
            </div>
            <div className="text-center py-4 sm:py-0">
              <div className="text-4xl font-extrabold text-[#D97706] font-prompt">0</div>
              <div className="text-xs uppercase tracking-widest text-[#64748B] font-prompt mt-2">อัตราการหยุดกลางคัน</div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

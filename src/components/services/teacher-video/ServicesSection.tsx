"use client";

import { motion } from "framer-motion";
import { BookOpen, Video, Award, CheckCircle, ArrowRight, LucideIcon } from "lucide-react";
import { FaLine } from "react-icons/fa6";

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  price: string;
  badge?: string;
  accentColor: string;
  borderColor: string;
  glowColor: string;
  gradientFrom: string;
  gradientTo: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    icon: BookOpen,
    title: "ออกแบบแผนการสอน & สคริปต์",
    subtitle: "Active Learning Plan & Script",
    description: "วางโครงร่างแผนการจัดการเรียนรู้ให้สอดคล้องกับ 8 ตัวชี้วัดของ ก.ค.ศ. เกณฑ์ใหม่ล่าสุด ดึงศักยภาพของผู้เรียนและสไตล์การสอนของคุณออกมาเด่นชัดที่สุด",
    features: [
      "เขียนแผนการจัดการเรียนรู้ (Active Learning) ตรงตามเกณฑ์",
      "วางแผนสคริปต์ขั้นตอนจัดกิจกรรมการเรียนรู้แบบเป็นขั้นตอน",
      "แนะนำจุดสอดแทรกคำถามกระตุ้นความคิดผู้เรียน",
      "ผสานสื่อการเรียนการสอนและเครื่องมือประเมินผลอย่างเป็นระบบ",
      "แถมฟรี! คู่มือ Checklist การตรวจรับแผนและคลิป PA"
    ],
    price: "เริ่มต้น ฿1,900",
    badge: "เตรียมความพร้อม",
    accentColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    glowColor: "rgba(59,130,246,0.15)",
    gradientFrom: "from-blue-600",
    gradientTo: "to-cyan-500"
  },
  {
    icon: Video,
    title: "ที่ปรึกษาถ่ายทำ & ผลิตตัดต่อคลิป",
    subtitle: "PA Video Consultation & Editing",
    description: "บริการให้คำปรึกษาการตั้งกล้องและบันทึกคลิปการสอน (PA 1 - ห้ามตัดต่อ) พร้อมรับตัดต่อคลิปเสนอสภาพปัญหา/ที่มา (PA 2 - ไม่เกิน 10 นาที) แทรกกราฟิกสุดโปร",
    features: [
      "คู่มือแนะนำการตั้งกล้อง บันทึกภาพและเสียงคลิปการสอน (PA 1)",
      "ตัดต่อคลิปสภาพปัญหา (PA 2) แทรกภาพประกอบ กราฟิก และสื่อ",
      "ปรับระดับเสียง ตัดเสียงรบกวนรอบข้าง (Noise Reduction)",
      "ปรับแต่งสีภาพวิดีโอให้สว่าง คมชัด ดูสบายตากรรมการประเมิน",
      "ตรวจสอบวิดีโอให้ตรงตามเงื่อนไขทางเทคนิคระบบ DPA 100%"
    ],
    price: "เริ่มต้น ฿3,500",
    badge: "ยอดนิยมที่สุด",
    accentColor: "text-green-400",
    borderColor: "border-green-500/20",
    glowColor: "rgba(6,199,85,0.15)",
    gradientFrom: "from-green-600",
    gradientTo: "to-emerald-500"
  },
  {
    icon: Award,
    title: "เทรนนิ่ง & โค้ชชิ่งวิทยฐานะตัวต่อตัว",
    subtitle: "1-on-1 Coaching & Tech Integration",
    description: "เตรียมตัวคุณครูแบบลงลึกรายบุคคล ตั้งแต่วิธีการพูด บุคลิกภาพในการสอน ไปจนถึงการประยุกต์ใช้แพลตฟอร์มเทคโนโลยีการศึกษาเพื่อทำนวัตกรรมในชั้นเรียน",
    features: [
      "ซักซ้อมลำดับขั้นตอนการสอนจริงผ่าน Online Meet แบบตัวต่อตัว",
      "โค้ชชิ่งเทคนิคการรักษาบรรยากาศการเรียนและกระตุ้นการมีส่วนร่วม",
      "สอนการใช้แอปพลิเคชันนวัตกรรม (เช่น Padlet, Wordwall, Kahoot)",
      "เก็งคำถามและเทคนิคการตอบกรรมการตามทฤษฎีการศึกษา",
      "ให้คำแนะนำจนถึงขั้นตอนการอัปโหลดเข้าเว็บไซต์ DPA"
    ],
    price: "เริ่มต้น ฿2,500",
    badge: "ปรึกษารายบุคคล",
    accentColor: "text-purple-400",
    borderColor: "border-purple-500/20",
    glowColor: "rgba(168,85,247,0.15)",
    gradientFrom: "from-purple-600",
    gradientTo: "to-pink-500"
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 scroll-mt-20">
      {/* Visual background lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold font-prompt">
            OUR SERVICES
          </span>
          <h2 className="font-prompt text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            บริการเพื่อความสำเร็จ{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
              ในทุกขั้นตอนของวิทยฐานะ PA
            </span>
          </h2>
          <p className="text-white/60 font-prompt text-base leading-relaxed">
            เลือกรับบริการเฉพาะด้านที่ท่านต้องการ หรือจัดชุดคอมโบตามเป้าหมายของระดับวิทยฐานะ (ชำนาญการ / ชำนาญการพิเศษ / เชี่ยวชาญ)
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative h-full flex flex-col"
              >
                {/* Glow ring */}
                <div
                  className="absolute -inset-0.5 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${service.glowColor}, transparent 70%)`,
                  }}
                />

                <div className={`relative flex flex-col h-full rounded-2xl glass-card p-6 sm:p-8 border ${service.borderColor} group-hover:border-white/20 transition-all duration-300`}>
                  
                  {/* Badge */}
                  {service.badge && (
                    <div className="absolute -top-3 left-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-prompt font-bold tracking-wide text-white bg-gradient-to-r ${service.gradientFrom} ${service.gradientTo} shadow-md`}>
                        {service.badge}
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6 pt-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className={`text-[10px] font-prompt font-semibold uppercase tracking-wider mb-0.5 ${service.accentColor}`}>
                        {service.subtitle}
                      </p>
                      <h3 className="font-prompt text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-200">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-prompt text-sm sm:text-base text-white/70 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 font-prompt leading-relaxed">
                        <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${service.accentColor}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pricing + Action */}
                  <div className="pt-6 border-t border-white/8 mt-auto flex flex-col gap-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-white/40 text-xs font-prompt">ประมาณการค่าบริการ</span>
                      <span className="text-white font-prompt font-bold text-xl sm:text-2xl">{service.price}</span>
                    </div>
                    <a
                      href="https://lin.ee/XXLvrKW"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center py-3 px-4 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-prompt font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_12px_rgba(6,199,85,0.2)]"
                    >
                      <FaLine className="w-4 h-4 text-white" />
                      ปรึกษารายละเอียดทาง LINE
                    </a>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Extra Note for PA Criteria */}
        <div className="mt-12 p-5 rounded-2xl glass-card border border-white/5 bg-white/1 text-center max-w-4xl mx-auto">
          <p className="font-prompt text-xs sm:text-sm text-white/60 leading-relaxed">
            <span className="text-amber-400 font-bold">💡 ข้อมูลสำคัญตามเกณฑ์ ก.ค.ศ.:</span> ในส่วนของ <span className="text-white font-semibold">"คลิปการสอน (PA 1)"</span> ต้องเป็นวิดีโอที่บันทึกแบบยาวต่อเนื่อง (Long Take) และห้ามตัดต่อภาพ/เสียงโดยเด็ดขาด 
            ทางเราจะทำหน้าที่เป็น <span className="text-white font-semibold">ที่ปรึกษาให้คำแนะนำ</span> ในการเซ็ตติ้งอุปกรณ์และสคริปต์ 
            ส่วน <span className="text-white font-semibold">"คลิปเสนอสภาพปัญหา (PA 2)"</span> สามารถถ่ายทำและตัดต่อเพื่อนำเสนอสื่อประกอบได้ตามปกติครับ
          </p>
        </div>

      </div>
    </section>
  );
}

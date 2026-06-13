"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronDown, CheckCircle2, ShieldQuestion, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  subject: string;
  rating: number;
  text: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "คุณครูศิริพงษ์",
    role: "ครูชำนาญการพิเศษ",
    subject: "กลุ่มสาระฯ คณิตศาสตร์",
    rating: 5,
    text: "ก่อนร่วมงานเครียดมากเรื่อง 8 ตัวชี้วัดเกณฑ์ PA กลัวทำไม่ถูกจุด แต่พอทีมงาน AiAon เข้ามาช่วยวางลอจิกแผนการสอนและช่วยตัดต่อคลิปสภาพปัญหา (PA 2) งานออกมาน่าสนใจ เข้าใจง่าย กรรมการชมว่าคลิปดูเป็นมืออาชีพมาก และผ่านการประเมินรอบแรกเลยครับ"
  },
  {
    name: "คุณครูณิชชา",
    role: "ครูชำนาญการ",
    subject: "กลุ่มสาระฯ วิทยาศาสตร์และเทคโนโลยี",
    rating: 5,
    text: "ประทับใจการเทรนนิ่งที่ปรึกษาแบบตัวต่อตัวมากค่ะ สอนเทคนิคการตั้งกล้องและไมค์ลอยล่วงหน้า ทำให้คลิปการสอนจริง (PA 1) ออกมาภาพและเสียงคมชัดระดับ Full HD ไม่ทำผิดเกณฑ์ประเมิน ลดความกังวลไปได้เยอะ แนะนำเพื่อนครูหลายคนให้ใช้บริการแล้วค่ะ"
  },
  {
    name: "คุณครูจิรายุ",
    role: "ครูชำนาญการพิเศษ",
    subject: "กลุ่มสาระฯ ภาษาต่างประเทศ",
    rating: 5,
    text: "ขอบคุณเพื่อนร่วมวิชาชีพจาก AiAon Tech ที่ช่วยเช็ครายละเอียดแผนการจัดการเรียนรู้ให้ตอบโจทย์เชิงประเมิน การจัดลำดับสคริปต์ Active Learning ลงตัวมากๆ ช่วยทุ่นแรงและประหยัดเวลาครูในยุคนี้ได้จริงๆ ครับ คุ้มค่าและแนะนำมากๆ ครับ"
  }
];

const FAQS: FAQItem[] = [
  {
    question: "1. เกณฑ์คลิปการสอน (PA 1) ห้ามนำมาตัดต่อและดัดแปลงเลยใช่ไหม?",
    answer: "ใช่ครับ ตามหลักเกณฑ์ ก.ค.ศ. ล่าสุด วิดีโอบันทึกชั่วโมงการสอนจริง (ไม่เกิน 60 นาที) จะต้องบันทึกแบบยาวต่อเนื่อง (Long Take) นับตั้งแต่จุดเริ่มต้นคาบจนจบคาบ ห้ามมีการหยุดกล้อง ห้ามหยุดเสียง ห้ามแพลนกล้องแบบใช้มุมกล้องตัดต่อ และห้ามตัดรูปภาพ/วีดีโอมาประติดประต่อกันเด็ดขาด ทางทีมงาน AiAon Tech จึงเน้นการให้บริการเป็น 'ที่ปรึกษาร่วมวางแผน ออกแบบกระบวนการ และจัดเตรียมระบบเสียง/มุมกล้อง' เพื่อให้ครูสามารถแสดงการสอนผ่านไปได้ด้วยดีในเทคเดียวครับ"
  },
  {
    question: "2. วิดีโอสภาพปัญหา ที่มา หรือแรงบันดาลใจ (PA 2) สามารถตัดต่อและใส่สื่อประกอบได้ไหม?",
    answer: "สามารถตัดต่อได้อย่างเต็มที่ครับ ตามเกณฑ์กำหนดให้วิดีโอนำเสนอสภาพปัญหาแรงบันดาลใจมีสเปกความยาวไม่เกิน 10 นาที ซึ่งสามารถนำเสนอสไลด์ แทรกผลงานเด็ก แทรกคลิปภาพกิจกรรมสั้นๆ หรือตกแต่งกราฟิกคำอธิบาย อินโฟกราฟิกเพื่ออธิบายประเด็นท้าทาย (Challenge Point) ให้กรรมการมองเห็นภาพที่ชัดเจนที่สุดได้ ซึ่งบริการถ่ายทำและตัดต่อส่วนนี้เราดูแลให้แบบพรีเมียมครบวงจรครับ"
  },
  {
    question: "3. ถ้าครูไม่มีอุปกรณ์ เช่น กล้อง หรือไมโครโฟนไร้สาย ทาง AiAon Tech มีคำแนะนำอย่างไร?",
    answer: "เรามีคู่มือแนะนำอุปกรณ์และเซ็ตติ้งเสริมราคาประหยัดสำหรับคุณครู เช่น ไมโครโฟนไร้สายสำหรับต่อโทรศัพท์มือถือ หรือขาตั้งกล้องที่มั่นคง ซึ่งคุณครูสามารถหาซื้อเพื่อใช้งานระยะยาวได้ หรือหากอยู่ในระดับบริการแบบถ่ายทำนอกสถานที่ ทีมงานของเราจะยกอุปกรณ์กล้องและระบบเสียงระดับสตูดิโอเข้าไปจัดเตรียม อำนวยความสะดวกในห้องเรียนของท่านอย่างสมบูรณ์แบบครับ"
  },
  {
    question: "4. บริการวางแผนแผนการสอนและสคริปต์ มีการรับประกันความสอดคล้องอย่างไร?",
    answer: "แผนการสอนทุกชิ้นจะถูกสร้างและตรวจสอบความถูกต้องแบบข้อต่อข้อตามเกณฑ์ 8 ตัวชี้วัดสำคัญของ ก.ค.ศ. โดยครูพี่เลี้ยงที่มีความรู้และประสบการณ์ หากพบว่ามีข้อเสนอแนะหรือประเด็นท้าทายไม่สอดคล้องกับคลิปการสอนที่บันทึก เรามีบริการช่วยเหลือตรวจแก้อิงตามโครงสร้างขอบข่ายงานเพื่อให้มั่นใจสูงสุดก่อนอัปโหลดขึ้น DPA"
  },
  {
    question: "5. หากต้องการเริ่มต้นประเมินผลงานและปรึกษาเบื้องต้น มีค่าใช้จ่ายหรือไม่?",
    answer: "ไม่มีค่าใช้จ่ายใดๆ ทั้งสิ้นครับ คุณครูสามารถแอด Line OA เข้ามาทักทาย เล่าความต้องการ ระดับวิทยฐานะเป้าหมาย (ชำนาญการ/ชำนาญการพิเศษ/เชี่ยวชาญ) และแชร์ไอเดียเบื้องต้น ทีมงานเรายินดีให้คำปรึกษา ออกแบบแนวคิด และประเมินแนวทางการประเมินให้ฟรี เพื่อช่วยให้คุณครูเห็นภาพรวมก่อนตัดสินใจครับ"
  }
];

export function SocialProofFAQSection() {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 border-t border-white/5 bg-zinc-950/20">
      {/* Glow Orbs */}
      <div className="absolute top-[10%] left-[-150px] w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-100px] w-[500px] h-[500px] bg-cyan-600/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* ============================================================
            SOCIAL PROOF (TESTIMONIALS)
           ============================================================ */}
        <div className="space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold font-prompt">
              TESTIMONIALS
            </span>
            <h2 className="font-prompt text-3xl sm:text-4xl font-bold text-white leading-tight">
              เสียงตอบรับจาก{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-green-400">
                คุณครูผู้ผ่านเกณฑ์ประเมินจริง
              </span>
            </h2>
            <p className="text-white/60 font-prompt text-sm sm:text-base leading-relaxed">
              ร่วมงานกับเราและก้าวสู่ความก้าวหน้าทางวิชาชีพอย่างไร้กังวล
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div 
                key={testimonial.name}
                className="relative glass-card border border-white/5 p-6.5 sm:p-8 flex flex-col justify-between hover:border-white/10 transition-colors duration-300 rounded-2xl"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-white/5 pointer-events-none">
                  <Quote className="w-12 h-12 rotate-180 fill-white/5" />
                </div>

                <div className="space-y-4 relative z-10">
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="font-prompt text-xs sm:text-sm text-white/80 leading-relaxed font-light italic">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Profile Detail */}
                <div className="mt-6 pt-5 border-t border-white/8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-prompt font-semibold text-sm">
                    {testimonial.name.slice(6, 8) || "ครู"}
                  </div>
                  <div>
                    <h4 className="font-prompt text-sm font-bold text-white leading-tight">
                      {testimonial.name}
                    </h4>
                    <p className="font-prompt text-[10px] sm:text-xs text-white/40 mt-0.5">
                      {testimonial.role} | {testimonial.subject}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================
            FAQ SECTION
           ============================================================ */}
        <div className="space-y-16 max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold font-prompt">
              QUESTIONS & ANSWERS
            </span>
            <h2 className="font-prompt text-3xl sm:text-4xl font-bold text-white leading-tight">
              คำถามที่พบบ่อยเกี่ยวกับการประเมิน{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-green-400">
                และวิดีโอวิทยฐานะ PA
              </span>
            </h2>
            <p className="text-white/60 font-prompt text-sm sm:text-base leading-relaxed">
              ไขข้อสงสัยในหลักเกณฑ์ ก.ค.ศ. และรูปแบบการบริการของเรา
            </p>
          </div>

          <div className="space-y-4.5">
            {FAQS.map((faq, index) => {
              const isOpen = openFAQIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/5 glass-card overflow-hidden transition-all duration-300"
                >
                  {/* FAQ Header */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 hover:bg-white/2 transition-colors focus:outline-none"
                  >
                    <span className="font-prompt text-sm sm:text-base font-semibold text-white leading-snug pr-2">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-blue-500/10" : ""}`}>
                      <ChevronDown className={`w-4 h-4 transition-colors ${isOpen ? "text-blue-400" : "text-white/50"}`} />
                    </div>
                  </button>

                  {/* FAQ Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="p-5 sm:p-6 pt-0 border-t border-white/4 bg-white/1 font-prompt text-xs sm:text-sm text-white/70 leading-relaxed font-light space-y-2">
                          <p className="whitespace-pre-line">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Users, Bell, Sparkles, BarChart3, FileText } from "lucide-react";

export function SaaSSection() {
  return (
    <section className="py-32 px-4 relative z-10 max-w-7xl mx-auto">
       <div className="flex flex-col md:flex-row items-center gap-16">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex-1 w-full relative"
        >
          <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
          <div className="glass-panel rounded-2xl border border-white/10 p-6 relative">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
               <div className="w-3 h-3 rounded-full bg-red-500"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
               <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/5 rounded-xl block p-4 flex items-center justify-between border border-white/5">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="h-4 w-24 bg-white/10 rounded mb-2 block"></div>
                        <div className="h-3 w-16 bg-white/5 rounded block"></div>
                      </div>
                   </div>
                   <div className="h-8 w-20 bg-green-500/20 rounded-full flex items-center justify-center text-xs text-green-400 font-medium">
                      Active
                   </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="flex-1 space-y-8 font-prompt">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            จัดการงานครู <span className="text-blue-400">ครบจบในที่เดียว</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            รวมระบบอัตโนมัติ เครื่องมือช่วยงาน และบริการพิเศษ ที่ออกแบบมาเพื่อช่วยลดภาระงานเอกสารและเพิ่มประสิทธิภาพในการทำงานของคุณครูยุคใหม่
          </p>

          <ul className="space-y-4">
            {[
              { label: "ระบบเช็คชื่อและติดตามนักเรียนอัตโนมัติ", icon: Users },
              { label: "แจ้งเตือนผ่าน LINE API ทันที", icon: Bell },
              { label: "ระบบสรุปผลและรายงานข้อมูลอัจฉริยะ", icon: BarChart3 },
              { label: "เครื่องมือและสคริปต์ช่วยงานเอกสาร", icon: FileText }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-white/80"
                >
                  <Icon className="w-6 h-6 text-blue-500 shrink-0" />
                  <span className="font-medium text-lg">{item.label}</span>
                </motion.li>
              );
            })}
          </ul>

          <button className="mt-8 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 font-medium transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2 active:scale-95 transition-all">
            <Sparkles className="w-5 h-5" /> เริ่มต้นใช้งานระบบ
          </button>
        </div>

       </div>
    </section>
  );
}

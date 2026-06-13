"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code, Rocket, Music, Guitar } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  return (
    <section className="py-24 px-4 relative z-10 max-w-7xl mx-auto" id="about">
      <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-32 -left-10 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-10 w-96 h-96 bg-amber-500/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
          
          {/* Image Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full p-2 shrink-0 relative"
          >
            {/* Dual color border simulation */}
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-blue-400 via-transparent to-amber-400 opacity-50 blur-sm pointer-events-none"></div>
            <div className="absolute inset-1 rounded-full bg-linear-to-br from-blue-500 to-amber-500 p-0.5 pointer-events-none mask-gradient">
                 <div className="w-full h-full bg-black rounded-full pointer-events-none"></div>
            </div>
            
            <div className="w-full h-full rounded-full bg-white/5 overflow-hidden relative flex items-center justify-center backdrop-blur-sm z-10 border border-white/10">
                <Image 
                  src="/me.png" 
                  alt="AiAon Tech" 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, 256px"
                  priority
                />
            </div>
          </motion.div>

          {/* Bios and Details */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-prompt text-3xl md:text-5xl font-bold text-white mb-2"
              >
                My <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-amber-400">Journey</span>
              </motion.h2>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl font-medium font-prompt"
              >
                <span className="text-blue-400">Government Teacher</span> 
                <span className="text-white/40 mx-2">·</span> 
                <span className="text-amber-400">Music Enthusiast</span>
              </motion.h3>
            </div>

            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-white/70 text-lg leading-relaxed font-prompt"
            >
              ด้วยหัวใจที่รักในการสอนดนตรีและหลงใหลในเทคโนโลยี ผมผสานบทบาทข้าราชการครูเข้ากับการเขียนโปรแกรม สร้างสรรค์ระบบ Automation เพื่อลดภาระงานเอกสาร และเปิดพื้นที่ให้ศิลปะและดนตรีเบ่งบานไปพร้อมกับนวัตกรรม
            </motion.p>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start"
            >
              {[
                { icon: GraduationCap, text: "Educational Tech", color: "text-blue-400" },
                { icon: Rocket, text: "School Automation", color: "text-cyan-400" },
                { icon: Music, text: "Music Theory", color: "text-amber-400" },
                { icon: Guitar, text: "Acoustic Sessions", color: "text-orange-400" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-white/80 text-sm hover:bg-white/10 transition-colors cursor-default">
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <span className="font-prompt">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

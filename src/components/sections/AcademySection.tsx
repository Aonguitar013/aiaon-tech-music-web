"use client";

import { motion } from "framer-motion";
import { BookOpen, Code2, Database, LayoutDashboard } from "lucide-react";

const courses = [
  {
    title: "Next.js Fullstack Masterclass",
    desc: "Build scalable web apps with App Router & Supabase.",
    icon: LayoutDashboard,
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Workflow Automation Pro",
    desc: "Automate your daily tasks with n8n & Google Apps Script.",
    icon: Database,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Advanced Tailwind Architecture",
    desc: "Master utility frameworks for enterprise apps.",
    icon: Code2,
    color: "from-emerald-400 to-teal-500"
  }
];

export function AcademySection() {
  return (
    <section className="py-24 px-4 relative z-10 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-prompt text-3xl md:text-5xl font-bold mb-4">Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Academy</span></h2>
        <p className="text-white/50 max-w-2xl mx-auto">Learn production-ready skills through immersive crash courses and detailed walkthroughs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-card p-6 flex flex-col gap-4 group cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <course.icon className="text-white w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-prompt text-white mt-4">{course.title}</h3>
            <p className="text-white/60 text-sm">{course.desc}</p>
            
            <div className="mt-auto pt-6 flex items-center text-sm font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <BookOpen className="w-4 h-4 mr-2" /> View Course Enrollment
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

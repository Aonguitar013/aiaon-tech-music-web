"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useBrandTheme } from "@/components/providers/BrandThemeProvider";

interface Course {
  id: string;
  title: string;
  description: string;
  icon_name?: string;
  color_gradient?: string;
  image_url?: string;
  category?: string;
}

function getIconComponent(name?: string) {
  return name ? ((Icons as any)[name] || Icons.BookOpen) : Icons.BookOpen;
}

interface AcademySectionProps {
  courses: Course[];
}

export function AcademySection({ courses }: AcademySectionProps) {
  const { brandTheme } = useBrandTheme();

  return (
    <section className="py-24 px-4 relative z-10 max-w-7xl mx-auto" id="academy">
      <div className="text-center mb-16 px-4">
        <h2 className="font-prompt text-4xl md:text-6xl font-bold mb-6 tracking-tight">Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Academy</span></h2>
        <p className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl font-prompt font-light leading-relaxed">Learn production-ready skills through immersive crash courses and detailed walkthroughs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course, idx) => {
          const isCourseActuallyMusic = course.category === "Music";
          const isMusic = isCourseActuallyMusic || brandTheme === "music";

          const themeColorHover = isMusic ? "hover:border-amber-500/40" : "hover:border-blue-500/30";
          const themeTextHover = isMusic ? "group-hover:text-amber-400" : "group-hover:text-blue-400";
          const fallbackGradient = isMusic
            ? (course.color_gradient || "from-amber-600 to-orange-400")
            : (course.color_gradient || "from-blue-500 to-cyan-400");
          
          const FallbackIcon = isMusic ? Icons.Music : Icons.BookOpen;

          return (
            <Link key={course.id} href={`/dashboard/academy/${course.id}`} className="group block h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`glass-card flex flex-col group cursor-pointer h-full ${themeColorHover} border-white/10 transition-all duration-300 relative overflow-hidden bg-white/5 shadow-2xl`}
              >
                {/* 16:9 Course Cover */}
                <div className={`relative w-full aspect-video shrink-0 bg-black/40 border-b border-white/10 overflow-hidden ${themeColorHover} transition-colors`}>
                  {course.image_url ? (
                    <Image 
                      src={course.image_url} 
                      alt={course.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100" 
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${fallbackGradient} flex items-center justify-center opacity-40 group-hover:opacity-70 transition-opacity duration-500`}>
                      <FallbackIcon className="w-12 h-12 text-white/50 group-hover:scale-110 group-hover:text-white/80 transition-all duration-500" />
                    </div>
                  )}
                </div>

                {/* Decorative glow at bottom */}
                <div className={`absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br ${fallbackGradient} opacity-5 group-hover:opacity-15 blur-[40px] rounded-full transition-opacity duration-500 pointer-events-none`}></div>

                <div className="p-6 flex flex-col flex-1 z-10 bg-gradient-to-b from-black/0 to-black/40">
                  <h3 className={`text-2xl font-bold font-prompt text-white mb-3 transition-colors line-clamp-2 leading-snug ${themeTextHover}`}>{course.title}</h3>
                  <p className="text-white/60 text-sm md:text-base font-prompt leading-relaxed line-clamp-3 mb-6 flex-1">{course.description}</p>
                  
                  <div className={`mt-auto pt-4 border-t border-white/10 flex items-center text-sm font-medium ${isMusic ? 'text-amber-400' : 'text-blue-400'} opacity-60 group-hover:opacity-100 transition-opacity`}>
                    <BookOpen className="w-4 h-4 mr-2" /> ดูรายละเอียดคอร์ส →
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* View All CTA */}
      <div className="mt-14 flex justify-center">
        <Link
          href="/dashboard/academy"
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-blue-500/40 text-white font-prompt font-semibold text-base hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-300 shadow-[0_0_0px_rgba(59,130,246,0)] hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]"
        >
          <span>ดูคอร์สทั้งหมด</span>
          <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
}

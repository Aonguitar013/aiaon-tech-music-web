"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useBrandTheme } from "@/components/providers/BrandThemeProvider";
import { cn } from "@/lib/utils";

interface Course {
  id: string;
  title: string;
  description: string;
  price?: string;
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
          // Parse info
          let rawDesc = course.description;
          let lessons = "ไม่ระบุ";
          let level = "Beginner";
          let instrument = "";
          
          // Check for Music format e.g. (Instrument: Guitar, Level: Beginner)
          const musicMatch = rawDesc.match(/\(Instrument:\s*(.+?),\s*Level:\s*(.+?)(?:,\s*Lessons:\s*(.+?))?\)/);
          const techMatch = rawDesc.match(/\(Lessons:\s*(.+?),\s*Level:\s*(.+?)\)/);

          if (musicMatch) {
             instrument = musicMatch[1];
             level = musicMatch[2];
             if (musicMatch[3]) lessons = musicMatch[3];
             rawDesc = rawDesc.replace(musicMatch[0], "").trim();
          } else if (techMatch) {
             lessons = techMatch[1];
             level = techMatch[2];
             rawDesc = rawDesc.replace(techMatch[0], "").trim();
          }

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
                  {(() => {
                    const lowerTitle = course.title.toLowerCase();
                    let mockImage = course.image_url;

                    if (!mockImage) {
                      if (lowerTitle.includes("gemini") || lowerTitle.includes("tts") || lowerTitle.includes("สั่ง ai")) {
                        mockImage = "/images/mockups/gemini_tts_cover.png";
                      } else if (lowerTitle.includes("bass boss")) {
                        mockImage = "/images/mockups/bass_boss_cover.png";
                      } else if (lowerTitle.includes("beat master")) {
                        mockImage = "/images/mockups/beat_master_cover.png";
                      } else if (lowerTitle.includes("folk guitar") || lowerTitle.includes("indie folk")) {
                        mockImage = "/images/mockups/indie_folk_guitar_cover.png";
                      } else if (lowerTitle.includes("typescript for production") || lowerTitle.includes("typescript")) {
                        mockImage = "/images/mockups/typescript_for_production_1779444015579.png";
                      } else if (lowerTitle.includes("framer motion")) {
                        mockImage = "/images/mockups/framer_motion_animations_1779443987741.png";
                      } else if (lowerTitle.includes("next.js") || lowerTitle.includes("nextjs")) {
                        mockImage = "/images/mockups/nextjs_masterclass_1779443916108.png";
                      } else if (lowerTitle.includes("workflow") || lowerTitle.includes("n8n")) {
                        mockImage = "/images/mockups/workflow_automation_pro_1779443939357.png";
                      } else if (lowerTitle.includes("tailwind")) {
                        mockImage = "/images/mockups/nextjs_masterclass_1779443916108.png";
                      } else if (lowerTitle.includes("apps script")) {
                        mockImage = "/images/mockups/apps_script_course_1779443157476.png";
                      } else if (lowerTitle.includes("node.js") || lowerTitle.includes("nodejs")) {
                        mockImage = "/images/mockups/nodejs_cover.png";
                      } else if (lowerTitle.includes("react native") || lowerTitle.includes("mobile")) {
                        mockImage = "/images/mockups/react_native_cover.png";
                      } else if (lowerTitle.includes("ui/ux") || lowerTitle.includes("design")) {
                        mockImage = "/images/mockups/uiux_design_cover.png";
                      } else if (lowerTitle.includes("postgresql") || lowerTitle.includes("database")) {
                        mockImage = "/images/mockups/postgresql_cover.png";
                      } else if (lowerTitle.includes("docker")) {
                        mockImage = "/images/mockups/docker_cover.png";
                      } else if (lowerTitle.includes("graphql")) {
                        mockImage = "/images/mockups/graphql_cover.png";
                      } else if (lowerTitle.includes("security")) {
                        mockImage = "/images/mockups/security_cover.png";
                      } else if (lowerTitle.includes("redux")) {
                        mockImage = "/images/mockups/redux_cover.png";
                      } else if (lowerTitle.includes("angular") || lowerTitle.includes("migration")) {
                        mockImage = "/images/mockups/angular_react_cover.png";
                      } else if (lowerTitle.includes("vue")) {
                        mockImage = "/images/mockups/vue_cover.png";
                      } else if (lowerTitle.includes("serverless")) {
                        mockImage = "/images/mockups/serverless_cover.png";
                      } else if (lowerTitle.includes("system design")) {
                        mockImage = "/images/mockups/system_design_cover.png";
                      } else if (lowerTitle.includes("testing") || lowerTitle.includes("jest") || lowerTitle.includes("cypress")) {
                        mockImage = "/images/mockups/testing_cover.png";
                      } else if (lowerTitle.includes("react for beginners") || lowerTitle.includes("react")) {
                        mockImage = "/images/mockups/react_native_cover.png";
                      } else if (lowerTitle.includes("supabase")) {
                        mockImage = "/images/mockups/supabase_backend_crash_course_1779443962868.png";
                      }
                    }

                    return mockImage ? (
                      <Image 
                        src={mockImage} 
                        alt={course.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100" 
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${fallbackGradient} flex items-center justify-center opacity-40 group-hover:opacity-70 transition-opacity duration-500`}>
                        <FallbackIcon className="w-12 h-12 text-white/50 group-hover:scale-110 group-hover:text-white/80 transition-all duration-500" />
                      </div>
                    );
                  })()}
                </div>

                {/* Decorative glow at bottom */}
                <div className={`absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br ${fallbackGradient} opacity-5 group-hover:opacity-15 blur-[40px] rounded-full transition-opacity duration-500 pointer-events-none`}></div>

                <div className="p-6 flex flex-col flex-1 z-10 bg-gradient-to-b from-black/0 to-black/40">
                  <h3 className={`text-2xl font-bold font-prompt text-white mb-3 transition-colors line-clamp-2 leading-snug ${themeTextHover}`}>{course.title}</h3>
                  <p className="text-white/60 text-sm font-prompt leading-relaxed line-clamp-3 mb-4 flex-1">{rawDesc}</p>
                  
                  {/* Meta info (above divider) */}
                  <div className="flex items-center gap-4 text-xs font-prompt text-white/40 mb-5">
                      <div className="flex items-center gap-1.5 transition-colors">
                          {isMusic && instrument ? (
                              <>
                                <Icons.Music className={`w-3.5 h-3.5 ${isMusic ? 'text-amber-400' : 'text-blue-400'}`} />
                                <span className="truncate max-w-[120px]" title={instrument}>{instrument}</span>
                              </>
                          ) : (
                              <>
                                <Icons.Clock className={`w-3.5 h-3.5 ${isMusic ? 'text-amber-400' : 'text-blue-400'}`} />
                                <span>{lessons} บทเรียน</span>
                              </>
                          )}
                      </div>
                      <div className="flex items-center gap-1.5 transition-colors">
                          {isMusic ? (
                              <Icons.Star className="w-3.5 h-3.5 text-orange-400" />
                          ) : (
                              <Icons.Signal className="w-3.5 h-3.5 text-purple-400" />
                          )}
                          <span>{level}</span>
                      </div>
                  </div>

                  {/* Footer: Price and CTA Button */}
                  <div className="flex items-end justify-between pt-4 border-t border-white/10 mt-auto w-full">
                    <div>
                      <p className="text-[10px] text-white/40 font-prompt uppercase tracking-wider mb-0.5">ราคาคอร์ส</p>
                      {(() => {
                        const isFree = course.price === "0" || course.price === "0 THB" || course.price === "0 thb" || !course.price || course.price.trim() === "" || course.price.trim() === "-" || course.price.trim() === "—";
                        if (isFree) {
                          return (
                            <p className="text-xl font-bold font-prompt text-emerald-400 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                              ฟรี
                            </p>
                          );
                        }
                        return (
                          <p className={`text-xl font-bold font-prompt ${isMusic ? 'text-amber-400' : 'text-blue-400'}`}>
                            {course.price}
                          </p>
                        );
                      })()}
                    </div>
                    <div
                      className={`px-4 py-2 rounded-lg text-white font-prompt text-sm shadow-lg shadow-black/20 transition-all duration-300 font-semibold flex items-center gap-1 ${
                        isMusic 
                          ? "bg-amber-600 hover:bg-amber-500 shadow-amber-600/10" 
                          : "bg-blue-500 hover:bg-blue-600 shadow-blue-500/10"
                      }`}
                    >
                      ดูรายละเอียดคอร์ส →
                    </div>
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

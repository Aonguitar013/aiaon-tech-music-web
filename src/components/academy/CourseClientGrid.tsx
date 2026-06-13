"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Search, BookOpen, Clock, Signal, Filter, Music, Star, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useBrandTheme } from "@/components/providers/BrandThemeProvider";

interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  category?: string;
  icon_name?: string;
  color_gradient?: string;
  image_url?: string;
}

export function CourseClientGrid({ initialCourses }: { initialCourses: Course[] }) {
  const { brandTheme } = useBrandTheme();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState<string>("All");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      if (categoryParam === 'Technology') {
        setFilterCategory('Technology');
      } else if (categoryParam === 'Music') {
        setFilterCategory('Music');
      }
    }
  }, [searchParams]);

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];
  const categories = ["All", "Technology", "Music"];

  const filteredCourses = initialCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Extract level from description string
    let courseLevel = "All";
    if (course.description.includes("Level: Beginner")) courseLevel = "Beginner";
    if (course.description.includes("Level: Intermediate")) courseLevel = "Intermediate";
    if (course.description.includes("Level: Advanced")) courseLevel = "Advanced";

    const matchesLevel = filterLevel === "All" || courseLevel === filterLevel;
    
    const courseCat = course.category || "Technology";
    const matchesCategory = filterCategory === "All" || courseCat === filterCategory;

    return matchesSearch && matchesLevel && matchesCategory;
  });

  return (
    <div className="w-full flex flex-col min-h-0">
      <div className="flex bg-white/5 p-1 rounded-xl w-full max-w-sm mb-6 border border-white/10 mx-auto md:mx-0">
          {categories.map((cat) => (
              <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`flex-1 py-2 rounded-lg font-prompt text-sm font-medium transition-all ${
                      filterCategory === cat
                          ? (cat === 'Music' ? "bg-amber-600 text-white shadow-lg shadow-amber-900/30" : "bg-blue-500 text-white shadow-lg shadow-blue-900/30")
                          : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
              >
                  {cat === "All" ? "ทั้งหมด" : cat === "Technology" ? "Tech" : cat}
              </button>
          ))}
      </div>

      {/* Top Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-white/40" />
          </div>
          <input
            type="text"
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-prompt"
            placeholder="ค้นหาคอร์สเรียน (เช่น Apps Script, React)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col xl:flex-row xl:items-center gap-4 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-white/50 px-2 shrink-0 xl:ml-2">
               <Filter className="w-4 h-4" />
               <span className="font-prompt text-sm mr-2 whitespace-nowrap">ระดับ:</span>
            </div>
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className={`px-4 py-2 rounded-lg border font-prompt text-sm transition-all shrink-0 ${
                  filterLevel === level
                    ? "bg-blue-500 text-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {level === "All" ? "ทั้งหมด" : level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
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
             
             const FallbackIcon = isMusic ? Music : BookOpen;

             return (
              <Link key={course.id} href={`/dashboard/academy/${course.id}`} className="group block h-full">
                <div className={`glass-card h-full flex flex-col border-white/10 ${themeColorHover} transition-all duration-300 relative overflow-hidden bg-white/5 shadow-2xl`}>
                  
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
                        <div className={`w-full h-full bg-linear-to-br ${fallbackGradient} flex items-center justify-center opacity-40 group-hover:opacity-70 transition-opacity duration-500`}>
                          <FallbackIcon className="w-12 h-12 text-white/50 group-hover:scale-110 group-hover:text-white/80 transition-all duration-500" />
                        </div>
                      );
                    })()}
                  </div>

                  {/* Decorative glow at bottom */}
                  <div className={`absolute bottom-0 right-0 w-40 h-40 bg-linear-to-br ${fallbackGradient} opacity-5 group-hover:opacity-15 blur-[40px] rounded-full transition-opacity duration-500 pointer-events-none`}></div>
                  
                  <div className="p-5 flex flex-col flex-1 z-10 bg-linear-to-b from-black/0 to-black/40">
                    <h3 className={`text-lg font-bold font-prompt text-white mb-2 transition-colors line-clamp-2 leading-tight ${themeTextHover}`}>
                        {course.title}
                    </h3>
                    <p className="text-sm font-prompt text-white/50 mb-4 flex-1 line-clamp-3 leading-relaxed">
                        {rawDesc}
                    </p>

                    {/* Meta info (above divider) */}
                    <div className="flex items-center gap-4 text-xs font-prompt text-white/40 mb-4">
                        <div className="flex items-center gap-1.5 transition-colors">
                            {isMusic && instrument ? (
                                <>
                                  <Music className={`w-3.5 h-3.5 ${isMusic ? 'text-amber-400' : 'text-blue-400'}`} />
                                  <span className="truncate max-w-[120px]" title={instrument}>{instrument}</span>
                                </>
                            ) : (
                                <>
                                  <Clock className={`w-3.5 h-3.5 ${isMusic ? 'text-amber-400' : 'text-blue-400'}`} />
                                  <span>{lessons} บทเรียน</span>
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-1.5 transition-colors">
                            {isMusic ? (
                                <Star className="w-3.5 h-3.5 text-orange-400" />
                            ) : (
                                <Signal className="w-3.5 h-3.5 text-purple-400" />
                            )}
                            <span>{level}</span>
                        </div>
                    </div>

                    {/* Footer: Price and CTA Button */}
                    <div className="flex items-end justify-between pt-4 border-t border-white/10 mt-auto">
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
                        className={`px-4 py-2 rounded-lg text-white font-prompt text-sm shadow-lg shadow-black/20 transition-all duration-300 font-semibold ${
                          isMusic 
                            ? "bg-amber-600 hover:bg-amber-500 shadow-amber-600/10" 
                            : "bg-blue-500 hover:bg-blue-600 shadow-blue-500/10"
                        }`}
                      >
                        เริ่มเรียนเลย →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
             )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-white/40 glass-card border-white/5">
           <Search className="w-16 h-16 mb-4 opacity-20" />
           <p className="font-prompt text-lg">ไม่พบคอร์สเรียนที่ตรงกับการค้นหา</p>
           <button 
             onClick={() => {setSearchTerm(""); setFilterLevel("All");}}
             className="mt-4 px-4 py-2 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/10 font-prompt text-sm transition-colors"
           >
             ล้างการค้นหา
           </button>
        </div>
      )}
    </div>
  );
}

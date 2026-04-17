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
                    
                    {/* Price Badge Overlay */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-xs font-prompt font-medium shadow-lg z-10">
                      {course.price}
                    </div>
                  </div>

                  {/* Decorative glow at bottom */}
                  <div className={`absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br ${fallbackGradient} opacity-5 group-hover:opacity-15 blur-[40px] rounded-full transition-opacity duration-500 pointer-events-none`}></div>
                  
                  <div className="p-5 flex flex-col flex-1 z-10 bg-gradient-to-b from-black/0 to-black/40">
                    <h3 className={`text-lg font-bold font-prompt text-white mb-2 transition-colors line-clamp-2 leading-tight ${themeTextHover}`}>
                        {course.title}
                    </h3>
                    <p className="text-sm font-prompt text-white/50 mb-6 flex-1 line-clamp-3 leading-relaxed">
                        {rawDesc}
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 mt-auto">
                        <div className="flex items-center gap-2 text-white/40 group-hover:text-white/60 transition-colors">
                            {isMusic && instrument ? (
                                <>
                                  <Music className={`w-4 h-4 ${isMusic ? 'text-amber-400' : 'text-blue-400'}`} />
                                  <span className="text-xs font-prompt truncate" title={instrument}>{instrument}</span>
                                </>
                            ) : (
                                <>
                                  <Clock className={`w-4 h-4 ${isMusic ? 'text-amber-400' : 'text-blue-400'}`} />
                                  <span className="text-xs font-prompt">{lessons} บทเรียน</span>
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-white/40 group-hover:text-white/60 transition-colors">
                            {isMusic ? (
                                <Star className="w-4 h-4 text-orange-400" />
                            ) : (
                                <Signal className="w-4 h-4 text-purple-400" />
                            )}
                            <span className="text-xs font-prompt">{level}</span>
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

"use client";

import Link from "next/link";
import { ArrowLeft, PlayCircle, CheckCircle, Clock, BadgeCheck, ShoppingCart } from "lucide-react";
import { useBrandTheme } from "@/components/providers/BrandThemeProvider";

export function CoursePlayerClientView({ course, isPurchased, lessons }: { course: any, isPurchased: boolean, lessons: any[] }) {

  const { brandTheme } = useBrandTheme();

  const isCourseActuallyMusic = course?.category === 'Music';
  const isMusic = isCourseActuallyMusic || brandTheme === "music";

  return (
    <div className="w-full max-w-[1600px] mx-auto min-h-screen flex flex-col">
      <div className="mb-6">
          <Link href="/dashboard/academy" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-prompt text-sm">
             <ArrowLeft className="w-4 h-4" /> กลับสู่หน้าคอร์สเรียน
          </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1">
          {/* Main Video Area */}
          <div className="lg:col-span-3 flex flex-col gap-6">
             <div className={`aspect-video w-full bg-black/80 border rounded-2xl overflow-hidden relative group flex items-center justify-center shadow-2xl transition-colors ${
                 isPurchased 
                   ? (isMusic ? "border-amber-500/20" : "border-emerald-500/20") 
                   : "border-white/10"
             }`}>
                 <div className={`absolute inset-0 bg-gradient-to-br pointer-events-none ${isMusic ? "from-amber-900/20 to-orange-900/20" : "from-blue-900/20 to-purple-900/20"}`}></div>

                 {/* Lock overlay for unpurchased */}
                 {!isPurchased && (
                   <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-4">
                     <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-2">
                       <ShoppingCart className="w-8 h-8 text-white/60" />
                     </div>
                     <p className="font-prompt text-white/70 text-center text-sm max-w-[220px]">
                       ซื้อคอร์สนี้เพื่อเข้าถึงเนื้อหาทั้งหมด
                     </p>
                   </div>
                 )}

                 <button className={`w-20 h-20 rounded-full backdrop-blur-md border flex items-center justify-center text-white z-10 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all ${
                     isPurchased 
                       ? (isMusic ? "bg-amber-600/30 border-amber-500/40 group-hover:bg-amber-600 group-hover:scale-110 cursor-pointer" : "bg-emerald-600/30 border-emerald-500/40 group-hover:bg-emerald-600 group-hover:scale-110 cursor-pointer")
                       : "bg-white/10 border-white/20 cursor-not-allowed opacity-40"
                 }`}>
                    <PlayCircle className="w-10 h-10 ml-1" />
                 </button>
                 <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full relative ${
                        isPurchased 
                          ? (isMusic ? "bg-amber-500 w-[30%]" : "bg-emerald-500 w-[30%]") 
                          : "bg-white/20 w-0"
                    }`}>
                        {isPurchased && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md"></div>}
                    </div>
                 </div>
             </div>

             <div className={`glass-card p-6 md:p-8 transition-colors ${
                 isPurchased 
                   ? (isMusic ? "border-amber-500/15" : "border-emerald-500/15") 
                   : "border-white/10"
             }`}>
                 {isPurchased && (
                   <div className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 mb-5 w-fit ${
                       isMusic ? "text-amber-400 bg-amber-500/10 border-amber-500/20" : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                   }`}>
                     <BadgeCheck className="w-4 h-4 shrink-0" />
                     <span className="text-sm font-prompt font-medium">คุณเป็นเจ้าของคอร์สนี้แล้ว</span>
                   </div>
                 )}
                 <h1 className="text-2xl md:text-3xl font-bold font-prompt text-white mb-4">{course.title}</h1>
                 <p className="text-white/70 font-prompt text-lg leading-relaxed">
                     {isPurchased
                       ? "ยินดีต้อนรับเข้าสู่บทเรียน! นี่คือพื้นที่สำหรับเรียนรู้เนื้อหาของคอร์ส กดปุ่มเล่นด้านบนเพื่อเริ่มต้นเรียนรู้ได้เลย"
                       : "ตัวอย่างเนื้อหาคอร์สเรียน กรุณาซื้อคอร์สเพื่อเข้าถึงบทเรียนทั้งหมดและเริ่มเรียนรู้ได้ทันที"}
                 </p>
             </div>
          </div>

          {/* Sidebar */}
          <div className={`lg:col-span-1 border bg-black/40 rounded-2xl overflow-hidden flex flex-col h-[600px] lg:h-auto transition-colors ${
              isPurchased 
                ? (isMusic ? "border-amber-500/20" : "border-emerald-500/20") 
                : "border-white/10"
          }`}>
              <div className="p-4 border-b border-white/10 bg-white/5 shrink-0">
                  <h3 className="font-prompt font-bold text-white mb-2">เนื้อหาหลักสูตร</h3>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-1">
                      <div className={`h-full rounded-full ${
                          isPurchased 
                            ? (isMusic ? "bg-amber-500 w-[30%]" : "bg-emerald-500 w-[30%]") 
                            : "bg-white/10 w-0"
                      }`}></div>
                  </div>
                  <p className="text-xs text-white/50 font-prompt text-right mb-4">
                    {isPurchased ? `เรียนแล้ว 0/${lessons.length} บท` : `0/${lessons.length} บท`}
                  </p>


                  {/* === Conditional Purchase / Enter Button === */}
                  {isPurchased ? (
                    <div className="flex flex-col gap-2">
                      <div className={`flex items-center gap-2 border rounded-xl px-3 py-2 mb-1 ${
                          isMusic ? "bg-amber-500/10 border-amber-500/20" : "bg-emerald-500/10 border-emerald-500/20"
                      }`}>
                        <BadgeCheck className={`w-4 h-4 shrink-0 ${isMusic ? "text-amber-400" : "text-emerald-400"}`} />
                        <p className={`text-xs font-prompt font-medium ${isMusic ? "text-amber-300" : "text-emerald-300"}`}>ซื้อแล้ว — เข้าถึงได้ทันที</p>
                      </div>
                      <button className={`w-full py-2.5 rounded-xl text-white text-sm font-prompt font-bold flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer ${
                          isMusic ? "bg-amber-600 hover:bg-amber-500 shadow-amber-900/30" : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/30"
                      }`}>
                        <PlayCircle className="w-4 h-4" /> เริ่มเรียนตอนนี้
                      </button>
                    </div>
                  ) : (
                    <Link
                      href={`/dashboard/marketplace/checkout/${course.id}`}
                      className={`w-full py-2.5 rounded-xl text-white text-sm font-prompt font-bold flex items-center justify-center gap-2 transition-colors shadow-lg ${
                          isMusic ? "bg-amber-600 hover:bg-amber-500 shadow-amber-900/30" : "bg-blue-600 hover:bg-blue-500 shadow-blue-900/30"
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" /> ซื้อคอร์สนี้
                    </Link>
                  )}
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
                  {lessons.length > 0 ? (
                    lessons.map((lesson, i) => {
                      const isCompleted = false; // Mocked for now until user_progress table exists
                      const isActive = isPurchased && i === 0;
                      const isLocked = !isPurchased && i > 0;
                      return (
                          <div
                             key={lesson.id}
                             className={`flex items-start gap-3 p-3 rounded-xl mb-2 transition-all border ${
                                 isActive
                                   ? (isMusic ? "bg-amber-500/10 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)] cursor-pointer" : "bg-blue-500/10 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.1)] cursor-pointer")
                                   : isLocked
                                   ? "border-transparent opacity-40 cursor-not-allowed"
                                   : "border-transparent hover:bg-white/5 cursor-pointer"
                             }`}
                          >
                              {isCompleted ? (
                                  <CheckCircle className={`w-5 h-5 shrink-0 mt-0.5 ${isMusic ? "text-amber-500" : "text-emerald-400"}`} />
                              ) : isActive ? (
                                  <PlayCircle className={`w-5 h-5 shrink-0 mt-0.5 ${isMusic ? "text-amber-400" : "text-blue-400"}`} />
                              ) : (
                                  <div className="w-5 h-5 rounded-full border border-white/30 shrink-0 mt-0.5" />
                              )}
  
                              <div>
                                  <p className={`font-prompt text-sm ${isActive ? "text-white font-medium" : isCompleted ? "text-white/60" : "text-white/80"}`}>
                                      {i + 1}. {lesson.title}
                                  </p>
                                  <div className="flex items-center gap-1 mt-1 text-white/40">
                                      <Clock className="w-3 h-3" />
                                      <span className="text-[10px] font-prompt">{lesson.duration || "10:00"}</span>
                                  </div>
                              </div>
                          </div>
                      );
                    })
                  ) : (
                    <div className="py-10 text-center text-white/30 font-prompt text-sm">
                      กำลังเตรียมบทเรียน...
                    </div>
                  )}
              </div>

          </div>
      </div>
    </div>
  )
}

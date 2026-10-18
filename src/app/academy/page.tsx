import { Suspense } from "react";
import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { CourseClientGrid } from "@/components/academy/CourseClientGrid";
import { GraduationCap, Sparkles, BookOpen, Music, Code2, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "คลังคอร์สเรียนออนไลน์ (Academy Hub) | AiAon Tech",
  description:
    "ยกระดับทักษะแห่งอนาคต ทั้งเทคโนโลยี AI Automation, Google Apps Script, Fullstack Web Development และดนตรีระดับโปร สอนโดย ครูอ้น จิรวัฒน์ เดชเส้ง",
  keywords: [
    "คอร์สเรียนออนไลน์",
    "AiAon Academy",
    "เรียน AI ครูไทย",
    "Google Apps Script",
    "Next.js Masterclass",
    "Indie Folk Guitar",
    "สอนเทคโนโลยี",
    "ครูอ้น",
  ],
  openGraph: {
    title: "คลังคอร์สเรียนออนไลน์ (Academy Hub) | AiAon Tech",
    description: "เรียนรู้นวัตกรรม AI, การเขียนระบบอัตโนมัติ และดนตรี เรียนได้ตลอดชีพ 24 ชม.",
    type: "website",
  },
};

export default async function PublicAcademyPage() {
  const supabase = await createClient();

  // Fetch all courses without requiring login
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching courses for Public Academy:", error);
  }

  const allCourses = courses || [];
  const techCount = allCourses.filter((c) => c.category === "Technology").length;
  const musicCount = allCourses.filter((c) => c.category === "Music").length;

  return (
    <div className="w-full relative overflow-hidden min-h-screen pb-24">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/3" />
      <div className="absolute top-[35%] right-[-100px] w-[450px] h-[450px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-80px] w-[400px] h-[400px] bg-purple-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10 md:pt-16">
        
        {/* ── Hero Header ─────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-prompt font-semibold shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span>AiAon Academy Hub — เปิดคลังหลักสูตรวิชาชีพแห่งอนาคต</span>
          </div>

          <h1 className="font-prompt text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            คลังคอร์สเรียน{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-300 to-amber-300 drop-shadow-[0_0_25px_rgba(59,130,246,0.35)]">
              ออนไลน์ 24 ชม.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-white/70 font-prompt leading-relaxed max-w-2xl mx-auto">
            เรียนรู้ทักษะที่นำไปใช้สร้างสรรค์ผลงานได้จริง ทั้งสายเทคโนโลยี AI Automation, 
            เว็บแอปพลิเคชันยุคใหม่ และคอร์สดนตรีเฉพาะทาง สอนตรงโดย <span className="text-amber-300 font-bold">ครูอ้น (จิรวัฒน์ เดชเส้ง)</span>
          </p>

          {/* Quick Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-2xl mx-auto">
            <div className="glass-card p-3 rounded-2xl border-white/10 bg-white/5 text-center">
              <div className="text-2xl font-black font-prompt text-blue-400">{allCourses.length}</div>
              <div className="text-[11px] font-prompt text-white/50">หลักสูตรคุณภาพ</div>
            </div>
            <div className="glass-card p-3 rounded-2xl border-white/10 bg-white/5 text-center">
              <div className="text-2xl font-black font-prompt text-cyan-300">{techCount}</div>
              <div className="text-[11px] font-prompt text-white/50">คอร์ส Tech &amp; AI</div>
            </div>
            <div className="glass-card p-3 rounded-2xl border-white/10 bg-white/5 text-center">
              <div className="text-2xl font-black font-prompt text-amber-400">{musicCount}</div>
              <div className="text-[11px] font-prompt text-white/50">คอร์ส Music Pro</div>
            </div>
            <div className="glass-card p-3 rounded-2xl border-white/10 bg-white/5 text-center">
              <div className="text-2xl font-black font-prompt text-emerald-400">ตลอดชีพ</div>
              <div className="text-[11px] font-prompt text-white/50">ทบทวนซ้ำได้ 24 ชม.</div>
            </div>
          </div>
        </div>

        {/* ── Courses Client Grid with Category & Level Filters ─── */}
        <Suspense fallback={<div className="animate-pulse h-96 bg-white/5 rounded-3xl mt-8 border border-white/10" />}>
          <CourseClientGrid initialCourses={allCourses} />
        </Suspense>

        {/* ── Learning Guarantee & Contact Banner ─── */}
        <div className="mt-20 glass-card border-blue-500/25 p-8 md:p-12 text-center relative overflow-hidden rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.15)]">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-cyan-500/5 to-amber-500/5 pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(59,130,246,0.4)]">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-prompt text-2xl font-bold text-white">
              ต้องการจัดอบรมภายในองค์กร หรือหลักสูตรเฉพาะทาง?
            </h3>
            <p className="text-white/60 font-prompt text-sm leading-relaxed">
              ครูอ้นมีบริการวิทยากรบรรยาย จัด Workshop และวางระบบเฉพาะสำหรับสถานศึกษาและบริษัท สนใจติดต่อพูดคุยได้โดยตรง
            </p>
            <div className="pt-2">
              <a
                href="https://line.me/R/ti/p/@deu6776s"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-prompt font-bold text-sm transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              >
                <span>ปรึกษาหลักสูตรทาง LINE OA (@deu6776s)</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

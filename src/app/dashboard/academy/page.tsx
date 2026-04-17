import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CourseClientGrid } from "@/components/academy/CourseClientGrid";
import { BookOpen } from "lucide-react";
import { Suspense } from "react";

export const metadata = {
  title: "Academy | AiAon Tech",
};

export default async function AcademyPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch all courses
  const { data: courses, error } = await supabase.from('courses').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching courses:", error);
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/50 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="font-prompt text-3xl md:text-4xl font-bold text-white">คอร์สเรียน (Academy)</h1>
        </div>
        <p className="text-white/60 font-prompt">
            ค้นหาและเลือกซื้อคอร์สเรียนที่คุณสนใจ เพื่อเพิ่มพูนทักษะการทำงานของคุณ
        </p>
      </div>

      <Suspense fallback={<div className="animate-pulse h-64 bg-white/5 rounded-xl mt-8"></div>}>
        <CourseClientGrid initialCourses={courses || []} />
      </Suspense>
    </div>
  );
}

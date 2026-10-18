import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CoursePlayerClientView } from "@/components/academy/CoursePlayerClientView";

export default async function CoursePlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch course, purchase status (if logged in), and lessons concurrently
  const [{ data: course, error }, existingOrder, { data: lessons }] = await Promise.all([
    supabase.from('courses').select('*').eq('id', id).single(),
    user
      ? supabase
          .from('orders')
          .select('id')
          .eq('user_id', user.id)
          .eq('course_id', id)
          .eq('status', 'completed')
          .maybeSingle()
          .then((res) => res.data)
      : Promise.resolve(null),
    supabase
      .from('lessons')
      .select('*')
      .eq('course_id', id)
      .order('sort_order', { ascending: true }),
  ]);

  const isPurchased = !!existingOrder;

  if (error || !course) {
    return (
        <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-white/50">
            <p className="font-prompt text-xl mb-4">ไม่พบคอร์สเรียนนี้</p>
            <Link href="/dashboard/academy" className="text-blue-400 hover:text-blue-300 font-prompt underline">
                กลับสู่หน้าหลัก
            </Link>
        </div>
    );
  }
  return <CoursePlayerClientView course={course} isPurchased={isPurchased} lessons={lessons || []} />;

}

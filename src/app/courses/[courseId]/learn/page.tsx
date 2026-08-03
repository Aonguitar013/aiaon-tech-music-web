import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { CourseLearnClient } from './CourseLearnClient';

interface Props {
  params: {
    courseId: string;
  };
}

export default async function CourseLearnPage({ params }: Props) {
  const supabase = await createClient();
  const { courseId } = await params;

  // Get current user session
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch course details
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('id, title, price, is_premium')
    .eq('id', courseId)
    .single();

  if (courseError || !course) {
    notFound();
  }

  // Fetch lessons
  const { data: lessons, error: lessonsError } = await supabase
    .from('course_lessons')
    .select('*')
    .eq('course_id', courseId)
    .order('lesson_order', { ascending: true });

  if (lessonsError || !lessons) {
    notFound();
  }

  // Check if course is purchased (if premium and logged in)
  let isCoursePurchased = !course.is_premium;
  let completedLessonIds: string[] = [];

  if (user) {
    if (course.is_premium) {
      const { data: purchase } = await supabase
        .from('user_course_purchases')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single();
      
      if (purchase) {
        isCoursePurchased = true;
      }
    }

    // Fetch user progress
    const { data: progress } = await supabase
      .from('user_lesson_progress')
      .select('lesson_id')
      .eq('user_id', user.id)
      .in('lesson_id', lessons.map(l => l.id));

    if (progress) {
      completedLessonIds = progress.map(p => p.lesson_id);
    }
  }

  return (
    <CourseLearnClient 
      course={course}
      lessons={lessons}
      isCoursePurchased={isCoursePurchased}
      completedLessonIds={completedLessonIds}
      userId={user?.id}
    />
  );
}

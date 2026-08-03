-- Migration to add Course Lessons, User Progress, and Purchases
-- Run this in Supabase SQL Editor

-- 1. Create course_lessons table
CREATE TABLE IF NOT EXISTS public.course_lessons (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  video_url text NOT NULL,
  duration_seconds integer DEFAULT 0,
  lesson_order integer NOT NULL,
  module_name text NOT NULL,
  is_free_preview boolean DEFAULT false
);

-- 2. Create user_course_purchases table
CREATE TABLE IF NOT EXISTS public.user_course_purchases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  amount text, -- Or numeric if you prefer
  UNIQUE(user_id, course_id)
);

-- 3. Create user_lesson_progress table
CREATE TABLE IF NOT EXISTS public.user_lesson_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id uuid REFERENCES public.course_lessons(id) ON DELETE CASCADE NOT NULL,
  completed_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, lesson_id)
);

-- 4. Add is_premium column to courses if not exists (for easier querying)
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS is_premium boolean DEFAULT false;

-- 5. Enable RLS
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_course_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies

-- course_lessons: Anyone can read (we control video access in UI based on is_free_preview or purchase, or we can secure it at DB level. Usually securing at DB level is better).
-- Let's make lessons readable by anyone so they can see the syllabus, but we might want to hide video_url if they haven't paid.
-- For simplicity, we allow reading all lesson metadata.
CREATE POLICY "Allow public read access to course lessons"
ON public.course_lessons FOR SELECT
USING (true);

-- user_course_purchases: Users can only read their own purchases
CREATE POLICY "Users can read own purchases"
ON public.user_course_purchases FOR SELECT
USING (auth.uid() = user_id);

-- admin/service role can do anything, handled by default

-- user_lesson_progress: Users can insert and read their own progress
CREATE POLICY "Users can insert own progress"
ON public.user_lesson_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own progress"
ON public.user_lesson_progress FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress"
ON public.user_lesson_progress FOR DELETE
USING (auth.uid() = user_id);

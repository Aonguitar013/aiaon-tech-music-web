import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/ANON_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const FREE_COURSES_COUNT = 15;
const PREMIUM_COURSES_COUNT = 10;
const MODULES_PER_COURSE = 3;
const LESSONS_PER_MODULE = 3;

const ICONS = ['Code2', 'LayoutDashboard', 'Database', 'BookText', 'MessageSquareShare', 'FileCode2'];
const GRADIENTS = [
  'from-blue-500 to-cyan-400',
  'from-purple-500 to-pink-500',
  'from-emerald-400 to-teal-500',
  'from-orange-400 to-red-500',
  'from-indigo-500 to-blue-500'
];

async function seedData() {
  console.log('Starting seed...');

  // Generate Free Courses
  const freeCourses = Array.from({ length: FREE_COURSES_COUNT }).map((_, i) => ({
    title: `Free Course ${i + 1}: Introduction to Technology`,
    description: `This is a free course covering the basics of topic ${i + 1}. Perfect for beginners.`,
    instructor: 'AiAon Tech',
    price: 'Free',
    icon_name: ICONS[i % ICONS.length],
    color_gradient: GRADIENTS[i % GRADIENTS.length],
    is_premium: false
  }));

  // Generate Premium Courses
  const premiumCourses = Array.from({ length: PREMIUM_COURSES_COUNT }).map((_, i) => ({
    title: `Premium Course ${i + 1}: Advanced Masterclass`,
    description: `Deep dive into advanced topics ${i + 1} with practical projects.`,
    instructor: 'AiAon Tech',
    price: `${1000 + (i * 500)} THB`,
    icon_name: ICONS[(i + 2) % ICONS.length],
    color_gradient: GRADIENTS[(i + 1) % GRADIENTS.length],
    is_premium: true
  }));

  const allCoursesData = [...freeCourses, ...premiumCourses];

  for (const courseData of allCoursesData) {
    // Insert course
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .insert(courseData)
      .select('id, is_premium')
      .single();

    if (courseError) {
      console.error('Error inserting course:', courseError);
      continue;
    }

    console.log(`Inserted course: ${courseData.title}`);

    // Generate lessons for this course
    const lessonsData = [];
    let lessonOrder = 1;

    for (let m = 1; m <= MODULES_PER_COURSE; m++) {
      const moduleName = `Module ${m}: ${m === 1 ? 'Getting Started' : (m === 2 ? 'Core Concepts' : 'Advanced Usage')}`;

      for (let l = 1; l <= LESSONS_PER_MODULE; l++) {
        // First module is always free preview, even for premium courses
        const isFreePreview = !course.is_premium || m === 1;

        lessonsData.push({
          course_id: course.id,
          title: `Lesson ${m}.${l}: ${isFreePreview ? 'Overview and Setup' : 'Deep Dive Execution'}`,
          description: `Learn the essentials in this video lesson for module ${m}.`,
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Using Rickroll or standard sample video for placeholder
          duration_seconds: 300 + Math.floor(Math.random() * 600), // 5-15 mins
          lesson_order: lessonOrder++,
          module_name: moduleName,
          is_free_preview: isFreePreview
        });
      }
    }

    // Insert lessons
    const { error: lessonError } = await supabase
      .from('course_lessons')
      .insert(lessonsData);

    if (lessonError) {
      console.error('Error inserting lessons:', lessonError);
    } else {
      console.log(`  Inserted ${lessonsData.length} lessons`);
    }
  }

  console.log('Seeding completed!');
}

seedData().catch(console.error);

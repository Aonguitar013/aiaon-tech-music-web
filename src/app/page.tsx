import { AcademySection } from "@/components/sections/AcademySection";
import { SaaSSection } from "@/components/sections/SaaSSection";
import { PricingPopup } from "@/components/ui/PricingPopup";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  // Preserved for future online courses release
  const { data: rawCourses } = await supabase
    .from('courses')
    .select('*')
    .order('created_at')
    .limit(6);

  const courses = rawCourses ?? [];

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Temporarily hidden until course videos are ready */}
      {/* <AcademySection courses={courses} /> */}
      <SaaSSection />
      <PricingPopup />
    </div>
  );
}

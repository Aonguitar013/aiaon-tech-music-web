import { AcademySection } from "@/components/sections/AcademySection";
import { SaaSSection } from "@/components/sections/SaaSSection";
import { PricingPopup } from "@/components/ui/PricingPopup";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  // Fetch first 6 courses for Landing Page preview
  const { data: rawCourses } = await supabase
    .from('courses')
    .select('*')
    .order('created_at')
    .limit(6);

  const courses = rawCourses ?? [];

  return (
    <div className="flex flex-col gap-24 pb-24">
      <AcademySection courses={courses} />
      <SaaSSection />
      <PricingPopup />
    </div>
  );
}

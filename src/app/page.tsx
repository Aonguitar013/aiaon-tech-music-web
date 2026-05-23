import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { AutomationShowcase } from "@/components/sections/AutomationShowcase";
import { AcademySection } from "@/components/sections/AcademySection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { SaaSSection } from "@/components/sections/SaaSSection";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  // Fetch first 6 of each for Landing Page preview
  const [{ data: rawCourses }, { data: rawProducts }] = await Promise.all([
    supabase.from('courses').select('id, title, description, icon_name, color_gradient, image_url, category').order('created_at').limit(6),
    supabase.from('products').select('*').order('created_at').limit(6),
  ]);

  const courses = rawCourses ?? [];
  const products = rawProducts ?? [];


  return (
    <div className="flex flex-col gap-24 pb-24">
      <HeroSection />
      <AboutSection />
      <AutomationShowcase />
      <AcademySection courses={courses} />
      <ProductsSection products={products} />
      <SaaSSection />
    </div>
  );
}

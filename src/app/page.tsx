import { HeroSection } from "@/components/sections/HeroSection";
import { AcademySection } from "@/components/sections/AcademySection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { SaaSSection } from "@/components/sections/SaaSSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <HeroSection />
      <AcademySection />
      <ProductsSection />
      <SaaSSection />
    </div>
  );
}

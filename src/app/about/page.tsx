import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { AutomationShowcase } from "@/components/sections/AutomationShowcase";

export const metadata = {
  title: "เกี่ยวกับเรา - TechxMusic",
  description: "ประวัติ ความเป็นมา และนวัตกรรม Smart School Automation โดย ครูอ้น AiAon Tech & Music Studio",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <HeroSection />
      <AboutSection />
      <AutomationShowcase />
    </div>
  );
}

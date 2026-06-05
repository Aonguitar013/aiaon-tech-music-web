"use client";

import { HeroSection } from "./HeroSection";
import { ServicesSection } from "./ServicesSection";
import { WhyUsSection } from "./WhyUsSection";
import { OtherServicesSection } from "@/components/services/ServicesView";
import { SocialProofFAQSection } from "./SocialProofFAQSection";
import { FinalCTASection } from "./FinalCTASection";

export function TeacherVideoView() {
  return (
    <div className="w-full relative overflow-hidden min-h-screen pb-12">
      {/* Page-level ambient light glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-blue-600/5 blur-[140px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/4" />
      <div className="absolute top-[35%] right-0 w-[450px] h-[450px] bg-green-500/4 blur-[130px] rounded-full pointer-events-none translate-x-1/3" />
      <div className="absolute bottom-[20%] left-[-100px] w-[500px] h-[500px] bg-blue-500/4 blur-[140px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Why Us Section */}
      <WhyUsSection />

      {/* Other Services Section (n8n, Apps Script, Music, Mixing) */}
      <OtherServicesSection />

      {/* Social Proof & FAQ Section */}
      <SocialProofFAQSection />

      {/* Final CTA Section */}
      <FinalCTASection />
    </div>
  );
}

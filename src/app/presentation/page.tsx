import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Manus AI Slide Presentation | TechxMusic",
  description: "Interactive presentation on song structure and storytelling.",
};

export default async function PresentationPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if user is not authenticated
  if (!user) {
    redirect("/login");
  }

  const SLIDE_URL = "https://docs.google.com/presentation/d/e/2PACX-1vT1oFAm8cpY0iw2THRbCIuZcF1HSVDM4WnJiTfWLH1O3orx8RBtHtdA4o9bqrbeSg/pubembed?start=false&loop=false&delayms=3000";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <div className="space-y-2 mb-8 text-center md:text-left">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-500/20 px-3 py-1 rounded-full">
          Interactive Presentation
        </span>
        <h1 className="font-prompt text-3xl md:text-4xl font-bold tracking-tight text-white mt-3">
          โครงสร้างเพลงและการเล่าเรื่อง <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.2)]">Manus AI Slides</span>
        </h1>
        <p className="text-white/40 font-prompt text-sm max-w-2xl">
          สำรวจรายละเอียดและเจาะลึกเทคนิคการแต่งเพลง การเรียงร้อยอารมณ์ และบทสรุปผ่านสไลด์นําเสนอสุดพิเศษ
        </p>
      </div>

      {/* Premium iframe wrapper with aspect-ratio 16:9 and amber glow border */}
      <div className="glass-card p-1 md:p-2 bg-black/60 border-amber-500/25 shadow-[0_0_40px_rgba(245,158,11,0.15)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-amber-500/35 hover:shadow-[0_0_55px_rgba(245,158,11,0.22)]">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/5 bg-black">
          <iframe
            src={SLIDE_URL}
            className="w-full h-full border-0"
            allowFullScreen
          />
        </div>
      </div>
      
      {/* Decorative Brand Footer */}
      <div className="mt-8 text-center text-white/30 font-prompt text-xs">
        <p>iAonTechxMusic Ecosystem · Powered by Manus AI</p>
      </div>
    </div>
  );
}

import { createClient } from "@/utils/supabase/server";
import { MusicTemplatesView } from "@/components/music-templates/MusicTemplatesView";

export const metadata = {
  title: "คลังเทมเพลตดนตรีระดับพรีเมียม | AiAon Music Studio",
  description: "แหล่งรวมเทมเพลตดนตรีระดับมืออาชีพสำหรับ Logic Pro, Ableton Live, FL Studio และ MIDI แพ็คคุณภาพสูงเพื่อโปรดิวเซอร์ไทย",
};

export default async function MusicTemplatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Query music products from Supabase
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products for music templates page:", error);
  }

  // Filter products by category 'Music' or matching titles/descriptions
  const musicProducts = products?.filter(
    (p) => 
      p.category === "Music" || 
      p.category === "Template" && (p.title?.toLowerCase().includes("music") || p.description?.toLowerCase().includes("music") || p.description?.toLowerCase().includes("instrument"))
  ) || [];

  return (
    <MusicTemplatesView 
      initialProducts={musicProducts} 
      user={user} 
    />
  );
}

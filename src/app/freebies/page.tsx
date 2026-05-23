import { createClient } from "@/utils/supabase/server";
import { FreebiesView } from "@/components/freebies/FreebiesView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "คลังดาวน์โหลดของแจกฟรี | iAonTechxMusic",
  description:
    "รวมทรัพยากรดิจิทัลฟรีด้านเทคโนโลยีและดนตรี — n8n Workflow, MIDI Pack, Google Sheets Tracker และ Guitar Loop Pack สำหรับครูและนักดนตรีไทย",
  keywords: ["ฟรี", "ดาวน์โหลด", "MIDI", "n8n", "Google Sheets", "Loop Pack", "iAon"],
  openGraph: {
    title: "คลังดาวน์โหลดของแจกฟรี | iAonTechxMusic",
    description: "ดาวน์โหลดทรัพยากรดิจิทัลฟรี ทั้งด้านเทคโนโลยีและดนตรีคุณภาพสูง",
    type: "website",
  },
};

export default async function FreebiesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. Fetch native freebies
  const { data: freebies } = await supabase
    .from('freebies')
    .select('*')
    .order('created_at', { ascending: true });

  // 2. Fetch all products to check for free ones (price = 0 or free)
  const { data: products } = await supabase
    .from('products')
    .select('*');

  const freeProducts = (products || []).filter(product => {
    const priceStr = (product.price || "").trim().toLowerCase();
    return priceStr === "0" || 
           priceStr === "0 thb" || 
           priceStr === "ฟรี" || 
           priceStr === "0 บาท" || 
           priceStr === "free" ||
           priceStr === "";
  });

  // 3. Map free products to Freebie structure
  const mappedProducts = freeProducts.map(product => {
    const lowerTitle = product.title.toLowerCase();
    
    let description = product.description;
    let fileType = "ZIP";
    let fileSize = "-";
    
    // Parse formatting info from description if present
    const matchFormat = description.match(/\(Format:\s*(.+?)\)/i);
    const matchType = description.match(/\(Type:\s*(.+?)\)/i);
    const matchSize = description.match(/\(Size:\s*(.+?)\)/i);
    
    if (matchFormat) {
      fileType = matchFormat[1];
      description = description.replace(matchFormat[0], "").trim();
    } else if (matchType) {
      fileType = matchType[1];
      description = description.replace(matchType[0], "").trim();
    }
    if (matchSize) {
      fileSize = matchSize[1];
      description = description.replace(matchSize[0], "").trim();
    }

    // Determine category: tech or music
    const isMusic = product.category?.toLowerCase() === "service" || 
                    product.category?.toLowerCase() === "creative" ||
                    lowerTitle.includes("music") || 
                    lowerTitle.includes("guitar") || 
                    lowerTitle.includes("loop") || 
                    lowerTitle.includes("chords");

    const category = isMusic ? "music" : "tech";

    // Setup visual tokens depending on category
    const color_from = isMusic ? "from-purple-500" : "from-cyan-500";
    const color_to = isMusic ? "to-pink-600" : "to-blue-600";
    const glow_color = isMusic ? "rgba(168,85,247,0.25)" : "rgba(34,211,238,0.25)";
    const border_color = isMusic ? "border-purple-500/20" : "border-cyan-500/20";
    const text_color = isMusic ? "text-purple-400" : "text-cyan-400";
    const bg_color = isMusic ? "bg-purple-500/8" : "bg-cyan-500/8";

    // Download URL: if direct file or ebook URL exists, download it, else route to product details page
    const download_url = product.file_url || 
                          product.ebook_url || 
                          `/dashboard/marketplace/${product.id}`;

    return {
      id: product.id,
      title: product.title,
      description: description,
      category: category as "tech" | "music",
      icon_name: product.icon_name || "Gift",
      color_from,
      color_to,
      glow_color,
      border_color,
      text_color,
      bg_color,
      tag: product.category === "Template" ? "Automation" : product.category === "Service" ? "Creative" : (product.category || "ของแจกฟรี"),
      file_size: fileSize,
      file_type: fileType,
      download_url: download_url
    };
  });

  // Combine both arrays
  const combinedFreebies = [...(freebies || []), ...mappedProducts];

  return <FreebiesView user={user} initialFreebies={combinedFreebies} />;
}

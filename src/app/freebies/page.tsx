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

  const { data: freebies } = await supabase
    .from('freebies')
    .select('*')
    .order('created_at', { ascending: true });

  return <FreebiesView user={user} initialFreebies={freebies || []} />;
}

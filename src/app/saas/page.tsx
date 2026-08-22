import { SaaSView } from "@/components/saas/SaaSView";
import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "iAon IT ง่ายๆ — ระบบจัดการงานครูและแจ้งเตือน LINE อัตโนมัติ | AiAon Tech",
  description:
    "เมื่อครูดนตรีขี้เกียจทำงานเอกสาร เสกโค้ดให้คอมพิวเตอร์ทำงานแทน! รวมระบบเช็คชื่อ แจ้งเตือน LINE และบันทึกสถิติ Google Sheets อัตโนมัติ โดย ครูอ้น",
  keywords: [
    "iAon IT ง่ายๆ", "ครูอ้น", "ระบบเช็คชื่อ LINE", "Google Apps Script", "งานครู", "ลดงานเอกสาร", "AiAon Tech"
  ],
  openGraph: {
    title: "iAon IT ง่ายๆ — ระบบจัดการงานครูและแจ้งเตือน LINE อัตโนมัติ | AiAon Tech",
    description:
      "เมื่อครูดนตรีขี้เกียจทำงานเอกสาร เสกโค้ดให้คอมพิวเตอร์ทำงานแทน! รวมระบบเช็คชื่อและแจ้งเตือน LINE อัตโนมัติ",
    type: "website",
  },
};

export default async function SaaSPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return <SaaSView user={user} />;
}

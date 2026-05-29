import { SaaSView } from "@/components/saas/SaaSView";
import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบจัดการงานครูอัจฉริยะ LINE Notify | TechxMusic",
  description:
    "iAon ClassFlow ระบบเช็คชื่อและแจ้งเตือนผ่าน LINE อัตโนมัติสำหรับครูยุคใหม่ ลดงานเอกสาร เพิ่มความโปร่งใสกับผู้ปกครอง",
  keywords: [
    "ระบบเช็คชื่อ", "LINE Notify", "เช็คชื่อนักเรียน", "งานครู", "ครูยุคใหม่", "Apps Script", "iAon", "SaaS"
  ],
  openGraph: {
    title: "ระบบจัดการงานครูอัจฉริยะ LINE Notify | TechxMusic",
    description:
      "ระบบเช็คชื่อและแจ้งเตือนผ่าน LINE อัตโนมัติสำหรับครูยุคใหม่ ลดงานเอกสาร เพิ่มความโปร่งใสกับผู้ปกครอง",
    type: "website",
  },
};

export default async function SaaSPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return <SaaSView user={user} />;
}

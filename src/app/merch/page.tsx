import { createClient } from "@/utils/supabase/server";
import { MerchCustomizer } from "@/components/merch/MerchCustomizer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ออกแบบเสื้อยืด AiAonTech | TechxMusic",
  description:
    "ออกแบบและสั่งจองเสื้อยืดลิมิเต็ดอิดิชัน AiAonTech Customizer - เลือกสี ลายสกรีน และพิมพ์ชื่อคุณบนแขนเสื้อแบบเรียลไทม์ พร้อมสั่งซื้อผ่านไลน์ได้ทันที",
  keywords: ["เสื้อยืด", "AiAonTech", "เสื้อโปรแกรมเมอร์", "Custom T-Shirt", "ของที่ระลึก"],
  openGraph: {
    title: "ออกแบบเสื้อยืด AiAonTech | TechxMusic",
    description: "แต่งเสื้อยืดไอทีในสไตล์ของคุณเอง - เลือกสี ลาย และชื่อย่อบนแขนเสื้อแบบสดๆ",
    type: "website",
  },
};

export default async function MerchPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <MerchCustomizer user={user} />;
}

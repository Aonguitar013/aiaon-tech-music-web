import { PillarThemeWrapper } from "@/components/layout/PillarThemeWrapper";
import React from "react";
import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { DigitalVaultView } from "@/components/digital-vault/DigitalVaultView";
import { transformDigitalVaultProducts } from "@/config/catalogVisibility";

export const metadata: Metadata = {
  title: "คลังระบบโรงเรียน & ครู (Digital Vault) | AiAon Tech",
  description:
    "รวมระบบ Google Apps Script มาตรฐานสากลสำหรับครูทุกวิชาและโรงเรียนทั่วประเทศ ติดตั้งง่าย รันบน Google Drive ตัวเอง 100% ไร้ค่ารายเดือน",
  keywords: [
    "Digital Vault",
    "ระบบโรงเรียน",
    "เทมเพลตครู",
    "Google Apps Script",
    "ระบบเช็คชื่อ",
    "ระบบแจ้งซ่อมโรงเรียน",
    "แจ้งเตือน Telegram",
    "AiAon Tech",
  ],
  openGraph: {
    title: "คลังระบบโรงเรียน & ครู (Digital Vault) | AiAon Tech",
    description:
      "รวมระบบอัตโนมัติสำเร็จรูปมาตรฐานสากล ช่วยลดภาระงานเอกสารครูและโรงเรียนทั่วประเทศ",
    type: "website",
  },
};

export default async function DigitalVaultPage() {
  const supabase = await createClient();

  // Fetch all products from marketplace database (non-destructive: filtered & universalized via catalogVisibility)
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products for Digital Vault page:", error);
  }

  const universalProducts = transformDigitalVaultProducts(products || []);

  return <PillarThemeWrapper pillar="tech"><DigitalVaultView initialProducts={universalProducts} /></PillarThemeWrapper>;
}

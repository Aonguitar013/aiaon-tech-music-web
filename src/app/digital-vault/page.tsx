import React from "react";
import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { DigitalVaultView } from "@/components/digital-vault/DigitalVaultView";

export const metadata: Metadata = {
  title: "คลังสินค้าดิจิทัล (Digital Vault) | TechxMusic",
  description:
    "แหล่งรวมคู่มือปฏิบัติงานระบบอัตโนมัติ เทมเพลต และสื่อการสอนคุณภาพสูงเพื่อช่วยผ่อนแรงครูไทย ยกระดับประสิทธิภาพการสอนให้สูงสุด",
  keywords: [
    "Digital Vault",
    "เทมเพลตครู",
    "Google Apps Script",
    "ระบบเช็คชื่อ",
    "แจ้งเตือนไลน์",
    "สื่อการสอนครู",
    "E-book ดนตรี",
    "TechxMusic",
  ],
  openGraph: {
    title: "คลังสินค้าดิจิทัล (Digital Vault) | TechxMusic",
    description:
      "รวบรวมเทมเพลตและระบบอัตโนมัติสำเร็จรูปเพื่อช่วยลดเวลาและประหยัดภาระงานให้กับคุณ",
    type: "website",
  },
};

export default async function DigitalVaultPage() {
  const supabase = await createClient();

  // Fetch all products from marketplace database
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products for Digital Vault page:", error);
  }

  return <DigitalVaultView initialProducts={products || []} />;
}

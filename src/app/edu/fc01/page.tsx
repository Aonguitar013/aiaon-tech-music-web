import type { Metadata } from "next";
import { Fc01HubView } from "@/components/edu/Fc01HubView";

export const metadata: Metadata = {
  title:
    "EDU-FC01 ชุดแฟลชการ์ดคำศัพท์ & พลังใจ 2 ภาษาแก๊ง 6 แมว (48 การ์ด) — การ์ดเสียง TH/EN & โหลดฟรี 12 การ์ด",
  description:
    "หน้า Hybrid QR ประจำชุดแฟลชการ์ด EDU-FC01 แก๊ง 6 แมว 48 การ์ดตัดเล่น (16 หน้าเต็ม): พลิกการ์ดกดฟังเสียงอ่าน TH/EN + โหมดควิซฟังเสียงทายคำศัพท์ + สะสมดาว และโหลดชุดทดลองฟรี 5 หน้า (12 การ์ด)!",
  openGraph: {
    title:
      "EDU-FC01 ชุดแฟลชการ์ดคำศัพท์ & พลังใจ 2 ภาษาแก๊ง 6 แมว (48 การ์ด • เริ่ม 59฿!)",
    description:
      "36 การ์ดแก๊ง 6 แมว + 12 การ์ดโบนัสอารมณ์/กิจวัตร + เว็บการ์ดกดฟังเสียง TH/EN & เกมควิซฟรี โหลดฟรี 12 การ์ด!",
    url: "https://www.aiaon.tech/edu/fc01",
    images: [
      {
        url: "/edu/fc01/mockup-01-cover.webp",
        width: 1200,
        height: 1200,
        alt: "EDU-FC01 The 6 Cats Bilingual Flashcards & Affirmation Deck (48 Cards)",
      },
    ],
    type: "website",
  },
};

export default function EduFc01Page() {
  return <Fc01HubView />;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "วPA 2569 — ครูจิรวัฒน์ เดชเส้ง | TechxMusic",
  description:
    "การพัฒนาทักษะการประพันธ์เพลงด้วยแอปพลิเคชัน GarageBand สำหรับนักเรียนชั้นมัธยมศึกษาปีที่ 3 (TikTok Music Producer) — วPA 2569",
  keywords: ["วPA", "GarageBand", "ครูดนตรี", "หาดใหญ่วิทยาลัย", "TikTok Music Producer"],
  openGraph: {
    title: "วPA 2569 — ครูจิรวัฒน์ เดชเส้ง",
    description: "การพัฒนาทักษะการประพันธ์เพลงด้วยแอปพลิเคชัน GarageBand",
    locale: "th_TH",
    type: "article",
  },
};

export default function VpaLayout({ children }: { children: React.ReactNode }) {
  // Renders within the root layout (Navbar + footer are inherited automatically).
  // No wrapper needed — the root <main> already provides the correct padding.
  return <>{children}</>;
}

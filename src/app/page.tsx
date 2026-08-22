import { HomeView } from "@/components/home/HomeView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AiAon Tech — เสกงานเอกสารโรงเรียน & งานเรียนให้เสร็จในคลิกเดียว",
  description:
    "รวมระบบอัตโนมัติ Google Apps Script สำเร็จรูป 20 ระบบ, คลังไอเทมช่วยเรียนสำหรับนักเรียน Gen Z, แพ็กเกจเหมาลด 51% และบริการรับพัฒนาระบบตามสั่งสำหรับสถานศึกษา",
  keywords: [
    "AiAon Tech", "ครูอ้น", "Google Apps Script", "ระบบเช็คชื่อ", "ระบบโรงเรียน", "Portfolio TCAS", "SaaS", "การศึกษาไทย"
  ],
  openGraph: {
    title: "AiAon Tech — เสกงานเอกสารโรงเรียน & งานเรียนให้เสร็จในคลิกเดียว",
    description:
      "รวมระบบอัตโนมัติ Google Apps Script สำเร็จรูป 20 ระบบ, คลังไอเทมช่วยเรียนสำหรับนักเรียน Gen Z และบริการรับพัฒนาระบบตามสั่ง",
    type: "website",
  },
};

export default function Home() {
  return <HomeView />;
}

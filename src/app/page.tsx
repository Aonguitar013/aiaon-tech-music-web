import { HomeView } from "@/components/home/HomeView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AiAon Tech — จักรวาลโซลูชันเพื่อการศึกษา ธุรกิจ & ดนตรี โดย ครูอ้น",
  description:
    "รวมระบบอัตโนมัติ Google Apps Script 20+ ระบบ, คลัง 30 E-Book นวัตกรรมครูไทย 3D, บอทติวสอบครูผู้ช่วยพร้อมเพลงช่วยจำ, AI Caretaker ดูแลร้านค้า 24 ชม., คลังเพลงลิขสิทธิ์ BGM ว.PA 60 นาที และรับทำระบบตามสั่ง โดย ครูจิรวัฒน์ เดชเส้ง (ครูอ้น ค.ศ.2 รร.หาดใหญ่วิทยาลัย)",
  keywords: [
    "AiAon Tech",
    "ครูอ้น",
    "จิรวัฒน์ เดชเส้ง",
    "Google Apps Script",
    "ระบบเช็คชื่อ",
    "ระบบโรงเรียน",
    "30 E-Book ครูไทย",
    "ติวสอบครูผู้ช่วย",
    "AiAon Prep",
    "เพลงช่วยจำ",
    "ว.PA",
    "AI Caretaker",
    "ตรวจสลิป AI",
    "ดนตรีเพื่อการศึกษา",
    "Portfolio TCAS 3D",
    "การศึกษาไทย"
  ],
  openGraph: {
    title: "AiAon Tech — จักรวาลโซลูชันเพื่อการศึกษา ธุรกิจ & ดนตรี โดย ครูอ้น",
    description:
      "รวมระบบอัตโนมัติ Google Apps Script 20+ ระบบ, คลัง 30 E-Book ครูไทย 3D, บอทติวสอบครูผู้ช่วย, AI Caretaker ดูแลร้านค้า 24 ชม. และคลังเพลงเพื่อการศึกษา",
    type: "website",
  },
};

export default function Home() {
  return <HomeView />;
}

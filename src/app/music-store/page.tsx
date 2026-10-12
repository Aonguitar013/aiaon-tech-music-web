import { MusicStoreView } from "@/components/music-store/MusicStoreView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ร้านค้าเพลงช่วยจำ & เพลงบรรเลง BGM คลิป ว.PA ปลอดลิขสิทธิ์ | iAonTech x Music",
  description:
    "ดาวน์โหลดเพลงช่วยจำกฎหมายสอบครูผู้ช่วย, เพลงบรรเลงกีตาร์โปร่งและ Lo-Fi BGM ปลอดลิขสิทธิ์ 100% สำหรับทำคลิปการสอนส่ง ว.PA พร้อมใบรับรองสิทธิ์ และ Backing Track ซ้อมดนตรี โดย ครูอ้น",
  keywords: [
    "เพลงช่วยจำสอบครูผู้ช่วย",
    "เพลงประกอบคลิป ว.PA ไม่ติดลิขสิทธิ์",
    "เพลงบรรเลงปลอดลิขสิทธิ์ ครู",
    "Backing Track ซ้อมดนตรี",
    "พรีเซ็ต Cubase 12",
    "iAonTech x Music",
    "ครูอ้น",
  ],
  openGraph: {
    title: "ร้านค้าเพลงช่วยจำ & เพลงบรรเลง BGM คลิป ว.PA ปลอดลิขสิทธิ์ | iAonTech x Music",
    description:
      "เพลงช่วยจำสอบติดครูผู้ช่วย + เพลง BGM ใส่คลิปการสอน 60 นาทีส่ง ว.PA แบบไม่ติดลิขสิทธิ์ 100% ตลอดชีพ!",
    type: "website",
  },
};

export default function MusicStorePage() {
  return <MusicStoreView />;
}

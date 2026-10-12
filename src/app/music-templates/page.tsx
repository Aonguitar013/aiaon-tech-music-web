import { MusicStoreView } from "@/components/music-store/MusicStoreView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ร้านค้าเพลงช่วยจำ & เพลงบรรเลง BGM คลิป ว.PA ปลอดลิขสิทธิ์ | iAonTech x Music",
  description:
    "ดาวน์โหลดเพลงช่วยจำกฎหมายสอบครูผู้ช่วย, เพลงบรรเลงกีตาร์โปร่งและ Lo-Fi BGM ปลอดลิขสิทธิ์ 100% สำหรับทำคลิปการสอนส่ง ว.PA พร้อมใบรับรองสิทธิ์ และ Backing Track ซ้อมดนตรี โดย ครูอ้น",
};

export default function MusicTemplatesPage() {
  return <MusicStoreView />;
}

import React from "react";
import type { Metadata } from "next";
import { BandGroovingView } from "@/components/band-grooving/BandGroovingView";

export const metadata: Metadata = {
  title: "กลยุทธ์การฝึก Band Grooving & Click Track Mastery | TechxMusic",
  description:
    "เจาะลึกแผนการซ้อม 2 ชั่วโมง (40% ของหลักสูตร) ที่จะเปลี่ยนวงนักเรียนให้กลายเป็นวงมืออาชีพ ป้องกันความผิดพลาดของจังหวะในห้องบันทึกเสียงและเวทีประกวด",
  keywords: [
    "Band Grooving",
    "Click Track",
    "Metronome",
    "Band Clinic",
    "ซ้อมดนตรี",
    "จังหวะดนตรี",
    "ห้องอัดเสียง",
    "TechxMusic",
  ],
  openGraph: {
    title: "กลยุทธ์การฝึก Band Grooving & Click Track Mastery | TechxMusic",
    description:
      "เปลี่ยนวงซ้อมธรรมดาให้กลายเป็นวงระดับมืออาชีพด้วยคู่มือการซ้อม 120 นาทีที่เต็มไปด้วยประสิทธิภาพ",
    type: "website",
  },
};

export default function BandGroovingPage() {
  return <BandGroovingView />;
}

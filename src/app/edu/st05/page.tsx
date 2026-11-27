import type { Metadata } from "next";
import { St05HubView } from "@/components/edu/St05HubView";

export const metadata: Metadata = {
  title:
    "EDU-ST05 นิทานความกล้าไปโรงเรียน: วันแรกที่โรงเรียนของน้องบ๊อบ — เสียงเล่านิทาน TH/EN + กระดานคำทักทาย & Phonics",
  description:
    "หน้า Hybrid QR ประจำหนังสือนิทานภาพ EDU-ST05 (ชุดนิทานพลังใจแก๊ง 6 แมว เล่มที่ 5 • น้องบ๊อบ × แม่ใหญ่): Interactive Audio Storybook อ่านออกเสียง TH/EN 11 หน้าเรื่อง + กระดานซ้อมคำทักทาย & ตราหัวใจอุ่น + โหลดฟรี 5 หน้า!",
  openGraph: {
    title:
      "EDU-ST05 วันแรกที่โรงเรียนของน้องบ๊อบ — นิทานลดร้องไห้หน้าประตู รร. + แผนที่ความกล้า 3 ก้าว",
    description:
      "นิทานภาพสีน้ำ 16 หน้า (น้องบ๊อบ × แม่ใหญ่) ชวนลูกกล้าไปโรงเรียนและทักทายเพื่อนใหม่ด้วยแผนที่ความกล้า 3 ก้าว โหลดฟรี 5 หน้า!",
    url: "https://www.aiaon.tech/edu/st05",
    images: [
      {
        url: "/edu/st05/mockup-01-cover.webp",
        width: 1200,
        height: 1200,
        alt: "EDU-ST05 Explorer Bob's Brave First Day",
      },
    ],
    type: "website",
  },
};

export default function EduSt05Page() {
  return <St05HubView />;
}

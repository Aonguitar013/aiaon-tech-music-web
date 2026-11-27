import type { Metadata } from "next";
import { St01HubView } from "@/components/edu/St01HubView";

export const metadata: Metadata = {
  title:
    "EDU-ST01 นิทานก่อนนอน: คืนที่ก้อนเมฆสีเทาหายไป — เสียงเล่านิทาน TH/EN + หายใจสายรุ้ง 4-4-4",
  description:
    "หน้า Hybrid QR ประจำหนังสือนิทานภาพ EDU-ST01 (ชุดนิทานพลังใจแก๊ง 6 แมว เล่มที่ 1 • น้องดำ × แม่ใหญ่): Interactive Audio Storybook อ่านออกเสียง TH/EN 11 หน้าเรื่อง + ตัวช่วยหายใจสายรุ้ง 4-4-4 ก่อนนอน + 3 คำถามชวนคุย + โหลดฟรี 5 หน้า!",
  openGraph: {
    title:
      "EDU-ST01 คืนที่ก้อนเมฆสีเทาหายไป — นิทานก่อนนอนพลังใจ SEL + เสียงเล่านิทานฟรี TH/EN",
    description:
      "นิทานภาพสีน้ำ 16 หน้า (น้องดำ × แม่ใหญ่) สอนลูกคุมอารมณ์หงุดหงิดก่อนนอนด้วยหายใจสายรุ้ง 4-4-4 โหลดฟรี 5 หน้า!",
    url: "https://www.aiaon.tech/edu/st01",
    images: [
      {
        url: "/edu/st01/mockup-01-cover.webp",
        width: 1200,
        height: 1200,
        alt: "EDU-ST01 The Night the Gray Cloud Melted Away",
      },
    ],
    type: "website",
  },
};

export default function EduSt01Page() {
  return <St01HubView />;
}

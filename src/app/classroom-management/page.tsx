import type { Metadata } from "next";
import { ClassroomView } from "@/components/classroom/ClassroomView";

export const metadata: Metadata = {
  title: "ระบบบริหารจัดการชั้นเรียน | iAonTechxMusic",
  description: "ระบบบริหารจัดการชั้นเรียนอัจฉริยะแบบเรียลไทม์ พัฒนาโดย iAonTechxMusic",
  keywords: [
    "ระบบบริหารจัดการชั้นเรียน",
    "เช็คชื่อ",
    "งานครู",
    "Apps Script",
    "iAon",
  ],
  openGraph: {
    title: "ระบบบริหารจัดการชั้นเรียน | iAonTechxMusic",
    description: "ระบบบริหารจัดการชั้นเรียนอัจฉริยะแบบเรียลไทม์ พัฒนาโดย iAonTechxMusic",
    type: "website",
  },
};

export default function ClassroomManagementPage() {
  return <ClassroomView />;
}

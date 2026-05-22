import { ServicesView } from "@/components/services/ServicesView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "บริการออกแบบระบบ & ทำเพลง | iAonTechxMusic",
  description:
    "บริการออกแบบระบบ Automation สำหรับโรงเรียนและธุรกิจ, รับทำเพลง, Mix & Master และ DAW Template แบบ Custom โดย iAonTechxMusic",
  keywords: [
    "บริการ", "ออกแบบระบบ", "Automation", "n8n", "LINE Notify",
    "แต่งเพลง", "Mix Master", "DAW Template", "iAon"
  ],
  openGraph: {
    title: "บริการออกแบบระบบ & ทำเพลง | iAonTechxMusic",
    description:
      "บริการออกแบบระบบ Automation สำหรับโรงเรียน และงานดนตรีระดับมืออาชีพ — Custom ตามโจทย์ของคุณ",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesView />;
}

import { ChannelsHubView } from "@/components/channels/ChannelsHubView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "รวมช่องทางทางการ & หน้าร้านไอทีครูอ้น (iAonTech Official Hub) | AiAon Tech",
  description:
    "ศูนย์รวมทุกช่องทางโซเชียลมีเดียของครูอ้น (เพจ ไอทีง่ายๆ สไตล์ iAon, TikTok iAonTech, YouTube, IG, Threads, LINE OA @deu6776s) และหน้าร้านอุปกรณ์ไอทีของแท้ทั้ง 3 แพลตฟอร์ม (TikTok Shop, Shopee, Lazada)",
  keywords: [
    "iAonTech",
    "ไอทีง่ายๆ สไตล์ iAon",
    "Aon Jirawat",
    "iAonTech Studio & Gadget",
    "iAonTech Gadget",
    "iAonTech Official Select",
    "ครูอ้น",
    "AiAon Tech",
  ],
  openGraph: {
    title: "รวมช่องทางทางการ & หน้าร้านไอทีครูอ้น (iAonTech Official Hub)",
    description:
      "คลิกเชื่อมต่อไปยังทุกแพลตฟอร์มและหน้าร้านอุปกรณ์ไอทีของแท้ที่ครูอ้นคัดมาให้แล้วในหน้าเดียว!",
    type: "website",
  },
};

export default function ChannelsHubPage() {
  return <ChannelsHubView />;
}

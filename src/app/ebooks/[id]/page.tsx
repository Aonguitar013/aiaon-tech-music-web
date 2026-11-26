import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { findEbookByCode, getAllEbooks } from "@/components/ebooks/ebookDataHelper";
import { EbookDetailSection } from "@/components/ebooks/EbookDetailSection";
import { PillarThemeWrapper } from "@/components/layout/PillarThemeWrapper";

interface EbookPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const all = getAllEbooks();
  const params: { id: string }[] = [];

  for (const b of all) {
    // Provide both short code (e.g. EB01) and long code (e.g. EB-PA-01)
    params.push({ id: b.shortCode });
    if (b.code && b.code !== b.shortCode) {
      params.push({ id: b.code });
    }
  }

  return params;
}

export async function generateMetadata({ params }: EbookPageProps): Promise<Metadata> {
  const { id } = await params;
  const ebook = findEbookByCode(id);

  if (!ebook) {
    return {
      title: "ไม่พบ E-Book | AiAon Tech",
    };
  }

  return {
    title: `[${ebook.code}] ${ebook.title} | AiAon Tech 2026`,
    description: ebook.headline + " " + ebook.subheadline,
    keywords: [
      ebook.code,
      ebook.title,
      ebook.category,
      "E-Book ครูไทย",
      "ครูอ้น iAon Tech",
      "ว.PA 2026",
    ],
    openGraph: {
      title: `[${ebook.code}] ${ebook.title} | iAon Tech`,
      description: `ราคาพิเศษเปิดตัว ฿${ebook.earlyBirdPrice} จากปกติ ฿${ebook.regularPrice} พร้อมอ่านบน Web Reader และพิมพ์ PDF A4 ได้ทันที`,
      type: "website",
    },
  };
}

export default async function EbookDetailPage({ params }: EbookPageProps) {
  const { id } = await params;
  const ebook = findEbookByCode(id);

  if (!ebook) {
    return (
      <PillarThemeWrapper pillar="edu">
        <div className="min-h-screen text-[#0F172A] flex flex-col items-center justify-center p-4 font-prompt">
          <h1 className="text-2xl font-bold mb-3">ไม่พบ E-Book เล่มนี้</h1>
          <p className="text-[#475569] text-sm mb-6">รหัสที่คุณค้นหาอาจไม่ถูกต้อง หรือยังไม่เปิดให้สั่งซื้อ</p>
          <Link
            href="/ebooks"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F172A] text-white font-bold text-sm hover:bg-[#1E293B] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับสู่คลัง 30 E-Book</span>
          </Link>
        </div>
      </PillarThemeWrapper>
    );
  }

  return (
    <PillarThemeWrapper pillar="edu">
      <div className="min-h-screen text-[#1E293B] pt-10 sm:pt-14 pb-20 selection:bg-amber-200 selection:text-[#0F172A] font-prompt">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/ebooks"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#475569] hover:text-[#0F172A] transition font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับหน้าคลัง 30 สุดยอด E-Book</span>
            </Link>
          </div>

          {/* 7 Core Conversion Elements Section */}
          <EbookDetailSection ebook={ebook} />
        </div>
      </div>
    </PillarThemeWrapper>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { findEbookByCode, getAllEbooks } from "@/components/ebooks/ebookDataHelper";
import { EbookDetailSection } from "@/components/ebooks/EbookDetailSection";

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
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-3">ไม่พบ E-Book เล่มนี้</h1>
        <p className="text-slate-400 text-sm mb-6">รหัสที่คุณค้นหาอาจไม่ถูกต้อง หรือยังไม่เปิดให้สั่งซื้อ</p>
        <Link
          href="/ebooks"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-500 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับสู่คลัง 30 E-Book</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-20 selection:bg-indigo-500 selection:text-white font-prompt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/ebooks"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-white transition font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับหน้าคลัง 30 สุดยอด E-Book</span>
          </Link>
        </div>

        {/* 7 Core Conversion Elements Section */}
        <EbookDetailSection ebook={ebook} />
      </div>
    </div>
  );
}

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Lock, ShieldCheck } from "lucide-react";
import { parseMarkdown, extractHeadings } from "@/utils/markdown";

export default async function EbookReaderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch product (including ebook_content) and check purchase status
  const [{ data: product, error }, { data: existingOrder }] = await Promise.all([
    supabase.from('products').select('id, title, ebook_content, category').eq('id', id).single(),
    supabase
      .from('orders')
      .select('id, status')
      .eq('user_id', user.id)
      .eq('product_id', id)
      .eq('status', 'completed')
      .maybeSingle(),
  ]);

  const isPurchased = !!existingOrder;

  if (error || !product) {
    redirect('/dashboard/marketplace');
  }

  // Safety Gate: If not purchased, block access completely!
  if (!isPurchased) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center text-center px-4 font-prompt">
        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 animate-bounce">
          <Lock className="w-10 h-10 text-red-400" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">เนื้อหานี้ถูกล็อกไว้</h1>
        <p className="text-white/50 max-w-md text-sm mb-6">
          คุณต้องซื้อสินค้านี้ก่อนจึงจะสามารถเข้าอ่าน E-Book คู่มือการใช้งานนี้ได้
        </p>
        <Link
          href={`/dashboard/marketplace/${id}`}
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-900/30"
        >
          ไปหน้าสั่งซื้อสินค้า
        </Link>
      </div>
    );
  }

  // Handle empty content gracefully
  const mdContent = product.ebook_content || `# ${product.title}\n\nขออภัย คู่มือการใช้งาน E-Book สำหรับรายการนี้กำลังอยู่ระหว่างจัดทำและจะพร้อมให้อ่านในเร็วๆ นี้ครับ!`;

  // Parse Markdown to HTML
  const contentHtml = parseMarkdown(mdContent);

  // Extract headings for Sidebar Table of Contents
  const headings = extractHeadings(mdContent);

  return (
    <div className="w-full max-w-7xl mx-auto pb-20 secure-reader-body no-print">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href={`/dashboard/marketplace/${id}`}
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-prompt text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> กลับหน้าข้อมูลสินค้า
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Side: Table of Contents / Navigation */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 hidden lg:block">
          <div className="glass-card p-5 border-white/10 flex flex-col max-h-[75vh]">
            <h3 className="font-prompt font-bold text-white text-base mb-4 flex items-center gap-2 pb-3 border-b border-white/10">
              <BookOpen className="w-4 h-4 text-cyan-400" /> สารบัญคู่มือ
            </h3>
            <div className="overflow-y-auto pr-1 space-y-2 flex-1 scrollbar-thin">
              {headings.length > 0 ? (
                headings.map((h, index) => (
                  <a
                    key={index}
                    href={`#${h.id}`}
                    className={`block font-prompt text-xs transition-colors hover:text-cyan-400 py-1 ${
                      h.isH1
                        ? "text-white/80 font-semibold"
                        : "text-white/50 pl-3 font-normal"
                    }`}
                  >
                    {h.title}
                  </a>
                ))
              ) : (
                <span className="text-white/30 text-xs font-prompt">ไม่มีหัวข้อเรื่อง</span>
              )}
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[10px] text-white/40 font-prompt">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> ระบบอ่านแบบปลอดภัย
            </div>
          </div>
        </div>

        {/* Right Side: Web-Book Reader Area */}
        <div className="lg:col-span-3">
          <div
            className="glass-card p-6 md:p-12 border-white/10 relative overflow-hidden select-none"
            style={{
              WebkitUserSelect: "none",
              msUserSelect: "none",
              userSelect: "none",
            }}
          >
            {/* Ambient subtle glow inside reader */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none -ml-20 -mb-20"></div>

            {/* Document body with print prevention styling */}
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </div>
      </div>

      {/* Copy prevention client-side handler script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('copy', (e) => {
              e.preventDefault();
            });
            document.addEventListener('contextmenu', (e) => {
              e.preventDefault();
            });
            document.addEventListener('keydown', (e) => {
              if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
                e.preventDefault();
                alert('ระบบไม่อนุญาตให้พิมพ์หรือบันทึกหน้าคู่มือนี้');
              }
              if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
                e.preventDefault();
              }
            });
          `,
        }}
      />
    </div>
  );
}

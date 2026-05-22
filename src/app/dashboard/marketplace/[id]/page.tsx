import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Mail, ShoppingCart, Download, BadgeCheck } from "lucide-react";
import * as Icons from "lucide-react";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch product (including file_url) and check purchase status concurrently
  const [{ data: product, error }, { data: existingOrder }] = await Promise.all([
    supabase.from('products').select('*, file_url').eq('id', id).single(),
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
    return (
        <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-white/50">
            <p className="font-prompt text-xl mb-4">ไม่พบสินค้านี้</p>
            <Link href="/dashboard/marketplace" className="text-blue-400 hover:text-blue-300 font-prompt underline">
                กลับสู่หน้ารวมสินค้า
            </Link>
        </div>
    );
  }
  
  // Extract clean description and format tag
  let rawDesc = product.description;
  let parsedType = "";
  const matchFormat = rawDesc.match(/\(Format:\s*(.+?)\)/);
  const matchType = rawDesc.match(/\(Type:\s*(.+?)\)/);
  
  if (matchFormat) {
    parsedType = matchFormat[1];
    rawDesc = rawDesc.replace(matchFormat[0], "").trim();
  } else if (matchType) {
    parsedType = matchType[1];
    rawDesc = rawDesc.replace(matchType[0], "").trim();
  }

  const IconComponent = (Icons as any)[product.icon_name || "Package"] || Icons.Package;
  const isService = product.category === "Service" || product.category === "Creative";
  const colorClass = product.color_classes || "text-amber-400 bg-amber-500/10 border-amber-500/20";
  const buttonClass = product.button_classes || "bg-amber-600 hover:bg-amber-500 shadow-amber-600/10 hover:shadow-[0_0_15px_rgba(245,158,11,0.35)]";

  return (
    <div className="w-full max-w-[1200px] mx-auto min-h-screen flex flex-col pb-20">
      <div className="mb-6">
          <Link href="/dashboard/marketplace" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-prompt text-sm">
             <ArrowLeft className="w-4 h-4" /> กลับหน้าคลังสินค้า
          </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Detail Area */}
          <div className="lg:col-span-2 flex flex-col gap-6">
             <div className="glass-card p-8 md:p-10 border-white/10 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full pointer-events-none -mr-20 -mt-20"></div>
                 
                 <div className="flex items-start justify-between gap-4 mb-6">
                     <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border shadow-lg ${colorClass}`}>
                         <IconComponent className="w-10 h-10" />
                     </div>
                     {/* "Already Owned" badge */}
                     {isPurchased && (
                         <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full text-sm font-prompt font-semibold shadow-[0_0_20px_rgba(16,185,129,0.15)] shrink-0">
                             <BadgeCheck className="w-4 h-4" />
                             คุณเป็นเจ้าของแล้ว
                         </div>
                     )}
                 </div>

                 <div className="bg-white/10 text-white/80 border border-white/20 inline-block px-3 py-1 rounded-full text-xs font-prompt font-medium uppercase tracking-wider mb-4 shadow">
                     {product.category === "Template" ? "ระบบ / สคริปต์" : product.category === "Service" ? "ดนตรี / ดีไซน์" : "บริการ / ที่ปรึกษา"}
                 </div>

                 <h1 className="text-3xl md:text-5xl font-bold font-prompt text-white mb-6 leading-tight">
                     {product.title}
                 </h1>
                 
                 <div className="prose prose-invert max-w-none font-prompt text-white/70 leading-relaxed text-lg">
                    <p>{rawDesc}</p>
                    
                    <h3 className="text-xl text-white font-bold mt-10 mb-4 border-b border-white/10 pb-2">สิ่งที่คุณจะได้รับ</h3>
                    <ul className="space-y-3 mt-4 list-none pl-0">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                            <span>สิทธิ์การใช้งานแบบตลอดชีพ (Lifetime License) โดยไม่มีค่าเรียกเก็บรายเดือน</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                            <span>คู่มือการติดตั้งและการใช้งานทีละขั้นตอนอย่างละเอียด</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                            <span>อัปเดตเวอร์ชันใหม่ฟรีตลอดอายุการใช้งาน</span>
                        </li>
                        {isService && (
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                                <span>Support ตอบคำถามและให้คำปรึกษาทางเทคนิคส่วนตัว</span>
                            </li>
                        )}
                    </ul>
                 </div>
             </div>
          </div>

          {/* Sticky Checkout Sidebar */}
          <div className="lg:col-span-1 relative">
              <div className={`sticky top-8 glass-card p-6 flex flex-col shadow-2xl transition-all ${isPurchased ? "border-emerald-500/20" : "border-white/10"}`}>
                  
                  {/* Purchased banner inside sidebar */}
                  {isPurchased && (
                      <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 mb-6">
                          <BadgeCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                          <p className="text-sm font-prompt text-emerald-300 font-medium leading-tight">
                              คุณซื้อสินค้านี้แล้ว<br />
                              <span className="text-emerald-400/70 text-xs font-normal">คลิกด้านล่างเพื่อเข้าถึงไฟล์</span>
                          </p>
                      </div>
                  )}

                  <p className="text-sm text-white/50 font-prompt mb-1">ราคา</p>
                  <div className={`text-4xl font-bold font-prompt mb-6 ${isPurchased ? "text-emerald-400" : "text-white"}`}>
                      {product.price}
                  </div>

                  {parsedType && (
                      <div className="bg-black/30 rounded-lg p-4 mb-6 border border-white/5">
                          <p className="text-xs text-white/40 font-prompt mb-1">รูปแบบการส่งมอบ / ประเภท</p>
                          <p className="text-sm text-white/80 font-prompt font-medium">{parsedType}</p>
                      </div>
                  )}

                  {/* === Conditional CTA Button === */}
                  {isPurchased ? (
                      // Already purchased — open file_url directly in new tab
                      <a
                          href={product.file_url || "/dashboard/profile"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-4 rounded-xl text-white font-prompt font-bold text-lg transition-all shadow-lg shadow-black/40 flex items-center justify-center gap-2 mb-4 group bg-emerald-600 hover:bg-emerald-500"
                      >
                          <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                          ดาวน์โหลด / เข้าถึงไฟล์
                      </a>
                  ) : (
                      // Not yet purchased
                      <Link
                          href={`/dashboard/marketplace/checkout/${product.id}`}
                          className={`w-full py-4 rounded-xl text-white font-prompt font-bold text-lg transition-all shadow-lg shadow-black/40 flex items-center justify-center gap-2 mb-4 group ${buttonClass}`}
                      >
                          {isService ? (
                              <><Mail className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /> ติดต่อขอใบเสนอราคา</>
                          ) : (
                              <><ShoppingCart className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /> สั่งซื้อเลยตอนนี้</>
                          )}
                      </Link>
                  )}
                  
                  <div className="flex items-center justify-center gap-2 text-xs text-white/40 font-prompt mt-2">
                       {isPurchased ? (
                           <><BadgeCheck className="w-4 h-4 text-emerald-500/70" /> คุณเป็นเจ้าของสินค้านี้แล้ว</>
                       ) : (
                           <><ShieldCheck className="w-4 h-4 text-emerald-500/70" /> การันตีความปลอดภัย ชำระเงินผ่านระบบ 100%</>
                       )}
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

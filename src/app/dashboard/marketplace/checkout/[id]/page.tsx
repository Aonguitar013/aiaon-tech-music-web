import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SlipUploader } from "@/components/marketplace/SlipUploader";

export const metadata = {
  title: "Checkout | AiAon Tech",
};

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Try to find the item in 'courses' first, then fall back to 'products'
  let item: any = null;
  let itemType: "course" | "product" = "product";
  let backHref = "/dashboard/marketplace";

  const { data: course } = await supabase.from('courses').select('*').eq('id', id).maybeSingle();
  if (course) {
    item = course;
    itemType = "course";
    backHref = `/dashboard/academy/${id}`;
  } else {
    const { data: product } = await supabase.from('products').select('*').eq('id', id).maybeSingle();
    if (product) {
      item = product;
      itemType = "product";
      backHref = `/dashboard/marketplace/${id}`;
    }
  }

  if (!item) {
    return (
        <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-white/50">
            <p className="font-prompt text-xl mb-4">ไม่พบสินค้าหรือคอร์สนี้</p>
            <Link href="/dashboard/marketplace" className="text-blue-400 hover:text-blue-300 font-prompt underline">
                กลับสู่หน้าหลัก
            </Link>
        </div>
    );
  }
  
  // Parse the price text into a pure number e.g. "1,500 THB" -> 1500
  const parsePrice = (priceStr?: string) => {
      if (!priceStr) return 0;
      const clean = priceStr.replace(/[^0-9.]/g, '');
      const num = parseFloat(clean);
      return isNaN(num) ? 0 : num;
  };

  const parsedAmount = parsePrice(item.price);
  
  // Generate PromptPay QR payload on the server (requires Node.js Buffer)
  const generatePayload = require("promptpay-qr");
  const PROMPTPAY_ID = "0835399340";
  const payloadStr = generatePayload(PROMPTPAY_ID, { amount: parsedAmount });

  return (
    <div className="w-full max-w-[1200px] mx-auto min-h-screen flex flex-col pb-20">
      <div className="mb-6">
          <Link href={backHref} className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-prompt text-sm">
             <ArrowLeft className="w-4 h-4" /> กลับหลัง
          </Link>
      </div>

      <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold font-prompt text-white mb-4">ดำเนินการชำระเงิน</h1>
          <p className="text-white/60 font-prompt max-w-lg mx-auto">
             ชำระเงินสำหรับ <b>{item.title}</b> ด้วยการสแกน QR Code พร้อมเพย์ ระบบจะตรวจสอบหลักฐานอัตโนมัติ
          </p>
      </div>

      <SlipUploader 
         itemId={item.id}
         itemType={itemType}
         productTitle={item.title}
         productPrice={item.price}
         promptPayPayload={payloadStr}
         userId={user.id}
      />
    </div>
  )
}

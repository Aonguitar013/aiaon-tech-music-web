import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ProductClientGrid } from "@/components/marketplace/ProductClientGrid";
import { ShoppingCart } from "lucide-react";

export const metadata = {
  title: "Marketplace | AiAon Tech",
};

export default async function MarketplacePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch all products
  const { data: products, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/50 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <ShoppingCart className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="font-prompt text-3xl md:text-4xl font-bold text-white">สินค้าและบริการ (Marketplace)</h1>
        </div>
        <p className="text-white/60 font-prompt">
            ค้นหาระบบอัตโนมัติ เทมเพลต และบริการพิเศษ ที่พร้อมช่วยลดเวลาการทำงานของคุณ
        </p>
      </div>

      <ProductClientGrid initialProducts={products || []} />
    </div>
  );
}

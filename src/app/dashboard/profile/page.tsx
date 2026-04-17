import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ProfileManager } from "@/components/profile/ProfileManager";
import { MyLearning } from "@/components/profile/MyLearning";
import { OrderHistory } from "@/components/profile/OrderHistory";
import { User } from "lucide-react";

export const metadata = {
  title: "Profile & Learning | AiAon Tech",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch Profile
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();

  // Fetch Orders with Joined data for both products AND courses
  const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select(`
            *,
            products ( id, title, description, icon_name, color_classes, button_classes, category ),
            courses ( id, title, description, color_gradient )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

  if (ordersError) {
      console.error("Orders Error:", ordersError);
  }

  // Build a unified list of purchased items from completed orders.
  // Products with category='course' are treated the same as Academy courses.
  const learningItems = (orders || [])
        .filter(order => order.status === 'completed')
        .flatMap(order => {
            const items: any[] = [];
            // Items from the courses table are always 'course'
            if (order.courses) {
                items.push({ ...order.courses, itemType: 'course' as const });
            }
            // Products can be 'course' or 'digital_product' based on their category field
            if (order.products) {
                const productType = order.products.category === 'course' ? 'course' : 'digital_product';
                items.push({ ...order.products, itemType: productType as 'course' | 'digital_product' });
            }
            return items;
        });

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-20">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/50 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <User className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="font-prompt text-3xl md:text-4xl font-bold text-white">บัญชีและคอร์สเรียนของคุณ</h1>
        </div>
        <p className="text-white/60 font-prompt">
            จัดการข้อมูลส่วนตัว ตรวจสอบสถานะการสั่งซื้อ และเข้าสู่ห้องเรียนได้ที่นี่
        </p>
      </div>

      <div className="space-y-12">
          {/* Profile Section */}
          <section>
              <h2 className="text-xl md:text-2xl font-bold font-prompt text-white mb-6 border-b border-white/10 pb-4">โปรไฟล์ส่วนตัว (Profile)</h2>
              <ProfileManager user={user} initialProfile={profile} />
          </section>

          {/* My Learning Section */}
          <section>
              <h2 className="text-xl md:text-2xl font-bold font-prompt text-white mb-6 border-b border-white/10 pb-4">สิ่งที่ฉันซื้อมา (My Purchases)</h2>
              <MyLearning items={learningItems} />
          </section>

          {/* Order History Section */}
          <section>
              <h2 className="text-xl md:text-2xl font-bold font-prompt text-white mb-6 border-b border-white/10 pb-4">ประวัติการชำระเงิน (Order History)</h2>
              <OrderHistory orders={orders || []} />
          </section>
      </div>
    </div>
  )
}

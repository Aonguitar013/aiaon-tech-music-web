import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Receipt,
  Users,
  ShoppingBag,
  Eye,
  ShieldAlert,
  DollarSign,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { approveOrder, rejectOrder } from "./actions";
import { DashboardChart } from "@/components/dashboard/DashboardChart";


export const metadata = {
  title: "Admin — Order Approvals | AiAon Tech",
};

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Hard RBAC gate — double check with DB role AND known admin email
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin =
    profile?.role === "admin" || user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (!isAdmin) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-2">
          <ShieldAlert className="w-10 h-10 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold font-prompt text-white">
          ไม่มีสิทธิ์เข้าถึง
        </h1>
        <p className="text-white/50 font-prompt max-w-sm text-sm">
          หน้านี้สำหรับผู้ดูแลระบบเท่านั้น
          หากคิดว่าเกิดข้อผิดพลาด กรุณาติดต่อ Admin
        </p>
        <Link
          href="/dashboard"
          className="mt-4 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-prompt text-sm transition-colors"
        >
          กลับหน้าหลัก
        </Link>
      </div>
    );
  }

  // Step 1: Fetch ALL orders. Avoid joining `profiles` here — its RLS policy
  // blocks reading other users' rows. Products/courses joins work because
  // those tables are typically public-readable.
  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      products ( id, title, category ),
      courses ( id, title )
    `
    )
    .order("created_at", { ascending: false });

  if (error) console.error("Admin orders fetch error:", error);

  // Step 2: Bulk-fetch profiles for all unique user_ids (separate query,
  // reads only the public display_name — adjust RLS if this also fails).
  const rawOrders = orders ?? [];
  const uniqueUserIds = [...new Set(rawOrders.map((o) => o.user_id).filter(Boolean))];
  const { data: profileRows } = uniqueUserIds.length
    ? await supabase
      .from("profiles")
      .select("id, display_name")
      .in("id", uniqueUserIds)
    : { data: [] };

  // Build a quick lookup map: user_id → display_name
  const profileMap = Object.fromEntries(
    (profileRows ?? []).map((p) => [p.id, p.display_name])
  );

  // Attach the display_name to each order for use in rendering
  const allOrders = rawOrders.map((o) => ({
    ...o,
    customerName: profileMap[o.user_id] ?? o.user_id?.slice(0, 8) + "…",
  }));

  const pendingOrders = allOrders.filter((o) => o.status === "pending");
  const completedOrders = allOrders.filter((o) => o.status === "completed");

  // Calculate Total Revenue (approved only)
  const totalRevenue = completedOrders.reduce((sum, order) => {
    const num = parseFloat((order.amount || "0").toString().replace(/[^0-9.-]+/g, ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  // Calculate Active Students (unique users in approved orders)
  const activeStudentsCount = new Set(completedOrders.map((o) => o.user_id).filter(Boolean)).size;

  // Sales Analytics (Line Chart data)
  const chartData: { name: string; revenue: number }[] = [];
  [...completedOrders].reverse().forEach((order) => {
    const date = new Date(order.created_at);
    const dayStr = date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });

    const num = parseFloat((order.amount || "0").toString().replace(/[^0-9.-]+/g, ""));
    const revenue = isNaN(num) ? 0 : num;

    const existing = chartData.find(d => d.name === dayStr);
    if (existing) {
      existing.revenue += Math.round(revenue);
    } else {
      chartData.push({ name: dayStr, revenue: Math.round(revenue) });
    }
  });

  // Best Sellers Top 5
  const productSalesMap: Record<string, { count: number, revenue: number, type: string }> = {};
  completedOrders.forEach((order) => {
    const title = order.products?.title || order.courses?.title || "ไม่ระบุรายการ";
    const typeStr = order.course_id ? "คอร์สเรียน" : "สินค้าดิจิทัล";

    const num = parseFloat((order.amount || "0").toString().replace(/[^0-9.-]+/g, ""));
    const revenue = isNaN(num) ? 0 : num;

    if (!productSalesMap[title]) {
      productSalesMap[title] = { count: 0, revenue: 0, type: typeStr };
    }
    productSalesMap[title].count += 1;
    productSalesMap[title].revenue += Math.round(revenue);
  });

  const bestSellers = Object.entries(productSalesMap)
    .map(([title, data]) => ({ title, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Pre-bind server actions
  const approveWithId = approveOrder.bind(null);
  const rejectWithId = rejectOrder.bind(null);

  return (
    <div className="w-full max-w-7xl mx-auto pb-20">
      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-prompt text-sm mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          กลับ Dashboard
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center shadow-[0_0_25px_rgba(249,115,22,0.2)] shrink-0">
            <Receipt className="w-7 h-7 text-orange-400" />
          </div>
          <div>
            <h1 className="font-prompt text-3xl md:text-4xl font-bold text-white">
              Admin — Order Approvals
            </h1>
            <p className="text-white/50 font-prompt text-sm mt-1">
              ตรวจสอบและอนุมัติคำสั่งซื้อที่รอดำเนินการ
            </p>
          </div>
        </div>
      </div>

      {/* ── Summary Stats ────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          {
            label: "ยอดขายรวม (Total Revenue)",
            value: `฿${totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
          },
          {
            label: "นักเรียนที่ใช้งาน (Active)",
            value: activeStudentsCount,
            icon: Users,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
          },
          {
            label: "คำสั่งซื้อทั้งหมด",
            value: allOrders.length,
            icon: ShoppingBag,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
          },
          {
            label: "รอตรวจสอบ (Pending)",
            value: pendingOrders.length,
            icon: Clock,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20",
            pulse: pendingOrders.length > 0,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`glass-card p-5 flex items-center gap-4 border ${stat.border} relative overflow-hidden`}
          >
            <div
              className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}
            >
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className={`text-2xl font-bold font-prompt ${stat.color} truncate max-w-[120px]`}>
                {stat.value}
              </p>
              <p className="text-xs text-white/50 font-prompt truncate">{stat.label}</p>
            </div>
            {(stat as any).pulse && Number(stat.value) > 0 && (
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            )}
          </div>
        ))}
      </div>

      {/* ── Dashboards & Best Sellers ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <DashboardChart data={chartData} />

        {/* Best Sellers */}
        <div className="glass-card p-6 border-white/10 lg:col-span-1 flex flex-col min-h-[400px]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                <Trophy className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-prompt text-white leading-tight">สินค้าขายดี</h3>
                <p className="text-xs text-white/50 font-prompt">Top 5 (Best Sellers)</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            {bestSellers.length > 0 ? (
              bestSellers.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 text-xs font-bold font-prompt ${idx === 0 ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400' :
                        idx === 1 ? 'bg-slate-300/20 border-slate-300/40 text-slate-300' :
                          idx === 2 ? 'bg-orange-700/20 border-orange-700/40 text-orange-400' :
                            'bg-white/5 border-white/10 text-white/40'
                      }`}>
                      #{idx + 1}
                    </div>
                    <div className="min-w-0 pr-2">
                      <h4 className="text-white font-prompt font-medium truncate text-sm leading-tight mb-0.5">{item.title}</h4>
                      <p className="text-[10px] text-white/40 font-prompt">{item.type} • {item.count} orders</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 group-hover:border-emerald-500/20 transition-colors">
                    <p className="text-sm font-bold text-emerald-400 font-prompt">฿{item.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-white/20 gap-3">
                <ShoppingBag className="w-10 h-10 opacity-30" />
                <p className="font-prompt text-sm text-white/40">ยังไม่มีข้อมูลสินค้าขายดี</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Pending Orders — Primary focus ───────────────────── */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          {pendingOrders.length > 0 && (
            <div className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse shrink-0" />
          )}
          <h2 className="text-xl font-bold font-prompt text-white">
            รอการอนุมัติ{" "}
            <span
              className={
                pendingOrders.length > 0 ? "text-orange-400" : "text-white/30"
              }
            >
              ({pendingOrders.length})
            </span>
          </h2>
        </div>

        {pendingOrders.length === 0 ? (
          <div className="glass-card p-12 border-white/5 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-400/40 mb-4" />
            <p className="font-prompt text-white/50 text-lg">
              ไม่มีคำสั่งซื้อที่รอการอนุมัติ 🎉
            </p>
            <p className="font-prompt text-white/30 text-sm mt-1">
              ระบบจะแสดงคำสั่งซื้อใหม่โดยอัตโนมัติ
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {pendingOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isPending={true}
                approveAction={approveWithId}
                rejectAction={rejectWithId}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── All Orders History ────────────────────────────────── */}
      <section>
        <h2 className="text-xl font-bold font-prompt text-white mb-5 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
          ประวัติคำสั่งซื้อทั้งหมด{" "}
          <span className="text-white/40">({allOrders.length})</span>
        </h2>

        <div className="glass-card overflow-hidden border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-prompt text-white whitespace-nowrap">
              <thead className="bg-white/5 border-b border-white/10 text-white/50 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4 font-medium">วันที่</th>
                  <th className="px-5 py-4 font-medium">ลูกค้า</th>
                  <th className="px-5 py-4 font-medium">รายการ</th>
                  <th className="px-5 py-4 font-medium">ยอด</th>
                  <th className="px-5 py-4 font-medium text-center">สถานะ</th>
                  <th className="px-5 py-4 font-medium text-center">สลิป</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {allOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center text-white/30 font-prompt"
                    >
                      ยังไม่มีคำสั่งซื้อในระบบ
                    </td>
                  </tr>
                ) : (
                  allOrders.map((order) => {
                    const itemName =
                      order.products?.title ||
                      order.courses?.title ||
                      "ไม่ระบุ";
                    const customerName = order.customerName;
                    const dateStr = new Date(
                      order.created_at
                    ).toLocaleDateString("th-TH", {
                      day: "numeric",
                      month: "short",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-white/5 transition-colors group"
                      >
                        <td className="px-5 py-3.5 text-white/40 text-xs" suppressHydrationWarning>
                          {dateStr}
                        </td>
                        <td className="px-5 py-3.5 text-white/80 max-w-[160px] truncate">
                          {customerName}
                        </td>
                        <td className="px-5 py-3.5 font-medium max-w-[220px] truncate">
                          {itemName}
                        </td>
                        <td className="px-5 py-3.5 font-bold text-white">
                          {order.amount}
                        </td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          {order.slip_url ? (
                            <a
                              href={order.slip_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs underline-offset-2 underline"
                            >
                              <Eye className="w-3 h-3" /> ดูสลิป
                            </a>
                          ) : (
                            <span className="text-white/20 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; dot: string }> = {
    pending: {
      label: "รอตรวจสอบ",
      cls: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      dot: "bg-orange-400",
    },
    completed: {
      label: "สำเร็จ",
      cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      dot: "bg-emerald-400",
    },
    rejected: {
      label: "ปฏิเสธ",
      cls: "bg-red-500/10 text-red-400 border-red-500/20",
      dot: "bg-red-400",
    },
  };
  const entry = map[status] ?? {
    label: status,
    cls: "bg-white/10 text-white/60 border-white/20",
    dot: "bg-white/40",
  };
  return (
    <div
      className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border mx-auto ${entry.cls}`}
    >
      <div className={`w-1.5 h-1.5 rounded-full ${entry.dot}`} />
      {entry.label}
    </div>
  );
}

function OrderCard({
  order,
  isPending,
  approveAction,
  rejectAction,
}: {
  order: any;
  isPending: boolean;
  approveAction: (id: string) => Promise<{ error?: string; success?: boolean }>;
  rejectAction: (id: string) => Promise<{ error?: string; success?: boolean }>;
}) {
  const itemName =
    order.products?.title || order.courses?.title || "ไม่ระบุรายการ";
  const itemType = order.course_id ? "คอร์สเรียน" : "สินค้าดิจิทัล";
  const customerName = order.customerName;
  const dateStr = new Date(order.created_at).toLocaleString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Bind the orderId into each action so JSX doesn't need "use server" inline
  const boundApprove = approveAction.bind(null, order.id);
  const boundReject = rejectAction.bind(null, order.id);

  return (
    <div className="glass-card border-orange-500/20 overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-amber-400" />

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Slip Preview ──────────────────────────── */}
          <div className="lg:w-52 shrink-0">
            {order.slip_url ? (
              <a
                href={order.slip_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={order.slip_url}
                  alt="สลิปชำระเงิน"
                  className="w-full h-40 object-cover rounded-xl border border-white/10 group-hover:border-blue-500/50 transition-all duration-200 group-hover:scale-[1.01]"
                />
                <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 bg-blue-500 text-white text-xs font-prompt px-3 py-1.5 rounded-full font-medium shadow-lg">
                    <Eye className="w-3 h-3" /> ดูขนาดเต็ม
                  </div>
                </div>
              </a>
            ) : (
              <div className="w-full h-40 rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center text-white/30 bg-white/5">
                <Receipt className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-xs font-prompt">ไม่มีสลิป</p>
              </div>
            )}
          </div>

          {/* ── Order Details ─────────────────────────── */}
          <div className="flex-1 flex flex-col justify-between gap-5 min-w-0">
            <div>
              {/* Header row */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <span className="inline-block text-[10px] font-prompt font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 mb-2">
                    {itemType}
                  </span>
                  <h3 className="text-xl font-bold font-prompt text-white leading-tight">
                    {itemName}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/40 font-prompt">ยอดชำระ</p>
                  <p className="text-2xl font-bold text-white font-prompt">
                    {order.amount}
                  </p>
                </div>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm font-prompt">
                <span className="text-white/40">ลูกค้า:</span>
                <span className="text-white/90 font-medium">{customerName}</span>

                <span className="text-white/40">Order ID:</span>
                <span className="text-white/30 text-xs font-mono truncate">
                  {order.id}
                </span>

                <span className="text-white/40">วันที่สั่งซื้อ:</span>
                <span className="text-white/80" suppressHydrationWarning>{dateStr}</span>

                <span className="text-white/40">User ID:</span>
                <span className="text-white/30 text-xs font-mono truncate">
                  {order.user_id}
                </span>
              </div>
            </div>

            {/* ── Action Buttons ────────────────────────── */}
            {isPending && (
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                <form action={async (formData: FormData) => { "use server"; await boundApprove(); }} className="flex-1">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-prompt font-bold text-sm transition-all shadow-lg shadow-emerald-900/30 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    อนุมัติ — ปลดล็อคสินค้า
                  </button>
                </form>
                <form action={async (formData: FormData) => { "use server"; await boundReject(); }}>
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 active:scale-95 border border-red-500/20 text-red-400 hover:text-red-300 font-prompt font-bold text-sm transition-all cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" />
                    ปฏิเสธ
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

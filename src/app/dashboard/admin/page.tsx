import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  
  Clock,
  Receipt,
  Users,
  ShoppingBag,
  Eye,
  ShieldAlert,
  DollarSign,
  Trophy,
  
  Crown,
  
  
  
  } from "lucide-react";
import { approveOrder, rejectOrder } from "./actions";
import { DashboardChart } from "@/components/dashboard/DashboardChart";

export const metadata = {
  title: "Admin — Order Approvals & Customer CRM | AiAon Tech",
};

interface CustomerStat {
  userId: string;
  name: string;
  totalSpent: number;
  ordersCount: number;
  items: string[];
  lastOrderDate: string;
  isRepeatBuyer: boolean;
}

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
          หน้านี้สำหรับผู้ดูแลระบบเท่านั้น หากคิดว่าเกิดข้อผิดพลาด กรุณาติดต่อ Admin
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

  // Fetch ALL orders
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

  // Bulk-fetch profiles for all unique user_ids
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
    customerName: profileMap[o.user_id] ?? (o.user_id ? o.user_id.slice(0, 8) + "…" : "ลูกค้าทั่วไป"),
  }));

  const pendingOrders = allOrders.filter((o) => o.status === "pending");
  const completedOrders = allOrders.filter((o) => o.status === "completed");

  // Calculate Total Revenue (approved only)
  const totalRevenue = completedOrders.reduce((sum, order) => {
    const num = parseFloat((order.amount || "0").toString().replace(/[^0-9.-]+/g, ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  // ── CRM & REPEAT BUYER AGGREGATION ────────────────────────────
  const customerMap: Record<string, CustomerStat> = {};

  completedOrders.forEach((order) => {
    const uId = order.user_id || "anonymous";
    const custName = order.customerName || "ลูกค้าทั่วไป";
    const itemTitle = order.products?.title || order.courses?.title || "ระบบสำเร็จรูป";
    const num = parseFloat((order.amount || "0").toString().replace(/[^0-9.-]+/g, ""));
    const priceVal = isNaN(num) ? 0 : num;

    if (!customerMap[uId]) {
      customerMap[uId] = {
        userId: uId,
        name: custName,
        totalSpent: 0,
        ordersCount: 0,
        items: [],
        lastOrderDate: order.created_at,
        isRepeatBuyer: false,
      };
    }

    customerMap[uId].totalSpent += priceVal;
    customerMap[uId].ordersCount += 1;
    if (!customerMap[uId].items.includes(itemTitle)) {
      customerMap[uId].items.push(itemTitle);
    }
  });

  const customerList: CustomerStat[] = Object.values(customerMap).map((c) => ({
    ...c,
    isRepeatBuyer: c.ordersCount >= 2,
  })).sort((a, b) => b.totalSpent - a.totalSpent);

  const totalBuyersCount = customerList.length;
  const repeatBuyersCount = customerList.filter((c) => c.isRepeatBuyer).length;
  const repeatRate = totalBuyersCount > 0 ? Math.round((repeatBuyersCount / totalBuyersCount) * 100) : 0;

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
    const typeStr = order.course_id ? "คอร์สเรียน" : "ระบบ Google Apps Script";

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

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.2)] shrink-0">
              <Receipt className="w-7 h-7 text-cyan-400" />
            </div>
            <div>
              <h1 className="font-prompt text-3xl md:text-4xl font-extrabold text-white">
                Admin — ศูนย์ควบคุม &amp; วิเคราะห์ลูกค้า CRM
              </h1>
              <p className="text-white/50 font-prompt text-sm mt-1">
                ตรวจอนุมัติสลิป, สถิติยอดขาย, ทำเนียบลูกค้า และประวัติการซื้อซ้ำแบบ Real-time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-prompt font-semibold flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ระบบพร้อมรับออเดอร์ 24 ชม.</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── 4 Key Business Metric Cards ───────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          {
            label: "ยอดขายสะสมรวม",
            value: `฿${totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
          },
          {
            label: "ลูกค้าทั้งหมด (Total Buyers)",
            value: `${totalBuyersCount} ท่าน`,
            icon: Users,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/20",
          },
          {
            label: "ลูกค้าซื้อซ้ำ (Repeat VIP)",
            value: `${repeatBuyersCount} ท่าน (${repeatRate}%)`,
            icon: Crown,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
          },
          {
            label: "รอตรวจสลิป (Pending)",
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
            className={`glass-card p-5 flex items-center gap-4 border ${stat.border} relative overflow-hidden bg-slate-950/80 rounded-2xl`}
          >
            <div
              className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center shrink-0 shadow-md`}
            >
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className={`text-xl md:text-2xl font-black font-prompt ${stat.color} truncate`}>
                {stat.value}
              </p>
              <p className="text-xs text-white/50 font-prompt truncate">{stat.label}</p>
            </div>
            {stat.pulse && Number(stat.value) > 0 && (
              <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
            )}
          </div>
        ))}
      </div>

      {/* ── Dashboards & Best Sellers ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <DashboardChart data={chartData} />

        {/* Best Sellers */}
        <div className="glass-card p-6 border-white/10 lg:col-span-1 flex flex-col min-h-[400px] bg-slate-950/80 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-prompt text-white leading-tight">ระบบขายดีที่สุด</h3>
              <p className="text-xs text-white/50 font-prompt">Top 5 Best Sellers</p>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            {bestSellers.length > 0 ? (
              bestSellers.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 text-xs font-bold font-prompt ${idx === 0 ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400 shadow-md' :
                        idx === 1 ? 'bg-slate-300/20 border-slate-300/40 text-slate-300' :
                          idx === 2 ? 'bg-orange-700/20 border-orange-700/40 text-orange-400' :
                            'bg-white/5 border-white/10 text-white/40'
                      }`}>
                      #{idx + 1}
                    </div>
                    <div className="min-w-0 pr-2">
                      <h4 className="text-white font-prompt font-medium truncate text-sm leading-tight mb-0.5">{item.title}</h4>
                      <p className="text-[11px] text-white/40 font-prompt">{item.type} • {item.count} orders</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 group-hover:border-emerald-500/20 transition-colors">
                    <p className="text-sm font-bold text-emerald-400 font-prompt">฿{item.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-white/20 gap-3 py-10">
                <ShoppingBag className="w-10 h-10 opacity-30" />
                <p className="font-prompt text-sm text-white/40">ยังไม่มีข้อมูลสินค้าขายดี</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 🌟 NEW CRM: ทำเนียบลูกค้า & สถิติการซื้อซ้ำ (CUSTOMER CRM) ──── */}
      <section className="mb-12">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shadow-md">
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-prompt text-white flex items-center gap-2">
                <span>ทำเนียบลูกค้า &amp; สถิติการซื้อซ้ำ (Customer CRM)</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {customerList.length} ลูกค้า
                </span>
              </h2>
              <p className="text-xs text-white/50 font-prompt">
                รายชื่อผู้สั่งซื้อทั้งหมด ยอดใช้จ่ายสะสม (LTV) และสถานะลูกค้าซื้อซ้ำ
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card overflow-hidden border-white/10 bg-slate-950/80 rounded-3xl shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-prompt text-white whitespace-nowrap">
              <thead className="bg-white/5 border-b border-white/10 text-white/50 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4 font-medium">ลูกค้า / อีเมล</th>
                  <th className="px-5 py-4 font-medium text-center">สถานะความภักดี</th>
                  <th className="px-5 py-4 font-medium text-center">จำนวนระบบที่ซื้อ</th>
                  <th className="px-5 py-4 font-medium">ยอดซื้อสะสม (LTV)</th>
                  <th className="px-5 py-4 font-medium">ระบบที่ครอบครอง</th>
                  <th className="px-5 py-4 font-medium">สั่งซื้อล่าสุด</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {customerList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-white/30 font-prompt">
                      ยังไม่มีข้อมูลลูกค้าที่อนุมัติสำเร็จ (พร้อมบันทึกทันทีเมื่อมีออเดอร์แรก!)
                    </td>
                  </tr>
                ) : (
                  customerList.map((cust, cIdx) => (
                    <tr key={cIdx} className="hover:bg-white/5 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                            cust.isRepeatBuyer ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          }`}>
                            {cust.name.slice(0, 1).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">{cust.name}</p>
                            <p className="text-[11px] text-white/40 font-mono">{cust.userId.slice(0, 12)}…</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-center">
                        {cust.isRepeatBuyer ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                            <Crown className="w-3.5 h-3.5 text-amber-400" />
                            <span>👑 VIP ซื้อซ้ำ ({cust.ordersCount} ครั้ง)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-medium">
                            <span>🟢 ลูกค้าใหม่ (1 ครั้ง)</span>
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4 text-center font-bold text-white">
                        {cust.ordersCount} ระบบ
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-black text-emerald-400 text-base">
                          ฿{cust.totalSpent.toLocaleString()}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[280px]">
                          {cust.items.map((it, iIdx) => (
                            <span key={iIdx} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-white/70 truncate max-w-[200px]" title={it}>
                              {it}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-white/40 text-xs">
                        {new Date(cust.lastOrderDate).toLocaleDateString("th-TH", {
                          day: "numeric",
                          month: "short",
                          year: "2-digit"
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Pending Orders — Primary focus ───────────────────── */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          {pendingOrders.length > 0 && (
            <div className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse shrink-0" />
          )}
          <h2 className="text-xl font-bold font-prompt text-white">
            รอการอนุมัติสลิป{" "}
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
          <div className="glass-card p-12 border-white/5 flex flex-col items-center justify-center text-center bg-slate-950/80 rounded-3xl">
            <CheckCircle2 className="w-16 h-16 text-emerald-400/40 mb-4" />
            <p className="font-prompt text-white/50 text-lg">
              ไม่มีคำสั่งซื้อที่รอการอนุมัติ 🎉
            </p>
            <p className="font-prompt text-white/30 text-sm mt-1">
              ระบบจะแสดงคำสั่งซื้อใหม่และแจ้งเตือนโดยอัตโนมัติ
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {pendingOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
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

        <div className="glass-card overflow-hidden border-white/10 bg-slate-950/80 rounded-3xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-prompt text-white whitespace-nowrap">
              <thead className="bg-white/5 border-b border-white/10 text-white/50 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4 font-medium">วันที่</th>
                  <th className="px-5 py-4 font-medium">ลูกค้า</th>
                  <th className="px-5 py-4 font-medium">รายการ</th>
                  <th className="px-5 py-4 font-medium">ยอดชำระ</th>
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
                        <td className="px-5 py-3.5 font-bold text-emerald-400">
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
                              className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs underline-offset-2 underline"
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
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  order: any;
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

  return (
    <div className="glass-card border-orange-500/20 overflow-hidden bg-slate-950/90 rounded-2xl shadow-xl">
      <div className="h-1 w-full bg-linear-to-r from-orange-500 to-amber-400" />

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0 space-y-3 font-prompt">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-white/40">{dateStr}</span>
              <span className="text-white/20">•</span>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/70">
                {itemType}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white truncate">{itemName}</h3>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="text-white/50">
                ลูกค้า: <strong className="text-white">{customerName}</strong>
              </span>
              <span className="text-white/50">
                ยอดโอน: <strong className="text-emerald-400 font-bold">{order.amount}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {order.slip_url && (
              <a
                href={order.slip_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-prompt text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>ตรวจสลิป</span>
              </a>
            )}

            <form action={async () => {
              "use server";
              await rejectOrder(order.id);
            }}>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 font-prompt text-xs font-semibold transition-colors cursor-pointer"
              >
                ปฏิเสธ
              </button>
            </form>

            <form action={async () => {
              "use server";
              await approveOrder(order.id);
            }}>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-prompt text-xs font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                ✓ อนุมัติออเดอร์
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { CheckCircle2, Clock } from "lucide-react";

export function OrderHistory({ orders }: { orders: any[] }) {
    if (!orders || orders.length === 0) {
        return (
            <div className="glass-card p-8 border-white/5 bg-white/5 text-center">
                <p className="font-prompt text-white/50">ยังไม่มีประวัติการสั่งซื้อ</p>
            </div>
        )
    }

    return (
        <div className="glass-card overflow-hidden border-white/10">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-prompt text-white whitespace-nowrap">
                    <thead className="bg-white/5 border-b border-white/10 text-white/60">
                        <tr>
                            <th className="px-6 py-4 font-normal">วันที่ทำรายการ</th>
                            <th className="px-6 py-4 font-normal">รายการสินค้า</th>
                            <th className="px-6 py-4 font-normal">ยอดชำระ</th>
                            <th className="px-6 py-4 font-normal text-center">สถานะ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {orders.map((order) => {
                            // Format Date
                            const orderDate = new Date(order.created_at).toLocaleDateString('th-TH', { 
                                year: '2-digit', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                            });

                            // Name from joined tables
                            const itemName = order.products?.title || order.courses?.title || "ไม่ระบุรายการ";

                            const isCompleted = order.status === 'completed';

                            return (
                                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-white/60 text-xs" suppressHydrationWarning>{orderDate}</td>
                                    <td className="px-6 py-4 font-medium max-w-[200px] truncate">{itemName}</td>
                                    <td className="px-6 py-4 font-bold text-white">{order.amount}</td>
                                    <td className="px-6 py-4">
                                        <div className={`mx-auto flex items-center justify-center gap-1.5 px-3 py-1.5 md:w-28 rounded-full text-[11px] font-medium border ${isCompleted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                                            {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                            {isCompleted ? "สำเร็จ" : "รอตรวจสอบ"}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

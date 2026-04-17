"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

interface ChartData {
  name: string;
  revenue: number;
}

export function DashboardChart({ data = [] }: { data?: ChartData[] }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const hasData = data.length > 0 && data.some(d => d.revenue > 0);

  return (
    <motion.div 
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5, delay: 0.2 }}
       className="glass-card p-6 border-blue-500/20 col-span-1 lg:col-span-2 flex flex-col min-h-[400px]"
    >
        <h3 className="text-xl font-bold font-prompt text-white mb-2">สถิติยอดขายรวม (Verification Trends)</h3>
        <p className="text-white/50 text-sm font-prompt mb-6">กราฟแสดงรายได้รวมจากการสั่งซื้อที่ตรวจสอบแล้ว</p>
        
        <div className="flex-1 w-full min-h-[300px] flex items-center justify-center">
            {!isMounted ? null : hasData ? (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis dataKey="name" stroke="#ffffff40" tick={{ fill: '#ffffff60', fontSize: 12, fontFamily: 'Prompt' }} axisLine={false} tickLine={false} />
                        <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff60', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#000000cc', borderColor: '#ffffff20', borderRadius: '8px', color: '#fff', fontFamily: 'Prompt' }}
                            itemStyle={{ color: '#10b981' }}
                        />
                        <Area type="monotone" dataKey="revenue" name="ยอดขาย (THB)" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex flex-col items-center justify-center text-center text-white/20 gap-3">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <p className="font-prompt text-sm">ยังไม่มีข้อมูลยอดขายในระบบ</p>
                </div>
            )}
        </div>
    </motion.div>
  );
}

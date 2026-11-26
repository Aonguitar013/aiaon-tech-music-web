import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Users, Zap, BookOpen, Clock, PlayCircle, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { DbRow } from "@/types";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // 1. RBAC Check: Fetch profile and check admin status
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
    
    const isAdmin = profile?.role === 'admin' || user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    // 2. Fetch User's Purchased Courses
    // Query orders for completed course purchases and join with courses table
    const { data: userOrders } = await supabase
        .from('orders')
        .select(`
            id,
            course_id,
            courses (
                id,
                title,
                description,
                color_gradient
            )
        `)
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .not('course_id', 'is', null);

    const purchasedCourses = userOrders?.map(order => order.courses).filter(Boolean) || [];

    // 3. Brand Presence Data: Fetch Active Members count 
    const { count: activeMembers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

    // Mock social reach for now as requested
    const socialReach = "1.5K+";

    return (
        <div className="w-full">
            <h1 className="font-prompt text-3xl md:text-4xl font-bold text-[#1E293B] mb-2">ภาพรวมระบบ (Overview)</h1>
            <p className="text-slate-600 font-prompt mb-8">
                ยินดีต้อนรับกลับมา, <span className="text-blue-700">{user.email}</span>
            </p>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Stat 1: Brand Presence (Admin Only or for any user? User said 'admin role or email' previously, I'll keep the isAdmin check for now as it's a sensitive stat) */}
                {isAdmin && (
                    <div className="glass-card p-6 border-blue-500/20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors pointer-events-none"></div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-slate-600 font-prompt font-medium">ภาพลักษณ์แบรนด์ (Brand Presence)</h3>
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Users className="w-5 h-5 text-blue-700" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-[#1E293B] tracking-tight">
                            {activeMembers || 0} <span className="text-sm font-normal text-slate-500 ml-1">Members</span>
                        </div>
                        <div className="mt-2 flex items-center text-sm font-prompt text-blue-700/60">
                            <Zap className="w-4 h-4 mr-1 text-yellow-700" />
                            <span>Reach: {socialReach} Subscribers</span>
                        </div>
                    </div>
                )}

                {/* Stat 2: User's Courses */}
                <div className={`glass-card p-6 border-purple-500/20 relative overflow-hidden group ${!isAdmin ? 'md:col-span-1.5' : ''}`}>
                    <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors pointer-events-none"></div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-slate-600 font-prompt font-medium">คอร์สของฉัน</h3>
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-purple-700" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-[#1E293B] tracking-tight">{purchasedCourses.length} คอร์ส</div>
                    <div className="mt-2 flex items-center text-sm font-prompt text-slate-500">
                        คุณมีสิทธิ์เข้าถึงทั้งหมด <span className="text-purple-700 ml-1">{purchasedCourses.length}</span> รายการ
                    </div>
                </div>

                {/* Stat 3: Study Time (Visual Mock for now) */}
                <div className={`glass-card p-6 border-emerald-500/20 relative overflow-hidden group ${!isAdmin ? 'md:col-span-1.5' : ''}`}>
                    <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors pointer-events-none"></div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-slate-600 font-prompt font-medium">เวลาเรียนรวม</h3>
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-emerald-700" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-[#1E293B] tracking-tight">0 ชม.</div>
                    <div className="mt-2 flex items-center text-sm font-prompt text-slate-500">
                        <span>เริ่มการเรียนรู้ตั้งแต่วันนี้</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart placeholder: Transitioned away from Sales data */}
                <div className="lg:col-span-2 flex flex-col">
                    <div className="glass-card p-10 border-amber-200/70 flex flex-col items-center justify-center text-center gap-4 h-full relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-all pointer-events-none"></div>
                        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center relative z-10">
                            <TrendingUp className="w-8 h-8 text-blue-500 animate-pulse" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold font-prompt text-[#1E293B]">สถิติความก้าวหน้าและการเติบโต</h3>
                            <p className="text-slate-500 font-prompt text-sm max-w-xs mx-auto mt-2">
                                กำลังรวบรวมข้อมูลกิจกรรมของผู้ใช้งานและแนวโน้มการเติบโตของแบรนด์ เพื่อแสดงผลเป็นกราฟภาพรวมเร็วๆ นี้
                            </p>
                        </div>
                    </div>
                </div>

                {/* Continue Learning takes up 1 col */}
                <div className="glass-card p-6 border-amber-200/70 lg:col-span-1 flex flex-col min-h-[350px]">
                    <div className="flex items-center justify-between mb-6 shrink-0">
                        <h3 className="text-xl font-bold font-prompt text-[#1E293B]">เรียนต่อ (Continue)</h3>
                        <Link href="/dashboard/academy" className="text-sm text-blue-700 hover:text-blue-700 font-prompt transition-colors">
                            ดูทั้งหมด
                        </Link>
                    </div>

                    <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {purchasedCourses && purchasedCourses.length > 0 ? (
                            purchasedCourses.map((course: DbRow) => {
                                // Add some initial progression (default to 0 if we don't track it yet)
                                const progress = 0;
                                return (
                                    <Link key={course.id} href={`/dashboard/academy/${course.id}`} className="block p-4 rounded-xl bg-white border border-amber-200/70 hover:bg-amber-50 transition-colors group cursor-pointer">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-lg bg-linear-to-br ${course.color_gradient || 'from-blue-500 to-cyan-400'} flex items-center justify-center shrink-0`}>
                                                <PlayCircle className="w-6 h-6 text-[#1E293B] group-hover:scale-110 transition-transform" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-[#1E293B] font-prompt font-medium truncate">{course.title}</h4>
                                                <p className="text-xs text-slate-500 truncate mt-1">{course.description}</p>
                                                
                                                <div className="mt-3">
                                                    <div className="flex justify-between text-xs font-prompt text-slate-600 mb-1">
                                                        <span>ความคืบหน้า</span>
                                                        <span>{progress}%</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-[#FEF9EF] rounded-full overflow-hidden">
                                                        <div 
                                                            className="h-full bg-blue-500 rounded-full relative" 
                                                            style={{ width: `${progress}%` }}
                                                        >
                                                            <div className="absolute inset-0 bg-white blur-[2px]"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4">
                                    <BookOpen className="w-8 h-8 text-slate-500" />
                                </div>
                                <h4 className="text-[#1E293B] font-prompt font-bold mb-1">ยังไม่มีคอร์สเรียน</h4>
                                <p className="text-slate-500 font-prompt text-sm mb-6 max-w-[200px] mx-auto">
                                    คุณยังไม่ได้ลงทะเบียนในคอร์สใดๆ เริ่มต้นเรียนรู้ได้ทันทีที่ Marketplace
                                </p>
                                <Link 
                                    href="/dashboard/marketplace" 
                                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-prompt font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                                >
                                    ไปที่ Marketplace
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

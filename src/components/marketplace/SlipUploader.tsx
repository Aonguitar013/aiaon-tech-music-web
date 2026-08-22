"use client";

import { useState, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import generatePayload from "promptpay-qr";
import { createClient } from "@/utils/supabase/client";
import { Upload, CheckCircle, Smartphone, Info, Wrench, Sparkles, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SlipUploaderProps {
    itemId: string;
    itemType: "course" | "product";
    productTitle: string;
    basePriceNumber: number;
    basePriceText: string;
    vipSetupPrice: number;
    userId: string;
}

const PROMPTPAY_ID = "0835399340";

export function SlipUploader({ 
    itemId, 
    itemType, 
    productTitle, 
    basePriceNumber, 
    basePriceText, 
    vipSetupPrice, 
    userId 
}: SlipUploaderProps) {
    const [includeVipSetup, setIncludeVipSetup] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    // Compute total dynamic amount
    const totalAmount = useMemo(() => {
        return includeVipSetup ? basePriceNumber + vipSetupPrice : basePriceNumber;
    }, [includeVipSetup, basePriceNumber, vipSetupPrice]);

    // Generate PromptPay QR Payload dynamically in real-time
    const promptPayPayload = useMemo(() => {
        try {
            return generatePayload(PROMPTPAY_ID, { amount: totalAmount });
        } catch {
            return `00020101021129370016A00000067701011101130066${PROMPTPAY_ID.substring(1)}5802TH5303764540${totalAmount}5802TH6304`;
        }
    }, [totalAmount]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        
        setError(null);
        setUploading(true);
        const file = e.target.files[0];
        
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;

        try {
            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from("payment_slips")
                .upload(fileName, file, { cacheControl: '3600', upsert: false });

            if (uploadError) throw uploadError;

            // 2. Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from("payment_slips")
                .getPublicUrl(fileName);

            // 3. Create Order Record with total amount & setup note
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const orderPayload: Record<string, any> = {
                user_id: userId,
                amount: `${totalAmount} ฿` + (includeVipSetup ? " (รวมบริการ VIP Setup)" : ""),
                slip_url: publicUrl,
                status: 'pending',
            };
            if (itemType === "course") {
                orderPayload.course_id = itemId;
            } else {
                orderPayload.product_id = itemId;
            }

            const { error: insertError } = await supabase
                .from("orders")
                .insert([orderPayload]);

            if (insertError) throw insertError;

            setSuccess(true);
            setTimeout(() => {
                router.push(itemType === "course" ? "/dashboard/academy" : "/dashboard/marketplace");
            }, 5000);

        } catch (err: unknown) {
            console.error("Upload error: ", err);
            setError("เกิดข้อผิดพลาดในการอัปโหลดสลิป กรุณาลองใหม่อีกครั้ง");
        } finally {
            setUploading(false);
        }
    };

    if (success) {
        return (
            <div className="glass-card p-10 flex flex-col items-center justify-center text-center border-emerald-500/30 w-full min-h-[400px] rounded-3xl bg-slate-950/80">
                <CheckCircle className="w-20 h-20 text-emerald-400 mb-6 animate-bounce" />
                <h2 className="text-3xl font-bold font-prompt text-white mb-4">ส่งหลักฐานการชำระเงินสำเร็จ!</h2>
                <p className="text-white/70 font-prompt text-base sm:text-lg mb-6 max-w-md">
                    ขอบคุณสำหรับการสั่งซื้อ ระบบได้แจ้งเตือนครูอ้นเรียบร้อยแล้ว {includeVipSetup && "พร้อมบันทึกคำขอรับบริการติดตั้ง VIP Setup"} กรุณารอการตรวจสอบและปลดล็อกภายใน 24 ชั่วโมงครับ
                </p>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden max-w-[200px]">
                    <div className="h-full bg-emerald-500 rounded-full animate-pulse blur-[1px]"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Left QR Code area */}
            <div className="flex-1 flex flex-col items-center justify-center glass-card p-8 border-white/10 relative overflow-hidden bg-slate-950/80 rounded-3xl shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none -mr-20 -mt-20"></div>
                
                <h3 className="text-xl font-bold font-prompt text-white mb-1.5 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-cyan-400" /> สแกนจ่ายผ่าน QR Code พร้อมเพย์
                </h3>
                <p className="text-xs font-prompt text-white/50 mb-6 text-center max-w-[280px]">
                    โอนตรงเข้าพร้อมเพย์ครูอ้น (083-539-9340) ยอดเงินจะเปลี่ยนอัตโนมัติ
                </p>

                {/* QR Code Container */}
                <div className="bg-white p-4 rounded-3xl shadow-[0_0_40px_rgba(6,182,212,0.35)] relative group transition-transform hover:scale-105 duration-300">
                    <div className="absolute -inset-2 bg-linear-to-r from-cyan-500 to-blue-500 rounded-[30px] blur opacity-30 group-hover:opacity-50 transition pointer-events-none"></div>
                    <QRCodeSVG 
                        value={promptPayPayload} 
                        size={240}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"L"}
                        includeMargin={false}
                        className="rounded-xl relative z-10"
                    />
                </div>

                {/* Price Breakdown */}
                <div className="mt-8 w-full max-w-[280px] p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 font-prompt text-xs">
                    <div className="flex justify-between text-white/60">
                        <span>📦 ค่าระบบไฟล์โค้ด:</span>
                        <span>{basePriceText}</span>
                    </div>
                    {includeVipSetup && (
                        <div className="flex justify-between text-amber-300 font-semibold">
                            <span>🛠️ บริการ VIP Setup:</span>
                            <span>+{vipSetupPrice} ฿</span>
                        </div>
                    )}
                    <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                        <span className="font-bold text-white text-sm">ยอดชำระสุทธิ:</span>
                        <span className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-white to-amber-200">
                            {totalAmount} ฿
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Upload & Upsell Area */}
            <div className="flex-1 flex flex-col justify-between space-y-6">
                
                {/* ── 🌟 INTERACTIVE ORDER BUMP / VIP SETUP CHECKBOX ── */}
                {itemType === "product" && (
                    <div 
                        onClick={() => setIncludeVipSetup(!includeVipSetup)}
                        className={cn(
                            "p-5 rounded-2xl border transition-all cursor-pointer select-none relative overflow-hidden",
                            includeVipSetup 
                                ? "bg-amber-950/30 border-amber-500/60 shadow-[0_0_25px_rgba(245,158,11,0.2)]" 
                                : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                        )}
                    >
                        <div className="flex items-start gap-3.5">
                            <input 
                                type="checkbox" 
                                checked={includeVipSetup}
                                onChange={() => {}} // handled by parent div
                                className="mt-1 w-5 h-5 rounded-md accent-amber-500 cursor-pointer shrink-0"
                            />
                            <div className="space-y-1 font-prompt">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-sm text-white flex items-center gap-1.5">
                                        <Wrench className="w-4 h-4 text-amber-400" />
                                        <span>ให้ครูอ้นติดตั้งและตั้งค่าให้พร้อมใช้ (VIP Setup)</span>
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                                        +{vipSetupPrice} ฿
                                    </span>
                                </div>
                                <p className="text-xs text-white/70 leading-relaxed">
                                    ครูอ้นช่วยนำเข้ารายชื่อนักเรียน/บุคลากร ผูก Google Drive/Docs/Slides และ Deploy ส่งมอบลิงก์ Web App พร้อมใช้งานให้ทันทีใน 24 ชม.!
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Instruction Banner */}
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-4 flex items-start gap-3.5">
                    <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm font-prompt text-white/80 leading-relaxed">
                        หลังจากสแกนจ่ายยอด <strong className="text-cyan-300">{totalAmount} ฿</strong> เรียบร้อยแล้ว กรุณาอัปโหลดสลิปโอนเงินที่มี <span className="text-cyan-300 font-bold">QR Code ชัดเจน</span> เพื่อให้ระบบตรวจสอบความถูกต้องครับ
                    </p>
                </div>

                {/* Upload Box */}
                <div className="flex-1 border-2 border-dashed border-white/20 rounded-3xl flex flex-col items-center justify-center p-8 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all group relative cursor-pointer min-h-[220px]">
                    <Upload className="w-12 h-12 text-white/30 group-hover:text-cyan-400 transition-colors mb-3" />
                    <h3 className="text-base font-bold font-prompt text-white mb-1 group-hover:text-cyan-400 transition-colors">
                        คลิกเพื่ออัปโหลดสลิปโอนเงิน
                    </h3>
                    <p className="text-xs font-prompt text-white/40 text-center">
                        รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB
                    </p>
                    
                    <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                        onChange={handleFileUpload}
                        disabled={uploading}
                    />
                    
                    {uploading && (
                        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm rounded-3xl flex items-center justify-center flex-col z-20">
                           <div className="w-10 h-10 border-4 border-white/10 border-t-cyan-400 rounded-full animate-spin mb-3"></div>
                           <p className="font-prompt text-xs text-white font-medium tracking-wide">กำลังอัปโหลดหลักฐานและแจ้งเตือน...</p>
                        </div>
                    )}
                </div>
                
                {error && (
                    <p className="text-rose-400 text-xs font-prompt text-center">{error}</p>
                )}

                <div className="flex items-center justify-center gap-2 text-white/40 text-xs font-prompt">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>ข้อมูลปลอดภัย 100% • ตรวจสอบสลิปผ่านระบบ PromptPay</span>
                </div>
            </div>
        </div>
    );
}

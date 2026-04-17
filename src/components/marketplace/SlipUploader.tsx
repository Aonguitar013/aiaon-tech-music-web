"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { createClient } from "@/utils/supabase/client";
import { Upload, CheckCircle, Smartphone, Info } from "lucide-react";
import { useRouter } from "next/navigation";

interface SlipUploaderProps {
    itemId: string;
    itemType: "course" | "product";
    productTitle: string;
    productPrice: string; 
    promptPayPayload: string;
    userId: string;
}

export function SlipUploader({ itemId, itemType, productPrice, promptPayPayload, productTitle, userId }: SlipUploaderProps) {


    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        
        setError(null);
        setUploading(true);
        const file = e.target.files[0];
        
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;

        try {
            // 1. Upload to Storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from("payment_slips")
                .upload(fileName, file, { cacheControl: '3600', upsert: false });

            if (uploadError) throw uploadError;

            // 2. Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from("payment_slips")
                .getPublicUrl(fileName);

            // 3. Create Order Record — write to the correct column based on item type
            const orderPayload: Record<string, any> = {
                user_id: userId,
                amount: productPrice,
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

            // 4. Admin Notification Hook
            console.log(`[ADMIN NOTIFICATION] 🌟 New Order! User ${userId} paid for ${itemType}: "${productTitle}" (ID: ${itemId}). Slip: ${publicUrl}`);

            setSuccess(true);
            setTimeout(() => {
                router.push(itemType === "course" ? "/dashboard/academy" : "/dashboard/marketplace");
            }, 5000);

        } catch (err: any) {
            console.error("Upload error: ", err);
            setError("เกิดข้อผิดพลาดในการอัปโหลดสลิป กรุณาลองใหม่อีกครั้ง");
        } finally {
            setUploading(false);
        }
    };

    if (success) {
        return (
            <div className="glass-card p-10 flex flex-col items-center justify-center text-center border-emerald-500/30 w-full min-h-[400px]">
                <CheckCircle className="w-20 h-20 text-emerald-400 mb-6" />
                <h2 className="text-3xl font-bold font-prompt text-white mb-4">ส่งหลักฐานสำเร็จ!</h2>
                <p className="text-white/70 font-prompt text-lg mb-8 max-w-md">
                    ขอบคุณสำหรับการสั่งซื้อ เราได้ทำการแจ้งเตือนผู้ดูแลระบบเรียบร้อยแล้ว กรุณารอการตรวจสอบและอนุมัติภายใน 24 ชั่วโมง
                </p>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden max-w-[200px]">
                    <div className="h-full bg-emerald-500 rounded-full animate-pulse blur-[1px]"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
            {/* Left QR Code area */}
            <div className="flex-1 flex flex-col items-center justify-center glass-card p-8 border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full pointer-events-none -mr-20 -mt-20"></div>
                
                <h3 className="text-xl font-bold font-prompt text-white mb-2 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-blue-400" /> สแกนจ่ายผ่าน QR Code
                </h3>
                <p className="text-sm font-prompt text-white/50 mb-8 text-center max-w-[250px]">
                    โอนเงินด้วยพร้อมเพย์ได้ทุกธนาคาร เพื่อความสะดวกรวดเร็ว
                </p>

                <div className="bg-white p-4 rounded-3xl shadow-[0_0_40px_rgba(59,130,246,0.3)] relative group cursor-pointer transition-transform hover:scale-105 duration-300">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[30px] blur opacity-30 group-hover:opacity-50 transition opacity pointer-events-none"></div>
                    <QRCodeSVG 
                        value={promptPayPayload} 
                        size={250}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"L"}
                        includeMargin={false}
                        className="rounded-xl relative z-10"
                    />
                </div>

                <div className="mt-10 text-center">
                    <p className="text-sm font-prompt text-white/50 mb-1">ยอดชำระเงินรวม</p>
                    <p className="text-3xl font-bold font-prompt text-white text-emerald-400">{productPrice}</p>
                </div>
            </div>

            {/* Right Upload Area */}
            <div className="flex-1 flex flex-col pt-4">
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5 flex items-start gap-4 mb-8">
                    <Info className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-sm font-prompt text-white/80 leading-relaxed">
                        หลังจากสแกนจ่ายเรียบร้อยแล้ว กรุณาอัปโหลดสลิปโอนเงินที่มี <span className="text-blue-400 font-bold">คิวอาร์โค้ด</span> และวันที่เวลาชัดเจน เพื่อให้ระบบตรวจสอบความถูกต้องนะคะ
                    </p>
                </div>

                <div className="flex-1 border-2 border-dashed border-white/20 rounded-3xl flex flex-col items-center justify-center p-10 hover:border-blue-400/50 hover:bg-blue-500/5 transition-all group relative cursor-pointer min-h-[300px]">
                    <Upload className="w-16 h-16 text-white/20 group-hover:text-blue-400 transition-colors mb-4" />
                    <h3 className="text-xl font-bold font-prompt text-white mb-2 group-hover:text-blue-400 transition-colors">คลิกเพื่ออัปโหลดสลิปโอนเงิน</h3>
                    <p className="text-sm font-prompt text-white/40 text-center max-w-[250px]">
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
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-[22px] flex items-center justify-center flex-col z-20">
                           <div className="w-12 h-12 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                           <p className="font-prompt text-sm text-white font-medium tracking-wide">กำลังอัปโหลดหลักฐานและแจ้งเตือน...</p>
                        </div>
                    )}
                </div>
                
                {error && (
                    <p className="text-red-400 text-sm font-prompt mt-4 text-center">{error}</p>
                )}
            </div>
        </div>
    )
}

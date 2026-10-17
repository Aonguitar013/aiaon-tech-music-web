"use client";

import { useState, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import generatePayload from "promptpay-qr";
import { createClient } from "@/utils/supabase/client";
import { Upload, CheckCircle, Smartphone, Info, Wrench, ShieldCheck, MessageSquare, ArrowRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getLineOrderUrl } from "@/lib/line";

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
    const [aiApproved, setAiApproved] = useState(false);
    const [signedDeliveryUrl, setSignedDeliveryUrl] = useState<string | null>(null);
    const [backupOneDriveUrl, setBackupOneDriveUrl] = useState<string | null>(null);
    const [unlockedCodes, setUnlockedCodes] = useState<string[]>([]);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
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

    const lineSetupMessage = useMemo(() => {
        return `สวัสดีครับครูอ้น ผมสั่งซื้อระบบ "${productTitle}" (ยอด ${totalAmount} ฿) ${includeVipSetup ? "พร้อมเลือกบริการ VIP Setup ให้ครูอ้นติดตั้งให้" : ""} เรียบร้อยแล้วครับ นี่คือข้อมูลสำหรับขึ้นระบบครับ:`;
    }, [productTitle, totalAmount, includeVipSetup]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        
        setError(null);
        setStatusMessage(null);
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

            const { data: insertedOrder, error: insertError } = await supabase
                .from("orders")
                .insert([orderPayload])
                .select()
                .single();

            if (insertError) throw insertError;

            // 4. Trigger 5-Layer Server-Side Slip Verification
            let isAiVerified = false;
            try {
                const verifyRes = await fetch("/api/checkout/verify-slip", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        orderId: insertedOrder?.id,
                        slipUrl: publicUrl,
                        expectedAmount: totalAmount
                    })
                });
                const verifyData = await verifyRes.json().catch(() => ({}));

                if (
                    !verifyRes.ok ||
                    verifyData.status === "rejected" ||
                    verifyData.status === "payment_qr" ||
                    verifyData.status === "not_a_slip"
                ) {
                    setError(
                        verifyData.error ||
                        verifyData.message ||
                        "ไม่ผ่านการตรวจสอบสลิป กรุณาตรวจสอบยอดโอนและอัปโหลดภาพสลิปฉบับเต็มที่มี QR Code ชัดเจนอีกครั้งครับ"
                    );
                    return;
                }

                if (verifyData.verified) {
                    isAiVerified = true;
                    if (verifyData.deliveryUrl) {
                        setSignedDeliveryUrl(verifyData.deliveryUrl);
                    }
                    if (verifyData.extraOneDriveLink) {
                        setBackupOneDriveUrl(verifyData.extraOneDriveLink);
                    }
                    if (Array.isArray(verifyData.unlockedCodes)) {
                        setUnlockedCodes(verifyData.unlockedCodes);
                    }
                } else if (verifyData.message) {
                    setStatusMessage(verifyData.message);
                }
            } catch (vErr) {
                console.warn("AI Verification call failed, fallback to manual approval:", vErr);
            }

            // 5. Admin Notification Hook
            console.log(`[ADMIN NOTIFICATION] 🌟 New Order! User ${userId} paid for ${itemType}: "${productTitle}" (ID: ${itemId}). Slip: ${publicUrl}, AI Verified: ${isAiVerified}`);

            setAiApproved(isAiVerified);
            setSuccess(true);

        } catch (err: unknown) {
            console.error("Upload error: ", err);
            setError("เกิดข้อผิดพลาดในการอัปโหลดสลิป กรุณาลองใหม่อีกครั้ง");
        } finally {
            setUploading(false);
        }
    };

    const PRODUCT_DOWNLOAD_LINKS: Record<string, string> = {
        'AONE02': 'https://1drv.ms/f/c/ce3ad5ba004eb0c7/IgATR6et6O-BS61MuoKMqj_GAYU-TtWQfIJanJqGekSkGbk?e=AaoHOh',
        'AONA07': 'https://1drv.ms/f/c/ce3ad5ba004eb0c7/IgDJlCMMPrrsT41Ts0p0_mG3ARQDzg2jFhgxYKp8p5n6gNA?e=X8Nj74',
        'AONE12': 'https://1drv.ms/f/c/ce3ad5ba004eb0c7/IgD_Jr6rfSsxSpAKzMlvYwa0AUZTGXnV_mi0Q5WW4ra9jKI?e=6afyzo',
    };
    const matchedDownloadUrl = Object.entries(PRODUCT_DOWNLOAD_LINKS).find(([k]) => productTitle.includes(k))?.[1];
    const directDownloadUrl = signedDeliveryUrl || matchedDownloadUrl || (itemType === "course" ? `/dashboard/academy/${itemId}` : `/dashboard/marketplace/${itemId}`);
    const secondaryOneDriveUrl = backupOneDriveUrl || matchedDownloadUrl || null;

    if (success) {
        return (
            <div className="glass-card p-8 sm:p-12 flex flex-col items-center justify-center text-center border-emerald-500/30 w-full min-h-[450px] rounded-3xl bg-slate-950/90 shadow-2xl space-y-6">
                <CheckCircle className="w-20 h-20 text-emerald-400 animate-bounce" />
                
                <div className="space-y-2">
                    <h2 className="text-3xl sm:text-4xl font-extrabold font-prompt text-white">
                        {aiApproved ? "⚡ ตรวจสอบสลิป 5 ชั้นสำเร็จ! อนุมัติทันที" : "ส่งหลักฐานการชำระเงินสำเร็จ!"}
                    </h2>
                    <p className="text-white/80 font-prompt text-sm sm:text-base max-w-lg mx-auto leading-relaxed whitespace-pre-line">
                        {aiApproved ? (
                            <>ระบบ AI & Mini-QR ตรวจสอบยอดเงิน <strong className="text-emerald-400">{totalAmount} ฿</strong> และบัญชีถูกต้องเรียบร้อยแล้ว ปลดล็อกสิทธิ์การดาวน์โหลด <span className="text-emerald-400 font-bold">{productTitle}</span> ให้คุณทันที!</>
                        ) : statusMessage ? (
                            statusMessage
                        ) : (
                            <>ขอบคุณสำหรับการสั่งซื้อ ระบบได้บันทึกคำสั่งซื้อยอด <strong className="text-emerald-400">{totalAmount} ฿</strong> เรียบร้อยแล้ว กรุณารอการตรวจสอบและอนุมัติภายใน 24 ชั่วโมง</>
                        )}
                    </p>
                </div>

                {/* Instant Encrypted ZIP Download Box when AI Approved */}
                {aiApproved && (
                    <div className="w-full max-w-lg space-y-3 pt-2">
                        <a
                            href={directDownloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 px-6 rounded-2xl bg-linear-to-r from-emerald-400 via-teal-400 to-emerald-300 hover:from-emerald-300 hover:to-teal-200 text-zinc-950 font-prompt font-extrabold text-base flex items-center justify-center gap-2 shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all hover:scale-102 cursor-pointer"
                        >
                            <Download className="w-5 h-5" />
                            <span>
                                📥 ดาวน์โหลดชุดไฟล์ติดตั้งทันที ({unlockedCodes.length > 0 ? `${unlockedCodes.join(", ")}.ZIP` : ".ZIP"})
                            </span>
                        </a>
                        {secondaryOneDriveUrl && secondaryOneDriveUrl !== directDownloadUrl && (
                            <a
                                href={secondaryOneDriveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-prompt text-xs font-semibold transition-all"
                            >
                                <span>☁️ ลิงก์สำรอง OneDrive</span>
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        )}
                        <Link
                            href={itemType === "course" ? `/dashboard/academy/${itemId}` : `/dashboard/marketplace/${itemId}`}
                            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-prompt text-xs font-semibold transition-all"
                        >
                            <span>หน้ารายละเอียดและคู่มือ</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}

                {/* VIP Setup Action Box */}
                {includeVipSetup && (
                    <div className="w-full max-w-lg p-6 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-left space-y-4 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-amber-500 text-zinc-950 text-xs font-prompt font-black uppercase">
                                👑 บริการ VIP SETUP
                            </span>
                            <span className="text-xs text-amber-300 font-prompt">ขั้นตอนถัดไปสำหรับคุณ:</span>
                        </div>
                        <p className="text-xs sm:text-sm text-white/80 font-prompt leading-relaxed">
                            กรุณากดปุ่มด้านล่างเพื่อส่ง <strong>อีเมล Gmail</strong> และ <strong>ไฟล์รายชื่อนักเรียน/บุคลากร</strong> ให้ครูอ้นใน LINE OA เพื่อเริ่มขึ้นระบบให้ทันทีครับ!
                        </p>
                        
                        <a
                            href={getLineOrderUrl(lineSetupMessage)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-prompt font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-102 cursor-pointer"
                        >
                            <MessageSquare className="w-5 h-5 fill-white text-white" />
                            <span>📲 ส่งรายชื่อ &amp; Gmail ให้ครูอ้นใน LINE OA ทันที</span>
                        </a>
                    </div>
                )}

                {!aiApproved && !includeVipSetup && (
                    <div className="space-y-3">
                        <p className="text-xs text-white/50 font-prompt">
                            แอดมินจะทำการตรวจสอบสลิปและปลดล็อกปุ่มดาวน์โหลดในคลังสินค้าของคุณโดยเร็วที่สุดครับ
                        </p>
                        <Link
                            href="/dashboard/marketplace"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-prompt text-xs font-semibold transition-all"
                        >
                            <span>กลับสู่หน้าคลังสินค้า</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}
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
                <p className="text-xs font-prompt text-white/60 mb-6 text-center max-w-[280px]">
                    ชื่อบัญชี: <strong className="text-white">นายจิรวัฒน์ เดชเส้ง</strong> (083-539-9340)
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

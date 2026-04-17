"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Camera, Save, User as UserIcon } from "lucide-react";
import Image from "next/image";

export function ProfileManager({ user, initialProfile }: { user: any, initialProfile: any }) {
    const supabase = createClient();
    const [displayName, setDisplayName] = useState(initialProfile?.display_name || "");
    const [avatarUrl, setAvatarUrl] = useState(initialProfile?.avatar_url || "");
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            if (!e.target.files || e.target.files.length === 0) return;
            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Math.random().toString(36).substring(7)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(fileName, file, { upsert: true });

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
            setAvatarUrl(data.publicUrl);
            
            // Auto save to profile
            await supabase.from('profiles').update({ avatar_url: data.publicUrl }).eq('id', user.id);

        } catch (error) {
            console.error("Error uploading avatar:", error);
            alert("เกิดข้อผิดพลาดในการอัปโหลดรูปโปรไฟล์");
        } finally {
            setUploading(false);
        }
    };

    const saveProfile = async () => {
        try {
            setSaving(true);
            const { error } = await supabase.from('profiles')
                .update({ display_name: displayName })
                .eq('id', user.id);

            if (error) throw error;
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden border-white/10 group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full pointer-events-none -mr-20 -mt-20"></div>

             {/* Avatar Area */}
             <div className="relative shrink-0">
                 <div className="w-32 h-32 rounded-full border-4 border-white/5 bg-black/50 flex items-center justify-center overflow-hidden relative shadow-2xl">
                     {avatarUrl ? (
                         <Image src={avatarUrl} alt="Avatar" fill sizes="128px" className="object-cover" />
                     ) : (
                         <UserIcon className="w-16 h-16 text-white/20" />
                     )}
                     
                     {uploading && (
                         <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                             <div className="w-6 h-6 border-2 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
                         </div>
                     )}
                 </div>
                 
                 <label className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-full flex items-center justify-center text-white shadow-lg border-2 border-black transition-colors">
                     <Camera className="w-5 h-5" />
                     <input type="file" className="hidden" accept="image/*" onChange={uploadAvatar} disabled={uploading} />
                 </label>
             </div>

             {/* Form Area */}
             <div className="flex-1 w-full flex flex-col gap-4">
                 <div>
                     <label className="text-sm font-prompt text-white/50 mb-1 block">อีเมล (Email)</label>
                     <input 
                         type="text" 
                         value={user.email} 
                         disabled 
                         className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/50 font-prompt cursor-not-allowed"
                     />
                 </div>
                 
                 <div>
                     <label className="text-sm font-prompt text-white/50 mb-1 block">ชื่อที่แสดงผล (Display Name)</label>
                     <input 
                         type="text" 
                         value={displayName}
                         onChange={(e) => setDisplayName(e.target.value)}
                         placeholder="New Scholar"
                         className="w-full bg-black/40 border border-white/20 focus:border-blue-500 outline-none rounded-xl px-4 py-3 text-white font-prompt transition-colors"
                     />
                 </div>

                 <button 
                     onClick={saveProfile}
                     disabled={saving}
                     className="mt-2 w-full md:w-auto self-start bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-prompt font-medium transition-colors flex items-center justify-center gap-2"
                 >
                     <Save className="w-4 h-4" />
                     {saving ? "กำลังบันทึก..." : "บันทึกโปรไฟล์"}
                 </button>
             </div>
        </div>
    )
}

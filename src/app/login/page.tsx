"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { login, signup } from "./actions";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { PillarThemeWrapper } from "@/components/layout/PillarThemeWrapper";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);

    // Server action call
    const result = isLogin ? await login(formData) : await signup(formData);

    if (result && result.error) {
      setErrorMsg(result.error);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <PillarThemeWrapper pillar="about">
      <div className="min-h-[82vh] py-16 px-4 flex items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white border border-[#E2E8F0] rounded-3xl p-8 md:p-10 shadow-sm relative z-10"
        >
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <svg aria-hidden="true" width="32" height="26" viewBox="0 0 64 52" className="shrink-0">
                <circle cx="15" cy="8" r="6" fill="#22D3EE" />
                <path d="M10 19h13L10 49H0zm6 30L36 5q5-7 10 0l18 44H50L40 24 29 49z" fill="#2563EB" />
                <path d="M34 36h13l6 13H43z" fill="#0EA5E9" />
              </svg>
              <span className="font-prompt text-xl font-bold tracking-tight text-[#0F172A]">
                AiAon <span className="text-[#2563EB]">Tech</span>
              </span>
            </Link>
            <h1 className="font-prompt text-2xl md:text-3xl font-bold text-[#0F172A] mb-2">
              {isLogin ? "ยินดีต้อนรับกลับมา" : "สร้างบัญชีใหม่"}
            </h1>
            <p className="text-[#475569] text-sm font-prompt">
              {isLogin
                ? "เข้าสู่ระบบเพื่อเข้าสู่ Dashboard ของคุณ"
                : "เข้าร่วมชุมชนนักสร้างสรรค์เทคโนโลยีการศึกษา"}
            </p>
          </div>

          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-sm mb-6 font-prompt text-center font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-[#64748B]" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  required
                  className="w-full bg-[#FAF8F5] border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all font-prompt text-sm"
                  placeholder="ชื่อ-นามสกุล"
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-[#64748B]" />
              </div>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-[#FAF8F5] border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all font-prompt text-sm"
                placeholder="อีเมลของคุณ"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-[#64748B]" />
              </div>
              <input
                type="password"
                name="password"
                required
                className="w-full bg-[#FAF8F5] border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all font-prompt text-sm"
                placeholder="รหัสผ่าน"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-prompt font-semibold py-3 rounded-xl transition-colors flex justify-center items-center gap-2 group disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {loading ? "กำลังดำเนินการ..." : isLogin ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-7 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E2E8F0]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-[#64748B] font-prompt">หรือใช้งานผ่าน</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="mt-5 w-full bg-white hover:bg-[#FAF8F5] border border-[#E2E8F0] text-[#0F172A] font-prompt font-semibold py-3 rounded-xl transition-colors flex justify-center items-center gap-3 cursor-pointer shadow-2xs"
          >
            <FcGoogle className="w-5 h-5" /> Google (OAuth)
          </button>

          <p className="mt-7 text-center text-[#475569] text-sm font-prompt">
            {isLogin ? "ยังไม่มีบัญชีใช่ไหม? " : "มีบัญชีอยู่แล้วใช่ไหม? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              type="button"
              className="text-[#2563EB] hover:text-[#1D4ED8] font-semibold underline underline-offset-4 cursor-pointer"
            >
              {isLogin ? "สมัครเลยที่นี่" : "เข้าสู่ระบบ"}
            </button>
          </p>
        </motion.div>
      </div>
    </PillarThemeWrapper>
  );
}

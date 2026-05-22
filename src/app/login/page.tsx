"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { login, signup } from "./actions";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

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
    // Prepared for Google OAuth
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
  };

  return (
    <div className="min-h-screen py-24 px-4 flex items-center justify-center relative overflow-hidden bg-black">
      {/* Ambient background glow matching Landing Page */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card w-full max-w-md p-8 md:p-10 relative z-10 overflow-hidden"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6">
            <h2 className="font-prompt text-xl font-normal tracking-widest text-white uppercase flex justify-center items-center gap-1">
              iAonTech<span className="text-blue-500">xMusic</span>
            </h2>
          </Link>
          <h1 className="font-prompt text-2xl md:text-3xl font-bold text-white mb-2">
            {isLogin ? "ยินดีต้อนรับกลับมา" : "สร้างบัญชีใหม่"}
          </h1>
          <p className="text-white/50 text-sm font-prompt">
            {isLogin ? "เข้าสู่ระบบเพื่อเข้าสู่ Dashboard ของคุณ" : "เข้าร่วมชุมชนนักสร้างสรรค์เทคโนโลยีการศึกษา"}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-6 font-prompt text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-white/40" />
              </div>
              <input
                type="text"
                name="fullName"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all font-prompt text-sm"
                placeholder="ชื่อ-นามสกุล"
              />
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-white/40" />
            </div>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all font-prompt text-sm"
              placeholder="อีเมลของคุณ"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-white/40" />
            </div>
            <input
              type="password"
              name="password"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all font-prompt text-sm"
              placeholder="รหัสผ่าน"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-prompt font-medium py-3 rounded-xl transition-colors flex justify-center items-center gap-2 group disabled:opacity-50"
          >
            {loading ? "กำลังดำเนินการ..." : (isLogin ? "เข้าสู่ระบบ" : "สมัครสมาชิก")}
            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black/40 backdrop-blur-md text-white/50 font-prompt">หรือใช้งานผ่าน</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="mt-6 w-full glass-card hover:bg-white/10 text-white font-prompt font-medium py-3 rounded-xl transition-colors flex justify-center items-center gap-3"
        >
          <FcGoogle className="w-5 h-5" /> Google (OAuth)
        </button>

        <p className="mt-8 text-center text-white/50 text-sm font-prompt">
          {isLogin ? "ยังไม่มีบัญชีใช่ไหม? " : "มีบัญชีอยู่แล้วใช่ไหม? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            type="button"
            className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4"
          >
            {isLogin ? "สมัครเลยที่นี่" : "เข้าสู่ระบบ"}
          </button>
        </p>

      </motion.div>
    </div>
  );
}

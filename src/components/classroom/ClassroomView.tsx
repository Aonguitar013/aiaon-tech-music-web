"use client";

import { useState } from "react";

interface System {
  id: string;
  name: string;
  url: string;
}

const SYSTEMS: System[] = [
  {
    id: "system-1",
    name: "ระบบบันทึกผล & เช็คชื่อ (ระบบที่ 1)",
    url: "https://script.google.com/macros/s/AKfycbz6zs6inUtTP4YMgsLYmvV1UfgOLCPCv-Q3qDa3dTcHCrSueCtuO4_j639_w89CTz6-/exec",
  },
  {
    id: "system-2",
    name: "ระบบบริหารจัดการชั้นเรียน (ระบบที่ 2)",
    url: "https://script.google.com/macros/s/AKfycbyonaTx1at--25F23MjiPqJds4eTJR6_sLVtDNWxB3FyzoWlS_VChQ7QNqNvDW_WZCP/exec",
  },
  {
    id: "system-3",
    name: "ระบบบันทึกการลา (ระบบที่ 3)",
    url: "https://script.google.com/macros/s/AKfycbz4l5MvvRnesy9pslL3f3dzn5BJLq7yUqo8uztva7S8L0mxPEy4F9gXV85vxZ3xQub9/exec?page=leave",
  }
];

export function ClassroomView() {
  const [activeTab, setActiveTab] = useState<string>("system-1");
  const activeSystem = SYSTEMS.find((s) => s.id === activeTab) || SYSTEMS[0];

  return (
    <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-8 font-prompt">
      {/* Header section */}
      <div className="space-y-4 mb-8 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-500/20 px-3 py-1 rounded-full">
              Classroom Management System
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-3 font-prompt">
              ระบบบริหาร<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.2)]">จัดการชั้นเรียน</span>
            </h1>
            <p className="text-white/40 text-sm max-w-2xl font-light font-prompt">
              จัดการบันทึกข้อมูล เช็คชื่อ และบริหารชั้นเรียนผ่านระบบ Web Application ที่มีประสิทธิภาพสูง
            </p>
          </div>

          <div className="flex justify-center md:justify-end shrink-0">
            <a
              href={activeSystem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.3)] font-prompt"
            >
              🚀 เปิดในหน้าต่างใหม่ (Open Fullscreen)
            </a>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-white/10 mb-6 gap-2 overflow-x-auto scrollbar-none pb-1">
        {SYSTEMS.map((system) => (
          <button
            key={system.id}
            onClick={() => setActiveTab(system.id)}
            className={`px-5 py-3 font-medium text-sm transition-all duration-200 border-b-2 font-prompt whitespace-nowrap ${
              activeTab === system.id
                ? "border-cyan-400 text-cyan-400 shadow-[0_4px_12px_rgba(34,211,238,0.1)] bg-cyan-400/5 rounded-t-lg"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            {system.name}
          </button>
        ))}
      </div>

      {/* Info Notice & Troubleshooting Panel */}
      <div className="mb-6 p-5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-3 font-prompt">
        <div className="text-cyan-400 text-xs flex items-center gap-2 font-medium">
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse shrink-0"></span>
          <span>ขณะนี้ระบบแสดงผล: <strong>{activeSystem.name}</strong> เชื่อมต่อข้อมูลโดยตรงกับคลาวด์ Google Sheets</span>
        </div>
        
        <div className="text-white/40 text-[11px] leading-relaxed border-t border-white/5 pt-2.5">
          <p className="font-semibold text-white/60 mb-1">💡 หากหน้าจอไม่แสดงผล หรือขึ้นสัญลักษณ์ห้ามเข้า (Refused to connect):</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>
              <strong>สาเหตุหลัก:</strong> เกิดจากความปลอดภัยของ Google (X-Frame-Options) หรือเนื่องจากเบราว์เซอร์ของคุณมีการล็อกอินบัญชี Google หลายบัญชีพร้อมกัน (Multi-login) ทำให้ Google บล็อกการแสดงผลใน iframe
            </li>
            <li>
              <strong>วิธีแก้ไขที่ 1:</strong> คลิกปุ่ม <strong>"เปิดในหน้าต่างใหม่"</strong> ด้านบนเพื่อใช้งานโดยตรง (แนะนำ ใช้งานได้ 100%)
            </li>
            <li>
              <strong>วิธีแก้ไขที่ 2:</strong> สำหรับผู้พัฒนาสคริปต์ ให้ใส่โค้ด <code>.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)</code> ในฟังก์ชัน <code>doGet()</code> ของ Apps Script แล้วสั่ง Deploy เวอร์ชันใหม่
            </li>
          </ul>
        </div>
      </div>

      {/* Premium iframe wrapper with cyan glow border */}
      <div className="glass-card p-1 md:p-2 bg-black/60 border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.1)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_55px_rgba(6,182,212,0.18)]">
        <div className="relative w-full rounded-xl overflow-hidden border border-white/5 bg-[#060913]">
          <iframe
            src={activeSystem.url}
            width="100%"
            className="w-full min-h-[750px] sm:min-h-[850px] border-0"
            scrolling="yes"
            allow="geolocation; microphone; camera"
            title={activeSystem.name}
          />
        </div>
      </div>
      
      {/* Decorative Brand Footer */}
      <div className="mt-8 text-center text-white/30 text-xs font-prompt">
        <p>iAonTechxMusic Ecosystem · Powered by Google Apps Script</p>
      </div>
    </div>
  );
}

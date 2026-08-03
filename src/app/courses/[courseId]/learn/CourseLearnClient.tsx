'use client';

import React, { useState } from 'react';
import { CourseVideoPlayer } from '@/components/CourseVideoPlayer';
import { LessonSidebar, Lesson } from '@/components/LessonSidebar';
import { ChevronLeft, Lock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import generatePayload from 'promptpay-qr';
import { useRouter } from 'next/navigation';

interface Course {
  id: string;
  title: string;
  price: string;
  is_premium: boolean;
}

interface CourseLearnClientProps {
  course: Course;
  lessons: Lesson[];
  isCoursePurchased: boolean;
  completedLessonIds: string[];
  initialLessonId?: string;
  userId?: string;
}

export function CourseLearnClient({
  course,
  lessons,
  isCoursePurchased,
  completedLessonIds: initialCompleted,
  initialLessonId,
  userId
}: CourseLearnClientProps) {
  const router = useRouter();
  const [currentLessonId, setCurrentLessonId] = useState<string | undefined>(
    initialLessonId || lessons[0]?.id
  );
  
  // Minimal state for demonstration (in real app, use Supabase mutations)
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(initialCompleted);

  const currentLesson = lessons.find(l => l.id === currentLessonId);
  const isLocked = currentLesson && !isCoursePurchased && !currentLesson.is_free_preview;

  // Configuration for PromptPay
  const PROMPTPAY_ID = '0123456789'; // Replace with real PromptPay ID or Phone Number
  const amountStr = course.price.replace(/[^0-9.]/g, '');
  const amount = parseFloat(amountStr) || 0;
  const qrPayload = generatePayload(PROMPTPAY_ID, { amount });

  return (
    <div className="min-h-screen bg-[#090D16] text-white flex flex-col md:flex-row overflow-hidden font-prompt">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen md:h-auto overflow-y-auto custom-scrollbar relative">
        {/* Header */}
        <header className="p-4 md:p-6 flex items-center justify-between border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10"
            >
              <ChevronLeft className="w-5 h-5 text-gray-300" />
            </button>
            <div>
              <h1 className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                {course.title}
              </h1>
              {currentLesson && (
                <p className="text-sm text-gray-400">{currentLesson.module_name} &bull; {currentLesson.title}</p>
              )}
            </div>
          </div>
        </header>

        {/* Player Section */}
        <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full relative">
          {currentLesson ? (
            <div className="space-y-6">
              <div className="relative">
                <CourseVideoPlayer videoUrl={currentLesson.video_url} />
                
                {/* Locked Overlay */}
                {isLocked && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded-xl border border-white/10 p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">เนื้อหาสงวนสิทธิ์เฉพาะผู้เรียน</h2>
                    <p className="text-gray-300 mb-6 max-w-md">
                      กรุณาเข้าสู่ระบบ หรือ สมัครคอร์สเพื่อปลดล็อกบทเรียนนี้
                    </p>
                    
                    {!userId ? (
                      <button 
                        onClick={() => router.push('/login')} // adjust to actual login path
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg font-semibold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] border border-white/20"
                      >
                        เข้าสู่ระบบ
                      </button>
                    ) : (
                      <div className="bg-white p-6 rounded-2xl flex flex-col items-center">
                        <QRCodeSVG value={qrPayload} size={150} />
                        <p className="text-[#090D16] font-bold mt-4 mb-1">สแกนชำระเงิน {course.price}</p>
                        <p className="text-sm text-gray-600 mb-4">PromptPay: {PROMPTPAY_ID}</p>
                        <button className="px-6 py-2 bg-[#090D16] text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
                          แจ้งโอนเงิน
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{currentLesson.title}</h2>
                <p className="text-gray-400 whitespace-pre-wrap">{currentLesson.description}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p>ไม่พบบทเรียน</p>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <LessonSidebar
        lessons={lessons}
        currentLessonId={currentLessonId}
        isCoursePurchased={isCoursePurchased}
        completedLessonIds={completedLessonIds}
        onLessonSelect={(id) => setCurrentLessonId(id)}
      />
    </div>
  );
}

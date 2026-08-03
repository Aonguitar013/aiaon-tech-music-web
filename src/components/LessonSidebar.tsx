'use client';

import React, { useMemo } from 'react';
import { PlayCircle, Lock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // assuming standard shadcn/tailwind utils

export interface Lesson {
  id: string;
  title: string;
  module_name: string;
  lesson_order: number;
  duration_seconds: number;
  is_free_preview: boolean;
}

interface LessonSidebarProps {
  lessons: Lesson[];
  currentLessonId?: string;
  isCoursePurchased: boolean;
  completedLessonIds: string[];
  onLessonSelect: (lessonId: string) => void;
}

export function LessonSidebar({
  lessons,
  currentLessonId,
  isCoursePurchased,
  completedLessonIds,
  onLessonSelect
}: LessonSidebarProps) {

  // Group lessons by module_name
  const groupedLessons = useMemo(() => {
    const map = new Map<string, Lesson[]>();
    // Sort lessons first
    const sorted = [...lessons].sort((a, b) => a.lesson_order - b.lesson_order);
    
    sorted.forEach(lesson => {
      if (!map.has(lesson.module_name)) {
        map.set(lesson.module_name, []);
      }
      map.get(lesson.module_name)!.push(lesson);
    });
    
    return Array.from(map.entries()).map(([moduleName, moduleLessons]) => ({
      moduleName,
      lessons: moduleLessons
    }));
  }, [lessons]);

  const totalLessons = lessons.length;
  const completedCount = completedLessonIds.length;
  const progressPercent = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-white/5 backdrop-blur-md border-l border-white/10 rounded-none md:rounded-r-2xl overflow-hidden flex-shrink-0 w-full md:w-[35%] lg:w-[30%]">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-white/10 bg-black/20">
        <h2 className="text-xl font-bold text-white mb-2 font-prompt">เนื้อหาบทเรียน</h2>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400 font-prompt">
            <span>ความคืบหน้า</span>
            <span className="text-cyan-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 font-prompt">เรียนจบแล้ว {completedCount} จาก {totalLessons} บทเรียน</p>
        </div>
      </div>

      {/* Lesson List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {groupedLessons.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-4">
            <div className="sticky top-0 bg-[#090D16]/95 backdrop-blur-md px-6 py-3 border-b border-white/5 z-10">
              <h3 className="text-sm font-semibold text-cyan-400 font-prompt uppercase tracking-wider">
                {group.moduleName}
              </h3>
            </div>
            <div className="flex flex-col">
              {group.lessons.map(lesson => {
                const isLocked = !isCoursePurchased && !lesson.is_free_preview;
                const isActive = lesson.id === currentLessonId;
                const isCompleted = completedLessonIds.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => onLessonSelect(lesson.id)}
                    className={cn(
                      "flex items-start gap-4 px-6 py-4 text-left transition-all font-prompt border-b border-white/5 last:border-0 hover:bg-white/5",
                      isActive ? "bg-white/10 border-l-4 border-l-cyan-500" : "border-l-4 border-l-transparent",
                      isLocked ? "opacity-75 cursor-pointer" : "cursor-pointer" // Even if locked, clicking can show overlay
                    )}
                  >
                    <div className="mt-1 flex-shrink-0">
                      {isLocked ? (
                        <Lock className="w-5 h-5 text-gray-500" />
                      ) : isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : isActive ? (
                        <PlayCircle className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <PlayCircle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "text-sm font-medium line-clamp-2",
                        isActive ? "text-white" : "text-gray-300"
                      )}>
                        {lesson.lesson_order}. {lesson.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs text-gray-500">
                          {formatDuration(lesson.duration_seconds)}
                        </span>
                        {lesson.is_free_preview && !isCoursePurchased && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/20">
                            ดูฟรี
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

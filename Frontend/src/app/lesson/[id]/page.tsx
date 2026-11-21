'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params?.id || 'les_1';

  return (
    <div className="min-h-screen rich-bg flex flex-col justify-between p-6">
      <div className="max-w-2xl mx-auto w-full my-auto bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-[#464B71]/15 shadow-xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#118AB2]/10 text-[#118AB2] flex items-center justify-center text-3xl mx-auto mb-4">
          🤟
        </div>
        
        <span className="text-xs uppercase font-black text-[#118AB2] bg-[#118AB2]/10 px-3.5 py-1 rounded-full">
          Lesson ID: {lessonId}
        </span>
        
        <h1 className="text-3xl font-black text-[#1C234B] mt-4">
          Lesson Player (Phase 3 Integration)
        </h1>
        
        <p className="text-sm text-[#464B71]/80 mt-2 max-w-md mx-auto leading-relaxed">
          You navigated from the <strong>Phase 2 Dashboard</strong>! In Phase 3, this screen loads the multiple-choice questions, sign animations, and webcam ML exercises.
        </p>

        <div className="bg-[#FEF8E7] border border-[#F4C542]/60 rounded-2xl p-4 my-6 text-xs text-[#1C234B] font-bold">
          ⭐ Completing this lesson rewards +20 XP to your Phase 2 user profile!
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/dashboard">
            <Button variant="outlined" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Dashboard
            </Button>
          </Link>
          <Button
            variant="primary"
            onClick={() => {
              alert('Lesson practice preview completed! Returning to dashboard.');
              router.push('/dashboard');
            }}
            rightIcon={<CheckCircle2 className="w-4 h-4" />}
          >
            Mark Complete (+20 XP)
          </Button>
        </div>
      </div>
    </div>
  );
}

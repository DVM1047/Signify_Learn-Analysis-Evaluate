'use client';

import React from 'react';
import Link from 'next/link';
import { Lesson } from '@/types';
import { CheckCircle2, Play, Lock, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface LessonCardProps {
  lesson: Lesson;
  unitNum: number;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, unitNum }) => {
  const { id, title, desc, xp, mins, signs, status, lock_text } = lesson;

  if (status === 'completed') {
    return (
      <div className="group relative p-6 rounded-3xl border-2 border-[#7CD5C7] bg-white flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#58BDB0] transition-all duration-200">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#118AB2] bg-[#7CD5C7]/30 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#118AB2]" />
              Completed
            </span>
            <span className="text-xs font-bold text-[#464B71]/70 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {mins}m • {signs} signs
            </span>
          </div>

          <h4 className="font-extrabold text-xl text-[#1C234B] tracking-tight group-hover:text-[#118AB2] transition-colors">
            {title}
          </h4>
          <p className="text-xs text-[#464B71]/75 mt-2 line-clamp-2 leading-relaxed">
            {desc}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-[#464B71]/10 flex items-center justify-between">
          <span className="text-xs font-bold text-[#118AB2]">+{xp} XP earned</span>
          <Link href={`/lesson/${id}`}>
            <Button variant="outlined" size="sm">
              Review
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (status === 'available') {
    return (
      <div className="group relative p-6 rounded-3xl border-2 border-[#118AB2] bg-white ring-4 ring-[#118AB2]/10 flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-white bg-[#118AB2] px-3 py-1 rounded-full shadow-xs animate-pulse">
              <Play className="w-3 h-3 fill-current" />
              Available Now
            </span>
            <span className="text-xs font-extrabold text-amber-700 bg-[#FEF8E7] border border-[#F4C542] px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#F4C542]" />
              +{xp} XP
            </span>
          </div>

          <h4 className="font-extrabold text-xl text-[#1C234B] tracking-tight group-hover:text-[#118AB2] transition-colors">
            {title}
          </h4>
          <p className="text-xs text-[#464B71]/80 mt-2 line-clamp-2 leading-relaxed">
            {desc}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-[#464B71]/10 flex items-center justify-between">
          <span className="text-xs font-bold text-[#464B71]/70 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {mins} mins • {signs} signs
          </span>
          <Link href={`/lesson/${id}`}>
            <Button
              variant="primary"
              size="sm"
              rightIcon={<span className="text-sm">➔</span>}
            >
              Start
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Locked State
  return (
    <div className="relative p-6 rounded-3xl border border-[#464B71]/15 bg-[#F2F2ED]/60 opacity-80 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#464B71]/70 bg-[#464B71]/10 px-3 py-1 rounded-full">
            <Lock className="w-3 h-3" />
            Locked
          </span>
          <span className="text-xs font-bold text-[#464B71]/50">
            +{xp} XP
          </span>
        </div>

        <h4 className="font-bold text-lg text-[#464B71]/75 tracking-tight">
          {title}
        </h4>
        <p className="text-xs text-[#464B71]/60 mt-2 line-clamp-2 leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-[#464B71]/10 flex items-center justify-between text-xs font-bold text-[#464B71]/60">
        <span>{mins} mins</span>
        <span className="flex items-center gap-1 bg-[#464B71]/5 px-2.5 py-1 rounded-xl">
          🔒 {lock_text || 'Prerequisites required'}
        </span>
      </div>
    </div>
  );
};

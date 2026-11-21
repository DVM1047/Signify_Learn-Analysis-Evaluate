'use client';

import React from 'react';
import { Sparkles, Flame, Award } from 'lucide-react';
import { UserProfile } from '@/types';

interface TopStatsBarProps {
  user: UserProfile;
  className?: string;
}

export const TopStatsBar: React.FC<TopStatsBarProps> = ({ user, className = '' }) => {
  return (
    <div className={`flex items-center space-x-2.5 sm:space-x-3 text-sm font-bold ${className}`}>
      {/* XP Counter */}
      <div className="flex items-center space-x-2 bg-[#FEF8E7] border border-[#F4C542]/70 px-3 sm:px-4 py-2 rounded-2xl shadow-xs transition hover:scale-105">
        <div className="w-5 h-5 rounded-full bg-[#F4C542] flex items-center justify-center text-xs font-black text-amber-900 shadow-inner">
          ★
        </div>
        <span className="text-[#1C234B] tracking-tight">{user.xp} XP</span>
      </div>

      {/* Level Badge */}
      <div className="flex items-center space-x-1.5 bg-white border border-[#464B71]/15 px-3 sm:px-4 py-2 rounded-2xl shadow-xs transition hover:scale-105">
        <Award className="w-4 h-4 text-[#118AB2]" />
        <span className="text-[#1C234B]">Level {user.level}</span>
      </div>

      {/* Streak Badge */}
      <div className="flex items-center space-x-1.5 bg-[#FEF8E7] border border-[#F4C542]/70 px-3 sm:px-4 py-2 rounded-2xl shadow-xs transition hover:scale-105">
        <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
        <span className="text-[#1C234B]">{user.streak} <span className="hidden sm:inline">streak</span></span>
      </div>
    </div>
  );
};

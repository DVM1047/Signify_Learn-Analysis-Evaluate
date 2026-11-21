'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Award, Flame, Sparkles, Mail, User } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const profile = user || {
    name: 'Tanvi',
    email: 'tanvi@example.com',
    avatar: 'T',
    xp: 240,
    level: 3,
    streak: 5,
    goal_xp: 30,
    current_xp: 15,
  };

  return (
    <div className="min-h-screen rich-bg flex flex-col justify-between">
      <Navbar />
      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-10 flex-1">
        <div className="max-w-2xl mx-auto bg-white/95 rounded-3xl p-8 md:p-10 border border-[#464B71]/15 shadow-xl">
          <Link href="/dashboard" className="text-[#118AB2] hover:underline flex items-center gap-1 text-sm font-bold mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>

          <div className="flex items-center gap-6 pb-6 border-b border-[#464B71]/10">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#118AB2] to-[#7CD5C7] text-white flex items-center justify-center font-black text-3xl shadow-md">
              {profile.avatar || profile.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#1C234B]">{profile.name}</h1>
              <p className="text-sm text-[#464B71]/70 flex items-center gap-1.5 mt-1">
                <Mail className="w-3.5 h-3.5" /> {profile.email}
              </p>
              <div className="inline-flex items-center gap-1 mt-2 text-xs font-black text-[#118AB2] bg-[#118AB2]/10 px-3 py-1 rounded-full">
                Phase 2 Student Account
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 my-8 text-center">
            <div className="bg-[#FEF8E7] p-4 rounded-2xl border border-[#F4C542]/60">
              <div className="text-xs font-bold text-amber-800">Total XP</div>
              <div className="text-2xl font-black text-amber-900 mt-1">{profile.xp}</div>
            </div>
            <div className="bg-[#F0FAF8] p-4 rounded-2xl border border-[#7CD5C7]">
              <div className="text-xs font-bold text-teal-800">Current Level</div>
              <div className="text-2xl font-black text-[#1C234B] mt-1">Lvl {profile.level}</div>
            </div>
            <div className="bg-[#FEF8E7] p-4 rounded-2xl border border-[#F4C542]/60">
              <div className="text-xs font-bold text-orange-800">Streak</div>
              <div className="text-2xl font-black text-orange-600 mt-1 flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 fill-orange-500" /> {profile.streak}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Link href="/dashboard">
              <Button variant="primary">Return to Dashboard</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

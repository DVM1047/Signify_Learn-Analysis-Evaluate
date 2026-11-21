'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { ArrowLeft, Zap, Trophy, Timer } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SpeedSignPage() {
  return (
    <div className="min-h-screen rich-bg flex flex-col justify-between">
      <Navbar />
      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-10 flex-1 flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-white/95 rounded-3xl p-8 border border-[#464B71]/15 shadow-xl text-center">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center text-3xl mx-auto mb-4">
            ⚡
          </div>
          <h1 className="text-3xl font-black text-[#1C234B]">Speed Sign Game</h1>
          <p className="text-sm text-[#464B71]/80 mt-2">
            60-second rapid fire challenge to test your sign recognition speed!
          </p>

          <div className="bg-[#F2F2ED] rounded-2xl p-4 my-6 text-xs text-[#464B71] flex items-center justify-around font-bold">
            <span className="flex items-center gap-1"><Timer className="w-4 h-4 text-[#118AB2]" /> 60s Timer</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Trophy className="w-4 h-4 text-amber-500" /> +50 XP Highscore</span>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => alert('Speed Sign Game starts in Phase 7!')}
            >
              Start Speed Session
            </Button>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Return to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, FALLBACK_DASHBOARD_DATA } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Unit, UserProfile, Lesson } from '@/types';
import { UnitList } from '@/components/lesson/UnitList';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Sparkles,
  Search,
  Flame,
  Target,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  BookOpen,
  Zap,
  Info,
} from 'lucide-react';

export default function DashboardPage() {
  const { user: storeUser, setUser } = useAuthStore();
  const [user, setLocalUser] = useState<UserProfile>(storeUser || FALLBACK_DASHBOARD_DATA.user);
  const [units, setUnits] = useState<Unit[]>(FALLBACK_DASHBOARD_DATA.units);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'completed'>('all');
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await api.getDashboardData();
        setUnits(data.units);
        setLocalUser(data.user);
        setUser(data.user);
        // If data fetched successfully and not the exact fallback identity
        setIsBackendConnected(true);
      } catch (err) {
        console.warn('Dashboard loaded fallback data:', err);
        setUnits(FALLBACK_DASHBOARD_DATA.units);
        setLocalUser(FALLBACK_DASHBOARD_DATA.user);
        setIsBackendConnected(false);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [setUser]);

  // Determine active next lesson to recommend in the banner
  const firstUnit = units[0] || FALLBACK_DASHBOARD_DATA.units[0];
  const activeLesson: Lesson =
    units
      .flatMap((u) => u.lessons)
      .find((l) => l.status === 'available') ||
    firstUnit.lessons[0];

  // Daily goal calculation
  const goalPercent = Math.min(
    100,
    Math.round(((user.current_xp || 15) / (user.goal_xp || 30)) * 100)
  );

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const userWeek = user.week || [1, 1, 1, 1, 1, 0, 0];

  return (
    <main className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-12">
      
      {/* Backend Status Notice Pill */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#464B71]/10 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#464B71]">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isBackendConnected ? 'bg-emerald-500 animate-pulse' : 'bg-[#118AB2]'
            }`}
          />
          <span>
            {isBackendConnected
              ? 'FastAPI Backend Connected (Live Data)'
              : 'Signify Phase 2 Standalone Mode (Mock Data Active)'}
          </span>
        </div>

        <div className="text-xs text-[#464B71]/70 font-bold hidden sm:block">
          Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </div>
      </div>

      {/* Welcome Header */}
      <section className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1C234B] tracking-tight">
              Welcome back,{' '}
              <span className="text-[#118AB2] underline decoration-[#7CD5C7] decoration-4 underline-offset-8">
                {user.name}
              </span>{' '}
              👋
            </h1>
            <p className="text-base sm:text-lg text-[#464B71]/80 mt-3 font-medium max-w-2xl">
              Ready to learn Indian Sign Language today? Build muscle memory and master signs step by step.
            </p>
          </div>

          {/* Quick Sign of the day pill badge */}
          <div className="bg-gradient-to-r from-[#118AB2]/10 to-[#7CD5C7]/20 border border-[#118AB2]/20 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#118AB2] text-white flex items-center justify-center text-xl shadow-xs">
              🙏
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-[#118AB2]">
                Sign of the Day
              </div>
              <div className="text-sm font-extrabold text-[#1C234B]">Namaste / Greetings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Summary Cards (Next Up + Daily Goal) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Next Lesson Card (Col-span 7) */}
        <div className="lg:col-span-7 bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-[#464B71]/10 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-[#118AB2]/40 transition duration-300">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#7CD5C7]/15 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <span className="text-xs uppercase font-black text-[#118AB2] bg-[#118AB2]/10 px-3.5 py-1 rounded-full tracking-wider">
                Unit {firstUnit.unit_num} • Next Up
              </span>
              <span className="text-xs font-black bg-[#FEF8E7] text-amber-800 border border-[#F4C542] px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#F4C542]" />
                +{activeLesson.xp} XP
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#1C234B] tracking-tight mb-2">
              {activeLesson.title}
            </h2>
            <p className="text-sm sm:text-base text-[#464B71]/80 leading-relaxed max-w-xl mb-6">
              {activeLesson.desc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#464B71]/10">
            <div className="flex items-center gap-4 text-xs font-bold text-[#464B71]/70">
              <span className="bg-[#F2F2ED] px-3 py-1.5 rounded-xl">
                ⏱️ {activeLesson.mins} mins
              </span>
              <span className="bg-[#F2F2ED] px-3 py-1.5 rounded-xl">
                🖐️ {activeLesson.signs} core signs
              </span>
            </div>

            <Link href={`/lesson/${activeLesson.id}`}>
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5 ml-1" />}
                className="w-full sm:w-auto shadow-glow-primary"
              >
                Continue Lesson
              </Button>
            </Link>
          </div>
        </div>

        {/* Daily Goal & Streak Hub Card (Col-span 5) */}
        <div className="lg:col-span-5 bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-[#464B71]/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#464B71]/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#118AB2]" />
                <h3 className="text-xl font-black text-[#1C234B]">Daily Goal</h3>
              </div>
              <span className="text-xs font-black text-[#118AB2] bg-[#118AB2]/10 px-3 py-1 rounded-full">
                {user.current_xp} / {user.goal_xp} XP
              </span>
            </div>

            {/* Circular Progress Gauge & Description */}
            <div className="flex items-center gap-5 my-3">
              <div className="relative w-20 h-20 rounded-full bg-[#F2F2ED] flex items-center justify-center shrink-0 border-4 border-[#7CD5C7] shadow-inner">
                <span className="text-lg font-black text-[#1C234B]">{goalPercent}%</span>
              </div>
              <div>
                <div className="font-extrabold text-[#1C234B] text-base">
                  {user.current_xp} of {user.goal_xp} XP earned today
                </div>
                <p className="text-xs text-[#464B71]/70 mt-1 leading-relaxed">
                  {goalPercent >= 100
                    ? '🎉 Superb! You completed your daily goal today.'
                    : `Earn ${user.goal_xp - user.current_xp} more XP to maintain your ${user.streak}-day streak!`}
                </p>
              </div>
            </div>
          </div>

          {/* 7-Day Activity Dots */}
          <div className="mt-5 pt-4 border-t border-[#464B71]/10">
            <div className="flex items-center justify-between text-xs font-bold text-[#464B71]/70 mb-2">
              <span>This Week's Activity</span>
              <span className="flex items-center gap-1 text-orange-500 font-black">
                <Flame className="w-3.5 h-3.5 fill-orange-500" /> {user.streak} Days
              </span>
            </div>
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {daysOfWeek.map((day, idx) => {
                const isActive = userWeek[idx] === 1;
                return (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-black text-[#464B71]/60">{day}</span>
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                        isActive
                          ? 'bg-[#118AB2] text-white shadow-xs'
                          : 'bg-[#F2F2ED] text-[#464B71]/40 border border-[#464B71]/10'
                      }`}
                    >
                      {isActive ? '✓' : '·'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path & Curriculum Section */}
      <section>
        {/* Section Heading & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1C234B] tracking-tight">
              Your Learning Path
            </h2>
            <p className="text-sm text-[#464B71]/80 mt-1">
              Structured progressive modules to build conversational fluency in Indian Sign Language.
            </p>
          </div>

          {/* Search & Filter Controls matching design system */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
                className="py-2 text-xs"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center bg-white/90 border border-[#464B71]/15 p-1 rounded-2xl shrink-0">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 text-xs font-black rounded-xl transition ${
                  filterStatus === 'all'
                    ? 'bg-[#118AB2] text-white shadow-xs'
                    : 'text-[#464B71] hover:text-[#118AB2]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('available')}
                className={`px-3 py-1.5 text-xs font-black rounded-xl transition ${
                  filterStatus === 'available'
                    ? 'bg-[#118AB2] text-white shadow-xs'
                    : 'text-[#464B71] hover:text-[#118AB2]'
                }`}
              >
                Available
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`px-3 py-1.5 text-xs font-black rounded-xl transition ${
                  filterStatus === 'completed'
                    ? 'bg-[#118AB2] text-white shadow-xs'
                    : 'text-[#464B71] hover:text-[#118AB2]'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Units & Lessons List */}
        <UnitList
          units={units}
          searchQuery={searchQuery}
          filterStatus={filterStatus}
        />
      </section>

      {/* Speed Practice & Dictionary Quick Launch Banners */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
        <div className="bg-gradient-to-br from-[#118AB2] to-[#0D6E8E] rounded-3xl p-6 sm:p-8 text-white shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#7CD5C7] bg-white/10 px-3 py-1 rounded-full">
              Quick Practice
            </span>
            <h3 className="text-xl sm:text-2xl font-black mt-2">Speed Sign Challenge</h3>
            <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-sm">
              Test your recognition reflex with 60-second rapid-fire sign questions!
            </p>
            <div className="mt-4">
              <Link href="/speed-sign">
                <Button variant="secondary" size="sm" rightIcon={<Zap className="w-4 h-4" />}>
                  Play Speed Sign
                </Button>
              </Link>
            </div>
          </div>
          <div className="text-5xl hidden sm:block">⚡</div>
        </div>

        <div className="bg-white/95 border border-[#464B71]/15 rounded-3xl p-6 sm:p-8 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#118AB2] bg-[#118AB2]/10 px-3 py-1 rounded-full">
              Vocabulary
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#1C234B] mt-2">Sign Dictionary</h3>
            <p className="text-xs sm:text-sm text-[#464B71]/80 mt-1 max-w-sm">
              Review and look up all previously learned signs and hand gestures anytime.
            </p>
            <div className="mt-4">
              <Link href="/dictionary">
                <Button variant="outlined" size="sm" rightIcon={<BookOpen className="w-4 h-4" />}>
                  Browse Signs
                </Button>
              </Link>
            </div>
          </div>
          <div className="text-5xl hidden sm:block">📖</div>
        </div>
      </section>

    </main>
  );
}

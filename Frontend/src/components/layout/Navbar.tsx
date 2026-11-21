'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { TopStatsBar } from './TopStatsBar';
import { Menu, X, LogOut, User, BookOpen, Zap, LayoutDashboard, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const currentUser = user || {
    id: 'demo',
    name: 'Tanvi',
    email: 'tanvi@example.com',
    avatar: 'T',
    xp: 240,
    level: 3,
    streak: 5,
    goal_xp: 30,
    current_xp: 15,
  };

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Dictionary', href: '/dictionary', icon: BookOpen },
    { name: 'Speed Sign', href: '/speed-sign', icon: Zap },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#464B71]/10">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Desktop Nav Links */}
        <div className="flex items-center space-x-8 lg:space-x-12">
          <Link href="/dashboard" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-[#118AB2] flex items-center justify-center text-white font-black text-2xl shadow-md group-hover:scale-105 transition-transform duration-200">
              🤟
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-[25px] font-black tracking-[0.28em] text-[#1C234B] leading-none">
                SIGNIFY
              </span>
              <span className="text-[9px] md:text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#118AB2] mt-1">
                Indian Sign Language
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center pl-2 space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm lg:text-base font-bold py-2 px-3.5 rounded-xl transition duration-150 ${
                    isActive
                      ? 'text-[#118AB2]'
                      : 'text-[#464B71]/80 hover:text-[#118AB2] hover:bg-[#118AB2]/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-2 left-3 right-3 h-[3.5px] bg-[#118AB2] rounded-full shadow-glow-primary animate-in fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Live Dynamic Stats (XP, Level, Streak) + Avatar */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden sm:block">
            <TopStatsBar user={currentUser} />
          </div>

          <div className="hidden sm:block h-8 w-[1.5px] bg-[#464B71]/15" />

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-2 p-1 rounded-full hover:ring-2 hover:ring-[#118AB2]/30 transition"
              aria-label="User profile menu"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-tr from-[#118AB2] via-[#2CB3DE] to-[#7CD5C7] text-white flex items-center justify-center font-extrabold text-base md:text-lg shadow-sm">
                {currentUser.avatar || currentUser.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <ChevronDown className="w-4 h-4 text-[#464B71]/60 hidden md:block" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-[#464B71]/10 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 py-2.5 border-b border-[#464B71]/10">
                  <p className="text-sm font-black text-[#1C234B]">{currentUser.name}</p>
                  <p className="text-xs text-[#464B71]/70 truncate">{currentUser.email}</p>
                </div>
                <div className="p-1">
                  <Link
                    href="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-[#464B71] hover:text-[#118AB2] hover:bg-[#118AB2]/5 rounded-xl transition"
                  >
                    <User className="w-4 h-4 text-[#118AB2]" />
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#464B71] hover:bg-black/5"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 border-b border-[#464B71]/10 px-5 py-4 space-y-4">
          <div className="sm:hidden pb-3 border-b border-[#464B71]/10">
            <TopStatsBar user={currentUser} />
          </div>
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm ${
                    isActive
                      ? 'bg-[#118AB2] text-white'
                      : 'text-[#464B71] hover:bg-[#118AB2]/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

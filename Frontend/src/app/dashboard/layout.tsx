'use client';

import React, { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { useAuthStore } from '@/store/authStore';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="min-h-screen flex flex-col justify-between rich-bg">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <footer className="mt-20 bg-white/90 backdrop-blur-md border-t border-[#464B71]/10 py-8 text-center text-sm font-semibold text-[#464B71]/70">
        <div className="max-w-[1440px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🤟</span>
            <span className="font-extrabold text-[#1C234B]">SIGNIFY</span>
            <span>• Indian Sign Language Learning Platform</span>
          </div>
          <div className="text-xs text-[#464B71]/60">
            Phase 2: App Shell & Dashboard with Next.js & TypeScript
          </div>
        </div>
      </footer>
    </div>
  );
}

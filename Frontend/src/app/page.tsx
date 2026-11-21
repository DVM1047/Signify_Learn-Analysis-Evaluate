'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center rich-bg p-6">
      <div className="w-16 h-16 rounded-3xl bg-[#118AB2] text-white flex items-center justify-center text-3xl shadow-xl animate-bounce">
        🤟
      </div>
      <h2 className="text-2xl font-black text-[#1C234B] mt-4 tracking-widest">SIGNIFY</h2>
      <p className="text-sm font-bold text-[#118AB2] mt-1">Loading your learning dashboard...</p>
    </div>
  );
}

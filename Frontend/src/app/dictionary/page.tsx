'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { ArrowLeft, BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function DictionaryPage() {
  const signs = [
    { sign: 'Hello', gesture: '👋', category: 'Greetings', desc: 'Open hand wave from head height' },
    { sign: 'Thank You', gesture: '🙏', category: 'Polite', desc: 'Flat hand moves forward from chin' },
    { sign: 'Please', gesture: '🤲', category: 'Polite', desc: 'Circular motion over chest' },
    { sign: 'Father', gesture: '👨', category: 'Family', desc: 'Thumb tap at forehead' },
    { sign: 'Mother', gesture: '👩', category: 'Family', desc: 'Thumb tap at chin' },
    { sign: 'Friend', gesture: '🤝', category: 'People', desc: 'Interlinked index fingers' },
  ];

  return (
    <div className="min-h-screen rich-bg flex flex-col justify-between">
      <Navbar />
      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-10 flex-1">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="text-[#118AB2] hover:underline flex items-center gap-1 text-sm font-bold">
                <ArrowLeft className="w-4 h-4" /> Dashboard
              </Link>
            </div>
            <h1 className="text-3xl font-black text-[#1C234B] mt-2">Sign Dictionary</h1>
            <p className="text-sm text-[#464B71]/80 mt-1">
              Browse learned signs and visual gestures from your curriculum.
            </p>
          </div>

          <div className="w-full sm:w-72">
            <Input
              placeholder="Search signs..."
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {signs.map((item, idx) => (
            <div key={idx} className="bg-white/95 rounded-3xl p-6 border border-[#464B71]/10 shadow-xs hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{item.gesture}</span>
                <span className="text-xs font-black text-[#118AB2] bg-[#118AB2]/10 px-2.5 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-[#1C234B]">{item.sign}</h3>
              <p className="text-xs text-[#464B71]/70 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

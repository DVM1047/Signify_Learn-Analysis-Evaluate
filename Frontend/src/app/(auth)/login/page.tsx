'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState('tanvi@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await api.login({ email, password });
      setAuth(res.access_token, res.user);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen rich-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-[#464B71]/15 shadow-xl">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#118AB2] text-white flex items-center justify-center text-3xl mx-auto shadow-md mb-3">
            🤟
          </div>
          <h1 className="text-2xl font-black text-[#1C234B] tracking-wider">WELCOME TO SIGNIFY</h1>
          <p className="text-xs font-bold uppercase tracking-widest text-[#118AB2] mt-1">
            Indian Sign Language Platform
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold p-3.5 rounded-2xl mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-[#464B71]/10 text-center">
          <p className="text-xs text-[#464B71]/80">
            Don't have an account yet?{' '}
            <Link href="/register" className="font-extrabold text-[#118AB2] hover:underline">
              Create an account
            </Link>
          </p>
          <div className="mt-4">
            <Link
              href="/dashboard"
              className="text-xs font-bold text-[#464B71]/60 hover:text-[#118AB2] underline underline-offset-4"
            >
              Skip to Dashboard (Demo Mode) ➔
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// components/auth/AuthLayout.tsx
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* LEFT SIDE - Marketing Panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-teal-50 to-white p-12 flex-col justify-between">
        <div>
{/* Logo */}
<div className="flex items-center gap-3 mb-10">
  <div>
    <h1 className="text-xl font-bold text-gray-900 tracking-wide">SIGNIFY</h1>
    <p className="text-xs text-gray-500 tracking-wider">
      Learn. Practice. Sign. Master
    </p>
  </div>
</div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full mb-6">
            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
            Zero Prior Knowledge Required
          </div>

          {/* Headline */}
          <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Start Your Sign<br />Language Journey
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-md">
            Join thousands learning to connect beyond words. Master expressive fingerspelling, spatial syntax, and fluent gesture dialogue.
          </p>

          {/* Features */}
          <div className="space-y-5">
            <FeatureItem
              icon="📘"
              title="100% Free Starter Tracks"
              description="Master the full alphabet, basic numbers, greeting etiquette, and essential grammar fundamentals without paywalls."
            />
            <FeatureItem
              icon="⏱️"
              title="Personalized Daily Pace"
              description="Micro-lessons built for 15-minute coffee breaks, retention-backed spaced repetition, and adaptive rest intervals."
            />
            <FeatureItem
              icon="📹"
              title="Camera Gestural Feedback Ready"
              description="Real-time local computer-vision tracks finger joint orientation and posture angles directly in-browser."
            />
          </div>
        </div>

        {/* Bottom Stats + Testimonial */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-teal-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-white"></div>
            </div>
            <div>
              <p className="font-semibold text-gray-900">8,420+ Active Learners</p>
              <p className="text-sm text-gray-500">Signing in over 46 countries today</p>
            </div>
            <span className="ml-auto text-teal-600 font-medium text-sm">+34% this month</span>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
            </div>
            <p className="text-gray-700 text-sm italic mb-3">
              “Signify treats sign language as a living, expressive culture—not merely translated words. The visual feedback transforms confidence within the first week.”
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div>
                <p className="font-medium text-gray-900 text-sm">Dr. Julian Vance</p>
                <p className="text-xs text-gray-500">Deaf Culture Advocate & ASL Faculty</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-xl shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-0.5">{description}</p>
      </div>
    </div>
  );
}
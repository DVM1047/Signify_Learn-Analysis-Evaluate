// components/auth/LoginLayout.tsx
import { ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-teal-50 to-white p-12 flex-col justify-between">
        <div>
        {/* Logo */}
<div className="flex items-center gap-3 mb-10">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Signify</h1>
              <p className="text-xs text-gray-500 tracking-wider">KINETIC LEARNING</p>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-gray-500 tracking-wider">
                NEXT MILESTONE
              </p>
              <span className="text-xs bg-teal-100 text-teal-700 px-2.5 py-1 rounded-full font-medium">
                Unit 4
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Expressive Greetings
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Learn two-handed flow phrases and micro facial cues.
            </p>

            <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
              <div className="bg-teal-500 h-2 rounded-full" style={{ width: "78%" }}></div>
            </div>
            <p className="text-xs text-gray-500">Progress: 14/18 lessons • 78%</p>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-teal-400 border-2 border-white"></div>
              <div className="w-7 h-7 rounded-full bg-blue-400 border-2 border-white"></div>
              <div className="w-7 h-7 rounded-full bg-purple-400 border-2 border-white"></div>
            </div>
            <p className="text-sm font-medium text-gray-700">4k+ Daily learners active right now</p>
          </div>
          <p className="text-sm text-gray-600 italic">
            “Learning ASL through Signify turned a casual hobby into real fluency. My streak is sacred!”
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        {children}
      </div>
    </div>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-5 md:px-16">
        <h1 className="text-2xl font-bold tracking-wide text-teal-700">
          Signify
        </h1>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 font-medium hover:bg-gray-100"
          >
            Log in
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-teal-700 px-5 py-2 font-medium text-white hover:bg-teal-800"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center px-6 pb-16 pt-16 text-center md:pt-20">
        <p className="mb-6 rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700">
          Learn • Practice • Sign • Master
        </p>

        <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Every gesture tells a story.
        </h2>

        <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
          Discover the beauty of sign language through interactive lessons,
          fun quizzes, and engaging practice activities. Make communication
          more accessible, one sign at a time.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/register"
            className="rounded-xl bg-teal-700 px-7 py-3 font-semibold text-white transition hover:bg-teal-800"
          >
            Start Learning →
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-gray-300 px-7 py-3 font-semibold transition hover:bg-gray-50"
          >
            I already have an account
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid w-full max-w-5xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-7 text-left transition hover:shadow-md">
            <div className="text-4xl">🤟</div>

            <h3 className="mt-5 text-lg font-semibold">
              Learn Sign Language
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Discover new signs and build your vocabulary through
              easy-to-follow lessons.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-7 text-left transition hover:shadow-md">
            <div className="text-4xl">🎯</div>

            <h3 className="mt-5 text-lg font-semibold">
              Practice & Play
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Test your knowledge with interactive quizzes and fun
              learning activities.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-7 text-left transition hover:shadow-md">
            <div className="text-4xl">💙</div>

            <h3 className="mt-5 text-lg font-semibold">
              Communication for All
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Take a step towards a world where everyone can connect
              and communicate.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-6 text-center text-sm text-slate-500">
        <p>Signify © 2026</p>
        <p className="mt-1">Learn. Practice. Sign.</p>
      </footer>
    </main>
  );
}


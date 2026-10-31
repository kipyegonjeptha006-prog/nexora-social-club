
"use client";

import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <main className="min-h-screen bg-[#0b0914] text-white">
      <header className="border-b border-white/10 bg-[#100d1b]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-black">
            NEXORA<span className="text-fuchsia-400">.</span>
          </Link>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="rounded-full border border-white/20 px-5 py-2 hover:bg-white/10"
            >
              Member menu ▼
            </button>

            {showMenu && (
              <div className="absolute right-0 top-12 z-10 w-48 rounded-xl border border-white/10 bg-[#1b1528] p-3 shadow-xl">
                <Link
                  href="/"
                  className="block rounded-lg p-3 text-sm hover:bg-white/10"
                >
                  Homepage
                </Link>

                <Link
                  href="/logout"
                  className="block rounded-lg p-3 text-sm text-red-400 hover:bg-white/10"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-bold uppercase tracking-widest text-fuchsia-400">
          Member dashboard
        </p>

        <h1 className="mt-4 text-4xl font-black sm:text-5xl">
          Welcome to Nexora.
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-gray-400">
          Your community starts here. Discover events, connect with other
          members, and explore everything Nexora has to offer.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Link
            href="/"
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:border-fuchsia-500"
          >
            <div className="text-4xl">🎉</div>
            <h2 className="mt-5 text-xl font-bold">Explore events</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Discover upcoming Nexora experiences and activities.
            </p>
            <p className="mt-5 font-bold text-fuchsia-400">Explore →</p>
          </Link>

          <Link
            href="/"
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:border-fuchsia-500"
          >
            <div className="text-4xl">💬</div>
            <h2 className="mt-5 text-xl font-bold">Community</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Join conversations and share your ideas.
            </p>
            <p className="mt-5 font-bold text-fuchsia-400">Visit community →</p>
          </Link>

          <Link
            href="/"
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:border-fuchsia-500"
          >
            <div className="text-4xl">👤</div>
            <h2 className="mt-5 text-xl font-bold">My membership</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Your member profile and account information.
            </p>
            <p className="mt-5 font-bold text-fuchsia-400">View profile →</p>
          </Link>
        </div>

        <div className="mt-12 rounded-3xl border border-fuchsia-500/20 bg-fuchsia-500/10 p-8">
          <h2 className="text-2xl font-bold">Welcome to the community!</h2>
          <p className="mt-3 text-gray-300">
            Connect. Create. Belong.
          </p>
        </div>

        <Link
          href="/logout"
          className="mt-10 inline-block rounded-xl border border-red-500/30 px-6 py-3 font-bold text-red-400 hover:bg-red-500/10"
        >
          Logout
        </Link>
      </section>
    </main>
  );
}

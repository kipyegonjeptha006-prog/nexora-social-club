
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Member = {
  id: number;
  username: string;
  full_name: string;
  email: string;
  role: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function verifyMember() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          router.replace("/login");
          return;
        }

        const data = await response.json();

        if (active) setMember(data.user);
      } catch {
        router.replace("/login");
      } finally {
        if (active) setLoading(false);
      }
    }

    verifyMember();

    return () => {
      active = false;
    };
  }, [router]);

  async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      router.replace("/login");
    }
  }

  if (loading || !member) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080a09] text-white">
        <p className="text-lg text-[#c9a85c]">Verifying your membership...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080a09] text-white">
      <header className="border-b border-[#c9a85c]/20 bg-[#0d100e]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-black tracking-wide">
            NEXORA<span className="text-[#c9a85c]">.</span>
          </Link>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="rounded-full border border-[#c9a85c]/40 px-5 py-2 text-[#d9bd78] transition hover:bg-[#c9a85c]/10"
            >
              Member menu ▼
            </button>

            {showMenu && (
              <div className="absolute right-0 top-12 z-10 w-48 rounded-xl border border-[#c9a85c]/20 bg-[#111713] p-3 shadow-xl">
                <Link
                  href="/"
                  className="block rounded-lg p-3 text-sm text-gray-300 hover:bg-white/5 hover:text-[#d9bd78]"
                >
                  Homepage
                </Link>

                <button
                  onClick={logout}
                  className="block w-full rounded-lg p-3 text-left text-sm text-red-400 hover:bg-white/5"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#c9a85c]">
          Member dashboard
        </p>

        <h1 className="mt-4 text-4xl font-black sm:text-5xl">
          Welcome, <span className="text-[#d9bd78]">{member.full_name}</span>.
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-gray-400">
          Your community starts here. Discover events, connect with other
          members, and explore everything Nexora has to offer.
        </p>

        <div className="mt-8 rounded-3xl border border-[#c9a85c]/25 bg-[#111713] p-7 shadow-lg">
          <h2 className="text-xl font-bold text-[#d9bd78]">
            Your membership details
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <p className="text-gray-300">
              Name: <span className="text-white">{member.full_name}</span>
            </p>
            <p className="text-gray-300">
              Username: <span className="text-[#b8d8a5]">@{member.username}</span>
            </p>
            <p className="text-gray-300">
              Email: <span className="text-white">{member.email}</span>
            </p>
            <p className="text-gray-300">
              Membership: <span className="text-[#b8d8a5]">Active account</span>
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Link
            href="/"
            className="rounded-3xl border border-[#c9a85c]/20 bg-[#111713] p-7 transition hover:-translate-y-1 hover:border-[#c9a85c] hover:shadow-xl"
          >
            <div className="text-4xl">🎉</div>
            <h2 className="mt-5 text-xl font-bold text-[#d9bd78]">Explore events</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Discover upcoming Nexora experiences and activities.
            </p>
            <p className="mt-5 font-bold text-[#b8d8a5]">Explore →</p>
          </Link>

          <Link
            href="/"
            className="rounded-3xl border border-[#c9a85c]/20 bg-[#111713] p-7 transition hover:-translate-y-1 hover:border-[#c9a85c] hover:shadow-xl"
          >
            <div className="text-4xl">💬</div>
            <h2 className="mt-5 text-xl font-bold text-[#d9bd78]">Community</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Join conversations and share your ideas.
            </p>
            <p className="mt-5 font-bold text-[#b8d8a5]">Visit community →</p>
          </Link>

          <Link
            href="/"
            className="rounded-3xl border border-[#c9a85c]/20 bg-[#111713] p-7 transition hover:-translate-y-1 hover:border-[#c9a85c] hover:shadow-xl"
          >
            <div className="text-4xl">👤</div>
            <h2 className="mt-5 text-xl font-bold text-[#d9bd78]">My membership</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Your member profile and account information.
            </p>
            <p className="mt-5 font-bold text-[#b8d8a5]">View profile →</p>
          </Link>
        </div>

        <div className="mt-12 rounded-3xl border border-[#c9a85c]/25 bg-gradient-to-r from-[#c9a85c]/10 to-[#315b3c]/20 p-8">
          <h2 className="text-2xl font-bold text-[#d9bd78]">
            Welcome to the community!
          </h2>
          <p className="mt-3 text-gray-300">
            Connect. Create. Belong.
          </p>
        </div>

        <button
          onClick={logout}
          className="mt-10 rounded-xl border border-red-500/30 px-6 py-3 font-bold text-red-400 transition hover:bg-red-500/10"
        >
          Logout
        </button>
      </section>
    </main>
  );
}

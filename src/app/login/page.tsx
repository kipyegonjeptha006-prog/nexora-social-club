
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier,
          password,
          remember,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Unable to sign in.");
        return;
      }

      setMessage("Welcome back! Redirecting...");

      setTimeout(() => router.push("/dashboard"), 1000);
    } catch {
      setMessage("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#101710] px-4 py-4 text-white outline-none transition focus:border-[#d6ad45] focus:ring-1 focus:ring-[#d6ad45]";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050805] px-4 py-12 text-white">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-green-700/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-yellow-600/10 blur-[120px]" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#d6ad45]/30 bg-[#0b100c] shadow-2xl shadow-black/50 md:grid-cols-2">

        <section className="hidden flex-col justify-between bg-gradient-to-br from-[#142719] via-[#0b100c] to-black p-12 md:flex">
          <div>
            <div className="text-3xl font-black tracking-widest">
              NEXORA<span className="text-[#d6ad45]">.</span>
            </div>
            <p className="mt-3 text-sm uppercase tracking-[0.35em] text-[#d6ad45]">
              Social Club
            </p>
          </div>

          <div>
            <div className="mb-5 h-1 w-16 rounded-full bg-[#d6ad45]" />
            <h2 className="text-4xl font-black leading-tight">
              Welcome
              <br />
              <span className="text-[#d6ad45]">Back.</span>
            </h2>
            <p className="mt-6 max-w-sm leading-7 text-gray-400">
              Your community, your connections, your experiences.
              Sign in and continue where you left off.
            </p>
          </div>

          <p className="text-xs tracking-widest text-gray-500">
            © 2026 NEXORA SOCIAL CLUB
          </p>
        </section>

        <section className="p-6 sm:p-10 md:p-12">
          <Link href="/" className="text-2xl font-black tracking-widest md:hidden">
            NEXORA<span className="text-[#d6ad45]">.</span>
          </Link>

          <div className="mb-10 mt-7 md:mt-0">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d6ad45]">
              Member access
            </p>
            <h1 className="mt-3 text-3xl font-black sm:text-4xl">
              Sign in
            </h1>
            <p className="mt-3 text-sm text-gray-400">
              Enter your account details to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300">
                Username or email
              </label>
              <input
                className={inputClass}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter username or email"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300">
                Password
              </label>

              <div className="relative">
                <input
                  className={`${inputClass} pr-20`}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#d6ad45]"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-gray-400">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 accent-[#d6ad45]"
                />
                Remember me
              </label>

              <Link
                href="/forgot-password"
                className="font-semibold text-[#d6ad45] hover:text-green-400"
              >
                Forgot password?
              </Link>
            </div>

            {message && (
              <div
                role="status"
                className={`rounded-xl border p-3 text-sm ${
                  message.startsWith("Welcome back")
                    ? "border-green-500/30 bg-green-500/10 text-green-400"
                    : "border-red-500/30 bg-red-500/10 text-red-400"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-[#b68b2d] to-[#e2c36b] py-4 font-black tracking-wide text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "SIGNING IN..." : "SIGN IN TO NEXORA"}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-widest text-gray-500">
              New to Nexora?
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <Link
            href="/register"
            className="block w-full rounded-xl border border-[#d6ad45]/50 py-4 text-center font-bold text-[#d6ad45] transition hover:bg-[#d6ad45]/10"
          >
            CREATE AN ACCOUNT
          </Link>
        </section>
      </div>
    </main>
  );
}

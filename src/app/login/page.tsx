
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage(
      "Login interface ready. Secure server-side authentication will be connected next."
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0914] px-5 py-12 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <Link href="/" className="text-xl font-black">
          NEXORA<span className="text-fuchsia-400">.</span>
        </Link>

        <h1 className="mt-10 text-3xl font-black">Welcome back</h1>

        <p className="mt-2 text-gray-400">
          Login to access your Nexora membership.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="text-sm text-gray-300">
              Email address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-4 outline-none focus:border-fuchsia-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-4 outline-none focus:border-fuchsia-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-fuchsia-500 py-4 font-bold hover:bg-fuchsia-400"
          >
            Login
          </button>
        </form>

        {message && (
          <p role="status" className="mt-5 text-sm text-fuchsia-300">
            {message}
          </p>
        )}

        <p className="mt-7 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link href="/register" className="font-bold text-fuchsia-400">
            Register
          </Link>
        </p>

        <Link
          href="/"
          className="mt-6 block text-center text-sm text-gray-500 hover:text-white"
        >
          ← Back to homepage
        </Link>
      </div>
    </main>
  );
}


"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(
      "Registration interface ready. Secure account creation will be connected to the server next."
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0914] px-5 py-12 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <Link href="/" className="text-xl font-black">
          NEXORA<span className="text-fuchsia-400">.</span>
        </Link>

        <h1 className="mt-10 text-3xl font-black">Create account</h1>
        <p className="mt-2 text-gray-400">
          Join the Nexora Social Club community.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-sm text-gray-300">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-4 outline-none focus:border-fuchsia-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-4 outline-none focus:border-fuchsia-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={12}
              autoComplete="new-password"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-4 outline-none focus:border-fuchsia-500"
              placeholder="At least 12 characters"
            />
          </div>

          <button className="w-full rounded-xl bg-fuchsia-500 py-4 font-bold hover:bg-fuchsia-400">
            Create account
          </button>
        </form>

        {message && (
          <p role="status" className="mt-5 text-sm text-fuchsia-300">
            {message}
          </p>
        )}

        <p className="mt-7 text-center text-sm text-gray-400">
          Already a member?{" "}
          <Link href="/login" className="font-bold text-fuchsia-400">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}


"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Your passwords do not match.");
      return;
    }

    if (password.length < 12) {
      setMessage("Your password must have at least 12 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          name,
          phone,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Registration failed.");
        return;
      }

      setMessage("Account created successfully! Redirecting to login...");

      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setMessage("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#101710] px-4 py-3.5 text-white outline-none transition focus:border-[#d6ad45] focus:ring-1 focus:ring-[#d6ad45]";

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
              Connect.
              <br />
              Create.
              <br />
              <span className="text-[#d6ad45]">Belong.</span>
            </h2>
            <p className="mt-6 max-w-sm leading-7 text-gray-400">
              Become part of a community built around meaningful connections,
              exciting events and unforgettable experiences.
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

          <div className="mb-8 mt-7 md:mt-0">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d6ad45]">
              Become a member
            </p>
            <h1 className="mt-3 text-3xl font-black sm:text-4xl">
              Create your account
            </h1>
            <p className="mt-3 text-sm text-gray-400">
              Enter your details to join Nexora Social Club.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                className={inputClass}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. jephta123"
                pattern="[a-zA-Z0-9_]{3,30}"
                minLength={3}
                maxLength={30}
                autoComplete="username"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                3–30 letters, numbers or underscores.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300">
                Full name
              </label>
              <input
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                minLength={2}
                maxLength={150}
                autoComplete="name"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300">
                Phone number
              </label>
              <input
                className={inputClass}
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254 7XX XXX XXX"
                autoComplete="tel"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                className={inputClass}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
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
                  placeholder="At least 12 characters"
                  minLength={12}
                  maxLength={128}
                  autoComplete="new-password"
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

            <div>
              <label className="text-sm font-medium text-gray-300">
                Confirm password
              </label>
              <div className="relative">
                <input
                  className={`${inputClass} pr-20`}
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter password again"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#d6ad45]"
                >
                  {showConfirm ? "HIDE" : "SHOW"}
                </button>
              </div>
              {confirmPassword.length > 0 && (
                <p className={`mt-2 text-xs ${
                  password === confirmPassword
                    ? "text-green-400"
                    : "text-red-400"
                }`}>
                  {password === confirmPassword
                    ? "✓ Passwords match"
                    : "Passwords do not match"}
                </p>
              )}
            </div>

            {message && (
              <div
                role="status"
                className={`rounded-xl border p-3 text-sm ${
                  message.startsWith("Account created")
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
              {loading ? "CREATING ACCOUNT..." : "CREATE MY ACCOUNT"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-400">
            Already a member?{" "}
            <Link
              href="/login"
              className="font-bold text-[#d6ad45] hover:text-green-400"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-5 text-center text-xs text-gray-600">
            By registering, you agree to Nexora Social Club's membership terms.
          </p>
        </section>
      </div>
    </main>
  );
}


"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const events = [
  {
    id: 1,
    title: "Nexora Welcome Meetup",
    date: "November 14, 2026",
    time: "3:00 PM",
    location: "Nairobi, Kenya",
    price: "KSh 500",
    category: "Networking",
    description:
      "Meet new people, make connections and become part of the Nexora community.",
    icon: "🤝",
  },
  {
    id: 2,
    title: "Creative Connections",
    date: "November 21, 2026",
    time: "2:00 PM",
    location: "Nairobi, Kenya",
    price: "KSh 300",
    category: "Creativity",
    description:
      "An opportunity for creatives, entrepreneurs and innovators to connect.",
    icon: "🎨",
  },
  {
    id: 3,
    title: "Community Ideas Forum",
    date: "November 28, 2026",
    time: "11:00 AM",
    location: "Nairobi, Kenya",
    price: "Free",
    category: "Community",
    description:
      "Share ideas, discuss opportunities and help shape the future of Nexora.",
    icon: "💡",
  },
];

type Member = {
  id: number;
  username: string;
  full_name: string;
  email: string;
  role: string;
};

export default function Home() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("events");
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [member, setMember] = useState<Member | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function checkLogin() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
          cache: "no-store",
        });

        if (response.ok) {
          const data = await response.json();

          if (active) {
            setMember(data.user);
          }
        }
      } catch (error) {
        console.error("Unable to check login:", error);
      } finally {
        if (active) setAuthLoading(false);
      }
    }

    checkLogin();

    return () => {
      active = false;
    };
  }, []);

  const currentEvent = events.find(
    (event) => event.id === selectedEvent
  );

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setMember(null);
      setMenuOpen(false);
      router.refresh();
    } catch {
      alert("Unable to log out. Please try again.");
    }
  }

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  }

  const gold = "#c9a85c";
  const lightGold = "#d9bd78";
  const green = "#b8d8a5";

  return (
    <main className="min-h-screen bg-[#080a09] text-white">

      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-[#c9a85c]/20 bg-[#080a09]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#c9a85c]/40 bg-gradient-to-br from-[#c9a85c] to-[#8d6b2e] text-xl font-black text-black">
              N
            </div>
            <span className="text-2xl font-black tracking-tight">
              NEXORA<span className="text-[#c9a85c]">.</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-gray-300 md:flex">
            <a href="#home" className="transition hover:text-[#d9bd78]">Home</a>
            <a href="#events" className="transition hover:text-[#d9bd78]">Events</a>
            <a href="#community" className="transition hover:text-[#d9bd78]">Community</a>
            <a href="#about" className="transition hover:text-[#d9bd78]">About Us</a>
            <a href="#contact" className="transition hover:text-[#d9bd78]">Contact</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {authLoading ? (
              <span className="text-sm text-gray-500">Checking account...</span>
            ) : member ? (
              <>
                <span className="text-sm text-gray-300">
                  Welcome, <span className="font-bold text-[#d9bd78]">{member.full_name}</span>
                </span>

                <Link
                  href="/dashboard"
                  className="rounded-xl border border-[#c9a85c]/40 px-5 py-3 text-sm font-bold text-[#d9bd78] transition hover:bg-[#c9a85c]/10"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-red-500/30 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-gradient-to-r from-[#c9a85c] to-[#a9823d] px-5 py-3 text-sm font-bold text-black shadow-lg shadow-[#c9a85c]/10 transition hover:scale-105"
                >
                  Join Nexora
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-[#c9a85c]/30 px-3 py-2 text-xl md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#c9a85c]/20 bg-[#0d100e] px-5 py-5 md:hidden">
            <nav className="flex flex-col gap-5 text-gray-300">
              <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
              <a href="#events" onClick={() => setMenuOpen(false)}>Events</a>
              <a href="#community" onClick={() => setMenuOpen(false)}>Community</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

              {!authLoading && (
                member ? (
                  <>
                    <p className="text-sm text-[#d9bd78]">
                      Welcome, {member.full_name}
                    </p>
                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl border border-[#c9a85c]/40 px-5 py-3 text-center font-bold text-[#d9bd78]"
                    >
                      Member Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="rounded-xl border border-red-500/30 px-5 py-3 text-left font-bold text-red-400"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login">Sign In</Link>
                    <Link
                      href="/register"
                      className="rounded-xl bg-[#c9a85c] px-5 py-3 text-center font-bold text-black"
                    >
                      Join Nexora
                    </Link>
                  </>
                )
              )}
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative overflow-hidden px-5 py-24 md:py-36"
      >
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#c9a85c]/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#315b3c]/20 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#c9a85c]/30 bg-[#c9a85c]/10 px-4 py-2 text-sm text-[#d9bd78]">
              <span className="h-2 w-2 rounded-full bg-[#8fbd79]" />
              Welcome to the Nexora community
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Your people.
              <br />
              Your experiences.
              <br />
              <span className="bg-gradient-to-r from-[#c9a85c] via-[#e5ce91] to-[#9bbd82] bg-clip-text text-transparent">
                Your Nexora.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-400">
              More than a social club. Nexora is a place to connect, discover
              experiences, build friendships and create opportunities.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={member ? "/dashboard" : "/register"}
                className="rounded-xl bg-gradient-to-r from-[#c9a85c] to-[#a9823d] px-8 py-4 font-bold text-black shadow-xl shadow-[#c9a85c]/10 transition hover:-translate-y-1"
              >
                {member ? "Open Member Dashboard →" : "Become a Member →"}
              </Link>

              <a
                href="#events"
                className="rounded-xl border border-[#c9a85c]/30 px-8 py-4 font-bold text-[#d9bd78] transition hover:bg-[#c9a85c]/10"
              >
                Explore Events
              </a>
            </div>

            <div className="mt-14 flex flex-wrap gap-10">
              <div>
                <p className="text-3xl font-black text-[#d9bd78]">Connect</p>
                <p className="mt-1 text-sm text-gray-500">Meet your people</p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#d9bd78]">Discover</p>
                <p className="mt-1 text-sm text-gray-500">Find experiences</p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#d9bd78]">Grow</p>
                <p className="mt-1 text-sm text-gray-500">Create opportunities</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[35px] bg-gradient-to-br from-[#c9a85c]/20 to-[#315b3c]/20 blur-2xl" />

            <div className="relative rounded-[30px] border border-[#c9a85c]/25 bg-gradient-to-br from-[#19170f] to-[#101612] p-7 shadow-2xl md:p-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">THE NEXORA EXPERIENCE</p>
                  <h2 className="mt-2 text-2xl font-bold">Find your community.</h2>
                </div>
                <span className="text-4xl text-[#c9a85c]">✦</span>
              </div>

              <div className="my-8 grid grid-cols-2 gap-4">
                <div className="flex min-h-36 flex-col justify-between rounded-2xl border border-[#c9a85c]/15 bg-[#c9a85c]/10 p-5">
                  <span className="text-3xl">🤝</span>
                  <div>
                    <p className="font-bold text-[#d9bd78]">Connections</p>
                    <p className="text-xs text-gray-400">Meet new people</p>
                  </div>
                </div>

                <div className="flex min-h-36 flex-col justify-between rounded-2xl border border-[#c9a85c]/15 bg-[#315b3c]/20 p-5">
                  <span className="text-3xl">🎉</span>
                  <div>
                    <p className="font-bold text-[#b8d8a5]">Experiences</p>
                    <p className="text-xs text-gray-400">Enjoy memorable events</p>
                  </div>
                </div>

                <div className="flex min-h-36 flex-col justify-between rounded-2xl border border-[#c9a85c]/15 bg-[#315b3c]/15 p-5">
                  <span className="text-3xl">🚀</span>
                  <div>
                    <p className="font-bold text-[#b8d8a5]">Opportunities</p>
                    <p className="text-xs text-gray-400">Learn and grow</p>
                  </div>
                </div>

                <div className="flex min-h-36 flex-col justify-between rounded-2xl border border-[#c9a85c]/15 bg-[#c9a85c]/10 p-5">
                  <span className="text-3xl">🌍</span>
                  <div>
                    <p className="font-bold text-[#d9bd78]">Community</p>
                    <p className="text-xs text-gray-400">Belong somewhere</p>
                  </div>
                </div>
              </div>

              <Link
                href={member ? "/dashboard" : "/register"}
                className="block rounded-xl bg-gradient-to-r from-[#c9a85c] to-[#a9823d] py-4 text-center font-bold text-black transition hover:brightness-110"
              >
                {member ? "Visit your dashboard" : "Join the community"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT TABS */}
      <section id="events" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#c9a85c]">
            Discover Nexora
          </p>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">
            Explore what brings us together.
          </h2>
          <p className="mt-4 max-w-2xl text-gray-400">
            Discover upcoming experiences, connect with the community and
            learn more about our club.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {["events", "community", "about"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-6 py-3 font-semibold capitalize transition ${
                activeTab === tab
                  ? "bg-[#c9a85c] text-black"
                  : "border border-[#c9a85c]/20 bg-white/5 text-gray-400 hover:bg-[#c9a85c]/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "events" && (
          <div className="grid gap-6 md:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="group rounded-3xl border border-[#c9a85c]/15 bg-[#111713] p-7 transition hover:-translate-y-2 hover:border-[#c9a85c]/60"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-5xl">{event.icon}</span>
                  <span className="rounded-full bg-[#c9a85c]/10 px-3 py-2 text-xs font-bold text-[#d9bd78]">
                    {event.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="mt-3 min-h-16 text-sm leading-6 text-gray-400">
                  {event.description}
                </p>

                <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm text-gray-400">
                  <p>📅 {event.date}</p>
                  <p>🕒 {event.time}</p>
                  <p>📍 {event.location}</p>
                </div>

                <div className="mt-7 flex items-center justify-between">
                  <span className="text-lg font-black text-[#d9bd78]">
                    {event.price}
                  </span>
                  <button
                    onClick={() => setSelectedEvent(event.id)}
                    className="rounded-xl bg-[#c9a85c] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#e0c47e]"
                  >
                    Get Ticket
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === "community" && (
          <div
            id="community"
            className="rounded-3xl border border-[#c9a85c]/20 bg-[#111713] p-8 md:p-12"
          >
            <span className="text-5xl">🌍</span>
            <h3 className="mt-6 text-3xl font-black text-[#d9bd78]">
              A community built around people.
            </h3>
            <p className="mt-4 max-w-2xl leading-8 text-gray-400">
              Nexora brings together people who want to connect, share ideas,
              discover new experiences and support one another. Become a member
              and be part of the journey.
            </p>
            <Link
              href={member ? "/dashboard" : "/register"}
              className="mt-8 inline-block rounded-xl bg-[#c9a85c] px-7 py-4 font-bold text-black transition hover:bg-[#e0c47e]"
            >
              {member ? "Visit Dashboard →" : "Join Nexora →"}
            </Link>
          </div>
        )}

        {activeTab === "about" && (
          <div
            id="about"
            className="rounded-3xl border border-[#c9a85c]/20 bg-[#111713] p-8 md:p-12"
          >
            <span className="text-5xl">✦</span>
            <h3 className="mt-6 text-3xl font-black text-[#d9bd78]">
              What is Nexora?
            </h3>
            <p className="mt-4 max-w-3xl leading-8 text-gray-400">
              Nexora Social Club is designed to bring people together through
              events, meaningful connections, shared interests and
              opportunities. Our goal is to create a welcoming space where
              members can meet, participate and grow together.
            </p>
            <Link
              href={member ? "/dashboard" : "/register"}
              className="mt-8 inline-block rounded-xl bg-[#c9a85c] px-7 py-4 font-bold text-black transition hover:bg-[#e0c47e]"
            >
              {member ? "Visit Dashboard →" : "Become a Member →"}
            </Link>
          </div>
        )}
      </section>

      {/* MEMBERSHIP CTA */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[35px] border border-[#c9a85c]/25 bg-gradient-to-br from-[#211b10] via-[#151a13] to-[#102018] px-7 py-16 text-center md:px-16">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#d9bd78]">
            Your next chapter starts here
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black md:text-6xl">
            {member
              ? "Your Nexora journey continues."
              : "Don't just watch the community. Be part of it."}
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-gray-300">
            {member
              ? "Explore your member dashboard and discover what's happening in your community."
              : "Join Nexora and discover the people, experiences and opportunities waiting for you."}
          </p>

          <Link
            href={member ? "/dashboard" : "/register"}
            className="mt-9 inline-block rounded-xl bg-[#c9a85c] px-9 py-4 font-black text-black transition hover:scale-105"
          >
            {member ? "Open Your Dashboard →" : "Create Your Account →"}
          </Link>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="contact" className="mx-auto max-w-4xl px-5 py-20 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#c9a85c]">
          Stay connected
        </p>
        <h2 className="mt-4 text-3xl font-black md:text-4xl">
          Get updates from Nexora.
        </h2>
        <p className="mt-4 text-gray-400">
          Be among the first to hear about upcoming events and community news.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="min-w-0 flex-1 rounded-xl border border-[#c9a85c]/25 bg-[#111713] px-5 py-4 text-white outline-none focus:border-[#c9a85c]"
          />
          <button
            type="submit"
            className="rounded-xl bg-[#c9a85c] px-7 py-4 font-bold text-black transition hover:bg-[#e0c47e]"
          >
            Subscribe
          </button>
        </form>

        {subscribed && (
          <p className="mt-4 text-sm text-[#b8d8a5]">
            Thank you! The form worked locally, but email subscriptions are not
            connected to a mailing service yet.
          </p>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#c9a85c]/20 bg-[#060807] px-5 py-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <Link href="/" className="text-2xl font-black">
              NEXORA<span className="text-[#c9a85c]">.</span>
            </Link>
            <p className="mt-4 leading-7 text-gray-500">
              Your people. Your experiences. Your Nexora. A community for
              connection, discovery and growth.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#d9bd78]">Explore</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-500">
              <a href="#home" className="hover:text-[#d9bd78]">Home</a>
              <a href="#events" className="hover:text-[#d9bd78]">Events</a>
              <a href="#community" className="hover:text-[#d9bd78]">Community</a>
              <a href="#about" className="hover:text-[#d9bd78]">About</a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-[#d9bd78]">Membership</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-500">
              {!member && (
                <>
                  <Link href="/register" className="hover:text-[#d9bd78]">Create Account</Link>
                  <Link href="/login" className="hover:text-[#d9bd78]">Member Login</Link>
                </>
              )}
              <Link href="/dashboard" className="hover:text-[#d9bd78]">Dashboard</Link>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-7 text-center text-xs text-gray-600">
          © 2026 Nexora Social Club. All rights reserved.
        </div>
      </footer>

      {/* EVENT BOOKING WINDOW */}
      {currentEvent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-[#c9a85c]/25 bg-[#111713] p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold uppercase tracking-widest text-[#c9a85c]">
                Event details
              </p>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-2xl text-gray-400 hover:text-white"
                aria-label="Close event details"
              >
                ×
              </button>
            </div>

            <div className="mt-6 text-5xl">{currentEvent.icon}</div>
            <h2 className="mt-4 text-2xl font-black text-[#d9bd78]">
              {currentEvent.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              {currentEvent.description}
            </p>

            <div className="mt-6 space-y-3 text-sm text-gray-300">
              <p>📅 {currentEvent.date}</p>
              <p>🕒 {currentEvent.time}</p>
              <p>📍 {currentEvent.location}</p>
              <p>🎟️ {currentEvent.price}</p>
            </div>

            <Link
              href={member ? "/dashboard" : "/register"}
              className="mt-8 block rounded-xl bg-[#c9a85c] px-5 py-4 text-center font-bold text-black transition hover:bg-[#e0c47e]"
            >
              {member ? "Continue to dashboard" : "Register to continue"}
            </Link>

            <p className="mt-4 text-center text-xs text-gray-500">
              Ticket reservations and payments are not connected yet.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

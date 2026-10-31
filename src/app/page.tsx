
"use client";

import Link from "next/link";
import { useState } from "react";

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

export default function Home() {
  const [activeTab, setActiveTab] = useState("events");
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const currentEvent = events.find((event) => event.id === selectedEvent);

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <main className="min-h-screen bg-[#090713] text-white">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090713]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 text-xl font-black">
              N
            </div>
            <span className="text-2xl font-black tracking-tight">
              NEXORA<span className="text-violet-400">.</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-gray-300 md:flex">
            <a href="#home" className="transition hover:text-white">Home</a>
            <a href="#events" className="transition hover:text-white">Events</a>
            <a href="#community" className="transition hover:text-white">Community</a>
            <a href="#about" className="transition hover:text-white">About Us</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 px-5 py-3 text-sm font-bold shadow-lg shadow-violet-900/30 transition hover:scale-105"
            >
              Join Nexora
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-white/15 px-3 py-2 text-xl md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#100c20] px-5 py-5 md:hidden">
            <nav className="flex flex-col gap-5 text-gray-300">
              <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
              <a href="#events" onClick={() => setMenuOpen(false)}>Events</a>
              <a href="#community" onClick={() => setMenuOpen(false)}>Community</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
              <Link href="/login">Sign In</Link>
              <Link
                href="/register"
                className="rounded-xl bg-violet-600 px-5 py-3 text-center font-bold text-white"
              >
                Join Nexora
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative overflow-hidden px-5 py-24 md:py-36"
      >
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-violet-700/20 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-pink-600/20 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Welcome to the Nexora community
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Your people.
              <br />
              Your experiences.
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">
                Your Nexora.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-400">
              More than a social club. Nexora is a place to connect, discover
              experiences, build friendships and create opportunities.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 px-8 py-4 font-bold shadow-xl shadow-violet-900/30 transition hover:-translate-y-1"
              >
                Become a Member →
              </Link>
              <a
                href="#events"
                className="rounded-xl border border-white/20 px-8 py-4 font-bold transition hover:bg-white/10"
              >
                Explore Events
              </a>
            </div>

            <div className="mt-14 flex flex-wrap gap-10">
              <div>
                <p className="text-3xl font-black">Connect</p>
                <p className="mt-1 text-sm text-gray-500">Meet your people</p>
              </div>
              <div>
                <p className="text-3xl font-black">Discover</p>
                <p className="mt-1 text-sm text-gray-500">Find experiences</p>
              </div>
              <div>
                <p className="text-3xl font-black">Grow</p>
                <p className="mt-1 text-sm text-gray-500">Create opportunities</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[35px] bg-gradient-to-br from-violet-600/30 to-pink-600/20 blur-2xl" />
            <div className="relative rounded-[30px] border border-white/10 bg-gradient-to-br from-[#21183d] to-[#120e20] p-7 shadow-2xl md:p-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">THE NEXORA EXPERIENCE</p>
                  <h2 className="mt-2 text-2xl font-bold">Find your community.</h2>
                </div>
                <span className="text-4xl">✦</span>
              </div>

              <div className="my-8 grid grid-cols-2 gap-4">
                <div className="flex min-h-36 flex-col justify-between rounded-2xl bg-violet-500/20 p-5">
                  <span className="text-3xl">🤝</span>
                  <div>
                    <p className="font-bold">Connections</p>
                    <p className="text-xs text-gray-400">Meet new people</p>
                  </div>
                </div>
                <div className="flex min-h-36 flex-col justify-between rounded-2xl bg-pink-500/20 p-5">
                  <span className="text-3xl">🎉</span>
                  <div>
                    <p className="font-bold">Experiences</p>
                    <p className="text-xs text-gray-400">Enjoy memorable events</p>
                  </div>
                </div>
                <div className="flex min-h-36 flex-col justify-between rounded-2xl bg-orange-500/15 p-5">
                  <span className="text-3xl">🚀</span>
                  <div>
                    <p className="font-bold">Opportunities</p>
                    <p className="text-xs text-gray-400">Learn and grow</p>
                  </div>
                </div>
                <div className="flex min-h-36 flex-col justify-between rounded-2xl bg-blue-500/15 p-5">
                  <span className="text-3xl">🌍</span>
                  <div>
                    <p className="font-bold">Community</p>
                    <p className="text-xs text-gray-400">Belong somewhere</p>
                  </div>
                </div>
              </div>

              <Link
                href="/register"
                className="block rounded-xl bg-white py-4 text-center font-bold text-[#140d26] transition hover:bg-violet-100"
              >
                Join the community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT TABS */}
      <section id="events" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-violet-400">
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
                  ? "bg-violet-600 text-white"
                  : "border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
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
                className="group rounded-3xl border border-white/10 bg-[#151020] p-7 transition hover:-translate-y-2 hover:border-violet-500/50"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-5xl">{event.icon}</span>
                  <span className="rounded-full bg-violet-500/15 px-3 py-2 text-xs font-bold text-violet-300">
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
                  <span className="text-lg font-black text-violet-300">
                    {event.price}
                  </span>
                  <button
                    onClick={() => setSelectedEvent(event.id)}
                    className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-violet-200"
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
            className="rounded-3xl border border-white/10 bg-[#151020] p-8 md:p-12"
          >
            <span className="text-5xl">🌍</span>
            <h3 className="mt-6 text-3xl font-black">
              A community built around people.
            </h3>
            <p className="mt-4 max-w-2xl leading-8 text-gray-400">
              Nexora brings together people who want to connect, share ideas,
              discover new experiences and support one another. Become a member
              and be part of the journey.
            </p>
            <Link
              href="/register"
              className="mt-8 inline-block rounded-xl bg-violet-600 px-7 py-4 font-bold transition hover:bg-violet-500"
            >
              Join Nexora →
            </Link>
          </div>
        )}

        {activeTab === "about" && (
          <div
            id="about"
            className="rounded-3xl border border-white/10 bg-[#151020] p-8 md:p-12"
          >
            <span className="text-5xl">✦</span>
            <h3 className="mt-6 text-3xl font-black">What is Nexora?</h3>
            <p className="mt-4 max-w-3xl leading-8 text-gray-400">
              Nexora Social Club is designed to bring people together through
              events, meaningful connections, shared interests and
              opportunities. Our goal is to create a welcoming space where
              members can meet, participate and grow together.
            </p>
            <Link
              href="/register"
              className="mt-8 inline-block rounded-xl bg-violet-600 px-7 py-4 font-bold transition hover:bg-violet-500"
            >
              Become a Member →
            </Link>
          </div>
        )}
      </section>

      {/* MEMBERSHIP CTA */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[35px] border border-violet-400/20 bg-gradient-to-br from-violet-950 via-[#211039] to-pink-950 px-7 py-16 text-center md:px-16">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-pink-300">
            Your next chapter starts here
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black md:text-6xl">
            Don't just watch the community. Be part of it.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-gray-300">
            Join Nexora and discover the people, experiences and opportunities
            waiting for you.
          </p>
          <Link
            href="/register"
            className="mt-9 inline-block rounded-xl bg-white px-9 py-4 font-black text-violet-950 transition hover:scale-105"
          >
            Create Your Account →
          </Link>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="contact" className="mx-auto max-w-4xl px-5 py-20 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-violet-400">
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
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-violet-500"
          />
          <button
            type="submit"
            className="rounded-xl bg-violet-600 px-7 py-4 font-bold transition hover:bg-violet-500"
          >
            Subscribe
          </button>
        </form>

        {subscribed && (
          <p className="mt-4 text-sm text-green-400">
            Thank you! The form worked locally, but email subscriptions are not
            connected to a mailing service yet.
          </p>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#07050d] px-5 py-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <Link href="/" className="text-2xl font-black">
              NEXORA<span className="text-violet-400">.</span>
            </Link>
            <p className="mt-4 leading-7 text-gray-500">
              Your people. Your experiences. Your Nexora. A community for
              connection, discovery and growth.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Explore</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-500">
              <a href="#home" className="hover:text-white">Home</a>
              <a href="#events" className="hover:text-white">Events</a>
              <a href="#community" className="hover:text-white">Community</a>
              <a href="#about" className="hover:text-white">About</a>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Membership</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-500">
              <Link href="/register" className="hover:text-white">Create Account</Link>
              <Link href="/login" className="hover:text-white">Member Login</Link>
              <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-7 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Nexora Social Club. All rights reserved.
        </div>
      </footer>

      {/* EVENT BOOKING WINDOW */}
      {currentEvent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-white/10 bg-[#171124] p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold uppercase tracking-widest text-violet-400">
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
            <h2 className="mt-4 text-2xl font-black">{currentEvent.title}</h2>
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
              href="/register"
              className="mt-8 block rounded-xl bg-violet-600 px-5 py-4 text-center font-bold transition hover:bg-violet-500"
            >
              Register to continue
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

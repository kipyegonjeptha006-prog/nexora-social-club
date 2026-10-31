
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";

type ClubEvent = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  description: string;
  status: "Pending" | "Confirmed";
};

const STORAGE_KEY = "nexora_admin_events";

export default function AdminDashboard() {
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const emptyForm = {
    title: "",
    date: "",
    time: "",
    location: "",
    price: "",
    description: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setEvents(JSON.parse(saved));
    } catch {
      setMessage("Unable to load saved events.");
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    }
  }, [events, loaded]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.title.trim() || !form.date || !form.location.trim()) {
      setMessage("Please complete the required event details.");
      return;
    }

    if (editingId !== null) {
      setEvents((previous) =>
        previous.map((event) =>
          event.id === editingId ? { ...event, ...form } : event
        )
      );
      setMessage("Event updated successfully.");
      setEditingId(null);
    } else {
      const newEvent: ClubEvent = {
        id: Date.now(),
        ...form,
        status: "Pending",
      };

      setEvents((previous) => [newEvent, ...previous]);
      setMessage("New event added and is awaiting confirmation.");
    }

    setForm(emptyForm);
  }

  function confirmEvent(id: number) {
    setEvents((previous) =>
      previous.map((event) =>
        event.id === id ? { ...event, status: "Confirmed" } : event
      )
    );
    setMessage("Event confirmed.");
  }

  function rejectEvent(id: number) {
    if (!window.confirm("Are you sure you want to remove this event?")) return;
    setEvents((previous) => previous.filter((event) => event.id !== id));
    setMessage("Event removed.");
  }

  function editEvent(event: ClubEvent) {
    setEditingId(event.id);
    setForm({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      price: event.price,
      description: event.description,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  const pending = events.filter((event) => event.status === "Pending");
  const confirmed = events.filter((event) => event.status === "Confirmed");

  return (
    <main className="min-h-screen bg-[#090713] text-white">
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-[#100c1c] p-6 lg:block">
        <Link href="/" className="text-2xl font-black">
          NEXORA<span className="text-violet-400">.</span>
        </Link>

        <p className="mt-2 text-xs uppercase tracking-widest text-gray-500">
          Administration
        </p>

        <nav className="mt-12 space-y-3">
          <a href="#overview" className="block rounded-xl bg-violet-600/20 px-4 py-3 text-violet-300">
            ▦ Overview
          </a>
          <a href="#add-event" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white">
            ＋ Add Event
          </a>
          <a href="#pending" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white">
            ◷ Pending Events
          </a>
          <a href="#confirmed" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white">
            ✓ Confirmed Events
          </a>
        </nav>

        <Link href="/" className="absolute bottom-8 left-6 text-sm text-gray-400 hover:text-white">
          ← Back to Website
        </Link>
      </aside>

      <div className="lg:ml-64">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-6 md:px-10">
          <div>
            <p className="text-sm text-violet-400">NEXORA MANAGEMENT</p>
            <h1 className="mt-1 text-2xl font-black md:text-3xl">
              Admin Dashboard
            </h1>
          </div>
          <Link href="/" className="rounded-xl border border-white/15 px-4 py-3 text-sm hover:bg-white/10">
            View Website ↗
          </Link>
        </header>

        <div className="space-y-10 p-6 md:p-10">
          <section id="overview">
            <h2 className="text-xl font-bold">Overview</h2>
            <p className="mt-2 text-sm text-gray-400">
              Manage Nexora Social Club events from one place.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-[#151020] p-6">
                <p className="text-sm text-gray-400">Total Events</p>
                <p className="mt-3 text-4xl font-black">{events.length}</p>
              </div>
              <div className="rounded-2xl border border-yellow-500/20 bg-[#151020] p-6">
                <p className="text-sm text-gray-400">Pending Confirmation</p>
                <p className="mt-3 text-4xl font-black text-yellow-400">{pending.length}</p>
              </div>
              <div className="rounded-2xl border border-green-500/20 bg-[#151020] p-6">
                <p className="text-sm text-gray-400">Confirmed Events</p>
                <p className="mt-3 text-4xl font-black text-green-400">{confirmed.length}</p>
              </div>
            </div>
          </section>

          <section id="add-event" className="rounded-2xl border border-white/10 bg-[#151020] p-6 md:p-8">
            <h2 className="text-xl font-bold">
              {editingId !== null ? "Edit Event" : "＋ Add New Event"}
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Enter the details of the event you want to publish.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-300">Event Name *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Nexora Networking Night"
                  className="w-full rounded-xl border border-white/10 bg-[#0c0915] p-4 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">Event Date *</label>
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0c0915] p-4 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">Event Time</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0c0915] p-4 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">Location *</label>
                <input
                  required
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. Nairobi, Kenya"
                  className="w-full rounded-xl border border-white/10 bg-[#0c0915] p-4 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">Ticket Price</label>
                <input
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="e.g. KSh 500 or Free"
                  className="w-full rounded-xl border border-white/10 bg-[#0c0915] p-4 outline-none focus:border-violet-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-gray-300">Event Description</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe what members can expect..."
                  className="w-full rounded-xl border border-white/10 bg-[#0c0915] p-4 outline-none focus:border-violet-500"
                />
              </div>

              <div className="flex flex-wrap gap-3 md:col-span-2">
                <button
                  type="submit"
                  className="rounded-xl bg-violet-600 px-7 py-4 font-bold hover:bg-violet-500"
                >
                  {editingId !== null ? "Save Changes" : "Add Event"}
                </button>

                {editingId !== null && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="rounded-xl border border-white/15 px-7 py-4 font-semibold hover:bg-white/10"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {message && (
              <p className="mt-5 rounded-xl bg-violet-500/10 p-4 text-sm text-violet-300">
                {message}
              </p>
            )}
          </section>

          <section id="pending">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">Pending Events</h2>
                <p className="mt-1 text-sm text-gray-400">Review events before confirmation.</p>
              </div>
              <span className="rounded-full bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400">
                {pending.length} awaiting review
              </span>
            </div>

            {pending.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#151020] p-8 text-center text-gray-500">
                No pending events.
              </div>
            ) : (
              <div className="space-y-4">
                {pending.map((event) => (
                  <div key={event.id} className="rounded-2xl border border-white/10 bg-[#151020] p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold">{event.title}</h3>
                        <p className="mt-2 text-sm text-gray-400">
                          {event.date} · {event.time || "Time not set"} · {event.location}
                        </p>
                        <p className="mt-2 text-sm text-gray-400">
                          {event.description}
                        </p>
                        <p className="mt-3 text-sm text-violet-300">
                          Ticket: {event.price || "Not specified"}
                        </p>
                      </div>
                      <span className="rounded-full bg-yellow-500/10 px-3 py-2 text-xs text-yellow-400">
                        Pending
                      </span>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button onClick={() => confirmEvent(event.id)} className="rounded-lg bg-green-600 px-5 py-3 text-sm font-bold hover:bg-green-500">
                        ✓ Confirm Event
                      </button>
                      <button onClick={() => editEvent(event)} className="rounded-lg border border-white/15 px-5 py-3 text-sm hover:bg-white/10">
                        Edit
                      </button>
                      <button onClick={() => rejectEvent(event.id)} className="rounded-lg border border-red-500/30 px-5 py-3 text-sm text-red-400 hover:bg-red-500/10">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section id="confirmed">
            <div className="mb-5">
              <h2 className="text-xl font-bold">Confirmed Events</h2>
              <p className="mt-1 text-sm text-gray-400">Events approved by the administrator.</p>
            </div>

            {confirmed.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#151020] p-8 text-center text-gray-500">
                No confirmed events yet.
              </div>
            ) : (
              <div className="space-y-4">
                {confirmed.map((event) => (
                  <div key={event.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-green-500/20 bg-[#151020] p-6">
                    <div>
                      <h3 className="font-bold">{event.title}</h3>
                      <p className="mt-2 text-sm text-gray-400">
                        {event.date} · {event.location} · {event.price || "Price not set"}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-green-500/10 px-3 py-2 text-xs text-green-400">
                        ✓ Confirmed
                      </span>
                      <button onClick={() => editEvent(event)} className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/10">
                        Edit
                      </button>
                      <button onClick={() => rejectEvent(event.id)} className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <footer className="border-t border-white/10 py-6 text-center text-xs text-gray-600">
            Nexora Social Club · Administration
          </footer>
        </div>
      </div>
    </main>
  );
}

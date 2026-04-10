import Link from "next/link";
import type { SpeakingEvent } from "@/lib/data";
import SortableSpeakingList from "./SortableSpeakingList";

export const dynamic = "force-dynamic";

async function fetchSpeaking(): Promise<SpeakingEvent[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/speaking`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function AdminSpeakingPage() {
  const events = await fetchSpeaking();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start gap-3 sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-[10px] font-semibold tracking-widest text-red-500/70 uppercase">
            Admin
          </p>
          <h1 className="text-xl font-bold text-white sm:text-2xl">Speaking</h1>
          <p className="mt-0.5 text-xs text-gray-600">{events.length} event terdaftar</p>
        </div>
        <Link
          href="/admin/speaking/new"
          className="flex items-center gap-2 rounded bg-red-900 px-3 py-2 text-sm font-medium text-white shadow-lg shadow-red-950/30 transition-all hover:bg-red-800 sm:px-4"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span className="hidden sm:inline">Tambah Event</span>
          <span className="sm:hidden">Tambah</span>
        </Link>
      </div>
      <div className="mb-4 h-px bg-linear-to-r from-red-900/20 via-white/5 to-transparent" />
      <p className="mb-4 flex items-center gap-2 text-xs text-gray-700">
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
        Drag untuk mengubah urutan tampilan di website
      </p>
      <SortableSpeakingList initialEvents={events} />
    </div>
  );
}

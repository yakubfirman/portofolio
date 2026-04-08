import Link from "next/link";
import type { SpeakingEvent } from "@/lib/data";
import SortableSpeakingList from "./SortableSpeakingList";

export const dynamic = "force-dynamic";

async function fetchSpeaking(): Promise<SpeakingEvent[]> {
  const res = await fetch(`${process.env.API_URL}/api/speaking`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function AdminSpeakingPage() {
  const events = await fetchSpeaking();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Speaking ({events.length})</h1>
        <Link
          href="/admin/speaking/new"
          className="rounded bg-red-900 px-4 py-2 text-sm text-white transition-colors hover:bg-red-800"
        >
          + Tambah Event
        </Link>
      </div>
      <p className="mb-3 text-xs text-gray-600">Drag ⠿ untuk mengubah urutan tampilan.</p>
      <SortableSpeakingList initialEvents={events} />
    </div>
  );
}

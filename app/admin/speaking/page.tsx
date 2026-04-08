import Link from "next/link";
import type { SpeakingEvent } from "@/lib/data";
import DeleteSpeakingButton from "./DeleteSpeakingButton";

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
      <div className="space-y-3">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="flex items-center justify-between gap-4 rounded border border-white/5 bg-[#0f0f0f] p-4"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{ev.title}</p>
              <p className="mt-0.5 text-xs text-gray-500">
                {ev.event} — {ev.date}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/admin/speaking/${ev.id}`}
                className="rounded border border-white/10 px-3 py-1.5 text-sm text-gray-400 transition-colors hover:text-white"
              >
                Edit
              </Link>
              <DeleteSpeakingButton id={ev.id!} title={ev.title} />
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-600">Belum ada speaking event.</p>
        )}
      </div>
    </div>
  );
}

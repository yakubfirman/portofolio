"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createSpeaking, updateSpeaking } from "@/app/admin/actions";
import type { SpeakingEvent } from "@/lib/data";

type Props = { initialData?: SpeakingEvent };

const inputCls =
  "w-full bg-[#0a0a0a] border border-white/8 rounded px-3 py-2.5 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-800/60 focus:bg-[#0d0d0d] transition-all";
const labelCls = "block text-[11px] font-medium text-gray-500 mb-1.5 tracking-wide uppercase";

export default function SpeakingForm({ initialData }: Props) {
  const isEdit = !!initialData;
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [event, setEvent] = useState(initialData?.event ?? "");
  const [organizer, setOrganizer] = useState(initialData?.organizer ?? "");
  const [date, setDate] = useState(initialData?.date ?? "");
  const [location, setLocation] = useState(initialData?.location ?? "");
  const [topics, setTopics] = useState(initialData?.topics.join(", ") ?? "");
  const [url, setUrl] = useState(initialData?.url ?? "");
  const [audience, setAudience] = useState(initialData?.audience ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const data = {
      title: title.trim(),
      event: event.trim(),
      organizer: organizer.trim(),
      date: date.trim(),
      location: location.trim(),
      topics: topics
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      url: url.trim(),
      audience: audience.trim(),
    };
    startTransition(async () => {
      try {
        if (isEdit) {
          await updateSpeaking(initialData!.id!, data);
        } else {
          await createSpeaking(data);
        }
        router.push("/admin/speaking");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="space-y-5 rounded border border-white/5 bg-[#0d0d0d] p-6">
        <div>
          <label className={labelCls}>Judul Talk *</label>
          <input
            className={inputCls}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelCls}>Nama Event *</label>
          <input
            className={inputCls}
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Penyelenggara</label>
            <input
              className={inputCls}
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Tanggal</label>
            <input
              className={inputCls}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Oktober 2024"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Lokasi</label>
            <input
              className={inputCls}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Audiens</label>
            <input
              className={inputCls}
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="~200 peserta"
            />
          </div>
        </div>
        <div>
          <label className={labelCls}>Topik (pisah koma — Next.js, Web Development)</label>
          <input
            className={inputCls}
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            placeholder="Next.js, Web Development, ..."
          />
        </div>
        <div>
          <label className={labelCls}>URL / Link</label>
          <input
            className={inputCls}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
        {error && (
          <div className="flex items-center gap-2 rounded border border-red-900/30 bg-red-950/20 px-3 py-2">
            <svg
              className="h-3.5 w-3.5 shrink-0 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-xs text-red-400">{error}</p>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="flex items-center gap-2 rounded bg-red-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-red-950/30 transition-all hover:bg-red-800 disabled:opacity-50"
        >
          {pending ? (
            <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : (
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          )}
          {pending ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Event"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-1.5 rounded border border-white/10 px-4 py-2.5 text-sm text-gray-500 transition-colors hover:border-white/20 hover:text-white"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Batal
        </button>
      </div>
    </form>
  );
}

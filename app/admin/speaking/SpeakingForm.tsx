"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createSpeaking, updateSpeaking } from "@/app/admin/actions";
import type { SpeakingEvent } from "@/lib/data";

type Props = { initialData?: SpeakingEvent };

const inputCls =
  "w-full bg-[#0f0f0f] border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-800 transition-colors";
const labelCls = "block text-xs text-gray-500 mb-1";

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
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
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
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-red-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-red-800 disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Event"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-gray-500 transition-colors hover:text-white"
        >
          Batal
        </button>
      </div>
    </form>
  );
}

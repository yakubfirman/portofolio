"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateAbout } from "@/app/admin/actions";

type MetaItem = { icon_key: string; text: string };
type EduItem = { icon_key: string; degree: string; school: string; year: string; note: string | null };
type HighlightItem = { value: string; label: string };
type AboutData = {
  meta: MetaItem[];
  education: EduItem[];
  highlights: HighlightItem[];
  focus_tags: string[];
};

const inputCls =
  "w-full bg-[#0a0a0a] border border-white/8 rounded px-3 py-2 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-800/60 transition-all";
const labelCls =
  "block text-[11px] font-medium text-gray-500 mb-1 tracking-wide uppercase";
const sectionTitle =
  "text-sm font-semibold text-gray-300 mb-3";

const META_ICONS = ["faLocationDot", "faBriefcase", "faCode", "faGraduationCap"];
const EDU_ICONS = ["faGraduationCap", "faSchool"];

export default function AboutForm({ initialData }: { initialData: AboutData }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [meta, setMeta] = useState<MetaItem[]>(initialData.meta);
  const [education, setEducation] = useState<EduItem[]>(initialData.education);
  const [highlights, setHighlights] = useState<HighlightItem[]>(initialData.highlights);
  const [focusTags, setFocusTags] = useState(initialData.focus_tags.join(", "));

  // ── Meta helpers ──────────────────────────────────────────────────────────
  function setMetaField(i: number, field: keyof MetaItem, value: string) {
    setMeta((prev) => prev.map((m, idx) => (idx === i ? { ...m, [field]: value } : m)));
  }
  function addMeta() {
    setMeta((prev) => [...prev, { icon_key: "faBriefcase", text: "" }]);
  }
  function removeMeta(i: number) {
    setMeta((prev) => prev.filter((_, idx) => idx !== i));
  }

  // ── Education helpers ─────────────────────────────────────────────────────
  function setEduField(i: number, field: keyof EduItem, value: string | null) {
    setEducation((prev) =>
      prev.map((e, idx) => (idx === i ? { ...e, [field]: value } : e))
    );
  }
  function addEdu() {
    setEducation((prev) => [
      ...prev,
      { icon_key: "faGraduationCap", degree: "", school: "", year: "", note: null },
    ]);
  }
  function removeEdu(i: number) {
    setEducation((prev) => prev.filter((_, idx) => idx !== i));
  }

  // ── Highlights helpers ────────────────────────────────────────────────────
  function setHighlightField(i: number, field: keyof HighlightItem, value: string) {
    setHighlights((prev) =>
      prev.map((h, idx) => (idx === i ? { ...h, [field]: value } : h))
    );
  }
  function addHighlight() {
    setHighlights((prev) => [...prev, { value: "", label: "" }]);
  }
  function removeHighlight(i: number) {
    setHighlights((prev) => prev.filter((_, idx) => idx !== i));
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    startTransition(async () => {
      try {
        await updateAbout({
          meta,
          education,
          highlights,
          focus_tags: focusTags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        });
        setSuccess(true);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {/* Meta (lokasi, status, dll) */}
      <div className="rounded border border-white/5 bg-[#0d0d0d] p-4 sm:p-5">
        <p className={sectionTitle}>Info Meta</p>
        <div className="space-y-3">
          {meta.map((m, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="w-36 shrink-0">
                {i === 0 && <label className={labelCls}>Icon</label>}
                <select
                  className={inputCls}
                  value={m.icon_key}
                  onChange={(e) => setMetaField(i, "icon_key", e.target.value)}
                >
                  {META_ICONS.map((k) => <option key={k} value={k}>{k}</option>)}
                  {!META_ICONS.includes(m.icon_key) && (
                    <option value={m.icon_key}>{m.icon_key}</option>
                  )}
                </select>
              </div>
              <div className="flex-1">
                {i === 0 && <label className={labelCls}>Teks</label>}
                <input
                  className={inputCls}
                  value={m.text}
                  onChange={(e) => setMetaField(i, "text", e.target.value)}
                  placeholder="Surakarta, Jawa Tengah"
                />
              </div>
              <button
                type="button"
                onClick={() => removeMeta(i)}
                className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded border border-white/8 text-gray-600 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addMeta}
          className="mt-3 flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-400"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Tambah baris
        </button>
      </div>

      {/* Education */}
      <div className="rounded border border-white/5 bg-[#0d0d0d] p-4 sm:p-5">
        <p className={sectionTitle}>Pendidikan</p>
        <div className="space-y-4">
          {education.map((e, i) => (
            <div key={i} className="rounded border border-white/5 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-gray-600">#{i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeEdu(i)}
                  className="text-xs text-gray-700 hover:text-red-500"
                >
                  Hapus
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Icon</label>
                  <select
                    className={inputCls}
                    value={e.icon_key}
                    onChange={(ev) => setEduField(i, "icon_key", ev.target.value)}
                  >
                    {EDU_ICONS.map((k) => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Gelar / Program</label>
                  <input className={inputCls} value={e.degree} onChange={(ev) => setEduField(i, "degree", ev.target.value)} placeholder="S1 Teknik Informatika" />
                </div>
                <div>
                  <label className={labelCls}>Sekolah / Universitas</label>
                  <input className={inputCls} value={e.school} onChange={(ev) => setEduField(i, "school", ev.target.value)} placeholder="Universitas Muhammadiyah Surakarta" />
                </div>
                <div>
                  <label className={labelCls}>Tahun</label>
                  <input className={inputCls} value={e.year} onChange={(ev) => setEduField(i, "year", ev.target.value)} placeholder="2026" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Catatan (opsional)</label>
                  <input className={inputCls} value={e.note ?? ""} onChange={(ev) => setEduField(i, "note", ev.target.value || null)} placeholder="IPK 3.63" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addEdu}
          className="mt-3 flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-400"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Tambah pendidikan
        </button>
      </div>

      {/* Highlights (2+, 14+, 100%) */}
      <div className="rounded border border-white/5 bg-[#0d0d0d] p-4 sm:p-5">
        <p className={sectionTitle}>Highlight Statistik</p>
        <div className="space-y-3">
          {highlights.map((h, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="w-24 shrink-0">
                {i === 0 && <label className={labelCls}>Nilai</label>}
                <input className={inputCls} value={h.value} onChange={(e) => setHighlightField(i, "value", e.target.value)} placeholder="2+" />
              </div>
              <div className="flex-1">
                {i === 0 && <label className={labelCls}>Label</label>}
                <input className={inputCls} value={h.label} onChange={(e) => setHighlightField(i, "label", e.target.value)} placeholder="Tahun Pengalaman" />
              </div>
              <button
                type="button"
                onClick={() => removeHighlight(i)}
                className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded border border-white/8 text-gray-600 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addHighlight}
          className="mt-3 flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-400"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Tambah highlight
        </button>
      </div>

      {/* Focus tags */}
      <div className="rounded border border-white/5 bg-[#0d0d0d] p-4 sm:p-5">
        <p className={sectionTitle}>Tag Fokus Teknologi</p>
        <input
          className={inputCls}
          value={focusTags}
          onChange={(e) => setFocusTags(e.target.value)}
          placeholder="React / Next.js, Laravel, Tailwind CSS, SEO & GSC"
        />
        <p className="mt-1.5 text-[10px] text-gray-700">Pisahkan dengan koma</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded border border-red-900/30 bg-red-950/20 px-3 py-2">
          <svg className="h-3.5 w-3.5 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-red-400">{error}</p>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 rounded border border-green-900/30 bg-green-950/20 px-3 py-2">
          <svg className="h-3.5 w-3.5 shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-green-400">About berhasil disimpan!</p>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex items-center gap-2 rounded bg-red-900 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-red-950/30 transition-all hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Menyimpan..." : "Simpan Semua"}
      </button>
    </form>
  );
}

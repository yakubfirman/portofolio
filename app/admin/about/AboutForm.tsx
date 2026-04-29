"use client";

import { useState, useTransition } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { updateAbout } from "@/app/admin/actions";

// ── Types ──────────────────────────────────────────────────────────────────

type MetaItem = { _id: string; icon_key: string; text: string };
type EduItem = {
  _id: string;
  icon_key: string;
  degree: string;
  school: string;
  year: string;
  note: string | null;
};
type HighlightItem = { _id: string; value: string; label: string };
type AboutData = {
  meta: Omit<MetaItem, "_id">[];
  education: Omit<EduItem, "_id">[];
  highlights: Omit<HighlightItem, "_id">[];
  focus_tags: string[];
};

// ── Helpers ────────────────────────────────────────────────────────────────

let _ctr = 0;
function uid() { return `id-${++_ctr}-${Math.random().toString(36).slice(2)}`; }
function withId<T extends object>(arr: T[]): (T & { _id: string })[] {
  return arr.map((x) => ({ ...x, _id: uid() }));
}

const META_ICONS = [
  "faLocationDot",
  "faBriefcase",
  "faCode",
  "faGraduationCap",
  "faEnvelope",
  "faGlobe",
];
const EDU_ICONS = ["faGraduationCap", "faSchool", "faUniversity"];

// ── Shared styles ─────────────────────────────────────────────────────────

const inp =
  "w-full bg-[#0a0a0a] border border-white/8 rounded px-3 py-2 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-800/60 transition-all";
const lbl = "block text-[11px] font-medium text-gray-500 mb-1 tracking-wide uppercase";

// ── Drag handle ───────────────────────────────────────────────────────────

function DragHandle(props: Record<string, unknown>) {
  return (
    <button
      type="button"
      {...props}
      className="cursor-grab touch-none text-gray-700 hover:text-gray-500 active:cursor-grabbing shrink-0"
      aria-label="Drag to reorder"
    >
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
        <circle cx="5" cy="4" r="1.2" />
        <circle cx="5" cy="8" r="1.2" />
        <circle cx="5" cy="12" r="1.2" />
        <circle cx="11" cy="4" r="1.2" />
        <circle cx="11" cy="8" r="1.2" />
        <circle cx="11" cy="12" r="1.2" />
      </svg>
    </button>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded border border-white/5 bg-[#0d0d0d] p-4 sm:p-5">
      <p className="mb-3 text-sm font-semibold text-gray-300">{title}</p>
      {children}
    </div>
  );
}

// ── Add button ────────────────────────────────────────────────────────────

function AddBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-400 transition-colors"
    >
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      {label}
    </button>
  );
}

// ── Sortable DnD wrapper ──────────────────────────────────────────────────

function SortableList({
  ids,
  onDragEnd,
  children,
}: {
  ids: string[];
  onDragEnd: (e: DragEndEvent) => void;
  children: ReactNode;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">{children}</div>
      </SortableContext>
    </DndContext>
  );
}

// ── Meta row (inline sortable) ────────────────────────────────────────────

function MetaRow({
  item,
  onChange,
  onRemove,
}: {
  item: MetaItem;
  onChange: (updated: MetaItem) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item._id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className="flex items-center gap-2 rounded border border-white/5 bg-[#0a0a0a] px-2 py-2"
    >
      <DragHandle {...attributes} {...listeners} />
      <select
        className="w-36 shrink-0 bg-[#0a0a0a] border border-white/8 rounded px-2 py-1.5 text-white text-xs focus:outline-none focus:border-red-800/60"
        value={item.icon_key}
        onChange={(e) => onChange({ ...item, icon_key: e.target.value })}
      >
        {META_ICONS.map((k) => (
          <option key={k} value={k}>{k}</option>
        ))}
        {!META_ICONS.includes(item.icon_key) && (
          <option value={item.icon_key}>{item.icon_key}</option>
        )}
      </select>
      <input
        className={`flex-1 bg-[#0a0a0a] border border-white/8 rounded px-3 py-2 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-800/60 transition-all`}
        value={item.text}
        onChange={(e) => onChange({ ...item, text: e.target.value })}
        placeholder="Surakarta, Jawa Tengah"
      />
      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 px-1 text-gray-700 hover:text-red-500 transition-colors"
      >
        ✕
      </button>
    </div>
  );
}

// ── Education card (collapsible sortable) ─────────────────────────────────

function EduCard({
  item,
  onChange,
  onRemove,
}: {
  item: EduItem;
  onChange: (updated: EduItem) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(!item.degree);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item._id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className="overflow-hidden rounded border border-white/5 bg-[#0a0a0a]"
    >
      <div className="flex items-center gap-2 px-3 py-2.5">
        <DragHandle {...attributes} {...listeners} />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="min-w-0 flex-1 text-left"
        >
          <p className="truncate text-sm text-gray-200">
            {item.degree || <span className="italic text-gray-600">Pendidikan baru</span>}
          </p>
          {(item.school || item.year) && (
            <p className="truncate text-xs text-gray-600">
              {[item.school, item.year].filter(Boolean).join(" · ")}
            </p>
          )}
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="shrink-0 rounded px-2 py-1 text-xs text-gray-600 hover:text-gray-300 transition-colors"
        >
          {open ? "↑" : "↓"}
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 px-1 text-gray-700 hover:text-red-500 transition-colors"
        >
          ✕
        </button>
      </div>
      {open && (
        <div className="grid grid-cols-1 gap-3 border-t border-white/5 p-3 sm:grid-cols-2">
          <div>
            <label className={lbl}>Icon</label>
            <select
              className={inp}
              value={item.icon_key}
              onChange={(e) => onChange({ ...item, icon_key: e.target.value })}
            >
              {EDU_ICONS.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
              {!EDU_ICONS.includes(item.icon_key) && (
                <option value={item.icon_key}>{item.icon_key}</option>
              )}
            </select>
          </div>
          <div>
            <label className={lbl}>Gelar / Program</label>
            <input
              className={inp}
              value={item.degree}
              onChange={(e) => onChange({ ...item, degree: e.target.value })}
              placeholder="S1 Teknik Informatika"
            />
          </div>
          <div>
            <label className={lbl}>Sekolah / Universitas</label>
            <input
              className={inp}
              value={item.school}
              onChange={(e) => onChange({ ...item, school: e.target.value })}
              placeholder="Universitas Muhammadiyah Surakarta"
            />
          </div>
          <div>
            <label className={lbl}>Tahun Lulus</label>
            <input
              className={inp}
              value={item.year}
              onChange={(e) => onChange({ ...item, year: e.target.value })}
              placeholder="2026"
            />
          </div>
          <div className="sm:col-span-2">
            <label className={lbl}>Catatan (opsional)</label>
            <input
              className={inp}
              value={item.note ?? ""}
              onChange={(e) => onChange({ ...item, note: e.target.value || null })}
              placeholder="IPK 3.63"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Highlight row (inline sortable) ──────────────────────────────────────

function HighlightRow({
  item,
  onChange,
  onRemove,
}: {
  item: HighlightItem;
  onChange: (updated: HighlightItem) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item._id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className="flex items-center gap-2 rounded border border-white/5 bg-[#0a0a0a] px-2 py-2"
    >
      <DragHandle {...attributes} {...listeners} />
      <input
        className="w-24 shrink-0 bg-[#0a0a0a] border border-white/8 rounded px-2 py-1.5 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-800/60 transition-all"
        value={item.value}
        onChange={(e) => onChange({ ...item, value: e.target.value })}
        placeholder="2+"
      />
      <input
        className="flex-1 bg-[#0a0a0a] border border-white/8 rounded px-3 py-2 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-800/60 transition-all"
        value={item.label}
        onChange={(e) => onChange({ ...item, label: e.target.value })}
        placeholder="Tahun Pengalaman"
      />
      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 px-1 text-gray-700 hover:text-red-500 transition-colors"
      >
        ✕
      </button>
    </div>
  );
}

// ── Main form ─────────────────────────────────────────────────────────────

export default function AboutForm({ initialData }: { initialData: AboutData }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [meta, setMeta] = useState<MetaItem[]>(() => withId(initialData.meta));
  const [education, setEducation] = useState<EduItem[]>(() => withId(initialData.education));
  const [highlights, setHighlights] = useState<HighlightItem[]>(() => withId(initialData.highlights));
  const [focusTags, setFocusTags] = useState(initialData.focus_tags.join(", "));

  // ── DnD handlers ──────────────────────────────────────────────────────────
  function handleMetaDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setMeta((prev) => {
        const from = prev.findIndex((x) => x._id === String(active.id));
        const to = prev.findIndex((x) => x._id === String(over.id));
        return arrayMove(prev, from, to);
      });
    }
  }

  function handleEduDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setEducation((prev) => {
        const from = prev.findIndex((x) => x._id === String(active.id));
        const to = prev.findIndex((x) => x._id === String(over.id));
        return arrayMove(prev, from, to);
      });
    }
  }

  function handleHighlightDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setHighlights((prev) => {
        const from = prev.findIndex((x) => x._id === String(active.id));
        const to = prev.findIndex((x) => x._id === String(over.id));
        return arrayMove(prev, from, to);
      });
    }
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    startTransition(async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = await updateAbout({
          meta: meta.map(({ _id, ...rest }) => rest),
          education: education.map(({ _id, ...rest }) => rest),
          highlights: highlights.map(({ _id, ...rest }) => rest),
          focus_tags: focusTags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        });
        if (result?.error) {
          setError(result.error);
        } else {
          setSuccess(true);
          router.refresh();
        }
      } catch {
        setError("Terjadi kesalahan tidak terduga");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">

      {/* ── Info Meta ── */}
      <Section title="Info Meta">
        <SortableList ids={meta.map((m) => m._id)} onDragEnd={handleMetaDragEnd}>
          {meta.map((m) => (
            <MetaRow
              key={m._id}
              item={m}
              onChange={(updated) =>
                setMeta((prev) => prev.map((x) => (x._id === m._id ? updated : x)))
              }
              onRemove={() => setMeta((prev) => prev.filter((x) => x._id !== m._id))}
            />
          ))}
        </SortableList>
        <AddBtn
          onClick={() =>
            setMeta((prev) => [...prev, { _id: uid(), icon_key: "faBriefcase", text: "" }])
          }
          label="Tambah baris"
        />
      </Section>

      {/* ── Pendidikan ── */}
      <Section title="Pendidikan">
        <SortableList ids={education.map((e) => e._id)} onDragEnd={handleEduDragEnd}>
          {education.map((e) => (
            <EduCard
              key={e._id}
              item={e}
              onChange={(updated) =>
                setEducation((prev) => prev.map((x) => (x._id === e._id ? updated : x)))
              }
              onRemove={() => setEducation((prev) => prev.filter((x) => x._id !== e._id))}
            />
          ))}
        </SortableList>
        <AddBtn
          onClick={() =>
            setEducation((prev) => [
              ...prev,
              { _id: uid(), icon_key: "faGraduationCap", degree: "", school: "", year: "", note: null },
            ])
          }
          label="Tambah pendidikan"
        />
      </Section>

      {/* ── Highlight Statistik ── */}
      <Section title="Highlight Statistik">
        <SortableList ids={highlights.map((h) => h._id)} onDragEnd={handleHighlightDragEnd}>
          {highlights.map((h) => (
            <HighlightRow
              key={h._id}
              item={h}
              onChange={(updated) =>
                setHighlights((prev) => prev.map((x) => (x._id === h._id ? updated : x)))
              }
              onRemove={() => setHighlights((prev) => prev.filter((x) => x._id !== h._id))}
            />
          ))}
        </SortableList>
        <AddBtn
          onClick={() =>
            setHighlights((prev) => [...prev, { _id: uid(), value: "", label: "" }])
          }
          label="Tambah highlight"
        />
      </Section>

      {/* ── Tag Fokus Teknologi ── */}
      <Section title="Tag Fokus Teknologi">
        <input
          className={inp}
          value={focusTags}
          onChange={(e) => setFocusTags(e.target.value)}
          placeholder="React / Next.js, Laravel, Tailwind CSS, SEO & GSC"
        />
        <p className="mt-1.5 text-[10px] text-gray-700">Pisahkan dengan koma</p>
      </Section>

      {error && (
        <p className="rounded border border-red-900/40 bg-red-950/20 px-3 py-2 text-xs text-red-400">
          {error}
        </p>
      )}
      {success && (
        <p className="rounded border border-green-900/40 bg-green-950/20 px-3 py-2 text-xs text-green-400">
          Data berhasil disimpan.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded bg-red-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
    </form>
  );
}

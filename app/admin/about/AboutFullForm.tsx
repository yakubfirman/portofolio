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
import { updateAboutFull } from "@/app/admin/actions";

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type Experience = {
  _id: string;
  company: string;
  role: string;
  period_start: string;
  period_end: string | null;
  description: string | null;
  employment_type: string;
};
type Organization = {
  _id: string;
  name: string;
  role: string;
  period_start: string;
  period_end: string | null;
  description: string | null;
};
type Certificate = {
  _id: string;
  name: string;
  issuer: string;
  issued_date: string;
  credential_url: string | null;
};
type FullData = {
  birthdate: string | null;
  experiences: Omit<Experience, "_id">[];
  organizations: Omit<Organization, "_id">[];
  certificates: Omit<Certificate, "_id">[];
};

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

let _ctr = 0;
function uid() { return `id-${++_ctr}-${Math.random().toString(36).slice(2)}`; }
function withId<T extends object>(arr: T[]): (T & { _id: string })[] {
  return arr.map((x) => ({ ...x, _id: uid() }));
}

const EMPLOYMENT_TYPES = [
  { value: "fulltime", label: "Full-time" },
  { value: "parttime", label: "Part-time" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Magang" },
  { value: "contract", label: "Kontrak" },
];
const EMP_LABEL: Record<string, string> = Object.fromEntries(
  EMPLOYMENT_TYPES.map((t) => [t.value, t.label])
);

// â”€â”€â”€ Shared styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const inp =
  "w-full bg-[#0a0a0a] border border-white/8 rounded px-3 py-2 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-800/60 transition-all";
const lbl = "block text-[11px] font-medium text-gray-500 mb-1 tracking-wide uppercase";

// â”€â”€â”€ Drag handle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€ Section wrapper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded border border-white/5 bg-[#0d0d0d] p-4 sm:p-5">
      <p className="mb-3 text-sm font-semibold text-gray-300">{title}</p>
      {children}
    </div>
  );
}

// â”€â”€â”€ Add button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€ Sortable DnD wrapper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€ Experience card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ExpCard({
  exp,
  onChange,
  onRemove,
}: {
  exp: Experience;
  onChange: (updated: Experience) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(!exp.company);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: exp._id });
  const f = (field: keyof Experience, val: string | null) => onChange({ ...exp, [field]: val });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className="overflow-hidden rounded border border-white/5 bg-[#0a0a0a]"
    >
      <div className="flex items-center gap-2 px-3 py-2.5">
        <DragHandle {...attributes} {...listeners} />
        <button type="button" onClick={() => setOpen((o) => !o)} className="min-w-0 flex-1 text-left">
          <p className="truncate text-sm text-gray-200">
            {exp.company || <span className="italic text-gray-600">Perusahaan baru</span>}
          </p>
          {(exp.role || exp.period_start) && (
            <p className="truncate text-xs text-gray-600">
              {[exp.role, EMP_LABEL[exp.employment_type]].filter(Boolean).join(" Â· ")}
              {exp.period_start && <> &middot; {exp.period_start}{exp.period_end ? `â€“${exp.period_end}` : "â€“skrg"}</>}
            </p>
          )}
        </button>
        <button type="button" onClick={() => setOpen((o) => !o)} className="shrink-0 rounded px-2 py-1 text-xs text-gray-600 hover:text-gray-300 transition-colors">
          {open ? "â†‘" : "â†“"}
        </button>
        <button type="button" onClick={onRemove} className="shrink-0 px-1 text-gray-700 hover:text-red-500 transition-colors">âœ•</button>
      </div>
      {open && (
        <div className="grid grid-cols-1 gap-3 border-t border-white/5 p-3 sm:grid-cols-2">
          <div><label className={lbl}>Perusahaan</label><input className={inp} value={exp.company} onChange={(e) => f("company", e.target.value)} placeholder="PT Contoh Indonesia" /></div>
          <div><label className={lbl}>Jabatan</label><input className={inp} value={exp.role} onChange={(e) => f("role", e.target.value)} placeholder="Full Stack Developer" /></div>
          <div><label className={lbl}>Mulai</label><input className={inp} value={exp.period_start} onChange={(e) => f("period_start", e.target.value)} placeholder="Jan 2023" /></div>
          <div><label className={lbl}>Selesai</label><input className={inp} value={exp.period_end ?? ""} onChange={(e) => f("period_end", e.target.value || null)} placeholder="Kosongkan jika masih" /></div>
          <div>
            <label className={lbl}>Tipe</label>
            <select className={inp} value={exp.employment_type} onChange={(e) => f("employment_type", e.target.value)}>
              {EMPLOYMENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2"><label className={lbl}>Deskripsi (opsional)</label><textarea className={`${inp} min-h-16 resize-y`} value={exp.description ?? ""} onChange={(e) => f("description", e.target.value || null)} rows={2} placeholder="Deskripsi pekerjaan..." /></div>
        </div>
      )}
    </div>
  );
}

// â”€â”€â”€ Organization card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function OrgCard({
  org,
  onChange,
  onRemove,
}: {
  org: Organization;
  onChange: (updated: Organization) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(!org.name);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: org._id });
  const f = (field: keyof Organization, val: string | null) => onChange({ ...org, [field]: val });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className="overflow-hidden rounded border border-white/5 bg-[#0a0a0a]"
    >
      <div className="flex items-center gap-2 px-3 py-2.5">
        <DragHandle {...attributes} {...listeners} />
        <button type="button" onClick={() => setOpen((o) => !o)} className="min-w-0 flex-1 text-left">
          <p className="truncate text-sm text-gray-200">{org.name || <span className="italic text-gray-600">Organisasi baru</span>}</p>
          {org.role && <p className="truncate text-xs text-gray-600">{org.role}{org.period_start && <> &middot; {org.period_start}{org.period_end ? `â€“${org.period_end}` : "â€“skrg"}</>}</p>}
        </button>
        <button type="button" onClick={() => setOpen((o) => !o)} className="shrink-0 rounded px-2 py-1 text-xs text-gray-600 hover:text-gray-300 transition-colors">{open ? "â†‘" : "â†“"}</button>
        <button type="button" onClick={onRemove} className="shrink-0 px-1 text-gray-700 hover:text-red-500 transition-colors">âœ•</button>
      </div>
      {open && (
        <div className="grid grid-cols-1 gap-3 border-t border-white/5 p-3 sm:grid-cols-2">
          <div><label className={lbl}>Nama Organisasi</label><input className={inp} value={org.name} onChange={(e) => f("name", e.target.value)} placeholder="Himpunan Mahasiswa" /></div>
          <div><label className={lbl}>Jabatan</label><input className={inp} value={org.role} onChange={(e) => f("role", e.target.value)} placeholder="Ketua Divisi IT" /></div>
          <div><label className={lbl}>Mulai</label><input className={inp} value={org.period_start} onChange={(e) => f("period_start", e.target.value)} placeholder="2022" /></div>
          <div><label className={lbl}>Selesai</label><input className={inp} value={org.period_end ?? ""} onChange={(e) => f("period_end", e.target.value || null)} placeholder="Kosongkan jika masih" /></div>
          <div className="sm:col-span-2"><label className={lbl}>Deskripsi (opsional)</label><textarea className={`${inp} min-h-16 resize-y`} value={org.description ?? ""} onChange={(e) => f("description", e.target.value || null)} rows={2} placeholder="Deskripsi peran..." /></div>
        </div>
      )}
    </div>
  );
}

// â”€â”€â”€ Certificate card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function CertCard({
  cert,
  onChange,
  onRemove,
}: {
  cert: Certificate;
  onChange: (updated: Certificate) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(!cert.name);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: cert._id });
  const f = (field: keyof Certificate, val: string | null) => onChange({ ...cert, [field]: val });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className="overflow-hidden rounded border border-white/5 bg-[#0a0a0a]"
    >
      <div className="flex items-center gap-2 px-3 py-2.5">
        <DragHandle {...attributes} {...listeners} />
        <button type="button" onClick={() => setOpen((o) => !o)} className="min-w-0 flex-1 text-left">
          <p className="truncate text-sm text-gray-200">{cert.name || <span className="italic text-gray-600">Sertifikat baru</span>}</p>
          {cert.issuer && <p className="truncate text-xs text-gray-600">{cert.issuer}{cert.issued_date ? ` Â· ${cert.issued_date}` : ""}</p>}
        </button>
        <button type="button" onClick={() => setOpen((o) => !o)} className="shrink-0 rounded px-2 py-1 text-xs text-gray-600 hover:text-gray-300 transition-colors">{open ? "â†‘" : "â†“"}</button>
        <button type="button" onClick={onRemove} className="shrink-0 px-1 text-gray-700 hover:text-red-500 transition-colors">âœ•</button>
      </div>
      {open && (
        <div className="grid grid-cols-1 gap-3 border-t border-white/5 p-3 sm:grid-cols-2">
          <div className="sm:col-span-2"><label className={lbl}>Nama Sertifikat</label><input className={inp} value={cert.name} onChange={(e) => f("name", e.target.value)} placeholder="Google Analytics Certification" /></div>
          <div><label className={lbl}>Penerbit</label><input className={inp} value={cert.issuer} onChange={(e) => f("issuer", e.target.value)} placeholder="Google" /></div>
          <div><label className={lbl}>Tanggal</label><input className={inp} value={cert.issued_date} onChange={(e) => f("issued_date", e.target.value)} placeholder="Jan 2024" /></div>
          <div className="sm:col-span-2"><label className={lbl}>URL Credential (opsional)</label><input className={inp} value={cert.credential_url ?? ""} onChange={(e) => f("credential_url", e.target.value || null)} placeholder="https://..." /></div>
        </div>
      )}
    </div>
  );
}

// â”€â”€â”€ Main form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function AboutFullForm({ initialData }: { initialData: FullData }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [birthdate, setBirthdate] = useState(initialData.birthdate ?? "");
  const [experiences, setExperiences] = useState<Experience[]>(() => withId(initialData.experiences));
  const [organizations, setOrganizations] = useState<Organization[]>(() => withId(initialData.organizations));
  const [certificates, setCertificates] = useState<Certificate[]>(() => withId(initialData.certificates));

  function makeDragEnd<T extends { _id: string }>(setter: React.Dispatch<React.SetStateAction<T[]>>) {
    return (e: DragEndEvent) => {
      if (!e.over || e.active.id === e.over.id) return;
      setter((prev) => {
        const from = prev.findIndex((x) => x._id === String(e.active.id));
        const to = prev.findIndex((x) => x._id === String(e.over!.id));
        return arrayMove(prev, from, to);
      });
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    startTransition(async () => {
      try {
        const result = await updateAboutFull({
          birthdate: birthdate || null,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          experiences: experiences.map(({ _id, ...rest }) => rest),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          organizations: organizations.map(({ _id, ...rest }) => rest),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          certificates: certificates.map(({ _id, ...rest }) => rest),
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
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {/* Tanggal Lahir */}
      <Section title="Informasi Pribadi">
        <label className={lbl}>Tanggal Lahir</label>
        <input type="date" className={inp} value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
        <p className="mt-1 text-[10px] text-gray-700">Usia dihitung otomatis dari tanggal ini.</p>
      </Section>

      {/* Pengalaman Kerja */}
      <Section title={`Pengalaman Kerja${experiences.length ? ` (${experiences.length})` : ""}`}>
        <SortableList ids={experiences.map((e) => e._id)} onDragEnd={makeDragEnd(setExperiences)}>
          {experiences.map((exp) => (
            <ExpCard
              key={exp._id}
              exp={exp}
              onChange={(updated) => setExperiences((prev) => prev.map((e) => (e._id === updated._id ? updated : e)))}
              onRemove={() => setExperiences((prev) => prev.filter((e) => e._id !== exp._id))}
            />
          ))}
        </SortableList>
        <AddBtn
          onClick={() => setExperiences((p) => [...p, { _id: uid(), company: "", role: "", period_start: "", period_end: null, description: null, employment_type: "fulltime" }])}
          label="Tambah pengalaman"
        />
      </Section>

      {/* Riwayat Organisasi */}
      <Section title={`Riwayat Organisasi${organizations.length ? ` (${organizations.length})` : ""}`}>
        <SortableList ids={organizations.map((o) => o._id)} onDragEnd={makeDragEnd(setOrganizations)}>
          {organizations.map((org) => (
            <OrgCard
              key={org._id}
              org={org}
              onChange={(updated) => setOrganizations((prev) => prev.map((o) => (o._id === updated._id ? updated : o)))}
              onRemove={() => setOrganizations((prev) => prev.filter((o) => o._id !== org._id))}
            />
          ))}
        </SortableList>
        <AddBtn
          onClick={() => setOrganizations((p) => [...p, { _id: uid(), name: "", role: "", period_start: "", period_end: null, description: null }])}
          label="Tambah organisasi"
        />
      </Section>

      {/* Sertifikat */}
      <Section title={`Sertifikat${certificates.length ? ` (${certificates.length})` : ""}`}>
        <SortableList ids={certificates.map((c) => c._id)} onDragEnd={makeDragEnd(setCertificates)}>
          {certificates.map((cert) => (
            <CertCard
              key={cert._id}
              cert={cert}
              onChange={(updated) => setCertificates((prev) => prev.map((c) => (c._id === updated._id ? updated : c)))}
              onRemove={() => setCertificates((prev) => prev.filter((c) => c._id !== cert._id))}
            />
          ))}
        </SortableList>
        <AddBtn
          onClick={() => setCertificates((p) => [...p, { _id: uid(), name: "", issuer: "", issued_date: "", credential_url: null }])}
          label="Tambah sertifikat"
        />
      </Section>

      {/* Feedback */}
      {error && <p className="rounded border border-red-900/30 bg-red-950/20 px-3 py-2 text-xs text-red-400">{error}</p>}
      {success && <p className="rounded border border-green-900/30 bg-green-950/20 px-3 py-2 text-xs text-green-400">Data berhasil disimpan.</p>}

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

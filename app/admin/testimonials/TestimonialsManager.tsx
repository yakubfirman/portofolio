"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateTestimonial, deleteTestimonial, reorderTestimonials } from "@/app/admin/actions";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company?: string;
  message: string;
  image?: string;
  approved: number;
  sort_order: number;
  created_at: string;
};

const inputCls =
  "w-full bg-[#0a0a0a] border border-white/8 rounded px-3 py-2.5 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-800/60 focus:bg-[#0d0d0d] transition-all";
const labelCls = "block text-[11px] font-medium text-gray-500 mb-1.5 tracking-wide uppercase";

function TestimonialRow({
  testimonial,
  onSaved,
  onDeleted,
}: {
  testimonial: Testimonial;
  onSaved: () => void;
  onDeleted: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState(testimonial.name);
  const [role, setRole] = useState(testimonial.role);
  const [company, setCompany] = useState(testimonial.company || "");
  const [message, setMessage] = useState(testimonial.message);
  const [image, setImage] = useState(testimonial.image || "");
  const [approved, setApproved] = useState(testimonial.approved === 1);
  const [error, setError] = useState("");

  function handleSave() {
    setError("");
    if (!name.trim() || !role.trim() || !message.trim()) {
      setError("Nama, peran, dan pesan harus diisi");
      return;
    }
    startTransition(async () => {
      try {
        await updateTestimonial(testimonial.id, {
          name,
          role,
          company,
          message,
          image,
          approved: approved ? 1 : 0,
        });
        setEditing(false);
        onSaved();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menyimpan");
      }
    });
  }

  function handleDelete() {
    if (!confirm(`Hapus testimoni dari "${name}"?`)) return;
    startTransition(async () => {
      try {
        await deleteTestimonial(testimonial.id);
        onDeleted();
      } catch {
        /* ignore */
      }
    });
  }

  if (editing) {
    return (
      <div className="rounded border border-white/8 bg-[#0d0d0d] p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Nama</label>
            <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Peran / Posisi</label>
            <input className={inputCls} value={role} onChange={(e) => setRole(e.target.value)} placeholder="Contoh: CEO, Developer" />
          </div>
          <div>
            <label className={labelCls}>Perusahaan / Organisasi (Opsional)</label>
            <input className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Nama perusahaan" />
          </div>
          <div>
            <label className={labelCls}>URL Foto Profil (Opsional)</label>
            <input className={inputCls} value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
          </div>
        </div>
        <div className="mt-3">
          <label className={labelCls}>Testimoni</label>
          <textarea
            className={inputCls + " min-h-[100px] resize-y font-mono text-xs"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tulis testimoni..."
          />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={approved}
              onChange={(e) => setApproved(e.target.checked)}
              className="accent-red-800"
            />
            <span className="text-sm text-gray-400">Setujui tampil di halaman</span>
          </label>
        </div>

        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleSave}
            disabled={pending}
            className="rounded bg-red-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-800 disabled:opacity-50"
          >
            {pending ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            onClick={() => setEditing(false)}
            className="rounded border border-white/8 px-3 py-1.5 text-xs text-gray-500 hover:text-white"
          >
            Batal
          </button>
          <button
            onClick={handleDelete}
            disabled={pending}
            className="ml-auto rounded border border-red-900/50 px-3 py-1.5 text-xs text-red-400 hover:bg-red-900/10 disabled:opacity-50"
          >
            Hapus
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded border border-white/8 bg-[#0a0a0a] p-4 hover:border-white/20 transition-all">
      <div className="flex gap-3">
        {image && (
          <img src={image} alt={name} className="h-12 w-12 rounded-full object-cover" />
        )}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medium text-white">{name}</h3>
              <p className="text-xs text-gray-500">
                {role}
                {company && ` · ${company}`}
              </p>
            </div>
            <span
              className={`whitespace-nowrap rounded px-2 py-1 text-xs font-medium ${
                approved ? "bg-green-900/30 text-green-400" : "bg-yellow-900/30 text-yellow-400"
              }`}
            >
              {approved ? "Ditampilkan" : "Pending"}
            </span>
          </div>
          <p className="mt-2 line-clamp-2 text-xs text-gray-400">{message}</p>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => setEditing(true)}
          className="text-xs text-gray-500 hover:text-white transition-colors"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default function TestimonialsManager({
  initialTestimonials,
}: {
  initialTestimonials: Testimonial[];
}) {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  const handleSaved = () => {
    router.refresh();
    setTestimonials((prev) => [...prev]);
  };

  const handleDeleted = () => {
    router.refresh();
  };

  const approved = testimonials.filter((t) => t.approved).sort((a, b) => a.sort_order - b.sort_order);
  const pending = testimonials.filter((t) => !t.approved).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="space-y-4">
      {approved.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-gray-400">Ditampilkan ({approved.length})</h2>
          <div className="space-y-2">
            {approved.map((t) => (
              <TestimonialRow
                key={t.id}
                testimonial={t}
                onSaved={handleSaved}
                onDeleted={handleDeleted}
              />
            ))}
          </div>
        </div>
      )}

      {pending.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-gray-400">Pending Approval ({pending.length})</h2>
          <div className="space-y-2">
            {pending.map((t) => (
              <TestimonialRow
                key={t.id}
                testimonial={t}
                onSaved={handleSaved}
                onDeleted={handleDeleted}
              />
            ))}
          </div>
        </div>
      )}

      {testimonials.length === 0 && (
        <p className="py-8 text-center text-sm text-gray-600">Belum ada testimoni</p>
      )}
    </div>
  );
}

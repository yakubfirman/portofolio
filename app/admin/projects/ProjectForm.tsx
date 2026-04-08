"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "@/app/admin/actions";
import type { Project } from "@/lib/data";

type Props = { initialData?: Project };

const inputCls =
  "w-full bg-[#0a0a0a] border border-white/8 rounded px-3 py-2.5 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-800/60 focus:bg-[#0d0d0d] transition-all";
const labelCls = "block text-[11px] font-medium text-gray-500 mb-1.5 tracking-wide uppercase";

export default function ProjectForm({ initialData }: Props) {
  const isEdit = !!initialData;
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  const [name, setName] = useState(initialData?.name ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [tech, setTech] = useState(initialData?.tech.join(", ") ?? "");
  const [url, setUrl] = useState(initialData?.url ?? "");
  const [image, setImage] = useState(initialData?.image ?? "");
  const [role, setRole] = useState(initialData?.details.role ?? "");
  const [overview, setOverview] = useState(initialData?.details.overview ?? "");
  const [contributions, setContributions] = useState(
    initialData?.details.contributions.join("\n") ?? ""
  );

  function handleNameChange(val: string) {
    setName(val);
    if (!isEdit) {
      setSlug(
        val
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
      );
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const data = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim(),
      tech: tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      url: url.trim(),
      image: image.trim(),
      details: {
        role: role.trim(),
        overview: overview.trim(),
        contributions: contributions
          .split("\n")
          .map((c) => c.trim())
          .filter(Boolean),
      },
    };
    startTransition(async () => {
      try {
        if (isEdit) {
          await updateProject(initialData!.slug, data);
        } else {
          await createProject(data);
        }
        router.push("/admin/projects");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="space-y-5 rounded border border-white/5 bg-[#0d0d0d] p-4 sm:p-6">
        <div>
          <label className={labelCls}>Nama Project *</label>
          <input
            className={inputCls}
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelCls}>Slug * (huruf kecil, angka, tanda hubung)</label>
          <input
            className={inputCls}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            pattern="[a-z0-9-]+"
          />
        </div>
        <div>
          <label className={labelCls}>Deskripsi singkat *</label>
          <textarea
            className={inputCls}
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelCls}>Tech Stack (pisah koma — React, Node.js, MySQL)</label>
          <input
            className={inputCls}
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            placeholder="React, Tailwind CSS, ..."
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>URL Project</label>
            <input
              className={inputCls}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className={labelCls}>Path Gambar</label>
            <input
              className={inputCls}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="/projects/nama.png"
            />
          </div>
        </div>
        <hr className="border-white/5" />
        <div>
          <label className={labelCls}>Role / Posisi</label>
          <input
            className={inputCls}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Full Stack Developer"
          />
        </div>
        <div>
          <label className={labelCls}>Overview (deskripsi lengkap)</label>
          <textarea
            className={inputCls}
            rows={4}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>Kontribusi (satu per baris)</label>
          <textarea
            className={inputCls}
            rows={5}
            value={contributions}
            onChange={(e) => setContributions(e.target.value)}
            placeholder={"Membangun UI komponen\nIntegrasi REST API\n..."}
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
      <div className="mt-4 flex flex-wrap items-center gap-3">
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
          {pending ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Buat Project"}
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

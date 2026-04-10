"use client";

import { useState, useTransition, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "@/app/admin/actions";
import type { Project } from "@/lib/data";

type Props = { initialData?: Project };

const inputCls =
  "w-full bg-[#0a0a0a] border border-white/8 rounded px-3 py-2.5 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-800/60 focus:bg-[#0d0d0d] transition-all";
const labelCls = "block text-[11px] font-medium text-gray-500 mb-1.5 tracking-wide uppercase";

function ImageUploader({ value, onChange }: { value: string; onChange: (path: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploadError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = (await res.json()) as { path?: string; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Upload gagal");
      onChange(json.path!);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setUploading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="space-y-3">
      {/* Drop zone / click area */}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`group relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed transition-all ${
          value
            ? "border-white/10 hover:border-red-800/40"
            : "border-white/8 hover:border-red-800/40"
        } bg-[#0a0a0a]`}
      >
        {value ? (
          <div className="relative h-32 w-full overflow-hidden rounded">
            <Image src={value} alt="Preview" fill className="object-contain p-2" unoptimized />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <p className="text-xs text-white">Klik untuk ganti gambar</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 py-6 text-center">
            {uploading ? (
              <>
                <svg className="h-6 w-6 animate-spin text-red-500" fill="none" viewBox="0 0 24 24">
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
                <p className="text-xs text-gray-500">Mengupload...</p>
              </>
            ) : (
              <>
                <svg
                  className="h-8 w-8 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M3.75 3h16.5A.75.75 0 0121 3.75v12a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75v-12A.75.75 0 013.75 3z"
                  />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">
                    Drag &amp; drop atau <span className="text-red-400">pilih file</span>
                  </p>
                  <p className="mt-0.5 text-[11px] text-gray-700">JPG, PNG, WebP · maks 5 MB</p>
                </div>
              </>
            )}
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {/* Upload error */}
      {uploadError && (
        <p className="flex items-center gap-1.5 text-xs text-red-400">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {uploadError}
        </p>
      )}

      {/* Show current path + remove button if image selected */}
      {value && (
        <div className="flex items-center justify-between rounded bg-white/3 px-3 py-1.5">
          <p className="truncate font-mono text-[11px] text-gray-600">{value}</p>
          <button
            type="button"
            onClick={() => onChange("")}
            className="ml-2 shrink-0 text-gray-700 hover:text-red-400"
            title="Hapus gambar"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

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
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left / main column */}
        <div className="space-y-5 rounded border border-white/5 bg-[#0d0d0d] p-4 sm:p-6 lg:col-span-2">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
              <label className={labelCls}>Slug * (huruf kecil, tanda hubung)</label>
              <input
                className={inputCls}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                pattern={"[a-z0-9\\-]+"}
              />
            </div>
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

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Tech Stack (pisah koma)</label>
              <input
                className={inputCls}
                value={tech}
                onChange={(e) => setTech(e.target.value)}
                placeholder="React, Tailwind CSS, ..."
              />
            </div>
            <div>
              <label className={labelCls}>URL Project</label>
              <input
                className={inputCls}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
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
              rows={5}
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

        {/* Right column — image upload */}
        <div className="space-y-5 rounded border border-white/5 bg-[#0d0d0d] p-4 sm:p-6">
          <div>
            <label className={labelCls}>Gambar Project</label>
            <ImageUploader value={image} onChange={setImage} />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
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

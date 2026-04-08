"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "@/app/admin/actions";
import type { Project } from "@/lib/data";

type Props = { initialData?: Project };

const inputCls =
  "w-full bg-[#0f0f0f] border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-800 transition-colors";
const labelCls = "block text-xs text-gray-500 mb-1";

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
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
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
      <div className="grid grid-cols-2 gap-4">
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
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-red-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-red-800 disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Buat Project"}
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

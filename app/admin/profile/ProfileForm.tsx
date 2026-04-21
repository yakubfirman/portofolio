"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/app/admin/actions";
import type { Profile } from "@/lib/data";

const inputCls =
  "w-full bg-[#0a0a0a] border border-white/8 rounded px-3 py-2.5 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-800/60 focus:bg-[#0d0d0d] transition-all";
const labelCls =
  "block text-[11px] font-medium text-gray-500 mb-1.5 tracking-wide uppercase";

export default function ProfileForm({ initialData }: { initialData: Profile }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [firstName, setFirstName] = useState(initialData.first_name);
  const [lastName, setLastName] = useState(initialData.last_name);
  const [roleBadge, setRoleBadge] = useState(initialData.role_badge);
  const [tagline, setTagline] = useState(initialData.tagline);
  const [cvUrl, setCvUrl] = useState(initialData.cv_url);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUploading, setCvUploading] = useState(false);

  async function handleCvUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Hanya file PDF yang diperbolehkan");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Ukuran file maksimal 10 MB");
      return;
    }

    setCvFile(file);
    setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Jika ada file CV baru, upload dulu
    if (cvFile) {
      setCvUploading(true);
      const formData = new FormData();
      formData.append("file", cvFile);
      formData.append("type", "cv");

      fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          setCvUrl(data.path);
          setCvFile(null);
          setCvUploading(false);

          // Setelah upload berhasil, simpan profile
          startTransition(async () => {
            try {
              await updateProfile({
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                role_badge: roleBadge.trim(),
                tagline: tagline.trim(),
                cv_url: data.path,
              });
              setSuccess(true);
              router.refresh();
            } catch (err) {
              setError(err instanceof Error ? err.message : "Terjadi kesalahan");
            }
          });
        })
        .catch((err) => {
          setError(err.message || "Upload CV gagal");
          setCvUploading(false);
        });
    } else {
      // Tidak ada file baru, langsung simpan profile
      startTransition(async () => {
        try {
          await updateProfile({
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            role_badge: roleBadge.trim(),
            tagline: tagline.trim(),
            cv_url: cvUrl.trim(),
          });
          setSuccess(true);
          router.refresh();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Terjadi kesalahan");
        }
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <div className="space-y-5 rounded border border-white/5 bg-[#0d0d0d] p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Nama Depan *</label>
            <input
              className={inputCls}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Yakub Firman"
              required
            />
            <p className="mt-1 text-[10px] text-gray-700">
              Kata terakhir tampil merah di hero
            </p>
          </div>
          <div>
            <label className={labelCls}>Nama Belakang *</label>
            <input
              className={inputCls}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Mustofa"
              required
            />
          </div>
        </div>
        <div>
          <label className={labelCls}>Role Badge *</label>
          <input
            className={inputCls}
            value={roleBadge}
            onChange={(e) => setRoleBadge(e.target.value)}
            placeholder="Full Stack Web Dev · SEO Specialist"
            required
          />
          <p className="mt-1 text-[10px] text-gray-700">
            Tampil di atas nama pada hero section
          </p>
        </div>
        <div>
          <label className={labelCls}>Tagline *</label>
          <textarea
            className={`${inputCls} min-h-20 resize-y`}
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            required
          />
          <p className="mt-1 text-[10px] text-gray-700">
            Kalimat singkat di bawah nama pada hero section
          </p>
        </div>
        <div>
          <label className={labelCls}>Upload CV / Resume (PDF)</label>
          <div className="flex flex-col gap-2">
            <input
              type="file"
              accept=".pdf"
              onChange={handleCvUpload}
              disabled={cvUploading || pending}
              className="rounded border border-white/8 bg-[#0a0a0a] px-3 py-2.5 text-sm text-white file:cursor-pointer file:border-0 file:bg-red-900 file:px-3 file:py-1.5 file:text-white hover:file:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {cvFile && (
              <p className="text-xs text-blue-400">📄 {cvFile.name} akan diupload</p>
            )}
            {cvUrl && !cvFile && (
              <p className="text-xs text-green-400">✓ CV sudah ada: {cvUrl.split('/').pop()}</p>
            )}
          </div>
          <p className="mt-1 text-[10px] text-gray-700">
            Upload file PDF maksimal 10 MB
          </p>
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
            <p className="text-xs text-green-400">Profil berhasil disimpan!</p>
          </div>
        )}
      </div>

      <div className="mt-4">
        <button
          type="submit"
          disabled={pending || cvUploading}
          className="flex items-center gap-2 rounded bg-red-900 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-red-950/30 transition-all hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {cvUploading ? "Upload CV..." : pending ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}

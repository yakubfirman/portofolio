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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
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
            className={`${inputCls} min-h-[80px] resize-y`}
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            required
          />
          <p className="mt-1 text-[10px] text-gray-700">
            Kalimat singkat di bawah nama pada hero section
          </p>
        </div>
        <div>
          <label className={labelCls}>URL CV / Resume</label>
          <input
            className={inputCls}
            value={cvUrl}
            onChange={(e) => setCvUrl(e.target.value)}
            placeholder="/resumefirman.pdf"
          />
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
          disabled={pending}
          className="flex items-center gap-2 rounded bg-red-900 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-red-950/30 transition-all hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}

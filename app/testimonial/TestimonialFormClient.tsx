"use client";

import { useState, useTransition } from "react";
import { submitTestimonial } from "@/lib/data";

export default function TestimonialFormClient() {
  const [pending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    message: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.name.trim() || !formData.role.trim() || !formData.message.trim()) {
      setError("Nama, peran, dan testimoni harus diisi");
      return;
    }

    startTransition(async () => {
      try {
        await submitTestimonial({
          name: formData.name,
          role: formData.role,
          company: formData.company || undefined,
          message: formData.message,
          image: formData.image || undefined,
        });
        setSuccess(true);
        setFormData({ name: "", role: "", company: "", message: "", image: "" });
        setTimeout(() => setSuccess(false), 5000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal mengirim testimoni");
      }
    });
  }

  const inputCls =
    "w-full bg-[#0a0a0a] border border-white/8 rounded px-3 py-2.5 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-800/60 focus:bg-[#0d0d0d] transition-all";
  const labelCls = "block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide";

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Nama Lengkap *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nama Anda"
            className={inputCls}
            required
          />
        </div>
        <div>
          <label className={labelCls}>Peran / Posisi *</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Contoh: CEO, Developer, Designer"
            className={inputCls}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Perusahaan / Organisasi</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nama perusahaan (opsional)"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>URL Foto Profil</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg (opsional)"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Testimoni Anda *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Bagikan pengalaman Anda bekerja dengan saya..."
          rows={6}
          className={inputCls + " resize-y"}
          required
        />
      </div>

      {error && <div className="rounded bg-red-900/20 p-3 text-sm text-red-400 border border-red-900/30">{error}</div>}
      {success && (
        <div className="rounded bg-green-900/20 p-3 text-sm text-green-400 border border-green-900/30">
          ✓ Testimoni berhasil dikirim! Terima kasih. Testimoni Anda akan ditampilkan setelah disetujui.
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded bg-gradient-to-r from-red-800 to-red-900 px-4 py-3 font-semibold text-white hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Mengirim..." : "Kirim Testimoni"}
      </button>

      <p className="text-center text-xs text-gray-600">
        Testimoni Anda akan ditampilkan setelah disetujui oleh admin.
      </p>
    </form>
  );
}

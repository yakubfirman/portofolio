"use client";

import { useState, useTransition } from "react";
import { submitTestimonial } from "@/lib/data";

export default function TestimonialFormClient() {
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
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

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");
      uploadFormData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: uploadFormData }
      );

      if (!res.ok) throw new Error("Upload gagal");

      const data = await res.json();
      setFormData((prev) => ({ ...prev, image: data.secure_url }));
    } catch (err) {
      setError("Gagal upload foto. Periksa konfigurasi Cloudinary.");
      console.error(err);
    } finally {
      setUploading(false);
    }
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
          <label className={labelCls}>Foto Profil</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className={inputCls + " cursor-pointer file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-red-800 file:text-white hover:file:bg-red-700"}
          />
          {uploading && <p className="text-xs text-gray-400 mt-1">⏳ Uploading...</p>}
          {formData.image && (
            <div className="mt-2 flex items-center gap-2">
              <img src={formData.image} alt="Preview" className="h-10 w-10 rounded object-cover" />
              <p className="text-xs text-green-400">✓ Foto uploaded</p>
            </div>
          )}
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
        disabled={pending || uploading}
        className="w-full rounded bg-gradient-to-r from-red-800 to-red-900 px-4 py-3 font-semibold text-white hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Mengirim..." : uploading ? "Upload foto..." : "Kirim Testimoni"}
      </button>

      <p className="text-center text-xs text-gray-600">
        Testimoni Anda akan ditampilkan setelah disetujui oleh admin.
      </p>
    </form>
  );
}

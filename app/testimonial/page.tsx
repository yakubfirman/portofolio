import { Metadata } from "next";
import TestimonialFormClient from "./TestimonialFormClient";

export const metadata: Metadata = {
  title: "Kirim Testimoni - Yakub Firman",
  description: "Bagikan pengalaman Anda bekerja dengan saya. Testimoni akan membantu profesional lain.",
};

export default function TestimonialPage() {
  return (
    <div className="min-h-dvh bg-black text-white">
      {/* Header section */}
      <div className="border-b border-white/10 bg-linear-to-br from-red-950/10 via-black to-black">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="mb-2 text-xs font-semibold tracking-widest text-red-400/70 uppercase">Feedback Klien</p>
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">Bagikan Testimoni Anda</h1>
          <p className="max-w-lg text-gray-400">
            Terima kasih telah bekerja sama. Testimoni Anda sangat berarti dan membantu profesional lain untuk mengenal kualitas pekerjaan saya. 
            Silakan isi form di bawah ini tanpa perlu login.
          </p>
        </div>
      </div>

      {/* Form section */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-white/10 bg-[#0a0a0a] p-8 sm:p-12">
          <TestimonialFormClient />
        </div>

        {/* Info box */}
        <div className="mt-8 rounded-lg bg-blue-950/20 p-6 border border-blue-900/30">
          <h3 className="mb-3 font-semibold text-blue-300">💡 Informasi Penting</h3>
          <ul className="space-y-2 text-sm text-blue-200/80">
            <li>• Testimoni Anda akan dimoderasi sebelum ditampilkan di website</li>
            <li>• Mohon berikan testimoni yang jujur dan konstruktif</li>
            <li>• URL foto profil bersifat opsional (pasang foto profesional untuk hasil terbaik)</li>
            <li>• Testimoni akan ditampilkan secara publik dengan nama dan posisi Anda</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

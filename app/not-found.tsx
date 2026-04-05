import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Halaman Tidak Ditemukan | Yakub Firman Mustofa",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-[#0a0a0a] px-5 text-center">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900/10 blur-[120px]" />

      <div className="relative">
        <p className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-red-700/70">
          Error 404
        </p>
        <h1 className="mb-4 text-5xl font-black tracking-tighter text-white sm:text-6xl">
          Halaman<br />
          <span className="text-red-500">Tidak Ditemukan</span>
        </h1>
        <p className="mx-auto mb-8 max-w-sm text-sm leading-relaxed text-gray-500">
          Halaman yang kamu cari tidak ada atau sudah dipindahkan. Kembali ke beranda untuk melanjutkan.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-sm bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin/projects");
      } else {
        setError("Password salah");
      }
    } catch {
      setError("Terjadi kesalahan, coba lagi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] px-5">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-red-800/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-red-900/5 blur-3xl" />

      <div className="relative w-full max-w-sm">
        {/* Top accent line */}
        <div className="mb-8 h-px w-full bg-linear-to-r from-transparent via-red-700/50 to-transparent" />

        {/* Card */}
        <div className="rounded-sm border border-white/5 bg-[#0d0d0d] p-8 shadow-2xl shadow-black/50">
          <div className="mb-8">
            <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-red-900/30 bg-red-950/50">
              <svg
                className="h-5 w-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <span className="block text-[10px] font-bold tracking-widest text-red-500/80 uppercase">
              Portfolio CMS
            </span>
            <h1 className="mt-1 text-2xl font-bold text-white">Admin Login</h1>
            <p className="mt-1 text-xs text-gray-600">Masuk untuk mengelola konten portfolio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs text-gray-500">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoFocus
                required
                className="w-full rounded border border-white/10 bg-[#111] px-4 py-3 text-sm text-white placeholder-gray-700 transition-colors focus:border-red-800/70 focus:outline-none"
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
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-red-900 py-3 text-sm font-medium text-white shadow-lg shadow-red-950/30 transition-all hover:bg-red-800 hover:shadow-red-950/50 disabled:opacity-50"
            >
              {loading ? "Memverifikasi..." : "Masuk"}
            </button>
          </form>
        </div>

        {/* Bottom accent line */}
        <div className="mt-8 h-px w-full bg-linear-to-r from-transparent via-red-700/20 to-transparent" />
      </div>
    </div>
  );
}

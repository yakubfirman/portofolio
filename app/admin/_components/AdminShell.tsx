"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white">
      {/* Top red accent line */}
      <div className="h-px w-full shrink-0 bg-linear-to-r from-transparent via-red-700/60 to-transparent" />

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/5 bg-[#0d0d0d]/95 px-4 py-3 backdrop-blur-sm md:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex h-8 w-8 items-center justify-center rounded border border-white/10 text-gray-400 transition-colors hover:border-white/20 hover:text-white"
          aria-label="Buka menu"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-red-900/40 bg-red-900/20">
            <span className="text-[9px] font-black tracking-tighter text-red-400">YF</span>
          </div>
          <span className="text-xs font-bold text-white">Portfolio CMS</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile overlay backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar — fixed drawer on mobile, static on desktop */}
        <div
          className={`fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-in-out md:static md:z-auto md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <AdminSidebar onClose={() => setSidebarOpen(false)} />
        </div>

        <main className="relative min-w-0 flex-1 overflow-auto">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-red-900/5 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-red-950/5 blur-3xl" />
          <div className="relative p-4 sm:p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

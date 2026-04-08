"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white">
      {/* Top red accent line — same style as main site */}
      <div className="h-px w-full shrink-0 bg-linear-to-r from-transparent via-red-700/60 to-transparent" />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="relative flex-1 overflow-auto">
          {/* Ambient glow — matches main site aesthetic */}
          <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-red-900/5 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-red-950/5 blur-3xl" />
          <div className="relative p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

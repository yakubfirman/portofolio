"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  {
    href: "/admin/projects",
    label: "Projects",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
        />
      </svg>
    ),
  },
  {
    href: "/admin/speaking",
    label: "Speaking",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
        />
      </svg>
    ),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r border-white/5 bg-[#0d0d0d]">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-white/5 px-4 py-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-red-900/40 bg-red-900/20">
          <span className="text-xs font-black tracking-tighter text-red-400">YF</span>
        </div>
        <div>
          <p className="text-xs font-bold text-white">Portfolio CMS</p>
          <p className="text-[10px] text-gray-600">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 pt-4">
        <p className="mb-2 px-3 text-[9px] font-semibold tracking-widest text-gray-700 uppercase">
          Konten
        </p>
        <div className="space-y-0.5">
          {NAV.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition-all ${
                  isActive
                    ? "border-l-2 border-red-600 bg-red-900/10 pl-2.5 text-red-400"
                    : "border-l-2 border-transparent text-gray-500 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/5 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-white/5 hover:text-red-400"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}

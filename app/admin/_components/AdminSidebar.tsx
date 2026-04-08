"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/speaking", label: "Speaking" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="sticky top-0 flex h-screen w-52 shrink-0 flex-col border-r border-white/5 bg-[#0d0d0d]">
      <div className="border-b border-white/5 p-4">
        <span className="text-xs font-bold tracking-widest text-red-500 uppercase">Admin</span>
        <p className="mt-0.5 text-xs text-gray-600">Portfolio CMS</p>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {NAV.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded px-3 py-2 text-sm transition-colors ${
              pathname.startsWith(link.href)
                ? "bg-red-900/20 text-red-400"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-white/5 p-3">
        <button
          onClick={handleLogout}
          className="w-full rounded px-3 py-2 text-left text-sm text-gray-500 transition-colors hover:bg-white/5 hover:text-red-400"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

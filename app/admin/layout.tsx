import AdminSidebar from "./_components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white">
      {/* Top red accent line */}
      <div className="h-px w-full shrink-0 bg-linear-to-r from-transparent via-red-700/60 to-transparent" />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
}

import Link from "next/link";
import type { Project } from "@/lib/data";
import SortableProjectList from "./SortableProjectList";

export const dynamic = "force-dynamic";

async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${process.env.API_URL}/api/projects`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function AdminProjectsPage() {
  const projects = await fetchProjects();

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Projects ({projects.length})</h1>
        <Link
          href="/admin/projects/new"
          className="rounded bg-red-900 px-4 py-2 text-sm text-white transition-colors hover:bg-red-800"
        >
          + Tambah Project
        </Link>
      </div>
      <p className="mb-5 text-xs text-gray-600">Drag ⠿ untuk mengubah urutan tampilan.</p>
      {projects.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-600">Belum ada project.</p>
      ) : (
        <SortableProjectList initialProjects={projects} />
      )}
    </div>
  );
}

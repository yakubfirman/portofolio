import Link from "next/link";
import type { Project } from "@/lib/data";
import DeleteProjectButton from "./DeleteProjectButton";

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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Projects ({projects.length})</h1>
        <Link
          href="/admin/projects/new"
          className="rounded bg-red-900 px-4 py-2 text-sm text-white transition-colors hover:bg-red-800"
        >
          + Tambah Project
        </Link>
      </div>
      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="flex items-center justify-between gap-4 rounded border border-white/5 bg-[#0f0f0f] p-4"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{project.name}</p>
              <p className="mt-0.5 text-xs text-gray-500">{project.slug}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/admin/projects/${project.slug}`}
                className="rounded border border-white/10 px-3 py-1.5 text-sm text-gray-400 transition-colors hover:text-white"
              >
                Edit
              </Link>
              <DeleteProjectButton slug={project.slug} name={project.name} />
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-600">Belum ada project.</p>
        )}
      </div>
    </div>
  );
}

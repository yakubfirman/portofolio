import Link from "next/link";
import { notFound } from "next/navigation";
import type { Project } from "@/lib/data";
import ProjectForm from "../ProjectForm";

export const dynamic = "force-dynamic";

async function fetchProject(slug: string): Promise<Project | null> {
  const res = await fetch(`${process.env.API_URL}/api/projects/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) return null;
  return res.json();
}

export default async function EditProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await fetchProject(slug);
  if (!project) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/projects"
          className="mb-3 inline-flex items-center gap-1.5 text-xs text-gray-600 transition-colors hover:text-gray-400"
        >
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Kembali ke Projects
        </Link>
        <p className="mb-1 text-[10px] font-semibold tracking-widest text-red-500/70 uppercase">
          Admin · Projects
        </p>
        <h1 className="text-2xl font-bold text-white">Edit Project</h1>
        <p className="mt-0.5 font-mono text-xs text-gray-600">{project.slug}</p>
      </div>
      <div className="mb-6 h-px bg-linear-to-r from-red-900/20 via-white/5 to-transparent" />
      <ProjectForm initialData={project} />
    </div>
  );
}

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
      <h1 className="mb-6 text-xl font-bold text-white">Edit: {project.name}</h1>
      <ProjectForm initialData={project} />
    </div>
  );
}

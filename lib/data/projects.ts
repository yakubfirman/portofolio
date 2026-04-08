export type Project = {
  name: string;
  slug: string;
  description: string;
  tech: string[];
  url: string;
  image: string;
  details: {
    role: string;
    overview: string;
    contributions: string[];
  };
};

const API_URL = process.env.API_URL;

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/api/projects`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const res = await fetch(`${API_URL}/api/projects/${encodeURIComponent(slug)}`, {
    next: { revalidate: 3600 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch project: ${slug}`);
  return res.json();
}

// @deprecated — Hanya untuk generateStaticParams (SSG). Hapus jika pakai dynamic rendering.
export async function getProjectSlugs(): Promise<string[]> {
  const projects = await getProjects();
  return projects.map((p) => p.slug);
}

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

const API_URL = process.env.API_URL || "https://yakubfirman.pythonanywhere.com";

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_URL}/api/projects`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_URL}/api/projects/${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 },
    });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// @deprecated — Hanya untuk generateStaticParams (SSG). Hapus jika pakai dynamic rendering.
export async function getProjectSlugs(): Promise<string[]> {
  const projects = await getProjects();
  return projects.map((p) => p.slug);
}

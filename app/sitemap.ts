import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yakubfirman.id";

  const projectPages: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projectPages,
  ];
}

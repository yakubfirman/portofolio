import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://yakubfirman.id";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/about", "/skills", "/projects", "/contact"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

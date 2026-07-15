import type { MetadataRoute } from "next";
import { allProjects } from "./data";
import { siteUrl } from "./metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...allProjects.map((project) => ({
      url: `${siteUrl}/Project/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

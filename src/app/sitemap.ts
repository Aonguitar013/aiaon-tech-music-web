import type { MetadataRoute } from "next";
import { EDU_CATALOG } from "@/lib/eduCatalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.aiaon.tech";
  const now = new Date();

  const publicRoutes: {
    path: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  }[] = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/edu", priority: 1.0, changeFrequency: "daily" },
    { path: "/digital-vault", priority: 0.9, changeFrequency: "daily" },
    { path: "/freebies", priority: 0.9, changeFrequency: "daily" },
    { path: "/line-stickers", priority: 0.9, changeFrequency: "weekly" },
    { path: "/ebooks", priority: 0.9, changeFrequency: "weekly" },
    { path: "/teacher-prep", priority: 0.9, changeFrequency: "weekly" },
    { path: "/music-store", priority: 0.9, changeFrequency: "weekly" },
    { path: "/bundles", priority: 0.8, changeFrequency: "weekly" },
    { path: "/student-vault", priority: 0.8, changeFrequency: "weekly" },
    { path: "/ai-caretaker", priority: 0.8, changeFrequency: "weekly" },
    { path: "/services", priority: 0.8, changeFrequency: "weekly" },
    { path: "/music-templates", priority: 0.7, changeFrequency: "weekly" },
    { path: "/band-grooving", priority: 0.7, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "weekly" },
    { path: "/saas", priority: 0.6, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.4, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.4, changeFrequency: "monthly" },
    { path: "/refund", priority: 0.4, changeFrequency: "monthly" },
  ];

  const eduBookRoutes: MetadataRoute.Sitemap = EDU_CATALOG.map((book) => ({
    url: `${baseUrl}/edu/${book.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    ...publicRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...eduBookRoutes,
  ];
}

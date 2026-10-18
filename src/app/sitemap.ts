import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.aiaon.tech";
  const now = new Date();

  const publicRoutes: {
    path: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  }[] = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/digital-vault", priority: 0.9, changeFrequency: "daily" },
    { path: "/teacher-prep", priority: 0.9, changeFrequency: "daily" },
    { path: "/music-store", priority: 0.9, changeFrequency: "daily" },
    { path: "/freebies", priority: 0.9, changeFrequency: "daily" },
    { path: "/bundles", priority: 0.8, changeFrequency: "weekly" },
    { path: "/student-vault", priority: 0.8, changeFrequency: "weekly" },
    { path: "/ai-caretaker", priority: 0.8, changeFrequency: "weekly" },
    { path: "/services", priority: 0.7, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "weekly" },
    { path: "/saas", priority: 0.6, changeFrequency: "monthly" },
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

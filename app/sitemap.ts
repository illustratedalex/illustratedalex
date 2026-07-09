import type { MetadataRoute } from "next";

const baseUrl = "https://illustratedalex.com";
const routes = [
  "",
  "/portfolio",
  "/piercings",
  "/aftercare",
  "/travel",
  "/about",
  "/mountainside",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}

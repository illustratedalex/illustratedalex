import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://www.illustratedalex.com";
const routes = [
  "",
  "/portfolio",
  "/piercings",
  "/aftercare",
  "/travel",
  "/artists",
  "/mountainside",
  "/contact",
  "/shop",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}

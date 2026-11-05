import type { MetadataRoute } from "next";
import { categories, categoryPath, departments, productPath, products } from "@/data/catalog";

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
  "/shop/cart",
  "/shop/checkout",
  "/shop/custom-print",
  ...departments.map((department) => `/shop/${department.slug}`),
  ...categories.map((category) => categoryPath(category)),
  ...products.map((product) => productPath(product)),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}

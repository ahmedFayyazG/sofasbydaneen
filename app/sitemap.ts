import type { MetadataRoute } from "next";
import { products } from "./lib/products";

const SITE_URL = "https://sofas-by-daneen-fashion-recreation.ahmedfayyaz47.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${SITE_URL}/collections`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/inspiration`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
    images: product.heroImage ? [`${SITE_URL}${product.heroImage}`] : undefined,
  }));

  return [...staticRoutes, ...productRoutes];
}

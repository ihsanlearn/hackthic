import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hackthic.iihn.fun";
  
  const routes = [
    "",
    "/docs",
    "/tools",
    "/dorks",
    "/payloads",
    "/recon",
    "/reporting",
    "/kb",
    "/manual-testing",
    "/automation",
    "/notes",
    "/legal",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}

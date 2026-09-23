import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/metadata";
import { siteRoutes } from "@/lib/routes";

/** Public routes only. Add each page as it is built; never the review layer. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl(siteRoutes.home),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

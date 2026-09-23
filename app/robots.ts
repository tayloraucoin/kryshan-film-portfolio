import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/metadata";
import { reviewRoutes } from "@/lib/routes";

/** The review layer is private and must never be indexed, whatever the gate does. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: [`${reviewRoutes.prefix}/`] },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}

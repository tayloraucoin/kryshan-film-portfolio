import type { MetadataRoute } from "next";
import { SHOWABLE_PROJECTS } from "@/content/projects";
import { absoluteUrl } from "@/lib/metadata";
import { siteRoutes } from "@/lib/routes";

/**
 * The five pages, then one detail page per showable film (spec §8). From
 * `siteRoutes` and `SHOWABLE_PROJECTS` only: a held or NDA'd film never
 * appears. No `lastModified`: no date is known, and none is invented.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    siteRoutes.home,
    siteRoutes.work(),
    siteRoutes.about,
    siteRoutes.teaching,
    siteRoutes.contact,
  ];
  return [
    ...pages.map((path) => ({ url: absoluteUrl(path) })),
    ...SHOWABLE_PROJECTS.map((project) => ({
      url: absoluteUrl(siteRoutes.project(project.slug)),
    })),
  ];
}

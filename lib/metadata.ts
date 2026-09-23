import type { Metadata } from "next";
import { SITE, SITE_URL } from "@/lib/config";

type CreatePageMetadataOptions = {
  title: string;
  description: string;
  /** Route path, e.g. "/about". Sets the canonical and the OG url. */
  path?: string;
  noIndex?: boolean;
  /** Absolute or root-relative image; falls back to the site's OG image. */
  image?: { url: string; width: number; height: number; alt: string };
  /** True for the home page, whose title carries no " — Site" suffix. */
  absoluteTitle?: boolean;
};

/**
 * Every page builds its metadata through here, so `description`,
 * `og:description` and `twitter:description` cannot drift apart and the
 * canonical is never forgotten. The root layout sets `metadataBase` and the
 * title template; this fills in the per-page part.
 */
export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  image,
  absoluteTitle = false,
}: CreatePageMetadataOptions): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} — ${SITE.name}`;
  const images = image ? [image] : SITE.ogImage ? [SITE.ogImage] : undefined;

  return {
    title: absoluteTitle ? { absolute: fullTitle } : title,
    description,
    ...(path ? { alternates: { canonical: path } } : {}),
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "website",
      title: fullTitle,
      description,
      siteName: SITE.name,
      locale: SITE.locale,
      ...(path ? { url: path } : {}),
      ...(images ? { images } : {}),
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: fullTitle,
      description,
      ...(images ? { images } : {}),
    },
  };
}

/** The root layout's metadata: base URL, title template, site-wide defaults. */
export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(`${SITE_URL}/`),
    title: {
      default: SITE.name,
      template: `%s — ${SITE.name}`,
    },
    description: SITE.description,
    applicationName: SITE.name,
    ...createPageMetadata({
      title: SITE.name,
      description: SITE.description,
      path: "/",
      absoluteTitle: true,
    }),
  };
}

/** Absolute URL for a path, for sitemaps and structured data. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

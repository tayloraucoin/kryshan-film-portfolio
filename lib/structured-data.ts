/**
 * Schema.org objects for `<script type="application/ld+json">`, built from
 * plain arguments (`lib/` can't import `content/`). Rendered by
 * `components/composed/site/json-ld.tsx`. SITE-5 adds `videoObjectJsonLd`.
 */

export type PersonJsonLdInput = Readonly<{
  name: string;
  jobTitle: string;
  /** Absolute URL of the site's home page. */
  url: string;
  /** His profiles, absolute URLs, in order. */
  sameAs: ReadonlyArray<string>;
  locality: string;
}>;

/** `Person`, for Home and About (spec §6.1, §8). */
export function personJsonLd(input: PersonJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    jobTitle: input.jobTitle,
    url: input.url,
    sameAs: [...input.sameAs],
    address: { "@type": "PostalAddress", addressLocality: input.locality },
  } as const;
}

export type VideoObjectJsonLdInput = Readonly<{
  name: string;
  description: string;
  /** Absolute URL of the poster. */
  thumbnailUrl: string;
  /** The plain embed (no autoplay), for YouTube and Vimeo. */
  embedUrl?: string;
  /** The real host's page, for a link-out (which has no embed). */
  url?: string;
  /** Only when he has entered it (`videoPublished`); never invented. */
  uploadDate?: string;
}>;

/** `VideoObject`, for a film's detail page (spec §6.3). Absent values are omitted, never guessed. */
export function videoObjectJsonLd(input: VideoObjectJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: input.name,
    description: input.description,
    thumbnailUrl: input.thumbnailUrl,
    ...(input.embedUrl ? { embedUrl: input.embedUrl } : {}),
    ...(input.url ? { url: input.url } : {}),
    ...(input.uploadDate ? { uploadDate: input.uploadDate } : {}),
  } as const;
}

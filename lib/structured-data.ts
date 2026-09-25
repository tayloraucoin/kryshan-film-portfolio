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

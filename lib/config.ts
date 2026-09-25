import { env } from "@/lib/env";

/**
 * Site identity and operational knobs. Page copy lives in `content/`; the
 * things that name the site, appear in every `<title>`, and feed metadata
 * live here, as they do in the sibling repos (`lib/config.ts` there too).
 *
 * Everything in `SITE` is a slot. docs/NEW-CLIENT.md is the checklist that
 * fills it. Navigation and socials are things he edits, so they live in
 * `content/site.ts` (D-SITE-28), not here.
 */
export const SITE = {
  /** The client's name as it should read in a browser tab. */
  name: "Kryshan Randel",
  /** One line under the name: what they do, in their words (03 §8, the roles line). */
  tagline: "Director, camera operator, editor, and film instructor.",
  /** Where they are, and that it does not limit them (03 §8). */
  place: "Vancouver, works anywhere.",
  /** The meta description for the home page. Under 160 characters. */
  description:
    "Kryshan Randel. Director, camera operator, editor, and film instructor. Vancouver, works anywhere.",
  locale: "en_CA",
  /**
   * Public contact. Rendered on every page (docs/CONVENTIONS.md §7). From
   * `CONTACT_EMAIL` (lib/env.ts); read at build, server-side only, so client
   * leaves receive it as a prop.
   */
  email: env.CONTACT_EMAIL,
  /** Set to the client's social card once one exists (1200×630). */
  ogImage: null as null | {
    url: string;
    width: number;
    height: number;
    alt: string;
  },
} as const;

/** The canonical origin, no trailing slash. */
export const SITE_URL = env.NEXT_PUBLIC_SITE_URL;

/** How long a review session cookie lasts, in seconds. Thirty days. */
export const REVIEW_SESSION_MAX_AGE = 60 * 60 * 24 * 30;

/** Cookie name for the signed review session. Path-scoped to `/review`. */
export const REVIEW_COOKIE = "review_session";

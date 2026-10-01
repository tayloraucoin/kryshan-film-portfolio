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
  /**
   * The link preview for every page that doesn't name its own (O-SITE-11).
   * Film pages share their poster instead (spec §6.3). JPEG, not WebP: some
   * link unfurlers still drop WebP. Keep it 1200×630 and under 300 KB.
   */
  ogImage: {
    url: "/media/social/kryshan-randel-card.jpg",
    width: 1200,
    height: 630,
    alt: "Kryshan Randel on a Vancouver shoot. Director, camera, editor, teacher, storyteller.",
  } as null | {
    url: string;
    width: number;
    height: number;
    alt: string;
  },
} as const;

/**
 * TEMPORARY (2026-10-01): his address is off the public site while the new
 * mailbox is being fixed. Everywhere it appeared links to Contact (the form)
 * instead, in `EMAIL_PAUSED_COPY`'s words (content/site.ts). To bring it
 * back everywhere, set this to `false`. The review mocks still read
 * `SITE.email`.
 */
const EMAIL_PAUSED = true;

/** The address the public site shows, or null while it is paused. */
export const PUBLIC_EMAIL: string | null = EMAIL_PAUSED ? null : SITE.email;

/** The canonical origin, no trailing slash. */
export const SITE_URL = env.NEXT_PUBLIC_SITE_URL;

/** How long a review session cookie lasts, in seconds. Thirty days. */
export const REVIEW_SESSION_MAX_AGE = 60 * 60 * 24 * 30;

/** Cookie name for the signed review session. Path-scoped to `/review`. */
export const REVIEW_COOKIE = "review_session";

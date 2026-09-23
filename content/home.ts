/**
 * Home page copy. Typed TS, no CMS: the client edits this file through the
 * self-edit guide, and a wrong shape fails the build rather than the page.
 *
 * Structural copy only. The client's real words replace every string here
 * before anything is shown to them (docs/CONVENTIONS.md §8).
 */
export const HOME = {
  headline: "The work, first.",
  support:
    "This is the home page slot. The client's own headline and one supporting line go here.",
  /** The one action the site exists to produce. */
  action: { label: "Email", href: "mailto:kryshanrandel@gmail.com" },
} as const;

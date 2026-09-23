import type { Route } from "next";

/**
 * Every path in the site is built here. No route string is written inline
 * anywhere else; a path that exists in two places drifts in one of them.
 *
 * Paths only. Absolute URLs are composed in `lib/metadata.ts`, which is the
 * one place that knows the origin.
 */

export const siteRoutes = {
  home: "/" as Route,
} as const;

/**
 * The client review layer. Everything under `/review` except `access` sits
 * behind the code gate in `proxy.ts`; the prefix is what the proxy matches.
 */
const REVIEW_PREFIX = "/review" as const;

export const reviewRoutes = {
  prefix: REVIEW_PREFIX,
  index: REVIEW_PREFIX as Route,
  access: (next?: string): Route =>
    (next && next.startsWith(REVIEW_PREFIX)
      ? `${REVIEW_PREFIX}/access?next=${encodeURIComponent(next)}`
      : `${REVIEW_PREFIX}/access`) as Route,
  kit: (id: string): Route => `${REVIEW_PREFIX}/kits/${id}` as Route,
  layout: (id: string): Route => `${REVIEW_PREFIX}/layouts/${id}` as Route,
  mock: (id: string): Route => `${REVIEW_PREFIX}/mocks/${id}` as Route,
  feedback: `${REVIEW_PREFIX}/feedback` as Route,
} as const;

/** True for any path the review gate protects. */
export function isGatedReviewPath(pathname: string): boolean {
  if (pathname === reviewRoutes.access()) return false;
  if (pathname.startsWith(`${REVIEW_PREFIX}/access`)) return false;
  return pathname === REVIEW_PREFIX || pathname.startsWith(`${REVIEW_PREFIX}/`);
}

/** True for anything under the review prefix, gate included. */
export function isReviewPath(pathname: string): boolean {
  return pathname === REVIEW_PREFIX || pathname.startsWith(`${REVIEW_PREFIX}/`);
}

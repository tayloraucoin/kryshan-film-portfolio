import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * The only file that reads `process.env`.
 *
 * Validated once with zod. `next.config.ts` imports this module, so a missing
 * or malformed variable fails the build rather than a page. Server variables
 * throw if a client bundle touches them (t3-env's guarantee), which is what
 * keeps the review ingest key out of the browser.
 *
 * Everything the review layer needs is optional on purpose: a client site with
 * none of it set is simply a site with no `/review` (the gate refuses every
 * code) and no backend (comments stay in the reviewer's browser). The public
 * site never depends on any of it. See docs/REVIEW-LAYER.md §2.
 */
export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    /**
     * The review gate. "on" (the default, and the only safe value for a
     * deployed round) requires the access code; "off" lets every `/review`
     * request through with no code, for local development only. Fails
     * closed: anything but the literal "off" keeps the gate on.
     */
    REVIEW_GATE: z.enum(["on", "off"]).default("on"),

    /**
     * The code a reviewer types to reach `/review`. Unset means the review
     * layer is off. Rotate it by changing the value and redeploying.
     */
    REVIEW_ACCESS_CODE: z.string().min(6).optional(),
    /** Signs the review session cookie. Any long random string. */
    REVIEW_SESSION_SECRET: z.string().min(16).optional(),
    /** Origin of the tayloraucoin.com backend, no trailing slash. */
    REVIEW_BACKEND_URL: z
      .string()
      .url()
      .transform((value) => value.replace(/\/$/, ""))
      .optional(),
    /** The shared sister-repo key: the same value as taylor-aucoin's REVIEW_INGEST_KEY (M-KR-5). */
    REVIEW_INGEST_KEY: z.string().min(16).optional(),
  },

  client: {
    /** The canonical origin, used for absolute URLs in metadata and sitemaps. */
    NEXT_PUBLIC_SITE_URL: z
      .string()
      .url()
      .transform((value) => value.replace(/\/$/, ""))
      .default("http://localhost:3000"),
  },

  // Next inlines client variables only when referenced literally.
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    REVIEW_GATE: process.env.REVIEW_GATE,
    REVIEW_ACCESS_CODE: process.env.REVIEW_ACCESS_CODE,
    REVIEW_SESSION_SECRET: process.env.REVIEW_SESSION_SECRET,
    REVIEW_BACKEND_URL: process.env.REVIEW_BACKEND_URL,
    REVIEW_INGEST_KEY: process.env.REVIEW_INGEST_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },

  emptyStringAsUndefined: true,
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});

export type Env = typeof env;

/** True when `/review` can admit anyone at all. */
export function reviewLayerEnabled(): boolean {
  return Boolean(env.REVIEW_ACCESS_CODE && env.REVIEW_SESSION_SECRET);
}

/** False only when `REVIEW_GATE=off`: `/review` then admits everyone, code or not. */
export function reviewGateOn(): boolean {
  return env.REVIEW_GATE !== "off";
}

/** True when comments and the feedback form have somewhere to go. */
export function reviewBackendConfigured(): boolean {
  return Boolean(env.REVIEW_BACKEND_URL && env.REVIEW_INGEST_KEY);
}

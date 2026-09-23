import type { BrandKit } from "@/brand/types";

/**
 * The client's chosen kit. `null` until the review round has produced one.
 *
 * Setting it is the one-line act that brands the site: replace `null` with
 * the kit (imported from `brand/kits/<name>.ts`, or written here), including
 * any `next/font` loaders it needs. Until then `activeKit()` returns the
 * neutral kit and the site is obviously unbranded. Never point this at a
 * review kit in `review/kits/`; copy it across so the review layer can be
 * deleted afterwards (docs/BRANDING.md §4).
 */
export const PRODUCTION_KIT: BrandKit | null = null;

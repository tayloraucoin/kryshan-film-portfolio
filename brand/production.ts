import { KRYSHAN_KIT } from "@/brand/kits/kryshan";
import type { BrandKit } from "@/brand/types";

/**
 * The client's chosen kit: Kit D, copied into `brand/kits/kryshan.ts`
 * (D-SITE-2). Setting this is the one-line act that brands the site. Never
 * point it at a review kit in `review/kits/`; the review layer is deleted
 * before launch (docs/BRANDING.md §4).
 */
export const PRODUCTION_KIT: BrandKit | null = KRYSHAN_KIT;

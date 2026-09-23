import { NEUTRAL_KIT } from "@/brand/neutral";
import { PRODUCTION_KIT } from "@/brand/production";
import type { BrandKit } from "@/brand/types";

/** The kit the public site renders with. */
export function activeKit(): BrandKit {
  return PRODUCTION_KIT ?? NEUTRAL_KIT;
}

/** False while the site still wears the neutral kit. */
export function isBranded(): boolean {
  return PRODUCTION_KIT !== null;
}

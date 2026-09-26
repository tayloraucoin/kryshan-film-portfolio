import type { StaticImageData } from "next/image";
import { POSTERS } from "@/content/posters";
import directorsReel from "@/public/media/posters/directors-reel.jpg";
import glimpse from "@/public/media/posters/glimpse.jpg";
import shotlister from "@/public/media/posters/shotlister.jpg";
import theBullySolution from "@/public/media/posters/the-bully-solution.jpg";
import vandu from "@/public/media/posters/vandu.jpg";

/**
 * Posters for the review demos, which still show held films as he reviewed
 * them (SITE-2). A public film's poster comes from `content/posters.ts`, the
 * site's only poster source; a held film has no line there (its frame isn't
 * approved), so the demos fall back to its old file here. Review-only;
 * deleted with the review layer (SITE-9).
 */
const HELD_FRAMES: Readonly<Record<string, StaticImageData>> = {
  "directors-reel": directorsReel,
  glimpse,
  "the-bully-solution": theBullySolution,
  shotlister,
  vandu,
};

export function reviewPoster(slug: string): StaticImageData {
  const poster = POSTERS[slug] ?? HELD_FRAMES[slug];
  if (!poster) throw new Error(`No poster for "${slug}" in the review demos`);
  return poster;
}

/**
 * Frames the demos mark "Frame to be replaced": the ones whose new frame
 * isn't approved yet (O-SITE-13). Replaces the old `posterStatus` field.
 */
export const FRAME_TO_REPLACE: ReadonlySet<string> = new Set([
  "directors-reel",
  "glimpse",
  "the-bully-solution",
]);

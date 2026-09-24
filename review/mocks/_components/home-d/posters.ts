import type { StaticImageData } from "next/image";
import fiveRhythms from "@/public/media/posters/5rhythms.jpg";
import directorsReel from "@/public/media/posters/directors-reel.jpg";
import jack from "@/public/media/posters/jack.jpg";
import justUpTheBlock from "@/public/media/posters/just-up-the-block.jpg";
import justWatchUs from "@/public/media/posters/just-watch-us.jpg";
import theWolfOfWestGeorgiaStreet from "@/public/media/posters/the-wolf-of-west-georgia-street.jpg";

/**
 * Demo D's posters as static imports, so `next/image` gets each one's blur
 * placeholder, width and height at build time and no tile is ever blank
 * (D-KRD-11). D-only on purpose: `content/projects.ts` keeps its shape, so
 * Demo A renders unchanged. Keyed by project slug; a slug missing here
 * falls back to the project's own poster path with no blur. The real build
 * moves this into `content/posters.ts` (handoff Appendix D).
 */
export const DEMO_D_POSTERS: Readonly<Record<string, StaticImageData>> = {
  "just-watch-us": justWatchUs,
  "directors-reel": directorsReel,
  jack: jack,
  "5rhythms": fiveRhythms,
  "the-wolf-of-west-georgia-street": theWolfOfWestGeorgiaStreet,
  "just-up-the-block": justUpTheBlock,
};

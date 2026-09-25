import type { StaticImageData } from "next/image";
import fiveRhythms from "@/public/media/posters/5rhythms.jpg";
import aDogsWayHomeEpk from "@/public/media/posters/a-dogs-way-home-epk.jpg";
import aVeryBcProduction from "@/public/media/posters/a-very-bc-production.jpg";
import artless from "@/public/media/posters/artless.jpg";
import beReelGreen from "@/public/media/posters/be-reel-green.jpg";
import bornToBe from "@/public/media/posters/born-to-be.jpg";
import contactClub from "@/public/media/posters/contact-club.jpg";
import dare from "@/public/media/posters/dare.jpg";
import digitalDays from "@/public/media/posters/digital-days.jpg";
import directorsReel from "@/public/media/posters/directors-reel.jpg";
import itsACrazierLife from "@/public/media/posters/its-a-crazier-life.jpg";
import jack from "@/public/media/posters/jack.jpg";
import justUpTheBlock from "@/public/media/posters/just-up-the-block.jpg";
import justWatchUs from "@/public/media/posters/just-watch-us.jpg";
import rffcWereInThisTogether from "@/public/media/posters/rffc-were-in-this-together.jpg";
import riverdaleEwBts from "@/public/media/posters/riverdale-ew-bts.jpg";
import theWolfOfWestGeorgiaStreet from "@/public/media/posters/the-wolf-of-west-georgia-street.jpg";
import tradeswomanExhibit from "@/public/media/posters/tradeswoman-exhibit.jpg";
import tutsTwentyFiveSeasonTeaser from "@/public/media/posters/tuts-2025-season-teaser.jpg";
import tutsTwentySixTrailer from "@/public/media/posters/tuts-2026-trailer.jpg";
import unitedEights from "@/public/media/posters/united8s.jpg";

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
  "contact-club": contactClub,
  "born-to-be": bornToBe,
  "a-very-bc-production": aVeryBcProduction,
  dare: dare,
  "its-a-crazier-life": itsACrazierLife,
  "be-reel-green": beReelGreen,
  artless: artless,
  united8s: unitedEights,
  "riverdale-ew-bts": riverdaleEwBts,
  "a-dogs-way-home-epk": aDogsWayHomeEpk,
  "tuts-2026-trailer": tutsTwentySixTrailer,
  "tuts-2025-season-teaser": tutsTwentyFiveSeasonTeaser,
  "tradeswoman-exhibit": tradeswomanExhibit,
  "digital-days": digitalDays,
  "rffc-were-in-this-together": rffcWereInThisTogether,
};

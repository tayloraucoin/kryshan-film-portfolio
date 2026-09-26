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
import itsACrazierLife from "@/public/media/posters/its-a-crazier-life.jpg";
import jack from "@/public/media/posters/jack.jpg";
import justUpTheBlock from "@/public/media/posters/just-up-the-block.jpg";
import justWatchUs from "@/public/media/posters/just-watch-us.jpg";
import lyonsHeart from "@/public/media/posters/lyons-heart.jpg";
import rffcWereInThisTogether from "@/public/media/posters/rffc-were-in-this-together.jpg";
import riverdaleEwBts from "@/public/media/posters/riverdale-ew-bts.jpg";
import theWolfOfWestGeorgiaStreet from "@/public/media/posters/the-wolf-of-west-georgia-street.jpg";
import tradeswomanExhibit from "@/public/media/posters/tradeswoman-exhibit.jpg";
import tutsTwentyFiveSeasonTeaser from "@/public/media/posters/tuts-2025-season-teaser.jpg";
import tutsTwentySixTrailer from "@/public/media/posters/tuts-2026-trailer.jpg";
import twentyEights from "@/public/media/posters/twenty8s.jpg";
import unitedEights from "@/public/media/posters/united8s.jpg";

/**
 * The only poster source (spec §4.5). A line here approves that frame.
 *
 * To show a new film: put its JPEG (16:9, at most 1600 px wide) in
 * `public/media/posters/`, add one import and one line here, then set the
 * film's rights to "public" in content/projects.ts.
 *
 * Static imports give each poster its width, height and blur placeholder at
 * build time, and a missing file fails the build. Held films have no line:
 * their frames aren't approved.
 */
export const POSTERS: Readonly<Record<string, StaticImageData | undefined>> = {
  "just-watch-us": justWatchUs,
  "a-very-bc-production": aVeryBcProduction,
  artless: artless,
  jack: jack,
  "born-to-be": bornToBe,
  dare: dare,
  "just-up-the-block": justUpTheBlock,
  "riverdale-ew-bts": riverdaleEwBts,
  twenty8s: twentyEights,
  united8s: unitedEights,
  "a-dogs-way-home-epk": aDogsWayHomeEpk,
  "contact-club": contactClub,
  "the-wolf-of-west-georgia-street": theWolfOfWestGeorgiaStreet,
  "its-a-crazier-life": itsACrazierLife,
  "lyons-heart": lyonsHeart,
  "digital-days": digitalDays,
  "be-reel-green": beReelGreen,
  "rffc-were-in-this-together": rffcWereInThisTogether,
  "5rhythms": fiveRhythms,
  "tradeswoman-exhibit": tradeswomanExhibit,
  "tuts-2025-season-teaser": tutsTwentyFiveSeasonTeaser,
  "tuts-2026-trailer": tutsTwentySixTrailer,
};

/** A public film's poster. Every public film has one (content/validate.ts). */
export function posterFor(slug: string): StaticImageData {
  const poster = POSTERS[slug];
  if (!poster) throw new Error(`No approved poster for "${slug}"`);
  return poster;
}

import type { Photo } from "@/content/photo";
import { STRANDS } from "@/content/site";

/**
 * Teaching (spec §6.5): where he teaches, the programs and camps he has
 * run, how coaching starts, and who vouches for him.
 *
 * Every photo here says who is in it. A photo of anyone under 18 needs the
 * dates of the written OK from a parent or guardian and from the program;
 * a photo from Reel Youth in Whatì also needs the community's OK. The build
 * stops, naming the photo, if any of that is missing (content/validate.ts).
 * Never name a student, in a caption, alt text or anywhere else, and never
 * describe anyone as "at-risk".
 *
 * Strings marked "SITE-C" are interim: the spec's own default, or Locked
 * copy used by reference. SITE-C writes the final words; he approves them.
 */

/** The Home Teaching strand's body: Locked, with the O-SITE-5 fallback (no VFS). */
const TEACHING_STRAND =
  STRANDS.find((strand) => strand.id === "teaching")?.body ?? "";

/** The opener photo (3:2), when he sends one and it is cleared. */
const OPENER_PHOTO: Photo | undefined = undefined;

/** In the room: up to three photos he has sent and cleared (3:2, captioned). */
const ROOM_PHOTOS: ReadonlyArray<Photo> = [];

export const TEACHING = {
  /** The page's name, in the tab and the bar. */
  title: "Teaching",
  /** The h1: the spec's provisional default (D-SITE-17); no red phrase. */
  // SITE-C: provisional default (spec §6.5); not approved
  h1: "Bring a story. You’ll leave having directed, shot and cut it.",
  /** One or two sentences under the h1 (≤40 words). */
  // SITE-C: interim, the Home Teaching strand by reference; not approved
  opener: TEACHING_STRAND,
  // Widened on purpose: the slot holds a Photo once he sends one.
  openerPhoto: OPENER_PHOTO as Photo | undefined,
  blocks: {
    whereITeach: {
      heading: "Where I teach",
      /** Vancouver Film School is left out until he confirms it (O-SITE-5). */
      items: [
        "LaSalle College (2023–present)",
        "InFocus Film School (2010–2022)",
      ],
    },
    programs: {
      heading: "Programs and camps",
      /** Places as the places spell them. Frames' descriptor waits on his and Frog Hollow's wording (O-SITE-14). */
      items: [
        "Frames Film Project (founder, with Frog Hollow Neighbourhood House, 2012–2015)",
        "Reel Youth: Whatì, NWT and Mississauga (2017–2018)",
        "CEDIM, Mexico: visiting professor (2010)",
        "Camps in Victoria and Toronto",
        "Remote camps",
      ],
      /** One line of camp facts (ages, length, what they leave with, his check); empty until O-SITE-14. */
      factsLine: "",
    },
    coaching: {
      heading: "One-on-one coaching",
      /** ≤50 words, from the first step; no price. */
      // SITE-C: interim, the one sentence spec §6.5 gives; not approved
      body: "Tell me what you’re making and where it’s stuck.",
    },
  },
  roomPhotos: ROOM_PHOTOS,
  /** The heading over teaching testimonials. */
  testimonialsHeading: "What people say",
  /** The page's closing sentence (Locked, 06-A §4). */
  handOff: "If you run a program or want coaching, email me.",
  /** The meta description. */
  // SITE-C: interim, the Home Teaching strand by reference; not approved
  description: TEACHING_STRAND,
} as const;

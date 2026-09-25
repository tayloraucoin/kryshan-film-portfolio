import type { Photo } from "@/content/photo";

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
 * A "Copy row" comment names the string's row in
 * docs/client/kryshan-09-copy-for-approval.md, the one record of what he has
 * approved; change a string there and here together.
 */

/** The opener photo (3:2), when he sends one and it is cleared. */
const OPENER_PHOTO: Photo | undefined = undefined;

/** In the room: up to three photos he has sent and cleared (3:2, captioned). */
const ROOM_PHOTOS: ReadonlyArray<Photo> = [];

export const TEACHING = {
  /** The page's name, in the tab and the bar. */
  title: "Teaching",
  /** The h1: the spec's provisional default (D-SITE-17); no red phrase. */
  // Copy row T-1
  h1: "Bring a story. You’ll leave having directed, shot and cut it.",
  /** One or two sentences under the h1 (≤40 words). */
  // Copy row T-2
  opener:
    "I teach directing, camera and editing at LaSalle College. I run film camps and programs for young people and coach filmmakers one on one.",
  // Widened on purpose: the slot holds a Photo once he sends one.
  openerPhoto: OPENER_PHOTO as Photo | undefined,
  blocks: {
    whereITeach: {
      heading: "Where I teach",
      // Copy row T-3
      /** The second school is left out until he confirms it (O-SITE-5). */
      items: [
        "LaSalle College (2023–present)",
        "InFocus Film School (2010–2022)",
      ],
    },
    programs: {
      heading: "Programs and camps",
      /** Places as the places spell them. Frames' descriptor waits on his and Frog Hollow's wording (O-SITE-14). */
      // Copy row T-3
      items: [
        "Frames Film Project (founder, with Frog Hollow Neighbourhood House, 2012–2015)",
        "Reel Youth: Whatì, NWT and Mississauga (2017–2018)",
        "CEDIM, Mexico: visiting professor (2010)",
        "Camps in Victoria and Toronto",
        "Remote camps",
      ],
      /** One line of camp facts (ages, length, what they leave with, his check); empty until O-SITE-14. */
      // Copy row T-4 (held)
      factsLine: "",
    },
    coaching: {
      heading: "One-on-one coaching",
      /** ≤50 words, from the first step; no price. */
      // Copy row T-5
      body: "Tell me what you’re making and where it’s stuck. For students and working filmmakers: one session on the script, the shoot or the edit, or a series of them.",
    },
  },
  roomPhotos: ROOM_PHOTOS,
  /** The heading over teaching testimonials. */
  testimonialsHeading: "What people say",
  /** The page's closing sentence (Locked, 06-A §4). */
  handOff: "If you run a program or want coaching, email me.",
  /** The meta description (≤155 characters). */
  // Copy row T-7
  description:
    "Film teaching with Kryshan Randel: directing, camera and editing at LaSalle College, film camps and one-on-one coaching.",
} as const;

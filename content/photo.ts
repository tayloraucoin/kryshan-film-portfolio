import type { StaticImageData } from "next/image";
import type { IsoDate } from "@/lib/iso-date";

/**
 * A photograph on About or Teaching (spec §4.5, §11). Every photo says who
 * is in it; there is no default, so a photo can't be added without
 * answering. Photos of young people need the written OK of a parent or
 * guardian and of the program, both dated; photos from Reel Youth in Whatì
 * also need the community's OK (`communityConsent`). `content/validate.ts`
 * stops the build if any of these is missing.
 */
export type PhotoPeople =
  | "none-identifiable"
  | "adults"
  | {
      minors: true;
      guardianConsent: IsoDate;
      programConsent: IsoDate;
      communityConsent?: IsoDate;
    };

export type Photo = {
  /** A static import from `public/media/`, so size and blur come for free and a missing file fails the build. */
  src: StaticImageData;
  /** What he's doing and where. Adults named only with their OK; never students (spec §7.6). */
  alt: string;
  caption: string;
  people: PhotoPeople;
};

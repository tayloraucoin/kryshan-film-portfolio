import type { ComponentType } from "react";
import type { ReviewKit, ReviewRound } from "@/review/kits/types";
import { HomeA } from "@/review/mocks/home-a";
import { HomeB } from "@/review/mocks/home-b";
import { HomeC } from "@/review/mocks/home-c";
import { HomeD } from "@/review/mocks/home-d";

/**
 * The demo home pages: one kit paired with one layout, rendered live in the
 * kit's tokens. The component receives the kit and renders inside its scope;
 * it should be a server component, and it must not import anything from
 * `app/`.
 *
 * Kryshan's three pairings (KR-1..3), each built from his real titles,
 * posters and copy; shared leaves live in `review/mocks/_components/`.
 * Round 2 adds Home D, Home A revised after his review (KR-7..9), with its
 * own leaves in `review/mocks/_components/home-d/`.
 */
export type ReviewMock = {
  id: string;
  letter: string;
  name: string;
  kitId: string;
  layoutId: string;
  Component: ComponentType<{ kit: ReviewKit }>;
  placeholder?: boolean;
  /** Absent means round 1; Home D is round 2 (D-KRD-17). */
  round?: ReviewRound;
  /** The mock this one is compared with, before/after (D-KRD-18). */
  comparesWith?: string;
};

export const REVIEW_MOCKS: ReadonlyArray<ReviewMock> = [
  {
    id: "home-a",
    letter: "A",
    name: "Home A · Kit A × The Marquee",
    kitId: "kryshan-a",
    layoutId: "kryshan-a",
    Component: HomeA,
    comparesWith: "home-d",
  },
  {
    id: "home-b",
    letter: "B",
    name: "Home B · Kit B × The Study",
    kitId: "kryshan-b",
    layoutId: "kryshan-b",
    Component: HomeB,
  },
  {
    id: "home-c",
    letter: "C",
    name: "Home C · Kit C × The Index",
    kitId: "kryshan-c",
    layoutId: "kryshan-c",
    Component: HomeC,
  },
  {
    id: "home-d",
    letter: "D",
    name: "Home D · Kit D × The Marquee, revised",
    kitId: "kryshan-d",
    layoutId: "kryshan-d",
    Component: HomeD,
    round: 2,
    comparesWith: "home-a",
  },
];

export function findReviewMock(id: string): ReviewMock | undefined {
  return REVIEW_MOCKS.find((mock) => mock.id === id);
}

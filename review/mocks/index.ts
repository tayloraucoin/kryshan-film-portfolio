import type { ComponentType } from "react";
import type { ReviewKit } from "@/review/kits/types";
import { HomeA } from "@/review/mocks/home-a";
import { HomeB } from "@/review/mocks/home-b";
import { HomeC } from "@/review/mocks/home-c";

/**
 * The demo home pages: one kit paired with one layout, rendered live in the
 * kit's tokens. The component receives the kit and renders inside its scope;
 * it should be a server component, and it must not import anything from
 * `app/`.
 *
 * Kryshan's three pairings (KR-1..3), each built from his real titles,
 * posters and copy; shared leaves live in `review/mocks/_components/`.
 */
export type ReviewMock = {
  id: string;
  letter: string;
  name: string;
  kitId: string;
  layoutId: string;
  Component: ComponentType<{ kit: ReviewKit }>;
  placeholder?: boolean;
};

export const REVIEW_MOCKS: ReadonlyArray<ReviewMock> = [
  {
    id: "home-a",
    letter: "A",
    name: "Home A · Kit A × The Marquee",
    kitId: "kryshan-a",
    layoutId: "kryshan-a",
    Component: HomeA,
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
];

export function findReviewMock(id: string): ReviewMock | undefined {
  return REVIEW_MOCKS.find((mock) => mock.id === id);
}

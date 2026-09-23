import type { ComponentType } from "react";
import type { ReviewKit } from "@/review/kits/types";
import { HomeA } from "@/review/mocks/home-a";
import { PlaceholderHome } from "@/review/mocks/placeholder-home";

/**
 * The demo home pages: one kit paired with one layout, rendered live in the
 * kit's tokens. The component receives the kit and renders inside its scope;
 * it should be a server component, and it must not import anything from
 * `app/`.
 *
 * Batch 7 replaces the three entries with one component per pairing
 * (`review/mocks/mock-a.tsx`, …), each built from the client's real titles,
 * posters and copy.
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
    id: "mock-b",
    letter: "B",
    name: "Kit B × Layout B",
    kitId: "kit-b",
    layoutId: "layout-b",
    Component: PlaceholderHome,
    placeholder: true,
  },
  {
    id: "mock-c",
    letter: "C",
    name: "Kit C × Layout C",
    kitId: "kit-c",
    layoutId: "layout-c",
    Component: PlaceholderHome,
    placeholder: true,
  },
];

export function findReviewMock(id: string): ReviewMock | undefined {
  return REVIEW_MOCKS.find((mock) => mock.id === id);
}

import { KRYSHAN_KIT_A } from "@/review/kits/kryshan-a";
import { KRYSHAN_KIT_B } from "@/review/kits/kryshan-b";
import { KRYSHAN_KIT_C } from "@/review/kits/kryshan-c";
import type { ReviewKit } from "@/review/kits/types";

/**
 * The kits the review round offers, in the order they are shown.
 *
 * Kryshan's three kits (KR-1..3). Keep three: the review index, the feedback form and the mock pairing all
 * assume a set the client can compare, and two is a coin flip.
 */
export const REVIEW_KITS: ReadonlyArray<ReviewKit> = [
  KRYSHAN_KIT_A,
  KRYSHAN_KIT_B,
  KRYSHAN_KIT_C,
];

export function findReviewKit(id: string): ReviewKit | undefined {
  return REVIEW_KITS.find((kit) => kit.id === id);
}

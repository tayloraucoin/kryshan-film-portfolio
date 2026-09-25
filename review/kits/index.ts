import { KRYSHAN_KIT_A } from "@/review/kits/kryshan-a";
import { KRYSHAN_KIT_B } from "@/review/kits/kryshan-b";
import { KRYSHAN_KIT_C } from "@/review/kits/kryshan-c";
import { KRYSHAN_KIT_D } from "@/review/kits/kryshan-d";
import type { ReviewKit } from "@/review/kits/types";

/**
 * The kits the review layer offers, in the order they are shown.
 *
 * Round 1: Kryshan's three kits (KR-1..3), the set he compared and answered
 * on. Round 2: kit D, kit A revised after his review (KR-7). Consumers that
 * belong to one round filter with `roundOf` (review/kits/types.ts).
 */
export const REVIEW_KITS: ReadonlyArray<ReviewKit> = [
  KRYSHAN_KIT_A,
  KRYSHAN_KIT_B,
  KRYSHAN_KIT_C,
  KRYSHAN_KIT_D,
];

export function findReviewKit(id: string): ReviewKit | undefined {
  return REVIEW_KITS.find((kit) => kit.id === id);
}

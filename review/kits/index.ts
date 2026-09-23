import { KRYSHAN_KIT_A } from "@/review/kits/kryshan-a";
import { KRYSHAN_KIT_B } from "@/review/kits/kryshan-b";
import { PLACEHOLDER_KIT_C } from "@/review/kits/placeholder-c";
import type { ReviewKit } from "@/review/kits/types";

/**
 * The kits the review round offers, in the order they are shown.
 *
 * Batch 7 replaces the three placeholder imports with the client's kits.
 * Keep three: the review index, the feedback form and the mock pairing all
 * assume a set the client can compare, and two is a coin flip.
 */
export const REVIEW_KITS: ReadonlyArray<ReviewKit> = [
  KRYSHAN_KIT_A,
  KRYSHAN_KIT_B,
  PLACEHOLDER_KIT_C,
];

export function findReviewKit(id: string): ReviewKit | undefined {
  return REVIEW_KITS.find((kit) => kit.id === id);
}

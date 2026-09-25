import { SITE } from "@/lib/config";
import { KRYSHAN_KIT_A } from "@/review/kits/kryshan-a";
import type { ReviewKit } from "@/review/kits/types";

/**
 * Kit D · Kit A, revised after Kryshan's review (demo-d-ux-handoff-v1.md §4,
 * Appendix C; D-KRD-2).
 *
 * Every colour, font loader, radius, ramp, type step and shared mock
 * variable is kit A's, by reference: he chose A's look, so the before/after
 * comparison is about structure, and kit A's file is never touched. Only the
 * words change: the pillars in his order (04 Step 8), the passion label as
 * the one lane label, a contact line from `SITE.email`, and four more
 * "never"s learned from the review.
 */
export const KRYSHAN_KIT_D: ReviewKit = {
  ...KRYSHAN_KIT_A,
  id: "kryshan-d",
  letter: "D",
  name: "Kryshan D · Kit A, revised after review · red on black",
  round: 2,
  thesis:
    "Kit A after your review. The same dark room and the same single red, with the pillars in your order: Wicked, Resourceful, Galvanizing. What changed is how little sits around the work: your name once, and nothing beside a playing film except its title, its credits and your email.",
  roles: [
    ...(KRYSHAN_KIT_A.roles ?? []),
    {
      name: "Passion label",
      hex: "#f2716b", // tokens A.red.300 (kit A's --link)
      use: "The one lane label: “Passion project” in small red. Paid work is named by its client in secondary text, never “For hire”.",
    },
  ],
  voice: {
    ...KRYSHAN_KIT_A.voice,
    contact: `No agent, no form, no waiting. ${SITE.email}`,
  },
  never: [
    ...KRYSHAN_KIT_A.never,
    "His name twice on one screen.",
    "A link that looks live and goes nowhere.",
    "“For hire” as a label.",
    "Anything over the video but the video.",
  ],
  placeholder: false,
};

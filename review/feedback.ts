import type { FeedbackOption, FeedbackSection } from "@/lib/review/types";
import { reviewRoutes } from "@/lib/routes";
import { REVIEW_KITS } from "@/review/kits";
import { findReviewLayout, REVIEW_LAYOUTS } from "@/review/layouts";
import { REVIEW_MOCKS } from "@/review/mocks";

/**
 * Kryshan's feedback questions (KR-6), as data. The form renders these in
 * order; the server action snapshots their labels onto the wire
 * (docs/REVIEW-BACKEND-CONTRACT.md §4a, M-KR-4). The next client's round
 * replaces this file and `FEEDBACK_SCHEMA`; nothing else changes.
 *
 * The question-set document, with the build decision or source line each
 * question serves and what was cut and why, is in
 * docs/specs/01-review-round/KR-6-feedback-questions.md ("Question set"). Every wording
 * here traces to it. Kit, layout, pillar and demo names come from the live
 * registries, never typed twice.
 *
 * The three free-text boxes are not here: they are the contract's own
 * `flinch` / `fightFor` / `notes` fields and the form renders them last.
 */
export const FEEDBACK_SCHEMA = "kryshan-2026-09";

/**
 * The pillars exactly as the round asked about them (KR-6). Frozen here, not
 * read from `review/brand.ts`: the brand was amended after he answered
 * (04 Step 8, Generous replaced by Galvanizing), and a submitted form's
 * options must not change underneath its schema.
 */
const ROUND_1_PILLARS: FeedbackOption[] = [
  {
    id: "wicked",
    label: "Wicked",
    detail:
      "Funny and dark at once, and very good at it. The joke lands last and is never announced.",
  },
  {
    id: "generous",
    label: "Generous",
    detail:
      "You make the people around you their best selves, and you credit them by name.",
  },
  {
    id: "resourceful",
    label: "Resourceful",
    detail:
      "Any genre, any budget, and it still comes out slick. Fast is common; fast and slick at these numbers is yours.",
  },
];

/** "Wicked leads · red on black", from "Kryshan A · Wicked leads · red on black". */
function kitDescriptor(name: string): string {
  return name.split(" · ").slice(1).join(" · ");
}

const kitOptions: FeedbackOption[] = REVIEW_KITS.map((kit) => ({
  id: kit.id,
  label: `Kit ${kit.letter}`,
  detail: kitDescriptor(kit.name),
}));

/** "As in layout A", so a fork's options name the layout it comes from. */
function asIn(layoutId: string): string {
  const layout = findReviewLayout(layoutId);
  return layout ? `As in layout ${layout.letter}` : "";
}

/** The nine demos: every layout in every kit (KR-5). */
function combinationOptions(withLegacy: boolean): FeedbackOption[] {
  return REVIEW_LAYOUTS.flatMap((layout) =>
    REVIEW_KITS.map((kit) => {
      const mock = REVIEW_MOCKS.find((m) => m.layoutId === layout.id);
      return {
        id: `${layout.id}.${kit.id}`,
        label: `Layout ${layout.letter} · ${layout.name}, in kit ${kit.letter}`,
        detail:
          kit.id === layout.kitId
            ? "The kit it was designed with"
            : kitDescriptor(kit.name),
        sets: withLegacy
          ? {
              preferredKit: kit.id,
              preferredLayout: layout.id,
              preferredMock: mock?.id ?? null,
            }
          : undefined,
      };
    }),
  );
}

export const FEEDBACK_SECTIONS: ReadonlyArray<FeedbackSection> = [
  {
    id: "favourite",
    title: "Your favourite",
    intro:
      "Three layouts, each in three kits: nine demo home pages. Go with your gut.",
    links: [{ label: "All the options", href: reviewRoutes.index }],
    questions: [
      {
        kind: "choice",
        id: "favourite.first",
        label: "Which demo would you send a producer to?",
        options: combinationOptions(true),
      },
      {
        kind: "choice",
        id: "favourite.second",
        label: "And your second?",
        options: combinationOptions(false),
      },
    ],
  },
  {
    id: "brand",
    title: "The brand",
    intro: "Three ideas every option is built on. Only one can lead.",
    links: [{ label: "Your brand in one page", href: reviewRoutes.brand }],
    questions: [
      {
        kind: "rank",
        id: "brand.lead",
        label: "Which should lead?",
        hint: "Put them in order. First place decides the kit.",
        options: ROUND_1_PILLARS,
      },
      {
        kind: "scale",
        id: "brand.fit",
        label: "How much do these three sound like you?",
        ends: { low: "Not me", high: "Exactly me" },
        note: {
          prompt:
            "What rings true, and what doesn’t? Put it in your own words.",
          open: true,
        },
      },
    ],
  },
  {
    id: "kits",
    title: "The kits",
    intro:
      "Rank each part on its own. You can love one kit’s colours and another’s type.",
    links: REVIEW_KITS.map((kit) => ({
      label: `Kit ${kit.letter}`,
      href: reviewRoutes.kit(kit.id),
    })),
    questions: [
      {
        kind: "rank",
        id: "kit.colour",
        label: "Colour",
        hint: "The background, and the one strong colour on your name.",
        options: kitOptions,
      },
      {
        kind: "rank",
        id: "kit.type",
        label: "Type",
        hint: "Your name and the headings.",
        options: kitOptions,
      },
      {
        kind: "rank",
        id: "kit.voice",
        label: "How it sounds",
        hint: "The sample lines: the headline, the About lines, the contact line.",
        options: kitOptions,
      },
      {
        kind: "choice",
        id: "kit.role-colours",
        label: "Coloured dots for Directing, Camera and Editing?",
        hint: "Kit C gives each role its own colour. The others use words.",
        options: [
          { id: "yes", label: "Yes, colour them" },
          { id: "no", label: "No, words are enough" },
        ],
      },
    ],
  },
  {
    id: "layouts",
    title: "The layouts",
    intro:
      "Four things the layouts disagree on. Pick what you’d want, whichever layout it comes from.",
    links: REVIEW_LAYOUTS.map((layout) => ({
      label: `Layout ${layout.letter}`,
      href: reviewRoutes.layout(layout.id),
    })),
    questions: [
      {
        kind: "choice",
        id: "layout.first",
        label: "What should someone see first on Home?",
        hint: "You asked for “a 10–20 second highlight reel and/or a photo of me.” Here are the ways it can go.",
        options: [
          {
            id: "grid",
            label: "My films, straight away. No banner.",
            detail: asIn("kryshan-a"),
          },
          {
            id: "featured",
            label: "One film big at the top, then the rest.",
            detail: "Layout A with one featured film added",
          },
          {
            id: "strip",
            label: "A strip of films to swipe through.",
            detail: asIn("kryshan-b"),
          },
          {
            id: "statement",
            label: "One line about what I do, then the list.",
            detail: asIn("kryshan-c"),
          },
        ],
      },
      {
        kind: "choice",
        id: "layout.nav",
        label: "Which menu works best?",
        hint: "The strip with your name and the page links. Each layout does it differently.",
        options: [
          {
            id: "top-bar",
            label:
              "A bar across the top: my name on the left, the pages on the right",
            detail: asIn("kryshan-a"),
          },
          {
            id: "side-column",
            label:
              "A column down the left: my name, the pages, three lines about me and my email, always there",
            detail: asIn("kryshan-b"),
          },
          {
            id: "top-bar-spaced",
            label: "A bar across the top with the pages in spaced-out capitals",
            detail: asIn("kryshan-c"),
          },
        ],
        note: {
          prompt: "What works or doesn’t about each one?",
          open: true,
        },
      },
      {
        kind: "choice",
        id: "layout.split",
        label: "Passion projects and paid work: how should they sit?",
        options: [
          {
            id: "one-grid",
            label: "One grid, with passion projects labelled",
            detail: asIn("kryshan-a"),
          },
          {
            id: "two-sections",
            label: "Two sections, each with its own name",
            detail: asIn("kryshan-b"),
          },
          {
            id: "column",
            label: "A column in a list I can sort",
            detail: asIn("kryshan-c"),
          },
        ],
      },
      {
        kind: "choice",
        id: "layout.lane-names",
        label: "What should the two be called?",
        // The next question is his own words for it; a second box would ask twice.
        note: false,
        hint: "The third is Petros’s line, which you called brilliant.",
        options: [
          { id: "passion-for-hire", label: "Passion projects · For hire" },
          {
            // 03 §8 wrote "because I had to"; Taylor: "wanted to" reads truer.
            id: "wanted-to-hired",
            label:
              "Films I made because I wanted to · Films I was hired to make",
          },
          { id: "art-paid", label: "Art · Art I got paid for" },
        ],
      },
      {
        kind: "text",
        id: "layout.lane-names-own",
        label: "Or in your own words",
        maxLength: 200,
      },
      {
        kind: "choice",
        id: "layout.fifth",
        label: "The fifth page",
        hint: "Teaching gets a page, or your full behind-the-scenes credits list does. The other goes on About.",
        options: [
          { id: "teaching", label: "Teaching" },
          { id: "credits", label: "Credits" },
          { id: "neither", label: "Neither. Keep it to four pages." },
        ],
      },
      {
        kind: "scale",
        id: "layout.me-on-home",
        label: "How much of you should be on Home?",
        hint: "Layout A gives you one square; layout B, a column on every page.",
        ends: { low: "Just a line", high: "Always there" },
      },
    ],
  },
];

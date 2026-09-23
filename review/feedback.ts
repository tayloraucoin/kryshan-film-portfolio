import type {
  FeedbackOption,
  FeedbackQuestion,
  FeedbackSection,
} from "@/lib/review/types";
import { reviewRoutes } from "@/lib/routes";
import { PILLARS } from "@/review/brand";
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
 * docs/specs/KR-6-feedback-questions.md ("Question set"). Every wording
 * here traces to it. Kit, layout, pillar and demo names come from the live
 * registries, never typed twice.
 *
 * The three free-text boxes are not here: they are the contract's own
 * `flinch` / `fightFor` / `notes` fields and the form renders them last.
 */
export const FEEDBACK_SCHEMA = "kryshan-2026-09";

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

/** The intake's sliders, re-asked with the intake's own labels and ends. */
function nowSlider(
  id: string,
  label: string,
  low: string,
  high: string,
): FeedbackQuestion {
  return { kind: "scale", id, label, ends: { low, high } };
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
        options: PILLARS.map((pillar) => ({
          id: pillar.id,
          label: pillar.name,
          detail: pillar.meaning,
        })),
      },
      {
        kind: "scale",
        id: "brand.fit",
        label: "How much do these three sound like you?",
        ends: { low: "Not me", high: "Exactly me" },
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
        hint: "The third is Petros’s line, which you called brilliant.",
        options: [
          { id: "passion-for-hire", label: "Passion projects · For hire" },
          {
            id: "had-to-hired",
            label: "Films I made because I had to · Films I was hired to make",
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
  {
    id: "now",
    title: "Now that you’ve seen them",
    intro:
      "You answered these before you’d seen anything. Answer again for the site you want now.",
    questions: [
      nowSlider("now.meet-first", "Who they meet first", "The work", "You"),
      nowSlider(
        "now.way-through",
        "How they get through it",
        "They roam",
        "You lead",
      ),
      nowSlider(
        "now.around-the-work",
        "What sits around each piece",
        "Just the piece",
        "The whole story",
      ),
      nowSlider(
        "now.where-the-look-lives",
        "Where the personality lives",
        "In the work",
        "In the site",
      ),
      nowSlider(
        "now.what-carries-it",
        "What carries the work",
        "Frames",
        "Footage",
      ),
      nowSlider("now.temperature", "Cool or warm", "Cool", "Warm"),
      nowSlider("now.presence", "Understated or bold", "Understated", "Bold"),
      nowSlider("now.levity", "Serious or playful", "Serious", "Playful"),
      nowSlider(
        "now.era",
        "Timeless or of its moment",
        "Timeless",
        "Of its moment",
      ),
    ],
  },
];

/**
 * His intake answers to the same sliders (docs/client/kryshan-02-success-
 * criteria.md §1.3, §2.2, §3.4, §12), on the 0.0–7.0 scale; 02's "6/7" is
 * 6.0. Attached by the server action for Taylor's email and never sent to
 * the browser, so they cannot anchor the new answer.
 */
export const INTAKE_BASELINES: Readonly<Record<string, number>> = {
  "now.meet-first": 6.0,
  "now.way-through": 2.0,
  "now.around-the-work": 5.0,
  "now.where-the-look-lives": 5.0,
  "now.what-carries-it": 5.0,
  "now.temperature": 6.0,
  "now.presence": 6.0,
  "now.levity": 6.0,
  "now.era": 3.0,
};

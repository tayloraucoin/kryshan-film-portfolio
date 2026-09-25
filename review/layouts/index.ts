import type { ReviewRound } from "@/review/kits/types";

/**
 * The layouts the review round offers. Each layout page leads with a short
 * brief for the client (what to expect, why, what it costs), then the full
 * deliverable: the markdown file beside this index, rendered as-is and
 * folded away (Batch 6's `kryshan-06-layout-X.md`, unchanged).
 *
 * `kitId` names the kit it was designed with, so the layout page can render
 * inside that kit's scope and the index can show the pairing.
 *
 * The briefs are the plain-language cut of 06 (layouts and overview); the
 * quotes in `because` are his own words from the intake, as recorded in
 * docs/client/kryshan-02-success-criteria.md.
 */

/** The same five questions, in the same order, for every layout. */
export const BRIEF_QUESTIONS = [
  "First thing a visitor sees",
  "How a film plays",
  "How much of you is on Home",
  "Passion and paid work",
  "The five pages",
] as const;

export type LayoutBrief = {
  /** The idea, in one or two plain sentences. */
  idea: string;
  /** Answers to `BRIEF_QUESTIONS`, same order. */
  answers: readonly [string, string, string, string, string];
  /** Why, traced to something he said. */
  because: ReadonlyArray<{ quote: string; source: string; so: string }>;
  /** What this layout gives up, said plainly. */
  givesUp: string;
};

export type ReviewLayout = {
  id: string;
  letter: string;
  name: string;
  /** One line: the structural idea. */
  thesis: string;
  kitId: string;
  /** The demo home page that shows this layout. */
  mockId: string;
  /** Filename inside `review/layouts/`. */
  file: string;
  brief: LayoutBrief;
  placeholder?: boolean;
  /** Absent means round 1; layout D (A, revised) is round 2 (D-KRD-17). */
  round?: ReviewRound;
};

/**
 * Layout A's brief, as the round showed it. (KR-7 started layout D from it;
 * KR-8 gave D its own, handoff Appendix A.)
 */
const LAYOUT_A_BRIEF: LayoutBrief = {
  idea: "Your work is the first thing anyone sees. There is no big banner at the top: your films start on the first pixel, and your name sits in the first square of the grid.",
  answers: [
    "A grid of your films. Your name and one line about you fill the first square.",
    "Tap a frame and it grows right where it is and plays. The other frames move aside. Nobody leaves the page.",
    "One square: your name and “Director, camera operator, editor, and film instructor. Vancouver, works anywhere.” Your photo and story are on About.",
    "One grid for everything. Passion projects carry a small “Passion project” label; tabs let a producer see only Directing, Camera or Editing.",
    "Home · Work · About · Teaching · Contact.",
  ],
  because: [
    {
      quote: "one or two clicks too many for people to actually watch",
      source: "your goals, about the old site",
      so: "Here it is one tap from landing to playing.",
    },
    {
      quote: "my favorite way so far of seeing videos on pages",
      source: "you, on Jacob McKee’s site",
      so: "The frame grows in place, the way his does.",
    },
    {
      quote: "Make clients want to hire me within 30 seconds",
      source: "your goals",
      so: "A producer sees your range before reading a word.",
    },
  ],
  givesUp:
    "You asked for a short highlight reel and/or a photo at the top. This layout leaves both out on purpose, so the work leads. If you miss them, we can add one featured video above the grid without changing anything else.",
};

export const REVIEW_LAYOUTS: ReadonlyArray<ReviewLayout> = [
  {
    id: "kryshan-a",
    letter: "A",
    name: "The Marquee",
    thesis:
      "A director's site with no hero. A cell expands in place to play; the others move aside.",
    kitId: "kryshan-a",
    mockId: "home-a",
    file: "kryshan-a.md",
    brief: LAYOUT_A_BRIEF,
  },
  {
    id: "kryshan-b",
    letter: "B",
    name: "The Study",
    thesis:
      "A persistent left rail carries him on every page. The work plays in a lightbox over the dimmed page.",
    kitId: "kryshan-b",
    mockId: "home-b",
    file: "kryshan-b.md",
    brief: {
      idea: "You are always on the page. A column down the left carries your name, three lines about you and your email, on every page, and the work sits beside it.",
      answers: [
        "Three of your films in a strip you can swipe through (Just Watch Us, Directors Reel, Jack), with the column beside them.",
        "The strip plays in place. Other films open in a window over the page, with arrows to the next one.",
        "A lot: the column, always. Home also carries the names you’ve worked with and two press quotes.",
        "Two sections, one for passion projects and one for hired work, each named in your words. Directing, Camera and Editing filters inside each.",
        "Home · Work · About · Teaching · Contact.",
      ],
      because: [
        {
          quote: "10–20 second highlight reel and/or a photo of me",
          source: "what you wanted on Home",
          so: "The strip gives the top of the page a reel without needing a new cut.",
        },
        {
          quote: "art / art I got paid for",
          source: "Petros’s split, which you called “brilliant”",
          so: "Your two kinds of work get two sections, each named by you.",
        },
        {
          quote: "most of my best work I can't show",
          source: "you, on the NDA’d work",
          so: "The names and press sit on Home, so a producer sees the proof without going looking.",
        },
      ],
      givesUp:
        "More of you means less room for the work on the first screen, and the column takes a strip of width on every page. On a phone the column becomes a header and a bar at the bottom.",
    },
  },
  {
    id: "kryshan-c",
    letter: "C",
    name: "The Index",
    thesis:
      "The work as a list. A row expands into a player with the credits reflowing around it.",
    kitId: "kryshan-c",
    mockId: "home-c",
    file: "kryshan-c.md",
    brief: {
      idea: "Your work as a list, like a credits sheet. One short statement at the top, then each film as a row with a small frame, its year, your role and who it was for.",
      answers: [
        "“Any story. Any budget. Told properly.” and your roles line, then the list begins.",
        "Tap a row and it opens into a player right there. The list moves down to make room.",
        "One sentence at the top. The full behind-the-scenes credits list, sixty-odd productions, gets a page of its own.",
        "A column says passion or for hire. Every row shows its roles as coloured dots (Directing, Camera, Editing), and the list can be filtered and sorted.",
        "Home · Work · About · Credits · Contact. Teaching becomes a section on About.",
      ],
      because: [
        {
          quote: "all business and brevity",
          source: "you, on Airview",
          so: "A plain statement and a list, nothing decorative.",
        },
        {
          quote: "most of my best work I can't show",
          source: "you, on the NDA’d work",
          so: "The Credits page lists what you can’t show, so it still counts.",
        },
        {
          quote: "Directing · Camera · Editing",
          source: "how you asked for the work to be organised",
          so: "Your role is on every row, at a glance.",
        },
      ],
      givesUp:
        "Small frames make the first impression less cinematic. A producer can scan your range fastest here, but each film has to earn a click from a thumbnail. Teaching loses its own page.",
    },
  },
  {
    id: "kryshan-d",
    letter: "D",
    name: "The Marquee, revised",
    thesis:
      "Layout A after your review: your name once, your films first, and a film that opens across the page right where you tapped it.",
    kitId: "kryshan-d",
    mockId: "home-d",
    file: "kryshan-d.md",
    round: 2,
    brief: {
      idea: "Layout A after your review. Your films still come first, with no banner. Your name is set once, in the bar at the top, and stays there as you scroll. Tap a film and it opens across the whole page, right below where you tapped, and plays.",
      answers: [
        "Your name in the bar at the top, then the grid. The first, wider square is you, in your words: “I direct, shoot and edit stories that are hard to look away from.”",
        "Tap it and it opens full width, just below the row you tapped, and plays. Its title, credits and your email sit beside or below it. The ✕ right above the film closes it; the player’s own button makes it full screen.",
        "Your name, always, in the bar that stays at the top. Your line in the first square, and your photo there too once you send a current one.",
        "One grid. Passion projects carry a small red “Passion project” label; everything else carries the client’s name. “For hire” appears nowhere.",
        "Home · Work · About · Teaching · Contact. This demo is the home page; the other pages follow the same rules.",
      ],
      because: [
        {
          quote: "My name twice",
          source: "your review",
          so: "It’s set once now, and it never leaves the screen.",
        },
        {
          quote: "maybe just an 'x' instead?",
          source: "your review, on the Close button",
          so: "An ✕ right above the film, where you look first.",
        },
        {
          quote: "if videos go full screen it might not be needed",
          source: "your review, on “Full page”",
          so: "The film opens across the whole page, and “Full page” is gone.",
        },
        {
          quote: "a few more elements to borrow from what Netflix does so well",
          source: "your review",
          so: "Rows you swipe across, a bar that stays put, a genre line on every film. Nothing that plays or moves by itself.",
        },
      ],
      givesUp:
        "Your wider square takes the place of two films in the top grid; Contact Club and Born To Be now start the Directing row below. Your email stays under each film you open, on its own line: it’s the one thing a producer needs right after watching. And some Netflix habits are left out on purpose: previews that play by themselves, a big banner, anything that loads before someone asks.",
    },
  },
];

export function findReviewLayout(id: string): ReviewLayout | undefined {
  return REVIEW_LAYOUTS.find((layout) => layout.id === id);
}

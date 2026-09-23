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
    brief: {
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
    },
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
];

export function findReviewLayout(id: string): ReviewLayout | undefined {
  return REVIEW_LAYOUTS.find((layout) => layout.id === id);
}

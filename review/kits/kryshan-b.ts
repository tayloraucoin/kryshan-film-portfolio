import { Fraunces, Space_Mono, Work_Sans } from "next/font/google";
import type { ReviewKit } from "@/review/kits/types";

/**
 * Kit B · Generous leads · red on warm cream.
 *
 * Every colour is from docs/client/branding/kryshan-05-tokens.json → B;
 * every sentence is from the brand-kit PDF's Kit B pages
 * (kryshan-05-brand-kits-source.py, KIT_B), except the one correction the
 * KR-2 prompt makes: red 500 on cream is 4.1:1, AA for large text only, so
 * text-size red is `accent` (red 600, 6.2:1), never `primary`.
 *
 * Extra variables (docs/BRANDING.md §3a):
 * - `--surface-dark` (neutral 900): the band the work grid sits on, so night
 *   frames don't punch holes in the cream. Cream (`background`) is the text
 *   colour on it.
 * - `--font-quote`: Fraunces Italic, press quotes and the Glimpse anecdote
 *   only; never UI. A fourth face, which PERFORMANCE.md §6 asks a reason
 *   for: the PDF's pairing makes the quotes the one serif moment. Not
 *   preloaded, because it only appears below the first screen.
 * - The rest of `MockVars`: `--link` is red 600; role tags are the
 *   secondary grey (kit B has no coloured tags, 04 card B).
 */
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: "italic",
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
});

const MONO = 'var(--font-space-mono), ui-monospace, "SF Mono", monospace';
const SANS = "var(--font-work-sans), ui-sans-serif, system-ui, sans-serif";

const CREAM = "#E9E4D8"; // tokens B.ground
const INK = "#16140F"; // tokens B.text

const RED = {
  50: "#fef2f0",
  100: "#fed8d2",
  200: "#ffaba0",
  300: "#f07b6e",
  400: "#da554a",
  500: "#c9352e",
  600: "#9d201c",
  700: "#750c0c",
  800: "#520002",
  900: "#310000",
} as const;

const NEUTRAL = {
  50: "#e9e4d8",
  100: "#dbd6ca",
  200: "#c3beb3",
  300: "#a39e95",
  400: "#838077",
  500: "#6a665e",
  600: "#55524b",
  700: "#43403a",
  800: "#323029",
  900: "#24211c",
  950: "#16140f",
} as const;

export const KRYSHAN_KIT_B: ReviewKit = {
  id: "kryshan-b",
  letter: "B",
  name: "Kryshan B · Generous leads · red on warm cream",
  tagline: "A tale well told, and a good time telling it.",
  thesis:
    "The warm room. Cream instead of black, the same saturated red spent on a monospace wordmark and one phrase, a humanist body face, and an italic serif for the quotes and the Glimpse story. The edge lives in the work, not in the chrome; this is the version a cohousing board, a credit union and a nervous student trust on sight, and Jack is still Jack in the grid.",
  placeholder: false,
  ground: "light",
  radius: "4px",
  colors: {
    background: CREAM,
    foreground: INK,
    card: NEUTRAL[200],
    cardForeground: INK,
    popover: NEUTRAL[200],
    popoverForeground: INK,
    primary: RED[500],
    primaryForeground: CREAM,
    secondary: NEUTRAL[200],
    secondaryForeground: INK,
    muted: NEUTRAL[100],
    mutedForeground: NEUTRAL[500],
    accent: RED[600],
    accentForeground: CREAM,
    destructive: RED[600],
    border: NEUTRAL[300],
    input: NEUTRAL[300],
    ring: RED[600],
  },
  fonts: {
    display: {
      stack: MONO,
      note: "Space Mono 400 and 700: wordmark, section headers, nav, captions. SIL Open Font License, via Google Fonts.",
    },
    body: {
      stack: SANS,
      note: "Work Sans (variable weight): body and H1. SIL Open Font License, via Google Fonts.",
    },
    mono: { stack: MONO, note: "Space Mono, as display." },
  },
  fontClassName: [
    workSans.variable,
    spaceMono.variable,
    fraunces.variable,
  ].join(" "),
  extraVars: {
    "--link": RED[600],
    "--surface-dark": NEUTRAL[900],
    "--surface-dark-foreground": CREAM,
    "--tag-directing": NEUTRAL[500],
    "--tag-camera": NEUTRAL[500],
    "--tag-editing": NEUTRAL[500],
    "--font-quote": "var(--font-fraunces), Georgia, serif",
  },
  ramps: {
    Red: RED,
    "Cream → Ink": NEUTRAL,
  },
  roles: [
    {
      name: "Ground",
      hex: CREAM,
      use: "Every page. Warm, slightly yellow; never grey.",
    },
    {
      name: "Surface",
      hex: NEUTRAL[200],
      use: "Cards, the contact block, hover washes.",
    },
    {
      name: "Dark surface",
      hex: NEUTRAL[900],
      use: "The work grid sits on this so night frames don't punch holes in the cream.",
    },
    { name: "Text", hex: INK, use: "Body and titles." },
    { name: "Secondary", hex: NEUTRAL[500], use: "Roles, years, captions." },
    {
      name: "Accent",
      hex: RED[500],
      use: "Wordmark, one phrase per page, headings. At 24 px and up only: 4.1:1 on cream is AA for large text.",
    },
    {
      name: "Link / small accent",
      hex: RED[600],
      use: "Every body-size red: links, the rail's email, the Passion label (6.2:1 on cream).",
    },
    {
      name: "Quote ink",
      hex: NEUTRAL[800],
      use: "The italic serif runs slightly softer than body.",
    },
  ],
  typeScale: [
    {
      name: "Display / 64",
      css: "font-family: var(--font-heading); font-weight: 700; font-size: 4rem; line-height: 1; letter-spacing: -0.02em",
      sample: "Watch something.",
      spec: "Space Mono Bold, tracking −2%",
    },
    {
      name: "H1 / 40",
      css: "font-family: var(--font-sans); font-weight: 500; font-size: 2.5rem; line-height: 1.08; letter-spacing: -0.01em",
      sample: "A good time telling it",
      spec: "Work Sans 500, leading 1.08",
    },
    {
      name: "H2 / 28",
      css: "font-family: var(--font-heading); font-weight: 700; font-size: 1.75rem; line-height: 1.15",
      sample: "Directing · Camera · Editing",
      spec: "Space Mono Bold",
    },
    {
      name: "Lead / 20",
      css: "font-family: var(--font-sans); font-weight: 400; font-size: 1.25rem; line-height: 1.4",
      sample: "Vancouver-based. Works anywhere.",
      spec: "Work Sans 400, leading 1.4",
    },
    {
      name: "Body / 17",
      css: "font-family: var(--font-sans); font-weight: 400; font-size: 1.0625rem; line-height: 1.6",
      sample: "Written, shot and cut in 48 hours.",
      spec: "Work Sans 400, leading 1.6, max 66ch",
    },
    {
      name: "Quote / 22",
      css: "font-family: var(--font-quote); font-style: italic; font-size: 1.375rem; line-height: 1.35",
      sample: "“Hysterically mean.”",
      spec: "Fraunces Italic, opsz 22",
    },
    {
      name: "Caption / 13",
      css: "font-family: var(--font-heading); font-size: 0.8125rem; line-height: 1.4",
      sample: "2009 · Director · Bloodshots",
      spec: "Space Mono Regular",
    },
    {
      name: "Label / 11",
      css: "font-family: var(--font-heading); font-size: 0.6875rem; line-height: 1; letter-spacing: 0.08em; text-transform: uppercase",
      sample: "Passion project",
      spec: "Space Mono, tracking 8%",
    },
  ],
  voice: {
    h1: "Twenty-seven years of stories, and a good time telling them.",
    support:
      "Kryshan Randel. Director, camera operator, editor, and film instructor. Vancouver, works anywhere.",
    work: "Watch something. Then say hello.",
    about:
      "Born and raised in BC, I've been making films for as long as I can remember. I met most of my favourite collaborators running two fast-film contests in my twenties, and I've been making things with them on weekends ever since. When an actor's audition is better than my script, I rewrite the script.",
    contact:
      "No agent, no form. Email me and I'll write back. kryshanrandel@gmail.com",
  },
  never: [
    "Pure white or cool grey.",
    "Red as a fill.",
    "A second accent.",
    "Gradients outside the thumbnail scrim.",
    "Marketing headlines.",
    "Photos under videos.",
    "Festival lists longer than two.",
    "An exclamation mark.",
  ],
};

import { Archivo } from "next/font/google";
import type { ReviewKit } from "@/review/kits/types";

/**
 * Kit A · Wicked leads · red on black.
 *
 * Every colour is from docs/client/branding/kryshan-05-tokens.json → A and
 * nowhere else; every sentence is from the brand-kit PDF's Kit A pages
 * (source: kryshan-05-brand-kits-source.py, KIT_A). The role mapping is the
 * one in the KR-1 prompt:
 *
 * - `primary` is red 500, the brand colour: the wordmark, display type and
 *   large marks only. On black it is AA for large text only (3.4:1).
 * - `accent` is red 300: the text-size red (links, hovers, the "Passion
 *   project" label, focus rings). Small red text is always this, never
 *   `primary`.
 * - Hairlines are `border` (neutral 700) at 40% opacity on frames, applied
 *   by the components (`border-border/40`), so the kit needs no extra
 *   variables.
 *
 * One family: Archivo, variable on width and weight. The display, body and
 * mono slots all point at it (the PDF: "No serif, no mono, no display
 * face"); headings get their condensed voice from `font-stretch` in the
 * components (72% wordmark and display, 80% H1, 88% nav and labels).
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const ARCHIVO = "var(--font-archivo), ui-sans-serif, system-ui, sans-serif";

const INK = "#0B0B0C"; // tokens A.ground
const BONE = "#F1ECE4"; // tokens A.text

const RED = {
  50: "#fff2f0",
  100: "#ffd6d2",
  200: "#ffa7a0",
  300: "#f2716b",
  400: "#da4746",
  500: "#c81e2a",
  600: "#9c0117",
  700: "#70000d",
  800: "#4b0005",
  900: "#2b0001",
} as const;

const NEUTRAL = {
  50: "#f1ece4",
  100: "#e1dcd5",
  200: "#c7c3bc",
  300: "#a3a09b",
  400: "#817e7b",
  500: "#656360",
  600: "#4e4d4b",
  700: "#3b3a39",
  800: "#292828",
  900: "#191919",
  950: "#0b0b0c",
} as const;

export const KRYSHAN_KIT_A: ReviewKit = {
  id: "kryshan-a",
  letter: "A",
  name: "Kryshan A · Wicked leads · red on black",
  tagline: "A tale well told, and a good time telling it.",
  thesis:
    "The dark room. One saturated red that belongs to him, spent on the name, the hover, the active tag and one phrase in the hero; nowhere else. Chrome quieter than the weakest frame in the grid. The professionalism is carried by precision: a single type family at several widths, a strict scale, literal roles, exact credits.",
  placeholder: false,
  ground: "dark",
  radius: "2px",
  colors: {
    background: INK,
    foreground: BONE,
    card: NEUTRAL[800],
    cardForeground: BONE,
    popover: NEUTRAL[800],
    popoverForeground: BONE,
    primary: RED[500],
    primaryForeground: INK,
    secondary: NEUTRAL[800],
    secondaryForeground: BONE,
    muted: NEUTRAL[900],
    mutedForeground: NEUTRAL[300],
    accent: RED[300],
    accentForeground: INK,
    destructive: RED[600],
    border: NEUTRAL[700],
    input: NEUTRAL[700],
    ring: RED[300],
  },
  fonts: {
    display: {
      stack: ARCHIVO,
      note: "Archivo (variable, width 62–125, weight 100–900), set condensed at width 72–80 for the wordmark and headings. SIL Open Font License, via Google Fonts.",
    },
    body: {
      stack: ARCHIVO,
      note: "Archivo at width 100 for body. The italic is for press quotes; it is not loaded in this round because no page here sets one.",
    },
    mono: {
      stack: ARCHIVO,
      note: "Kit A has no mono. The slot points at Archivo so nothing falls back to a face nobody chose.",
    },
  },
  fontClassName: archivo.variable,
  ramps: {
    Red: RED,
    "Bone → Ink": NEUTRAL,
  },
  roles: [
    {
      name: "Ground",
      hex: INK,
      use: "Every page. Never pure #000; the frames need somewhere to sit.",
    },
    {
      name: "Surface",
      hex: NEUTRAL[800],
      use: "Overlay backdrop, the contact card, the credits list column.",
    },
    {
      name: "Hairline",
      hex: NEUTRAL[700],
      use: "Thumbnail frames at 40% opacity, dividers. Nothing heavier.",
    },
    { name: "Text", hex: BONE, use: "All body and titles. Warm, not white." },
    {
      name: "Secondary",
      hex: NEUTRAL[300],
      use: "Roles, years, captions, footer.",
    },
    {
      name: "Accent",
      hex: RED[500],
      use: "Wordmark, hover, active role tag, one phrase per page. Punctuation, never a fill.",
    },
    {
      name: "Link / small accent",
      hex: RED[300],
      use: "Text-size links and focus rings; the 500 fails AA at body size on black.",
    },
  ],
  typeScale: [
    {
      name: "Display / 64",
      css: "font-family: var(--font-heading); font-stretch: 72%; font-weight: 800; font-size: 4rem; line-height: 0.95; letter-spacing: 0.01em; text-transform: uppercase",
      sample: "Watch something.",
      spec: "Archivo 800, width 72, tracking +1%",
    },
    {
      name: "H1 / 40",
      css: "font-family: var(--font-heading); font-stretch: 80%; font-weight: 700; font-size: 2.5rem; line-height: 1.02",
      sample: "Hard to look away from",
      spec: "Archivo 700, width 80, leading 1.02",
    },
    {
      name: "H2 / 28",
      css: "font-family: var(--font-heading); font-stretch: 88%; font-weight: 600; font-size: 1.75rem; line-height: 1.15",
      sample: "Directing · Camera · Editing",
      spec: "Archivo 600, width 88",
    },
    {
      name: "Lead / 20",
      css: "font-family: var(--font-sans); font-weight: 400; font-size: 1.25rem; line-height: 1.4",
      sample: "Vancouver-based. Works anywhere.",
      spec: "Archivo 400, leading 1.4",
    },
    {
      name: "Body / 16",
      css: "font-family: var(--font-sans); font-weight: 400; font-size: 1rem; line-height: 1.55",
      sample: "Written, shot and cut in 48 hours.",
      spec: "Archivo 400, leading 1.55, max 68ch",
    },
    {
      name: "Caption / 13",
      css: "font-family: var(--font-sans); font-stretch: 90%; font-weight: 500; font-size: 0.8125rem; line-height: 1.4; letter-spacing: 0.02em",
      sample: "2009 · Director · Bloodshots Film Festival",
      spec: "Archivo 500, width 90",
    },
    {
      name: "Label / 11",
      css: "font-family: var(--font-sans); font-stretch: 88%; font-weight: 600; font-size: 0.6875rem; line-height: 1; letter-spacing: 0.18em; text-transform: uppercase",
      sample: "Passion project",
      spec: "Archivo 600, width 88, tracking 18%",
    },
  ],
  voice: {
    h1: "I direct, shoot and edit stories that are hard to look away from.",
    support:
      "Kryshan Randel. Director, camera operator, editor, and film instructor. Vancouver, works anywhere.",
    work: "Watch something.",
    about:
      "Born and raised in BC, I've been making films for as long as I can remember. Most of my shorts are about how quickly a mind turns against itself under pressure. Most of my paid work is about making other people look good. I like both.",
    contact: "No agent, no form, no waiting. kryshanrandel@gmail.com",
  },
  never: [
    "Pure white.",
    "A second accent.",
    "Red as a background.",
    "A gradient anywhere but the thumbnail scrim.",
    "A display face.",
    "Photos under videos.",
    "Festival lists longer than two.",
    "An exclamation mark.",
  ],
};

import { Chivo, Newsreader } from "next/font/google";
import type { ReviewKit } from "@/review/kits/types";

/**
 * Kit C · Resourceful leads · green and amber on near-black.
 *
 * Every colour is from docs/client/branding/kryshan-05-tokens.json → C;
 * every sentence is from the brand-kit PDF's Kit C pages
 * (kryshan-05-brand-kits-source.py, KIT_C). Role mapping per the KR-3
 * prompt: `primary` green 500 (wordmark, accent phrase, active state),
 * `accent` amber 500 (the warm second: human moments, never beside green on
 * the same line), `muted` neutral 900 (also the ghost word).
 *
 * Extra variables (docs/BRANDING.md §3a):
 * - `--tag-directing`, `--tag-camera`, `--tag-editing`: the R/G/B role
 *   tags. Used only on role tags and on the index's active labels (the open
 *   row's colour); nothing else may read them.
 * - `--font-quote`: Newsreader Italic (`opsz`), press quotes only. A fourth
 *   face, as in kit B; not preloaded, since no quote sits on a first screen.
 * - The rest of `MockVars`: `--link` is green 300 (the PDF's "300 for
 *   links"); the dark band is neutral 900.
 */
const chivo = Chivo({
  subsets: ["latin"],
  variable: "--font-chivo",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: "italic",
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
  preload: false,
});

const CHIVO = "var(--font-chivo), ui-sans-serif, system-ui, sans-serif";

const CARBON = "#0C0E0D"; // tokens C.ground
const MIST = "#ECEFEA"; // tokens C.text

const GREEN = {
  50: "#deffe9",
  100: "#b0ffcd",
  200: "#8af2b3",
  300: "#6bde9c",
  400: "#4ece88",
  500: "#35c27a",
  600: "#209f61",
  700: "#09804b",
  800: "#006439",
  900: "#004b29",
} as const;

const AMBER = {
  50: "#fff4e3",
  100: "#ffe8c6",
  200: "#ffd696",
  300: "#f9c063",
  400: "#ecb14c",
  500: "#e2a63a",
  600: "#bd8827",
  700: "#9b6e14",
  800: "#7d5600",
  900: "#614200",
} as const;

const NEUTRAL = {
  50: "#ecefea",
  100: "#dcdfdb",
  200: "#c3c6c2",
  300: "#a0a39f",
  400: "#7f827e",
  500: "#646663",
  600: "#4e504e",
  700: "#3b3d3b",
  800: "#292b2a",
  900: "#1a1c1b",
  950: "#0c0e0d",
} as const;

/** tokens C.role_tags */
const TAG = {
  directing: "#E0473F",
  camera: "#35C27A",
  editing: "#4C8DFF",
} as const;

export const KRYSHAN_KIT_C: ReviewKit = {
  id: "kryshan-c",
  letter: "C",
  name: "Kryshan C · Resourceful leads · green and amber on near-black",
  tagline: "Any story. Any budget. Told properly.",
  thesis:
    "The craft room. Near-black, a cooled neon green (Vertigo, Airview) on phrases, tags and the wordmark, and amber (Wild at Heart, 5Rhythms) for the human moments. Wide-tracked uppercase labels, a neutral grotesk, one ghosted giant word behind the hero. The sixty-title credits list and the Leo nomination are central here, not supporting. The only kit where the three roles get colours: R, G, B.",
  placeholder: false,
  ground: "dark",
  radius: "0px",
  colors: {
    background: CARBON,
    foreground: MIST,
    card: NEUTRAL[800],
    cardForeground: MIST,
    popover: NEUTRAL[800],
    popoverForeground: MIST,
    primary: GREEN[500],
    primaryForeground: CARBON,
    secondary: NEUTRAL[800],
    secondaryForeground: MIST,
    muted: NEUTRAL[900],
    mutedForeground: NEUTRAL[300],
    accent: AMBER[500],
    accentForeground: CARBON,
    destructive: TAG.directing,
    border: NEUTRAL[700],
    input: NEUTRAL[700],
    ring: GREEN[300],
  },
  fonts: {
    display: {
      stack: CHIVO,
      note: "Chivo (variable weight): everything but the quotes. SIL Open Font License, via Google Fonts.",
    },
    body: { stack: CHIVO, note: "Chivo 300–400 for lead and body." },
    mono: {
      stack: CHIVO,
      note: "Kit C has no mono (the PDF: “No mono, no condensed”). The slot points at Chivo.",
    },
  },
  fontClassName: [chivo.variable, newsreader.variable].join(" "),
  extraVars: {
    "--link": GREEN[300],
    "--surface-dark": NEUTRAL[900],
    "--surface-dark-foreground": MIST,
    "--tag-directing": TAG.directing,
    "--tag-camera": TAG.camera,
    "--tag-editing": TAG.editing,
    "--font-quote": "var(--font-newsreader), Georgia, serif",
  },
  ramps: {
    Green: GREEN,
    Amber: AMBER,
    "Mist → Carbon": NEUTRAL,
  },
  roles: [
    {
      name: "Ground",
      hex: CARBON,
      use: "Every page. Green-black, not blue-black.",
    },
    {
      name: "Surface",
      hex: NEUTRAL[800],
      use: "Credits column, overlay backdrop, the contact block.",
    },
    {
      name: "Ghost",
      hex: NEUTRAL[900],
      use: "The giant background word on the hero only (Airview).",
    },
    {
      name: "Text",
      hex: MIST,
      use: "Body and titles. Slightly green-white.",
    },
    {
      name: "Secondary",
      hex: NEUTRAL[300],
      use: "Roles, years, captions.",
    },
    {
      name: "Accent",
      hex: GREEN[500],
      use: "Wordmark, accent phrase, active state, the Camera tag.",
    },
    {
      name: "Warm",
      hex: AMBER[500],
      use: "Human moments: About opener, teaching, quotes' attribution.",
    },
    {
      name: "Directing tag",
      hex: TAG.directing,
      use: "Role tags only. The RGB idea survives only here.",
    },
    {
      name: "Camera tag",
      hex: TAG.camera,
      use: "Role tags only; the same green as the accent.",
    },
    {
      name: "Editing tag",
      hex: TAG.editing,
      use: "Role tags only.",
    },
  ],
  typeScale: [
    {
      name: "Display / 96 ghost",
      css: "font-family: var(--font-heading); font-weight: 900; font-size: 6rem; line-height: 0.9; letter-spacing: -0.03em; color: var(--muted)",
      sample: "RANDEL",
      spec: "Chivo 900, ghost, one per site",
    },
    {
      name: "H1 / 40",
      css: "font-family: var(--font-heading); font-weight: 800; font-size: 2.5rem; line-height: 1.02; letter-spacing: -0.015em",
      sample: "Told properly.",
      spec: "Chivo 800, leading 1.02",
    },
    {
      name: "Label / 12 wide",
      css: "font-family: var(--font-sans); font-weight: 500; font-size: 0.75rem; line-height: 1.2; letter-spacing: 0.28em; text-transform: uppercase",
      sample: "Directing · Camera · Editing",
      spec: "Chivo 500, tracking 28% (Airview)",
    },
    {
      name: "Lead / 20",
      css: "font-family: var(--font-sans); font-weight: 300; font-size: 1.25rem; line-height: 1.4",
      sample: "Vancouver-based. Works anywhere.",
      spec: "Chivo 300, leading 1.4",
    },
    {
      name: "Body / 16",
      css: "font-family: var(--font-sans); font-weight: 400; font-size: 1rem; line-height: 1.55",
      sample: "Written, shot and cut in 48 hours.",
      spec: "Chivo 400, leading 1.55, max 68ch",
    },
    {
      name: "Quote / 22",
      css: "font-family: var(--font-quote); font-style: italic; font-size: 1.375rem; line-height: 1.35",
      sample: "“Slickly-made tale.”",
      spec: "Newsreader Italic, opsz 22",
    },
    {
      name: "Credits / 13",
      css: "font-family: var(--font-sans); font-weight: 400; font-size: 0.8125rem; line-height: 1.4; font-variant-numeric: tabular-nums",
      sample: "Sonic the Hedgehog · EPK camera operator · 2020",
      spec: "Chivo 400, tabular, columned",
    },
  ],
  voice: {
    h1: "Any story. Any budget. Told properly.",
    support:
      "Kryshan Randel. Director, camera operator, editor, and film instructor. IATSE 669. Vancouver, works anywhere.",
    work: "The work · one tap",
    about:
      "My favourite subject is human consciousness, and my favourite theme is how quickly a mind turns against itself under pressure. Most of my shorts are about that. The other sixty-odd productions on my credits list are about making someone else's story land, on their schedule, with whatever's in the truck.",
    contact: "Enquiries go to me. kryshanrandel@gmail.com",
  },
  never: [
    "Blue-black.",
    "A third accent beyond green and amber.",
    "Green and amber on the same line.",
    "A gradient anywhere but the scrim.",
    "Gear-list copy.",
    "Photos under videos.",
    "Festival lists longer than two.",
    "An exclamation mark.",
  ],
};

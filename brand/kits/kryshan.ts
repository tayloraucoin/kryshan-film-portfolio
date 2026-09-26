import { Archivo } from "next/font/google";
import type { BrandKit } from "@/brand/types";

/**
 * Kryshan Randel's production kit: Kit D, which is Kit A's look with the
 * words amended after his review (D-SITE-2; demo-d-ux-handoff-v1.md §4,
 * Appendix C). Copied here as literals so nothing in `review/` survives the
 * review layer's deletion (docs/BRANDING.md §4). Every colour is from
 * docs/client/branding/kryshan-05-tokens.json → A.
 *
 * - `primary` is red 500: the wordmark (20 px / 800) and one phrase per page
 *   in an H1 (≥24 px). On ink it is AA for large text only (3.4:1).
 * - `--link` is red 300 (6.9:1): links, "Passion project", the open tile's
 *   rule, hovers and focus. Small red text is always this, never `primary`.
 * - Hairlines are `border` (neutral 700) at 40%, applied by the components
 *   (`border-border/40`).
 *
 * `extraVars` (docs/BRANDING.md §3a), exactly two:
 * - `--link`: the small-text accent above.
 * - `--font-quote`: Archivo's italic, for press quotes only (spec §4.1), set
 *   as `font-(family-name:--font-quote) italic`. It has its own loader with
 *   `preload: false`, so no page's first screen pays for it; the browser
 *   fetches it only when a quote renders.
 *
 * One family: Archivo, variable on width and weight. The display, body and
 * mono slots all point at it; headings get their condensed voice from
 * `font-stretch` in the components (72% wordmark, 80% H1, 88% H2 and labels).
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const archivoItalic = Archivo({
  subsets: ["latin"],
  style: "italic",
  axes: ["wdth"],
  variable: "--font-archivo-italic",
  display: "swap",
  preload: false,
});

const ARCHIVO = "var(--font-archivo), ui-sans-serif, system-ui, sans-serif";
const ARCHIVO_ITALIC =
  "var(--font-archivo-italic), ui-sans-serif, system-ui, sans-serif";

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

export const KRYSHAN_KIT: BrandKit = {
  id: "kryshan",
  name: "Kryshan Randel (Kit D)",
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
      note: "Archivo at width 100 for body. Italic is for press quotes only: a second Archivo loader (italic, not preloaded) behind `--font-quote`.",
    },
    mono: {
      stack: ARCHIVO,
      note: "The kit has no mono. The slot points at Archivo so nothing falls back to a face nobody chose.",
    },
  },
  fontClassName: [archivo.variable, archivoItalic.variable].join(" "),
  extraVars: {
    "--link": RED[300],
    "--font-quote": ARCHIVO_ITALIC,
  },
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
    {
      name: "Passion label",
      hex: RED[300],
      use: "The one lane label: “Passion project” in small red. Paid work is named by its client in secondary text, never “For hire”.",
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
};

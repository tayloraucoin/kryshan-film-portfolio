import type { ReviewKit } from "@/review/kits/types";

/**
 * A placeholder kit. It exists so the review machinery can be run and seen
 * before a client's kits arrive, and for no other reason. Grey, system fonts,
 * a ribbon on every page that says so. Batch 7 replaces this file with the
 * client's kit C and sets `placeholder` to false (docs/REVIEW-LAYER.md §5).
 */
export const PLACEHOLDER_KIT_C: ReviewKit = {
  id: "kit-c",
  letter: "C",
  name: "Placeholder C",
  tagline: "Near-black ground, wide-tracked labels, the work as a list.",
  thesis:
    "Placeholder. When the client's kit lands here, this paragraph is the argument for it: which pillar leads, what the ground and the accent are for, and what that choice costs.",
  placeholder: true,
  ground: "dark",
  radius: "0.125rem",
  colors: {
    background: "#0d100f",
    foreground: "#eaf0ec",
    card: "#161a18",
    cardForeground: "#eaf0ec",
    popover: "#161a18",
    popoverForeground: "#eaf0ec",
    primary: "#cfd9d3",
    primaryForeground: "#0d100f",
    secondary: "#1f2522",
    secondaryForeground: "#eaf0ec",
    muted: "#1f2522",
    mutedForeground: "#9aa39e",
    accent: "#1f2522",
    accentForeground: "#eaf0ec",
    destructive: "#d0453c",
    border: "#283029",
    input: "#283029",
    ring: "#5f6b64",
  },
  fonts: {
    display: {
      stack:
        'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      note: "System stack. The client's display face replaces it.",
    },
    body: {
      stack:
        'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    },
    mono: { stack: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace' },
  },
  ramps: {
    Neutral: {
      50: "#eaf0ec",
      300: "#9aa39e",
      700: "#283029",
      800: "#1f2522",
      900: "#161a18",
      950: "#0d100f",
    },
  },
  roles: [
    { name: "Ground", hex: "#0d100f", use: "Every page." },
    { name: "Text", hex: "#eaf0ec", use: "Body and titles." },
    { name: "Secondary", hex: "#9aa39e", use: "Roles, years, captions." },
    {
      name: "Accent",
      hex: "#cfd9d3",
      use: "The one place colour is spent. Placeholder: none.",
    },
    { name: "Hairline", hex: "#283029", use: "Frames and dividers." },
  ],
  typeScale: [
    {
      name: "Display",
      css: "font-family: var(--font-heading); font-size: 3rem; line-height: 1; font-weight: 700; letter-spacing: -0.02em",
      sample: "Watch something.",
      spec: "700, leading 1",
    },
    {
      name: "H1",
      css: "font-family: var(--font-heading); font-size: 2.25rem; line-height: 1.05; font-weight: 600",
      sample: "Hard to look away from",
      spec: "600, leading 1.05",
    },
    {
      name: "H2",
      css: "font-family: var(--font-heading); font-size: 1.5rem; line-height: 1.2; font-weight: 600",
      sample: "Directing · Camera · Editing",
      spec: "600, leading 1.2",
    },
    {
      name: "Lead",
      css: "font-family: var(--font-sans); font-size: 1.25rem; line-height: 1.4",
      sample: "Vancouver-based. Works anywhere.",
      spec: "400, leading 1.4",
    },
    {
      name: "Body",
      css: "font-family: var(--font-sans); font-size: 1rem; line-height: 1.55",
      sample: "Written, shot and cut in 48 hours.",
      spec: "400, leading 1.55, max 68ch",
    },
    {
      name: "Caption",
      css: "font-family: var(--font-sans); font-size: 0.8125rem; line-height: 1.4; letter-spacing: 0.02em",
      sample: "2009 · Director · Festival",
      spec: "500",
    },
    {
      name: "Label",
      css: "font-family: var(--font-sans); font-size: 0.6875rem; line-height: 1; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 600",
      sample: "Passion project",
      spec: "600, tracking 18%",
    },
  ],
  voice: {
    h1: "The hero line, with its accent phrase.",
    support: "Name. Roles. Place, works anywhere.",
    work: "Watch something.",
    about:
      "The about opener: the first sentence of the bio, in this kit's register.",
    contact: "No agent, no form. Email me.",
  },
  never: [
    "Placeholder: the kit's 'never' list goes here.",
    "Lorem ipsum, stock imagery, or a reference still.",
    "An exclamation mark.",
  ],
};

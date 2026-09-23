import type { ReviewKit } from "@/review/kits/types";

/**
 * A placeholder kit. It exists so the review machinery can be run and seen
 * before a client's kits arrive, and for no other reason. Grey, system fonts,
 * a ribbon on every page that says so. Batch 7 replaces this file with the
 * client's kit B and sets `placeholder` to false (docs/REVIEW-LAYER.md §5).
 */
export const PLACEHOLDER_KIT_B: ReviewKit = {
  id: "kit-b",
  letter: "B",
  name: "Placeholder B",
  tagline: "Warm light ground, the edge lives in the work.",
  thesis:
    "Placeholder. When the client's kit lands here, this paragraph is the argument for it: which pillar leads, what the ground and the accent are for, and what that choice costs.",
  placeholder: true,
  ground: "light",
  radius: "0.25rem",
  colors: {
    background: "#f4f1ea",
    foreground: "#1b1913",
    card: "#faf8f3",
    cardForeground: "#1b1913",
    popover: "#faf8f3",
    popoverForeground: "#1b1913",
    primary: "#1b1913",
    primaryForeground: "#f4f1ea",
    secondary: "#e8e4da",
    secondaryForeground: "#1b1913",
    muted: "#e8e4da",
    mutedForeground: "#5d594f",
    accent: "#e8e4da",
    accentForeground: "#1b1913",
    destructive: "#d0453c",
    border: "#d9d4c7",
    input: "#d9d4c7",
    ring: "#8f8a7c",
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
      50: "#1b1913",
      300: "#5d594f",
      700: "#d9d4c7",
      800: "#e8e4da",
      900: "#faf8f3",
      950: "#f4f1ea",
    },
  },
  roles: [
    { name: "Ground", hex: "#f4f1ea", use: "Every page." },
    { name: "Text", hex: "#1b1913", use: "Body and titles." },
    { name: "Secondary", hex: "#5d594f", use: "Roles, years, captions." },
    {
      name: "Accent",
      hex: "#1b1913",
      use: "The one place colour is spent. Placeholder: none.",
    },
    { name: "Hairline", hex: "#d9d4c7", use: "Frames and dividers." },
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

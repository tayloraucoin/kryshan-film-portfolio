import type { BrandKit } from "@/brand/types";

/**
 * The kit the site wears until its production kit is set.
 *
 * Deliberately unremarkable: neutral greys, the system font stack, a small
 * radius. It exists so the site builds and every component renders on day
 * one, and so a client site that ships without a kit is obviously unfinished
 * rather than subtly wrong. Nothing here is a design decision.
 */
export const NEUTRAL_KIT: BrandKit = {
  id: "neutral",
  name: "Neutral (unbranded)",
  ground: "light",
  radius: "0.375rem",
  colors: {
    background: "#ffffff",
    foreground: "#171717",
    card: "#ffffff",
    cardForeground: "#171717",
    popover: "#ffffff",
    popoverForeground: "#171717",
    primary: "#171717",
    primaryForeground: "#fafafa",
    secondary: "#f5f5f5",
    secondaryForeground: "#171717",
    muted: "#f5f5f5",
    mutedForeground: "#6b6b6b",
    accent: "#f0f0f0",
    accentForeground: "#171717",
    destructive: "#b42318",
    border: "#e5e5e5",
    input: "#e5e5e5",
    ring: "#a3a3a3",
  },
  fonts: {
    display: {
      stack:
        'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      note: "System stack. Replaced by the production kit.",
    },
    body: {
      stack:
        'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    },
    mono: {
      stack: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
    },
  },
};

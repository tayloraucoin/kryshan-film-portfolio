/**
 * A brand kit is data. It compiles to the CSS variables shadcn's components
 * already read (`--background`, `--primary`, …), plus the three font slots,
 * at whatever scope it is applied: the root `<html>` for the production kit,
 * a wrapper `<div>` for each review kit. Nothing in a kit is a class name
 * and nothing in the components knows which kit is active.
 *
 * Colours are hex strings so the review pages can compute WCAG contrast.
 * See docs/BRANDING.md.
 */

export type BrandGround = "light" | "dark";

/** Every role a shadcn component may read. All required: a kit is complete or it is not a kit. */
export type BrandColors = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
};

/** A 50–900 (optionally 950) ramp, as the branding deliverables ship them. */
export type ColorRamp = Partial<
  Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950, string>
>;

/**
 * A font slot. `stack` is a full CSS `font-family` value. When the family is
 * loaded through `next/font`, reference its variable
 * (`"var(--font-archivo), sans-serif"`) and put the loader's `className` in
 * the kit's `fontClassName` so the variable exists at the scope.
 */
export type FontSlot = {
  stack: string;
  /** Licence and source, printed on the kit page. */
  note?: string;
};

export type BrandFonts = {
  display: FontSlot;
  body: FontSlot;
  mono: FontSlot;
};

/** One row of the type scale, rendered on the kit page. */
export type TypeStep = {
  name: string;
  /** Inline CSS for the sample, e.g. "font-family: var(--font-display); font-size: 2.5rem". */
  css: string;
  sample: string;
  spec: string;
};

export type BrandKit = {
  /** Stable id; also the `data-kit` attribute at the scope. */
  id: string;
  name: string;
  ground: BrandGround;
  colors: BrandColors;
  fonts: BrandFonts;
  /** The `next/font` classNames that define this kit's font variables, if any. */
  fontClassName?: string;
  /** Corner radius for shadcn's `--radius`, e.g. "0px" or "0.375rem". */
  radius: string;
  /** Named ramps for the kit page: "Red", "Neutral", … */
  ramps?: Record<string, ColorRamp>;
  /** What each colour is for, for the kit page. */
  roles?: ReadonlyArray<{ name: string; hex: string; use: string }>;
  /** The type scale, for the kit page. */
  typeScale?: ReadonlyArray<TypeStep>;
  /**
   * The extension point. Custom properties a kit needs beyond the shadcn
   * roles, emitted at the same scope: a fourth font (`--font-quote`), an
   * inverse surface (`--surface-dark`), role-tag colours (`--tag-camera`).
   * Components read them as `text-(--tag-camera)`; nothing else knows they
   * exist. Keys must start with `--`.
   */
  extraVars?: Record<`--${string}`, string>;
};

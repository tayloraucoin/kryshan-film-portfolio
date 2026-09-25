import type { BrandKit } from "@/brand/types";

/**
 * The compile step: a kit becomes the custom properties shadcn reads.
 *
 * Returned as a plain record so it can be spread into an inline `style`
 * (React accepts custom properties there) or serialised into a `<style>`
 * block. The names are shadcn's own; nothing downstream needs to know a kit
 * exists. `--font-sans` and `--font-heading` are what `app/globals.css`
 * maps into Tailwind's `font-sans` and `font-heading` utilities.
 */
export function kitVars(kit: BrandKit): Record<`--${string}`, string> {
  const c = kit.colors;
  return {
    "--background": c.background,
    "--foreground": c.foreground,
    "--card": c.card,
    "--card-foreground": c.cardForeground,
    "--popover": c.popover,
    "--popover-foreground": c.popoverForeground,
    "--primary": c.primary,
    "--primary-foreground": c.primaryForeground,
    "--secondary": c.secondary,
    "--secondary-foreground": c.secondaryForeground,
    "--muted": c.muted,
    "--muted-foreground": c.mutedForeground,
    "--accent": c.accent,
    "--accent-foreground": c.accentForeground,
    "--destructive": c.destructive,
    "--border": c.border,
    "--input": c.input,
    "--ring": c.ring,
    "--radius": kit.radius,
    "--font-sans": kit.fonts.body.stack,
    "--font-heading": kit.fonts.display.stack,
    "--font-mono": kit.fonts.mono.stack,
    ...(kit.extraVars ?? {}),
  };
}

/**
 * Class names a kit's scope element needs: its ground and its fonts.
 *
 * The ground class is `dark` or `light`, never absent: a light kit nested
 * inside a dark scope (a review kit under the dark production `<html>`)
 * must switch the `dark:` variants back off, and `app/globals.css`'s `dark`
 * variant excludes `.light` subtrees to do it.
 */
export function kitClassName(kit: BrandKit): string {
  return [kit.ground, kit.fontClassName ?? ""].filter(Boolean).join(" ");
}

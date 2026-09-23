import type { CSSProperties, ReactNode } from "react";
import { kitClassName, kitVars } from "@/brand/kit-vars";
import type { BrandKit } from "@/brand/types";
import { cn } from "@/lib/cn";

/**
 * Applies a kit to everything inside it.
 *
 * Sets the shadcn variables inline and the `dark` class when the kit's ground
 * is dark, so Tailwind's `dark:` variants and every component's tokens
 * resolve to this kit and no other. Three kits can sit on one page without
 * touching `globals.css`; that is the whole reason kits are data.
 *
 * Server component. The root layout does the same job on `<html>` for the
 * production kit rather than wrapping the page in a div.
 */
export function KitScope({
  kit,
  className,
  children,
}: Readonly<{ kit: BrandKit; className?: string; children: ReactNode }>) {
  return (
    <div
      data-kit={kit.id}
      className={cn(
        "bg-background text-foreground font-sans",
        kitClassName(kit),
        className,
      )}
      style={kitVars(kit) as CSSProperties}
    >
      {children}
    </div>
  );
}

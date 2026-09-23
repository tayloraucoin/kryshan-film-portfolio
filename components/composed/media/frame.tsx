import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A box that holds media at its native ratio.
 *
 * The ratio is a prop, not a grid constant, so nothing is ever cropped to
 * flatter the layout (docs/PERFORMANCE.md §4). Reserves its height before the
 * media loads, which is what keeps layout shift at zero.
 */
export function Frame({
  ratio = "16 / 9",
  className,
  children,
}: Readonly<{ ratio?: string; className?: string; children: ReactNode }>) {
  return (
    <div
      className={cn("relative w-full overflow-hidden bg-muted", className)}
      style={{ aspectRatio: ratio }}
    >
      {children}
    </div>
  );
}

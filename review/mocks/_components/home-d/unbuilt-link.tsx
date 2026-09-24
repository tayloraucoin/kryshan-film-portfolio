"use client";

import type { ReactNode } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/cn";

const MESSAGE = "That page isn’t built yet. This demo is the home page.";

/**
 * A link to a page the demo doesn't have (D-KRD-15). It keeps the look of
 * the link it stands in for, and activating it says so in one line instead
 * of doing nothing or jumping to the top: in a demo, a link that looks live
 * and goes nowhere reads as the design, which is what made "Full page"
 * confusing in Demo A. It never scrolls and never navigates.
 */
export function UnbuiltLink({
  children,
  className,
  reviewId,
}: Readonly<{ children: ReactNode; className?: string; reviewId?: string }>) {
  return (
    <button
      type="button"
      aria-disabled="true"
      data-review-id={reviewId}
      onClick={() => toast(MESSAGE, { id: "demo-d-unbuilt" })}
      className={cn("cursor-pointer text-left", className)}
    >
      {children}
    </button>
  );
}

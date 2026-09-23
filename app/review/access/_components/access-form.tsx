"use client";

import { useActionState } from "react";
import { enterCode } from "@/app/review/access/_actions/enter-code";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import { Label } from "@/components/primitives/label";

const MESSAGES = {
  wrong: "That code is not right.",
  off: "The review layer is not switched on for this site.",
  invalid: "Enter the code you were sent.",
} as const;

export function AccessForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(enterCode, null);

  return (
    <form action={action} className="flex w-full max-w-sm flex-col gap-4">
      {next ? <input type="hidden" name="next" value={next} /> : null}
      <div className="flex flex-col gap-2">
        <Label htmlFor="code">Access code</Label>
        <Input
          id="code"
          name="code"
          type="password"
          autoComplete="off"
          autoFocus
          required
          aria-invalid={state ? true : undefined}
          aria-describedby={state ? "code-error" : undefined}
        />
        {state ? (
          <p id="code-error" className="text-sm text-destructive">
            {MESSAGES[state.error]}
          </p>
        ) : null}
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Checking…" : "Enter"}
      </Button>
    </form>
  );
}

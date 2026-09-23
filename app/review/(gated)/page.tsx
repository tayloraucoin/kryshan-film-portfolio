import type { Metadata, Route } from "next";
import Link from "next/link";
import { Badge } from "@/components/primitives/badge";
import { reviewBackendConfigured, reviewGateOn } from "@/lib/env";
import { reviewRoutes } from "@/lib/routes";
import { REVIEW_KITS } from "@/review/kits";
import { REVIEW_LAYOUTS } from "@/review/layouts";
import { REVIEW_MOCKS } from "@/review/mocks";

export const metadata: Metadata = { title: "Options" };

type Item = {
  href: Route;
  letter: string;
  name: string;
  line: string;
  placeholder?: boolean;
};

function Column({
  title,
  intro,
  items,
}: {
  title: string;
  intro: string;
  items: Item[];
}) {
  return (
    <section
      className="flex flex-col gap-3"
      data-review-id={`index-${title.toLowerCase()}`}
    >
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{intro}</p>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex flex-col gap-1 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <span className="flex items-center gap-2">
                <span className="font-heading text-xl font-semibold">
                  {item.letter}
                </span>
                <span className="font-medium">{item.name}</span>
                {item.placeholder ? (
                  <Badge variant="outline">placeholder</Badge>
                ) : null}
              </span>
              <span className="text-sm text-muted-foreground">{item.line}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * The round's front page: three kits, three layouts, three demo home pages,
 * and the feedback form. Same order everywhere so the client compares like
 * with like.
 */
export default function ReviewIndexPage() {
  const kitName = (id: string) =>
    REVIEW_KITS.find((k) => k.id === id)?.letter ?? "?";
  const layoutName = (id: string) =>
    REVIEW_LAYOUTS.find((l) => l.id === id)?.letter ?? "?";

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6">
      <header className="flex max-w-2xl flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Three ways this site could be.
        </h1>
        <p className="text-muted-foreground">
          Three branding kits, three layouts, and a real home page for each
          layout that you can switch between the kits. Open anything, turn on{" "}
          <strong>Comment</strong> in the bar, and click the exact thing you
          want to talk about. When you have seen them, leave the feedback form.
        </p>
        <Link
          href={reviewRoutes.brand}
          data-review-id="index-brand"
          className="flex flex-col gap-1 rounded-lg border border-foreground/20 bg-muted/60 p-4 transition-colors hover:bg-muted"
        >
          <span className="text-xs tracking-widest text-muted-foreground uppercase">
            Start here
          </span>
          <span className="font-medium">
            Your brand in one page: the three pillars every option is built on →
          </span>
        </Link>
        {!reviewGateOn() ? (
          <p className="rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm">
            The review gate is off (<code>REVIEW_GATE=off</code>): anyone with
            the link can open these pages. Local development only; set it to{" "}
            <code>on</code> before sending a round.
          </p>
        ) : null}
        {!reviewBackendConfigured() ? (
          <p className="rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm">
            No backend is configured for this site, so comments stay in this
            browser. Set
            <code className="mx-1">REVIEW_BACKEND_URL</code> and
            <code className="mx-1">REVIEW_INGEST_KEY</code> to send them on.
          </p>
        ) : null}
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <Column
          title="Branding"
          intro="The colours, the type, the voice. Same structure per kit."
          items={REVIEW_KITS.map((kit) => ({
            href: reviewRoutes.kit(kit.id),
            letter: kit.letter,
            name: kit.name,
            line: kit.tagline,
            placeholder: kit.placeholder,
          }))}
        />
        <Column
          title="Layouts"
          intro="How the pages are structured. Each pairs with one kit."
          items={REVIEW_LAYOUTS.map((layout) => ({
            href: reviewRoutes.layout(layout.id),
            letter: layout.letter,
            name: layout.name,
            line: `${layout.thesis} Pairs with kit ${kitName(layout.kitId)}.`,
            placeholder: layout.placeholder,
          }))}
        />
        <Column
          title="Demo home pages"
          intro="Each layout as a real home page. On the page, switch between the three kits: nine combinations in all."
          items={REVIEW_MOCKS.map((mock) => ({
            href: reviewRoutes.mock(mock.id, mock.kitId),
            letter: mock.letter,
            name: mock.name,
            line: `Opens in kit ${kitName(mock.kitId)}, the kit layout ${layoutName(mock.layoutId)} was designed with.`,
            placeholder: mock.placeholder,
          }))}
        />
      </div>

      <p>
        <Link
          href={reviewRoutes.feedback}
          className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/85"
        >
          Leave feedback
        </Link>
      </p>
    </main>
  );
}

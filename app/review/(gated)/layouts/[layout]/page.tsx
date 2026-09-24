import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PlaceholderRibbon } from "@/app/review/_components/placeholder-ribbon";
import { KitScope } from "@/components/composed/brand/kit-scope";
import { cn } from "@/lib/cn";
import { reviewRoutes } from "@/lib/routes";
import { findReviewKit } from "@/review/kits";
import { roundOf } from "@/review/kits/types";
import {
  BRIEF_QUESTIONS,
  findReviewLayout,
  REVIEW_LAYOUTS,
} from "@/review/layouts";
import { findReviewMock } from "@/review/mocks";

export async function generateMetadata({
  params,
}: PageProps<"/review/layouts/[layout]">): Promise<Metadata> {
  const { layout: id } = await params;
  const layout = findReviewLayout(id);
  return { title: layout ? `Layout ${layout.letter}` : "Layout" };
}

const LABEL = "text-xs tracking-widest text-muted-foreground uppercase";

/**
 * A layout, for someone who is not a designer: the idea, five answers to the
 * same five questions, why (in his own words), what it gives up, and the
 * three layouts side by side. The full deliverable (the markdown file from
 * `review/layouts/`, read from disk and shipped by
 * `outputFileTracingIncludes`) is folded away at the end for anyone who
 * wants every page and breakpoint. Rendered in the kit it was designed with.
 */
export default async function ReviewLayoutPage({
  params,
}: PageProps<"/review/layouts/[layout]">) {
  const { layout: id } = await params;
  const layout = findReviewLayout(id);
  if (!layout) notFound();
  const kit = findReviewKit(layout.kitId);
  if (!kit) notFound();

  // Compare within a round; a revision is compared with what it revises
  // (D-KRD-17, 18).
  const mock = findReviewMock(layout.mockId);
  const partner = mock?.comparesWith
    ? findReviewMock(mock.comparesWith)
    : undefined;
  const peers =
    roundOf(layout) === 1
      ? REVIEW_LAYOUTS.filter((other) => roundOf(other) === 1)
      : REVIEW_LAYOUTS.filter(
          (other) => other.id === layout.id || other.id === partner?.layoutId,
        );

  const file = path.join(process.cwd(), "review", "layouts", layout.file);
  let markdown: string;
  try {
    markdown = await readFile(file, "utf8");
  } catch {
    notFound();
  }

  const { brief } = layout;

  return (
    <KitScope kit={kit} className="min-h-full">
      <PlaceholderRibbon placeholder={layout.placeholder} />
      <main className="mx-auto flex max-w-4xl flex-col gap-12 px-4 py-10 sm:px-6">
        <header
          className="flex flex-col gap-4"
          data-review-id={`layout-${layout.id}-idea`}
        >
          <p className={LABEL}>
            Layout {layout.letter} · designed with{" "}
            <Link
              href={reviewRoutes.kit(kit.id)}
              className="underline underline-offset-4"
            >
              kit {kit.letter}
            </Link>
          </p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            {layout.name}
          </h1>
          <p className="max-w-2xl text-xl leading-snug">{brief.idea}</p>
          <p>
            <Link
              href={reviewRoutes.mock(layout.mockId, layout.kitId)}
              className="inline-flex h-10 items-center rounded-(--radius) border border-foreground px-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              See it as a home page →
            </Link>
          </p>
        </header>

        <section
          className="flex flex-col gap-3"
          data-review-id={`layout-${layout.id}-glance`}
        >
          <h2 className={LABEL}>At a glance</h2>
          <dl className="flex flex-col">
            {BRIEF_QUESTIONS.map((question, index) => (
              <div
                key={question}
                className="grid gap-1 border-t border-border py-3 sm:grid-cols-[14rem_1fr] sm:gap-6"
              >
                <dt className="text-sm text-muted-foreground">{question}</dt>
                <dd>{brief.answers[index]}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className="flex flex-col gap-3"
          data-review-id={`layout-${layout.id}-why`}
        >
          <h2 className={LABEL}>Why, in your words</h2>
          <ul className="flex flex-col gap-4">
            {brief.because.map((item) => (
              <li
                key={item.quote}
                className="flex flex-col gap-1 border-l-2 border-primary pl-4"
              >
                <p className="text-lg">“{item.quote}”</p>
                <p className="text-sm text-muted-foreground">{item.source}</p>
                <p>{item.so}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="flex flex-col gap-3"
          data-review-id={`layout-${layout.id}-gives-up`}
        >
          <h2 className={LABEL}>What it gives up</h2>
          <p className="max-w-2xl">{brief.givesUp}</p>
        </section>

        <section
          className="flex flex-col gap-3"
          data-review-id={`layout-${layout.id}-compare`}
        >
          <h2 className={LABEL}>
            {roundOf(layout) === 1
              ? "The three side by side"
              : "Before and after"}
          </h2>
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th scope="col" className="w-40 pb-2 font-normal" />
                  {peers.map((other) => (
                    <th
                      key={other.id}
                      scope="col"
                      className={cn(
                        "px-3 pb-2 align-bottom font-semibold",
                        other.id === layout.id && "bg-muted",
                      )}
                    >
                      {other.id === layout.id ? (
                        `${other.letter} · ${other.name}`
                      ) : (
                        <Link
                          href={reviewRoutes.layout(other.id)}
                          className="underline underline-offset-4"
                        >
                          {other.letter} · {other.name}
                        </Link>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BRIEF_QUESTIONS.map((question, index) => (
                  <tr key={question} className="border-t border-border">
                    <th
                      scope="row"
                      className="py-2.5 pr-3 align-top font-normal text-muted-foreground"
                    >
                      {question}
                    </th>
                    {peers.map((other) => (
                      <td
                        key={other.id}
                        className={cn(
                          "px-3 py-2.5 align-top",
                          other.id === layout.id && "bg-muted",
                        )}
                      >
                        {other.brief.answers[index]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <details
          className="group rounded-(--radius) border border-border"
          data-review-id={`layout-${layout.id}`}
        >
          <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium marker:hidden">
            <span className="group-open:hidden">Show</span>
            <span className="hidden group-open:inline">Hide</span> the full
            layout notes{" "}
            <span className="text-muted-foreground">
              (every page and screen size, written for the build)
            </span>
          </summary>
          <article className="prose prose-neutral dark:prose-invert max-w-none border-t border-border px-4 py-6 prose-headings:font-heading prose-a:text-primary">
            <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
          </article>
        </details>
      </main>
    </KitScope>
  );
}

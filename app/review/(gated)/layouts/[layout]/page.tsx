import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PlaceholderRibbon } from "@/app/review/_components/placeholder-ribbon";
import { KitScope } from "@/components/composed/brand/kit-scope";
import { reviewRoutes } from "@/lib/routes";
import { findReviewKit } from "@/review/kits";
import { findReviewLayout } from "@/review/layouts";

export async function generateMetadata({
  params,
}: PageProps<"/review/layouts/[layout]">): Promise<Metadata> {
  const { layout: id } = await params;
  const layout = findReviewLayout(id);
  return { title: layout ? `Layout ${layout.letter}` : "Layout" };
}

/**
 * A layout deliverable rendered as written: the markdown file from
 * `review/layouts/`, in the scope of the kit it pairs with. The file is read
 * from disk at request time and shipped by `outputFileTracingIncludes`.
 */
export default async function ReviewLayoutPage({
  params,
}: PageProps<"/review/layouts/[layout]">) {
  const { layout: id } = await params;
  const layout = findReviewLayout(id);
  if (!layout) notFound();
  const kit = findReviewKit(layout.kitId);
  if (!kit) notFound();

  const file = path.join(process.cwd(), "review", "layouts", layout.file);
  let markdown: string;
  try {
    markdown = await readFile(file, "utf8");
  } catch {
    notFound();
  }

  return (
    <KitScope kit={kit} className="min-h-full">
      <PlaceholderRibbon placeholder={layout.placeholder} />
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6">
        <p className="text-xs tracking-widest text-muted-foreground uppercase">
          Layout {layout.letter} · pairs with{" "}
          <Link
            href={reviewRoutes.kit(kit.id)}
            className="underline underline-offset-4"
          >
            kit {kit.letter}
          </Link>
        </p>
        <article
          className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary"
          data-review-id={`layout-${layout.id}`}
        >
          <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        </article>
      </main>
    </KitScope>
  );
}

import { Frame } from "@/components/composed/media/frame";
import type { ReviewKit } from "@/review/kits/types";

/**
 * A structural home page in a kit's tokens: chrome, a headline, a grid of
 * empty 16:9 frames, a footer. It shows what the kit does to a page, which
 * is all a placeholder may do. A client's mock replaces this with their real
 * titles, real posters and the layout's real structure.
 */
export function PlaceholderHome({ kit }: Readonly<{ kit: ReviewKit }>) {
  return (
    <div className="min-h-[80vh]">
      <header
        className="border-b border-border"
        data-review-id={`mock-${kit.id}-nav`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <span className="font-heading text-lg font-semibold tracking-tight">
            Client Name
          </span>
          <nav className="flex gap-5 text-sm text-muted-foreground">
            <span>Work</span>
            <span>About</span>
            <span>Contact</span>
          </nav>
        </div>
      </header>

      <section
        className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-14 sm:px-6"
        data-review-id={`mock-${kit.id}-hero`}
      >
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          {kit.voice.h1}
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          {kit.voice.support}
        </p>
      </section>

      <section
        className="mx-auto max-w-6xl px-4 pb-14 sm:px-6"
        data-review-id={`mock-${kit.id}-grid`}
      >
        <h2 className="mb-4 text-sm font-medium tracking-widest text-muted-foreground uppercase">
          {kit.voice.work}
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i}>
              <Frame className="rounded-lg border border-border">
                <span className="absolute right-3 bottom-3 left-3 text-sm">
                  Title {i + 1} · Year · Role
                </span>
              </Frame>
            </li>
          ))}
        </ul>
      </section>

      <footer
        className="border-t border-border"
        data-review-id={`mock-${kit.id}-footer`}
      >
        <div className="mx-auto flex max-w-6xl justify-between px-4 py-8 text-sm sm:px-6">
          <span>{kit.voice.contact}</span>
          <span className="text-muted-foreground">Vimeo · YouTube · IMDb</span>
        </div>
      </footer>
    </div>
  );
}

import type { Metadata } from "next";
import { AccessForm } from "@/app/review/access/_components/access-form";

export const metadata: Metadata = { title: "Access" };

/**
 * The gate. Outside the gated group so it renders without the review bar,
 * and without the cookie the proxy would otherwise demand.
 */
export default async function ReviewAccessPage({
  searchParams,
}: PageProps<"/review/access">) {
  const { next } = await searchParams;
  const target = typeof next === "string" ? next : undefined;

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24">
      <div className="flex max-w-sm flex-col gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Design review</h1>
        <p className="text-sm text-muted-foreground">
          Enter the code you were sent to see the options and leave comments.
        </p>
      </div>
      <AccessForm next={target} />
    </main>
  );
}

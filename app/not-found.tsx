import Link from "next/link";
import { siteRoutes } from "@/lib/routes";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-6xl flex-1 flex-col justify-center gap-4 px-4 py-24 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Not here.</h1>
      <p className="text-muted-foreground">That page does not exist.</p>
      <p>
        <Link href={siteRoutes.home} className="underline underline-offset-4">
          Back to the start
        </Link>
      </p>
    </main>
  );
}

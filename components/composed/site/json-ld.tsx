/**
 * One `<script type="application/ld+json">` from a plain object (built in
 * `lib/structured-data.ts`). The decision it carries: `<` is escaped as
 * `<`, so no string in the data can close the script tag (Next's
 * JSON-LD guide). Server component.
 */
export function JsonLd({ data }: Readonly<{ data: object }>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/**
 * A calendar date written year-month-day (`2026-03-02`), the one date format
 * the content files use. The type catches the shape; `isIsoDate` catches a
 * day that doesn't exist (`2026-02-30`), which `content/validate.ts` turns
 * into a build error he can read.
 */
export type IsoDate = `${number}-${number}-${number}`;

/** True only for `YYYY-MM-DD` naming a real day. */
export function isIsoDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const [year, month, day] = [
    Number(match[1]),
    Number(match[2]),
    Number(match[3]),
  ];
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

import { WORK_ROLES, type WorkRole } from "./routes";

/**
 * Work's filter (spec §6.2, D-SITE-5): a role and the "Passion projects"
 * chip, carried in the URL (`/work?role=camera&passion=1`). Pure and
 * env-free: the pre-paint script, the client leaves and the server page all
 * read the same rules from here. The role list is `WORK_ROLES`
 * (`lib/routes.ts`), never a copy.
 */
export type WorkFilter = Readonly<{ role?: WorkRole; passion: boolean }>;

export const ALL_WORK: WorkFilter = { passion: false };

/** A query string to a filter. Unknown values are ignored: `?role=Camera`, `?role=sound` and `?passion=true` mean All. */
export function parseWorkFilter(search: string): WorkFilter {
  const query = new URLSearchParams(search);
  const role = query.get("role");
  const known = WORK_ROLES.find((item) => item === role);
  return {
    ...(known ? { role: known } : {}),
    passion: query.get("passion") === "1",
  };
}

/** What a tile needs for matching: its roles and whether it is passion work. */
export type WorkFilterable = Readonly<{
  roles: ReadonlyArray<WorkRole>;
  passion: boolean;
}>;

export function matchesWorkFilter(
  film: WorkFilterable,
  filter: WorkFilter,
): boolean {
  if (filter.role && !film.roles.includes(filter.role)) return false;
  if (filter.passion && !film.passion) return false;
  return true;
}

export function sameWorkFilter(a: WorkFilter, b: WorkFilter): boolean {
  return a.role === b.role && a.passion === b.passion;
}

/** "all", "all+passion", "camera", "camera+passion", …: names a combination in markup and CSS. */
export function workFilterKey(filter: WorkFilter): string {
  return `${filter.role ?? "all"}${filter.passion ? "+passion" : ""}`;
}

/** Every combination, for the count and empty-line variants the server renders. */
export const WORK_FILTERS: ReadonlyArray<WorkFilter> = [
  undefined,
  ...WORK_ROLES,
].flatMap((role) =>
  [false, true].map((passion) => ({
    ...(role ? { role } : {}),
    passion,
  })),
);

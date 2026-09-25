import { WORK_ROLES, type WorkRole } from "./routes";

/**
 * Work's arrangement and filter (spec §6.2, D-SITE-5 as amended by SITE-4a):
 * a role that *arranges* (its films first, nothing hidden) and the
 * "Passion projects" chip that *filters*, carried in the URL
 * (`/work?role=camera&passion=1`). Pure and
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

/** Whether a film is shown. Only the passion chip hides; a role never does (SITE-4a). */
export function matchesWorkFilter(
  film: WorkFilterable,
  filter: WorkFilter,
): boolean {
  return !filter.passion || film.passion;
}

/**
 * Films arranged by a role: those credited with it first, then the rest,
 * each group in the order given (`workOrder()`, D-SITE-6). With no role,
 * the order given. A film with several roles leads in each of them.
 */
export function arrangeWork<T extends WorkFilterable>(
  films: ReadonlyArray<T>,
  role: WorkRole | undefined,
): Readonly<{ first: ReadonlyArray<T>; rest: ReadonlyArray<T> }> {
  if (!role) return { first: films, rest: [] };
  return {
    first: films.filter((film) => film.roles.includes(role)),
    rest: films.filter((film) => !film.roles.includes(role)),
  };
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

/**
 * Shared helpers for the Aurora site.
 * Reimplements the load-bearing bits of the old Jekyll Ruby plugins
 * (data_filter, etc.) plus base-path-aware linking for GitHub Pages.
 */

const BASE = import.meta.env.BASE_URL; // e.g. "/Aurora_UJS_website/"

/**
 * Base-aware URL for internal links and `public/` assets.
 * External / mailto / anchor / protocol-relative links pass through untouched.
 *   link("/team")          -> "/Aurora_UJS_website/team"
 *   link("/images/x.png")  -> "/Aurora_UJS_website/images/x.png"
 *   link("https://...")    -> unchanged
 */
export function link(path = "/"): string {
  if (!path) return BASE;
  if (/^(https?:)?\/\//.test(path) || /^(mailto:|tel:|#|data:)/.test(path)) {
    return path;
  }
  const clean = path.replace(/^\/+/, "");
  return (BASE.endsWith("/") ? BASE : BASE + "/") + clean;
}

/** Convenience alias for `public/` assets. */
export const asset = link;

/** Is this URL external (opens in a new tab)? */
export function isExternal(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || /^mailto:|^tel:/.test(href);
}

/** Active-nav test that tolerates the base path + trailing slashes. */
export function isActive(current: string, href: string): boolean {
  const norm = (s: string) =>
    s.replace(BASE, "/").replace(/\/+$/, "") || "/";
  const c = norm(current);
  const h = norm(href);
  return h === "/" ? c === "/" : c === h || c.startsWith(h + "/");
}

/* ------------------------------------------------------------------ *
 * Dates — awards use "YYYY-M-D", events use "YYYY-MM-DD HH:MM"
 * ------------------------------------------------------------------ */

export function getYear(date?: Date | null): number | null {
  return date instanceof Date && !isNaN(+date) ? date.getFullYear() : null;
}

/** "2024年8月" */
export function formatYearMonth(date?: Date | null): string {
  if (!(date instanceof Date) || isNaN(+date)) return "";
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

/** "2025年5月31日 11:25" */
export function formatDateTime(date?: Date | null): string {
  if (!(date instanceof Date) || isNaN(+date)) return "";
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${y}年${m}月${d}日 ${hh}:${mm}`;
}

/** "2024年" */
export function formatYear(date?: Date | null): string {
  const y = getYear(date);
  return y ? `${y}年` : "";
}

/* ------------------------------------------------------------------ *
 * Collection helpers
 * ------------------------------------------------------------------ */

/**
 * Group items by year (descending), preserving order within a year.
 * Replaces the Jekyll `group_by_exp` + reverse used by list.html.
 */
export function groupByYear<T>(
  items: T[],
  getDate: (item: T) => Date | null | undefined,
): { year: number | string; items: T[] }[] {
  const groups = new Map<number | string, T[]>();
  for (const item of items) {
    const y = getYear(getDate(item) ?? null) ?? "其他";
    if (!groups.has(y)) groups.set(y, []);
    groups.get(y)!.push(item);
  }
  return [...groups.entries()]
    .sort((a, b) => {
      if (typeof a[0] === "string") return 1;
      if (typeof b[0] === "string") return -1;
      return (b[0] as number) - (a[0] as number);
    })
    .map(([year, items]) => ({ year, items }));
}

/**
 * Loose substring filter equivalent to the old Ruby `data_filter`.
 * `field` matches if String(value) contains the query (Unicode-safe).
 */
export function matchesField(
  value: unknown,
  query: string | number,
): boolean {
  return String(value ?? "").includes(String(query));
}

/** Medal tier from an award's free-text `prize` (old award.html logic). */
export type Medal = "gold" | "silver" | "bronze" | "none";
export function medalTier(prize?: string | null): Medal {
  const p = prize ?? "";
  if (/(特等奖|一等奖|冠军|金奖)/.test(p)) return "gold";
  if (/(二等奖|亚军|银奖)/.test(p)) return "silver";
  if (/(三等奖|季军|铜奖)/.test(p)) return "bronze";
  return "none";
}

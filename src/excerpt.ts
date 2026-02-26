export interface ExcerptOptions {
  /** Radius of characters to include around the phrase. Default: `30` */
  radius?: number;
  /** String used to indicate omitted text. Default: `"…"` */
  omission?: string;
}

/**
 * Extract a snippet from a string around the first occurrence of a phrase.
 *
 * @example
 * excerpt("The quick brown fox jumps over the lazy dog", "fox", { radius: 5 })
 * // "…brown fox jumps…"
 */
export function excerpt(
  input: string,
  phrase: string,
  options: ExcerptOptions = {},
): string {
  const { radius = 30, omission = "…" } = options;
  const index = input.toLowerCase().indexOf(phrase.toLowerCase());

  if (index === -1) return "";

  let start = Math.max(0, index - radius);
  let end = Math.min(input.length, index + phrase.length + radius);

  let result = input.slice(start, end);

  if (start > 0) result = omission + result;
  if (end < input.length) result = result + omission;

  return result;
}

export interface TruncateMiddleOptions {
  /** Maximum length including the ellipsis. Default: `30` */
  length?: number;
  /** String inserted in the middle when truncated. Default: `"…"` */
  ellipsis?: string;
}

/**
 * Truncate a string from the middle (useful for IDs/hashes), keeping both ends.
 *
 * @example
 * truncateMiddle("abcdefghijklmnopqrstuvwxyz", { length: 10 }) // "abcde…wxyz"
 */
export function truncateMiddle(
  input: string,
  options: TruncateMiddleOptions = {},
): string {
  const { length = 30, ellipsis = "…" } = options;

  const chars = [...input];
  const ell = [...ellipsis];

  if (chars.length <= length) return input;

  const remaining = length - ell.length;
  if (remaining <= 0) return ell.slice(0, Math.max(0, length)).join("");

  const keepStart = Math.ceil(remaining / 2);
  const keepEnd = Math.floor(remaining / 2);

  return (
    chars.slice(0, keepStart).join("") +
    ell.join("") +
    chars.slice(chars.length - keepEnd).join("")
  );
}


export interface TruncateOptions {
  /** Maximum length including the ellipsis. Default: `30` */
  length?: number;
  /** String appended when truncated. Default: `"…"` */
  ellipsis?: string;
  /** Truncate at the nearest word boundary. Default: `true` */
  wordBoundary?: boolean;
}

/**
 * Truncate a string to a given length, optionally respecting word boundaries.
 *
 * @example
 * truncate("The quick brown fox jumps over the lazy dog", { length: 20 })
 * // "The quick brown fox…"
 */
export function truncate(input: string, options: TruncateOptions = {}): string {
  const { length = 30, ellipsis = "…", wordBoundary = true } = options;

  if (input.length <= length) return input;

  const maxLen = length - ellipsis.length;
  let trimmed = input.slice(0, maxLen);

  if (wordBoundary) {
    const lastSpace = trimmed.lastIndexOf(" ");
    if (lastSpace > 0) trimmed = trimmed.slice(0, lastSpace);
  }

  return trimmed + ellipsis;
}

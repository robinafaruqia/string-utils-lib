/**
 * Count the number of words in a string.
 *
 * @example
 * countWords("Hello, World!")   // 2
 * countWords("  spaced  out ") // 2
 */
export function countWords(input: string): number {
  const trimmed = input.trim();
  if (trimmed.length === 0) return 0;
  return trimmed.split(/\s+/).length;
}

/**
 * Count occurrences of a substring within a string.
 *
 * @example
 * countOccurrences("banana", "an") // 2
 */
export function countOccurrences(input: string, search: string): number {
  if (search.length === 0) return 0;
  let count = 0;
  let pos = 0;
  while ((pos = input.indexOf(search, pos)) !== -1) {
    count++;
    pos += search.length;
  }
  return count;
}

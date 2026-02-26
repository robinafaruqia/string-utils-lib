/**
 * Reverse a string. Handles unicode characters correctly using
 * the built-in iterator.
 *
 * @example
 * reverse("hello") // "olleh"
 * reverse("🚀🌍")  // "🌍🚀"
 */
export function reverse(input: string): string {
  return [...input].reverse().join("");
}

/**
 * Escape a string so it can be safely used inside a regular expression.
 *
 * @example
 * escapeRegExp("hello.*") // "hello\\.\\*"
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}


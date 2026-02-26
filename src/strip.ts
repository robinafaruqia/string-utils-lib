/**
 * Strip all HTML tags from a string.
 *
 * @example
 * stripHtml("<p>Hello <b>World</b></p>") // "Hello World"
 */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

/**
 * Remove all whitespace from a string.
 *
 * @example
 * stripWhitespace("  h e l l o  ") // "hello"
 */
export function stripWhitespace(input: string): string {
  return input.replace(/\s+/g, "");
}

/**
 * Collapse consecutive whitespace into a single space and trim.
 *
 * @example
 * collapseWhitespace("  hello   world  ") // "hello world"
 */
export function collapseWhitespace(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}

/**
 * Check if a string is a valid http/https URL.
 *
 * @example
 * isUrl("https://example.com") // true
 * isUrl("example.com")         // false
 */
export function isUrl(input: string): boolean {
  const value = input.trim();
  if (value.length === 0) return false;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}


/**
 * Extract initials from a name.
 *
 * @example
 * initials("John Doe")          // "JD"
 * initials("alice bob charlie") // "ABC"
 */
export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

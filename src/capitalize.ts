/**
 * Capitalize the first letter of a string.
 *
 * @example
 * capitalize("hello world") // "Hello world"
 */
export function capitalize(input: string): string {
  if (input.length === 0) return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}

/**
 * Capitalize the first letter of every word in a string.
 *
 * @example
 * capitalizeWords("hello world") // "Hello World"
 */
export function capitalizeWords(input: string): string {
  return input.replace(/\b\w/g, (char) => char.toUpperCase());
}

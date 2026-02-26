/**
 * Pad a string on the left to reach a target length.
 *
 * @example
 * padStart("42", 5, "0") // "00042"
 */
export function padStart(
  input: string,
  length: number,
  char: string = " ",
): string {
  return input.padStart(length, char);
}

/**
 * Pad a string on the right to reach a target length.
 *
 * @example
 * padEnd("42", 5, "0") // "42000"
 */
export function padEnd(
  input: string,
  length: number,
  char: string = " ",
): string {
  return input.padEnd(length, char);
}

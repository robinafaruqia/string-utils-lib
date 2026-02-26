/**
 * Check if a string is a palindrome (case-insensitive, ignores non-alphanumeric).
 *
 * @example
 * isPalindrome("Racecar")          // true
 * isPalindrome("A man a plan a canal Panama") // true
 */
export function isPalindrome(input: string): boolean {
  const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === [...cleaned].reverse().join("");
}

/**
 * Check if a string is blank (empty or only whitespace).
 *
 * @example
 * isBlank("")    // true
 * isBlank("  ")  // true
 * isBlank(" a ") // false
 */
export function isBlank(input: string): boolean {
  return input.trim().length === 0;
}

/**
 * Check if a string contains only numeric characters.
 *
 * @example
 * isNumeric("12345") // true
 * isNumeric("123a5") // false
 */
export function isNumeric(input: string): boolean {
  return input.length > 0 && /^\d+$/.test(input);
}

/**
 * Check if a string contains only alphabetic characters.
 *
 * @example
 * isAlpha("hello") // true
 * isAlpha("hello1") // false
 */
export function isAlpha(input: string): boolean {
  return input.length > 0 && /^[a-zA-Z]+$/.test(input);
}

/**
 * Check if a string contains only alphanumeric characters.
 *
 * @example
 * isAlphanumeric("hello123") // true
 */
export function isAlphanumeric(input: string): boolean {
  return input.length > 0 && /^[a-zA-Z0-9]+$/.test(input);
}

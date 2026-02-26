/**
 * Split a string into word tokens, handling camelCase, PascalCase,
 * kebab-case, snake_case, and whitespace.
 */
function toWords(input: string): string[] {
  return input
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_\-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Convert a string to camelCase.
 *
 * @example
 * toCamelCase("hello-world")   // "helloWorld"
 * toCamelCase("Hello World")   // "helloWorld"
 */
export function toCamelCase(input: string): string {
  const words = toWords(input);
  return words
    .map((w, i) =>
      i === 0
        ? w.toLowerCase()
        : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
    )
    .join("");
}

/**
 * Convert a string to PascalCase.
 *
 * @example
 * toPascalCase("hello-world") // "HelloWorld"
 */
export function toPascalCase(input: string): string {
  return toWords(input)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

/**
 * Convert a string to kebab-case.
 *
 * @example
 * toKebabCase("helloWorld") // "hello-world"
 */
export function toKebabCase(input: string): string {
  return toWords(input)
    .map((w) => w.toLowerCase())
    .join("-");
}

/**
 * Convert a string to snake_case.
 *
 * @example
 * toSnakeCase("helloWorld") // "hello_world"
 */
export function toSnakeCase(input: string): string {
  return toWords(input)
    .map((w) => w.toLowerCase())
    .join("_");
}

/**
 * Convert camelCase or PascalCase to kebab-case.
 *
 * @example
 * camelToKebab("backgroundColor") // "background-color"
 */
export function camelToKebab(input: string): string {
  return toKebabCase(input);
}

/**
 * Convert camelCase or PascalCase to snake_case.
 *
 * @example
 * camelToSnake("backgroundColor") // "background_color"
 */
export function camelToSnake(input: string): string {
  return toSnakeCase(input);
}

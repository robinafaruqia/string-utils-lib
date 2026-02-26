/**
 * Simple template string interpolation using `{{key}}` placeholders.
 *
 * @example
 * template("Hello, {{name}}!", { name: "World" }) // "Hello, World!"
 * template("{{a}} + {{b}} = {{c}}", { a: "1", b: "2", c: "3" })
 * // "1 + 2 = 3"
 */
export function template(
  input: string,
  values: Record<string, string | number>,
): string {
  return input.replace(/\{\{(\w+)\}\}/g, (match, key: string) => {
    return key in values ? String(values[key]) : match;
  });
}

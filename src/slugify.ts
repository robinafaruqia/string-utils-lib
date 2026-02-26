export interface SlugifyOptions {
  /** Character used to replace spaces/separators. Default: `"-"` */
  separator?: string;
  /** Convert to lowercase. Default: `true` */
  lowercase?: boolean;
}

/**
 * Convert a string into a URL-friendly slug.
 *
 * @example
 * slugify("Hello World!")        // "hello-world"
 * slugify("Héllo Wörld")        // "hello-world"
 * slugify("foo bar", { separator: "_" }) // "foo_bar"
 */
export function slugify(input: string, options: SlugifyOptions = {}): string {
  const { separator = "-", lowercase = true } = options;

  let result = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s\-_]/g, "")
    .trim()
    .replace(/[\s\-_]+/g, separator);

  if (lowercase) result = result.toLowerCase();
  return result;
}

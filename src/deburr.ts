const SPECIAL_CHAR_MAP: Record<string, string> = {
  ß: "ss",
  Æ: "AE",
  æ: "ae",
  Ø: "O",
  ø: "o",
  Ð: "D",
  ð: "d",
  Þ: "Th",
  þ: "th",
  Ł: "L",
  ł: "l",
  Œ: "OE",
  œ: "oe",
};

/**
 * Remove diacritics/accents from a string.
 *
 * @example
 * deburr("Héllo Wörld") // "Hello World"
 */
export function deburr(input: string): string {
  const withoutMarks = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return withoutMarks.replace(
    /[ßÆæØøÐðÞþŁłŒœ]/g,
    (c) => SPECIAL_CHAR_MAP[c] ?? c,
  );
}


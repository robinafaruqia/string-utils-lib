export interface SanitizeFilenameOptions {
  /** Replacement string for invalid characters. Default: `"_"` */
  replacement?: string;
  /** Maximum length of the resulting filename. Default: `255` */
  maxLength?: number;
}

function escapeForRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const WINDOWS_RESERVED_NAMES = new Set([
  "CON",
  "PRN",
  "AUX",
  "NUL",
  "COM1",
  "COM2",
  "COM3",
  "COM4",
  "COM5",
  "COM6",
  "COM7",
  "COM8",
  "COM9",
  "LPT1",
  "LPT2",
  "LPT3",
  "LPT4",
  "LPT5",
  "LPT6",
  "LPT7",
  "LPT8",
  "LPT9",
]);

/**
 * Sanitize a string so it can be used as a filename on common filesystems.
 * (Cleans Windows-invalid characters, control chars, trims, and avoids reserved names.)
 *
 * @example
 * sanitizeFilename("my<file>:name?.txt") // "my_file_name_.txt"
 */
export function sanitizeFilename(
  input: string,
  options: SanitizeFilenameOptions = {},
): string {
  const { replacement = "_", maxLength = 255 } = options;

  // Windows-invalid + control chars
  let name = input.replace(/[<>:"/\\|?*\x00-\x1F]/g, replacement);

  // normalize whitespace
  name = name.replace(/\s+/g, " ").trim();

  // Windows: trailing dots/spaces are not allowed
  name = name.replace(/[. ]+$/g, "");
  name = name.replace(/^[. ]+/g, "");

  if (name === "" || name === "." || name === "..") name = "_";

  if (replacement.length > 0) {
    const esc = escapeForRegExp(replacement);
    name = name.replace(new RegExp(`${esc}{2,}`, "g"), replacement);
  }

  // Avoid reserved names (case-insensitive). Compare base (before first dot).
  const base = name.split(".")[0]?.toUpperCase() ?? "";
  if (WINDOWS_RESERVED_NAMES.has(base)) name = "_" + name;

  if (name.length > maxLength) name = name.slice(0, maxLength);

  return name;
}


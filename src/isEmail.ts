/**
 * Basic email validation (intentionally not fully RFC-compliant).
 *
 * @example
 * isEmail("a@b.com") // true
 * isEmail("not-an-email") // false
 */
export function isEmail(input: string): boolean {
  const email = input.trim();
  if (email.length === 0 || email.length > 254) return false;

  const at = email.indexOf("@");
  if (at <= 0 || at !== email.lastIndexOf("@")) return false;

  const local = email.slice(0, at);
  const domain = email.slice(at + 1);

  if (local.length === 0 || local.length > 64) return false;
  if (domain.length === 0) return false;
  if (!domain.includes(".")) return false;
  if (domain.startsWith(".") || domain.endsWith(".")) return false;
  if (domain.includes("..")) return false;

  // no spaces and no extra '@'
  if (!/^[^\s@]+$/.test(local)) return false;
  if (!/^[A-Za-z0-9.-]+$/.test(domain)) return false;

  return true;
}


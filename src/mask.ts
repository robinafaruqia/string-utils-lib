/**
 * Mask an email address, showing only the first and last character
 * of the local part.
 *
 * @example
 * maskEmail("john.doe@example.com") // "j******e@example.com"
 */
export function maskEmail(email: string): string {
  const atIndex = email.indexOf("@");
  if (atIndex < 1) return email;

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex);

  if (local.length <= 2) return local.charAt(0) + "*" + domain;

  const first = local.charAt(0);
  const last = local.charAt(local.length - 1);
  const masked = "*".repeat(local.length - 2);

  return first + masked + last + domain;
}

export interface MaskOptions {
  /** Character used for masking. Default: `"*"` */
  char?: string;
  /** Number of characters to keep visible at the start. Default: `4` */
  keepStart?: number;
  /** Number of characters to keep visible at the end. Default: `0` */
  keepEnd?: number;
}

/**
 * Mask a string, keeping a configurable number of characters visible
 * at the start and end.
 *
 * @example
 * mask("4242424242424242")                         // "4242************"
 * mask("4242424242424242", { keepStart: 0, keepEnd: 4 }) // "************4242"
 */
export function mask(input: string, options: MaskOptions = {}): string {
  const { char = "*", keepStart = 4, keepEnd = 0 } = options;

  if (input.length <= keepStart + keepEnd) return input;

  const start = input.slice(0, keepStart);
  const end = keepEnd > 0 ? input.slice(-keepEnd) : "";
  const middle = char.repeat(input.length - keepStart - keepEnd);

  return start + middle + end;
}

/**
 * Mask a phone number, keeping the last 4 digits visible.
 *
 * @example
 * maskPhone("+1 (555) 123-4567") // "***********4567"
 */
export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return mask(digits, { keepStart: 0, keepEnd: 4 });
}

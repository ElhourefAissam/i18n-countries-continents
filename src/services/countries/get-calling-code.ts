import { getMetadata } from "../../data/metadata.js";

/**
 * Get the international calling dial code for a country code (e.g. 'US' -> '+1', 'FR' -> '+33', 'MA' -> '+212').
 *
 * @param countryCode - 2-letter ISO 3166-1 alpha-2 country code (case-insensitive)
 * @returns Dialing code string with '+' prefix, or undefined if not found
 *
 * @example
 * ```ts
 * getCallingCode('FR'); // "+33"
 * getCallingCode('US'); // "+1"
 * getCallingCode('MA'); // "+212"
 * ```
 */
export default function getCallingCode(
  countryCode: string
): string | undefined {
  if (!countryCode || typeof countryCode !== "string") return undefined;
  return getMetadata(countryCode)?.callingCode;
}

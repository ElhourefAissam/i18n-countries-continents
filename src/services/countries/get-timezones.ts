import { getMetadata, alpha3ToAlpha2 } from "../../data/metadata.js";

/**
 * Get the list of IANA timezone identifiers for a country (e.g. 'FR' -> ['Europe/Paris']).
 * Accepts 2-letter alpha-2 or 3-letter alpha-3 country codes.
 *
 * @param countryCode - 2-letter or 3-letter ISO country code (e.g. 'FR', 'USA', 'JP')
 * @returns Array of IANA timezone identifier strings
 *
 * @example
 * ```ts
 * getTimezones('FR');  // ['Europe/Paris']
 * getTimezones('JP');  // ['Asia/Tokyo']
 * getTimezones('MA');  // ['Africa/Casablanca']
 * getTimezones('USA'); // ['America/New_York', 'America/Detroit', ...]
 * ```
 */
export default function getTimezones(countryCode: string): string[] {
  if (!countryCode || typeof countryCode !== "string") return [];
  let code = countryCode.toUpperCase().trim();
  if (code.length === 3) {
    const a2 = alpha3ToAlpha2(code);
    if (a2) code = a2;
  }
  const meta = getMetadata(code);
  return meta?.timezones ? [...meta.timezones] : [];
}

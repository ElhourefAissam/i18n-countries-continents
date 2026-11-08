import { getMetadata } from "../../data/metadata.js";

/**
 * Get the native country name (endonym) in its official local language.
 * (e.g. 'DE' -> 'Deutschland', 'JP' -> '日本', 'MA' -> 'المغرب', 'GR' -> 'Ελλάδα').
 * Accepts both 2-letter alpha-2 and 3-letter alpha-3 country codes.
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code (case-insensitive)
 * @returns Local native country name, or undefined if not found
 *
 * @example
 * ```ts
 * getNativeName('DE');  // 'Deutschland'
 * getNativeName('JPN'); // '日本'
 * getNativeName('MA');  // 'المغرب'
 * ```
 */
export default function getNativeName(countryCode?: string): string | undefined {
  if (!countryCode || typeof countryCode !== "string") return undefined;
  return getMetadata(countryCode)?.nativeName || undefined;
}

export { getNativeName as getCountryNativeName };

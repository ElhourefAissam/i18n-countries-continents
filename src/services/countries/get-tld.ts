import { getMetadata } from "../../data/metadata.js";

/**
 * Get country-code Top-Level Domain (ccTLD) for a country (e.g. 'US' -> '.us', 'FR' -> '.fr', 'MA' -> '.ma').
 * Accepts 2-letter alpha-2 (e.g. 'FR') and 3-letter alpha-3 (e.g. 'FRA') codes.
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code (case-insensitive)
 * @returns ccTLD string with leading dot, or undefined if invalid
 *
 * @example
 * ```ts
 * getTld('US');  // '.us'
 * getTld('FRA'); // '.fr'
 * getTld('jp');  // '.jp'
 * ```
 */
export default function getTld(countryCode?: string): string | undefined {
  if (!countryCode || typeof countryCode !== "string") return undefined;
  return getMetadata(countryCode)?.tld || undefined;
}

export { getTld as getCountryTld };

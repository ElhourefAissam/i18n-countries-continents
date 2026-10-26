import { getLangCountries } from "../../data/loader.js";

/**
 * Get the continent code for a country by its ISO 3166-1 alpha-2 code.
 *
 * @param countryCode - 2-letter ISO country code (e.g. 'US', 'FR', 'JP')
 * @returns 2-letter continent code ('AF' | 'AN' | 'AS' | 'EU' | 'NA' | 'OC' | 'SA'), or undefined if not found
 *
 * @example
 * ```ts
 * getContinentByCountry('US'); // "NA"
 * getContinentByCountry('FR'); // "EU"
 * getContinentByCountry('JP'); // "AS"
 * ```
 */
export default function getContinentByCountry(
  countryCode: string
): string | undefined {
  const upper = countryCode.toUpperCase();
  const entry = getLangCountries("en").find(([c]) => c === upper);
  return entry ? entry[1] : undefined;
}

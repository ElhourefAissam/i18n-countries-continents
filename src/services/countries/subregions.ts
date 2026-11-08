import { SupportedLanguage } from "../../utils/types.js";
import { getMetadata, subregionToAlpha2List, getAllSubregions } from "../../data/metadata.js";
import getCountry from "./get-country.js";
import { Country } from "./get-countries.js";

/**
 * Get the UN geographic subregion for a country (e.g. 'FR' -> 'Western Europe', 'US' -> 'North America', 'MA' -> 'Northern Africa').
 * Accepts both 2-letter alpha-2 and 3-letter alpha-3 country codes.
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code (case-insensitive)
 * @returns Subregion name, or undefined if invalid
 *
 * @example
 * ```ts
 * getSubregion('FR');  // 'Western Europe'
 * getSubregion('USA'); // 'North America'
 * getSubregion('MA');  // 'Northern Africa'
 * ```
 */
export function getSubregion(countryCode?: string): string | undefined {
  if (!countryCode || typeof countryCode !== "string") return undefined;
  return getMetadata(countryCode)?.subregion || undefined;
}

/**
 * Find all countries belonging to a specific UN subregion.
 *
 * @param subregionName - UN subregion name (e.g. 'Western Europe', 'South America', 'Caribbean')
 * @param language - Target language for localized country names (default: 'en')
 * @returns Array of Country objects belonging to the subregion
 *
 * @example
 * ```ts
 * const westernEurope = getCountriesBySubregion('Western Europe', 'fr');
 * ```
 */
export function getCountriesBySubregion(
  subregionName: string,
  language: SupportedLanguage = "en"
): Country[] {
  if (!subregionName || typeof subregionName !== "string") return [];
  const alpha2List = subregionToAlpha2List(subregionName);
  return alpha2List
    .map((code) => getCountry(code, language))
    .filter((c): c is Country => c !== undefined);
}

/**
 * Get all 24 unique UN geographic subregion names.
 *
 * @returns Array of subregion names sorted alphabetically
 *
 * @example
 * ```ts
 * const subregions = getSubregions();
 * // ['Australia and New Zealand', 'Caribbean', 'Central America', ...]
 * ```
 */
export function getSubregions(): string[] {
  return getAllSubregions();
}

export { getSubregion as getCountrySubregion };
export default getSubregion;

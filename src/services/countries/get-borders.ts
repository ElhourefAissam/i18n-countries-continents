import { SupportedLanguage } from "../../utils/types.js";
import { getMetadata } from "../../data/metadata.js";
import getCountry from "./get-country.js";
import { Country } from "./get-countries.js";

/**
 * Get ISO 3166-1 alpha-2 codes of all countries bordering a specified country.
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code (e.g. 'US', 'FRA')
 * @returns Array of alpha-2 codes of bordering countries (empty for islands)
 *
 * @example
 * ```ts
 * getBorders('US'); // ['CA', 'MX']
 * getBorders('JP'); // [] (island nation)
 * ```
 */
export function getBorders(countryCode?: string): string[] {
  if (!countryCode || typeof countryCode !== "string") return [];
  return getMetadata(countryCode)?.borders || [];
}

/**
 * Get localized Country objects of all countries sharing a land border with a specified country.
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code (e.g. 'US', 'FRA')
 * @param language - Target language for localized country names (default: 'en')
 * @returns Array of neighboring Country objects
 *
 * @example
 * ```ts
 * const neighbors = getCountryBorders('US', 'es');
 * // [ Country { code: 'CA', name: 'Canadá' }, Country { code: 'MX', name: 'México' } ]
 * ```
 */
export function getCountryBorders(
  countryCode?: string,
  language: SupportedLanguage = "en"
): Country[] {
  const borders = getBorders(countryCode);
  return borders
    .map((code) => getCountry(code, language))
    .filter((c): c is Country => c !== undefined);
}

export default getBorders;

import { SupportedLanguage } from "../../utils/types.js";
import { getMetadata, spokenLanguageToAlpha2List } from "../../data/metadata.js";
import getCountry from "./get-country.js";
import { Country } from "./get-countries.js";

/**
 * Get official or widely spoken language codes for a country.
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code (e.g. 'CH', 'CA', 'FR')
 * @returns Array of language codes (e.g. ['de', 'fr', 'it', 'roh'] for Switzerland)
 *
 * @example
 * ```ts
 * getCountryLanguages('CH'); // ['fr', 'gsw', 'it', 'roh']
 * getCountryLanguages('FR'); // ['fr']
 * ```
 */
export function getCountryLanguages(countryCode?: string): string[] {
  if (!countryCode || typeof countryCode !== "string") return [];
  return getMetadata(countryCode)?.languages || [];
}

/**
 * Find all countries where a specified language is officially or widely spoken.
 *
 * @param languageCode - ISO language code (e.g. 'fr', 'es', 'de', 'ar')
 * @param targetLanguage - Target language for localized country names (default: 'en')
 * @returns Array of Country objects
 *
 * @example
 * ```ts
 * const francophoneCountries = getCountriesBySpokenLanguage('fr');
 * ```
 */
export function getCountriesBySpokenLanguage(
  languageCode: string,
  targetLanguage: SupportedLanguage = "en"
): Country[] {
  if (!languageCode || typeof languageCode !== "string") return [];
  const alpha2List = spokenLanguageToAlpha2List(languageCode);
  return alpha2List
    .map((code) => getCountry(code, targetLanguage))
    .filter((c): c is Country => c !== undefined);
}

export default getCountryLanguages;

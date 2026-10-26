import { SupportedLanguage } from "./types.js";
import { Country } from "../services/countries/get-countries.js";
import { Continent } from "../services/continents/get-continents.js";
import { City } from "../services/cities/get-cities.js";

/**
 * Sort a list of countries alphabetically by localized name using locale-aware collation.
 *
 * @param countries - Array of Country objects
 * @param language - Language locale for collation (default: 'en')
 * @returns A new sorted array of Country objects
 *
 * @example
 * ```ts
 * const countries = getCountries('es');
 * const sorted = sortCountries(countries, 'es');
 * // "Alemania" appears before "España"
 * ```
 */
export function sortCountries(
  countries: Country[],
  language: SupportedLanguage = "en"
): Country[] {
  if (!Array.isArray(countries)) return [];
  const collator = new Intl.Collator(language, { sensitivity: "base" });
  return [...countries].sort((a, b) => collator.compare(a.name, b.name));
}

/**
 * Sort a list of continents alphabetically by localized name using locale-aware collation.
 *
 * @param continents - Array of Continent objects
 * @param language - Language locale for collation (default: 'en')
 * @returns A new sorted array of Continent objects
 *
 * @example
 * ```ts
 * const continents = getContinents('es');
 * const sorted = sortContinents(continents, 'es');
 * ```
 */
export function sortContinents(
  continents: Continent[],
  language: SupportedLanguage = "en"
): Continent[] {
  if (!Array.isArray(continents)) return [];
  const collator = new Intl.Collator(language, { sensitivity: "base" });
  return [...continents].sort((a, b) => collator.compare(a.name, b.name));
}

/**
 * Sort a list of cities alphabetically by localized name using locale-aware collation.
 *
 * @param cities - Array of City objects
 * @param language - Language locale for collation (default: 'en')
 * @returns A new sorted array of City objects
 *
 * @example
 * ```ts
 * const cities = getCities('fr');
 * const sorted = sortCities(cities, 'fr');
 * ```
 */
export function sortCities(
  cities: City[],
  language: SupportedLanguage = "en"
): City[] {
  if (!Array.isArray(cities)) return [];
  const collator = new Intl.Collator(language, { sensitivity: "base" });
  return [...cities].sort((a, b) =>
    collator.compare(a.translatedName, b.translatedName)
  );
}

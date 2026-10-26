import { getLangCities } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { City } from "./get-cities.js";

/**
 * Search for cities by query string, searching across both English and localized names.
 *
 * @param query - Search term (case-insensitive)
 * @param language - Target language (default: 'en')
 * @param limit - Maximum number of results to return (default: 10)
 * @returns Array of matching City objects
 *
 * @example
 * ```ts
 * const results = searchCities('tokyo', 'en', 5);
 * ```
 */
export default function searchCities(
  query: string,
  language: SupportedLanguage = "en",
  limit: number = 10
): City[] {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return [];
  }

  return getLangCities(language)
    .filter(([name, translatedName]) => {
      return (
        name.toLowerCase().includes(normalizedQuery) ||
        translatedName.toLowerCase().includes(normalizedQuery)
      );
    })
    .slice(0, limit)
    .map(([name, translatedName]) => ({ name, translatedName }));
}

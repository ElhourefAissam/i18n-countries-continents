import { getLangCities } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { normalizeText } from "../../utils/normalize.js";
import { City } from "./get-cities.js";

/**
 * Search for cities by query string, searching across both English and localized names.
 * Searches are accent- and diacritic-insensitive (e.g. searching 'cordoba' matches 'Córdoba', 'montreal' matches 'Montréal').
 *
 * @param query - Search term (case- and accent-insensitive)
 * @param language - Target language (default: 'en')
 * @param limit - Maximum number of results to return (default: 10)
 * @returns Array of matching City objects
 *
 * @example
 * ```ts
 * searchCities('tokyo', 'en', 5);
 * searchCities('cordoba', 'es', 5); // Finds Córdoba
 * searchCities('montreal', 'en', 5); // Finds Montréal
 * ```
 */
export default function searchCities(
  query: string,
  language: SupportedLanguage = "en",
  limit: number = 10
): City[] {
  if (!query || typeof query !== "string") return [];

  const rawTrimmed = query.trim().toLowerCase();
  const normalized = normalizeText(query);
  if (!normalized || limit <= 0) {
    return [];
  }

  return getLangCities(language)
    .filter(([name, translatedName]) => {
      return (
        name.toLowerCase().includes(rawTrimmed) ||
        translatedName.toLowerCase().includes(rawTrimmed) ||
        normalizeText(name).includes(normalized) ||
        normalizeText(translatedName).includes(normalized)
      );
    })
    .slice(0, limit)
    .map(([name, translatedName]) => ({ name, translatedName }));
}

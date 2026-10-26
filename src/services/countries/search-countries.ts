import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { Country } from "./get-countries.js";

/**
 * Search for countries by name or 2-letter ISO country code.
 *
 * @param query - Country name or code to search for (case-insensitive)
 * @param language - Target language (default: 'en')
 * @param limit - Maximum number of results to return (default: 10)
 * @returns Array of matching Country objects
 *
 * @example
 * ```ts
 * const results = searchCountries('uni', 'en', 3);
 * ```
 */
export default function searchCountries(
  query: string,
  language: SupportedLanguage = "en",
  limit: number = 10
): Country[] {
  if (!query || typeof query !== "string") return [];

  const normalized = query.toLowerCase().trim();
  if (!normalized || limit <= 0) return [];

  const entries = getLangCountries(language);
  const results: Country[] = [];

  for (const [code, continent, flag, name] of entries) {
    if (
      code.toLowerCase() === normalized ||
      name.toLowerCase().includes(normalized)
    ) {
      results.push({ code, continent, flag, name });
      if (results.length >= limit) break;
    }
  }

  return results;
}

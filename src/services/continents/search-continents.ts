import { getLangContinents } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { normalizeText } from "../../utils/normalize.js";
import { Continent } from "./get-continents.js";

/**
 * Search for continents by localized name or 2-letter continent code.
 * Searches are accent- and diacritic-insensitive (e.g. searching 'oceania' matches 'Oceanía', 'africa' matches 'África').
 *
 * @param query - Search string (code or name, case- and accent-insensitive)
 * @param language - Target language (default: 'en')
 * @param limit - Maximum number of results to return (default: 7)
 * @returns Array of matching Continent objects
 *
 * @example
 * ```ts
 * searchContinents('oceania', 'es');
 * // [{ code: 'OC', name: 'Oceanía' }]
 * ```
 */
export default function searchContinents(
  query: string,
  language: SupportedLanguage = "en",
  limit: number = 7
): Continent[] {
  if (!query || typeof query !== "string") return [];

  const rawTrimmed = query.trim().toLowerCase();
  const normalized = normalizeText(query);
  if (!normalized || limit <= 0) return [];

  const entries = getLangContinents(language);
  const results: Continent[] = [];

  for (const [code, name] of entries) {
    if (
      code.toLowerCase() === rawTrimmed ||
      name.toLowerCase().includes(rawTrimmed) ||
      normalizeText(name).includes(normalized)
    ) {
      results.push({ code, name });
      if (results.length >= limit) break;
    }
  }

  return results;
}

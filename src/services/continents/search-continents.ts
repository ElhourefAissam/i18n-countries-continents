import { getLangContinents } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { Continent } from "./get-continents.js";

/**
 * Search for continents by localized name or 2-letter continent code.
 *
 * @param query - Search string (code or name, case-insensitive)
 * @param language - Target language (default: 'en')
 * @param limit - Maximum number of results to return (default: 7)
 * @returns Array of matching Continent objects
 *
 * @example
 * ```ts
 * searchContinents('eu', 'en');
 * // [{ code: 'EU', name: 'Europe' }]
 * ```
 */
export default function searchContinents(
  query: string,
  language: SupportedLanguage = "en",
  limit: number = 7
): Continent[] {
  if (!query || typeof query !== "string") return [];

  const normalized = query.toLowerCase().trim();
  if (!normalized || limit <= 0) return [];

  const entries = getLangContinents(language);
  const results: Continent[] = [];

  for (const [code, name] of entries) {
    if (
      code.toLowerCase() === normalized ||
      name.toLowerCase().includes(normalized)
    ) {
      results.push({ code, name });
      if (results.length >= limit) break;
    }
  }

  return results;
}

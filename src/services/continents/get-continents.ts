import { getLangContinents } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";

export interface Continent {
  code: string;
  name: string;
}

/**
 * Get all 7 world continents with their localized names in the specified language.
 *
 * @param language - Target language (default: 'en')
 * @returns Array of 7 Continent objects
 *
 * @example
 * ```ts
 * const continents = getContinents('fr');
 * continents.forEach(c => console.log(c.code, c.name));
 * ```
 */
export default function getContinents(
  language: SupportedLanguage = "en"
): Continent[] {
  return getLangContinents(language).map(([code, name]) => ({ code, name }));
}

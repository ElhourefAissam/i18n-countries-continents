import { getLangCities } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";

export interface City {
  name: string;
  translatedName: string;
}

/**
 * Get all 4,010 world cities with their localized names in the specified language.
 *
 * @param language - Target language (default: 'en')
 * @returns Array of 4,010 City objects
 *
 * @example
 * ```ts
 * const cities = getCities('es');
 * cities.slice(0, 5).forEach(c => console.log(c.name, '→', c.translatedName));
 * ```
 */
export default function getCities(language: SupportedLanguage = "en"): City[] {
  return getLangCities(language).map(([name, translatedName]) => ({
    name,
    translatedName,
  }));
}

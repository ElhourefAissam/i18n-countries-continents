import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";

export interface Country {
  code: string;
  continent: string;
  name: string;
  flag: string;
}

/**
 * Get all 250 countries with their names, continent codes, and flag emojis in the specified language.
 *
 * @param language - Target language (default: 'en')
 * @returns Array of 250 Country objects
 *
 * @example
 * ```ts
 * const countries = getCountries('es');
 * countries.forEach(c => console.log(c.flag, c.code, c.name, c.continent));
 * ```
 */
export default function getCountries(
  language: SupportedLanguage = "en"
): Country[] {
  return getLangCountries(language).map(([code, continent, flag, name]) => ({
    code,
    continent,
    name,
    flag,
  }));
}

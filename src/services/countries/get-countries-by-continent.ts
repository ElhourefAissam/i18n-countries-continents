import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { getMetadata } from "../../data/metadata.js";
import { Country } from "./get-countries.js";

/**
 * Get all countries belonging to a specific continent.
 *
 * @param continentCode - 2-letter continent code ('AF' | 'AN' | 'AS' | 'EU' | 'NA' | 'OC' | 'SA')
 * @param language - Target language (default: 'en')
 * @returns Array of Country objects belonging to the continent
 *
 * @example
 * ```ts
 * const europeanCountries = getCountriesByContinent('EU', 'fr');
 * ```
 */
export default function getCountriesByContinent(
  continentCode: string,
  language: SupportedLanguage = "en"
): Country[] {
  if (!continentCode || typeof continentCode !== "string") return [];

  const upper = continentCode.toUpperCase().trim();
  if (!upper) return [];

  return getLangCountries(language)
    .filter(([, continent]) => continent === upper)
    .map(([code, continent, flag, name]) => {
      const meta = getMetadata(code);
      return {
        code,
        alpha3: meta?.alpha3 || "",
        numeric: meta?.numeric || "",
        continent,
        flag,
        name,
        callingCode: meta?.callingCode || "",
        currency: meta?.currency || { code: "", symbol: "", name: "" },
      };
    });
}

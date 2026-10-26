import { getLangCities } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";

/**
 * Get the localized name of a city by its English name.
 *
 * @param cityName - English city name (case-insensitive)
 * @param language - Target language (default: 'en')
 * @returns Localized city name, or undefined if not found
 *
 * @example
 * ```ts
 * getCityName('Paris', 'ar');  // "باريس"
 * getCityName('London', 'fr'); // "Londres"
 * ```
 */
export default function getCityName(
  cityName: string,
  language: SupportedLanguage = "en"
): string | undefined {
  const lower = cityName.toLowerCase();
  const entry = getLangCities(language).find(
    ([name]) => name.toLowerCase() === lower
  );
  return entry ? entry[1] : undefined;
}

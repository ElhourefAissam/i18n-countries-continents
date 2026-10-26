import { getLangCities } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";

/**
 * Get the localized name of a city by its English or localized name.
 *
 * @param cityName - City name in English or target language (case-insensitive)
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
  if (!cityName || typeof cityName !== "string") return undefined;
  const lower = cityName.toLowerCase().trim();
  const entry = getLangCities(language).find(
    ([name, translatedName]) =>
      name.toLowerCase() === lower || translatedName.toLowerCase() === lower
  );
  return entry ? entry[1] : undefined;
}

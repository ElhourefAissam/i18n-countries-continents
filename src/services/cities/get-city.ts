import { getLangCities } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { City } from "./get-cities.js";

/**
 * Get the complete city object (`name`, `translatedName`) by its English name.
 *
 * @param cityName - English city name (case-insensitive)
 * @param language - Target language (default: 'en')
 * @returns Localized city object, or undefined if not found
 *
 * @example
 * ```ts
 * getCity('Paris', 'ar');
 * // { name: "Paris", translatedName: "باريس" }
 * ```
 */
export default function getCity(
  cityName: string,
  language: SupportedLanguage = "en"
): City | undefined {
  const lower = cityName.toLowerCase().trim();
  if (!lower) return undefined;

  const entry = getLangCities(language).find(
    ([name]) => name.toLowerCase() === lower
  );
  if (!entry) return undefined;
  const [name, translatedName] = entry;
  return { name, translatedName };
}

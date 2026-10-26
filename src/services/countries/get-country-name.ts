import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";

/**
 * Get the localized country name by its ISO 3166-1 alpha-2 code.
 *
 * @param code - 2-letter ISO country code (e.g. 'US', 'FR', 'JP')
 * @param language - Target language (default: 'en')
 * @returns Localized country name, or undefined if not found
 *
 * @example
 * ```ts
 * getCountryName('FR', 'es'); // "Francia"
 * getCountryName('DE', 'ar'); // "ألمانيا"
 * ```
 */
export default function getCountryName(
  code: string,
  language: SupportedLanguage = "en"
): string | undefined {
  const upper = code.toUpperCase();
  const entry = getLangCountries(language).find(([c]) => c === upper);
  return entry ? entry[3] : undefined;
}

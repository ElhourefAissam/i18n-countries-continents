import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { Country } from "./get-countries.js";

/**
 * Get the complete country object (`code`, `name`, `continent`, `flag`) for a country code.
 *
 * @param code - 2-letter ISO 3166-1 alpha-2 country code (case-insensitive)
 * @param language - Target language (default: 'en')
 * @returns Localized country object, or undefined if not found
 *
 * @example
 * ```ts
 * getCountry('FR', 'es');
 * // { code: "FR", continent: "EU", flag: "🇫🇷", name: "Francia" }
 * ```
 */
export default function getCountry(
  code: string,
  language: SupportedLanguage = "en"
): Country | undefined {
  if (!code || typeof code !== "string") return undefined;
  const upper = code.toUpperCase().trim();
  const entry = getLangCountries(language).find(([c]) => c === upper);
  if (!entry) return undefined;
  const [countryCode, continent, flag, name] = entry;
  return { code: countryCode, continent, flag, name };
}

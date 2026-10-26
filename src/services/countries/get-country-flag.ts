import { getLangCountries } from "../../data/loader.js";

/**
 * Get the flag emoji for a country by its ISO 3166-1 alpha-2 code.
 *
 * @param code - 2-letter ISO country code (e.g. 'US', 'FR', 'JP')
 * @returns Flag emoji string (e.g. '🇺🇸', '🇫🇷'), or undefined if not found
 *
 * @example
 * ```ts
 * getCountryFlag('US'); // "🇺🇸"
 * getCountryFlag('JP'); // "🇯🇵"
 * ```
 */
export default function getCountryFlag(code: string): string | undefined {
  const upper = code.toUpperCase();
  const entry = getLangCountries("en").find(([c]) => c === upper);
  return entry ? entry[2] : undefined;
}

import { SupportedLanguage } from "../../utils/types.js";
import { timezoneToAlpha2List } from "../../data/metadata.js";
import getCountry from "./get-country.js";
import { Country } from "./get-countries.js";

/**
 * Find all countries that use a specific IANA timezone (e.g. 'Europe/Paris', 'Africa/Casablanca').
 *
 * @param timezone - IANA timezone identifier (case-insensitive, e.g. 'Europe/Paris' or 'europe/paris')
 * @param language - Target language for localized country names (default: 'en')
 * @returns Array of Country objects that use the timezone
 *
 * @example
 * ```ts
 * getCountriesByTimezone('Europe/Paris');     // [ France ]
 * getCountriesByTimezone('Africa/Casablanca'); // [ Morocco ]
 * ```
 */
export default function getCountriesByTimezone(
  timezone: string,
  language: SupportedLanguage = "en"
): Country[] {
  if (!timezone || typeof timezone !== "string") return [];
  const alpha2List = timezoneToAlpha2List(timezone);
  if (!alpha2List.length) return [];
  return alpha2List
    .map((code) => getCountry(code, language))
    .filter((c): c is Country => c !== undefined);
}

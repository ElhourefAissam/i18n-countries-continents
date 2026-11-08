import { SupportedLanguage } from "../../utils/types.js";
import { getMetadata, demonymToAlpha2 } from "../../data/metadata.js";
import getCountry from "./get-country.js";
import { Country } from "./get-countries.js";

/**
 * Get country demonym / nationality in English (e.g. 'US' -> 'American', 'FR' -> 'French', 'MA' -> 'Moroccan').
 * Accepts both 2-letter alpha-2 and 3-letter alpha-3 country codes.
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code (case-insensitive)
 * @returns Demonym string in English, or undefined if not found
 *
 * @example
 * ```ts
 * getDemonym('US');  // 'American'
 * getDemonym('FRA'); // 'French'
 * getDemonym('JP');  // 'Japanese'
 * ```
 */
export default function getDemonym(countryCode?: string): string | undefined {
  if (!countryCode || typeof countryCode !== "string") return undefined;
  return getMetadata(countryCode)?.demonym || undefined;
}

/**
 * Reverse lookup: find a Country object by its demonym / nationality in English.
 *
 * @param demonym - Demonym string in English (e.g. 'American', 'French', 'Moroccan')
 * @param language - Target language for localized country name (default: 'en')
 * @returns Localized Country object, or undefined if not found
 *
 * @example
 * ```ts
 * getCountryByDemonym('American');     // Country { code: 'US', name: 'United States' }
 * getCountryByDemonym('French', 'es'); // Country { code: 'FR', name: 'Francia' }
 * ```
 */
export function getCountryByDemonym(
  demonym: string,
  language: SupportedLanguage = "en"
): Country | undefined {
  if (!demonym || typeof demonym !== "string") return undefined;
  const alpha2 = demonymToAlpha2(demonym);
  if (!alpha2) return undefined;
  return getCountry(alpha2, language);
}

export { getDemonym as getCountryDemonym };

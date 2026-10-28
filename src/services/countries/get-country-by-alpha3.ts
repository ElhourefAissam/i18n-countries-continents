import { SupportedLanguage } from "../../utils/types.js";
import { alpha3ToAlpha2 } from "../../data/metadata.js";
import getCountry from "./get-country.js";
import { Country } from "./get-countries.js";

/**
 * Get a Country object by its 3-letter ISO 3166-1 alpha-3 code (e.g. 'USA', 'FRA', 'MAR').
 *
 * @param alpha3 - 3-letter ISO country code (case-insensitive)
 * @param language - Target language (default: 'en')
 * @returns Localized country object, or undefined if not found
 *
 * @example
 * ```ts
 * getCountryByAlpha3('USA');
 * // { code: "US", alpha3: "USA", numeric: "840", name: "United States", ... }
 *
 * getCountryByAlpha3('FRA', 'es');
 * // { code: "FR", alpha3: "FRA", numeric: "250", name: "Francia", ... }
 * ```
 */
export default function getCountryByAlpha3(
  alpha3: string,
  language: SupportedLanguage = "en"
): Country | undefined {
  if (!alpha3 || typeof alpha3 !== "string") return undefined;
  const alpha2 = alpha3ToAlpha2(alpha3);
  if (!alpha2) return undefined;
  return getCountry(alpha2, language);
}

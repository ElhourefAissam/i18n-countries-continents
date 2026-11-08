import { SupportedLanguage } from "../../utils/types.js";
import {
  EU_COUNTRY_CODES,
  SCHENGEN_COUNTRY_CODES,
  EEA_COUNTRY_CODES,
  alpha3ToAlpha2,
} from "../../data/metadata.js";
import getCountry from "./get-country.js";
import { Country } from "./get-countries.js";

function resolveAlpha2(countryCode?: string): string {
  if (!countryCode || typeof countryCode !== "string") return "";
  const upper = countryCode.toUpperCase().trim();
  return alpha3ToAlpha2(upper) || upper;
}

/**
 * Check whether a country is a member state of the European Union (EU).
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code (e.g. 'FR', 'FRA')
 * @returns true if member of EU, false otherwise
 *
 * @example
 * ```ts
 * isEU('FR'); // true
 * isEU('US'); // false
 * ```
 */
export function isEU(countryCode?: string): boolean {
  return EU_COUNTRY_CODES.has(resolveAlpha2(countryCode));
}

/**
 * Check whether a country is a member state of the Schengen Area.
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code (e.g. 'CH', 'CHE', 'FR')
 * @returns true if member of Schengen Area, false otherwise
 *
 * @example
 * ```ts
 * isSchengen('CH'); // true (Switzerland is Schengen, but not EU)
 * isSchengen('GB'); // false
 * ```
 */
export function isSchengen(countryCode?: string): boolean {
  return SCHENGEN_COUNTRY_CODES.has(resolveAlpha2(countryCode));
}

/**
 * Check whether a country is a member state of the European Economic Area (EEA).
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code (e.g. 'NO', 'NOR', 'IS')
 * @returns true if member of EEA, false otherwise
 *
 * @example
 * ```ts
 * isEEA('NO'); // true (Norway is EEA)
 * ```
 */
export function isEEA(countryCode?: string): boolean {
  return EEA_COUNTRY_CODES.has(resolveAlpha2(countryCode));
}

/**
 * Get all 27 European Union (EU) member state Country objects.
 *
 * @param language - Target language for localized country names (default: 'en')
 * @returns Array of 27 EU Country objects
 *
 * @example
 * ```ts
 * const eu = getEUCountries('fr');
 * ```
 */
export function getEUCountries(language: SupportedLanguage = "en"): Country[] {
  return Array.from(EU_COUNTRY_CODES)
    .map((code) => getCountry(code, language))
    .filter((c): c is Country => c !== undefined);
}

/**
 * Get all 29 Schengen Area member state Country objects.
 *
 * @param language - Target language for localized country names (default: 'en')
 * @returns Array of 29 Schengen Country objects
 */
export function getSchengenCountries(
  language: SupportedLanguage = "en"
): Country[] {
  return Array.from(SCHENGEN_COUNTRY_CODES)
    .map((code) => getCountry(code, language))
    .filter((c): c is Country => c !== undefined);
}

/**
 * Get all 30 European Economic Area (EEA) member state Country objects.
 *
 * @param language - Target language for localized country names (default: 'en')
 * @returns Array of 30 EEA Country objects
 */
export function getEEACountries(language: SupportedLanguage = "en"): Country[] {
  return Array.from(EEA_COUNTRY_CODES)
    .map((code) => getCountry(code, language))
    .filter((c): c is Country => c !== undefined);
}

export { EU_COUNTRY_CODES, SCHENGEN_COUNTRY_CODES, EEA_COUNTRY_CODES };

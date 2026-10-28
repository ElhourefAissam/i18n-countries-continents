import { SupportedLanguage } from "../../utils/types.js";
import getCountries, { Country } from "./get-countries.js";

/**
 * Find all countries that use a specific currency code (e.g. 'EUR', 'USD', 'GBP').
 *
 * @param currencyCode - 3-letter ISO 4217 currency code (case-insensitive, e.g. 'EUR', 'USD')
 * @param language - Target language (default: 'en')
 * @returns Array of Country objects that use the specified currency
 *
 * @example
 * ```ts
 * const eurozone = getCountriesByCurrency('EUR', 'fr');
 * const dollarCountries = getCountriesByCurrency('USD', 'en');
 * ```
 */
export default function getCountriesByCurrency(
  currencyCode: string,
  language: SupportedLanguage = "en"
): Country[] {
  if (!currencyCode || typeof currencyCode !== "string") return [];

  const upper = currencyCode.toUpperCase().trim();
  if (!upper) return [];

  const all = getCountries(language);
  return all.filter((c) => c.currency.code.toUpperCase() === upper);
}

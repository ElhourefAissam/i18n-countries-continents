import { SupportedLanguage } from "../../utils/types.js";
import { numericToAlpha2 } from "../../data/metadata.js";
import getCountry from "./get-country.js";
import { Country } from "./get-countries.js";

/**
 * Get a Country object by its 3-digit ISO 3166-1 numeric code (e.g. '840', '250', 504).
 *
 * @param numeric - ISO numeric country code (string or number, e.g. '840' or 840)
 * @param language - Target language (default: 'en')
 * @returns Localized country object, or undefined if not found
 *
 * @example
 * ```ts
 * getCountryByNumeric('840');
 * // { code: "US", alpha3: "USA", numeric: "840", name: "United States", ... }
 *
 * getCountryByNumeric(250, 'es');
 * // { code: "FR", alpha3: "FRA", numeric: "250", name: "Francia", ... }
 * ```
 */
export default function getCountryByNumeric(
  numeric: string | number,
  language: SupportedLanguage = "en"
): Country | undefined {
  if (numeric === undefined || numeric === null) return undefined;
  const alpha2 = numericToAlpha2(numeric);
  if (!alpha2) return undefined;
  return getCountry(alpha2, language);
}

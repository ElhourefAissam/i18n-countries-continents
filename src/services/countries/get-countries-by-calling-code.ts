import { SupportedLanguage } from "../../utils/types.js";
import getCountries, { Country } from "./get-countries.js";

/**
 * Find all countries that share an international calling code (e.g. '+1' returns US, Canada, etc.).
 *
 * @param callingCode - Calling code with or without '+' prefix (e.g. '+33' or '33', '+1' or '1')
 * @param language - Target language (default: 'en')
 * @returns Array of Country objects matching the calling code
 *
 * @example
 * ```ts
 * getCountriesByCallingCode('+33'); // [ France ]
 * getCountriesByCallingCode('1');   // [ United States, Canada, Puerto Rico, ... ]
 * ```
 */
export default function getCountriesByCallingCode(
  callingCode: string,
  language: SupportedLanguage = "en"
): Country[] {
  if (!callingCode || typeof callingCode !== "string") return [];

  const normalized = callingCode.trim();
  const digits = normalized.replace(/[^0-9]/g, "");
  if (!digits) return [];

  const all = getCountries(language);
  return all.filter((c) => {
    const countryDigits = c.callingCode.replace(/[^0-9]/g, "");
    return countryDigits === digits || c.callingCode === normalized;
  });
}

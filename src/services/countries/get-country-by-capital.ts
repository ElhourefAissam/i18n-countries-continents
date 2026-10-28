import { SupportedLanguage } from "../../utils/types.js";
import { capitalToAlpha2 } from "../../data/metadata.js";
import getCountry from "./get-country.js";
import { Country } from "./get-countries.js";

/**
 * Reverse lookup: find a Country object by its capital city name (case- and accent-insensitive).
 *
 * @param capital - Capital city name (e.g. 'Paris', 'Tokyo', 'Brasília', 'Washington D.C.')
 * @param language - Target language for localized country name (default: 'en')
 * @returns Localized Country object, or undefined if not found
 *
 * @example
 * ```ts
 * getCountryByCapital('Paris');       // Country { code: 'FR', name: 'France', ... }
 * getCountryByCapital('Tokyo', 'es'); // Country { code: 'JP', name: 'Japón', ... }
 * getCountryByCapital('brasilia');    // Country { code: 'BR', name: 'Brazil', ... }
 * ```
 */
export default function getCountryByCapital(
  capital: string,
  language: SupportedLanguage = "en"
): Country | undefined {
  if (!capital || typeof capital !== "string") return undefined;
  const alpha2 = capitalToAlpha2(capital);
  if (!alpha2) return undefined;
  return getCountry(alpha2, language);
}

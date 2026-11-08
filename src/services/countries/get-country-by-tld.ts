import { SupportedLanguage } from "../../utils/types.js";
import { tldToAlpha2 } from "../../data/metadata.js";
import getCountry from "./get-country.js";
import { Country } from "./get-countries.js";

/**
 * Reverse lookup: find a Country object by its ccTLD (e.g. '.fr' or 'fr', '.us' or 'us').
 *
 * @param tld - Country code top-level domain (with or without leading dot, case-insensitive)
 * @param language - Target language for localized country name (default: 'en')
 * @returns Localized Country object, or undefined if not found
 *
 * @example
 * ```ts
 * getCountryByTld('.fr');      // Country { code: 'FR', name: 'France', ... }
 * getCountryByTld('de', 'es'); // Country { code: 'DE', name: 'Alemania', ... }
 * ```
 */
export default function getCountryByTld(
  tld: string,
  language: SupportedLanguage = "en"
): Country | undefined {
  if (!tld || typeof tld !== "string") return undefined;
  const alpha2 = tldToAlpha2(tld);
  if (!alpha2) return undefined;
  return getCountry(alpha2, language);
}

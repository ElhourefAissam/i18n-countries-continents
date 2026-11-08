import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { normalizeText } from "../../utils/normalize.js";
import getCountry from "./get-country.js";
import { Country } from "./get-countries.js";

/**
 * Reverse lookup: find a country object by its translated or English name.
 * Lookup is case- and accent-insensitive (e.g. 'peru' finds 'Perú', 'cote d\'ivoire' finds "Côte d'Ivoire").
 *
 * @param name - Country name in target or English language (case- and accent-insensitive)
 * @param language - Target language for the returned Country object (default: 'en')
 * @returns Localized Country object, or undefined if not found
 *
 * @example
 * ```ts
 * getCountryByName('España', 'es');
 * getCountryByName('Espana', 'es'); // Accent-insensitive
 * getCountryByName('peru', 'es');   // Finds Perú
 * ```
 */
export default function getCountryByName(
  name: string,
  language: SupportedLanguage = "en"
): Country | undefined {
  if (!name || typeof name !== "string") return undefined;

  const rawTrimmed = name.toLowerCase().trim();
  const normalized = normalizeText(name);
  if (!normalized) return undefined;

  const entries = getLangCountries(language);
  let entry = entries.find(
    ([, , , countryName]) =>
      countryName.toLowerCase() === rawTrimmed ||
      normalizeText(countryName) === normalized
  );

  // If not found in requested language and language is not English, check English name
  if (!entry && language !== "en") {
    const enEntries = getLangCountries("en");
    const enIndex = enEntries.findIndex(
      ([, , , enName]) =>
        enName.toLowerCase() === rawTrimmed ||
        normalizeText(enName) === normalized
    );
    if (enIndex !== -1) {
      entry = entries[enIndex];
    }
  }

  if (!entry) return undefined;
  const [code] = entry;
  return getCountry(code, language);
}

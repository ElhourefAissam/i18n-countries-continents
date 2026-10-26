import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { Country } from "./get-countries.js";

/**
 * Reverse lookup: find a country object by its translated or English name.
 *
 * @param name - Country name in target or English language (case-insensitive)
 * @param language - Target language for the returned Country object (default: 'en')
 * @returns Localized Country object, or undefined if not found
 *
 * @example
 * ```ts
 * getCountryByName('España', 'es');
 * // { code: "ES", continent: "EU", flag: "🇪🇸", name: "España" }
 *
 * getCountryByName('Spain', 'es');
 * // { code: "ES", continent: "EU", flag: "🇪🇸", name: "España" }
 * ```
 */
export default function getCountryByName(
  name: string,
  language: SupportedLanguage = "en"
): Country | undefined {
  if (!name || typeof name !== "string") return undefined;

  const normalized = name.toLowerCase().trim();
  if (!normalized) return undefined;

  const entries = getLangCountries(language);
  let entry = entries.find(
    ([, , , countryName]) => countryName.toLowerCase() === normalized
  );

  // If not found in requested language and language is not English, check English name
  if (!entry && language !== "en") {
    const enEntries = getLangCountries("en");
    const enIndex = enEntries.findIndex(
      ([, , , enName]) => enName.toLowerCase() === normalized
    );
    if (enIndex !== -1) {
      entry = entries[enIndex];
    }
  }

  if (!entry) return undefined;
  const [code, continent, flag, countryName] = entry;
  return { code, continent, flag, name: countryName };
}

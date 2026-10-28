import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { getMetadata, Currency } from "../../data/metadata.js";

export type { Currency };

export interface Country {
  /** ISO 3166-1 alpha-2 country code, e.g. 'US', 'FR' */
  code: string;
  /** Continent code, e.g. 'NA', 'EU' */
  continent: string;
  /** Translated country name in requested language */
  name: string;
  /** Emoji flag for the country */
  flag: string;
  /** International phone calling code, e.g. '+1', '+33' */
  callingCode: string;
  /** Currency info (code, symbol, name) */
  currency: Currency;
}

/**
 * Get all 250 countries with their names, continent codes, flag emojis, calling codes, and currencies in the specified language.
 *
 * @param language - Target language (default: 'en')
 * @returns Array of 250 Country objects
 *
 * @example
 * ```ts
 * const countries = getCountries('es');
 * countries.forEach(c => console.log(c.flag, c.code, c.name, c.callingCode, c.currency.code));
 * ```
 */
export default function getCountries(
  language: SupportedLanguage = "en"
): Country[] {
  return getLangCountries(language).map(([code, continent, flag, name]) => {
    const meta = getMetadata(code);
    return {
      code,
      continent,
      name,
      flag,
      callingCode: meta?.callingCode || "",
      currency: meta?.currency || { code: "", symbol: "", name: "" },
    };
  });
}

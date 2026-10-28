import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { getMetadata, Currency } from "../../data/metadata.js";

export type { Currency };

export interface Country {
  /** ISO 3166-1 alpha-2 country code, e.g. 'US', 'FR' */
  code: string;
  /** ISO 3166-1 alpha-3 country code, e.g. 'USA', 'FRA' */
  alpha3: string;
  /** ISO 3166-1 numeric 3-digit code, e.g. '840', '250' */
  numeric: string;
  /** Continent code, e.g. 'NA', 'EU' */
  continent: string;
  /** Translated country name in requested language */
  name: string;
  /** Emoji flag for the country */
  flag: string;
  /** Official capital city, e.g. 'Washington D.C.', 'Paris' */
  capital: string;
  /** Primary IANA timezones, e.g. ['America/New_York', ...] */
  timezones: string[];
  /** International phone calling code, e.g. '+1', '+33' */
  callingCode: string;
  /** Currency info (code, symbol, name) */
  currency: Currency;
}

/**
 * Get all 250 countries with their names, continent codes, flag emojis, ISO alpha-3/numeric codes, capitals, timezones, calling codes, and currencies in the specified language.
 *
 * @param language - Target language (default: 'en')
 * @returns Array of 250 Country objects
 *
 * @example
 * ```ts
 * const countries = getCountries('es');
 * countries.forEach(c => console.log(c.flag, c.code, c.name, c.capital, c.timezones));
 * ```
 */
export default function getCountries(
  language: SupportedLanguage = "en"
): Country[] {
  return getLangCountries(language).map(([code, continent, flag, name]) => {
    const meta = getMetadata(code);
    return {
      code,
      alpha3: meta?.alpha3 || "",
      numeric: meta?.numeric || "",
      continent,
      name,
      flag,
      capital: meta?.capital || "",
      timezones: meta?.timezones || [],
      callingCode: meta?.callingCode || "",
      currency: meta?.currency || { code: "", symbol: "", name: "" },
    };
  });
}

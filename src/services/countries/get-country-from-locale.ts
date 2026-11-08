import { SupportedLanguage } from "../../utils/types.js";
import { isValidCountryCode } from "../validation/index.js";
import getCountry from "./get-country.js";
import { Country } from "./get-countries.js";

const DEFAULT_LANGUAGE_COUNTRIES: Record<string, string> = {
  ja: "JP",
  ko: "KR",
  zh: "CN",
  nl: "NL",
  de: "DE",
  fr: "FR",
  es: "ES",
  it: "IT",
  pt: "PT",
  ru: "RU",
  tr: "TR",
  pl: "PL",
  vi: "VN",
  th: "TH",
  el: "GR",
  sv: "SE",
  da: "DK",
  no: "NO",
  fi: "FI",
  ar: "SA",
  en: "US",
};

/**
 * Infer or extract the Country object from a BCP-47 locale tag (e.g. 'en-US', 'fr-FR', 'pt_BR', 'es-MX', 'ja-JP').
 *
 * @param locale - BCP-47 or POSIX locale string (e.g. 'fr-FR', 'en-US', 'es-419', 'pt-BR')
 * @param language - Target language for localized Country object (default: 'en')
 * @returns Localized Country object, or undefined if no valid country could be inferred
 *
 * @example
 * ```ts
 * getCountryFromLocale('en-US');      // Country { code: 'US', name: 'United States' }
 * getCountryFromLocale('fr-FR');      // Country { code: 'FR', name: 'France' }
 * getCountryFromLocale('pt_BR', 'es'); // Country { code: 'BR', name: 'Brasil' }
 * getCountryFromLocale('ja');         // Country { code: 'JP', name: 'Japan' }
 * ```
 */
export default function getCountryFromLocale(
  locale: string,
  language: SupportedLanguage = "en"
): Country | undefined {
  if (!locale || typeof locale !== "string") return undefined;

  const parts = locale.trim().replace(/_/g, "-").split("-");

  // Check from end to beginning for a 2-letter ISO country code
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i].toUpperCase();
    if (part.length === 2 && isValidCountryCode(part)) {
      return getCountry(part, language);
    }
  }

  // Fallback: Check if primary language part maps to a default country
  const primaryLang = parts[0].toLowerCase();
  const defaultCountry = DEFAULT_LANGUAGE_COUNTRIES[primaryLang];
  if (defaultCountry) {
    return getCountry(defaultCountry, language);
  }

  return undefined;
}

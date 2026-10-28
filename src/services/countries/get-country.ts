import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { getMetadata, alpha3ToAlpha2 } from "../../data/metadata.js";
import { Country } from "./get-countries.js";

/**
 * Get the complete country object (`code`, `alpha3`, `numeric`, `name`, `continent`, `flag`, `capital`, `callingCode`, `currency`) for a country code.
 * Accepts both 2-letter alpha-2 (e.g. 'US') and 3-letter alpha-3 (e.g. 'USA') codes.
 *
 * @param code - ISO 3166-1 alpha-2 or alpha-3 country code (case-insensitive)
 * @param language - Target language (default: 'en')
 * @returns Localized country object, or undefined if not found
 *
 * @example
 * ```ts
 * getCountry('FR', 'es');
 * // { code: "FR", alpha3: "FRA", numeric: "250", continent: "EU", flag: "🇫🇷", name: "Francia", capital: "Paris", ... }
 * ```
 */
export default function getCountry(
  code: string,
  language: SupportedLanguage = "en"
): Country | undefined {
  if (!code || typeof code !== "string") return undefined;
  let upper = code.toUpperCase().trim();
  if (upper.length === 3 && /^[A-Z]{3}$/.test(upper)) {
    const a2 = alpha3ToAlpha2(upper);
    if (a2) upper = a2;
  }
  const entry = getLangCountries(language).find(([c]) => c === upper);
  if (!entry) return undefined;
  const [countryCode, continent, flag, name] = entry;
  const meta = getMetadata(countryCode);
  return {
    code: countryCode,
    alpha3: meta?.alpha3 || "",
    numeric: meta?.numeric || "",
    continent,
    flag,
    name,
    capital: meta?.capital || "",
    callingCode: meta?.callingCode || "",
    currency: meta?.currency || { code: "", symbol: "", name: "" },
  };
}

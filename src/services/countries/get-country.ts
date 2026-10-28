import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { getMetadata } from "../../data/metadata.js";
import { Country } from "./get-countries.js";

/**
 * Get the complete country object (`code`, `name`, `continent`, `flag`, `callingCode`, `currency`) for a country code.
 *
 * @param code - 2-letter ISO 3166-1 alpha-2 country code (case-insensitive)
 * @param language - Target language (default: 'en')
 * @returns Localized country object, or undefined if not found
 *
 * @example
 * ```ts
 * getCountry('FR', 'es');
 * // { code: "FR", continent: "EU", flag: "🇫🇷", name: "Francia", callingCode: "+33", currency: { code: "EUR", ... } }
 * ```
 */
export default function getCountry(
  code: string,
  language: SupportedLanguage = "en"
): Country | undefined {
  if (!code || typeof code !== "string") return undefined;
  const upper = code.toUpperCase().trim();
  const entry = getLangCountries(language).find(([c]) => c === upper);
  if (!entry) return undefined;
  const [countryCode, continent, flag, name] = entry;
  const meta = getMetadata(countryCode);
  return {
    code: countryCode,
    continent,
    flag,
    name,
    callingCode: meta?.callingCode || "",
    currency: meta?.currency || { code: "", symbol: "", name: "" },
  };
}

import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { getMetadata } from "../../data/metadata.js";
import { Country } from "./get-countries.js";

/**
 * Search for countries by name, 2-letter ISO code, 3-letter alpha-3 code, numeric code, calling code, or currency code.
 *
 * @param query - Country name, code, calling code, or currency to search for (case-insensitive)
 * @param language - Target language (default: 'en')
 * @param limit - Maximum number of results to return (default: 10)
 * @returns Array of matching Country objects
 *
 * @example
 * ```ts
 * searchCountries('uni', 'en', 3);
 * searchCountries('USA', 'en'); // Finds United States
 * searchCountries('840', 'en'); // Finds United States
 * searchCountries('+33', 'en'); // Finds France
 * searchCountries('EUR', 'en'); // Finds Eurozone countries
 * ```
 */
export default function searchCountries(
  query: string,
  language: SupportedLanguage = "en",
  limit: number = 10
): Country[] {
  if (!query || typeof query !== "string") return [];

  const normalized = query.toLowerCase().trim();
  if (!normalized || limit <= 0) return [];

  const entries = getLangCountries(language);
  const results: Country[] = [];

  for (const [code, continent, flag, name] of entries) {
    const meta = getMetadata(code);
    const alpha3 = meta?.alpha3 || "";
    const numeric = meta?.numeric || "";
    const callingCode = meta?.callingCode || "";
    const callingRaw = callingCode.replace(/[^0-9]/g, "");
    const queryDigits = normalized.replace(/[^0-9]/g, "");
    const currency = meta?.currency || { code: "", symbol: "", name: "" };

    const matchesCode =
      code.toLowerCase() === normalized ||
      alpha3.toLowerCase() === normalized ||
      numeric === normalized;
    const matchesName = name.toLowerCase().includes(normalized);
    const matchesCallingCode =
      (query.startsWith("+") && callingCode.startsWith(normalized)) ||
      (queryDigits.length > 0 && callingRaw === queryDigits);
    const matchesCurrency =
      currency.code.toLowerCase() === normalized ||
      currency.symbol.toLowerCase() === normalized;

    if (matchesCode || matchesName || matchesCallingCode || matchesCurrency) {
      results.push({
        code,
        alpha3,
        numeric,
        continent,
        flag,
        name,
        callingCode,
        currency,
      });
      if (results.length >= limit) break;
    }
  }

  return results;
}

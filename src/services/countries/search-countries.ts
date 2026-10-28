import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { getMetadata } from "../../data/metadata.js";
import { normalizeText } from "../../utils/normalize.js";
import { Country } from "./get-countries.js";

/**
 * Search for countries by name, 2-letter ISO code, 3-letter alpha-3 code, numeric code, calling code, or currency code.
 * Searches are accent- and diacritic-insensitive (e.g. searching 'peru' matches 'Perú', 'cote' matches "Côte d'Ivoire").
 *
 * @param query - Country name, code, calling code, or currency to search for (case- and accent-insensitive)
 * @param language - Target language (default: 'en')
 * @param limit - Maximum number of results to return (default: 10)
 * @returns Array of matching Country objects
 *
 * @example
 * ```ts
 * searchCountries('peru');        // Finds Perú
 * searchCountries('cote');        // Finds Côte d'Ivoire
 * searchCountries('aland');       // Finds Åland Islands
 * searchCountries('USA');         // Finds United States
 * searchCountries('+33');         // Finds France
 * ```
 */
export default function searchCountries(
  query: string,
  language: SupportedLanguage = "en",
  limit: number = 10
): Country[] {
  if (!query || typeof query !== "string") return [];

  const rawTrimmed = query.trim().toLowerCase();
  const normalized = normalizeText(query);
  if (!normalized || limit <= 0) return [];

  const entries = getLangCountries(language);
  const results: Country[] = [];

  for (const [code, continent, flag, name] of entries) {
    const meta = getMetadata(code);
    const alpha3 = meta?.alpha3 || "";
    const numeric = meta?.numeric || "";
    const callingCode = meta?.callingCode || "";
    const callingRaw = callingCode.replace(/[^0-9]/g, "");
    const queryDigits = rawTrimmed.replace(/[^0-9]/g, "");
    const currency = meta?.currency || { code: "", symbol: "", name: "" };

    const matchesCode =
      code.toLowerCase() === rawTrimmed ||
      alpha3.toLowerCase() === rawTrimmed ||
      numeric === rawTrimmed;
    const matchesName =
      name.toLowerCase().includes(rawTrimmed) ||
      normalizeText(name).includes(normalized);
    const matchesCallingCode =
      (rawTrimmed.startsWith("+") && callingCode.startsWith(rawTrimmed)) ||
      (queryDigits.length > 0 && callingRaw === queryDigits);
    const matchesCurrency =
      currency.code.toLowerCase() === rawTrimmed ||
      currency.symbol.toLowerCase() === rawTrimmed;

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

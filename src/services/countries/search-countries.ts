import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { getMetadata } from "../../data/metadata.js";
import { normalizeText } from "../../utils/normalize.js";
import { Country } from "./get-countries.js";

/**
 * Search for countries by name, 2-letter ISO code, 3-letter alpha-3 code, numeric code, capital city, calling code, or currency code.
 * Searches are accent- and diacritic-insensitive (e.g. searching 'peru' matches 'Perú', 'paris' matches France, 'cote' matches "Côte d'Ivoire").
 * Exact matches and prefix matches are prioritized at the top of results.
 *
 * @param query - Country name, code, capital, calling code, or currency to search for (case- and accent-insensitive)
 * @param language - Target language (default: 'en')
 * @param limit - Maximum number of results to return (default: 10)
 * @returns Array of matching Country objects
 *
 * @example
 * ```ts
 * searchCountries('USA');         // Finds United States (ranked first)
 * searchCountries('peru');        // Finds Perú
 * searchCountries('paris');       // Finds France (by capital)
 * searchCountries('tokyo');       // Finds Japan (by capital)
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
  const matchedWithRank: { country: Country; rank: number }[] = [];

  for (const [code, continent, flag, name] of entries) {
    const meta = getMetadata(code);
    const alpha3 = meta?.alpha3 || "";
    const numeric = meta?.numeric || "";
    const capital = meta?.capital || "";
    const callingCode = meta?.callingCode || "";
    const callingRaw = callingCode.replace(/[^0-9]/g, "");
    const queryDigits = rawTrimmed.replace(/[^0-9]/g, "");
    const currency = meta?.currency || { code: "", symbol: "", name: "" };

    const normName = normalizeText(name);
    const normCapital = normalizeText(capital);

    const matchesExactCode =
      code.toLowerCase() === rawTrimmed ||
      alpha3.toLowerCase() === rawTrimmed ||
      numeric === rawTrimmed;

    const matchesExactName =
      name.toLowerCase() === rawTrimmed || normName === normalized;

    const matchesNamePrefix =
      name.toLowerCase().startsWith(rawTrimmed) ||
      normName.startsWith(normalized);

    const matchesNameSub =
      name.toLowerCase().includes(rawTrimmed) || normName.includes(normalized);

    const matchesExactCapital =
      capital.length > 0 &&
      (capital.toLowerCase() === rawTrimmed || normCapital === normalized);

    const matchesCapitalSub =
      capital.length > 0 &&
      (capital.toLowerCase().includes(rawTrimmed) ||
        normCapital.includes(normalized));

    const matchesCallingCode =
      (rawTrimmed.startsWith("+") && callingCode.startsWith(rawTrimmed)) ||
      (queryDigits.length > 0 && callingRaw === queryDigits);

    const matchesCurrency =
      currency.code.toLowerCase() === rawTrimmed ||
      currency.symbol.toLowerCase() === rawTrimmed;

    if (
      matchesExactCode ||
      matchesExactName ||
      matchesNamePrefix ||
      matchesNameSub ||
      matchesExactCapital ||
      matchesCapitalSub ||
      matchesCallingCode ||
      matchesCurrency
    ) {
      // Priority rank: 0 (highest) to 5
      let rank = 5;
      if (matchesExactCode || matchesExactName) {
        rank = 0;
      } else if (matchesExactCapital) {
        rank = 1;
      } else if (matchesNamePrefix) {
        rank = 2;
      } else if (matchesCallingCode || matchesCurrency) {
        rank = 3;
      } else if (matchesNameSub) {
        rank = 4;
      }

      matchedWithRank.push({
        rank,
        country: {
          code,
          alpha3,
          numeric,
          continent,
          flag,
          name,
          capital,
          callingCode,
          currency,
        },
      });
    }
  }

  // Sort by rank ascending
  matchedWithRank.sort((a, b) => a.rank - b.rank);

  return matchedWithRank.slice(0, limit).map((m) => m.country);
}

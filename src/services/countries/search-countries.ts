import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { getMetadata } from "../../data/metadata.js";
import { normalizeText } from "../../utils/normalize.js";
import getCountry from "./get-country.js";
import { Country } from "./get-countries.js";

/**
 * Search for countries by name, native endonym, 2-letter ISO code, 3-letter alpha-3 code, numeric code, capital city, timezone, calling code, currency code, ccTLD, or demonym.
 * Searches are accent- and diacritic-insensitive (e.g. searching 'peru' matches 'Perú', 'paris' matches France, '.fr' matches France, 'deutschland' matches Germany).
 * Exact matches and prefix matches are prioritized at the top of results.
 *
 * @param query - Country name, code, capital, timezone, calling code, currency, tld, or demonym to search for
 * @param language - Target language (default: 'en')
 * @param limit - Maximum number of results to return (default: 10)
 * @returns Array of matching Country objects
 *
 * @example
 * ```ts
 * searchCountries('USA');             // Finds United States (ranked first)
 * searchCountries('peru');            // Finds Perú
 * searchCountries('paris');           // Finds France (by capital)
 * searchCountries('.fr');             // Finds France (by ccTLD)
 * searchCountries('deutschland');     // Finds Germany (by native name)
 * searchCountries('moroccan');        // Finds Morocco (by demonym)
 * searchCountries('+33');             // Finds France
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
  if (!normalized && !rawTrimmed.startsWith(".")) return [];
  if (limit <= 0) return [];

  const entries = getLangCountries(language);
  const matchedWithRank: { countryCode: string; rank: number }[] = [];

  for (const [code, , , name] of entries) {
    const meta = getMetadata(code);
    const alpha3 = meta?.alpha3 || "";
    const numeric = meta?.numeric || "";
    const capital = meta?.capital || "";
    const timezones = meta?.timezones || [];
    const callingCode = meta?.callingCode || "";
    const callingRaw = callingCode.replace(/[^0-9]/g, "");
    const queryDigits = rawTrimmed.replace(/[^0-9]/g, "");
    const currency = meta?.currency || { code: "", symbol: "", name: "" };
    const tld = meta?.tld || "";
    const nativeName = meta?.nativeName || "";
    const demonym = meta?.demonym || "";
    const subregion = meta?.subregion || "";

    const normName = normalizeText(name);
    const normCapital = normalizeText(capital);
    const normNative = normalizeText(nativeName);
    const normDemonym = normalizeText(demonym);
    const normSubregion = normalizeText(subregion);

    const matchesExactCode =
      code.toLowerCase() === rawTrimmed ||
      alpha3.toLowerCase() === rawTrimmed ||
      numeric === rawTrimmed;

    const matchesExactName =
      name.toLowerCase() === rawTrimmed || normName === normalized;

    const matchesNativeName =
      nativeName.toLowerCase() === rawTrimmed ||
      normNative === normalized ||
      normNative.includes(normalized);

    const matchesTld =
      tld.length > 0 &&
      (tld.toLowerCase() === rawTrimmed ||
        tld.replace(/^\./, "").toLowerCase() === rawTrimmed.replace(/^\./, ""));

    const matchesDemonym =
      demonym.length > 0 &&
      (demonym.toLowerCase() === rawTrimmed ||
        normDemonym === normalized ||
        normDemonym.startsWith(normalized));

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

    const matchesTimezone =
      rawTrimmed.length > 3 &&
      timezones.some((tz) => tz.toLowerCase().includes(rawTrimmed));

    const matchesCallingCode =
      (rawTrimmed.startsWith("+") && callingCode.startsWith(rawTrimmed)) ||
      (queryDigits.length > 0 && callingRaw === queryDigits);

    const matchesCurrency =
      currency.code.toLowerCase() === rawTrimmed ||
      currency.symbol.toLowerCase() === rawTrimmed;

    const matchesSubregion =
      subregion.length > 0 &&
      (subregion.toLowerCase() === rawTrimmed ||
        normSubregion === normalized ||
        normSubregion.includes(normalized));

    if (
      matchesExactCode ||
      matchesExactName ||
      matchesNativeName ||
      matchesTld ||
      matchesDemonym ||
      matchesNamePrefix ||
      matchesNameSub ||
      matchesExactCapital ||
      matchesCapitalSub ||
      matchesTimezone ||
      matchesCallingCode ||
      matchesCurrency ||
      matchesSubregion
    ) {
      // Priority rank: 0 (highest) to 5
      let rank = 5;
      if (matchesExactCode || matchesExactName || matchesTld) {
        rank = 0;
      } else if (matchesExactCapital || matchesNativeName) {
        rank = 1;
      } else if (matchesNamePrefix || matchesDemonym) {
        rank = 2;
      } else if (matchesCallingCode || matchesCurrency || matchesTimezone) {
        rank = 3;
      } else if (matchesNameSub || matchesCapitalSub) {
        rank = 4;
      }

      matchedWithRank.push({
        rank,
        countryCode: code,
      });
    }
  }

  // Sort by rank ascending
  matchedWithRank.sort((a, b) => a.rank - b.rank);

  return matchedWithRank
    .slice(0, limit)
    .map((m) => getCountry(m.countryCode, language))
    .filter((c): c is Country => c !== undefined);
}

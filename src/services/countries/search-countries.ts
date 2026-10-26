import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { Country } from "./get-countries.js";

export default function searchCountries(
  query: string,
  language: SupportedLanguage = "en",
  limit: number = 10
): Country[] {
  const normalized = query.toLowerCase().trim();
  if (!normalized || limit <= 0) return [];

  const entries = getLangCountries(language);
  const results: Country[] = [];

  for (const [code, continent, flag, name] of entries) {
    if (
      code.toLowerCase() === normalized ||
      name.toLowerCase().includes(normalized)
    ) {
      results.push({ code, continent, flag, name });
      if (results.length >= limit) break;
    }
  }

  return results;
}

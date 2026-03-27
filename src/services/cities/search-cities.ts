import { getLangCities } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { City } from "./get-cities.js";

export default function searchCities(
  query: string,
  language: SupportedLanguage = "en",
  limit: number = 10
): City[] {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return [];
  }

  return getLangCities(language)
    .filter(([name, translatedName]) => {
      return (
        name.toLowerCase().includes(normalizedQuery) ||
        translatedName.toLowerCase().includes(normalizedQuery)
      );
    })
    .slice(0, limit)
    .map(([name, translatedName]) => ({ name, translatedName }));
}

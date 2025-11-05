import citiesData from "../../data/cities.json" with { type: "json" };
import { SupportedLanguage } from "../../utils/types.js";

export interface City {
  name: string;
  translatedName: string;
}

export default function searchCities(
  query: string,
  language: SupportedLanguage = "en",
  limit: number = 10
): City[] {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return [];
  }

  const results = citiesData
    .filter((city) => {
      const englishName = city.name.toLowerCase();
      const translatedName = (
        city.translations[language] || city.name
      ).toLowerCase();

      return (
        englishName.includes(normalizedQuery) ||
        translatedName.includes(normalizedQuery)
      );
    })
    .map((c) => ({
      name: c.name,
      translatedName:
        c.translations[language] || c.translations["en"] || c.name,
    }))
    .slice(0, limit);

  return results;
}

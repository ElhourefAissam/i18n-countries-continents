import citiesData from "../../data/cities.json" with { type: "json" };
import { SupportedLanguage } from "../../utils/types.js";

export default function getCityName(
  cityName: string,
  language: SupportedLanguage = "en"
): string | undefined {
  const city = citiesData.find(
    (c) => c.name.toLowerCase() === cityName.toLowerCase()
  );
  return city
    ? city.translations[language] || city.translations["en"]
    : undefined;
}

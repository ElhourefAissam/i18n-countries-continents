import citiesData from "../../data/cities.json" with { type: "json" };
import { SupportedLanguage } from "../../utils/types.js";

export interface City {
  name: string;
  translatedName: string;
}

export default function getCities(language: SupportedLanguage = "en"): City[] {
  return citiesData.map((c) => ({
    name: c.name,
    translatedName: c.translations[language] || c.translations["en"] || c.name,
  }));
}

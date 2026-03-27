import { getLangCities } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";

export interface City {
  name: string;
  translatedName: string;
}

export default function getCities(language: SupportedLanguage = "en"): City[] {
  return getLangCities(language).map(([name, translatedName]) => ({
    name,
    translatedName,
  }));
}

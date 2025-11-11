import countriesData from "../../data/countries.json" with { type: "json" };
import { SupportedLanguage } from "../../utils/types.js";

export interface Country {
  code: string;
  continent: string;
  name: string;
  flag: string;
}

export default function getCountries(
  language: SupportedLanguage = "en"
): Country[] {
  return countriesData.map((c) => ({
    code: c.code,
    continent: c.continent,
    name: c.names[language] || c.names["en"] || c.code,
    flag: c.flag,
  }));
}

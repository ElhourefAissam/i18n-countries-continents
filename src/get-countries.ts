import { countries } from "./data/countries";
import { SupportedLanguage } from "./types";

export interface Country {
  code: string;
  continent: string;
  name: string;
}

export default function getCountries(
  language: SupportedLanguage = "en"
): Country[] {
  return countries.map((c) => ({
    code: c.code,
    continent: c.continent,
    name: c.names[language] || c.names["en"] || c.code,
  }));
}

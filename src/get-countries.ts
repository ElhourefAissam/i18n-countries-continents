import { countries } from "./data/countries";
import { SupportedLanguage } from "./types";

export interface Country {
  code: string;
  continent: string;
  names: { [lang: string]: string };
  name?: string;
}

export default function getCountries(
  language: SupportedLanguage = "en"
): Country[] {
  return countries.map((c) => ({
    ...c,
    name: c.names[language] || c.names["en"],
  }));
}

import { continents } from "./data/continents";
import { SupportedLanguage } from "./types";

export interface Continent {
  code: string;
  name: string;
}

export default function getContinents(
  language: SupportedLanguage = "en"
): Continent[] {
  return continents.map((c) => ({
    code: c.code,
    name: c.names[language] || c.names["en"] || c.code,
  }));
}

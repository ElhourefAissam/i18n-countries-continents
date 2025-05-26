import { continents } from "./data/continents";
import { SupportedLanguage } from "./types";

export interface Continent {
  code: string;
  names: { [key: string]: string }; // Allow any language code as key
  name?: string;
}

export default function getContinents(
  language: SupportedLanguage = "en"
): Continent[] {
  return continents.map((c) => ({
    ...c,
    name: c.names[language] || c.names["en"],
  }));
}

import continentsData from "../../data/continents.json" with { type: "json" };
import { SupportedLanguage } from "../../utils/types.js";

export interface Continent {
  code: string;
  name: string;
}

export default function getContinents(
  language: SupportedLanguage = "en"
): Continent[] {
  return continentsData.map((c) => ({
    code: c.code,
    name: c.names[language] || c.names["en"] || c.code,
  }));
}

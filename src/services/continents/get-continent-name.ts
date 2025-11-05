import continentsData from "../../data/continents.json" with { type: "json" };
import { SupportedLanguage } from "../../utils/types.js";

export default function getContinentName(
  continentCode: string,
  language: SupportedLanguage = "en"
): string | undefined {
  const continent = continentsData.find(
    (c) => c.code === continentCode.toUpperCase()
  );
  return continent
    ? continent.names[language] || continent.names["en"]
    : undefined;
}

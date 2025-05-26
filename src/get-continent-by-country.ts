import { continents } from "./data/continents";
import { SupportedLanguage } from "./types";

export default function getContinentName(
  continentCode: string,
  language: SupportedLanguage = "en"
): string | undefined {
  const continent = continents.find(
    (c) => c.code === continentCode.toUpperCase()
  );
  return continent
    ? language in continent.names
      ? continent.names[language as keyof typeof continent.names]
      : continent.names["en"]
    : undefined;
}

import countriesData from "../../data/countries.json" with { type: "json" };
import { SupportedLanguage } from "../../utils/types.js";

export default function getCountryName(
  code: string,
  language: SupportedLanguage = "en"
): string | undefined {
  const country = countriesData.find(
    (c) => c.code.toUpperCase() === code.toUpperCase()
  );
  return country ? country.names[language] || country.names["en"] : undefined;
}

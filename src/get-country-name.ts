import { countries } from "./data/countries";
import { SupportedLanguage } from "./types";

export default function getCountryName(
  code: string,
  language: SupportedLanguage = "en"
): string | undefined {
  const country = countries.find(
    (c) => c.code.toUpperCase() === code.toUpperCase()
  );
  return country ? country.names[language] || country.names["en"] : undefined;
}

import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { Country } from "./get-countries.js";

export default function getCountriesByContinent(
  continentCode: string,
  language: SupportedLanguage = "en"
): Country[] {
  const upper = continentCode.toUpperCase().trim();
  if (!upper) return [];

  return getLangCountries(language)
    .filter(([, continent]) => continent === upper)
    .map(([code, continent, flag, name]) => ({
      code,
      continent,
      flag,
      name,
    }));
}

import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { Country } from "./get-countries.js";

export default function getCountry(
  code: string,
  language: SupportedLanguage = "en"
): Country | undefined {
  const upper = code.toUpperCase().trim();
  const entry = getLangCountries(language).find(([c]) => c === upper);
  if (!entry) return undefined;
  const [countryCode, continent, flag, name] = entry;
  return { code: countryCode, continent, flag, name };
}

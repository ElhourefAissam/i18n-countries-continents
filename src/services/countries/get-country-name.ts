import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";

export default function getCountryName(
  code: string,
  language: SupportedLanguage = "en"
): string | undefined {
  const upper = code.toUpperCase();
  const entry = getLangCountries(language).find(([c]) => c === upper);
  return entry ? entry[3] : undefined;
}

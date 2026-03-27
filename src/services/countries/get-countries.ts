import { getLangCountries } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";

export interface Country {
  code: string;
  continent: string;
  name: string;
  flag: string;
}

export default function getCountries(
  language: SupportedLanguage = "en"
): Country[] {
  return getLangCountries(language).map(([code, continent, flag, name]) => ({
    code,
    continent,
    name,
    flag,
  }));
}

import { getLangContinents } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";

export interface Continent {
  code: string;
  name: string;
}

export default function getContinents(
  language: SupportedLanguage = "en"
): Continent[] {
  return getLangContinents(language).map(([code, name]) => ({ code, name }));
}

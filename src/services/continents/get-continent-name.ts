import { getLangContinents } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";

export default function getContinentName(
  continentCode: string,
  language: SupportedLanguage = "en"
): string | undefined {
  const upper = continentCode.toUpperCase();
  const entry = getLangContinents(language).find(([c]) => c === upper);
  return entry ? entry[1] : undefined;
}

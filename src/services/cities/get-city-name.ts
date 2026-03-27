import { getLangCities } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";

export default function getCityName(
  cityName: string,
  language: SupportedLanguage = "en"
): string | undefined {
  const lower = cityName.toLowerCase();
  const entry = getLangCities(language).find(
    ([name]) => name.toLowerCase() === lower
  );
  return entry ? entry[1] : undefined;
}

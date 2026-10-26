import { getLangContinents } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";

/**
 * Get the localized continent name by its 2-letter continent code.
 *
 * @param continentCode - 2-letter continent code ('AF' | 'AN' | 'AS' | 'EU' | 'NA' | 'OC' | 'SA')
 * @param language - Target language (default: 'en')
 * @returns Localized continent name, or undefined if not found
 *
 * @example
 * ```ts
 * getContinentName('EU', 'es'); // "Europa"
 * getContinentName('AS', 'ar'); // "آسيا"
 * ```
 */
export default function getContinentName(
  continentCode: string,
  language: SupportedLanguage = "en"
): string | undefined {
  if (!continentCode || typeof continentCode !== "string") return undefined;
  const upper = continentCode.toUpperCase().trim();
  const entry = getLangContinents(language).find(([c]) => c === upper);
  return entry ? entry[1] : undefined;
}

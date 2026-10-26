import { getLangContinents } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { Continent } from "./get-continents.js";

/**
 * Get the complete continent object (`code`, `name`) for a continent code.
 *
 * @param continentCode - 2-letter continent code ('AF' | 'AN' | 'AS' | 'EU' | 'NA' | 'OC' | 'SA')
 * @param language - Target language (default: 'en')
 * @returns Localized continent object, or undefined if not found
 *
 * @example
 * ```ts
 * getContinent('EU', 'es');
 * // { code: "EU", name: "Europa" }
 * ```
 */
export default function getContinent(
  continentCode: string,
  language: SupportedLanguage = "en"
): Continent | undefined {
  const upper = continentCode.toUpperCase().trim();
  const entry = getLangContinents(language).find(([c]) => c === upper);
  if (!entry) return undefined;
  const [code, name] = entry;
  return { code, name };
}

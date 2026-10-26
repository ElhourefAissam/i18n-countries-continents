import { getLangContinents } from "../../data/loader.js";
import { SupportedLanguage } from "../../utils/types.js";
import { Continent } from "./get-continents.js";

/**
 * Find a continent by its localized or English name (reverse lookup).
 *
 * @param name - Continent name in localized or English language (case-insensitive)
 * @param language - Target language for the returned Continent object (default: 'en')
 * @returns Localized Continent object, or undefined if not found
 *
 * @example
 * ```ts
 * getContinentByName('Europa', 'es');
 * // { code: 'EU', name: 'Europa' }
 *
 * getContinentByName('Europe', 'fr');
 * // { code: 'EU', name: 'Europe' }
 * ```
 */
export default function getContinentByName(
  name: string,
  language: SupportedLanguage = "en"
): Continent | undefined {
  if (!name || typeof name !== "string") return undefined;

  const normalized = name.toLowerCase().trim();
  if (!normalized) return undefined;

  const entries = getLangContinents(language);
  let entry = entries.find(
    ([, continentName]) => continentName.toLowerCase() === normalized
  );

  // If not found in target language and target is not English, fallback to English name
  if (!entry && language !== "en") {
    const enEntries = getLangContinents("en");
    const enIndex = enEntries.findIndex(
      ([, enName]) => enName.toLowerCase() === normalized
    );
    if (enIndex !== -1) {
      entry = entries[enIndex];
    }
  }

  if (!entry) return undefined;
  const [code, continentName] = entry;
  return { code, name: continentName };
}

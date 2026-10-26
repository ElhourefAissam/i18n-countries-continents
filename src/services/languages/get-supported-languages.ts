import {
  LANGUAGES,
  SUPPORTED_LANGUAGES,
  Language,
} from "../../utils/constants.js";

/**
 * Get all supported languages with their ISO 639-1 code, English name, and native localized name.
 * Ideal for building language picker or UI selector components.
 *
 * @returns Array of supported Language objects
 *
 * @example
 * ```ts
 * const languages = getSupportedLanguages();
 * // [
 * //   { code: 'en', name: 'English', nativeName: 'English' },
 * //   { code: 'es', name: 'Spanish', nativeName: 'Español' },
 * //   ...
 * // ]
 * ```
 */
export default function getSupportedLanguages(): Language[] {
  return SUPPORTED_LANGUAGES.map((code) => ({ ...LANGUAGES[code] }));
}

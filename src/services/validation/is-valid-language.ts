import { SUPPORTED_LANGUAGES } from "../../utils/constants.js";
import { SupportedLanguage } from "../../utils/types.js";

export default function isValidLanguage(
  language: string
): language is SupportedLanguage {
  if (!language || typeof language !== "string") {
    return false;
  }
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(
    language.toLowerCase().trim()
  );
}

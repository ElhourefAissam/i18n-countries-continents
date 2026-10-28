export const SUPPORTED_LANGUAGES = [
  "en",
  "es",
  "fr",
  "ar",
  "nl",
  "de",
  "pt",
  "it",
  "zh",
  "ja",
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export interface Language {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
}

export const LANGUAGES: Record<SupportedLanguage, Language> = {
  en: { code: "en", name: "English", nativeName: "English" },
  es: { code: "es", name: "Spanish", nativeName: "Español" },
  fr: { code: "fr", name: "French", nativeName: "Français" },
  ar: { code: "ar", name: "Arabic", nativeName: "العربية" },
  nl: { code: "nl", name: "Dutch", nativeName: "Nederlands" },
  de: { code: "de", name: "German", nativeName: "Deutsch" },
  pt: { code: "pt", name: "Portuguese", nativeName: "Português" },
  it: { code: "it", name: "Italian", nativeName: "Italiano" },
  zh: { code: "zh", name: "Chinese", nativeName: "中文" },
  ja: { code: "ja", name: "Japanese", nativeName: "日本語" },
};

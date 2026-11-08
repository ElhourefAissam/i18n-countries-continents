/**
 * Dedicated modular loader for city translations.
 * Kept isolated from the main country/continent loader to optimize bundle size by ~85-92%.
 */

import { SupportedLanguage } from "../utils/types.js";

// ── Static per-language city imports ─────────────────────────────────────────
import enCities from "./cities/en.json" with { type: "json" };
import esCities from "./cities/es.json" with { type: "json" };
import frCities from "./cities/fr.json" with { type: "json" };
import arCities from "./cities/ar.json" with { type: "json" };
import nlCities from "./cities/nl.json" with { type: "json" };
import deCities from "./cities/de.json" with { type: "json" };
import ptCities from "./cities/pt.json" with { type: "json" };
import itCities from "./cities/it.json" with { type: "json" };
import zhCities from "./cities/zh.json" with { type: "json" };
import jaCities from "./cities/ja.json" with { type: "json" };
import ruCities from "./cities/ru.json" with { type: "json" };
import hiCities from "./cities/hi.json" with { type: "json" };
import koCities from "./cities/ko.json" with { type: "json" };
import trCities from "./cities/tr.json" with { type: "json" };

export type LangCity = [englishName: string, translatedName: string];

const CITIES_BY_LANG: Record<SupportedLanguage, LangCity[]> = {
  en: enCities as LangCity[],
  es: esCities as LangCity[],
  fr: frCities as LangCity[],
  ar: arCities as LangCity[],
  nl: nlCities as LangCity[],
  de: deCities as LangCity[],
  pt: ptCities as LangCity[],
  it: itCities as LangCity[],
  zh: zhCities as LangCity[],
  ja: jaCities as LangCity[],
  ru: ruCities as LangCity[],
  hi: hiCities as LangCity[],
  ko: koCities as LangCity[],
  tr: trCities as LangCity[],
};

/**
 * Get all 4,010 city entries for a given language.
 */
export function getLangCities(
  language: SupportedLanguage = "en"
): LangCity[] {
  const normalized = (
    typeof language === "string"
      ? language.trim().split(/[-_]/)[0].toLowerCase()
      : "en"
  ) as SupportedLanguage;

  return CITIES_BY_LANG[normalized] || CITIES_BY_LANG.en;
}

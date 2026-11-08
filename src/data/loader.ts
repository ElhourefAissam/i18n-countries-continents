/**
 * Per-language data loader for countries and continents.
 * Each lang file contains ONLY lean country and continent data (~9 KB per language).
 *
 * Data format per lang file:
 *   countries:  [code, continent, flag, name][]
 *   continents: [code, name][]
 */

import { SupportedLanguage } from "../utils/types.js";

// ── Static per-language imports ───────────────────────────────────────────────
import enData from "./lang/en.json" with { type: "json" };
import esData from "./lang/es.json" with { type: "json" };
import frData from "./lang/fr.json" with { type: "json" };
import arData from "./lang/ar.json" with { type: "json" };
import nlData from "./lang/nl.json" with { type: "json" };
import deData from "./lang/de.json" with { type: "json" };
import ptData from "./lang/pt.json" with { type: "json" };
import itData from "./lang/it.json" with { type: "json" };
import zhData from "./lang/zh.json" with { type: "json" };
import jaData from "./lang/ja.json" with { type: "json" };
import ruData from "./lang/ru.json" with { type: "json" };
import hiData from "./lang/hi.json" with { type: "json" };
import koData from "./lang/ko.json" with { type: "json" };
import trData from "./lang/tr.json" with { type: "json" };

// ── Types for the compact array format ───────────────────────────────────────
export type LangCountry = [
  code: string,
  continent: string,
  flag: string,
  name: string
];
export type LangContinent = [code: string, name: string];

export interface LangBundle {
  countries: LangCountry[];
  continents: LangContinent[];
}

// ── Language selector ─────────────────────────────────────────────────────────
function getBundle(language?: string): LangBundle {
  const normalized = (
    typeof language === "string"
      ? language.trim().split(/[-_]/)[0].toLowerCase()
      : "en"
  ) as SupportedLanguage;

  switch (normalized) {
    case "es":
      return esData as LangBundle;
    case "fr":
      return frData as LangBundle;
    case "ar":
      return arData as LangBundle;
    case "nl":
      return nlData as LangBundle;
    case "de":
      return deData as LangBundle;
    case "pt":
      return ptData as LangBundle;
    case "it":
      return itData as LangBundle;
    case "zh":
      return zhData as LangBundle;
    case "ja":
      return jaData as LangBundle;
    case "ru":
      return ruData as LangBundle;
    case "hi":
      return hiData as LangBundle;
    case "ko":
      return koData as LangBundle;
    case "tr":
      return trData as LangBundle;
    default:
      return enData as LangBundle;
  }
}

export function getLangCountries(
  language: SupportedLanguage = "en"
): LangCountry[] {
  return getBundle(language).countries;
}

export function getLangContinents(
  language: SupportedLanguage = "en"
): LangContinent[] {
  return getBundle(language).continents;
}

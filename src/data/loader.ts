/**
 * Per-language data loader.
 * Each lang file contains ONLY the data for that language.
 *
 * Data format per lang file:
 *   countries:  [code, continent, flag, name][]
 *   continents: [code, name][]
 *   cities:     [englishName, translatedName][]
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

// ── Types for the compact array format ───────────────────────────────────────
type LangCountry = [
  code: string,
  continent: string,
  flag: string,
  name: string
];
type LangContinent = [code: string, name: string];
type LangCity = [englishName: string, translatedName: string];

interface LangBundle {
  countries: LangCountry[];
  continents: LangContinent[];
  cities: LangCity[];
}

// ── Language selector ─────────────────────────────────────────────────────────
function getBundle(language: SupportedLanguage): LangBundle {
  switch (language) {
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
    default:
      return enData as LangBundle;
  }
}

export function getLangCountries(language: SupportedLanguage): LangCountry[] {
  return getBundle(language).countries;
}

export function getLangContinents(
  language: SupportedLanguage
): LangContinent[] {
  return getBundle(language).continents;
}

export function getLangCities(language: SupportedLanguage): LangCity[] {
  return getBundle(language).cities;
}

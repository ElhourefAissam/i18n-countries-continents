import metadataJson from "./metadata.json" with { type: "json" };
import { normalizeText } from "../utils/normalize.js";

export interface Currency {
  /** ISO 4217 3-letter currency code, e.g. "USD", "EUR" */
  code: string;
  /** Currency symbol, e.g. "$", "€", "£" */
  symbol: string;
  /** Currency name in English, e.g. "US Dollar", "Euro" */
  name: string;
}

export interface Coordinates {
  /** Latitude in decimal degrees */
  lat: number;
  /** Longitude in decimal degrees */
  lng: number;
}

export interface CountryMetadata {
  /** International phone calling dial code with prefix, e.g. "+1", "+33", "+212" */
  callingCode: string;
  /** Currency info (code, symbol, name) */
  currency: Currency;
  /** ISO 3166-1 alpha-3 code, e.g. "USA", "FRA" */
  alpha3: string;
  /** ISO 3166-1 numeric 3-digit code, e.g. "840", "250" */
  numeric: string;
  /** Official capital city, e.g. "Paris", "Washington D.C." */
  capital: string;
  /** Array of IANA timezone identifiers, e.g. ["Europe/Paris"] */
  timezones: string[];
  /** Country-code Top-Level Domain, e.g. ".us", ".fr", ".de" */
  tld: string;
  /** Native country name (endonym), e.g. "Deutschland", "日本", "المغرب" */
  nativeName: string;
  /** Demonym / nationality in English, e.g. "American", "French", "German" */
  demonym: string;
  /** Geographic coordinates (latitude, longitude) */
  coordinates: Coordinates;
  /** Surface land/water area in square kilometers */
  area: number;
  /** Whether the country is landlocked */
  landlocked: boolean;
  /** Array of neighboring country ISO 3166-1 alpha-2 codes */
  borders: string[];
  /** Array of official / spoken language codes (ISO 639-1 / 639-2) */
  languages: string[];
  /** Whether the country is a member state of the European Union (EU) */
  isEU: boolean;
  /** Whether the country is a member state of the Schengen Area */
  isSchengen: boolean;
  /** Whether the country is a member state of the European Economic Area (EEA) */
  isEEA: boolean;
}

// Compact tuple format:
// [callingCode, currencyCode, symbol, name, alpha3, numeric, capital, timezones, tld, nativeName, demonym, latlng, area, landlocked, borders, languages]
type RawMetadataEntry = [
  callingCode: string,
  currencyCode: string,
  symbol: string,
  name: string,
  alpha3?: string,
  numeric?: string,
  capital?: string,
  timezones?: string[],
  tld?: string,
  nativeName?: string,
  demonym?: string,
  latlng?: [number, number],
  area?: number,
  landlocked?: boolean,
  borders?: string[],
  languages?: string[]
];

const rawData = metadataJson as unknown as Record<string, RawMetadataEntry>;

/** 27 Official European Union member states */
export const EU_COUNTRY_CODES = new Set<string>([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
  "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE"
]);

/** 29 Official Schengen Area member states */
export const SCHENGEN_COUNTRY_CODES = new Set<string>([
  "AT", "BE", "BG", "CH", "CZ", "DE", "DK", "EE", "ES", "FI",
  "FR", "GR", "HR", "HU", "IS", "IT", "LI", "LT", "LU", "LV",
  "MT", "NL", "NO", "PL", "PT", "RO", "SE", "SI", "SK"
]);

/** 30 Official European Economic Area (EEA) states (27 EU + IS, LI, NO) */
export const EEA_COUNTRY_CODES = new Set<string>([
  ...EU_COUNTRY_CODES,
  "IS", "LI", "NO"
]);

// Precompute reverse lookup indexes for O(1) performance
const alpha3ToAlpha2Map = new Map<string, string>();
const numericToAlpha2Map = new Map<string, string>();
const alpha2ToAlpha3Map = new Map<string, string>();
const alpha2ToNumericMap = new Map<string, string>();
const capitalToAlpha2Map = new Map<string, string>();
const timezoneToAlpha2Map = new Map<string, string[]>();
const tldToAlpha2Map = new Map<string, string>();
const demonymToAlpha2Map = new Map<string, string>();
const spokenLanguageToAlpha2Map = new Map<string, string[]>();

for (const [alpha2, entry] of Object.entries(rawData)) {
  const [, , , , a3, num, cap, tzs, tld, , demonym, , , , , langs] = entry;
  if (a3) {
    alpha3ToAlpha2Map.set(a3.toUpperCase(), alpha2);
    alpha2ToAlpha3Map.set(alpha2, a3);
  }
  if (num) {
    numericToAlpha2Map.set(num, alpha2);
    const intVal = String(parseInt(num, 10));
    if (intVal !== num) {
      numericToAlpha2Map.set(intVal, alpha2);
    }
    alpha2ToNumericMap.set(alpha2, num);
  }
  if (cap) {
    capitalToAlpha2Map.set(normalizeText(cap), alpha2);
  }
  if (Array.isArray(tzs)) {
    for (const tz of tzs) {
      const normTz = tz.trim().toLowerCase();
      if (!timezoneToAlpha2Map.has(normTz)) {
        timezoneToAlpha2Map.set(normTz, []);
      }
      timezoneToAlpha2Map.get(normTz)!.push(alpha2);
    }
  }
  if (tld) {
    const cleanTld = tld.toLowerCase().trim();
    const withoutDot = cleanTld.startsWith(".") ? cleanTld.slice(1) : cleanTld;
    const isDirectMatch = withoutDot.toUpperCase() === alpha2;

    if (isDirectMatch || !tldToAlpha2Map.has(cleanTld)) {
      tldToAlpha2Map.set(cleanTld, alpha2);
      tldToAlpha2Map.set(withoutDot, alpha2);
    }
  }
  if (demonym) {
    const normDem = normalizeText(demonym);
    const primaryOverrides: Record<string, string> = {
      american: "US",
      dutch: "NL",
      french: "FR",
      indian: "IN",
      norwegian: "NO",
      congolese: "CD",
      dominican: "DO",
    };
    if (primaryOverrides[normDem]) {
      demonymToAlpha2Map.set(normDem, primaryOverrides[normDem]);
    } else if (!demonymToAlpha2Map.has(normDem)) {
      demonymToAlpha2Map.set(normDem, alpha2);
    }
  }
  if (Array.isArray(langs)) {
    for (const lang of langs) {
      const normLang = lang.toLowerCase().trim();
      if (!spokenLanguageToAlpha2Map.has(normLang)) {
        spokenLanguageToAlpha2Map.set(normLang, []);
      }
      spokenLanguageToAlpha2Map.get(normLang)!.push(alpha2);
    }
  }
}

/**
 * Convert ISO 3166-1 alpha-2 code to alpha-3 code (e.g. 'US' -> 'USA', 'FR' -> 'FRA').
 */
export function alpha2ToAlpha3(alpha2?: string): string | undefined {
  if (!alpha2 || typeof alpha2 !== "string") return undefined;
  return alpha2ToAlpha3Map.get(alpha2.toUpperCase().trim());
}

/**
 * Convert ISO 3166-1 alpha-3 code to alpha-2 code (e.g. 'USA' -> 'US', 'FRA' -> 'FR').
 */
export function alpha3ToAlpha2(alpha3?: string): string | undefined {
  if (!alpha3 || typeof alpha3 !== "string") return undefined;
  return alpha3ToAlpha2Map.get(alpha3.toUpperCase().trim());
}

/**
 * Convert ISO 3166-1 alpha-2 code to 3-digit numeric code (e.g. 'US' -> '840', 'FR' -> '250').
 */
export function alpha2ToNumeric(alpha2?: string): string | undefined {
  if (!alpha2 || typeof alpha2 !== "string") return undefined;
  return alpha2ToNumericMap.get(alpha2.toUpperCase().trim());
}

/**
 * Convert ISO 3166-1 numeric code to alpha-2 code (e.g. '840' -> 'US', 250 -> 'FR', '004' -> 'AF').
 */
export function numericToAlpha2(numeric?: string | number): string | undefined {
  if (numeric === undefined || numeric === null) return undefined;
  const str = String(numeric).trim();
  if (!str) return undefined;
  return numericToAlpha2Map.get(str) || numericToAlpha2Map.get(str.padStart(3, "0"));
}

/**
 * Find country code by its capital city name (case- and accent-insensitive).
 */
export function capitalToAlpha2(capital?: string): string | undefined {
  if (!capital || typeof capital !== "string") return undefined;
  return capitalToAlpha2Map.get(normalizeText(capital));
}

/**
 * Find country codes associated with an IANA timezone (case-insensitive, e.g. "Europe/Paris" -> ["FR"]).
 */
export function timezoneToAlpha2List(timezone?: string): string[] {
  if (!timezone || typeof timezone !== "string") return [];
  const norm = timezone.trim().toLowerCase();
  return timezoneToAlpha2Map.get(norm) || [];
}

/**
 * Find country code by ccTLD (e.g. ".fr" or "fr" -> "FR").
 */
export function tldToAlpha2(tld?: string): string | undefined {
  if (!tld || typeof tld !== "string") return undefined;
  const clean = tld.toLowerCase().trim();
  return tldToAlpha2Map.get(clean) || (clean.startsWith(".") ? tldToAlpha2Map.get(clean.slice(1)) : undefined);
}

/**
 * Find country code by demonym / nationality in English (e.g. "American" -> "US", "French" -> "FR").
 */
export function demonymToAlpha2(demonym?: string): string | undefined {
  if (!demonym || typeof demonym !== "string") return undefined;
  return demonymToAlpha2Map.get(normalizeText(demonym));
}

/**
 * Find country codes where a language is spoken (e.g. "fr" -> ["FR", "BE", "CH", "CA", ...]).
 */
export function spokenLanguageToAlpha2List(lang?: string): string[] {
  if (!lang || typeof lang !== "string") return [];
  return spokenLanguageToAlpha2Map.get(lang.toLowerCase().trim()) || [];
}

/**
 * Get country calling code, currency, alpha-3, numeric, capital, timezones, and geographic metadata.
 */
export function getMetadata(
  countryCode?: string
): CountryMetadata | undefined {
  if (!countryCode || typeof countryCode !== "string") return undefined;
  const upper = countryCode.toUpperCase().trim();
  const resolvedCode = alpha3ToAlpha2Map.get(upper) || upper;
  const entry = rawData[resolvedCode];
  if (!entry) return undefined;
  const [
    callingCode, code, symbol, name, alpha3, numeric, capital, timezones,
    tld, nativeName, demonym, latlng, area, landlocked, borders, languages
  ] = entry;

  return {
    callingCode,
    currency: { code, symbol, name },
    alpha3: alpha3 || "",
    numeric: numeric || "",
    capital: capital || "",
    timezones: Array.isArray(timezones) ? timezones : [],
    tld: tld || "",
    nativeName: nativeName || "",
    demonym: demonym || "",
    coordinates: latlng && latlng.length === 2 ? { lat: latlng[0], lng: latlng[1] } : { lat: 0, lng: 0 },
    area: typeof area === "number" ? area : 0,
    landlocked: Boolean(landlocked),
    borders: Array.isArray(borders) ? borders : [],
    languages: Array.isArray(languages) ? languages : [],
    isEU: EU_COUNTRY_CODES.has(resolvedCode),
    isSchengen: SCHENGEN_COUNTRY_CODES.has(resolvedCode),
    isEEA: EEA_COUNTRY_CODES.has(resolvedCode),
  };
}

export const COUNTRY_METADATA: Record<string, CountryMetadata> = new Proxy(
  {},
  {
    get(_target, prop: string) {
      return getMetadata(prop);
    },
    has(_target, prop: string) {
      return prop.toUpperCase() in rawData;
    },
    ownKeys() {
      return Object.keys(rawData);
    },
    getOwnPropertyDescriptor(_target, prop: string) {
      if (prop.toUpperCase() in rawData) {
        return {
          configurable: true,
          enumerable: true,
          value: getMetadata(prop),
        };
      }
      return undefined;
    },
  }
);

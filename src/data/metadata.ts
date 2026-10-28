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
}

// Compact tuple format: [callingCode, currencyCode, symbol, name, alpha3?, numeric?, capital?, timezones?]
type RawMetadataEntry = [
  callingCode: string,
  currencyCode: string,
  symbol: string,
  name: string,
  alpha3?: string,
  numeric?: string,
  capital?: string,
  timezones?: string[]
];

const rawData = metadataJson as unknown as Record<string, RawMetadataEntry>;

// Precompute reverse lookup indexes for O(1) performance
const alpha3ToAlpha2Map = new Map<string, string>();
const numericToAlpha2Map = new Map<string, string>();
const alpha2ToAlpha3Map = new Map<string, string>();
const alpha2ToNumericMap = new Map<string, string>();
const capitalToAlpha2Map = new Map<string, string>();

for (const [alpha2, entry] of Object.entries(rawData)) {
  const [, , , , a3, num, cap] = entry;
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
 * Get country calling code, currency, alpha-3, numeric, and capital metadata.
 */
export function getMetadata(
  countryCode?: string
): CountryMetadata | undefined {
  if (!countryCode || typeof countryCode !== "string") return undefined;
  const entry = rawData[countryCode.toUpperCase().trim()];
  if (!entry) return undefined;
  const [callingCode, code, symbol, name, alpha3, numeric, capital] = entry;
  return {
    callingCode,
    currency: { code, symbol, name },
    alpha3: alpha3 || "",
    numeric: numeric || "",
    capital: capital || "",
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

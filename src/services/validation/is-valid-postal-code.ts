import { alpha3ToAlpha2 } from "../../data/metadata.js";

/**
 * Standard postal code regular expression patterns per ISO 3166-1 alpha-2 country.
 */
const POSTAL_PATTERNS: Record<string, RegExp> = {
  US: /^\d{5}(-\d{4})?$/,
  CA: /^[A-CEGHJ-NPR-TVXY]\d[A-CEGHJ-NPR-TV-Z][ ]?\d[A-CEGHJ-NPR-TV-Z]\d$/i,
  GB: /^[A-Z]{1,2}\d[A-Z\d]?[ ]?\d[A-Z]{2}$/i,
  FR: /^\d{5}$/,
  DE: /^\d{5}$/,
  IT: /^\d{5}$/,
  ES: /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/,
  JP: /^\d{3}-?\d{4}$/,
  CN: /^\d{6}$/,
  IN: /^\d{6}$/,
  BR: /^\d{5}-?\d{3}$/,
  MX: /^\d{5}$/,
  AU: /^\d{4}$/,
  NL: /^\d{4}[ ]?[A-Z]{2}$/i,
  CH: /^\d{4}$/,
  AT: /^\d{4}$/,
  BE: /^\d{4}$/,
  SE: /^\d{3}[ ]?\d{2}$/,
  NO: /^\d{4}$/,
  DK: /^\d{4}$/,
  FI: /^\d{5}$/,
  PL: /^\d{2}-\d{3}$/,
  PT: /^\d{4}(-\d{3})?$/,
  RU: /^\d{6}$/,
  KR: /^\d{5}$/,
  TR: /^\d{5}$/,
  ZA: /^\d{4}$/,
  NZ: /^\d{4}$/,
  SG: /^\d{6}$/,
  MA: /^\d{5}$/,
  DZ: /^\d{5}$/,
  TN: /^\d{4}$/,
  EG: /^\d{5}$/,
  SA: /^\d{5}$/,
  AR: /^[A-Z]?\d{4}[A-Z]{0,3}$/i,
  CL: /^\d{7}$/,
  CO: /^\d{6}$/,
  GR: /^\d{3}[ ]?\d{2}$/,
  IE: /^[A-Z]\d{2}[ ]?[A-Z\d]{4}$/i,
  IL: /^\d{7}$/,
  MY: /^\d{5}$/,
  PH: /^\d{4}$/,
  RO: /^\d{6}$/,
  TH: /^\d{5}$/,
  UA: /^\d{5}$/,
};

/**
 * Validate a postal or ZIP code against a country's national format.
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code (e.g. 'US', 'FRA', 'GB')
 * @param postalCode - Postal/ZIP code string to validate
 * @returns true if valid according to country postal pattern, false otherwise
 *
 * @example
 * ```ts
 * isValidPostalCode('US', '90210');       // true
 * isValidPostalCode('US', '90210-1234');  // true
 * isValidPostalCode('FR', '75008');       // true
 * isValidPostalCode('GB', 'SW1A 1AA');    // true
 * isValidPostalCode('CA', 'K1A 0B1');     // true
 * isValidPostalCode('US', 'ABCDE');       // false
 * ```
 */
export function isValidPostalCode(
  countryCode?: string,
  postalCode?: string
): boolean {
  if (!countryCode || typeof countryCode !== "string") return false;
  if (!postalCode || typeof postalCode !== "string") return false;

  let upper = countryCode.toUpperCase().trim();
  if (upper.length === 3) {
    const a2 = alpha3ToAlpha2(upper);
    if (a2) upper = a2;
  }

  const pattern = POSTAL_PATTERNS[upper];
  if (!pattern) return false;

  return pattern.test(postalCode.trim());
}

/**
 * Get the postal code regular expression pattern source for a country.
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code
 * @returns RegExp string pattern, or undefined if not available
 *
 * @example
 * ```ts
 * getPostalCodePattern('FR'); // "^\\d{5}$"
 * ```
 */
export function getPostalCodePattern(countryCode?: string): string | undefined {
  if (!countryCode || typeof countryCode !== "string") return undefined;
  let upper = countryCode.toUpperCase().trim();
  if (upper.length === 3) {
    const a2 = alpha3ToAlpha2(upper);
    if (a2) upper = a2;
  }
  return POSTAL_PATTERNS[upper]?.source;
}

export default isValidPostalCode;

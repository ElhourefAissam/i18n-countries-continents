import { getMetadata, alpha3ToAlpha2 } from "../../data/metadata.js";

/**
 * Get the capital city for a given country code (supports alpha-2 and alpha-3).
 *
 * @param countryCode - 2-letter or 3-letter ISO country code (e.g. 'FR', 'USA', 'JP')
 * @returns Official capital city name, or undefined if not found
 *
 * @example
 * ```ts
 * getCapital('FR');  // 'Paris'
 * getCapital('USA'); // 'Washington D.C.'
 * getCapital('JP');  // 'Tokyo'
 * getCapital('MA');  // 'Rabat'
 * ```
 */
export default function getCapital(countryCode: string): string | undefined {
  if (!countryCode || typeof countryCode !== "string") return undefined;
  let code = countryCode.toUpperCase().trim();
  if (code.length === 3) {
    const a2 = alpha3ToAlpha2(code);
    if (a2) code = a2;
  }
  const meta = getMetadata(code);
  return meta?.capital || undefined;
}

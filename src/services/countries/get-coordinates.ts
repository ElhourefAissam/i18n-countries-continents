import { getMetadata, Coordinates } from "../../data/metadata.js";

export type { Coordinates };

/**
 * Get geographic center coordinates (latitude and longitude) for a country.
 * Accepts both 2-letter alpha-2 and 3-letter alpha-3 country codes.
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code (e.g. 'US', 'FRA')
 * @returns Coordinates object { lat, lng }, or undefined if invalid
 *
 * @example
 * ```ts
 * getCoordinates('US'); // { lat: 38, lng: -97 }
 * getCoordinates('FRA'); // { lat: 46, lng: 2 }
 * ```
 */
export default function getCoordinates(
  countryCode?: string
): Coordinates | undefined {
  if (!countryCode || typeof countryCode !== "string") return undefined;
  return getMetadata(countryCode)?.coordinates || undefined;
}

/**
 * Check whether a country is completely landlocked (no direct access to open sea/ocean).
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code (e.g. 'CH', 'AUT')
 * @returns true if landlocked, false otherwise
 *
 * @example
 * ```ts
 * isLandlocked('CH'); // true (Switzerland)
 * isLandlocked('FR'); // false (France has coastline)
 * ```
 */
export function isLandlocked(countryCode?: string): boolean {
  if (!countryCode || typeof countryCode !== "string") return false;
  return getMetadata(countryCode)?.landlocked ?? false;
}

/**
 * Get country surface land/water area in square kilometers ($km^2$).
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code
 * @returns Area in $km^2$, or undefined if not found
 *
 * @example
 * ```ts
 * getArea('FR'); // 551695
 * ```
 */
export function getArea(countryCode?: string): number | undefined {
  if (!countryCode || typeof countryCode !== "string") return undefined;
  return getMetadata(countryCode)?.area ?? undefined;
}

export { getCoordinates as getCountryCoordinates, getArea as getCountryArea };

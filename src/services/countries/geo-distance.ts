import { SupportedLanguage } from "../../utils/types.js";
import getCoordinates from "./get-coordinates.js";
import getCountry from "./get-country.js";
import getCountries, { Country } from "./get-countries.js";

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Calculate the great-circle geodesic distance between the geographic centers of two countries using the Haversine formula.
 *
 * @param countryCode1 - ISO 3166-1 alpha-2 or alpha-3 code of first country
 * @param countryCode2 - ISO 3166-1 alpha-2 or alpha-3 code of second country
 * @param unit - Distance unit: 'km' or 'miles' (default: 'km')
 * @returns Approximate great-circle distance rounded to nearest integer, or undefined if invalid
 *
 * @example
 * ```ts
 * getDistance('FR', 'GB'); // ~867 km
 * getDistance('US', 'CA'); // ~2260 km
 * getDistance('FR', 'GB', 'miles'); // ~539 miles
 * ```
 */
export function getDistance(
  countryCode1?: string,
  countryCode2?: string,
  unit: "km" | "miles" = "km"
): number | undefined {
  if (!countryCode1 || !countryCode2) return undefined;
  const c1 = getCoordinates(countryCode1);
  const c2 = getCoordinates(countryCode2);
  if (!c1 || !c2) return undefined;

  const R = unit === "miles" ? 3958.8 : 6371; // Earth mean radius
  const dLat = toRad(c2.lat - c1.lat);
  const dLng = toRad(c2.lng - c1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(c1.lat)) *
      Math.cos(toRad(c2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

/**
 * Find the closest neighboring countries ordered by geographic proximity.
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code
 * @param limit - Maximum number of nearest countries to return (default: 5)
 * @param language - Target language for localized Country objects (default: 'en')
 * @returns Array of objects containing Country and distance in kilometers sorted nearest-first
 *
 * @example
 * ```ts
 * const nearest = getNearestCountries('US', 3);
 * // [ { country: Canada, distanceKm: ... }, { country: Bahamas, distanceKm: ... }, ... ]
 * ```
 */
export function getNearestCountries(
  countryCode?: string,
  limit: number = 5,
  language: SupportedLanguage = "en"
): { country: Country; distanceKm: number }[] {
  if (!countryCode || typeof countryCode !== "string") return [];
  const source = getCountry(countryCode, language);
  if (!source) return [];

  const all = getCountries(language).filter((c) => c.code !== source.code);
  const withDistance = all
    .map((c) => ({
      country: c,
      distanceKm: getDistance(source.code, c.code, "km") ?? Infinity,
    }))
    .filter((item) => Number.isFinite(item.distanceKm));

  withDistance.sort((a, b) => a.distanceKm - b.distanceKm);
  return withDistance.slice(0, Math.max(0, limit));
}

export default getDistance;

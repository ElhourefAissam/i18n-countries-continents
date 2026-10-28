import { getMetadata, Currency } from "../../data/metadata.js";

export type { Currency };

/**
 * Get currency information (`code`, `symbol`, `name`) for a country code.
 *
 * @param countryCode - 2-letter ISO 3166-1 alpha-2 country code (case-insensitive)
 * @returns Currency object, or undefined if not found
 *
 * @example
 * ```ts
 * getCurrency('US'); // { code: "USD", symbol: "$", name: "US Dollar" }
 * getCurrency('FR'); // { code: "EUR", symbol: "€", name: "Euro" }
 * getCurrency('JP'); // { code: "JPY", symbol: "¥", name: "Japanese Yen" }
 * getCurrency('MA'); // { code: "MAD", symbol: "د.م.", name: "Moroccan Dirham" }
 * ```
 */
export default function getCurrency(
  countryCode: string
): Currency | undefined {
  if (!countryCode || typeof countryCode !== "string") return undefined;
  return getMetadata(countryCode)?.currency;
}

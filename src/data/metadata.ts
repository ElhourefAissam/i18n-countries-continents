import metadataJson from "./metadata.json" with { type: "json" };

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
}

// Compact tuple format: [callingCode, currencyCode, symbol, name]
type RawMetadataEntry = [
  callingCode: string,
  currencyCode: string,
  symbol: string,
  name: string
];

const rawData = metadataJson as unknown as Record<string, RawMetadataEntry>;

/**
 * Get country calling code and currency metadata.
 */
export function getMetadata(
  countryCode?: string
): CountryMetadata | undefined {
  if (!countryCode || typeof countryCode !== "string") return undefined;
  const entry = rawData[countryCode.toUpperCase().trim()];
  if (!entry) return undefined;
  const [callingCode, code, symbol, name] = entry;
  return {
    callingCode,
    currency: { code, symbol, name },
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

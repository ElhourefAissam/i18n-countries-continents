export { default as getCountryName } from "./get-country-name.js";
export { default as getCountry } from "./get-country.js";
export { default as getCountryByName } from "./get-country-by-name.js";
export { default as getCountryFlag } from "./get-country-flag.js";
export { default as getCountries } from "./get-countries.js";
export { default as getCountriesByContinent } from "./get-countries-by-continent.js";
export { default as getContinentByCountry } from "./get-continent-by-country.js";
export { default as searchCountries } from "./search-countries.js";
export { default as getCallingCode } from "./get-calling-code.js";
export { default as getCurrency } from "./get-currency.js";
export { default as getCountriesByCallingCode } from "./get-countries-by-calling-code.js";
export { default as getCountriesByCurrency } from "./get-countries-by-currency.js";
export { default as getCountryByAlpha3 } from "./get-country-by-alpha3.js";
export { default as getCountryByNumeric } from "./get-country-by-numeric.js";
export { default as getCapital } from "./get-capital.js";
export { default as getCountryByCapital } from "./get-country-by-capital.js";
export { default as getTimezones } from "./get-timezones.js";
export { default as getCountriesByTimezone } from "./get-countries-by-timezone.js";
export {
  alpha2ToAlpha3,
  alpha3ToAlpha2,
  alpha2ToNumeric,
  numericToAlpha2,
} from "./iso-converters.js";

// ccTLD services
export { default as getTld, getCountryTld } from "./get-tld.js";
export { default as getCountryByTld } from "./get-country-by-tld.js";

// Regional & Geopolitical Union services
export {
  isEU,
  isSchengen,
  isEEA,
  getEUCountries,
  getSchengenCountries,
  getEEACountries,
  EU_COUNTRY_CODES,
  SCHENGEN_COUNTRY_CODES,
  EEA_COUNTRY_CODES,
} from "./regional-unions.js";

// Native endonym services
export { default as getNativeName, getCountryNativeName } from "./get-native-name.js";

// CDN Vector / Raster Flag URLs
export {
  default as getCountryFlagUrl,
  type FlagFormat,
  type FlagSize,
  type FlagUrlOptions,
} from "./get-country-flag-url.js";

// Geographic Coordinates, Area & Landlocked
export {
  default as getCoordinates,
  getCountryCoordinates,
  isLandlocked,
  getArea,
  getCountryArea,
} from "./get-coordinates.js";

// Neighboring Borders
export {
  default as getBorders,
  getCountryBorders,
} from "./get-borders.js";

// Spoken Languages
export {
  default as getCountryLanguages,
  getCountriesBySpokenLanguage,
} from "./spoken-languages.js";

// Demonyms / Nationalities
export {
  default as getDemonym,
  getCountryDemonym,
  getCountryByDemonym,
} from "./get-demonym.js";

// Locale helper
export { default as getCountryFromLocale } from "./get-country-from-locale.js";

// Aliases for developer convenience
export { default as getCountryCallingCode } from "./get-calling-code.js";
export { default as getCountryCurrency } from "./get-currency.js";
export { default as getCountryCapital } from "./get-capital.js";
export { default as getCountryTimezones } from "./get-timezones.js";

export type { Country, Currency, Coordinates } from "./get-countries.js";

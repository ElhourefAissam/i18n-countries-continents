import {
  getCountries,
  getCountry,
  getCallingCode,
  getCurrency,
  getCountriesByCallingCode,
  getCountriesByCurrency,
  getCountryCallingCode,
  getCountryCurrency,
  searchCountries,
} from "../dist/index.js";

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✅ ${message}`);
  } else {
    failed++;
    console.error(`  ❌ FAIL: ${message}`);
  }
}

console.log("\n========================================");
console.log(" Testing Calling Codes & Currencies");
console.log("========================================\n");

// 1. Data integrity on all 250 countries
const allCountries = getCountries("en");
assert(allCountries.length === 250, "getCountries('en') returns 250 countries");

const allHaveCallingCode = allCountries.every(
  (c) => typeof c.callingCode === "string" && c.callingCode.startsWith("+")
);
assert(allHaveCallingCode, "All 250 countries have a valid '+' callingCode");

const allHaveCurrency = allCountries.every(
  (c) =>
    c.currency &&
    typeof c.currency.code === "string" &&
    c.currency.code.length === 3 &&
    typeof c.currency.symbol === "string" &&
    typeof c.currency.name === "string"
);
assert(allHaveCurrency, "All 250 countries have valid currency info (code, symbol, name)");

// 2. Specific calling code lookups
assert(getCallingCode("US") === "+1", "getCallingCode('US') returns '+1'");
assert(getCallingCode("ca") === "+1", "getCallingCode('ca') is case-insensitive ('+1')");
assert(getCallingCode("FR") === "+33", "getCallingCode('FR') returns '+33'");
assert(getCallingCode("MA") === "+212", "getCallingCode('MA') returns '+212'");
assert(getCallingCode("GB") === "+44", "getCallingCode('GB') returns '+44'");
assert(getCallingCode("JP") === "+81", "getCallingCode('JP') returns '+81'");
assert(getCallingCode("DE") === "+49", "getCallingCode('DE') returns '+49'");
assert(getCallingCode("INVALID") === undefined, "getCallingCode('INVALID') returns undefined");

// 3. Alias tests
assert(getCountryCallingCode("FR") === "+33", "getCountryCallingCode alias matches getCallingCode");
assert(getCountryCurrency("FR")?.code === "EUR", "getCountryCurrency alias matches getCurrency");

// 4. Specific currency lookups
const usCurrency = getCurrency("US");
assert(usCurrency?.code === "USD", "getCurrency('US').code is 'USD'");
assert(usCurrency?.symbol === "$", "getCurrency('US').symbol is '$'");
assert(usCurrency?.name === "US Dollar", "getCurrency('US').name is 'US Dollar'");

const frCurrency = getCurrency("FR");
assert(frCurrency?.code === "EUR", "getCurrency('FR').code is 'EUR'");
assert(frCurrency?.symbol === "€", "getCurrency('FR').symbol is '€'");

const maCurrency = getCurrency("MA");
assert(maCurrency?.code === "MAD", "getCurrency('MA').code is 'MAD'");
assert(maCurrency?.symbol === "د.م.", "getCurrency('MA').symbol is 'د.م.'");

assert(getCurrency("INVALID") === undefined, "getCurrency('INVALID') returns undefined");

// 5. Reverse lookup by calling code
const frByPhone = getCountriesByCallingCode("+33");
assert(frByPhone.length === 1 && frByPhone[0].code === "FR", "getCountriesByCallingCode('+33') returns France");

const frByDigits = getCountriesByCallingCode("33");
assert(frByDigits.length === 1 && frByDigits[0].code === "FR", "getCountriesByCallingCode('33') without '+' returns France");

const nanp = getCountriesByCallingCode("+1");
assert(nanp.some((c) => c.code === "US") && nanp.some((c) => c.code === "CA"), "getCountriesByCallingCode('+1') includes US and CA");

// 6. Lookup by currency code
const eurozone = getCountriesByCurrency("EUR", "en");
assert(eurozone.length > 20, `getCountriesByCurrency('EUR') returns Eurozone countries (count: ${eurozone.length})`);
assert(eurozone.some((c) => c.code === "FR") && eurozone.some((c) => c.code === "DE"), "Eurozone includes FR and DE");

const usdCountries = getCountriesByCurrency("USD");
assert(usdCountries.some((c) => c.code === "US"), "USD countries include US");

// 7. Search by calling code and currency
const searchByPhone = searchCountries("+33", "en");
assert(searchByPhone.some((c) => c.code === "FR"), "searchCountries('+33') finds France");

const searchByCur = searchCountries("MAD", "en");
assert(searchByCur.some((c) => c.code === "MA"), "searchCountries('MAD') finds Morocco");

// 8. Individual getCountry
const japan = getCountry("JP", "fr");
assert(japan?.name === "Japon", "getCountry('JP', 'fr') has localized name 'Japon'");
assert(japan?.callingCode === "+81", "getCountry('JP') has callingCode '+81'");
assert(japan?.currency.code === "JPY", "getCountry('JP') has currency 'JPY'");
assert(japan?.currency.symbol === "¥", "getCountry('JP') has symbol '¥'");

console.log("\n----------------------------------------");
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("----------------------------------------\n");

if (failed > 0) {
  process.exit(1);
}

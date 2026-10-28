import {
  getCountries,
  getCountry,
  getTimezones,
  getCountryTimezones,
  getCountriesByTimezone,
  searchCountries,
} from "../dist/index.js";

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

console.log("\n========================================");
console.log(" Testing Primary Timezones");
console.log("========================================\n");

// 1. Data presence across all 250 countries
const countries = getCountries("en");
assert(countries.length === 250, "getCountries('en') returns 250 countries");

const allHaveTimezones = countries.every(
  (c) => Array.isArray(c.timezones) && c.timezones.length > 0
);
assert(allHaveTimezones, "All 250 countries have non-empty timezones array");

// 2. Specific timezone lookups
const frTz = getTimezones("FR");
assert(frTz.includes("Europe/Paris"), "getTimezones('FR') includes 'Europe/Paris'");

const jpTz = getTimezones("jp");
assert(jpTz.includes("Asia/Tokyo"), "getTimezones('jp') is case-insensitive and includes 'Asia/Tokyo'");

const maTz = getTimezones("MA");
assert(maTz.includes("Africa/Casablanca"), "getTimezones('MA') includes 'Africa/Casablanca'");

const usTz = getTimezones("US");
assert(
  usTz.includes("America/New_York") && usTz.includes("America/Los_Angeles"),
  "getTimezones('US') includes both New York and Los Angeles"
);

const usaTz = getTimezones("USA");
assert(
  Array.isArray(usaTz) && usaTz.length === usTz.length,
  "getTimezones('USA') accepts 3-letter alpha-3 code"
);

assert(getTimezones("INVALID").length === 0, "getTimezones('INVALID') returns empty array");
assert(getTimezones("").length === 0, "getTimezones('') returns empty array");
assert(getTimezones(null).length === 0, "getTimezones(null) returns empty array");

// 3. Alias check
const frAlias = getCountryTimezones("FR");
assert(frAlias.includes("Europe/Paris"), "getCountryTimezones alias works");

// 4. getCountriesByTimezone reverse lookup
const frByTz = getCountriesByTimezone("Europe/Paris");
assert(frByTz.some((c) => c.code === "FR"), "getCountriesByTimezone('Europe/Paris') returns France");

const frByTzLower = getCountriesByTimezone("europe/paris", "es");
assert(
  frByTzLower.some((c) => c.code === "FR" && c.name === "Francia"),
  "getCountriesByTimezone('europe/paris', 'es') is case-insensitive and returns localized Country"
);

const maByTz = getCountriesByTimezone("Africa/Casablanca");
assert(maByTz.some((c) => c.code === "MA"), "getCountriesByTimezone('Africa/Casablanca') returns Morocco");

const invalidTz = getCountriesByTimezone("Fake/Timezone");
assert(invalidTz.length === 0, "getCountriesByTimezone('Fake/Timezone') returns empty array");

// 5. searchCountries integration
const searchTz = searchCountries("Europe/Paris");
assert(searchTz.some((c) => c.code === "FR"), "searchCountries('Europe/Paris') finds France");

const searchCasablanca = searchCountries("Casablanca");
assert(searchCasablanca.some((c) => c.code === "MA"), "searchCountries('Casablanca') finds Morocco");

// 6. getCountry includes timezones
const frObj = getCountry("FR");
assert(
  frObj && Array.isArray(frObj.timezones) && frObj.timezones.includes("Europe/Paris"),
  "getCountry('FR') includes timezones array"
);

console.log("\n----------------------------------------");
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("----------------------------------------\n");

if (failed > 0) process.exit(1);

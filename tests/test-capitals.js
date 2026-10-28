import {
  getCountries,
  getCountry,
  getCapital,
  getCountryCapital,
  getCountryByCapital,
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
console.log(" Testing Capital Cities");
console.log("========================================\n");

// 1. Data presence
const countries = getCountries("en");
assert(countries.length === 250, "getCountries('en') returns 250 countries");

const allHaveCapitalProp = countries.every(
  (c) => typeof c.capital === "string"
);
assert(allHaveCapitalProp, "All 250 countries have a 'capital' property");

const withCapitalCount = countries.filter((c) => c.capital.length > 0).length;
assert(withCapitalCount === 245, `245 countries have an official capital city (got ${withCapitalCount})`);

// 2. getCapital
assert(getCapital("FR") === "Paris", "getCapital('FR') returns 'Paris'");
assert(getCapital("US") === "Washington D.C.", "getCapital('US') returns 'Washington D.C.'");
assert(getCapital("USA") === "Washington D.C.", "getCapital('USA') accepts alpha-3 code");
assert(getCapital("jp") === "Tokyo", "getCapital('jp') is case-insensitive");
assert(getCapital("MA") === "Rabat", "getCapital('MA') returns 'Rabat'");
assert(getCapital("DE") === "Berlin", "getCapital('DE') returns 'Berlin'");
assert(getCapital("ES") === "Madrid", "getCapital('ES') returns 'Madrid'");
assert(getCapital("GB") === "London", "getCapital('GB') returns 'London'");
assert(getCapital("INVALID") === undefined, "getCapital('INVALID') returns undefined");
assert(getCapital("") === undefined, "getCapital('') returns undefined");
assert(getCapital(null) === undefined, "getCapital(null) returns undefined");

// 3. Alias
assert(getCountryCapital("FR") === "Paris", "getCountryCapital('FR') alias works");

// 4. getCountryByCapital
const frCountry = getCountryByCapital("Paris");
assert(frCountry && frCountry.code === "FR" && frCountry.name === "France", "getCountryByCapital('Paris') returns France");

const jpInEs = getCountryByCapital("tokyo", "es");
assert(jpInEs && jpInEs.code === "JP" && jpInEs.name === "Japón", "getCountryByCapital('tokyo', 'es') is case-insensitive and returns translated country");

const brCountry = getCountryByCapital("brasilia");
assert(brCountry && brCountry.code === "BR", "getCountryByCapital('brasilia') is accent-insensitive for Brasília");

const invalidCapital = getCountryByCapital("Atlantis");
assert(invalidCapital === undefined, "getCountryByCapital('Atlantis') returns undefined");

// 5. searchCountries by capital
const parisSearch = searchCountries("Paris");
assert(parisSearch.some((c) => c.code === "FR"), "searchCountries('Paris') finds France");

const tokyoSearch = searchCountries("tokyo");
assert(tokyoSearch.some((c) => c.code === "JP"), "searchCountries('tokyo') finds Japan");

const brasiliaSearch = searchCountries("brasilia");
assert(brasiliaSearch.some((c) => c.code === "BR"), "searchCountries('brasilia') finds Brazil");

// 6. getCountry has capital field
const usObj = getCountry("US");
assert(usObj && usObj.capital === "Washington D.C.", "getCountry('US') includes capital");

console.log("\n----------------------------------------");
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("----------------------------------------\n");

if (failed > 0) process.exit(1);

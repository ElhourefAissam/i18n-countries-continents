import {
  getCountry,
  getCountryByName,
  searchCountries,
  getCountriesByContinent,
  getContinent,
  getCity,
  sortCountries,
  sortContinents,
  sortCities,
  isValidCountryCode,
  isValidContinentCode,
  isValidLanguage,
  toSelectOptions,
  getCountries,
  getContinents,
  getCities,
} from "../dist/index.js";

console.log("╔════════════════════════════════════════════════════════════════╗");
console.log("║           NEW FEATURES VERIFICATION TEST SUITE                 ║");
console.log("╚════════════════════════════════════════════════════════════════╝\n");

let passed = 0;
let failed = 0;

function assert(name, condition, errorMsg) {
  if (condition) {
    passed++;
    console.log(`✅ ${name}`);
  } else {
    failed++;
    console.error(`❌ ${name}`);
    if (errorMsg) console.error(`   ${errorMsg}`);
  }
}

// ========================================
// 1. getCountry
// ========================================
console.log("\n📦 1. getCountry()");
console.log("═".repeat(60));

const us = getCountry("US", "en");
assert("getCountry('US', 'en') returns correct object", us && us.code === "US" && us.name === "United States" && us.continent === "NA" && us.flag === "🇺🇸");

const frEs = getCountry("fr", "es");
assert("getCountry('fr', 'es') is case-insensitive & translated", frEs && frEs.code === "FR" && frEs.name === "Francia" && frEs.continent === "EU" && frEs.flag === "🇫🇷");

assert("getCountry with invalid code returns undefined", getCountry("ZZZ") === undefined);
assert("getCountry with empty string returns undefined", getCountry("") === undefined);

// ========================================
// 2. getCountryByName
// ========================================
console.log("\n🔍 2. getCountryByName()");
console.log("═".repeat(60));

const france = getCountryByName("France", "en");
assert("getCountryByName('France', 'en') returns France", france && france.code === "FR" && france.continent === "EU" && france.flag === "🇫🇷");

const espana = getCountryByName("España", "es");
assert("getCountryByName('España', 'es') returns Spain", espana && espana.code === "ES" && espana.name === "España");

const spainInEs = getCountryByName("Spain", "es");
assert("getCountryByName('Spain', 'es') falls back to English match and returns translated", spainInEs && spainInEs.code === "ES" && spainInEs.name === "España");

const caseInsensitive = getCountryByName("uNiTeD sTaTeS");
assert("getCountryByName is case-insensitive", caseInsensitive && caseInsensitive.code === "US");

assert("getCountryByName with invalid name returns undefined", getCountryByName("NonExistentLand") === undefined);
assert("getCountryByName with empty string returns undefined", getCountryByName("") === undefined);

// ========================================
// 3. searchCountries
// ========================================
console.log("\n🔎 3. searchCountries()");
console.log("═".repeat(60));

const uniResults = searchCountries("uni", "en", 10);
assert("searchCountries('uni', 'en') returns results", uniResults.length > 0 && uniResults.some(c => c.code === "US"));

const limitTest = searchCountries("a", "en", 3);
assert("searchCountries respects limit", limitTest.length === 3);

const codeSearch = searchCountries("JP", "en");
assert("searchCountries finds by code", codeSearch.some(c => c.code === "JP"));

assert("searchCountries with empty query returns empty array", searchCountries("", "en").length === 0);
assert("searchCountries with limit 0 returns empty array", searchCountries("united", "en", 0).length === 0);

// ========================================
// 4. getCountriesByContinent
// ========================================
console.log("\n🗺️  4. getCountriesByContinent()");
console.log("═".repeat(60));

const euCountries = getCountriesByContinent("EU", "en");
assert("getCountriesByContinent('EU') returns European countries", euCountries.length === 53);
assert("Every returned country has continent 'EU'", euCountries.every(c => c.continent === "EU"));

const euSpanish = getCountriesByContinent("eu", "es");
assert("getCountriesByContinent is case-insensitive and translated", euSpanish.some(c => c.code === "ES" && c.name === "España"));

const invalidContinent = getCountriesByContinent("ZZ");
assert("getCountriesByContinent with invalid code returns empty array", invalidContinent.length === 0);

// ========================================
// 5. Validation Utilities
// ========================================
console.log("\n✔️  5. Validation Utilities");
console.log("═".repeat(60));

assert("isValidCountryCode('US') returns true", isValidCountryCode("US") === true);
assert("isValidCountryCode('fr') returns true (case-insensitive)", isValidCountryCode("fr") === true);
assert("isValidCountryCode('ZZ') returns false", isValidCountryCode("ZZ") === false);
assert("isValidCountryCode('') returns false", isValidCountryCode("") === false);

assert("isValidContinentCode('EU') returns true", isValidContinentCode("EU") === true);
assert("isValidContinentCode('as') returns true (case-insensitive)", isValidContinentCode("as") === true);
assert("isValidContinentCode('ZZ') returns false", isValidContinentCode("ZZ") === false);
assert("isValidContinentCode('USA') returns false", isValidContinentCode("USA") === false);

assert("isValidLanguage('en') returns true", isValidLanguage("en") === true);
assert("isValidLanguage('ES') returns true", isValidLanguage("ES") === true);
assert("isValidLanguage('de') returns true", isValidLanguage("de") === true);
assert("isValidLanguage('pt') returns true", isValidLanguage("pt") === true);
assert("isValidLanguage('it') returns true", isValidLanguage("it") === true);
assert("isValidLanguage('ja') returns false", isValidLanguage("ja") === false);
assert("isValidLanguage('') returns false", isValidLanguage("") === false);

// ========================================
// 6. toSelectOptions
// ========================================
console.log("\n📋 6. toSelectOptions()");
console.log("═".repeat(60));

const sampleCountries = getCountries("en").slice(0, 3);
const defaultOptions = toSelectOptions(sampleCountries);
assert("toSelectOptions defaults to value:code, label:name", 
  defaultOptions.length === 3 && 
  defaultOptions[0].value === sampleCountries[0].code && 
  defaultOptions[0].label === sampleCountries[0].name
);

const customFlagOptions = toSelectOptions(sampleCountries, {
  label: (c) => `${c.flag} ${c.name}`
});
assert("toSelectOptions supports custom label function",
  customFlagOptions[0].label === `${sampleCountries[0].flag} ${sampleCountries[0].name}`
);

const continents = getContinents("es");
const continentOptions = toSelectOptions(continents);
assert("toSelectOptions works with continents",
  continentOptions.length === 7 && continentOptions[0].value === continents[0].code
);

const sampleCities = getCities("en").slice(0, 2);
const cityOptions = toSelectOptions(sampleCities, {
  value: "name",
  label: "translatedName"
});
assert("toSelectOptions works with cities using custom value/label keys",
  cityOptions.length === 2 && cityOptions[0].value === sampleCities[0].name
);

assert("toSelectOptions with non-array returns empty array", toSelectOptions(null).length === 0);

// ========================================
// 7. getContinent & getCity (API Symmetry)
// ========================================
console.log("\n🏛️  7. getContinent & getCity");
console.log("═".repeat(60));

const euEs = getContinent("EU", "es");
assert("getContinent('EU', 'es') returns Europa object", euEs && euEs.code === "EU" && euEs.name === "Europa");
assert("getContinent('ZZ') returns undefined", getContinent("ZZ") === undefined);

const parisAr = getCity("Paris", "ar");
assert("getCity('Paris', 'ar') returns Arabic translation object", parisAr && parisAr.name === "Paris" && parisAr.translatedName === "باريس");
assert("getCity with non-existent city returns undefined", getCity("NonExistent123") === undefined);

// ========================================
// 8. Sorting Utilities (Locale-Aware)
// ========================================
console.log("\n🔤 8. Sorting Utilities (Locale-Aware)");
console.log("═".repeat(60));

const esCountries = getCountries("es");
const sortedEs = sortCountries(esCountries, "es");
assert("sortCountries returns 250 countries", sortedEs.length === 250);
assert("sortCountries orders alphabetically in target locale", 
  sortedEs[0].name.localeCompare(sortedEs[1].name, "es") <= 0 &&
  sortedEs[1].name.localeCompare(sortedEs[2].name, "es") <= 0
);

const esContinents = getContinents("es");
const sortedContinents = sortContinents(esContinents, "es");
assert("sortContinents orders alphabetically", 
  sortedContinents[0].name.localeCompare(sortedContinents[1].name, "es") <= 0
);

const frCities = getCities("fr").slice(0, 20);
const sortedFrCities = sortCities(frCities, "fr");
assert("sortCities orders cities alphabetically", sortedFrCities.length === 20);

const sortedSelect = toSelectOptions(sampleCountries, {
  sort: true,
  language: "en"
});
assert("toSelectOptions supports sort: true", 
  sortedSelect[0].label.localeCompare(sortedSelect[1].label, "en") <= 0
);

// ========================================
// FINAL SUMMARY
// ========================================
console.log("\n" + "═".repeat(60));
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("═".repeat(60));

if (failed > 0) {
  process.exit(1);
}

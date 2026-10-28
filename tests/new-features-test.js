import {
  getCountry,
  getCountryByName,
  searchCountries,
  getCountriesByContinent,
  getContinent,
  getContinentByName,
  searchContinents,
  getCity,
  getSupportedLanguages,
  LANGUAGES,
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
assert("getCountry with null returns undefined without throwing", getCountry(null) === undefined);

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
assert("getCountryByName with null returns undefined", getCountryByName(null) === undefined);

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
assert("isValidLanguage('es') returns true", isValidLanguage("es") === true);
assert("isValidLanguage('de') returns true", isValidLanguage("de") === true);
assert("isValidLanguage('pt') returns true", isValidLanguage("pt") === true);
assert("isValidLanguage('it') returns true", isValidLanguage("it") === true);
assert("isValidLanguage('zh') returns true", isValidLanguage("zh") === true);
assert("isValidLanguage('ja') returns true", isValidLanguage("ja") === true);
assert("isValidLanguage('xx') returns false", isValidLanguage("xx") === false);
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
// 7. getContinent, getContinentByName, searchContinents
// ========================================
console.log("\n🏛️  7. Continent APIs (Symmetry & Reverse Lookup)");
console.log("═".repeat(60));

const euEs = getContinent("EU", "es");
assert("getContinent('EU', 'es') returns Europa object", euEs && euEs.code === "EU" && euEs.name === "Europa");
assert("getContinent('ZZ') returns undefined", getContinent("ZZ") === undefined);
assert("getContinent(null) returns undefined without throwing", getContinent(null) === undefined);

const europaByName = getContinentByName("Europa", "es");
assert("getContinentByName('Europa', 'es') returns Europa object", europaByName && europaByName.code === "EU" && europaByName.name === "Europa");

const europeInEs = getContinentByName("Europe", "es");
assert("getContinentByName('Europe', 'es') falls back to English query and returns translated", europeInEs && europeInEs.code === "EU" && europeInEs.name === "Europa");

assert("getContinentByName invalid returns undefined", getContinentByName("Atlantis") === undefined);
assert("getContinentByName null returns undefined", getContinentByName(null) === undefined);

const searchContResults = searchContinents("amer", "en");
assert("searchContinents('amer', 'en') finds North and South America", searchContResults.length === 2 && searchContResults.some(c => c.code === "NA"));

const searchContByCode = searchContinents("AS", "en");
assert("searchContinents('AS', 'en') finds Asia", searchContByCode.some(c => c.code === "AS"));

// ========================================
// 8. getCity & searchCities (Dual name lookup)
// ========================================
console.log("\n🏙️  8. City APIs");
console.log("═".repeat(60));

const parisAr = getCity("Paris", "ar");
assert("getCity('Paris', 'ar') returns Arabic translation object", parisAr && parisAr.name === "Paris" && parisAr.translatedName === "باريس");

const parisByArabic = getCity("باريس", "ar");
assert("getCity('باريس', 'ar') finds city by translated name", parisByArabic && parisByArabic.name === "Paris" && parisByArabic.translatedName === "باريس");

assert("getCity with non-existent city returns undefined", getCity("NonExistent123") === undefined);
assert("getCity with null returns undefined", getCity(null) === undefined);

// ========================================
// 9. Supported Languages API
// ========================================
console.log("\n🌐 9. getSupportedLanguages() & LANGUAGES");
console.log("═".repeat(60));

const allLangs = getSupportedLanguages();
assert("getSupportedLanguages returns 10 languages", allLangs.length === 10);
assert("Every language has code, name, and nativeName", allLangs.every(l => l.code && l.name && l.nativeName));

const germanMeta = LANGUAGES["de"];
assert("LANGUAGES record contains German metadata", germanMeta && germanMeta.code === "de" && germanMeta.name === "German" && germanMeta.nativeName === "Deutsch");

const chineseMeta = LANGUAGES["zh"];
assert("LANGUAGES record contains Chinese metadata", chineseMeta && chineseMeta.code === "zh" && chineseMeta.name === "Chinese" && chineseMeta.nativeName === "中文");

const japaneseMeta = LANGUAGES["ja"];
assert("LANGUAGES record contains Japanese metadata", japaneseMeta && japaneseMeta.code === "ja" && japaneseMeta.name === "Japanese" && japaneseMeta.nativeName === "日本語");

const langSelectOptions = toSelectOptions(allLangs, { value: "code", label: "nativeName" });
assert("toSelectOptions works with getSupportedLanguages", langSelectOptions.length === 10 && langSelectOptions.some(o => o.value === "ar" && o.label === "العربية"));

// ========================================
// 10. Language Code Normalization
// ========================================
console.log("\n🌍 10. Language Code Normalization (locales & uppercase)");
console.log("═".repeat(60));

const frLocale = getCountry("FR", "fr-FR");
assert("getCountry with 'fr-FR' resolves to French", frLocale && frLocale.name === "France");

const ptLocale = getCountry("BR", "pt-BR");
assert("getCountry with 'pt-BR' resolves to Portuguese", ptLocale && ptLocale.name === "Brasil");

const deUpper = getCountry("DE", "DE");
assert("getCountry with uppercase 'DE' resolves to German", deUpper && deUpper.name === "Deutschland");

// ========================================
// 11. Sorting Utilities (Locale-Aware)
// ========================================
console.log("\n🔤 11. Sorting Utilities (Locale-Aware)");
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

import {
  getCountryName,
  getCountryFlag,
  getCountries,
  getContinentByCountry,
  getContinentName,
  getContinents,
  getCityName,
  getCities,
  searchCities,
  SUPPORTED_LANGUAGES,
} from "../dist/index.js";

console.log("╔════════════════════════════════════════════════════════════════╗");
console.log("║       COMPREHENSIVE PACKAGE TEST - 100% VERIFICATION          ║");
console.log("╚════════════════════════════════════════════════════════════════╝\n");

let testsPassed = 0;
let testsFailed = 0;
const errors: string[] = [];

function test(name: string, condition: boolean, errorMsg?: string) {
  if (condition) {
    testsPassed++;
    console.log(`✅ ${name}`);
  } else {
    testsFailed++;
    console.log(`❌ ${name}`);
    if (errorMsg) errors.push(errorMsg);
  }
}

// ========================================
// TEST 1: BASIC DATA INTEGRITY
// ========================================
console.log("\n📋 TEST 1: DATA INTEGRITY");
console.log("═".repeat(70));

const allCountries = getCountries('en');
const allContinents = getContinents('en');
const allCities = getCities('en');

test("Countries data exists", allCountries.length > 0);
test("Has exactly 250 countries", allCountries.length === 250, `Expected 250, got ${allCountries.length}`);
test("Continents data exists", allContinents.length > 0);
test("Has exactly 7 continents", allContinents.length === 7, `Expected 7, got ${allContinents.length}`);
test("Cities data exists", allCities.length > 0);
test("Has 4010 cities", allCities.length === 4010, `Expected 4010, got ${allCities.length}`);

// ========================================
// TEST 2: COUNTRY FUNCTIONS
// ========================================
console.log("\n\n🌍 TEST 2: COUNTRY FUNCTIONS");
console.log("═".repeat(70));

// Test getCountryName
test("getCountryName('US', 'en') returns United States", getCountryName('US', 'en') === 'United States');
test("getCountryName('FR', 'en') returns France", getCountryName('FR', 'en') === 'France');
test("getCountryName('FR', 'fr') returns France", getCountryName('FR', 'fr') === 'France');
test("getCountryName('FR', 'es') returns Francia", getCountryName('FR', 'es') === 'Francia');
test("getCountryName('ES', 'es') returns España", getCountryName('ES', 'es') === 'España');
test("getCountryName with invalid code returns code", getCountryName('ZZZ', 'en') === 'ZZZ');

// Test getCountryFlag
test("getCountryFlag('US') returns 🇺🇸", getCountryFlag('US') === '🇺🇸');
test("getCountryFlag('FR') returns 🇫🇷", getCountryFlag('FR') === '🇫🇷');
test("getCountryFlag('JP') returns 🇯🇵", getCountryFlag('JP') === '🇯🇵');
test("getCountryFlag with invalid code returns empty", getCountryFlag('ZZZ') === '');

// Test getCountries
const countriesEn = getCountries('en');
const countriesEs = getCountries('es');
test("getCountries('en') returns array", Array.isArray(countriesEn));
test("getCountries('es') returns array", Array.isArray(countriesEs));
test("All countries have required fields", countriesEn.every(c => c.code && c.name && c.continent && c.flag !== undefined));
test("Countries in Spanish are translated", countriesEs.some(c => c.code === 'ES' && c.name === 'España'));

// Test all countries have flags
const countriesWithFlags = allCountries.filter(c => c.flag && c.flag.length > 0);
test("All 250 countries have flags", countriesWithFlags.length === 250, `Only ${countriesWithFlags.length} have flags`);

// ========================================
// TEST 3: CONTINENT FUNCTIONS
// ========================================
console.log("\n\n🌎 TEST 3: CONTINENT FUNCTIONS");
console.log("═".repeat(70));

// Test getContinentName
test("getContinentName('EU', 'en') returns Europe", getContinentName('EU', 'en') === 'Europe');
test("getContinentName('AS', 'en') returns Asia", getContinentName('AS', 'en') === 'Asia');
test("getContinentName('AF', 'en') returns Africa", getContinentName('AF', 'en') === 'Africa');
test("getContinentName('EU', 'es') returns Europa", getContinentName('EU', 'es') === 'Europa');
test("getContinentName('EU', 'fr') returns Europe", getContinentName('EU', 'fr') === 'Europe');
test("getContinentName with invalid code returns code", getContinentName('ZZ', 'en') === 'ZZ');

// Test getContinents
const continentsEn = getContinents('en');
const continentsFr = getContinents('fr');
test("getContinents('en') returns 7 items", continentsEn.length === 7);
test("getContinents('fr') returns 7 items", continentsFr.length === 7);
test("All continents have code and name", continentsEn.every(c => c.code && c.name));
test("Continents in French are translated", continentsFr.some(c => c.code === 'AF' && c.name === 'Afrique'));

// Test getContinentByCountry
test("getContinentByCountry('US') returns NA", getContinentByCountry('US') === 'NA');
test("getContinentByCountry('FR') returns EU", getContinentByCountry('FR') === 'EU');
test("getContinentByCountry('JP') returns AS", getContinentByCountry('JP') === 'AS');
test("getContinentByCountry('BR') returns SA", getContinentByCountry('BR') === 'SA');
test("getContinentByCountry('EG') returns AF", getContinentByCountry('EG') === 'AF');
test("getContinentByCountry('AU') returns OC", getContinentByCountry('AU') === 'OC');
test("getContinentByCountry with invalid code returns undefined", getContinentByCountry('ZZZ') === undefined);

// ========================================
// TEST 4: CITY FUNCTIONS
// ========================================
console.log("\n\n🏙️ TEST 4: CITY FUNCTIONS");
console.log("═".repeat(70));

// Test getCityName
const parisEn = getCityName('Paris', 'en');
const parisFr = getCityName('Paris', 'fr');
const parisAr = getCityName('Paris', 'ar');
test("getCityName('Paris', 'en') returns Paris", parisEn === 'Paris');
test("getCityName('Paris', 'fr') returns Paris", parisFr === 'Paris');
test("getCityName('Paris', 'ar') returns Arabic translation", parisAr === 'باريس');
test("getCityName with invalid city returns city name", getCityName('NonExistentCity123', 'en') === 'NonExistentCity123');

// Test getCities
const citiesEn = getCities('en');
const citiesEs = getCities('es');
test("getCities('en') returns array", Array.isArray(citiesEn));
test("getCities('en') returns 4010 cities", citiesEn.length === 4010);
test("getCities('es') returns 4010 cities", citiesEs.length === 4010);
test("All cities have name and translatedName", citiesEn.every(c => c.name && c.translatedName));

// Test searchCities
const tokyoResults = searchCities('tokyo', 'en');
const parisResults = searchCities('paris', 'en');
const londonResults = searchCities('london', 'en', 5);
test("searchCities('tokyo', 'en') returns results", tokyoResults.length > 0);
test("searchCities('paris', 'en') returns results", parisResults.length > 0);
test("searchCities with limit respects limit", londonResults.length <= 5);
test("searchCities is case-insensitive", searchCities('TOKYO', 'en').length > 0);
test("searchCities returns objects with correct structure", tokyoResults.every(c => c.name && c.translatedName));

// ========================================
// TEST 5: MULTI-LANGUAGE SUPPORT
// ========================================
console.log("\n\n🌐 TEST 5: MULTI-LANGUAGE SUPPORT");
console.log("═".repeat(70));

test("SUPPORTED_LANGUAGES contains 5 languages", SUPPORTED_LANGUAGES.length === 5);
test("SUPPORTED_LANGUAGES contains 'en'", SUPPORTED_LANGUAGES.includes('en'));
test("SUPPORTED_LANGUAGES contains 'es'", SUPPORTED_LANGUAGES.includes('es'));
test("SUPPORTED_LANGUAGES contains 'fr'", SUPPORTED_LANGUAGES.includes('fr'));
test("SUPPORTED_LANGUAGES contains 'ar'", SUPPORTED_LANGUAGES.includes('ar'));
test("SUPPORTED_LANGUAGES contains 'nl'", SUPPORTED_LANGUAGES.includes('nl'));

// Test all languages work for countries
SUPPORTED_LANGUAGES.forEach(lang => {
  const countries = getCountries(lang);
  test(`getCountries('${lang}') returns 250 countries`, countries.length === 250);
});

// Test all languages work for continents
SUPPORTED_LANGUAGES.forEach(lang => {
  const continents = getContinents(lang);
  test(`getContinents('${lang}') returns 7 continents`, continents.length === 7);
});

// Test all languages work for cities
SUPPORTED_LANGUAGES.forEach(lang => {
  const cities = getCities(lang);
  test(`getCities('${lang}') returns 4010 cities`, cities.length === 4010);
});

// ========================================
// TEST 6: EDGE CASES & ERROR HANDLING
// ========================================
console.log("\n\n⚠️  TEST 6: EDGE CASES & ERROR HANDLING");
console.log("═".repeat(70));

test("getCountryName with empty string returns empty", getCountryName('', 'en') === '');
test("getCountryFlag with empty string returns empty", getCountryFlag('') === '');
test("getContinentName with empty string returns empty", getContinentName('', 'en') === '');
test("getCityName with empty string returns empty", getCityName('', 'en') === '');
test("searchCities with empty string returns empty array", searchCities('', 'en').length === 0);
test("searchCities with limit 0 returns empty array", searchCities('paris', 'en', 0).length === 0);

// Test case sensitivity
test("Country codes are case-insensitive", getCountryName('us', 'en') === getCountryName('US', 'en'));
test("Continent codes are case-insensitive", getContinentName('eu', 'en') === getContinentName('EU', 'en'));

// ========================================
// TEST 7: DATA CONSISTENCY
// ========================================
console.log("\n\n🔍 TEST 7: DATA CONSISTENCY");
console.log("═".repeat(70));

// Check all countries have valid continent codes
const validContinentCodes = ['AF', 'AN', 'AS', 'EU', 'NA', 'OC', 'SA'];
const invalidContinents = allCountries.filter(c => !validContinentCodes.includes(c.continent));
test("All countries have valid continent codes", invalidContinents.length === 0, 
  `Invalid continents: ${invalidContinents.map(c => `${c.code}:${c.continent}`).join(', ')}`);

// Check all continent codes are used
const usedContinents = new Set(allCountries.map(c => c.continent));
test("All 7 continents are represented", usedContinents.size === 7);

// Check for duplicate country codes
const countryCodes = allCountries.map(c => c.code);
const uniqueCodes = new Set(countryCodes);
test("No duplicate country codes", countryCodes.length === uniqueCodes.size);

// Check all countries have 2-letter codes
const invalidCodes = allCountries.filter(c => c.code.length !== 2);
test("All country codes are 2 letters", invalidCodes.length === 0);

// ========================================
// TEST 8: SPECIFIC COUNTRY SAMPLES
// ========================================
console.log("\n\n🗺️  TEST 8: SPECIFIC COUNTRY SAMPLES");
console.log("═".repeat(70));

const testCountries = [
  { code: 'US', name_en: 'United States', continent: 'NA', flag: '🇺🇸' },
  { code: 'GB', name_en: 'United Kingdom', continent: 'EU', flag: '🇬🇧' },
  { code: 'FR', name_en: 'France', continent: 'EU', flag: '🇫🇷' },
  { code: 'DE', name_en: 'Germany', continent: 'EU', flag: '🇩🇪' },
  { code: 'JP', name_en: 'Japan', continent: 'AS', flag: '🇯🇵' },
  { code: 'CN', name_en: 'China', continent: 'AS', flag: '🇨🇳' },
  { code: 'BR', name_en: 'Brazil', continent: 'SA', flag: '🇧🇷' },
  { code: 'AU', name_en: 'Australia', continent: 'OC', flag: '🇦🇺' },
  { code: 'EG', name_en: 'Egypt', continent: 'AF', flag: '🇪🇬' },
  { code: 'ZA', name_en: 'South Africa', continent: 'AF', flag: '🇿🇦' },
];

testCountries.forEach(tc => {
  test(`${tc.code}: name is "${tc.name_en}"`, getCountryName(tc.code, 'en') === tc.name_en);
  test(`${tc.code}: continent is ${tc.continent}`, getContinentByCountry(tc.code) === tc.continent);
  test(`${tc.code}: flag is ${tc.flag}`, getCountryFlag(tc.code) === tc.flag);
});

// ========================================
// TEST 9: PERFORMANCE CHECK
// ========================================
console.log("\n\n⚡ TEST 9: PERFORMANCE CHECK");
console.log("═".repeat(70));

const startTime = Date.now();
for (let i = 0; i < 100; i++) {
  getCountries('en');
  getContinents('en');
  getCities('en');
}
const endTime = Date.now();
const duration = endTime - startTime;

test("100 iterations complete in reasonable time", duration < 5000, `Took ${duration}ms`);
console.log(`   ⏱️  Time: ${duration}ms for 300 operations (${(duration/300).toFixed(2)}ms avg)`);

// ========================================
// TEST 10: EXPORT VERIFICATION
// ========================================
console.log("\n\n📦 TEST 10: EXPORTS VERIFICATION");
console.log("═".repeat(70));

test("getCountryName is exported", typeof getCountryName === 'function');
test("getCountryFlag is exported", typeof getCountryFlag === 'function');
test("getCountries is exported", typeof getCountries === 'function');
test("getContinentByCountry is exported", typeof getContinentByCountry === 'function');
test("getContinentName is exported", typeof getContinentName === 'function');
test("getContinents is exported", typeof getContinents === 'function');
test("getCityName is exported", typeof getCityName === 'function');
test("getCities is exported", typeof getCities === 'function');
test("searchCities is exported", typeof searchCities === 'function');
test("SUPPORTED_LANGUAGES is exported", Array.isArray(SUPPORTED_LANGUAGES));

// ========================================
// FINAL RESULTS
// ========================================
console.log("\n\n╔════════════════════════════════════════════════════════════════╗");
console.log("║                        TEST RESULTS                            ║");
console.log("╚════════════════════════════════════════════════════════════════╝");

const totalTests = testsPassed + testsFailed;
const successRate = ((testsPassed / totalTests) * 100).toFixed(1);

console.log(`\n✅ Tests Passed: ${testsPassed}/${totalTests}`);
console.log(`❌ Tests Failed: ${testsFailed}/${totalTests}`);
console.log(`📊 Success Rate: ${successRate}%`);

if (errors.length > 0) {
  console.log("\n⚠️  Errors:");
  errors.forEach((err, i) => console.log(`   ${i + 1}. ${err}`));
}

if (testsFailed === 0) {
  console.log("\n🎉 ALL TESTS PASSED! Package is working 100%! 🎉");
  console.log("✨ Your package is ready for production! ✨\n");
} else {
  console.log("\n⚠️  Some tests failed. Please review the errors above.\n");
  process.exit(1);
}

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

console.log("╔════════════════════════════════════════════════════════╗");
console.log("║   i18n-countries-continents - Full API + Flags Demo  ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

// ========================================
// COUNTRIES WITH FLAGS
// ========================================
console.log("🌍 COUNTRIES WITH FLAGS");
console.log("═".repeat(60));

console.log("\n1️⃣  Get country flag:");
const flagCodes = ['US', 'FR', 'JP', 'BR', 'DE', 'IN', 'MX', 'GB', 'CA', 'AU'];
flagCodes.forEach((code) => {
  const flag = getCountryFlag(code);
  const name = getCountryName(code, 'en');
  console.log(`   ${flag}  ${code} - ${name}`);
});

console.log("\n2️⃣  Get country name with flag in different languages:");
const testCode = 'ES';
console.log(`   Flag: ${getCountryFlag(testCode)}`);
console.log(`   English: ${getCountryName(testCode, "en")}`);
console.log(`   Spanish: ${getCountryName(testCode, "es")}`);
console.log(`   French:  ${getCountryName(testCode, "fr")}`);
console.log(`   Arabic:  ${getCountryName(testCode, "ar")}`);
console.log(`   Dutch:   ${getCountryName(testCode, "nl")}`);

console.log("\n3️⃣  Get all countries with flags (first 10 in English):");
const countriesEN = getCountries("en").slice(0, 10);
countriesEN.forEach((c) => {
  console.log(`   ${c.flag}  ${c.code} - ${c.name} (${c.continent})`);
});

console.log(`\n   Total countries with flags: ${getCountries().length}`);

console.log("\n4️⃣  Get continent by country with flag:");
const testCountries = ['US', 'FR', 'JP', 'BR', 'EG'];
testCountries.forEach(code => {
  const flag = getCountryFlag(code);
  const name = getCountryName(code, 'en');
  const continent = getContinentByCountry(code);
  const continentName = getContinentName(continent || '', 'en');
  console.log(`   ${flag}  ${code} - ${name} → ${continentName}`);
});

// ========================================
// CONTINENTS
// ========================================
console.log("\n\n🌎 CONTINENTS");
console.log("═".repeat(60));

console.log("\n5️⃣  Get continent name in different languages:");
console.log(`   EU (English): ${getContinentName("EU", "en")}`);
console.log(`   EU (Spanish): ${getContinentName("EU", "es")}`);
console.log(`   EU (French):  ${getContinentName("EU", "fr")}`);
console.log(`   EU (Arabic):  ${getContinentName("EU", "ar")}`);
console.log(`   EU (Dutch):   ${getContinentName("EU", "nl")}`);

console.log("\n6️⃣  Get all continents (in French):");
const continentsFR = getContinents("fr");
continentsFR.forEach((c) => {
  console.log(`   ${c.code} - ${c.name}`);
});

// ========================================
// CITIES
// ========================================
console.log("\n\n🏙️  CITIES");
console.log("═".repeat(60));

console.log("\n7️⃣  Get city name in different languages:");
console.log(`   Paris (English): ${getCityName("Paris", "en")}`);
console.log(`   Paris (Spanish): ${getCityName("Paris", "es")}`);
console.log(`   Paris (French):  ${getCityName("Paris", "fr")}`);
console.log(`   Paris (Arabic):  ${getCityName("Paris", "ar")}`);
console.log(`   Paris (Dutch):   ${getCityName("Paris", "nl")}`);

console.log("\n8️⃣  Search cities (searching for 'tokyo'):");
const tokyoCities = searchCities("tokyo", "en", 3);
tokyoCities.forEach((c) => {
  console.log(`   ${c.name} → ${c.translatedName}`);
});

console.log(`\n   Total cities: ${getCities().length}`);

// ========================================
// VERIFICATION
// ========================================
console.log("\n\n📊 DATA VERIFICATION");
console.log("═".repeat(60));

const allCountries = getCountries('en');
const countriesWithFlags = allCountries.filter((c) => c.flag);
const allContinents = getContinents('en');
const allCities = getCities('en');

console.log(`   Countries: ${allCountries.length}`);
console.log(`   Countries with flags: ${countriesWithFlags.length} (${(countriesWithFlags.length / allCountries.length * 100).toFixed(1)}%)`);
console.log(`   Continents: ${allContinents.length}`);
console.log(`   Cities: ${allCities.length}`);
console.log(`   Languages: ${SUPPORTED_LANGUAGES.length}`);

// ========================================
// FLAG SHOWCASE
// ========================================
console.log("\n\n🚩 FLAG SHOWCASE - Countries by Continent");
console.log("═".repeat(60));

const continents = [
  { code: 'AF', name: 'Africa', samples: ['EG', 'ZA', 'NG', 'MA'] },
  { code: 'AS', name: 'Asia', samples: ['JP', 'CN', 'IN', 'SA'] },
  { code: 'EU', name: 'Europe', samples: ['FR', 'DE', 'IT', 'ES'] },
  { code: 'NA', name: 'North America', samples: ['US', 'CA', 'MX', 'CU'] },
  { code: 'SA', name: 'South America', samples: ['BR', 'AR', 'CL', 'CO'] },
  { code: 'OC', name: 'Oceania', samples: ['AU', 'NZ', 'FJ', 'PG'] },
];

continents.forEach(cont => {
  console.log(`\n${cont.name}:`);
  cont.samples.forEach(code => {
    const country = allCountries.find((c) => c.code === code);
    if (country) {
      console.log(`   ${country.flag}  ${country.code} - ${country.name}`);
    }
  });
});

console.log("\n✨ All services including flags working perfectly!\n");

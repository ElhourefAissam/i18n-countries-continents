import {
  // Country services
  getCountryName,
  getCountries,
  getContinentByCountry,

  // Continent services
  getContinentName,
  getContinents,

  // City services
  getCityName,
  getCities,
  searchCities,

  // Constants
  SUPPORTED_LANGUAGES,
} from "../dist/index.js";

console.log("╔════════════════════════════════════════════════════════╗");
console.log("║   i18n-countries-continents - Full API Demo          ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

// ========================================
// COUNTRIES
// ========================================
console.log("🌍 COUNTRIES");
console.log("═".repeat(60));

console.log("\n1️⃣  Get country name in different languages:");
console.log(`   US (English): ${getCountryName("US", "en")}`);
console.log(`   US (Spanish): ${getCountryName("US", "es")}`);
console.log(`   US (French):  ${getCountryName("US", "fr")}`);
console.log(`   US (Arabic):  ${getCountryName("US", "ar")}`);
console.log(`   US (Dutch):   ${getCountryName("US", "nl")}`);

console.log("\n2️⃣  Get country name for various countries:");
console.log(`   MA (Spanish): ${getCountryName("MA", "es")}`);
console.log(`   JP (French):  ${getCountryName("JP", "fr")}`);
console.log(`   DE (Arabic):  ${getCountryName("DE", "ar")}`);
console.log(`   BR (Dutch):   ${getCountryName("BR", "nl")}`);

console.log("\n3️⃣  Get all countries (first 5 in Spanish):");
const countriesES = getCountries("es").slice(0, 5);
countriesES.forEach((c) => {
  console.log(`   ${c.code} - ${c.name} (${c.continent})`);
});

console.log(`\n   Total countries: ${getCountries().length}`);

console.log("\n4️⃣  Get continent by country code:");
console.log(`   US → ${getContinentByCountry("US")}`);
console.log(`   FR → ${getContinentByCountry("FR")}`);
console.log(`   JP → ${getContinentByCountry("JP")}`);
console.log(`   EG → ${getContinentByCountry("EG")}`);

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

console.log("\n8️⃣  Get city names for various cities:");
console.log(`   London (French):  ${getCityName("London", "fr")}`);
console.log(`   Tokyo (Arabic):   ${getCityName("Tokyo", "ar")}`);
console.log(`   New York (Spanish): ${getCityName("New York", "es")}`);
console.log(`   Amsterdam (Dutch):  ${getCityName("Amsterdam", "nl")}`);

console.log("\n9️⃣  Search cities (searching for 'york'):");
const yorkCities = searchCities("york", "en", 5);
yorkCities.forEach((c) => {
  console.log(`   ${c.name} → ${c.translatedName}`);
});

console.log("\n🔟 Search cities (searching for 'san' in Spanish):");
const sanCities = searchCities("san", "es", 5);
sanCities.forEach((c) => {
  console.log(`   ${c.name} → ${c.translatedName}`);
});

console.log("\n1️⃣1️⃣  Get all cities (first 10 in Arabic):");
const citiesAR = getCities("ar").slice(0, 10);
citiesAR.forEach((c) => {
  console.log(`   ${c.name} → ${c.translatedName}`);
});

console.log(`\n   Total cities: ${getCities().length}`);

// ========================================
// SUPPORTED LANGUAGES
// ========================================
console.log("\n\n🗣️  SUPPORTED LANGUAGES");
console.log("═".repeat(60));
console.log(`   ${SUPPORTED_LANGUAGES.join(", ")}`);

// ========================================
// SUMMARY
// ========================================
console.log("\n\n📊 SUMMARY");
console.log("═".repeat(60));
console.log(`   Countries: ${getCountries().length}`);
console.log(`   Continents: ${getContinents().length}`);
console.log(`   Cities: ${getCities().length}`);
console.log(`   Languages: ${SUPPORTED_LANGUAGES.length}`);

console.log("\n✨ All services working perfectly!\n");

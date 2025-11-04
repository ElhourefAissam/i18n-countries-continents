// Test file to verify the package works correctly
import {
  getCountryName,
  getCountries,
  getContinentByCountry,
  getContinentName,
  getContinents,
  SUPPORTED_LANGUAGES,
} from "./src/index";

console.log("=== Testing i18n-countries-continents ===\n");

// Test 1: Get country names in different languages
console.log("1. Country Names:");
console.log("  US in English:", getCountryName("US", "en"));
console.log("  US in Spanish:", getCountryName("US", "es"));
console.log("  US in French:", getCountryName("US", "fr"));
console.log("  US in Arabic:", getCountryName("US", "ar"));
console.log("  FR in English:", getCountryName("FR", "en"));
console.log("  JP in Spanish:", getCountryName("JP", "es"));
console.log("");

// Test 2: Get all countries
console.log("2. All Countries (English) - First 5:");
const countries = getCountries("en");
countries.slice(0, 5).forEach((c) => {
  console.log(`  ${c.code}: ${c.name} (Continent: ${c.continent})`);
});
console.log(`  Total countries: ${countries.length}\n`);

// Test 3: Get continent by country
console.log("3. Continent by Country:");
console.log("  US continent code:", getContinentByCountry("US"));
console.log("  FR continent code:", getContinentByCountry("FR"));
console.log("  JP continent code:", getContinentByCountry("JP"));
console.log("  AU continent code:", getContinentByCountry("AU"));
console.log("");

// Test 4: Get continent names
console.log("4. Continent Names:");
console.log("  NA in English:", getContinentName("NA", "en"));
console.log("  NA in Spanish:", getContinentName("NA", "es"));
console.log("  EU in French:", getContinentName("EU", "fr"));
console.log("  AS in Arabic:", getContinentName("AS", "ar"));
console.log("");

// Test 5: Get all continents
console.log("5. All Continents (Spanish):");
const continents = getContinents("es");
continents.forEach((c) => {
  console.log(`  ${c.code}: ${c.name}`);
});
console.log("");

// Test 6: Supported languages
console.log("6. Supported Languages:");
console.log("  ", SUPPORTED_LANGUAGES);
console.log("");

// Test 7: Case insensitivity
console.log("7. Case Insensitivity:");
console.log("  'us' (lowercase):", getCountryName("us", "en"));
console.log("  'US' (uppercase):", getCountryName("US", "en"));
console.log("  'Us' (mixed):", getCountryName("Us", "en"));
console.log("");

console.log("=== All tests completed! ===");

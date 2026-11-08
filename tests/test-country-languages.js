import assert from "node:assert";
import {
  getCountryLanguages,
  getCountriesBySpokenLanguage,
  getCountry,
  getCountries,
} from "../dist/index.js";

console.log("\n========================================");
console.log(" Testing Spoken Languages per Country");
console.log("========================================\n");

// 1. Data Integrity: all 250 countries have languages array
const countries = getCountries("en");
assert.strictEqual(countries.length, 250);

for (const c of countries) {
  assert(
    Array.isArray(c.languages),
    `Country ${c.code} must have an array of languages`
  );
}
console.log("  ✅ All 250 countries have an array of spoken languages");

// 2. Lookup tests
const chLangs = getCountryLanguages("CH");
assert(chLangs.includes("fr") && chLangs.includes("it"), "Switzerland speaks fr and it");

const frLangs = getCountryLanguages("FRA");
assert(frLangs.includes("fr"), "France speaks fr");

const usLangs = getCountryLanguages("US");
assert(usLangs.includes("en"), "US speaks en");
console.log("  ✅ getCountryLanguages returns official spoken language codes");

// 3. Edge cases
assert.deepStrictEqual(getCountryLanguages("INVALID"), []);
assert.deepStrictEqual(getCountryLanguages(""), []);
assert.deepStrictEqual(getCountryLanguages(null), []);
console.log("  ✅ Invalid codes return empty array gracefully");

// 4. getCountriesBySpokenLanguage
const francophone = getCountriesBySpokenLanguage("fr");
assert(francophone.some((c) => c.code === "FR"));
assert(francophone.some((c) => c.code === "BE"));
assert(francophone.some((c) => c.code === "CH"));
assert(francophone.some((c) => c.code === "CA"));

const arabic = getCountriesBySpokenLanguage("ar", "es");
assert(arabic.some((c) => c.code === "MA"));
assert(arabic.some((c) => c.code === "EG"));
assert(arabic.some((c) => c.code === "SA"));
console.log("  ✅ getCountriesBySpokenLanguage finds countries by language");

// 5. Country object integration
const ma = getCountry("MA");
assert(ma?.languages.includes("ar"));
console.log("  ✅ Country objects expose languages array");

console.log("\n----------------------------------------");
console.log("Results: 5 passed, 0 failed");
console.log("----------------------------------------\n");

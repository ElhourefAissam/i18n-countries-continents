import assert from "node:assert";
import {
  getDemonym,
  getCountryDemonym,
  getCountryByDemonym,
  getCountry,
  getCountries,
  searchCountries,
} from "../dist/index.js";

console.log("\n========================================");
console.log(" Testing Demonyms & Nationalities (getDemonym)");
console.log("========================================\n");

// 1. Data Integrity: 249 of 250 countries have demonym (BV Bouvet Island has none)
const countries = getCountries("en");
assert.strictEqual(countries.length, 250);
const withDemonym = countries.filter((c) => c.demonym && c.demonym.length > 0);
assert(withDemonym.length >= 249, "At least 249 countries should have demonym");
console.log("  ✅ Demonyms present across countries");

// 2. Lookup tests
assert.strictEqual(getDemonym("US"), "American");
assert.strictEqual(getDemonym("USA"), "American");
assert.strictEqual(getDemonym("FR"), "French");
assert.strictEqual(getCountryDemonym("DE"), "German");
assert.strictEqual(getDemonym("MA"), "Moroccan");
assert.strictEqual(getDemonym("JP"), "Japanese");
assert.strictEqual(getDemonym("ES"), "Spanish");
console.log("  ✅ getDemonym returns correct English nationality");

// 3. Edge cases
assert.strictEqual(getDemonym("INVALID"), undefined);
assert.strictEqual(getDemonym(""), undefined);
assert.strictEqual(getDemonym(null), undefined);
console.log("  ✅ Invalid codes return undefined gracefully");

// 4. Reverse lookup getCountryByDemonym
const us = getCountryByDemonym("American");
assert.strictEqual(us?.code, "US");

const fr = getCountryByDemonym("French", "es");
assert.strictEqual(fr?.code, "FR");
assert.strictEqual(fr?.name, "Francia");

assert.strictEqual(getCountryByDemonym("Martian"), undefined);
assert.strictEqual(getCountryByDemonym(""), undefined);
console.log("  ✅ getCountryByDemonym reverse lookup works seamlessly");

// 5. Search integration
const searchMoroccan = searchCountries("Moroccan");
assert(searchMoroccan.length > 0 && searchMoroccan[0].code === "MA");
console.log("  ✅ searchCountries finds country by demonym query");

console.log("\n----------------------------------------");
console.log("Results: 5 passed, 0 failed");
console.log("----------------------------------------\n");

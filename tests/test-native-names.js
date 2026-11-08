import assert from "node:assert";
import {
  getNativeName,
  getCountryNativeName,
  getCountry,
  getCountries,
  searchCountries,
} from "../dist/index.js";

console.log("\n========================================");
console.log(" Testing Native Endonyms (nativeName)");
console.log("========================================\n");

// 1. Data Integrity: all 250 countries have nativeName
const countries = getCountries("en");
assert.strictEqual(countries.length, 250);
const withNative = countries.filter((c) => c.nativeName && c.nativeName.length > 0);
assert.strictEqual(
  withNative.length,
  250,
  "All 250 countries should have a nativeName"
);
console.log("  ✅ All 250 countries have a valid nativeName");

// 2. Lookup tests
assert.strictEqual(getNativeName("DE"), "Deutschland");
assert.strictEqual(getNativeName("DEU"), "Deutschland");
assert.strictEqual(getNativeName("JP"), "日本");
assert.strictEqual(getNativeName("JPN"), "日本");
assert.strictEqual(getNativeName("MA"), "المغرب");
assert.strictEqual(getNativeName("GR"), "Ελλάδα");
assert.strictEqual(getNativeName("FR"), "France");
assert.strictEqual(getNativeName("ES"), "España");
assert.strictEqual(getCountryNativeName("US"), "United States");
console.log("  ✅ getNativeName returns accurate local endonyms");

// 3. Edge cases
assert.strictEqual(getNativeName("INVALID"), undefined);
assert.strictEqual(getNativeName(""), undefined);
assert.strictEqual(getNativeName(null), undefined);
console.log("  ✅ Edge cases return undefined gracefully");

// 4. Country object includes nativeName
const de = getCountry("DE");
assert.strictEqual(de?.nativeName, "Deutschland");
const jp = getCountry("JP");
assert.strictEqual(jp?.nativeName, "日本");
console.log("  ✅ Country objects include nativeName property");

// 5. Search integration
const searchDe = searchCountries("Deutschland");
assert(searchDe.length > 0 && searchDe[0].code === "DE");

const searchMa = searchCountries("المغرب");
assert(searchMa.length > 0 && searchMa[0].code === "MA");
console.log("  ✅ searchCountries matches country by native endonym");

console.log("\n----------------------------------------");
console.log("Results: 5 passed, 0 failed");
console.log("----------------------------------------\n");

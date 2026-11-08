import assert from "node:assert";
import {
  isEU,
  isSchengen,
  isEEA,
  getEUCountries,
  getSchengenCountries,
  getEEACountries,
  getCountry,
  getCountries,
} from "../dist/index.js";

console.log("\n========================================");
console.log(" Testing Regional & Geopolitical Unions (EU, Schengen, EEA)");
console.log("========================================\n");

// 1. European Union (EU)
assert.strictEqual(isEU("FR"), true, "France is in EU");
assert.strictEqual(isEU("FRA"), true, "FRA alpha-3 is in EU");
assert.strictEqual(isEU("DE"), true, "Germany is in EU");
assert.strictEqual(isEU("IT"), true, "Italy is in EU");
assert.strictEqual(isEU("ES"), true, "Spain is in EU");
assert.strictEqual(isEU("GB"), false, "UK is not in EU (post-Brexit)");
assert.strictEqual(isEU("US"), false, "US is not in EU");
assert.strictEqual(isEU("CH"), false, "Switzerland is not in EU");
assert.strictEqual(isEU(""), false);
assert.strictEqual(isEU(null), false);
assert.strictEqual(isEU("INVALID"), false);

const euCountries = getEUCountries("en");
assert.strictEqual(euCountries.length, 27, "EU should have exactly 27 member states");
const euEs = getEUCountries("es");
assert.strictEqual(euEs.length, 27);
assert(euEs.every((c) => c.isEU === true), "All EU countries must have isEU === true");
console.log("  ✅ isEU and getEUCountries verified for 27 member states");

// 2. Schengen Area
assert.strictEqual(isSchengen("CH"), true, "Switzerland is in Schengen (non-EU)");
assert.strictEqual(isSchengen("CHE"), true, "CHE alpha-3 is in Schengen");
assert.strictEqual(isSchengen("IS"), true, "Iceland is in Schengen");
assert.strictEqual(isSchengen("NO"), true, "Norway is in Schengen");
assert.strictEqual(isSchengen("FR"), true, "France is in Schengen");
assert.strictEqual(isSchengen("GB"), false, "UK is not in Schengen");
assert.strictEqual(isSchengen("US"), false, "US is not in Schengen");

const schengenCountries = getSchengenCountries("en");
assert.strictEqual(schengenCountries.length, 29, "Schengen should have exactly 29 member states");
assert(schengenCountries.every((c) => c.isSchengen === true), "All Schengen countries must have isSchengen === true");
console.log("  ✅ isSchengen and getSchengenCountries verified for 29 member states");

// 3. European Economic Area (EEA)
assert.strictEqual(isEEA("NO"), true, "Norway is in EEA");
assert.strictEqual(isEEA("IS"), true, "Iceland is in EEA");
assert.strictEqual(isEEA("LI"), true, "Liechtenstein is in EEA");
assert.strictEqual(isEEA("FR"), true, "France is in EEA (EU member)");
assert.strictEqual(isEEA("CH"), false, "Switzerland is EFTA but not formal EEA");
assert.strictEqual(isEEA("US"), false, "US is not in EEA");

const eeaCountries = getEEACountries("en");
assert.strictEqual(eeaCountries.length, 30, "EEA should have exactly 30 member states");
assert(eeaCountries.every((c) => c.isEEA === true), "All EEA countries must have isEEA === true");
console.log("  ✅ isEEA and getEEACountries verified for 30 member states");

// 4. Country object integration
const france = getCountry("FR");
assert.strictEqual(france?.isEU, true);
assert.strictEqual(france?.isSchengen, true);
assert.strictEqual(france?.isEEA, true);

const switzerland = getCountry("CH");
assert.strictEqual(switzerland?.isEU, false);
assert.strictEqual(switzerland?.isSchengen, true);
assert.strictEqual(switzerland?.isEEA, false);

const usa = getCountry("US");
assert.strictEqual(usa?.isEU, false);
assert.strictEqual(usa?.isSchengen, false);
assert.strictEqual(usa?.isEEA, false);

console.log("  ✅ Country objects correctly expose isEU, isSchengen, and isEEA");

console.log("\n----------------------------------------");
console.log("Results: 4 passed, 0 failed");
console.log("----------------------------------------\n");

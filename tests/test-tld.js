import assert from "node:assert";
import {
  getTld,
  getCountryTld,
  getCountryByTld,
  getCountries,
  searchCountries,
} from "../dist/index.js";

console.log("\n========================================");
console.log(" Testing Country-Code Top-Level Domains (ccTLD)");
console.log("========================================\n");

// 1. Data Integrity: all 250 countries have tld
const countries = getCountries("en");
assert.strictEqual(countries.length, 250);
const withTld = countries.filter((c) => c.tld && c.tld.startsWith("."));
assert.strictEqual(
  withTld.length,
  250,
  "All 250 countries should have valid ccTLD"
);
console.log("  ✅ All 250 countries have a valid ccTLD");

// 2. Lookup tests
assert.strictEqual(getTld("US"), ".us");
assert.strictEqual(getTld("FR"), ".fr");
assert.strictEqual(getTld("FRA"), ".fr");
assert.strictEqual(getTld("de"), ".de");
assert.strictEqual(getTld("MA"), ".ma");
assert.strictEqual(getTld("JP"), ".jp");
assert.strictEqual(getCountryTld("GB"), ".uk");
console.log("  ✅ getTld returns correct ccTLD for alpha-2 and alpha-3 codes");

// 3. Edge cases
assert.strictEqual(getTld("INVALID"), undefined);
assert.strictEqual(getTld(""), undefined);
assert.strictEqual(getTld(null), undefined);
assert.strictEqual(getTld(undefined), undefined);
console.log("  ✅ Invalid codes return undefined gracefully");

// 4. Reverse lookup getCountryByTld
const fr = getCountryByTld(".fr");
assert.strictEqual(fr?.code, "FR");
assert.strictEqual(fr?.name, "France");

const de = getCountryByTld("de", "es");
assert.strictEqual(de?.code, "DE");
assert.strictEqual(de?.name, "Alemania");

const us = getCountryByTld(".us");
assert.strictEqual(us?.code, "US");

assert.strictEqual(getCountryByTld(".invalid"), undefined);
assert.strictEqual(getCountryByTld(""), undefined);
console.log("  ✅ getCountryByTld reverse lookup works with or without leading dot");

// 5. Search integration
const searchFr = searchCountries(".fr");
assert(searchFr.length > 0 && searchFr[0].code === "FR");

const searchMa = searchCountries(".ma");
assert(searchMa.length > 0 && searchMa[0].code === "MA");
console.log("  ✅ searchCountries finds countries by ccTLD");

console.log("\n----------------------------------------");
console.log("Results: 5 passed, 0 failed");
console.log("----------------------------------------\n");

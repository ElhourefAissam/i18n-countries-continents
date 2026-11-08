import assert from "node:assert";
import { getCountries, getCountry } from "../dist/index.js";

console.log("\n========================================");
console.log(" Testing Strict Types & Code Coverage");
console.log("========================================\n");

const countries = getCountries("en");
assert.strictEqual(countries.length, 250, "Should have 250 countries");

// Test that known codes work seamlessly
const us = getCountry("US");
assert.strictEqual(us?.name, "United States", "US alpha-2 lookup");

const fra = getCountry("FRA");
assert.strictEqual(fra?.name, "France", "FRA alpha-3 lookup");

console.log("  ✅ Strict literal types compile and runtime lookups pass");
console.log("\n----------------------------------------");
console.log("Results: 1 passed, 0 failed");
console.log("----------------------------------------\n");

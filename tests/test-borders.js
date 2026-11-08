import assert from "node:assert";
import {
  getBorders,
  getCountryBorders,
  getCountry,
  getCountries,
} from "../dist/index.js";

console.log("\n========================================");
console.log(" Testing Neighboring Borders (getBorders & getCountryBorders)");
console.log("========================================\n");

// 1. Data Integrity: all 250 countries have borders array
const countries = getCountries("en");
assert.strictEqual(countries.length, 250);

for (const c of countries) {
  assert(
    Array.isArray(c.borders),
    `Country ${c.code} must have an array of borders`
  );
}
console.log("  ✅ All 250 countries have an array of borders");

// 2. Lookup tests
const usBorders = getBorders("US");
assert.deepStrictEqual(usBorders.sort(), ["CA", "MX"].sort());

const frBorders = getBorders("FRA");
assert(frBorders.includes("DE"));
assert(frBorders.includes("ES"));
assert(frBorders.includes("IT"));
assert(frBorders.includes("BE"));

const jpBorders = getBorders("JP");
assert.deepStrictEqual(jpBorders, [], "Japan has no land borders");

const madagascarBorders = getBorders("MG");
assert.deepStrictEqual(madagascarBorders, [], "Madagascar has no land borders");
console.log("  ✅ getBorders returns accurate alpha-2 country codes");

// 3. Edge cases
assert.deepStrictEqual(getBorders("INVALID"), []);
assert.deepStrictEqual(getBorders(""), []);
assert.deepStrictEqual(getBorders(null), []);
console.log("  ✅ Invalid codes return empty array gracefully");

// 4. getCountryBorders returns localized Country objects
const usNeighborsEs = getCountryBorders("US", "es");
assert.strictEqual(usNeighborsEs.length, 2);
const neighborCodes = usNeighborsEs.map((c) => c.code).sort();
assert.deepStrictEqual(neighborCodes, ["CA", "MX"]);
const canada = usNeighborsEs.find((c) => c.code === "CA");
assert.strictEqual(canada?.name, "Canadá");

const jpNeighbors = getCountryBorders("JP");
assert.deepStrictEqual(jpNeighbors, []);
console.log("  ✅ getCountryBorders returns fully localized Country objects");

// 5. Country object integration
const fr = getCountry("FR");
assert(fr?.borders.includes("DE"));
console.log("  ✅ Country objects expose borders array");

console.log("\n----------------------------------------");
console.log("Results: 5 passed, 0 failed");
console.log("----------------------------------------\n");

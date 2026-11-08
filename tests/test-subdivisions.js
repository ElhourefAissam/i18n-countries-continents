import assert from "node:assert";
import {
  getSubdivisions,
  getSubdivision,
  hasSubdivisions,
} from "../dist/index.js";

console.log("\n========================================");
console.log(" Testing Subdivisions / States / Provinces (ISO 3166-2)");
console.log("========================================\n");

// 1. Availability check
assert.strictEqual(hasSubdivisions("US"), true);
assert.strictEqual(hasSubdivisions("USA"), true);
assert.strictEqual(hasSubdivisions("CA"), true);
assert.strictEqual(hasSubdivisions("AU"), true);
assert.strictEqual(hasSubdivisions("DE"), true);
assert.strictEqual(hasSubdivisions("FR"), true);
assert.strictEqual(hasSubdivisions("ES"), true);
assert.strictEqual(hasSubdivisions("IT"), true);
assert.strictEqual(hasSubdivisions("MX"), true);
assert.strictEqual(hasSubdivisions("BR"), true);
assert.strictEqual(hasSubdivisions("JP"), true);
assert.strictEqual(hasSubdivisions("INVALID"), false);
console.log("  ✅ hasSubdivisions correctly identifies countries with subdivision data");

// 2. US States
const usStates = getSubdivisions("US");
assert.strictEqual(usStates.length, 51, "US should have 50 states + DC");
const cali = getSubdivision("US", "CA");
assert.strictEqual(cali?.code, "CA");
assert.strictEqual(cali?.name, "California");
assert.strictEqual(cali?.type, "state");

const ny = getSubdivision("USA", "ny");
assert.strictEqual(ny?.name, "New York");
console.log("  ✅ getSubdivisions('US') returns all 50 states + DC");

// 3. Canada Provinces & Territories
const caProvinces = getSubdivisions("CA");
assert.strictEqual(caProvinces.length, 13, "Canada has 10 provinces + 3 territories");
const ontario = getSubdivision("CA", "ON");
assert.strictEqual(ontario?.name, "Ontario");
console.log("  ✅ Canadian provinces and territories verified");

// 4. Germany Bundesländer & France Regions
const deStates = getSubdivisions("DE");
assert.strictEqual(deStates.length, 16, "Germany has 16 states");
const bavaria = getSubdivision("DE", "BY");
assert.strictEqual(bavaria?.name, "Bayern");

const frRegions = getSubdivisions("FR");
assert.strictEqual(frRegions.length, 18, "France has 18 regions");
const idf = getSubdivision("FR", "IDF");
assert.strictEqual(idf?.name, "Île-de-France");
console.log("  ✅ European subdivisions (Germany, France) verified");

// 5. Edge cases
assert.deepStrictEqual(getSubdivisions("INVALID"), []);
assert.deepStrictEqual(getSubdivisions(""), []);
assert.strictEqual(getSubdivision("US", "INVALID"), undefined);
assert.strictEqual(getSubdivision("INVALID", "CA"), undefined);
console.log("  ✅ Edge cases return empty array or undefined gracefully");

console.log("\n----------------------------------------");
console.log("Results: 5 passed, 0 failed");
console.log("----------------------------------------\n");

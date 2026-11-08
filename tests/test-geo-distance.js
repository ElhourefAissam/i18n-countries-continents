import assert from "node:assert";
import {
  getDistance,
  getNearestCountries,
} from "../dist/index.js";

console.log("\n========================================");
console.log(" Testing Geodesic Distance & Nearest Countries (Haversine)");
console.log("========================================\n");

// 1. Geodesic distance in kilometers
const distFrGb = getDistance("FR", "GB");
assert(typeof distFrGb === "number");
assert(distFrGb > 700 && distFrGb < 1100, `FR to GB distance should be ~867 km, got ${distFrGb}`);

const distUsCa = getDistance("USA", "CAN");
assert(typeof distUsCa === "number");
assert(distUsCa > 1800 && distUsCa < 3000, `US to CA distance should be ~2260 km, got ${distUsCa}`);

// Same country distance should be 0
const distUsUs = getDistance("US", "US");
assert.strictEqual(distUsUs, 0);

console.log("  ✅ getDistance calculates great-circle distance in kilometers");

// 2. Geodesic distance in miles
const distFrGbMiles = getDistance("FR", "GB", "miles");
assert(typeof distFrGbMiles === "number");
assert(distFrGbMiles > 400 && distFrGbMiles < 700, `FR to GB miles should be ~539 miles, got ${distFrGbMiles}`);
console.log("  ✅ getDistance supports miles unit option");

// 3. Edge cases
assert.strictEqual(getDistance("INVALID", "FR"), undefined);
assert.strictEqual(getDistance("FR", "INVALID"), undefined);
assert.strictEqual(getDistance("", ""), undefined);
console.log("  ✅ Invalid codes return undefined gracefully");

// 4. Nearest countries
const nearestUs = getNearestCountries("US", 3);
assert.strictEqual(nearestUs.length, 3);
const nearestCodes = nearestUs.map((x) => x.country.code);
assert(nearestCodes.includes("CA") || nearestCodes.includes("BS") || nearestCodes.includes("CU"));
assert(nearestUs[0].distanceKm < nearestUs[1].distanceKm);
assert(nearestUs[1].distanceKm < nearestUs[2].distanceKm);

const nearestFr = getNearestCountries("FR", 5, "es");
assert.strictEqual(nearestFr.length, 5);
const frNeighborCodes = nearestFr.map((x) => x.country.code);
assert(frNeighborCodes.includes("BE") || frNeighborCodes.includes("LU") || frNeighborCodes.includes("CH") || frNeighborCodes.includes("AD"));
console.log("  ✅ getNearestCountries returns closest countries sorted nearest-first");

console.log("\n----------------------------------------");
console.log("Results: 4 passed, 0 failed");
console.log("----------------------------------------\n");

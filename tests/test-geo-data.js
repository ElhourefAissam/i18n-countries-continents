import assert from "node:assert";
import {
  getCoordinates,
  getCountryCoordinates,
  isLandlocked,
  getArea,
  getCountryArea,
  getCountry,
  getCountries,
} from "../dist/index.js";

console.log("\n========================================");
console.log(" Testing Geographic Coordinates, Area & Landlocked Status");
console.log("========================================\n");

// 1. Data Integrity: all 250 countries have coordinates, area, landlocked
const countries = getCountries("en");
assert.strictEqual(countries.length, 250);

for (const c of countries) {
  assert(
    typeof c.coordinates?.lat === "number" &&
      typeof c.coordinates?.lng === "number",
    `Country ${c.code} must have numeric coordinates`
  );
  assert(typeof c.area === "number", `Country ${c.code} must have numeric area`);
  assert(
    typeof c.landlocked === "boolean",
    `Country ${c.code} must have boolean landlocked`
  );
}
console.log("  ✅ All 250 countries have complete geo attributes (coordinates, area, landlocked)");

// 2. Coordinates lookup
const usCoords = getCoordinates("US");
assert.strictEqual(typeof usCoords?.lat, "number");
assert.strictEqual(typeof usCoords?.lng, "number");

const fraCoords = getCountryCoordinates("FRA");
assert.strictEqual(fraCoords?.lat, 46);
assert.strictEqual(fraCoords?.lng, 2);
console.log("  ✅ getCoordinates returns latitude and longitude");

// 3. Landlocked status
assert.strictEqual(isLandlocked("CH"), true, "Switzerland is landlocked");
assert.strictEqual(isLandlocked("CHE"), true, "CHE is landlocked");
assert.strictEqual(isLandlocked("AT"), true, "Austria is landlocked");
assert.strictEqual(isLandlocked("BO"), true, "Bolivia is landlocked");
assert.strictEqual(isLandlocked("FR"), false, "France has coastlines");
assert.strictEqual(isLandlocked("US"), false, "US has coastlines");
assert.strictEqual(isLandlocked("INVALID"), false);
console.log("  ✅ isLandlocked correctly identifies landlocked nations");

// 4. Area
assert.strictEqual(getArea("FR"), 551695);
assert.strictEqual(getCountryArea("FRA"), 551695);
assert.strictEqual(getArea("INVALID"), undefined);
console.log("  ✅ getArea returns surface area in km²");

// 5. Country object integration
const ch = getCountry("CH");
assert.strictEqual(ch?.landlocked, true);
assert.strictEqual(ch?.area, 41284);
assert.strictEqual(ch?.coordinates.lat, 47);
console.log("  ✅ Country objects expose coordinates, area, and landlocked properties");

console.log("\n----------------------------------------");
console.log("Results: 5 passed, 0 failed");
console.log("----------------------------------------\n");

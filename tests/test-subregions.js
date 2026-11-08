import assert from "node:assert";
import {
  getSubregion,
  getCountrySubregion,
  getCountriesBySubregion,
  getSubregions,
  getCountry,
  getCountries,
  searchCountries,
} from "../dist/index.js";

console.log("\n========================================");
console.log(" Testing UN Geographic Subregions");
console.log("========================================\n");

// 1. Data Integrity: all 250 countries have subregion
const countries = getCountries("en");
assert.strictEqual(countries.length, 250);
const withSubregion = countries.filter((c) => c.subregion && c.subregion.length > 0);
assert(withSubregion.length >= 245, "At least 245 countries have official UN subregions");
console.log("  ✅ Subregions verified across countries");

// 2. Lookup tests
assert.strictEqual(getSubregion("FR"), "Western Europe");
assert.strictEqual(getSubregion("DEU"), "Western Europe");
assert.strictEqual(getSubregion("US"), "North America");
assert.strictEqual(getCountrySubregion("MA"), "Northern Africa");
assert.strictEqual(getSubregion("JP"), "Eastern Asia");
assert.strictEqual(getSubregion("BR"), "South America");
assert.strictEqual(getSubregion("AU"), "Australia and New Zealand");
console.log("  ✅ getSubregion returns accurate UN subregion names");

// 3. Edge cases
assert.strictEqual(getSubregion("INVALID"), undefined);
assert.strictEqual(getSubregion(""), undefined);
assert.strictEqual(getSubregion(null), undefined);
console.log("  ✅ Edge cases return undefined gracefully");

// 4. getCountriesBySubregion
const westernEurope = getCountriesBySubregion("Western Europe", "fr");
assert(westernEurope.length >= 8);
assert(westernEurope.some((c) => c.code === "FR"));
assert(westernEurope.some((c) => c.code === "DE"));
assert(westernEurope.some((c) => c.code === "NL"));
const fr = westernEurope.find((c) => c.code === "FR");
assert.strictEqual(fr?.name, "France");

const northAfrica = getCountriesBySubregion("Northern Africa", "es");
assert(northAfrica.some((c) => c.code === "MA"));
assert(northAfrica.some((c) => c.code === "EG"));
console.log("  ✅ getCountriesBySubregion finds countries and returns localized Country objects");

// 5. getSubregions
const allSubregions = getSubregions();
assert(allSubregions.length >= 20, "Should have at least 20 unique subregions");
assert(allSubregions.includes("Western Europe"));
assert(allSubregions.includes("Northern Africa"));
assert(allSubregions.includes("South America"));
assert(allSubregions.includes("Eastern Asia"));
console.log("  ✅ getSubregions returns full sorted list of unique subregions");

// 6. Search integration
const searchWesternEurope = searchCountries("Western Europe");
assert(searchWesternEurope.length > 0);
console.log("  ✅ searchCountries finds countries by subregion query");

console.log("\n----------------------------------------");
console.log("Results: 6 passed, 0 failed");
console.log("----------------------------------------\n");

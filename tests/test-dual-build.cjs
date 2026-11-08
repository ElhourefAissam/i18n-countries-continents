const assert = require("node:assert");

console.log("\n========================================");
console.log(" Testing CommonJS (CJS) Dual Build Compatibility");
console.log("========================================\n");

// 1. Require main entry point in CommonJS
const pkg = require("../dist/index.cjs");
assert(typeof pkg.getCountry === "function", "pkg.getCountry must be a function");
assert(typeof pkg.getCountries === "function", "pkg.getCountries must be a function");
assert(typeof pkg.isEU === "function", "pkg.isEU must be a function");
assert(typeof pkg.getDistance === "function", "pkg.getDistance must be a function");
assert(typeof pkg.getSubdivisions === "function", "pkg.getSubdivisions must be a function");

const us = pkg.getCountry("US");
assert.strictEqual(us?.name, "United States");
assert.strictEqual(us?.subregion, "North America");
assert.strictEqual(pkg.isEU("FR"), true);
assert.strictEqual(pkg.isEU("US"), false);
console.log("  ✅ Main CJS entry point (dist/index.cjs) works cleanly with require()");

// 2. Require individual subpaths in CommonJS
const getCountryMod = require("../dist/services/countries/get-country.cjs");
const getCountry = getCountryMod.default || getCountryMod;
assert.strictEqual(getCountry("FR").name, "France");

const unionsMod = require("../dist/services/countries/regional-unions.cjs");
assert.strictEqual(unionsMod.isEU("DE"), true);

const geoDistMod = require("../dist/services/countries/geo-distance.cjs");
const getDistance = geoDistMod.getDistance || geoDistMod.default;
assert(typeof getDistance("US", "CA") === "number");

const subregionsMod = require("../dist/services/countries/subregions.cjs");
const getSubregion = subregionsMod.getSubregion || subregionsMod.default;
assert.strictEqual(getSubregion("JP"), "Eastern Asia");

const subdivMod = require("../dist/services/countries/subdivisions.cjs");
const getSubdivisions = subdivMod.getSubdivisions || subdivMod.default;
assert.strictEqual(getSubdivisions("US").length, 51);
assert.strictEqual(subdivMod.searchSubdivisions("Maharashtra")[0].code, "MH");

const citiesMod = require("../dist/services/cities/index.cjs");
const getCities = citiesMod.getCities || citiesMod.default;
assert.strictEqual(getCities("ru").length, 4010);
assert.strictEqual(citiesMod.getCityName("Moscow", "ru"), "Москва");

console.log("  ✅ Individual subpaths (.cjs) work cleanly in CommonJS");

console.log("\n----------------------------------------");
console.log("Results: 2 passed, 0 failed");
console.log("----------------------------------------\n");

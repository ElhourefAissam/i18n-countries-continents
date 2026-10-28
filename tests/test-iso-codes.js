import {
  getCountries,
  getCountry,
  getCountryByAlpha3,
  getCountryByNumeric,
  alpha2ToAlpha3,
  alpha3ToAlpha2,
  alpha2ToNumeric,
  numericToAlpha2,
  searchCountries,
} from "../dist/index.js";

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

console.log("\n========================================");
console.log(" Testing ISO 3166-1 Alpha-3 & Numeric Codes");
console.log("========================================\n");

// 1. Data presence across all 250 countries
const countries = getCountries("en");
assert(countries.length === 250, "getCountries('en') returns 250 countries");

const allHaveAlpha3 = countries.every(
  (c) => typeof c.alpha3 === "string" && c.alpha3.length === 3
);
assert(allHaveAlpha3, "All 250 countries have valid 3-letter alpha3 code");

const allHaveNumeric = countries.every(
  (c) => typeof c.numeric === "string" && c.numeric.length === 3 && /^\d{3}$/.test(c.numeric)
);
assert(allHaveNumeric, "All 250 countries have valid 3-digit numeric code");

// 2. Specific country checks
const us = getCountry("US");
assert(us && us.alpha3 === "USA" && us.numeric === "840", "US has alpha3 'USA' and numeric '840'");

const fr = getCountry("FR");
assert(fr && fr.alpha3 === "FRA" && fr.numeric === "250", "FR has alpha3 'FRA' and numeric '250'");

const ma = getCountry("MA");
assert(ma && ma.alpha3 === "MAR" && ma.numeric === "504", "MA has alpha3 'MAR' and numeric '504'");

const jp = getCountry("JP");
assert(jp && jp.alpha3 === "JPN" && jp.numeric === "392", "JP has alpha3 'JPN' and numeric '392'");

const af = getCountry("AF");
assert(af && af.alpha3 === "AFG" && af.numeric === "004", "AF has numeric with leading zeros '004'");

// 3. getCountry with 3-letter alpha3 code
const usByA3 = getCountry("USA");
assert(usByA3 && usByA3.code === "US" && usByA3.name === "United States", "getCountry('USA') resolves to US");

const frByA3 = getCountry("fra", "es");
assert(frByA3 && frByA3.code === "FR" && frByA3.name === "Francia", "getCountry('fra', 'es') is case-insensitive and localized");

// 4. getCountryByAlpha3
const deByAlpha3 = getCountryByAlpha3("DEU", "en");
assert(deByAlpha3 && deByAlpha3.code === "DE" && deByAlpha3.name === "Germany", "getCountryByAlpha3('DEU') returns Germany");

const invalidAlpha3 = getCountryByAlpha3("XYZ");
assert(invalidAlpha3 === undefined, "getCountryByAlpha3('XYZ') returns undefined");

const nullAlpha3 = getCountryByAlpha3(null);
assert(nullAlpha3 === undefined, "getCountryByAlpha3(null) returns undefined");

// 5. getCountryByNumeric
const usByNum = getCountryByNumeric("840");
assert(usByNum && usByNum.code === "US", "getCountryByNumeric('840') returns US");

const frByNumInt = getCountryByNumeric(250);
assert(frByNumInt && frByNumInt.code === "FR", "getCountryByNumeric(250 as number) returns FR");

const afByNumShort = getCountryByNumeric("4");
assert(afByNumShort && afByNumShort.code === "AF", "getCountryByNumeric('4') resolves '004' to AF");

const invalidNum = getCountryByNumeric("9999");
assert(invalidNum === undefined, "getCountryByNumeric('9999') returns undefined");

// 6. Conversion helpers
assert(alpha2ToAlpha3("US") === "USA", "alpha2ToAlpha3('US') returns 'USA'");
assert(alpha2ToAlpha3("us") === "USA", "alpha2ToAlpha3('us') is case-insensitive");
assert(alpha2ToAlpha3("XX") === undefined, "alpha2ToAlpha3('XX') returns undefined");

assert(alpha3ToAlpha2("USA") === "US", "alpha3ToAlpha2('USA') returns 'US'");
assert(alpha3ToAlpha2("fra") === "FR", "alpha3ToAlpha2('fra') is case-insensitive");
assert(alpha3ToAlpha2("ZZZ") === undefined, "alpha3ToAlpha2('ZZZ') returns undefined");

assert(alpha2ToNumeric("US") === "840", "alpha2ToNumeric('US') returns '840'");
assert(alpha2ToNumeric("AF") === "004", "alpha2ToNumeric('AF') returns '004'");

assert(numericToAlpha2("840") === "US", "numericToAlpha2('840') returns 'US'");
assert(numericToAlpha2(840) === "US", "numericToAlpha2(840) returns 'US'");
assert(numericToAlpha2("004") === "AF", "numericToAlpha2('004') returns 'AF'");
assert(numericToAlpha2(4) === "AF", "numericToAlpha2(4) returns 'AF'");

// 7. Search integration
const searchA3 = searchCountries("USA");
assert(searchA3.length > 0 && searchA3[0].code === "US", "searchCountries('USA') finds United States");

const searchNum = searchCountries("840");
assert(searchNum.length > 0 && searchNum[0].code === "US", "searchCountries('840') finds United States");

// 8. 100% roundtrip consistency across all 250 countries
let roundtripOk = true;
for (const c of countries) {
  if (alpha2ToAlpha3(c.code) !== c.alpha3) roundtripOk = false;
  if (alpha3ToAlpha2(c.alpha3) !== c.code) roundtripOk = false;
  if (alpha2ToNumeric(c.code) !== c.numeric) roundtripOk = false;
  if (numericToAlpha2(c.numeric) !== c.code) roundtripOk = false;
}
assert(roundtripOk, "100% roundtrip consistency (alpha2 <-> alpha3 <-> numeric) for all 250 countries");

console.log("\n----------------------------------------");
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("----------------------------------------\n");

if (failed > 0) process.exit(1);

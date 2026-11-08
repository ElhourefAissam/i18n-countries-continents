import {
  getSubdivisions,
  getSubdivision,
  hasSubdivisions,
  searchSubdivisions,
  getAllSubdivisionsCountries,
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
console.log(" Testing Expanded Subdivisions & Search");
console.log("========================================\n");

// 1. getAllSubdivisionsCountries
const allCountries = getAllSubdivisionsCountries();
assert(Array.isArray(allCountries) && allCountries.length >= 15, `getAllSubdivisionsCountries returns at least 15 countries (got ${allCountries.length})`);
assert(allCountries.includes("IN"), "includes India (IN)");
assert(allCountries.includes("CN"), "includes China (CN)");
assert(allCountries.includes("RU"), "includes Russia (RU)");
assert(allCountries.includes("TR"), "includes Turkey (TR)");
assert(allCountries.includes("NL"), "includes Netherlands (NL)");
assert(allCountries.includes("CH"), "includes Switzerland (CH)");

// 2. India (IN)
assert(hasSubdivisions("IN"), "hasSubdivisions('IN') is true");
const inSubs = getSubdivisions("IN");
assert(inSubs.length === 36, `India has 36 states and union territories (got ${inSubs.length})`);
const mh = getSubdivision("IN", "MH");
assert(mh && mh.name === "Maharashtra" && mh.type === "state", "getSubdivision('IN', 'MH') returns Maharashtra");
const dl = getSubdivision("IN", "DL");
assert(dl && dl.name === "Delhi", "getSubdivision('IN', 'DL') returns Delhi");

// 3. China (CN)
assert(hasSubdivisions("CN"), "hasSubdivisions('CN') is true");
const cnSubs = getSubdivisions("CN");
assert(cnSubs.length === 34, `China has 34 provincial subdivisions (got ${cnSubs.length})`);
const bj = getSubdivision("CN", "BJ");
assert(bj && bj.name === "Beijing" && bj.type === "municipality", "getSubdivision('CN', 'BJ') returns Beijing");
const gd = getSubdivision("CN", "GD");
assert(gd && gd.name === "Guangdong", "getSubdivision('CN', 'GD') returns Guangdong");

// 4. Russia & Turkey
assert(hasSubdivisions("RU"), "hasSubdivisions('RU') is true");
const ruSubs = getSubdivisions("RU");
assert(ruSubs.length >= 10, `Russia has major federal subjects (got ${ruSubs.length})`);
const mow = getSubdivision("RU", "MOW");
assert(mow && mow.name === "Moscow", "Moscow federal subject found");

assert(hasSubdivisions("TR"), "hasSubdivisions('TR') is true");
const trSubs = getSubdivisions("TR");
assert(trSubs.length >= 10, `Turkey has major provinces (got ${trSubs.length})`);
const ist = getSubdivision("TR", "34");
assert(ist && ist.name === "Istanbul", "Istanbul province found");

// 5. Netherlands & Switzerland
const nlSubs = getSubdivisions("NL");
assert(nlSubs.length === 12, `Netherlands has 12 provinces (got ${nlSubs.length})`);

const chSubs = getSubdivisions("CH");
assert(chSubs.length === 26, `Switzerland has 26 cantons (got ${chSubs.length})`);

// 6. searchSubdivisions
const nyResults = searchSubdivisions("New York");
assert(nyResults.some((s) => s.code === "NY" && s.countryCode === "US"), "searchSubdivisions('New York') finds NY");

const maharashtraResults = searchSubdivisions("Maharashtra");
assert(maharashtraResults.some((s) => s.code === "MH" && s.countryCode === "IN"), "searchSubdivisions('Maharashtra') finds MH");

const scopedResults = searchSubdivisions("Berlin", "DE");
assert(scopedResults.length === 1 && scopedResults[0].code === "BE", "searchSubdivisions with countryCode restricts scope");

console.log("\n----------------------------------------");
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("----------------------------------------\n");

if (failed > 0) {
  process.exit(1);
}

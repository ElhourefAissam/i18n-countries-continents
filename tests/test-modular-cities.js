import {
  getCities,
  getCity,
  getCityName,
  searchCities,
} from "../dist/services/cities/index.js";

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
console.log(" Testing Modular Cities Subpath (/cities)");
console.log("========================================\n");

// 1. Core getCities across languages
const enCities = getCities("en");
assert(Array.isArray(enCities) && enCities.length === 4010, "getCities('en') returns 4010 cities");

const ruCities = getCities("ru");
assert(Array.isArray(ruCities) && ruCities.length === 4010, "getCities('ru') returns 4010 cities");

const hiCities = getCities("hi");
assert(Array.isArray(hiCities) && hiCities.length === 4010, "getCities('hi') returns 4010 cities");

const koCities = getCities("ko");
assert(Array.isArray(koCities) && koCities.length === 4010, "getCities('ko') returns 4010 cities");

const trCities = getCities("tr");
assert(Array.isArray(trCities) && trCities.length === 4010, "getCities('tr') returns 4010 cities");

// 2. City name lookup in new languages
const moscowRu = getCityName("Moscow", "ru");
assert(moscowRu === "Москва", "getCityName('Moscow', 'ru') returns 'Москва'");

const tokyoRu = getCityName("Tokyo", "ru");
assert(tokyoRu === "Токио", "getCityName('Tokyo', 'ru') returns 'Токио'");

const delhiHi = getCityName("Delhi", "hi");
assert(delhiHi === "दिल्ली", "getCityName('Delhi', 'hi') returns 'दिल्ली'");

const seoulKo = getCityName("Seoul", "ko");
assert(seoulKo === "서울", "getCityName('Seoul', 'ko') returns '서울'");

const istanbulTr = getCityName("Istanbul", "tr");
assert(istanbulTr === "İstanbul", "getCityName('Istanbul', 'tr') returns 'İstanbul'");

// 3. getCity dual lookup
const moscowObj = getCity("Москва", "ru");
assert(
  moscowObj && moscowObj.name === "Moscow" && moscowObj.translatedName === "Москва",
  "getCity('Москва', 'ru') finds city by translated name"
);

const seoulObj = getCity("Seoul", "ko");
assert(
  seoulObj && seoulObj.name === "Seoul" && seoulObj.translatedName === "서울",
  "getCity('Seoul', 'ko') returns object with translatedName '서울'"
);

// 4. searchCities
const ruSearch = searchCities("Москва", "ru", 5);
assert(ruSearch.length > 0 && ruSearch[0].translatedName === "Москва", "searchCities('Москва', 'ru') returns Moscow");

const koSearch = searchCities("도쿄", "ko", 5);
assert(koSearch.length > 0 && koSearch[0].name === "Tokyo", "searchCities('도쿄', 'ko') returns Tokyo");

console.log("\n----------------------------------------");
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("----------------------------------------\n");

if (failed > 0) {
  process.exit(1);
}

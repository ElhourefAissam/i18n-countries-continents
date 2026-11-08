import {
  SUPPORTED_LANGUAGES,
  LANGUAGES,
  getCountries,
  getCountry,
  getContinents,
  getContinent,
  getCountryByName,
  getContinentByName,
  searchCountries,
  isValidLanguage,
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
console.log(" Testing Expanded World Languages (ru, hi, ko, tr)");
console.log("========================================\n");

// 1. Language metadata
assert(SUPPORTED_LANGUAGES.includes("ru"), "SUPPORTED_LANGUAGES includes 'ru'");
assert(SUPPORTED_LANGUAGES.includes("hi"), "SUPPORTED_LANGUAGES includes 'hi'");
assert(SUPPORTED_LANGUAGES.includes("ko"), "SUPPORTED_LANGUAGES includes 'ko'");
assert(SUPPORTED_LANGUAGES.includes("tr"), "SUPPORTED_LANGUAGES includes 'tr'");
assert(SUPPORTED_LANGUAGES.length === 14, `SUPPORTED_LANGUAGES has 14 languages (got ${SUPPORTED_LANGUAGES.length})`);

assert(isValidLanguage("ru"), "isValidLanguage('ru') is true");
assert(isValidLanguage("HI"), "isValidLanguage('HI') is true (case-insensitive)");
assert(isValidLanguage("ko"), "isValidLanguage('ko') is true");
assert(isValidLanguage("tr"), "isValidLanguage('tr') is true");

assert(
  LANGUAGES.ru && LANGUAGES.ru.name === "Russian" && LANGUAGES.ru.nativeName === "Русский",
  "LANGUAGES['ru'] metadata is complete"
);
assert(
  LANGUAGES.hi && LANGUAGES.hi.name === "Hindi" && LANGUAGES.hi.nativeName === "हिन्दी",
  "LANGUAGES['hi'] metadata is complete"
);
assert(
  LANGUAGES.ko && LANGUAGES.ko.name === "Korean" && LANGUAGES.ko.nativeName === "한국어",
  "LANGUAGES['ko'] metadata is complete"
);
assert(
  LANGUAGES.tr && LANGUAGES.tr.name === "Turkish" && LANGUAGES.tr.nativeName === "Türkçe",
  "LANGUAGES['tr'] metadata is complete"
);

// 2. Russian (ru)
const ruCountries = getCountries("ru");
assert(ruCountries.length === 250, "getCountries('ru') returns 250 countries");

const ruRu = getCountry("RU", "ru");
assert(ruRu && ruRu.name === "Россия", "getCountry('RU', 'ru') returns 'Россия'");

const usRu = getCountry("US", "ru");
assert(usRu && usRu.name.includes("Соединенные"), "getCountry('US', 'ru') returns Russian name for US");

const ruContinents = getContinents("ru");
assert(ruContinents.length === 7, "getContinents('ru') returns 7 continents");
const euRu = ruContinents.find((c) => c.code === "EU");
assert(euRu && euRu.name === "Европа", "Europe in Russian is 'Европа'");

// 3. Hindi (hi)
const hiCountries = getCountries("hi");
assert(hiCountries.length === 250, "getCountries('hi') returns 250 countries");

const inHi = getCountry("IN", "hi");
assert(inHi && inHi.name === "भारत", "getCountry('IN', 'hi') returns 'भारत'");

const usHi = getCountry("US", "hi");
assert(usHi && usHi.name.includes("संयुक्त"), "getCountry('US', 'hi') returns Hindi name for US");

const hiContinents = getContinents("hi");
assert(hiContinents.length === 7, "getContinents('hi') returns 7 continents");
const asHi = hiContinents.find((c) => c.code === "AS");
assert(asHi && asHi.name === "एशिया", "Asia in Hindi is 'एशिया'");

// 4. Korean (ko)
const koCountries = getCountries("ko");
assert(koCountries.length === 250, "getCountries('ko') returns 250 countries");

const krKo = getCountry("KR", "ko");
assert(krKo && krKo.name === "대한민국", "getCountry('KR', 'ko') returns '대한민국'");

const usKo = getCountry("US", "ko");
assert(usKo && usKo.name === "미국", "getCountry('US', 'ko') returns '미국'");

const koContinents = getContinents("ko");
assert(koContinents.length === 7, "getContinents('ko') returns 7 continents");
const asKo = koContinents.find((c) => c.code === "AS");
assert(asKo && asKo.name === "아시아", "Asia in Korean is '아시아'");

// 5. Turkish (tr)
const trCountries = getCountries("tr");
assert(trCountries.length === 250, "getCountries('tr') returns 250 countries");

const trTr = getCountry("TR", "tr");
assert(trTr && trTr.name === "Türkiye", "getCountry('TR', 'tr') returns 'Türkiye'");

const usTr = getCountry("US", "tr");
assert(usTr && usTr.name.includes("Amerika"), "getCountry('US', 'tr') returns Turkish name for US");

const trContinents = getContinents("tr");
assert(trContinents.length === 7, "getContinents('tr') returns 7 continents");
const euTr = trContinents.find((c) => c.code === "EU");
assert(euTr && euTr.name === "Avrupa", "Europe in Turkish is 'Avrupa'");

// 6. Reverse lookup in expanded languages
const ruByRuName = getCountryByName("Россия", "ru");
assert(ruByRuName && ruByRuName.code === "RU", "getCountryByName('Россия', 'ru') finds RU");

const inByHiName = getCountryByName("भारत", "hi");
assert(inByHiName && inByHiName.code === "IN", "getCountryByName('भारत', 'hi') finds IN");

const krByKoName = getCountryByName("대한민국", "ko");
assert(krByKoName && krByKoName.code === "KR", "getCountryByName('대한민국', 'ko') finds KR");

const trByTrName = getCountryByName("Türkiye", "tr");
assert(trByTrName && trByTrName.code === "TR", "getCountryByName('Türkiye', 'tr') finds TR");

// 7. Search in expanded languages
const ruSearchResults = searchCountries("Россия", "ru");
assert(ruSearchResults.some((c) => c.code === "RU"), "searchCountries('Россия', 'ru') finds Russia");

const trSearchResults = searchCountries("Almanya", "tr");
assert(trSearchResults.some((c) => c.code === "DE"), "searchCountries('Almanya', 'tr') finds Germany");

console.log("\n----------------------------------------");
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("----------------------------------------\n");

if (failed > 0) {
  process.exit(1);
}

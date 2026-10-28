import {
  SUPPORTED_LANGUAGES,
  LANGUAGES,
  getCountries,
  getCountry,
  getContinents,
  getContinent,
  getCountryByName,
  getContinentByName,
  getCityName,
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
console.log(" Testing Asian Locales (Chinese & Japanese)");
console.log("========================================\n");

// 1. Language metadata
assert(SUPPORTED_LANGUAGES.includes("zh"), "SUPPORTED_LANGUAGES includes 'zh'");
assert(SUPPORTED_LANGUAGES.includes("ja"), "SUPPORTED_LANGUAGES includes 'ja'");

assert(
  LANGUAGES.zh && LANGUAGES.zh.name === "Chinese" && LANGUAGES.zh.nativeName === "中文",
  "LANGUAGES['zh'] metadata is complete"
);
assert(
  LANGUAGES.ja && LANGUAGES.ja.name === "Japanese" && LANGUAGES.ja.nativeName === "日本語",
  "LANGUAGES['ja'] metadata is complete"
);

// 2. Chinese (zh) Countries
const zhCountries = getCountries("zh");
assert(zhCountries.length === 250, "getCountries('zh') returns 250 countries");

const usZh = getCountry("US", "zh");
assert(usZh && usZh.name === "美国", "getCountry('US', 'zh') returns '美国'");

const cnZh = getCountry("CN", "zh");
assert(cnZh && cnZh.name === "中国", "getCountry('CN', 'zh') returns '中国'");

const frZh = getCountry("FR", "zh");
assert(frZh && frZh.name === "法国", "getCountry('FR', 'zh') returns '法国'");

const jpZh = getCountry("JP", "zh");
assert(jpZh && jpZh.name === "日本", "getCountry('JP', 'zh') returns '日本'");

// 3. Japanese (ja) Countries
const jaCountries = getCountries("ja");
assert(jaCountries.length === 250, "getCountries('ja') returns 250 countries");

const usJa = getCountry("US", "ja");
assert(usJa && usJa.name.includes("アメリカ"), "getCountry('US', 'ja') returns Japanese name for US");

const cnJa = getCountry("CN", "ja");
assert(cnJa && cnJa.name === "中国", "getCountry('CN', 'ja') returns '中国'");

const frJa = getCountry("FR", "ja");
assert(frJa && frJa.name === "フランス", "getCountry('FR', 'ja') returns 'フランス'");

const jpJa = getCountry("JP", "ja");
assert(jpJa && jpJa.name === "日本", "getCountry('JP', 'ja') returns '日本'");

// 4. Continents in zh and ja
const zhContinents = getContinents("zh");
assert(zhContinents.length === 7, "getContinents('zh') returns 7 continents");
const asZh = zhContinents.find((c) => c.code === "AS");
assert(asZh && asZh.name === "亚洲", "Asia in Chinese is '亚洲'");
const euZh = zhContinents.find((c) => c.code === "EU");
assert(euZh && euZh.name === "欧洲", "Europe in Chinese is '欧洲'");

const jaContinents = getContinents("ja");
assert(jaContinents.length === 7, "getContinents('ja') returns 7 continents");
const asJa = jaContinents.find((c) => c.code === "AS");
assert(asJa && asJa.name === "アジア", "Asia in Japanese is 'アジア'");
const euJa = jaContinents.find((c) => c.code === "EU");
assert(euJa && euJa.name === "ヨーロッパ", "Europe in Japanese is 'ヨーロッパ'");

// 5. Reverse lookup in zh and ja
const usByZhName = getCountryByName("美国", "zh");
assert(usByZhName && usByZhName.code === "US", "getCountryByName('美国', 'zh') finds US");

const frByJaName = getCountryByName("フランス", "ja");
assert(frByJaName && frByJaName.code === "FR", "getCountryByName('フランス', 'ja') finds FR");

const asByZhName = getContinentByName("亚洲", "zh");
assert(asByZhName && asByZhName.code === "AS", "getContinentByName('亚洲', 'zh') finds AS");

const euByJaName = getContinentByName("ヨーロッパ", "ja");
assert(euByJaName && euByJaName.code === "EU", "getContinentByName('ヨーロッパ', 'ja') finds EU");

// 6. Cities in zh and ja
const tokyoZh = getCityName("Tokyo", "zh");
assert(tokyoZh === "东京", "getCityName('Tokyo', 'zh') returns '东京'");

const tokyoJa = getCityName("Tokyo", "ja");
assert(tokyoJa === "東京", "getCityName('Tokyo', 'ja') returns '東京'");

const parisZh = getCityName("Paris", "zh");
assert(parisZh === "巴黎", "getCityName('Paris', 'zh') returns '巴黎'");

const parisJa = getCityName("Paris", "ja");
assert(parisJa === "パリ", "getCityName('Paris', 'ja') returns 'パリ'");

// 7. Search in zh and ja
const searchZh = searchCountries("中国", "zh");
assert(searchZh.some((c) => c.code === "CN"), "searchCountries('中国', 'zh') finds China");

const searchJa = searchCountries("フランス", "ja");
assert(searchJa.some((c) => c.code === "FR"), "searchCountries('フランス', 'ja') finds France");

console.log("\n----------------------------------------");
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("----------------------------------------\n");

if (failed > 0) process.exit(1);

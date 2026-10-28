import {
  normalizeText,
  searchCountries,
  searchCities,
  searchContinents,
  getCountryByName,
  getContinentByName,
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
console.log(" Testing Accent-Insensitive Search");
console.log("========================================\n");

// 1. normalizeText helper
assert(normalizeText("Perú") === "peru", "normalizeText('Perú') -> 'peru'");
assert(normalizeText("Côte d'Ivoire") === "cote d'ivoire", "normalizeText(\"Côte d'Ivoire\") -> \"cote d'ivoire\"");
assert(normalizeText("Åland Islands") === "aland islands", "normalizeText('Åland Islands') -> 'aland islands'");
assert(normalizeText("São Tomé") === "sao tome", "normalizeText('São Tomé') -> 'sao tome'");
assert(normalizeText("Curaçao") === "curacao", "normalizeText('Curaçao') -> 'curacao'");
assert(normalizeText("África") === "africa", "normalizeText('África') -> 'africa'");
assert(normalizeText("Bogotá") === "bogota", "normalizeText('Bogotá') -> 'bogota'");
assert(normalizeText("") === "", "normalizeText('') -> ''");
assert(normalizeText(null) === "", "normalizeText(null) -> ''");

// 2. searchCountries accent-insensitivity
const peruResults = searchCountries("peru", "es");
assert(peruResults.some((c) => c.code === "PE"), "searchCountries('peru', 'es') finds Perú");

const coteResults = searchCountries("cote", "fr");
assert(coteResults.some((c) => c.code === "CI"), "searchCountries('cote', 'fr') finds Côte d'Ivoire in French");

const alandResults = searchCountries("aland", "en");
assert(alandResults.some((c) => c.code === "AX"), "searchCountries('aland', 'en') finds Åland Islands in English");

const saoTomeResults = searchCountries("sao tome", "en");
assert(saoTomeResults.some((c) => c.code === "ST"), "searchCountries('sao tome', 'en') finds São Tomé and Príncipe in English");

const curacaoResults = searchCountries("curacao", "en");
assert(curacaoResults.some((c) => c.code === "CW"), "searchCountries('curacao', 'en') finds Curaçao in English");

const reunionResults = searchCountries("reunion", "fr");
assert(reunionResults.some((c) => c.code === "RE"), "searchCountries('reunion', 'fr') finds Réunion in French");

// 3. searchCities accent-insensitivity
const cordobaResults = searchCities("cordoba", "es", 5);
assert(cordobaResults.some((c) => c.translatedName.includes("Córdoba") || c.name.includes("Córdoba")), "searchCities('cordoba', 'es') finds Córdoba");

const montrealResults = searchCities("montreal", "fr", 5);
assert(montrealResults.some((c) => c.name.includes("Montreal") || c.translatedName.includes("Montréal")), "searchCities('montreal', 'fr') finds Montréal");

const juarezResults = searchCities("juarez", "es", 5);
assert(juarezResults.some((c) => c.translatedName.includes("Juárez") || c.name.includes("Juárez")), "searchCities('juarez', 'es') finds Acapulco de Juárez");

const corunaResults = searchCities("coruna", "es", 5);
assert(corunaResults.some((c) => c.translatedName.includes("Coruña") || c.name.includes("Coruña")), "searchCities('coruna', 'es') finds A Coruña");

// 4. searchContinents accent-insensitivity
const oceaniaContinents = searchContinents("oceania", "es");
assert(oceaniaContinents.some((c) => c.code === "OC"), "searchContinents('oceania', 'es') finds Oceanía");

const africaContinents = searchContinents("africa", "es");
assert(africaContinents.some((c) => c.code === "AF"), "searchContinents('africa', 'es') finds África");

const antartidaContinents = searchContinents("antartida", "es");
assert(antartidaContinents.some((c) => c.code === "AN"), "searchContinents('antartida', 'es') finds Antártida");

// 5. getCountryByName accent-insensitivity
const peruCountry = getCountryByName("peru", "es");
assert(peruCountry && peruCountry.code === "PE", "getCountryByName('peru', 'es') finds Perú");

const coteCountry = getCountryByName("Cote d'Ivoire", "fr");
assert(coteCountry && coteCountry.code === "CI", "getCountryByName(\"Cote d'Ivoire\", 'fr') finds Côte d'Ivoire");

const espanaCountry = getCountryByName("Espana", "es");
assert(espanaCountry && espanaCountry.code === "ES", "getCountryByName('Espana', 'es') finds España");

const alandCountry = getCountryByName("aland islands", "en");
assert(alandCountry && alandCountry.code === "AX", "getCountryByName('aland islands', 'en') finds Åland Islands");

const curacaoCountry = getCountryByName("curacao", "en");
assert(curacaoCountry && curacaoCountry.code === "CW", "getCountryByName('curacao', 'en') finds Curaçao");

// 6. getContinentByName accent-insensitivity
const afContinent = getContinentByName("Africa", "es");
assert(afContinent && afContinent.code === "AF" && afContinent.name === "África", "getContinentByName('Africa', 'es') finds África");

const ocContinent = getContinentByName("Oceania", "es");
assert(ocContinent && ocContinent.code === "OC" && ocContinent.name === "Oceanía", "getContinentByName('Oceania', 'es') finds Oceanía");

const anContinent = getContinentByName("Antartida", "es");
assert(anContinent && anContinent.code === "AN" && anContinent.name === "Antártida", "getContinentByName('Antartida', 'es') finds Antártida");

console.log("\n----------------------------------------");
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("----------------------------------------\n");

if (failed > 0) process.exit(1);

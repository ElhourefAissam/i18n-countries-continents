import {
  getCountryName,
  getCountryFlag,
  getCountry,
  getCountries,
  getCountriesByContinent,
  getContinentByCountry,
  getContinentName,
  getContinents,
  searchCountries,
  getSupportedLanguages,
  toSelectOptions,
} from '../../dist/index.js';

console.log('🌍 i18n-countries-continents - Node.js Demo\n');

// 1. Supported languages
console.log('1️⃣ Supported Languages:');
const languages = getSupportedLanguages();
console.table(languages);

// 2. Multi-language translation of a country
console.log('\n2️⃣ Country Translations for Morocco (MA):');
['en', 'fr', 'es', 'ar', 'de', 'pt', 'it', 'nl'].forEach((lang) => {
  const name = getCountryName('MA', lang);
  console.log(`   [${lang.toUpperCase()}] ${name}`);
});

// 3. Flags and reverse lookup
console.log('\n3️⃣ Flag & Continent Lookup:');
const us = getCountry('US', 'en');
console.log(`   ${us?.flag} Country: ${us?.name} (${us?.code})`);
console.log(`   Continent code: ${us?.continent}`);
console.log(`   Continent name (ES): ${getContinentName(us?.continent || '', 'es')}`);

// 4. Filter by continent
console.log('\n4️⃣ African Countries (first 5 in French):');
const africanCountries = getCountriesByContinent('AF', 'fr').slice(0, 5);
africanCountries.forEach((c) => console.log(`   ${c.flag} ${c.name} (${c.code})`));

// 5. Search countries
console.log('\n5️⃣ Search countries for "land" in English:');
const searchResults = searchCountries('land', 'en').slice(0, 5);
searchResults.forEach((c) => console.log(`   ${c.flag} ${c.name}`));

// 6. UI Select Options Formatter (with flags & German alphabetical sorting)
console.log('\n6️⃣ Format as UI Select Options (first 3 in German):');
const selectOptions = toSelectOptions(getCountries('de').slice(0, 3), {
  label: (c) => `${c.flag} ${c.name}`,
  sort: true,
  language: 'de',
});
console.log(JSON.stringify(selectOptions, null, 2));

console.log('\n✅ Demo completed successfully!');

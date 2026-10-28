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
  getCallingCode,
  getCurrency,
  getCountriesByCallingCode,
  getCountriesByCurrency,
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
console.log(`   Calling code: ${us?.callingCode}`);
console.log(`   Currency: ${us?.currency.code} (${us?.currency.symbol}) - ${us?.currency.name}`);

// 4. Calling codes & Currencies (NEW in v1.1.0)
console.log('\n4️⃣ Calling Codes & Currencies:');
console.log(`   France (FR): Phone ${getCallingCode('FR')}, Currency ${getCurrency('FR')?.code} (${getCurrency('FR')?.symbol})`);
console.log(`   Japan (JP):  Phone ${getCallingCode('JP')}, Currency ${getCurrency('JP')?.code} (${getCurrency('JP')?.symbol})`);
console.log(`   Morocco (MA): Phone ${getCallingCode('MA')}, Currency ${getCurrency('MA')?.code} (${getCurrency('MA')?.symbol})`);

const euroCountries = getCountriesByCurrency('EUR', 'fr').slice(0, 4);
console.log(`   Sample Eurozone Countries (FR): ${euroCountries.map(c => `${c.flag} ${c.name}`).join(', ')}`);

// 5. Filter by continent
console.log('\n5️⃣ African Countries (first 5 in French):');
const africanCountries = getCountriesByContinent('AF', 'fr').slice(0, 5);
africanCountries.forEach((c) => console.log(`   ${c.flag} ${c.name} (${c.code}) - ${c.callingCode}`));

// 6. Search countries (by name, code, phone code, or currency)
console.log('\n6️⃣ Search countries for "+33" (phone code):');
const searchByPhone = searchCountries('+33', 'en');
searchByPhone.forEach((c) => console.log(`   ${c.flag} ${c.name} (Code: ${c.code}, Phone: ${c.callingCode})`));

// 7. UI Select Options Formatter (with flags, dial codes & German alphabetical sorting)
console.log('\n7️⃣ Format as UI Select Options (with phone code):');
const selectOptions = toSelectOptions(getCountries('de').slice(0, 3), {
  label: (c) => `${c.flag} ${c.name} (${c.callingCode})`,
  sort: true,
  language: 'de',
});
console.log(JSON.stringify(selectOptions, null, 2));

console.log('\n✅ Demo completed successfully!');

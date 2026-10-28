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
  getCountryByAlpha3,
  getCountryByNumeric,
  alpha2ToAlpha3,
  alpha3ToAlpha2,
  alpha2ToNumeric,
  numericToAlpha2,
  getCapital,
  getCountryByCapital,
  getTimezones,
  getCountriesByTimezone,
  getSupportedLanguages,
  toSelectOptions,
} from '../../dist/index.js';

console.log('🌍 i18n-countries-continents - Node.js Demo\n');

// 1. Supported languages (10 languages)
console.log('1️⃣ Supported Languages (10 total):');
const languages = getSupportedLanguages();
console.table(languages);

// 2. Multi-language translation of a country across all 10 languages
console.log('\n2️⃣ Country Translations for Morocco (MA):');
['en', 'fr', 'es', 'ar', 'de', 'pt', 'it', 'nl', 'zh', 'ja'].forEach((lang) => {
  const name = getCountryName('MA', lang);
  console.log(`   [${lang.toUpperCase()}] ${name}`);
});

// 3. Flags and full country metadata
console.log('\n3️⃣ Full Country Object & ISO Identifiers:');
const us = getCountry('US', 'en');
console.log(`   ${us?.flag} Country: ${us?.name}`);
console.log(`   Alpha-2: ${us?.code} | Alpha-3: ${us?.alpha3} | Numeric: ${us?.numeric}`);
console.log(`   Capital: ${us?.capital}`);
console.log(`   Timezones: ${us?.timezones.slice(0, 3).join(', ')}... (${us?.timezones.length} total)`);
console.log(`   Continent: ${us?.continent} (${getContinentName(us?.continent || '', 'es')})`);
console.log(`   Calling code: ${us?.callingCode}`);
console.log(`   Currency: ${us?.currency.code} (${us?.currency.symbol}) - ${us?.currency.name}`);

// 4. ISO 3166-1 Alpha-3 & Numeric Codes (NEW in v1.2.0)
console.log('\n4️⃣ ISO 3166-1 Conversions & Lookups:');
console.log(`   alpha2ToAlpha3('US') -> ${alpha2ToAlpha3('US')}`);
console.log(`   alpha3ToAlpha2('USA') -> ${alpha3ToAlpha2('USA')}`);
console.log(`   alpha2ToNumeric('US') -> ${alpha2ToNumeric('US')}`);
console.log(`   numericToAlpha2('840') -> ${numericToAlpha2('840')}`);
const japanByA3 = getCountryByAlpha3('JPN', 'fr');
console.log(`   getCountryByAlpha3('JPN', 'fr') -> ${japanByA3?.flag} ${japanByA3?.name}`);
const franceByNum = getCountryByNumeric(250, 'es');
console.log(`   getCountryByNumeric(250, 'es') -> ${franceByNum?.flag} ${franceByNum?.name}`);

// 5. Capitals & Timezones (NEW in v1.2.0)
console.log('\n5️⃣ Capitals & Timezones:');
console.log(`   France capital: ${getCapital('FR')}`);
console.log(`   Japan capital: ${getCapital('JP')}`);
console.log(`   Reverse capital lookup ('Paris'): ${getCountryByCapital('Paris')?.flag} ${getCountryByCapital('Paris')?.name}`);
console.log(`   France timezones: ${getTimezones('FR').join(', ')}`);
console.log(`   Morocco timezones: ${getTimezones('MA').join(', ')}`);

// 6. Accent-Insensitive Search (NEW in v1.2.0)
console.log('\n6️⃣ Accent-Insensitive Search:');
const peruSearch = searchCountries('peru', 'es', 2);
console.log(`   Search "peru" in Spanish -> ${peruSearch.map(c => `${c.flag} ${c.name}`).join(', ')}`);
const coteSearch = searchCountries('cote', 'fr', 2);
console.log(`   Search "cote" in French -> ${coteSearch.map(c => `${c.flag} ${c.name}`).join(', ')}`);

// 7. Calling codes & Currencies
console.log('\n7️⃣ Calling Codes & Currencies:');
console.log(`   France (FR): Phone ${getCallingCode('FR')}, Currency ${getCurrency('FR')?.code} (${getCurrency('FR')?.symbol})`);
console.log(`   Japan (JP):  Phone ${getCallingCode('JP')}, Currency ${getCurrency('JP')?.code} (${getCurrency('JP')?.symbol})`);

// 8. UI Select Options Formatter
console.log('\n8️⃣ Format as UI Select Options (with flags, dial codes & localized sorting):');
const selectOptions = toSelectOptions(getCountries('de').slice(0, 3), {
  label: (c) => `${c.flag} ${c.name} (${c.callingCode}) - ${c.capital}`,
  sort: true,
  language: 'de',
});
console.log(JSON.stringify(selectOptions, null, 2));

console.log('\n✅ Demo completed successfully!');

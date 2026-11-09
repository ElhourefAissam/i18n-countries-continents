import {
  getCountryName,
  getCountryFlag,
  getCountryFlagUrl,
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
  getTld,
  getCountryByTld,
  getDemonym,
  getCountryByDemonym,
  getNativeName,
  getCoordinates,
  getArea,
  isLandlocked,
  getBorders,
  getCountryLanguages,
  getCountriesBySpokenLanguage,
  getSubregion,
  getSubregions,
  isEU,
  isSchengen,
  isEEA,
  getEUCountries,
  getSchengenCountries,
  getEEACountries,
  getDistance,
  getNearestCountries,
  getSubdivisions,
  getSubdivision,
  hasSubdivisions,
  searchSubdivisions,
  getAllSubdivisionsCountries,
  isValidCountryCode,
  isValidContinentCode,
  isValidLanguage,
  isValidPostalCode,
  getPostalCodePattern,
  getCities,
  getCity,
  getCityName,
  searchCities,
  toSelectOptions,
  getSupportedLanguages,
} from '../../dist/index.js';

console.log('==============================================================');
console.log('🌍 i18n-countries-continents — Node.js Full Feature Showcase');
console.log('==============================================================\n');

// 1. Supported Languages (14 World Languages)
console.log('1️⃣ Supported Languages (14 total):');
const languages = getSupportedLanguages();
console.table(languages);

// 2. Multi-Language Country Translation (All 14 Languages)
console.log('\n2️⃣ Country Translations for Morocco (MA) across all 14 languages:');
languages.forEach((l) => {
  const name = getCountryName('MA', l.code);
  console.log(`   [${l.code.toUpperCase().padEnd(2)}] ${l.nativeName.padEnd(10)} → ${name}`);
});

// 3. Full Country Object & Rich Geospatial Metadata
console.log('\n3️⃣ Full Country Object & Metadata (France - FR):');
const fr = getCountry('FR', 'en');
console.log(`   ${fr?.flag} Country: ${fr?.name} (${fr?.nativeName})`);
console.log(`   ISO Codes: Alpha-2: ${fr?.code} | Alpha-3: ${fr?.alpha3} | Numeric: ${fr?.numeric}`);
console.log(`   Capital: ${fr?.capital} | Continent: ${fr?.continent} (${getContinentName(fr?.continent || '', 'fr')})`);
console.log(`   Calling Code: ${fr?.callingCode} | ccTLD: ${fr?.tld}`);
console.log(`   Currency: ${fr?.currency.code} (${fr?.currency.symbol}) — ${fr?.currency.name}`);
console.log(`   Demonym: ${fr?.demonym}`);
console.log(`   Geography: Area: ${fr?.area?.toLocaleString()} km² | Landlocked: ${fr?.landlocked}`);
console.log(`   Coordinates: Lat ${fr?.coordinates?.lat}°, Lng ${fr?.coordinates?.lng}°`);
console.log(`   UN Subregion: ${fr?.subregion}`);
console.log(`   Regional Unions: EU: ${fr?.isEU} | Schengen: ${fr?.isSchengen} | EEA: ${fr?.isEEA}`);
console.log(`   Borders (${fr?.borders.length}): ${fr?.borders.join(', ')}`);
console.log(`   Timezones (${fr?.timezones.length}): ${fr?.timezones.join(', ')}`);

// 4. Vector SVG & High-Res Flag URLs
console.log('\n4️⃣ Vector SVG & Raster Flag URLs (FlagCDN):');
console.log(`   SVG Flag:   ${getCountryFlagUrl('FR', { format: 'svg' })}`);
console.log(`   PNG (w320): ${getCountryFlagUrl('FR', { format: 'png', size: 'w320' })}`);

// 5. ISO 3166-1 Conversions & Numeric Lookup
console.log('\n5️⃣ ISO 3166-1 Conversions & Lookups:');
console.log(`   alpha2ToAlpha3('US')  → ${alpha2ToAlpha3('US')}`);
console.log(`   alpha3ToAlpha2('USA') → ${alpha3ToAlpha2('USA')}`);
console.log(`   alpha2ToNumeric('US') → ${alpha2ToNumeric('US')}`);
console.log(`   numericToAlpha2('840')→ ${numericToAlpha2('840')}`);
const japanByA3 = getCountryByAlpha3('JPN', 'fr');
console.log(`   getCountryByAlpha3('JPN', 'fr') → ${japanByA3?.flag} ${japanByA3?.name}`);
const egyptByNum = getCountryByNumeric(818, 'ar');
console.log(`   getCountryByNumeric(818, 'ar')  → ${egyptByNum?.flag} ${egyptByNum?.name}`);

// 6. Regional & Geopolitical Unions (EU, Schengen, EEA)
console.log('\n6️⃣ Regional & Geopolitical Unions:');
console.log(`   isEU('DE'): ${isEU('DE')} | isEU('GB'): ${isEU('GB')}`);
console.log(`   isSchengen('CH'): ${isSchengen('CH')} (Switzerland is Schengen, non-EU)`);
console.log(`   isEEA('NO'): ${isEEA('NO')} (Norway is EEA, non-EU)`);
console.log(`   EU Member Countries count: ${getEUCountries('en').length}`);
console.log(`   Schengen Area Countries count: ${getSchengenCountries('en').length}`);
console.log(`   EEA Countries count: ${getEEACountries('en').length}`);

// 7. Geodesic Distance & Nearest Countries (Haversine Formula)
console.log('\n7️⃣ Geodesic Distance & Nearest Countries:');
const distUsFr = getDistance('US', 'FR');
console.log(`   Distance USA (US) ⇄ France (FR): ${distUsFr.toLocaleString()} km`);
const distJpGb = getDistance('JP', 'GB');
console.log(`   Distance Japan (JP) ⇄ United Kingdom (GB): ${distJpGb.toLocaleString()} km`);
console.log(`   5 Closest Countries to France (FR):`);
const nearestToFr = getNearestCountries('FR', 5);
nearestToFr.forEach((n, idx) => {
  console.log(`     ${idx + 1}. ${n.country.flag} ${n.country.name} (${n.country.code}) — ${n.distanceKm.toLocaleString()} km`);
});

// 8. ISO 3166-2 Subdivisions (States, Provinces, Cantons)
console.log('\n8️⃣ ISO 3166-2 Subdivisions:');
console.log(`   Supported Nations (${getAllSubdivisionsCountries().length}): ${getAllSubdivisionsCountries().join(', ')}`);
console.log(`   US States count: ${getSubdivisions('US').length}`);
console.log(`   US-CA: ${JSON.stringify(getSubdivision('US', 'CA'))}`);
console.log(`   India States count: ${getSubdivisions('IN').length}`);
console.log(`   IN-MH: ${JSON.stringify(getSubdivision('IN', 'MH'))}`);
console.log(`   Search Subdivisions 'California': ${JSON.stringify(searchSubdivisions('California').slice(0, 1))}`);
console.log(`   Search Subdivisions 'Bayern' (DE): ${JSON.stringify(searchSubdivisions('Bayern'))}`);

// 9. Cities Directory (/cities) across 14 Languages
console.log('\n9️⃣ Global Cities Directory (4,010 Cities):');
const allCities = getCities('en');
console.log(`   Total cities: ${allCities.length.toLocaleString()}`);
const tokyoJa = getCityName('Tokyo', 'ja');
console.log(`   Tokyo in Japanese: ${tokyoJa}`);
const moscowRu = getCityName('Moscow', 'ru');
console.log(`   Moscow in Russian: ${moscowRu}`);
const seoulKo = getCityName('Seoul', 'ko');
console.log(`   Seoul in Korean: ${seoulKo}`);
const searchParis = searchCities('Paris', 'fr', 2);
console.log(`   searchCities('Paris', 'fr') →`, searchParis);

// 10. Postal / ZIP Code Validation
console.log('\n🔟 Postal / ZIP Code Validation:');
console.log(`   isValidPostalCode('US', '90210'):    ${isValidPostalCode('US', '90210')} (Pattern: ${getPostalCodePattern('US')})`);
console.log(`   isValidPostalCode('GB', 'SW1A 1AA'): ${isValidPostalCode('GB', 'SW1A 1AA')} (Pattern: ${getPostalCodePattern('GB')})`);
console.log(`   isValidPostalCode('FR', '75001'):    ${isValidPostalCode('FR', '75001')} (Pattern: ${getPostalCodePattern('FR')})`);
console.log(`   isValidPostalCode('US', 'INVALID'):  ${isValidPostalCode('US', 'INVALID')}`);

// 11. Reverse Lookups (Capital, ccTLD, Demonym, Calling Code, Currency, Language)
console.log('\n1️⃣1️⃣ Reverse Lookups:');
console.log(`   getCountryByCapital('Tokyo'):    ${getCountryByCapital('Tokyo')?.flag} ${getCountryByCapital('Tokyo')?.name}`);
console.log(`   getCountryByTld('.ma'):          ${getCountryByTld('.ma')?.flag} ${getCountryByTld('.ma')?.name}`);
console.log(`   getCountryByDemonym('Swiss'):    ${getCountryByDemonym('Swiss')?.flag} ${getCountryByDemonym('Swiss')?.name}`);
console.log(`   getCountriesByCallingCode('+1'): ${getCountriesByCallingCode('+1').map(c => `${c.flag} ${c.code}`).join(', ')}`);
console.log(`   getCountriesByCurrency('JPY'):   ${getCountriesByCurrency('JPY').map(c => `${c.flag} ${c.code}`).join(', ')}`);
console.log(`   getCountriesBySpokenLanguage('es'): ${getCountriesBySpokenLanguage('es').length} Spanish-speaking countries`);

// 12. UI Select Options Formatter
console.log('\n1️⃣2️⃣ Format as UI Select Options (with localized collation):');
const selectOptions = toSelectOptions(getCountries('de').slice(0, 3), {
  label: (c) => `${c.flag} ${c.name} (${c.callingCode}) - ${c.capital}`,
  sort: true,
  language: 'de',
});
console.log(JSON.stringify(selectOptions, null, 2));

console.log('\n==============================================================');
console.log('✅ All demonstrations executed successfully!');
console.log('==============================================================');

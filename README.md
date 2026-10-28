# i18n-countries-continents

Get country, continent, and city names in different languages. **250 countries**, **7 continents**, and **4,010 cities** with full translations in **10 languages** (including Chinese & Japanese), ISO 3166-1 Alpha-3 & Numeric codes, official capitals, primary IANA timezones, phone calling codes, and currencies. Works in React, Angular, Vue, Svelte, Node.js, and any JavaScript environment.

[![npm version](https://img.shields.io/npm/v/i18n-countries-continents.svg)](https://www.npmjs.com/package/i18n-countries-continents)
[![npm downloads](https://img.shields.io/npm/dm/i18n-countries-continents.svg)](https://www.npmjs.com/package/i18n-countries-continents)
[![CI](https://github.com/ElhourefAissam/i18n-countries-continents/actions/workflows/ci.yml/badge.svg)](https://github.com/ElhourefAissam/i18n-countries-continents/actions/workflows/ci.yml)
[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-blue?logo=github)](https://elhourefaissam.github.io/i18n-countries-continents/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/i18n-countries-continents)](https://bundlephobia.com/package/i18n-countries-continents)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](https://www.npmjs.com/package/i18n-countries-continents)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Installation

```sh
npm install i18n-countries-continents
```

```sh
yarn add i18n-countries-continents
```

```sh
pnpm add i18n-countries-continents
```

---

## Features

- 🌍 **250 countries** — Complete coverage of all world countries
- 🏳️ **Country flags** — Flag emoji for every country
- 🔤 **ISO 3166-1 codes** — Alpha-2 (`US`), Alpha-3 (`USA`), and Numeric (`840`) codes with fast conversion helpers
- 🏛️ **Official capitals** — Capital cities for all countries with reverse lookup (`getCapital`, `getCountryByCapital`)
- 🕒 **Primary IANA timezones** — IANA timezone mapping with reverse lookup (`getTimezones`, `getCountriesByTimezone`)
- 🔍 **Accent-insensitive search** — Diacritic-free search and smart ranking (`"peru"` matches `"Perú"`, `"paris"` matches France)
- 📞 **Calling codes** — International dial codes for all 250 countries (e.g. `+1`, `+33`, `+212`)
- 💰 **Currency info** — ISO 4217 code, symbol, and name for all 250 countries (e.g. `USD`, `$`, `EUR`, `€`)
- 🗺️ **7 continents** — All continents included
- 🏙️ **4,010 cities** — Major cities from around the world
- 🌐 **10 languages** — English, Spanish, French, Arabic, Dutch, German, Portuguese, Italian, Chinese, Japanese (100% coverage)
- 📦 **Zero dependencies** — Lightweight and fast
- 💪 **TypeScript** — Full type definitions included
- ⚡ **Tree-shakeable** — Import only what you need
- 🎯 **Universal** — Works with ESM and CommonJS

---

## Live Demo & Examples

- 🚀 **[Online Live Demo](https://elhourefaissam.github.io/i18n-countries-continents/)** — Interactive browser playground hosted on GitHub Pages (instant search, flags, calling codes, currencies, code generator).
- 🎮 **[Interactive Browser Demo Source](examples/interactive-demo/index.html)** — Run locally or embed into your projects.
- ⚛️ **[React Country Select Component](examples/react/CountrySelect.tsx)** — Complete, accessible, typed `<CountrySelect />` component with flags and localized sorting.
- 💻 **[Node.js Demo Script](examples/node/demo.js)** — Ready-to-run CLI demonstration.
- 📖 **[Examples Guide](examples/README.md)** — Additional snippets for Vue 3, Next.js (App Router), and UI select option formatters.

---

## Usage

### 1. Get a country name in a specific language

```js
import { getCountryName } from 'i18n-countries-continents';

console.log(getCountryName('FR', 'fr')); // "France"
console.log(getCountryName('FR', 'es')); // "Francia"
console.log(getCountryName('DE', 'ar')); // "ألمانيا"
console.log(getCountryName('JP', 'nl')); // "Japan"
```

### 2. Get a country flag

```js
import { getCountryFlag } from 'i18n-countries-continents';

console.log(getCountryFlag('US')); // 🇺🇸
console.log(getCountryFlag('FR')); // 🇫🇷
console.log(getCountryFlag('JP')); // 🇯🇵
console.log(getCountryFlag('MA')); // 🇲🇦
```

### 3. List all countries in a language

```js
import { getCountries } from 'i18n-countries-continents';

const countries = getCountries('en');
countries.forEach(c => console.log(c.flag, c.code, c.name, c.continent));
// 🇺🇸 US United States NA
// 🇫🇷 FR France EU
// ...
```

### 4. Get a continent code by country code

```js
import { getContinentByCountry } from 'i18n-countries-continents';

console.log(getContinentByCountry('US')); // "NA"
console.log(getContinentByCountry('JP')); // "AS"
console.log(getContinentByCountry('BR')); // "SA"
```

### 5. Get a continent name in a specific language

```js
import { getContinentName } from 'i18n-countries-continents';

console.log(getContinentName('EU', 'es')); // "Europa"
console.log(getContinentName('NA', 'fr')); // "Amérique du Nord"
console.log(getContinentName('AS', 'ar')); // "آسيا"
```

### 6. List all continents in a language

```js
import { getContinents } from 'i18n-countries-continents';

const continents = getContinents('nl');
continents.forEach(c => console.log(c.code, c.name));
// AF Afrika
// AS Azië
// EU Europa
// ...
```

### 7. Get a city name in a specific language

```js
import { getCityName } from 'i18n-countries-continents';

console.log(getCityName('Paris', 'ar'));  // "باريس"
console.log(getCityName('London', 'fr')); // "Londres"
console.log(getCityName('Tokyo', 'ar'));  // "طوكيو"
```

### 8. List all cities in a language

```js
import { getCities } from 'i18n-countries-continents';

const cities = getCities('es');
cities.forEach(c => console.log(c.name, '→', c.translatedName));
// Paris → París
// London → Londres
// ...
```

### 9. Search for cities

```js
import { searchCities } from 'i18n-countries-continents';

const results = searchCities('york', 'en', 5);
results.forEach(c => console.log(c.name, '→', c.translatedName));
// East York → East York
// New York → New York
// North York → North York
// York → York
```

### 10. Get full country object

```js
import { getCountry } from 'i18n-countries-continents';

console.log(getCountry('FR', 'es'));
// {
//   code: "FR",
//   alpha3: "FRA",
//   numeric: "250",
//   continent: "EU",
//   flag: "🇫🇷",
//   name: "Francia",
//   capital: "Paris",
//   timezones: ["Europe/Paris"],
//   callingCode: "+33",
//   currency: { code: "EUR", symbol: "€", name: "Euro" }
// }
```

### 11. Search for countries

```js
import { searchCountries } from 'i18n-countries-continents';

const results = searchCountries('uni', 'en', 3);
// [
//   { code: 'AE', continent: 'AS', flag: '🇦🇪', name: 'United Arab Emirates' },
//   { code: 'GB', continent: 'EU', flag: '🇬🇧', name: 'United Kingdom' },
//   { code: 'US', continent: 'NA', flag: '🇺🇸', name: 'United States' }
// ]
```

### 12. Find country by name (reverse lookup)

```js
import { getCountryByName } from 'i18n-countries-continents';

console.log(getCountryByName('España', 'es'));
// { code: "ES", continent: "EU", flag: "🇪🇸", name: "España" }
```

### 13. Filter countries by continent

```js
import { getCountriesByContinent } from 'i18n-countries-continents';

const europeanCountries = getCountriesByContinent('EU', 'fr');
// [{ code: 'FR', name: 'France', ... }, { code: 'DE', name: 'Allemagne', ... }]
```

### 14. Validation helpers

```js
import { 
  isValidCountryCode, 
  isValidContinentCode, 
  isValidLanguage 
} from 'i18n-countries-continents';

isValidCountryCode('US');     // true
isValidCountryCode('XYZ');    // false

isValidContinentCode('EU');   // true
isValidContinentCode('ZZ');   // false

isValidLanguage('fr');        // true
isValidLanguage('ja');        // false
```

### 15. Format as Select options (React, Vue, Angular)

```js
import { getCountries, toSelectOptions } from 'i18n-countries-continents';

const countries = getCountries('en');

// Default ({ value: 'US', label: 'United States' })
const simpleOptions = toSelectOptions(countries);

// Custom label with flag emoji and alphabetical sorting
const flagOptions = toSelectOptions(countries, {
  label: (c) => `${c.flag} ${c.name}`,
  sort: true,
  language: 'en'
});
// [{ value: "AF", label: "🇦🇫 Afghanistan" }, ...]
```

### 16. Get supported languages (for language pickers)

```js
import { getSupportedLanguages, toSelectOptions } from 'i18n-countries-continents';

const languages = getSupportedLanguages();
// [
//   { code: 'en', name: 'English', nativeName: 'English' },
//   { code: 'es', name: 'Spanish', nativeName: 'Español' },
//   { code: 'fr', name: 'French', nativeName: 'Français' },
//   { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
//   ...
// ]

// Generate dropdown options directly for your UI:
const langOptions = toSelectOptions(languages, { value: 'code', label: 'nativeName' });
```

### 17. Get phone calling code

```js
import { getCallingCode } from 'i18n-countries-continents';

console.log(getCallingCode('US')); // "+1"
console.log(getCallingCode('FR')); // "+33"
console.log(getCallingCode('MA')); // "+212"
console.log(getCallingCode('JP')); // "+81"
```

### 18. Get currency information

```js
import { getCurrency } from 'i18n-countries-continents';

console.log(getCurrency('US'));
// { code: "USD", symbol: "$", name: "US Dollar" }

console.log(getCurrency('FR'));
// { code: "EUR", symbol: "€", name: "Euro" }

console.log(getCurrency('MA'));
// { code: "MAD", symbol: "د.م.", name: "Moroccan Dirham" }
```

### 19. Reverse lookup by calling code or currency

```js
import { 
  getCountriesByCallingCode, 
  getCountriesByCurrency 
} from 'i18n-countries-continents';

// Find countries sharing a phone dial code
const northAmerica = getCountriesByCallingCode('+1');
// [{ code: 'US', name: 'United States', ... }, { code: 'CA', name: 'Canada', ... }]

// Find all countries using the Euro
const eurozone = getCountriesByCurrency('EUR', 'fr');
// [{ code: 'FR', name: 'France', ... }, { code: 'DE', name: 'Allemagne', ... }]
```

### 20. ISO 3166-1 Alpha-3 & Numeric codes

```js
import { 
  getCountryByAlpha3, 
  getCountryByNumeric,
  alpha2ToAlpha3, 
  alpha3ToAlpha2, 
  alpha2ToNumeric, 
  numericToAlpha2 
} from 'i18n-countries-continents';

// Lookup country by 3-letter code
const usa = getCountryByAlpha3('USA'); // United States
const fra = getCountryByAlpha3('FRA', 'es'); // Francia

// Lookup country by 3-digit numeric code
const usNum = getCountryByNumeric('840');
const frNum = getCountryByNumeric(250);

// Fast O(1) code conversions
alpha2ToAlpha3('US');   // "USA"
alpha3ToAlpha2('USA');  // "US"
alpha2ToNumeric('US');  // "840"
numericToAlpha2('840'); // "US"
```

### 21. Capital city lookup & reverse lookup

```js
import { getCapital, getCountryByCapital } from 'i18n-countries-continents';

// Get official capital city
console.log(getCapital('FR'));  // "Paris"
console.log(getCapital('USA')); // "Washington D.C." (supports alpha-3)
console.log(getCapital('JP'));  // "Tokyo"
console.log(getCapital('MA'));  // "Rabat"

// Reverse lookup: find country by capital city (case- & accent-insensitive)
const france = getCountryByCapital('Paris');
const brazil = getCountryByCapital('brasilia');    // Matches Brasília
const japan = getCountryByCapital('tokyo', 'es');  // Localized to 'Japón'
```

### 22. Primary IANA Timezones

```js
import { getTimezones, getCountriesByTimezone } from 'i18n-countries-continents';

// Get all IANA timezones for a country
console.log(getTimezones('FR'));  // ["Europe/Paris"]
console.log(getTimezones('JP'));  // ["Asia/Tokyo"]
console.log(getTimezones('MA'));  // ["Africa/Casablanca"]
console.log(getTimezones('US'));  // ["America/New_York", "America/Chicago", ...]

// Reverse lookup: find countries using an IANA timezone
const frCountries = getCountriesByTimezone('Europe/Paris');
const maCountries = getCountriesByTimezone('Africa/Casablanca');
```

### 23. Accent-insensitive & diacritic-insensitive search

All search methods (`searchCountries`, `searchCities`, `searchContinents`, `getCountryByName`, `getContinentByName`) automatically ignore accents and diacritics:

```js
import { searchCountries, searchCities, searchContinents } from 'i18n-countries-continents';

searchCountries('peru');        // Finds "Perú"
searchCountries('cote');        // Finds "Côte d'Ivoire"
searchCountries('aland');       // Finds "Åland Islands"
searchCountries('sao tome');    // Finds "São Tomé and Príncipe"

searchCities('cordoba', 'es');  // Finds "Córdoba"
searchCities('coruna', 'es');   // Finds "A Coruña"
searchCities('juarez', 'es');   // Finds "Acapulco de Juárez"

searchContinents('oceania');    // Finds "Oceanía"
searchContinents('africa');     // Finds "África"
```

### 24. Asian Locales: Chinese (`zh`) & Japanese (`ja`)

Full native translations across all 250 countries, 7 continents, and 4,010 cities:

```js
import { getCountry, getContinents } from 'i18n-countries-continents';

// Chinese (Simplified)
console.log(getCountry('US', 'zh').name); // "美国"
console.log(getCountry('CN', 'zh').name); // "中国"
console.log(getCountry('JP', 'zh').name); // "日本"

// Japanese
console.log(getCountry('US', 'ja').name); // "アメリカ"
console.log(getCountry('FR', 'ja').name); // "フランス"
console.log(getCountry('DE', 'ja').name); // "ドイツ"
```

---

## Framework Usage

### React

```jsx
import { getCountries, toSelectOptions } from 'i18n-countries-continents';

function CountrySelector() {
  const options = toSelectOptions(getCountries('fr'), {
    label: (c) => `${c.flag} ${c.name}`,
    sort: true,
    language: 'fr',
  });

  return (
    <select defaultValue="FR">
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
```

### Vue

```vue
<script setup>
import { getCountries } from 'i18n-countries-continents';
const countries = getCountries('es');
</script>

<template>
  <ul>
    <li v-for="c in countries" :key="c.code">{{ c.flag }} {{ c.name }}</li>
  </ul>
</template>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { getCountries, Country } from 'i18n-countries-continents';

@Component({ selector: 'app-root', template: `
  <li *ngFor="let c of countries">{{ c.flag }} {{ c.name }}</li>
` })
export class AppComponent {
  countries: Country[] = getCountries('en');
}
```

### Node.js (ESM)

```js
import { getCountryName, getContinentByCountry, getContinentName } from 'i18n-countries-continents';

const code = 'US';
const continent = getContinentByCountry(code);          // "NA"
const name = getContinentName(continent, 'es');          // "Norteamérica"
console.log(`${code} is in ${name}`);
```

### Node.js (CommonJS)

```js
const { getCountryName, getCountryFlag, getContinentByCountry } = require('i18n-countries-continents');

console.log(getCountryName('US', 'en'));    // "United States"
console.log(getCountryFlag('FR'));           // 🇫🇷
console.log(getContinentByCountry('JP'));   // "AS"
```

### Sub-path imports (tree-shaking)

Import individual functions for the smallest possible bundle:

```js
import getCountryName          from 'i18n-countries-continents/get-country-name';
import getCountryFlag          from 'i18n-countries-continents/get-country-flag';
import getCountry              from 'i18n-countries-continents/get-country';
import getCountryByName        from 'i18n-countries-continents/get-country-by-name';
import getCountryByAlpha3      from 'i18n-countries-continents/get-country-by-alpha3';
import getCountryByNumeric     from 'i18n-countries-continents/get-country-by-numeric';
import getCountries            from 'i18n-countries-continents/get-countries';
import getCountriesByContinent from 'i18n-countries-continents/get-countries-by-continent';
import searchCountries         from 'i18n-countries-continents/search-countries';
import getCapital              from 'i18n-countries-continents/get-capital';
import getCountryByCapital     from 'i18n-countries-continents/get-country-by-capital';
import getTimezones            from 'i18n-countries-continents/get-timezones';
import getCountriesByTimezone  from 'i18n-countries-continents/get-countries-by-timezone';
import getCallingCode          from 'i18n-countries-continents/get-calling-code';
import getCurrency             from 'i18n-countries-continents/get-currency';
import getCountriesByCallingCode from 'i18n-countries-continents/get-countries-by-calling-code';
import getCountriesByCurrency  from 'i18n-countries-continents/get-countries-by-currency';
import getContinent            from 'i18n-countries-continents/get-continent';
import getContinentByName      from 'i18n-countries-continents/get-continent-by-name';
import getContinentByCountry   from 'i18n-countries-continents/get-continent-by-country';
import getContinentName        from 'i18n-countries-continents/get-continent-name';
import getContinents           from 'i18n-countries-continents/get-continents';
import searchContinents        from 'i18n-countries-continents/search-continents';
import getCity                 from 'i18n-countries-continents/get-city';
import getCityName             from 'i18n-countries-continents/get-city-name';
import getCities               from 'i18n-countries-continents/get-cities';
import searchCities            from 'i18n-countries-continents/search-cities';
import getSupportedLanguages   from 'i18n-countries-continents/get-supported-languages';
import isValidCountryCode      from 'i18n-countries-continents/is-valid-country-code';
import isValidContinentCode    from 'i18n-countries-continents/is-valid-continent-code';
import isValidLanguage         from 'i18n-countries-continents/is-valid-language';
import toSelectOptions         from 'i18n-countries-continents/to-select-options';
import { normalizeText }       from 'i18n-countries-continents/normalize';
import { sortCountries, sortContinents, sortCities } from 'i18n-countries-continents/sorting';
import { alpha2ToAlpha3, alpha3ToAlpha2, alpha2ToNumeric, numericToAlpha2 } from 'i18n-countries-continents/iso-converters';
import { SUPPORTED_LANGUAGES, LANGUAGES } from 'i18n-countries-continents/constants';
```

---

## Data Coverage

### Countries: 250
| Continent | Count |
|-----------|-------|
| Africa | 58 countries |
| Antarctica | 5 territories |
| Asia | 53 countries |
| Europe | 53 countries |
| North America | 41 countries |
| Oceania | 26 countries |
| South America | 14 countries |

### Continents: 7
All continents fully covered with translations in all 10 languages.

### Cities: 4,010
Major cities from around the world — capital cities, major metropolitan areas, important economic centers, and cultural landmarks.

### Languages: 10
| Code | Language | Native Name | Coverage |
|------|----------|-------------|----------|
| `en` | English  | English     | 100% |
| `es` | Spanish  | Español     | 100% |
| `fr` | French   | Français    | 100% |
| `ar` | Arabic   | العربية     | 100% |
| `nl` | Dutch    | Nederlands  | 100% |
| `de` | German   | Deutsch     | 100% |
| `pt` | Portuguese | Português | 100% |
| `it` | Italian  | Italiano    | 100% |
| `zh` | Chinese  | 中文        | 100% |
| `ja` | Japanese | 日本語      | 100% |

---

## API Reference

### Country Functions

#### `getCountry(code, language?): Country | undefined`
Get the complete country object (`code`, `alpha3`, `numeric`, `name`, `continent`, `flag`, `capital`, `timezones`, `callingCode`, `currency`). Accepts both 2-letter alpha-2 (`'FR'`) and 3-letter alpha-3 (`'FRA'`) codes (case-insensitive).

#### `getCountryByAlpha3(alpha3, language?): Country | undefined`
Get a Country object by its 3-letter ISO 3166-1 alpha-3 code (e.g. `'USA'`, `'FRA'`, `'MAR'`).

#### `getCountryByNumeric(numeric, language?): Country | undefined`
Get a Country object by its 3-digit ISO 3166-1 numeric code (e.g. `'840'` or `840`).

#### `getCountryName(code, language?): string | undefined`
Get the name of a country by its ISO 3166-1 alpha-2 code.
- `code` — country code, e.g. `'US'`, `'FR'` (case-insensitive)
- `language` — one of `'en' | 'es' | 'fr' | 'ar' | 'nl' | 'de' | 'pt' | 'it' | 'zh' | 'ja'` (default: `'en'`)

#### `getCountryByName(name, language?): Country | undefined`
Reverse lookup: find a country object by its translated or English name (case- and accent-insensitive).

#### `getCountryFlag(code): string | undefined`
Get the flag emoji for a country by its ISO 3166-1 alpha-2 code.

#### `getCountries(language?): Country[]`
Get all 250 countries with their names, flags, continent codes, alpha-3, numeric codes, capitals, timezones, calling codes, and currencies in the specified language.

#### `getCountriesByContinent(continentCode, language?): Country[]`
Get all countries belonging to a specific continent (`'AF' | 'AN' | 'AS' | 'EU' | 'NA' | 'OC' | 'SA'`).

#### `searchCountries(query, language?, limit?): Country[]`
Search for countries by name, alpha-2 code, alpha-3 code, numeric code, capital city, timezone, calling code, or currency. Searches are accent- and diacritic-insensitive with exact and prefix match prioritization (default `limit`: 10).

#### `getCapital(code): string | undefined`
Get the official capital city for a country by alpha-2 or alpha-3 code (e.g. `'FR'` -> `'Paris'`, `'USA'` -> `'Washington D.C.'`). Convenience alias: `getCountryCapital`.

#### `getCountryByCapital(capitalName, language?): Country | undefined`
Reverse lookup: find a country object by its capital city name (case- and accent-insensitive).

#### `getTimezones(code): string[]`
Get the list of IANA timezone identifiers for a country (e.g. `'FR'` -> `['Europe/Paris']`). Convenience alias: `getCountryTimezones`.

#### `getCountriesByTimezone(timezone, language?): Country[]`
Find all countries using a specific IANA timezone identifier (e.g. `'Europe/Paris'`).

#### `getContinentByCountry(code): string | undefined`
Get the continent code for a country (e.g. `'EU'`, `'AS'`, `'NA'`).

#### `getCallingCode(code): string | undefined`
Get the international calling dial code for a country (e.g. `'+1'`, `'+33'`, `'+212'`). Convenience alias: `getCountryCallingCode`.

#### `getCurrency(code): Currency | undefined`
Get currency information (`{ code, symbol, name }`) for a country (e.g. `{ code: 'USD', symbol: '$', name: 'US Dollar' }`). Convenience alias: `getCountryCurrency`.

#### `getCountriesByCallingCode(callingCode, language?): Country[]`
Find all countries that share an international calling code (e.g. `'+1'` returns US, Canada, etc.).

#### `getCountriesByCurrency(currencyCode, language?): Country[]`
Find all countries that use a specific currency code (e.g. `'EUR'` returns Eurozone countries).

#### ISO Code Conversion Helpers
Fast $O(1)$ conversion between ISO standards:
- `alpha2ToAlpha3(alpha2): string | undefined` (e.g. `'US'` -> `'USA'`)
- `alpha3ToAlpha2(alpha3): string | undefined` (e.g. `'USA'` -> `'US'`)
- `alpha2ToNumeric(alpha2): string | undefined` (e.g. `'US'` -> `'840'`)
- `numericToAlpha2(numeric): string | undefined` (e.g. `'840'` or `840` -> `'US'`)

---

### Continent Functions

#### `getContinent(code, language?): Continent | undefined`
Get the complete continent object (`code`, `name`) for a continent code.

#### `getContinentName(code, language?): string | undefined`
Get the name of a continent by its code (`'AF' | 'AN' | 'AS' | 'EU' | 'NA' | 'OC' | 'SA'`).

#### `getContinentByName(name, language?): Continent | undefined`
Reverse lookup: find a continent by its translated or English name (case- and accent-insensitive).

#### `getContinents(language?): Continent[]`
Get all 7 continents with their names in the specified language.

#### `searchContinents(query, language?, limit?): Continent[]`
Search for continents by name or 2-letter code (case- and accent-insensitive, default `limit`: 7).

---

### Language Functions

#### `getSupportedLanguages(): Language[]`
Get all supported languages with their code, English name, and native localized name. Ideal for language pickers and dropdowns.

---

### City Functions

#### `getCity(cityName, language?): City | undefined`
Get the complete city object (`name`, `translatedName`) by its English name.

#### `getCityName(cityName, language?): string | undefined`
Get the translated name of a city by its English name.

#### `getCities(language?): City[]`
Get all 4,010 cities with their translated names in the specified language.

#### `searchCities(query, language?, limit?): City[]`
Search for cities by name (searches both English and translated names, case- and accent-insensitive).
- `limit` — max results to return (default: `10`)

---

### Text & Normalization Helpers

#### `normalizeText(str): string`
Lowercases, trims, and strips Unicode accents/diacritics using standard Unicode NFD decomposition (e.g. `'Perú'` -> `'peru'`, `'Côte d\'Ivoire'` -> `'cote d\'ivoire'`).

---

### Sorting Helpers (Locale-Aware)

#### `sortCountries(countries, language?): Country[]`
Sort a list of Country objects alphabetically by localized name using locale-aware collation (`Intl.Collator`).

#### `sortContinents(continents, language?): Continent[]`
Sort a list of Continent objects alphabetically by localized name.

#### `sortCities(cities, language?): City[]`
Sort a list of City objects alphabetically by localized name.

---

### Validation Helpers

#### `isValidCountryCode(code): boolean`
Check if a string is a valid ISO 3166-1 alpha-2 country code.

#### `isValidContinentCode(code): boolean`
Check if a string is a valid 2-letter continent code.

#### `isValidLanguage(language): boolean`
TypeScript type-guard checking if a language string is supported (`'en'`, `'es'`, `'fr'`, `'ar'`, `'nl'`, `'de'`, `'pt'`, `'it'`, `'zh'`, `'ja'`).

---

### UI Helpers

#### `toSelectOptions(items, config?): SelectOption[]`
Transform countries, continents, or cities into `{ value, label }` options for HTML `<select>`, React Select, Vuetify, Angular Material, etc.
- `config.value` — key name or resolver function (default: `'code'`)
- `config.label` — key name or resolver function (default: `'name'`)
- `config.sort` — whether to sort options alphabetically by label (default: `false`)
- `config.language` — locale used for sorting (default: `'en'`)

---

### Constants & Types

```typescript
import { SUPPORTED_LANGUAGES, LANGUAGES } from 'i18n-countries-continents';
// ['en', 'es', 'fr', 'ar', 'nl', 'de', 'pt', 'it', 'zh', 'ja']

type SupportedLanguage = 
  | 'en' | 'es' | 'fr' | 'ar' | 'nl' 
  | 'de' | 'pt' | 'it' | 'zh' | 'ja';

interface Language {
  code: SupportedLanguage;
  name: string;       // e.g. "Chinese", "Japanese"
  nativeName: string; // e.g. "中文", "日本語"
}

interface Currency {
  code: string;   // ISO 4217 code, e.g. "USD", "EUR"
  symbol: string; // e.g. "$", "€"
  name: string;   // e.g. "US Dollar", "Euro"
}

interface Country {
  code: string;        // ISO 3166-1 alpha-2, e.g. "US"
  alpha3: string;      // ISO 3166-1 alpha-3, e.g. "USA"
  numeric: string;     // ISO 3166-1 numeric, e.g. "840"
  continent: string;   // Continent code, e.g. "NA"
  name: string;        // Localized country name
  flag: string;        // Emoji flag, e.g. "🇺🇸"
  capital: string;     // Official capital city, e.g. "Washington D.C."
  timezones: string[]; // Primary IANA timezones, e.g. ["America/New_York", ...]
  callingCode: string; // International dial code, e.g. "+1", "+33"
  currency: Currency;  // Currency info (code, symbol, name)
}

interface Continent {
  code: string; // e.g. "EU"
  name: string; // translated name
}

interface City {
  name: string;           // English name
  translatedName: string; // translated name
}

interface SelectOption {
  value: string;
  label: string;
}
```

---

## License

MIT © [Aissam EL Houref](https://github.com/ElhourefAissam)
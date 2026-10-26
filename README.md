# i18n-countries-continents

Get country, continent, and city names in different languages. **250 countries**, **7 continents**, and **4,010 cities** with full translations in **8 languages**. Works in React, Angular, Vue, Svelte, Node.js, and any JavaScript environment.

[![npm version](https://img.shields.io/npm/v/i18n-countries-continents.svg)](https://www.npmjs.com/package/i18n-countries-continents)
[![npm downloads](https://img.shields.io/npm/dm/i18n-countries-continents.svg)](https://www.npmjs.com/package/i18n-countries-continents)
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
- 🗺️ **7 continents** — All continents included
- 🏙️ **4,010 cities** — Major cities from around the world
- 🌐 **8 languages** — English, Spanish, French, Arabic, Dutch, German, Portuguese, Italian (100% coverage)
- 📦 **Zero dependencies** — Lightweight and fast
- 🔤 **ISO 3166-1 codes** — Standard alpha-2 country codes
- 💪 **TypeScript** — Full type definitions included
- ⚡ **Tree-shakeable** — Import only what you need
- 🎯 **Universal** — Works with ESM and CommonJS

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
// { code: "FR", continent: "EU", flag: "🇫🇷", name: "Francia" }
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
import getCountries            from 'i18n-countries-continents/get-countries';
import getCountriesByContinent from 'i18n-countries-continents/get-countries-by-continent';
import searchCountries         from 'i18n-countries-continents/search-countries';
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
import { sortCountries, sortContinents, sortCities } from 'i18n-countries-continents/sorting';
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
All continents fully covered with translations in all 8 languages.

### Cities: 4,010
Major cities from around the world — capital cities, major metropolitan areas, important economic centers, and cultural landmarks.

### Languages: 8
| Code | Language | Coverage |
|------|----------|----------|
| `en` | English  | 100% |
| `es` | Spanish  | 100% |
| `fr` | French   | 100% |
| `ar` | Arabic   | 100% |
| `nl` | Dutch    | 100% |
| `de` | German   | 100% |
| `pt` | Portuguese | 100% |
| `it` | Italian  | 100% |

---

## API Reference

### Country Functions

#### `getCountry(code, language?): Country | undefined`
Get the complete country object (`code`, `name`, `continent`, `flag`) for a country code.

#### `getCountryName(code, language?): string | undefined`
Get the name of a country by its ISO 3166-1 alpha-2 code.
- `code` — country code, e.g. `'US'`, `'FR'` (case-insensitive)
- `language` — one of `'en' | 'es' | 'fr' | 'ar' | 'nl' | 'de' | 'pt' | 'it'` (default: `'en'`)

#### `getCountryByName(name, language?): Country | undefined`
Reverse lookup: find a country object by its translated or English name.

#### `getCountryFlag(code): string | undefined`
Get the flag emoji for a country by its ISO 3166-1 alpha-2 code.

#### `getCountries(language?): Country[]`
Get all 250 countries with their names, flags, and continent codes in the specified language.

#### `getCountriesByContinent(continentCode, language?): Country[]`
Get all countries belonging to a specific continent (`'AF' | 'AN' | 'AS' | 'EU' | 'NA' | 'OC' | 'SA'`).

#### `searchCountries(query, language?, limit?): Country[]`
Search for countries by name or code. (default `limit`: 10)

#### `getContinentByCountry(code): string | undefined`
Get the continent code for a country (e.g. `'EU'`, `'AS'`, `'NA'`).

---

### Continent Functions

#### `getContinent(code, language?): Continent | undefined`
Get the complete continent object (`code`, `name`) for a continent code.

#### `getContinentName(code, language?): string | undefined`
Get the name of a continent by its code (`'AF' | 'AN' | 'AS' | 'EU' | 'NA' | 'OC' | 'SA'`).

#### `getContinentByName(name, language?): Continent | undefined`
Reverse lookup: find a continent by its translated or English name.

#### `getContinents(language?): Continent[]`
Get all 7 continents with their names in the specified language.

#### `searchContinents(query, language?, limit?): Continent[]`
Search for continents by name or 2-letter code (default `limit`: 7).

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
Search for cities by name (searches both English and translated names).
- `limit` — max results to return (default: `10`)

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
TypeScript type-guard checking if a language string is supported (`'en'`, `'es'`, `'fr'`, `'ar'`, `'nl'`, `'de'`, `'pt'`, `'it'`).

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
// ['en', 'es', 'fr', 'ar', 'nl', 'de', 'pt', 'it']

type SupportedLanguage = 'en' | 'es' | 'fr' | 'ar' | 'nl' | 'de' | 'pt' | 'it';

interface Language {
  code: SupportedLanguage;
  name: string;       // e.g. "Spanish"
  nativeName: string; // e.g. "Español"
}

interface Country {
  code: string;      // ISO 3166-1 alpha-2, e.g. "US"
  continent: string; // e.g. "NA"
  name: string;      // translated name
  flag: string;      // emoji, e.g. "🇺🇸"
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
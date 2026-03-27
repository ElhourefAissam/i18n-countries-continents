# i18n-countries-continents

Get country, continent, and city names in different languages. **250 countries**, **7 continents**, and **4,010 cities** with full translations in **5 languages**. Works in React, Angular, Vue, Svelte, Node.js, and any JavaScript environment.

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
- 🌐 **5 languages** — English, Spanish, French, Arabic, Dutch (100% coverage)
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

---

## Framework Usage

### React

```jsx
import { getCountries, getCountryFlag } from 'i18n-countries-continents';

function CountrySelector() {
  const countries = getCountries('fr');
  return (
    <select>
      {countries.map(c => (
        <option key={c.code} value={c.code}>
          {c.flag} {c.name}
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
import getCountryName from 'i18n-countries-continents/get-country-name';
import getCountryFlag from 'i18n-countries-continents/get-country-flag';
import getCountries   from 'i18n-countries-continents/get-countries';
import getContinents  from 'i18n-countries-continents/get-continents';
import getContinentByCountry from 'i18n-countries-continents/get-continent-by-country';
import getContinentName      from 'i18n-countries-continents/get-continent-name';
import getCityName    from 'i18n-countries-continents/get-city-name';
import getCities      from 'i18n-countries-continents/get-cities';
import searchCities   from 'i18n-countries-continents/search-cities';
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
All continents fully covered with translations in all 5 languages.

### Cities: 4,010
Major cities from around the world — capital cities, major metropolitan areas, important economic centers, and cultural landmarks.

### Languages: 5
| Code | Language | Coverage |
|------|----------|----------|
| `en` | English  | 100% |
| `es` | Spanish  | 100% |
| `fr` | French   | 100% |
| `ar` | Arabic   | 100% |
| `nl` | Dutch    | 100% |

---

## API Reference

### Country Functions

#### `getCountryName(code, language?): string | undefined`
Get the name of a country by its ISO 3166-1 alpha-2 code.
- `code` — country code, e.g. `'US'`, `'FR'` (case-insensitive)
- `language` — one of `'en' | 'es' | 'fr' | 'ar' | 'nl'` (default: `'en'`)

#### `getCountryFlag(code): string | undefined`
Get the flag emoji for a country by its ISO 3166-1 alpha-2 code.

#### `getCountries(language?): Country[]`
Get all 250 countries with their names, flags, and continent codes in the specified language.

#### `getContinentByCountry(code): string | undefined`
Get the continent code for a country (e.g. `'EU'`, `'AS'`, `'NA'`).

---

### Continent Functions

#### `getContinentName(code, language?): string | undefined`
Get the name of a continent by its code (`'AF' | 'AN' | 'AS' | 'EU' | 'NA' | 'OC' | 'SA'`).

#### `getContinents(language?): Continent[]`
Get all 7 continents with their names in the specified language.

---

### City Functions

#### `getCityName(cityName, language?): string | undefined`
Get the translated name of a city by its English name.

#### `getCities(language?): City[]`
Get all 4,010 cities with their translated names in the specified language.

#### `searchCities(query, language?, limit?): City[]`
Search for cities by name (searches both English and translated names).
- `limit` — max results to return (default: `10`)

---

### Constants & Types

```typescript
import { SUPPORTED_LANGUAGES } from 'i18n-countries-continents';
// ['en', 'es', 'fr', 'ar', 'nl']

type SupportedLanguage = 'en' | 'es' | 'fr' | 'ar' | 'nl';

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
```

---

## License

MIT © [Aissam EL Houref](https://github.com/ElhourefAissam)
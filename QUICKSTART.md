# Quick Start Guide

## Installation

```bash
npm install i18n-countries-continents
# or
pnpm add i18n-countries-continents
# or
yarn add i18n-countries-continents
```

## Basic Usage

### Import Functions

```typescript
import {
  // Country services
  getCountryName,
  getCountryFlag,
  getCountry,
  getCountries,
  getCountryByName,
  getCountryByAlpha3,
  getCountryByNumeric,
  getContinentByCountry,
  searchCountries,
  // Capital & Timezone services
  getCapital,
  getCountryByCapital,
  getTimezones,
  getCountriesByTimezone,
  // Phone & Currency services
  getCallingCode,
  getCurrency,
  getCountriesByCallingCode,
  getCountriesByCurrency,
  // Continent services
  getContinentName,
  getContinents,
  getContinent,
  getContinentByName,
  searchContinents,
  // City services
  getCityName,
  getCities,
  getCity,
  searchCities,
  // Utilities & Constants
  SUPPORTED_LANGUAGES,
  LANGUAGES,
  getSupportedLanguages,
  toSelectOptions,
  alpha2ToAlpha3,
  alpha3ToAlpha2,
  alpha2ToNumeric,
  numericToAlpha2,
} from 'i18n-countries-continents';
```

### Get Country Name

```typescript
getCountryName('US', 'en'); // "United States"
getCountryName('US', 'es'); // "Estados Unidos"
getCountryName('FR', 'fr'); // "France"
getCountryName('JP', 'ar'); // "اليابان"
```

### Get Country Flag

```typescript
getCountryFlag('US'); // "🇺🇸"
getCountryFlag('FR'); // "🇫🇷"
getCountryFlag('JP'); // "🇯🇵"
getCountryFlag('BR'); // "🇧🇷"
```

### Get All Countries

```typescript
const countries = getCountries('en');
// [
//   { code: 'US', name: 'United States', continent: 'NA', flag: '🇺🇸' },
//   { code: 'CA', name: 'Canada', continent: 'NA', flag: '🇨🇦' },
//   ...
// ]
```

### Get Continent by Country

```typescript
getContinentByCountry('US'); // "NA"
getContinentByCountry('FR'); // "EU"
getContinentByCountry('JP'); // "AS"
```

### Get Continent Name

```typescript
getContinentName('NA', 'en'); // "North America"
getContinentName('EU', 'es'); // "Europa"
getContinentName('AS', 'fr'); // "Asie"
```

### Get All Continents

```typescript
const continents = getContinents('es');
// [
//   { code: 'AF', name: 'África' },
//   { code: 'AN', name: 'Antártida' },
//   { code: 'AS', name: 'Asia' },
//   ...
// ]
```

### Get City Name

```typescript
getCityName('Paris', 'en'); // "Paris"
getCityName('Paris', 'fr'); // "Paris"
getCityName('Paris', 'ar'); // "باريس"
getCityName('London', 'fr'); // "Londres"
getCityName('New York', 'es'); // "Nuevo York"
```

### Get All Cities

```typescript
const cities = getCities('nl');
// [
//   { name: 'Amsterdam', translatedName: 'Amsterdam' },
//   { name: 'Paris', translatedName: 'Parijs' },
//   { name: 'London', translatedName: 'Londen' },
//   ...
// ]
```

### Search Cities

```typescript
// Search for cities containing "york"
const results = searchCities('york', 'en', 5);
// [
//   { name: 'New York', translatedName: 'New York' },
//   { name: 'York', translatedName: 'York' },
//   { name: 'East York', translatedName: 'East York' },
//   ...
// ]

// Search in different language
const parisResults = searchCities('paris', 'fr', 3);
```

## Framework Examples

### React

```jsx
import { useState } from 'react';
import { getCountries } from 'i18n-countries-continents';

function CountrySelector() {
  const [language, setLanguage] = useState('en');
  const countries = getCountries(language);

  return (
    <div>
      <select onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>

      <select>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}
```

### Vue 3

```vue
<template>
  <div>
    <select v-model="language">
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>

    <select>
      <option
        v-for="country in countries"
        :key="country.code"
        :value="country.code"
      >
        {{ country.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getCountries } from 'i18n-countries-continents';

const language = ref('en');
const countries = computed(() => getCountries(language.value));
</script>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { getCountries } from 'i18n-countries-continents';

@Component({
  selector: 'app-country-selector',
  template: `
    <select [(ngModel)]="language" (change)="loadCountries()">
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>

    <select>
      <option *ngFor="let country of countries" [value]="country.code">
        {{ country.name }}
      </option>
    </select>
  `,
})
export class CountrySelectorComponent {
  language = 'en';
  countries = getCountries(this.language);

  loadCountries() {
    this.countries = getCountries(this.language);
  }
}
```

### Svelte

```svelte
<script>
  import { getCountries } from 'i18n-countries-continents';
  
  let language = 'en';
  $: countries = getCountries(language);
</script>

<select bind:value={language}>
  <option value="en">English</option>
  <option value="es">Español</option>
  <option value="fr">Français</option>
</select>

<select>
  {#each countries as country}
    <option value={country.code}>
      {country.name}
    </option>
  {/each}
</select>
```

### Next.js (App Router)

```typescript
'use client';

import { useState } from 'react';
import { getCountries, getCountryName } from 'i18n-countries-continents';

export default function CountryList() {
  const [lang, setLang] = useState('en');
  const countries = getCountries(lang);

  return (
    <div>
      <h1>Countries List</h1>
      <select onChange={(e) => setLang(e.target.value)} value={lang}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>
      <ul>
        {countries.map((country) => (
          <li key={country.code}>
            {country.code}: {country.name} ({country.continent})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Node.js/Express

```javascript
const express = require('express');
const { getCountries, getContinentByCountry } = require('i18n-countries-continents');

const app = express();

app.get('/api/countries/:lang?', (req, res) => {
  const language = req.params.lang || 'en';
  const countries = getCountries(language);
  res.json(countries);
});

app.get('/api/country/:code/continent', (req, res) => {
  const continent = getContinentByCountry(req.params.code);
  if (continent) {
    res.json({ continent });
  } else {
    res.status(404).json({ error: 'Country not found' });
  }
});

app.listen(3000);
```

## TypeScript Support

Full TypeScript support included:

```typescript
import type {
  SupportedLanguage,
  Country,
  Continent,
  CountryCode,
  ContinentCode,
} from 'i18n-countries-continents';

const lang: SupportedLanguage = 'es';
const countries: Country[] = getCountries(lang);
```

## Available Languages

```typescript
import { SUPPORTED_LANGUAGES, LANGUAGES } from 'i18n-countries-continents';

console.log(SUPPORTED_LANGUAGES);
// ['en', 'es', 'fr', 'ar', 'nl', 'de', 'pt', 'it', 'zh', 'ja']
```

- `en` — English
- `es` — Spanish (Español)
- `fr` — French (Français)
- `ar` — Arabic (العربية)
- `nl` — Dutch (Nederlands)
- `de` — German (Deutsch)
- `pt` — Portuguese (Português)
- `it` — Italian (Italiano)
- `zh` — Chinese (中文)
- `ja` — Japanese (日本語)

## Continent Codes

- `AF` - Africa
- `AN` - Antarctica
- `AS` - Asia
- `EU` - Europe
- `NA` - North America
- `OC` - Oceania
- `SA` - South America

## Country Codes & Identifiers

All 250 countries provide complete ISO 3166-1 identifiers:
- **Alpha-2** (2-letter): `US`, `FR`, `DE`, `JP`, `MA`, ...
- **Alpha-3** (3-letter): `USA`, `FRA`, `DEU`, `JPN`, `MAR`, ...
- **Numeric** (3-digit): `840`, `250`, `276`, `392`, `504`, ...
- **Capitals**: `Washington D.C.`, `Paris`, `Berlin`, `Tokyo`, `Rabat`, ...
- **Timezones**: `['America/New_York', ...]`, `['Europe/Paris']`, `['Asia/Tokyo']`, ...

## Tips

### Case Insensitive

```typescript
getCountryName('us', 'en'); // Works!
getCountryName('US', 'en'); // Also works!
getCountryName('Us', 'en'); // This too!
```

### Fallback to English

If a translation is missing, it automatically falls back to English:

```typescript
// If German translation missing, returns English
getCountryName('US', 'de'); // "United States" (en fallback)
```

### Filter by Continent

```typescript
const countries = getCountries('en');
const europeanCountries = countries.filter(c => c.continent === 'EU');
```

### Search Countries

```typescript
const countries = getCountries('en');
const searchTerm = 'united';
const results = countries.filter(c => 
  c.name.toLowerCase().includes(searchTerm.toLowerCase())
);
```

## Need Help?

- 📖 [Full Documentation](README.md)
- 🐛 [Report Issues](https://github.com/ElhourefAissam/i18n-countries-continents/issues)
- 💡 [Request Features](https://github.com/ElhourefAissam/i18n-countries-continents/issues/new)
- 🤝 [Contributing Guide](CONTRIBUTING.md)

## What's Next?

- Add more countries (contributions welcome!)
- Add more languages
- Add country flags
- Add timezone support
- And much more!

---

Happy coding! 🚀

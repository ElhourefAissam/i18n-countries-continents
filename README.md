# i18n-countries-continents

Get country, continent, and city names in different languages. **250 countries**, **7 continents**, and **4,010 cities** with full translations in 5 languages. Works in React, Angular, Vue, Node.js, and any JavaScript environment.

## Installation

```sh
npm install i18n-countries-continents
```

## Features

- 🌍 **250 countries** - Complete coverage of all world countries
- � **Country flags** - Flag emoji for every country
- �🗺️ **7 continents** - All continents included
- 🏙️ **4,010 cities** - Major cities from around the world
- 🌐 **5 languages** - English, Spanish, French, Arabic, Dutch (100% coverage)
- 📦 **Zero dependencies** - Lightweight and fast
- 🔤 **ISO 3166-1 codes** - Standard country codes
- 💪 **TypeScript** - Full type definitions included
- ⚡ **Tree-shakeable** - Import only what you need
- 🎯 Works with React, Angular, Vue, Svelte, Node.js, and plain JavaScript

## Usage

### 1. Get a country name in a specific language

```js
import { getCountryName } from 'i18n-countries-continents';

console.log(getCountryName('FR', 'fr')); // France
console.log(getCountryName('FR', 'es')); // Francia
```

### 2. Get a country flag

```js
import { getCountryFlag } from 'i18n-countries-continents';

console.log(getCountryFlag('US')); // 🇺🇸
console.log(getCountryFlag('FR')); // 🇫🇷
console.log(getCountryFlag('JP')); // 🇯🇵
```

### 3. List all countries in a language

```js
import { getCountries } from 'i18n-countries-continents';

const countries = getCountries('en');
countries.forEach(c => console.log(c.flag, c.code, c.name));
// Output: 🇺🇸 US United States
//         🇫🇷 FR France
//         ...
```

### 4. Get a continent code by country code

```js
import { getContinentByCountry } from 'i18n-countries-continents';

console.log(getContinentByCountry('US')); // "NA"
```

### 5. Get a continent name in a specific language

```js
import { getContinentName } from 'i18n-countries-continents';

console.log(getContinentName('EU', 'es')); // Europa
```

### 6. List all continents in a language

```js
import { getContinents } from 'i18n-countries-continents';

const continents = getContinents('fr');
continents.forEach(c => console.log(c.code, c.name));
```

### 7. Get a city name in a specific language

```js
import { getCityName } from 'i18n-countries-continents';

console.log(getCityName('Paris', 'fr')); // Paris
console.log(getCityName('Paris', 'ar')); // باريس
console.log(getCityName('London', 'fr')); // Londres
```

### 8. List all cities in a language

```js
import { getCities } from 'i18n-countries-continents';

const cities = getCities('es');
cities.forEach(c => console.log(c.name, '→', c.translatedName));
```

### 9. Search for cities

```js
import { searchCities } from 'i18n-countries-continents';

// Search for cities containing "york" in English
const results = searchCities('york', 'en', 5);
results.forEach(c => console.log(c.name, '→', c.translatedName));

// Output:
// East York → East York
// New York → New York
// North York → North York
// York → York
```

---

## Framework Usage

### React

```jsx
import { getCountries } from 'i18n-countries-continents';

function CountryList() {
  const countries = getCountries('fr');
  return (
    <ul>
      {countries.map(c => <li key={c.code}>{c.name}</li>)}
    </ul>
  );
}
```

### Angular

```typescript
import { getCountries } from 'i18n-countries-continents';

@Component({ /* ... */ })
export class MyComponent {
  countries = getCountries('es');
}
```

### Vue

```javascript
import { getCountries } from 'i18n-countries-continents';

export default {
  data() {
    return {
      countries: getCountries('en')
    }
  }
}
```

### Node.js

```javascript
const { getContinentByCountry, getContinentName } = require('i18n-countries-continents');

const continentCode = getContinentByCountry('US');
const continentName = getContinentName(continentCode, 'es');
console.log(continentName); // Norteamérica
```

---

---

## Data Coverage

### Countries: 250
- **Africa**: 58 countries
- **Antarctica**: 5 territories
- **Asia**: 53 countries
- **Europe**: 53 countries
- **North America**: 41 countries
- **Oceania**: 26 countries
- **South America**: 14 countries

### Continents: 7
All continents fully covered with translations in all 5 languages.

### Cities: 4,010
Major cities from around the world including:
- Capital cities
- Major metropolitan areas
- Important economic centers
- Cultural landmarks

### Languages: 5
- English (en) - 100%
- Spanish (es) - 100%
- French (fr) - 100%
- Arabic (ar) - 100%
- Dutch (nl) - 100%

---

## API Reference

### Country Services

#### `getCountryName(code: string, language?: SupportedLanguage): string | undefined`
Get the name of a country by its ISO 3166-1 alpha-2 code.

#### `getCountryFlag(code: string): string | undefined`
Get the flag emoji for a country by its ISO 3166-1 alpha-2 code.

#### `getCountries(language?: SupportedLanguage): Country[]`
Get all countries with their names and flags in the specified language.

#### `getContinentByCountry(code: string): string | undefined`
Get the continent code for a country.

### Continent Services

#### `getContinentName(code: string, language?: SupportedLanguage): string | undefined`
Get the name of a continent by its code.

#### `getContinents(language?: SupportedLanguage): Continent[]`
Get all continents with their names in the specified language.

### City Services

#### `getCityName(cityName: string, language?: SupportedLanguage): string | undefined`
Get the translated name of a city.

#### `getCities(language?: SupportedLanguage): City[]`
Get all cities with their names in the specified language.

#### `searchCities(query: string, language?: SupportedLanguage, limit?: number): City[]`
Search for cities by name. Returns up to `limit` results (default: 10).

### Types

```typescript
type SupportedLanguage = 'en' | 'es' | 'fr' | 'ar' | 'nl';

interface Country {
  code: string;
  continent: string;
  name: string;
  flag: string;
}

interface Continent {
  code: string;
  name: string;
}

interface City {
  name: string;
  translatedName: string;
}
```

---

## Data Format

Country, continent, and city data is stored in JSON format in `src/data/` directory. This makes it easy to:
- Add new data or translations
- Update existing data
- Contribute via pull requests
- Parse and validate programmatically

---

---

## License

MIT

---
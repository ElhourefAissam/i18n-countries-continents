# i18n-countries-continents

Get country and continent names in different languages. Works in React, Angular, Vue, Node.js, and any JavaScript environment.

## Installation

```sh
npm install i18n-countries-continents
```

## Features

- Get country names in multiple languages
- Get continent names in multiple languages
- Look up continent by country code
- Works with React, Angular, Vue, Svelte, Node.js, and plain JavaScript

## Usage

### 1. Get a country name in a specific language

```js
import { getCountryName } from 'i18n-countries-continents';

console.log(getCountryName('FR', 'fr')); // France
console.log(getCountryName('FR', 'es')); // Francia
```

### 2. List all countries in a language

```js
import { getCountries } from 'i18n-countries-continents';

const countries = getCountries('en');
countries.forEach(c => console.log(c.code, c.name));
```

### 3. Get a continent code by country code

```js
import { getContinentByCountry } from 'i18n-countries-continents';

console.log(getContinentByCountry('US')); // "NA"
```

### 4. Get a continent name in a specific language

```js
import { getContinentName } from 'i18n-countries-continents';

console.log(getContinentName('EU', 'es')); // Europa
```

### 5. List all continents in a language

```js
import { getContinents } from 'i18n-countries-continents';

const continents = getContinents('fr');
continents.forEach(c => console.log(c.code, c.name));
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

## Data

- Country and continent data includes multiple languages (expandable).
- Add more translations or data as needed in `src/data/countries.ts` and `src/data/continents.ts`.

---

## License

MIT

---
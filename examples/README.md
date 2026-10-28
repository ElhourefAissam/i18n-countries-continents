# Examples & Integrations

This directory provides ready-to-run examples and reference implementations for `i18n-countries-continents`.

---

## 📂 Directory Contents

| Example | Description | Tech Stack |
| :--- | :--- | :--- |
| [interactive-demo/](interactive-demo/index.html) | Standalone interactive browser demo with search, continent filtering, and language switching | Pure HTML / ESM |
| [react/CountrySelect.tsx](react/CountrySelect.tsx) | Production-ready React component with TypeScript, flag support, and accessible form controls | React + TypeScript |
| [node/demo.js](node/demo.js) | Node.js script demonstrating all core APIs, translations, and select option generation | Node.js (ESM) |

---

## 1. Interactive Browser Demo

Open [`examples/interactive-demo/index.html`](interactive-demo/index.html) directly in any modern browser, or serve it locally:

```bash
# Using npx serve:
npx serve examples/interactive-demo

# Or using Python:
python3 -m http.server 3000 --directory examples/interactive-demo
```

### Features demonstrated:
- Multi-language switcher (`en`, `es`, `fr`, `ar`, `nl`, `de`, `pt`, `it`)
- Real-time country search by name or ISO code
- Continent filtering buttons
- Interactive card view with flag emoji and metadata
- Dynamic JavaScript code snippet generator

---

## 2. React Example

See [`examples/react/CountrySelect.tsx`](react/CountrySelect.tsx) for a complete component implementation.

### Quick Usage:

```tsx
import React, { useState } from 'react';
import { CountrySelect } from './CountrySelect';
import type { Country } from 'i18n-countries-continents';

export function MyForm() {
  const [selectedCountry, setSelectedCountry] = useState<Country>();

  return (
    <div>
      <label>Choose your country:</label>
      <CountrySelect
        language="fr"              // Localized into French
        continent="EU"             // Filter by Europe
        showFlags={true}           // Include emoji flags
        onChange={(c) => setSelectedCountry(c)}
      />
    </div>
  );
}
```

---

## 3. Node.js Script

Run the Node.js demonstration directly:

```bash
node examples/node/demo.js
```

### What it demonstrates:
- Translation lookup across all 8 supported languages
- Reverse continent lookup (`getContinentByCountry`)
- Filtering by continent (`getCountriesByContinent`)
- Case-insensitive search (`searchCountries`)
- Generating UI options (`toSelectOptions`) with custom formatting and locale-aware sorting

---

## 4. Vue 3 Composition API Snippet

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  getCountries,
  getSupportedLanguages,
  toSelectOptions,
  type Language
} from 'i18n-countries-continents';

const currentLang = ref<Language>('es');
const selectedCountry = ref('ES');

const countryOptions = computed(() => {
  return toSelectOptions(getCountries(currentLang.value), {
    label: (c) => `${c.flag} ${c.name}`,
    sort: true,
    language: currentLang.value
  });
});
</script>

<template>
  <div>
    <select v-model="selectedCountry">
      <option v-for="opt in countryOptions" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>
```

---

## 5. Next.js App Router (Server Component)

```tsx
// app/countries/page.tsx
import { getCountries, getContinentName } from 'i18n-countries-continents';

export default async function CountriesPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const lang = (params.lang || 'en') as 'en' | 'fr' | 'es';
  const countries = getCountries(lang);

  return (
    <main>
      <h1>Countries ({lang.toUpperCase()})</h1>
      <ul>
        {countries.map((c) => (
          <li key={c.code}>
            {c.flag} {c.name} — {getContinentName(c.continent, lang)}
          </li>
        ))}
      </ul>
    </main>
  );
}
```

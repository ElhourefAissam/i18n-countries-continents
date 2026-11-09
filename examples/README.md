# Examples & Reference Implementations

This directory provides interactive demos, reusable components, and reference implementations for `i18n-countries-continents`.

---

## 📂 Directory Contents

| Example | Description | Tech Stack |
| :--- | :--- | :--- |
| [interactive-demo/](interactive-demo/index.html) | Standalone full-featured interactive browser explorer & developer sandbox | Pure HTML / ESM |
| [react/CountrySelect.tsx](react/CountrySelect.tsx) | Production-ready React component with TypeScript, subdivisions, flags, and geo tools | React + TypeScript |
| [node/demo.js](node/demo.js) | Node.js script demonstrating all core APIs, translations, and select option generation | Node.js (ESM) |

---

## 1. Interactive Browser Explorer & Demo (`interactive-demo/index.html`)

Open [`examples/interactive-demo/index.html`](interactive-demo/index.html) directly in any modern browser, or serve it locally:

```bash
# Serve locally from repository root:
python3 -m http.server 3000

# Or using npx serve:
npx serve .
```

Then navigate to: `http://localhost:3000/examples/interactive-demo/index.html`

### 🌟 Features Demonstrated:
- **14 World Languages**: Instant multi-language switching across `en`, `es`, `fr`, `ar`, `nl`, `de`, `pt`, `it`, `zh`, `ja`, `ru`, `hi`, `ko`, `tr` with full **RTL support** for Arabic.
- **250 Countries Explorer**:
  - Grid & Table views with customizable sort (Localized Name, ISO code, Area, Dial code).
  - High-res Vector SVG flags via FlagCDN or native emoji flags.
  - Multi-faceted filters: Continent, UN Subregion, Regional Unions (EU, Schengen, EEA), Landlocked vs. Coastal, and Subdivisions.
  - Instant accent-insensitive search with `/` keyboard shortcut.
- **Country Inspector Modal**:
  - Full geospatial & geopolitical dossier (native name, coordinates, area km², calling code, currency, timezones, ccTLD, demonym).
  - Interactive neighboring borders (click any neighbor badge to jump directly).
  - 5 closest neighbors with geodesic distance in kilometers (`getNearestCountries`).
  - ISO 3166-2 Subdivisions preview.
  - Live TypeScript / ESM integration snippet generator.
- **4,010 Cities Directory**:
  - Search global cities localized across 14 languages (`getCities`, `searchCities`).
  - Modular `/cities` subpath demonstration.
- **ISO 3166-2 Subdivisions Browser**:
  - States, provinces, cantons, and prefectures across 17+ nations (US, CA, AU, GB, DE, FR, ES, IT, MX, BR, JP, IN, CN, RU, TR, NL, CH).
- **Geodesic Distance & Nearest Country Calculator**:
  - Interactive two-country distance calculator using the Haversine formula (`getDistance`).
  - Flight time estimation and great-circle calculation.
- **Developer Tools Sandbox**:
  - Bidirectional ISO 3166-1 Alpha-2 ⇄ Alpha-3 ⇄ Numeric code converter.
  - Live Postal / ZIP code validator against official national patterns (`isValidPostalCode`, `getPostalCodePattern`).
  - Reverse lookups by capital, ccTLD, demonym, calling code, and currency.
- **UI Select Options Generator (`toSelectOptions`)**:
  - Interactive visual builder for formatting localized data into standard `{ value, label }` dropdown options.
  - Live preview `<select>` and exportable code snippets for React, Vue, HTML, and JSON.

---

## 2. React Example (`react/CountrySelect.tsx`)

See [`examples/react/CountrySelect.tsx`](react/CountrySelect.tsx) for complete TypeScript implementations of:
- `<CountrySelect />`: Accessible, localized country dropdown with flag emojis, continent filters, and union filters.
- `<SubdivisionSelect />`: Linked state / province selector for supported nations.
- `<CountrySelectorApp />`: Interactive demo page showcasing country picker, distance calculator, and postal code validator.

### Quick Usage:

```tsx
import React, { useState } from 'react';
import { CountrySelect, SubdivisionSelect } from './CountrySelect';
import type { Country, Subdivision } from 'i18n-countries-continents';

export function CheckoutForm() {
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const [selectedState, setSelectedState] = useState<Subdivision>();

  return (
    <form>
      <label>Country:</label>
      <CountrySelect
        language="fr"               // Localized into French
        continent="EU"              // Filter by Europe
        union="EU"                  // Optional: filter to EU member nations
        showFlags={true}            // Include flag emojis
        onChange={(c) => setSelectedCountry(c)}
      />

      {selectedCountry && (
        <>
          <label>State / Province:</label>
          <SubdivisionSelect
            countryCode={selectedCountry.code}
            onChange={(s) => setSelectedState(s)}
          />
        </>
      )}
    </form>
  );
}
```

---

## 3. Node.js Demonstration Script (`node/demo.js`)

Run the comprehensive CLI demonstration directly:

```bash
node examples/node/demo.js
```

### What It Demonstrates:
1. 14 Supported Languages with native names
2. Multi-language translation across all 14 languages
3. Full Country object with all metadata (geography, telecom, currency, timezones, borders, demonyms)
4. Vector SVG & PNG flag URLs from FlagCDN
5. ISO 3166-1 Alpha-2, Alpha-3, and Numeric conversions
6. Regional Unions (EU, Schengen, EEA) filtering and checks
7. Geodesic distance calculation and nearest country search
8. ISO 3166-2 Subdivisions (states, provinces, cantons)
9. Cities directory across 14 languages
10. Postal / ZIP code validation with regex patterns
11. Reverse lookups by capital, ccTLD, demonym, dial code, currency, and spoken language
12. UI Select Options formatter (`toSelectOptions`) with localized collation

---

## 4. Vue 3 Composition API Snippet

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  getCountries,
  getSupportedLanguages,
  toSelectOptions,
  type SupportedLanguage
} from 'i18n-countries-continents';

const currentLang = ref<SupportedLanguage>('es');
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
import { getCountries, getContinentName, type SupportedLanguage } from 'i18n-countries-continents';

export default async function CountriesPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const lang = (params.lang || 'en') as SupportedLanguage;
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

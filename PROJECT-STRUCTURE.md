# Project Structure

This document describes the organized structure of the `i18n-countries-continents` package.

## 📁 Directory Organization

```
i18n-countries-continents/
├── src/                          # Source code
│   ├── data/                     # Data loading & language bundles
│   │   ├── lang/                 # Per-language compact data bundles
│   │   │   ├── en.json           # English bundle (~119 KB)
│   │   │   ├── es.json           # Spanish bundle (~120 KB)
│   │   │   ├── fr.json           # French bundle (~121 KB)
│   │   │   ├── ar.json           # Arabic bundle (~141 KB)
│   │   │   └── nl.json           # Dutch bundle (~120 KB)
│   │   └── loader.ts             # Language bundle loader
│   │
│   ├── services/                 # Service modules
│   │   ├── countries/            # Country-related services
│   │   │   ├── get-country-name.ts
│   │   │   ├── get-country-flag.ts
│   │   │   ├── get-countries.ts
│   │   │   ├── get-continent-by-country.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── continents/           # Continent-related services
│   │   │   ├── get-continent-name.ts
│   │   │   ├── get-continents.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── cities/               # City-related services
│   │   │   ├── get-city-name.ts
│   │   │   ├── get-cities.ts
│   │   │   ├── search-cities.ts
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts              # Service re-exports
│   │
│   ├── utils/                    # Utility modules
│   │   ├── types.ts              # TypeScript type definitions
│   │   ├── constants.ts          # Constants (SUPPORTED_LANGUAGES)
│   │   └── index.ts              # Utility exports
│   │
│   └── index.ts                  # Main package entry point
│
├── tests/                        # Test suites
│   ├── run-all.js                # Test runner script (runs all suites)
│   ├── comprehensive-test.ts     # 125 full API unit & edge-case tests
│   ├── real-world-test.ts        # 10 integration use cases
│   ├── npm-usage-test.ts         # Package simulation across environments
│   ├── test-with-flags.ts        # Flag emoji tests & verification
│   ├── test-all-services.ts      # Comprehensive service verification
│   └── test-example.ts           # Basic usage examples
│
├── dist/                         # Compiled ESM output (generated)
│   └── [mirrors src structure with .js, .d.ts, and source maps]
│
├── docs/                         # Additional documentation
├── README.md                     # Main documentation
├── QUICKSTART.md                 # Quick start guide
├── CHANGELOG.md                  # Version history
├── CONTRIBUTING.md               # Contribution guidelines
├── PUBLISHING.md                 # Publishing instructions
├── LICENSE                       # MIT License
├── package.json                  # Package configuration
├── tsconfig.json                 # TypeScript configuration
└── .gitignore                    # Git ignore rules
```

## 🎯 Module Organization

### Services Layer
All business logic is organized into service modules by domain:

- **Country Services** (`src/services/countries/`)
  - Handle country-related operations
  - ISO 3166-1 alpha-2 code support
  - 250 countries with full translations and flag emojis

- **Continent Services** (`src/services/continents/`)
  - Handle continent-related operations
  - 7 continents with full translations

- **City Services** (`src/services/cities/`)
  - Handle city-related operations
  - 4,010 major world cities
  - Includes fuzzy search functionality

### Data Layer
Data is stored in compact per-language JSON bundles (`src/data/lang/`):
- Format per bundle:
  - `countries`: `[code, continent, flag, name][]`
  - `continents`: `[code, name][]`
  - `cities`: `[englishName, translatedName][]`
- Managed via `src/data/loader.ts`.

## 📦 Import Paths

### Main Entry Point
```typescript
import {
  getCountryName,
  getCountryFlag,
  getCountries,
  getContinentByCountry,
  getContinentName,
  getContinents,
  getCityName,
  getCities,
  searchCities,
  SUPPORTED_LANGUAGES
} from 'i18n-countries-continents';
```

### Sub-path Imports (Tree-shakeable)
```typescript
import getCountryName from 'i18n-countries-continents/get-country-name';
import getCountryFlag from 'i18n-countries-continents/get-country-flag';
import getCountries from 'i18n-countries-continents/get-countries';
import getContinentByCountry from 'i18n-countries-continents/get-continent-by-country';
import getContinentName from 'i18n-countries-continents/get-continent-name';
import getContinents from 'i18n-countries-continents/get-continents';
import getCityName from 'i18n-countries-continents/get-city-name';
import getCities from 'i18n-countries-continents/get-cities';
import searchCities from 'i18n-countries-continents/search-cities';
```

## 📊 Project Statistics

- **Total Services**: 9
- **Total Countries**: 250 (100% with flags and translations)
- **Total Continents**: 7
- **Total Cities**: 4,010
- **Supported Languages**: 5 (`en`, `es`, `fr`, `ar`, `nl`)
- **Zero Dependencies**: Lightweight and fast

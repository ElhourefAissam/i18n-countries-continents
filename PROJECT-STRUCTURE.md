# Project Structure

This document describes the organized structure of the `i18n-countries-continents` package.

## 📁 Directory Organization

```
i18n-countries-continents/
├── src/                          # Source code
│   ├── data/                     # JSON data files
│   │   ├── countries.json        # 250 countries with translations
│   │   ├── continents.json       # 7 continents with translations
│   │   └── cities.json           # 4,010 cities with translations
│   │
│   ├── services/                 # Service modules
│   │   ├── countries/            # Country-related services
│   │   │   ├── get-country-name.ts
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
│   │   └── index.ts              # Service exports
│   │
│   ├── utils/                    # Utility modules
│   │   ├── types.ts              # TypeScript type definitions
│   │   ├── constants.ts          # Constants (SUPPORTED_LANGUAGES)
│   │   └── index.ts              # Utility exports
│   │
│   └── index.ts                  # Main package entry point
│
├── tests/                        # Test files
│   ├── test-all-services.ts      # Comprehensive service tests
│   └── test-example.ts           # Basic usage examples
│
├── docs/                         # Additional documentation
│   ├── DATA-MIGRATION.md         # Data migration history
│   ├── MERGE-REPORT.md           # Country merge report
│   ├── PROJECT-STATUS.md         # Project status
│   └── SETUP-VERIFICATION.md     # Setup verification
│
├── examples/                     # Usage examples
│   └── README.md                 # Examples directory info
│
├── dist/                         # Compiled output (generated)
│   └── [mirrors src structure]
│
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
  - 250 countries with full translations

- **Continent Services** (`src/services/continents/`)
  - Handle continent-related operations
  - 7 continents with full translations

- **City Services** (`src/services/cities/`)
  - Handle city-related operations
  - 4,010 major world cities
  - Includes search functionality

### Utilities Layer
Shared utilities and type definitions:

- **Types** (`src/utils/types.ts`)
  - TypeScript type definitions
  - `SupportedLanguage`, `Country`, `Continent`, `City`, etc.

- **Constants** (`src/utils/constants.ts`)
  - `SUPPORTED_LANGUAGES` array
  - Other constant values

### Data Layer
All data is stored in JSON format for easy maintenance:

- **countries.json** - 250 countries, 83 KB
- **continents.json** - 7 continents, 1.2 KB
- **cities.json** - 4,010 cities, 740 KB

## 📦 Import Paths

### For Package Users
```typescript
// Import from the main package
import {
  getCountryName,
  getCountries,
  getContinentName,
  getCityName,
  searchCities,
  SUPPORTED_LANGUAGES
} from 'i18n-countries-continents';
```

### For Internal Development
```typescript
// Import from specific services
import { getCountryName } from './services/countries';
import { getContinentName } from './services/continents';
import { getCityName } from './services/cities';

// Import utilities
import { SupportedLanguage } from './utils/types';
import { SUPPORTED_LANGUAGES } from './utils/constants';
```

## 🔧 Build Output

The compiled JavaScript is placed in `dist/` and mirrors the source structure:

```
dist/
├── data/
│   ├── countries.json
│   ├── continents.json
│   └── cities.json
├── services/
│   ├── countries/
│   ├── continents/
│   └── cities/
├── utils/
│   ├── types.js & .d.ts
│   └── constants.js & .d.ts
└── index.js & .d.ts
```

## 📝 File Naming Conventions

- **Service files**: `get-[entity]-[operation].ts`
  - Examples: `get-country-name.ts`, `get-countries.ts`
  
- **Index files**: `index.ts`
  - Re-export all module contents
  - Present in each directory for clean imports

- **Data files**: `[entity].json`
  - Examples: `countries.json`, `cities.json`

## 🎨 Benefits of This Structure

1. **Modularity**: Each domain (countries, continents, cities) is self-contained
2. **Scalability**: Easy to add new services or domains
3. **Maintainability**: Clear separation of concerns
4. **Testability**: Services can be tested independently
5. **Tree-shaking**: Import only what you need
6. **Type Safety**: Full TypeScript support throughout
7. **Clean Imports**: Users import from one place, `i18n-countries-continents`

## 🚀 Adding New Features

To add a new service:

1. Create the service file in appropriate `src/services/[domain]/` directory
2. Add export to `src/services/[domain]/index.ts`
3. TypeScript types automatically propagate through re-exports
4. No changes needed to main `src/index.ts` (uses wildcard exports)

Example: Adding `getCountryByName`:
```typescript
// 1. Create src/services/countries/get-country-by-name.ts
export default function getCountryByName(...) { }

// 2. Add to src/services/countries/index.ts
export { default as getCountryByName } from "./get-country-by-name.js";

// 3. Automatically available from main package!
```

## 📊 Project Statistics

- **Total Services**: 8
- **Total Data Files**: 3
- **Total Data Items**: 4,267 (250 + 7 + 4,010)
- **Supported Languages**: 5
- **Package Size**: 133.5 KB compressed
- **Zero Dependencies**: Lightweight and fast

---

**Last Updated**: November 5, 2025

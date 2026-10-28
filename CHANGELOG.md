# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-10-28

### Added
- **ISO 3166-1 Alpha-3 & Numeric Codes**:
  - Added `alpha3` (3-letter ISO code, e.g. `USA`, `FRA`, `DEU`) and `numeric` (3-digit code, e.g. `840`, `250`, `276`) to all 250 countries
  - `getCountryByAlpha3(alpha3, language?)` — look up a country by its 3-letter code
  - `getCountryByNumeric(numeric, language?)` — look up a country by its 3-digit numeric code (string or number)
  - Fast O(1) conversion helpers: `alpha2ToAlpha3`, `alpha3ToAlpha2`, `alpha2ToNumeric`, `numericToAlpha2`
  - `getCountry(code)` now accepts both 2-letter alpha-2 and 3-letter alpha-3 codes seamlessly
- **Accent-Insensitive & Diacritic-Insensitive Search**:
  - Added text normalization utility `normalizeText(str)` stripping Unicode diacritics via standard NFD decomposition
  - `searchCountries`, `searchCities`, and `searchContinents` are now completely accent-insensitive (e.g. searching `'peru'` matches `'Perú'`, `'cordoba'` matches `'Córdoba'`, `'oceania'` matches `'Oceanía'`)
  - Reverse name lookups `getCountryByName` and `getContinentByName` are also accent-insensitive
- **Official Capital Cities**:
  - Added `capital` field to all 250 countries (e.g. `Washington D.C.`, `Paris`, `Tokyo`, `Rabat`)
  - `getCapital(countryCode)` — look up official capital city by alpha-2 or alpha-3 code
  - `getCountryByCapital(capitalName, language?)` — reverse lookup country by its capital city name (case- and accent-insensitive)
  - Added convenience alias `getCountryCapital`
- **Primary IANA Timezones**:
  - Added `timezones` string array property to all 250 countries with standard IANA tz database mapping (e.g. `["Europe/Paris"]`, `["America/New_York", ...]`)
  - `getTimezones(countryCode)` — retrieve all IANA timezone identifiers for a country
  - `getCountriesByTimezone(timezone, language?)` — find all countries associated with an IANA timezone
  - Added convenience alias `getCountryTimezones`
- **Asian Locales Support (Chinese & Japanese)**:
  - Added full Simplified Chinese (`zh`) and Japanese (`ja`) translation bundles in `src/data/lang/zh.json` and `src/data/lang/ja.json`
  - Expanded total supported languages to 10: `en`, `es`, `fr`, `ar`, `nl`, `de`, `pt`, `it`, `zh`, `ja`
  - `LANGUAGES` metadata record and `getSupportedLanguages()` updated with Chinese (`中文`) and Japanese (`日本語`)
- **Intelligent Search Ranking & Subpath Exports**:
  - `searchCountries` now prioritizes exact code/alpha-3 matches, exact name matches, and prefix matches above substring matches
  - Added subpath exports in `package.json`: `./get-country-by-alpha3`, `./get-country-by-numeric`, `./iso-converters`, `./get-capital`, `./get-country-by-capital`, `./get-timezones`, `./get-countries-by-timezone`, `./normalize`
- **Testing**:
  - Added dedicated test suites: `tests/test-iso-codes.js`, `tests/test-accent-search.js`, `tests/test-capitals.js`, `tests/test-timezones.js`, `tests/test-asian-locales.js`
  - Total test suites expanded from 8 to 13 (all 100% passing)

## [1.1.0] - 2026-10-28

### Added
- **International Phone Calling Codes (E.164)**:
  - Added `callingCode` property to all 250 countries (e.g. `+1`, `+33`, `+212`, `+81`)
  - `getCallingCode(countryCode)` — look up phone dial code for any country
  - `getCountriesByCallingCode(callingCode, language?)` — reverse lookup countries sharing a dial code
  - Added convenience alias `getCountryCallingCode`
- **ISO 4217 Currency Information**:
  - Added `currency` object (`{ code, symbol, name }`) to all 250 countries (e.g. `{ code: "USD", symbol: "$", name: "US Dollar" }`)
  - `getCurrency(countryCode)` — look up currency info for any country
  - `getCountriesByCurrency(currencyCode, language?)` — find all countries using a specific currency (e.g. all Eurozone countries)
  - Added convenience alias `getCountryCurrency`
- **Search Enhancements**:
  - `searchCountries` now supports querying by phone dial code (e.g. `'+33'` finds France) and currency code/symbol (e.g. `'EUR'` or `'$'`)
- **Interactive Live Demo & GitHub Pages**:
  - Added modern interactive explorer in `examples/interactive-demo/index.html`
  - Added automated GitHub Actions deployment workflow `.github/workflows/deploy-pages.yml` for GitHub Pages
  - Added production-ready React component in `examples/react/CountrySelect.tsx`
  - Added Node.js CLI demonstration script in `examples/node/demo.js`
- **Testing**:
  - Added comprehensive test suite `tests/test-calling-codes-and-currencies.js` verifying 100% data coverage across all 250 countries

## [1.0.7] - 2026-10-26

### Added
- **API Symmetry & Reverse Lookups**:
  - `getContinent(code, language?)` — retrieve complete continent object (`code`, `name`)
  - `getContinentByName(name, language?)` — reverse lookup continent by English or localized name
  - `searchContinents(query, language?, limit?)` — search continents by code or localized name
  - `getCity(cityName, language?)` — retrieve complete city object (`name`, `translatedName`), now supporting both English and localized city names
  - `getSupportedLanguages()` & `LANGUAGES` — language list with codes, English names, and native names for building UI language pickers
- **Locale-Aware Sorting**:
  - `sortCountries(countries, language?)` — sort countries alphabetically using `Intl.Collator`
  - `sortContinents(continents, language?)` — sort continents alphabetically
  - `sortCities(cities, language?)` — sort cities alphabetically
  - `toSelectOptions(items, { sort: true, language? })` — option to sort dropdown options alphabetically
- **Robustness & Edge-Case Hardening**:
  - Defensive type checking and empty/null/undefined guarding on all getter and lookup methods
  - Locale tag normalization (`'fr-FR'`, `'pt-BR'`, `'es-MX'`) and uppercase language code support (`'DE'`, `'ES'`)
  - Subpath `exports` in `package.json` reorganized with `"types"` condition first for optimal TypeScript module resolution across all tools
  - Added direct subpath exports for `./get-continent-by-name`, `./search-continents`, `./get-supported-languages`, `./constants`, and `./types`
- **Developer Experience**:
  - Comprehensive TSDoc / JSDoc annotations across all service and utility functions for rich IDE IntelliSense
  - Expanded npm package keywords for search discovery

## [1.0.6] - 2026-10-26

### Added
- **3 New Languages**: Added full translations for German (`de`), Portuguese (`pt`), and Italian (`it`)
  - 250 countries, 7 continents, and 4,010 cities now available in 8 languages (`en`, `es`, `fr`, `ar`, `nl`, `de`, `pt`, `it`)
  - Official Unicode CLDR translations for all 250 countries
  - Added compact per-language bundles: `de.json`, `pt.json`, and `it.json`
  - Updated `SUPPORTED_LANGUAGES` and `SupportedLanguage` types to include `"de"`, `"pt"`, and `"it"`

## [1.0.5] - 2026-10-26

### Fixed
- Fixed 8 test assertions in `tests/comprehensive-test.ts` for invalid and empty inputs to properly expect `undefined` according to API contract (`string | undefined`)
- Fixed ESM relative import extensions in test files (`tests/test-all-services.ts`, `tests/test-example.ts`)
- Added `inlineSources: true` in `tsconfig.json` so source maps embed original TypeScript sources for seamless debugging in client projects
- Removed redundant `CHANGELOG.md` rule from `.npmignore`

### Added
- **New Country Features**:
  - `getCountry(code, language?)` — retrieve complete country object (`code`, `name`, `continent`, `flag`)
  - `getCountryByName(name, language?)` — reverse lookup country by English or translated name
  - `searchCountries(query, language?, limit?)` — search/autocomplete countries by name or code
  - `getCountriesByContinent(continentCode, language?)` — filter countries by continent
- **Validation Utilities**:
  - `isValidCountryCode(code)` — validate 2-letter ISO country code
  - `isValidContinentCode(code)` — validate 2-letter continent code
  - `isValidLanguage(language)` — TypeScript type-guard for supported languages
- **UI & Form Helper**:
  - `toSelectOptions(items, config?)` — format countries, continents, or cities into `{ value, label }` options for HTML `<select>`, React Select, Vuetify, Angular Material, etc.
- **Tree-shakeable Sub-path Exports**:
  - Added individual subpaths for all new functions in `package.json`
- Automated unified test runner (`tests/run-all.js`) covering all 7 test suites with 100% pass rate
- Configured `"pretest"` and `"test"` scripts in `package.json`
- Added GitHub Actions CI workflow (`.github/workflows/ci.yml`) testing on Node.js 18, 20, and 22

### Cleaned
- Removed 800 KB of legacy unused JSON data files (`cities.json`, `countries.json`, `continents.json`) from `src/data/`
- Removed 10 empty placeholder (0-byte) files from root and test folders
- Added valid JSON rules to `.prettierrc`
- Updated `PROJECT-STRUCTURE.md` and `docs/PROJECT-STATUS.md` to reflect current v1.0.x architecture

## [1.0.4] - 2026-03-27

### Performance (Breaking-free optimization)
- **85% bundle size reduction** — split monolithic JSON data files into per-language bundles
  - Before: one `cities.json` (924 KB), `countries.json` (72 KB), `continents.json` (4 KB) = **1 MB** all inlined
  - After: one file per language (`en.json`, `es.json`, `fr.json`, `ar.json`, `nl.json`) = **~106 KB each**
  - Bundlephobia was reporting 542 KB minified / 115 KB gzip — now drastically reduced
- Data format changed internally to compact arrays (`[code, continent, flag, name]`) for smaller JSON footprint
- All services rewritten to use the new per-language loader (`src/data/loader.ts`)
- No API changes — all existing code continues to work unchanged

## [1.0.3] - 2026-03-27

### Changed
- Rewrote README with fixed emoji rendering (broken flag/map emojis on npm)
- Added badges (npm version, downloads, license, TypeScript)
- Added yarn and pnpm installation commands
- Added sub-path imports section showing all tree-shakeable entry points
- Added separate Node.js ESM and CommonJS usage examples
- Added `SUPPORTED_LANGUAGES` constant to API reference
- Improved TypeScript types section with inline comments
- Replaced plain lists with tables for Data Coverage (Countries, Languages)
- Fixed duplicate `---` dividers in document
- Fixed `Data Format` section that incorrectly referenced `src/data/` (internal source path)
- Improved React, Vue, and Angular examples with more realistic code
- Cleaned up API reference descriptions with parameter documentation

## [1.0.2] - 2025-03-10

### Fixed
- Fixed `exports` field in `package.json` to correctly point to sub-directory service files (e.g. `./dist/services/countries/get-country-name.js` instead of old flat paths)
- Added missing sub-path exports: `./get-country-flag`, `./get-city-name`, `./get-cities`, `./search-cities`, `./get-continents`, `./get-continent-name`
- Removed duplicate `City` interface definition in `search-cities.ts` (now imports from `get-cities.ts`)
- Fixed `CHANGELOG.md` incorrectly excluded by `.npmignore` despite being listed in `files`
- Fixed `moduleResolution` in `tsconfig.json` from `"node"` to `"bundler"` for correct ESM resolution

### Added
- `"sideEffects": false` in `package.json` for optimal tree-shaking support
- `"engines": { "node": ">=16.0.0" }` to document minimum Node.js version
- Added `cities`, `flags`, `iso-3166` keywords for better npm discoverability
- Updated package description to include cities

## [1.0.1] - 2025-11-18

### Added
- Added `"type": "module"` to package.json for better ES module support
- Explicit TypeScript type exports (Country, Continent, City) in index.ts
- Comprehensive test suite with 125 tests
- Real-world integration tests covering 10 use cases
- Performance benchmarks and validation

### Improved
- Better TypeScript support and type definitions
- Eliminated Node.js module type warnings
- Enhanced developer experience with explicit exports

## [1.0.0] - 2025-11-05

### Added
- Initial release with **250 countries** and **7 continents**
- Get country names in multiple languages (en, es, fr, ar, nl)
- Get continent names in multiple languages
- Look up continent by country code
- Support for React, Angular, Vue, Svelte, Node.js, and plain JavaScript
- Full TypeScript support with type definitions
- ES6 and CommonJS module support
- JSON data format for easy maintenance and updates

### Features
- `getCountryName(code, language)` - Get country name by code
- `getCountries(language)` - List all countries in a specific language
- `getContinentByCountry(countryCode)` - Get continent code by country
- `getContinentName(code, language)` - Get continent name by code
- `getContinents(language)` - List all continents in a specific language

### Data Coverage
- **250 countries** across all continents
- **7 continents** (complete coverage)
- **5 languages** with 100% translation coverage
- All countries use ISO 3166-1 alpha-2 codes
- Proper continent mapping for all countries

# Implementation Roadmap & Task Tracker

This document tracks all new features and enhancements added to `i18n-countries-continents`.
Each item has been implemented, tested, and verified across all test suites.

---

## 📋 Task List

### Phase 1: Core Typing & Regional / Visual Essentials (v1.3.0)
- [x] **Task 1: Strict TypeScript Literal Types & Autocomplete**
  - [x] Add strict union `CountryCode` (all 250 ISO 3166-1 alpha-2 codes with `(string & {})` fallback).
  - [x] Add strict union `ContinentCode` (`'AF' | 'AN' | 'AS' | 'EU' | 'NA' | 'OC' | 'SA'`).
  - [x] Add strict union `Alpha3Code` (all 250 ISO alpha-3 codes with `(string & {})` fallback).
  - [x] Export types from `src/utils/types.ts` and `src/index.ts`.

- [x] **Task 2: Country-Code Top-Level Domains (ccTLD)**
  - [x] Add `tld` across all 250 countries in metadata.
  - [x] Expose `tld` on `CountryMetadata` and `Country` interface.
  - [x] Implement `getTld(countryCode): string | undefined`.
  - [x] Implement `getCountryByTld(tld, language?): Country | undefined`.
  - [x] Update `searchCountries` to match TLD queries.

- [x] **Task 3: Regional & Geopolitical Unions (EU, Schengen, EEA)**
  - [x] Complete membership data: 27 EU member states, 29 Schengen member states, 30 EEA states.
  - [x] Implement `isEU`, `isSchengen`, `isEEA`.
  - [x] Implement `getEUCountries`, `getSchengenCountries`, `getEEACountries`.
  - [x] Add `isEU`, `isSchengen`, and `isEEA` flags to `Country`.

- [x] **Task 4: Native Country Names (Endonyms)**
  - [x] Add `nativeName` for all 250 countries.
  - [x] Expose `nativeName` on `Country`.
  - [x] Implement `getNativeName(countryCode)`.
  - [x] Update `searchCountries` to match native endonyms.

- [x] **Task 5: CDN / SVG & PNG Flag URLs (Windows Emoji Fix)**
  - [x] Implement `getCountryFlagUrl(countryCode, options?)`.
  - [x] Support SVG and PNG formats with customizable sizes.

- [x] **Task 6: Geographic Coordinates, Area & Landlocked Status**
  - [x] Add `coordinates: { lat, lng }`, `area` (sq km), and `landlocked` (boolean) to all 250 countries.
  - [x] Implement `getCoordinates(countryCode)` and `isLandlocked(countryCode)`.

- [x] **Task 7: Neighboring Borders**
  - [x] Add `borders: string[]` for all 250 countries.
  - [x] Implement `getBorders(countryCode)` and `getCountryBorders(countryCode, language?)`.

- [x] **Task 8: Spoken / Official Languages per Country**
  - [x] Add `languages: string[]` for all 250 countries.
  - [x] Implement `getCountryLanguages(countryCode)` and `getCountriesBySpokenLanguage(langCode, language?)`.

- [x] **Task 9: Demonyms / Nationalities**
  - [x] Add `demonym: string` for all 250 countries.
  - [x] Implement `getDemonym(countryCode)` and `getCountryByDemonym(demonym, language?)`.

- [x] **Task 10: Postal Code Validation & Pattern**
  - [x] Add postal code regex patterns for major countries.
  - [x] Implement `isValidPostalCode(countryCode, postalCode)` and `getPostalCodePattern(countryCode)`.

- [x] **Task 11: Locale Inference**
  - [x] Implement `getCountryFromLocale(locale, language?)`.

---

### Phase 2: Geo Expansion & Dual Build (v1.4.0)
- [x] **Task 12: True Dual ESM & CommonJS Build**
  - [x] Configured `tsup` dual builder emitting `.js` (ESM) and `.cjs` (CJS) + `.d.ts` & `.d.cts` for every entry point.
  - [x] Configured `package.json` `"main": "dist/index.cjs"`, `"module": "dist/index.js"`, and conditional exports.
  - [x] Verified CommonJS `require()` in `tests/test-dual-build.cjs`.

- [x] **Task 13: UN Geographic Subregions**
  - [x] Added `subregion` across all 250 countries (24 unique UN subregions, e.g. `'Western Europe'`, `'Northern Africa'`).
  - [x] Added `subregion` to `Country` and `CountryMetadata`.
  - [x] Implemented `getSubregion(countryCode)` (alias `getCountrySubregion`).
  - [x] Implemented `getCountriesBySubregion(subregionName, language?)`.
  - [x] Implemented `getSubregions()` returning all 24 sorted unique subregions.
  - [x] Updated `searchCountries` to search by subregion.
  - [x] Verified with unit test suite `tests/test-subregions.js`.

- [x] **Task 14: Geodesic Distance (Haversine) & Nearest Countries**
  - [x] Implemented `getDistance(code1, code2, unit?: 'km' | 'miles')` using spherical Haversine formula.
  - [x] Implemented `getNearestCountries(code, limit?, language?)` returning sorted closest countries with distance.
  - [x] Verified with unit test suite `tests/test-geo-distance.js`.

- [x] **Task 15: Subdivisions / States / Provinces (ISO 3166-2)**
  - [x] Added curated ISO 3166-2 subdivision datasets for major countries:
    - US (50 states + DC)
    - Canada (10 provinces + 3 territories)
    - Australia (6 states + 2 territories)
    - United Kingdom (England, Scotland, Wales, Northern Ireland)
    - Germany (16 Bundesländer)
    - France (18 administrative regions)
    - Spain (17 autonomous communities)
    - Italy (20 regions)
    - Mexico (32 states)
    - Brazil (27 states)
    - Japan (prefectures)
  - [x] Implemented `getSubdivisions(countryCode): Subdivision[]`.
  - [x] Implemented `getSubdivision(countryCode, subdivisionCode): Subdivision | undefined`.
  - [x] Implemented `hasSubdivisions(countryCode): boolean`.
  - [x] Verified with unit test suite `tests/test-subdivisions.js`.

- [x] **Task 16: Complete Test Suite & Documentation**
  - [x] Added all 4 new suites to `tests/run-all.js` (total 28 suites, 100% passing).
  - [x] Updated `README.md`, `QUICKSTART.md`, `CHANGELOG.md`, `PROJECT-STRUCTURE.md`, and `docs/PROJECT-STATUS.md`.

---

### Phase 3: Performance, Modularity & World Languages Expansion (v1.5.0)
- [x] **Task 17: Modular City Splitting & 90% Bundle Size Reduction**
  - [x] Extracted 4,010 cities from `src/data/lang/*.json` into standalone `src/data/cities/*.json`.
  - [x] Reduced per-language country/continent bundle size from ~110 KB down to ~9 KB (~92% reduction).
  - [x] Created `src/data/cities-loader.ts` to isolate city payload from country services.
  - [x] Updated `src/services/cities/*` to use `cities-loader.ts`.
  - [x] Exported modular entry point `./cities` (`i18n-countries-continents/cities`) in `package.json`.
  - [x] Verified full backward compatibility and 0-city byte overhead on country subpaths.

- [x] **Task 18: Major World Languages Expansion (ru, hi, ko, tr)**
  - [x] Added official UN/CLDR translations for all 250 countries and 7 continents:
    - Russian (`ru`, `Русский`)
    - Hindi (`hi`, `हिन्दी`)
    - Korean (`ko`, `한국어`)
    - Turkish (`tr`, `Türkçe`)
  - [x] Added localized city names for major world metropolitan hubs in all 4 new languages.
  - [x] Expanded `SUPPORTED_LANGUAGES` from 10 to 14 languages.
  - [x] Verified with unit test suite `tests/test-expanded-languages.js`.

- [x] **Task 19: Subdivision Expansion (IN, CN, RU, TR, NL, CH) & Search**
  - [x] Expanded `src/services/countries/subdivisions.ts` with:
    - India (`IN`): All 28 states + 8 Union Territories (36 total)
    - China (`CN`): 23 provinces, 5 autonomous regions, 4 municipalities, 2 SARs (34 total)
    - Russia (`RU`): Major federal subjects / cities / oblasts
    - Turkey (`TR`): Major provinces
    - Netherlands (`NL`): 12 provinces
    - Switzerland (`CH`): 26 cantons
  - [x] Implemented `searchSubdivisions(query, countryCode?)` for case- and accent-insensitive search.
  - [x] Implemented `getAllSubdivisionsCountries()` returning all 17 supported country codes.
  - [x] Verified with unit test suite `tests/test-subdivisions-expanded.js`.

- [x] **Task 20: 31 Test Suites & Dual Build Verification**
  - [x] Added `test-expanded-languages.js`, `test-modular-cities.js`, `test-subdivisions-expanded.js`.
  - [x] Updated `test-dual-build.cjs` to test `/cities` and new subdivision helpers in CommonJS.
  - [x] All 31 test suites passing 100% (195 tests total).
  - [x] Zero TypeScript errors with `npm run typecheck`.

- [x] **Task 21: Release v1.5.0 Documentation**
  - [x] Updated `README.md`, `QUICKSTART.md`, `CHANGELOG.md`, `PROJECT-STRUCTURE.md`, and `docs/PROJECT-STATUS.md`.

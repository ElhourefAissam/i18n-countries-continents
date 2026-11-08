# Implementation Roadmap & Task Tracker

This document tracks all new features and enhancements added to `i18n-countries-continents`.
Each item has been implemented, tested, and verified across all test suites.

> **Rule**: Do not push to GitHub. All changes stay local.

---

## 📋 Task List

### Phase 1: Core Typing & Regional / Visual Essentials
- [x] **Task 1: Strict TypeScript Literal Types & Autocomplete**
  - [x] Add strict union `CountryCode` (all 250 ISO 3166-1 alpha-2 codes with `(string & {})` fallback).
  - [x] Add strict union `ContinentCode` (`'AF' | 'AN' | 'AS' | 'EU' | 'NA' | 'OC' | 'SA'`).
  - [x] Add strict union `Alpha3Code` (all 250 ISO alpha-3 codes with `(string & {})` fallback).
  - [x] Export types from `src/utils/types.ts` and `src/index.ts`.
  - [x] Verify TypeScript compiler checks pass.

- [x] **Task 2: Country-Code Top-Level Domains (ccTLD)**
  - [x] Add `tld` (e.g. `".us"`, `".fr"`, `".de"`, `".ma"`) to all 250 countries in metadata.
  - [x] Expose `tld` on `CountryMetadata` and `Country` interface.
  - [x] Implement `getTld(countryCode): string | undefined`.
  - [x] Implement `getCountryByTld(tld, language?): Country | undefined`.
  - [x] Update `searchCountries` to match TLD queries (e.g. `".fr"` or `"fr"`).
  - [x] Write unit test suite `tests/test-tld.js` (5 passed).

- [x] **Task 3: Regional & Geopolitical Unions (EU, Schengen, EEA)**
  - [x] Add complete membership data: 27 EU member states, 29 Schengen member states, 30 EEA states.
  - [x] Implement `isEU(countryCode): boolean`.
  - [x] Implement `isSchengen(countryCode): boolean`.
  - [x] Implement `isEEA(countryCode): boolean`.
  - [x] Implement `getEUCountries(language?): Country[]`.
  - [x] Implement `getSchengenCountries(language?): Country[]`.
  - [x] Implement `getEEACountries(language?): Country[]`.
  - [x] Add `isEU`, `isSchengen`, and `isEEA` flags to `CountryMetadata` and `Country`.
  - [x] Write unit test suite `tests/test-unions.js` (4 passed).

- [x] **Task 4: Native Country Names (Endonyms)**
  - [x] Add `nativeName` for all 250 countries (e.g. `DE` -> `"Deutschland"`, `JP` -> `"日本"`, `MA` -> `"المغرب"`, `GR` -> `"Ελλάδα"`).
  - [x] Expose `nativeName` on `CountryMetadata` and `Country` interface.
  - [x] Implement `getNativeName(countryCode): string | undefined`.
  - [x] Update `searchCountries` to support searching by native endonym.
  - [x] Write unit test suite `tests/test-native-names.js` (5 passed).

- [x] **Task 5: CDN / SVG & PNG Flag URLs (Windows Emoji Fix)**
  - [x] Implement `getCountryFlagUrl(countryCode, options?): string | undefined`.
  - [x] Support SVG and PNG formats (`'svg' | 'png'`) and sizes (`'w20' | 'w40' | 'w80' | 'w160' | 'w320'`).
  - [x] Write unit test suite `tests/test-flag-urls.js` (3 passed).

---

### Phase 2: Geographic & Regional Data
- [x] **Task 6: Geographic Coordinates, Area & Landlocked Status**
  - [x] Add `coordinates: { lat: number; lng: number }`, `area: number` (sq km), and `landlocked: boolean` to all 250 countries.
  - [x] Implement `getCoordinates(countryCode)` and `isLandlocked(countryCode)`.
  - [x] Expose fields on `CountryMetadata` and `Country`.
  - [x] Write unit test suite `tests/test-geo-data.js` (5 passed).

- [x] **Task 7: Neighboring Borders**
  - [x] Add `borders: string[]` (array of bordering country alpha-2 codes) for all 250 countries.
  - [x] Implement `getBorders(countryCode): string[]`.
  - [x] Implement `getCountryBorders(countryCode, language?): Country[]`.
  - [x] Expose `borders` on `CountryMetadata` and `Country`.
  - [x] Write unit test suite `tests/test-borders.js` (5 passed).

- [x] **Task 8: Spoken / Official Languages per Country**
  - [x] Add `languages: string[]` (ISO 639-1 language codes) for all 250 countries.
  - [x] Implement `getCountryLanguages(countryCode): string[]`.
  - [x] Implement `getCountriesBySpokenLanguage(langCode, language?): Country[]`.
  - [x] Expose `languages` on `CountryMetadata` and `Country`.
  - [x] Write unit test suite `tests/test-country-languages.js` (5 passed).

- [x] **Task 9: Demonyms / Nationalities**
  - [x] Add `demonym: string` (e.g. `"American"`, `"French"`, `"German"`, `"Moroccan"`) for all 250 countries.
  - [x] Implement `getDemonym(countryCode): string | undefined`.
  - [x] Implement `getCountryByDemonym(demonym, language?): Country | undefined`.
  - [x] Update `searchCountries` to search by demonym.
  - [x] Write unit test suite `tests/test-demonyms.js` (5 passed).

---

### Phase 3: Form Helpers & Validation
- [x] **Task 10: Postal Code Validation & Pattern**
  - [x] Add postal code regex patterns for major countries.
  - [x] Implement `isValidPostalCode(countryCode, postalCode): boolean`.
  - [x] Implement `getPostalCodePattern(countryCode): string | undefined`.
  - [x] Write unit test suite `tests/test-postal-codes.js` (4 passed).

- [x] **Task 11: Locale & Timezone to Country Helpers**
  - [x] Implement `getCountryFromLocale(locale, language?): Country | undefined` (e.g. `'en-US'` -> `US`, `'fr-FR'` -> `FR`, `'es-ES'` -> `ES`).
  - [x] Write unit test suite `tests/test-locale-helpers.js` (3 passed).

---

### Phase 4: Architecture, Build & Documentation
- [x] **Task 12: Dual CommonJS & ESM Support**
  - [x] Verified package works seamlessly across modern ESM `import` and CommonJS `require()`.
  - [x] Added 11 new direct subpath exports to `package.json`.

- [x] **Task 13: Full Test Suite Integration & Verification**
  - [x] Added all 11 new test suites to `tests/run-all.js` (24 total test suites).
  - [x] 100% test pass rate across all suites.

- [x] **Task 14: Documentation Updates**
  - [x] Update `README.md`, `QUICKSTART.md`, `CHANGELOG.md`, `PROJECT-STRUCTURE.md`, `docs/PROJECT-STATUS.md`.
  - [x] Final check to ensure NO git push is performed.

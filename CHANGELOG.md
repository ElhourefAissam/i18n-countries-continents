# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0] - 2026-11-08

### Added
- **Modular City Splitting & 90% Country Bundle Size Reduction**:
  - Extracted 4,010 cities out of default language bundles into standalone files (`src/data/cities/*.json`)
  - Created dedicated `src/data/cities-loader.ts` to keep city payload isolated from core country services
  - Reduced per-language country/continent bundle size from ~110 KB down to ~9 KB (~92% reduction)
  - Country-only subpaths (e.g. `i18n-countries-continents/get-countries`, `i18n-countries-continents/get-country`) now bundle 0 city bytes
  - Added dedicated `./cities` subpath export in `package.json` for importing all city services together
- **Major World Languages Expansion (`ru`, `hi`, `ko`, `tr`)**:
  - Expanded supported languages from 10 to 14 languages:
    - Russian (`ru`, `Русский`)
    - Hindi (`hi`, `हिन्दी`)
    - Korean (`ko`, `한국어`)
    - Turkish (`tr`, `Türkçe`)
  - Added official UN/CLDR translations for all 250 countries and 7 continents across all 4 new languages
  - Added localized city names for major world metropolitan hubs in all 4 new languages
  - Updated `SUPPORTED_LANGUAGES`, `LANGUAGES`, and `isValidLanguage`
- **Subdivision Expansion & Search**:
  - Expanded ISO 3166-2 subdivisions dataset to 17 countries:
    - India (`IN`): All 28 states + 8 Union Territories (36 total)
    - China (`CN`): 23 provinces, 5 autonomous regions, 4 municipalities, 2 SARs (34 total)
    - Russia (`RU`): Major federal subjects / cities / oblasts
    - Turkey (`TR`): Major provinces (Istanbul, Ankara, Izmir, etc.)
    - Netherlands (`NL`): 12 provinces
    - Switzerland (`CH`): 26 cantons
  - `searchSubdivisions(query, countryCode?)` — search subdivisions by name or code with case- and accent-insensitivity
  - `getAllSubdivisionsCountries()` — retrieve array of all 17 country codes with subdivision data available
- **Testing**:
  - Added 3 new test suites: `tests/test-expanded-languages.js`, `tests/test-modular-cities.js`, and `tests/test-subdivisions-expanded.js`
  - Total test suites expanded from 28 to 31 (all 100% passing)

## [1.4.0] - 2026-11-08

### Added
- **True Dual ESM & CommonJS Build**:
  - Implemented high-performance `tsup` dual compiler emitting `.js` (ESM) and `.cjs` (CommonJS) across all 50+ entry points
  - Generated dual TypeScript declaration files (`.d.ts` for ESM, `.d.cts` for CommonJS)
  - Configured conditional exports in `package.json` with `"import"` and `"require"` conditions pointing to respective formats
  - Guaranteed 100% interoperability with Node.js, Webpack, Vite, Jest, ts-node, and Electron
- **UN Geographic Subregions**:
  - Added `subregion` property across all 250 countries mapping to 24 standard UN subregions (e.g. `'Western Europe'`, `'Northern Africa'`, `'South America'`, `'Polynesia'`)
  - `getSubregion(countryCode)` (and alias `getCountrySubregion`) — look up subregion by alpha-2 or alpha-3 code
  - `getCountriesBySubregion(subregionName, language?)` — find all localized Country objects in a subregion
  - `getSubregions()` — retrieve all 24 unique UN subregion names sorted alphabetically
  - `searchCountries` now supports querying by subregion name
- **Geodesic Distance (Haversine) & Nearest Countries**:
  - `getDistance(countryCode1, countryCode2, unit?)` — calculate great-circle distance between country geographic centers in kilometers or miles
  - `getNearestCountries(countryCode, limit?, language?)` — retrieve closest neighboring nations sorted nearest-first with computed distance
- **Subdivisions, States & Provinces (ISO 3166-2)**:
  - Curated subdivision datasets for major countries:
    - United States (`US`): 50 states + DC
    - Canada (`CA`): 10 provinces + 3 territories
    - Australia (`AU`): 6 states + 2 territories
    - United Kingdom (`GB`): England, Scotland, Wales, Northern Ireland
    - Germany (`DE`): 16 Bundesländer
    - France (`FR`): 18 administrative regions
    - Spain (`ES`): 17 autonomous communities
    - Italy (`IT`): 20 regions
    - Mexico (`MX`): 32 states
    - Brazil (`BR`): 27 states
    - Japan (`JP`): prefectures
  - `getSubdivisions(countryCode)` — retrieve all primary subdivisions for a country
  - `getSubdivision(countryCode, subdivisionCode)` — look up a specific state/province/region
  - `hasSubdivisions(countryCode)` — check if subdivision data is available
- **Subpath Exports**:
  - Added direct subpath exports in `package.json` for `./subregions`, `./geo-distance`, and `./subdivisions`
- **Testing**:
  - Added 4 dedicated test suites: `tests/test-subregions.js`, `tests/test-geo-distance.js`, `tests/test-subdivisions.js`, and `tests/test-dual-build.cjs`
  - Total test suites expanded from 24 to 28 (all 100% passing)

## [1.3.0] - 2026-11-08

### Added
- **Country-Code Top-Level Domains (ccTLD)**:
  - Added `tld` property (e.g. `.us`, `.fr`, `.de`, `.ma`, `.jp`) across all 250 countries
  - `getTld(countryCode)` (and alias `getCountryTld`) — look up ccTLD for alpha-2 or alpha-3 code
  - `getCountryByTld(tld, language?)` — reverse lookup country by domain suffix (with or without dot)
  - `searchCountries` now matches by ccTLD (e.g. `searchCountries('.fr')`)
- **Regional & Geopolitical Unions (EU, Schengen, EEA)**:
  - Added complete membership sets for 27 EU member states, 29 Schengen member states, and 30 EEA states
  - `isEU(countryCode)`, `isSchengen(countryCode)`, `isEEA(countryCode)` — boolean checks supporting alpha-2 and alpha-3 codes
  - `getEUCountries(language?)`, `getSchengenCountries(language?)`, `getEEACountries(language?)` — retrieve complete Country lists
  - Added `isEU`, `isSchengen`, and `isEEA` boolean flags to all 250 `Country` objects
- **Native Country Names (Endonyms)**:
  - Added `nativeName` property for all 250 countries (e.g. `DE` -> `"Deutschland"`, `JP` -> `"日本"`, `MA` -> `"المغرب"`, `GR` -> `"Ελλάδα"`, `ES` -> `"España"`)
  - `getNativeName(countryCode)` (and alias `getCountryNativeName`) — look up native endonym
  - `searchCountries` now matches country by native endonym with diacritic tolerance
- **Vector & Raster Flag CDN URLs (Windows Emoji Fix)**:
  - `getCountryFlagUrl(countryCode, options?)` — generate direct FlagCDN URLs in SVG or PNG formats
  - Supports sizes: `'w20'`, `'w40'`, `'w80'`, `'w160'`, `'w320'`
  - Solves the native emoji flag rendering limitations on Windows operating systems
- **Geographic Coordinates, Area & Landlocked Status**:
  - Added `coordinates` (`{ lat, lng }`), `area` ($km^2$), and `landlocked` (boolean) to all 250 countries
  - `getCoordinates(countryCode)` (alias `getCountryCoordinates`), `getArea(countryCode)` (alias `getCountryArea`), and `isLandlocked(countryCode)`
- **Neighboring Borders**:
  - Added `borders` array (alpha-2 country codes) to all 250 countries
  - `getBorders(countryCode)` — returns alpha-2 codes of bordering countries (empty for island nations)
  - `getCountryBorders(countryCode, language?)` — returns full localized `Country[]` objects of bordering countries
- **Spoken & Official Languages**:
  - Added `languages` array (ISO codes) to all 250 countries
  - `getCountryLanguages(countryCode)` — returns spoken language codes (e.g. `CH` -> `['fr', 'gsw', 'it', 'roh']`)
  - `getCountriesBySpokenLanguage(languageCode, language?)` — reverse lookup countries where a language is spoken
- **Demonyms & Nationalities**:
  - Added `demonym` property in English across all 250 countries (e.g. `"American"`, `"French"`, `"German"`, `"Moroccan"`)
  - `getDemonym(countryCode)` (and alias `getCountryDemonym`) — look up demonym
  - `getCountryByDemonym(demonym, language?)` — reverse lookup country by nationality
  - `searchCountries` now matches by demonym query
- **Postal Code Validation**:
  - `isValidPostalCode(countryCode, postalCode)` — validates postal codes against national patterns across major countries
  - `getPostalCodePattern(countryCode)` — retrieves postal code regex pattern source
- **Locale Inference**:
  - `getCountryFromLocale(locale, language?)` — infers country from BCP-47 / POSIX locale tags (e.g. `'en-US'` -> `US`, `'fr-FR'` -> `FR`, `'pt_BR'` -> `BR`)
- **Strict TypeScript Literal Types**:
  - `CountryCode` typed with strict union of all 250 ISO 3166-1 alpha-2 codes and autocomplete
  - `ContinentCode` typed as `'AF' | 'AN' | 'AS' | 'EU' | 'NA' | 'OC' | 'SA'`
  - `Alpha3Code` typed with strict union of all 250 ISO 3166-1 alpha-3 codes and autocomplete
- **Subpath Exports & Packaging**:
  - Added 11 new direct subpath exports in `package.json`: `./get-tld`, `./get-country-by-tld`, `./regional-unions`, `./get-native-name`, `./get-country-flag-url`, `./get-coordinates`, `./get-borders`, `./spoken-languages`, `./get-demonym`, `./get-country-from-locale`, `./is-valid-postal-code`
- **Testing**:
  - Added 11 dedicated test suites; expanded total test suites from 13 to 24 (all 100% passing)

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

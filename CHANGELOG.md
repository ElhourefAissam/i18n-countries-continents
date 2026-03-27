# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

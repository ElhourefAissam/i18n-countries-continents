# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

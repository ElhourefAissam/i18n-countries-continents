import React, { useMemo, useState } from 'react';
import {
  getCountries,
  getCountriesByContinent,
  getContinents,
  getSupportedLanguages,
  toSelectOptions,
  getCountry,
  type Country,
  type SupportedLanguage,
  type SelectOption,
} from 'i18n-countries-continents';

export interface CountrySelectProps {
  /** Selected language for country names (default: 'en') */
  language?: SupportedLanguage;
  /** Filter countries by continent code (e.g. 'EU', 'AF', 'NA') */
  continent?: string;
  /** Currently selected country ISO code */
  value?: string;
  /** Callback fired when a country is selected */
  onChange?: (country: Country | undefined) => void;
  /** Whether to show flag emojis in the dropdown options (default: true) */
  showFlags?: boolean;
  /** Placeholder label for the empty selection */
  placeholder?: string;
  /** Accessible label or className */
  className?: string;
  disabled?: boolean;
}

/**
 * Reusable, localized Country `<select>` component.
 */
export const CountrySelect: React.FC<CountrySelectProps> = ({
  language = 'en',
  continent,
  value,
  onChange,
  showFlags = true,
  placeholder = 'Select a country...',
  className = '',
  disabled = false,
}) => {
  // Fetch countries, optionally filtered by continent
  const countryList = useMemo(() => {
    return continent
      ? getCountriesByContinent(continent, language)
      : getCountries(language);
  }, [continent, language]);

  // Format into standard select options with alphabetical localized sorting
  const options: SelectOption[] = useMemo(() => {
    return toSelectOptions(countryList, {
      value: 'code',
      label: (c) => (showFlags && c.flag ? `${c.flag}  ${c.name}` : c.name),
      sort: true,
      language,
    });
  }, [countryList, showFlags, language]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = e.target.value;
    const selectedCountry = countryList.find((c) => c.code === selectedCode);
    onChange?.(selectedCountry);
  };

  return (
    <select
      value={value || ''}
      onChange={handleChange}
      disabled={disabled}
      className={`country-select ${className}`}
      aria-label="Select Country"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

/**
 * Example Page / Container Component demonstrating:
 * - Language selector
 * - Continent filter
 * - Country dropdown
 * - Country detail card
 */
export const CountrySelectorApp: React.FC = () => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [continent, setContinent] = useState<string>('');
  const [selectedCode, setSelectedCode] = useState<string>('US');

  const languages = useMemo(() => getSupportedLanguages(), []);
  const continents = useMemo(() => getContinents(language), [language]);
  const activeCountry = useMemo(
    () => (selectedCode ? getCountry(selectedCode, language) : undefined),
    [selectedCode, language]
  );

  return (
    <div style={{ maxWidth: 560, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>🌍 International Country Picker</h2>

      {/* Language Selector */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}>
          Interface Language:
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
          style={{ padding: '8px 12px', borderRadius: 6, width: '100%' }}
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code}>
              {l.nativeName} ({l.name})
            </option>
          ))}
        </select>
      </div>

      {/* Continent Filter */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}>
          Filter by Continent:
        </label>
        <select
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: 6, width: '100%' }}
        >
          <option value="">All Continents (Global)</option>
          {continents.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Country Select */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}>
          Country:
        </label>
        <CountrySelect
          language={language}
          continent={continent || undefined}
          value={selectedCode}
          onChange={(country) => setSelectedCode(country?.code || '')}
        />
      </div>

      {/* Selected Country Details Card */}
      {activeCountry && (
        <div
          style={{
            padding: '1.25rem',
            background: '#f4f6f8',
            borderRadius: 8,
            border: '1px solid #e1e4e8',
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>
            {activeCountry.flag}
          </div>
          <h3 style={{ margin: '0 0 8px 0' }}>{activeCountry.name}</h3>
          <p style={{ margin: 4 }}>
            <strong>ISO Code:</strong> {activeCountry.code} (Alpha-3: {activeCountry.alpha3}, Numeric: {activeCountry.numeric})
          </p>
          <p style={{ margin: 4 }}>
            <strong>Capital:</strong> {activeCountry.capital || 'N/A'}
          </p>
          <p style={{ margin: 4 }}>
            <strong>Continent:</strong> {activeCountry.continent}
          </p>
          <p style={{ margin: 4 }}>
            <strong>Calling Code:</strong> {activeCountry.callingCode}
          </p>
          <p style={{ margin: 4 }}>
            <strong>Currency:</strong> {activeCountry.currency.code} ({activeCountry.currency.symbol}) — {activeCountry.currency.name}
          </p>
          <p style={{ margin: 4 }}>
            <strong>Primary Timezones:</strong> {activeCountry.timezones.slice(0, 2).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default CountrySelect;

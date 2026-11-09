import React, { useMemo, useState } from 'react';
import {
  getCountries,
  getCountry,
  getCountriesByContinent,
  getContinents,
  getSupportedLanguages,
  getSubdivisions,
  hasSubdivisions,
  getDistance,
  isValidPostalCode,
  getPostalCodePattern,
  toSelectOptions,
  type Country,
  type SupportedLanguage,
  type SelectOption,
  type Subdivision,
} from 'i18n-countries-continents';

export interface CountrySelectProps {
  /** Selected language for country names (default: 'en') */
  language?: SupportedLanguage;
  /** Filter countries by continent code (e.g. 'EU', 'AF', 'NA', 'AS') */
  continent?: string;
  /** Filter countries by geopolitical union */
  union?: 'EU' | 'Schengen' | 'EEA';
  /** Only show countries that have ISO 3166-2 subdivisions */
  subdivisionsOnly?: boolean;
  /** Currently selected country ISO alpha-2 code */
  value?: string;
  /** Callback fired when a country is selected */
  onChange?: (country: Country | undefined) => void;
  /** Whether to show flag emojis in dropdown options (default: true) */
  showFlags?: boolean;
  /** Custom label formatter */
  formatLabel?: (country: Country) => string;
  /** Placeholder label for empty selection */
  placeholder?: string;
  /** Accessible label or className */
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/**
 * Reusable, localized Country `<select>` component.
 */
export const CountrySelect: React.FC<CountrySelectProps> = ({
  language = 'en',
  continent,
  union,
  subdivisionsOnly = false,
  value,
  onChange,
  showFlags = true,
  formatLabel,
  placeholder = 'Select a country...',
  className = '',
  disabled = false,
  style,
}) => {
  // Fetch countries, optionally filtered by continent & union
  const countryList = useMemo(() => {
    let list = continent
      ? getCountriesByContinent(continent, language)
      : getCountries(language);

    if (union === 'EU') list = list.filter((c) => c.isEU);
    else if (union === 'Schengen') list = list.filter((c) => c.isSchengen);
    else if (union === 'EEA') list = list.filter((c) => c.isEEA);

    if (subdivisionsOnly) list = list.filter((c) => hasSubdivisions(c.code));

    return list;
  }, [continent, union, subdivisionsOnly, language]);

  // Format into standard select options with alphabetical localized sorting
  const options: SelectOption[] = useMemo(() => {
    return toSelectOptions(countryList, {
      value: 'code',
      label: (c) => {
        if (formatLabel) return formatLabel(c);
        return showFlags && c.flag ? `${c.flag}  ${c.name}` : c.name;
      },
      sort: true,
      language,
    });
  }, [countryList, showFlags, formatLabel, language]);

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
      style={{
        padding: '8px 12px',
        borderRadius: 8,
        border: '1px solid #cbd5e1',
        fontSize: '0.95rem',
        backgroundColor: '#ffffff',
        color: '#1e293b',
        width: '100%',
        ...style,
      }}
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

export interface SubdivisionSelectProps {
  /** ISO Alpha-2 country code (e.g. 'US', 'CA', 'DE', 'IN') */
  countryCode: string;
  value?: string;
  onChange?: (subdivision: Subdivision | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/**
 * Reusable ISO 3166-2 Subdivision (State / Province / Canton) `<select>` component.
 */
export const SubdivisionSelect: React.FC<SubdivisionSelectProps> = ({
  countryCode,
  value,
  onChange,
  placeholder = 'Select a state / province...',
  disabled = false,
  style,
}) => {
  const subdivisions = useMemo(() => {
    if (!countryCode || !hasSubdivisions(countryCode)) return [];
    return getSubdivisions(countryCode);
  }, [countryCode]);

  if (subdivisions.length === 0) {
    return (
      <select disabled style={{ padding: '8px 12px', borderRadius: 8, width: '100%', ...style }}>
        <option>No subdivisions available for this nation</option>
      </select>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subCode = e.target.value;
    const item = subdivisions.find((s) => s.code === subCode);
    onChange?.(item);
  };

  return (
    <select
      value={value || ''}
      onChange={handleChange}
      disabled={disabled}
      style={{
        padding: '8px 12px',
        borderRadius: 8,
        border: '1px solid #cbd5e1',
        fontSize: '0.95rem',
        backgroundColor: '#ffffff',
        color: '#1e293b',
        width: '100%',
        ...style,
      }}
      aria-label="Select Subdivision"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {subdivisions.map((s) => (
        <option key={s.code} value={s.code}>
          {s.name} ({s.code}) — {s.type}
        </option>
      ))}
    </select>
  );
};

/**
 * Interactive Demo App demonstrating all React integrations:
 * - 14-language switcher with RTL support
 * - Country picker with flags and continent filter
 * - Subdivision selector
 * - Full country details card
 * - Geodesic distance calculation
 * - Postal code validation
 */
export const CountrySelectorApp: React.FC = () => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [continent, setContinent] = useState<string>('');
  const [selectedCode, setSelectedCode] = useState<string>('US');
  const [selectedSubdiv, setSelectedSubdiv] = useState<string>('CA');
  const [postalInput, setPostalInput] = useState<string>('90210');
  const [compareCode, setCompareCode] = useState<string>('FR');

  const languages = useMemo(() => getSupportedLanguages(), []);
  const continents = useMemo(() => getContinents(language), [language]);

  const activeCountry = useMemo(
    () => (selectedCode ? getCountry(selectedCode, language) : undefined),
    [selectedCode, language]
  );

  const compareCountry = useMemo(
    () => (compareCode ? getCountry(compareCode, language) : undefined),
    [compareCode, language]
  );

  const distanceKm = useMemo(() => {
    if (!selectedCode || !compareCode) return 0;
    return getDistance(selectedCode, compareCode);
  }, [selectedCode, compareCode]);

  const isPostalValid = useMemo(() => {
    if (!selectedCode || !postalInput) return false;
    return isValidPostalCode(selectedCode, postalInput);
  }, [selectedCode, postalInput]);

  const postalPattern = useMemo(() => {
    if (!selectedCode) return undefined;
    return getPostalCodePattern(selectedCode);
  }, [selectedCode]);

  const isRtl = language === 'ar';

  return (
    <div
      style={{
        maxWidth: 720,
        margin: '2rem auto',
        padding: '1.5rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        borderRadius: 16,
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#38bdf8' }}>
            🌍 International Country & Geo Picker
          </h2>
          <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>
            React component demo powered by <code>i18n-countries-continents</code>
          </p>
        </div>

        {/* Language Selector */}
        <div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              background: '#1e293b',
              color: '#f8fafc',
              border: '1px solid #334155',
            }}
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.nativeName} ({l.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', color: '#94a3b8', marginBottom: 4 }}>
            Filter Continent:
          </label>
          <select
            value={continent}
            onChange={(e) => setContinent(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              background: '#1e293b',
              color: '#f8fafc',
              border: '1px solid #334155',
              width: '100%',
            }}
          >
            <option value="">All Continents (Global)</option>
            {continents.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', color: '#94a3b8', marginBottom: 4 }}>
            Selected Country:
          </label>
          <CountrySelect
            language={language}
            continent={continent || undefined}
            value={selectedCode}
            onChange={(country) => {
              setSelectedCode(country?.code || '');
              setSelectedSubdiv('');
            }}
            style={{ background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
          />
        </div>
      </div>

      {/* Subdivisions Row (if applicable) */}
      {selectedCode && hasSubdivisions(selectedCode) && (
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', color: '#94a3b8', marginBottom: 4 }}>
            ISO 3166-2 Subdivision (State / Province):
          </label>
          <SubdivisionSelect
            countryCode={selectedCode}
            value={selectedSubdiv}
            onChange={(s) => setSelectedSubdiv(s?.code || '')}
            style={{ background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
          />
        </div>
      )}

      {/* Selected Country Details Card */}
      {activeCountry && (
        <div
          style={{
            padding: '1.25rem',
            background: '#1e293b',
            borderRadius: 12,
            border: '1px solid #334155',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>{activeCountry.flag}</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.3rem' }}>
                {activeCountry.name} {activeCountry.nativeName && <small style={{ color: '#94a3b8' }}>({activeCountry.nativeName})</small>}
              </h3>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                {activeCountry.continent} · {activeCountry.subregion}
                {activeCountry.isEU && ' · 🇪🇺 EU Member'}
                {activeCountry.isSchengen && ' · Schengen'}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div><strong>ISO-2 / 3:</strong> {activeCountry.code} / {activeCountry.alpha3}</div>
            <div><strong>Numeric:</strong> {activeCountry.numeric}</div>
            <div><strong>Capital:</strong> {activeCountry.capital || 'N/A'}</div>
            <div><strong>Calling Code:</strong> {activeCountry.callingCode}</div>
            <div><strong>Currency:</strong> {activeCountry.currency.code} ({activeCountry.currency.symbol})</div>
            <div><strong>ccTLD:</strong> {activeCountry.tld}</div>
            <div><strong>Demonym:</strong> {activeCountry.demonym}</div>
            <div><strong>Area:</strong> {activeCountry.area?.toLocaleString()} km²</div>
            <div><strong>Landlocked:</strong> {activeCountry.landlocked ? 'Yes' : 'No'}</div>
            <div><strong>Borders:</strong> {activeCountry.borders.join(', ') || 'None'}</div>
          </div>
        </div>
      )}

      {/* Distance Calculator Section */}
      <div style={{ background: '#1e293b', padding: '1rem', borderRadius: 12, border: '1px solid #334155', marginBottom: '1.5rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#38bdf8', fontSize: '0.95rem' }}>
          📏 Geodesic Haversine Distance
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span>Distance from {activeCountry?.name} to:</span>
          <div style={{ minWidth: 200, flex: 1 }}>
            <CountrySelect
              language={language}
              value={compareCode}
              onChange={(c) => setCompareCode(c?.code || '')}
              style={{ background: '#0f172a', color: '#f8fafc', border: '1px solid #334155' }}
            />
          </div>
        </div>
        <div style={{ marginTop: '0.5rem', fontWeight: 700, fontSize: '1.1rem', color: '#34d399' }}>
          = {distanceKm.toLocaleString()} km ({Math.round(distanceKm * 0.621371).toLocaleString()} miles)
        </div>
      </div>

      {/* Postal Code Validator Section */}
      <div style={{ background: '#1e293b', padding: '1rem', borderRadius: 12, border: '1px solid #334155' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#38bdf8', fontSize: '0.95rem' }}>
          📮 Postal / ZIP Code Validation
        </h4>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={postalInput}
            onChange={(e) => setPostalInput(e.target.value)}
            placeholder="Type postal code..."
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              background: '#0f172a',
              color: '#f8fafc',
              border: '1px solid #334155',
              fontSize: '0.9rem',
              width: 180,
            }}
          />
          <span
            style={{
              padding: '4px 8px',
              borderRadius: 6,
              fontWeight: 700,
              fontSize: '0.8rem',
              backgroundColor: isPostalValid ? 'rgba(52, 211, 153, 0.2)' : 'rgba(248, 113, 113, 0.2)',
              color: isPostalValid ? '#34d399' : '#f87171',
            }}
          >
            {isPostalValid ? '✓ Valid Format' : '✕ Invalid Format'}
          </span>
          {postalPattern && (
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>
              Pattern: /{postalPattern}/
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountrySelect;

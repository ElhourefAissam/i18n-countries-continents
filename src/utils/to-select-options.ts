import { SupportedLanguage } from "./types.js";

export interface SelectOption {
  value: string;
  label: string;
}

export type ValueResolver<T> = keyof T | ((item: T) => string);
export type LabelResolver<T> = keyof T | ((item: T) => string);

export interface SelectOptionConfig<T> {
  /** Property name or custom resolver function for option value (default: 'code') */
  value?: ValueResolver<T>;
  /** Property name or custom resolver function for option label (default: 'name') */
  label?: LabelResolver<T>;
  /** Whether to sort options alphabetically by label (default: false) */
  sort?: boolean;
  /** Language locale for collation when sort is true (default: 'en') */
  language?: SupportedLanguage;
}

/**
 * Format an array of entities (countries, continents, cities) into standard `{ value, label }`
 * options for UI libraries (React Select, Vuetify, Angular Material, Ant Design, HTML `<select>`).
 *
 * @param items - Array of entities (e.g. from `getCountries()`, `getContinents()`, `getCities()`)
 * @param config - Configuration for resolving value, label, and optional sorting
 * @returns Array of SelectOption objects
 *
 * @example
 * ```ts
 * const countries = getCountries('en');
 *
 * // Default: { value: 'US', label: 'United States' }
 * const options = toSelectOptions(countries);
 *
 * // With flags and alphabetical sorting:
 * const flagOptions = toSelectOptions(countries, {
 *   label: (c) => `${c.flag} ${c.name}`,
 *   sort: true,
 *   language: 'en'
 * });
 * ```
 */
export default function toSelectOptions<T extends Record<string, any>>(
  items: T[],
  config?: SelectOptionConfig<T>
): SelectOption[] {
  if (!Array.isArray(items)) return [];

  const valueResolver = config?.value ?? "code";
  const labelResolver = config?.label ?? "name";

  const options: SelectOption[] = items.map((item) => {
    const value =
      typeof valueResolver === "function"
        ? valueResolver(item)
        : String(item[valueResolver] ?? "");

    const label =
      typeof labelResolver === "function"
        ? labelResolver(item)
        : String(item[labelResolver] ?? "");

    return { value, label };
  });

  if (config?.sort) {
    const collator = new Intl.Collator(config.language ?? "en", {
      sensitivity: "base",
    });
    options.sort((a, b) => collator.compare(a.label, b.label));
  }

  return options;
}

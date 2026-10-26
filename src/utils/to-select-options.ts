export interface SelectOption {
  value: string;
  label: string;
}

export type ValueResolver<T> = keyof T | ((item: T) => string);
export type LabelResolver<T> = keyof T | ((item: T) => string);

export interface SelectOptionConfig<T> {
  value?: ValueResolver<T>;
  label?: LabelResolver<T>;
}

export default function toSelectOptions<T extends Record<string, any>>(
  items: T[],
  config?: SelectOptionConfig<T>
): SelectOption[] {
  if (!Array.isArray(items)) return [];

  const valueResolver = config?.value ?? "code";
  const labelResolver = config?.label ?? "name";

  return items.map((item) => {
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
}

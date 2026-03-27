import { getLangCountries } from "../../data/loader.js";

// Flags are the same in every language — use "en" bundle
export default function getCountryFlag(code: string): string | undefined {
  const upper = code.toUpperCase();
  const entry = getLangCountries("en").find(([c]) => c === upper);
  return entry ? entry[2] : undefined;
}

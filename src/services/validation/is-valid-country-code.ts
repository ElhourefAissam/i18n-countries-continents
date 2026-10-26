import { getLangCountries } from "../../data/loader.js";

export default function isValidCountryCode(code: string): boolean {
  if (!code || typeof code !== "string" || code.trim().length !== 2) {
    return false;
  }
  const upper = code.toUpperCase().trim();
  return getLangCountries("en").some(([c]) => c === upper);
}

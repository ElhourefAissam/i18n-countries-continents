import { getLangCountries } from "../../data/loader.js";

// Continent mapping is the same in every language — use "en" bundle
export default function getContinentByCountry(
  countryCode: string
): string | undefined {
  const upper = countryCode.toUpperCase();
  const entry = getLangCountries("en").find(([c]) => c === upper);
  return entry ? entry[1] : undefined;
}

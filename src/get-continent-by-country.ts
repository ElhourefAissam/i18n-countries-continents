import { countries } from "./data/countries";

export default function getContinentByCountry(
  countryCode: string
): string | undefined {
  const country = countries.find(
    (c) => c.code.toUpperCase() === countryCode.toUpperCase()
  );
  return country ? country.continent : undefined;
}

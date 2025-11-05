import countriesData from "../../data/countries.json" with { type: "json" };

export default function getContinentByCountry(
  countryCode: string
): string | undefined {
  const country = countriesData.find(
    (c) => c.code.toUpperCase() === countryCode.toUpperCase()
  );
  return country ? country.continent : undefined;
}

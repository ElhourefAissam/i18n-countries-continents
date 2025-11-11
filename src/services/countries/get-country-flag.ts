import countriesData from "../../data/countries.json" with { type: "json" };

export default function getCountryFlag(code: string): string | undefined {
  const country = countriesData.find(
    (c) => c.code.toUpperCase() === code.toUpperCase()
  );
  return country ? country.flag : undefined;
}

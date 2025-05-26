import { SupportedLanguage } from "../types";

type Country = {
  code: string;
  continent: string;
  names: Partial<Record<SupportedLanguage, string>>;
};

export const countries: Country[] = [
  {
    code: "US",
    continent: "NA",
    names: {
      en: "United States",
      fr: "États-Unis",
      es: "Estados Unidos",
    },
  },
  {
    code: "FR",
    continent: "EU",
    names: {
      en: "France",
      fr: "France",
      es: "Francia",
    },
  },
  {
    code: "CN",
    continent: "AS",
    names: {
      en: "China",
      fr: "Chine",
      es: "China",
    },
  },
];

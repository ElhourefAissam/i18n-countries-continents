import { SupportedLanguage } from "../types";

type Continent = {
  code: string;
  names: Partial<Record<SupportedLanguage, string>>;
};

export const continents: Continent[] = [
  {
    code: "NA",
    names: {
      en: "North America",
      fr: "Amérique du Nord",
      es: "Norteamérica",
    },
  },
  {
    code: "EU",
    names: {
      en: "Europe",
      fr: "Europe",
      es: "Europa",
    },
  },
  {
    code: "AS",
    names: {
      en: "Asia",
      fr: "Asie",
      es: "Asia",
    },
  },
];

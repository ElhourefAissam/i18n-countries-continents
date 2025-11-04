import { SupportedLanguage } from "../types";

type Continent = {
  code: string;
  names: Partial<Record<SupportedLanguage, string>>;
};

export const continents: Continent[] = [
  {
    code: "AF",
    names: {
      en: "Africa",
      fr: "Afrique",
      es: "África",
      ar: "أفريقيا",
      nl: "Afrika",
    },
  },
  {
    code: "AN",
    names: {
      en: "Antarctica",
      fr: "Antarctique",
      es: "Antártida",
      ar: "القارة القطبية الجنوبية",
      nl: "Antarctica",
    },
  },
  {
    code: "AS",
    names: {
      en: "Asia",
      fr: "Asie",
      es: "Asia",
      ar: "آسيا",
      nl: "Azië",
    },
  },
  {
    code: "EU",
    names: {
      en: "Europe",
      fr: "Europe",
      es: "Europa",
      ar: "أوروبا",
      nl: "Europa",
    },
  },
  {
    code: "NA",
    names: {
      en: "North America",
      fr: "Amérique du Nord",
      es: "Norteamérica",
      ar: "أمريكا الشمالية",
      nl: "Noord-Amerika",
    },
  },
  {
    code: "OC",
    names: {
      en: "Oceania",
      fr: "Océanie",
      es: "Oceanía",
      ar: "أوقيانوسيا",
      nl: "Oceanië",
    },
  },
  {
    code: "SA",
    names: {
      en: "South America",
      fr: "Amérique du Sud",
      es: "Sudamérica",
      ar: "أمريكا الجنوبية",
      nl: "Zuid-Amerika",
    },
  },
];

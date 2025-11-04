import { SupportedLanguage } from "../types";

type Country = {
  code: string;
  continent: string;
  names: Partial<Record<SupportedLanguage, string>>;
};

export const countries: Country[] = [
  // North America
  {
    code: "US",
    continent: "NA",
    names: {
      en: "United States",
      fr: "États-Unis",
      es: "Estados Unidos",
      ar: "الولايات المتحدة",
      nl: "Verenigde Staten",
    },
  },
  {
    code: "CA",
    continent: "NA",
    names: {
      en: "Canada",
      fr: "Canada",
      es: "Canadá",
      ar: "كندا",
      nl: "Canada",
    },
  },
  {
    code: "MX",
    continent: "NA",
    names: {
      en: "Mexico",
      fr: "Mexique",
      es: "México",
      ar: "المكسيك",
      nl: "Mexico",
    },
  },

  // South America
  {
    code: "BR",
    continent: "SA",
    names: {
      en: "Brazil",
      fr: "Brésil",
      es: "Brasil",
      ar: "البرازيل",
      nl: "Brazilië",
    },
  },
  {
    code: "AR",
    continent: "SA",
    names: {
      en: "Argentina",
      fr: "Argentine",
      es: "Argentina",
      ar: "الأرجنتين",
      nl: "Argentinië",
    },
  },
  {
    code: "CL",
    continent: "SA",
    names: {
      en: "Chile",
      fr: "Chili",
      es: "Chile",
      ar: "تشيلي",
      nl: "Chili",
    },
  },
  {
    code: "CO",
    continent: "SA",
    names: {
      en: "Colombia",
      fr: "Colombie",
      es: "Colombia",
      ar: "كولومبيا",
      nl: "Colombia",
    },
  },
  {
    code: "PE",
    continent: "SA",
    names: {
      en: "Peru",
      fr: "Pérou",
      es: "Perú",
      ar: "بيرو",
      nl: "Peru",
    },
  },

  // Europe
  {
    code: "FR",
    continent: "EU",
    names: {
      en: "France",
      fr: "France",
      es: "Francia",
      ar: "فرنسا",
      nl: "Frankrijk",
    },
  },
  {
    code: "DE",
    continent: "EU",
    names: {
      en: "Germany",
      fr: "Allemagne",
      es: "Alemania",
      ar: "ألمانيا",
      nl: "Duitsland",
    },
  },
  {
    code: "IT",
    continent: "EU",
    names: {
      en: "Italy",
      fr: "Italie",
      es: "Italia",
      ar: "إيطاليا",
      nl: "Italië",
    },
  },
  {
    code: "ES",
    continent: "EU",
    names: {
      en: "Spain",
      fr: "Espagne",
      es: "España",
      ar: "إسبانيا",
      nl: "Spanje",
    },
  },
  {
    code: "GB",
    continent: "EU",
    names: {
      en: "United Kingdom",
      fr: "Royaume-Uni",
      es: "Reino Unido",
      ar: "المملكة المتحدة",
      nl: "Verenigd Koninkrijk",
    },
  },
  {
    code: "NL",
    continent: "EU",
    names: {
      en: "Netherlands",
      fr: "Pays-Bas",
      es: "Países Bajos",
      ar: "هولندا",
      nl: "Nederland",
    },
  },
  {
    code: "BE",
    continent: "EU",
    names: {
      en: "Belgium",
      fr: "Belgique",
      es: "Bélgica",
      ar: "بلجيكا",
      nl: "België",
    },
  },
  {
    code: "CH",
    continent: "EU",
    names: {
      en: "Switzerland",
      fr: "Suisse",
      es: "Suiza",
      ar: "سويسرا",
      nl: "Zwitserland",
    },
  },
  {
    code: "SE",
    continent: "EU",
    names: {
      en: "Sweden",
      fr: "Suède",
      es: "Suecia",
      ar: "السويد",
      nl: "Zweden",
    },
  },
  {
    code: "NO",
    continent: "EU",
    names: {
      en: "Norway",
      fr: "Norvège",
      es: "Noruega",
      ar: "النرويج",
      nl: "Noorwegen",
    },
  },
  {
    code: "DK",
    continent: "EU",
    names: {
      en: "Denmark",
      fr: "Danemark",
      es: "Dinamarca",
      ar: "الدنمارك",
      nl: "Denemarken",
    },
  },
  {
    code: "PL",
    continent: "EU",
    names: {
      en: "Poland",
      fr: "Pologne",
      es: "Polonia",
      ar: "بولندا",
      nl: "Polen",
    },
  },
  {
    code: "PT",
    continent: "EU",
    names: {
      en: "Portugal",
      fr: "Portugal",
      es: "Portugal",
      ar: "البرتغال",
      nl: "Portugal",
    },
  },
  {
    code: "GR",
    continent: "EU",
    names: {
      en: "Greece",
      fr: "Grèce",
      es: "Grecia",
      ar: "اليونان",
      nl: "Griekenland",
    },
  },
  {
    code: "RU",
    continent: "EU",
    names: {
      en: "Russia",
      fr: "Russie",
      es: "Rusia",
      ar: "روسيا",
      nl: "Rusland",
    },
  },

  // Asia
  {
    code: "CN",
    continent: "AS",
    names: {
      en: "China",
      fr: "Chine",
      es: "China",
      ar: "الصين",
      nl: "China",
    },
  },
  {
    code: "JP",
    continent: "AS",
    names: {
      en: "Japan",
      fr: "Japon",
      es: "Japón",
      ar: "اليابان",
      nl: "Japan",
    },
  },
  {
    code: "IN",
    continent: "AS",
    names: {
      en: "India",
      fr: "Inde",
      es: "India",
      ar: "الهند",
      nl: "India",
    },
  },
  {
    code: "KR",
    continent: "AS",
    names: {
      en: "South Korea",
      fr: "Corée du Sud",
      es: "Corea del Sur",
      ar: "كوريا الجنوبية",
      nl: "Zuid-Korea",
    },
  },
  {
    code: "ID",
    continent: "AS",
    names: {
      en: "Indonesia",
      fr: "Indonésie",
      es: "Indonesia",
      ar: "إندونيسيا",
      nl: "Indonesië",
    },
  },
  {
    code: "TH",
    continent: "AS",
    names: {
      en: "Thailand",
      fr: "Thaïlande",
      es: "Tailandia",
      ar: "تايلاند",
      nl: "Thailand",
    },
  },
  {
    code: "VN",
    continent: "AS",
    names: {
      en: "Vietnam",
      fr: "Viêt Nam",
      es: "Vietnam",
      ar: "فيتنام",
      nl: "Vietnam",
    },
  },
  {
    code: "PH",
    continent: "AS",
    names: {
      en: "Philippines",
      fr: "Philippines",
      es: "Filipinas",
      ar: "الفلبين",
      nl: "Filipijnen",
    },
  },
  {
    code: "MY",
    continent: "AS",
    names: {
      en: "Malaysia",
      fr: "Malaisie",
      es: "Malasia",
      ar: "ماليزيا",
      nl: "Maleisië",
    },
  },
  {
    code: "SG",
    continent: "AS",
    names: {
      en: "Singapore",
      fr: "Singapour",
      es: "Singapur",
      ar: "سنغافورة",
      nl: "Singapore",
    },
  },
  {
    code: "SA",
    continent: "AS",
    names: {
      en: "Saudi Arabia",
      fr: "Arabie Saoudite",
      es: "Arabia Saudita",
      ar: "المملكة العربية السعودية",
      nl: "Saoedi-Arabië",
    },
  },
  {
    code: "AE",
    continent: "AS",
    names: {
      en: "United Arab Emirates",
      fr: "Émirats Arabes Unis",
      es: "Emiratos Árabes Unidos",
      ar: "الإمارات العربية المتحدة",
      nl: "Verenigde Arabische Emiraten",
    },
  },
  {
    code: "TR",
    continent: "AS",
    names: {
      en: "Turkey",
      fr: "Turquie",
      es: "Turquía",
      ar: "تركيا",
      nl: "Turkije",
    },
  },
  {
    code: "IL",
    continent: "AS",
    names: {
      en: "Israel",
      fr: "Israël",
      es: "Israel",
      ar: "إسرائيل",
      nl: "Israël",
    },
  },

  // Africa
  {
    code: "EG",
    continent: "AF",
    names: {
      en: "Egypt",
      fr: "Égypte",
      es: "Egipto",
      ar: "مصر",
      nl: "Egypte",
    },
  },
  {
    code: "ZA",
    continent: "AF",
    names: {
      en: "South Africa",
      fr: "Afrique du Sud",
      es: "Sudáfrica",
      ar: "جنوب أفريقيا",
      nl: "Zuid-Afrika",
    },
  },
  {
    code: "NG",
    continent: "AF",
    names: {
      en: "Nigeria",
      fr: "Nigeria",
      es: "Nigeria",
      ar: "نيجيريا",
      nl: "Nigeria",
    },
  },
  {
    code: "KE",
    continent: "AF",
    names: {
      en: "Kenya",
      fr: "Kenya",
      es: "Kenia",
      ar: "كينيا",
      nl: "Kenia",
    },
  },
  {
    code: "MA",
    continent: "AF",
    names: {
      en: "Morocco",
      fr: "Maroc",
      es: "Marruecos",
      ar: "المغرب",
      nl: "Marokko",
    },
  },
  {
    code: "DZ",
    continent: "AF",
    names: {
      en: "Algeria",
      fr: "Algérie",
      es: "Argelia",
      ar: "الجزائر",
      nl: "Algerije",
    },
  },
  {
    code: "TN",
    continent: "AF",
    names: {
      en: "Tunisia",
      fr: "Tunisie",
      es: "Túnez",
      ar: "تونس",
      nl: "Tunesië",
    },
  },

  // Oceania
  {
    code: "AU",
    continent: "OC",
    names: {
      en: "Australia",
      fr: "Australie",
      es: "Australia",
      ar: "أستراليا",
      nl: "Australië",
    },
  },
  {
    code: "NZ",
    continent: "OC",
    names: {
      en: "New Zealand",
      fr: "Nouvelle-Zélande",
      es: "Nueva Zelanda",
      ar: "نيوزيلندا",
      nl: "Nieuw-Zeeland",
    },
  },
];

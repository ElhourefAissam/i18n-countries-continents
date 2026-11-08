import { alpha3ToAlpha2 } from "../../data/metadata.js";
import { normalizeText } from "../../utils/normalize.js";

export interface Subdivision {
  /** ISO 3166-2 subdivision code (e.g. 'CA', 'NY', 'ON', 'ENG', 'BY') */
  code: string;
  /** Name of the state, province, region, or prefecture */
  name: string;
  /** Category type (e.g. 'state', 'province', 'region', 'prefecture', 'nation', 'canton') */
  type: string;
  /** ISO 3166-1 alpha-2 country code this subdivision belongs to (optional when scoped) */
  countryCode?: string;
}

const SUBDIVISIONS_MAP: Record<string, Subdivision[]> = {
  US: [
    { code: "AL", name: "Alabama", type: "state" },
    { code: "AK", name: "Alaska", type: "state" },
    { code: "AZ", name: "Arizona", type: "state" },
    { code: "AR", name: "Arkansas", type: "state" },
    { code: "CA", name: "California", type: "state" },
    { code: "CO", name: "Colorado", type: "state" },
    { code: "CT", name: "Connecticut", type: "state" },
    { code: "DE", name: "Delaware", type: "state" },
    { code: "FL", name: "Florida", type: "state" },
    { code: "GA", name: "Georgia", type: "state" },
    { code: "HI", name: "Hawaii", type: "state" },
    { code: "ID", name: "Idaho", type: "state" },
    { code: "IL", name: "Illinois", type: "state" },
    { code: "IN", name: "Indiana", type: "state" },
    { code: "IA", name: "Iowa", type: "state" },
    { code: "KS", name: "Kansas", type: "state" },
    { code: "KY", name: "Kentucky", type: "state" },
    { code: "LA", name: "Louisiana", type: "state" },
    { code: "ME", name: "Maine", type: "state" },
    { code: "MD", name: "Maryland", type: "state" },
    { code: "MA", name: "Massachusetts", type: "state" },
    { code: "MI", name: "Michigan", type: "state" },
    { code: "MN", name: "Minnesota", type: "state" },
    { code: "MS", name: "Mississippi", type: "state" },
    { code: "MO", name: "Missouri", type: "state" },
    { code: "MT", name: "Montana", type: "state" },
    { code: "NE", name: "Nebraska", type: "state" },
    { code: "NV", name: "Nevada", type: "state" },
    { code: "NH", name: "New Hampshire", type: "state" },
    { code: "NJ", name: "New Jersey", type: "state" },
    { code: "NM", name: "New Mexico", type: "state" },
    { code: "NY", name: "New York", type: "state" },
    { code: "NC", name: "North Carolina", type: "state" },
    { code: "ND", name: "North Dakota", type: "state" },
    { code: "OH", name: "Ohio", type: "state" },
    { code: "OK", name: "Oklahoma", type: "state" },
    { code: "OR", name: "Oregon", type: "state" },
    { code: "PA", name: "Pennsylvania", type: "state" },
    { code: "RI", name: "Rhode Island", type: "state" },
    { code: "SC", name: "South Carolina", type: "state" },
    { code: "SD", name: "South Dakota", type: "state" },
    { code: "TN", name: "Tennessee", type: "state" },
    { code: "TX", name: "Texas", type: "state" },
    { code: "UT", name: "Utah", type: "state" },
    { code: "VT", name: "Vermont", type: "state" },
    { code: "VA", name: "Virginia", type: "state" },
    { code: "WA", name: "Washington", type: "state" },
    { code: "WV", name: "West Virginia", type: "state" },
    { code: "WI", name: "Wisconsin", type: "state" },
    { code: "WY", name: "Wyoming", type: "state" },
    { code: "DC", name: "District of Columbia", type: "federal district" },
  ],
  CA: [
    { code: "AB", name: "Alberta", type: "province" },
    { code: "BC", name: "British Columbia", type: "province" },
    { code: "MB", name: "Manitoba", type: "province" },
    { code: "NB", name: "New Brunswick", type: "province" },
    { code: "NL", name: "Newfoundland and Labrador", type: "province" },
    { code: "NS", name: "Nova Scotia", type: "province" },
    { code: "ON", name: "Ontario", type: "province" },
    { code: "PE", name: "Prince Edward Island", type: "province" },
    { code: "QC", name: "Quebec", type: "province" },
    { code: "SK", name: "Saskatchewan", type: "province" },
    { code: "NT", name: "Northwest Territories", type: "territory" },
    { code: "NU", name: "Nunavut", type: "territory" },
    { code: "YT", name: "Yukon", type: "territory" },
  ],
  AU: [
    { code: "NSW", name: "New South Wales", type: "state" },
    { code: "QLD", name: "Queensland", type: "state" },
    { code: "SA", name: "South Australia", type: "state" },
    { code: "TAS", name: "Tasmania", type: "state" },
    { code: "VIC", name: "Victoria", type: "state" },
    { code: "WA", name: "Western Australia", type: "state" },
    { code: "ACT", name: "Australian Capital Territory", type: "territory" },
    { code: "NT", name: "Northern Territory", type: "territory" },
  ],
  GB: [
    { code: "ENG", name: "England", type: "country" },
    { code: "SCT", name: "Scotland", type: "country" },
    { code: "WLS", name: "Wales", type: "country" },
    { code: "NIR", name: "Northern Ireland", type: "province" },
  ],
  DE: [
    { code: "BW", name: "Baden-Württemberg", type: "state" },
    { code: "BY", name: "Bayern", type: "state" },
    { code: "BE", name: "Berlin", type: "state" },
    { code: "BB", name: "Brandenburg", type: "state" },
    { code: "HB", name: "Bremen", type: "state" },
    { code: "HH", name: "Hamburg", type: "state" },
    { code: "HE", name: "Hessen", type: "state" },
    { code: "MV", name: "Mecklenburg-Vorpommern", type: "state" },
    { code: "NI", name: "Niedersachsen", type: "state" },
    { code: "NW", name: "Nordrhein-Westfalen", type: "state" },
    { code: "RP", name: "Rheinland-Pfalz", type: "state" },
    { code: "SL", name: "Saarland", type: "state" },
    { code: "SN", name: "Sachsen", type: "state" },
    { code: "ST", name: "Sachsen-Anhalt", type: "state" },
    { code: "SH", name: "Schleswig-Holstein", type: "state" },
    { code: "TH", name: "Thüringen", type: "state" },
  ],
  FR: [
    { code: "ARA", name: "Auvergne-Rhône-Alpes", type: "region" },
    { code: "BFC", name: "Bourgogne-Franche-Comté", type: "region" },
    { code: "BRE", name: "Bretagne", type: "region" },
    { code: "CVL", name: "Centre-Val de Loire", type: "region" },
    { code: "COR", name: "Corse", type: "region" },
    { code: "GES", name: "Grand Est", type: "region" },
    { code: "HDF", name: "Hauts-de-France", type: "region" },
    { code: "IDF", name: "Île-de-France", type: "region" },
    { code: "NOR", name: "Normandie", type: "region" },
    { code: "NAQ", name: "Nouvelle-Aquitaine", type: "region" },
    { code: "OCC", name: "Occitanie", type: "region" },
    { code: "PDL", name: "Pays de la Loire", type: "region" },
    { code: "PAC", name: "Provence-Alpes-Côte d'Azur", type: "region" },
    { code: "GUA", name: "Guadeloupe", type: "overseas region" },
    { code: "GUF", name: "Guyane", type: "overseas region" },
    { code: "MAY", name: "Mayotte", type: "overseas region" },
    { code: "MTQ", name: "Martinique", type: "overseas region" },
    { code: "REU", name: "La Réunion", type: "overseas region" },
  ],
  ES: [
    { code: "AN", name: "Andalucía", type: "autonomous community" },
    { code: "AR", name: "Aragón", type: "autonomous community" },
    { code: "AS", name: "Asturias", type: "autonomous community" },
    { code: "IB", name: "Islas Baleares", type: "autonomous community" },
    { code: "CN", name: "Canarias", type: "autonomous community" },
    { code: "CB", name: "Cantabria", type: "autonomous community" },
    { code: "CL", name: "Castilla y León", type: "autonomous community" },
    { code: "CM", name: "Castilla-La Mancha", type: "autonomous community" },
    { code: "CT", name: "Cataluña", type: "autonomous community" },
    { code: "EX", name: "Extremadura", type: "autonomous community" },
    { code: "GA", name: "Galicia", type: "autonomous community" },
    { code: "MD", name: "Madrid", type: "autonomous community" },
    { code: "MC", name: "Murcia", type: "autonomous community" },
    { code: "NC", name: "Navarra", type: "autonomous community" },
    { code: "PV", name: "País Vasco", type: "autonomous community" },
    { code: "RI", name: "La Rioja", type: "autonomous community" },
    { code: "VC", name: "Comunitat Valenciana", type: "autonomous community" },
  ],
  IT: [
    { code: "ABR", name: "Abruzzo", type: "region" },
    { code: "BAS", name: "Basilicata", type: "region" },
    { code: "CAL", name: "Calabria", type: "region" },
    { code: "CAM", name: "Campania", type: "region" },
    { code: "EMR", name: "Emilia-Romagna", type: "region" },
    { code: "FVG", name: "Friuli Venezia Giulia", type: "region" },
    { code: "LAZ", name: "Lazio", type: "region" },
    { code: "LIG", name: "Liguria", type: "region" },
    { code: "LOM", name: "Lombardia", type: "region" },
    { code: "MAR", name: "Marche", type: "region" },
    { code: "MOL", name: "Molise", type: "region" },
    { code: "PMN", name: "Piemonte", type: "region" },
    { code: "PUG", name: "Puglia", type: "region" },
    { code: "SAR", name: "Sardegna", type: "region" },
    { code: "SIC", name: "Sicilia", type: "region" },
    { code: "TOS", name: "Toscana", type: "region" },
    { code: "TAA", name: "Trentino-Alto Adige", type: "region" },
    { code: "UMB", name: "Umbria", type: "region" },
    { code: "VDA", name: "Valle d'Aosta", type: "region" },
    { code: "VEN", name: "Veneto", type: "region" },
  ],
  MX: [
    { code: "AGU", name: "Aguascalientes", type: "state" },
    { code: "BCN", name: "Baja California", type: "state" },
    { code: "BCS", name: "Baja California Sur", type: "state" },
    { code: "CAM", name: "Campeche", type: "state" },
    { code: "CHP", name: "Chiapas", type: "state" },
    { code: "CHH", name: "Chihuahua", type: "state" },
    { code: "CMX", name: "Ciudad de México", type: "federal entity" },
    { code: "COA", name: "Coahuila", type: "state" },
    { code: "COL", name: "Colima", type: "state" },
    { code: "DUR", name: "Durango", type: "state" },
    { code: "GUA", name: "Guanajuato", type: "state" },
    { code: "GRO", name: "Guerrero", type: "state" },
    { code: "HID", name: "Hidalgo", type: "state" },
    { code: "JAL", name: "Jalisco", type: "state" },
    { code: "MEX", name: "Estado de México", type: "state" },
    { code: "MIC", name: "Michoacán", type: "state" },
    { code: "MOR", name: "Morelos", type: "state" },
    { code: "NAY", name: "Nayarit", type: "state" },
    { code: "NLE", name: "Nuevo León", type: "state" },
    { code: "OAX", name: "Oaxaca", type: "state" },
    { code: "PUE", name: "Puebla", type: "state" },
    { code: "QUE", name: "Querétaro", type: "state" },
    { code: "ROO", name: "Quintana Roo", type: "state" },
    { code: "SLP", name: "San Luis Potosí", type: "state" },
    { code: "SIN", name: "Sinaloa", type: "state" },
    { code: "SON", name: "Sonora", type: "state" },
    { code: "TAB", name: "Tabasco", type: "state" },
    { code: "TAM", name: "Tamaulipas", type: "state" },
    { code: "TLA", name: "Tlaxcala", type: "state" },
    { code: "VER", name: "Veracruz", type: "state" },
    { code: "YUC", name: "Yucatán", type: "state" },
    { code: "ZAC", name: "Zacatecas", type: "state" },
  ],
  BR: [
    { code: "AC", name: "Acre", type: "state" },
    { code: "AL", name: "Alagoas", type: "state" },
    { code: "AP", name: "Amapá", type: "state" },
    { code: "AM", name: "Amazonas", type: "state" },
    { code: "BA", name: "Bahia", type: "state" },
    { code: "CE", name: "Ceará", type: "state" },
    { code: "DF", name: "Distrito Federal", type: "federal district" },
    { code: "ES", name: "Espírito Santo", type: "state" },
    { code: "GO", name: "Goiás", type: "state" },
    { code: "MA", name: "Maranhão", type: "state" },
    { code: "MT", name: "Mato Grosso", type: "state" },
    { code: "MS", name: "Mato Grosso do Sul", type: "state" },
    { code: "MG", name: "Minas Gerais", type: "state" },
    { code: "PA", name: "Pará", type: "state" },
    { code: "PB", name: "Paraíba", type: "state" },
    { code: "PR", name: "Paraná", type: "state" },
    { code: "PE", name: "Pernambuco", type: "state" },
    { code: "PI", name: "Piauí", type: "state" },
    { code: "RJ", name: "Rio de Janeiro", type: "state" },
    { code: "RN", name: "Rio Grande do Norte", type: "state" },
    { code: "RS", name: "Rio Grande do Sul", type: "state" },
    { code: "RO", name: "Rondônia", type: "state" },
    { code: "RR", name: "Roraima", type: "state" },
    { code: "SC", name: "Santa Catarina", type: "state" },
    { code: "SP", name: "São Paulo", type: "state" },
    { code: "SE", name: "Sergipe", type: "state" },
    { code: "TO", name: "Tocantins", type: "state" },
  ],
  JP: [
    { code: "01", name: "Hokkaido", type: "prefecture" },
    { code: "13", name: "Tokyo", type: "metropolis" },
    { code: "14", name: "Kanagawa", type: "prefecture" },
    { code: "23", name: "Aichi", type: "prefecture" },
    { code: "26", name: "Kyoto", type: "prefecture" },
    { code: "27", name: "Osaka", type: "prefecture" },
    { code: "28", name: "Hyogo", type: "prefecture" },
    { code: "40", name: "Fukuoka", type: "prefecture" },
    { code: "47", name: "Okinawa", type: "prefecture" },
  ],
  IN: [
    { code: "AP", name: "Andhra Pradesh", type: "state" },
    { code: "AR", name: "Arunachal Pradesh", type: "state" },
    { code: "AS", name: "Assam", type: "state" },
    { code: "BR", name: "Bihar", type: "state" },
    { code: "CT", name: "Chhattisgarh", type: "state" },
    { code: "GA", name: "Goa", type: "state" },
    { code: "GJ", name: "Gujarat", type: "state" },
    { code: "HR", name: "Haryana", type: "state" },
    { code: "HP", name: "Himachal Pradesh", type: "state" },
    { code: "JH", name: "Jharkhand", type: "state" },
    { code: "KA", name: "Karnataka", type: "state" },
    { code: "KL", name: "Kerala", type: "state" },
    { code: "MP", name: "Madhya Pradesh", type: "state" },
    { code: "MH", name: "Maharashtra", type: "state" },
    { code: "MN", name: "Manipur", type: "state" },
    { code: "ML", name: "Meghalaya", type: "state" },
    { code: "MZ", name: "Mizoram", type: "state" },
    { code: "NL", name: "Nagaland", type: "state" },
    { code: "OR", name: "Odisha", type: "state" },
    { code: "PB", name: "Punjab", type: "state" },
    { code: "RJ", name: "Rajasthan", type: "state" },
    { code: "SK", name: "Sikkim", type: "state" },
    { code: "TN", name: "Tamil Nadu", type: "state" },
    { code: "TG", name: "Telangana", type: "state" },
    { code: "TR", name: "Tripura", type: "state" },
    { code: "UP", name: "Uttar Pradesh", type: "state" },
    { code: "UT", name: "Uttarakhand", type: "state" },
    { code: "WB", name: "West Bengal", type: "state" },
    { code: "AN", name: "Andaman and Nicobar Islands", type: "union territory" },
    { code: "CH", name: "Chandigarh", type: "union territory" },
    { code: "DH", name: "Dadra and Nagar Haveli and Daman and Diu", type: "union territory" },
    { code: "DL", name: "Delhi", type: "national capital territory" },
    { code: "JK", name: "Jammu and Kashmir", type: "union territory" },
    { code: "LA", name: "Ladakh", type: "union territory" },
    { code: "LD", name: "Lakshadweep", type: "union territory" },
    { code: "PY", name: "Puducherry", type: "union territory" },
  ],
  CN: [
    { code: "BJ", name: "Beijing", type: "municipality" },
    { code: "TJ", name: "Tianjin", type: "municipality" },
    { code: "SH", name: "Shanghai", type: "municipality" },
    { code: "CQ", name: "Chongqing", type: "municipality" },
    { code: "HE", name: "Hebei", type: "province" },
    { code: "SX", name: "Shanxi", type: "province" },
    { code: "LN", name: "Liaoning", type: "province" },
    { code: "JL", name: "Jilin", type: "province" },
    { code: "HL", name: "Heilongjiang", type: "province" },
    { code: "JS", name: "Jiangsu", type: "province" },
    { code: "ZJ", name: "Zhejiang", type: "province" },
    { code: "AH", name: "Anhui", type: "province" },
    { code: "FJ", name: "Fujian", type: "province" },
    { code: "JX", name: "Jiangxi", type: "province" },
    { code: "SD", name: "Shandong", type: "province" },
    { code: "HA", name: "Henan", type: "province" },
    { code: "HB", name: "Hubei", type: "province" },
    { code: "HN", name: "Hunan", type: "province" },
    { code: "GD", name: "Guangdong", type: "province" },
    { code: "HI", name: "Hainan", type: "province" },
    { code: "SC", name: "Sichuan", type: "province" },
    { code: "GZ", name: "Guizhou", type: "province" },
    { code: "YN", name: "Yunnan", type: "province" },
    { code: "SN", name: "Shaanxi", type: "province" },
    { code: "GS", name: "Gansu", type: "province" },
    { code: "QH", name: "Qinghai", type: "province" },
    { code: "TW", name: "Taiwan", type: "province" },
    { code: "NM", name: "Inner Mongolia", type: "autonomous region" },
    { code: "GX", name: "Guangxi", type: "autonomous region" },
    { code: "XZ", name: "Tibet", type: "autonomous region" },
    { code: "NX", name: "Ningxia", type: "autonomous region" },
    { code: "XJ", name: "Xinjiang", type: "autonomous region" },
    { code: "HK", name: "Hong Kong", type: "special administrative region" },
    { code: "MO", name: "Macao", type: "special administrative region" },
  ],
  RU: [
    { code: "MOW", name: "Moscow", type: "federal city" },
    { code: "SPE", name: "Saint Petersburg", type: "federal city" },
    { code: "MOS", name: "Moscow Oblast", type: "oblast" },
    { code: "TAT", name: "Republic of Tatarstan", type: "republic" },
    { code: "BAS", name: "Republic of Bashkortostan", type: "republic" },
    { code: "SVE", name: "Sverdlovsk Oblast", type: "oblast" },
    { code: "KDA", name: "Krasnodar Krai", type: "krai" },
    { code: "NIZ", name: "Nizhny Novgorod Oblast", type: "oblast" },
    { code: "SAM", name: "Samara Oblast", type: "oblast" },
    { code: "ROS", name: "Rostov Oblast", type: "oblast" },
    { code: "CHE", name: "Chelyabinsk Oblast", type: "oblast" },
    { code: "NOV", name: "Novosibirsk Oblast", type: "oblast" },
  ],
  TR: [
    { code: "34", name: "Istanbul", type: "province" },
    { code: "06", name: "Ankara", type: "province" },
    { code: "35", name: "Izmir", type: "province" },
    { code: "16", name: "Bursa", type: "province" },
    { code: "07", name: "Antalya", type: "province" },
    { code: "01", name: "Adana", type: "province" },
    { code: "42", name: "Konya", type: "province" },
    { code: "27", name: "Gaziantep", type: "province" },
    { code: "41", name: "Kocaeli", type: "province" },
    { code: "61", name: "Trabzon", type: "province" },
    { code: "26", name: "Eskişehir", type: "province" },
  ],
  NL: [
    { code: "DR", name: "Drenthe", type: "province" },
    { code: "FL", name: "Flevoland", type: "province" },
    { code: "FR", name: "Friesland", type: "province" },
    { code: "GE", name: "Gelderland", type: "province" },
    { code: "GR", name: "Groningen", type: "province" },
    { code: "LI", name: "Limburg", type: "province" },
    { code: "NB", name: "Noord-Brabant", type: "province" },
    { code: "NH", name: "Noord-Holland", type: "province" },
    { code: "OV", name: "Overijssel", type: "province" },
    { code: "UT", name: "Utrecht", type: "province" },
    { code: "ZE", name: "Zeeland", type: "province" },
    { code: "ZH", name: "Zuid-Holland", type: "province" },
  ],
  CH: [
    { code: "ZH", name: "Zürich", type: "canton" },
    { code: "BE", name: "Bern", type: "canton" },
    { code: "LU", name: "Luzern", type: "canton" },
    { code: "UR", name: "Uri", type: "canton" },
    { code: "SZ", name: "Schwyz", type: "canton" },
    { code: "OW", name: "Obwalden", type: "canton" },
    { code: "NW", name: "Nidwalden", type: "canton" },
    { code: "GL", name: "Glarus", type: "canton" },
    { code: "ZG", name: "Zug", type: "canton" },
    { code: "FR", name: "Fribourg", type: "canton" },
    { code: "SO", name: "Solothurn", type: "canton" },
    { code: "BS", name: "Basel-Stadt", type: "canton" },
    { code: "BL", name: "Basel-Landschaft", type: "canton" },
    { code: "SH", name: "Schaffhausen", type: "canton" },
    { code: "AR", name: "Appenzell Ausserrhoden", type: "canton" },
    { code: "AI", name: "Appenzell Innerrhoden", type: "canton" },
    { code: "SG", name: "St. Gallen", type: "canton" },
    { code: "GR", name: "Graubünden", type: "canton" },
    { code: "AG", name: "Aargau", type: "canton" },
    { code: "TG", name: "Thurgau", type: "canton" },
    { code: "TI", name: "Ticino", type: "canton" },
    { code: "VD", name: "Vaud", type: "canton" },
    { code: "VS", name: "Valais", type: "canton" },
    { code: "NE", name: "Neuchâtel", type: "canton" },
    { code: "GE", name: "Genève", type: "canton" },
    { code: "JU", name: "Jura", type: "canton" },
  ],
};

function resolveCode(countryCode?: string): string {
  if (!countryCode || typeof countryCode !== "string") return "";
  let upper = countryCode.toUpperCase().trim();
  if (upper.length === 3) {
    const a2 = alpha3ToAlpha2(upper);
    if (a2) upper = a2;
  }
  return upper;
}

/**
 * Get all primary subdivisions (states, provinces, regions, prefectures, cantons) for a country.
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code (e.g. 'US', 'CA', 'AU', 'IN', 'CN', 'DE', 'FR')
 * @returns Array of Subdivision objects, or empty array if none available
 *
 * @example
 * ```ts
 * const usStates = getSubdivisions('US');
 * // [{ code: 'CA', name: 'California', type: 'state' }, ...]
 *
 * const indianStates = getSubdivisions('IN');
 * // [{ code: 'MH', name: 'Maharashtra', type: 'state' }, ...]
 * ```
 */
export function getSubdivisions(countryCode?: string): Subdivision[] {
  const code = resolveCode(countryCode);
  return SUBDIVISIONS_MAP[code]
    ? SUBDIVISIONS_MAP[code].map((s) => ({ ...s, countryCode: code }))
    : [];
}

/**
 * Look up a specific subdivision by its code within a country.
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code (e.g. 'US', 'IN')
 * @param subdivisionCode - Subdivision code (case-insensitive, e.g. 'CA', 'ON', 'MH', 'ENG')
 * @returns Subdivision object, or undefined if not found
 *
 * @example
 * ```ts
 * getSubdivision('US', 'CA'); // { code: 'CA', name: 'California', type: 'state', countryCode: 'US' }
 * getSubdivision('IN', 'MH'); // { code: 'MH', name: 'Maharashtra', type: 'state', countryCode: 'IN' }
 * ```
 */
export function getSubdivision(
  countryCode?: string,
  subdivisionCode?: string
): Subdivision | undefined {
  if (!subdivisionCode || typeof subdivisionCode !== "string") return undefined;
  const list = getSubdivisions(countryCode);
  const upper = subdivisionCode.toUpperCase().trim();
  return list.find((s) => s.code.toUpperCase() === upper);
}

/**
 * Check if the package provides subdivision data for a given country.
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code
 * @returns true if subdivision data is available, false otherwise
 */
export function hasSubdivisions(countryCode?: string): boolean {
  const code = resolveCode(countryCode);
  return code in SUBDIVISIONS_MAP;
}

/**
 * Search subdivisions across one country or across all supported countries.
 * Case- and accent-insensitive matching on subdivision name or code.
 *
 * @param query - Search term (e.g. 'California', 'Bavaria', 'Tokyo', 'Maharashtra', 'Ontario')
 * @param countryCode - Optional ISO country code to restrict the search
 * @returns Array of matching Subdivision objects
 *
 * @example
 * ```ts
 * searchSubdivisions('york'); // matches New York (US)
 * searchSubdivisions('mumbai'); // matches Maharashtra (IN) if searched or searched by state name
 * searchSubdivisions('bavaria', 'DE'); // matches Bayern
 * ```
 */
export function searchSubdivisions(
  query: string,
  countryCode?: string
): Subdivision[] {
  if (!query || typeof query !== "string") return [];
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return [];

  const candidates: Subdivision[] = countryCode
    ? getSubdivisions(countryCode)
    : Object.keys(SUBDIVISIONS_MAP).flatMap((code) => getSubdivisions(code));

  return candidates.filter((s) => {
    const codeMatch = s.code.toLowerCase() === normalizedQuery;
    const nameNorm = normalizeText(s.name);
    return codeMatch || nameNorm.includes(normalizedQuery);
  });
}

/**
 * Get all country codes that have subdivision data available.
 *
 * @returns Array of ISO alpha-2 country codes
 *
 * @example
 * ```ts
 * getAllSubdivisionsCountries();
 * // ['US', 'CA', 'AU', 'GB', 'DE', 'FR', 'ES', 'IT', 'MX', 'BR', 'JP', 'IN', 'CN', 'RU', 'TR', 'NL', 'CH']
 * ```
 */
export function getAllSubdivisionsCountries(): string[] {
  return Object.keys(SUBDIVISIONS_MAP);
}

export default getSubdivisions;

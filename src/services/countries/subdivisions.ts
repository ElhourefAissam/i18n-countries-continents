import { alpha3ToAlpha2 } from "../../data/metadata.js";

export interface Subdivision {
  /** ISO 3166-2 subdivision code (e.g. 'CA', 'NY', 'ON', 'ENG', 'BY') */
  code: string;
  /** Name of the state, province, region, or prefecture */
  name: string;
  /** Category type (e.g. 'state', 'province', 'region', 'prefecture', 'nation') */
  type: string;
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
 * Get all primary subdivisions (states, provinces, regions, prefectures) for a country.
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code (e.g. 'US', 'CA', 'AU', 'DE', 'FR')
 * @returns Array of Subdivision objects, or empty array if none available
 *
 * @example
 * ```ts
 * const usStates = getSubdivisions('US');
 * // [{ code: 'CA', name: 'California', type: 'state' }, ...]
 *
 * const canadianProvinces = getSubdivisions('CA');
 * // [{ code: 'ON', name: 'Ontario', type: 'province' }, ...]
 * ```
 */
export function getSubdivisions(countryCode?: string): Subdivision[] {
  const code = resolveCode(countryCode);
  return SUBDIVISIONS_MAP[code] ? [...SUBDIVISIONS_MAP[code]] : [];
}

/**
 * Look up a specific subdivision by its code within a country.
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code (e.g. 'US')
 * @param subdivisionCode - Subdivision code (case-insensitive, e.g. 'CA', 'ON', 'ENG')
 * @returns Subdivision object, or undefined if not found
 *
 * @example
 * ```ts
 * getSubdivision('US', 'CA'); // { code: 'CA', name: 'California', type: 'state' }
 * getSubdivision('CA', 'QC'); // { code: 'QC', name: 'Quebec', type: 'province' }
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

export default getSubdivisions;

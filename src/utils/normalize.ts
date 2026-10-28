/**
 * Normalize a string by converting to lowercase, trimming, and stripping diacritics / accent marks.
 * Handles Unicode decomposition (NFD) so that accented characters (é, à, ñ, ü, etc.)
 * are converted to their base ASCII equivalents (e, a, n, u, etc.).
 *
 * @param str - The input string to normalize
 * @returns Lowercased, diacritic-free, trimmed string
 *
 * @example
 * ```ts
 * normalizeText('Perú');           // 'peru'
 * normalizeText('Côte d\'Ivoire'); // "cote d'ivoire"
 * normalizeText('Åland');          // 'aland'
 * normalizeText('São Tomé');       // 'sao tome'
 * ```
 */
export function normalizeText(str?: string): string {
  if (!str || typeof str !== "string") return "";
  return str
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

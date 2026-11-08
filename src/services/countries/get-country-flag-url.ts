import { alpha3ToAlpha2 } from "../../data/metadata.js";
import { isValidCountryCode } from "../validation/index.js";

export type FlagFormat = "svg" | "png";
export type FlagSize = "w20" | "w40" | "w80" | "w160" | "w320";

export interface FlagUrlOptions {
  /** Image format: 'svg' or 'png' (default: 'svg') */
  format?: FlagFormat;
  /** Size for PNG format: 'w20' | 'w40' | 'w80' | 'w160' | 'w320' (default: 'w40') */
  size?: FlagSize;
}

/**
 * Get a CDN URL for a country's official vector SVG or raster PNG flag image.
 * Solves the missing emoji flag rendering on Windows operating systems.
 *
 * @param countryCode - ISO 3166-1 alpha-2 or alpha-3 code (e.g. 'US', 'FRA', 'JP')
 * @param options - Configuration for format ('svg' or 'png') and size
 * @returns Direct image URL string, or undefined if invalid country code
 *
 * @example
 * ```ts
 * getCountryFlagUrl('US');                           // 'https://flagcdn.com/us.svg'
 * getCountryFlagUrl('FRA', { format: 'png', size: 'w80' }); // 'https://flagcdn.com/w80/fr.png'
 * ```
 */
export default function getCountryFlagUrl(
  countryCode?: string,
  options?: FlagUrlOptions
): string | undefined {
  if (!countryCode || typeof countryCode !== "string") return undefined;
  let code = countryCode.toUpperCase().trim();
  if (code.length === 3) {
    const a2 = alpha3ToAlpha2(code);
    if (a2) code = a2;
  }
  if (!isValidCountryCode(code)) return undefined;

  const lower = code.toLowerCase();
  const format = options?.format ?? "svg";

  if (format === "png") {
    const size = options?.size ?? "w40";
    return `https://flagcdn.com/${size}/${lower}.png`;
  }

  return `https://flagcdn.com/${lower}.svg`;
}

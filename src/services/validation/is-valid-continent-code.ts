import { getLangContinents } from "../../data/loader.js";

export default function isValidContinentCode(code: string): boolean {
  if (!code || typeof code !== "string" || code.trim().length !== 2) {
    return false;
  }
  const upper = code.toUpperCase().trim();
  return getLangContinents("en").some(([c]) => c === upper);
}

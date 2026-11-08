import assert from "node:assert";
import { getCountryFlagUrl } from "../dist/index.js";

console.log("\n========================================");
console.log(" Testing Flag CDN / SVG URLs (getCountryFlagUrl)");
console.log("========================================\n");

// 1. Default SVG format
assert.strictEqual(getCountryFlagUrl("US"), "https://flagcdn.com/us.svg");
assert.strictEqual(getCountryFlagUrl("FR"), "https://flagcdn.com/fr.svg");
assert.strictEqual(getCountryFlagUrl("FRA"), "https://flagcdn.com/fr.svg");
assert.strictEqual(getCountryFlagUrl("jp"), "https://flagcdn.com/jp.svg");
console.log("  ✅ Default SVG format returns clean FlagCDN vector URL");

// 2. PNG format with sizes
assert.strictEqual(
  getCountryFlagUrl("US", { format: "png" }),
  "https://flagcdn.com/w40/us.png"
);
assert.strictEqual(
  getCountryFlagUrl("FR", { format: "png", size: "w80" }),
  "https://flagcdn.com/w80/fr.png"
);
assert.strictEqual(
  getCountryFlagUrl("DEU", { format: "png", size: "w160" }),
  "https://flagcdn.com/w160/de.png"
);
console.log("  ✅ PNG format with size option returns accurate raster URL");

// 3. Edge cases
assert.strictEqual(getCountryFlagUrl("INVALID"), undefined);
assert.strictEqual(getCountryFlagUrl(""), undefined);
assert.strictEqual(getCountryFlagUrl(null), undefined);
assert.strictEqual(getCountryFlagUrl(undefined), undefined);
console.log("  ✅ Invalid codes return undefined gracefully");

console.log("\n----------------------------------------");
console.log("Results: 3 passed, 0 failed");
console.log("----------------------------------------\n");

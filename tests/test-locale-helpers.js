import assert from "node:assert";
import { getCountryFromLocale } from "../dist/index.js";

console.log("\n========================================");
console.log(" Testing Locale Inference (getCountryFromLocale)");
console.log("========================================\n");

// 1. Standard BCP-47 and POSIX locales
const us = getCountryFromLocale("en-US");
assert.strictEqual(us?.code, "US");
assert.strictEqual(us?.name, "United States");

const fr = getCountryFromLocale("fr-FR");
assert.strictEqual(fr?.code, "FR");

const br = getCountryFromLocale("pt_BR", "es");
assert.strictEqual(br?.code, "BR");
assert.strictEqual(br?.name, "Brasil");

const mx = getCountryFromLocale("es-MX");
assert.strictEqual(mx?.code, "MX");

const cn = getCountryFromLocale("zh-Hans-CN");
assert.strictEqual(cn?.code, "CN");
console.log("  ✅ Inferred countries accurately from BCP-47 and POSIX locale strings");

// 2. Language-only fallback
const jp = getCountryFromLocale("ja");
assert.strictEqual(jp?.code, "JP");

const de = getCountryFromLocale("de");
assert.strictEqual(de?.code, "DE");

const nl = getCountryFromLocale("nl");
assert.strictEqual(nl?.code, "NL");
console.log("  ✅ Primary language fallback properly maps to main country");

// 3. Edge cases
assert.strictEqual(getCountryFromLocale("INVALID"), undefined);
assert.strictEqual(getCountryFromLocale(""), undefined);
assert.strictEqual(getCountryFromLocale(null), undefined);
console.log("  ✅ Edge cases return undefined gracefully");

console.log("\n----------------------------------------");
console.log("Results: 3 passed, 0 failed");
console.log("----------------------------------------\n");

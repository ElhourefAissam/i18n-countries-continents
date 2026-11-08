import assert from "node:assert";
import { isValidPostalCode, getPostalCodePattern } from "../dist/index.js";

console.log("\n========================================");
console.log(" Testing Postal Code Validation (isValidPostalCode)");
console.log("========================================\n");

// 1. Valid postal codes
assert.strictEqual(isValidPostalCode("US", "90210"), true, "US 5-digit ZIP");
assert.strictEqual(isValidPostalCode("USA", "90210-1234"), true, "US 9-digit ZIP with alpha-3");
assert.strictEqual(isValidPostalCode("FR", "75008"), true, "French 5-digit code");
assert.strictEqual(isValidPostalCode("DE", "10115"), true, "German 5-digit code");
assert.strictEqual(isValidPostalCode("GB", "SW1A 1AA"), true, "UK postal code");
assert.strictEqual(isValidPostalCode("CA", "K1A 0B1"), true, "Canadian postal code");
assert.strictEqual(isValidPostalCode("JP", "100-0001"), true, "Japanese postal code with dash");
assert.strictEqual(isValidPostalCode("JP", "1000001"), true, "Japanese postal code without dash");
assert.strictEqual(isValidPostalCode("MA", "10000"), true, "Moroccan 5-digit code");
assert.strictEqual(isValidPostalCode("NL", "1012 JS"), true, "Dutch postal code");
assert.strictEqual(isValidPostalCode("CH", "8001"), true, "Swiss 4-digit code");
assert.strictEqual(isValidPostalCode("BR", "01001-000"), true, "Brazilian CEP");
assert.strictEqual(isValidPostalCode("AU", "2000"), true, "Australian 4-digit code");
console.log("  ✅ Valid postal codes pass verification across countries");

// 2. Invalid postal codes
assert.strictEqual(isValidPostalCode("US", "ABCDE"), false, "US alphabetic is invalid");
assert.strictEqual(isValidPostalCode("US", "1234"), false, "US 4 digits is invalid");
assert.strictEqual(isValidPostalCode("FR", "7500"), false, "French 4 digits is invalid");
assert.strictEqual(isValidPostalCode("FR", "750081"), false, "French 6 digits is invalid");
assert.strictEqual(isValidPostalCode("CA", "12345"), false, "Canadian numeric is invalid");
assert.strictEqual(isValidPostalCode("GB", "12345"), false, "UK numeric is invalid");
console.log("  ✅ Invalid format postal codes are correctly rejected");

// 3. Edge cases
assert.strictEqual(isValidPostalCode("INVALID", "12345"), false);
assert.strictEqual(isValidPostalCode("", "12345"), false);
assert.strictEqual(isValidPostalCode(null, "12345"), false);
assert.strictEqual(isValidPostalCode("US", ""), false);
assert.strictEqual(isValidPostalCode("US", null), false);
console.log("  ✅ Edge cases and empty strings return false gracefully");

// 4. Pattern getter
assert.strictEqual(getPostalCodePattern("FR"), "^\\d{5}$");
assert.strictEqual(typeof getPostalCodePattern("US"), "string");
assert.strictEqual(getPostalCodePattern("INVALID"), undefined);
console.log("  ✅ getPostalCodePattern returns regex pattern string");

console.log("\n----------------------------------------");
console.log("Results: 4 passed, 0 failed");
console.log("----------------------------------------\n");

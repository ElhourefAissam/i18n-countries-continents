import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const testSuites = [
  "comprehensive-test.js",
  "new-features-test.js",
  "real-world-test.js",
  "npm-usage-test.js",
  "test-with-flags.js",
  "test-all-services.js",
  "test-example.js",
  "test-calling-codes-and-currencies.js",
  "test-iso-codes.js",
  "test-accent-search.js",
  "test-capitals.js",
  "test-timezones.js",
  "test-asian-locales.js",
];

console.log("========================================");
console.log(" Running All Test Suites ");
console.log("========================================\n");

let failedSuites = 0;

for (const suite of testSuites) {
  const filePath = join(__dirname, suite);
  console.log(`▶ Running ${suite}...`);
  const result = spawnSync("node", [filePath], {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    console.error(`❌ Suite failed: ${suite} (exit code ${result.status})`);
    failedSuites++;
  } else {
    console.log(`✔ Suite passed: ${suite}\n`);
  }
}

console.log("========================================");
if (failedSuites === 0) {
  console.log(`🎉 ALL ${testSuites.length} TEST SUITES PASSED!`);
  console.log("========================================");
  process.exit(0);
} else {
  console.error(`❌ ${failedSuites} of ${testSuites.length} TEST SUITES FAILED!`);
  console.log("========================================");
  process.exit(1);
}

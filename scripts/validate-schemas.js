#!/usr/bin/env node
/**
 * Validates that all JSON schemas in the schemas/ directory are parseable
 * and syntactically correct. Run with: node scripts/validate-schemas.js
 */

const fs = require("fs");
const path = require("path");

const schemasDir = path.join(__dirname, "..", "schemas");

let passed = 0;
let failed = 0;

function validateDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      validateDir(fullPath);
    } else if (entry.name.endsWith(".schema.json")) {
      try {
        const content = fs.readFileSync(fullPath, "utf8");
        JSON.parse(content);
        console.log(`  ✓  ${path.relative(schemasDir, fullPath)}`);
        passed++;
      } catch (err) {
        console.error(`  ✗  ${path.relative(schemasDir, fullPath)}: ${err.message}`);
        failed++;
      }
    }
  }
}

console.log("Validating JSON schemas…\n");
validateDir(schemasDir);
console.log(`\n${passed} passed, ${failed} failed.`);

if (failed > 0) {
  process.exit(1);
}

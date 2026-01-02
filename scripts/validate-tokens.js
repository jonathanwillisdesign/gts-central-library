#!/usr/bin/env node

/**
 * Validate color tokens by comparing hex codes in descriptions with OKLCH values
 *
 * Usage:
 *   bun run scripts/validate-tokens.js src/tokens/colors/brands/gts.json
 *   bun run scripts/validate-tokens.js src/tokens/colors/brands/adl.json
 */

import { readFileSync } from "fs";
import { converter } from "culori";

const hexToOklch = converter("oklch");

// Tolerance for comparison (allows for rounding differences)
const TOLERANCE = {
  l: 0.01, // 1% difference in lightness
  c: 0.01, // 1% difference in chroma
  h: 2, // 2 degrees difference in hue
};

function extractHexFromDescription(description) {
  if (!description) return null;

  // Match hex codes in description (e.g., "Brand red - #E32B2B")
  const hexMatch = description.match(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/i);
  if (hexMatch) {
    return hexMatch[0]; // Return with #
  }

  return null;
}

function convertHexToOklch(hex) {
  const oklch = hexToOklch(hex);
  if (!oklch) return null;

  return {
    l: oklch.l,
    c: oklch.c || 0,
    h: oklch.h !== undefined ? oklch.h : 0,
  };
}

function compareValues(actual, expected, tolerance, name) {
  const diff = Math.abs(actual - expected);
  return {
    match: diff <= tolerance,
    diff,
    actual,
    expected,
    name,
  };
}

function validateColorToken(colorName, token, path = "") {
  const results = [];
  const fullPath = path ? `${path}.${colorName}` : colorName;

  // Extract hex from description
  const hex = extractHexFromDescription(token.$description);

  if (!hex) {
    results.push({
      path: fullPath,
      status: "warning",
      message: "No hex code found in description",
    });
    return results;
  }

  // Convert hex to OKLCH
  const expectedOklch = convertHexToOklch(hex);
  if (!expectedOklch) {
    results.push({
      path: fullPath,
      status: "error",
      message: `Failed to convert hex ${hex} to OKLCH`,
    });
    return results;
  }

  // Get actual OKLCH values from token
  const actualL = token.l?.$value;
  const actualC = token.c?.$value;
  const actualH = token.h?.$value;

  if (actualL === undefined || actualC === undefined || actualH === undefined) {
    results.push({
      path: fullPath,
      status: "error",
      message: "Missing l, c, or h values in token",
    });
    return results;
  }

  // Compare values
  const lComparison = compareValues(actualL, expectedOklch.l, TOLERANCE.l, "L");
  const cComparison = compareValues(actualC, expectedOklch.c, TOLERANCE.c, "C");
  const hComparison = compareValues(actualH, expectedOklch.h, TOLERANCE.h, "H");

  const allMatch = lComparison.match && cComparison.match && hComparison.match;

  if (!allMatch) {
    results.push({
      path: fullPath,
      status: "mismatch",
      hex,
      expected: {
        l: expectedOklch.l,
        c: expectedOklch.c,
        h: expectedOklch.h,
      },
      actual: {
        l: actualL,
        c: actualC,
        h: actualH,
      },
      differences: [
        !lComparison.match && {
          component: "L",
          expected: expectedOklch.l,
          actual: actualL,
          diff: lComparison.diff,
        },
        !cComparison.match && {
          component: "C",
          expected: expectedOklch.c,
          actual: actualC,
          diff: cComparison.diff,
        },
        !hComparison.match && {
          component: "H",
          expected: expectedOklch.h,
          actual: actualH,
          diff: hComparison.diff,
        },
      ].filter(Boolean),
    });
  } else {
    results.push({
      path: fullPath,
      status: "ok",
      hex,
    });
  }

  return results;
}

function validateTokenFile(filePath) {
  try {
    const content = readFileSync(filePath, "utf-8");
    const tokens = JSON.parse(content);

    const results = [];

    // Recursively find color tokens
    function findColorTokens(obj, path = "") {
      for (const [key, value] of Object.entries(obj)) {
        if (key === "$description" || key === "$type" || key === "$value") {
          continue;
        }

        const currentPath = path ? `${path}.${key}` : key;

        // Check if this is a color token (has l, c, h properties)
        if (
          value &&
          typeof value === "object" &&
          "l" in value &&
          "c" in value &&
          "h" in value
        ) {
          const tokenResults = validateColorToken(key, value, path);
          results.push(...tokenResults);
        } else if (value && typeof value === "object") {
          // Recursively search nested objects
          findColorTokens(value, currentPath);
        }
      }
    }

    findColorTokens(tokens);

    return results;
  } catch (error) {
    throw new Error(`Failed to read or parse token file: ${error.message}`);
  }
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: bun run scripts/validate-tokens.js <token-file-path>");
  console.error(
    "Example: bun run scripts/validate-tokens.js src/tokens/colors/brands/gts.json"
  );
  process.exit(1);
}

try {
  const filePath = args[0];
  const results = validateTokenFile(filePath);

  console.log(`\n🔍 Validating tokens in: ${filePath}\n`);

  const ok = results.filter((r) => r.status === "ok");
  const warnings = results.filter((r) => r.status === "warning");
  const errors = results.filter((r) => r.status === "error");
  const mismatches = results.filter((r) => r.status === "mismatch");

  // Print results
  if (ok.length > 0) {
    console.log(`✅ ${ok.length} token(s) validated successfully:\n`);
    ok.forEach((r) => {
      console.log(`   ${r.path} - ${r.hex}`);
    });
    console.log("");
  }

  if (warnings.length > 0) {
    console.log(`⚠️  ${warnings.length} warning(s):\n`);
    warnings.forEach((r) => {
      console.log(`   ${r.path}: ${r.message}`);
    });
    console.log("");
  }

  if (errors.length > 0) {
    console.log(`❌ ${errors.length} error(s):\n`);
    errors.forEach((r) => {
      console.log(`   ${r.path}: ${r.message}`);
    });
    console.log("");
  }

  if (mismatches.length > 0) {
    console.log(`🔴 ${mismatches.length} mismatch(es) found:\n`);
    mismatches.forEach((r) => {
      console.log(`   ${r.path}`);
      console.log(`   Hex: ${r.hex}`);
      console.log(
        `   Expected: l=${r.expected.l.toFixed(4)}, c=${r.expected.c.toFixed(4)}, h=${r.expected.h.toFixed(2)}`
      );
      console.log(
        `   Actual:   l=${r.actual.l.toFixed(4)}, c=${r.actual.c.toFixed(4)}, h=${r.actual.h.toFixed(2)}`
      );
      console.log(`   Differences:`);
      r.differences.forEach((d) => {
        console.log(
          `     - ${d.component}: diff=${d.diff.toFixed(4)} (expected ${d.expected.toFixed(4)}, got ${d.actual.toFixed(4)})`
        );
      });
      console.log("");
    });

    console.log("💡 To fix, run:");
    console.log(
      `   bun run scripts/convert-hex-to-oklch.js "${mismatches[0].hex}"`
    );
    console.log("");
  }

  // Summary
  const total = results.length;
  const passed = ok.length;
  const failed = errors.length + mismatches.length;

  console.log("📊 Summary:");
  console.log(`   Total: ${total}`);
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   ⚠️  Warnings: ${warnings.length}`);
  console.log("");

  // Exit with error code if there are failures
  if (failed > 0) {
    process.exit(1);
  }
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  process.exit(1);
}

#!/usr/bin/env node

/**
 * Convert OKLCH color to hex format
 *
 * Usage:
 *   bun run scripts/convert-oklch-to-hex.js 0.54 0.22 25
 *   bun run scripts/convert-oklch-to-hex.js 0.9761 0 0
 */

import { converter, formatHex } from "culori";

const oklchToRgb = converter("oklch");

function convertOklchToHex(l, c, h) {
  // Validate inputs
  if (l < 0 || l > 1) {
    throw new Error(`Lightness (l) must be between 0 and 1, got: ${l}`);
  }
  if (c < 0) {
    throw new Error(`Chroma (c) must be >= 0, got: ${c}`);
  }
  if (h < 0 || h > 360) {
    throw new Error(`Hue (h) must be between 0 and 360, got: ${h}`);
  }

  // Convert OKLCH to RGB, then format as hex
  const rgb = oklchToRgb({
    mode: "oklch",
    l: l,
    c: c || 0,
    h: h !== undefined && h !== null ? h : 0,
  });

  if (!rgb) {
    throw new Error(`Failed to convert OKLCH to RGB: l=${l}, c=${c}, h=${h}`);
  }

  const hex = formatHex(rgb);
  return hex.toUpperCase();
}

// Main execution
const args = process.argv.slice(2);

if (args.length < 3) {
  console.error("Usage: bun run scripts/convert-oklch-to-hex.js <l> <c> <h>");
  console.error(
    "Example: bun run scripts/convert-oklch-to-hex.js 0.54 0.22 25"
  );
  process.exit(1);
}

try {
  const l = parseFloat(args[0]);
  const c = parseFloat(args[1]);
  const h = parseFloat(args[2]);

  const hex = convertOklchToHex(l, c, h);

  console.log("\n📐 OKLCH to Hex Conversion\n");
  console.log(`OKLCH:   l: ${l}, c: ${c}, h: ${h}`);
  console.log(`Hex:     ${hex}`);
  console.log("");
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  process.exit(1);
}

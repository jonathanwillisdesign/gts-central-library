#!/usr/bin/env node

/**
 * Convert hex color code to OKLCH format
 *
 * Usage:
 *   bun run scripts/convert-hex-to-oklch.js "#E32B2B"
 *   bun run scripts/convert-hex-to-oklch.js "E32B2B"
 */

import { converter } from "culori";

const hexToOklch = converter("oklch");

function convertHexToOklch(hex) {
  // Normalize hex input (add # if missing)
  const normalizedHex = hex.startsWith("#") ? hex : `#${hex}`;

  // Validate hex format
  if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(normalizedHex)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  // Convert to OKLCH
  const oklch = hexToOklch(normalizedHex);

  if (!oklch) {
    throw new Error(`Failed to convert hex to OKLCH: ${hex}`);
  }

  return {
    l: oklch.l,
    c: oklch.c || 0,
    h: oklch.h !== undefined ? oklch.h : 0,
  };
}

function formatOutput(hex, oklch) {
  return {
    hex: hex.startsWith("#") ? hex : `#${hex}`,
    oklch: {
      l: Number(oklch.l.toFixed(4)),
      c: Number(oklch.c.toFixed(4)),
      h: Number(oklch.h.toFixed(2)),
    },
    json: {
      l: { $type: "number", $value: Number(oklch.l.toFixed(4)) },
      c: { $type: "number", $value: Number(oklch.c.toFixed(4)) },
      h: { $type: "number", $value: Number(oklch.h.toFixed(2)) },
    },
  };
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: bun run scripts/convert-hex-to-oklch.js <hex-color>");
  console.error('Example: bun run scripts/convert-hex-to-oklch.js "#E32B2B"');
  process.exit(1);
}

try {
  const hex = args[0];
  const oklch = convertHexToOklch(hex);
  const output = formatOutput(hex, oklch);

  console.log("\n📐 Hex to OKLCH Conversion\n");
  console.log(`Hex:     ${output.hex}`);
  console.log(
    `OKLCH:   l: ${output.oklch.l}, c: ${output.oklch.c}, h: ${output.oklch.h}`
  );
  console.log("\n📋 JSON Format (for token files):\n");
  console.log(JSON.stringify(output.json, null, 2));
  console.log("");
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  process.exit(1);
}

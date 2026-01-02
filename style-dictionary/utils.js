/**
 * Style Dictionary Utilities
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

/**
 * Load and parse a JSON token file
 * @param {string} path - Path relative to project root
 * @returns {object} Parsed JSON or empty object on error
 */
export const loadTokenFile = (path) => {
  try {
    return JSON.parse(readFileSync(resolve(rootDir, path), "utf-8"));
  } catch (e) {
    console.error(`Error loading ${path}:`, e);
    return {};
  }
};


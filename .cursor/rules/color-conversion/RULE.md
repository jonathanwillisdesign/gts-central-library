---
description: Guidelines for converting between hex codes and OKLCH color format
alwaysApply: false
globs: ["src/tokens/colors/**/*.json", "scripts/**/*.js", "scripts/**/*.ts"]
---

# Color Conversion Guidelines

## Overview

The GTS Design System uses **OKLCH** (Oklch) color space for color tokens. OKLCH provides perceptually uniform color representation, making it ideal for design systems that need consistent color manipulation and theme switching.

## OKLCH Color Format

OKLCH consists of three components:

- **L (Lightness)**: 0-1 or 0-100% - Perceptually uniform lightness
- **C (Chroma)**: 0-0.4+ - Color intensity/saturation
- **H (Hue)**: 0-360 - Color angle in degrees

### Token Format

In our token JSON files, OKLCH values are stored as separate properties:

```json
{
  "red": {
    "$description": "Brand red - #E32B2B",
    "l": { "$type": "number", "$value": 0.54 },
    "c": { "$type": "number", "$value": 0.22 },
    "h": { "$type": "number", "$value": 25 }
  }
}
```

**Note**:

- `l` values are stored as decimals (0-1) in JSON tokens
- `c` values are stored as decimals (typically 0-0.4)
- `h` values are stored as degrees (0-360)

## Conversion Tools

### Using Helper Scripts

We provide helper scripts for accurate conversions:

#### Convert Hex to OKLCH

```bash
bun run scripts/convert-hex-to-oklch.js "#E32B2B"
```

Output:

```
Hex: #E32B2B
OKLCH: l: 0.5402, c: 0.2201, h: 25.1234
```

#### Convert OKLCH to Hex

```bash
bun run scripts/convert-oklch-to-hex.js 0.54 0.22 25
```

Output:

```
OKLCH: l: 0.54, c: 0.22, h: 25
Hex: #E32B2B
```

#### Validate Token File

Check if hex codes in token descriptions match the OKLCH values:

```bash
bun run scripts/validate-tokens.js src/tokens/colors/brands/gts.json
```

This will:

- Extract hex codes from `$description` fields
- Convert them to OKLCH
- Compare with existing `l`, `c`, `h` values
- Report any discrepancies

### Manual Conversion

If you need to convert colors manually, use the `culori` library:

```javascript
import { converter } from "culori";

const hexToOklch = converter("oklch");
const oklch = hexToOklch("#E32B2B");
// { l: 0.5402, c: 0.2201, h: 25.1234 }

const oklchToHex = converter("hex");
const hex = oklchToHex({ mode: "oklch", l: 0.54, c: 0.22, h: 25 });
// '#E32B2B'
```

## Best Practices

### 1. Always Verify Conversions

When adding or updating color tokens:

1. **Extract the hex code** from design files or specifications
2. **Convert to OKLCH** using the helper script
3. **Update the token JSON** with accurate values
4. **Validate** using the validation script
5. **Test** the generated CSS output

### 2. Precision Guidelines

- **Lightness (L)**: Use 4 decimal places (e.g., `0.5402`)
- **Chroma (C)**: Use 4 decimal places (e.g., `0.2201`)
- **Hue (H)**: Use 1-2 decimal places (e.g., `25.12` or `25`)

**Note**: For neutral/gray colors, chroma should be very low (near 0), and hue may be undefined or 0.

### 3. Handling Edge Cases

#### Neutral Colors (Grays)

Neutral colors have very low chroma. Example:

```json
{
  "neutral": {
    "$description": "Neutral gray - #F7F7F7",
    "l": { "$type": "number", "$value": 0.9761 },
    "c": { "$type": "number", "$value": 0 },
    "h": { "$type": "number", "$value": 0 }
  }
}
```

#### Out-of-Gamut Colors

Some hex colors may be out of the sRGB gamut when converted to OKLCH. The `culori` library handles this automatically by clamping values. If you notice significant color shifts:

1. Verify the source hex code is correct
2. Check if the color is within sRGB gamut
3. Consider using a different color space if needed

### 4. Token Structure

When adding new color tokens:

```json
{
  "colorName": {
    "$description": "Color description - #HEXCODE",
    "l": { "$type": "number", "$value": 0.54 },
    "c": { "$type": "number", "$value": 0.22 },
    "h": { "$type": "number", "$value": 25 }
  }
}
```

**Required fields**:

- `$description`: Must include the hex code for reference
- `l`, `c`, `h`: Separate number tokens for each OKLCH component

## Common Issues

### Issue: Token values don't match hex code

**Solution**:

1. Run the validation script to identify discrepancies
2. Re-convert the hex code using the helper script
3. Update the token values
4. Rebuild tokens: `bun run tokens:build`

### Issue: Color looks different in browser

**Possible causes**:

1. Incorrect OKLCH values in token file
2. Browser doesn't support OKLCH (use fallback)
3. Color profile mismatch

**Solution**:

1. Validate token values
2. Check browser compatibility
3. Verify the source hex code

### Issue: Neutral colors have hue values

**Solution**: For true neutral grays, set:

- `c: 0` (or very close to 0)
- `h: 0` (hue is undefined for neutral colors)

## Workflow

### Adding a New Color Token

1. **Get the hex code** from design files
2. **Convert to OKLCH**:
   ```bash
   bun run scripts/convert-hex-to-oklch.js "#HEXCODE"
   ```
3. **Add to token file**:
   ```json
   {
     "newColor": {
       "$description": "Color description - #HEXCODE",
       "l": { "$type": "number", "$value": 0.XXXX },
       "c": { "$type": "number", "$value": 0.XXXX },
       "h": { "$type": "number", "$value": XXX }
     }
   }
   ```
4. **Validate**:
   ```bash
   bun run scripts/validate-tokens.js src/tokens/colors/brands/gts.json
   ```
5. **Build tokens**:
   ```bash
   bun run tokens:build
   ```
6. **Verify** in generated CSS file

### Updating Existing Color Token

1. **Get updated hex code**
2. **Convert to OKLCH** using helper script
3. **Update token file** with new values
4. **Validate** to ensure accuracy
5. **Rebuild** and test

## References

- [OKLCH Color Space](https://oklch.com/)
- [Culori Documentation](https://culorijs.org/)
- [CSS Color Module Level 4 - OKLCH](https://www.w3.org/TR/css-color-4/#ok-lab)

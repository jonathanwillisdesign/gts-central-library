import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        dimensions: false,
        replaceAttrValues: {
          '#000': 'currentColor',
          '#000000': 'currentColor',
        },
      },
    }),
  ],
  // Vitest configuration removed - Storybook Vitest addon requires browser mode
  // which is not available with Node.js 21. To use Vitest for component testing:
  // 1. Upgrade to Node.js 22+
  // 2. Upgrade Vitest to 4.x
  // 3. Re-add @storybook/addon-vitest and configure browser testing
});
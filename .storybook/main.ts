import type { StorybookConfig } from "@storybook/react-vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-designs",
  ],
  framework: "@storybook/react-vite",
  staticDirs: ["./assets"],
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      plugins: [
        createSvgIconsPlugin({
          iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
          symbolId: "icon-[name]",
        }),
      ],
    });
  },
};
export default config;

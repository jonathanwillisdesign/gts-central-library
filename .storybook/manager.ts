import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";

const theme = create({
  base: "light",
  brandTitle: "Locker Room",
  brandImage: "/logo.svg",
  brandTarget: "_self",

  // UI colors
  colorPrimary: "#000000",
  colorSecondary: "#000000",

  // UI
  appBg: "#ffffff",
  appContentBg: "#ffffff",
  appBorderColor: "#e5e5e5",
  appBorderRadius: 0,

  // Text colors
  textColor: "#000000",
  textInverseColor: "#ffffff",

  // Toolbar colors
  barTextColor: "#666666",
  barSelectedColor: "#000000",
  barBg: "#ffffff",
});

addons.setConfig({
  theme,
});

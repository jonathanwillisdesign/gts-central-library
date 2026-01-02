import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design Tokens/Colors",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Color tokens for the adidas Locker Room design system. All colors follow the `--gl-color-*` naming convention.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Extract color tokens from CSS
const colorCategories = {
  "Base Colors": [
    "--gl-color-black",
    "--gl-color-white",
    "--gl-color-blue",
    "--gl-color-grey-100",
    "--gl-color-grey-400",
    "--gl-color-grey-700",
    "--gl-color-red",
    "--gl-color-orange",
    "--gl-color-green",
  ],
  "Brand Colors": [
    "--gl-color-brand-p1",
    "--gl-color-brand-p2",
    "--gl-color-brand-p3",
  ],
  "Background Colors": [
    "--gl-color-background",
    "--gl-color-background-inverse",
    "--gl-color-background-alternative",
    "--gl-color-background-disabled",
    "--gl-color-background-membership",
    "--gl-color-background-highlight",
  ],
  "Text Colors": [
    "--gl-color-text",
    "--gl-color-text-alternative",
    "--gl-color-text-inverse",
    "--gl-color-text-disabled",
    "--gl-color-error-text",
    "--gl-color-success-text",
  ],
  "Border Colors": [
    "--gl-color-border-inverse",
    "--gl-color-border-alternative",
    "--gl-color-border-hover",
    "--gl-color-border-active",
    "--gl-color-border-functional",
    "--gl-color-error-border",
    "--gl-color-success-border",
  ],
};

const ColorSwatch = ({ token }: { token: string }) => {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim();

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div
        style={{
          width: "100%",
          height: "80px",
          backgroundColor: value || "transparent",
          border: "1px solid #ddd",
          borderRadius: "4px",
          marginBottom: "0.5rem",
        }}
      />
      <div style={{ fontSize: "12px", fontWeight: "bold" }}>{token}</div>
      <div style={{ fontSize: "11px", color: "#666" }}>{value || "N/A"}</div>
    </div>
  );
};

export const BaseColors: Story = {
  render: () => (
    <div>
      <h2>Base Colors</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {colorCategories["Base Colors"].map((token) => (
          <ColorSwatch key={token} token={token} />
        ))}
      </div>
    </div>
  ),
};

export const BrandColors: Story = {
  render: () => (
    <div>
      <h2>Brand Colors</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {colorCategories["Brand Colors"].map((token) => (
          <ColorSwatch key={token} token={token} />
        ))}
      </div>
    </div>
  ),
};

export const BackgroundColors: Story = {
  render: () => (
    <div>
      <h2>Background Colors</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {colorCategories["Background Colors"].map((token) => (
          <ColorSwatch key={token} token={token} />
        ))}
      </div>
    </div>
  ),
};

export const TextColors: Story = {
  render: () => (
    <div>
      <h2>Text Colors</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {colorCategories["Text Colors"].map((token) => (
          <ColorSwatch key={token} token={token} />
        ))}
      </div>
    </div>
  ),
};

export const BorderColors: Story = {
  render: () => (
    <div>
      <h2>Border Colors</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {colorCategories["Border Colors"].map((token) => (
          <ColorSwatch key={token} token={token} />
        ))}
      </div>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../components/Icon";

const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Icon component for displaying SVG icons from the sprite. Icons are SVG files in src/icons/svg/ that are auto-loaded at build time.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: ["arrow-right"],
      description: "Icon name",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Icon size",
    },
    weight: {
      control: "select",
      options: ["regular", "bold"],
      description: "Icon weight",
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "arrow-right",
    size: "medium",
    weight: "regular",
  },
};

export const Bold: Story = {
  args: {
    name: "arrow-right",
    size: "medium",
    weight: "bold",
  },
};

export const Small: Story = {
  args: {
    name: "arrow-right",
    size: "small",
    weight: "regular",
  },
};

export const Large: Story = {
  args: {
    name: "arrow-right",
    size: "large",
    weight: "regular",
  },
};

export const LargeBold: Story = {
  args: {
    name: "arrow-right",
    size: "large",
    weight: "bold",
  },
};
